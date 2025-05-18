<template>
    <NuxtLayout name="banking">
      <div class="space-y-6">
        <!-- Page header -->
        <div class="sm:flex sm:items-center sm:justify-between">
          <div>
            <h2 class="text-2xl font-bold leading-7 text-gray-900">Bank Account Management</h2>
            <p class="mt-1 text-sm text-gray-500">Manage bank accounts for churches, branches, and employees</p>
          </div>
          <div class="mt-4 sm:mt-0">
            <button
              @click="showNewAccountModal = true"
              class="inline-flex items-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            >
              <PlusIcon class="h-5 w-5 mr-1.5" />
              New Account
            </button>
          </div>
        </div>
  
        <!-- Account Overview Cards -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="account in accounts" :key="account.id" 
            class="group relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <div class="flex items-center">
              <div :class="[
                'flex h-12 w-12 items-center justify-center rounded-lg',
                account.type === 'savings' ? 'bg-blue-100' : 'bg-green-100'
              ]">
                <component 
                  :is="account.type === 'savings' ? Wallet : Building2" 
                  class="h-6 w-6"
                  :class="account.type === 'savings' ? 'text-blue-600' : 'text-green-600'"
                />
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium text-gray-900">
                  {{ account.name }}
                </h3>
                <p class="text-sm text-gray-500">{{ account.accountNumber }}</p>
              </div>
              <Menu as="div" class="relative ml-auto">
                <MenuButton class="flex items-center rounded-full bg-white text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
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
                        @click="viewTransactions(account)"
                        :class="[
                          active ? 'bg-gray-100' : '',
                          'flex w-full items-center px-4 py-2 text-sm text-gray-700'
                        ]"
                      >
                        <ClipboardList class="mr-3 h-5 w-5 text-gray-400" />
                        View Transactions
                      </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <button
                        @click="manageSignatories(account)"
                        :class="[
                          active ? 'bg-gray-100' : '',
                          'flex w-full items-center px-4 py-2 text-sm text-gray-700'
                        ]"
                      >
                        <Users class="mr-3 h-5 w-5 text-gray-400" />
                        Manage Signatories
                      </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <button
                        @click="editAccount(account)"
                        :class="[
                          active ? 'bg-gray-100' : '',
                          'flex w-full items-center px-4 py-2 text-sm text-gray-700'
                        ]"
                      >
                        <Edit class="mr-3 h-5 w-5 text-gray-400" />
                        Edit Account
                      </button>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
            <div class="mt-4">
              <div class="flex items-baseline">
                <span class="text-2xl font-semibold text-gray-900">
                  {{ formatCurrency(account.balance) }}
                </span>
                <span 
                  :class="[
                    'ml-2 text-sm',
                    account.trend > 0 ? 'text-green-600' : 'text-red-600'
                  ]"
                >
                  <component :is="account.trend > 0 ? TrendingUp : TrendingDown" class="inline h-4 w-4" />
                  {{ Math.abs(account.trend) }}%
                </span>
              </div>
              <p class="mt-1 text-sm text-gray-500">Available Balance</p>
            </div>
            <div class="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
              <div class="flex items-center">
                <UserCircle class="h-5 w-5 text-gray-400" />
                <span class="ml-2 text-sm text-gray-500">{{ account.signatories }} signatories</span>
              </div>
              <div class="flex items-center">
                <Calendar class="h-5 w-5 text-gray-400" />
                <span class="ml-2 text-sm text-gray-500">Last activity {{ account.lastActivity }}</span>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Recent Transactions -->
        <div class="rounded-lg border border-gray-200 bg-white shadow">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-base font-semibold leading-6 text-gray-900">Recent Transactions</h3>
            <div class="mt-6 flow-root">
              <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table class="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Transaction</th>
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
                      <tr v-for="transaction in recentTransactions" :key="transaction.id" class="hover:bg-gray-50">
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-0">
                          <div class="flex items-center">
                            <div :class="[
                              'flex h-8 w-8 items-center justify-center rounded-full',
                              transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                            ]">
                              <component 
                                :is="transaction.type === 'credit' ? ArrowDownLeft : ArrowUpRight" 
                                class="h-4 w-4"
                                :class="transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'"
                              />
                            </div>
                            <div class="ml-4">
                              <div class="font-medium text-gray-900">{{ transaction.description }}</div>
                              <div class="text-gray-500">{{ transaction.reference }}</div>
                            </div>
                          </div>
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ transaction.account }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ transaction.date }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm" :class="[
                          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        ]">
                          {{ transaction.type === 'credit' ? '+' : '-' }}{{ formatCurrency(transaction.amount) }}
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm">
                          <span :class="[
                            'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
                            transaction.status === 'completed' ? 'bg-green-100 text-green-700' :
                            transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          ]">
                            {{ transaction.status }}
                          </span>
                        </td>
                        <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <button
                            @click="viewTransactionDetails(transaction)"
                            class="text-purple-600 hover:text-purple-900"
                          >
                            View<span class="sr-only">, {{ transaction.reference }}</span>
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
  
      <!-- New Account Modal -->
      <TransitionRoot appear :show="showNewAccountModal" as="template">
        <Dialog as="div" class="relative z-10" @close="showNewAccountModal = false">
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
                    Create New Bank Account
                  </DialogTitle>
                  <div class="mt-4 space-y-4">
                    <div>
                      <label for="account-name" class="block text-sm font-medium text-gray-700">Account Name</label>
                      <input
                        type="text"
                        id="account-name"
                        v-model="newAccount.name"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                        placeholder="Enter account name"
                      />
                    </div>
                    <div>
                      <label for="account-type" class="block text-sm font-medium text-gray-700">Account Type</label>
                      <select
                        id="account-type"
                        v-model="newAccount.type"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      >
                        <option value="savings">Savings Account</option>
                        <option value="current">Current Account</option>
                      </select>
                    </div>
                    <div>
                      <label for="account-category" class="block text-sm font-medium text-gray-700">Category</label>
                      <select
                        id="account-category"
                        v-model="newAccount.category"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      >
                        <option value="church">Church</option>
                        <option value="branch">Branch</option>
                        <option value="employee">Employee</option>
                      </select>
                    </div>
                  </div>
  
                  <div class="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                      @click="showNewAccountModal = false"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      class="inline-flex justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                      @click="createAccount"
                    >
                      Create Account
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
  
      <!-- Signatories Modal -->
      <TransitionRoot appear :show="showSignatoriesModal" as="template">
        <Dialog as="div" class="relative z-10" @close="showSignatoriesModal = false">
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
                    Manage Account Signatories
                  </DialogTitle>
                  <div class="mt-4">
                    <div class="space-y-4">
                      <div v-for="(signatory, index) in selectedAccount?.signatoriesList" :key="index" class="flex items-center justify-between">
                        <div class="flex items-center">
                          <img :src="signatory.avatar" alt="" class="h-8 w-8 rounded-full" />
                          <div class="ml-3">
                            <p class="text-sm font-medium text-gray-900">{{ signatory.name }}</p>
                            <p class="text-xs text-gray-500">{{ signatory.role }}</p>
                          </div>
                        </div>
                        <button
                          @click="removeSignatory(signatory)"
                          class="text-red-600 hover:text-red-900"
                        >
                          <Trash2 class="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div class="mt-6">
                      <button
                        @click="showAddSignatoryForm = true"
                        class="flex w-full items-center justify-center rounded-md border border-dashed border-gray-300 px-3 py-2 text-sm font-medium text-gray-600 hover:border-gray-400 hover:text-gray-900"
                      >
                        <PlusIcon class="h-5 w-5 mr-1.5" />
                        Add New Signatory
                      </button>
                    </div>
  
                    <div v-if="showAddSignatoryForm" class="mt-4 space-y-4">
                      <div>
                        <label for="signatory-name" class="block text-sm font-medium text-gray-700">Name</label>
                        <input
                          type="text"
                          id="signatory-name"
                          v-model="newSignatory.name"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label for="signatory-role" class="block text-sm font-medium text-gray-700">Role</label>
                        <input
                          type="text"
                          id="signatory-role"
                          v-model="newSignatory.role"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                        />
                      </div>
                      <div class="flex justify-end space-x-3">
                        <button
                          @click="showAddSignatoryForm = false"
                          class="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          @click="addSignatory"
                          class="rounded-md bg-purple-600 px-3 py-2 text-sm font-medium text-white hover:bg-purple-700"
                        >
                          Add
                        </button>
                      </div>
                    </div>
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
  import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
  import {
    PlusIcon,
    Building2,
    Wallet,
    MoreVertical,
    ClipboardList,
    Users,
    Edit,
    UserCircle,
    Calendar,
    ArrowDownLeft,
    ArrowUpRight,
    TrendingUp,
    TrendingDown,
    Trash2
  } from 'lucide-vue-next';
  
  // Dummy data
  const accounts = ref([
    {
      id: 1,
      name: 'Main Church Account',
      accountNumber: '1234567890',
      type: 'current',
      balance: 250000.00,
      trend: 12,
      signatories: 3,
      lastActivity: '2h ago',
      signatoriesList: [
        { name: 'John Doe', role: 'Senior Pastor', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { name: 'Jane Smith', role: 'Financial Secretary', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
        { name: 'Mike Johnson', role: 'Treasurer', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' }
      ]
    },
    {
      id: 2,
      name: 'Building Fund',
      accountNumber: '0987654321',
      type: 'savings',
      balance: 750000.00,
      trend: 8,
      signatories: 2,
      lastActivity: '1d ago',
      signatoriesList: [
        { name: 'Sarah Wilson', role: 'Building Committee Head', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
        { name: 'Tom Brown', role: 'Assistant Treasurer', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' }
      ]
    },
    {
      id: 3,
      name: 'Staff Salary Account',
      accountNumber: '5678901234',
      type: 'current',
      balance: 180000.00,
      trend: -3,
      signatories: 2,
      lastActivity: '3d ago',
      signatoriesList: [
        { name: 'Alice Green', role: 'HR Manager', avatar: 'https://randomuser.me/api/portraits/women/6.jpg' },
        { name: 'Bob White', role: 'Financial Officer', avatar: 'https://randomuser.me/api/portraits/men/7.jpg' }
      ]
    }
  ]);
  
  const recentTransactions = ref([
    {
      id: 1,
      type: 'credit',
      description: 'Sunday Offering',
      reference: 'TRX123456',
      account: 'Main Church Account',
      date: 'Today',
      amount: 15000.00,
      status: 'completed'
    },
    {
      id: 2,
      type: 'debit',
      description: 'Utility Payment',
      reference: 'TRX123457',
      account: 'Main Church Account',
      date: 'Yesterday',
      amount: 5000.00,
      status: 'completed'
    },
    {
      id: 3,
      type: 'credit',
      description: 'Building Fund Donation',
      reference: 'TRX123458',
      account: 'Building Fund',
      date: '2 days ago',
      amount: 50000.00,
      status: 'completed'
    },
    {
      id: 4,
      type: 'debit',
      description: 'Staff Salary Payment',
      reference: 'TRX123459',
      account: 'Staff Salary Account',
      date: '3 days ago',
      amount: 25000.00,
      status: 'completed'
    },
    {
      id: 5,
      type: 'debit',
      description: 'Internet Service Payment',
      reference: 'TRX123460',
      account: 'Main Church Account',
      date: '4 days ago',
      amount: 8000.00,
      status: 'pending'
    }
  ]);
  
  // Modal states
  const showNewAccountModal = ref(false);
  const showSignatoriesModal = ref(false);
  const showAddSignatoryForm = ref(false);
  const selectedAccount = ref(null);
  
  // Form states
  const newAccount = reactive({
    name: '',
    type: 'savings',
    category: 'church'
  });
  
  const newSignatory = reactive({
    name: '',
    role: '',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg' // Default avatar
  });
  
  // Functions
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };
  
  definePageMeta({
     layout: 'dashboard'
  })
  

  const createAccount = () => {
    // In a real app, this would make an API call
    accounts.value.push({
      id: accounts.value.length + 1,
      name: newAccount.name,
      accountNumber: Math.random().toString().slice(2, 12),
      type: newAccount.type,
      balance: 0,
      trend: 0,
      signatories: 0,
      lastActivity: 'Just now',
      signatoriesList: []
    });
    
    showNewAccountModal.value = false;
    newAccount.name = '';
    newAccount.type = 'savings';
    newAccount.category = 'church';
  };
  
  const viewTransactions = (account: any) => {
    // In a real app, this would navigate to a transactions page or open a modal
    console.log('Viewing transactions for account:', account.name);
  };
  
  const manageSignatories = (account: any) => {
    selectedAccount.value = account;
    showSignatoriesModal.value = true;
  };
  
  const editAccount = (account: any) => {
    // In a real app, this would open an edit modal
    console.log('Editing account:', account.name);
  };
  
  const addSignatory = () => {
    if (selectedAccount.value) {
      selectedAccount.value.signatoriesList.push({
        name: newSignatory.name,
        role: newSignatory.role,
        avatar: newSignatory.avatar
      });
      selectedAccount.value.signatories++;
      
      showAddSignatoryForm.value = false;
      newSignatory.name = '';
      newSignatory.role = '';
    }
  };
  
  const removeSignatory = (signatory: any) => {
    if (selectedAccount.value) {
      const index = selectedAccount.value.signatoriesList.indexOf(signatory);
      if (index > -1) {
        selectedAccount.value.signatoriesList.splice(index, 1);
        selectedAccount.value.signatories--;
      }
    }
  };
  
  const viewTransactionDetails = (transaction: any) => {
    // In a real app, this would show transaction details in a modal
    console.log('Viewing transaction details:', transaction.reference);
  };
  </script>
  