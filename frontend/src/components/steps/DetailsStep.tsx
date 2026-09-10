import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { houseForSaleApi, lookupApi } from '../../services/api'
import type {
  CategoryId, CommercialDetails, DetailsData, HouseDetails, LandDetails, PersonDetails,
} from '../../types'
import { useLanguage } from '../../i18n'
import ResponsiveSelect from '../shared/ResponsiveSelect'
const HOUSE_FEATURES = ['Road Access', 'Electricity', 'Water Supply', 'Borehole', 'Parking', 'Security', 'CCTV', 'Fence', 'Furnished', 'Fitted Kitchen', 'Outside Kitchen', 'Dining Room', 'Sitting Room', 'En-suite Bedrooms', 'Balcony', 'Tiled Floor', 'Store Room', 'Garden', 'Swimming Pool', 'Servant Quarter', 'Generator', 'Air Conditioning', 'Other']
const SIZE_UNITS = ['sqm', 'acre', 'metre', 'feet']
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
const COMMERCIAL_LAND_FEATURES = ['Road Access', 'Electricity', 'Water Supply', 'Borehole', 'Commercial Zoning', 'Road Frontage', 'Tarmac Road Access', 'Highway Access', 'Corner Plot', 'Fence', 'Surveyed', 'Ready for Development', 'Closer to CBD', 'Other']
const COMMERCIAL_BUILDING_TYPES = ['Office Building', 'Retail Shop', 'Showroom', 'Warehouse', 'Factory', 'Garage / Workshop', 'Hotel', 'Guest House', 'Restaurant Space', 'Bar / Lounge']
const COMMERCIAL_LAND_TYPES = ['Commercial Plot', 'Industrial Plot', 'Yard', 'Car Wash', 'Petrol Station', 'Vehicle Parking Lot']

const digitsOnly = (raw: string) => raw.replace(/\D/g, '')
const groupThousands = (raw: string) => {
  const d = digitsOnly(raw)
  return d ? Number(d).toLocaleString('en-US') : ''
}

function ErrorText({ show, message }: { show: boolean; message: string }) {
  if (!show) return null
  return (
    <div className="text-danger small mt-1">
      <i className="bi bi-exclamation-circle me-1" />
      {message}
    </div>
  )
}

function SizeField({ unit, value, onChange }: { unit: string; value: string; onChange: (v: string) => void }) {
  const { tr } = useLanguage()
  const dimensional = unit === 'metre' || unit === 'feet'
  if (dimensional) {
    const [w = '', l = ''] = value.split(/\s*[x×]\s*/i)
    const emit = (nw: string, nl: string) => onChange(nw || nl ? `${nw} x ${nl}` : '')
    return (
      <div className="d-flex align-items-center gap-2 mb-3" style={{ maxWidth: 320 }}>
        <input type="number" min="0" className="form-control" placeholder={tr('Width')} value={w} onChange={(e) => emit(e.target.value, l)} />
        <span className="fw-semibold">×</span>
        <input type="number" min="0" className="form-control" placeholder={tr('Length')} value={l} onChange={(e) => emit(w, e.target.value)} />
        <span className="text-muted text-nowrap">{tr(unit)}</span>
      </div>
    )
  }
  return (
    <input className="form-control mb-3" placeholder={tr('e.g. 3 x 4')} value={value} onChange={(e) => onChange(e.target.value)} />
  )
}

interface DetailsStepProps {
  category: CategoryId
  details: DetailsData
  onChange: (next: DetailsData) => void
  showErrors?: boolean
  /** Mobile-only paging: null = show everything (desktop); 0 = base fields; 1 = split-off section. */
  mobilePage?: 0 | 1 | null
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
  status, broker, owner, onField, showErrors = false,
}: {
  status: string
  broker: PersonDetails
  owner: PersonDetails
  onField: (field: 'status' | 'broker' | 'owner', value: string | PersonDetails) => void
  showErrors?: boolean
}) {
  const { tr } = useLanguage()
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const mark = (k: string) => setTouched((t) => ({ ...t, [k]: true }))
  const personFields = (person: PersonDetails, field: 'broker' | 'owner') => {
    const nameEmpty = !person.name.trim()
    const phoneEmpty = !person.phone.trim()
    const nameErr = Boolean((showErrors || touched[`${field}.name`]) && nameEmpty)
    const phoneErr = Boolean((showErrors || touched[`${field}.phone`]) && phoneEmpty)
    return (
      <>
        <input className={`form-control ${nameErr ? 'is-invalid' : ''}`} placeholder={tr('Full name')} value={person.name} required onBlur={() => mark(`${field}.name`)} onChange={(e) => onField(field, { ...person, name: e.target.value })} />
        <ErrorText show={nameErr} message={tr('Full name is required')} />
        <input className={`form-control mt-2 ${phoneErr ? 'is-invalid' : ''}`} placeholder={tr('WhatsApp phone number (+255)')} value={person.phone} required onBlur={() => mark(`${field}.phone`)} onChange={(e) => onField(field, { ...person, phone: e.target.value })} />
        <ErrorText show={phoneErr} message={tr('Phone number is required')} />
        <input className="form-control mt-2" placeholder={tr('NIDA (optional)')} value={person.nid} onChange={(e) => onField(field, { ...person, nid: e.target.value })} />
        <input className="form-control mt-2" placeholder={tr('TIN (optional)')} value={person.tin} onChange={(e) => onField(field, { ...person, tin: e.target.value })} />
      </>
    )
  }
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
        <label className="form-label fw-semibold">{tr('Broker')} <span className="text-danger">*</span></label> <br />

        {personFields(broker, 'broker')}
      </div>

      
      <div className="col-md-6">
        <label className="form-label fw-semibold">{tr('Owner')} <span className="text-danger">*</span></label>
        {personFields(owner, 'owner')}
        <div className="form-text">{tr('Who holds title to this property.')}</div>
      </div>
    </div>
  )
}

