import { ref } from "vue"
import { member_mgt_api, type FollowUpStatus } from "@/api_factory/modules/member"

export const useUpdateFollowUpStatus = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const updateFollowUpStatus = async (memberId: string, status: FollowUpStatus) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const response = await member_mgt_api.$_update_follow_up_status(memberId, status)
      success.value = true
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to update follow-up status"
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    success,
    updateFollowUpStatus,
  }
}
