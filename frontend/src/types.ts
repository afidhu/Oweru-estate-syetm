// Only "for sale" categories are exposed to the customer flow.
export type CategoryId = 'house-sale' | 'land-sale' | 'commercial-sale'

export interface CategoryDef {
  id: CategoryId
  title: string
  subtitle: string
  icon: string // bootstrap-icons class
  accent: string // css color used for the card icon chip
}

export interface PropertyCategoryRecord {
  id: string
  title: string
  slug: string
  description?: string | null
  icon?: string | null
  accent?: string | null
}

export interface LocationData {
  region: string
  regionId: string
  district: string
  districtId: string
  ward: string
  wardId: string
  exactLocation: string
  searchQuery: string
  lat: number | null
  lng: number | null
  description: string
  descriptionLang: 'en' | 'sw'
  images: File[]
  documents: File[]
}

export interface PersonDetails {
  name: string
  phone: string
  nid: string
  tin: string
}

export interface HouseDetails {
  propertyTitle: string
  salePrice: string
  sizeUnit: string
  size: string
  houseType: string
  bedrooms: string
  bathrooms: string
  features: string[]
  status: string
  broker: PersonDetails
  owner: PersonDetails
}

export interface LandDetails {
  propertyTitle: string
  salePrice: string
  sizeUnit: string
  size: string
  landType: string
  features: string[]
  status: string
  broker: PersonDetails
  owner: PersonDetails
}

export interface CommercialDetails {
  propertyTitle: string
  salePrice: string
  sizeUnit: string
  size: string
  commercialType: string
  status: string
  broker: PersonDetails
  owner: PersonDetails
}

export type DetailsData = HouseDetails | LandDetails | CommercialDetails

export interface EstateFormState {
  category: CategoryId | null
  details: DetailsData | null
  location: LocationData
}

export interface LookupItem {
  id: string
  name: string
}

export const STEP_LABELS = ['Details', 'Location & Images', 'Review'] as const
