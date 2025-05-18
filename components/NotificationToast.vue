<template>
    <Transition name="notification">
      <div 
        v-if="notifications.length > 0"
        class="fixed top-4 right-4 z-50 max-w-md space-y-2"
      >
        <TransitionGroup name="notification-item">
          <div 
            v-for="notification in notifications" 
            :key="notification.id"
            :class="[
              'p-4 rounded-md shadow-lg transform transition-all duration-300 ease-in-out',
              getNotificationClass(notification.type)
            ]"
          >
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <Icon 
                  :name="getNotificationIcon(notification.type)" 
                  class="h-5 w-5" 
                />
              </div>
              <div class="ml-3 w-0 flex-1">
                <p class="text-sm font-medium">{{ notification.title }}</p>
                <p class="mt-1 text-sm">{{ notification.message }}</p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button 
                  @click="removeNotification(notification.id)"
                  class="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 rounded-md"
                >
                  <span class="sr-only">Close</span>
                  <Icon name="heroicons:x-mark" class="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </Transition>
  </template>
  
  <script setup lang="ts">
  interface Notification {
    id: number;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    timestamp: string;
  }
  
  const notifications = useState<Notification[]>('notifications', () => [])
  
  const getNotificationClass = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 text-green-800';
      case 'warning':
        return 'bg-yellow-50 text-yellow-800';
      case 'error':
        return 'bg-red-50 text-red-800';
      default:
        return 'bg-blue-50 text-blue-800';
    }
  }
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return 'heroicons:check-circle';
      case 'warning':
        return 'heroicons:exclamation-triangle';
      case 'error':
        return 'heroicons:x-circle';
      default:
        return 'heroicons:information-circle';
    }
  }
  
  const removeNotification = (id: number) => {
    notifications.value = notifications.value.filter(n => n.id !== id)
  }
  </script>
  
  <style scoped>
  .notification-enter-active,
  .notification-leave-active {
    transition: all 0.5s ease;
  }
  .notification-enter-from,
  .notification-leave-to {
    opacity: 0;
    transform: translateY(-30px);
  }
  
  .notification-item-enter-active,
  .notification-item-leave-active {
    transition: all 0.3s ease;
  }
  .notification-item-enter-from {
    opacity: 0;
    transform: scale(0.9) translateY(-10px);
  }
  .notification-item-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  </style>
  
  