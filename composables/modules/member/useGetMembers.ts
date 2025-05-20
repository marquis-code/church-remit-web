import { ref } from "vue"
import { member_mgt_api, type Member } from "@/api_factory/modules/member"

export const useGetMembers = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const members = ref<Member[]>([])

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

  onMounted(()=> {
    getMembers()
  })

  return {
    loading,
    error,
    members,
    getMembers,
  }
}
