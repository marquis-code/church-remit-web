<template>
    <NuxtLayout name="banking">
      <div class="space-y-6">
        <!-- Page header -->
        <div>
          <h2 class="text-2xl font-bold leading-7 text-gray-900">Fund Transfers & Bill Payments</h2>
          <p class="mt-1 text-sm text-gray-500">Transfer funds and manage bill payments</p>
        </div>
  
        <!-- Quick Actions -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <button
            v-for="action in quickActions"
            :key="action.name"
            @click="action.onClick"
            class="group relative rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <div>
              <span :class="[
                'inline-flex rounded-lg p-3',
                action.bgColor
              ]">
                <component :is="action.icon" class="h-6 w-6" :class="action.iconColor" />
              </span>
            </div>
            <div class="mt-4">
              <h3 class="text-lg font-medium text-gray-900">
                {{ action.name }}
              </h3>
              <p class="mt-2 text-sm text-gray-500">
                {{ action.description }}
              </p>
            </div>
          </button>
        </div>
  
        <!-- Transfer Form -->
        <div class="rounded-lg border border-gray-200 bg-white shadow">
          <div class="p-6">
            <h3 class="text-base font-semibold leading-6 text-gray-900">Transfer Funds</h3>
            <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <div>
                <label for="from-account" class="block text-sm font-medium text-gray-700">From Account</label>
                <select
                  id="from-account"
                  v-model="transfer.fromAccount"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                >
                  <option v-for="account in accounts" :key="account.id" :value="account.id">
                    {{ account.name }} - {{ formatCurrency(account.balance) }}
                  </option>
                </select>
              </div>
              <div>
                <label for="to-account" class="block text-sm font-medium text-gray-700">To Account</label>
                <select
                  id="to-account"
                  v-model="transfer.toAccount"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                >
                  <option v-for="account in accounts" :key="account.id" :value="account.id">
                    {{ account.name }}
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
                    v-model="transfer.amount"
                    class="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div>
                <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  id="description"
                  v-model="transfer.description"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  placeholder="Enter transfer description"
                />
              </div>
            </div>
            <div class="mt-6 flex justify-end">
              <button
                @click="initiateTransfer"
                class="inline-flex items-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                <SendHorizontal class="mr-1.5 h-5 w-5" />
                Transfer Funds
              </button>
            </div>
          </div>
        </div>
  
        <!-- Bill Payments -->
        <div class="rounded-lg border border-gray-200 bg-white shadow">
          <div class="p-6">
            <h3 class="text-base font-semibold leading-6 text-gray-900">Bill Payments</h3>
            <div class="mt-6">
              <div class="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                <button
                  v-for="bill in billCategories"
                  :key="bill.name"
                  @click="selectBillCategory(bill)"
                  class="group flex flex-col items-center rounded-lg border border-gray-200 p-4 text-center hover:border-purple-500 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <component :is="bill.icon" class="h-8 w-8 text-gray-400 group-hover:text-purple-600" />
                  <span class="mt-2 text-sm font-medium text-gray-900">{{ bill.name }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Recent Bills -->
        <div class="rounded-lg border border-gray-200 bg-white shadow">
          <div class="p-6">
            <h3 class="text-base font-semibold leading-6 text-gray-900">Recent Bills</h3>
            <div class="mt-6 flow-root">
              <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table class="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Bill</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Account</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                          <span class="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr v-for="bill in recentBills" :key="bill.id" class="hover:bg-gray-50">
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-0">
                          <div class="flex items-center">
                            <div :class="[
                              'flex h-8 w-8 items-center justify-center rounded-full',
                              bill.bgColor
                            ]">
                              <component :is="bill.icon" class="h-4 w-4" :class="bill.iconColor" />
                            </div>
                            <div class="ml-4">
                              <div class="font-medium text-gray-900">{{ bill.name }}</div>
                              <div class="text-gray-500">{{ bill.reference }}</div>
                            </div>
                          </div>
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ bill.account }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ bill.date }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                          {{ formatCurrency(bill.amount) }}
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm">
                          <span :class="[
                            'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
                            bill.status === 'paid' ? 'bg-green-100 text-green-700' :
                            bill.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          ]">
                            {{ bill.status }}
                          </span>
                        </td>
                        <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <button
                            v-if="bill.status === 'pending'"
                            @click="payBill(bill)"
                            class="text-purple-600 hover:text-purple-900"
                          >
                            Pay Now
                          </button>
                          <button
                            v-else
                            @click="viewBillDetails(bill)"
                            class="text-gray-600 hover:text-gray-900"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Bill Payment Modal -->
      <TransitionRoot appear :show="showBillModal" as="template">
        <Dialog as="div" class="relative z-10" @close="showBillModal = false">
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
                    Pay Bill
                  </DialogTitle>
                  <div class="mt-4 space-y-4">
                    <div>
                      <label for="bill-account" class="block text-sm font-medium text-gray-700">From Account</label>
                      <select
                        id="bill-account"
                        v-model="billPayment.accountId"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      >
                        <option v-for="account in accounts" :key="account.id" :value="account.id">
                          {{ account.name }} - {{ formatCurrency(account.balance) }}
                        </option>
                      </select>
                    </div>
                    <div>
                      <label for="bill-amount" class="block text-sm font-medium text-gray-700">Amount</label>
                      <div class="relative mt-1 rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <span class="text-gray-500 sm:text-sm">₦</span>
                        </div>
                        <input
                          type="number"
                          id="bill-amount"
                          v-model="billPayment.amount"
                          class="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>
  
                  <div class="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                      @click="showBillModal = false"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      class="inline-flex justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                      @click="processBillPayment"
                    >
                      Pay Now
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </NuxtLayout>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue';
  import {
    SendHorizontal,
    Wallet,
    CreditCard,
    Lightbulb,
    Wifi,
    Phone,
    Tv,
    Droplet,
    Zap
  } from 'lucide-vue-next';
  
  // Quick actions
  const quickActions = [
    {
      name: 'Transfer Funds',
      description: 'Send money between accounts or to external banks',
      icon: SendHorizontal,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      onClick: () => {
        // Scroll to transfer form
        document.querySelector('#from-account')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      name: 'Pay Bills',
      description: 'Pay utilities and other bills',
      icon: CreditCard,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      onClick: () => {
        // Scroll to bill payments section
        document.querySelector('#bill-categories')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      name: 'Buy Airtime',
      description: 'Purchase airtime and data bundles',
      icon: Phone,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      onClick: () => showBillModal.value = true
    }
  ];
  
  // Bill categories
  const billCategories = [
    { name: 'Electricity', icon: Zap },
    { name: 'Water', icon: Droplet },
    { name: 'Internet', icon: Wifi },
    { name: 'TV', icon: Tv },
    { name: 'Airtime', icon: Phone }
  ];
  
  // Dummy accounts data
  const accounts = ref([
    {
      id: 1,
      name: 'Main Church Account',
      balance: 250000.00
    },
    {
      id: 2,
      name: 'Building Fund',
      balance: 750000.00
    },
    {
      id: 3,
      name: 'Staff Salary Account',
      balance: 180000.00
    }
  ]);
  
  // Recent bills
  const recentBills = ref([
    {
      id: 1,
      name: 'Electricity Bill',
      reference: 'BILL123456',
      account: 'Main Church Account',
      date: 'Today',
      amount: 25000.00,
      status: 'pending',
      icon: Zap,
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    },
    {
      id: 2,
      name: 'Internet Service',
      reference: 'BILL123457',
      account: 'Main Church Account',
      date: 'Yesterday',
      amount: 15000.00,
      status: 'paid',
      icon: Wifi,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      id: 3,
      name: 'Water Bill',
      reference: 'BILL123458',
      account: 'Main Church Account',
      date: '3 days ago',
      amount: 8000.00,
      status: 'paid',
      icon: Droplet,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    }
  ]);
  
  // Form states
  const transfer = reactive({
    fromAccount: '',
    toAccount: '',
    amount: '',
    description: ''
  });
  
  const billPayment = reactive({
    accountId: '',
    amount: ''
  });
  
  // Modal states
  const showBillModal = ref(false);
  
  // Functions
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };
  
  const initiateTransfer = () => {
    // In a real app, this would make an API call
    console.log('Initiating transfer:', transfer);
    
    // Reset form
    transfer.fromAccount = '';
    transfer.toAccount = '';
    transfer.amount = '';
    transfer.description = '';
  };
  
  const selectBillCategory = (category: any) => {
    showBillModal.value = true;
  };
  
  const payBill = (bill: any) => {
    showBillModal.value = true;
    billPayment.amount = bill.amount;
  };

  definePageMeta({
      layout: 'dashboard'
  })
  
  
  const processBillPayment = () => {
    // In a real app, this would make an API call
    console.log('Processing bill payment:', billPayment);
    
    showBillModal.value = false;
    billPayment.accountId = '';
    billPayment.amount = '';
  };
  
  const viewBillDetails = (bill: any) => {
    // In a real app, this would show bill details in a modal
    console.log('Viewing bill details:', bill);
  };
  </script>