import { ref } from "vue"
import { volunteer_mgt_api, type VolunteerProfile } from "@/api_factory/modules/volunteer"

export const useCreateVolunteerProfile = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)
  const volunteerData = ref<any>(null)

  const createVolunteerProfile = async (memberId: string, profile: VolunteerProfile) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const response = await volunteer_mgt_api.$_create_volunteer_profile(memberId, profile)
      success.value = true
      volunteerData.value = response.data.data
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to create volunteer profile"
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    success,
    volunteerData,
    createVolunteerProfile,
  }
}
