import { getUploadUrl, houseForSaleApi, uploadApi } from "../../services/api";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import type { LocationData, LookupItem } from "../../types";
import LocationForm from "../shared/LocationForm";
import { useLanguage } from "../../i18n";

interface LocationImagesStepProps {
  location: LocationData;
  descriptionHint: string;
  onChange: (next: LocationData) => void;
}

export default function LocationImagesStep({
  location,
  descriptionHint,
  onChange,
}: LocationImagesStepProps) {
  const { tr } = useLanguage();
  const set = (patch: Partial<LocationData>) =>
    onChange({ ...location, ...patch });
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoError, setVideoError] = useState("");

  const [regions, setRegions] = useState<LookupItem[]>([]);
  const [districts, setDistricts] = useState<(LookupItem & { regionId: string })[]>([]);
  const [wards, setWards] = useState<(LookupItem & { districtId: string })[]>([]);

  useEffect(() => {
    Promise.all([
      houseForSaleApi.getRegions(),
      houseForSaleApi.getDistricts(),
      houseForSaleApi.getWards(),
    ]).then(([nextRegions, nextDistricts, nextWards]) => {
      setRegions(nextRegions);
      setDistricts(nextDistricts);
      setWards(nextWards);
    }).catch((error) => console.error("Unable to load location options:", error));
  }, []);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView([-6.369, 34.8888], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    mapInstanceRef.current = map;
    setIsMapReady(true);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !isMapReady) return;

    if (location.lat !== null && location.lng !== null) {
      const position: L.LatLngExpression = [location.lat, location.lng];

      if (markerRef.current) {
        markerRef.current.setLatLng(position);
      } else {
        markerRef.current = L.marker(position).addTo(mapInstanceRef.current);
      }

      mapInstanceRef.current.setView(position, 16);
    } else if (markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
    }
  }, [location.lat, location.lng, isMapReady]);

  useEffect(() => {
    if (!mapInstanceRef.current || !isMapReady) return;

    const handleMapClick = (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      set({ lat, lng });
    };

    mapInstanceRef.current.on("click", handleMapClick);

    return () => {
      mapInstanceRef.current?.off("click", handleMapClick);
    };
  }, [isMapReady, set]);

  const handleSearch = async () => {
    if (!location.searchQuery) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location.searchQuery)}`,
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        set({ lat: parseFloat(lat), lng: parseFloat(lon) });
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleVideoChange = async (file: File | undefined) => {
        if (!file) return;
        if (file.size >= 30 * 1024 * 1024) {
          setVideoError(tr("Video must be less than 30 MB."));
          return;
        }
        if (!file.type.startsWith("video/") && !/\.(mp4|mkv|mov|avi|webm|m4v|3gp)$/i.test(file.name)) {
          setVideoError(tr("Please select a video file."));
          return;
        }

        setVideoError("");
        setVideoProgress(0);
        try {
          const [uploadedVideo] = await uploadApi.upload([file], setVideoProgress);
          set({ videoUrl: uploadedVideo.url, videoFileType: uploadedVideo.fileType || file.type, videoSizeBytes: uploadedVideo.sizeBytes || file.size });
        } catch (error) {
          console.error("Video upload error:", error);
          setVideoError(tr("Video upload failed. Please try again."));
          setVideoProgress(0);
        }
  };

  const handleMyLocation = () => {
    if (!navigator.geolocation) {
      alert(tr("Geolocation is not supported by your browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        set({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert(tr("Unable to retrieve your location"));
      },
    );
  };

  return (
    <div>
      <h5 className="mb-1">{tr("Location & Images")}</h5>
      <p className="text-muted mb-4">{tr("Region, GPS and photos")}</p>

      <LocationForm location={location} onChange={onChange} regions={regions} districts={districts} wards={wards} />

      <label className="form-label fw-semibold">{tr("Location")}</label>
      <div className="input-group mb-2">
        <input
          className="form-control"
          placeholder="Search an address or place..."
          value={location.searchQuery}
          onChange={(e) => set({ searchQuery: e.target.value })}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={handleSearch}
        >
            <i className="bi bi-search me-1" /> {tr("Search")}
        </button>
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={handleMyLocation}
        >
            <i className="bi bi-geo-alt me-1" /> {tr("My location")}
        </button>
      </div>

      <div
        ref={mapRef}
        className="oweru-map-placeholder mb-2"
        style={{ cursor: "crosshair" }}
      >
        {!isMapReady && (
          <span>
            <i className="bi bi-map me-1" />
            {tr("Loading map...")}
          </span>
        )}
      </div>
      <p className="text-muted small mb-4">
        {location.lat && location.lng
          ? `Location set: ${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`
          : "No location set. Click the map, search, or use your location."}
      </p>

      <label className="form-label fw-semibold d-block">Description</label>
      <div className="d-flex align-items-center gap-2 mb-2">
        {/* <button className="btn btn-dark btn-sm" type="button">
          <i className="bi bi-stars me-1" /> Generate description
        </button> */}
        <div className="btn-group btn-group-sm" role="group">
          <button
            type="button"
            className={`btn ${location.descriptionLang === "en" ? "btn-oweru" : "btn-outline-secondary"}`}
            onClick={() => set({ descriptionLang: "en" })}
          >
            {tr("English")}
          </button>/
          <button
            type="button"
            className={`btn ${location.descriptionLang === "sw" ? "btn-oweru" : "btn-outline-secondary"}`}
            onClick={() => set({ descriptionLang: "sw" })}
          >
            {tr("Kiswahili")}
          </button>
        </div>
      </div>
      <textarea
        className="form-control mb-1"
        rows={3}
        placeholder={descriptionHint}
        value={location.description}
        onChange={(e) => set({ description: e.target.value })}
      />
      <p className="text-muted small mb-4">{tr("Built from the category, sub-type, size, rooms, amenities, location and price on this form. Edit it if you want to.")}</p>

      <label className="form-label fw-semibold d-block">{tr("Property images")}</label>
      <label className="oweru-upload-box d-block mb-1">
        <i className="bi bi-image fs-4 d-block mb-1" />
        {location.images.length > 0
          ? `${location.images.length} image(s) selected`
            : tr("Add images")}
        <input
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => set({ images: Array.from(e.target.files ?? []) })}
        />
      </label>

      <label className="form-label fw-semibold d-block mt-3">{tr("Property video")}</label>
      <label className="oweru-upload-box d-block mb-1">
        <i className="bi bi-camera-video fs-4 d-block mb-1" />
        {location.videoUrl ? tr("Video uploaded") : tr("Add one video")}
        <input
          type="file"
          accept="video/*,.mkv,.avi,.mov,.webm,.m4v,.3gp"
          hidden
          onChange={(e) => handleVideoChange(e.target.files?.[0])}
        />
      </label>
      {videoProgress > 0 && videoProgress < 100 && (
        <div className="progress mb-2" role="progressbar" aria-label={tr("Video upload progress")} aria-valuenow={videoProgress} aria-valuemin={0} aria-valuemax={100}>
          <div className="progress-bar" style={{ width: `${videoProgress}%` }}>{videoProgress}%</div>
        </div>
      )}
      {videoError && <div className="text-danger small mb-2">{videoError}</div>}
      {location.videoUrl && (
        <video className="oweru-video-preview mb-3" controls preload="metadata" src={getUploadUrl(location.videoUrl)} />
      )}

      <label className="form-label fw-semibold d-block mt-3">
        {tr("Verified documents")}
      </label>
      <label className="btn btn-outline-secondary btn-sm mb-1">
        <i className="bi bi-paperclip me-1" />
        {location.documents.length > 0
          ? `${location.documents.length} document(s) attached`
            : tr("Attach documents")}
        <input
          type="file"
          accept="application/pdf,image/*"
          multiple
          hidden
          onChange={(e) => set({ documents: Array.from(e.target.files ?? []) })}
        />
      </label>
      <p className="text-muted small mb-0">{tr("Title deed, survey plan, sale agreement — PDF or a photo, up to 15 MB each. They upload when the record is saved, and more can be added later.")}</p>
    </div>
  );
}
