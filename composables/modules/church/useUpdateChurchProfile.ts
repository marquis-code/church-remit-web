import { ref } from "vue"
import { church_mgt_api } from "@/api_factory/modules/church"

type ChurchProfile = {
  name: string
  address: string
  city: string
  state: string
  country: string
  postalCode: string
  email: string
  phoneNumber: string
  website: string
  description: string
}


export const useUpdateChurchProfile = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const updateChurchProfile = async (profileData: ChurchProfile) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const response = await church_mgt_api.updateChurchProfile(profileData)
      success.value = true
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to update church profile"
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    success,
    updateChurchProfile,
  }
}
