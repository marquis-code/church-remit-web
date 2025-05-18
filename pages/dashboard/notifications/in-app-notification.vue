<template>
    <div class="space-y-8">
      <!-- Page Header -->
      <div class="bg-white rounded-xl shadow-md p-6 appear-animation">
        <h2 class="text-2xl font-bold text-gray-900">In-app Notifications</h2>
        <p class="mt-2 text-gray-600">
          Manage system-generated alerts for pending approvals and fund transfers.
        </p>
      </div>
      
      <!-- Active Notifications -->
      <div class="bg-white rounded-xl shadow-md p-6 appear-animation" style="animation-delay: 100ms">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-medium text-gray-900">Active Notifications</h3>
          
          <div class="flex items-center">
            <div class="relative">
              <select 
                v-model="filter"
                class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md"
              >
                <option value="all">All Notifications</option>
                <option value="approvals">Pending Approvals</option>
                <option value="transfers">Fund Transfers</option>
                <option value="system">System Updates</option>
              </select>
            </div>
            
            <button 
              @click="markAllAsRead"
              class="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              <Icon name="heroicons:check" class="h-4 w-4 mr-1" />
              Mark All Read
            </button>
          </div>
        </div>
        
        <TransitionGroup 
          name="list" 
          tag="ul" 
          class="divide-y divide-gray-200"
        >
          <li 
            v-for="notification in filteredNotifications" 
            :key="notification.id"
            :class="[
              'py-4 flex items-start transition-colors duration-300',
              notification.read ? 'opacity-60' : '',
              'hover:bg-gray-50 px-4 -mx-4 rounded-md'
            ]"
          >
            <div 
              :class="[
                'flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center',
                getNotificationTypeClass(notification.type)
              ]"
            >
              <Icon :name="getNotificationTypeIcon(notification.type)" class="h-4 w-4 text-white" />
            </div>
            
            <div class="ml-4 flex-1">
              <div class="flex items-center justify-between">
                <p 
                  :class="[
                    'text-sm',
                    notification.read ? 'font-normal text-gray-600' : 'font-semibold text-gray-900'
                  ]"
                >
                  {{ notification.title }}
                </p>
                <span class="text-xs text-gray-500">{{ notification.time }}</span>
              </div>
              <p class="mt-1 text-sm text-gray-600">{{ notification.message }}</p>
              
              <div class="mt-2 flex items-center space-x-4">
                <button 
                  v-if="notification.actionable"
                  @click="handleNotificationAction(notification)"
                  class="inline-flex items-center text-xs font-medium text-emerald-600 hover:text-emerald-800"
                >
                  <Icon name="heroicons:arrow-top-right-on-square" class="h-4 w-4 mr-1" />
                  {{ notification.actionText || 'View Details' }}
                </button>
                
                <button 
                  @click="toggleNotificationRead(notification)"
                  class="inline-flex items-center text-xs font-medium text-gray-600 hover:text-gray-800"
                >
                  <Icon 
                    :name="notification.read ? 'heroicons:envelope' : 'heroicons:envelope-open'" 
                    class="h-4 w-4 mr-1" 
                  />
                  {{ notification.read ? 'Mark as Unread' : 'Mark as Read' }}
                </button>
                
                <button 
                  @click="dismissNotification(notification.id)"
                  class="inline-flex items-center text-xs font-medium text-gray-600 hover:text-gray-800"
                >
                  <Icon name="heroicons:trash" class="h-4 w-4 mr-1" />
                  Dismiss
                </button>
              </div>
            </div>
          </li>
          
          <li v-if="filteredNotifications.length === 0" key="empty" class="py-8 text-center">
            <div class="mx-auto flex flex-col items-center">
              <div class="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Icon name="heroicons:bell-slash" class="h-6 w-6 text-gray-400" />
              </div>
              <h3 class="text-sm font-medium text-gray-900">No notifications</h3>
              <p class="mt-1 text-sm text-gray-500">
                You have no unread notifications at the moment.
              </p>
            </div>
          </li>
        </TransitionGroup>
        
        <div v-if="filteredNotifications.length > 0" class="mt-6 flex justify-center">
          <nav class="inline-flex space-x-1 shadow-sm" aria-label="Pagination">
            <button
              class="px-2 py-1 text-sm rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
            >
              Previous
            </button>
            <span
              class="px-2 py-1 text-sm rounded-md border border-emerald-500 bg-emerald-50 text-emerald-600"
            >
              1
            </span>
            <button
              class="px-2 py-1 text-sm rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
            >
              2
            </button>
            <button
              class="px-2 py-1 text-sm rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
            >
              3
            </button>
            <button
              class="px-2 py-1 text-sm rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
      
      <!-- Notification Preferences -->
      <div class="bg-white rounded-xl shadow-md p-6 appear-animation" style="animation-delay: 200ms">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
        
        <div class="space-y-4">
          <div class="p-4 bg-gray-50 rounded-lg">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Pending Approvals</h4>
                <p class="text-sm text-gray-500">Notifications for items that require your approval</p>
              </div>
              <div class="flex items-center">
                <button 
                  @click="preferences.approvals = !preferences.approvals"
                  :class="[
                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500',
                    preferences.approvals ? 'bg-emerald-600' : 'bg-gray-200'
                  ]"
                >
                  <span 
                    :class="[
                      'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                      preferences.approvals ? 'translate-x-5' : 'translate-x-0'
                    ]"
                  ></span>
                </button>
              </div>
            </div>
          </div>
          
          <div class="p-4 bg-gray-50 rounded-lg">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Fund Transfers</h4>
                <p class="text-sm text-gray-500">Notifications for remittances and fund transfers</p>
              </div>
              <div class="flex items-center">
                <button 
                  @click="preferences.transfers = !preferences.transfers"
                  :class="[
                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500',
                    preferences.transfers ? 'bg-emerald-600' : 'bg-gray-200'
                  ]"
                >
                  <span 
                    :class="[
                      'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                      preferences.transfers ? 'translate-x-5' : 'translate-x-0'
                    ]"
                  ></span>
                </button>
              </div>
            </div>
          </div>
          
          <div class="p-4 bg-gray-50 rounded-lg">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">System Updates</h4>
                <p class="text-sm text-gray-500">Notifications for system maintenance and updates</p>
              </div>
              <div class="flex items-center">
                <button 
                  @click="preferences.system = !preferences.system"
                  :class="[
                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500',
                    preferences.system ? 'bg-emerald-600' : 'bg-gray-200'
                  ]"
                >
                  <span 
                    :class="[
                      'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                      preferences.system ? 'translate-x-5' : 'translate-x-0'
                    ]"
                  ></span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Display Options -->
        <div class="mt-6">
          <h4 class="text-sm font-medium text-gray-900 mb-4">Display Options</h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex items-center">
              <input 
                id="notification-sound" 
                v-model="displayOptions.sound"
                type="checkbox" 
                class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              >
              <label for="notification-sound" class="ml-2 text-sm text-gray-700">
                Play sound for new notifications
              </label>
            </div>
            
            <div class="flex items-center">
              <input 
                id="notification-badge" 
                v-model="displayOptions.badge"
                type="checkbox" 
                class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              >
              <label for="notification-badge" class="ml-2 text-sm text-gray-700">
                Show notification badge count
              </label>
            </div>
            
            <div class="flex items-center">
              <input 
                id="notification-preview" 
                v-model="displayOptions.preview"
                type="checkbox" 
                class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              >
              <label for="notification-preview" class="ml-2 text-sm text-gray-700">
                Show notification previews
              </label>
            </div>
            
            <div class="flex items-center">
              <input 
                id="notification-desktop" 
                v-model="displayOptions.desktop"
                type="checkbox" 
                class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              >
              <label for="notification-desktop" class="ml-2 text-sm text-gray-700">
                Allow desktop notifications
              </label>
            </div>
          </div>
        </div>
        
        <div class="mt-6">
          <button 
            @click="savePreferences"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Save Preferences
          </button>
        </div>
      </div>
      
      <!-- Approval Modal -->
      <Teleport to="body">
        <Transition name="modal">
          <div v-if="showModal" class="fixed inset-0 overflow-y-auto z-50">
            <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div class="fixed inset-0 transition-opacity" aria-hidden="true" @click="showModal = false">
                <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              
              <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              
              <div 
                class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              >
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    <div 
                      class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 sm:mx-0 sm:h-10 sm:w-10"
                    >
                      <Icon name="heroicons:check-circle" class="h-6 w-6 text-emerald-600" />
                    </div>
                    
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        {{ selectedNotification?.title || 'Approve Request' }}
                      </h3>
                      <div class="mt-2">
                        <p class="text-sm text-gray-500">
                          {{ selectedNotification?.message || 'Are you sure you want to approve this request?' }}
                        </p>
                        
                        <div class="mt-4 bg-gray-50 p-4 rounded-lg">
                          <h4 class="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2">
                            Details
                          </h4>
                          <div class="space-y-2">
                            <div class="flex justify-between">
                              <span class="text-sm text-gray-500">Request ID:</span>
                              <span class="text-sm font-medium text-gray-900">REQ-{{ Math.floor(Math.random() * 10000) }}</span>
                            </div>
                            <div class="flex justify-between">
                              <span class="text-sm text-gray-500">Submitted by:</span>
                              <span class="text-sm font-medium text-gray-900">Jane Smith</span>
                            </div>
                            <div class="flex justify-between">
                              <span class="text-sm text-gray-500">Date:</span>
                              <span class="text-sm font-medium text-gray-900">{{ new Date().toLocaleDateString() }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button 
                    @click="approveRequest"
                    type="button" 
                    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Approve
                  </button>
                  <button 
                    @click="showModal = false"
                    type="button" 
                    class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>
    </div>
  </template>
  
  <script setup lang="ts">
  interface Notification {
    id: number;
    title: string;
    message: string;
    type: 'approval' | 'transfer' | 'system';
    time: string;
    read: boolean;
    actionable: boolean;
    actionText?: string;
  }
  
  interface Preferences {
    approvals: boolean;
    transfers: boolean;
    system: boolean;
  }
  
  interface DisplayOptions {
    sound: boolean;
    badge: boolean;
    preview: boolean;
    desktop: boolean;
  }
  
  // Filter for the notifications list
  const filter = ref('all')
  
  // Notification preferences
  const preferences = ref<Preferences>({
    approvals: true,
    transfers: true,
    system: true
  })
  
  // Display options
  const displayOptions = ref<DisplayOptions>({
    sound: true,
    badge: true,
    preview: true,
    desktop: false
  })
  
  // Dummy notifications data
  const notifications = ref<Notification[]>([
    {
      id: 1,
      title: 'Donation Approval Required',
      message: 'A donation of $5,000 requires your approval before processing.',
      type: 'approval',
      time: '10 minutes ago',
      read: false,
      actionable: true,
      actionText: 'Approve Donation'
    },
    {
      id: 2,
      title: 'Fund Transfer Completed',
      message: 'Transfer of $2,500 to Account #12345 has been completed successfully.',
      type: 'transfer',
      time: '1 hour ago',
      read: false,
      actionable: true,
      actionText: 'View Transfer'
    },
    {
      id: 3,
      title: 'System Maintenance Scheduled',
      message: 'The system will be down for maintenance on Saturday, March 15 from 2:00 AM to 4:00 AM.',
      type: 'system',
      time: '2 hours ago',
      read: true,
      actionable: false
    },
    {
      id: 4,
      title: 'Expense Report Approval',
      message: 'An expense report from Jane Smith needs your approval.',
      type: 'approval',
      time: '3 hours ago',
      read: false,
      actionable: true,
      actionText: 'Review Report'
    },
    {
      id: 5,
      title: 'Payroll Processing Started',
      message: 'Monthly payroll processing has started and will be completed in 24 hours.',
      type: 'system',
      time: '5 hours ago',
      read: true,
      actionable: false
    },
    {
      id: 6,
      title: 'New Fund Transfer Request',
      message: 'You have a new fund transfer request for $1,800 from Marketing Department.',
      type: 'transfer',
      time: '1 day ago',
      read: true,
      actionable: true,
      actionText: 'Process Transfer'
    }
  ])
  
  // Filtered notifications based on the selected filter
  const filteredNotifications = computed(() => {
    if (filter.value === 'all') {
      return notifications.value
    }
    
    const typeMap: Record<string, string> = {
      'approvals': 'approval',
      'transfers': 'transfer',
      'system': 'system'
    }
    
    return notifications.value.filter(n => n.type === typeMap[filter.value])
  })
  
  // Modal state
  const showModal = ref(false)
  const selectedNotification = ref<Notification | null>(null)
  
  // Get class based on notification type
  const getNotificationTypeClass = (type: string) => {
    switch (type) {
      case 'approval':
        return 'bg-amber-500'
      case 'transfer':
        return 'bg-emerald-500'
      case 'system':
        return 'bg-blue-500'
      default:
        return 'bg-gray-500'
    }
  }
  
  // Get icon based on notification type
  const getNotificationTypeIcon = (type: string) => {
    switch (type) {
      case 'approval':
        return 'heroicons:check-circle'
      case 'transfer':
        return 'heroicons:banknotes'
      case 'system':
        return 'heroicons:cog-6-tooth'
      default:
        return 'heroicons:bell'
    }
  }
  
  // Toggle read status of a notification
  const toggleNotificationRead = (notification: Notification) => {
    notification.read = !notification.read
  }
  
  // Mark all notifications as read
  const markAllAsRead = () => {
    notifications.value = notifications.value.map(n => ({
      ...n,
      read: true
    }))
  }
  
  // Dismiss a notification
  const dismissNotification = (id: number) => {
    notifications.value = notifications.value.filter(n => n.id !== id)
  }
  
  // Handle notification action
  const handleNotificationAction = (notification: Notification) => {
    selectedNotification.value = notification
    showModal.value = true
  }
  
  // Approve a request from the modal
  const approveRequest = () => {
    if (selectedNotification.value) {
      // Mark as read
      selectedNotification.value.read = true
      
      // Dismiss the notification
      dismissNotification(selectedNotification.value.id)
      
      // Show success toast
      const globalNotifications = useState('notifications')
      globalNotifications.value = [
        {
          id: Date.now(),
          title: 'Request Approved',
          message: 'The request has been successfully approved.',
          type: 'success',
          timestamp: new Date().toISOString()
        },
        ...globalNotifications.value
      ]
      
      // Close modal
      showModal.value = false
      selectedNotification.value = null
    }
  }
  
  // Save notification preferences
  const savePreferences = () => {
    // In a real app, we would call an API endpoint here
    const globalNotifications = useState('notifications')
    
    globalNotifications.value = [
      {
        id: Date.now(),
        title: 'Preferences Saved',
        message: 'Your notification preferences have been updated.',
        type: 'success',
        timestamp: new Date().toISOString()
      },
      ...globalNotifications.value
    ]
    
    // Simulate removing notification after 3 seconds
    setTimeout(() => {
      if (globalNotifications.value.length > 0) {
        globalNotifications.value.pop()
      }
    }, 3000)
  }

  definePageMeta({
    layout: 'dashboard'
})
  </script>
  
  <style scoped>
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }
  .list-enter-from {
    opacity: 0;
    transform: translateX(-30px);
  }
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  
  .modal-enter-active,
  .modal-leave-active {
    transition: all 0.3s ease;
  }
  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
    transform: scale(0.9);
  }
  </style>
  
  