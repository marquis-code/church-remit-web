<template>
    <main>
      <div class="space-y-6 animate-fade-in">
        <!-- Page header -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 class="text-2xl font-bold leading-7 text-gray-900">Member & Staff Management</h2>
            <p class="mt-1 text-sm text-gray-500">Manage church members, staff, roles, and activities</p>
          </div>
          <div class="mt-4 flex flex-col sm:flex-row sm:space-x-3 md:mt-0">
            <button
              type="button"
              @click="showAddMemberModal = true"
              class="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <UserPlus class="mr-2 h-4 w-4" />
              Add Member
            </button>
  
            <button
              type="button"
              @click="navigateTo('/dashboard/members/roles')"
              class="mt-3 inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0"
            >
              <Users class="mr-2 h-4 w-4 text-gray-500" />
              Manage Roles
            </button>
          </div>
        </div>
  
        <!-- Search and filter bar -->
        <div class="bg-white shadow rounded-lg p-4 animate-fade-in animation-delay-100">
          <div class="grid grid-cols-1 gap-4 lg:grid-cols-4">
            <!-- Search -->
            <div class="relative col-span-2">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search class="h-4 w-4 text-gray-400" />
              </div>
              <input
                v-model="searchQuery"
                type="text"
                class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Search by name, email, or role"
              />
            </div>
  
            <!-- Type filter -->
            <div>
              <select
                v-model="typeFilter"
                class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="">All Types</option>
                <option value="member">Members</option>
                <option value="staff">Staff</option>
              </select>
            </div>
  
            <!-- Branch filter -->
            <div>
              <select
                v-model="branchFilter"
                class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="">All Branches</option>
                <option v-for="branch in branches" :key="branch.id" :value="branch.id">
                  {{ branch.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
  
        <!-- View toggle -->
        <div class="flex justify-end space-x-2 animate-fade-in animation-delay-100">
          <button
            @click="viewMode = 'grid'"
            :class="[
              'inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold',
              viewMode === 'grid' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
            ]"
          >
            <LayoutGrid class="mr-2 h-4 w-4" />
            Grid
          </button>
          <button
            @click="viewMode = 'list'"
            :class="[
              'inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold',
              viewMode === 'list' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
            ]"
          >
            <List class="mr-2 h-4 w-4" />
            List
          </button>
        </div>
  
        <!-- Grid View -->
        <div v-if="viewMode === 'grid'" class="animate-fade-in animation-delay-200">
          <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <li v-for="person in filteredPeople" :key="person.id" class="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200 hover:shadow-md transition-shadow duration-200">
              <div class="w-full flex items-center justify-between p-6 space-x-6">
                <div class="flex-1 truncate">
                  <div class="flex items-center space-x-3">
                    <h3 class="text-gray-900 text-sm font-medium truncate">{{ person.name }}</h3>
                    <span :class="[
                      'flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium rounded-full',
                      person.type === 'staff' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    ]">
                      {{ person.type }}
                    </span>
                  </div>
                  <p class="mt-1 text-gray-500 text-sm truncate">{{ person.role }}</p>
                  <p class="mt-1 text-gray-500 text-sm truncate">{{ person.email }}</p>
                </div>
                <img class="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" :src="person.avatar" alt="" />
              </div>
              <div>
                <div class="-mt-px flex divide-x divide-gray-200">
                  <div class="w-0 flex-1 flex">
                    <button
                      @click="viewPersonDetails(person)"
                      class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                    >
                      <Eye class="w-5 h-5 text-gray-400" />
                      <span class="ml-3">View</span>
                    </button>
                  </div>
                  <div class="-ml-px w-0 flex-1 flex">
                    <button
                      @click="editPerson(person)"
                      class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                    >
                      <Edit class="w-5 h-5 text-gray-400" />
                      <span class="ml-3">Edit</span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
  
        <!-- List View -->
        <div v-if="viewMode === 'list'" class="animate-fade-in animation-delay-200">
          <div class="bg-white shadow rounded-lg overflow-hidden">
            <table class="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Phone</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Branch</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="person in filteredPeople" :key="person.id" class="hover:bg-gray-50">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    <div class="flex items-center">
                      <img class="h-10 w-10 rounded-full mr-3" :src="person.avatar" alt="" />
                      {{ person.name }}
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.email }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.phone }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.role }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.branch }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span :class="[
                      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                      person.type === 'staff' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    ]">
                      {{ person.type }}
                    </span>
                  </td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <div class="flex justify-end space-x-2">
                      <button
                        type="button"
                        @click="viewPersonDetails(person)"
                        class="text-indigo-600 hover:text-indigo-900"
                      >
                        <Eye class="h-5 w-5" />
                        <span class="sr-only">View</span>
                      </button>
                      <button
                        type="button"
                        @click="editPerson(person)"
                        class="text-blue-600 hover:text-blue-900"
                      >
                        <Edit class="h-5 w-5" />
                        <span class="sr-only">Edit</span>
                      </button>
                      <button
                        type="button"
                        @click="confirmDeletePerson(person)"
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
            <div class="border-t border-gray-200 px-4 py-4 sm:px-6">
              <div class="flex items-center justify-between">
                <div class="hidden sm:block">
                  <p class="text-sm text-gray-700">
                    Showing <span class="font-medium">{{ Math.min(1, filteredPeople.length) }}</span> to <span class="font-medium">{{ Math.min(filteredPeople.length, 10) }}</span> of <span class="font-medium">{{ filteredPeople.length }}</span> people
                  </p>
                </div>
                <div class="flex flex-1 justify-between sm:justify-end">
                  <button
                    type="button"
                    class="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    class="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Add/Edit Member Modal -->
        <div v-if="showAddMemberModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto animate-fade-in">
            <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium leading-6 text-gray-900">{{ editingPerson ? 'Edit Person' : 'Add New Person' }}</h3>
                <button
                  type="button"
                  @click="closeAddMemberModal"
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500"
                >
                  <span class="sr-only">Close</span>
                  <X class="h-6 w-6" />
                </button>
              </div>
            </div>
            <form @submit.prevent="savePerson">
              <div class="px-4 py-5 sm:p-6 space-y-4">
                <!-- Personal Information -->
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Personal Information</h4>
                  <div class="mt-3 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6">
                    <div class="sm:col-span-3">
                      <label for="first-name" class="block text-sm font-medium text-gray-700">First name</label>
                      <div class="mt-1">
                        <input
                          type="text"
                          id="first-name"
                          v-model="personForm.firstName"
                          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                    </div>
  
                    <div class="sm:col-span-3">
                      <label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
                      <div class="mt-1">
                        <input
                          type="text"
                          id="last-name"
                          v-model="personForm.lastName"
                          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                    </div>
  
                    <div class="sm:col-span-3">
                      <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                      <div class="mt-1">
                        <input
                          type="email"
                          id="email"
                          v-model="personForm.email"
                          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                    </div>
  
                    <div class="sm:col-span-3">
                      <label for="phone" class="block text-sm font-medium text-gray-700">Phone number</label>
                      <div class="mt-1">
                        <input
                          type="tel"
                          id="phone"
                          v-model="personForm.phone"
                          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
  
                    <div class="sm:col-span-3">
                      <label for="gender" class="block text-sm font-medium text-gray-700">Gender</label>
                      <div class="mt-1">
                        <select
                          id="gender"
                          v-model="personForm.gender"
                          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
  
                    <div class="sm:col-span-3">
                      <label for="date-of-birth" class="block text-sm font-medium text-gray-700">Date of birth</label>
                      <div class="mt-1">
                        <input
                          type="date"
                          id="date-of-birth"
                          v-model="personForm.dateOfBirth"
                          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
  
                <!-- Church Information -->
                <div class="pt-4 border-t border-gray-200">
                  <h4 class="text-sm font-medium text-gray-900">Church Information</h4>
                  <div class="mt-3 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6">
                    <div class="sm:col-span-3">
                      <label for="person-type" class="block text-sm font-medium text-gray-700">Type</label>
                      <div class="mt-1">
                        <select
                          id="person-type"
                          v-model="personForm.type"
                          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        >
                          <option value="member">Member</option>
                          <option value="staff">Staff</option>
                        </select>
                      </div>
                    </div>
  
                    <div class="sm:col-span-3">
                      <label for="person-role" class="block text-sm font-medium text-gray-700">Role</label>
                      <div class="mt-1">
                        <select
                          id="person-role"
                          v-model="personForm.roleId"
                          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        >
                          <option value="">Select a role</option>
                          <option v-for="role in roles" :key="role.id" :value="role.id">
                            {{ role.name }}
                          </option>
                        </select>
                      </div>
                    </div>
  
                    <div class="sm:col-span-3">
                      <label for="person-branch" class="block text-sm font-medium text-gray-700">Branch</label>
                      <div class="mt-1">
                        <select
                          id="person-branch"
                          v-model="personForm.branchId"
                          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        >
                          <option value="">Select a branch</option>
                          <option v-for="branch in branches" :key="branch.id" :value="branch.id">
                            {{ branch.name }}
                          </option>
                        </select>
                      </div>
                    </div>
  
                    <div class="sm:col-span-3">
                      <label for="join-date" class="block text-sm font-medium text-gray-700">Join Date</label>
                      <div class="mt-1">
                        <input
                          type="date"
                          id="join-date"
                          v-model="personForm.joinDate"
                          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
  
                    <div class="sm:col-span-6">
                      <label for="person-notes" class="block text-sm font-medium text-gray-700">Notes</label>
                      <div class="mt-1">
                        <textarea
                          id="person-notes"
                          v-model="personForm.notes"
                          rows="3"
                          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="px-4 py-3 bg-gray-50 text-right sm:px-6 border-t border-gray-200">
                <button
                  type="button"
                  @click="closeAddMemberModal"
                  class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {{ editingPerson ? 'Update Person' : 'Add Person' }}
                </button>
              </div>
            </form>
          </div>
        </div>
  
        <!-- Person Details Modal -->
        <div v-if="showPersonDetailsModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-[9999]">
          <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto animate-fade-in">
            <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium leading-6 text-gray-900">Person Details</h3>
                <button
                  type="button"
                  @click="showPersonDetailsModal = false"
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500"
                >
                  <span class="sr-only">Close</span>
                  <X class="h-6 w-6" />
                </button>
              </div>
            </div>
            <div class="px-4 py-5 sm:p-6" v-if="selectedPerson">
              <div class="flex items-center mb-6">
                <img :src="selectedPerson.avatar" alt="" class="h-16 w-16 rounded-full mr-4" />
                <div>
                  <h2 class="text-xl font-bold text-gray-900">{{ selectedPerson.name }}</h2>
                  <span
                    :class="[
                      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                      selectedPerson.type === 'staff' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    ]"
                  >
                    {{ selectedPerson.type }}
                  </span>
                </div>
              </div>
  
              <dl class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-gray-500">Email</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ selectedPerson.email }}</dd>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-gray-500">Phone</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ selectedPerson.phone }}</dd>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-gray-500">Role</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ selectedPerson.role }}</dd>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-gray-500">Branch</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ selectedPerson.branch }}</dd>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-gray-500">Gender</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ selectedPerson.gender }}</dd>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-gray-500">Date of Birth</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ selectedPerson.dateOfBirth }}</dd>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-gray-500">Join Date</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ selectedPerson.joinDate }}</dd>
                </div>
                <div class="sm:col-span-2">
                  <dt class="text-sm font-medium text-gray-500">Notes</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ selectedPerson.notes || 'No notes available.' }}</dd>
                </div>
              </dl>
  
              <div class="mt-6 border-t border-gray-200 pt-4">
                <h4 class="text-sm font-medium text-gray-500">Contribution History</h4>
                <div class="mt-2 flow-root">
                  <ul role="list" class="divide-y divide-gray-200">
                    <li v-for="contribution in selectedPerson.contributions" :key="contribution.id" class="py-3">
                      <div class="flex items-center justify-between">
                        <div>
                          <p class="text-sm font-medium text-gray-900">{{ contribution.type }}</p>
                          <p class="text-sm text-gray-500">{{ contribution.date }}</p>
                        </div>
                        <p class="text-sm font-medium text-gray-900">{{ contribution.amount }}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
  
              <div class="mt-6 border-t border-gray-200 pt-4">
                <h4 class="text-sm font-medium text-gray-500">Activity History</h4>
                <div class="mt-2 flow-root">
                  <ul role="list" class="divide-y divide-gray-200">
                    <li v-for="activity in selectedPerson.activities" :key="activity.id" class="py-3">
                      <div class="flex items-center justify-between">
                        <div>
                          <p class="text-sm font-medium text-gray-900">{{ activity.description }}</p>
                          <p class="text-sm text-gray-500">{{ activity.date }}</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 flex justify-end space-x-3 sm:px-6 border-t border-gray-200">
              <button
                type="button"
                @click="editPerson(selectedPerson)"
                class="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <Edit class="mr-2 h-4 w-4" />
                Edit Person
              </button>
              <button
                type="button"
                @click="showPersonDetailsModal = false"
                class="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
  
        <!-- Delete Confirmation Modal -->
        <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div class="bg-white rounded-lg shadow-xl max-w-md w-full animate-fade-in">
            <div class="px-4 py-5 sm:p-6">
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <AlertTriangle class="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 class="text-base font-semibold leading-6 text-gray-900">Delete Person</h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      Are you sure you want to delete this person? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  @click="deletePerson"
                  class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Delete
                </button>
                <button
                  type="button"
                  @click="showDeleteModal = false"
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
  import { ref, reactive, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import {
    UserPlus,
    Users,
    Search,
    List,
    LayoutGrid,
    Eye,
    Edit,
    Trash2,
    X,
    AlertTriangle,
    CheckCircle,
    Mail,
    Phone
  } from 'lucide-vue-next';
  
  const router = useRouter();
  
  definePageMeta({
    layout: 'dashboard'
  })

  // View state
  const viewMode = ref('grid');
  const searchQuery = ref('');
  const typeFilter = ref('');
  const branchFilter = ref('');
  
  // Modal states
  const showAddMemberModal = ref(false);
  const showPersonDetailsModal = ref(false);
  const showDeleteModal = ref(false);
  const showSuccessNotification = ref(false);
  const successMessage = ref('');
  const editingPerson = ref(false);
  const selectedPersonId = ref<number | null>(null);
  
  // Form state
  const personForm = reactive({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 'male',
    dateOfBirth: '',
    type: 'member',
    roleId: '',
    branchId: '',
    joinDate: '',
    notes: ''
  });
  
  // Branches data
  const branches = ref([
    { id: 1, name: 'Main Campus' },
    { id: 2, name: 'North Campus' },
    { id: 3, name: 'South Campus' },
    { id: 4, name: 'East Campus' },
    { id: 5, name: 'West Campus' }
  ]);
  
  // Roles data
  const roles = ref([
    { id: 1, name: 'Member', type: 'member' },
    { id: 2, name: 'Pastor', type: 'staff' },
    { id: 3, name: 'Elder', type: 'staff' },
    { id: 4, name: 'Deacon', type: 'staff' },
    { id: 5, name: 'Worship Leader', type: 'staff' },
    { id: 6, name: 'Youth Leader', type: 'staff' },
    { id: 7, name: 'Children\'s Ministry', type: 'staff' },
    { id: 8, name: 'Admin Staff', type: 'staff' },
    { id: 9, name: 'Volunteer', type: 'member' }
  ]);
  
  // People data
  const people = ref([
    {
      id: 1,
      name: 'John Doe',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '+1 (555) 111-2222',
      gender: 'male',
      dateOfBirth: '1980-05-15',
      type: 'staff',
      role: 'Pastor',
      roleId: 2,
      branch: 'Main Campus',
      branchId: 1,
      joinDate: '2010-01-15',
      notes: 'Senior Pastor',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      contributions: [
        { id: 1, type: 'Tithe', amount: '$500', date: 'Mar 1, 2025' },
        { id: 2, type: 'Offering', amount: '$200', date: 'Feb 15, 2025' }
      ],
      activities: [
        { id: 1, description: 'Led Sunday Service', date: 'Mar 5, 2025' },
        { id: 2, description: 'Pastoral Meeting', date: 'Feb 28, 2025' }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      phone: '+1 (555) 222-3333',
      gender: 'female',
      dateOfBirth: '1985-08-22',
      type: 'staff',
      role: 'Worship Leader',
      roleId: 5,
      branch: 'North Campus',
      branchId: 2,
      joinDate: '2015-03-10',
      notes: 'Leads worship team',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      contributions: [
        { id: 3, type: 'Tithe', amount: '$300', date: 'Mar 1, 2025' }
      ],
      activities: [
        { id: 3, description: 'Led Worship', date: 'Mar 5, 2025' },
        { id: 4, description: 'Choir Practice', date: 'Mar 2, 2025' }
      ]
    },
    {
      id: 3,
      name: 'Robert Johnson',
      firstName: 'Robert',
      lastName: 'Johnson',
      email: 'robert@example.com',
      phone: '+1 (555) 333-4444',
      gender: 'male',
      dateOfBirth: '1975-11-30',
      type: 'staff',
      role: 'Elder',
      roleId: 3,
      branch: 'South Campus',
      branchId: 3,
      joinDate: '2012-06-20',
      notes: 'Church elder',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      contributions: [
        { id: 5, type: 'Tithe', amount: '$400', date: 'Mar 1, 2025' },
        { id: 6, type: 'Building Fund', amount: '$1000', date: 'Feb 10, 2025' }
      ],
      activities: [
        { id: 5, description: 'Elder Meeting', date: 'Mar 3, 2025' },
        { id: 6, description: 'Counseling Session', date: 'Feb 25, 2025' }
      ]
    },
    {
      id: 4,
      name: 'Emily Davis',
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily@example.com',
      phone: '+1 (555) 444-5555',
      gender: 'female',
      dateOfBirth: '1990-04-12',
      type: 'staff',
      role: 'Youth Leader',
      roleId: 6,
      branch: 'East Campus',
      branchId: 4,
      joinDate: '2018-09-05',
      notes: 'Leads youth ministry',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      contributions: [
        { id: 7, type: 'Tithe', amount: '$250', date: 'Mar 1, 2025' }
      ],
      activities: [
        { id: 7, description: 'Youth Group', date: 'Mar 4, 2025' },
        { id: 8, description: 'Youth Camp Planning', date: 'Feb 27, 2025' }
      ]
    },
    {
      id: 5,
      name: 'Michael Wilson',
      firstName: 'Michael',
      lastName: 'Wilson',
      email: 'michael@example.com',
      phone: '+1 (555) 555-6666',
      gender: 'male',
      dateOfBirth: '1982-07-08',
      type: 'staff',
      role: 'Admin Staff',
      roleId: 8,
      branch: 'West Campus',
      branchId: 5,
      joinDate: '2019-11-15',
      notes: 'Handles administrative tasks',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
      contributions: [
        { id: 9, type: 'Tithe', amount: '$200', date: 'Mar 1, 2025' }
      ],
      activities: [
        { id: 9, description: 'Staff Meeting', date: 'Mar 2, 2025' },
        { id: 10, description: 'Budget Planning', date: 'Feb 26, 2025' }
      ]
    },
    {
      id: 6,
      name: 'Sarah Johnson',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah@example.com',
      phone: '+1 (555) 666-7777',
      gender: 'female',
      dateOfBirth: '1988-09-25',
      type: 'member',
      role: 'Member',
      roleId: 1,
      branch: 'Main Campus',
      branchId: 1,
      joinDate: '2020-02-10',
      notes: 'Regular attendee',
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
      contributions: [
        { id: 11, type: 'Tithe', amount: '$150', date: 'Mar 1, 2025' }
      ],
      activities: [
        { id: 11, description: 'Sunday Service', date: 'Mar 5, 2025' },
        { id: 12, description: 'Bible Study', date: 'Mar 1, 2025' }
      ]
    },
    {
      id: 7,
      name: 'David Brown',
      firstName: 'David',
      lastName: 'Brown',
      email: 'david@example.com',
      phone: '+1 (555) 777-8888',
      gender: 'male',
      dateOfBirth: '1992-12-03',
      type: 'member',
      role: 'Volunteer',
      roleId: 9,
      branch: 'North Campus',
      branchId: 2,
      joinDate: '2021-05-20',
      notes: 'Volunteers in children\'s ministry',
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
      contributions: [
        { id: 13, type: 'Tithe', amount: '$100', date: 'Mar 1, 2025' }
      ],
      activities: [
        { id: 13, description: 'Children\'s Ministry', date: 'Mar 5, 2025' },
        { id: 14, description: 'Volunteer Training', date: 'Feb 28, 2025' }
      ]
    },
    {
      id: 8,
      name: 'Lisa Martinez',
      firstName: 'Lisa',
      lastName: 'Martinez',
      email: 'lisa@example.com',
      phone: '+1 (555) 888-9999',
      gender: 'female',
      dateOfBirth: '1995-02-18',
      type: 'member',
      role: 'Member',
      roleId: 1,
      branch: 'South Campus',
      branchId: 3,
      joinDate: '2022-01-15',
      notes: 'New member',
      avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
      contributions: [
        { id: 15, type: 'Offering', amount: '$50', date: 'Mar 5, 2025' }
      ],
      activities: [
        { id: 15, description: 'New Member Class', date: 'Feb 20, 2025' },
        { id: 16, description: 'Sunday Service', date: 'Mar 5, 2025' }
      ]
    }
  ]);
  
  // Computed properties
  const filteredPeople = computed(() => {
    let result = [...people.value];
    
    // Apply search filter
    if (searchQuery.value) {
      const search = searchQuery.value.toLowerCase();
      result = result.filter(
        person => person.name.toLowerCase().includes(search) ||
                  person.email.toLowerCase().includes(search) ||
                  person.role.toLowerCase().includes(search)
      );
    }
    
    // Apply type filter
    if (typeFilter.value) {
      result = result.filter(person => person.type === typeFilter.value);
    }
    
    // Apply branch filter
    if (branchFilter.value) {
      result = result.filter(person => person.branchId.toString() === branchFilter.value.toString());
    }
    
    return result;
  });
  
  const selectedPerson = computed(() => {
    if (selectedPersonId.value === null) return null;
    return people.value.find(p => p.id === selectedPersonId.value) || null;
  });
  
  // Methods
  const navigateTo = (path: string) => {
    router.push(path);
  };
  
  const viewPersonDetails = (person: any) => {
    selectedPersonId.value = person.id;
    showPersonDetailsModal.value = true;
  };
  
  const editPerson = (person: any) => {
    selectedPersonId.value = person.id;
    
    personForm.id = person.id;
    personForm.firstName = person.firstName;
    personForm.lastName = person.lastName;
    personForm.email = person.email;
    personForm.phone = person.phone;
    personForm.gender = person.gender;
    personForm.dateOfBirth = person.dateOfBirth;
    personForm.type = person.type;
    personForm.roleId = person.roleId.toString();
    personForm.branchId = person.branchId.toString();
    personForm.joinDate = person.joinDate;
    personForm.notes = person.notes;
    
    editingPerson.value = true;
    showAddMemberModal.value = true;
    showPersonDetailsModal.value = false;
  };
  
  const confirmDeletePerson = (person: any) => {
    selectedPersonId.value = person.id;
    showDeleteModal.value = true;
  };
  
  const deletePerson = () => {
    if (selectedPersonId.value) {
      people.value = people.value.filter(p => p.id !== selectedPersonId.value);
      showDeleteModal.value = false;
      
      showSuccessNotification.value = true;
      successMessage.value = 'Person deleted successfully!';
      
      // Auto-hide notification after 3 seconds
      setTimeout(() => {
        showSuccessNotification.value = false;
      }, 3000);
    }
  };
  
  const closeAddMemberModal = () => {
    showAddMemberModal.value = false;
    editingPerson.value = false;
    selectedPersonId.value = null;
    
    // Reset form
    personForm.id = 0;
    personForm.firstName = '';
    personForm.lastName = '';
    personForm.email = '';
    personForm.phone = '';
    personForm.gender = 'male';
    personForm.dateOfBirth = '';
    personForm.type = 'member';
    personForm.roleId = '';
    personForm.branchId = '';
    personForm.joinDate = '';
    personForm.notes = '';
  };
  
  const savePerson = () => {
    const role = roles.value.find(r => r.id.toString() === personForm.roleId);
    const branch = branches.value.find(b => b.id.toString() === personForm.branchId);
    
    const personData = {
      id: personForm.id,
      name: `${personForm.firstName} ${personForm.lastName}`,
      firstName: personForm.firstName,
      lastName: personForm.lastName,
      email: personForm.email,
      phone: personForm.phone,
      gender: personForm.gender,
      dateOfBirth: personForm.dateOfBirth,
      type: personForm.type,
      role: role ? role.name : '',
      roleId: role ? role.id : 0,
      branch: branch ? branch.name : '',
      branchId: branch ? branch.id : 0,
      joinDate: personForm.joinDate,
      notes: personForm.notes,
      avatar: editingPerson.value && selectedPersonId.value ? 
        (people.value.find(p => p.id === selectedPersonId.value)?.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg') : 
        `https://randomuser.me/api/portraits/${personForm.gender === 'female' ? 'women' : 'men'}/${Math.floor(Math.random() * 30) + 1}.jpg`,
      contributions: editingPerson.value && selectedPersonId.value ? 
        (people.value.find(p => p.id === selectedPersonId.value)?.contributions || []) : 
        [],
      activities: editingPerson.value && selectedPersonId.value ? 
        (people.value.find(p => p.id === selectedPersonId.value)?.activities || []) : 
        []
    };
    
    if (editingPerson.value && selectedPersonId.value) {
      // Update existing person
      const index = people.value.findIndex(p => p.id === selectedPersonId.value);
      if (index !== -1) {
        people.value[index] = personData;
      }
      
      successMessage.value = 'Person updated successfully!';
    } else {
      // Create new person
      const newId = Math.max(0, ...people.value.map(p => p.id)) + 1;
      people.value.push({
        ...personData,
        id: newId
      });
      
      successMessage.value = 'Person added successfully!';
    }
    
    showSuccessNotification.value = true;
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      showSuccessNotification.value = false;
    }, 3000);
    
    closeAddMemberModal();
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