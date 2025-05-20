import { ref } from "vue"
import { branch_mgt_api, type Branch } from "@/api_factory/modules/branch"


export const useCreateBranch = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)
  const branchData = ref<any>(null)

  const createBranch = async (branch: Branch) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const response = await branch_mgt_api.$_create_branch(branch)
      success.value = true
      branchData.value = response.data.data
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to create branch"
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    success,
    branchData,
    createBranch,
  }
}
