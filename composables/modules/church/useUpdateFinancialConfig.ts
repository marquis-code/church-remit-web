import { ref } from "vue"
import { church_mgt_api } from "@/api_factory/modules/church"

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

export const useUpdateFinancialConfig = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const updateFinancialConfig = async (config: { financialConfig: FinancialConfig }) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const response = await church_mgt_api.updateFinancialConfig(config)
      success.value = true
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
    success,
    updateFinancialConfig,
  }
}
