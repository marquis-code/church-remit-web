<template>
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Members Management</h1>
        <div class="flex space-x-2 mt-4 md:mt-0">
          <button
            @click="openCreateModal"
            class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors flex items-center"
          >
            <span class="i-lucide-user-plus mr-2"></span>
            Add Member
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
                placeholder="Search by name, email, phone..."
                class="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
          <div class="w-full md:w-48">
            <label class="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              v-model="filters.gender"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="w-full md:w-48">
            <label class="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
            <input
              v-model="filters.joinDate"
              type="date"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
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
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
  
      <!-- Empty State -->
      <div
        v-else-if="!loading && filteredMembers.length === 0"
        class="bg-white rounded-lg shadow p-8 text-center"
      >
        <div class="mx-auto h-24 w-24 text-gray-400 mb-4">
          <span class="i-lucide-users text-6xl"></span>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No members found</h3>
        <p class="text-gray-500 mb-6">
          There are no members matching your criteria. Try adjusting your filters or add a new member.
        </p>
        <button
          @click="openCreateModal"
          class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors inline-flex items-center"
        >
          <span class="i-lucide-user-plus mr-2"></span>
          Add Member
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
                Name
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
                Join Date
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
            <tr v-for="member in filteredMembers" :key="member.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-10 w-10 flex-shrink-0">
                    <div
                      class="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-medium"
                    >
                      {{ getInitials(member.firstName, member.lastName) }}
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ member.firstName }} {{ member.lastName }}
                    </div>
                    <div class="text-sm text-gray-500">{{ member.occupation }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ member.email }}</div>
                <div class="text-sm text-gray-500">{{ member.phoneNumber }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ member.city }}, {{ member.state }}</div>
                <div class="text-sm text-gray-500">{{ member.country }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(member.joinDate) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    @click="viewMemberDetails(member.id)"
                    class="text-blue-600 hover:text-blue-900"
                  >
                    <span class="i-lucide-eye"></span>
                  </button>
                  <button
                    @click="openEditModal(member)"
                    class="text-emerald-600 hover:text-emerald-900"
                  >
                    <span class="i-lucide-edit"></span>
                  </button>
                  <button
                    @click="openFollowUpModal(member)"
                    class="text-purple-600 hover:text-purple-900"
                  >
                    <span class="i-lucide-calendar"></span>
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
          v-for="member in filteredMembers"
          :key="member.id"
          class="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow"
        >
          <div class="p-6">
            <div class="flex justify-center mb-4">
              <div
                class="h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 text-xl font-medium"
              >
                {{ getInitials(member.firstName, member.lastName) }}
              </div>
            </div>
            <div class="text-center mb-4">
              <h3 class="text-lg font-medium text-gray-900">
                {{ member.firstName }} {{ member.lastName }}
              </h3>
              <p class="text-gray-500">{{ member.occupation }}</p>
            </div>
            <div class="space-y-2 text-sm text-gray-500">
              <div class="flex items-center">
                <span class="i-lucide-mail mr-2"></span>
                <span>{{ member.email }}</span>
              </div>
              <div class="flex items-center">
                <span class="i-lucide-phone mr-2"></span>
                <span>{{ member.phoneNumber }}</span>
              </div>
              <div class="flex items-center">
                <span class="i-lucide-map-pin mr-2"></span>
                <span>{{ member.city }}, {{ member.state }}</span>
              </div>
              <div class="flex items-center">
                <span class="i-lucide-calendar mr-2"></span>
                <span>Joined: {{ formatDate(member.joinDate) }}</span>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 flex justify-around">
            <button
              @click="viewMemberDetails(member.id)"
              class="text-blue-600 hover:text-blue-900"
              title="View Details"
            >
              <span class="i-lucide-eye"></span>
            </button>
            <button
              @click="openEditModal(member)"
              class="text-emerald-600 hover:text-emerald-900"
              title="Edit Member"
            >
              <span class="i-lucide-edit"></span>
            </button>
            <button
              @click="openFollowUpModal(member)"
              class="text-purple-600 hover:text-purple-900"
              title="Update Follow-up"
            >
              <span class="i-lucide-calendar"></span>
            </button>
          </div>
        </div>
      </div>
  
      <!-- Create/Edit Member Modal -->
      <div
        v-if="showMemberModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div class="p-6 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-800">
              {{ isEditing ? 'Edit Member' : 'Add New Member' }}
            </h2>
          </div>
          <div class="p-6">
            <form @submit.prevent="submitMemberForm" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                  <input
                    v-model="memberForm.firstName"
                    type="text"
                    required
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                  <input
                    v-model="memberForm.lastName"
                    type="text"
                    required
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                  <input
                    v-model="memberForm.middleName"
                    type="text"
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                  <input
                    v-model="memberForm.email"
                    type="email"
                    required
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                  <input
                    v-model="memberForm.phoneNumber"
                    type="tel"
                    required
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    v-model="memberForm.dateOfBirth"
                    type="date"
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    v-model="memberForm.gender"
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                  <input
                    v-model="memberForm.occupation"
                    type="text"
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    v-model="memberForm.address"
                    type="text"
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    v-model="memberForm.city"
                    type="text"
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    v-model="memberForm.state"
                    type="text"
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input
                    v-model="memberForm.country"
                    type="text"
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                  <input
                    v-model="memberForm.postalCode"
                    type="text"
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Join Date*</label>
                  <input
                    v-model="memberForm.joinDate"
                    type="date"
                    required
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>
              <div class="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  @click="showMemberModal = false"
                  class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  :disabled="creating || updating"
                  class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors flex items-center"
                >
                  <span
                    v-if="creating || updating"
                    class="animate-spin h-4 w-4 mr-2 border-t-2 border-b-2 border-white rounded-full"
                  ></span>
                  {{ isEditing ? 'Update Member' : 'Create Member' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  
      <!-- Follow-up Modal -->
      <div
        v-if="showFollowUpModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
          <div class="p-6 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-800">Update Follow-up Status</h2>
            <p class="text-gray-600 mt-1">
              {{ selectedMember?.firstName }} {{ selectedMember?.lastName }}
            </p>
          </div>
          <div class="p-6">
            <form @submit.prevent="submitFollowUpForm" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  v-model="followUpForm.status"
                  class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Last Contact Date</label>
                <input
                  v-model="followUpForm.lastContact"
                  type="date"
                  class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Next Contact Date</label>
                <input
                  v-model="followUpForm.nextContact"
                  type="date"
                  class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                <input
                  v-model="followUpForm.assignedTo"
                  type="text"
                  placeholder="Staff ID"
                  class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  v-model="followUpForm.notes"
                  rows="3"
                  class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                ></textarea>
              </div>
              <div class="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  @click="showFollowUpModal = false"
                  class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  :disabled="updatingFollowupStataus"
                  class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors flex items-center"
                >
                  <span
                    v-if="updatingFollowupStataus"
                    class="animate-spin h-4 w-4 mr-2 border-t-2 border-b-2 border-white rounded-full"
                  ></span>
                  Update Follow-up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  
      <!-- Member Details Modal -->
      <div
        v-if="showDetailsModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div class="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 class="text-xl font-semibold text-gray-800">Member Details</h2>
            <button @click="showDetailsModal = false" class="text-gray-500 hover:text-gray-700">
              <span class="i-lucide-x"></span>
            </button>
          </div>
          <div v-if="fetchingDetails" class="p-20 flex justify-center">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
          <div v-else-if="member" class="p-6">
            <div class="flex flex-col md:flex-row">
              <div class="md:w-1/3 flex justify-center mb-6 md:mb-0">
                <div
                  class="h-32 w-32 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 text-3xl font-medium"
                >
                  {{ getInitials(member.firstName, member.lastName) }}
                </div>
              </div>
              <div class="md:w-2/3">
                <h3 class="text-2xl font-bold text-gray-900 mb-2">
                  {{ member.firstName }} {{ member.middleName }} {{ member.lastName }}
                </h3>
                <p class="text-gray-600 mb-4">{{ member.occupation }}</p>
  
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 class="text-sm font-medium text-gray-500">Contact Information</h4>
                    <div class="mt-2 space-y-2">
                      <div class="flex items-center">
                        <span class="i-lucide-mail mr-2 text-gray-400"></span>
                        <span>{{ member.email }}</span>
                      </div>
                      <div class="flex items-center">
                        <span class="i-lucide-phone mr-2 text-gray-400"></span>
                        <span>{{ member.phoneNumber }}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 class="text-sm font-medium text-gray-500">Personal Information</h4>
                    <div class="mt-2">
                      <div class="flex items-center">
                        <span class="i-lucide-calendar mr-2 text-gray-400"></span>
                        <span>DOB: {{ formatDate(member.dateOfBirth) }}</span>
                      </div>
                      <div class="flex items-center">
                        <span class="i-lucide-user mr-2 text-gray-400"></span>
                        <span>Gender: {{ capitalizeFirstLetter(member.gender) }}</span>
                      </div>
                    </div>
                  </div>
                </div>
  
                <div class="mb-6">
                  <h4 class="text-sm font-medium text-gray-500">Address</h4>
                  <p class="mt-2">
                    {{ member.address }}<br />
                    {{ member.city }}, {{ member.state }} {{ member.postalCode }}<br />
                    {{ member.country }}
                  </p>
                </div>
  
                <div>
                  <h4 class="text-sm font-medium text-gray-500">Membership</h4>
                  <div class="mt-2">
                    <div class="flex items-center">
                      <span class="i-lucide-calendar mr-2 text-gray-400"></span>
                      <span>Joined: {{ formatDate(member.joinDate) }}</span>
                    </div>
                  </div>
                </div>
  
                <div v-if="member.followUpStatus" class="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 class="text-sm font-medium text-gray-700 mb-2">Follow-up Status</h4>
                  <div class="space-y-2">
                    <div class="flex items-center">
                      <span class="i-lucide-activity mr-2 text-gray-400"></span>
                      <span>Status: {{ capitalizeFirstLetter(member.followUpStatus.status) }}</span>
                    </div>
                    <div class="flex items-center">
                      <span class="i-lucide-calendar-check mr-2 text-gray-400"></span>
                      <span>Last Contact: {{ formatDate(member.followUpStatus.lastContact) }}</span>
                    </div>
                    <div class="flex items-center">
                      <span class="i-lucide-calendar-clock mr-2 text-gray-400"></span>
                      <span>Next Contact: {{ formatDate(member.followUpStatus.nextContact) }}</span>
                    </div>
                    <div class="flex items-center">
                      <span class="i-lucide-user-check mr-2 text-gray-400"></span>
                      <span>Assigned To: {{ member.followUpStatus.assignedTo }}</span>
                    </div>
                    <div v-if="member.followUpStatus.notes" class="mt-2">
                      <h5 class="text-xs font-medium text-gray-500 mb-1">Notes:</h5>
                      <p class="text-sm text-gray-600">{{ member.followUpStatus.notes }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="p-6 border-t border-gray-200 flex justify-end space-x-3">
            <button
              @click="openEditModal(member)"
              class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors flex items-center"
            >
              <span class="i-lucide-edit mr-2"></span>
              Edit Member
            </button>
            <button
              @click="openFollowUpModal(member)"
              class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center"
            >
              <span class="i-lucide-calendar mr-2"></span>
              Update Follow-up
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { useCreateMember } from '@/composables/modules/member/useCreateMember'
  import { useDeleteMember } from '@/composables/modules/member/useDeleteMember'
  import { useGetMemberDetails } from '@/composables/modules/member/useGetMemberDetails'
  import { useGetMembers } from '@/composables/modules/member/useGetMembers'
  import { useUpdateFollowUpStatus } from '@/composables/modules/member/useUpdateFollowUpStatus'
  import { useUpdateMember } from '@/composables/modules/member/useUpdateMember'
  
  // Composables
  const createMember = useCreateMember()
  const deleteMember = useDeleteMember()
  const getMemberDetails = useGetMemberDetails()
  const members = useGetMembers()
  const updateFollowUpStatus = useUpdateFollowUpStatus()
  const updateMember = useUpdateMember()
  
  const loading = ref(false)
  const creating = ref(false)
  const deleting = ref(false)
  const fetchingDetails = ref(false)
  const updatingFollowupStataus = ref(false)
  const updating = ref(false)
  
  // State
  const viewMode = ref('list')
  const showMemberModal = ref(false)
  const showFollowUpModal = ref(false)
  const showDetailsModal = ref(false)
  const isEditing = ref(false)
  const selectedMember = ref(null)
  
  // Filters
  const filters = ref({
    search: '',
    gender: '',
    joinDate: ''
  })
  
  // Forms
  const memberForm = ref({
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: 'male',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    occupation: '',
    joinDate: new Date().toISOString().split('T')[0]
  })
  
  const followUpForm = ref({
    lastContact: new Date().toISOString().split('T')[0],
    nextContact: '',
    notes: '',
    status: 'active',
    assignedTo: ''
  })
  
  // Computed
  const filteredMembers = computed(() => {
    if (!members.value) return []
    
    return members.value.filter(member => {
      const searchMatch = !filters.value.search || 
        `${member.firstName} ${member.lastName} ${member.email} ${member.phoneNumber}`
          .toLowerCase()
          .includes(filters.value.search.toLowerCase())
      
      const genderMatch = !filters.value.gender || member.gender === filters.value.gender
      
      const joinDateMatch = !filters.value.joinDate || 
        new Date(member.joinDate).toISOString().split('T')[0] === filters.value.joinDate
      
      return searchMatch && genderMatch && joinDateMatch
    })
  })
  
  // Methods
  const resetFilters = () => {
    filters.value = {
      search: '',
      gender: '',
      joinDate: ''
    }
  }
  
  const openCreateModal = () => {
    isEditing.value = false
    memberForm.value = {
      firstName: '',
      lastName: '',
      middleName: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: '',
      gender: 'male',
      address: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      occupation: '',
      joinDate: new Date().toISOString().split('T')[0]
    }
    showMemberModal.value = true
  }
  
  const openEditModal = (member) => {
    isEditing.value = true
    selectedMember.value = member
    memberForm.value = { ...member }
    showDetailsModal.value = false
    showMemberModal.value = true
  }
  
  const openFollowUpModal = (member) => {
    selectedMember.value = member
    
    // Initialize with existing follow-up data if available
    if (member.followUpStatus) {
      followUpForm.value = { ...member.followUpStatus }
    } else {
      followUpForm.value = {
        lastContact: new Date().toISOString().split('T')[0],
        nextContact: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        notes: '',
        status: 'active',
        assignedTo: ''
      }
    }
    
    showDetailsModal.value = false
    showFollowUpModal.value = true
  }
  
  const viewMemberDetails = async (memberId) => {
    await getMemberDetails(memberId)
    showDetailsModal.value = true
  }
  
  const submitMemberForm = async () => {
    try {
      if (isEditing.value) {
        await updateMember({
          id: selectedMember.value.id,
          ...memberForm.value
        })
      } else {
        await createMember(memberForm.value)
      }
      showMemberModal.value = false
    } catch (error) {
      console.error('Error submitting member form:', error)
    }
  }
  
  const submitFollowUpForm = async () => {
    try {
      await updateFollowUpStatus({
        memberId: selectedMember.value.id,
        followUpStatus: followUpForm.value
      })
      showFollowUpModal.value = false
    } catch (error) {
      console.error('Error updating follow-up status:', error)
    }
  }
  
  const exportData = () => {
    const dataStr = JSON.stringify(filteredMembers.value, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `members-export-${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }
  
  // Utility functions
  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase()
  }
  
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
    // Fetch members on component mount
  })
  </script>