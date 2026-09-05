import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://saleapi.oweru.com"
export const getUploadUrl = (url: string) => new URL(url, `${API_BASE_URL}/`).toString()

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const uploadApi = {
  upload: async (files: File[], onUploadProgress?: (progress: number) => void) => {
    const formData = new FormData()
    files.forEach((file) => formData.append('files', file))
    const response = await api.post('/uploads', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (event) => {
            if (event.total) onUploadProgress?.(Math.round((event.loaded / event.total) * 100))
          },
    })
    return response.data.files as { name: string; url: string; fileType?: string; sizeBytes?: number }[]
  },
}

export const houseForSaleApi = {
  create: async (data: any) => {
    const response = await api.post('/house-for-sale', data)
    return response.data
  },

  getAll: async () => {
    const response = await api.get('/house-for-sale')
    return response.data
  },

  getById: async (id: string) => {
    const response = await api.get(`/house-for-sale/${id}`)
    return response.data
  },

  update: async (id: string, data: any) => {
    const response = await api.patch(`/house-for-sale/${id}`, data)
    return response.data
  },

  delete: async (id: string) => {
    const response = await api.delete(`/house-for-sale/${id}`)
    return response.data
  },
  getHouseTypes: async () => {
    const response = await api.get('/house-types')
    return response.data
  },
  // /property-categories
  getPropertyCategories: async () => {
    const response = await api.get('/property-categories')
    return response.data
  },
  getRegions: async () => (await api.get('/regions')).data,
  getDistricts: async () => (await api.get('/districts')).data,
  getWards: async () => (await api.get('/wards')).data,
}

export const landForSaleApi = {
  create: async (data: unknown) => (await api.post('/land-for-sale', data)).data,
}

export const commercialAreaApi = {
  create: async (data: unknown) => (await api.post('/commercial-area', data)).data,
}

export const lookupApi = {
  getLandTypes: async () => (await api.get('/land-types')).data,
  getPropertyTypes: async () => (await api.get('/commercial-area-property-type')).data,
}

export default api