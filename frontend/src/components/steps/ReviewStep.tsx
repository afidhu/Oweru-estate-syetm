import type {
  CategoryId, CommercialDetails, DetailsData, HouseDetails, LandDetails, LocationData,
} from '../../types'

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
  const categoryTitle = category === 'house-sale' ? 'House for Sale' : category

  let typeLabel = ''
  let typeValue = ''
  let sizeValue = ''
  let features: string[] = []

  if (category === 'house-sale') {
    const d = details as HouseDetails
    typeLabel = 'House type'; typeValue = d.houseType || 'Not set'
    sizeValue = d.size ? `${d.size} ${d.sizeUnit}` : '—'
    features = d.features
  } else if (category === 'land-sale') {
    const d = details as LandDetails
    typeLabel = 'Land type'; typeValue = d.landType || 'Not set'
    sizeValue = d.size ? `${d.size} ${d.sizeUnit}` : '—'
    features = d.features
  } else {
    const d = details as CommercialDetails
    typeLabel = 'Commercial type'; typeValue = d.commercialType || 'Not set'
    sizeValue = d.size ? `${d.size} ${d.sizeUnit}` : '—'
  }

  const salePrice = 'salePrice' in details ? details.salePrice : ''
  const status = details.status
  const broker = details.broker
  const owner = details.owner
  const propertyTitle = details.propertyTitle

  return (
    <div>
      <h5 className="mb-1">Review</h5>
      <p className="text-muted mb-4">Review the details below, then submit — or go back to edit.</p>

      <div className="row g-3">
        <Field label="Category" value={categoryTitle} />
        <Field label="Property title" value={propertyTitle} />
        <Field label="Sale price (TZS)" value={salePrice ? Number(salePrice).toLocaleString() : ''} />
        <Field label="Size" value={sizeValue} />
        <Field label={typeLabel} value={typeValue} />
        <Field label="Status" value={status} />
        <Field label="Broker" value={broker.name ? `${broker.name} (${broker.phone})` : 'Unassigned'} />
        <Field label="Owner" value={owner.name ? `${owner.name} (${owner.phone})` : 'Not registered'} />
        <Field label="Region / District" value={[location.region, location.district].filter(Boolean).join(' / ')} />
        <Field label="Ward / Exact location" value={[location.ward, location.exactLocation].filter(Boolean).join(' / ')} />
        <Field label="Images" value={location.images.length ? `${location.images.length} file(s)` : 'None'} />
        <Field label="Documents" value={location.documents.length ? `${location.documents.length} file(s)` : 'None'} />
      </div>

      {features.length > 0 && (
        <>
          <div className="oweru-review-label mt-2">Features</div>
          <div className="d-flex flex-wrap gap-2 mb-3">
            {features.map((f) => (
              <span className="badge rounded-pill text-bg-warning-subtle text-dark border" key={f}>
                {f}
              </span>
            ))}
          </div>
        </>
      )}

      {location.description && (
        <>
          <div className="oweru-review-label">Description</div>
          <p className="oweru-review-value">{location.description}</p>
        </>
      )}
    </div>
  )
}
