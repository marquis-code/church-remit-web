import { ref } from "vue"
import { auth_api } from "@/api_factory/modules/auth"
import { useUser } from "@/composables/auth/user"

export const useAdminLogin = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)
  const router = useRouter()
  const { createUser } = useUser()

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
      console.log(response?.data?.data, 'hgsgdfhjghjdgfdhjgjfgfd')
      createUser(response?.data?.data)
      router.push('/dashboard')
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to login"
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    success,
    login,
  }
}
