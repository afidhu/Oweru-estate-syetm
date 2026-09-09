import { useEffect, useRef, useState } from 'react'
import type { LocationData, LookupItem } from '../../types'
import { useLanguage } from '../../i18n'

interface Props {
  location: LocationData
  onChange: (next: LocationData) => void
  regions: LookupItem[]
  districts: (LookupItem & { regionId: string })[]
  wards: (LookupItem & { districtId: string })[]
  showErrors?: boolean
}

function FieldErr({ show, message }: { show: boolean; message: string }) {
  if (!show) return null
  return <div className="text-danger small mt-1"><i className="bi bi-exclamation-circle me-1" />{message}</div>
}

function LocationSelect({
  value, placeholder, options, disabled, onChange,
}: {
  value: string
  placeholder: string
  options: LookupItem[]
  disabled?: boolean
  onChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const selected = options.find((option) => option.id === value)

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', closeOnOutsideClick)
    return () => document.removeEventListener('mousedown', closeOnOutsideClick)
  }, [])

  return (
    <div className="oweru-location-select" ref={containerRef}>
      <button
        type="button"
        className={`form-select oweru-location-select-trigger ${disabled ? 'disabled' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{selected?.name || placeholder}</span>
      </button>
      {open && !disabled && (
        <div className="oweru-location-select-menu" role="listbox">
          <button type="button" className={`oweru-location-option ${!value ? 'selected' : ''}`} onClick={() => { onChange(''); setOpen(false) }}>
            {placeholder}
          </button>
          {options.map((option) => (
            <button
              type="button"
              role="option"
              aria-selected={option.id === value}
              className={`oweru-location-option ${option.id === value ? 'selected' : ''}`}
              key={option.id}
              onClick={() => { onChange(option.id); setOpen(false) }}
            >
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function LocationForm({ location, onChange, regions, districts, wards, showErrors = false }: Props) {
  const { tr } = useLanguage()
  const set = (updatedFields: Partial<LocationData>) => onChange({ ...location, ...updatedFields })
  const availableDistricts = districts.filter((item) => item.regionId === location.regionId)
  const availableWards = wards.filter((item) => item.districtId === location.districtId)

  return (
    <div className="region-district-ward">
      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="form-label fw-semibold">{tr('Region')} <span className="text-danger">*</span></label>
          <LocationSelect
            value={location.regionId}
            placeholder={tr('Select a region...')}
            options={regions}
            onChange={(regionId) => {
              const selected = regions.find((item) => item.id === regionId)
              set({ regionId, region: selected?.name || '', districtId: '', district: '', wardId: '', ward: '' })
            }}
          />
          <FieldErr show={showErrors && !location.regionId} message={tr('Please select a region')} />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">{tr('District')} <span className="text-danger">*</span></label>
          <LocationSelect
            value={location.districtId}
            placeholder={location.regionId ? tr('Select a district...') : tr('Choose a region first')}
            options={availableDistricts}
            disabled={!location.regionId}
            onChange={(districtId) => {
              const selected = availableDistricts.find((item) => item.id === districtId)
              set({ districtId, district: selected?.name || '', wardId: '', ward: '' })
            }}
          />
          <FieldErr show={showErrors && !location.districtId} message={tr('Please select a district')} />
        </div>
      </div>
      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="form-label fw-semibold">{tr('Ward / Area')} <span className="text-danger">*</span></label>
          <LocationSelect
            value={location.wardId}
            placeholder={location.districtId ? tr('Select a ward...') : tr('Choose a district first')}
            options={availableWards}
            disabled={!location.districtId}
            onChange={(wardId) => {
              const selected = availableWards.find((item) => item.id === wardId)
              set({ wardId, ward: selected?.name || '' })
            }}
          />
          <FieldErr show={showErrors && !location.wardId} message={tr('Please select a ward')} />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">{tr('Exact location')} <span className="text-danger">*</span></label>
          <input className={`form-control ${showErrors && !location.exactLocation.trim() ? 'is-invalid' : ''}`} value={location.exactLocation} onChange={(e) => set({ exactLocation: e.target.value })} />
          <FieldErr show={showErrors && !location.exactLocation.trim()} message={tr('Exact location is required')} />
        </div>
      </div>
    </div>
  )
}
