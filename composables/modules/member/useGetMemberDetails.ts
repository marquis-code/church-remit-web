import { ref } from "vue"
import { member_mgt_api, type Member } from "@/api_factory/modules/member"

export const useGetMemberDetails = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const member = ref<Member | null>(null)

  const getMemberDetails = async (memberId: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await member_mgt_api.$_get_member_details(memberId)
      member.value = response.data.data || null
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to fetch member details"
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    member,
    getMemberDetails,
  }
}
