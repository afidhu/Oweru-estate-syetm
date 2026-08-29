import type {
  CategoryId, CommercialDetails, DetailsData, HouseDetails, LandDetails, LocationData,
} from '../../types'
import { useLanguage } from '../../i18n'

interface ReviewStepProps {
  category: CategoryId
  details: DetailsData
  location: LocationData
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="col-md-6">
      <div className="oweru-review-label">{label}</div>
      <div className="oweru-review-value">{value || '—'}</div>
    </div>
  )
}

export default function ReviewStep({ category, details, location }: ReviewStepProps) {
  const { tr } = useLanguage()
  const categoryTitle = tr(category === 'house-sale' ? 'House for Sale' : category === 'land-sale' ? 'Land for Sale' : 'Commercial Area')

  let typeLabel = ''
  let typeValue = ''
  let sizeValue = ''
  let features: string[] = []

  if (category === 'house-sale') {
    const d = details as HouseDetails
    typeLabel = tr('House type'); typeValue = d.houseType || tr('Not set')
    sizeValue = d.size ? `${d.size} ${d.sizeUnit}` : '—'
    features = d.features
  } else if (category === 'land-sale') {
    const d = details as LandDetails
    typeLabel = tr('Land type'); typeValue = d.landType || tr('Not set')
    sizeValue = d.size ? `${d.size} ${d.sizeUnit}` : '—'
    features = d.features
  } else {
    const d = details as CommercialDetails
    typeLabel = tr('Commercial property type'); typeValue = d.commercialType || tr('Not set')
    sizeValue = d.size ? `${d.size} ${d.sizeUnit}` : '—'
  }

  const salePrice = 'salePrice' in details ? details.salePrice : ''
  const status = details.status
  const broker = details.broker
  const owner = details.owner
  const propertyTitle = details.propertyTitle

  return (
    <div>
      <h5 className="mb-1">{tr('Review')}</h5>
      <p className="text-muted mb-4">{tr('Review the details below, then submit — or go back to edit.')}</p>

      <div className="row g-3">
        <Field label={tr('Category')} value={categoryTitle} />
        <Field label={tr('Property title')} value={propertyTitle} />
        <Field label={tr('Sale price (TZS)')} value={salePrice ? Number(salePrice).toLocaleString() : ''} />
        <Field label={tr('Size')} value={sizeValue} />
        <Field label={typeLabel} value={typeValue} />
        <Field label={tr('Status')} value={status} />
        <Field label={tr('Broker')} value={broker.name ? `${broker.name} (${broker.phone})` : tr('Unassigned')} />
        <Field label={tr('Owner')} value={owner.name ? `${owner.name} (${owner.phone})` : tr('Not registered')} />
        <Field label={tr('Region / District')} value={[location.region, location.district].filter(Boolean).join(' / ')} />
        <Field label={tr('Ward / Exact location')} value={[location.ward, location.exactLocation].filter(Boolean).join(' / ')} />
        <Field label={tr('Images')} value={location.images.length ? `${location.images.length} file(s)` : tr('None')} />
        <Field label={tr('Documents')} value={location.documents.length ? `${location.documents.length} file(s)` : tr('None')} />
      </div>

      {features.length > 0 && (
        <>
          <div className="oweru-review-label mt-2">{tr('Features')}</div>
          <div className="d-flex flex-wrap gap-2 mb-3">
            {features.map((f) => (
              <span className="badge rounded-pill text-bg-warning-subtle text-dark border" key={f}>
                {tr(f)}
              </span>
            ))}
          </div>
        </>
      )}

      {location.description && (
        <>
          <div className="oweru-review-label">{tr('Description')}</div>
          <p className="oweru-review-value">{location.description}</p>
        </>
      )}
    </div>
  )
}
