import React, { useState } from 'react';
import { tanzaniaData } from '../../data/tanzaniaData';


export default function LocationForm() {
  // Your parent component state layout wrapper
  const [location, setLocation] = useState({
    region: "",
    district: "",
    ward: "",
    exactLocation: ""
  });

  // Local helper state required to track selected district IDs in your template layout
  const [selectedDistrict, setSelectedDistrict] = useState("");

  // Imitating your set callback modifier
  const set = (updatedFields: Partial<typeof location>) => {
    setLocation((prev) => {
      const nextState = { ...prev, ...updatedFields };
      return nextState;
    });
  };

  // --- START OF INTEGRATION DERIVED STATES ---
  
  // 1. Get region arrays straight from tree data top-level keys
  const allRegions = Object.keys(tanzaniaData);

  // 2. Get districts list dynamically matching the parent choice
  const allDistricts = location.region
    ? tanzaniaData[location.region as keyof typeof tanzaniaData]?.districts || []
    : [];

  // 3. Extract the active district object match to load its corresponding wards list
  const activeDistrictObj = allDistricts.find((item) => item.id.toString() === selectedDistrict);
  const availableWards = activeDistrictObj ? activeDistrictObj.wards : [];

  // --- END OF INTEGRATION DERIVED STATES ---

  return (
    <div className="region-district-ward">
      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="form-label fw-semibold">Region</label>
          <select
            className="form-select"
            value={location.region}
            onChange={(e) => {
              // Clears child entities when a parent changes to avoid orphaned selection submissions
              set({ region: e.target.value, district: "", ward: "" });
              setSelectedDistrict(""); 
            }}
          >
            <option value="">Select a region...</option>
            {allRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">District</label>
          <select
            className="form-select"
            id="district-dropdown"
            value={selectedDistrict}
            onChange={(e) => {
              const selectedId = e.target.value;
              setSelectedDistrict(selectedId);
              
              // Find matching district text to feed the parent form state requirement
              const match = allDistricts.find((d) => d.id.toString() === selectedId);
              set({ district: match ? match.title : "", ward: "" });
            }}
          >
            <option value="" disabled={!!location.region}>
              {location.region
                ? "Select a district..."
                : "Choose a region first"}
            </option>
            {allDistricts.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="form-label fw-semibold">Ward / Area</label>
          <select
            className="form-select"
            value={location.ward}
            disabled={!location.district}
            onChange={(e) => set({ ward: e.target.value })}
          >
            <option value="">
              {location.district
                ? "Select a ward..."
                : "Choose a district first"}
            </option>
            {availableWards.map((ward) => (
              <option key={ward} value={ward}>
                {ward}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Exact location</label>
          <input
            className="form-control"
            value={location.exactLocation}
            onChange={(e) => set({ exactLocation: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
