import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { commercialAreaApi, houseForSaleApi, landForSaleApi, uploadApi } from '../../services/api'

import type { CategoryId, CommercialDetails, DetailsData, HouseDetails, LandDetails, LocationData } from '../../types'
import LocationImagesStep from '../steps/LocationImagesStep';
import DetailsStep from '../steps/DetailsStep';
import ReviewStep from '../steps/ReviewStep';
import CategoryGrid from '../shared/CategoryGrid';
import Stepper from '../shared/Stepper';
import Navbar from '../shared/Navbar';

const emptyLocation: LocationData = {
  region: '', regionId: '', district: '', districtId: '', ward: '', wardId: '', exactLocation: '', searchQuery: '',
  lat: null, lng: null, description: '', descriptionLang: 'en', images: [], documents: [],
}

function makeDetails(category: CategoryId): DetailsData {
  const base = {
    propertyTitle: '', salePrice: '', sizeUnit: '', size: '',
    status: 'ACTIVE',
    broker: { name: '', phone: '', nid: '', tin: '' },
    owner: { name: '', phone: '', nid: '', tin: '' },
  }
  if (category === 'house-sale') return { ...base, houseType: '', bedrooms: '', bathrooms: '', features: [] } as HouseDetails
  if (category === 'land-sale') return { ...base, landType: '', features: [] } as LandDetails
  return { ...base, commercialType: '' } as CommercialDetails
}

const DESCRIPTION_HINTS: Record<CategoryId, string> = {
  'house-sale': 'Describe the house: \n -its condition\n -title status\n -surroundings',
  'land-sale': 'Describe the plot: \n -road access\n -title deed\n -surroundings',
  'commercial-sale': 'Describe Area: \n -Area size(5-6)\n -nearby Main road\n -Parking area',
}



export default function HomePage() {
  const [category, setCategory] = useState<CategoryId | null>(null)
  const [propertyCategoryId, setPropertyCategoryId] = useState('')
  const [step, setStep] = useState(0) // 0 = Details, 1 = Location & Images, 2 = Review
  const [details, setDetails] = useState<DetailsData | null>(null)
  const [location, setLocation] = useState<LocationData>(emptyLocation)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function startCategory(id: CategoryId, databaseId: string) {
    setCategory(id)
    setPropertyCategoryId(databaseId)
    setDetails(makeDetails(id))
    setLocation(emptyLocation)
    setStep(0)
    setSubmitted(false)
  }

  function reset() {
    setCategory(null)
    setPropertyCategoryId('')
    setDetails(null)
    setStep(0)
    setSubmitted(false)
  }

  async function handleSubmit() {
    const selectedType = category === 'house-sale'
      ? (details as HouseDetails).houseType
      : category === 'land-sale' ? (details as LandDetails).landType : (details as CommercialDetails).commercialType
    if (!details?.propertyTitle.trim() || !details.salePrice || !selectedType) {
      alert('Please complete the property title, sale price, and property type.')
      return
    }
    if (!details.broker.name.trim() || !details.broker.phone.trim() || !details.owner.name.trim() || !details.owner.phone.trim()) {
      alert('Broker and owner names and phone numbers are required.')
      return
    }

    setIsSubmitting(true)
    try {
      const common = {
        title: details?.propertyTitle || '',
        salePrice: details?.salePrice ? parseFloat(details.salePrice) : 0,
        sizeUnit: details?.sizeUnit || undefined,
        size: details?.size ? parseFloat(details.size) : undefined,
        status: details?.status || 'ACTIVE',
        propertyCategoryId,
        regionId: location.regionId || undefined,
        districtId: location.districtId || undefined,
        wardId: location.wardId || undefined,
        exactLocation: location?.exactLocation || undefined,
        latitude: location?.lat ?? undefined,
        longitude: location?.lng ?? undefined,
        description: location?.description || undefined,
        language: location?.descriptionLang === 'sw' ? 'KISWAHILI' : 'ENGLISH',
        broker: { ...details.broker, nid: details.broker.nid || undefined, tin: details.broker.tin || undefined },
        owner: { ...details.owner, nid: details.owner.nid || undefined, tin: details.owner.tin || undefined },
      }
      const [uploadedImages, uploadedDocuments] = await Promise.all([
        uploadApi.upload(location.images),
        uploadApi.upload(location.documents),
      ])
      const files = {
        images: uploadedImages.map((file, index) => ({
          url: file.url,
          isCover: index === 0,
        })),
        documents: uploadedDocuments,
      }
      const payload = category === 'house-sale'
        ? { ...common, ...files, houseTypeId: (details as HouseDetails).houseType, bedrooms: Number((details as HouseDetails).bedrooms) || undefined, bathrooms: Number((details as HouseDetails).bathrooms) || undefined, features: (details as HouseDetails).features }
        : category === 'land-sale'
          ? { ...common, ...files, landTypeId: (details as LandDetails).landType, features: (details as LandDetails).features }
          : { ...common, ...files, listingType: 'SALE', propertyTypeId: (details as CommercialDetails).commercialType }

      const response = category === 'house-sale'
        ? await houseForSaleApi.create(payload)
        : category === 'land-sale' ? await landForSaleApi.create(payload) : await commercialAreaApi.create(payload)
      console.log('Backend response:', response)
      
      setSubmitted(true)
    } catch (error) {
      console.error('Error submitting to backend:', error)
      alert('Failed to submit property. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
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
                <h5 className="mb-0">{category === 'house-sale' ? 'House for Sale' : category === 'land-sale' ? 'Land for Sale' : 'Commercial Area for Sale'}</h5>
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
                    <button className="btn btn-oweru" onClick={handleSubmit} disabled={isSubmitting}>
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
