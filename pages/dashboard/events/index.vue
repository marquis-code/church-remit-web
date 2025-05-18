<template>
    <div>
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex-1 min-w-0">
          <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Event & Service Management</h2>
        </div>
        <div class="mt-4 flex md:mt-0 md:ml-4">
          <button @click="showAddEventModal = true" type="button" class="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Create Event
          </button>
        </div>
      </div>
  
      <!-- Event Calendar -->
      <div class="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">Event Calendar</h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">View and manage upcoming church events and services.</p>
          </div>
          <div class="flex space-x-2">
            <button @click="prevMonth" class="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
            <span class="text-lg font-medium">{{ currentMonthName }} {{ currentYear }}</span>
            <button @click="nextMonth" class="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        <div class="border-t border-gray-200">
          <div class="grid grid-cols-7 gap-px bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700">
            <div class="bg-white py-2">Sun</div>
            <div class="bg-white py-2">Mon</div>
            <div class="bg-white py-2">Tue</div>
            <div class="bg-white py-2">Wed</div>
            <div class="bg-white py-2">Thu</div>
            <div class="bg-white py-2">Fri</div>
            <div class="bg-white py-2">Sat</div>
          </div>
          <div class="grid grid-cols-7 gap-px bg-gray-200">
            <template v-for="(day, index) in calendarDays" :key="index">
              <div class="bg-white px-2 py-2 h-32 overflow-y-auto" :class="{ 'bg-gray-50': !day.isCurrentMonth }">
                <div class="flex justify-between">
                  <span :class="{ 'text-gray-400': !day.isCurrentMonth, 'font-semibold': day.isToday }">{{ day.date }}</span>
                  <button v-if="day.isCurrentMonth" @click="addEventToDay(day)" class="text-indigo-600 hover:text-indigo-900">
                    <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div v-if="day.events && day.events.length > 0" class="mt-1">
                  <div v-for="(event, eventIndex) in day.events" :key="eventIndex" 
                       class="text-xs p-1 mb-1 rounded truncate" 
                       :class="getEventClass(event.type)"
                       @click="viewEventDetails(event)">
                    {{ event.title }}
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
  
      <!-- Upcoming Events List -->
      <div class="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Upcoming Events</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">Next 7 days</p>
        </div>
        <div class="border-t border-gray-200">
          <ul class="divide-y divide-gray-200">
            <li v-for="event in upcomingEvents" :key="event.id" class="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer" @click="viewEventDetails(event)">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-12 w-12 rounded-md flex items-center justify-center" :class="getEventClass(event.type)">
                    <svg v-if="event.type === 'service'" class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <svg v-else-if="event.type === 'program'" class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <svg v-else class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ event.title }}</div>
                    <div class="text-sm text-gray-500">
                      {{ formatDate(event.date) }} • {{ event.time }} • {{ event.location }}
                    </div>
                  </div>
                </div>
                <div class="flex items-center">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="getEventClass(event.type)">
                    {{ event.type.charAt(0).toUpperCase() + event.type.slice(1) }}
                  </span>
                  <button class="ml-4 text-indigo-600 hover:text-indigo-900">
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
  
      <!-- Add Event Modal -->
      <div v-if="showAddEventModal" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="showAddEventModal = false"></div>
  
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
  
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Create New Event
                  </h3>
                  <div class="mt-4 space-y-4">
                    <div>
                      <label for="event-title" class="block text-sm font-medium text-gray-700">Event Title</label>
                      <input type="text" v-model="newEvent.title" id="event-title" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label for="event-type" class="block text-sm font-medium text-gray-700">Event Type</label>
                      <select id="event-type" v-model="newEvent.type" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        <option value="service">Church Service</option>
                        <option value="program">Program</option>
                        <option value="special">Special Event</option>
                      </select>
                    </div>
                    <div>
                      <label for="event-date" class="block text-sm font-medium text-gray-700">Date</label>
                      <input type="date" v-model="newEvent.date" id="event-date" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label for="event-time" class="block text-sm font-medium text-gray-700">Time</label>
                      <input type="time" v-model="newEvent.time" id="event-time" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label for="event-location" class="block text-sm font-medium text-gray-700">Location</label>
                      <input type="text" v-model="newEvent.location" id="event-location" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label for="event-description" class="block text-sm font-medium text-gray-700">Description</label>
                      <textarea v-model="newEvent.description" id="event-description" rows="3" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="button" @click="addEvent" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                Create Event
              </button>
              <button type="button" @click="showAddEventModal = false" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  
  // Modal state
  const showAddEventModal = ref(false)
  const currentDate = ref(new Date())
  const selectedDay = ref<any>(null)

  definePageMeta({
    layout: 'dashboard'
  })
  
  // New event form data
  const newEvent = ref({
    id: '',
    title: '',
    type: 'service',
    date: '',
    time: '',
    location: '',
    description: ''
  })
  
  // Sample events data
  const events = ref([
    {
      id: '1',
      title: 'Sunday Service',
      type: 'service',
      date: '2025-03-07',
      time: '10:00 AM',
      location: 'Main Sanctuary',
      description: 'Regular Sunday worship service'
    },
    {
      id: '2',
      title: 'Prayer Meeting',
      type: 'program',
      date: '2025-03-09',
      time: '6:30 PM',
      location: 'Prayer Room',
      description: 'Weekly prayer meeting'
    },
    {
      id: '3',
      title: 'Youth Conference',
      type: 'special',
      date: '2025-03-12',
      time: '4:00 PM',
      location: 'Youth Center',
      description: 'Annual youth conference'
    },
    {
      id: '4',
      title: 'Bible Study',
      type: 'program',
      date: '2025-03-10',
      time: '7:00 PM',
      location: 'Fellowship Hall',
      description: 'Weekly Bible study session'
    },
    {
      id: '5',
      title: 'Choir Practice',
      type: 'program',
      date: '2025-03-08',
      time: '5:00 PM',
      location: 'Choir Room',
      description: 'Weekly choir rehearsal'
    }
  ])
  
  // Computed properties for calendar
  const currentMonthName = computed(() => {
    const options = { month: 'long' } as Intl.DateTimeFormatOptions
    return new Intl.DateTimeFormat('en-US', options).format(currentDate.value)
  })
  
  const currentYear = computed(() => {
    return currentDate.value.getFullYear()
  })
  
  // Calendar days generation
  const calendarDays = computed(() => {
    const year = currentDate.value.getFullYear()
    const month = currentDate.value.getMonth()
    
    // First day of the month
    const firstDay = new Date(year, month, 1)
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0)
    
    // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay()
    
    // Calculate days from previous month to show
    const daysFromPrevMonth = firstDayOfWeek
    
    // Calculate total days to show (previous month + current month + next month)
    const totalDays = 42 // 6 rows of 7 days
    
    const days = []
    
    // Add days from previous month
    const prevMonth = new Date(year, month, 0)
    const prevMonthDays = prevMonth.getDate()
    
    for (let i = prevMonthDays - daysFromPrevMonth + 1; i <= prevMonthDays; i++) {
      const date = new Date(year, month - 1, i)
      days.push({
        date: i,
        fullDate: formatDateForComparison(date),
        isCurrentMonth: false,
        isToday: isSameDay(date, new Date()),
        events: getEventsForDay(date)
      })
    }
    
    // Add days from current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i)
      days.push({
        date: i,
        fullDate: formatDateForComparison(date),
        isCurrentMonth: true,
        isToday: isSameDay(date, new Date()),
        events: getEventsForDay(date)
      })
    }
    
    // Add days from next month
    const remainingDays = totalDays - days.length
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i)
      days.push({
        date: i,
        fullDate: formatDateForComparison(date),
        isCurrentMonth: false,
        isToday: isSameDay(date, new Date()),
        events: getEventsForDay(date)
      })
    }
    
    return days
  })
  
  // Upcoming events (next 7 days)
  const upcomingEvents = computed(() => {
    const today = new Date()
    const nextWeek = new Date()
    nextWeek.setDate(today.getDate() + 7)
    
    return events.value.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate >= today && eventDate <= nextWeek
    }).sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })
  })
  
  // Helper functions
  function formatDateForComparison(date: Date): string {
    return date.toISOString().split('T')[0]
  }
  
  function isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  }
  
  function getEventsForDay(date: Date): any[] {
    const dateString = formatDateForComparison(date)
    return events.value.filter(event => event.date === dateString)
  }
  
  function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  }
  
  function getEventClass(type: string): string {
    switch (type) {
      case 'service':
        return 'bg-blue-500 text-white'
      case 'program':
        return 'bg-green-500 text-white'
      case 'special':
        return 'bg-purple-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }
  
  // Calendar navigation
  function prevMonth(): void {
    const newDate = new Date(currentDate.value)
    newDate.setMonth(newDate.getMonth() - 1)
    currentDate.value = newDate
  }
  
  function nextMonth(): void {
    const newDate = new Date(currentDate.value)
    newDate.setMonth(newDate.getMonth() + 1)
    currentDate.value = newDate
  }
  
  // Event actions
  function addEventToDay(day: any): void {
    selectedDay.value = day
    
    // Set the date in the form
    const year = currentDate.value.getFullYear()
    const month = currentDate.value.getMonth() + (day.isCurrentMonth ? 0 : day.date > 15 ? -1 : 1)
    const date = new Date(year, month, day.date)
    
    newEvent.value.date = formatDateForComparison(date)
    showAddEventModal.value = true
  }
  
  function addEvent(): void {
    if (!newEvent.value.title || !newEvent.value.date) {
      alert('Please fill in at least the title and date')
      return
    }
    
    // Create a new event with a unique ID
    const newId = Date.now().toString()
    const eventToAdd = {
      ...newEvent.value,
      id: newId
    }
    
    // Add to events array
    events.value.push(eventToAdd)
    
    // Reset form and close modal
    newEvent.value = {
      id: '',
      title: '',
      type: 'service',
      date: '',
      time: '',
      location: '',
      description: ''
    }
    
    showAddEventModal.value = false
  }

    
  definePageMeta({
    layout: 'dashboard'
  })
  
  function viewEventDetails(event: any): void {
    // In a real app, this would show event details or navigate to an event detail page
    console.log('View event details:', event)
  }
  
  // Initialize with today's date for the new event form
  onMounted(() => {
    newEvent.value.date = formatDateForComparison(new Date())
  })
  </script>