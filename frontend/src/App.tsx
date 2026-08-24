import { useState } from 'react'
import Navbar from './components/Navbar'
import CategoryGrid from './components/CategoryGrid'
import Stepper from './components/Stepper'
import DetailsStep from './components/steps/DetailsStep'
import LocationImagesStep from './components/steps/LocationImagesStep'
import ReviewStep from './components/steps/ReviewStep'
import { getCategory } from './data/categories'
import type {
  CategoryId, CommercialDetails, DetailsData, HouseDetails, LandDetails, LocationData,
} from './types'

const emptyLocation: LocationData = {
  region: '', district: '', ward: '', exactLocation: '', searchQuery: '',
  lat: null, lng: null, description: '', descriptionLang: 'en', images: [], documents: [],
}

function makeDetails(category: CategoryId): DetailsData {
  const base = {
    propertyTitle: '', salePrice: '', sizeUnit: '', size: '',
    status: 'Active', broker: '', owner: '',
  }
  if (category === 'house-sale') {
    return { ...base, houseType: '', bedrooms: '', bathrooms: '', features: [] } as HouseDetails
  }
  if (category === 'land-sale') {
    return { ...base, landType: '', features: [] } as LandDetails
  }
  return { ...base, commercialType: '' } as CommercialDetails
}

const DESCRIPTION_HINTS: Record<CategoryId, string> = {
  'house-sale': 'Describe the house, its condition, title status and surroundings.',
  'land-sale': 'Describe the plot, road access, title deed and surroundings.',
  'commercial-sale': 'Describe the commercial space, its intended use and facilities.',
}

export default function App() {
  const [category, setCategory] = useState<CategoryId | null>(null)
  const [step, setStep] = useState(0) // 0 = Details, 1 = Location & Images, 2 = Review
  const [details, setDetails] = useState<DetailsData | null>(null)
  const [location, setLocation] = useState<LocationData>(emptyLocation)
  const [submitted, setSubmitted] = useState(false)

  function startCategory(id: CategoryId) {
    setCategory(id)
    setDetails(makeDetails(id))
    setLocation(emptyLocation)
    setStep(0)
    setSubmitted(false)
  }

  function reset() {
    setCategory(null)
    setDetails(null)
    setStep(0)
    setSubmitted(false)
  }

  function handleSubmit() {
    // Wire this up to your API call.
    // eslint-disable-next-line no-console
    console.log('Submitting estate', { category, details, location })
    setSubmitted(true)
  }

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar onLogoClick={reset} />

      <main className="container py-4" style={{ maxWidth: 900 }}>
        {!category || !details ? (
          <CategoryGrid onSelect={startCategory} />
        ) : (
          <div className="oweru-panel">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <span className="text-muted small">Register Estate</span>
                <h5 className="mb-0">{getCategory(category).title}</h5>
              </div>
              <button className="btn btn-sm btn-link text-decoration-none" onClick={reset}>
                <i className="bi bi-x-lg me-1" /> Cancel
              </button>
            </div>

            <Stepper currentStep={submitted ? 3 : step} />

            {submitted ? (
              <div className="text-center py-5">
                <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '2.5rem' }} />
                <h5 className="mt-3">Estate submitted</h5>
                <p className="text-muted">The listing has been saved and is ready for review.</p>
                <button className="btn btn-oweru mt-2" onClick={reset}>Register another estate</button>
              </div>
            ) : (
              <>
                {step === 0 && (
                  <DetailsStep category={category} details={details} onChange={setDetails} />
                )}
                {step === 1 && (
                  <LocationImagesStep
                    location={location}
                    descriptionHint={DESCRIPTION_HINTS[category]}
                    onChange={setLocation}
                  />
                )}
                {step === 2 && (
                  <ReviewStep category={category} details={details} location={location} />
                )}

                <div className="d-flex justify-content-between mt-4 pt-3 border-top">
                  <button
                    className="btn btn-outline-secondary"
                    disabled={step === 0}
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                  >
                    <i className="bi bi-arrow-left me-1" /> Back
                  </button>

                  {step < 2 ? (
                    <button className="btn btn-oweru" onClick={() => setStep((s) => s + 1)}>
                      Continue <i className="bi bi-arrow-right ms-1" />
                    </button>
                  ) : (
                    <button className="btn btn-oweru" onClick={handleSubmit}>
                      <i className="bi bi-check2 me-1" /> Save
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
