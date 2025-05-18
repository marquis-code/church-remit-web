import { ref } from "vue"
import { group_mgt_api, type GroupMemberPayload } from "@/api_factory/modules/group"

export const useAddMemberToGroup = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const addMemberToGroup = async (groupId: string, memberId: string, payload: GroupMemberPayload) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const response = await group_mgt_api.$_add_member_to_group(groupId, memberId, payload)
      success.value = true
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to add member to group"
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    success,
    addMemberToGroup,
  }
}
