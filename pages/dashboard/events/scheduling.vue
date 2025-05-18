<template>
  <main>
    <div class="space-y-6 animate-fade-in">
      <!-- Page header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 class="text-2xl font-bold leading-7 text-gray-900">Event Scheduling</h2>
          <p class="mt-1 text-sm text-gray-500">Create and manage church services, programs, and special events</p>
        </div>
        <div class="mt-4 flex flex-col sm:flex-row sm:space-x-3 md:mt-0">
          <button
            type="button"
            @click="showCreateEventModal = true"
            class="inline-flex items-center justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
          >
            <CalendarPlus class="mr-2 h-4 w-4" />
            Create Event
          </button>

          <button
            type="button"
            @click="showAssignmentModal = true"
            class="mt-3 inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0"
          >
            <Users class="mr-2 h-4 w-4 text-gray-500" />
            Assign Volunteers
          </button>
        </div>
      </div>

      <!-- View toggle and filters -->
      <div class="bg-white shadow rounded-lg p-4 animate-fade-in animation-delay-100">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div class="flex space-x-2">
            <button
              @click="viewMode = 'calendar'"
              :class="[
                'inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold',
                viewMode === 'calendar' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
              ]"
            >
              <Calendar class="mr-2 h-4 w-4" />
              Calendar
            </button>
            <button
              @click="viewMode = 'list'"
              :class="[
                'inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold',
                viewMode === 'list' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
              ]"
            >
              <List class="mr-2 h-4 w-4" />
              List
            </button>
          </div>
          
          <div class="mt-4 sm:mt-0 flex flex-col sm:flex-row sm:space-x-3">
            <div class="relative">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search class="h-4 w-4 text-gray-400" />
              </div>
              <input
                v-model="searchQuery"
                type="text"
                class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                placeholder="Search events"
              />
            </div>
            
            <select
              v-model="filterType"
              class="mt-3 sm:mt-0 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-purple-600 sm:text-sm sm:leading-6"
            >
              <option value="">All Event Types</option>
              <option value="service">Services</option>
              <option value="program">Programs</option>
              <option value="special">Special Events</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Calendar View -->
      <div v-if="viewMode === 'calendar'" class="bg-white shadow rounded-lg overflow-hidden animate-fade-in animation-delay-200">
        <div class="p-4 border-b border-gray-200 flex items-center justify-between">
          <div class="flex items-center">
            <button
              @click="prevMonth"
              class="p-1 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft class="h-5 w-5 text-gray-500" />
            </button>
            <h2 class="mx-4 text-lg font-semibold text-gray-900">{{ currentMonthName }} {{ currentYear }}</h2>
            <button
              @click="nextMonth"
              class="p-1 rounded-full hover:bg-gray-100"
            >
              <ChevronRight class="h-5 w-5 text-gray-500" />
            </button>
          </div>
          <button
            @click="resetToCurrentMonth"
            class="text-sm text-purple-600 hover:text-purple-500"
          >
            Today
          </button>
        </div>
        
        <!-- Calendar grid -->
        <div class="grid grid-cols-7 gap-px bg-gray-200">
          <!-- Day headers -->
          <div v-for="day in weekDays" :key="day" class="bg-gray-50 py-2 text-center text-xs font-semibold text-gray-700">
            {{ day }}
          </div>
          
          <!-- Calendar days -->
          <div 
            v-for="(day, index) in calendarDays" 
            :key="index"
            :class="[
              'min-h-[120px] p-2 bg-white',
              day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-500',
              day.isToday ? 'bg-purple-50' : '',
              'hover:bg-purple-50 transition-colors duration-200'
            ]"
            @click="selectDay(day)"
          >
            <div class="flex justify-between">
              <span 
                :class="[
                  'text-sm font-medium',
                  day.isToday ? 'bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''
                ]"
              >
                {{ day.date }}
              </span>
              <button 
                v-if="day.isCurrentMonth"
                @click.stop="quickAddEvent(day)"
                class="text-gray-400 hover:text-purple-600"
              >
                <Plus class="h-4 w-4" />
              </button>
            </div>
            
            <!-- Events for this day -->
            <div class="mt-1 space-y-1 max-h-[80px] overflow-y-auto">
              <div 
                v-for="event in day.events" 
                :key="event.id"
                :class="[
                  'px-2 py-1 text-xs rounded-md truncate cursor-pointer',
                  event.type === 'service' ? 'bg-purple-100 text-purple-800' :
                  event.type === 'program' ? 'bg-green-100 text-green-800' :
                  'bg-blue-100 text-blue-800'
                ]"
                @click.stop="viewEventDetails(event)"
              >
                {{ event.time }} - {{ event.name }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- List View -->
      <div v-if="viewMode === 'list'" class="animate-fade-in animation-delay-200">
        <!-- Mobile: Event cards -->
        <div class="block sm:hidden space-y-4">
          <div
            v-for="event in filteredEvents"
            :key="event.id"
            class="bg-white shadow rounded-lg overflow-hidden"
          >
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <span class="inline-flex h-10 w-10 items-center justify-center rounded-full" :class="[
                    event.type === 'service' ? 'bg-purple-100' : 
                    event.type === 'special' ? 'bg-blue-100' : 
                    'bg-green-100'
                  ]">
                    <component 
                      :is="event.type === 'service' ? Church : 
                          event.type === 'special' ? Star : 
                          Users" 
                      class="h-5 w-5" 
                      :class="[
                        event.type === 'service' ? 'text-purple-600' : 
                        event.type === 'special' ? 'text-blue-600' : 
                        'text-green-600'
                      ]"
                    />
                  </span>
                </div>
                <div class="ml-4 flex-1">
                  <div class="flex items-center justify-between">
                    <h3 class="text-lg font-medium text-gray-900">{{ event.name }}</h3>
                    <span
                      :class="[
                        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                        event.type === 'service' ? 'bg-purple-100 text-purple-800' :
                        event.type === 'special' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      ]"
                    >
                      {{ event.type }}
                    </span>
                  </div>
                  <div class="mt-1 flex items-center text-sm text-gray-500">
                    <Calendar class="mr-1 h-4 w-4 text-gray-400" />
                    {{ event.date }} at {{ event.time }}
                  </div>
                  <div class="mt-1 flex items-center text-sm text-gray-500">
                    <MapPin class="mr-1 h-4 w-4 text-gray-400" />
                    {{ event.location }}
                  </div>
                  <div class="mt-1 flex items-center text-sm text-gray-500">
                    <Users class="mr-1 h-4 w-4 text-gray-400" />
                    {{ event.rsvpCount }} RSVPs
                  </div>
                </div>
              </div>
              <div class="mt-4 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  @click="viewEventDetails(event)"
                  class="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <Eye class="mr-2 h-4 w-4 text-gray-500" />
                  View
                </button>
                <button
                  type="button"
                  @click="editEvent(event)"
                  class="inline-flex justify-center rounded-md bg-purple-50 px-3 py-2 text-sm font-semibold text-purple-600 shadow-sm hover:bg-purple-100"
                >
                  <Edit class="mr-2 h-4 w-4" />
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Desktop: Event table -->
        <div class="hidden sm:block bg-white shadow rounded-lg overflow-hidden">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Event</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date & Time</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Location</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">RSVPs</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr 
                v-for="event in filteredEvents" 
                :key="event.id"
                class="hover:bg-gray-50 transition-colors duration-150"
              >
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                  <div class="flex items-center">
                    <div class="h-10 w-10 flex-shrink-0">
                      <span class="inline-flex h-10 w-10 items-center justify-center rounded-full" :class="[
                        event.type === 'service' ? 'bg-purple-100' : 
                        event.type === 'special' ? 'bg-blue-100' : 
                        'bg-green-100'
                      ]">
                        <component 
                          :is="event.type === 'service' ? Church : 
                              event.type === 'special' ? Star : 
                              Users" 
                          class="h-5 w-5" 
                          :class="[
                            event.type === 'service' ? 'text-purple-600' : 
                            event.type === 'special' ? 'text-blue-600' : 
                            'text-green-600'
                          ]"
                        />
                      </span>
                    </div>
                    <div class="ml-4">
                      <div class="font-medium text-gray-900">{{ event.name }}</div>
                      <div v-if="event.description" class="text-gray-500 truncate max-w-xs">{{ event.description }}</div>
                    </div>
                  </div>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <div class="flex items-center">
                    <Calendar class="mr-1 h-4 w-4 text-gray-400" />
                    {{ event.date }} at {{ event.time }}
                  </div>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <div class="flex items-center">
                    <MapPin class="mr-1 h-4 w-4 text-gray-400" />
                    {{ event.location }}
                  </div>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <div class="flex items-center">
                    <Users class="mr-1 h-4 w-4 text-gray-400" />
                    {{ event.rsvpCount }} RSVPs
                  </div>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <span
                    :class="[
                      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                      event.type === 'service' ? 'bg-purple-100 text-purple-800' :
                      event.type === 'special' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    ]"
                  >
                    {{ event.type }}
                  </span>
                </td>
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <div class="flex items-center justify-end space-x-2">
                    <button
                      type="button"
                      @click="viewEventDetails(event)"
                      class="text-gray-500 hover:text-gray-700"
                      title="View details"
                    >
                      <Eye class="h-5 w-5" />
                      <span class="sr-only">View details</span>
                    </button>
                    <button
                      type="button"
                      @click="editEvent(event)"
                      class="text-purple-600 hover:text-purple-900"
                      title="Edit event"
                    >
                      <Edit class="h-5 w-5" />
                      <span class="sr-only">Edit</span>
                    </button>
                    <button
                      type="button"
                      @click="confirmDeleteEvent(event)"
                      class="text-red-600 hover:text-red-900"
                      title="Delete event"
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
                  Showing <span class="font-medium">{{ Math.min(1, filteredEvents.length) }}</span> to <span class="font-medium">{{ Math.min(filteredEvents.length, 10) }}</span> of <span class="font-medium">{{ filteredEvents.length }}</span> events
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

      <!-- Create Event Modal -->
      <div v-if="showCreateEventModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-10">
        <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto animate-fade-in">
          <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium leading-6 text-gray-900">{{ editingEvent ? 'Edit Event' : 'Create New Event' }}</h3>
              <button
                type="button"
                @click="closeCreateEventModal"
                class="rounded-md bg-white text-gray-400 hover:text-gray-500"
              >
                <span class="sr-only">Close</span>
                <X class="h-6 w-6" />
              </button>
            </div>
          </div>
          <form @submit.prevent="saveEvent">
            <div class="px-4 py-5 sm:p-6 space-y-4">
              <div>
                <label for="event-name" class="block text-sm font-medium text-gray-700">Event Name</label>
                <input
                  type="text"
                  id="event-name"
                  v-model="eventForm.name"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  placeholder="Enter event name"
                  required
                />
              </div>
              
              <div>
                <label for="event-type" class="block text-sm font-medium text-gray-700">Event Type</label>
                <select
                  id="event-type"
                  v-model="eventForm.type"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  required
                >
                  <option value="service">Service</option>
                  <option value="program">Program</option>
                  <option value="special">Special Event</option>
                </select>
              </div>
              
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label for="event-date" class="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    id="event-date"
                    v-model="eventForm.date"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label for="event-time" class="block text-sm font-medium text-gray-700">Time</label>
                  <input
                    type="time"
                    id="event-time"
                    v-model="eventForm.time"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label for="event-location" class="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  id="event-location"
                  v-model="eventForm.location"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  placeholder="Enter location"
                  required
                />
              </div>
              
              <div>
                <label for="event-description" class="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  id="event-description"
                  v-model="eventForm.description"
                  rows="3"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  placeholder="Enter event description"
                ></textarea>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700">Enable RSVP</label>
                <div class="mt-1 flex items-center">
                  <input
                    type="checkbox"
                    id="event-rsvp"
                    v-model="eventForm.enableRSVP"
                    class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <label for="event-rsvp" class="ml-2 block text-sm text-gray-900">Allow attendees to RSVP for this event</label>
                </div>
              </div>
              
              <div v-if="eventForm.enableRSVP">
                <label for="event-capacity" class="block text-sm font-medium text-gray-700">Capacity (optional)</label>
                <input
                  type="number"
                  id="event-capacity"
                  v-model="eventForm.capacity"
                  min="1"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  placeholder="Maximum number of attendees"
                />
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6 border-t border-gray-200">
              <button
                type="button"
                @click="closeCreateEventModal"
                class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 mr-3"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="inline-flex justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                {{ editingEvent ? 'Update Event' : 'Create Event' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Event Details Modal -->
      <div v-if="showEventDetailsModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-10">
        <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto animate-fade-in">
          <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Event Details</h3>
              <button
                type="button"
                @click="showEventDetailsModal = false"
                class="rounded-md bg-white text-gray-400 hover:text-gray-500"
              >
                <span class="sr-only">Close</span>
                <X class="h-6 w-6" />
              </button>
            </div>
          </div>
          <div class="px-4 py-5 sm:p-6" v-if="selectedEvent">
            <div class="flex items-center mb-6">
              <span class="inline-flex h-12 w-12 items-center justify-center rounded-full" :class="[
                selectedEvent.type === 'service' ? 'bg-purple-100' : 
                selectedEvent.type === 'special' ? 'bg-blue-100' : 
                'bg-green-100'
              ]">
                <component 
                  :is="selectedEvent.type === 'service' ? Church : 
                      selectedEvent.type === 'special' ? Star : 
                      Users" 
                  class="h-6 w-6" 
                  :class="[
                    selectedEvent.type === 'service' ? 'text-purple-600' : 
                    selectedEvent.type === 'special' ? 'text-blue-600' : 
                    'text-green-600'
                  ]"
                />
              </span>
              <div class="ml-4">
                <h2 class="text-xl font-bold text-gray-900">{{ selectedEvent.name }}</h2>
                <span
                  :class="[
                    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                    selectedEvent.type === 'service' ? 'bg-purple-100 text-purple-800' :
                    selectedEvent.type === 'special' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  ]"
                >
                  {{ selectedEvent.type }}
                </span>
              </div>
            </div>

            <dl class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Date & Time</dt>
                <dd class="mt-1 text-sm text-gray-900 flex items-center">
                  <Calendar class="mr-1 h-4 w-4 text-gray-400" />
                  {{ selectedEvent.date }} at {{ selectedEvent.time }}
                <!-- </d  /> -->
                  {{ selectedEvent.date }} at {{ selectedEvent.time }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Location</dt>
                <dd class="mt-1 text-sm text-gray-900 flex items-center">
                  <MapPin class="mr-1 h-4 w-4 text-gray-400" />
                  {{ selectedEvent.location }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">RSVPs</dt>
                <dd class="mt-1 text-sm text-gray-900 flex items-center">
                  <Users class="mr-1 h-4 w-4 text-gray-400" />
                  {{ selectedEvent.rsvpCount }} RSVPs
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Capacity</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ selectedEvent.capacity ? selectedEvent.capacity : 'Unlimited' }}
                </dd>
              </div>
              <div class="sm:col-span-2">
                <dt class="text-sm font-medium text-gray-500">Description</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ selectedEvent.description || 'No description provided.' }}
                </dd>
              </div>
            </dl>

            <div class="mt-6 border-t border-gray-200 pt-4">
              <h4 class="text-sm font-medium text-gray-500">Assigned Team Members</h4>
              <div class="mt-2 flow-root">
                <ul role="list" class="divide-y divide-gray-200">
                  <li v-for="person in selectedEvent.assignedPeople" :key="person.id" class="py-3 flex">
                    <img :src="person.avatar" alt="" class="h-10 w-10 rounded-full" />
                    <div class="ml-3">
                      <p class="text-sm font-medium text-gray-900">{{ person.name }}</p>
                      <p class="text-sm text-gray-500">{{ person.role }}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div v-if="selectedEvent.enableRSVP" class="mt-6 border-t border-gray-200 pt-4">
              <div class="flex items-center justify-between">
                <h4 class="text-sm font-medium text-gray-500">RSVP Status</h4>
                <button
                  type="button"
                  class="text-sm font-medium text-purple-600 hover:text-purple-500"
                  @click="showRSVPList = !showRSVPList"
                >
                  {{ showRSVPList ? 'Hide List' : 'Show List' }}
                </button>
              </div>
              <div class="mt-2">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-sm font-medium text-gray-700">RSVP Progress</span>
                  <span class="text-sm font-medium text-gray-700">
                    {{ selectedEvent.rsvpCount }} / {{ selectedEvent.capacity || '∞' }}
                  </span>
                </div>
                <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-purple-600 rounded-full"
                    :style="{ width: `${selectedEvent.capacity ? (selectedEvent.rsvpCount / selectedEvent.capacity * 100) : 50}%` }"
                  ></div>
                </div>
              </div>
              <div v-if="showRSVPList" class="mt-4 max-h-40 overflow-y-auto">
                <ul role="list" class="divide-y divide-gray-200">
                  <li v-for="(rsvp, index) in selectedEvent.rsvpList" :key="index" class="py-2 flex items-center justify-between">
                    <div class="flex items-center">
                      <div class="text-sm text-gray-900">{{ rsvp.name }}</div>
                      <div class="ml-2 text-xs text-gray-500">{{ rsvp.email }}</div>
                    </div>
                    <div class="text-xs text-gray-500">{{ rsvp.date }}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 flex justify-end space-x-3 sm:px-6 border-t border-gray-200">
            <button
              type="button"
              @click="editEvent(selectedEvent)"
              class="inline-flex justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            >
              <Edit class="mr-2 h-4 w-4" />
              Edit Event
            </button>
            <button
              type="button"
              @click="showAssignmentModal = true"
              class="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <Users class="mr-2 h-4 w-4 text-gray-500" />
              Assign People
            </button>
          </div>
        </div>
      </div>

      <!-- Assignment Modal -->
      <div v-if="showAssignmentModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-10">
        <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto animate-fade-in">
          <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Assign People to Event</h3>
              <button
                type="button"
                @click="showAssignmentModal = false"
                class="rounded-md bg-white text-gray-400 hover:text-gray-500"
              >
                <span class="sr-only">Close</span>
                <X class="h-6 w-6" />
              </button>
            </div>
          </div>
          <div class="px-4 py-5 sm:p-6">
            <div class="mb-4">
              <label for="event-select" class="block text-sm font-medium text-gray-700">Select Event</label>
              <select
                id="event-select"
                v-model="assignmentForm.eventId"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                required
              >
                <option value="">Select an event</option>
                <option v-for="event in events" :key="event.id" :value="event.id">
                  {{ event.name }} ({{ event.date }})
                </option>
              </select>
            </div>
            
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">Assign People</label>
              <div class="mt-2 space-y-2 max-h-60 overflow-y-auto">
                <div v-for="person in people" :key="person.id" class="flex items-center">
                  <input
                    type="checkbox"
                    :id="`person-${person.id}`"
                    :value="person.id"
                    v-model="assignmentForm.selectedPeople"
                    class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <label :for="`person-${person.id}`" class="ml-3 flex items-center">
                    <img :src="person.avatar" alt="" class="h-8 w-8 rounded-full mr-2" />
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ person.name }}</div>
                      <div class="text-xs text-gray-500">{{ person.role }}</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            
            <div class="mb-4">
              <label for="assignment-notes" class="block text-sm font-medium text-gray-700">Notes (Optional)</label>
              <textarea
                id="assignment-notes"
                v-model="assignmentForm.notes"
                rows="3"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                placeholder="Add any special instructions or notes"
              ></textarea>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6 border-t border-gray-200">
            <button
              type="button"
              @click="showAssignmentModal = false"
              class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 mr-3"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="saveAssignments"
              class="inline-flex justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              :disabled="!assignmentForm.eventId || assignmentForm.selectedPeople.length === 0"
            >
              Save Assignments
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
                <h3 class="text-base font-semibold leading-6 text-gray-900">Delete Event</h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Are you sure you want to delete this event? This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
            <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                @click="deleteEvent"
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
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from '#app';
import {
  Calendar,
  CalendarPlus,
  Users,
  Search,
  List,
  ChevronLeft,
  ChevronRight,
  Plus,
  Eye,
  Edit,
  Trash2,
  X,
  MapPin,
  Church,
  Star,
  AlertTriangle
} from 'lucide-vue-next';

