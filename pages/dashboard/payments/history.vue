<template>
    <main>
      <div class="space-y-6">
        <!-- Page header -->
        <div>
          <h2 class="text-2xl font-bold leading-7 text-gray-900">Payment History & Receipts</h2>
          <p class="mt-1 text-sm text-gray-500">View and manage payment history, generate receipts, and handle refunds</p>
        </div>
  
        <!-- Filters -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <div>
                <label for="date-range" class="block text-sm font-medium text-gray-700">Date Range</label>
                <select
                  id="date-range"
                  v-model="filters.dateRange"
                  class="mt-1 block w-full rounded-md border-[0.5px] px-3 py-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
              <div>
                <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
                <select
                  id="category"
                  v-model="filters.category"
                  class="mt-1 block w-full rounded-md border-[0.5px] px-3 py-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">All Categories</option>
                  <option value="tithes">Tithes</option>
                  <option value="offerings">Offerings</option>
                  <option value="missions">Missions</option>
                  <option value="special">Special Donations</option>
                </select>
              </div>
              <div>
                <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
                <select
                  id="status"
                  v-model="filters.status"
                  class="mt-1 block w-full rounded-md border-[0.5px] px-3 py-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>
              <div>
                <label for="search" class="block text-sm font-medium text-gray-700">Search</label>
                <div class="mt-1">
                  <input
                    type="text"
                    id="search"
                    v-model="filters.search"
                    class="block w-full rounded-md border-[0.5px] px-3 py-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Search by donor or reference..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Transactions Table -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <div class="sm:flex sm:items-center">
              <div class="sm:flex-auto">
                <h3 class="text-base font-semibold leading-6 text-gray-900">Transaction History</h3>
                <p class="mt-2 text-sm text-gray-700">
                  A list of all payments including their reference ID, amount, status and receipt.
                </p>
              </div>
              <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button
                  type="button"
                  @click="downloadReport"
                  class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <Download class="h-5 w-5 mr-1.5" />
                  Download Report
                </button>
              </div>
            </div>
            <div class="mt-6 flow-root">
              <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table class="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Reference</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Donor</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Category</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                          <span class="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr v-for="transaction in filteredTransactions" :key="transaction.id" class="hover:bg-gray-50">
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {{ transaction.reference }}
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div class="flex items-center">
                            <img :src="transaction.donor.avatar" alt="" class="h-8 w-8 rounded-full" />
                            <div class="ml-3">
                              <p class="font-medium text-gray-900">{{ transaction.donor.name }}</p>
                              <p class="text-gray-500">{{ transaction.donor.email }}</p>
                            </div>
                          </div>
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ transaction.category }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                          {{ formatCurrency(transaction.amount) }}
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ transaction.date }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm">
                          <span :class="[
                            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                            transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                            transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            transaction.status === 'failed' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          ]">
                            {{ transaction.status }}
                          </span>
                        </td>
                        <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <Menu as="div" class="relative inline-block text-left">
                            <MenuButton class="flex items-center text-gray-400 hover:text-gray-600">
                              <span class="sr-only">Open options</span>
                              <MoreVertical class="h-5 w-5" />
                            </MenuButton>
                            <transition
                              enter-active-class="transition ease-out duration-100"
                              enter-from-class="transform opacity-0 scale-95"
                              enter-to-class="transform opacity-100 scale-100"
                              leave-active-class="transition ease-in duration-75"
                              leave-from-class="transform opacity-100 scale-100"
                              leave-to-class="transform opacity-0 scale-95"
                            >
                              <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <MenuItem v-slot="{ active }">
                                  <button
                                    @click="viewReceipt(transaction)"
                                    :class="[
                                      active ? 'bg-gray-100' : '',
                                      'flex w-full items-center px-4 py-2 text-sm text-gray-700'
                                    ]"
                                  >
                                    <FileText class="mr-3 h-5 w-5 text-gray-400" />
                                    View Receipt
                                  </button>
                                </MenuItem>
                                <MenuItem v-slot="{ active }">
                                  <button
                                    @click="emailReceipt(transaction)"
                                    :class="[
                                      active ? 'bg-gray-100' : '',
                                      'flex w-full items-center px-4 py-2 text-sm text-gray-700'
                                    ]"
                                  >
                                    <Mail class="mr-3 h-5 w-5 text-gray-400" />
                                    Email Receipt
                                  </button>
                                </MenuItem>
                                <MenuItem v-slot="{ active }" v-if="transaction.status === 'completed'">
                                  <button
                                    @click="initiateRefund(transaction)"
                                    :class="[
                                      active ? 'bg-gray-100' : '',
                                      'flex w-full items-center px-4 py-2 text-sm text-gray-700'
                                    ]"
                                  >
                                    <RefreshCcw class="mr-3 h-5 w-5 text-gray-400" />
                                    Initiate Refund
                                  </button>
                                </MenuItem>
                              </MenuItems>
                            </transition>
                          </Menu>
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
  
      <!-- Receipt Modal -->
      <TransitionRoot appear :show="showReceiptModal" as="template">
        <Dialog as="div" class="relative z-50" @close="showReceiptModal = false">
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
                    Payment Receipt
                  </DialogTitle>
                  <div class="mt-4">
                    <div class="border rounded-lg p-4">
                      <div class="flex justify-between items-start">
                        <div>
                          <h4 class="text-lg font-semibold">ChurchRemit</h4>
                          <p class="text-sm text-gray-500">123 Church Street</p>
                          <p class="text-sm text-gray-500">City, State</p>
                        </div>
                        <div class="text-right">
                          <p class="text-sm text-gray-500">Receipt #: {{ selectedTransaction?.reference }}</p>
                          <p class="text-sm text-gray-500">Date: {{ selectedTransaction?.date }}</p>
                        </div>
                      </div>
                      <div class="mt-6">
                        <h5 class="text-sm font-semibold text-gray-700">Donor Information</h5>
                        <div class="mt-2">
                          <p class="text-sm">{{ selectedTransaction?.donor.name }}</p>
                          <p class="text-sm text-gray-500">{{ selectedTransaction?.donor.email }}</p>
                        </div>
                      </div>
                      <div class="mt-6">
                        <table class="min-w-full">
                          <thead>
                            <tr>
                              <th class="text-left text-sm font-semibold text-gray-700">Description</th>
                              <th class="text-right text-sm font-semibold text-gray-700">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td class="py-2 text-sm">{{ selectedTransaction?.category }}</td>
                              <td class="py-2 text-sm text-right">{{ formatCurrency(selectedTransaction?.amount) }}</td>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr>
                              <td class="pt-4 text-sm font-semibold">Total</td>
                              <td class="pt-4 text-sm font-semibold text-right">{{ formatCurrency(selectedTransaction?.amount) }}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                      <div class="mt-6 text-center text-sm text-gray-500">
                        Thank you for your generous donation!
                      </div>
                    </div>
                  </div>
  
                  <div class="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      @click="showReceiptModal = false"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      @click="downloadReceipt"
                    >
                      Download PDF
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
  
      <!-- Refund Modal -->
      <TransitionRoot appear :show="showRefundModal" as="template">
        <Dialog as="div" class="relative z-50" @close="showRefundModal = false">
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
                    Initiate Refund
                  </DialogTitle>
                  <div class="mt-4">
                    <p class="text-sm text-gray-500">
                      Are you sure you want to refund this payment? This action cannot be undone.
                    </p>
                    <div class="mt-4">
                      <label for="refund-reason" class="block text-sm font-medium text-gray-700">Reason for Refund</label>
                      <textarea
                        id="refund-reason"
                        v-model="refundReason"
                        rows="3"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      ></textarea>
                    </div>
                  </div>
  
                  <div class="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      @click="showRefundModal = false"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      class="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      @click="processRefund"
                    >
                      Confirm Refund
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
  import { ref, reactive, computed } from 'vue';
  import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue';
  import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
  import {
    Download,
    MoreVertical,
    FileText,
    Mail,
    RefreshCcw
  } from 'lucide-vue-next';
  
  // Filters state
  const filters = reactive({
    dateRange: 'month',
    category: '',
    status: '',
    search: ''
  });
  
  // Modal states
  const showReceiptModal = ref(false);
  const showRefundModal = ref(false);
  const selectedTransaction = ref<any>(null);
  const refundReason = ref('');
  
  // Dummy transactions data
  const transactions = ref([
    {
      id: 1,
      reference: 'TRX-001',
      donor: {
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
      },
      category: 'Tithes',
      amount: 50000,
      date: '2024-03-10',
      status: 'completed'
    },
    {
      id: 2,
      reference: 'TRX-002',
      donor: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
      },
      category: 'Offerings',
      amount: 25000,
      date: '2024-03-09',
      status: 'completed'
    },
    {
      id: 3,
      reference: 'TRX-003',
      donor: {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
      },
      category: 'Missions',
      amount: 100000,
      date: '2024-03-08',
      status: 'pending'
    }
  ]);
  
  // Computed filtered transactions
  const filteredTransactions = computed(() => {
    return transactions.value.filter(transaction => {
      if (filters.category && transaction.category !== filters.category) return false;
      if (filters.status && transaction.status !== filters.status) return false;
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          transaction.donor.name.toLowerCase().includes(searchLower) ||
          transaction.reference.toLowerCase().includes(searchLower)
        );
      }
      return true;
    });
  });
  
  // Functions
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };
  
  const downloadReport = () => {
    // In a real app, this would generate and download a report
    console.log('Downloading report...');
  };
  
  const viewReceipt = (transaction: any) => {
    selectedTransaction.value = transaction;
    showReceiptModal.value = true;
  };
  
  const emailReceipt = (transaction: any) => {
    // In a real app, this would send an email with the receipt
    console.log('Emailing receipt for transaction:', transaction.reference);
  };
  
  const initiateRefund = (transaction: any) => {
    selectedTransaction.value = transaction;
    showRefundModal.value = true;
  };
  
  const processRefund = () => {
    // In a real app, this would process the refund
    console.log('Processing refund for transaction:', selectedTransaction.value?.reference);
    console.log('Refund reason:', refundReason.value);
    
    showRefundModal.value = false;
    refundReason.value = '';
  };
  
  const downloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    console.log('Downloading receipt for transaction:', selectedTransaction.value?.reference);
  };

  definePageMeta({
      layout: 'dashboard'
  })
  </script>