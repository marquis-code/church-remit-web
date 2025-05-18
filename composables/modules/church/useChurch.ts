import { ref } from "vue"
import { church_mgt_api } from "@/api_factory/modules/church"

type ChurchProfile = {
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

type FinancialConfig = {
  currency: string
  fiscalYearStart: string
  bankAccounts: {
    name: string
    accountNumber: string
    bankName: string
  }[]
  paymentMethods: string[]
  donationCategories: {
    name: string
    description: string
    isDefault: boolean
  }[]
}

export const useChurch = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const churchProfile = ref<ChurchProfile | null>(null)
  const financialConfig = ref<FinancialConfig | null>(null)

  const getChurchProfile = async (churchId: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await church_mgt_api.getChurchProfile(churchId)
      churchProfile.value = response.data.data || null
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to fetch church profile"
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateChurchProfile = async (churchId: string, profileData: ChurchProfile) => {
    loading.value = true
    error.value = null

    try {
      const response = await church_mgt_api.updateChurchProfile(churchId, profileData)
      churchProfile.value = { ...churchProfile.value, ...profileData }
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to update church profile"
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateFinancialConfig = async (churchId: string, config: { financialConfig: FinancialConfig }) => {
    loading.value = true
    error.value = null

    try {
      const response = await church_mgt_api.updateFinancialConfig(churchId, config)
      financialConfig.value = config.financialConfig
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to update financial configuration"
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    churchProfile,
    financialConfig,
    getChurchProfile,
    updateChurchProfile,
    updateFinancialConfig,
  }
}