// Define types for better TypeScript support
interface Person {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

interface RSVP {
  name: string;
  email: string;
  date: string;
}

interface Event {
  id: number;
  name: string;
  type: 'service' | 'program' | 'special';
  date: string;
  time: string;
  location: string;
  description: string;
  enableRSVP: boolean;
  capacity: number | null;
  rsvpCount: number;
  rsvpList: RSVP[];
  assignedPeople: Person[];
}

interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  fullDate: string;
  events: {
    id: number;
    name: string;
    time: string;
    type: string;
  }[];
}

interface AssignmentForm {
  eventId: string | number;
  selectedPeople: number[];
  notes: string;
}

interface EventForm {
  id: number;
  name: string;
  type: 'service' | 'program' | 'special';
  date: string;
  time: string;
  location: string;
  description: string;
  enableRSVP: boolean;
  capacity: number | null;
  rsvpCount: number;
  rsvpList: RSVP[];
}

const router = useRouter();

// View mode state
const viewMode = ref<'calendar' | 'list'>('calendar');
const searchQuery = ref('');
const filterType = ref<'' | 'service' | 'program' | 'special'>('');

// Calendar state
const currentDate = ref(new Date());
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const showRSVPList = ref(false);

// Modal states
const showCreateEventModal = ref(false);
const showEventDetailsModal = ref(false);
const showAssignmentModal = ref(false);
const showDeleteModal = ref(false);
const editingEvent = ref(false);
const selectedEventId = ref<number | null>(null);

