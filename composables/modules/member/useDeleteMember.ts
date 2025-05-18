import { ref } from "vue"
import { member_mgt_api } from "@/api_factory/modules/member"

export const useDeleteMember = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const deleteMember = async (memberId: string) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const response = await member_mgt_api.$_delete_member(memberId)
      success.value = true
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
    success,
    deleteMember,
  }
}
