import { GATEWAY_ENDPOINT } from "../axios.config";
import { useUser } from "@/composables/auth/user"

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

const { church } = useUser()
// API Module
export const church_mgt_api = {
  getChurchProfile: async () => {
    const url = `/churches/${church.value.id}`
    return GATEWAY_ENDPOINT.get(url)
  },

  updateChurchProfile: async (payload: ChurchProfilePayload) => {
    const url = `/churches/${church.value.id}`
    return GATEWAY_ENDPOINT.put(url, payload)
  },

  updateFinancialConfig: async (payload: UpdateFinancialConfigPayload) => {
    const url = `/churches/${church.value.id}/financial-config`
    return GATEWAY_ENDPOINT.put(url, payload)
  }
}
