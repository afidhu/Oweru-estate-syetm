import { useEffect, useState } from 'react'
import { houseForSaleApi, lookupApi } from '../../services/api'
import type {
  CategoryId, CommercialDetails, DetailsData, HouseDetails, LandDetails, PersonDetails,
} from '../../types'
import { useLanguage } from '../../i18n'
import ResponsiveSelect from '../shared/ResponsiveSelect'
const HOUSE_FEATURES = ['Road Access', 'Electricity', 'Water Supply', 'Borehole', 'Parking', 'Security', 'CCTV', 'Fence', 'Furnished', 'Fitted Kitchen', 'Outside Kitchen', 'Dining Room', 'Sitting Room', 'En-suite Bedrooms', 'Balcony', 'Tiled Floor', 'Store Room', 'Garden', 'Swimming Pool', 'Servant Quarter', 'Generator', 'Air Conditioning', 'Other']
const SIZE_UNITS = ['sqm', 'acre', 'plot', 'metre', 'feet']
const SIZE_UNIT_LABELS: Record<string, string> = {
  'sqm': 'sqm',
  'acre': 'acre',
  'plot': 'plot',
  'metre': 'metre',
  'feet': 'feet',
}
const LAND_TYPES = ['Residential', 'Commercial', 'Agricultural', 'Mixed Use']
const LAND_FEATURES = ['Road Access', 'Electricity', 'Water Supply', 'Borehole', 'Road Frontage', 'Tarmac Road Access', 'Corner Plot', 'Fence', 'Surveyed', 'Ready for Development', 'Closer to CBD', 'Other']
const COMMERCIAL_FEATURES = ['Road Access', 'Electricity', 'Water Supply', 'Borehole', 'Parking', 'Elevator', 'Generator', 'Fiber Internet', 'Air Conditioning', 'CCTV', 'Security Guards', 'Wheelchair Accessible', 'Fire Safety System', 'Conference Room', 'Loading Bay', 'Closer to CBD', 'Other']
const COMMERCIAL_BUILDING_TYPES = ['Office Building', 'Retail Shop', 'Showroom', 'Warehouse', 'Factory', 'Garage / Workshop', 'Hotel', 'Guest House', 'Restaurant Space', 'Bar / Lounge']
const COMMERCIAL_LAND_TYPES = ['Commercial Plot', 'Industrial Plot', 'Yard', 'Car Wash', 'Petrol Station', 'Vehicle Parking Lot']

interface DetailsStepProps {
  category: CategoryId
  details: DetailsData
  onChange: (next: DetailsData) => void
}

