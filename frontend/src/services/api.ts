import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

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
}

export default api