import { ref } from "vue"
import { member_mgt_api, type Member } from "@/api_factory/modules/member"

export const useUpdateMember = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)
  const updatedMember = ref<Member | null>(null)

  const updateMember = async (memberId: string, memberData: Member) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const response = await member_mgt_api.$_update_member(memberId, memberData)
      success.value = true
      updatedMember.value = response.data.data || null
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to update member"
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    success,
    updatedMember,
    updateMember,
  }
}
