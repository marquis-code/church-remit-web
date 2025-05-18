import { GATEWAY_ENDPOINT } from '../axios.config'

// Type Definitions

export type Donation = {
  memberId: string
  amount: number
  currency: string
  category: string
  paymentMethod: 'cash' | 'card' | 'bank_transfer' | string
  notes?: string
  bankAccountId: string
}

export type DonationQueryParams = {
  startDate?: string
  endDate?: string
  category?: string
}

export const donation_mgt_api = {
    $_create_donation: async (id: string, payload: Donation) => {
      const url = `/donations/branch/${id}`
      return axios.post(url, payload)
    },
  
    $_get_donations: async (branchId: string, params?: DonationQueryParams) => {
      const url = `/donations/branch/${branchId}`
      return axios.get(url, { params })
    }
  }
  