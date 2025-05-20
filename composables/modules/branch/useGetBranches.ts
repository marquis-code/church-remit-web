import { ref } from "vue"
import { branch_mgt_api, type Branch } from "@/api_factory/modules/branch"

export const useGetBranches = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const branches = ref<Branch[]>([])

  const getBranches = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await branch_mgt_api.$_get_branches()
      branches.value = response.data.data || []
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to fetch branches"
      throw err
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    getBranches()
  })

  return {
    loading,
    error,
    branches,
    getBranches,
  }
}
