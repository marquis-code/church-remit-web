import { GATEWAY_ENDPOINT } from '../axios.config'

// Type Definitions

export type Facility = {
  name: string
  description?: string
  location?: string
  capacity?: number
  amenities?: string[]
}

export type Asset = {
  name: string
  description?: string
  serialNumber: string
  model?: string
  manufacturer?: string
  purchaseDate?: string // ISO date
  purchasePrice?: number
  warrantyExpiration?: string // ISO date
}

export type FacilityBooking = {
  purpose: string
  startDateTime: string // ISO string
  endDateTime: string   // ISO string
  attendees: number
  notes?: string
}


export const facility_mgt_api = {
    $_create_facility: async (id: string, payload: Facility) => {
      const url = `/facilities/branch/${id}`
      return axios.post(url, payload)
    },
  
    $_get_facilities: async () => {
      const url = `/facilities/branch/${id}`
      return axios.get(url)
    },
  
    $_create_asset: async (id: string, payload: Asset) => {
      const url = `/facilities/${id}/assets`
      return axios.post(url, payload)
    },
  
    $_book_facility: async (facilityId: string, payload: FacilityBooking) => {
      const url = `/facilities/${facilityId}/bookings`
      return axios.post(url, payload)
    }
  }
  