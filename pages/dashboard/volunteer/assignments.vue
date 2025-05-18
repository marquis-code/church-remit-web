<template>
    <main>
      <div class="space-y-6 animate-fade-in">
        <!-- Page header -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 class="text-2xl font-bold leading-7 text-gray-900">Volunteer Assignments</h2>
            <p class="mt-1 text-sm text-gray-500">Manage volunteer roles, departments, and track participation</p>
          </div>
          <div class="mt-4 flex flex-col sm:flex-row sm:space-x-3 md:mt-0">
            <button
              type="button"
              @click="navigateTo('/volunteer/assignments/new')"
              class="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <UserPlus class="mr-2 h-4 w-4" />
              New Assignment
            </button>
  
            <button
              type="button"
              @click="openFilters = true"
              class="mt-3 inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0"
            >
              <Filter class="mr-2 h-4 w-4 text-gray-500" />
              Filters
            </button>
          </div>
        </div>
  
        <!-- Search and filters bar -->
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
                placeholder="Search by name, role, or department"
              />
            </div>
  
            <!-- Department filter -->
            <div>
              <select
                v-model="selectedDepartment"
                class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="">All Departments</option>
                <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
              </select>
            </div>
  
            <!-- Status filter -->
            <div>
              <select
                v-model="selectedStatus"
                class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
  
          <!-- Active filters -->
          <div v-if="hasActiveFilters" class="mt-4 flex flex-wrap items-center gap-2">
            <span class="text-xs font-medium text-gray-700">Active filters:</span>
            <span v-if="searchQuery" class="inline-flex items-center rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
              Search: "{{ searchQuery }}"
              <button @click="searchQuery = ''" type="button" class="ml-1 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:bg-indigo-500 focus:text-white focus:outline-none">
                <span class="sr-only">Remove filter</span>
                <X class="h-3 w-3" />
              </button>
            </span>
            <span v-if="selectedDepartment" class="inline-flex items-center rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
              Department: {{ selectedDepartment }}
              <button @click="selectedDepartment = ''" type="button" class="ml-1 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:bg-indigo-500 focus:text-white focus:outline-none">
                <span class="sr-only">Remove filter</span>
                <X class="h-3 w-3" />
              </button>
            </span>
            <span v-if="selectedStatus" class="inline-flex items-center rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
              Status: {{ selectedStatus }}
              <button @click="selectedStatus = ''" type="button" class="ml-1 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:bg-indigo-500 focus:text-white focus:outline-none">
                <span class="sr-only">Remove filter</span>
                <X class="h-3 w-3" />
              </button>
            </span>
            <button 
              @click="clearAllFilters" 
              class="text-xs font-medium text-indigo-600 hover:text-indigo-500"
            >
              Clear all
            </button>
          </div>
        </div>
  
        <!-- Mobile view: Assignment cards -->
        <div class="block sm:hidden">
          <div v-if="filteredAssignments.length === 0" class="text-center py-10 animate-fade-in animation-delay-200">
            <UserX class="mx-auto h-12 w-12 text-gray-400" />
            <h3 class="mt-2 text-sm font-semibold text-gray-900">No assignments found</h3>
            <p class="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
          <div v-else class="space-y-4">
            <div
              v-for="assignment in filteredAssignments"
              :key="assignment.id"
              class="bg-white shadow rounded-lg overflow-hidden animate-fade-in animation-delay-200"
            >
              <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <img :src="assignment.volunteerAvatar" alt="" class="h-12 w-12 rounded-full" />
                  </div>
                  <div class="ml-4 flex-1">
                    <div class="flex items-center justify-between">
                      <h3 class="text-lg font-medium text-gray-900">{{ assignment.volunteerName }}</h3>
                      <span
                        :class="[
                          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                          assignment.status === 'active' ? 'bg-green-100 text-green-800' :
                          assignment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        ]"
                      >
                        {{ assignment.status }}
                      </span>
                    </div>
                    <p class="mt-1 text-sm text-gray-500">{{ assignment.role }}</p>
                    <div class="mt-2 flex flex-wrap gap-2">
                      <span class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
                        {{ assignment.department }}
                      </span>
                      <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                        <Calendar class="mr-1 h-3 w-3" />
                        {{ assignment.schedule }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="mt-4 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    @click="viewDetails(assignment.id)"
                    class="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <Eye class="mr-2 h-4 w-4 text-gray-500" />
                    View
                  </button>
                  <button
                    type="button"
                    @click="editAssignment(assignment.id)"
                    class="inline-flex justify-center rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                  >
                    <Edit class="mr-2 h-4 w-4" />
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Desktop view: Assignment table -->
        <div class="hidden sm:block animate-fade-in animation-delay-200">
          <div class="bg-white shadow rounded-lg overflow-hidden">
            <div v-if="filteredAssignments.length === 0" class="text-center py-10">
              <UserX class="mx-auto h-12 w-12 text-gray-400" />
              <h3 class="mt-2 text-sm font-semibold text-gray-900">No assignments found</h3>
              <p class="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
            <table v-else class="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Volunteer
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Department
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Schedule
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    class="relative py-3.5 pl-3 pr-4 sm:pr-6"
                  >
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr 
                  v-for="assignment in filteredAssignments" 
                  :key="assignment.id"
                  class="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                    <div class="flex items-center">
                      <div class="h-10 w-10 flex-shrink-0">
                        <img :src="assignment.volunteerAvatar" alt="" class="h-10 w-10 rounded-full" />
                      </div>
                      <div class="ml-4">
                        <div class="font-medium text-gray-900">{{ assignment.volunteerName }}</div>
                        <div class="text-gray-500">{{ assignment.email }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ assignment.role }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
                      {{ assignment.department }}
                    </span>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div class="flex items-center">
                      <Calendar class="mr-1 h-4 w-4 text-gray-400" />
                      {{ assignment.schedule }}
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span
                      :class="[
                        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                        assignment.status === 'active' ? 'bg-green-100 text-green-800' :
                        assignment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      ]"
                    >
                      {{ assignment.status }}
                    </span>
                  </td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <div class="flex items-center justify-end space-x-2">
                      <button
                        type="button"
                        @click="viewDetails(assignment.id)"
                        class="text-gray-500 hover:text-gray-700"
                      >
                        <Eye class="h-5 w-5" />
                        <span class="sr-only">View details</span>
                      </button>
                      <button
                        type="button"
                        @click="editAssignment(assignment.id)"
                        class="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit class="h-5 w-5" />
                        <span class="sr-only">Edit</span>
                      </button>
                      <button
                        type="button"
                        @click="deleteAssignment(assignment.id)"
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
                    Showing <span class="font-medium">{{ Math.min(1, filteredAssignments.length) }}</span> to <span class="font-medium">{{ Math.min(filteredAssignments.length, 10) }}</span> of <span class="font-medium">{{ filteredAssignments.length }}</span> assignments
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
  
        <!-- Assignment Details Modal -->
        <div v-if="showDetailsModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-10">
          <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto animate-fade-in">
            <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium leading-6 text-gray-900">Assignment Details</h3>
                <button
                  type="button"
                  @click="showDetailsModal = false"
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500"
                >
                  <span class="sr-only">Close</span>
                  <X class="h-6 w-6" />
                </button>
              </div>
            </div>
            <div class="px-4 py-5 sm:p-6" v-if="selectedAssignment">
              <div class="flex items-center mb-6">
                <div class="flex-shrink-0">
                  <img :src="selectedAssignment.volunteerAvatar" alt="" class="h-16 w-16 rounded-full" />
                </div>
                <div class="ml-4">
                  <h2 class="text-xl font-bold text-gray-900">{{ selectedAssignment.volunteerName }}</h2>
                  <p class="text-sm text-gray-500">{{ selectedAssignment.email }}</p>
                </div>
                <span
                  :class="[
                    'ml-auto inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                    selectedAssignment.status === 'active' ? 'bg-green-100 text-green-800' :
                    selectedAssignment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  ]"
                >
                  {{ selectedAssignment.status }}
                </span>
              </div>
  
              <dl class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-gray-500">Role</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ selectedAssignment.role }}</dd>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-gray-500">Department</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ selectedAssignment.department }}</dd>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-gray-500">Schedule</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ selectedAssignment.schedule }}</dd>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-gray-500">Start Date</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ selectedAssignment.startDate }}</dd>
                </div>
                <div class="sm:col-span-2">
                  <dt class="text-sm font-medium text-gray-500">Responsibilities</dt>
                  <dd class="mt-1 text-sm text-gray-900">
                    {{ selectedAssignment.responsibilities }}
                  </dd>
                </div>
                <div class="sm:col-span-2">
                  <dt class="text-sm font-medium text-gray-500">Skills & Requirements</dt>
                  <dd class="mt-1 text-sm text-gray-900">
                    <ul class="list-disc pl-5 space-y-1">
                      <li v-for="(skill, index) in selectedAssignment.skills" :key="index">
                        {{ skill }}
                      </li>
                    </ul>
                  </dd>
                </div>
              </dl>
  
              <div class="mt-6 border-t border-gray-200 pt-4">
                <h4 class="text-sm font-medium text-gray-500">Training & Certifications</h4>
                <div class="mt-2 flex flex-wrap gap-2">
                  <span
                    v-for="(cert, index) in selectedAssignment.certifications"
                    :key="index"
                    class="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700"
                  >
                    <Check class="mr-1 h-3 w-3" v-if="cert.completed" />
                    <Clock class="mr-1 h-3 w-3" v-else />
                    {{ cert.name }}
                  </span>
                </div>
              </div>
  
              <div class="mt-6 border-t border-gray-200 pt-4">
                <h4 class="text-sm font-medium text-gray-500">Assignment History</h4>
                <div class="mt-2 space-y-3">
                  <div v-for="(activity, index) in selectedAssignment.history" :key="index" class="flex">
                    <div class="flex-shrink-0">
                      <div class="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100">
                        <component 
                          :is="
                            activity.type === 'status_change' ? Clock :
                            activity.type === 'training' ? GraduationCap :
                            Calendar
                          " 
                          class="h-4 w-4 text-indigo-600" 
                        />
                      </div>
                    </div>
                    <div class="ml-3">
                      <p class="text-sm text-gray-900">{{ activity.description }}</p>
                      <p class="text-xs text-gray-500">{{ activity.date }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6 border-t border-gray-200">
              <button
                type="button"
                @click="editAssignment(selectedAssignment!.id)"
                class="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <Edit class="mr-2 h-4 w-4" />
                Edit Assignment
              </button>
            </div>
          </div>
        </div>
  
        <!-- Delete Confirmation Modal -->
        <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-10">
          <div class="bg-white rounded-lg shadow-xl max-w-md w-full animate-fade-in">
            <div class="px-4 py-5 sm:p-6">
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <AlertTriangle class="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 class="text-base font-semibold leading-6 text-gray-900">Delete Assignment</h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      Are you sure you want to delete this volunteer assignment? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  @click="confirmDelete"
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
  
        <!-- Advanced filters sidebar/sheet -->
        <div 
          v-if="openFilters" 
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-20"
          @click="openFilters = false"
        ></div>
        <div
          v-if="openFilters"
          class="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl z-30 overflow-y-auto animate-slide-in-right"
        >
          <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h3 class="text-base font-semibold leading-6 text-gray-900">Advanced Filters</h3>
              <button
                type="button"
                @click="openFilters = false"
                class="rounded-md bg-white text-gray-400 hover:text-gray-500"
              >
                <span class="sr-only">Close</span>
                <X class="h-6 w-6" />
              </button>
            </div>
          </div>
          <div class="p-4 space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">Departments</label>
              <div class="mt-1 space-y-2">
                <div v-for="dept in departments" :key="dept" class="flex items-center">
                  <input
                    type="checkbox"
                    :id="dept"
                    :value="dept"
                    v-model="selectedDepartments"
                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label :for="dept" class="ml-3 text-sm text-gray-700">{{ dept }}</label>
                </div>
              </div>
            </div>
  
            <div>
              <label class="block text-sm font-medium text-gray-700">Schedule</label>
              <div class="mt-1 space-y-2">
                <div v-for="schedule in schedules" :key="schedule" class="flex items-center">
                  <input
                    type="checkbox"
                    :id="schedule"
                    :value="schedule"
                    v-model="selectedSchedules"
                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label :for="schedule" class="ml-3 text-sm text-gray-700">{{ schedule }}</label>
                </div>
              </div>
            </div>
  
            <div>
              <label class="block text-sm font-medium text-gray-700">Status</label>
              <div class="mt-1 space-y-2">
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    id="status-active"
                    value="active"
                    v-model="selectedStatuses"
                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label for="status-active" class="ml-3 text-sm text-gray-700">Active</label>
                </div>
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    id="status-pending"
                    value="pending"
                    v-model="selectedStatuses"
                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label for="status-pending" class="ml-3 text-sm text-gray-700">Pending</label>
                </div>
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    id="status-inactive"
                    value="inactive"
                    v-model="selectedStatuses"
                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label for="status-inactive" class="ml-3 text-sm text-gray-700">Inactive</label>
                </div>
              </div>
            </div>
  
            <div class="pt-4 border-t border-gray-200">
              <button
                type="button"
                @click="applyAdvancedFilters"
                class="w-full inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Apply Filters
              </button>
              <button
                type="button"
                @click="resetAdvancedFilters"
                class="mt-3 w-full inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  definePageMeta({
      layout: 'dashboard'
  })
  import {
    UserPlus,
    Filter,
    Search,
    Calendar,
    Eye,
    Edit,
    Trash2,
    Clock,
    X,
    Check,
    UserX,
    GraduationCap,
    AlertTriangle,
    Users
  } from 'lucide-vue-next';
  
  // Router
  const router = useRouter();
  
  // Search and filters
  const searchQuery = ref('');
  const selectedDepartment = ref('');
  const selectedStatus = ref('');
  const openFilters = ref(false);
  
  // Advanced filters
  const selectedDepartments = ref<string[]>([]);
  const selectedSchedules = ref<string[]>([]);
  const selectedStatuses = ref<string[]>([]);
  
  // Modal states
  const showDetailsModal = ref(false);
  const showDeleteModal = ref(false);
  const selectedAssignmentId = ref<number | null>(null);
  
  // Filter options
  const departments = [
    'Worship Team',
    'Children\'s Ministry',
    'Media Team',
    'Hospitality',
    'Security',
    'Administration',
    'Outreach',
    'Prayer Team'
  ];
  
  const schedules = [
    'Sunday Morning',
    'Sunday Evening',
    'Wednesday Night',
    'Weekday',
    'Special Events',
    'Flexible'
  ];
  
  // Dummy data for volunteer assignments
  const assignments = ref([
    {
      id: 1,
      volunteerName: 'John Smith',
      volunteerAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      email: 'john.smith@example.com',
      role: 'Worship Team Leader',
      department: 'Worship Team',
      schedule: 'Sunday Morning',
      status: 'active',
      startDate: 'Jan 15, 2023',
      responsibilities: 'Lead the worship team, coordinate rehearsals, and select songs for Sunday services.',
      skills: [
        'Musical proficiency',
        'Leadership skills',
        'Team management',
        'Knowledge of worship planning'
      ],
      certifications: [
        { name: 'Leadership Training', completed: true },
        { name: 'Worship Planning Certification', completed: true }
      ],
      history: [
        { type: 'assignment', description: 'Assigned as Worship Team Leader', date: 'Jan 15, 2023' },
        { type: 'training', description: 'Completed Leadership Training', date: 'Feb 10, 2023' },
        { type: 'status_change', description: 'Status changed to Active', date: 'Feb 12, 2023' }
      ]
    },
    {
      id: 2,
      volunteerName: 'Sarah Johnson',
      volunteerAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      email: 'sarah.johnson@example.com',
      role: 'Children\'s Ministry Coordinator',
      department: 'Children\'s Ministry',
      schedule: 'Sunday Morning',
      status: 'active',
      startDate: 'Mar 1, 2023',
      responsibilities: 'Coordinate children\'s ministry activities, manage volunteers, and develop curriculum.',
      skills: [
        'Teaching experience',
        'Organizational skills',
        'Communication skills',
        'Child safety knowledge'
      ],
      certifications: [
        { name: 'Child Safety Training', completed: true },
        { name: 'First Aid Certification', completed: true },
        { name: 'Children\'s Ministry Leadership', completed: false }
      ],
      history: [
        { type: 'assignment', description: 'Assigned as Children\'s Ministry Coordinator', date: 'Mar 1, 2023' },
        { type: 'training', description: 'Completed Child Safety Training', date: 'Mar 5, 2023' },
        { type: 'training', description: 'Completed First Aid Certification', date: 'Mar 15, 2023' },
        { type: 'status_change', description: 'Status changed to Active', date: 'Mar 20, 2023' }
      ]
    },
    {
      id: 3,
      volunteerName: 'Michael Brown',
      volunteerAvatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      email: 'michael.brown@example.com',
      role: 'Sound Engineer',
      department: 'Media Team',
      schedule: 'Sunday Morning',
      status: 'active',
      startDate: 'Feb 1, 2023',
      responsibilities: 'Operate sound equipment during services, troubleshoot technical issues, and maintain equipment.',
      skills: [
        'Sound engineering experience',
        'Technical knowledge',
        'Problem-solving skills',
        'Attention to detail'
      ],
      certifications: [
        { name: 'Sound System Operation', completed: true },
        { name: 'Media Team Training', completed: true }
      ],
      history: [
        { type: 'assignment', description: 'Assigned as Sound Engineer', date: 'Feb 1, 2023' },
        { type: 'training', description: 'Completed Sound System Operation', date: 'Feb 15, 2023' },
        { type: 'status_change', description: 'Status changed to Active', date: 'Feb 20, 2023' }
      ]
    },
    {
      id: 4,
      volunteerName: 'Emily Davis',
      volunteerAvatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      email: 'emily.davis@example.com',
      role: 'Camera Operator',
      department: 'Media Team',
      schedule: 'Sunday Morning',
      status: 'active',
      startDate: 'Apr 10, 2023',
      responsibilities: 'Operate cameras during services, coordinate with director, and ensure quality video feed.',
      skills: [
        'Camera operation experience',
        'Visual composition knowledge',
        'Team collaboration',
        'Technical aptitude'
      ],
      certifications: [
        { name: 'Camera Operation Training', completed: true },
        { name: 'Media Team Training', completed: true }
      ],
      history: [
        { type: 'assignment', description: 'Assigned as Camera Operator', date: 'Apr 10, 2023' },
        { type: 'training', description: 'Completed Camera Operation Training', date: 'Apr 20, 2023' },
        { type: 'status_change', description: 'Status changed to Active', date: 'Apr 25, 2023' }
      ]
    },
    {
      id: 5,
      volunteerName: 'David Wilson',
      volunteerAvatar: 'https://randomuser.me/api/portraits/men/5.jpg',
      email: 'david.wilson@example.com',
      role: 'Usher Team Lead',
      department: 'Hospitality',
      schedule: 'Sunday Morning',
      status: 'active',
      startDate: 'Jan 5, 2023',
      responsibilities: 'Coordinate usher team, welcome attendees, and assist with seating and special needs.',
      skills: [
        'People skills',
        'Leadership abilities',
        'Problem-solving',
        'Customer service experience'
      ],
      certifications: [
        { name: 'Hospitality Training', completed: true },
        { name: 'Leadership Training', completed: true },
        { name: 'Emergency Response', completed: false }
      ],
      history: [
        { type: 'assignment', description: 'Assigned as Usher Team Lead', date: 'Jan 5, 2023' },
        { type: 'training', description: 'Completed Hospitality Training', date: 'Jan 15, 2023' },
        { type: 'status_change', description: 'Status changed to Active', date: 'Jan 20, 2023' }
      ]
    },
    {
      id: 6,
      volunteerName: 'Rachel Adams',
      volunteerAvatar: 'https://randomuser.me/api/portraits/women/6.jpg',
      email: 'rachel.adams@example.com',
      role: 'Greeter',
      department: 'Hospitality',
      schedule: 'Sunday Morning',
      status: 'pending',
      startDate: 'May 1, 2023',
      responsibilities: 'Welcome attendees, provide information, and create a warm environment.',
      skills: [
        'Friendly demeanor',
        'Communication skills',
        'Knowledge of church programs',
        'Attentiveness'
      ],
      certifications: [
        { name: 'Hospitality Training', completed: false }
      ],
      history: [
        { type: 'assignment', description: 'Assigned as Greeter', date: 'May 1, 2023' },
        { type: 'status_change', description: 'Status changed to Pending', date: 'May 1, 2023' }
      ]
    },
    {
      id: 7,
      volunteerName: 'James Lee',
      volunteerAvatar: 'https://randomuser.me/api/portraits/men/7.jpg',
      email: 'james.lee@example.com',
      role: 'Security Team Member',
      department: 'Security',
      schedule: 'Sunday Morning',
      status: 'active',
      startDate: 'Feb 10, 2023',
      responsibilities: 'Monitor church premises, respond to security concerns, and ensure a safe environment.',
      skills: [
        'Security background',
        'Observation skills',
        'Crisis management',
        'First aid knowledge'
      ],
      certifications: [
        { name: 'Security Training', completed: true },
        { name: 'First Aid Certification', completed: true },
        { name: 'Emergency Response', completed: true }
      ],
      history: [
        { type: 'assignment', description: 'Assigned as Security Team Member', date: 'Feb 10, 2023' },
        { type: 'training', description: 'Completed Security Training', date: 'Feb 15, 2023' },
        { type: 'training', description: 'Completed First Aid Certification', date: 'Feb 20, 2023' },
        { type: 'status_change', description: 'Status changed to Active', date: 'Feb 25, 2023' }
      ]
    },
    {
      id: 8,
      volunteerName: 'Lisa Chen',
      volunteerAvatar: 'https://randomuser.me/api/portraits/women/8.jpg',
      email: 'lisa.chen@example.com',
      role: 'Administrative Assistant',
      department: 'Administration',
      schedule: 'Weekday',
      status: 'inactive',
      startDate: 'Mar 15, 2023',
      responsibilities: 'Assist with office tasks, data entry, communication, and event coordination.',
      skills: [
        'Administrative experience',
        'Organizational skills',
        'Computer proficiency',
        'Communication skills'
      ],
      certifications: [
        { name: 'Church Administration Training', completed: true }
      ],
      history: [
        { type: 'assignment', description: 'Assigned as Administrative Assistant', date: 'Mar 15, 2023' },
        { type: 'training', description: 'Completed Church Administration Training', date: 'Mar 25, 2023' },
        { type: 'status_change', description: 'Status changed to Active', date: 'Mar 30, 2023' },
        { type: 'status_change', description: 'Status changed to Inactive', date: 'Apr 30, 2023' }
      ]
    }
  ]);
  
  // Computed properties
  const hasActiveFilters = computed(() => {
    return searchQuery.value !== '' || selectedDepartment.value !== '' || selectedStatus.value !== '';
  });
  
  const filteredAssignments = computed(() => {
    let result = [...assignments.value];
  
    // Apply search filter
    if (searchQuery.value) {
      const search = searchQuery.value.toLowerCase();
      result = result.filter(
        a => a.volunteerName.toLowerCase().includes(search) ||
             a.role.toLowerCase().includes(search) ||
             a.department.toLowerCase().includes(search) ||
             a.email.toLowerCase().includes(search)
      );
    }
  
    // Apply department filter
    if (selectedDepartment.value) {
      result = result.filter(a => a.department === selectedDepartment.value);
    }
  
    // Apply status filter
    if (selectedStatus.value) {
      result = result.filter(a => a.status === selectedStatus.value);
    }
  
    return result;
  });
  
  const selectedAssignment = computed(() => {
    if (selectedAssignmentId.value === null) return null;
    return assignments.value.find(a => a.id === selectedAssignmentId.value) || null;
  });
  
  // Methods
  const clearAllFilters = () => {
    searchQuery.value = '';
    selectedDepartment.value = '';
    selectedStatus.value = '';
  };
  
  const viewDetails = (id: number) => {
    selectedAssignmentId.value = id;
    showDetailsModal.value = true;
  };
  
  const editAssignment = (id: number) => {
    router.push(`/volunteer/assignments/${id}/edit`);
  };
  
  const deleteAssignment = (id: number) => {
    selectedAssignmentId.value = id;
    showDeleteModal.value = true;
  };
  
  const confirmDelete = () => {
    if (selectedAssignmentId.value !== null) {
      assignments.value = assignments.value.filter(a => a.id !== selectedAssignmentId.value);
      showDeleteModal.value = false;
      selectedAssignmentId.value = null;
    }
  };
  
  const navigateTo = (path: string) => {
    router.push(path);
  };
  
  const applyAdvancedFilters = () => {
    // Apply the filters from the sidebar
    if (selectedDepartments.value.length === 1) {
      selectedDepartment.value = selectedDepartments.value[0];
    } else {
      selectedDepartment.value = '';
    }
  
    if (selectedStatuses.value.length === 1) {
      selectedStatus.value = selectedStatuses.value[0];
    } else {
      selectedStatus.value = '';
    }
  
    openFilters.value = false;
  };
  
  const resetAdvancedFilters = () => {
    selectedDepartments.value = [];
    selectedSchedules.value = [];
    selectedStatuses.value = [];
  };
  
  // Initialize advanced filters from current selections
  onMounted(() => {
    if (selectedDepartment.value) {
      selectedDepartments.value = [selectedDepartment.value];
    }
    if (selectedStatus.value) {
      selectedStatuses.value = [selectedStatus.value];
    }
  });
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
  
  .animate-slide-in-right {
    animation: slideInRight 0.3s ease-out forwards;
  }
  
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
  </style>
  
  