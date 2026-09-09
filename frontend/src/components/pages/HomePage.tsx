import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { commercialAreaApi, houseForSaleApi, landForSaleApi, uploadApi } from '../../services/api'

import type { CategoryId, CommercialDetails, DetailsData, HouseDetails, LandDetails, LocationData } from '../../types'
import LocationImagesStep from '../steps/LocationImagesStep';
import DetailsStep, { BrokerOwnerStep } from '../steps/DetailsStep';
import ReviewStep from '../steps/ReviewStep';
import CategoryGrid from '../shared/CategoryGrid';
import Stepper from '../shared/Stepper';
import Navbar from '../shared/Navbar';
import { useLanguage } from '../../i18n'

const emptyLocation: LocationData = {
  region: '', regionId: '', district: '', districtId: '', ward: '', wardId: '', exactLocation: '', searchQuery: '',
  lat: null, lng: null, description: '', descriptionLang: 'sw', images: [], documents: [], videoUrl: '', videoFileType: '', videoSizeBytes: null,
}

function makeDetails(category: CategoryId): DetailsData {
  const base = {
    propertyTitle: '', salePrice: '', sizeUnit: '', size: '',
    status: 'PENDING',
    broker: { name: '', phone: '', nid: '', tin: '' },
    owner: { name: '', phone: '', nid: '', tin: '' },
  }
  if (category === 'house-sale') return { ...base, houseType: '', bedrooms: '', bathrooms: '', features: [] } as HouseDetails
  if (category === 'land-sale') return { ...base, landType: '', features: [] } as LandDetails
  return { ...base, commercialType: '', features: [] } as CommercialDetails
}

const DESCRIPTION_HINTS: Record<CategoryId, string> = {
  'house-sale': 'Eleza nyumba: \n -hali yake\n -hali ya hati\n -mazingira',
  'land-sale': 'Eleza kiwanja: \n -upatikanaji wa barabara\n -hati ya umiliki\n -mazingira',
  'commercial-sale': 'Eleza eneo: \n -ukubwa wa eneo (5-6)\n -barabara kuu iliyo karibu\n -eneo la maegesho',
}



