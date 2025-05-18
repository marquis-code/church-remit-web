import { ref } from "vue"
import { branch_mgt_api } from "@/api_factory/modules/branch"

export const useDeleteBranch = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const deleteBranch = async (branchId: string) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const response = await branch_mgt_api.$_delete_branch(branchId)
      success.value = true
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to delete branch"
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    success,
    deleteBranch,
  }
}
