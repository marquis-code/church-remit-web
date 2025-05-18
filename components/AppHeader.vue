<!-- <template>
    <header class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white  px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <div class="flex flex-1 items-center justify-between">
        <h1 class="text-xl font-semibold text-gray-900">
          {{ pageTitle }}
        </h1>
        
        <div class="flex items-center gap-x-4 lg:gap-x-6">

          <div class="relative">
            <SearchIcon class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              class="h-10 w-full rounded-md border border-gray-300 bg-white pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            />
          </div>
  

          <button type="button" class="relative rounded-full p-1.5 text-gray-500 hover:bg-gray-100">
            <BellIcon class="h-5 w-5" />
            <span class="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">3</span>
          </button>
  

          <button 
            type="button" 
            class="rounded-full p-1.5 text-gray-500 hover:bg-gray-100"
            @click="toggleDarkMode"
          >
            <SunIcon v-if="isDarkMode" class="h-5 w-5" />
            <MoonIcon v-else class="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  </template>
  
  <script setup lang="ts">
  import { computed, ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { 
    Search as SearchIcon, 
    Bell as BellIcon,
    Sun as SunIcon,
    Moon as MoonIcon
  } from 'lucide-vue-next';
  
  const route = useRoute();
  const isDarkMode = ref(false);
  
  // Page title based on current route
  const pageTitle = computed(() => {
    const path = route.path;
    
    if (path.includes('/events/scheduling')) return 'Event Scheduling';
    if (path.includes('/events/media')) return 'Live Streaming & Media Archive';
    if (path.includes('/volunteers/assignments')) return 'Volunteer Assignments';
    if (path.includes('/volunteers/training')) return 'Workforce Training & Certification';
    if (path.includes('/facilities/booking')) return 'Facility Booking';
    if (path.includes('/facilities/assets')) return 'Asset Tracking';
    if (path.includes('/members/groups')) return 'Small Group & Discipleship Management';
    if (path.includes('/members/followups')) return 'Automated Follow-ups';
    if (path.includes('/legal/documents')) return 'Document Storage';
    if (path.includes('/legal/compliance')) return 'Regulatory Compliance Tracking';
    if (path.includes('/payments/collection')) return 'Payment Collection';
    if (path.includes('/payments/history')) return 'Payment History & Receipts';
    
    return 'Dashboard';
  });
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  };
  
  // Check for saved dark mode preference
  onMounted(() => {
    isDarkMode.value = false;
    // const savedDarkMode = localStorage.getItem('darkMode');
    // if (savedDarkMode === 'true' || 
    //     (!savedDarkMode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    //   isDarkMode.value = true;
    //   document.documentElement.classList.add('dark');
    // }
  });
  </script> -->


  <template>
    <header class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <div class="flex flex-1 items-center justify-between">
        <h1 class="text-xl font-semibold text-gray-900">
          {{ pageTitle }}
        </h1>
        
        <div class="flex items-center gap-x-4 lg:gap-x-6">
          <!-- Search -->
          <div class="relative">
            <SearchIcon class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              class="h-10 w-full rounded-md border border-gray-300 bg-white pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              @focus="openCommandPalette"
            />
          </div>
  
          <!-- Notifications -->
          <div class="relative">
            <button 
              type="button" 
              class="relative rounded-full p-1.5 text-gray-500 hover:bg-gray-100"
              @click="toggleNotifications"
            >
              <BellIcon class="h-5 w-5" />
              <span class="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">{{ unreadCount }}</span>
            </button>
  
            <!-- Notifications Dropdown -->
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div 
                v-if="showNotifications" 
                class="absolute right-0 mt-2 w-80 sm:w-96 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                @click.outside="showNotifications = false"
              >
                <div class="p-4">
                  <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-medium text-gray-900">Notifications</h3>
                    <div class="flex space-x-2">
                      <button 
                        @click="markAllAsRead"
                        class="text-xs text-purple-600 hover:text-purple-800 font-medium"
                      >
                        Mark all as read
                      </button>
                      <button 
                        @click="showNotifications = false"
                        class="text-gray-400 hover:text-gray-500"
                      >
                        <XIcon class="h-4 w-4" />
                      </button>
                    </div>
                  </div>
  
                  <div class="max-h-[60vh] overflow-y-auto">
                    <transition-group 
                      name="notification-list" 
                      tag="div" 
                      class="space-y-3"
                    >
                      <div 
                        v-for="notification in notifications" 
                        :key="notification.id"
                        :class="[
                          'flex p-3 rounded-lg transition-all duration-200 transform',
                          notification.read ? 'bg-gray-50' : 'bg-purple-50',
                          'hover:bg-gray-100'
                        ]"
                      >
                        <div 
                          class="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full"
                          :class="getNotificationTypeClass(notification.type)"
                        >
                          <component :is="getNotificationTypeIcon(notification.type)" class="h-5 w-5 text-white" />
                        </div>
                        <div class="ml-3 flex-1">
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
                          
                          <div class="mt-2 flex items-center space-x-3">
                            <button 
                              v-if="notification.actionable"
                              @click="handleNotificationAction(notification)"
                              class="inline-flex items-center text-xs font-medium text-purple-600 hover:text-purple-800"
                            >
                              <ExternalLinkIcon class="h-3 w-3 mr-1" />
                              {{ notification.actionText || 'View' }}
                            </button>
                            
                            <button 
                              @click="toggleNotificationRead(notification)"
                              class="inline-flex items-center text-xs font-medium text-gray-600 hover:text-gray-800"
                            >
                              <component 
                                :is="notification.read ? 'MailIcon' : 'MailOpenIcon'" 
                                class="h-3 w-3 mr-1" 
                              />
                              {{ notification.read ? 'Mark as unread' : 'Mark as read' }}
                            </button>
                          </div>
                        </div>
                      </div>
                    </transition-group>
  
                    <div v-if="notifications.length === 0" class="py-8 text-center">
                      <div class="mx-auto flex flex-col items-center">
                        <BellOffIcon class="h-10 w-10 text-gray-400 mb-2" />
                        <h3 class="text-sm font-medium text-gray-900">No notifications</h3>
                        <p class="mt-1 text-sm text-gray-500">
                          You're all caught up!
                        </p>
                      </div>
                    </div>
                  </div>
  
                  <div class="mt-4 pt-3 border-t border-gray-200">
                    <router-link 
                      to="/dashboard/notifications/in-app-notification" 
                      class="block text-center text-sm font-medium text-purple-600 hover:text-purple-800"
                      @click="showNotifications = false"
                    >
                      View all notifications
                    </router-link>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
  
      <!-- Command Palette Modal -->
      <transition
        enter-active-class="ease-out duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="showCommandPalette" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50" @click="closeCommandPalette"></div>
      </transition>
  
      <transition
        enter-active-class="ease-out duration-300"
        enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-to-class="opacity-100 translate-y-0 sm:scale-100"
        leave-active-class="ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0 sm:scale-100"
        leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div v-if="showCommandPalette" class="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24">
          <div class="w-full max-w-xl transform overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
            <div class="relative">
              <SearchIcon class="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                ref="searchInput"
                v-model="searchQuery"
                type="text"
                placeholder="Search for anything..."
                class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
                @keydown.down.prevent="navigateResults(1)"
                @keydown.up.prevent="navigateResults(-1)"
                @keydown.enter="selectResult"
                @keydown.esc="closeCommandPalette"
              />
              <button 
                @click="closeCommandPalette" 
                class="absolute right-4 top-3.5 text-gray-400 hover:text-gray-500"
              >
                <XIcon class="h-5 w-5" />
              </button>
            </div>
  
            <div v-if="searchQuery" class="max-h-80 overflow-y-auto p-2">
              <div v-if="filteredResults.length === 0" class="py-6 text-center">
                <SearchXIcon class="mx-auto h-10 w-10 text-gray-400" />
                <p class="mt-2 text-sm text-gray-500">No results found for "{{ searchQuery }}"</p>
              </div>
  
              <div v-else>
                <div v-for="(section, sectionIndex) in groupedResults" :key="sectionIndex" class="mb-4">
                  <h3 class="mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">{{ section.name }}</h3>
                  <ul class="space-y-1">
                    <li 
                      v-for="(item, itemIndex) in section.items" 
                      :key="itemIndex"
                      :class="[
                        'flex items-center px-3 py-2 rounded-md cursor-pointer transition-colors',
                        selectedIndex === getItemIndex(sectionIndex, itemIndex) ? 'bg-purple-100' : 'hover:bg-gray-100'
                      ]"
                      @click="navigateTo(item.href)"
                      @mouseenter="selectedIndex = getItemIndex(sectionIndex, itemIndex)"
                    >
                      <component :is="item.icon" class="h-5 w-5 text-gray-400 mr-3" />
                      <span class="text-sm text-gray-900">{{ item.name }}</span>
                      <ArrowRightIcon class="ml-auto h-4 w-4 text-gray-400" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
  
            <div v-else class="p-4 border-t border-gray-200">
              <p class="text-xs text-gray-500">Start typing to search for pages, features, or settings</p>
              <div class="mt-3 grid grid-cols-2 gap-2">
                <div 
                  v-for="(section, index) in quickLinks" 
                  :key="index"
                  class="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                  @click="navigateTo(section.href)"
                >
                  <component :is="section.icon" class="h-5 w-5 text-gray-400 mr-2" />
                  <span class="text-sm text-gray-900">{{ section.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </header>
  </template>
  
  <script setup lang="ts">
  import { computed, ref, onMounted, nextTick } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { 
    Search as SearchIcon, 
    Bell as BellIcon,
    BellOff as BellOffIcon,
    X as XIcon,
    Mail as MailIcon,
    MailOpen as MailOpenIcon,
    ExternalLink as ExternalLinkIcon,
    ArrowRight as ArrowRightIcon,
    SearchX as SearchXIcon,
    Calendar,
    Video,
    Users,
    UserCheck,
    Building,
    Package,
    BookOpen,
    Bell,
    FileText,
    AlertTriangle,
    DollarSign,
    Receipt,
    Briefcase,
    CreditCard,
    BarChart2,
    Brain,
    Mail,
    MessageSquare,
    Settings,
    User,
    GitBranch,
    Church
  } from 'lucide-vue-next';
  
  const route = useRoute();
  const router = useRouter();
  
  // Page title based on current route
  const pageTitle = computed(() => {
    const path = route.path;
    
    if (path.includes('/events/scheduling')) return 'Event Scheduling';
    if (path.includes('/events/media')) return 'Live Streaming & Media Archive';
    if (path.includes('/volunteers/assignments')) return 'Volunteer Assignments';
    if (path.includes('/volunteers/training')) return 'Workforce Training & Certification';
    if (path.includes('/facilities/booking')) return 'Facility Booking';
    if (path.includes('/facilities/assets')) return 'Asset Tracking';
    if (path.includes('/members/groups')) return 'Small Group & Discipleship Management';
    if (path.includes('/members/followups')) return 'Automated Follow-ups';
    if (path.includes('/legal/documents')) return 'Document Storage';
    if (path.includes('/legal/compliance')) return 'Regulatory Compliance Tracking';
    if (path.includes('/payments/collection')) return 'Payment Collection';
    if (path.includes('/payments/history')) return 'Payment History & Receipts';
    
    return 'Dashboard';
  });
  
  // Notifications
  const showNotifications = ref(false);
  const notifications = ref([
    {
      id: 1,
      title: 'New Member Registration',
      message: 'John Doe has registered as a new member.',
      type: 'member',
      time: '10 minutes ago',
      read: false,
      actionable: true,
      actionText: 'View Profile'
    },
    {
      id: 2,
      title: 'Upcoming Event',
      message: 'Sunday Service starts in 2 hours.',
      type: 'event',
      time: '2 hours ago',
      read: false,
      actionable: true,
      actionText: 'View Event'
    },
    {
      id: 3,
      title: 'Payment Received',
      message: 'You received a donation of $250 from Jane Smith.',
      type: 'payment',
      time: '3 hours ago',
      read: true,
      actionable: true,
      actionText: 'View Payment'
    },
    {
      id: 4,
      title: 'Facility Booking Request',
      message: 'Youth Ministry requested to book the main hall for Friday.',
      type: 'facility',
      time: '5 hours ago',
      read: false,
      actionable: true,
      actionText: 'Review Request'
    },
    {
      id: 5,
      title: 'System Update',
      message: 'The system will undergo maintenance tonight from 2AM to 4AM.',
      type: 'system',
      time: '1 day ago',
      read: true,
      actionable: false
    }
  ]);
  
  const unreadCount = computed(() => {
    return notifications.value.filter(n => !n.read).length;
  });
  
  const toggleNotifications = () => {
    showNotifications.value = !showNotifications.value;
    if (showCommandPalette.value) {
      showCommandPalette.value = false;
    }
  };
  
  const markAllAsRead = () => {
    notifications.value = notifications.value.map(n => ({
      ...n,
      read: true
    }));
  };
  
  const toggleNotificationRead = (notification) => {
    notification.read = !notification.read;
  };
  
  const handleNotificationAction = (notification) => {
    // Handle notification action based on type
    notification.read = true;
    showNotifications.value = false;
    
    // Navigate to appropriate page based on notification type
    switch (notification.type) {
      case 'member':
        router.push('/dashboard//members');
        break;
      case 'event':
        router.push('/dashboard/events');
        break;
      case 'payment':
        router.push('/dashboard/payments/history');
        break;
      case 'facility':
        router.push('/dashboard/facilities');
        break;
      default:
        break;
    }
  };
  
  const getNotificationTypeClass = (type) => {
    switch (type) {
      case 'member':
        return 'bg-blue-500';
      case 'event':
        return 'bg-green-500';
      case 'payment':
        return 'bg-purple-500';
      case 'facility':
        return 'bg-orange-500';
      case 'system':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  const getNotificationTypeIcon = (type) => {
    switch (type) {
      case 'member':
        return User;
      case 'event':
        return Calendar;
      case 'payment':
        return DollarSign;
      case 'facility':
        return Building;
      case 'system':
        return Settings;
      default:
        return Bell;
    }
  };
  
  // Command Palette
  const showCommandPalette = ref(false);
  const searchQuery = ref('');
  const searchInput = ref(null);
  const selectedIndex = ref(0);
  
  // Navigation data
  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard', // Parent route for the section
      items: [
        { name: 'Admin Dashboard', href: '/dashboard/admin', icon: Settings },
        { name: 'Finance Dashboard', href: '/dashboard/finance', icon: BarChart2 },
      ],
    },
    {
      name: 'Member Management',
      href: '/dashboard/church', // Parent route for the section
      items: [
        { name: 'Church Profile Setup', href: '/dashboard//church/profile', icon: Church },
        { name: 'Member & Staff Management', href: '/dashboard//members', icon: User },
        { name: 'Branch Management', href: '/dashboard/church/branches', icon: GitBranch },
      ],
    },
    {
      name: 'Event Management',
      href: '/dashboard/events', // Parent route for the section
      items: [
        { name: 'Event Scheduling', href: '/dashboard/events', icon: Calendar },
        { name: 'Live Streaming & Media', href: '/dashboard/events/media', icon: Video },
      ],
    },
    {
      name: 'Volunteer Management',
      href: '/dashboard/volunteer', // Parent route for the section
      items: [
        { name: 'Volunteer Assignments', href: '/dashboard/volunteer/assignments', icon: Users },
        { name: 'Training & Certification', href: '/dashboard/volunteer/training', icon: UserCheck },
      ],
    },
    {
      name: 'Facility Management',
      href: '/dashboard/facilities', // Parent route for the section
      items: [
        { name: 'Facility Booking', href: '/dashboard/facilities', icon: Building },
        { name: 'Asset Tracking', href: '/dashboard/facilities/assets', icon: Package },
      ],
    },
    {
      name: 'Member Engagement',
      href: '/dashboard/members', // Parent route for the section
      items: [
        { name: 'Group Management', href: '/dashboard/members', icon: BookOpen },
        { name: 'Automated Follow-ups', href: '/dashboard/members/automated-followups', icon: Bell },
      ],
    },
    {
      name: 'Legal Management',
      href: '/dashboard/legal', // Parent route for the section
      items: [
        { name: 'Document Storage', href: '/dashboard/legal', icon: FileText },
        { name: 'Regulatory Compliance', href: '/dashboard/legal/compliance', icon: AlertTriangle },
      ],
    },
    {
      name: 'Payments & Donations',
      href: '/dashboard/payments', // Parent route for the section
      items: [
        { name: 'Payment Collection', href: '/dashboard/payments/collection', icon: DollarSign },
        { name: 'Payment History', href: '/dashboard/payments/history', icon: Receipt },
      ],
    },
    {
      name: 'Corporate Banking',
      href: '/dashboard/banking', // Parent route for the section
      items: [
        { name: 'Bank Account Management', href: '/dashboard/banking/accounts', icon: Briefcase },
        { name: 'Fund Transfers & Bills', href: '/dashboard/banking/transfers', icon: CreditCard },
      ],
    },
    {
      name: 'Analytics & Reporting',
      href: '/dashboard/analytics', // Parent route for the section
      items: [
        { name: 'Financial Reports', href: '/dashboard/analytics/financial', icon: BarChart2 },
        { name: 'AI-Powered Insights', href: '/dashboard/analytics/insights', icon: Brain },
      ],
    },
    {
      name: 'Notifications & Alerts',
      href: '/dashboard/notifications', // Parent route for the section
      items: [
        { name: 'Email & SMS Alerts', href: '/dashboard/notifications/email-sms-alerts', icon: Mail },
        { name: 'In-app Notifications', href: '/dashboard/notifications/in-app-notification', icon: MessageSquare },
      ],
    },
  ];
  
  // Quick links for command palette
  const quickLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: Settings },
    { name: 'Member Management', href: '/dashboard//members', icon: User },
    { name: 'Event Scheduling', href: '/dashboard/events', icon: Calendar },
    { name: 'Payment Collection', href: '/dashboard/payments/collection', icon: DollarSign },
    { name: 'Notifications', href: '/dashboard/notifications/in-app-notification', icon: Bell },
    { name: 'Analytics', href: '/dashboard/analytics/insights', icon: BarChart2 },
  ];
  
  const openCommandPalette = () => {
    showCommandPalette.value = true;
    if (showNotifications.value) {
      showNotifications.value = false;
    }
    
    // Focus the search input after the modal is shown
    nextTick(() => {
      searchInput.value?.focus();
    });
  };
  
  const closeCommandPalette = () => {
    showCommandPalette.value = false;
    searchQuery.value = '';
    selectedIndex.value = 0;
  };
  
  // Filter navigation items based on search query
  const filteredResults = computed(() => {
    if (!searchQuery.value) return [];
    
    const query = searchQuery.value.toLowerCase();
    const results = [];
    
    navigation.forEach(section => {
      section.items.forEach(item => {
        if (
          item.name.toLowerCase().includes(query) ||
          section.name.toLowerCase().includes(query)
        ) {
          results.push({
            ...item,
            section: section.name
          });
        }
      });
    });
    
    return results;
  });
  
  // Group results by section
  const groupedResults = computed(() => {
    const groups = {};
    
    filteredResults.value.forEach(item => {
      if (!groups[item.section]) {
        groups[item.section] = {
          name: item.section,
          items: []
        };
      }
      
      groups[item.section].items.push(item);
    });
    
    return Object.values(groups);
  });
  
  // Get the absolute index of an item in the grouped results
  const getItemIndex = (sectionIndex, itemIndex) => {
    let index = 0;
    
    for (let i = 0; i < sectionIndex; i++) {
      index += groupedResults.value[i].items.length;
    }
    
    return index + itemIndex;
  };
  
  // Navigate through results with keyboard
  const navigateResults = (direction) => {
    if (filteredResults.value.length === 0) return;
    
    const totalItems = filteredResults.value.length;
    let newIndex = selectedIndex.value + direction;
    
    if (newIndex < 0) {
      newIndex = totalItems - 1;
    } else if (newIndex >= totalItems) {
      newIndex = 0;
    }
    
    selectedIndex.value = newIndex;
  };
  
  // Select the currently highlighted result
  const selectResult = () => {
    if (filteredResults.value.length === 0) return;
    
    let currentItem = null;
    let currentIndex = 0;
    
    for (const section of groupedResults.value) {
      for (const item of section.items) {
        if (currentIndex === selectedIndex.value) {
          currentItem = item;
          break;
        }
        currentIndex++;
      }
      if (currentItem) break;
    }
    
    if (currentItem) {
      navigateTo(currentItem.href);
    }
  };
  
  // Navigate to a specific route
  const navigateTo = (href) => {
    router.push(href);
    closeCommandPalette();
  };
  </script>
  
  <style scoped>
  /* Notification list animations */
  .notification-list-enter-active,
  .notification-list-leave-active {
    transition: all 0.3s ease;
  }
  .notification-list-enter-from {
    opacity: 0;
    transform: translateX(-20px);
  }
  .notification-list-leave-to {
    opacity: 0;
    transform: translateX(20px);
  }
  
  /* Add a subtle pulse animation to the notification badge */
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.1);
    }
  }
  
  .notification-badge {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  </style>