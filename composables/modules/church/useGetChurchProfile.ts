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

export const useGetChurchProfile = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const churchProfile = ref<ChurchProfile | null>(null)

  const getChurchProfile = async (churchId: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await church_mgt_api.getChurchProfile(churchId)
      churchProfile.value = response.data.data || null
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to fetch church profile"
      throw err
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    console.log('hello')
    getChurchProfile()
  })

  return {
    loading,
    error,
    churchProfile,
    getChurchProfile
  }
}
