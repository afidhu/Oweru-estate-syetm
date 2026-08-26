import type {
  CategoryId, CommercialDetails, DetailsData, HouseDetails, LandDetails,
} from '../../types'
import {
  COMMERCIAL_BUILDING_TYPES, COMMERCIAL_LAND_TYPES, HOUSE_FEATURES, HOUSE_TYPES,
  LAND_FEATURES, LAND_TYPES, SIZE_UNITS, STATUS_OPTIONS,
} from '../../data/categories'

interface DetailsStepProps {
  category: CategoryId
  details: DetailsData
  onChange: (next: DetailsData) => void
}

function FeatureChips({
  options, selected, onToggle,
}: { options: string[]; selected: string[]; onToggle: (v: string) => void }) {
  return (
    <div className="row g-2">
      {options.map((opt) => {
        const checked = selected.includes(opt)
        return (
          <div className="col-6 col-md-4" key={opt}>
            <label className={`oweru-feature-chip ${checked ? 'checked' : ''}`}>
              <input
                type="checkbox"
                className="form-check-input m-0"
                checked={checked}
                onChange={() => onToggle(opt)}
              />
              {opt}
            </label>
          </div>
        )
      })}
    </div>
  )
}

function BrokerOwnerStatus({
  status, broker, owner, onField,
}: {
  status: string
  broker: string
  owner: string
  onField: (field: 'status' | 'broker' | 'owner', value: string) => void
}) {
  return (
    <div className="row g-3 mt-1">
      {/* <div className="col-md-4">
        <label className="form-label fw-semibold">Status</label>
        <select
          className="form-select"
          value={status}
          onChange={(e) => onField('status', e.target.value)}
        >
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div> */}
      <div className="col-md-6">
        <label className="form-label fw-semibold">Broker Info</label> <br />

        <input
          className="form-control"
          placeholder="Whatsapp No (+255)"
          value={broker}
          onChange={(e) => onField('broker', e.target.value)}
        />
      <p></p>
          <input
          className="form-control"
          placeholder="Andika Jina"
          value={broker}
          onChange={(e) => onField('broker', e.target.value)}
        />
        <p></p>

          <input
          className="form-control"
          type='number'
          placeholder="NIDA(optional) "
          value={broker}
          onChange={(e) => onField('broker', e.target.value)}
        />
        <p></p>
          <input
          className="form-control"
          placeholder="TIN NO(optional)"
          type='number'
          value={broker}
          onChange={(e) => onField('broker', e.target.value)}
        />
      </div>

      
      <div className="col-md-6">
        <label className="form-label fw-semibold">Owner Info</label>
        <input
          className="form-control"
          placeholder="Select or type owner name..."
          value={owner}
          onChange={(e) => onField('owner', e.target.value)}
        />
        <p></p>
         <input
          className="form-control"
          placeholder="Whatsapp No (+255)"
          value={broker}
          onChange={(e) => onField('broker', e.target.value)}
        />
        <p></p>
         <input
          className="form-control"
          type='number'
          placeholder="NIDA(optional) "
          value={broker}
          onChange={(e) => onField('broker', e.target.value)}
        />
        <div className="form-text">Who holds title to this property.</div>
      </div>
    </div>
  )
}

