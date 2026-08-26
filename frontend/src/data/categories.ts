import api, { houseForSaleApi } from '../services/api'
import type { CategoryDef, CategoryId } from '../types'

// Per the brief: only categories that end with a sale are offered to customers
// (House for rent / Commercial area for rent are intentionally excluded here).
export const CATEGORIES: CategoryDef[] = [
  {
    id: 'house-sale',
    title: 'House for Sale',
    subtitle: 'List a house available for sale',
    icon: 'bi-house-door',
    accent: '#3B6FE0',
  },
  {
    id: 'land-sale',
    title: 'Land for Sale',
    subtitle: 'List land available for sale',
    icon: 'bi-signpost-split',
    accent: '#E0A93B',
  },
  {
    id: 'commercial-sale',
    title: 'Commercial Area for Sale',
    subtitle: 'List commercial property for sale',
    icon: 'bi-building',
    accent: '#3BAE6B',
  },
]


//gethousetype
// export const HOUSE_TYPES = await houseForSaleApi.getHouseTypes();


export const HOUSE_TYPES = ['Apartment', 'Condominium', 'Standalone', 'Duplex', 'Single Room']

export const HOUSE_FEATURES = [
  'Road Access', 'Electricity', 'Water Supply',
  'Borehole', 'Parking', 'Security',
  'CCTV', 'Fence', 'Furnished',
  'Fitted Kitchen', 'Outside Kitchen', 'Dining Room',
  'Sitting Room', 'En-suite Bedrooms', 'Balcony',
  'Tiled Floor', 'Store Room', 'Garden',
  'Swimming Pool', 'Servant Quarter', 'Generator',
  'Air Conditioning', 'Other',
]

export const LAND_TYPES = ['Residential', 'Commercial', 'Agricultural', 'Mixed Use']

export const LAND_FEATURES = [
  'Road Access', 'Electricity', 'Water Supply',
  'Borehole', 'Road Frontage', 'Tarmac Road Access',
  'Corner Plot', 'Fence', 'Surveyed',
  'Ready for Development', 'Closer to CBD', 'Other',
]

export const COMMERCIAL_BUILDING_TYPES = [
  'Office Building', 'Retail Shop', 'Showroom', 'Warehouse',
  'Factory', 'Garage / Workshop', 'Hotel', 'Guest House',
  'Restaurant Space', 'Bar / Lounge',
]

export const COMMERCIAL_LAND_TYPES = [
  'Commercial Plot', 'Industrial Plot', 'Yard',
  'Car Wash', 'Petrol Station', 'Vehicle Parking Lot',
]

export const SIZE_UNITS = ['sqm', 'acre', 'plot', 'metre', 'feet']

export const STATUS_OPTIONS = ['Active', 'Pending', 'Sold', 'Inactive']

export async function getCategory(id: CategoryId): Promise<CategoryDef> {
  const categories = await houseForSaleApi.getPropertyCategories()
  const found = categories.find((c: any) => c.id === id)
  if (!found) throw new Error(`Unknown category: ${id}`)
  return found
}
