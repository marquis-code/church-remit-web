import { ref } from "vue"
import { group_mgt_api, type Group, type GroupMemberPayload } from "@/api_factory/modules/group"

export const useGroup = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const groups = ref<Group[]>([])

  const createGroup = async (branchId: string, groupData: Group) => {
    loading.value = true
    error.value = null

    try {
      const response = await group_mgt_api.$_create_group(branchId, groupData)
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to create group"
      throw err
    } finally {
      loading.value = false
    }
  }

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

  const addMemberToGroup = async (groupId: string, memberId: string, payload: GroupMemberPayload) => {
    loading.value = true
    error.value = null

    try {
      const response = await group_mgt_api.$_add_member_to_group(groupId, memberId, payload)
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
    groups,
    createGroup,
    getGroups,
    addMemberToGroup,
  }
}
