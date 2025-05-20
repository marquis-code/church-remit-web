<template>
  <div class="min-h-screen ">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <header class="mb-8">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 class="text-3xl font-bold text-gray-800 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Church Branch Management
            </h1>
            <p class="text-gray-600 mt-2">
              Manage all your church branches in one place
            </p>
          </div>
          <button 
            @click="showCreateModal = true" 
            class="px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 self-start"
          >
            <span class="text-lg">+</span>
            <span>Add Branch</span>
          </button>
        </div>
      </header>

      <!-- Main content -->
      <div class="bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 border border-gray-100">
        <!-- Content -->
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold text-gray-800">All Branches</h2>
            <div class="relative">
              <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="Search branches..." 
                class="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
              />
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute right-3 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <!-- Loading state -->
          <div v-if="fetchingBranches" class="flex justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>

          <!-- Empty state -->
          <div v-else-if="!branches || branches.length === 0" class="py-16 flex flex-col items-center justify-center text-center">
            <div class="relative">
              <div class="bg-purple-100 p-6 rounded-full mb-4 relative overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div class="absolute -top-2 -right-2 h-6 w-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                0
              </div>
            </div>
            <h3 class="text-xl font-medium text-gray-700 mb-2">No branches yet</h3>
            <p class="text-gray-500 max-w-md mb-6">
              You haven't created any church branches yet. Start by adding your first branch.
            </p>
            <button 
              @click="showCreateModal = true" 
              class="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-lg shadow-lg transition-all duration-200"
            >
              Create First Branch
            </button>
          </div>

          <!-- Branches grid -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <div 
              v-for="(branch, index) in filteredBranches" 
              :key="branch.id"
              class="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              :class="{'animate-fade-in': true}"
              :style="{animationDelay: `${index * 0.1}s`}"
            >
            <!-- {{branch}} -->
              <div class="h-3 bg-gradient-to-r" :class="getBranchHeaderColor(index)"></div>
              <div class="p-6">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-lg font-semibold text-gray-800">{{ branch.name }}</h3>
                    <span class="inline-block mt-1 px-2.5 py-0.5 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                      {{ branch.code }}
                    </span>
                  </div>
                  <div class="relative">
                    <button 
                      @click="toggleDropdown(branch.id)" 
                      class="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                    <div 
                      v-if="activeDropdown === branch.id" 
                      class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200 animate-fade-in-down"
                      :data-dropdown-id="branch.id"
                    >
                      <div class="py-1">
                        <button 
                          @click="viewBranchDetails(branch.id)" 
                          class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150 flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View Details
                        </button>
                        <button 
                          @click="editBranch(branch.id)" 
                          class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150 flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit Branch
                        </button>
                        <button 
                          @click="editRemittanceConfig(branch.id)" 
                          class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150 flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Update Remittance
                        </button>
                        <button 
                          @click="confirmDeleteBranch(branch.id)" 
                          class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete Branch
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="space-y-2 text-sm text-gray-600">
                  <div class="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span class="line-clamp-2">{{ branch.address }}, {{ branch.city }}, {{ branch.state }}, {{ branch.country }} {{ branch.postalCode }}</span>
                  </div>
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span class="truncate">{{ branch.email }}</span>
                  </div>
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{{ branch.phoneNumber }}</span>
                  </div>
                </div>
              </div>
              <div 
                v-if="branch.remittanceConfig" 
                class="px-6 py-3 bg-gray-50 border-t border-gray-200 text-sm"
              >
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Remittance:</span>
                  <span class="font-medium text-purple-600">{{ branch.remittanceConfig.percentage }}%</span>
                </div>
                <div class="flex justify-between items-center mt-1">
                  <span class="text-gray-600">Frequency:</span>
                  <span class="font-medium text-gray-800 capitalize">{{ branch.remittanceConfig.frequency }}</span>
                </div>
              </div>
              <div class="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-between">
                <button 
                  @click="viewBranchDetails(branch.id)"
                  class="text-sm text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200 flex items-center"
                >
                  View Details
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button 
                  @click="editBranch(branch.id)"
                  class="text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200 flex items-center"
                >
                  Edit
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Branch Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in p-4">
      <div class="bg-white rounded-xl shadow-2xl max-w-3xl w-full mx-auto animate-scale-in overflow-hidden">
        <div class="bg-gradient-to-r from-purple-600 to-pink-500 py-4 px-6">
          <h3 class="text-xl font-bold text-white">{{ isEditing ? 'Update Branch' : 'Create New Branch' }}</h3>
        </div>
        <div class="p-6 max-h-[80vh] overflow-y-auto">
          <form @submit.prevent="submitBranchForm" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label for="name" class="block text-sm font-medium text-gray-700">Branch Name</label>
                <input 
                  id="name" 
                  v-model="branchForm.name" 
                  type="text" 
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
                  placeholder="Downtown Branch"
                />
              </div>
              <div class="space-y-2">
                <label for="code" class="block text-sm font-medium text-gray-700">Branch Code</label>
                <input 
                  id="code" 
                  v-model="branchForm.code" 
                  type="text" 
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
                  placeholder="DTB"
                />
              </div>
              <div class="space-y-2">
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input 
                  id="email" 
                  v-model="branchForm.email" 
                  type="email" 
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
                  placeholder="downtown@gracechurch.com"
                />
              </div>
              <div class="space-y-2">
                <label for="phoneNumber" class="block text-sm font-medium text-gray-700">Phone Number</label>
                <input 
                  id="phoneNumber" 
                  v-model="branchForm.phoneNumber" 
                  type="tel" 
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
                  placeholder="+1234567891"
                />
              </div>
              <div class="space-y-2">
                <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                <input 
                  id="address" 
                  v-model="branchForm.address" 
                  type="text" 
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
                  placeholder="456 Center St"
                />
              </div>
              <div class="space-y-2">
                <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                <input 
                  id="city" 
                  v-model="branchForm.city" 
                  type="text" 
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
                  placeholder="Anytown"
                />
              </div>
              <div class="space-y-2">
                <label for="state" class="block text-sm font-medium text-gray-700">State</label>
                <input 
                  id="state" 
                  v-model="branchForm.state" 
                  type="text" 
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
                  placeholder="CA"
                />
              </div>
              <div class="space-y-2">
                <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
                <input 
                  id="country" 
                  v-model="branchForm.country" 
                  type="text" 
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
                  placeholder="USA"
                />
              </div>
              <div class="space-y-2">
                <label for="postalCode" class="block text-sm font-medium text-gray-700">Postal Code</label>
                <input 
                  id="postalCode" 
                  v-model="branchForm.postalCode" 
                  type="text" 
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
                  placeholder="12345"
                />
              </div>
            </div>
          </form>
        </div>
        <div class="bg-gray-50 px-6 py-4 flex justify-end space-x-4">
          <button 
            type="button" 
            @click="showCreateModal = false" 
            class="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
          <button 
            @click="submitBranchForm"
            class="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-lg shadow-lg transition-colors duration-200 flex items-center"
            :disabled="creating || updating"
          >
            <span v-if="creating || updating" class="mr-2">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ isEditing ? 'Update Branch' : 'Create Branch' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Branch Details Modal -->
    <div v-if="showDetailsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in p-4">
      <div class="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-auto animate-scale-in overflow-hidden">
        <div class="bg-gradient-to-r from-purple-600 to-pink-500 py-4 px-6 flex justify-between items-center">
          <h3 class="text-xl font-bold text-white">Branch Details</h3>
          <button @click="showDetailsModal = false" class="text-white hover:text-gray-200 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Loading state -->
        <div v-if="fetchingDetails" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>

        <!-- Branch details content -->
        <div v-else-if="branch" class="p-6 max-h-[80vh] overflow-y-auto">
          <div class="flex flex-col md:flex-row md:items-start justify-between mb-6">
            <div>
              <h3 class="text-2xl font-bold text-gray-800 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">{{ branch.name }}</h3>
              <span class="inline-block mt-2 px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                {{ branch.code }}
              </span>
            </div>
            <div class="flex space-x-3 mt-4 md:mt-0">
              <button 
                @click="editBranchFromDetails()" 
                class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Branch
              </button>
              <button 
                @click="confirmDeleteBranch(branch.id)" 
                class="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors duration-200 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-4">
              <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
                <h4 class="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  Contact Information
                </h4>
                <div class="space-y-3 text-gray-600">
                  <div class="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <span class="block text-sm text-gray-500">Email</span>
                      <span class="block mt-1">{{ branch.email }}</span>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <span class="block text-sm text-gray-500">Phone</span>
                      <span class="block mt-1">{{ branch.phoneNumber }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
                <h4 class="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Location
                </h4>
                <div class="space-y-3 text-gray-600">
                  <div class="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <span class="block text-sm text-gray-500">Address</span>
                      <span class="block mt-1">{{ branch.address }}</span>
                      <span class="block mt-1">{{ branch.city }}, {{ branch.state }} {{ branch.postalCode }}</span>
                      <span class="block mt-1">{{ branch.country }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Remittance Config -->
          <div v-if="branch.remittanceConfig" class="mt-8 pt-6 border-t border-gray-200">
            <div class="flex justify-between items-center mb-4">
              <h4 class="text-lg font-medium text-gray-800 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Remittance Configuration
              </h4>
              <button 
                @click="editRemittanceConfigFromDetails()" 
                class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Config
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-5 text-center">
                <div class="inline-flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <span class="block text-sm text-gray-500">Percentage</span>
                <span class="block text-2xl font-bold text-purple-600 mt-1">{{ branch.remittanceConfig.percentage }}%</span>
              </div>
              <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-5 text-center">
                <div class="inline-flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span class="block text-sm text-gray-500">Frequency</span>
                <span class="block text-2xl font-bold text-gray-800 mt-1 capitalize">{{ branch.remittanceConfig.frequency }}</span>
              </div>
              <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-5 text-center">
                <div class="inline-flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span class="block text-sm text-gray-500">Due Day</span>
                <span class="block text-2xl font-bold text-gray-800 mt-1">{{ branch.remittanceConfig.dueDay }}</span>
              </div>
            </div>

            <div class="mt-6">
              <h5 class="text-md font-medium text-gray-700 mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Categories
              </h5>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  v-for="category in branch.remittanceConfig.categories" 
                  :key="category.name"
                  class="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm border border-gray-200"
                >
                  <span class="font-medium text-gray-800">{{ category.name }}</span>
                  <span class="px-2.5 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                    {{ category.percentage }}%
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="mt-8 pt-6 border-t border-gray-200">
            <div class="flex justify-between items-center">
              <h4 class="text-lg font-medium text-gray-800 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Remittance Configuration
              </h4>
              <button 
                @click="editRemittanceConfigFromDetails()" 
                class="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-lg shadow-lg transition-colors duration-200 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Remittance Config
              </button>
            </div>
            <div class="mt-4 p-6 bg-gray-50 rounded-lg text-center">
              <p class="text-gray-500">No remittance configuration has been set up for this branch.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Remittance Config Modal -->
    <div v-if="showRemittanceModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in p-4">
      <div class="bg-white rounded-xl shadow-2xl max-w-3xl w-full mx-auto animate-scale-in overflow-hidden">
        <div class="bg-gradient-to-r from-purple-600 to-pink-500 py-4 px-6 flex justify-between items-center">
          <h3 class="text-xl font-bold text-white">Update Remittance Configuration</h3>
          <button @click="showRemittanceModal = false" class="text-white hover:text-gray-200 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-6 max-h-[80vh] overflow-y-auto">
          <form @submit.prevent="submitRemittanceForm" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="space-y-2">
                <label for="percentage" class="block text-sm font-medium text-gray-700">Percentage (%)</label>
                <input 
                  id="percentage" 
                  v-model.number="remittanceForm.percentage" 
                  type="number" 
                  min="0"
                  max="100"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
                  placeholder="10"
                />
              </div>
              <div class="space-y-2">
                <label for="frequency" class="block text-sm font-medium text-gray-700">Frequency</label>
                <select 
                  id="frequency" 
                  v-model="remittanceForm.frequency" 
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <div class="space-y-2">
                <label for="dueDay" class="block text-sm font-medium text-gray-700">Due Day</label>
                <input 
                  id="dueDay" 
                  v-model.number="remittanceForm.dueDay" 
                  type="number" 
                  min="1"
                  :max="remittanceForm.frequency === 'monthly' ? 31 : 7"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
                  placeholder="5"
                />
              </div>
            </div>

            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <h3 class="text-lg font-medium text-gray-800">Categories</h3>
                <button 
                  type="button"
                  @click="addCategory"
                  class="p-2 text-purple-600 hover:text-purple-700 rounded-full hover:bg-purple-50 transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>

              <div 
                v-for="(category, index) in remittanceForm.categories" 
                :key="index"
                class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg animate-fade-in"
              >
                <div class="flex-grow">
                  <input 
                    v-model="category.name" 
                    type="text" 
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Category Name"
                  />
                </div>
                <div class="w-24">
                  <div class="flex items-center">
                    <input 
                      v-model.number="category.percentage" 
                      type="number" 
                      min="0"
                      max="100"
                      required
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
                      placeholder="100"
                    />
                    <span class="ml-2 text-gray-500">%</span>
                  </div>
                </div>
                <button 
                  type="button"
                  @click="removeCategory(index)"
                  class="p-2 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50 transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              <div v-if="remittanceForm.categories.length === 0" class="p-6 bg-gray-50 rounded-lg text-center">
                <p class="text-gray-500">No categories added. Click the + button to add a category.</p>
              </div>
            </div>
          </form>
        </div>
        <div class="bg-gray-50 px-6 py-4 flex justify-end space-x-4">
          <button 
            type="button" 
            @click="showRemittanceModal = false" 
            class="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
          <button 
            @click="submitRemittanceForm"
            class="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-lg shadow-lg transition-colors duration-200 flex items-center"
            :disabled="updatingRemittanceConfig"
          >
            <span v-if="updatingRemittanceConfig" class="mr-2">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            Update Remittance Config
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in p-4">
      <div class="bg-white rounded-xl shadow-2xl max-w-md w-full mx-auto animate-scale-in">
        <div class="p-6">
          <div class="text-center mb-6">
            <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Delete Branch</h3>
            <p class="text-gray-500">
              Are you sure you want to delete this branch? This action cannot be undone.
            </p>
          </div>
          <div class="flex justify-center space-x-4">
            <button 
              @click="showDeleteModal = false" 
              class="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button 
              @click="deleteBranchConfirmed" 
              class="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition-colors duration-200 flex items-center"
              :disabled="deleting"
            >
              <span v-if="deleting" class="mr-2">
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              Delete Branch
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div 
      v-if="toast.show" 
      class="fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform animate-slide-up"
      :class="{
        'bg-gradient-to-r from-green-500 to-emerald-600 text-white': toast.type === 'success',
        'bg-gradient-to-r from-red-500 to-pink-600 text-white': toast.type === 'error',
        'bg-gradient-to-r from-blue-500 to-indigo-600 text-white': toast.type === 'info'
      }"
    >
      <div class="flex items-center space-x-3">
        <svg v-if="toast.type === 'success'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <svg v-if="toast.type === 'error'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <svg v-if="toast.type === 'info'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ toast.message }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, onUnmounted, computed } from 'vue'
import { useDeleteBranch } from "@/composables/modules/branch/useDeleteBranch" 
import { useGetBranchDetails } from "@/composables/modules/branch/useGetBranchDetails" 
import { useGetBranches } from "@/composables/modules/branch/useGetBranches" 
import { useUpdateBranch } from "@/composables/modules/branch/useUpdateBranch" 
import { useUpdateRemittanceConfig } from "@/composables/modules/branch/useUpdateRemittanceConfig"
import { useCreateBranch } from "@/composables/modules/branch/useCreateBranch"
// import { useCreateBranch, useDeleteBranch, useGetBranchDetails, useGetBranches, useUpdateBranch, useUpdateRemittanceConfig } from './composables/branchComposables';

// Fix typos in the imported composables
const { createBranch, loading: creating } = useCreateBranch()
const { deleteBranch, loading: deleting } = useDeleteBranch()
const { branch, loading: fetchingDetails, getBranchDetails } = useGetBranchDetails()
const { loading: fetchingBranches, branches } = useGetBranches()
const { updateBranch, loading: updating } = useUpdateBranch()
const { updateRemittanceConfig, loading: updatingRemittanceConfig } = useUpdateRemittanceConfig()

// UI state
const activeDropdown = ref<string | null>(null)
const showDeleteModal = ref(false)
const showCreateModal = ref(false)
const showDetailsModal = ref(false)
const showRemittanceModal = ref(false)
const branchToDelete = ref<string | null>(null)
const isEditing = ref(false)
const currentBranchId = ref<string | null>(null)
const searchQuery = ref('')

// Toast notification
const toast = reactive({
  show: false,
  message: '',
  type: 'success'
})

// Form state
const branchForm = reactive({
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

const remittanceForm = reactive({
  percentage: 10,
  frequency: 'monthly',
  dueDay: 5,
  categories: [
    { name: 'Tithe', percentage: 100 },
    { name: 'Offering', percentage: 50 }
  ]
})

// Computed properties
const filteredBranches = computed(() => {
  if (!branches.value || !searchQuery.value) return branches.value
  
  const query = searchQuery.value.toLowerCase()
  return branches.value.filter(branch => 
    branch.name.toLowerCase().includes(query) || 
    branch.code.toLowerCase().includes(query) || 
    branch.city.toLowerCase().includes(query) ||
    branch.email.toLowerCase().includes(query)
  )
})

// Fetch branches on component mount
onMounted(() => {
  fetchBranches()
})

// Methods
const fetchBranches = async () => {
  try {
    // await fetchingBranches()
    // showToast('Branches loaded successfully', 'success')
  } catch (error) {
    // showToast('Failed to load branches', 'error')
  }
}

const toggleDropdown = (branchId: string) => {
  if (activeDropdown.value === branchId) {
    activeDropdown.value = null
  } else {
    activeDropdown.value = branchId
  }
}

const viewBranchDetails = async (branchId: string) => {
  activeDropdown.value = null
  currentBranchId.value = branchId
  
  try {
    await getBranchDetails(branchId)
    showDetailsModal.value = true
  } catch (error) {
    // showToast('Failed to load branch details', 'error')
  }
}

const editBranch = async (branchId: string) => {
  activeDropdown.value = null
  currentBranchId.value = branchId
  isEditing.value = true
  
  try {
    await getBranchDetails(branchId)
    
    // Populate form with branch data
    if (branch.value) {
      branchForm.name = branch.value.name
      branchForm.code = branch.value.code
      branchForm.address = branch.value.address
      branchForm.city = branch.value.city
      branchForm.state = branch.value.state
      branchForm.country = branch.value.country
      branchForm.postalCode = branch.value.postalCode
      branchForm.email = branch.value.email
      branchForm.phoneNumber = branch.value.phoneNumber
    }
    
    showCreateModal.value = true
  } catch (error) {
    // showToast('Failed to load branch for editing', 'error')
  }
}

const editBranchFromDetails = () => {
  showDetailsModal.value = false
  isEditing.value = true
  
  // Populate form with branch data
  if (branch.value) {
    branchForm.name = branch.value.name
    branchForm.code = branch.value.code
    branchForm.address = branch.value.address
    branchForm.city = branch.value.city
    branchForm.state = branch.value.state
    branchForm.country = branch.value.country
    branchForm.postalCode = branch.value.postalCode
    branchForm.email = branch.value.email
    branchForm.phoneNumber = branch.value.phoneNumber
  }
  
  showCreateModal.value = true
}

const editRemittanceConfig = async (branchId: string) => {
  activeDropdown.value = null
  currentBranchId.value = branchId
  
  try {
    await getBranchDetails(branchId)
    
    // Populate remittance form with data if available
    if (branch.value && branch.value.remittanceConfig) {
      remittanceForm.percentage = branch.value.remittanceConfig.percentage
      remittanceForm.frequency = branch.value.remittanceConfig.frequency
      remittanceForm.dueDay = branch.value.remittanceConfig.dueDay
      remittanceForm.categories = [...branch.value.remittanceConfig.categories]
    } else {
      // Reset to defaults if no config exists
      remittanceForm.percentage = 10
      remittanceForm.frequency = 'monthly'
      remittanceForm.dueDay = 5
      remittanceForm.categories = [
        { name: 'Tithe', percentage: 100 },
        { name: 'Offering', percentage: 50 }
      ]
    }
    
    showRemittanceModal.value = true
  } catch (error) {
    // showToast('Failed to load remittance configuration', 'error')
  }
}

const editRemittanceConfigFromDetails = () => {
  showDetailsModal.value = false
  
  // Populate remittance form with data if available
  if (branch.value && branch.value.remittanceConfig) {
    remittanceForm.percentage = branch.value.remittanceConfig.percentage
    remittanceForm.frequency = branch.value.remittanceConfig.frequency
    remittanceForm.dueDay = branch.value.remittanceConfig.dueDay
    remittanceForm.categories = [...branch.value.remittanceConfig.categories]
  } else {
    // Reset to defaults if no config exists
    remittanceForm.percentage = 10
    remittanceForm.frequency = 'monthly'
    remittanceForm.dueDay = 5
    remittanceForm.categories = [
      { name: 'Tithe', percentage: 100 },
      { name: 'Offering', percentage: 50 }
    ]
  }
  
  showRemittanceModal.value = true
}

const confirmDeleteBranch = (branchId: string) => {
  activeDropdown.value = null
  branchToDelete.value = branchId
  showDeleteModal.value = true
}

const deleteBranchConfirmed = async () => {
  if (!branchToDelete.value) return
  
  try {
    await deleteBranch(branchToDelete.value)
    showDeleteModal.value = false
    branchToDelete.value = null
    
    // Refresh branches list
    await fetchBranches()
    
    // Close details modal if we're deleting the current branch
    if (showDetailsModal.value && currentBranchId.value === branchToDelete.value) {
      showDetailsModal.value = false
    }
    
    // showToast('Branch deleted successfully', 'success')
  } catch (error) {
    // showToast('Failed to delete branch', 'error')
  }
}

const submitBranchForm = async () => {
  try {
    if (isEditing.value && currentBranchId.value) {
      await updateBranch(currentBranchId.value, branchForm)
      // showToast('Branch updated successfully', 'success')
    } else {
      await createBranch(branchForm)
      // showToast('Branch created successfully', 'success')
    }
    
    // Reset form and state
    resetBranchForm()
    isEditing.value = false
    currentBranchId.value = null
    showCreateModal.value = false
    
    // Refresh branches list
    await fetchBranches()
  } catch (error) {
    // showToast(isEditing.value ? 'Failed to update branch' : 'Failed to create branch', 'error')
  }
}

const submitRemittanceForm = async () => {
  if (!currentBranchId.value) return
  
  try {
    await updateRemittanceConfig(currentBranchId.value, { remittanceConfig: remittanceForm })
    
    // Refresh branch details if details modal is open
    // if (showDetailsModal.value) {
    //   await fetchingDetails(currentBranchId.value)
    // }
    
    // showToast('Remittance configuration updated successfully', 'success')
    showRemittanceModal.value = false
  } catch (error) {
    // showToast('Failed to update remittance configuration', 'error')
  }
}

const resetBranchForm = () => {
  branchForm.name = ''
  branchForm.code = ''
  branchForm.address = ''
  branchForm.city = ''
  branchForm.state = ''
  branchForm.country = ''
  branchForm.postalCode = ''
  branchForm.email = ''
  branchForm.phoneNumber = ''
}

const addCategory = () => {
  remittanceForm.categories.push({ name: '', percentage: 100 })
}

const removeCategory = (index: number) => {
  remittanceForm.categories.splice(index, 1)
}

// const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
//   toast.show = true
//   toast.message = message
//   toast.type = type
  
//   setTimeout(() => {
//     toast.show = false
//   }, 3000)
// }

// Get a different gradient color for each branch card header
const getBranchHeaderColor = (index: number) => {
  const colors = [
    'from-purple-500 to-pink-500',
    'from-blue-500 to-teal-400',
    'from-green-500 to-emerald-400',
    'from-yellow-400 to-orange-500',
    'from-red-500 to-pink-500',
    'from-indigo-500 to-purple-500'
  ]
  return colors[index % colors.length]
}

// Close dropdown when clicking outside
watch(() => activeDropdown.value, (newVal) => {
  if (newVal) {
    // Add event listener to close dropdown when clicking outside
    setTimeout(() => {
      window.addEventListener('click', closeDropdownOnClickOutside)
    }, 0)
  } else {
    // Remove event listener when dropdown is closed
    window.removeEventListener('click', closeDropdownOnClickOutside)
  }
})

const closeDropdownOnClickOutside = (event: Event) => {
  if (activeDropdown.value) {
    const target = event.target as HTMLElement
    const dropdown = document.querySelector(`[data-dropdown-id="${activeDropdown.value}"]`)
    if (dropdown && !dropdown.contains(target)) {
      activeDropdown.value = null
    }
  }
}

// Clean up event listener on component unmount
onUnmounted(() => {
  window.removeEventListener('click', closeDropdownOnClickOutside)
})

definePageMeta({
    layout: 'dashboard'
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

.animate-fade-in-down {
  animation: fadeInDown 0.3s ease-in-out;
}

.animate-scale-in {
  animation: scaleIn 0.3s ease-in-out;
}

.animate-slide-up {
  animation: slideUp 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInDown {
  from { 
    opacity: 0; 
    transform: translateY(-10px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from { 
    opacity: 0; 
    transform: scale(0.95);
  }
  to { 
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slideUp {
  from { 
    opacity: 0; 
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}
</style>