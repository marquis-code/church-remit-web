import { GATEWAY_ENDPOINT } from "../axios.config";
import { useUser } from "@/composables/auth/user"

// Type Definitions
export type Branch = {
    name: string,
    code: string,
    address: string,
    city: string,
    state: string,
    country: string,
    postalCode: string,
    email: string,
    phoneNumber: string
}

export type RemittanceConfig = {
    percentage: number
    frequency: 'daily' | 'weekly' | 'monthly'
    dueDay?: number // e.g., 5 for monthly remittance
    bankAccountId: string
    categories: RemittanceCategory[]
  }

  const { church } = useUser()

// API Factory
export const branch_mgt_api = {
  $_create_branch: async (payload: Branch) => {
    const url = `/branches/church/${church.value.id}`
    return GATEWAY_ENDPOINT.post(url, payload)
  },

  $_get_branches: async () => {
    const url = `/branches/church/${church.value.id}`
    return GATEWAY_ENDPOINT.get(url)
  },

  $_get_branch_details: async (id: string) => {
    const url = `/branches/${id}`
    return GATEWAY_ENDPOINT.get(url)
  },

  $_update_branch: async (id: string, payload: Branch) => {
    const url = `/branches/${id}`
    return GATEWAY_ENDPOINT.put(url, payload)
  },

  $_update_remittance_config: async (id: string, config: RemittanceConfig) => {
    const url = `/branches/${id}/remittance-config`
    return GATEWAY_ENDPOINT.put(url, config)
  },

  $_delete_branch: async (id: string) => {
    const url = `/branches/${id}`
    return GATEWAY_ENDPOINT.delete(url)
  }
}
