<template>
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Branch Management</h1>
        <div class="flex space-x-2 mt-4 md:mt-0">
          <button
            @click="openCreateModal"
            class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors flex items-center"
          >
            <span class="i-lucide-building-2 mr-2"></span>
            Add Branch
          </button>
          <button
            @click="exportData"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <span class="i-lucide-download mr-2"></span>
            Export
          </button>
          <button
            @click="viewMode = 'list'"
            :class="[
              'p-2 rounded-md transition-colors',
              viewMode === 'list'
                ? 'bg-gray-200 text-gray-800'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            ]"
          >
            <span class="i-lucide-list"></span>
          </button>
          <button
            @click="viewMode = 'grid'"
            :class="[
              'p-2 rounded-md transition-colors',
              viewMode === 'grid'
                ? 'bg-gray-200 text-gray-800'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            ]"
          >
            <span class="i-lucide-grid"></span>
          </button>
        </div>
      </div>
  
      <!-- Filters -->
      <div class="bg-white p-4 rounded-lg shadow mb-6">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <span class="i-lucide-search"></span>
              </span>
              <input
                v-model="filters.search"
                type="text"
                placeholder="Search by name, code, city..."
                class="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
          <div class="w-full md:w-48">
            <label class="block text-sm font-medium text-gray-700 mb-1">State</label>
            <select
              v-model="filters.state"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">All States</option>
              <option v-for="state in uniqueStates" :key="state" :value="state">{{ state }}</option>
            </select>
          </div>
          <div class="w-full md:w-48 flex items-end">
            <button
              @click="resetFilters"
              class="w-full p-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>
  
      <!-- Loading State -->
      <div v-if="fetching" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
  
      <!-- Empty State -->
      <div
        v-else-if="!fetching && filteredBranches.length === 0"
        class="bg-white rounded-lg shadow p-8 text-center"
      >
        <div class="mx-auto h-24 w-24 text-gray-400 mb-4">
          <span class="i-lucide-building-2 text-6xl"></span>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No branches found</h3>
        <p class="text-gray-500 mb-6">
          There are no branches matching your criteria. Try adjusting your filters or add a new branch.
        </p>
        <button
          @click="openCreateModal"
          class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors inline-flex items-center"
        >
          <span class="i-lucide-building-2 mr-2"></span>
          Add Branch
        </button>
      </div>
  
      <!-- List View -->
      <div v-else-if="viewMode === 'list'" class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Branch
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Contact
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Location
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Remittance
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="branch in filteredBranches" :key="branch.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-10 w-10 flex-shrink-0">
                    <div
                      class="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-medium"
                    >
                      {{ branch.code }}
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ branch.name }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ branch.email }}</div>
                <div class="text-sm text-gray-500">{{ branch.phoneNumber }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ branch.city }}, {{ branch.state }}</div>
                <div class="text-sm text-gray-500">{{ branch.country }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div v-if="branch.remittanceConfig" class="text-sm text-gray-900">
                  {{ branch.remittanceConfig.percentage }}% ({{ branch.remittanceConfig.frequency }})
                </div>
                <div v-else class="text-sm text-gray-500">Not configured</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    @click="viewBranchDetails(branch.id)"
                    class="text-blue-600 hover:text-blue-900"
                    title="View Details"
                  >
                    <span class="i-lucide-eye"></span>
                  </button>
                  <button
                    @click="openEditModal(branch)"
                    class="text-emerald-600 hover:text-emerald-900"
                    title="Edit Branch"
                  >
                    <span class="i-lucide-edit"></span>
                  </button>
                  <button
                    @click="openRemittanceModal(branch)"
                    class="text-purple-600 hover:text-purple-900"
                    title="Update Remittance"
                  >
                    <span class="i-lucide-percent"></span>
                  </button>
                  <button
                    @click="confirmDelete(branch)"
                    class="text-red-600 hover:text-red-900"
                    title="Delete Branch"
                  >
                    <span class="i-lucide-trash-2"></span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Grid View -->
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <div
          v-for="branch in filteredBranches"
          :key="branch.id"
          class="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow"
        >
          <div class="p-6">
            <div class="flex justify-center mb-4">
              <div
                class="h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 text-xl font-medium"
              >
                {{ branch.code }}
              </div>
            </div>
            <div class="text-center mb-4">
              <h3 class="text-lg font-medium text-gray-900">{{ branch.name }}</h3>
            </div>
            <div class="space-y-2 text-sm text-gray-500">
              <div class="flex items-center">
                <span class="i-lucide-mail mr-2"></span>
                <span>{{ branch.email }}</span>
              </div>
              <div class="flex items-center">
                <span class="i-lucide-phone mr-2"></span>
                <span>{{ branch.phoneNumber }}</span>
              </div>
              <div class="flex items-center">
                <span class="i-lucide-map-pin mr-2"></span>
                <span>{{ branch.city }}, {{ branch.state }}</span>
              </div>
              <div v-if="branch.remittanceConfig" class="flex items-center">
                <span class="i-lucide-percent mr-2"></span>
                <span>{{ branch.remittanceConfig.percentage }}% ({{ branch.remittanceConfig.frequency }})</span>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 flex justify-around">
            <button
              @click="viewBranchDetails(branch.id)"
              class="text-blue-600 hover:text-blue-900"
              title="View Details"
            >
              <span class="i-lucide-eye"></span>
            </button>
            <button
              @click="openEditModal(branch)"
              class="text-emerald-600 hover:text-emerald-900"
              title="Edit Branch"
            >
              <span class="i-lucide-edit"></span>
            </button>
            <button
              @click="openRemittanceModal(branch)"
              class="text-purple-600 hover:text-purple-900"
              title="Update Remittance"
            >
              <span class="i-lucide-percent"></span>
            </button>
            <button
              @click="confirmDelete(branch)"
              class="text-red-600 hover:text-red-900"
              title="Delete Branch"
            >
              <span class="i-lucide-trash-2"></span>
            </button>
          </div>
        </div>
      </div>
  
      <!-- Create/Edit Branch Modal -->
      <div
        v-if="showBranchModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div class="p-6 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-800">
              {{ isEditing ? 'Edit Branch' : 'Add New Branch' }}
            </h2>
          </div>
          <div class="p-6">
            <form @submit.prevent="submitBranchForm" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Branch Name*</label>
                  <input
                    v-model="branchForm.name"
                    type="text"
                    required
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Branch Code*</label>
                  <input
                    v-model="branchForm.code"
                    type="text"
                    required
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                  <input
                    v-model="branchForm.email"
                    type="email"
                    required
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                  <input
                    v-model="branchForm.phoneNumber"
                    type="tel"
                    required
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Address*</label>
                  <input
                    v-model="branchForm.address"
                    type="text"
                    required
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">City*</label>
                  <input
                    v-model="branchForm.city"
                    type="text"
                    required
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">State*</label>
                  <input
                    v-model="branchForm.state"
                    type="text"
                    required
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Country*</label>
                  <input
                    v-model="branchForm.country"
                    type="text"
                    required
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Postal Code*</label>
                  <input
                    v-model="branchForm.postalCode"
                    type="text"
                    required
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>
              <div class="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  @click="showBranchModal = false"
                  class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  :disabled="creating || loading"
                  class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors flex items-center"
                >
                  <span
                    v-if="creating || loading"
                    class="animate-spin h-4 w-4 mr-2 border-t-2 border-b-2 border-white rounded-full"
                  ></span>
                  {{ isEditing ? 'Update Branch' : 'Create Branch' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  
      <!-- Remittance Config Modal -->
      <div
        v-if="showRemittanceModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
          <div class="p-6 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-800">Update Remittance Configuration</h2>
            <p class="text-gray-600 mt-1">{{ selectedBranch?.name }}</p>
          </div>
          <div class="p-6">
            <form @submit.prevent="submitRemittanceForm" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Percentage (%)*</label>
                <input
                  v-model.number="remittanceForm.percentage"
                  type="number"
                  min="0"
                  max="100"
                  required
                  class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Frequency*</label>
                <select
                  v-model="remittanceForm.frequency"
                  required
                  class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annually">Annually</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Due Day*</label>
                <input
                  v-model.number="remittanceForm.dueDay"
                  type="number"
                  min="1"
                  max="31"
                  required
                  class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <p class="text-xs text-gray-500 mt-1">
                  For monthly: day of month (1-31), for weekly: day of week (1-7)
                </p>
              </div>
  
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Categories</label>
                <div class="space-y-2 mt-2">
                  <div
                    v-for="(category, index) in remittanceForm.categories"
                    :key="index"
                    class="flex items-center space-x-2"
                  >
                    <input
                      v-model="category.name"
                      type="text"
                      placeholder="Category name"
                      class="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <input
                      v-model.number="category.percentage"
                      type="number"
                      min="0"
                      max="100"
                      placeholder="%"
                      class="w-20 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <button
                      type="button"
                      @click="removeCategory(index)"
                      class="p-2 text-red-500 hover:text-red-700"
                    >
                      <span class="i-lucide-x"></span>
                    </button>
                  </div>
                  <button
                    type="button"
                    @click="addCategory"
                    class="mt-2 text-sm text-emerald-600 hover:text-emerald-800 flex items-center"
                  >
                    <span class="i-lucide-plus mr-1"></span>
                    Add Category
                  </button>
                </div>
              </div>
  
              <div class="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  @click="showRemittanceModal = false"
                  class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  :disabled="updatingConfig"
                  class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors flex items-center"
                >
                  <span
                    v-if="updatingConfig"
                    class="animate-spin h-4 w-4 mr-2 border-t-2 border-b-2 border-white rounded-full"
                  ></span>
                  Update Remittance
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  
      <!-- Branch Details Modal -->
      <div
        v-if="showDetailsModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div class="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 class="text-xl font-semibold text-gray-800">Branch Details</h2>
            <button @click="showDetailsModal = false" class="text-gray-500 hover:text-gray-700">
              <span class="i-lucide-x"></span>
            </button>
          </div>
          <div v-if="fetchingDetails" class="p-20 flex justify-center">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
          <div v-else-if="branch" class="p-6">
            <div class="flex flex-col md:flex-row">
              <div class="md:w-1/3 flex justify-center mb-6 md:mb-0">
                <div
                  class="h-32 w-32 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 text-3xl font-medium"
                >
                  {{ branch.code }}
                </div>
              </div>
              <div class="md:w-2/3">
                <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ branch.name }}</h3>
                <p class="text-gray-600 mb-4">Code: {{ branch.code }}</p>
  
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 class="text-sm font-medium text-gray-500">Contact Information</h4>
                    <div class="mt-2 space-y-2">
                      <div class="flex items-center">
                        <span class="i-lucide-mail mr-2 text-gray-400"></span>
                        <span>{{ branch.email }}</span>
                      </div>
                      <div class="flex items-center">
                        <span class="i-lucide-phone mr-2 text-gray-400"></span>
                        <span>{{ branch.phoneNumber }}</span>
                      </div>
                    </div>
                  </div>
                </div>
  
                <div class="mb-6">
                  <h4 class="text-sm font-medium text-gray-500">Address</h4>
                  <p class="mt-2">
                    {{ branch.address }}<br />
                    {{ branch.city }}, {{ branch.state }} {{ branch.postalCode }}<br />
                    {{ branch.country }}
                  </p>
                </div>
  
                <div v-if="branch.remittanceConfig" class="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 class="text-sm font-medium text-gray-700 mb-2">Remittance Configuration</h4>
                  <div class="space-y-2">
                    <div class="flex items-center">
                      <span class="i-lucide-percent mr-2 text-gray-400"></span>
                      <span>Percentage: {{ branch.remittanceConfig.percentage }}%</span>
                    </div>
                    <div class="flex items-center">
                      <span class="i-lucide-calendar mr-2 text-gray-400"></span>
                      <span>Frequency: {{ capitalizeFirstLetter(branch.remittanceConfig.frequency) }}</span>
                    </div>
                    <div class="flex items-center">
                      <span class="i-lucide-calendar-clock mr-2 text-gray-400"></span>
                      <span>Due Day: {{ branch.remittanceConfig.dueDay }}</span>
                    </div>
                    <div v-if="branch.remittanceConfig.categories?.length" class="mt-2">
                      <h5 class="text-xs font-medium text-gray-500 mb-1">Categories:</h5>
                      <ul class="list-disc list-inside text-sm text-gray-600 pl-2">
                        <li v-for="(category, index) in branch.remittanceConfig.categories" :key="index">
                          {{ category.name }}: {{ category.percentage }}%
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="p-6 border-t border-gray-200 flex justify-end space-x-3">
            <button
              @click="openEditModal(branch)"
              class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors flex items-center"
            >
              <span class="i-lucide-edit mr-2"></span>
              Edit Branch
            </button>
            <button
              @click="openRemittanceModal(branch)"
              class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center"
            >
              <span class="i-lucide-percent mr-2"></span>
              Update Remittance
            </button>
          </div>
        </div>
      </div>
  
      <!-- Delete Confirmation Modal -->
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
          <div class="p-6 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-800">Confirm Delete</h2>
          </div>
          <div class="p-6">
            <p class="text-gray-700">
              Are you sure you want to delete the branch <strong>{{ selectedBranch?.name }}</strong>? This action cannot be undone.
            </p>
            <div class="flex justify-end space-x-3 pt-6">
              <button
                type="button"
                @click="showDeleteModal = false"
                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                @click="deleteBranchConfirmed"
                :disabled="deleting"
                class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center"
              >
                <span
                  v-if="deleting"
                  class="animate-spin h-4 w-4 mr-2 border-t-2 border-b-2 border-white rounded-full"
                ></span>
                Delete Branch
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { useCreateBranch } from '@/composables/modules/branch/useCreateBranch'
  import { useDeleteBranch } from '@/composables/modules/branch/useDeleteBranch'
  import { useGetBranchDetails } from '@/composables/modules/branch/useGetBranchDetails'
  import { useGetBranches } from '@/composables/modules/branch/useGetBranches'
  import { useUpdateBranch } from '@/composables/modules/branch/useUpdateBranch'
  import { useUpdateRemittanceConfig } from '@/composables/modules/branch/useUpdateRemittanceConfig'
  
  // State
  const viewMode = ref('list')
  const showBranchModal = ref(false)
  const showRemittanceModal = ref(false)
  const showDetailsModal = ref(false)
  const showDeleteModal = ref(false)
  const isEditing = ref(false)
  const selectedBranch = ref(null)
  
  // Filters
  const filters = ref({
    search: '',
    state: ''
  })
  
  // Forms
  const branchForm = ref({
    name: '',
    code: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    email: '',
    phoneNumber: ''
  })
  
  const remittanceForm = ref({
    percentage: 10,
    frequency: 'monthly',
    dueDay: 5,
    categories: [
      { name: 'Tithe', percentage: 100 },
      { name: 'Offering', percentage: 50 }
    ]
  })
  
  // Composables
  const createBranch = useCreateBranch()
  const deleteBranch = useDeleteBranch()
  const getBranchDetails = useGetBranchDetails()
  const branches = useGetBranches()
  const updateBranch = useUpdateBranch()
  const updateRemittanceConfig = useUpdateRemittanceConfig()
  
  // Computed
  const filteredBranches = computed(() => {
    if (!branches.value) return []
    
    return branches.value.filter(branch => {
      const searchMatch = !filters.value.search || 
        `${branch.name} ${branch.code} ${branch.city} ${branch.email}`
          .toLowerCase()
          .includes(filters.value.search.toLowerCase())
      
      const stateMatch = !filters.value.state || branch.state === filters.value.state
      
      return searchMatch && stateMatch
    })
  })
  
  const uniqueStates = computed(() => {
    if (!branches.value) return []
    
    const states = branches.value.map(branch => branch.state).filter(Boolean)
    return [...new Set(states)]
  })
  
  // Methods
  const resetFilters = () => {
    filters.value = {
      search: '',
      state: ''
    }
  }
  
  const openCreateModal = () => {
    isEditing.value = false
    branchForm.value = {
      name: '',
      code: '',
      address: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      email: '',
      phoneNumber: ''
    }
    showBranchModal.value = true
  }
  
  const openEditModal = (branch) => {
    isEditing.value = true
    selectedBranch.value = branch
    branchForm.value = { ...branch }
    showDetailsModal.value = false
    showBranchModal.value = true
  }
  
  const openRemittanceModal = (branch) => {
    selectedBranch.value = branch
    
    // Initialize with existing remittance data if available
    if (branch.remittanceConfig) {
      remittanceForm.value = { ...branch.remittanceConfig }
    } else {
      remittanceForm.value = {
        percentage: 10,
        frequency: 'monthly',
        dueDay: 5,
        categories: [
          { name: 'Tithe', percentage: 100 },
          { name: 'Offering', percentage: 50 }
        ]
      }
    }
    
    showDetailsModal.value = false
    showRemittanceModal.value = true
  }
  
  const viewBranchDetails = async (branchId) => {
    await getBranchDetails(branchId)
    showDetailsModal.value = true
  }
  
  const confirmDelete = (branch) => {
    selectedBranch.value = branch
    showDeleteModal.value = true
  }
  
  const deleteBranchConfirmed = async () => {
    try {
      await deleteBranch(selectedBranch.value.id)
      showDeleteModal.value = false
    } catch (error) {
      console.error('Error deleting branch:', error)
    }
  }
  
  const submitBranchForm = async () => {
    try {
      if (isEditing.value) {
        await updateBranch({
          id: selectedBranch.value.id,
          ...branchForm.value
        })
      } else {
        await createBranch(branchForm.value)
      }
      showBranchModal.value = false
    } catch (error) {
      console.error('Error submitting branch form:', error)
    }
  }
  
  const submitRemittanceForm = async () => {
    try {
      await updateRemittanceConfig({
        branchId: selectedBranch.value.id,
        remittanceConfig: remittanceForm.value
      })
      showRemittanceModal.value = false
    } catch (error) {
      console.error('Error updating remittance config:', error)
    }
  }
  
  const addCategory = () => {
    remittanceForm.value.categories.push({ name: '', percentage: 0 })
  }
  
  const removeCategory = (index) => {
    remittanceForm.value.categories.splice(index, 1)
  }
  
  const exportData = () => {
    const dataStr = JSON.stringify(filteredBranches.value, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `branches-export-${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }
  
  // Utility functions
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString()
  }
  
  const capitalizeFirstLetter = (string) => {
    if (!string) return ''
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  
  // Lifecycle
  onMounted(() => {
    // Fetch branches on component mount
  })
  </script>