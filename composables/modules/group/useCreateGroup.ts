import { ref } from "vue"
import { group_mgt_api, type Group } from "@/api_factory/modules/group"

export const useCreateGroup = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)
  const groupData = ref<any>(null)

  const createGroup = async (branchId: string, group: Group) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const response = await group_mgt_api.$_create_group(branchId, group)
      success.value = true
      groupData.value = response.data.data
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to create group"
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    success,
    groupData,
    createGroup,
  }
}
