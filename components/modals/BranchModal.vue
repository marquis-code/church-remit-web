<template>
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" class="relative z-10" @close="closeModal">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>
  
        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                  {{ editData ? 'Edit Branch' : 'Create New Branch' }}
                </DialogTitle>
  
                <form @submit.prevent="submitForm" class="mt-4">
                  <div class="space-y-6">
                    <!-- Basic Information -->
                    <div class="border-b border-gray-900/10 pb-6">
                      <h2 class="text-base font-semibold leading-7 text-gray-900">Basic Information</h2>
                      <p class="mt-1 text-sm leading-6 text-gray-600">
                        Provide the basic details about the branch.
                      </p>
  
                      <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                        <div class="sm:col-span-4">
                          <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Branch Name</label>
                          <div class="mt-2">
                            <input
                              type="text"
                              id="name"
                              v-model="formData.name"
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              :class="{ 'ring-red-300': v$.name.$error }"
                              @blur="v$.name.$touch"
                            />
                            <p v-if="v$.name.$error" class="mt-1 text-sm text-red-600">
                              {{ v$.name.$errors[0].$message }}
                            </p>
                          </div>
                        </div>
  
                        <div class="sm:col-span-4">
                          <label for="location" class="block text-sm font-medium leading-6 text-gray-900">Location</label>
                          <div class="mt-2">
                            <input
                              type="text"
                              id="location"
                              v-model="formData.location"
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              :class="{ 'ring-red-300': v$.location.$error }"
                              @blur="v$.location.$touch"
                            />
                            <p v-if="v$.location.$error" class="mt-1 text-sm text-red-600">
                              {{ v$.location.$errors[0].$message }}
                            </p>
                          </div>
                        </div>
  
                        <div class="sm:col-span-4">
                          <label for="phone" class="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
                          <div class="mt-2">
                            <input
                              type="tel"
                              id="phone"
                              v-model="formData.phone"
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              :class="{ 'ring-red-300': v$.phone.$error }"
                              @blur="v$.phone.$touch"
                            />
                            <p v-if="v$.phone.$error" class="mt-1 text-sm text-red-600">
                              {{ v$.phone.$errors[0].$message }}
                            </p>
                          </div>
                        </div>
  
                        <div class="sm:col-span-4">
                          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
                          <div class="mt-2">
                            <input
                              type="email"
                              id="email"
                              v-model="formData.email"
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              :class="{ 'ring-red-300': v$.email.$error }"
                              @blur="v$.email.$touch"
                            />
                            <p v-if="v$.email.$error" class="mt-1 text-sm text-red-600">
                              {{ v$.email.$errors[0].$message }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
  
                    <!-- Additional Details -->
                    <div class="border-b border-gray-900/10 pb-6">
                      <h2 class="text-base font-semibold leading-7 text-gray-900">Additional Details</h2>
                      <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                        <div class="sm:col-span-6">
                          <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Description</label>
                          <div class="mt-2">
                            <textarea
                              id="description"
                              v-model="formData.description"
                              rows="3"
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
  
                        <div class="sm:col-span-3">
                          <label for="capacity" class="block text-sm font-medium leading-6 text-gray-900">Seating Capacity</label>
                          <div class="mt-2">
                            <input
                              type="number"
                              id="capacity"
                              v-model="formData.capacity"
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
  
                        <div class="sm:col-span-3">
                          <label for="status" class="block text-sm font-medium leading-6 text-gray-900">Status</label>
                          <div class="mt-2">
                            <select
                              id="status"
                              v-model="formData.status"
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                              <option value="active">Active</option>
                              <option value="pending">Pending</option>
                              <option value="inactive">Inactive</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
  
                    <!-- Service Times -->
                    <div class="border-b border-gray-900/10 pb-6">
                      <div class="flex items-center justify-between">
                        <h2 class="text-base font-semibold leading-7 text-gray-900">Service Times</h2>
                        <button
                          type="button"
                          @click="addServiceTime"
                          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          <Plus class="h-4 w-4" />
                          Add Service Time
                        </button>
                      </div>
                      
                      <div class="mt-4 space-y-4">
                        <TransitionGroup
                          enter-active-class="transition-all duration-300 ease-out"
                          enter-from-class="opacity-0 -translate-y-2"
                          enter-to-class="opacity-100 translate-y-0"
                          leave-active-class="transition-all duration-200 ease-in"
                          leave-from-class="opacity-100"
                          leave-to-class="opacity-0"
                        >
                          <div
                            v-for="(service, index) in formData.serviceTimes"
                            :key="index"
                            class="flex items-center gap-4"
                          >
                            <div class="flex-1 grid grid-cols-2 gap-4">
                              <div>
                                <label :for="`day-${index}`" class="block text-sm font-medium leading-6 text-gray-900">Day</label>
                                <select
                                  :id="`day-${index}`"
                                  v-model="service.day"
                                  class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                  <option v-for="day in weekDays" :key="day" :value="day">{{ day }}</option>
                                </select>
                              </div>
                              <div>
                                <label :for="`time-${index}`" class="block text-sm font-medium leading-6 text-gray-900">Time</label>
                                <input
                                  type="time"
                                  :id="`time-${index}`"
                                  v-model="service.time"
                                  class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                            <button
                              type="button"
                              @click="removeServiceTime(index)"
                              class="mt-6 rounded-md bg-red-50 p-2 text-red-600 hover:bg-red-100"
                            >
                              <Trash2 class="h-4 w-4" />
                            </button>
                          </div>
                        </TransitionGroup>
                      </div>
                    </div>
                  </div>
  
                  <div class="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      class="text-sm font-semibold leading-6 text-gray-900"
                      @click="closeModal"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      :disabled="isSubmitting"
                      class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
                    >
                      <Loader2 v-if="isSubmitting" class="mr-2 h-4 w-4 animate-spin" />
                      {{ isSubmitting ? 'Saving...' : (editData ? 'Update Branch' : 'Create Branch') }}
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { required, email, helpers } from '@vuelidate/validators'
  import {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionRoot,
    TransitionChild,
  } from '@headlessui/vue'
  import { Plus, Trash2, Loader2 } from 'lucide-vue-next'
  
  const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false
    },
    editData: {
      type: Object,
      default: null
    }
  })
  
  const emit = defineEmits(['close', 'created', 'updated'])
  
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  
  const formData = ref({
    name: '',
    location: '',
    phone: '',
    email: '',
    description: '',
    capacity: 0,
    status: 'active',
    serviceTimes: []
  })
  
  const rules = computed(() => ({
    name: { required: helpers.withMessage('Branch name is required', required) },
    location: { required: helpers.withMessage('Location is required', required) },
    phone: { required: helpers.withMessage('Phone number is required', required) },
    email: { required: helpers.withMessage('Email is required', required), email: helpers.withMessage('Invalid email format', email) }
  }))
  
  const v$ = useVuelidate(rules, formData)
  
  const isSubmitting = ref(false)
  
  watch(() => props.editData, (newVal) => {
    if (newVal) {
      formData.value = { ...newVal }
    } else {
      resetForm()
    }
  }, { immediate: true })
  
  const resetForm = () => {
    formData.value = {
      name: '',
      location: '',
      phone: '',
      email: '',
      description: '',
      capacity: 0,
      status: 'active',
      serviceTimes: []
    }
    v$.value.$reset()
  }
  
  const addServiceTime = () => {
    formData.value.serviceTimes.push({
      day: weekDays[0],
      time: ''
    })
  }
  
  const removeServiceTime = (index: number) => {
    formData.value.serviceTimes.splice(index, 1)
  }
  
  const submitForm = async () => {
    const isValid = await v$.value.$validate()
    if (!isValid) return
  
    isSubmitting.value = true
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (props.editData) {
        emit('updated', {
          id: props.editData.id,
          ...formData.value
        })
      } else {
        emit('created', {
          id: Math.random().toString(36).substr(2, 9),
          ...formData.value
        })
      }
      
      closeModal()
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      isSubmitting.value = false
    }
  }
  
  const closeModal = () => {
    emit('close')
    resetForm()
  }
  </script>
  
  <style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>