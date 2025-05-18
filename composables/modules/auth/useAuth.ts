import { ref } from "vue"
import { auth_api } from "@/api_factory/modules/auth"

export const useAuth = () => {
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

  const login = async (credential: {
    email: string
    password: string
  }) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const response = await auth_api.$_admin_login(credential)
      success.value = true
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to login"
      throw err
    } finally {
      loading.value = false
    }
  }

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
    createAdmin,
    login,
    verifyEmail,
    forgotPassword,
    resetPassword,
  }
}
