<template>
    <main>
      <div class="space-y-6 animate-fade-in">
        <!-- Page header -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 class="text-2xl font-bold leading-7 text-gray-900">Church Profile Setup</h2>
            <p class="mt-1 text-sm text-gray-500">Configure your church details, branches, and financial settings</p>
          </div>
          <div class="mt-4 flex flex-col sm:flex-row sm:space-x-3 md:mt-0">
            <button
              type="button"
              @click="saveProfile"
              class="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <Save class="mr-2 h-4 w-4" />
              Save Changes
            </button>
          </div>
        </div>
  
        <!-- Profile Tabs -->
        <div class="border-b border-gray-200 animate-fade-in animation-delay-100">
          <nav class="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              @click="activeTab = 'general'"
              :class="[
                activeTab === 'general'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
              ]"
            >
              General Information
            </button>
            <button
              @click="activeTab = 'branches'"
              :class="[
                activeTab === 'branches'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
              ]"
            >
              Branch Setup
            </button>
            <button
              @click="activeTab = 'financial'"
              :class="[
                activeTab === 'financial'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
              ]"
            >
              Financial Configuration
            </button>
          </nav>
        </div>
  
        <!-- General Information Tab -->
        <div v-if="activeTab === 'general'" class="animate-fade-in animation-delay-200">
          <div class="bg-white shadow rounded-lg overflow-hidden">
            <div class="px-4 py-5 sm:p-6">
              <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <!-- Church Logo -->
                <div class="sm:col-span-6">
                  <label class="block text-sm font-medium text-gray-700">Church Logo</label>
                  <div class="mt-2 flex items-center">
                    <span class="h-24 w-24 overflow-hidden rounded-md bg-gray-100">
                      <img v-if="churchProfile.logo" :src="churchProfile.logo" alt="Church logo" class="h-full w-full object-cover" />
                      <div v-else class="flex h-full w-full items-center justify-center">
                        <Building2 class="h-12 w-12 text-gray-300" />
                      </div>
                    </span>
                    <button
                      type="button"
                      class="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Change
                    </button>
                  </div>
                </div>
  
                <!-- Church Name -->
                <div class="sm:col-span-3">
                  <label for="church-name" class="block text-sm font-medium text-gray-700">Church Name</label>
                  <div class="mt-1">
                    <input
                      type="text"
                      id="church-name"
                      v-model="churchProfile.name"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
  
                <!-- Denomination -->
                <div class="sm:col-span-3">
                  <label for="denomination" class="block text-sm font-medium text-gray-700">Denomination</label>
                  <div class="mt-1">
                    <input
                      type="text"
                      id="denomination"
                      v-model="churchProfile.denomination"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
  
                <!-- Email -->
                <div class="sm:col-span-3">
                  <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
                  <div class="mt-1">
                    <input
                      type="email"
                      id="email"
                      v-model="churchProfile.email"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
  
                <!-- Phone -->
                <div class="sm:col-span-3">
                  <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
                  <div class="mt-1">
                    <input
                      type="tel"
                      id="phone"
                      v-model="churchProfile.phone"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
  
                <!-- Address -->
                <div class="sm:col-span-6">
                  <label for="street-address" class="block text-sm font-medium text-gray-700">Street Address</label>
                  <div class="mt-1">
                    <input
                      type="text"
                      id="street-address"
                      v-model="churchProfile.address.street"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
  
                <!-- City, State, Zip -->
                <div class="sm:col-span-2">
                  <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                  <div class="mt-1">
                    <input
                      type="text"
                      id="city"
                      v-model="churchProfile.address.city"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
  
                <div class="sm:col-span-2">
                  <label for="state" class="block text-sm font-medium text-gray-700">State / Province</label>
                  <div class="mt-1">
                    <input
                      type="text"
                      id="state"
                      v-model="churchProfile.address.state"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
  
                <div class="sm:col-span-2">
                  <label for="postal-code" class="block text-sm font-medium text-gray-700">ZIP / Postal Code</label>
                  <div class="mt-1">
                    <input
                      type="text"
                      id="postal-code"
                      v-model="churchProfile.address.postalCode"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
  
                <!-- Country -->
                <div class="sm:col-span-3">
                  <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
                  <div class="mt-1">
                    <select
                      id="country"
                      v-model="churchProfile.address.country"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Ghana">Ghana</option>
                      <option value="South Africa">South Africa</option>
                      <option value="Kenya">Kenya</option>
                    </select>
                  </div>
                </div>
  
                <!-- Website -->
                <div class="sm:col-span-3">
                  <label for="website" class="block text-sm font-medium text-gray-700">Website</label>
                  <div class="mt-1">
                    <input
                      type="url"
                      id="website"
                      v-model="churchProfile.website"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
  
                <!-- Description -->
                <div class="sm:col-span-6">
                  <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                  <div class="mt-1">
                    <textarea
                      id="description"
                      v-model="churchProfile.description"
                      rows="3"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    ></textarea>
                  </div>
                  <p class="mt-2 text-sm text-gray-500">Brief description of your church for public display.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Branch Setup Tab -->
        <div v-if="activeTab === 'branches'" class="animate-fade-in animation-delay-200">
          <div class="bg-white shadow rounded-lg overflow-hidden mb-6">
            <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium leading-6 text-gray-900">Branch Configuration</h3>
                <button
                  type="button"
                  @click="showAddBranchModal = true"
                  class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <Plus class="mr-1 h-4 w-4" />
                  Add Branch
                </button>
              </div>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">Configure multi-branch setup and assign administrators.</p>
            </div>
            <div class="px-4 py-5 sm:p-6">
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Branch Name</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Location</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Administrator</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span class="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-for="branch in branches" :key="branch.id" class="hover:bg-gray-50">
                      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ branch.name }}</td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ branch.location }}</td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div class="flex items-center">
                          <img :src="branch.adminAvatar" alt="" class="h-8 w-8 rounded-full mr-2" />
                          {{ branch.adminName }}
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span :class="[
                          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                          branch.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        ]">
                          {{ branch.status }}
                        </span>
                      </td>
                      <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div class="flex justify-end space-x-2">
                          <button
                            type="button"
                            @click="editBranch(branch)"
                            class="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit class="h-5 w-5" />
                            <span class="sr-only">Edit</span>
                          </button>
                          <button
                            type="button"
                            @click="assignAdmin(branch)"
                            class="text-blue-600 hover:text-blue-900"
                          >
                            <UserPlus class="h-5 w-5" />
                            <span class="sr-only">Assign Admin</span>
                          </button>
                          <button
                            type="button"
                            @click="confirmDeleteBranch(branch)"
                            class="text-red-600 hover:text-red-900"
                          >
                            <Trash2 class="h-5 w-5" />
                            <span class="sr-only">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
  
          <!-- Branch Admins -->
          <div class="bg-white shadow rounded-lg overflow-hidden">
            <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Branch Administrators</h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">Manage administrators for each branch.</p>
            </div>
            <div class="px-4 py-5 sm:p-6">
              <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <li v-for="admin in branchAdmins" :key="admin.id" class="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
                  <div class="w-full flex items-center justify-between p-6 space-x-6">
                    <div class="flex-1 truncate">
                      <div class="flex items-center space-x-3">
                        <h3 class="text-gray-900 text-sm font-medium truncate">{{ admin.name }}</h3>
                        <span :class="[
                          'flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium rounded-full',
                          admin.role === 'Super Admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        ]">
                          {{ admin.role }}
                        </span>
                      </div>
                      <p class="mt-1 text-gray-500 text-sm truncate">{{ admin.branch }}</p>
                    </div>
                    <img class="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" :src="admin.avatar" alt="" />
                  </div>
                  <div>
                    <div class="-mt-px flex divide-x divide-gray-200">
                      <div class="w-0 flex-1 flex">
                        <a
                          href="#"
                          class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                        >
                          <Mail class="w-5 h-5 text-gray-400" />
                          <span class="ml-3">Email</span>
                        </a>
                      </div>
                      <div class="-ml-px w-0 flex-1 flex">
                        <a
                          href="#"
                          class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                        >
                          <Phone class="w-5 h-5 text-gray-400" />
                          <span class="ml-3">Call</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
  
        <!-- Financial Configuration Tab -->
        <div v-if="activeTab === 'financial'" class="animate-fade-in animation-delay-200">
          <div class="bg-white shadow rounded-lg overflow-hidden mb-6">
            <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Financial Details</h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">Configure bank accounts and payment methods.</p>
            </div>
            <div class="px-4 py-5 sm:p-6">
              <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <!-- Bank Name -->
                <div class="sm:col-span-3">
                  <label for="bank-name" class="block text-sm font-medium text-gray-700">Bank Name</label>
                  <div class="mt-1">
                    <input
                      type="text"
                      id="bank-name"
                      v-model="financialConfig.bankName"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
  
                <!-- Account Number -->
                <div class="sm:col-span-3">
                  <label for="account-number" class="block text-sm font-medium text-gray-700">Account Number</label>
                  <div class="mt-1">
                    <input
                      type="text"
                      id="account-number"
                      v-model="financialConfig.accountNumber"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
  
                <!-- Account Name -->
                <div class="sm:col-span-3">
                  <label for="account-name" class="block text-sm font-medium text-gray-700">Account Name</label>
                  <div class="mt-1">
                    <input
                      type="text"
                      id="account-name"
                      v-model="financialConfig.accountName"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
  
                <!-- Routing Number -->
                <div class="sm:col-span-3">
                  <label for="routing-number" class="block text-sm font-medium text-gray-700">Routing Number</label>
                  <div class="mt-1">
                    <input
                      type="text"
                      id="routing-number"
                      v-model="financialConfig.routingNumber"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
  
                <!-- Tax ID -->
                <div class="sm:col-span-3">
                  <label for="tax-id" class="block text-sm font-medium text-gray-700">Tax ID / EIN</label>
                  <div class="mt-1">
                    <input
                      type="text"
                      id="tax-id"
                      v-model="financialConfig.taxId"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
  
                <!-- Currency -->
                <div class="sm:col-span-3">
                  <label for="currency" class="block text-sm font-medium text-gray-700">Currency</label>
                  <div class="mt-1">
                    <select
                      id="currency"
                      v-model="financialConfig.currency"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="NGN">NGN - Nigerian Naira</option>
                      <option value="GHS">GHS - Ghanaian Cedi</option>
                      <option value="KES">KES - Kenyan Shilling</option>
                      <option value="ZAR">ZAR - South African Rand</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Payment Methods -->
          <div class="bg-white shadow rounded-lg overflow-hidden">
            <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium leading-6 text-gray-900">Payment Methods</h3>
                <button
                  type="button"
                  @click="showAddPaymentMethodModal = true"
                  class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <Plus class="mr-1 h-4 w-4" />
                  Add Method
                </button>
              </div>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">Configure payment methods for donations and contributions.</p>
            </div>
            <div class="px-4 py-5 sm:p-6">
              <ul role="list" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <li v-for="method in paymentMethods" :key="method.id" class="col-span-1 bg-gray-50 rounded-lg shadow divide-y divide-gray-200 hover:shadow-md transition-shadow duration-200">
                  <div class="w-full flex items-center justify-between p-4">
                    <div class="flex-1">
                      <div class="flex items-center">
                        <component :is="method.icon" class="h-8 w-8 text-gray-500 mr-3" />
                        <div>
                          <h3 class="text-gray-900 text-sm font-medium">{{ method.name }}</h3>
                          <p class="text-gray-500 text-xs mt-1">{{ method.description }}</p>
                        </div>
                      </div>
                      <div class="mt-3 flex items-center">
                        <div class="flex items-center h-5">
                          <input
                            :id="`payment-method-${method.id}`"
                            :checked="method.enabled"
                            @change="togglePaymentMethod(method)"
                            type="checkbox"
                            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div class="ml-3 text-sm">
                          <label :for="`payment-method-${method.id}`" class="font-medium text-gray-700">Enabled</label>
                        </div>
                      </div>
                    </div>
                    <div class="flex-shrink-0">
                      <button
                        type="button"
                        @click="editPaymentMethod(method)"
                        class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <Edit class="h-5 w-5" />
                        <span class="sr-only">Edit</span>
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
  
        <!-- Add Branch Modal -->
        <div v-if="showAddBranchModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-10">
          <div class="bg-white rounded-lg shadow-xl max-w-md w-full animate-fade-in">
            <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium leading-6 text-gray-900">{{ editingBranch ? 'Edit Branch' : 'Add New Branch' }}</h3>
                <button
                  type="button"
                  @click="closeAddBranchModal"
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500"
                >
                  <span class="sr-only">Close</span>
                  <X class="h-6 w-6" />
                </button>
              </div>
            </div>
            <form @submit.prevent="saveBranch">
              <div class="px-4 py-5 sm:p-6 space-y-4">
                <div>
                  <label for="branch-name" class="block text-sm font-medium text-gray-700">Branch Name</label>
                  <input
                    type="text"
                    id="branch-name"
                    v-model="branchForm.name"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter branch name"
                    required
                  />
                </div>
                
                <div>
                  <label for="branch-location" class="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    id="branch-location"
                    v-model="branchForm.location"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter branch location"
                    required
                  />
                </div>
                
                <div>
                  <label for="branch-admin" class="block text-sm font-medium text-gray-700">Administrator</label>
                  <select
                    id="branch-admin"
                    v-model="branchForm.adminId"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  >
                    <option value="">Select an administrator</option>
                    <option v-for="admin in availableAdmins" :key="admin.id" :value="admin.id">
                      {{ admin.name }}
                    </option>
                  </select>
                </div>
                
                <div>
                  <label for="branch-status" class="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    id="branch-status"
                    v-model="branchForm.status"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                
                <div>
                  <label for="branch-description" class="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    id="branch-description"
                    v-model="branchForm.description"
                    rows="3"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter branch description"
                  ></textarea>
                </div>
              </div>
              <div class="px-4 py-3 bg-gray-50 text-right sm:px-6 border-t border-gray-200">
                <button
                  type="button"
                  @click="closeAddBranchModal"
                  class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {{ editingBranch ? 'Update Branch' : 'Add Branch' }}
                </button>
              </div>
            </form>
          </div>
        </div>
  
        <!-- Add Payment Method Modal -->
        <div v-if="showAddPaymentMethodModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-10">
          <div class="bg-white rounded-lg shadow-xl max-w-md w-full animate-fade-in">
            <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium leading-6 text-gray-900">{{ editingPaymentMethod ? 'Edit Payment Method' : 'Add Payment Method' }}</h3>
                <button
                  type="button"
                  @click="closeAddPaymentMethodModal"
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500"
                >
                  <span class="sr-only">Close</span>
                  <X class="h-6 w-6" />
                </button>
              </div>
            </div>
            <form @submit.prevent="savePaymentMethod">
              <div class="px-4 py-5 sm:p-6 space-y-4">
                <div>
                  <label for="payment-name" class="block text-sm font-medium text-gray-700">Method Name</label>
                  <input
                    type="text"
                    id="payment-name"
                    v-model="paymentMethodForm.name"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter payment method name"
                    required
                  />
                </div>
                
                <div>
                  <label for="payment-type" class="block text-sm font-medium text-gray-700">Type</label>
                  <select
                    id="payment-type"
                    v-model="paymentMethodForm.type"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  >
                    <option value="card">Credit/Debit Card</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="mobile">Mobile Money</option>
                    <option value="cash">Cash</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label for="payment-description" class="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    id="payment-description"
                    v-model="paymentMethodForm.description"
                    rows="2"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter description"
                  ></textarea>
                </div>
                
                <div>
                  <div class="flex items-center">
                    <div class="flex items-center h-5">
                      <input
                        id="payment-enabled"
                        v-model="paymentMethodForm.enabled"
                        type="checkbox"
                        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="payment-enabled" class="font-medium text-gray-700">Enable this payment method</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="px-4 py-3 bg-gray-50 text-right sm:px-6 border-t border-gray-200">
                <button
                  type="button"
                  @click="closeAddPaymentMethodModal"
                  class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {{ editingPaymentMethod ? 'Update Method' : 'Add Method' }}
                </button>
              </div>
            </form>
          </div>
        </div>
  
        <!-- Delete Branch Confirmation Modal -->
        <div v-if="showDeleteBranchModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-10">
          <div class="bg-white rounded-lg shadow-xl max-w-md w-full animate-fade-in">
            <div class="px-4 py-5 sm:p-6">
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <AlertTriangle class="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 class="text-base font-semibold leading-6 text-gray-900">Delete Branch</h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      Are you sure you want to delete this branch? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  @click="deleteBranch"
                  class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Delete
                </button>
                <button
                  type="button"
                  @click="showDeleteBranchModal = false"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Success Notification -->
        <div v-if="showSuccessNotification" class="fixed bottom-0 right-0 m-6 bg-green-50 p-4 rounded-md shadow-lg animate-fade-in z-20">
          <div class="flex">
            <div class="flex-shrink-0">
              <CheckCircle class="h-5 w-5 text-green-400" aria-hidden="true" />
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-green-800">{{ successMessage }}</p>
            </div>
            <div class="ml-auto pl-3">
              <div class="-mx-1.5 -my-1.5">
                <button
                  type="button"
                  @click="showSuccessNotification = false"
                  class="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                >
                  <span class="sr-only">Dismiss</span>
                  <X class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from 'vue';
  import {
    Building2,
    Save,
    Plus,
    Edit,
    Trash2,
    X,
    UserPlus,
    AlertTriangle,
    CheckCircle,
    Mail,
    Phone,
    CreditCard,
    DollarSign,
    Smartphone,
    Wallet
  } from 'lucide-vue-next';

  definePageMeta({
    layout: 'dashboard'
  })
  
  // Tab state
  const activeTab = ref('general');
  
  // Modal states
  const showAddBranchModal = ref(false);
  const showAddPaymentMethodModal = ref(false);
  const showDeleteBranchModal = ref(false);
  const showSuccessNotification = ref(false);
  const successMessage = ref('');
  const editingBranch = ref(false);
  const editingPaymentMethod = ref(false);
  const selectedBranchId = ref<number | null>(null);
  const selectedPaymentMethodId = ref<number | null>(null);
  
  // Church profile data
  const churchProfile = reactive({
    name: 'Grace Community Church',
    denomination: 'Non-denominational',
    email: 'info@gracechurch.org',
    phone: '+1 (555) 123-4567',
    logo: 'https://randomuser.me/api/portraits/lego/1.jpg',
    website: 'https://www.gracechurch.org',
    description: 'A welcoming community of believers dedicated to serving God and our neighbors.',
    address: {
      street: '123 Main Street',
      city: 'Anytown',
      state: 'CA',
      postalCode: '12345',
      country: 'United States'
    }
  });
  
  // Branch data
  const branches = ref([
    {
      id: 1,
      name: 'Main Campus',
      location: 'Downtown, Anytown',
      adminId: 1,
      adminName: 'John Doe',
      adminAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      status: 'active',
      description: 'Our main church campus with full facilities.'
    },
    {
      id: 2,
      name: 'North Campus',
      location: 'North Anytown',
      adminId: 2,
      adminName: 'Jane Smith',
      adminAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      status: 'active',
      description: 'Satellite campus serving the northern community.'
    },
    {
      id: 3,
      name: 'South Campus',
      location: 'South Anytown',
      adminId: 3,
      adminName: 'Robert Johnson',
      adminAvatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      status: 'active',
      description: 'Satellite campus serving the southern community.'
    },
    {
      id: 4,
      name: 'East Campus',
      location: 'East Anytown',
      adminId: 4,
      adminName: 'Emily Davis',
      adminAvatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      status: 'active',
      description: 'Satellite campus serving the eastern community.'
    },
    {
      id: 5,
      name: 'West Campus',
      location: 'West Anytown',
      adminId: 5,
      adminName: 'Michael Wilson',
      adminAvatar: 'https://randomuser.me/api/portraits/men/5.jpg',
      status: 'inactive',
      description: 'Satellite campus serving the western community (under construction).'
    }
  ]);
  
  // Branch admins data
  const branchAdmins = ref([
    {
      id: 1,
      name: 'John Doe',
      role: 'Super Admin',
      branch: 'Main Campus',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      email: 'john@example.com',
      phone: '+1 (555) 111-2222'
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Branch Admin',
      branch: 'North Campus',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      email: 'jane@example.com',
      phone: '+1 (555) 222-3333'
    },
    {
      id: 3,
      name: 'Robert Johnson',
      role: 'Branch Admin',
      branch: 'South Campus',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      email: 'robert@example.com',
      phone: '+1 (555) 333-4444'
    },
    {
      id: 4,
      name: 'Emily Davis',
      role: 'Branch Admin',
      branch: 'East Campus',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      email: 'emily@example.com',
      phone: '+1 (555) 444-5555'
    },
    {
      id: 5,
      name: 'Michael Wilson',
      role: 'Branch Admin',
      branch: 'West Campus',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
      email: 'michael@example.com',
      phone: '+1 (555) 555-6666'
    }
  ]);
  
  // Financial configuration data
  const financialConfig = reactive({
    bankName: 'First National Bank',
    accountNumber: '1234567890',
    accountName: 'Grace Community Church',
    routingNumber: '987654321',
    taxId: '12-3456789',
    currency: 'USD'
  });
  
  // Payment methods data
  const paymentMethods = ref([
    {
      id: 1,
      name: 'Credit/Debit Card',
      type: 'card',
      description: 'Accept Visa, Mastercard, and American Express',
      enabled: true,
      icon: CreditCard
    },
    {
      id: 2,
      name: 'Bank Transfer',
      type: 'bank',
      description: 'Direct bank transfers and ACH payments',
      enabled: true,
      icon: DollarSign
    },
    {
      id: 3,
      name: 'Mobile Money',
      type: 'mobile',
      description: 'Mobile payment services',
      enabled: false,
      icon: Smartphone
    },
    {
      id: 4,
      name: 'Cash',
      type: 'cash',
      description: 'In-person cash donations',
      enabled: true,
      icon: Wallet
    }
  ]);
  
  // Form states
  const branchForm = reactive({
    id: 0,
    name: '',
    location: '',
    adminId: '',
    status: 'active',
    description: ''
  });
  
  const paymentMethodForm = reactive({
    id: 0,
    name: '',
    type: 'card',
    description: '',
    enabled: true
  });
  
  // Computed properties
  const availableAdmins = computed(() => {
    return branchAdmins.value.filter(admin => {
      // If editing, allow the current admin to be selected
      if (editingBranch.value && selectedBranchId.value) {
        const branch = branches.value.find(b => b.id === selectedBranchId.value);
        if (branch && branch.adminId === admin.id) {
          return true;
        }
      }
      
      // Check if admin is already assigned to a branch
      const isAssigned = branches.value.some(branch => branch.adminId === admin.id);
      return !isAssigned;
    });
  });
  
  // Methods
  const saveProfile = () => {
    // In a real app, this would save to a backend
    showSuccessNotification.value = true;
    successMessage.value = 'Church profile updated successfully!';
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      showSuccessNotification.value = false;
    }, 3000);
  };
  
  const editBranch = (branch: any) => {
    selectedBranchId.value = branch.id;
    branchForm.id = branch.id;
    branchForm.name = branch.name;
    branchForm.location = branch.location;
    branchForm.adminId = branch.adminId.toString();
    branchForm.status = branch.status;
    branchForm.description = branch.description;
    
    editingBranch.value = true;
    showAddBranchModal.value = true;
  };
  
  const assignAdmin = (branch: any) => {
    selectedBranchId.value = branch.id;
    branchForm.id = branch.id;
    branchForm.name = branch.name;
    branchForm.location = branch.location;
    branchForm.adminId = '';
    branchForm.status = branch.status;
    branchForm.description = branch.description;
    
    editingBranch.value = true;
    showAddBranchModal.value = true;
  };
  
  const confirmDeleteBranch = (branch: any) => {
    selectedBranchId.value = branch.id;
    showDeleteBranchModal.value = true;
  };
  
  const deleteBranch = () => {
    if (selectedBranchId.value) {
      branches.value = branches.value.filter(b => b.id !== selectedBranchId.value);
      showDeleteBranchModal.value = false;
      
      showSuccessNotification.value = true;
      successMessage.value = 'Branch deleted successfully!';
      
      // Auto-hide notification after 3 seconds
      setTimeout(() => {
        showSuccessNotification.value = false;
      }, 3000);
    }
  };
  
  const closeAddBranchModal = () => {
    showAddBranchModal.value = false;
    editingBranch.value = false;
    selectedBranchId.value = null;
    
    // Reset form
    branchForm.id = 0;
    branchForm.name = '';
    branchForm.location = '';
    branchForm.adminId = '';
    branchForm.status = 'active';
    branchForm.description = '';
  };
  
  const saveBranch = () => {
    const adminObj = branchAdmins.value.find(a => a.id.toString() === branchForm.adminId);
    
    if (editingBranch.value && selectedBranchId.value) {
      // Update existing branch
      const index = branches.value.findIndex(b => b.id === selectedBranchId.value);
      if (index !== -1) {
        branches.value[index] = {
          id: selectedBranchId.value,
          name: branchForm.name,
          location: branchForm.location,
          adminId: adminObj ? adminObj.id : 0,
          adminName: adminObj ? adminObj.name : 'Unassigned',
          adminAvatar: adminObj ? adminObj.avatar : '',
          status: branchForm.status,
          description: branchForm.description
        };
      }
      
      successMessage.value = 'Branch updated successfully!';
    } else {
      // Create new branch
      const newId = Math.max(0, ...branches.value.map(b => b.id)) + 1;
      branches.value.push({
        id: newId,
        name: branchForm.name,
        location: branchForm.location,
        adminId: adminObj ? adminObj.id : 0,
        adminName: adminObj ? adminObj.name : 'Unassigned',
        adminAvatar: adminObj ? adminObj.avatar : '',
        status: branchForm.status,
        description: branchForm.description
      });
      
      successMessage.value = 'Branch added successfully!';
    }
    
    showSuccessNotification.value = true;
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      showSuccessNotification.value = false;
    }, 3000);
    
    closeAddBranchModal();
  };
  
  const editPaymentMethod = (method: any) => {
    selectedPaymentMethodId.value = method.id;
    paymentMethodForm.id = method.id;
    paymentMethodForm.name = method.name;
    paymentMethodForm.type = method.type;
    paymentMethodForm.description = method.description;
    paymentMethodForm.enabled = method.enabled;
    
    editingPaymentMethod.value = true;
    showAddPaymentMethodModal.value = true;
  };
  
  const closeAddPaymentMethodModal = () => {
    showAddPaymentMethodModal.value = false;
    editingPaymentMethod.value = false;
    selectedPaymentMethodId.value = null;
    
    // Reset form
    paymentMethodForm.id = 0;
    paymentMethodForm.name = '';
    paymentMethodForm.type = 'card';
    paymentMethodForm.description = '';
    paymentMethodForm.enabled = true;
  };
  
  const savePaymentMethod = () => {
    let iconComponent;
    switch (paymentMethodForm.type) {
      case 'card':
        iconComponent = CreditCard;
        break;
      case 'bank':
        iconComponent = DollarSign;
        break;
      case 'mobile':
        iconComponent = Smartphone;
        break;
      default:
        iconComponent = Wallet;
    }
    
    if (editingPaymentMethod.value && selectedPaymentMethodId.value) {
      // Update existing payment method
      const index = paymentMethods.value.findIndex(m => m.id === selectedPaymentMethodId.value);
      if (index !== -1) {
        paymentMethods.value[index] = {
          id: selectedPaymentMethodId.value,
          name: paymentMethodForm.name,
          type: paymentMethodForm.type,
          description: paymentMethodForm.description,
          enabled: paymentMethodForm.enabled,
          icon: iconComponent
        };
      }
      
      successMessage.value = 'Payment method updated successfully!';
    } else {
      // Create new payment method
      const newId = Math.max(0, ...paymentMethods.value.map(m => m.id)) + 1;
      paymentMethods.value.push({
        id: newId,
        name: paymentMethodForm.name,
        type: paymentMethodForm.type,
        description: paymentMethodForm.description,
        enabled: paymentMethodForm.enabled,
        icon: iconComponent
      });
      
      successMessage.value = 'Payment method added successfully!';
    }
    
    showSuccessNotification.value = true;
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      showSuccessNotification.value = false;
    }, 3000);
    
    closeAddPaymentMethodModal();
  };
  
  const togglePaymentMethod = (method: any) => {
    const index = paymentMethods.value.findIndex(m => m.id === method.id);
    if (index !== -1) {
      paymentMethods.value[index].enabled = !paymentMethods.value[index].enabled;
      
      showSuccessNotification.value = true;
      successMessage.value = `${method.name} ${paymentMethods.value[index].enabled ? 'enabled' : 'disabled'} successfully!`;
      
      // Auto-hide notification after 3 seconds
      setTimeout(() => {
        showSuccessNotification.value = false;
      }, 3000);
    }
  };

  definePageMeta({
      layout: 'dashboard'
  })
  </script>
  
  <style scoped>
  .animate-fade-in {
    animation: fadeIn 0.6s ease-out forwards;
    opacity: 0;
  }
  
  .animation-delay-100 {
    animation-delay: 100ms;
  }
  
  .animation-delay-200 {
    animation-delay: 200ms;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>