function FeatureChips({
  options, selected, onToggle, onAddCustom, onRemoveCustom,
}: {
  options: string[]
  selected: string[]
  onToggle: (v: string) => void
  onAddCustom: (v: string) => void
  onRemoveCustom: (v: string) => void
}) {
  const { tr } = useLanguage()
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [customValue, setCustomValue] = useState('')
  const customFeatures = selected.filter((f) => !options.includes(f))

  const addCustom = () => {
    const value = customValue.trim()
    if (!value) return
    onAddCustom(value)
    setCustomValue('')
  }

  return (
    <div>
      <div className="row g-2">
        {options.map((opt) => {
          const isOther = opt === 'Other'
          const checked = isOther ? showCustomInput : selected.includes(opt)
          return (
            <div className="col-6 col-md-4" key={opt}>
              <label className={`oweru-feature-chip ${checked ? 'checked' : ''}`}>
                <input
                  type="checkbox"
                  className="form-check-input m-0"
                  checked={checked}
                  onChange={() => isOther ? setShowCustomInput((prev) => !prev) : onToggle(opt)}
                />
                {tr(opt)}
              </label>
            </div>
          )
        })}
      </div>

      {showCustomInput && (
        <div className="d-flex gap-2 mt-2">
          <input
            className="form-control"
            placeholder={tr('Write a feature...')}
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addCustom()
              }
            }}
          />
          <button type="button" className="btn btn-oweru" onClick={addCustom}>
            {tr('Add')}
          </button>
        </div>
      )}

      {customFeatures.length > 0 && (
        <div className="d-flex flex-wrap gap-2 mt-2">
          {customFeatures.map((feature) => (
            <span className="oweru-feature-chip checked" key={feature}>
              {feature}
              <button
                type="button"
                className="btn-close btn-sm"
                aria-label={tr('Remove')}
                onClick={() => onRemoveCustom(feature)}
              />
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function BrokerOwnerStatus({
  status, broker, owner, onField,
}: {
  status: string
  broker: PersonDetails
  owner: PersonDetails
  onField: (field: 'status' | 'broker' | 'owner', value: string | PersonDetails) => void
}) {
  const { tr } = useLanguage()
  const personFields = (person: PersonDetails, field: 'broker' | 'owner') => (
    <>
      <input className="form-control" placeholder={tr('Full name')} value={person.name} required onChange={(e) => onField(field, { ...person, name: e.target.value })} />
      <input className="form-control mt-2" placeholder={tr('WhatsApp phone number (+255)')} value={person.phone} required onChange={(e) => onField(field, { ...person, phone: e.target.value })} />
      <input className="form-control mt-2" placeholder={tr('NIDA (optional)')} value={person.nid} onChange={(e) => onField(field, { ...person, nid: e.target.value })} />
      <input className="form-control mt-2" placeholder={tr('TIN (optional)')} value={person.tin} onChange={(e) => onField(field, { ...person, tin: e.target.value })} />
    </>
  )
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
        <label className="form-label fw-semibold">{tr('Broker Info')}</label> <br />

        {personFields(broker, 'broker')}
      </div>

      
      <div className="col-md-6">
        <label className="form-label fw-semibold">{tr('Owner Info')}</label>
        {personFields(owner, 'owner')}
        <div className="form-text">{tr('Who holds title to this property.')}</div>
      </div>
    </div>
  )
}

export default function DetailsStep({ category, details, onChange }: DetailsStepProps) {
  const { tr } = useLanguage()
  const [houseTypes, setHouseTypes] = useState<{ id: string; name: string }[]>([])
  const [landTypes, setLandTypes] = useState<{ id: string; name: string }[]>([])
  const [propertyTypes, setPropertyTypes] = useState<{ id: string; name: string }[]>([])

  useEffect(() => {
    Promise.all([houseForSaleApi.getHouseTypes(), lookupApi.getLandTypes(), lookupApi.getPropertyTypes()])
      .then(([nextHouseTypes, nextLandTypes, nextPropertyTypes]) => {
        setHouseTypes(nextHouseTypes)
        setLandTypes(nextLandTypes)
        setPropertyTypes(nextPropertyTypes)
      })
      .catch((error) => console.error('Unable to load house types:', error))
  }, [])

  if (category === 'house-sale') {
    const d = details as HouseDetails
    const set = (patch: Partial<HouseDetails>) => onChange({ ...d, ...patch })

    return (
      <div>
        <h5 className="mb-1">{tr('House for Sale')}</h5>
        <p className="text-muted mb-4">{tr('Provide details about the house.')}</p>

        <label className="form-label fw-semibold">{tr('Property title')}</label>
        <input
          className="form-control mb-3"
          placeholder="e.g. 4 Bedroom House for Sale in Masaki"
          value={d.propertyTitle}
          onChange={(e) => set({ propertyTitle: e.target.value })}
        />

        <div className="row g-3 mb-3">
          <div className="col-md-8">
            <label className="form-label fw-semibold">{tr('Sale price (TZS)')}</label>
            <input
              type="number"
              className="form-control"
              value={d.salePrice}
              onChange={(e) => set({ salePrice: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">{tr('Size unit')}</label>
            <ResponsiveSelect
              value={d.sizeUnit}
              placeholder="--"
              options={SIZE_UNITS}
              getLabel={(unit) => tr(SIZE_UNIT_LABELS[unit])}
              onChange={(sizeUnit) => set({ sizeUnit })}
            />
          </div>
        </div>

        <label className="form-label fw-semibold">{tr('Size')}</label>
        <input
          className="form-control mb-3"
          value={d.size}
          onChange={(e) => set({ size: e.target.value })}
        />

        <label className="form-label fw-semibold d-block">{tr('House type')}</label>
        <div className="d-flex flex-wrap gap-3 mb-3">
          {houseTypes.map((houseType) => (
            <div className="form-check" key={houseType.id}>
              <input
                className="form-check-input"
                type="radio"
                name="houseType"
                id={`ht-${houseType.id}`}
                checked={d.houseType === houseType.id}
                onChange={() => set({ houseType: houseType.id })}
              />
              <label className="form-check-label" htmlFor={`ht-${houseType.id}`}>{tr(houseType.name)}</label>
            </div>
          ))}
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold">{tr('Bedrooms')}</label>
            <input
              type="number"
              className="form-control"
              value={d.bedrooms}
              onChange={(e) => set({ bedrooms: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">{tr('Bathrooms')}</label>
            <input
              type="number"
              className="form-control"
              value={d.bathrooms}
              onChange={(e) => set({ bathrooms: e.target.value })}
            />
          </div>
        </div>

        <label className="form-label fw-semibold d-block">{tr('Features & amenities')}</label>
        <FeatureChips
          options={HOUSE_FEATURES}
          selected={d.features}
          onToggle={(v) => set({
            features: d.features.includes(v)
              ? d.features.filter((f) => f !== v)
              : [...d.features, v],
          })}
          onAddCustom={(v) => set({ features: d.features.includes(v) ? d.features : [...d.features, v] })}
          onRemoveCustom={(v) => set({ features: d.features.filter((f) => f !== v) })}
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
        <h5 className="mb-1">{tr('Land for Sale')}</h5>
        <p className="text-muted mb-4">{tr('Provide details about the land.')}</p>

        <label className="form-label fw-semibold">{tr('Property title')}</label>
        <input
          className="form-control mb-3"
          placeholder="e.g. 2-Acre Plot for Sale in Bagamoyo"
          value={d.propertyTitle}
          onChange={(e) => set({ propertyTitle: e.target.value })}
        />

        <div className="row g-3 mb-3">
          <div className="col-md-8">
            <label className="form-label fw-semibold">{tr('Sale price (TZS)')}</label>
            <input
              type="number"
              className="form-control"
              value={d.salePrice}
              onChange={(e) => set({ salePrice: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">{tr('Size unit')}</label>
            <ResponsiveSelect
              value={d.sizeUnit}
              placeholder="--"
              options={SIZE_UNITS}
              getLabel={(unit) => tr(SIZE_UNIT_LABELS[unit])}
              onChange={(sizeUnit) => set({ sizeUnit })}
            />
          </div>
        </div>

        <label className="form-label fw-semibold">{tr('Size')}</label>
        <input
          className="form-control mb-3"
          value={d.size}
          onChange={(e) => set({ size: e.target.value })}
        />

        <label className="form-label fw-semibold d-block">{tr('Land type')}</label>
        <div className="d-flex flex-wrap gap-3 mb-3">
          {landTypes.map((landType) => (
            <div className="form-check" key={landType.id}>
              <input
                className="form-check-input"
                type="radio"
                name="landType"
                id={`lt-${landType.id}`}
                checked={d.landType === landType.id}
                onChange={() => set({ landType: landType.id })}
              />
              <label className="form-check-label" htmlFor={`lt-${landType.id}`}>{tr(landType.name)}</label>
            </div>
          ))}
        </div>

        <label className="form-label fw-semibold d-block">{tr('Features & amenities')}</label>
        <FeatureChips
          options={LAND_FEATURES}
          selected={d.features}
          onToggle={(v) => set({
            features: d.features.includes(v)
              ? d.features.filter((f) => f !== v)
              : [...d.features, v],
          })}
          onAddCustom={(v) => set({ features: d.features.includes(v) ? d.features : [...d.features, v] })}
          onRemoveCustom={(v) => set({ features: d.features.filter((f) => f !== v) })}
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
      <h5 className="mb-1">{tr('Commercial Area for Sale')}</h5>
      <p className="text-muted mb-4">{tr('Provide details about the property.')}</p>

      <label className="form-label fw-semibold">{tr('Property title')}</label>
      <input
        className="form-control mb-3"
        placeholder="e.g. Office Building for Sale in Upanga"
        value={d.propertyTitle}
        onChange={(e) => set({ propertyTitle: e.target.value })}
      />

      <div className="row g-3 mb-3">
        <div className="col-md-8">
          <label className="form-label fw-semibold">{tr('Sale price (TZS)')}</label>
          <input
            type="number"
            className="form-control"
            value={d.salePrice}
            onChange={(e) => set({ salePrice: e.target.value })}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label fw-semibold">{tr('Size unit')}</label>
          <ResponsiveSelect
            value={d.sizeUnit}
            placeholder="--"
            options={SIZE_UNITS}
            getLabel={(unit) => tr(SIZE_UNIT_LABELS[unit])}
            onChange={(sizeUnit) => set({ sizeUnit })}
          />
        </div>
      </div>

      <label className="form-label fw-semibold">{tr('Size')}</label>
      <input
        className="form-control mb-3"
        value={d.size}
        onChange={(e) => set({ size: e.target.value })}
      />

      <label className="form-label fw-semibold d-block">{tr('Commercial property type')}</label>
      <p className="text-muted small mb-2">{tr('Buildings and open land plots show different amenities.')}</p>

      {/* <div className="mb-2 text-muted small fw-semibold text-uppercase">Commercial Building</div>
      <div className="d-flex flex-wrap gap-2 mb-3">
        {propertyTypes.map((propertyType) => (
          <button
            type="button"
            key={propertyType.id}
            className={`btn btn-sm ${d.commercialType === propertyType.id ? 'btn-oweru' : 'btn-outline-secondary'}`}
            onClick={() => set({ commercialType: propertyType.id })}
          >
            {propertyType.name}
          </button>
        ))}
      </div> */}

      <div className="mb-2 text-muted small fw-semibold text-uppercase">{tr('Commercial Land & Building')}</div>
      <div className="d-flex flex-wrap gap-2 mb-3">
        {propertyTypes.map((propertyType) => (
          <button
            type="button"
            key={`land-${propertyType.id}`}
            className={`btn btn-sm ${d.commercialType === propertyType.id ? 'btn-oweru' : 'btn-outline-secondary'}`}
            onClick={() => set({ commercialType: propertyType.id })}
          >
            {tr(propertyType.name)}
          </button>
        ))}
      </div>

      <label className="form-label fw-semibold d-block">{tr('Features & amenities')}</label>
      <FeatureChips
        options={COMMERCIAL_FEATURES}
        selected={d.features}
        onToggle={(v) => set({
          features: d.features.includes(v)
            ? d.features.filter((f) => f !== v)
            : [...d.features, v],
        })}
        onAddCustom={(v) => set({ features: d.features.includes(v) ? d.features : [...d.features, v] })}
        onRemoveCustom={(v) => set({ features: d.features.filter((f) => f !== v) })}
      />

      <BrokerOwnerStatus
        status={d.status}
        broker={d.broker}
        owner={d.owner}
        onField={(field, value) => set({ [field]: value } as Partial<CommercialDetails>)}
      />
    </div>
  )
}
