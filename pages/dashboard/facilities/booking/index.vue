<template>
    <NuxtLayout name="facilities">
      <div class="space-y-8">
        <!-- Page header -->
        <div class="sm:flex sm:items-center sm:justify-between">
          <div>
            <h2 class="text-2xl font-bold leading-7 text-gray-900">Facility Booking</h2>
            <p class="mt-1 text-sm text-gray-500">Reserve church halls, equipment, and vehicles</p>
          </div>
          <div class="mt-4 flex sm:ml-4 sm:mt-0">
            <button
              type="button"
              @click="openCreateBookingModal"
              class="inline-flex items-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              <Plus class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              New Booking
            </button>
          </div>
        </div>
  
        <!-- Booking Calendar -->
        <div class="bg-white shadow rounded-lg animate-fade-in">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center justify-between">
              <h3 class="text-base font-semibold leading-6 text-gray-900">Booking Calendar</h3>
              <div class="flex space-x-3">
                <button
                  type="button"
                  @click="previousMonth"
                  class="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <ChevronLeft class="h-5 w-5" />
                </button>
                <span class="text-sm font-medium">{{ currentMonthName }} {{ currentYear }}</span>
                <button
                  type="button"
                  @click="nextMonth"
                  class="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <ChevronRight class="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div class="mt-6 overflow-hidden">
              <!-- Calendar grid -->
              <div class="grid grid-cols-7 gap-px bg-gray-200 text-sm">
                <div v-for="day in weekDays" :key="day" class="bg-gray-50 py-2 text-center font-semibold text-gray-900">
                  {{ day }}
                </div>
                <div 
                  v-for="(day, index) in calendarDays" 
                  :key="index" 
                  :class="[
                    'relative bg-white py-2 px-3 h-24 overflow-hidden',
                    day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-500',
                    day.isToday ? 'font-semibold text-emerald-600' : '',
                    day.date.getDay() === 0 || day.date.getDay() === 6 ? 'bg-emerald-50' : ''
                  ]"
                >
                  <time :datetime="formatDate(day.date)" class="font-medium">{{ day.date.getDate() }}</time>
                  <ol class="mt-2">
                    <li 
                      v-for="event in day.events" 
                      :key="event.id" 
                      class="group flex cursor-pointer"
                      @click="viewBookingDetails(event)"
                    >
                      <p 
                        :class="[
                          'flex-auto truncate rounded px-1.5 py-0.5 text-xs font-medium',
                          event.type === 'hall' ? 'bg-emerald-100 text-emerald-700' :
                          event.type === 'equipment' ? 'bg-blue-100 text-blue-700' :
                          'bg-amber-100 text-amber-700'
                        ]"
                      >
                        {{ event.title }}
                      </p>
                    </li>
                    <li v-if="day.events.length > 2" class="text-xs text-gray-500 mt-1">
                      + {{ day.events.length - 2 }} more
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Booking Filters and List -->
        <div class="bg-white shadow rounded-lg animate-fade-in animation-delay-100">
          <div class="px-4 py-5 sm:p-6">
            <div class="sm:flex sm:items-center sm:justify-between">
              <h3 class="text-base font-semibold leading-6 text-gray-900">Booking Requests</h3>
              <div class="mt-3 flex sm:ml-4 sm:mt-0">
                <div class="relative">
                  <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search class="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type="search"
                    v-model="searchQuery"
                    class="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                    placeholder="Search bookings..."
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
                              class="mr-2 h-4 w-4 text-emerald-600" 
                            />
                            <span v-else class="mr-6"></span>
                            {{ status.name }}
                          </a>
                        </MenuItem>
                        <div class="border-t border-gray-100"></div>
                        <div class="px-4 py-2 text-xs font-medium text-gray-700">Type</div>
                        <MenuItem v-for="type in resourceTypes" :key="type.id" v-slot="{ active }">
                          <a
                            href="#"
                            @click.prevent="selectedType = type.id === selectedType ? null : type.id"
                            :class="[
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm flex items-center'
                            ]"
                          >
                            <Check 
                              v-if="selectedType === type.id" 
                              class="mr-2 h-4 w-4 text-emerald-600" 
                            />
                            <span v-else class="mr-6"></span>
                            {{ type.name }}
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
                  <table v-if="filteredBookings.length > 0" class="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Resource</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Requester</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Time</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                          <span class="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr v-for="booking in filteredBookings" :key="booking.id" class="hover:bg-gray-50 transition-colors">
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          <div class="flex items-center">
                            <component :is="getBookingIcon(booking.type)" :class="[
                              'h-5 w-5 mr-2',
                              booking.type === 'hall' ? 'text-emerald-500' :
                              booking.type === 'equipment' ? 'text-blue-500' :
                              'text-amber-500'
                            ]" />
                            <a 
                              href="#" 
                              @click.prevent="viewBookingDetails(booking)"
                              class="hover:text-emerald-600 hover:underline transition-colors"
                            >
                              {{ booking.title }}
                            </a>
                          </div>
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ getTypeName(booking.type) }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ booking.requester }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ formatDateShort(booking.date) }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ booking.time }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm">
                          <span :class="[
                            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                            booking.status === 'approved' ? 'bg-green-100 text-green-800' :
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            booking.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          ]">
                            {{ booking.status }}
                          </span>
                        </td>
                        <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <Menu as="div" class="relative inline-block text-left">
                            <div>
                              <MenuButton class="inline-flex items-center rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
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
                                      @click.prevent="viewBookingDetails(booking)"
                                      :class="[
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'flex px-4 py-2 text-sm items-center'
                                      ]"
                                    >
                                      <Eye class="mr-3 h-5 w-5 text-gray-400" />
                                      View Details
                                    </a>
                                  </MenuItem>
                                  <MenuItem v-if="booking.status === 'pending'" v-slot="{ active }">
                                    <a
                                      href="#"
                                      @click.prevent="approveBooking(booking)"
                                      :class="[
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'flex px-4 py-2 text-sm items-center'
                                      ]"
                                    >
                                      <CheckCircle class="mr-3 h-5 w-5 text-gray-400" />
                                      Approve
                                    </a>
                                  </MenuItem>
                                  <MenuItem v-if="booking.status === 'pending'" v-slot="{ active }">
                                    <a
                                      href="#"
                                      @click.prevent="rejectBooking(booking)"
                                      :class="[
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'flex px-4 py-2 text-sm items-center'
                                      ]"
                                    >
                                      <XCircle class="mr-3 h-5 w-5 text-gray-400" />
                                      Reject
                                    </a>
                                  </MenuItem>
                                  <MenuItem v-slot="{ active }">
                                    <a
                                      href="#"
                                      @click.prevent="editBooking(booking)"
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
                                      @click.prevent="cancelBooking(booking)"
                                      :class="[
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'flex px-4 py-2 text-sm items-center text-red-600'
                                      ]"
                                    >
                                      <Trash2 class="mr-3 h-5 w-5 text-red-400" />
                                      Cancel
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
                    <CalendarX class="mx-auto h-12 w-12 text-gray-400" />
                    <h3 class="mt-2 text-sm font-semibold text-gray-900">No bookings found</h3>
                    <p class="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Create Booking Modal -->
      <TransitionRoot appear :show="isCreateModalOpen" as="template">
        <Dialog as="div" @close="isCreateModalOpen = false" class="relative z-50">
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
                    Create New Booking
                  </DialogTitle>
                  <div class="mt-4">
                    <div class="space-y-6">
                      <div>
                        <label for="resource-type" class="block text-sm font-medium leading-6 text-gray-900">
                          Resource Type
                        </label>
                        <div class="mt-2">
                          <select
                            id="resource-type"
                            v-model="newBooking.type"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                          >
                            <option value="hall">Hall/Room</option>
                            <option value="equipment">Equipment</option>
                            <option value="vehicle">Vehicle</option>
                          </select>
                        </div>
                      </div>
  
                      <div>
                        <label for="resource-title" class="block text-sm font-medium leading-6 text-gray-900">
                          Resource
                        </label>
                        <div class="mt-2">
                          <select
                            id="resource-title"
                            v-model="newBooking.resourceId"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                          >
                            <option v-for="resource in filteredResources" :key="resource.id" :value="resource.id">
                              {{ resource.name }}
                            </option>
                          </select>
                        </div>
                      </div>
  
                      <div>
                        <label for="booking-purpose" class="block text-sm font-medium leading-6 text-gray-900">
                          Purpose
                        </label>
                        <div class="mt-2">
                          <input
                            type="text"
                            id="booking-purpose"
                            v-model="newBooking.purpose"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                            placeholder="Enter booking purpose"
                          />
                        </div>
                      </div>
  
                      <div>
                        <label for="booking-requester" class="block text-sm font-medium leading-6 text-gray-900">
                          Requester
                        </label>
                        <div class="mt-2">
                          <select
                            id="booking-requester"
                            v-model="newBooking.requesterId"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                          >
                            <option v-for="requester in requesters" :key="requester.id" :value="requester.id">
                              {{ requester.name }}
                            </option>
                          </select>
                        </div>
                      </div>
  
                      <div>
                        <label for="booking-date" class="block text-sm font-medium leading-6 text-gray-900">
                          Date
                        </label>
                        <div class="mt-2">
                          <input
                            type="date"
                            id="booking-date"
                            v-model="newBooking.date"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
  
                      <div class="grid grid-cols-2 gap-4">
                        <div>
                          <label for="booking-start-time" class="block text-sm font-medium leading-6 text-gray-900">
                            Start Time
                          </label>
                          <div class="mt-2">
                            <input
                              type="time"
                              id="booking-start-time"
                              v-model="newBooking.startTime"
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div>
                          <label for="booking-end-time" class="block text-sm font-medium leading-6 text-gray-900">
                            End Time
                          </label>
                          <div class="mt-2">
                            <input
                              type="time"
                              id="booking-end-time"
                              v-model="newBooking.endTime"
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
  
                      <div>
                        <label for="booking-notes" class="block text-sm font-medium leading-6 text-gray-900">
                          Notes
                        </label>
                        <div class="mt-2">
                          <textarea
                            id="booking-notes"
                            v-model="newBooking.notes"
                            rows="3"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                            placeholder="Enter any additional notes"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <div class="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      @click="isCreateModalOpen = false"
                      class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      @click="createBooking"
                      class="inline-flex justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    >
                      Create
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
  
      <!-- Booking Details Modal -->
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
                      {{ selectedBooking?.title }}
                    </DialogTitle>
                    <button
                      type="button"
                      @click="isDetailsModalOpen = false"
                      class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    >
                      <span class="sr-only">Close</span>
                      <X class="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div class="mt-4">
                    <div class="bg-emerald-50 p-4 rounded-lg mb-4">
                      <div class="flex justify-between">
                        <div>
                          <span class="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                            {{ selectedBooking ? getTypeName(selectedBooking.type) : '' }}
                          </span>
                          <span :class="[
                            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ml-2',
                            selectedBooking?.status === 'approved' ? 'bg-green-100 text-green-800' :
                            selectedBooking?.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            selectedBooking?.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          ]">
                            {{ selectedBooking?.status }}
                          </span>
                        </div>
                      </div>
                      <p class="mt-2 text-sm text-gray-600">{{ selectedBooking?.purpose }}</p>
                    </div>
  
                    <div class="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 class="text-sm font-medium text-gray-500">Date & Time</h4>
                        <p class="mt-1 text-sm text-gray-900">
                          {{ selectedBooking ? formatDateShort(selectedBooking.date) : '' }} | {{ selectedBooking?.time }}
                        </p>
                      </div>
                      <div>
                        <h4 class="text-sm font-medium text-gray-500">Requester</h4>
                        <p class="mt-1 text-sm text-gray-900">{{ selectedBooking?.requester }}</p>
                      </div>
                    </div>
  
                    <div class="border-t border-gray-200 pt-4">
                      <h4 class="text-sm font-medium text-gray-500 mb-2">Notes</h4>
                      <p class="text-sm text-gray-900">{{ selectedBooking?.notes || 'No additional notes provided.' }}</p>
                    </div>
  
                    <div v-if="selectedBooking?.status === 'pending'" class="border-t border-gray-200 pt-4 mt-4">
                      <h4 class="text-sm font-medium text-gray-500 mb-2">Approval</h4>
                      <div class="flex space-x-4">
                        <button
                          type="button"
                          @click="approveBooking(selectedBooking)"
                          class="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                        >
                          <CheckCircle class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                          Approve
                        </button>
                        <button
                          type="button"
                          @click="rejectBooking(selectedBooking)"
                          class="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                          <XCircle class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
  
                  <div class="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      @click="editBooking(selectedBooking)"
                      class="inline-flex justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
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
    </NuxtLayout>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue';
  import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
  import {
    Plus,
    Search,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Check,
    Building2,
    Tv,
    Car,
    MoreVertical,
    Eye,
    CheckCircle,
    XCircle,
    Edit,
    Trash2,
    CalendarX,
    X
  } from 'lucide-vue-next';
  
  const router = useRouter();
  const searchQuery = ref('');
  const selectedStatus = ref(null);
  const selectedType = ref(null);
  const isCreateModalOpen = ref(false);
  const isDetailsModalOpen = ref(false);
  const selectedBooking = ref(null);
  
  // Calendar state
  const currentDate = ref(new Date());
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Computed properties for calendar
  const currentMonthName = computed(() => {
    return currentDate.value.toLocaleString('default', { month: 'long' });
  });
  
  const currentYear = computed(() => {
    return currentDate.value.getFullYear();
  });
  
  const calendarDays = computed(() => {
    const year = currentDate.value.getFullYear();
    const month = currentDate.value.getMonth();
    
    // Get the first day of the month
    const firstDay = new Date(year, month, 1);
    // Get the last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Get the day of the week for the first day (0-6, where 0 is Sunday)
    const firstDayOfWeek = firstDay.getDay();
    
    // Calculate days from previous month to show
    const daysFromPrevMonth = firstDayOfWeek;
    
    // Calculate total days to show (previous month days + current month days)
    const totalDays = daysFromPrevMonth + lastDay.getDate();
    
    // Calculate rows needed (ceil to ensure we have enough rows)
    const rows = Math.ceil(totalDays / 7);
    
    // Calculate total cells needed
    const totalCells = rows * 7;
    
    // Generate calendar days
    const days = [];
    
    // Add days from previous month
    const prevMonth = new Date(year, month, 0);
    const prevMonthDays = prevMonth.getDate();
    
    for (let i = 0; i < daysFromPrevMonth; i++) {
      const day = prevMonthDays - daysFromPrevMonth + i + 1;
      days.push({
        date: new Date(year, month - 1, day),
        isCurrentMonth: false,
        isToday: false,
        events: getEventsForDate(new Date(year, month - 1, day))
      });
    }
    
    // Add days from current month
    const today = new Date();
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        isCurrentMonth: true,
        isToday: 
          date.getDate() === today.getDate() && 
          date.getMonth() === today.getMonth() && 
          date.getFullYear() === today.getFullYear(),
        events: getEventsForDate(date)
      });
    }
    
    // Add days from next month
    const remainingCells = totalCells - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        isToday: false,
        events: getEventsForDate(new Date(year, month + 1, i))
      });
    }
    
    return days;
  });
  
  // Statuses
  const statuses = [
    { id: 'approved', name: 'Approved' },
    { id: 'pending', name: 'Pending' },
    { id: 'rejected', name: 'Rejected' },
    { id: 'cancelled', name: 'Cancelled' }
  ];
  
  // Resource types
  const resourceTypes = [
    { id: 'hall', name: 'Hall/Room' },
    { id: 'equipment', name: 'Equipment' },
    { id: 'vehicle', name: 'Vehicle' }
  ];
  
  // Resources
  const resources = [
    { id: 1, type: 'hall', name: 'Main Sanctuary' },
    { id: 2, type: 'hall', name: 'Fellowship Hall' },
    { id: 3, type: 'hall', name: 'Conference Room' },
    { id: 4, type: 'hall', name: 'Youth Room' },
    { id: 5, type: 'equipment', name: 'Sound System' },
    { id: 6, type: 'equipment', name: 'Projector' },
    { id: 7, type: 'equipment', name: 'Microphones (Set of 4)' },
    { id: 8, type: 'equipment', name: 'Video Camera' },
    { id: 9, type: 'vehicle', name: 'Church Van' },
    { id: 10, type: 'vehicle', name: 'Pastor\'s Car' }
  ];
  
  // Requesters
  const requesters = [
    { id: 1, name: 'Youth Ministry' },
    { id: 2, name: 'Worship Team' },
    { id: 3, name: 'Women\'s Ministry' },
    { id: 4, name: 'Men\'s Fellowship' },
    { id: 5, name: 'Outreach Team' },
    { id: 6, name: 'Sunday School' }
  ];
  
  // Bookings
  const bookings = [
    {
      id: 1,
      type: 'hall',
      resourceId: 1,
      title: 'Main Sanctuary',
      purpose: 'Youth Service',
      requester: 'Youth Ministry',
      requesterId: 1,
      date: '2024-03-15',
      time: '6:00 PM - 8:00 PM',
      startTime: '18:00',
      endTime: '20:00',
      status: 'approved',
      notes: 'Need full sound system and projector setup.'
    },
    {
      id: 2,
      type: 'equipment',
      resourceId: 5,
      title: 'Sound System',
      purpose: 'Worship Practice',
      requester: 'Worship Team',
      requesterId: 2,
      date: '2024-03-12',
      time: '7:00 PM - 9:00 PM',
      startTime: '19:00',
      endTime: '21:00',
      status: 'pending',
      notes: 'Will need access to all microphones and mixer.'
    },
    {
      id: 3,
      type: 'vehicle',
      resourceId: 9,
      title: 'Church Van',
      purpose: 'Community Outreach',
      requester: 'Outreach Team',
      requesterId: 5,
      date: '2024-03-18',
      time: '9:00 AM - 3:00 PM',
      startTime: '09:00',
      endTime: '15:00',
      status: 'approved',
      notes: 'Will need full tank of gas. Estimated mileage: 50 miles.'
    },
    {
      id: 4,
      type: 'hall',
      resourceId: 2,
      title: 'Fellowship Hall',
      purpose: 'Women\'s Breakfast',
      requester: 'Women\'s Ministry',
      requesterId: 3,
      date: '2024-03-20',
      time: '8:00 AM - 11:00 AM',
      startTime: '08:00',
      endTime: '11:00',
      status: 'pending',
      notes: 'Will need tables and chairs set up for approximately 30 people.'
    },
    {
      id: 5,
      type: 'hall',
      resourceId: 4,
      title: 'Youth Room',
      purpose: 'Bible Study',
      requester: 'Youth Ministry',
      requesterId: 1,
      date: '2024-03-14',
      time: '7:00 PM - 8:30 PM',
      startTime: '19:00',
      endTime: '20:30',
      status: 'approved',
      notes: 'Will need whiteboard and markers.'
    },
    {
      id: 6,
      type: 'equipment',
      resourceId: 6,
      title: 'Projector',
      purpose: 'Sunday School',
      requester: 'Sunday School',
      requesterId: 6,
      date: '2024-03-17',
      time: '9:00 AM - 10:30 AM',
      startTime: '09:00',
      endTime: '10:30',
      status: 'approved',
      notes: 'Will need HDMI adapter for laptop.'
    }
  ];
  
  // New booking form data
  const newBooking = ref({
    type: 'hall',
    resourceId: 1,
    purpose: '',
    requesterId: 1,
    date: '',
    startTime: '',
    endTime: '',
    notes: ''
  });
  
  // Filtered resources based on selected type
  const filteredResources = computed(() => {
    return resources.filter(resource => resource.type === newBooking.value.type);
  });
  
  // Filtered bookings
  const filteredBookings = computed(() => {
    return bookings.filter(booking => {
      // Filter by search query
      if (searchQuery.value && !booking.title.toLowerCase().includes(searchQuery.value.toLowerCase()) && 
          !booking.requester.toLowerCase().includes(searchQuery.value.toLowerCase())) {
        return false;
      }
      
      // Filter by status
      if (selectedStatus.value && booking.status !== selectedStatus.value) {
        return false;
      }
      
      // Filter by type
      if (selectedType.value && booking.type !== selectedType.value) {
        return false;
      }
      
      return true;
    });
  });
  
  // Helper functions
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };
  
  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  const getBookingIcon = (type: string) => {
    switch (type) {
      case 'hall':
        return Building2;
      case 'equipment':
        return Tv;
      case 'vehicle':
        return Car;
      default:
        return Building2;
    }
  };
  
  const getTypeName = (type: string) => {
    switch (type) {
      case 'hall':
        return 'Hall/Room';
      case 'equipment':
        return 'Equipment';
      case 'vehicle':
        return 'Vehicle';
      default:
        return type;
    }
  };
  
  const getEventsForDate = (date: Date) => {
    const dateString = formatDate(date);
    return bookings.filter(booking => booking.date === dateString);
  };
  
  // Calendar navigation
  const previousMonth = () => {
    const year = currentDate.value.getFullYear();
    const month = currentDate.value.getMonth();
    currentDate.value = new Date(year, month - 1, 1);
  };
  
  const nextMonth = () => {
    const year = currentDate.value.getFullYear();
    const month = currentDate.value.getMonth();
    currentDate.value = new Date(year, month + 1, 1);
  };
  
  // Action functions
  const clearFilters = () => {
    searchQuery.value = '';
    selectedStatus.value = null;
    selectedType.value = null;
  };
  
  const openCreateBookingModal = () => {
    const today = new Date();
    newBooking.value = {
      type: 'hall',
      resourceId: 1,
      purpose: '',
      requesterId: 1,
      date: formatDate(today),
      startTime: '09:00',
      endTime: '10:00',
      notes: ''
    };
    isCreateModalOpen.value = true;
  };
  
  const createBooking = () => {
    // In a real app, this would create the booking on the server
    const resource = resources.find(r => r.id === newBooking.value.resourceId);
    const requester = requesters.find(r => r.id === newBooking.value.requesterId);
    
    const newBookingData = {
      id: bookings.length + 1,
      type: newBooking.value.type,
      resourceId: newBooking.value.resourceId,
      title: resource?.name || '',
      purpose: newBooking.value.purpose,
      requester: requester?.name || '',
      requesterId: newBooking.value.requesterId,
      date: newBooking.value.date,
      time: `${newBooking.value.startTime} - ${newBooking.value.endTime}`,
      startTime: newBooking.value.startTime,
      endTime: newBooking.value.endTime,
      status: 'pending',
      notes: newBooking.value.notes
    };
    
    bookings.unshift(newBookingData);
    isCreateModalOpen.value = false;
    
    // Show success message (in a real app)
    alert('Booking request submitted successfully!');
  };
  
  const viewBookingDetails = (booking: any) => {
    selectedBooking.value = booking;
    isDetailsModalOpen.value = true;
  };
  
  const approveBooking = (booking: any) => {
    booking.status = 'approved';
    if (isDetailsModalOpen.value) {
      selectedBooking.value = { ...booking };
      setTimeout(() => {
        isDetailsModalOpen.value = false;
      }, 1000);
    }
    alert('Booking approved successfully!');
  };
  
  const rejectBooking = (booking: any) => {
    booking.status = 'rejected';
    if (isDetailsModalOpen.value) {
      selectedBooking.value = { ...booking };
      setTimeout(() => {
        isDetailsModalOpen.value = false;
      }, 1000);
    }
    alert('Booking rejected!');
  };
  
  const editBooking = (booking: any) => {
    // In a real app, this would open an edit form
    alert(`Editing booking for ${booking.title}...`);
    if (isDetailsModalOpen.value) {
      isDetailsModalOpen.value = false;
    }
  };
  
  const cancelBooking = (booking: any) => {
    if (confirm(`Are you sure you want to cancel the booking for ${booking.title}?`)) {
      booking.status = 'cancelled';
      alert('Booking cancelled successfully!');
    }
  };

  definePageMeta({
    layout: 'dashboard'
})
  
  // Initialize with today's date
  onMounted(() => {
    currentDate.value = new Date();
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