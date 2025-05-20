import { ref } from "vue"
import { auth_api } from "@/api_factory/modules/auth"
import { useUser } from "@/composables/auth/user"

export const useCreateAdmin = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)
  const { createUser } = useUser()
  const router = useRouter()

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
      console.log(response, 'hee ooooo')
      createUser(response?.data?.data)
      router.push('/dashboard')
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
