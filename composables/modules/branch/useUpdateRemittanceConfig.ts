import { ref } from "vue"
import { branch_mgt_api, type RemittanceConfig } from "@/api_factory/modules/branch"

export const useUpdateRemittanceConfig = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const updateRemittanceConfig = async (branchId: string, config: RemittanceConfig) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const response = await branch_mgt_api.$_update_remittance_config(branchId, config)
      success.value = true
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to update remittance configuration"
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    success,
    updateRemittanceConfig,
  }
}
