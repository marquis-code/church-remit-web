<template>
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Group Management</h1>
        <div class="flex space-x-2 mt-4 md:mt-0">
          <button
            @click="openCreateModal"
            class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors flex items-center"
          >
            <span class="i-lucide-users mr-2"></span>
            Create Group
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
                placeholder="Search by name, description..."
                class="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
          <div class="w-full md:w-48">
            <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              v-model="filters.type"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">All Types</option>
              <option value="ministry">Ministry</option>
              <option value="committee">Committee</option>
              <option value="class">Class</option>
              <option value="fellowship">Fellowship</option>
              <option value="other">Other</option>
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
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
  
      <!-- Empty State -->
      <div
        v-else-if="!loading && filteredGroups.length === 0"
        class="bg-white rounded-lg shadow p-8 text-center"
      >
        <div class="mx-auto h-24 w-24 text-gray-400 mb-4">
          <span class="i-lucide-users text-6xl"></span>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No groups found</h3>
        <p class="text-gray-500 mb-6">
          There are no groups matching your criteria. Try adjusting your filters or create a new group.
        </p>
        <button
          @click="openCreateModal"
          class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors inline-flex items-center"
        >
          <span class="i-lucide-users mr-2"></span>
          Create Group
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
                Group
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Meeting Schedule
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Members
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
            <tr v-for="group in filteredGroups" :key="group.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-10 w-10 flex-shrink-0">
                    <div
                      class="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-medium"
                    >
                      {{ getGroupInitials(group.name) }}
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ group.name }}</div>
                    <div class="text-sm text-gray-500 truncate max-w-xs">{{ group.description }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="{
                    'bg-blue-100 text-blue-800': group.type === 'ministry',
                    'bg-purple-100 text-purple-800': group.type === 'committee',
                    'bg-green-100 text-green-800': group.type === 'class',
                    'bg-yellow-100 text-yellow-800': group.type === 'fellowship',
                    'bg-gray-100 text-gray-800': group.type === 'other' || !group.type
                  }"
                >
                  {{ capitalizeFirstLetter(group.type || 'other') }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex items-center">
                  <span class="i-lucide-calendar mr-2 text-gray-400"></span>
                  <span>{{ group.meetingSchedule || 'Not scheduled' }}</span>
                </div>
                <div v-if="group.meetingLocation" class="flex items-center mt-1">
                  <span class="i-lucide-map-pin mr-2 text-gray-400"></span>
                  <span>{{ group.meetingLocation }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex items-center">
                  <span class="i-lucide-users mr-2 text-gray-400"></span>
                  <span>{{ group.members?.length || 0 }} members</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    @click="viewGroupDetails(group)"
                    class="text-blue-600 hover:text-blue-900"
                    title="View Details"
                  >
                    <span class="i-lucide-eye"></span>
                  </button>
                  <button
                    @click="openEditModal(group)"
                    class="text-emerald-600 hover:text-emerald-900"
                    title="Edit Group"
                  >
                    <span class="i-lucide-edit"></span>
                  </button>
                  <button
                    @click="openAddMemberModal(group)"
                    class="text-purple-600 hover:text-purple-900"
                    title="Add Member"
                  >
                    <span class="i-lucide-user-plus"></span>
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
          v-for="group in filteredGroups"
          :key="group.id"
          class="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow"
        >
          <div class="p-6">
            <div class="flex justify-center mb-4">
              <div
                class="h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 text-xl font-medium"
              >
                {{ getGroupInitials(group.name) }}
              </div>
            </div>
            <div class="text-center mb-4">
              <h3 class="text-lg font-medium text-gray-900">{{ group.name }}</h3>
              <span
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full mt-1"
                :class="{
                  'bg-blue-100 text-blue-800': group.type === 'ministry',
                  'bg-purple-100 text-purple-800': group.type === 'committee',
                  'bg-green-100 text-green-800': group.type === 'class',
                  'bg-yellow-100 text-yellow-800': group.type === 'fellowship',
                  'bg-gray-100 text-gray-800': group.type === 'other' || !group.type
                }"
              >
                {{ capitalizeFirstLetter(group.type || 'other') }}
              </span>
            </div>
            <p class="text-sm text-gray-500 text-center mb-4 line-clamp-2">
              {{ group.description }}
            </p>
            <div class="space-y-2 text-sm text-gray-500">
              <div class="flex items-center">
                <span class="i-lucide-calendar mr-2"></span>
                <span>{{ group.meetingSchedule || 'Not scheduled' }}</span>
              </div>
              <div v-if="group.meetingLocation" class="flex items-center">
                <span class="i-lucide-map-pin mr-2"></span>
                <span>{{ group.meetingLocation }}</span>
              </div>
              <div class="flex items-center">
                <span class="i-lucide-users mr-2"></span>
                <span>{{ group.members?.length || 0 }} members</span>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 flex justify-around">
            <button
              @click="viewGroupDetails(group)"
              class="text-blue-600 hover:text-blue-900"
              title="View Details"
            >
              <span class="i-lucide-eye"></span>
            </button>
            <button
              @click="openEditModal(group)"
              class="text-emerald-600 hover:text-emerald-900"
              title="Edit Group"
            >
              <span class="i-lucide-edit"></span>
            </button>
            <button
              @click="openAddMemberModal(group)"
              class="text-purple-600 hover:text-purple-900"
              title="Add Member"
            >
              <span class="i-lucide-user-plus"></span>
            </button>
          </div>
        </div>
      </div>
  
      <!-- Create/Edit Group Modal -->
      <div
        v-if="showGroupModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
          <div class="p-6 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-800">
              {{ isEditing ? 'Edit Group' : 'Create New Group' }}
            </h2>
          </div>
          <div class="p-6">
            <form @submit.prevent="submitGroupForm" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Group Name*</label>
                <input
                  v-model="groupForm.name"
                  type="text"
                  required
                  class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  v-model="groupForm.description"
                  rows="3"
                  class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                ></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Type*</label>
                <select
                  v-model="groupForm.type"
                  required
                  class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="ministry">Ministry</option>
                  <option value="committee">Committee</option>
                  <option value="class">Class</option>
                  <option value="fellowship">Fellowship</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Meeting Schedule</label>
                <input
                  v-model="groupForm.meetingSchedule"
                  type="text"
                  placeholder="e.g., Every Friday at 7:00 PM"
                  class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Meeting Location</label>
                <input
                  v-model="groupForm.meetingLocation"
                  type="text"
                  placeholder="e.g., Room 101"
                  class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div class="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  @click="showGroupModal = false"
                  class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  :disabled="creaating"
                  class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors flex items-center"
                >
                  <span
                    v-if="creaating"
                    class="animate-spin h-4 w-4 mr-2 border-t-2 border-b-2 border-white rounded-full"
                  ></span>
                  {{ isEditing ? 'Update Group' : 'Create Group' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  
      <!-- Add Member Modal -->
      <div
        v-if="showAddMemberModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
          <div class="p-6 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-800">Add Member to Group</h2>
            <p class="text-gray-600 mt-1">{{ selectedGroup?.name }}</p>
          </div>
          <div class="p-6">
            <form @submit.prevent="submitAddMemberForm" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Select Member*</label>
                <div class="relative">
                  <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <span class="i-lucide-search"></span>
                  </span>
                  <input
                    v-model="memberSearch"
                    type="text"
                    placeholder="Search members..."
                    class="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div v-if="memberSearch && availableMembers.length > 0" class="mt-2 max-h-40 overflow-y-auto border border-gray-200 rounded-md">
                  <div
                    v-for="member in availableMembers"
                    :key="member.id"
                    @click="selectMember(member)"
                    class="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                  >
                    <div
                      class="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-medium mr-2"
                    >
                      {{ getInitials(member.firstName, member.lastName) }}
                    </div>
                    <div>
                      <div class="text-sm font-medium">{{ member.firstName }} {{ member.lastName }}</div>
                      <div class="text-xs text-gray-500">{{ member.email }}</div>
                    </div>
                  </div>
                </div>
                <div v-else-if="memberSearch && availableMembers.length === 0" class="mt-2 p-2 text-sm text-gray-500 border border-gray-200 rounded-md">
                  No members found. Try a different search term.
                </div>
              </div>
              
              <div v-if="selectedMember" class="p-3 bg-gray-50 rounded-md">
                <div class="flex items-center">
                  <div
                    class="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-medium mr-3"
                  >
                    {{ getInitials(selectedMember.firstName, selectedMember.lastName) }}
                  </div>
                  <div>
                    <div class="text-sm font-medium">{{ selectedMember.firstName }} {{ selectedMember.lastName }}</div>
                    <div class="text-xs text-gray-500">{{ selectedMember.email }}</div>
                  </div>
                  <button
                    type="button"
                    @click="selectedMember = null"
                    class="ml-auto text-gray-400 hover:text-gray-600"
                  >
                    <span class="i-lucide-x"></span>
                  </button>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Role in Group</label>
                <select
                  v-model="addMemberForm.role"
                  class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="member">Member</option>
                  <option value="leader">Leader</option>
                  <option value="assistant">Assistant</option>
                  <option value="secretary">Secretary</option>
                </select>
              </div>
              
              <div class="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  @click="showAddMemberModal = false"
                  class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  :disabled="addingMember || !selectedMember"
                  class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors flex items-center"
                >
                  <span
                    v-if="addingMember"
                    class="animate-spin h-4 w-4 mr-2 border-t-2 border-b-2 border-white rounded-full"
                  ></span>
                  Add to Group
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  
      <!-- Group Details Modal -->
      <div
        v-if="showDetailsModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div class="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 class="text-xl font-semibold text-gray-800">Group Details</h2>
            <button @click="showDetailsModal = false" class="text-gray-500 hover:text-gray-700">
              <span class="i-lucide-x"></span>
            </button>
          </div>
          <div v-if="selectedGroup" class="p-6">
            <div class="flex flex-col md:flex-row">
              <div class="md:w-1/3 flex justify-center mb-6 md:mb-0">
                <div
                  class="h-32 w-32 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 text-3xl font-medium"
                >
                  {{ getGroupInitials(selectedGroup.name) }}
                </div>
              </div>
              <div class="md:w-2/3">
                <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ selectedGroup.name }}</h3>
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full mb-4"
                  :class="{
                    'bg-blue-100 text-blue-800': selectedGroup.type === 'ministry',
                    'bg-purple-100 text-purple-800': selectedGroup.type === 'committee',
                    'bg-green-100 text-green-800': selectedGroup.type === 'class',
                    'bg-yellow-100 text-yellow-800': selectedGroup.type === 'fellowship',
                    'bg-gray-100 text-gray-800': selectedGroup.type === 'other' || !selectedGroup.type
                  }"
                >
                  {{ capitalizeFirstLetter(selectedGroup.type || 'other') }}
                </span>
  
                <div class="mb-6">
                  <h4 class="text-sm font-medium text-gray-500">Description</h4>
                  <p class="mt-2 text-gray-700">{{ selectedGroup.description }}</p>
                </div>
  
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 class="text-sm font-medium text-gray-500">Meeting Schedule</h4>
                    <div class="mt-2 flex items-center">
                      <span class="i-lucide-calendar mr-2 text-gray-400"></span>
                      <span>{{ selectedGroup.meetingSchedule || 'Not scheduled' }}</span>
                    </div>
                  </div>
                  <div v-if="selectedGroup.meetingLocation">
                    <h4 class="text-sm font-medium text-gray-500">Meeting Location</h4>
                    <div class="mt-2 flex items-center">
                      <span class="i-lucide-map-pin mr-2 text-gray-400"></span>
                      <span>{{ selectedGroup.meetingLocation }}</span>
                    </div>
                  </div>
                </div>
  
                <div v-if="selectedGroup.members && selectedGroup.members.length > 0">
                  <h4 class="text-sm font-medium text-gray-500 mb-2">Members ({{ selectedGroup.members.length }})</h4>
                  <div class="mt-2 space-y-2 max-h-60 overflow-y-auto pr-2">
                    <div
                      v-for="(member, index) in selectedGroup.members"
                      :key="index"
                      class="flex items-center p-2 bg-gray-50 rounded-md"
                    >
                      <div
                        class="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-medium mr-3"
                      >
                        {{ getInitials(member.firstName, member.lastName) }}
                      </div>
                      <div>
                        <div class="text-sm font-medium">{{ member.firstName }} {{ member.lastName }}</div>
                        <div class="text-xs text-gray-500 flex items-center">
                          <span
                            class="px-1.5 inline-flex text-xs leading-4 font-semibold rounded-full bg-gray-100 text-gray-800 mr-2"
                          >
                            {{ capitalizeFirstLetter(member.role || 'member') }}
                          </span>
                          <span>{{ member.email }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="text-gray-500 italic">No members in this group yet.</div>
              </div>
            </div>
          </div>
          <div class="p-6 border-t border-gray-200 flex justify-end space-x-3">
            <button
              @click="openEditModal(selectedGroup)"
              class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors flex items-center"
            >
              <span class="i-lucide-edit mr-2"></span>
              Edit Group
            </button>
            <button
              @click="openAddMemberModal(selectedGroup)"
              class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center"
            >
              <span class="i-lucide-user-plus mr-2"></span>
              Add Member
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { useCreateGroup } from '@/composables/modules/group/useCreateGroup'
  import { useGetGroups } from '@/composables/modules/group/useGetGroups'
  import { useAddMemberToGroup } from '@/composables/modules/group/useAddMemberToGroup'
  
  // Composables
  const { loading: creaating, createGroup } = useCreateGroup()
  const { loading, groups } = useGetGroups()
  const { loading: addingMember, addMemberToGroup } = useAddMemberToGroup()
  
  // State
  const viewMode = ref('list')
  const showGroupModal = ref(false)
  const showAddMemberModal = ref(false)
  const showDetailsModal = ref(false)
  const isEditing = ref(false)
  const selectedGroup = ref(null)
  const selectedMember = ref(null)
  const memberSearch = ref('')
  
  // Mock data for available members (in a real app, this would come from an API)
  const allMembers = ref([
    {
      id: '1',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phoneNumber: '+1234567892'
    },
    {
      id: '2',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '+1234567893'
    },
    {
      id: '3',
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice.johnson@example.com',
      phoneNumber: '+1234567894'
    },
    {
      id: '4',
      firstName: 'Bob',
      lastName: 'Brown',
      email: 'bob.brown@example.com',
      phoneNumber: '+1234567895'
    },
    {
      id: '5',
      firstName: 'Carol',
      lastName: 'Williams',
      email: 'carol.williams@example.com',
      phoneNumber: '+1234567896'
    }
  ])
  
  // Filters
  const filters = ref({
    search: '',
    type: ''
  })
  
  // Forms
  const groupForm = ref({
    name: '',
    description: '',
    type: 'ministry',
    meetingSchedule: '',
    meetingLocation: ''
  })
  
  const addMemberForm = ref({
    role: 'member'
  })
  
  // Computed
  const filteredGroups = computed(() => {
    if (!groups.value) return []
    
    return groups.value.filter(group => {
      const searchMatch = !filters.value.search || 
        `${group.name} ${group.description}`
          .toLowerCase()
          .includes(filters.value.search.toLowerCase())
      
      const typeMatch = !filters.value.type || group.type === filters.value.type
      
      return searchMatch && typeMatch
    })
  })
  
  const availableMembers = computed(() => {
    if (!memberSearch.value) return []
    
    return allMembers.value.filter(member => 
      `${member.firstName} ${member.lastName} ${member.email}`
        .toLowerCase()
        .includes(memberSearch.value.toLowerCase())
    )
  })
  
  // Methods
  const resetFilters = () => {
    filters.value = {
      search: '',
      type: ''
    }
  }
  
  const openCreateModal = () => {
    isEditing.value = false
    groupForm.value = {
      name: '',
      description: '',
      type: 'ministry',
      meetingSchedule: '',
      meetingLocation: ''
    }
    showGroupModal.value = true
  }
  
  const openEditModal = (group) => {
    isEditing.value = true
    selectedGroup.value = group
    groupForm.value = { ...group }
    showDetailsModal.value = false
    showGroupModal.value = true
  }
  
  const openAddMemberModal = (group) => {
    selectedGroup.value = group
    selectedMember.value = null
    memberSearch.value = ''
    addMemberForm.value = {
      role: 'member'
    }
    showDetailsModal.value = false
    showAddMemberModal.value = true
  }
  
  const viewGroupDetails = (group) => {
    selectedGroup.value = group
    showDetailsModal.value = true
  }
  
  const selectMember = (member) => {
    selectedMember.value = member
    memberSearch.value = ''
  }
  
  const submitGroupForm = async () => {
    try {
      if (isEditing.value) {
        // In a real app, you would have an updateGroup function
        // For now, we'll just update the local state
        const index = groups.value.findIndex(g => g.id === selectedGroup.value.id)
        if (index !== -1) {
          groups.value[index] = {
            ...groups.value[index],
            ...groupForm.value
          }
        }
      } else {
        await createGroup({
          ...groupForm.value,
          id: Date.now().toString(), // Mock ID generation
          members: []
        })
      }
      showGroupModal.value = false
    } catch (error) {
      console.error('Error submitting group form:', error)
    }
  }
  
  const submitAddMemberForm = async () => {
    try {
      if (!selectedMember.value || !selectedGroup.value) return
      
      await addMemberToGroup({
        groupId: selectedGroup.value.id,
        memberId: selectedMember.value.id,
        ...addMemberForm.value
      })
      
      // In a real app, this would be handled by the API response
      // For now, we'll update the local state
      if (!selectedGroup.value.members) {
        selectedGroup.value.members = []
      }
      
      selectedGroup.value.members.push({
        ...selectedMember.value,
        role: addMemberForm.value.role
      })
      
      showAddMemberModal.value = false
    } catch (error) {
      console.error('Error adding member to group:', error)
    }
  }
  
  const exportData = () => {
    const dataStr = JSON.stringify(filteredGroups.value, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `groups-export-${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }
  
  // Utility functions
  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase()
  }
  
  const getGroupInitials = (name) => {
    if (!name) return ''
    
    const words = name.split(' ')
    if (words.length === 1) {
      return name.substring(0, 2).toUpperCase()
    }
    
    return `${words[0].charAt(0)}${words[1].charAt(0)}`.toUpperCase()
  }
  
  const capitalizeFirstLetter = (string) => {
    if (!string) return ''
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  
  // Lifecycle
  onMounted(() => {
    // Fetch groups on component mount
  })
  </script>