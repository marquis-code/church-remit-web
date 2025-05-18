<template>
    <div class="flex items-center justify-center">
      <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div class="text-center">
          <!-- <img class="mx-auto h-20 w-auto" src="/logo.svg" alt="ChurchRemit Logo" /> -->
          <h2 class="mt-6 text-xl font-extrabold text-gray-900">Reset your password</h2>
          <p class="mt-2 text-sm text-gray-600">
            Enter your email or phone number and we'll send you a code to reset your password
          </p>
        </div>
        
        <div v-if="step === 'request'">
          <form class="mt-8 space-y-6" @submit.prevent="requestReset">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email or Phone Number</label>
              <div class="mt-1">
                <input
                  id="email"
                  v-model="email"
                  name="email"
                  type="text"
                  required
                  class="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your email or phone number"
                />
              </div>
            </div>
  
            <div class="pt-5">
              <button
                type="submit"
                class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                :disabled="isLoading"
              >
                <span v-if="isLoading" class="mr-2">
                  <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
                Send Reset Code
              </button>
            </div>
          </form>
        </div>
  
        <div v-if="step === 'verify'">
          <form class="mt-8 space-y-6" @submit.prevent="verifyCode">
            <div>
              <label for="code" class="block text-sm font-medium text-gray-700">Verification Code</label>
              <div class="mt-1">
                <input
                  id="code"
                  v-model="verificationCode"
                  name="code"
                  type="text"
                  required
                  class="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter the code we sent you"
                />
              </div>
            </div>
  
            <div class="pt-4">
              <button
                type="submit"
                class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                :disabled="isLoading"
              >
                Verify Code
              </button>
            </div>
          </form>
        </div>
  
        <div v-if="step === 'reset'">
          <form class="mt-8 space-y-6" @submit.prevent="resetPassword">
            <div>
              <label for="new-password" class="block text-sm font-medium text-gray-700">New Password</label>
              <div class="mt-1">
                <input
                  id="new-password"
                  v-model="newPassword"
                  name="new-password"
                  type="password"
                  required
                  class="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your new password"
                />
              </div>
            </div>
  
            <div>
              <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div class="mt-1">
                <input
                  id="confirm-password"
                  v-model="confirmPassword"
                  name="confirm-password"
                  type="password"
                  required
                  class="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Confirm your new password"
                />
              </div>
            </div>
  
            <div class="pt-3">
              <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                :disabled="isLoading"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
  
        <div v-if="step === 'success'">
          <div class="rounded-md bg-green-50 p-4 mt-8">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-green-800">Password reset successful</h3>
                <div class="mt-2 text-sm text-green-700">
                  <p>Your password has been reset successfully. You can now log in with your new password.</p>
                </div>
                <div class="mt-4">
                  <NuxtLink
                    to="/"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Go to Login
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div class="text-center mt-4">
          <p class="text-sm text-gray-600">
            Remember your password?
            <NuxtLink to="/" class="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const isLoading = ref(false)
  const step = ref('success')
  const email = ref('')
  const verificationCode = ref('')
  const newPassword = ref('')
  const confirmPassword = ref('')

  definePageMeta({
    layout: 'auth'
  })
  
  const requestReset = async () => {
    try {
      isLoading.value = true
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, you would call your API
      // const { data } = await $fetch('/api/auth/request-reset', {
      //   method: 'POST',
      //   body: { email: email.value }
      // })
      
      step.value = 'verify'
    } catch (error) {
      console.error('Request failed:', error)
    } finally {
      isLoading.value = false
    }
  }
  
  const verifyCode = async () => {
    try {
      isLoading.value = true
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, you would verify the code with your API
      // const { data } = await $fetch('/api/auth/verify-code', {
      //   method: 'POST',
      //   body: { 
      //     email: email.value,
      //     code: verificationCode.value 
      //   }
      // })
      
      step.value = 'reset'
    } catch (error) {
      console.error('Verification failed:', error)
    } finally {
      isLoading.value = false
    }
  }
  
  const resetPassword = async () => {
    try {
      if (newPassword.value !== confirmPassword.value) {
        alert('Passwords do not match')
        return
      }
      
      isLoading.value = true
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, you would reset the password with your API
      // const { data } = await $fetch('/api/auth/reset-password', {
      //   method: 'POST',
      //   body: { 
      //     email: email.value,
      //     code: verificationCode.value,
      //     password: newPassword.value
      //   }
      // })
      
      step.value = 'success'
    } catch (error) {
      console.error('Reset failed:', error)
    } finally {
      isLoading.value = false
    }
  }
  </script>