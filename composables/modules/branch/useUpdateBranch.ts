import { ref } from "vue"
import { branch_mgt_api, type Branch } from "@/api_factory/modules/branch"

export const useUpdateBranch = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)
  const updatedBranch = ref<Branch | null>(null)

  const updateBranch = async (branchId: string, branchData: Branch) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const response = await branch_mgt_api.$_update_branch(branchId, branchData)
      success.value = true
      updatedBranch.value = response.data.data || null
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to update branch"
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    success,
    updatedBranch,
    updateBranch,
  }
}
