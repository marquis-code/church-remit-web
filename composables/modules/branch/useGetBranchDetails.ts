import { ref } from "vue"
import { branch_mgt_api, type Branch } from "@/api_factory/modules/branch"

export const useGetBranchDetails = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const branch = ref<Branch | null>(null)

  const getBranchDetails = async (branchId: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await branch_mgt_api.$_get_branch_details(branchId)
      branch.value = response.data.data || null
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to fetch branch details"
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    branch,
    getBranchDetails,
  }
}
