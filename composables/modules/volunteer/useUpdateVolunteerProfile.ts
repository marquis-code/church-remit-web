import { ref } from "vue"
import { volunteer_mgt_api, type VolunteerProfile } from "@/api_factory/modules/volunteer"

export const useUpdateVolunteerProfile = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)
  const updatedProfile = ref<VolunteerProfile | null>(null)

  const updateVolunteerProfile = async (volunteerId: string, profile: VolunteerProfile) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const response = await volunteer_mgt_api.$_update_volunteer_profile(volunteerId, profile)
      success.value = true
      updatedProfile.value = response.data.data || null
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to update volunteer profile"
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    success,
    updatedProfile,
    updateVolunteerProfile,
  }
}
