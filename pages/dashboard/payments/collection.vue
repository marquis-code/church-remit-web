<template>
   <main>
    <div class="space-y-6">
        <!-- Page header -->
        <div class="sm:flex sm:items-center sm:justify-between">
          <div>
            <h2 class="text-2xl font-bold leading-7 text-gray-900">Payment Collection</h2>
            <p class="mt-1 text-sm text-gray-500">Accept donations and payments through multiple channels</p>
          </div>
          <div class="mt-4 sm:mt-0">
            <button
              @click="showDonationModal = true"
              class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <PlusIcon class="h-5 w-5 mr-1.5" />
              New Donation
            </button>
          </div>
        </div>
  
        <!-- Payment Methods -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="method in paymentMethods" :key="method.name"
            class="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-indigo-200"
            @click="selectPaymentMethod(method)"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-indigo-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="relative">
              <div :class="[
                'inline-flex rounded-lg p-3',
                method.bgColor
              ]">
                <component :is="method.icon" class="h-6 w-6" :class="method.iconColor" />
              </div>
              <h3 class="mt-4 text-lg font-medium text-gray-900">{{ method.name }}</h3>
              <p class="mt-2 text-sm text-gray-500">{{ method.description }}</p>
            </div>
          </div>
        </div>
  
        <!-- Donation Categories -->
        <div class="rounded-lg border border-gray-200 bg-white shadow">
          <div class="p-6">
            <h3 class="text-base font-semibold leading-6 text-gray-900">Donation Categories</h3>
            <div class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div v-for="category in categories" :key="category.name"
                class="relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div class="absolute top-6 right-6">
                  <div :class="[
                    'inline-flex rounded-full px-2 py-1 text-xs font-medium',
                    category.type === 'recurring' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  ]">
                    {{ category.type === 'recurring' ? 'Recurring' : 'One-time' }}
                  </div>
                </div>
                <div :class="[
                  'inline-flex rounded-lg p-3',
                  category.bgColor
                ]">
                  <component :is="category.icon" class="h-6 w-6" :class="category.iconColor" />
                </div>
                <h3 class="mt-4 text-lg font-medium text-gray-900">{{ category.name }}</h3>
                <p class="mt-2 text-sm text-gray-500">{{ category.description }}</p>
                <div class="mt-4">
                  <button
                    @click="showDonationModal = true"
                    class="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Donate now
                    <ArrowRight class="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- QR Code Section -->
        <div class="rounded-lg border border-gray-200 bg-white shadow">
          <div class="p-6">
            <div class="lg:flex lg:items-center lg:justify-between">
              <div class="min-w-0 flex-1">
                <h3 class="text-base font-semibold leading-6 text-gray-900">Quick Payment</h3>
                <p class="mt-1 text-sm text-gray-500">Scan QR code or use USSD to make a quick payment</p>
              </div>
              <div class="mt-5 flex lg:ml-4 lg:mt-0">
                <span class="hidden sm:block">
                  <button
                    type="button"
                    class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <QrCode class="h-5 w-5 mr-1.5 text-gray-500" />
                    Download QR Code
                  </button>
                </span>
              </div>
            </div>
            <div class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div class="flex justify-center items-center p-6 bg-gray-50 rounded-lg">
                <img src="@/assets/img/qr-code.jpg" alt="QR Code" class="w-48 h-48" />
              </div>
              <div class="space-y-4">
                <div class="rounded-md bg-gray-50 p-4">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <Hash class="h-5 w-5 text-gray-400" />
                    </div>
                    <div class="ml-3">
                      <h3 class="text-sm font-medium text-gray-800">USSD Code</h3>
                      <div class="mt-2 text-sm text-gray-700">
                        <p>Dial <span class="font-mono font-medium">*123*1234#</span> to make a payment</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="rounded-md bg-gray-50 p-4">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <Smartphone class="h-5 w-5 text-gray-400" />
                    </div>
                    <div class="ml-3">
                      <h3 class="text-sm font-medium text-gray-800">Mobile Payment</h3>
                      <div class="mt-2 text-sm text-gray-700">
                        <p>Send payment to <span class="font-medium">0123456789</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- New Donation Modal -->
      <TransitionRoot appear :show="showDonationModal" as="template">
        <Dialog as="div" class="relative z-50" @close="showDonationModal = false">
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
                <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                    Make a Donation
                  </DialogTitle>
                  <div class="mt-4 space-y-4">
                    <div>
                      <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
                      <select
                        id="category"
                        v-model="donation.category"
                        class="mt-1 block w-full rounded-md border-[0.5px] px-3 py-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option v-for="category in categories" :key="category.name" :value="category.name">
                          {{ category.name }}
                        </option>
                      </select>
                    </div>
                    <div>
                      <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
                      <div class="relative mt-1 rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <span class="text-gray-500 sm:text-sm">₦</span>
                        </div>
                        <input
                          type="number"
                          id="amount"
                          v-model="donation.amount"
                          class="block w-full rounded-md border-[0.5px] px-3 py-3 border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div>
                      <label for="payment-method" class="block text-sm font-medium text-gray-700">Payment Method</label>
                      <select
                        id="payment-method"
                        v-model="donation.paymentMethod"
                        class="mt-1 block w-full rounded-md border-[0.5px] px-3 py-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option v-for="method in paymentMethods" :key="method.name" :value="method.name">
                          {{ method.name }}
                        </option>
                      </select>
                    </div>
                    <div class="flex items-center">
                      <input
                        id="recurring"
                        v-model="donation.isRecurring"
                        type="checkbox"
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label for="recurring" class="ml-2 block text-sm text-gray-900">Make this a recurring donation</label>
                    </div>
                    <div v-if="donation.isRecurring" class="space-y-4">
                      <div>
                        <label for="frequency" class="block text-sm font-medium text-gray-700">Frequency</label>
                        <select
                          id="frequency"
                          v-model="donation.frequency"
                          class="mt-1 block w-full rounded-md border-[0.5px] px-3 py-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                          <option value="quarterly">Quarterly</option>
                          <option value="yearly">Yearly</option>
                        </select>
                      </div>
                      <div>
                        <label for="duration" class="block text-sm font-medium text-gray-700">Duration</label>
                        <select
                          id="duration"
                          v-model="donation.duration"
                          class="mt-1 block w-full rounded-md border-[0.5px] px-3 py-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value="3">3 months</option>
                          <option value="6">6 months</option>
                          <option value="12">12 months</option>
                          <option value="0">Until cancelled</option>
                        </select>
                      </div>
                    </div>
                  </div>
  
                  <div class="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      @click="showDonationModal = false"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      @click="processDonation"
                    >
                      Proceed to Payment
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
   </main>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue';
  import {
    PlusIcon,
    CreditCard,
    Smartphone,
    Wallet,
    // Bank,
    QrCode,
    Hash,
    ArrowRight,
    Heart,
    Gift,
    Globe,
    Star
  } from 'lucide-vue-next';
  
  // Payment methods
  const paymentMethods = [
    {
      name: 'Card Payment',
      description: 'Pay with debit or credit card',
      icon: CreditCard,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      name: 'Bank Transfer',
      description: 'Direct bank transfer',
    //   icon: Bank,
     icon: CreditCard,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      name: 'USSD',
      description: 'Pay using USSD code',
      icon: Hash,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      name: 'Mobile Wallet',
      description: 'Pay with mobile money',
      icon: Smartphone,
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600'
    }
  ];
  
  // Donation categories
  const categories = [
    {
      name: 'Tithes',
      description: 'Regular tithe payments',
      icon: Heart,
      type: 'recurring',
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600'
    },
    {
      name: 'Offerings',
      description: 'General offerings',
      icon: Gift,
      type: 'one-time',
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    },
    {
      name: 'Missions',
      description: 'Support mission work',
      icon: Globe,
      type: 'one-time',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      name: 'Special Donations',
      description: 'Special purpose donations',
      icon: Star,
      type: 'one-time',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    }
  ];
  
  // Modal state
  const showDonationModal = ref(false);
  
  // Donation form state
  const donation = reactive({
    category: '',
    amount: '',
    paymentMethod: '',
    isRecurring: false,
    frequency: 'monthly',
    duration: '12'
  });
  
  // Functions
  const selectPaymentMethod = (method: any) => {
    donation.paymentMethod = method.name;
    showDonationModal.value = true;
  };
  
  const processDonation = () => {
    // In a real app, this would make an API call to process the payment
    console.log('Processing donation:', donation);
    
    // Reset form and close modal
    donation.category = '';
    donation.amount = '';
    donation.paymentMethod = '';
    donation.isRecurring = false;
    donation.frequency = 'monthly';
    donation.duration = '12';
    
    showDonationModal.value = false;
  };

  definePageMeta({
      layout: 'dashboard'
  })
  </script>