export function BrokerOwnerStep({ category, details, onChange, showErrors = false }: DetailsStepProps) {
  const { tr } = useLanguage()
  const set = (patch: Partial<DetailsData>) => onChange({ ...details, ...patch })

  if (category === 'house-sale') {
    const d = details as HouseDetails
    return (
      <div>
        <h5 className="mb-1">{tr('Broker & Owner')}</h5>
        <p className="text-muted mb-3">{tr('Who holds title to this property.')}</p>
        <BrokerOwnerStatus showErrors={showErrors} status={d.status} broker={d.broker} owner={d.owner} onField={(field, value) => set({ [field]: value } as Partial<HouseDetails>)} />
      </div>
    )
  }

  if (category === 'land-sale') {
    const d = details as LandDetails
    return (
      <div>
        <h5 className="mb-1">{tr('Broker & Owner')}</h5>
        <p className="text-muted mb-3">{tr('Who holds title to this property.')}</p>
        <BrokerOwnerStatus showErrors={showErrors} status={d.status} broker={d.broker} owner={d.owner} onField={(field, value) => set({ [field]: value } as Partial<LandDetails>)} />
      </div>
    )
  }

  const d = details as CommercialDetails
  return (
    <div>
      <h5 className="mb-1">{tr('Broker & Owner')}</h5>
      <p className="text-muted mb-3">{tr('Who holds title to this property.')}</p>
      <BrokerOwnerStatus showErrors={showErrors} status={d.status} broker={d.broker} owner={d.owner} onField={(field, value) => set({ [field]: value } as Partial<CommercialDetails>)} />
    </div>
  )
}

export function FeaturesStep({ category, details, onChange }: DetailsStepProps) {
  const { tr } = useLanguage()
  const { data: propertyTypes = [] } = useQuery<{ id: string; name: string }[]>({ queryKey: ['commercial-property-types'], queryFn: lookupApi.getPropertyTypes })
  const set = (patch: Partial<DetailsData>) => onChange({ ...details, ...patch } as DetailsData)
  const features = details.features

  let options: string[]
  if (category === 'house-sale') options = HOUSE_FEATURES
  else if (category === 'land-sale') options = LAND_FEATURES
  else {
    const selName = propertyTypes.find((p) => p.id === (details as CommercialDetails).commercialType)?.name
    options = selName && COMMERCIAL_LAND_TYPES.includes(selName) ? COMMERCIAL_LAND_FEATURES : COMMERCIAL_FEATURES
  }

  return (
    <div>
      <h5 className="mb-1">{tr('Features & amenities')}</h5>
      <p className="text-muted mb-4">{tr('Select the features this property has.')}</p>
      <FeatureChips
        options={options}
        selected={features}
        onToggle={(v) => set({ features: features.includes(v) ? features.filter((f) => f !== v) : [...features, v] })}
        onAddCustom={(v) => set({ features: features.includes(v) ? features : [...features, v] })}
        onRemoveCustom={(v) => set({ features: features.filter((f) => f !== v) })}
      />
    </div>
  )
}

