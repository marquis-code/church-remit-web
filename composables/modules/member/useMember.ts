import { ref } from "vue"
import { member_mgt_api, type Member, type FollowUpStatus } from "@/api_factory/modules/member"

export const useMember = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const members = ref<Member[]>([])
  const currentMember = ref<Member | null>(null)

  const createMember = async (branchId: string, memberData: Member) => {
    loading.value = true
    error.value = null

    try {
      const response = await member_mgt_api.$_create_member(branchId, memberData)
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to create member"
      throw err
    } finally {
      loading.value = false
    }
  }

  const getMembers = async (branchId: string, metadata: { status: string; search: string }) => {
    loading.value = true
    error.value = null

    try {
      const response = await member_mgt_api.$_get_members(metadata)
      members.value = response.data.data || []
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to fetch members"
      throw err
    } finally {
      loading.value = false
    }
  }

  const getMemberDetails = async (memberId: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await member_mgt_api.$_get_member_details(memberId)
      currentMember.value = response.data.data || null
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to fetch member details"
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateMember = async (memberId: string, memberData: Member) => {
    loading.value = true
    error.value = null

    try {
      const response = await member_mgt_api.$_update_member(memberId, memberData)
      if (currentMember.value && currentMember.value.email === memberData.email) {
        currentMember.value = { ...currentMember.value, ...memberData }
      }
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to update member"
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateFollowUpStatus = async (memberId: string, status: FollowUpStatus) => {
    loading.value = true
    error.value = null

    try {
      const response = await member_mgt_api.$_update_follow_up_status(memberId, status)
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to update follow-up status"
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteMember = async (memberId: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await member_mgt_api.$_delete_member(memberId)
      members.value = members.value.filter((member) => member.email !== memberId)
      if (currentMember.value && currentMember.value.email === memberId) {
        currentMember.value = null
      }
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to delete member"
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    members,
    currentMember,
    createMember,
    getMembers,
    getMemberDetails,
    updateMember,
    updateFollowUpStatus,
    deleteMember,
  }
}