export default function DetailsStep({ category, details, onChange }: DetailsStepProps) {
  if (category === 'house-sale') {
    const d = details as HouseDetails
    const set = (patch: Partial<HouseDetails>) => onChange({ ...d, ...patch })

    return (
      <div>
        <h5 className="mb-1">House for Sale</h5>
        <p className="text-muted mb-4">Provide details about the house.</p>

        <label className="form-label fw-semibold">Property title</label>
        <input
          className="form-control mb-3"
          placeholder="e.g. 4 Bedroom House for Sale in Masaki"
          value={d.propertyTitle}
          onChange={(e) => set({ propertyTitle: e.target.value })}
        />

        <div className="row g-3 mb-3">
          <div className="col-md-8">
            <label className="form-label fw-semibold">Sale price (TZS)</label>
            <input
              type="number"
              className="form-control"
              value={d.salePrice}
              onChange={(e) => set({ salePrice: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">Size unit</label>
            <select
              className="form-select"
              value={d.sizeUnit}
              onChange={(e) => set({ sizeUnit: e.target.value })}
            >
              <option value="">--</option>
              {SIZE_UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>

        <label className="form-label fw-semibold">Size</label>
        <input
          className="form-control mb-3"
          value={d.size}
          onChange={(e) => set({ size: e.target.value })}
        />

        <label className="form-label fw-semibold d-block">House type</label>
        <div className="d-flex flex-wrap gap-3 mb-3">
          {HOUSE_TYPES.map((t) => (
            <div className="form-check" key={t}>
              <input
                className="form-check-input"
                type="radio"
                name="houseType"
                id={`ht-${t}`}
                checked={d.houseType === t}
                onChange={() => set({ houseType: t })}
              />
              <label className="form-check-label" htmlFor={`ht-${t}`}>{t}</label>
            </div>
          ))}
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Bedrooms</label>
            <input
              type="number"
              className="form-control"
              value={d.bedrooms}
              onChange={(e) => set({ bedrooms: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Bathrooms</label>
            <input
              type="number"
              className="form-control"
              value={d.bathrooms}
              onChange={(e) => set({ bathrooms: e.target.value })}
            />
          </div>
        </div>

        <label className="form-label fw-semibold d-block">Features &amp; amenities</label>
        <FeatureChips
          options={HOUSE_FEATURES}
          selected={d.features}
          onToggle={(v) => set({
            features: d.features.includes(v)
              ? d.features.filter((f) => f !== v)
              : [...d.features, v],
          })}
        />

        <BrokerOwnerStatus
          status={d.status}
          broker={d.broker}
          owner={d.owner}
          onField={(field, value) => set({ [field]: value } as Partial<HouseDetails>)}
        />
      </div>
    )
  }

  if (category === 'land-sale') {
    const d = details as LandDetails
    const set = (patch: Partial<LandDetails>) => onChange({ ...d, ...patch })

    return (
      <div>
        <h5 className="mb-1">Land for Sale</h5>
        <p className="text-muted mb-4">Provide details about the land.</p>

        <label className="form-label fw-semibold">Property title</label>
        <input
          className="form-control mb-3"
          placeholder="e.g. 2-Acre Plot for Sale in Bagamoyo"
          value={d.propertyTitle}
          onChange={(e) => set({ propertyTitle: e.target.value })}
        />

        <div className="row g-3 mb-3">
          <div className="col-md-8">
            <label className="form-label fw-semibold">Sale price (TZS)</label>
            <input
              type="number"
              className="form-control"
              value={d.salePrice}
              onChange={(e) => set({ salePrice: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">Size unit</label>
            <select
              className="form-select"
              value={d.sizeUnit}
              onChange={(e) => set({ sizeUnit: e.target.value })}
            >
              <option value="">--</option>
              {SIZE_UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>

        <label className="form-label fw-semibold">Size</label>
        <input
          className="form-control mb-3"
          value={d.size}
          onChange={(e) => set({ size: e.target.value })}
        />

        <label className="form-label fw-semibold d-block">Land type</label>
        <div className="d-flex flex-wrap gap-3 mb-3">
          {LAND_TYPES.map((t) => (
            <div className="form-check" key={t}>
              <input
                className="form-check-input"
                type="radio"
                name="landType"
                id={`lt-${t}`}
                checked={d.landType === t}
                onChange={() => set({ landType: t })}
              />
              <label className="form-check-label" htmlFor={`lt-${t}`}>{t}</label>
            </div>
          ))}
        </div>

        <label className="form-label fw-semibold d-block">Features &amp; amenities</label>
        <FeatureChips
          options={LAND_FEATURES}
          selected={d.features}
          onToggle={(v) => set({
            features: d.features.includes(v)
              ? d.features.filter((f) => f !== v)
              : [...d.features, v],
          })}
        />

        <BrokerOwnerStatus
          status={d.status}
          broker={d.broker}
          owner={d.owner}
          onField={(field, value) => set({ [field]: value } as Partial<LandDetails>)}
        />
      </div>
    )
  }

  // commercial-sale
  const d = details as CommercialDetails
  const set = (patch: Partial<CommercialDetails>) => onChange({ ...d, ...patch })

  return (
    <div>
      <h5 className="mb-1">Commercial Area for Sale</h5>
      <p className="text-muted mb-4">Provide details about the property.</p>

      <label className="form-label fw-semibold">Property title</label>
      <input
        className="form-control mb-3"
        placeholder="e.g. Office Building for Sale in Upanga"
        value={d.propertyTitle}
        onChange={(e) => set({ propertyTitle: e.target.value })}
      />

      <div className="row g-3 mb-3">
        <div className="col-md-8">
          <label className="form-label fw-semibold">Sale price (TZS)</label>
          <input
            type="number"
            className="form-control"
            value={d.salePrice}
            onChange={(e) => set({ salePrice: e.target.value })}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label fw-semibold">Size unit</label>
          <select
            className="form-select"
            value={d.sizeUnit}
            onChange={(e) => set({ sizeUnit: e.target.value })}
          >
            <option value="">--</option>
            {SIZE_UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
      </div>

      <label className="form-label fw-semibold">Size</label>
      <input
        className="form-control mb-3"
        value={d.size}
        onChange={(e) => set({ size: e.target.value })}
      />

      <label className="form-label fw-semibold d-block">Commercial property type</label>
      <p className="text-muted small mb-2">Buildings and open land plots show different amenities.</p>

      <div className="mb-2 text-muted small fw-semibold text-uppercase">Commercial Building</div>
      <div className="d-flex flex-wrap gap-2 mb-3">
        {COMMERCIAL_BUILDING_TYPES.map((t) => (
          <button
            type="button"
            key={t}
            className={`btn btn-sm ${d.commercialType === t ? 'btn-oweru' : 'btn-outline-secondary'}`}
            onClick={() => set({ commercialType: t })}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mb-2 text-muted small fw-semibold text-uppercase">Commercial Land</div>
      <div className="d-flex flex-wrap gap-2 mb-3">
        {COMMERCIAL_LAND_TYPES.map((t) => (
          <button
            type="button"
            key={t}
            className={`btn btn-sm ${d.commercialType === t ? 'btn-oweru' : 'btn-outline-secondary'}`}
            onClick={() => set({ commercialType: t })}
          >
            {t}
          </button>
        ))}
      </div>

      <BrokerOwnerStatus
        status={d.status}
        broker={d.broker}
        owner={d.owner}
        onField={(field, value) => set({ [field]: value } as Partial<CommercialDetails>)}
      />
    </div>
  )
}