export default function DetailsStep({ category, details, onChange, showErrors = false, mobilePage = null }: DetailsStepProps) {
  const { tr } = useLanguage()
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const mark = (k: string) => setTouched((t) => ({ ...t, [k]: true }))
  const invalid = (k: string, empty: boolean) => ((showErrors || touched[k]) && empty ? 'is-invalid' : '')
  const err = (k: string, empty: boolean) => Boolean((showErrors || touched[k]) && empty)
  const started = showErrors || Object.keys(touched).length > 0
  const { data: houseTypes = [] } = useQuery<{ id: string; name: string }[]>({ queryKey: ['house-types'], queryFn: houseForSaleApi.getHouseTypes })
  const { data: landTypes = [] } = useQuery<{ id: string; name: string }[]>({ queryKey: ['land-types'], queryFn: lookupApi.getLandTypes })
  const { data: propertyTypes = [] } = useQuery<{ id: string; name: string }[]>({ queryKey: ['commercial-property-types'], queryFn: lookupApi.getPropertyTypes })

  if (category === 'house-sale') {
    const d = details as HouseDetails
    const set = (patch: Partial<HouseDetails>) => onChange({ ...d, ...patch })

    return (
      <div>
        <h5 className="mb-1">{tr('Property details')}</h5>
        <p className="text-muted mb-4">{tr('Provide details about the house.')}</p>

        <label className="form-label fw-semibold">{tr('Property title')} <span className="text-danger">*</span></label>
        <input
          className={`form-control mb-2 ${invalid('propertyTitle', !d.propertyTitle.trim())}`}
          placeholder="e.g. 4 Bedroom House for Sale in Masaki"
          value={d.propertyTitle}
          onBlur={() => mark('propertyTitle')}
          onChange={(e) => set({ propertyTitle: e.target.value })}
        />
        <ErrorText show={err('propertyTitle', !d.propertyTitle.trim())} message={tr('Property title is required')} />

        <div className="row g-3 mb-3">
          <div className="col-md-8">
            <label className="form-label fw-semibold">{tr('Sale price (TZS)')} <span className="text-danger">*</span></label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="e.g. 1,000,000"
              className={`form-control ${invalid('salePrice', !d.salePrice)}`}
              value={groupThousands(d.salePrice)}
              onBlur={() => mark('salePrice')}
              onChange={(e) => set({ salePrice: digitsOnly(e.target.value) })}
            />
            <ErrorText show={err('salePrice', !d.salePrice)} message={tr('Sale price is required')} />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">{tr('Size unit')} <span className="text-danger">*</span></label>
            <ResponsiveSelect
              value={d.sizeUnit}
              placeholder="--"
              options={SIZE_UNITS}
              getLabel={(unit) => tr(SIZE_UNIT_LABELS[unit])}
              onChange={(sizeUnit) => set({ sizeUnit })}
            />
            <ErrorText show={started && !d.sizeUnit} message={tr('Size unit is required')} />
          </div>
        </div>

        <label className="form-label fw-semibold d-block">{tr('Size')}</label>
        <SizeField unit={d.sizeUnit} value={d.size} onChange={(size) => set({ size })} />

        <label className="form-label fw-semibold d-block">{tr('House type')} <span className="text-danger">*</span></label>
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
        <ErrorText show={started && !d.houseType} message={tr('Please select a house type')} />

        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold">{tr('Bedrooms')}</label>
            <input
              type="number"
              className="form-control"
              placeholder="e.g. 3"
              value={d.bedrooms}
              onChange={(e) => set({ bedrooms: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">{tr('Bathrooms')}</label>
            <input
              type="number"
              className="form-control"
              placeholder="e.g. 2"
              value={d.bathrooms}
              onChange={(e) => set({ bathrooms: e.target.value })}
            />
          </div>
        </div>

      </div>
    )
  }

  if (category === 'land-sale') {
    const d = details as LandDetails
    const set = (patch: Partial<LandDetails>) => onChange({ ...d, ...patch })

    return (
      <div>
        <h5 className="mb-1">{tr('Property details')}</h5>
        <p className="text-muted mb-4">{tr('Provide details about the land.')}</p>

        <label className="form-label fw-semibold">{tr('Property title')} <span className="text-danger">*</span></label>
        <input
          className={`form-control mb-2 ${invalid('propertyTitle', !d.propertyTitle.trim())}`}
          placeholder="e.g. 2-Acre Plot for Sale in Bagamoyo"
          value={d.propertyTitle}
          onBlur={() => mark('propertyTitle')}
          onChange={(e) => set({ propertyTitle: e.target.value })}
        />
        <ErrorText show={err('propertyTitle', !d.propertyTitle.trim())} message={tr('Property title is required')} />

        <div className="row g-3 mb-3">
          <div className="col-md-8">
            <label className="form-label fw-semibold">{tr('Sale price (TZS)')} <span className="text-danger">*</span></label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="e.g. 1,000,000"
              className={`form-control ${invalid('salePrice', !d.salePrice)}`}
              value={groupThousands(d.salePrice)}
              onBlur={() => mark('salePrice')}
              onChange={(e) => set({ salePrice: digitsOnly(e.target.value) })}
            />
            <ErrorText show={err('salePrice', !d.salePrice)} message={tr('Sale price is required')} />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">{tr('Size unit')} <span className="text-danger">*</span></label>
            <ResponsiveSelect
              value={d.sizeUnit}
              placeholder="--"
              options={SIZE_UNITS}
              getLabel={(unit) => tr(SIZE_UNIT_LABELS[unit])}
              onChange={(sizeUnit) => set({ sizeUnit })}
            />
            <ErrorText show={started && !d.sizeUnit} message={tr('Size unit is required')} />
          </div>
        </div>

        <label className="form-label fw-semibold d-block">{tr('Size')}</label>
        <SizeField unit={d.sizeUnit} value={d.size} onChange={(size) => set({ size })} />

        <label className="form-label fw-semibold d-block">{tr('Land type')} <span className="text-danger">*</span></label>
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
        <ErrorText show={started && !d.landType} message={tr('Please select a land type')} />

      </div>
    )
  }

  // commercial-sale
  const d = details as CommercialDetails
  const set = (patch: Partial<CommercialDetails>) => onChange({ ...d, ...patch })

  return (
    <div>
      <h5 className="mb-1">{tr('Property details')}</h5>
      <p className="text-muted mb-4">{tr('Provide details about the property.')}</p>

      {mobilePage !== 1 && (<>
      <label className="form-label fw-semibold">{tr('Property title')} <span className="text-danger">*</span></label>
      <input
        className={`form-control mb-2 ${invalid('propertyTitle', !d.propertyTitle.trim())}`}
        placeholder="e.g. Office Building for Sale in Upanga"
        value={d.propertyTitle}
        onBlur={() => mark('propertyTitle')}
        onChange={(e) => set({ propertyTitle: e.target.value })}
      />
      <ErrorText show={err('propertyTitle', !d.propertyTitle.trim())} message={tr('Property title is required')} />

      <div className="row g-3 mb-3">
        <div className="col-md-8">
          <label className="form-label fw-semibold">{tr('Sale price (TZS)')} <span className="text-danger">*</span></label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="e.g. 1,000,000"
            className={`form-control ${invalid('salePrice', !d.salePrice)}`}
            value={groupThousands(d.salePrice)}
            onBlur={() => mark('salePrice')}
            onChange={(e) => set({ salePrice: digitsOnly(e.target.value) })}
          />
          <ErrorText show={err('salePrice', !d.salePrice)} message={tr('Sale price is required')} />
        </div>
        <div className="col-md-4">
          <label className="form-label fw-semibold">{tr('Size unit')} <span className="text-danger">*</span></label>
          <ResponsiveSelect
            value={d.sizeUnit}
            placeholder="--"
            options={SIZE_UNITS}
            getLabel={(unit) => tr(SIZE_UNIT_LABELS[unit])}
            onChange={(sizeUnit) => set({ sizeUnit })}
          />
            <ErrorText show={started && !d.sizeUnit} message={tr('Size unit is required')} />
        </div>
      </div>

      <label className="form-label fw-semibold d-block">{tr('Size')}</label>
      <SizeField unit={d.sizeUnit} value={d.size} onChange={(size) => set({ size })} />
      </>)}

      {mobilePage !== 0 && (<>
      <label className="form-label fw-semibold d-block">{tr('Commercial property type')} <span className="text-danger">*</span></label>
      <p className="text-muted small mb-2">{tr('Buildings and open land plots show different amenities.')}</p>

      {(() => {
        const buildingTypes = propertyTypes.filter((p) => COMMERCIAL_BUILDING_TYPES.includes(p.name))
        const landTypes = propertyTypes.filter((p) => COMMERCIAL_LAND_TYPES.includes(p.name))
        const typeGroup = (label: string, items: typeof propertyTypes) => items.length > 0 && (
          <>
            <div className="mb-2 text-muted small fw-semibold text-uppercase">{tr(label)}</div>
            <div className="d-flex flex-wrap gap-2 mb-3">
              {items.map((propertyType) => (
                <button
                  type="button"
                  key={propertyType.id}
                  className={`btn btn-sm ${d.commercialType === propertyType.id ? 'btn-oweru' : 'btn-outline-secondary'}`}
                  onClick={() => set({ commercialType: propertyType.id })}
                >
                  {tr(propertyType.name)}
                </button>
              ))}
            </div>
          </>
        )
        return (
          <>
            {typeGroup('Commercial Building', buildingTypes)}
            {typeGroup('Commercial Land', landTypes)}
            <ErrorText show={started && !d.commercialType} message={tr('Please select a property type')} />
          </>
        )
      })()}
      </>)}
    </div>
  )
}
