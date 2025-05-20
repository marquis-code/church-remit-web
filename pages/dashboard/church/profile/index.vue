<template>
  <div class="min-h-screen">
    <!-- Loading overlay -->
    <div v-if="isLoading" class="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div class="flex flex-col items-center">
        <div class="w-16 h-16 relative">
          <div class="church-loader">
            <div class="church-steeple"></div>
            <div class="church-body"></div>
          </div>
        </div>
        <p class="mt-4 text-purple-800 font-medium animate-pulse">Loading church profile...</p>
      </div>
    </div>

    <div class="max-w-6xl mx-auto">
      <!-- Header with church name -->
      <header class="mb-8 text-start slide-in-top">
        <h1 class="text-3xl md:text-4xl font-bold text-purple-900 mb-2">
          {{ church?.name || 'Church Profile' }}
        </h1>
        <p class="text-purple-600 text-lg">Profile Management Dashboard</p>
      </header>

      <!-- Main content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Profile Card -->
        <div class="lg:col-span-2 bg-white rounded-2xl shadow-xl overflow-hidden fade-in">
          <div class="relative h-32 bg-gradient-to-r from-purple-600 to-purple-400">
            <div class="absolute -bottom-16 left-8 w-32 h-32 rounded-full bg-white p-2 shadow-lg border-4 border-white">
              <div v-if="church?.logo" class="w-full h-full rounded-full bg-cover bg-center" :style="`background-image: url(${church?.logo})`"></div>
              <div v-else class="w-full h-full rounded-full bg-purple-100 flex items-center justify-center">
                <span class="text-4xl font-bold text-purple-600">{{ getInitials(church?.name) }}</span>
              </div>
            </div>
          </div>
          
          <div class="pt-20 p-8">
            <div class="flex flex-wrap justify-between items-start mb-6">
              <div>
                <h2 class="text-2xl font-bold text-gray-800">{{ church?.name }}</h2>
                <p v-if="church?.description" class="text-gray-600 mt-1">{{ church?.description }}</p>
                <p v-else class="text-gray-400 italic mt-1">No description available</p>
              </div>
              <button 
                @click="openProfileModal" 
                class="mt-2 md:mt-0 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow transition-all duration-300 transform hover:scale-105 flex items-center"
              >
                <span>Edit Profile</span>
                <span class="ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                </span>
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4 slide-in-left">
                <div class="profile-item">
                  <div class="profile-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Email</p>
                    <p class="text-gray-800">{{ church?.email || 'Not provided' }}</p>
                  </div>
                </div>
                
                <div class="profile-item">
                  <div class="profile-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Phone</p>
                    <p class="text-gray-800">{{ church?.phoneNumber || 'Not provided' }}</p>
                  </div>
                </div>
                
                <div class="profile-item">
                  <div class="profile-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Website</p>
                    <p class="text-gray-800">
                      <a v-if="church?.website" :href="church?.website" target="_blank" class="text-purple-600 hover:underline">
                        {{ church?.website }}
                      </a>
                      <span v-else>Not provided</span>
                    </p>
                  </div>
                </div>
              </div>
              
              <div class="space-y-4 slide-in-right">
                <div class="profile-item">
                  <div class="profile-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Address</p>
                    <p class="text-gray-800">
                      <template v-if="church?.address">
                        {{ church?.address }}<br>
                        {{ [church.city, church.state].filter(Boolean).join(', ') }} {{ church?.postalCode || '' }}<br>
                        {{ church?.country || '' }}
                      </template>
                      <template v-else>
                        Not provided
                      </template>
                    </p>
                  </div>
                </div>
                
                <div class="profile-item">
                  <div class="profile-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Created</p>
                    <p class="text-gray-800">{{ formatDate(church?.createdAt) }}</p>
                  </div>
                </div>
                
                <div class="profile-item">
                  <div class="profile-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-activity"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Status</p>
                    <p class="text-gray-800">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize" 
                        :class="church?.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'">
                        {{ church?.status }}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Financial Config Card -->
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden fade-in">
          <div class="p-6 bg-gradient-to-r from-purple-600 to-purple-400">
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-bold text-white">Financial Configuration</h3>
              <button 
                @click="openFinancialModal" 
                class="p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            </div>
          </div>
          
          <div class="p-6 slide-in-bottom">
            <div v-if="church?.financialConfig" class="space-y-6">
              <div class="financial-item">
                <div class="financial-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-coins"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></svg>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Currency</p>
                  <p class="text-gray-800 font-medium">{{ church?.financialConfig?.currency }}</p>
                </div>
              </div>
              
              <div class="financial-item">
                <div class="financial-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-days"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Fiscal Year Start</p>
                  <p class="text-gray-800 font-medium">{{ formatFiscalDate(church?.financialConfig?.fiscalYearStart) }}</p>
                </div>
              </div>
              
              <div class="financial-item">
                <div class="financial-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-credit-card"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Payment Methods</p>
                  <div class="flex flex-wrap gap-2 mt-1">
                    <span v-for="method in church?.financialConfig?.paymentMethods" :key="method" 
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-purple-100 text-purple-800">
                      {{ formatPaymentMethod(method) }}
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="space-y-2">
                <p class="text-sm text-gray-500">Bank Accounts</p>
                <div v-for="(account, index) in church?.financialConfig?.bankAccounts" :key="index" 
                  class="p-3 bg-purple-50 rounded-lg border border-purple-100 hover:shadow-md transition-shadow">
                  <p class="font-medium text-gray-800">{{ account?.name }}</p>
                  <p class="text-sm text-gray-600">{{ account?.bankName }}</p>
                  <p class="text-sm text-gray-500">Acc: •••• {{ maskAccountNumber(account?.accountNumber) }}</p>
                </div>
              </div>
              
              <div class="space-y-2">
                <p class="text-sm text-gray-500">Donation Categories</p>
                <div v-for="(category, index) in church?.financialConfig?.donationCategories" :key="index" 
                  class="p-3 bg-purple-50 rounded-lg border border-purple-100 hover:shadow-md transition-shadow">
                  <div class="flex justify-between">
                    <p class="font-medium text-gray-800">{{ category?.name }}</p>
                    <span v-if="category?.isDefault" 
                      class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      Default
                    </span>
                  </div>
                  <p class="text-sm text-gray-600">{{ category?.description }}</p>
                </div>
              </div>
            </div>
            
            <div v-else class="py-8 text-center">
              <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wallet text-purple-600"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
              </div>
              <h4 class="text-lg font-medium text-gray-800">No Financial Configuration</h4>
              <p class="text-gray-500 mb-4">Set up your church's financial details</p>
              <button 
                @click="openFinancialModal" 
                class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow transition-all duration-300 transform hover:scale-105"
              >
                Configure Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Branches Section -->
      <div class="mt-8 bg-white rounded-2xl shadow-xl overflow-hidden fade-in">
        <div class="p-6 bg-gradient-to-r from-purple-600 to-purple-400">
          <h3 class="text-xl font-bold text-white">Church Branches</h3>
        </div>
        
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="branch in church?.branches" :key="branch?.id" 
              class="p-4 border border-purple-100 rounded-lg hover:shadow-md transition-shadow bg-white slide-in-up">
              <div class="flex items-start justify-between">
                <div>
                  <h4 class="font-medium text-gray-800">{{ branch?.name }}</h4>
                  <p v-if="branch?.isHeadquarters" class="text-sm text-purple-600">Headquarters</p>
                </div>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize" 
                  :class="branch?.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'">
                  {{ branch?.status }}
                </span>
              </div>
              
              <div class="mt-3 space-y-2">
                <p v-if="branch?.email" class="text-sm text-gray-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail mr-2 text-gray-400"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  {{ branch?.email }}
                </p>
                <p v-if="branch.phoneNumber" class="text-sm text-gray-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone mr-2 text-gray-400"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  {{ branch?.phoneNumber }}
                </p>
                <p v-if="branch?.address" class="text-sm text-gray-600 flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin mr-2 text-gray-400 mt-0.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>
                    {{ branch?.address }}<br v-if="branch?.address">
                    {{ [branch.city, branch.state].filter(Boolean).join(', ') }} {{ branch?.postalCode || '' }}<br v-if="branch?.city || branch?.state">
                    {{ branch?.country || '' }}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Profile Update Modal -->
    <div v-if="showProfileModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-animation">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-auto" @click.stop>
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-bold text-gray-800">Update Church Profile</h3>
            <button @click="showProfileModal = false" class="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
        </div>
        
        <div class="p-6">
          <form @submit.prevent="updateProfile">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div class="col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Church Name</label>
                <input 
                  v-model="profileForm.name" 
                  type="text" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Church name"
                  required
                />
              </div>
              
              <div class="col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  v-model="profileForm.description" 
                  rows="3"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="A brief description of your church"
                ></textarea>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  v-model="profileForm.email" 
                  type="email" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="contact@church.com"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input 
                  v-model="profileForm.phoneNumber" 
                  type="tel" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="+1234567890"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input 
                  v-model="profileForm.website" 
                  type="url" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://yourchurch.com"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input 
                  v-model="profileForm.address" 
                  type="text" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="123 Main St"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input 
                  v-model="profileForm.city" 
                  type="text" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Anytown"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                <input 
                  v-model="profileForm.state" 
                  type="text" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="CA"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input 
                  v-model="profileForm.country" 
                  type="text" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="USA"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                <input 
                  v-model="profileForm.postalCode" 
                  type="text" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="12345"
                />
              </div>
            </div>
            
            <div class="flex justify-end gap-3 border-t border-gray-200 pt-4">
              <button 
                type="button" 
                @click="showProfileModal = false"
                class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                :disabled="isUpdating"
                class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow transition-all duration-300 flex items-center"
                :class="{ 'opacity-70': isUpdating }"
              >
                <span v-if="isUpdating" class="mr-2">
                  <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
                {{ isUpdating ? 'Updating...' : 'Update Profile' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Financial Config Modal -->
    <div v-if="showFinancialModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-animation">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-auto" @click.stop>
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-bold text-gray-800">Update Financial Configuration</h3>
            <button @click="showFinancialModal = false" class="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
        </div>
        
        <div class="p-6">
          <form @submit.prevent="handleUpdateFinancialConfig">
            <div class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                  <select 
                    v-model="financialForm.currency" 
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                    <option value="AUD">AUD - Australian Dollar</option>
                    <option value="NGN">NGN - Nigerian Naira</option>
                    <option value="GHS">GHS - Ghanaian Cedi</option>
                    <option value="KES">KES - Kenyan Shilling</option>
                    <option value="ZAR">ZAR - South African Rand</option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Fiscal Year Start (MM-DD)</label>
                  <input 
                    v-model="financialForm.fiscalYearStart" 
                    type="text" 
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="01-01"
                    pattern="[0-1][0-9]-[0-3][0-9]"
                  />
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Payment Methods</label>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <label class="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg hover:bg-purple-50 cursor-pointer">
                    <input 
                      type="checkbox" 
                      value="cash" 
                      v-model="financialForm.paymentMethods"
                      class="rounded text-purple-600 focus:ring-purple-500"
                    />
                    <span>Cash</span>
                  </label>
                  <label class="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg hover:bg-purple-50 cursor-pointer">
                    <input 
                      type="checkbox" 
                      value="check" 
                      v-model="financialForm.paymentMethods"
                      class="rounded text-purple-600 focus:ring-purple-500"
                    />
                    <span>Check</span>
                  </label>
                  <label class="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg hover:bg-purple-50 cursor-pointer">
                    <input 
                      type="checkbox" 
                      value="card" 
                      v-model="financialForm.paymentMethods"
                      class="rounded text-purple-600 focus:ring-purple-500"
                    />
                    <span>Card</span>
                  </label>
                  <label class="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg hover:bg-purple-50 cursor-pointer">
                    <input 
                      type="checkbox" 
                      value="bank_transfer" 
                      v-model="financialForm.paymentMethods"
                      class="rounded text-purple-600 focus:ring-purple-500"
                    />
                    <span>Bank Transfer</span>
                  </label>
                </div>
              </div>
              
              <!-- Bank Accounts -->
              <div>
                <div class="flex justify-between items-center mb-2">
                  <label class="block text-sm font-medium text-gray-700">Bank Accounts</label>
                  <button 
                    type="button" 
                    @click="addBankAccount"
                    class="text-sm text-purple-600 hover:text-purple-800 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-circle mr-1"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
                    Add Account
                  </button>
                </div>
                
                <div v-for="(account, index) in financialForm.bankAccounts" :key="index" class="p-3 border border-gray-200 rounded-lg mb-3">
                  <div class="flex justify-between items-start mb-2">
                    <h4 class="font-medium">Bank Account #{{ index + 1 }}</h4>
                    <button 
                      type="button" 
                      @click="removeBankAccount(index)"
                      class="text-red-500 hover:text-red-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                    </button>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label class="block text-xs text-gray-500 mb-1">Account Name</label>
                      <input 
                        v-model="account.name" 
                        type="text" 
                        class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Main Account"
                      />
                    </div>
                    <div>
                      <label class="block text-xs text-gray-500 mb-1">Bank Name</label>
                      <input 
                        v-model="account.bankName" 
                        type="text" 
                        class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="First National Bank"
                      />
                    </div>
                    <div>
                      <label class="block text-xs text-gray-500 mb-1">Account Number</label>
                      <input 
                        v-model="account.accountNumber" 
                        type="text" 
                        class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="1234567890"
                      />
                    </div>
                  </div>
                </div>
                
                <div v-if="financialForm.bankAccounts.length === 0" class="text-center py-4 border border-dashed border-gray-300 rounded-lg">
                  <p class="text-gray-500">No bank accounts added</p>
                  <button 
                    type="button" 
                    @click="addBankAccount"
                    class="mt-2 text-sm text-purple-600 hover:text-purple-800 flex items-center justify-center mx-auto"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-circle mr-1"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
                    Add Account
                  </button>
                </div>
              </div>
              
              <!-- Donation Categories -->
              <div>
                <div class="flex justify-between items-center mb-2">
                  <label class="block text-sm font-medium text-gray-700">Donation Categories</label>
                  <button 
                    type="button" 
                    @click="addDonationCategory"
                    class="text-sm text-purple-600 hover:text-purple-800 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-circle mr-1"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
                    Add Category
                  </button>
                </div>
                
                <div v-for="(category, index) in financialForm.donationCategories" :key="index" class="p-3 border border-gray-200 rounded-lg mb-3">
                  <div class="flex justify-between items-start mb-2">
                    <h4 class="font-medium">Category #{{ index + 1 }}</h4>
                    <button 
                      type="button" 
                      @click="removeDonationCategory(index)"
                      class="text-red-500 hover:text-red-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                    </button>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label class="block text-xs text-gray-500 mb-1">Category Name</label>
                      <input 
                        v-model="category.name" 
                        type="text" 
                        class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Tithe"
                      />
                    </div>
                    <div>
                      <label class="block text-xs text-gray-500 mb-1">Description</label>
                      <input 
                        v-model="category.description" 
                        type="text" 
                        class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Regular tithe"
                      />
                    </div>
                  </div>
                  
                  <div class="mt-2">
                    <label class="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        v-model="category.isDefault"
                        class="rounded text-purple-600 focus:ring-purple-500"
                      />
                      <span class="text-sm">Set as default category</span>
                    </label>
                  </div>
                </div>
                
                <div v-if="financialForm.donationCategories.length === 0" class="text-center py-4 border border-dashed border-gray-300 rounded-lg">
                  <p class="text-gray-500">No donation categories added</p>
                  <button 
                    type="button" 
                    @click="addDonationCategory"
                    class="mt-2 text-sm text-purple-600 hover:text-purple-800 flex items-center justify-center mx-auto"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-circle mr-1"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
                    Add Category
                  </button>
                </div>
              </div>
            </div>
            
            <div class="flex justify-end gap-3 border-t border-gray-200 pt-4 mt-6">
              <button 
                type="button" 
                @click="showFinancialModal = false"
                class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                :disabled="isUpdating"
                class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow transition-all duration-300 flex items-center"
                :class="{ 'opacity-70': isUpdating }"
              >
                <span v-if="isUpdating" class="mr-2">
                  <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
                {{ isUpdating ? 'Updating...' : 'Update Configuration' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Success Toast -->
    <!-- <div v-if="showToast" class="fixed bottom-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-lg toast-animation z-50">
      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle mr-3"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
        <span>{{ toastMessage }}</span>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useGetChurchProfile } from "@/composables/modules/church/useGetChurchProfile"
import { useUpdateChurchProfile } from "@/composables/modules/church/useUpdateChurchProfile"
import { useUpdateFinancialConfig } from "@/composables/modules/church/useUpdateFinancialConfig"

const { churchProfile: church, loading } = useGetChurchProfile()
const { updateChurchProfile, loading: updating } = useUpdateChurchProfile()
const { updateFinancialConfig, loading: updatingFinancialConfig } = useUpdateFinancialConfig()

// Types
interface BankAccount {
  name: string
  accountNumber: string
  bankName: string
}

interface DonationCategory {
  name: string
  description: string
  isDefault: boolean
}

interface FinancialConfig {
  currency: string
  fiscalYearStart: string
  bankAccounts: BankAccount[]
  paymentMethods: string[]
  donationCategories: DonationCategory[]
}

interface Branch {
  id: string
  churchId: string
  name: string
  code: string | null
  address: string | null
  city: string | null
  state: string | null
  country: string | null
  postalCode: string | null
  email: string | null
  phoneNumber: string | null
  isHeadquarters: boolean
  parentBranchId: string | null
  remittanceConfig: any | null
  status: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

interface Church {
  id: string
  name: string
  logo: string | null
  address: string | null
  city: string | null
  state: string | null
  country: string | null
  postalCode: string | null
  email: string
  phoneNumber: string | null
  website: string | null
  description: string | null
  financialConfig: FinancialConfig | null
  status: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  branches: Branch[]
}

// State
const isLoading = ref(true)
const isUpdating = ref(false)
const showProfileModal = ref(false)
const showFinancialModal = ref(false)
const showToast = ref(false)
const toastMessage = ref('')

// Sample church data (would normally come from API)
// const church = reactive<Church>({
//   id: "a44252bb-23c6-441e-884d-fb3906966a64",
//   name: "Test church",
//   logo: null,
//   address: null,
//   city: null,
//   state: null,
//   country: null,
//   postalCode: null,
//   email: "debbie1@gmail.com",
//   phoneNumber: null,
//   website: null,
//   description: null,
//   financialConfig: null,
//   status: "active",
//   createdAt: "2025-05-20T08:12:22.845Z",
//   updatedAt: "2025-05-20T08:12:22.845Z",
//   deletedAt: null,
//   branches: [
//     {
//       id: "655be853-9c09-402a-8abd-dc5af789abbc",
//       churchId: "a44252bb-23c6-441e-884d-fb3906966a64",
//       name: "Headquarters",
//       code: null,
//       address: null,
//       city: null,
//       state: null,
//       country: null,
//       postalCode: null,
//       email: null,
//       phoneNumber: null,
//       isHeadquarters: true,
//       parentBranchId: null,
//       remittanceConfig: null,
//       status: "active",
//       createdAt: "2025-05-20T08:12:22.869Z",
//       updatedAt: "2025-05-20T08:12:22.869Z",
//       deletedAt: null
//     }
//   ]
// })

// Form state
const profileForm = reactive({
  name: "",
  address: "",
  city: "",
  state: "",
  country: "",
  postalCode: "",
  email: "",
  phoneNumber: "",
  website: "",
  description: ""
})

const financialForm = reactive<FinancialConfig>({
  currency: "USD",
  fiscalYearStart: "01-01",
  bankAccounts: [],
  paymentMethods: [],
  donationCategories: []
})

// Methods
const getInitials = (name: string): string => {
  if (!name) return "?"
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2)
}

const formatDate = (dateString: string): string => {
  if (!dateString) return "N/A"
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

const formatFiscalDate = (fiscalDate: string): string => {
  if (!fiscalDate) return "January 1"
  
  const [month, day] = fiscalDate.split('-').map(Number)
  const date = new Date(2000, month - 1, day)
  
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric' 
  })
}

const formatPaymentMethod = (method: string): string => {
  return method.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
}

const maskAccountNumber = (accountNumber: string): string => {
  if (!accountNumber) return ""
  return accountNumber.slice(-4)
}

const openProfileModal = () => {
  // Populate form with current values
  profileForm.name = church?.value?.name
  profileForm.address = church?.value?.address || ""
  profileForm.city = church?.value?.city || ""
  profileForm.state = church?.value?.state || ""
  profileForm.country = church?.value?.country || ""
  profileForm.postalCode = church?.value?.postalCode || ""
  profileForm.email = church?.value?.email
  profileForm.phoneNumber = church?.value?.phoneNumber || ""
  profileForm.website = church?.value?.website || ""
  profileForm.description = church?.value?.description || ""
  
  showProfileModal.value = true
}

const openFinancialModal = () => {
  // Populate form with current values or defaults
  if (church?.value?.financialConfig) {
    financialForm.currency = church?.value?.financialConfig?.currency
    financialForm.fiscalYearStart = church?.value?.financialConfig?.fiscalYearStart
    financialForm.bankAccounts = JSON.parse(JSON.stringify(church?.value?.financialConfig?.bankAccounts))
    financialForm.paymentMethods = [...church.financialConfig.paymentMethods]
    financialForm.donationCategories = JSON.parse(JSON.stringify(church?.value?.financialConfig?.donationCategories))
  } else {
    // Default values
    financialForm.currency = "USD"
    financialForm.fiscalYearStart = "01-01"
    financialForm.bankAccounts = []
    financialForm.paymentMethods = ["cash"]
    financialForm.donationCategories = [
      {
        name: "Tithe",
        description: "Regular tithe",
        isDefault: true
      }
    ]
  }
  
  showFinancialModal.value = true
}

const addBankAccount = () => {
  financialForm.bankAccounts.push({
    name: "",
    accountNumber: "",
    bankName: ""
  })
}

const removeBankAccount = (index: number) => {
  financialForm.bankAccounts.splice(index, 1)
}

const addDonationCategory = () => {
  financialForm.donationCategories.push({
    name: "",
    description: "",
    isDefault: false
  })
}

const removeDonationCategory = (index: number) => {
  financialForm.donationCategories.splice(index, 1)
}

const updateProfile = async () => {
  try {
    isUpdating.value = true
    
    // Simulate API call
    await updateChurchProfile(profileForm).then(() => {
    // await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Update local state
    Object.assign(church, profileForm)
    
    showProfileModal.value = false
    // showToast("Church profile updated successfully!")
    })
  } catch (error) {
    console.error("Error updating profile:", error)
    // showToast("Failed to update profile. Please try again.", false)
  } finally {
    isUpdating.value = false
  }
}

const handleUpdateFinancialConfig = async () => {
  try {
    isUpdating.value = true
    
    // Simulate API call
    // await new Promise(resolve => setTimeout(resolve, 1500))
    await updateFinancialConfig(financialForm).then(() => {
    // church?.value?.financialConfig = JSON.parse(JSON.stringify(financialForm))
    showFinancialModal.value = false
    // showToast("Financial configuration updated successfully!")
    })
  } catch (error) {
    console.error("Error updating financial config:", error)
    // showToast("Failed to update financial configuration. Please try again.", false)
  } finally {
    isUpdating.value = false
  }
}

// const showToastFunc = (message: string, success = true) => {
//   toastMessage.value = message
//   showToast.value = true
  
//   setTimeout(() => {
//     showToast.value = false
//   }, 3000)
// }

// Lifecycle hooks
onMounted(async () => {
  // Simulate loading data
  await new Promise(resolve => setTimeout(resolve, 1500))
  isLoading.value = false
})

definePageMeta({
    layout: 'dashboard'
})
</script>

<style scoped>
/* Profile and Financial Item Styles */
.profile-item, .financial-item {
  @apply flex items-start gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors;
}

.profile-icon, .financial-icon {
  @apply flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600;
}

/* Animations */
.slide-in-top {
  animation: slideInTop 0.5s ease-out forwards;
}

.slide-in-left {
  animation: slideInLeft 0.5s ease-out forwards;
}

.slide-in-right {
  animation: slideInRight 0.5s ease-out forwards;
}

.slide-in-bottom {
  animation: slideInBottom 0.5s ease-out forwards;
}

.slide-in-up {
  animation: slideInUp 0.5s ease-out forwards;
}

.fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

.modal-animation {
  animation: fadeIn 0.3s ease-out forwards;
}

.toast-animation {
  animation: slideInRight 0.3s ease-out forwards;
}

/* Church Loader Animation */
.church-loader {
  @apply relative w-full h-full;
}

.church-steeple {
  @apply absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-purple-600;
  clip-path: polygon(0% 100%, 50% 0%, 100% 100%);
  animation: pulse 1.5s infinite;
}

.church-body {
  @apply absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-8 bg-purple-500 rounded-t-lg;
  animation: pulse 1.5s infinite 0.3s;
}

@keyframes slideInTop {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideInLeft {
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideInBottom {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideInUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes pulse {
  0% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.7;
  }
}
</style>