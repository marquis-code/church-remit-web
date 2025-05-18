import { ref } from "vue"
import { auth_api } from "@/api_factory/modules/auth"

export const useResetPassword = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const resetPassword = async (token: string, payload: { password: string }) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const response = await auth_api.$_reset_password(payload)
      success.value = true
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to reset password"
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    success,
    resetPassword,
  }
}