// Form states
const eventForm = ref<EventForm>({
  id: 0,
  name: '',
  type: 'service',
  date: '',
  time: '',
  location: '',
  description: '',
  enableRSVP: true,
  capacity: null,
  rsvpCount: 0,
  rsvpList: []
});

const assignmentForm = ref<AssignmentForm>({
  eventId: '',
  selectedPeople: [],
  notes: ''
});

// Dummy data for events
const events = ref<Event[]>([
  {
    id: 1,
    name: 'Sunday Morning Service',
    type: 'service',
    date: '2025-03-15',
    time: '09:00',
    location: 'Main Sanctuary',
    description: 'Regular Sunday morning worship service with praise and sermon.',
    enableRSVP: true,
    capacity: 200,
    rsvpCount: 120,
    rsvpList: [
      { name: 'John Smith', email: 'john@example.com', date: 'Mar 10, 2025' },
      { name: 'Sarah Johnson', email: 'sarah@example.com', date: 'Mar 11, 2025' }
    ],
    assignedPeople: [
      { id: 1, name: 'Pastor David Wilson', role: 'Speaker', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
      { id: 2, name: 'Rachel Adams', role: 'Worship Leader', avatar: 'https://randomuser.me/api/portraits/women/6.jpg' }
    ]
  },
  {
    id: 2,
    name: 'Easter Special Service',
    type: 'special',
    date: '2025-03-31',
    time: '10:00',
    location: 'Main Sanctuary',
    description: 'Special Easter celebration service with choir performance and communion.',
    enableRSVP: true,
    capacity: 300,
    rsvpCount: 250,
    rsvpList: [
      { name: 'Michael Brown', email: 'michael@example.com', date: 'Mar 15, 2025' },
      { name: 'Emily Davis', email: 'emily@example.com', date: 'Mar 16, 2025' }
    ],
    assignedPeople: [
      { id: 1, name: 'Pastor David Wilson', role: 'Speaker', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
      { id: 3, name: 'James Lee', role: 'Choir Director', avatar: 'https://randomuser.me/api/portraits/men/7.jpg' }
    ]
  },
  {
    id: 3,
    name: 'Youth Conference',
    type: 'program',
    date: '2025-04-05',
    time: '14:00',
    location: 'Fellowship Hall',
    description: 'Annual youth conference with guest speakers, workshops, and activities.',
    enableRSVP: true,
    capacity: 100,
    rsvpCount: 85,
    rsvpList: [
      { name: 'Lisa Chen', email: 'lisa@example.com', date: 'Mar 20, 2025' },
      { name: 'Kevin Wang', email: 'kevin@example.com', date: 'Mar 21, 2025' }
    ],
    assignedPeople: [
      { id: 4, name: 'Sarah Johnson', role: 'Youth Pastor', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
      { id: 5, name: 'Michael Brown', role: 'Volunteer Coordinator', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' }
    ]
  },
  {
    id: 4,
    name: 'Wednesday Bible Study',
    type: 'service',
    date: '2025-03-13',
    time: '19:00',
    location: 'Room 101',
    description: 'Midweek Bible study focusing on the Book of Romans.',
    enableRSVP: true,
    capacity: 50,
    rsvpCount: 45,
    rsvpList: [
      { name: 'David Wilson', email: 'david@example.com', date: 'Mar 10, 2025' },
      { name: 'Rachel Adams', email: 'rachel@example.com', date: 'Mar 11, 2025' }
    ],
    assignedPeople: [
      { id: 6, name: 'John Smith', role: 'Teacher', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' }
    ]
  },
  {
    id: 5,
    name: 'Prayer Meeting',
    type: 'service',
    date: '2025-03-14',
    time: '06:30',
    location: 'Prayer Room',
    description: 'Morning prayer meeting for church needs and community concerns.',
    enableRSVP: false,
    capacity: null,
    rsvpCount: 0,
    rsvpList: [],
    assignedPeople: [
      { id: 7, name: 'Emily Davis', role: 'Prayer Coordinator', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' }
    ]
  }
]);

// Dummy data for people
const people = ref<Person[]>([
  { id: 1, name: 'Pastor David Wilson', role: 'Senior Pastor', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
  { id: 2, name: 'Rachel Adams', role: 'Worship Leader', avatar: 'https://randomuser.me/api/portraits/women/6.jpg' },
  { id: 3, name: 'James Lee', role: 'Choir Director', avatar: 'https://randomuser.me/api/portraits/men/7.jpg' },
  { id: 4, name: 'Sarah Johnson', role: 'Youth Pastor', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: 5, name: 'Michael Brown', role: 'Volunteer Coordinator', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { id: 6, name: 'John Smith', role: 'Elder', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: 7, name: 'Emily Davis', role: 'Prayer Coordinator', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
  { id: 8, name: 'Lisa Chen', role: 'Children\'s Ministry', avatar: 'https://randomuser.me/api/portraits/women/8.jpg' }
]);

// Computed properties
const currentMonthName = computed(() => {
  return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate.value);
});

const currentYear = computed(() => {
  return currentDate.value.getFullYear();
});

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  
  // First day of the month
  const firstDay = new Date(year, month, 1);
  // Last day of the month
  const lastDay = new Date(year, month + 1, 0);
  
  // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
  const firstDayOfWeek = firstDay.getDay();
  
  // Calculate days from previous month to show
  const daysFromPrevMonth = firstDayOfWeek;
  
  // Calculate total days to show (previous month + current month + next month)
  const totalDays = daysFromPrevMonth + lastDay.getDate();
  // Ensure we have complete weeks (7 days each)
  const totalCalendarDays = Math.ceil(totalDays / 7) * 7;
  
  const calendarDays: CalendarDay[] = [];
  
  // Add days from previous month
  const prevMonth = new Date(year, month, 0);
  const prevMonthLastDay = prevMonth.getDate();
  
  for (let i = 0; i < daysFromPrevMonth; i++) {
    const day = prevMonthLastDay - daysFromPrevMonth + i + 1;
    const date = new Date(year, month - 1, day);
    
    calendarDays.push({
      date: day,
      isCurrentMonth: false,
      isToday: isSameDay(date, new Date()),
      fullDate: formatDate(date),
      events: getEventsForDate(date)
    });
  }
  
  // Add days from current month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(year, month, i);
    
    calendarDays.push({
      date: i,
      isCurrentMonth: true,
      isToday: isSameDay(date, new Date()),
      fullDate: formatDate(date),
      events: getEventsForDate(date)
    });
  }
  
  // Add days from next month
  const remainingDays = totalCalendarDays - calendarDays.length;
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(year, month + 1, i);
    
    calendarDays.push({
      date: i,
      isCurrentMonth: false,
      isToday: isSameDay(date, new Date()),
      fullDate: formatDate(date),
      events: getEventsForDate(date)
    });
  }
  
  return calendarDays;
});

const filteredEvents = computed(() => {
  let result = [...events.value];
  
  // Apply search filter
  if (searchQuery.value) {
    const search = searchQuery.value.toLowerCase();
    result = result.filter(
      e => e.name.toLowerCase().includes(search) ||
           e.description?.toLowerCase().includes(search) ||
           e.location.toLowerCase().includes(search)
    );
  }
  
  // Apply type filter
  if (filterType.value) {
    result = result.filter(e => e.type === filterType.value);
  }
  
  return result;
});

const selectedEvent = computed(() => {
  if (selectedEventId.value === null) return null;
  return events.value.find(e => e.id === selectedEventId.value) || null;
});

// Methods
const prevMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1);
};

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1);
};

