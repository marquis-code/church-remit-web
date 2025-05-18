<template>
    <div class="space-y-8">
      <!-- Page Header -->
      <div class="bg-white rounded-xl shadow-md p-6 appear-animation">
        <h2 class="text-2xl font-bold text-gray-900">Email & SMS Alerts</h2>
        <p class="mt-2 text-gray-600">
          Configure your email and SMS notification preferences for donations, payments, and payroll.
        </p>
      </div>
      
      <!-- Alert Types Tabs -->
      <div class="bg-white rounded-xl shadow-md appear-animation" style="animation-delay: 100ms">
        <div class="border-b border-gray-200">
          <nav class="flex -mb-px">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'py-4 px-6 font-medium text-sm focus:outline-none transition-colors duration-200',
                activeTab === tab.id 
                  ? 'border-b-2 border-emerald-500 text-emerald-600' 
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              <div class="flex items-center">
                <Icon :name="tab.icon" class="h-5 w-5 mr-2" />
                {{ tab.label }}
              </div>
            </button>
          </nav>
        </div>
        
        <!-- Tab Content -->
        <div class="p-6">
          <Transition name="fade" mode="out-in">
            <div v-if="activeTab === 'donations'" key="donations">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Donation Alerts</h3>
              
              <div class="space-y-4">
                <div v-for="(alert, index) in donationAlerts" :key="index" 
                     class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 class="text-sm font-medium text-gray-900">{{ alert.title }}</h4>
                    <p class="text-sm text-gray-500">{{ alert.description }}</p>
                  </div>
                  <div class="flex items-center space-x-4">
                    <!-- Email toggle -->
                    <div class="flex items-center">
                      <input 
                        :id="`donation-email-${index}`" 
                        v-model="alert.email" 
                        type="checkbox" 
                        class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      >
                      <label :for="`donation-email-${index}`" class="ml-2 text-sm text-gray-700">
                        Email
                      </label>
                    </div>
                    
                    <!-- SMS toggle -->
                    <div class="flex items-center">
                      <input 
                        :id="`donation-sms-${index}`" 
                        v-model="alert.sms" 
                        type="checkbox" 
                        class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      >
                      <label :for="`donation-sms-${index}`" class="ml-2 text-sm text-gray-700">
                        SMS
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="mt-6">
                <button 
                  @click="saveAlertSettings('donations')"
                  class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  Save Preferences
                </button>
              </div>
            </div>
            
            <div v-else-if="activeTab === 'payments'" key="payments">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Payment Notifications</h3>
              
              <div class="space-y-4">
                <div v-for="(alert, index) in paymentAlerts" :key="index" 
                     class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 class="text-sm font-medium text-gray-900">{{ alert.title }}</h4>
                    <p class="text-sm text-gray-500">{{ alert.description }}</p>
                  </div>
                  <div class="flex items-center space-x-4">
                    <!-- Email toggle -->
                    <div class="flex items-center">
                      <input 
                        :id="`payment-email-${index}`" 
                        v-model="alert.email" 
                        type="checkbox" 
                        class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      >
                      <label :for="`payment-email-${index}`" class="ml-2 text-sm text-gray-700">
                        Email
                      </label>
                    </div>
                    
                    <!-- SMS toggle -->
                    <div class="flex items-center">
                      <input 
                        :id="`payment-sms-${index}`" 
                        v-model="alert.sms" 
                        type="checkbox" 
                        class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      >
                      <label :for="`payment-sms-${index}`" class="ml-2 text-sm text-gray-700">
                        SMS
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="mt-6">
                <button 
                  @click="saveAlertSettings('payments')"
                  class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  Save Preferences
                </button>
              </div>
            </div>
            
            <div v-else-if="activeTab === 'payroll'" key="payroll">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Payroll Alerts</h3>
              
              <div class="space-y-4">
                <div v-for="(alert, index) in payrollAlerts" :key="index" 
                     class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 class="text-sm font-medium text-gray-900">{{ alert.title }}</h4>
                    <p class="text-sm text-gray-500">{{ alert.description }}</p>
                  </div>
                  <div class="flex items-center space-x-4">
                    <!-- Email toggle -->
                    <div class="flex items-center">
                      <input 
                        :id="`payroll-email-${index}`" 
                        v-model="alert.email" 
                        type="checkbox" 
                        class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      >
                      <label :for="`payroll-email-${index}`" class="ml-2 text-sm text-gray-700">
                        Email
                      </label>
                    </div>
                    
                    <!-- SMS toggle -->
                    <div class="flex items-center">
                      <input 
                        :id="`payroll-sms-${index}`" 
                        v-model="alert.sms" 
                        type="checkbox" 
                        class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      >
                      <label :for="`payroll-sms-${index}`" class="ml-2 text-sm text-gray-700">
                        SMS
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="mt-6">
                <button 
                  @click="saveAlertSettings('payroll')"
                  class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>
      
      <!-- Contact Information -->
      <div class="bg-white rounded-xl shadow-md p-6 appear-animation" style="animation-delay: 200ms">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
        <p class="text-sm text-gray-500 mb-4">
          Update your contact information to ensure you receive notifications.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input 
              v-model="contactInfo.email"
              type="email" 
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="john.doe@example.com" 
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input 
              v-model="contactInfo.phone"
              type="tel" 
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="+1 (555) 123-4567" 
            />
          </div>
        </div>
        
        <div class="mt-6">
          <button 
            @click="saveContactInfo"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Update Contact Information
          </button>
        </div>
      </div>
      
      <!-- Schedule Section -->
      <div class="bg-white rounded-xl shadow-md p-6 appear-animation" style="animation-delay: 300ms">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Notification Schedule</h3>
        
        <div class="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 class="text-sm font-medium text-gray-900 mb-2">Quiet Hours</h4>
          <p class="text-sm text-gray-500 mb-4">
            Set a time range when you don't want to receive SMS notifications.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <input 
                v-model="quietHours.start"
                type="time" 
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <input 
                v-model="quietHours.end"
                type="time" 
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg">
          <h4 class="text-sm font-medium text-gray-900 mb-2">Daily Digest</h4>
          <p class="text-sm text-gray-500 mb-4">
            Receive a daily summary of all notifications at your preferred time.
          </p>
          
          <div class="flex items-center mb-4">
            <input 
              v-model="dailyDigest.enabled"
              id="digest-toggle" 
              type="checkbox" 
              class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            >
            <label for="digest-toggle" class="ml-2 text-sm font-medium text-gray-700">
              Enable Daily Digest
            </label>
          </div>
          
          <div v-if="dailyDigest.enabled" class="max-w-xs">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Delivery Time
            </label>
            <input 
              v-model="dailyDigest.time"
              type="time" 
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>
        
        <div class="mt-6">
          <button 
            @click="saveScheduleSettings"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Save Schedule
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  interface Alert {
    title: string;
    description: string;
    email: boolean;
    sms: boolean;
  }
  
  interface ContactInfo {
    email: string;
    phone: string;
  }
  
  interface QuietHours {
    start: string;
    end: string;
  }
  
  interface DailyDigest {
    enabled: boolean;
    time: string;
  }
  
  // Tab configuration
  const tabs = [
    { id: 'donations', label: 'Donations', icon: 'heroicons:gift' },
    { id: 'payments', label: 'Payments', icon: 'heroicons:credit-card' },
    { id: 'payroll', label: 'Payroll', icon: 'heroicons:banknotes' }
  ]
  
  const activeTab = ref('donations')
  
  // Alert settings for each tab
  const donationAlerts = ref<Alert[]>([
    {
      title: 'New Donation Received',
      description: 'Get notified when someone makes a new donation',
      email: true,
      sms: true
    },
    {
      title: 'Monthly Donation Summary',
      description: 'Receive a monthly summary of all donations',
      email: true,
      sms: false
    },
    {
      title: 'Donation Campaign Goals',
      description: 'Alerts when donation campaigns reach milestones',
      email: true,
      sms: false
    }
  ])
  
  const paymentAlerts = ref<Alert[]>([
    {
      title: 'Payment Confirmation',
      description: 'Get notified when a payment is successfully processed',
      email: true,
      sms: true
    },
    {
      title: 'Payment Failure',
      description: 'Receive alerts when payments fail to process',
      email: true,
      sms: true
    },
    {
      title: 'Payment Refund',
      description: 'Get notified when a payment is refunded',
      email: true,
      sms: false
    }
  ])
  
  const payrollAlerts = ref<Alert[]>([
    {
      title: 'Payroll Processing',
      description: 'Get notified when payroll processing begins',
      email: true,
      sms: false
    },
    {
      title: 'Payroll Completion',
      description: 'Receive alerts when payroll processing is complete',
      email: true,
      sms: true
    },
    {
      title: 'Tax Forms',
      description: 'Get notified when tax forms are available',
      email: true,
      sms: false
    }
  ])
  
  // Contact information
  const contactInfo = ref<ContactInfo>({
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567'
  })
  
  // Quiet hours
  const quietHours = ref<QuietHours>({
    start: '22:00',
    end: '07:00'
  })
  
  // Daily digest
  const dailyDigest = ref<DailyDigest>({
    enabled: true,
    time: '09:00'
  })
  
  // Handler for saving alert settings
  const saveAlertSettings = (type: string) => {
    // In a real app, we would call an API endpoint here
    const notifications = useState('notifications')
    
    notifications.value = [
      {
        id: Date.now(),
        title: 'Settings Saved',
        message: `Your ${type} notification preferences have been updated.`,
        type: 'success',
        timestamp: new Date().toISOString()
      },
      ...notifications.value
    ]
    
    // Simulate removing notification after 3 seconds
    setTimeout(() => {
      if (notifications.value.length > 0) {
        notifications.value.pop()
      }
    }, 3000)
  }
  
  // Handler for saving contact information
  const saveContactInfo = () => {
    // In a real app, we would call an API endpoint here
    const notifications = useState('notifications')
    
    notifications.value = [
      {
        id: Date.now(),
        title: 'Contact Information Updated',
        message: 'Your contact information has been successfully updated.',
        type: 'success',
        timestamp: new Date().toISOString()
      },
      ...notifications.value
    ]
    
    // Simulate removing notification after 3 seconds
    setTimeout(() => {
      if (notifications.value.length > 0) {
        notifications.value.pop()
      }
    }, 3000)
  }
  
  // Handler for saving schedule settings
  const saveScheduleSettings = () => {
    // In a real app, we would call an API endpoint here
    const notifications = useState('notifications')
    
    notifications.value = [
      {
        id: Date.now(),
        title: 'Schedule Settings Saved',
        message: 'Your notification schedule preferences have been updated.',
        type: 'success',
        timestamp: new Date().toISOString()
      },
      ...notifications.value
    ]
    
    // Simulate removing notification after 3 seconds
    setTimeout(() => {
      if (notifications.value.length > 0) {
        notifications.value.pop()
      }
    }, 3000)
  }

  definePageMeta({
    layout: 'dashboard'
})
  </script>
  
  