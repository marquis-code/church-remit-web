// src/api/churchMgtApi.ts
import { GATEWAY_ENDPOINT } from '../axios.config'

// Type Definitions
type BankAccount = {
  name: string
  accountNumber: string
  bankName: string
}

type DonationCategory = {
  name: string
  description: string
  isDefault: boolean
}

type FinancialConfig = {
  currency: string
  fiscalYearStart: string
  bankAccounts: BankAccount[]
  paymentMethods: string[]
  donationCategories: DonationCategory[]
}

type UpdateFinancialConfigPayload = {
  financialConfig: FinancialConfig
}

type ChurchProfilePayload = {
  name: string
  address: string
  city: string
  state: string
  country: string
  postalCode: string
  email: string
  phoneNumber: string
  website: string
  description: string
}

// API Module
export const church_mgt_api = {
  getChurchProfile: async (id: string) => {
    const url = `${GATEWAY_ENDPOINT}/churches/${id}`
    return axios.get(url)
  },

  updateChurchProfile: async (id: string, payload: ChurchProfilePayload) => {
    const url = `${GATEWAY_ENDPOINT}/churches/${id}`
    return axios.put(url, payload)
  },

  updateFinancialConfig: async (id: string, payload: UpdateFinancialConfigPayload) => {
    const url = `${GATEWAY_ENDPOINT}/churches/${id}/financial-config`
    return axios.put(url, payload)
  }
}
