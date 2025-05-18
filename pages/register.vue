<!-- pages/auth/register.vue -->
<template>
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold mb-2">Create your account</h1>
        <p class="text-gray-600">Join our church management platform</p>
      </div>
  
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-xs font-medium text-gray-700">Full Name</label>
          <input 
            v-model="form.name"
            type="text"
            :class="[
              'mt-1 block w-full rounded-lg border px-3 py-3 text-sm outline-none px-2',
              errors.name ? 'border-red-300' : 'border-gray-300'
            ]"
            placeholder="Enter your full name"
          />
          <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
        </div>
  
        <div>
          <label class="block text-xs font-medium text-gray-700">Email</label>
          <input 
            v-model="form.email"
            type="email"
            :class="[
              'mt-1 block w-full rounded-lg border px-3 py-3 text-sm outline-none px-2',
              errors.email ? 'border-red-300' : 'border-gray-300'
            ]"
            placeholder="Enter your email"
          />
          <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
        </div>
  
        <div>
          <label class="block text-xs font-medium text-gray-700">Church Name</label>
          <input 
            v-model="form.churchName"
            type="text"
            :class="[
              'mt-1 block w-full rounded-lg border px-3 py-3 text-sm outline-none px-2',
              errors.churchName ? 'border-red-300' : 'border-gray-300'
            ]"
            placeholder="Enter your church name"
          />
          <p v-if="errors.churchName" class="mt-1 text-sm text-red-600">{{ errors.churchName }}</p>
        </div>
  
        <div>
          <label class="block text-xs font-medium text-gray-700">Phone</label>
          <input 
            v-model="form.phone"
            type="tel"
            :class="[
              'mt-1 block w-full rounded-lg border px-3 py-3 text-sm outline-none px-2',
              errors.phone ? 'border-red-300' : 'border-gray-300'
            ]"
            placeholder="Enter your phone number"
          />
          <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
        </div>
  
       <section class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-xs font-medium text-gray-700">Password</label>
          <div class="relative">
            <input 
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              :class="[
                'mt-1 block w-full rounded-lg border px-3 py-3 text-sm outline-none px-2 pr-10',
                errors.password ? 'border-red-300' : 'border-gray-300'
              ]"
              placeholder="Create a password"
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
  
        <div>
          <label class="block text-xs font-medium text-gray-700">Confirm Password</label>
          <input 
            v-model="form.confirmPassword"
            type="password"
            :class="[
              'mt-1 block w-full rounded-lg border px-3 py-3 text-sm outline-none px-2',
              errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
            ]"
            placeholder="Confirm your password"
          />
          <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600">{{ errors.confirmPassword }}</p>
        </div>
       </section>
  
        <div>
          <label class="block text-xs font-medium text-gray-700">Account Type</label>
          <select 
            v-model="form.accountType"
            :class="[
              'mt-1 block w-full rounded-lg border px-3 py-3 text-sm outline-none px-2',
              errors.accountType ? 'border-red-300' : 'border-gray-300'
            ]"
          >
            <option value="">Select account type</option>
            <option value="administrator">Administrator</option>
            <option value="finance_officer">Finance Officer</option>
            <option value="member">Member</option>
          </select>
          <p v-if="errors.accountType" class="mt-1 text-sm text-red-600">{{ errors.accountType }}</p>
        </div>
  
        <div class="flex items-center">
          <input 
            v-model="form.agreeTerms"
            type="checkbox"
            class="rounded border-gray-300 text-blue-600"
          />
          <label class="ml-2 block text-sm text-gray-900">
            I agree to the 
            <a href="#" class="text-blue-600 hover:text-blue-500">Terms of Service</a>
            and
            <a href="#" class="text-blue-600 hover:text-blue-500">Privacy Policy</a>
          </label>
        </div>
        <p v-if="errors.agreeTerms" class="mt-1 text-sm text-red-600">{{ errors.agreeTerms }}</p>
  
        <button 
          type="submit"
          :disabled="isLoading"
          class="w-full bg-blue-600 text-white text-sm rounded-lg px-4 py-3 hover:bg-blue-700 disabled:opacity-50"
        >
          <span v-if="isLoading">
            <Loader class="animate-spin  w-5 h-5 mx-auto" />
          </span>
          <span v-else>Create Account</span>
        </button>
      </form>
  
      <p class="mt-6 text-center text-sm text-gray-600">
        Already have an account?
        <NuxtLink 
          to="/"
          class="text-blue-600 hover:text-blue-500"
        >
          Sign in
        </NuxtLink>
      </p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { EyeClosedIcon, EyeIcon, Loader } from 'lucide-vue-next'
    import { useCreateAdmin } from "@/composables/modules/auth/useCreateAdmin"
  const {  createAdmin, loading } = useCreateAdmin()
  
  definePageMeta({
    layout: 'auth'
  })
  
//   const authStore = useAuthStore()
  const router = useRouter()
  
  const form = reactive({
    name: '',
    email: '',
    churchName: '',
    phone: '',
    password: '',
    confirmPassword: '',
    accountType: '',
    agreeTerms: false
  })
  
  const errors = reactive({
    name: '',
    email: '',
    churchName: '',
    phone: '',
    password: '',
    confirmPassword: '',
    accountType: '',
    agreeTerms: ''
  })
  
  const isLoading = ref(false)
  const showPassword = ref(false)
  
  const validateForm = () => {
    let isValid = true
    Object.keys(errors).forEach(key => errors[key as keyof typeof errors] = '')
  
    if (!form.name) {
      errors.name = 'Full name is required'
      isValid = false
    }
  
    if (!form.email) {
      errors.email = 'Email is required'
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = 'Email is invalid'
      isValid = false
    }
  
    if (!form.churchName) {
      errors.churchName = 'Church name is required'
      isValid = false
    }
  
    if (!form.phone) {
      errors.phone = 'Phone number is required'
      isValid = false
    }
  
    if (!form.password) {
      errors.password = 'Password is required'
      isValid = false
    } else if (form.password.length < 8) {
      errors.password = 'Password must be at least 8 characters'
      isValid = false
    }
  
    if (form.password !== form.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
      isValid = false
    }
  
    if (!form.accountType) {
      errors.accountType = 'Account type is required'
      isValid = false
    }
  
    if (!form.agreeTerms) {
      errors.agreeTerms = 'You must agree to the Terms of Service and Privacy Policy'
      isValid = false
    }
  
    return isValid
  }
  
  const handleSubmit = async () => {
    if (!validateForm()) return
  
    try {
      isLoading.value = true
    //   await authStore.register(form)
      router.push('/auth/verify-email')
    } catch (error: any) {
      errors.email = error.message
    } finally {
      isLoading.value = false
    }
  }
  </script>