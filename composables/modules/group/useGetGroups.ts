import { ref } from "vue"
import { group_mgt_api, type Group } from "@/api_factory/modules/group"

export const useGetGroups = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const groups = ref<Group[]>([])

  const getGroups = async (branchId: string, metadata: { type: string; status: string }) => {
    loading.value = true
    error.value = null

    try {
      const response = await group_mgt_api.$_get_groups(metadata)
      groups.value = response.data.data || []
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to fetch groups"
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    groups,
    getGroups,
  }
}