const resetToCurrentMonth = () => {
  currentDate.value = new Date();
};

const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.getDate() === date2.getDate() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getFullYear() === date2.getFullYear();
};

const getEventsForDate = (date: Date) => {
  const formattedDate = formatDate(date);
  return events.value
    .filter(event => event.date === formattedDate)
    .map(event => ({
      id: event.id,
      name: event.name,
      time: event.time,
      type: event.type
    }));
};

const selectDay = (day: CalendarDay) => {
  // Could be used to show events for a specific day
  console.log('Selected day:', day);
};

const quickAddEvent = (day: CalendarDay) => {
  resetEventForm();
  eventForm.value.date = day.fullDate;
  showCreateEventModal.value = true;
};

const viewEventDetails = (event: { id: number }) => {
  selectedEventId.value = event.id;
  showEventDetailsModal.value = true;
};

const editEvent = (event: { id: number }) => {
  selectedEventId.value = event.id;
  const eventToEdit = events.value.find(e => e.id === event.id);
  
  if (eventToEdit) {
    eventForm.value = { ...eventToEdit };
    editingEvent.value = true;
    showCreateEventModal.value = true;
    showEventDetailsModal.value = false;
  }
};

const confirmDeleteEvent = (event: { id: number }) => {
  selectedEventId.value = event.id;
  showDeleteModal.value = true;
};

