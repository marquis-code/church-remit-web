import { ref } from "vue"
import { auth_api } from "@/api_factory/modules/auth"

export const useCreateAdmin = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const createAdmin = async (credential: {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    password: string
    churchName: string
  }) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const response = await auth_api.$_create_admin(credential)
      success.value = true
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to create admin"
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    success,
    createAdmin,
  }
}
