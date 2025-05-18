import { ref } from "vue"
import { volunteer_mgt_api, type VolunteerProfile, type VolunteerQueryParams } from "@/api_factory/modules/volunteer"

export const useGetVolunteers = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const volunteers = ref<VolunteerProfile[]>([])

  const getVolunteers = async (branchId: string, params?: VolunteerQueryParams) => {
    loading.value = true
    error.value = null

    try {
      const response = await volunteer_mgt_api.$_get_volunteers(branchId, params)
      volunteers.value = response.data.data || []
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to fetch volunteers"
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    volunteers,
    getVolunteers,
  }
}