const deleteEvent = () => {
  if (selectedEventId.value !== null) {
    events.value = events.value.filter(e => e.id !== selectedEventId.value);
    showDeleteModal.value = false;
    selectedEventId.value = null;
  }
};

const resetEventForm = () => {
  eventForm.value = {
    id: 0,
    name: '',
    type: 'service',
    date: '',
    time: '',
    location: '',
    description: '',
    enableRSVP: true,
    capacity: null,
    rsvpCount: 0,
    rsvpList: []
  };
  editingEvent.value = false;
};

const closeCreateEventModal = () => {
  showCreateEventModal.value = false;
  resetEventForm();
};

const saveEvent = () => {
  if (editingEvent.value) {
    // Update existing event
    const index = events.value.findIndex(e => e.id === eventForm.value.id);
    if (index !== -1) {
      events.value[index] = { 
        ...eventForm.value,
        assignedPeople: events.value[index].assignedPeople 
      } as Event;
    }
  } else {
    // Create new event
    const newId = Math.max(0, ...events.value.map(e => e.id)) + 1;
    events.value.push({
      ...eventForm.value,
      id: newId,
      assignedPeople: []
    } as Event);
  }
  
  showCreateEventModal.value = false;
  resetEventForm();
};

const saveAssignments = () => {
  if (!assignmentForm.value.eventId) return;
  
  const eventId = typeof assignmentForm.value.eventId === 'string' 
    ? parseInt(assignmentForm.value.eventId) 
    : assignmentForm.value.eventId;
    
  const eventIndex = events.value.findIndex(e => e.id === eventId);
  
  if (eventIndex === -1) return;
  
  // Get the selected people
  const selectedPeopleDetails = people.value.filter(p => 
    assignmentForm.value.selectedPeople.includes(p.id)
  );
  
  // Update the event's assigned people
  events.value[eventIndex].assignedPeople = selectedPeopleDetails;
  
  // Reset form and close modal
  assignmentForm.value = {
    eventId: '',
    selectedPeople: [],
    notes: ''
  };
  
  showAssignmentModal.value = false;
};

// Initialize with today's date for the event form
onMounted(() => {
  const today = new Date();
  eventForm.value.date = formatDate(today);
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
</style>