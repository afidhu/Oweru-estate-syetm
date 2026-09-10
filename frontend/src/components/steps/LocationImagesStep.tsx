import { getUploadUrl, houseForSaleApi, uploadApi } from "../../services/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import type { LocationData, LookupItem } from "../../types";
import LocationForm from "../shared/LocationForm";
import { useLanguage } from "../../i18n";
import { staticDistricts, staticRegions, staticWards } from "../../data/tanzaniaLocations";

interface LocationImagesStepProps {
  mode?: 'location' | 'images';
  location: LocationData;
  descriptionHint: string;
  onChange: (next: LocationData) => void;
  onVideoUploading?: (uploading: boolean) => void;
  showErrors?: boolean;
  /** Mobile-only paging: null = show everything (desktop); 0 = base fields; 1 = split-off section. */
  mobilePage?: 0 | 1 | null;
}

export default function LocationImagesStep({
  mode = 'location',
  location,
  descriptionHint,
  onChange,
  onVideoUploading,
  mobilePage = null,
  showErrors = false,
}: LocationImagesStepProps) {
  const { tr } = useLanguage();
  const set = (patch: Partial<LocationData>) =>
    onChange({ ...location, ...patch });
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoUploading, setVideoUploading] = useState(false);
  const [videoLocalPreview, setVideoLocalPreview] = useState("");
  const [videoError, setVideoError] = useState("");
  const [locationPermissionMessage, setLocationPermissionMessage] = useState("");
  const [preview, setPreview] = useState<{ type: "image" | "video"; src: string } | null>(null);

  // Seeded from the bundled Tanzania regions/districts/wards dataset so the
  // dropdowns work immediately; replaced with live API data (real DB ids)
  // once the backend has locations seeded.
  const { data: locationData } = useQuery<{
    regions: LookupItem[]
    districts: (LookupItem & { regionId: string })[]
    wards: (LookupItem & { districtId: string })[]
  }>({
    queryKey: ['locations'],
    queryFn: async () => {
      const [regions, districts, wards] = await Promise.all([
        houseForSaleApi.getRegions(),
        houseForSaleApi.getDistricts(),
        houseForSaleApi.getWards(),
      ])
      return { regions, districts, wards }
    },
  })
  const regions = locationData?.regions?.length ? locationData.regions : staticRegions
  const districts = locationData?.districts?.length ? locationData.districts : staticDistricts
  const wards = locationData?.wards?.length ? locationData.wards : staticWards

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
      setIsMapReady(false);
    };
    // re-run when the map container (re)mounts due to mobile paging
  }, [mobilePage, mode]);

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

        // Show progress + a local preview instantly, before the network call starts
        setVideoError("");
        setVideoProgress(0);
        setVideoUploading(true);
        try { setVideoLocalPreview((prev) => { if (prev) URL.revokeObjectURL(prev); return URL.createObjectURL(file); }); } catch { /* ignore */ }
        onVideoUploading?.(true);
        let lastPct = -1;
        try {
          const [uploadedVideo] = await uploadApi.upload([file], (pct) => {
            if (pct !== lastPct) { lastPct = pct; setVideoProgress(pct); }
          });
          set({ videoUrl: uploadedVideo.url, videoFileType: uploadedVideo.fileType || file.type, videoSizeBytes: uploadedVideo.sizeBytes || file.size });
        } catch (error) {
          console.error("Video upload error:", error);
          setVideoError(tr("Video upload failed. Please try again."));
          setVideoProgress(0);
        } finally {
          setVideoUploading(false);
          onVideoUploading?.(false);
        }
  };

  const handleMyLocation = () => {
    if (!navigator.geolocation) {
      const message = tr("Geolocation is not supported by your browser");
      setLocationPermissionMessage(message);
      alert(message);
      return;
    }

    setLocationPermissionMessage("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        set({ lat: latitude, lng: longitude });
        setLocationPermissionMessage("");
      },
      (error) => {
        console.error("Geolocation error:", error);
        const message =
          error.code === error.PERMISSION_DENIED
            ? tr("Location access is blocked. Enable location in your browser settings, refresh the page, and try again. You can also click the map to pick a location manually.")
            : error.code === error.POSITION_UNAVAILABLE
              ? tr("Your location is unavailable right now. Move to an open area or pick the spot on the map.")
              : tr("Getting your location timed out. Please try again or pick the spot on the map.");

        setLocationPermissionMessage(message);
        alert(message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
    );
  };

  const previewModal = preview && (
    <div
      className="oweru-media-preview-backdrop"
      role="dialog"
      aria-modal="true"
      onClick={() => setPreview(null)}
      style={{ position: "fixed", inset: 0, zIndex: 1080, background: "rgba(0,0,0,.75)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", maxWidth: "100%", maxHeight: "100%" }}>
        <button type="button" className="btn btn-light btn-sm" aria-label={tr("Close")} onClick={() => setPreview(null)} style={{ position: "absolute", top: "-12px", right: "-12px", borderRadius: "50%", zIndex: 1 }}>
          <i className="bi bi-x-lg" />
        </button>
        {preview.type === "image" ? (
          <img src={preview.src} alt="" style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", borderRadius: "8px", display: "block" }} />
        ) : (
          <video src={preview.src} controls autoPlay style={{ maxWidth: "90vw", maxHeight: "85vh", borderRadius: "8px", display: "block", background: "#000" }} />
        )}
      </div>
    </div>
  );

  if (mode === 'images') {
    return (
      <div>
        <h5 className="mb-1">{tr("Images")}</h5>
        <p className="text-muted mb-4">{tr("Add photos, video and documents for this property.")}</p>

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
          onChange={(e) => {
            const picked = Array.from(e.target.files ?? [])
            if (picked.length) set({ images: [...location.images, ...picked] })
            e.target.value = ""
          }}
        />
      </label>
      {showErrors && location.images.length === 0 && (
        <div className="text-danger small mt-1"><i className="bi bi-exclamation-circle me-1" />{tr("Add at least one image")}</div>
      )}

      {location.images.length > 0 && (
        <ul className="list-group mt-2">
          {location.images.map((img, i) => (
            <li key={`${img.name}-${i}`} className="list-group-item d-flex align-items-center justify-content-between gap-2">
              <span className="text-truncate">
                <i className="bi bi-image me-2" />
                {img.name}
                <small className="text-muted ms-2">{(img.size / 1024 / 1024).toFixed(2)} MB</small>
              </span>
              <span className="d-flex gap-1 flex-shrink-0">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  aria-label={tr("View")}
                  onClick={() => setPreview({ type: "image", src: URL.createObjectURL(img) })}
                >
                  <i className="bi bi-eye" />
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  aria-label={tr("Remove")}
                  onClick={() => set({ images: location.images.filter((_, idx) => idx !== i) })}
                >
                  <i className="bi bi-x-lg" />
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}

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
      {showErrors && !location.videoUrl && (
        <div className="text-danger small mt-1"><i className="bi bi-exclamation-circle me-1" />{tr("A video is required")}</div>
      )}
      {videoUploading && (
        <div className="mb-2">
          <div className="d-flex align-items-center gap-2 small text-muted mb-1">
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
            {videoProgress >= 100 ? tr("Finishing up...") : `${tr("Uploading video")}... ${videoProgress}%`}
          </div>
          <div className="progress" role="progressbar" aria-label={tr("Video upload progress")} aria-valuenow={videoProgress} aria-valuemin={0} aria-valuemax={100}>
            <div className={`progress-bar progress-bar-striped progress-bar-animated${videoProgress > 0 ? '' : ' w-100'}`} style={videoProgress > 0 ? { width: `${videoProgress}%` } : undefined} />
          </div>
        </div>
      )}
      {videoError && <div className="text-danger small mb-2">{videoError}</div>}
      {videoUploading && videoLocalPreview && (
        <video className="oweru-video-preview mb-3" src={videoLocalPreview} muted playsInline preload="metadata" />
      )}
      {location.videoUrl && (
        <ul className="list-group mb-3 mt-2">
          <li className="list-group-item d-flex align-items-center justify-content-between gap-2">
            <span className="text-truncate">
              <i className="bi bi-camera-video me-2" />
              {tr("Video uploaded")}
            </span>
            <span className="d-flex gap-1 flex-shrink-0">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                aria-label={tr("View")}
                onClick={() => setPreview({ type: "video", src: getUploadUrl(location.videoUrl) })}
              >
                <i className="bi bi-eye" />
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                aria-label={tr("Remove")}
                onClick={() => set({ videoUrl: "", videoFileType: "", videoSizeBytes: null })}
              >
                <i className="bi bi-x-lg" />
              </button>
            </span>
          </li>
        </ul>
      )}

      <label className="form-label fw-semibold d-block mt-3">
        {tr("Verified documents")}
      </label>
      <label
        className={`btn btn-outline-secondary btn-sm mb-1 ${videoProgress > 0 && videoProgress < 100 ? 'disabled' : ''}`}
        onClick={(event) => {
          if (videoProgress > 0 && videoProgress < 100) event.preventDefault()
        }}
      >
        <i className="bi bi-paperclip me-1" />
        {location.documents.length > 0
          ? `${location.documents.length} document(s) attached`
            : tr("Attach documents")}
        <input
          type="file"
          multiple
          hidden
          disabled={videoProgress > 0 && videoProgress < 100}
          onChange={(e) => {
            const picked = Array.from(e.target.files ?? [])
            if (picked.length) set({ documents: [...location.documents, ...picked] })
            e.target.value = ""
          }}
        />
      </label>
      <p className="text-muted small mb-0">{tr("Title deed, survey plan, sale agreement — any file type, up to 15 MB each. They upload when the record is saved, and more can be added later.")}</p>
      {showErrors && location.documents.length === 0 && (
        <div className="text-danger small mt-1"><i className="bi bi-exclamation-circle me-1" />{tr("Attach at least one document")}</div>
      )}

      {location.documents.length > 0 && (
        <ul className="list-group mt-2">
          {location.documents.map((doc, i) => (
            <li key={`${doc.name}-${i}`} className="list-group-item d-flex align-items-center justify-content-between gap-2">
              <span className="text-truncate">
                <i className="bi bi-file-earmark me-2" />
                {doc.name}
                <small className="text-muted ms-2">{(doc.size / 1024 / 1024).toFixed(2)} MB</small>
              </span>
              <span className="d-flex gap-1 flex-shrink-0">
                <a
                  className="btn btn-sm btn-outline-secondary"
                  href={URL.createObjectURL(doc)}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={tr("View")}
                >
                  <i className="bi bi-eye" />
                </a>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  aria-label={tr("Remove")}
                  onClick={() => set({ documents: location.documents.filter((_, idx) => idx !== i) })}
                >
                  <i className="bi bi-x-lg" />
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}

      {previewModal}
      </div>
    );
  }

  return (
    <div>
      <h5 className="mb-1">{tr("Location")}</h5>
      <p className="text-muted mb-4">{tr("Region, GPS and photos")}</p>

      {mobilePage !== 1 && (
      <LocationForm location={location} onChange={onChange} regions={regions} districts={districts} wards={wards} showErrors={showErrors} />
      )}

      {mobilePage !== 0 && (<>
      <label className="form-label fw-semibold">{tr("Map")}</label>
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
      <p className="text-muted small mb-1">
        {location.lat && location.lng
          ? `Location set: ${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`
          : "No location set. Click the map, search, or use your location."}
      </p>
      {showErrors && (location.lat === null || location.lng === null) && (
        <div className="text-danger small mb-4"><i className="bi bi-exclamation-circle me-1" />{tr("Pin the location on the map")}</div>
      )}
      {(location.lat !== null && location.lng !== null) && <div className="mb-4" />}

      <label className="form-label fw-semibold d-block">{tr("Description")}</label>
      <div className="d-flex align-items-center gap-2 mb-2">
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
      </>)}
    </div>
  );
}
