<template>
    <main>
      <div class="space-y-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <div>
            <h2 class="text-2xl font-bold leading-7 text-gray-900">Regulatory Compliance Tracking</h2>
            <p class="mt-1 text-sm text-gray-500">Monitor tax, financial, and legal compliance requirements</p>
          </div>
          <div class="mt-4 flex sm:ml-4 sm:mt-0">
            <button
              type="button"
              @click="openAddComplianceModal"
              class="inline-flex items-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            >
              <Plus class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              Add Requirement
            </button>
          </div>
        </div>
  
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in">
          <div v-for="(stat, index) in stats" :key="stat.name" 
            class="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:pt-6 transform transition-all duration-300 hover:shadow-md hover:-translate-y-1"
          >
            <dt>
              <div :class="[
                'absolute rounded-md p-3',
                stat.bgColor
              ]">
                <component :is="stat.icon" class="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p class="ml-16 truncate text-sm font-medium text-gray-500">{{ stat.name }}</p>
            </dt>
            <dd class="ml-16 flex items-baseline">
              <p class="text-2xl font-semibold text-gray-900">{{ stat.value }}</p>
              <p v-if="stat.change" :class="[
                stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                'ml-2 flex items-baseline text-sm font-semibold'
              ]">
                <component :is="stat.changeType === 'increase' ? TrendingUp : TrendingDown" 
                  class="h-5 w-5 flex-shrink-0 self-center" 
                  aria-hidden="true" 
                />
                <span class="sr-only">
                  {{ stat.changeType === 'increase' ? 'Increased' : 'Decreased' }} by
                </span>
                {{ stat.change }}
              </p>
            </dd>
          </div>
        </div>
  
        <div class="bg-white shadow rounded-lg animate-fade-in animation-delay-100">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-base font-semibold leading-6 text-gray-900">Upcoming Compliance Deadlines</h3>
            <div class="mt-6 flow-root">
              <ul role="list" class="-mb-8">
                <li v-for="(event, eventIdx) in upcomingDeadlines" :key="event.id">
                  <div class="relative pb-8">
                    <span v-if="eventIdx !== upcomingDeadlines.length - 1" class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                    <div class="relative flex space-x-3">
                      <div>
                        <span :class="[
                          'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
                          event.priority === 'high' ? 'bg-red-500' :
                          event.priority === 'medium' ? 'bg-yellow-500' :
                          'bg-blue-500'
                        ]">
                          <Calendar class="h-5 w-5 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p class="text-sm text-gray-500">
                            <span class="font-medium text-gray-900">{{ event.title }}</span>
                            <span class="ml-1">{{ event.description }}</span>
                          </p>
                        </div>
                        <div class="whitespace-nowrap text-right text-sm">
                          <div class="flex flex-col items-end">
                            <time :datetime="event.dueDate" class="text-gray-500">{{ formatDate(event.dueDate) }}</time>
                            <span :class="[
                              'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mt-1',
                              event.priority === 'high' ? 'bg-red-100 text-red-800' :
                              event.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            ]">
                              {{ event.priority }} priority
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
  
        <div class="bg-white shadow rounded-lg animate-fade-in animation-delay-200">
          <div class="px-4 py-5 sm:p-6">
            <div class="sm:flex sm:items-center sm:justify-between">
              <h3 class="text-base font-semibold leading-6 text-gray-900">Compliance Requirements</h3>
              <div class="mt-3 flex sm:ml-4 sm:mt-0">
                <div class="relative">
                  <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search class="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type="search"
                    v-model="searchQuery"
                    class="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                    placeholder="Search requirements..."
                  />
                </div>
                <Menu as="div" class="relative ml-3 inline-block text-left">
                  <div>
                    <MenuButton class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      Filter
                      <ChevronDown class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </MenuButton>
                  </div>
                  <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                  >
                    <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div class="py-1">
                        <div class="px-4 py-2 text-xs font-medium text-gray-700">Status</div>
                        <MenuItem v-for="status in statuses" :key="status.id" v-slot="{ active }">
                          <a
                            href="#"
                            @click.prevent="selectedStatus = status.id === selectedStatus ? null : status.id"
                            :class="[
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm flex items-center'
                            ]"
                          >
                            <Check 
                              v-if="selectedStatus === status.id" 
                              class="mr-2 h-4 w-4 text-purple-600" 
                            />
                            <span v-else class="mr-6"></span>
                            {{ status.name }}
                          </a>
                        </MenuItem>
                        <div class="border-t border-gray-100"></div>
                        <div class="px-4 py-2 text-xs font-medium text-gray-700">Priority</div>
                        <MenuItem v-for="priority in priorities" :key="priority.id" v-slot="{ active }">
                          <a
                            href="#"
                            @click.prevent="selectedPriority = priority.id === selectedPriority ? null : priority.id"
                            :class="[
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm flex items-center'
                            ]"
                          >
                            <Check 
                              v-if="selectedPriority === priority.id" 
                              class="mr-2 h-4 w-4 text-purple-600" 
                            />
                            <span v-else class="mr-6"></span>
                            {{ priority.name }}
                          </a>
                        </MenuItem>
                        <div class="border-t border-gray-100"></div>
                        <MenuItem v-slot="{ active }">
                          <a
                            href="#"
                            @click.prevent="clearFilters"
                            :class="[
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            ]"
                          >
                            Clear filters
                          </a>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </transition>
                </Menu>
              </div>
            </div>
  
            <div class="mt-6 flow-root">
              <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table v-if="filteredRequirements.length > 0" class="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Requirement</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Category</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Due Date</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Priority</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Assigned To</th>
                        <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                          <span class="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr v-for="requirement in filteredRequirements" :key="requirement.id" class="hover:bg-gray-50 transition-colors">
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          <a 
                            href="#" 
                            @click.prevent="openRequirementDetails(requirement)"
                            class="hover:text-purple-600 hover:underline transition-colors"
                          >
                            {{ requirement.title }}
                          </a>
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ requirement.category }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ formatDate(requirement.dueDate) }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm">
                          <span :class="[
                            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                            requirement.status === 'completed' ? 'bg-green-100 text-green-800' :
                            requirement.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                            requirement.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          ]">
                            {{ getStatusName(requirement.status) }}
                          </span>
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm">
                          <span :class="[
                            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                            requirement.priority === 'high' ? 'bg-red-100 text-red-800' :
                            requirement.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          ]">
                            {{ requirement.priority }}
                          </span>
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div class="flex items-center">
                            <img :src="requirement.assignedTo.avatar" alt="" class="h-8 w-8 rounded-full" />
                            <div class="ml-3">
                              <p class="font-medium text-gray-900">{{ requirement.assignedTo.name }}</p>
                            </div>
                          </div>
                        </td>
                        <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <Menu as="div" class="relative inline-block text-left">
                            <div>
                              <MenuButton class="inline-flex items-center rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                                <span class="sr-only">Open options</span>
                                <MoreVertical class="h-5 w-5" aria-hidden="true" />
                              </MenuButton>
                            </div>
                            <transition
                              enter-active-class="transition ease-out duration-100"
                              enter-from-class="transform opacity-0 scale-95"
                              enter-to-class="transform opacity-100 scale-100"
                              leave-active-class="transition ease-in duration-75"
                              leave-from-class="transform opacity-100 scale-100"
                              leave-to-class="transform opacity-0 scale-95"
                            >
                              <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div class="py-1">
                                  <MenuItem v-slot="{ active }">
                                    <a
                                      href="#"
                                      @click.prevent="openRequirementDetails(requirement)"
                                      :class="[
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'flex px-4 py-2 text-sm items-center'
                                      ]"
                                    >
                                      <Eye class="mr-3 h-5 w-5 text-gray-400" />
                                      View Details
                                    </a>
                                  </MenuItem>
                                  <MenuItem v-slot="{ active }">
                                    <a
                                      href="#"
                                      @click.prevent="markAsCompleted(requirement)"
                                      :class="[
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'flex px-4 py-2 text-sm items-center',
                                        requirement.status === 'completed' ? 'opacity-50 cursor-not-allowed' : ''
                                      ]"
                                      :aria-disabled="requirement.status === 'completed'"
                                    >
                                      <CheckCircle class="mr-3 h-5 w-5 text-gray-400" />
                                      Mark as Completed
                                    </a>
                                  </MenuItem>
                                  <MenuItem v-slot="{ active }">
                                    <a
                                      href="#"
                                      @click.prevent="editRequirement(requirement)"
                                      :class="[
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'flex px-4 py-2 text-sm items-center'
                                      ]"
                                    >
                                      <Edit class="mr-3 h-5 w-5 text-gray-400" />
                                      Edit
                                    </a>
                                  </MenuItem>
                                  <div class="border-t border-gray-100"></div>
                                  <MenuItem v-slot="{ active }">
                                    <a
                                      href="#"
                                      @click.prevent="deleteRequirement(requirement)"
                                      :class="[
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'flex px-4 py-2 text-sm items-center text-red-600'
                                      ]"
                                    >
                                      <Trash2 class="mr-3 h-5 w-5 text-red-400" />
                                      Delete
                                    </a>
                                  </MenuItem>
                                </div>
                              </MenuItems>
                            </transition>
                          </Menu>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div v-else class="text-center py-12">
                    <ClipboardList class="mx-auto h-12 w-12 text-gray-400" />
                    <h3 class="mt-2 text-sm font-semibold text-gray-900">No requirements found</h3>
                    <p class="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Compliance Analytics -->
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 animate-fade-in animation-delay-300">
          <!-- Compliance by Category -->
          <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-base font-semibold leading-6 text-gray-900">Compliance by Category</h3>
              <div class="mt-6 h-80">
                <div class="relative h-full">
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="h-full w-full">
                      <div class="h-full w-full" ref="categoryChartRef"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-base font-semibold leading-6 text-gray-900">Compliance Status</h3>
              <div class="mt-6 h-80">
                <div class="relative h-full">
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="h-full w-full">
                      <div class="h-full w-full" ref="statusChartRef"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <TransitionRoot appear :show="isAddComplianceModalOpen" as="template">
        <Dialog as="div" @close="isAddComplianceModalOpen = false" class="relative z-50">
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
                    Add Compliance Requirement
                  </DialogTitle>
                  <div class="mt-4">
                    <div class="space-y-6">
                      <div>
                        <label for="requirement-title" class="block text-sm font-medium leading-6 text-gray-900">
                          Title
                        </label>
                        <div class="mt-2">
                          <input
                            type="text"
                            id="requirement-title"
                            v-model="newRequirement.title"
                            class="block w-full rounded-md px-3 py-2.5 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                            placeholder="Enter requirement title"
                          />
                        </div>
                      </div>
  
                      <div>
                        <label for="requirement-description" class="block text-sm font-medium leading-6 text-gray-900">
                          Description
                        </label>
                        <div class="mt-2">
                          <textarea
                            id="requirement-description"
                            v-model="newRequirement.description"
                            rows="3"
                            class="block w-full rounded-md px-3 py-2.5 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                            placeholder="Enter requirement description"
                          ></textarea>
                        </div>
                      </div>
  
                      <div>
                        <label for="requirement-category" class="block text-sm font-medium leading-6 text-gray-900">
                          Category
                        </label>
                        <div class="mt-2">
                          <select
                            id="requirement-category"
                            v-model="newRequirement.category"
                            class="block w-full rounded-md px-3 py-2.5 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                          >
                            <option value="Tax">Tax</option>
                            <option value="Financial">Financial</option>
                            <option value="Legal">Legal</option>
                            <option value="Operational">Operational</option>
                          </select>
                        </div>
                      </div>
  
                      <div>
                        <label for="requirement-due-date" class="block text-sm font-medium leading-6 text-gray-900">
                          Due Date
                        </label>
                        <div class="mt-2">
                          <input
                            type="date"
                            id="requirement-due-date"
                            v-model="newRequirement.dueDate"
                            class="block w-full rounded-md px-3 py-2.5 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
  
                      <div>
                        <label for="requirement-priority" class="block text-sm font-medium leading-6 text-gray-900">
                          Priority
                        </label>
                        <div class="mt-2">
                          <select
                            id="requirement-priority"
                            v-model="newRequirement.priority"
                            class="block w-full rounded-md px-3 py-2.5 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                          >
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                          </select>
                        </div>
                      </div>
  
                      <div>
                        <label for="requirement-assigned-to" class="block text-sm font-medium leading-6 text-gray-900">
                          Assigned To
                        </label>
                        <div class="mt-2">
                          <select
                            id="requirement-assigned-to"
                            v-model="newRequirement.assignedToId"
                            class="block w-full rounded-md px-3 py-2.5 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                          >
                            <option v-for="user in users" :key="user.id" :value="user.id">
                              {{ user.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <div class="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      @click="isAddComplianceModalOpen = false"
                      class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      @click="addRequirement"
                      class="inline-flex justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    >
                      Add
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
  
      <TransitionRoot appear :show="isDetailsModalOpen" as="template">
        <Dialog as="div" @close="isDetailsModalOpen = false" class="relative z-50">
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
                  <div class="flex justify-between items-center">
                    <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                      {{ selectedRequirement?.title }}
                    </DialogTitle>
                    <button
                      type="button"
                      @click="isDetailsModalOpen = false"
                      class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    >
                      <span class="sr-only">Close</span>
                      <X class="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div class="mt-4">
                    <div class="bg-purple-50 p-4 rounded-lg mb-4">
                      <div class="flex justify-between">
                        <div>
                          <span class="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                            {{ selectedRequirement?.category }}
                          </span>
                          <span :class="[
                            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ml-2',
                            selectedRequirement?.priority === 'high' ? 'bg-red-100 text-red-800' :
                            selectedRequirement?.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          ]">
                            {{ selectedRequirement?.priority }} priority
                          </span>
                        </div>
                        <span :class="[
                          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                          selectedRequirement?.status === 'completed' ? 'bg-green-100 text-green-800' :
                          selectedRequirement?.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          selectedRequirement?.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        ]">
                          {{ selectedRequirement ? getStatusName(selectedRequirement.status) : '' }}
                        </span>
                      </div>
                      <p class="mt-2 text-sm text-gray-600">{{ selectedRequirement?.description }}</p>
                    </div>
  
                    <div class="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 class="text-sm font-medium text-gray-500">Due Date</h4>
                        <p class="mt-1 text-sm text-gray-900">{{ selectedRequirement ? formatDate(selectedRequirement.dueDate) : '' }}</p>
                      </div>
                      <div>
                        <h4 class="text-sm font-medium text-gray-500">Assigned To</h4>
                        <div class="mt-1 flex items-center">
                          <img 
                            v-if="selectedRequirement?.assignedTo" 
                            :src="selectedRequirement.assignedTo.avatar" 
                            alt="" 
                            class="h-8 w-8 rounded-full mr-2" 
                          />
                          <p class="text-sm text-gray-900">{{ selectedRequirement?.assignedTo?.name }}</p>
                        </div>
                      </div>
                    </div>
  
                    <div class="border-t border-gray-200 pt-4">
                      <h4 class="text-sm font-medium text-gray-500 mb-2">Activity Timeline</h4>
                      <ul role="list" class="space-y-4">
                        <li v-for="(activity, index) in selectedRequirement?.activities || []" :key="index" class="relative flex gap-x-4">
                          <div class="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                            <div class="w-px bg-gray-200"></div>
                          </div>
                          <div class="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                            <component 
                              :is="activity.icon" 
                              class="h-4 w-4 text-purple-600" 
                              aria-hidden="true" 
                            />
                          </div>
                          <div class="flex-auto py-0.5 text-sm leading-5 text-gray-500">
                            <span class="font-medium text-gray-900">{{ activity.user }}</span> {{ activity.action }}
                            <span class="whitespace-nowrap text-gray-400">{{ activity.date }}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
  
                  <div class="mt-6 flex justify-end space-x-3">
                    <button
                      v-if="selectedRequirement?.status !== 'completed'"
                      type="button"
                      @click="markAsCompleted(selectedRequirement)"
                      class="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      <CheckCircle class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                      Mark as Completed
                    </button>
                    <button
                      type="button"
                      @click="editRequirement(selectedRequirement)"
                      class="inline-flex justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    >
                      <Edit class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                      Edit
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
  import { ref, computed, onMounted, shallowRef } from 'vue';
  import { useRouter } from 'vue-router';
  import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue';
  import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
  import {
    Plus,
    Search,
    ChevronDown,
    Check,
    Calendar,
    ClipboardCheck,
    ClipboardList,
    AlertCircle,
    TrendingUp,
    TrendingDown,
    MoreVertical,
    Eye,
    CheckCircle,
    Edit,
    Trash2,
    X,
    FileText,
    User,
    Clock
  } from 'lucide-vue-next';
  
  const router = useRouter();
  const searchQuery = ref('');
  const selectedStatus = ref(null);
  const selectedPriority = ref(null);
  const isAddComplianceModalOpen = ref(false);
  const isDetailsModalOpen = ref(false);
  const selectedRequirement = ref(null);
  const categoryChartRef = ref(null);
  const statusChartRef = ref(null);
  // Use shallowRef for ApexCharts to avoid reactivity issues
  const ApexCharts = shallowRef(null);
  
  definePageMeta({
    layout: 'dashboard'
  })

  // Stats data
  const stats = [
    {
      name: 'Total Requirements',
      value: '24',
      icon: ClipboardCheck,
      bgColor: 'bg-purple-600'
    },
    {
      name: 'Completed',
      value: '18',
      change: '75%',
      changeType: 'increase',
      icon: CheckCircle,
      bgColor: 'bg-green-600'
    },
    {
      name: 'Pending',
      value: '6',
      icon: Clock,
      bgColor: 'bg-yellow-600'
    },
    {
      name: 'Overdue',
      value: '2',
      change: '1',
      changeType: 'increase',
      icon: AlertCircle,
      bgColor: 'bg-red-600'
    }
  ];
  
  // Statuses
  const statuses = [
    { id: 'completed', name: 'Completed' },
    { id: 'in-progress', name: 'In Progress' },
    { id: 'pending', name: 'Pending' },
    { id: 'overdue', name: 'Overdue' }
  ];
  
  // Priorities
  const priorities = [
    { id: 'high', name: 'High' },
    { id: 'medium', name: 'Medium' },
    { id: 'low', name: 'Low' }
  ];
  
  // Users
  const users = [
    { id: 1, name: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, name: 'Jane Smith', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: 3, name: 'Mike Johnson', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: 4, name: 'Sarah Williams', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' }
  ];
  
  // New requirement form data
  const newRequirement = ref({
    title: '',
    description: '',
    category: 'Tax',
    dueDate: '',
    priority: 'medium',
    assignedToId: 1
  });
  
  // Upcoming deadlines
  const upcomingDeadlines = [
    {
      id: 1,
      title: 'Annual Tax Filing',
      description: 'Submit annual tax return to IRS',
      dueDate: '2024-03-15',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Board Meeting Minutes',
      description: 'Finalize and file board meeting minutes',
      dueDate: '2024-03-30',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Quarterly Financial Report',
      description: 'Prepare and submit quarterly financial report',
      dueDate: '2024-04-15',
      priority: 'medium'
    },
    {
      id: 4,
      title: 'Insurance Policy Renewal',
      description: 'Review and renew liability insurance policy',
      dueDate: '2024-05-01',
      priority: 'low'
    }
  ];
  
  // Compliance requirements
  const requirements = [
    {
      id: 1,
      title: 'Annual Tax Filing',
      description: 'Submit annual tax return to IRS including Form 990 for non-profit organizations.',
      category: 'Tax',
      dueDate: '2024-03-15',
      status: 'in-progress',
      priority: 'high',
      assignedTo: users[0],
      activities: [
        { user: 'John Doe', action: 'created this requirement', date: '2 months ago', icon: FileText },
        { user: 'Jane Smith', action: 'updated the status to "In Progress"', date: '2 weeks ago', icon: Edit },
        { user: 'Mike Johnson', action: 'added a comment: "Working on gathering all financial documents"', date: '1 week ago', icon: User }
      ]
    },
    {
      id: 2,
      title: 'Board Meeting Minutes',
      description: 'Finalize and file board meeting minutes according to state regulations.',
      category: 'Legal',
      dueDate: '2024-03-30',
      status: 'pending',
      priority: 'medium',
      assignedTo: users[1],
      activities: [
        { user: 'Jane Smith', action: 'created this requirement', date: '1 month ago', icon: FileText },
        { user: 'John Doe', action: 'assigned this to Jane Smith', date: '3 weeks ago', icon: User }
      ]
    },
    {
      id: 3,
      title: 'Quarterly Financial Report',
      description: 'Prepare and submit quarterly financial report to the board of directors.',
      category: 'Financial',
      dueDate: '2024-04-15',
      status: 'pending',
      priority: 'medium',
      assignedTo: users[2],
      activities: [
        { user: 'Mike Johnson', action: 'created this requirement', date: '2 months ago', icon: FileText }
      ]
    },
    {
      id: 4,
      title: 'Insurance Policy Renewal',
      description: 'Review and renew liability insurance policy for the church property and activities.',
      category: 'Operational',
      dueDate: '2024-05-01',
      status: 'pending',
      priority: 'low',
      assignedTo: users[3],
      activities: [
        { user: 'Sarah Williams', action: 'created this requirement', date: '3 months ago', icon: FileText }
      ]
    },
    {
      id: 5,
      title: 'Employee Handbook Update',
      description: 'Update employee handbook to reflect current policies and procedures.',
      category: 'Legal',
      dueDate: '2024-02-28',
      status: 'completed',
      priority: 'medium',
      assignedTo: users[1],
      activities: [
        { user: 'Jane Smith', action: 'created this requirement', date: '3 months ago', icon: FileText },
        { user: 'John Doe', action: 'updated the status to "In Progress"', date: '2 months ago', icon: Edit },
        { user: 'Jane Smith', action: 'marked this as completed', date: '2 weeks ago', icon: CheckCircle }
      ]
    },
    {
      id: 6,
      title: 'Property Tax Exemption',
      description: 'Submit property tax exemption application for church property.',
      category: 'Tax',
      dueDate: '2024-01-31',
      status: 'completed',
      priority: 'high',
      assignedTo: users[0],
      activities: [
        { user: 'John Doe', action: 'created this requirement', date: '4 months ago', icon: FileText },
        { user: 'John Doe', action: 'marked this as completed', date: '2 months ago', icon: CheckCircle }
      ]
    },
    {
      id: 7,
      title: 'Annual Financial Audit',
      description: 'Conduct annual financial audit by independent auditor.',
      category: 'Financial',
      dueDate: '2024-02-15',
      status: 'completed',
      priority: 'high',
      assignedTo: users[2],
      activities: [
        { user: 'Mike Johnson', action: 'created this requirement', date: '4 months ago', icon: FileText },
        { user: 'Mike Johnson', action: 'updated the status to "In Progress"', date: '3 months ago', icon: Edit },
        { user: 'Mike Johnson', action: 'marked this as completed', date: '1 month ago', icon: CheckCircle }
      ]
    },
    {
      id: 8,
      title: 'Charitable Registration Renewal',
      description: 'Renew charitable registration with state authorities.',
      category: 'Legal',
      dueDate: '2024-06-30',
      status: 'pending',
      priority: 'medium',
      assignedTo: users[3],
      activities: [
        { user: 'Sarah Williams', action: 'created this requirement', date: '1 month ago', icon: FileText }
      ]
    }
  ];
  
  // Filtered requirements
  const filteredRequirements = computed(() => {
    return requirements.filter(req => {
      // Filter by search query
      if (searchQuery.value && !req.title.toLowerCase().includes(searchQuery.value.toLowerCase())) {
        return false;
      }
      
      // Filter by status
      if (selectedStatus.value && req.status !== selectedStatus.value) {
        return false;
      }
      
      // Filter by priority
      if (selectedPriority.value && req.priority !== selectedPriority.value) {
        return false;
      }
      
      return true;
    });
  });
  
  // Helper functions
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  const getStatusName = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'pending':
        return 'Pending';
      case 'overdue':
        return 'Overdue';
      default:
        return status;
    }
  };
  
  // Action functions
  const clearFilters = () => {
    searchQuery.value = '';
    selectedStatus.value = null;
    selectedPriority.value = null;
  };
  
  const openAddComplianceModal = () => {
    newRequirement.value = {
      title: '',
      description: '',
      category: 'Tax',
      dueDate: '',
      priority: 'medium',
      assignedToId: 1
    };
    isAddComplianceModalOpen.value = true;
  };
  
  const addRequirement = () => {
    // In a real app, this would add the requirement to the server
    // For now, we'll just add it to our local array
    const assignedUser = users.find(u => u.id === newRequirement.value.assignedToId);
    
    const newReq = {
      id: requirements.length + 1,
      title: newRequirement.value.title,
      description: newRequirement.value.description,
      category: newRequirement.value.category,
      dueDate: newRequirement.value.dueDate,
      status: 'pending',
      priority: newRequirement.value.priority,
      assignedTo: assignedUser,
      activities: [
        { 
          user: 'You', 
          action: 'created this requirement', 
          date: 'just now', 
          icon: FileText 
        }
      ]
    };
    
    requirements.unshift(newReq);
    isAddComplianceModalOpen.value = false;
    
    // Show success message (in a real app)
    alert('Requirement added successfully!');
  };
  
  const openRequirementDetails = (requirement: any) => {
    selectedRequirement.value = requirement;
    isDetailsModalOpen.value = true;
  };
  
  const markAsCompleted = (requirement: any) => {
    if (requirement.status === 'completed') {
      return;
    }
    
    // In a real app, this would update the requirement on the server
    requirement.status = 'completed';
    requirement.activities.push({
      user: 'You',
      action: 'marked this as completed',
      date: 'just now',
      icon: CheckCircle
    });
    
    if (isDetailsModalOpen.value) {
      // If details modal is open, update the selected requirement
      selectedRequirement.value = { ...requirement };
    } else {
      // Show success message (in a real app)
      alert('Requirement marked as completed!');
    }
  };
  
  const editRequirement = (requirement: any) => {
    // In a real app, this would open an edit form
    // For now, we'll just show an alert
    alert(`Editing ${requirement.title}...`);
  };
  
  const deleteRequirement = (requirement: any) => {
    // In a real app, this would delete the requirement after confirmation
    if (confirm(`Are you sure you want to delete ${requirement.title}?`)) {
      const index = requirements.findIndex(r => r.id === requirement.id);
      if (index !== -1) {
        requirements.splice(index, 1);
        alert('Requirement deleted successfully!');
      }
    }
  };
  
  // Initialize charts
  onMounted(async () => {
    // Only import and initialize ApexCharts on the client side
    if (typeof window !== 'undefined') {
      try {
        // Dynamically import ApexCharts only on client-side
        const ApexChartsModule = await import('apexcharts');
        ApexCharts.value = ApexChartsModule.default;
        
        if (categoryChartRef.value && ApexCharts.value) {
          const categoryOptions = {
            series: [5, 3, 2, 1],
            chart: {
              type: 'pie',
              height: 320
            },
            labels: ['Tax', 'Legal', 'Financial', 'Operational'],
            colors: ['#9333EA', '#3B82F6', '#10B981', '#F59E0B'],
            legend: {
              position: 'bottom'
            },
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    height: 260
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }
            ],
            dataLabels: {
              enabled: true,
              formatter: function(val: number) {
                return val.toFixed(0) + '%';
              }
            }
          };
      
          const categoryChart = new ApexCharts.value(categoryChartRef.value, categoryOptions);
          categoryChart.render();
        }
      
        if (statusChartRef.value && ApexCharts.value) {
          const statusOptions = {
            series: [{
              name: 'Requirements',
              data: [18, 4, 2]
            }],
            chart: {
              type: 'bar',
              height: 320,
              toolbar: {
                show: false
              }
            },
            plotOptions: {
              bar: {
                borderRadius: 4,
                horizontal: true,
              }
            },
            dataLabels: {
              enabled: false
            },
            colors: ['#10B981', '#3B82F6', '#F59E0B'],
            xaxis: {
              categories: ['Completed', 'In Progress', 'Pending'],
            },
            yaxis: {
              title: {
                text: 'Status'
              }
            }
          };
      
          const statusChart = new ApexCharts.value(statusChartRef.value, statusOptions);
          statusChart.render();
        }
      } catch (error) {
        console.error('Error loading ApexCharts:', error);
      }
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
  
  .animation-delay-300 {
    animation-delay: 300ms;
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

