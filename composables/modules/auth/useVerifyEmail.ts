import { ref } from "vue"
import { auth_api } from "@/api_factory/modules/auth"

export const useVerifyEmail = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const verifyEmail = async (token: string) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const response = await auth_api.$_verify_email(token)
      success.value = true
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to verify email"
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    success,
    verifyEmail,
  }
}
