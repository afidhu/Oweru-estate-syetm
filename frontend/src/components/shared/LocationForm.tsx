import type { LocationData, LookupItem } from '../../types'
import { useLanguage } from '../../i18n'

interface Props {
  location: LocationData
  onChange: (next: LocationData) => void
  regions: LookupItem[]
  districts: (LookupItem & { regionId: string })[]
  wards: (LookupItem & { districtId: string })[]
}

export default function LocationForm({ location, onChange, regions, districts, wards }: Props) {
  const { tr } = useLanguage()
  const set = (updatedFields: Partial<LocationData>) => onChange({ ...location, ...updatedFields })
  const availableDistricts = districts.filter((item) => item.regionId === location.regionId)
  const availableWards = wards.filter((item) => item.districtId === location.districtId)

  return (
    <div className="region-district-ward">
      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="form-label fw-semibold">{tr('Region')}</label>
          <select className="form-select" value={location.regionId} onChange={(e) => {
            const selected = regions.find((item) => item.id === e.target.value)
            set({ regionId: e.target.value, region: selected?.name || '', districtId: '', district: '', wardId: '', ward: '' })
          }}>
            <option value="">{tr('Select a region...')}</option>
            {regions.map((region) => <option key={region.id} value={region.id}>{region.name}</option>)}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">{tr('District')}</label>
          <select className="form-select" value={location.districtId} disabled={!location.regionId} onChange={(e) => {
            const selected = availableDistricts.find((item) => item.id === e.target.value)
            set({ districtId: e.target.value, district: selected?.name || '', wardId: '', ward: '' })
          }}>
            <option value="">{location.regionId ? tr('Select a district...') : tr('Choose a region first')}</option>
            {availableDistricts.map((district) => <option key={district.id} value={district.id}>{district.name}</option>)}
          </select>
        </div>
      </div>
      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="form-label fw-semibold">{tr('Ward / Area')}</label>
          <select className="form-select" value={location.wardId} disabled={!location.districtId} onChange={(e) => {
            const selected = availableWards.find((item) => item.id === e.target.value)
            set({ wardId: e.target.value, ward: selected?.name || '' })
          }}>
            <option value="">{location.districtId ? tr('Select a ward...') : tr('Choose a district first')}</option>
            {availableWards.map((ward) => <option key={ward.id} value={ward.id}>{ward.name}</option>)}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">{tr('Exact location')}</label>
          <input className="form-control" value={location.exactLocation} onChange={(e) => set({ exactLocation: e.target.value })} />
        </div>
      </div>
    </div>
  )
}
