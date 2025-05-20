<!-- pages/auth/login.vue -->
<template>
  <div class="w-full max-w-md">
    <div class="text-center mb-8">
      <h1 class="text-2xl font-bold mb-2">Welcome back</h1>
      <p class="text-gray-600">Sign in to continue to your account</p>
    </div>

    <!-- Social Login -->
    <div class="space-y-4 mb-6">
      <button 
        @click="signInWithGoogle"
        class="w-full flex space-x-2 items-center justify-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-50"
      >
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#000000" viewBox="0 0 256 256"><path d="M239.82,114.19,72,18.16a16,16,0,0,0-16.12,0A15.68,15.68,0,0,0,48,31.87V224.13a15.68,15.68,0,0,0,7.92,13.67,16,16,0,0,0,16.12,0l167.78-96a15.75,15.75,0,0,0,0-27.62ZM64,212.67V43.33L148.69,128Zm96-73.36,18.92,18.92-88.5,50.66ZM90.4,47.1l88.53,50.67L160,116.69ZM193.31,150l-22-22,22-22,38.43,22Z"></path></svg>
        Sign in with Google
      </button>
      
      <button 
        @click="signInWithFacebook"
        class="w-full flex space-x-2 items-center justify-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-50"
      >
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#000000" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"></path></svg>
        Sign in with Facebook
      </button>
    </div>

    <div class="relative my-6">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-300"></div>
      </div>
      <div class="relative flex justify-center text-sm">
        <span class="px-2 bg-white text-gray-500">or</span>
      </div>
    </div>

    <!-- Login Form -->
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Email/Phone Number</label>
        <input 
          v-model="form.email"
          type="text"
          :class="[
            'mt-1 block w-full rounded-lg border px-3 py-3.5 border-[0.5px] outline-none',
            errors.email ? 'border-red-300' : 'border-gray-300'
          ]"
          placeholder="Enter your email or phone number"
        />
        <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Password</label>
        <div class="relative">
          <input 
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            :class="[
              'mt-1 block w-full rounded-lg border px-3 py-3.5 border-[0.5px] outline-none pr-10',
              errors.password ? 'border-red-300' : 'border-gray-300'
            ]"
            placeholder="Enter your password"
          />
          <button 
            type="button"
            @click="showPassword = !showPassword"
            class="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <EyeIcon v-if="showPassword" class="w-5 h-5 text-gray-400" />
            <EyeClosedIcon v-else class="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
      </div>

      <div class="flex items-center justify-between">
        <label class="flex items-center">
          <input 
            v-model="form.rememberMe"
            type="checkbox"
            class="rounded border-gray-300 text-blue-600"
          />
          <span class="ml-2 text-sm text-gray-600">Remember me</span>
        </label>
        <NuxtLink 
          to="/forgot-password"
          class="text-sm text-blue-600 hover:text-blue-500"
        >
          Forgot password?
        </NuxtLink>
      </div>

      <button 
              type="submit"
              :disabled="loading"
              class="w-full bg-blue-600 text-white rounded-lg px-4 py-3.5 hover:bg-blue-700 disabled:opacity-50"
            >
             {{ loading ? 'processing..' : 'SignIn'}}
            </button>
        <!-- <div class="pt-5">
          <button 
              type="submit"
              :disabled="isLoading"
              class="w-full bg-blue-600 text-white rounded-lg px-4 py-3.5 hover:bg-blue-700 disabled:opacity-50"
            >
              <span v-if="isLoading">
                <icon-loader class="animate-spin w-5 h-5 mx-auto" />
              </span>
              <span v-else>Sign In</span>
            </button>
        </div> -->
    </form>

    <p class="mt-6 text-center text-sm text-gray-600">
      Don't have an account?
      <NuxtLink 
        to="/register"
        class="text-blue-600 hover:text-blue-500"
      >
        Create an account
      </NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
  import { EyeClosedIcon, EyeIcon } from 'lucide-vue-next'
  import { useAdminLogin } from "@/composables/modules/auth/useAdminLogin"
  const {  login, loading } = useAdminLogin()

definePageMeta({
  layout: 'auth'
})

// const authStore = useAuthStore()
const router = useRouter()

const form = reactive({
  email: '',
  password: '',
  rememberMe: false
})

const errors = reactive({
  email: '',
  password: ''
})

const isLoading = ref(false)
const showPassword = ref(false)

const validateForm = () => {
  let isValid = true
  errors.email = ''
  errors.password = ''

  if (!form.email) {
    errors.email = 'Email or phone number is required'
    isValid = false
  }

  if (!form.password) {
    errors.password = 'Password is required'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  try {
    isLoading.value = true
    // await authStore.login({
    //   email: form.email,
    //   password: form.password,
    //   rememberMe: form.rememberMe
    // })
    const { rememberMe, ...rest } = form
    await login(rest).then(() => {
      // router.push('/dashboard')
    })
    // router.push('/dashboard')
  } catch (error: any) {
    errors.email = error.message
  } finally {
    isLoading.value = false
  }
}

const signInWithGoogle = async () => {
  try {
    isLoading.value = true
    // await authStore.loginWithGoogle()
    router.push('/dashboard')
  } catch (error: any) {
    console.error('Google sign-in failed:', error)
  } finally {
    isLoading.value = false
  }
}

const signInWithFacebook = async () => {
  try {
    isLoading.value = true
    // await authStore.loginWithFacebook()
    const { rememberMe, ...rest } = form
    await login(rest).then(() => {
      // router.push('/dashboard')
    })
  } catch (error: any) {
    console.error('Facebook sign-in failed:', error)
  } finally {
    isLoading.value = false
  }
}
</script>