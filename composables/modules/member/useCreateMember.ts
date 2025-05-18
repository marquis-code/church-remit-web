import { ref } from "vue"
import { member_mgt_api, type Member } from "@/api_factory/modules/member"

export const useCreateMember = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)
  const memberData = ref<any>(null)

  const createMember = async (branchId: string, member: Member) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const response = await member_mgt_api.$_create_member(branchId, member)
      success.value = true
      memberData.value = response.data.data
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to create member"
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    success,
    memberData,
    createMember,
  }
}