export default function HomePage() {
  const { tr } = useLanguage()
  const [category, setCategory] = useState<CategoryId | null>(null)
  const [propertyCategoryId, setPropertyCategoryId] = useState('')
  const [step, setStep] = useState(0)
  const [details, setDetails] = useState<DetailsData | null>(null)
  const [location, setLocation] = useState<LocationData>(emptyLocation)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isVideoUploading, setIsVideoUploading] = useState(false)
  const [showErrors, setShowErrors] = useState(false)
  const [banner, setBanner] = useState<{ tone: 'danger' | 'warning'; text: string } | null>(null)

  function startCategory(id: CategoryId, databaseId: string) {
    setCategory(id)
    setPropertyCategoryId(databaseId)
    setDetails(makeDetails(id))
    setLocation(emptyLocation)
    setStep(0)
    setSubmitted(false)
    setShowErrors(false)
    setBanner(null)
  }

  function reset() {
    setCategory(null)
    setPropertyCategoryId('')
    setDetails(null)
    setStep(0)
    setSubmitted(false)
  }

  const selectedType = category === 'house-sale'
    ? (details as HouseDetails | null)?.houseType
    : category === 'land-sale' ? (details as LandDetails | null)?.landType : (details as CommercialDetails | null)?.commercialType
  const canContinueFromDetails = Boolean(
    details?.propertyTitle.trim()
    && details.salePrice
    && selectedType,
  )
  const canContinueFromBrokerOwner = Boolean(
    details?.broker.name.trim()
    && details?.broker.phone.trim()
    && details?.owner.name.trim()
    && details?.owner.phone.trim(),
  )
  const canContinueFromLocation = Boolean(
    location.regionId
    && location.districtId
    && location.wardId
    && location.exactLocation.trim()
    && location.lat !== null
    && location.lng !== null,
  )
  const canContinueFromImages = Boolean(
    location.images.length > 0
    && location.videoUrl
    && location.documents.length > 0
    && !isVideoUploading,
  )

  async function handleSubmit() {
    const selectedType = category === 'house-sale'
      ? (details as HouseDetails).houseType
      : category === 'land-sale' ? (details as LandDetails).landType : (details as CommercialDetails).commercialType
    if (!details?.propertyTitle.trim() || !details.salePrice || !selectedType) {
      setBanner({ tone: 'warning', text: tr('Please complete the property title, sale price, and property type.') })
      setStep(0)
      return
    }
    if (!details.broker.name.trim() || !details.broker.phone.trim() || !details.owner.name.trim() || !details.owner.phone.trim()) {
      setBanner({ tone: 'warning', text: tr('Broker and owner names and phone numbers are required.') })
      setStep(1)
      return
    }

    const sizeNum = details?.size ? parseFloat(details.size) : NaN
    setBanner(null)
    setIsSubmitting(true)
    try {
      const common = {
        title: details?.propertyTitle || '',
        salePrice: details?.salePrice ? parseFloat(details.salePrice) : 0,
        sizeUnit: details?.sizeUnit || undefined,
        size: Number.isFinite(sizeNum) ? sizeNum : undefined,
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
        videos: location.videoUrl ? [{ url: location.videoUrl, fileType: location.videoFileType, sizeBytes: location.videoSizeBytes ?? undefined }] : [],
      }
      const payload = category === 'house-sale'
        ? { ...common, ...files, houseTypeId: (details as HouseDetails).houseType, bedrooms: Number((details as HouseDetails).bedrooms) || undefined, bathrooms: Number((details as HouseDetails).bathrooms) || undefined, features: (details as HouseDetails).features }
        : category === 'land-sale'
          ? { ...common, ...files, landTypeId: (details as LandDetails).landType, features: (details as LandDetails).features }
          : { ...common, ...files, listingType: 'SALE', propertyTypeId: (details as CommercialDetails).commercialType, features: (details as CommercialDetails).features }

      const response = category === 'house-sale'
        ? await houseForSaleApi.create(payload)
        : category === 'land-sale' ? await landForSaleApi.create(payload) : await commercialAreaApi.create(payload)
      console.log('Backend response:', response)
      
      setSubmitted(true)
    } catch (error) {
      console.error('Error submitting to backend:', error)
      setBanner({ tone: 'danger', text: tr('Failed to submit property. Please try again.') })
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
            <div className="d-flex align-items-center justify-content-between mb-3 oweru-panel-head">
              <div className="oweru-panel-title-block">
                <span className="text-muted small">{tr('Register Estate')}</span>
                <h5 className="mb-0">{tr(category === 'house-sale' ? 'House for Sale' : category === 'land-sale' ? 'Land for Sale' : 'Commercial Area for Sale')}</h5>
              </div>
              <button className="btn btn-sm btn-link text-decoration-none ms-auto" onClick={reset}>
                <i className="bi bi-x-lg me-1" /> {tr('Cancel')}
              </button>
            </div>

            {banner && (
              <div className="oweru-toast-wrap" role="alert">
                <div className={`alert alert-${banner.tone} alert-dismissible d-flex align-items-start gap-2 oweru-toast`}>
                  <i className={`bi ${banner.tone === 'danger' ? 'bi-exclamation-octagon-fill' : 'bi-exclamation-triangle-fill'} mt-1`} />
                  <div className="flex-grow-1">{banner.text}</div>
                  <button type="button" className="btn-close" aria-label={tr('Close')} onClick={() => setBanner(null)} />
                </div>
              </div>
            )}

            {submitted ? (
              <div className="text-center py-5">
                <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '2.5rem' }} />
                <h5 className="mt-3">{tr('Estate submitted')}</h5>
                <p className="text-muted">{tr('The listing has been saved and is ready for review.')}</p>
                <button className="btn btn-oweru mt-2" onClick={reset}>{tr('Register another estate')}</button>
              </div>
            ) : (
              <div className="oweru-wizard">
                <aside className="oweru-wizard-nav">
                  <div className="oweru-wizard-title">
                    <span className="text-muted small">{tr('Register Estate')}</span>
                    <strong>{tr(category === 'house-sale' ? 'House for Sale' : category === 'land-sale' ? 'Land for Sale' : 'Commercial Area for Sale')}</strong>
                  </div>
                  <Stepper currentStep={step} vertical />
                </aside>
                <div className="oweru-wizard-body">
                {step === 0 && (
                  <DetailsStep category={category} details={details} onChange={setDetails} showErrors={showErrors} />
                )}
                {step === 1 && (
                  <BrokerOwnerStep category={category} details={details} onChange={setDetails} showErrors={showErrors} />
                )}
                {step === 2 && (
                  <LocationImagesStep
                    mode="location"
                    location={location}
                    descriptionHint={DESCRIPTION_HINTS[category]}
                    onChange={setLocation}
                    onVideoUploading={setIsVideoUploading}
                    showErrors={showErrors}
                  />
                )}
                {step === 3 && (
                  <LocationImagesStep
                    mode="images"
                    location={location}
                    descriptionHint={DESCRIPTION_HINTS[category]}
                    onChange={setLocation}
                    onVideoUploading={setIsVideoUploading}
                    showErrors={showErrors}
                  />
                )}
                {step === 4 && (
                  <ReviewStep category={category} details={details} location={location} />
                )}

                <div className="d-flex justify-content-between mt-4 pt-3 border-top">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => { setBanner(null); step === 0 ? reset() : setStep((s) => s - 1) }}
                  >
                    <i className="bi bi-arrow-left me-1" /> {tr('Back')}
                  </button>

                  {step < 4 ? (
                    <button
                      className="btn btn-oweru"
                      onClick={() => {
                        const ok =
                          (step === 0 && canContinueFromDetails)
                          || (step === 1 && canContinueFromBrokerOwner)
                          || (step === 2 && canContinueFromLocation)
                          || (step === 3 && canContinueFromImages)
                        if (!ok) { setShowErrors(true); return }
                        setShowErrors(false)
                        setBanner(null)
                        setStep((s) => s + 1)
                      }}
                    >
                      {tr('Continue')} <i className="bi bi-arrow-right ms-1" />
                    </button>
                  ) : (
                    <button className="btn btn-oweru" onClick={handleSubmit} disabled={isSubmitting || isVideoUploading}>
                      {isSubmitting ? <><span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true" /> {tr('Saving...')}</> : <><i className="bi bi-check2 me-1" /> {tr('Save')}</>}
                    </button>
                  )}
                </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
