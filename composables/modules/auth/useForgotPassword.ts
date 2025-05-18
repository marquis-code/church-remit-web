import { ref } from "vue"
import { auth_api } from "@/api_factory/modules/auth"

export const useForgotPassword = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const forgotPassword = async (payload: { email: string }) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const response = await auth_api.$_forgot_password(payload)
      success.value = true
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to process forgot password request"
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    success,
    forgotPassword,
  }
}
