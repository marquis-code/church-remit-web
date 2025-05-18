<template>
    <div class="min-h-screen">
      <div class="container mx-auto px-4">
        <div class="mb-8 animate-fade-in">
          <h1 class="text-3xl font-bold text-indigo-800 mb-2">Group & Discipleship Management</h1>
          <p class="text-gray-600">Create, manage, and track small groups and discipleship activities.</p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Sidebar with stats and quick actions -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-xl shadow-md p-6 mb-6 animate-slide-in" style="--delay: 0.1s">
              <h2 class="text-xl font-semibold text-gray-800 mb-4">Overview</h2>
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-indigo-50 rounded-lg p-4">
                  <p class="text-sm text-indigo-600 font-medium">Total Groups</p>
                  <p class="text-2xl font-bold text-indigo-800">{{ stats.totalGroups }}</p>
                </div>
                <div class="bg-green-50 rounded-lg p-4">
                  <p class="text-sm text-green-600 font-medium">Active Members</p>
                  <p class="text-2xl font-bold text-green-800">{{ stats.activeMembers }}</p>
                </div>
                <div class="bg-purple-50 rounded-lg p-4">
                  <p class="text-sm text-purple-600 font-medium">Leaders</p>
                  <p class="text-2xl font-bold text-purple-800">{{ stats.leaders }}</p>
                </div>
                <div class="bg-amber-50 rounded-lg p-4">
                  <p class="text-sm text-amber-600 font-medium">Resources</p>
                  <p class="text-2xl font-bold text-amber-800">{{ stats.resources }}</p>
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-md p-6 animate-slide-in" style="--delay: 0.2s">
              <h2 class="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
              <div class="space-y-3">
                <button @click="showCreateGroupModal = true" class="w-full flex items-center justify-between p-3 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-indigo-700 transition-colors">
                  <span class="font-medium">Create New Group</span>
                  <Icon name="mdi:plus-circle" />
                </button>
                <button class="w-full flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 rounded-lg text-green-700 transition-colors">
                  <span class="font-medium">Assign Leaders</span>
                  <Icon name="mdi:account-plus" />
                </button>
                <button class="w-full flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-purple-700 transition-colors">
                  <span class="font-medium">Add Resources</span>
                  <Icon name="mdi:file-plus" />
                </button>
                <button class="w-full flex items-center justify-between p-3 bg-amber-50 hover:bg-amber-100 rounded-lg text-amber-700 transition-colors">
                  <span class="font-medium">Generate Reports</span>
                  <Icon name="mdi:chart-box" />
                </button>
              </div>
            </div>
          </div>
          
          <!-- Main content area -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Tabs -->
            <div class="bg-white rounded-xl shadow-md animate-slide-in" style="--delay: 0.3s">
              <div class="border-b">
                <div class="flex overflow-x-auto">
                  <button 
                    v-for="tab in tabs" 
                    :key="tab.id" 
                    @click="activeTab = tab.id" 
                    class="px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors"
                    :class="activeTab === tab.id ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'"
                  >
                    {{ tab.name }}
                  </button>
                </div>
              </div>
              
              <!-- Groups Tab Content -->
              <div v-if="activeTab === 'groups'" class="p-6">
                <div class="flex justify-between items-center mb-6">
                  <h3 class="text-lg font-semibold text-gray-800">Small Groups</h3>
                  <div class="flex space-x-2">
                    <div class="relative">
                      <input 
                        type="text" 
                        placeholder="Search groups..." 
                        class="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      />
                      <Icon name="mdi:magnify" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <button class="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                      <Icon name="mdi:filter-variant" />
                    </button>
                  </div>
                </div>
                
                <div class="space-y-4">
                  <div 
                    v-for="group in groups" 
                    :key="group.id" 
                    class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div class="flex justify-between items-start">
                      <div>
                        <h4 class="text-lg font-semibold text-gray-800">{{ group.name }}</h4>
                        <p class="text-gray-600 text-sm">{{ group.description }}</p>
                        <div class="mt-2 flex items-center space-x-4">
                          <span class="flex items-center text-sm text-gray-500">
                            <Icon name="mdi:account-group" class="mr-1" />
                            {{ group.memberCount }} members
                          </span>
                          <span class="flex items-center text-sm text-gray-500">
                            <Icon name="mdi:calendar" class="mr-1" />
                            {{ group.meetingDay }}
                          </span>
                        </div>
                      </div>
                      <div class="flex space-x-2">
                        <button class="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors">
                          <Icon name="mdi:pencil" />
                        </button>
                        <button class="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors">
                          <Icon name="mdi:delete" />
                        </button>
                      </div>
                    </div>
                    
                    <div class="mt-4 flex flex-wrap gap-2">
                      <span 
                        v-for="(leader, index) in group.leaders" 
                        :key="index" 
                        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                      >
                        <Icon name="mdi:account" class="mr-1" />
                        {{ leader }}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div class="mt-6 flex justify-center">
                  <div class="flex space-x-1">
                    <button class="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors">
                      <Icon name="mdi:chevron-left" />
                    </button>
                    <button class="px-3 py-1 rounded border border-gray-300 bg-indigo-600 text-white">1</button>
                    <button class="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors">2</button>
                    <button class="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors">3</button>
                    <button class="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors">
                      <Icon name="mdi:chevron-right" />
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- Members Tab Content -->
              <div v-if="activeTab === 'members'" class="p-6">
                <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr v-for="member in members" :key="member.id" class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="flex items-center">
                            <div class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                              {{ member.name.split(' ').map(n => n[0]).join('') }}
                            </div>
                            <div class="ml-4">
                              <div class="text-sm font-medium text-gray-900">{{ member.name }}</div>
                              <div class="text-sm text-gray-500">{{ member.email }}</div>
                            </div>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="text-sm text-gray-900">{{ member.group }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span 
                            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                            :class="member.role === 'Leader' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'"
                          >
                            {{ member.role }}
                          </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="flex items-center">
                            <div class="w-16 bg-gray-200 rounded-full h-2.5">
                              <div 
                                class="bg-indigo-600 h-2.5 rounded-full" 
                                :style="`width: ${member.attendance}%`"
                              ></div>
                            </div>
                            <span class="ml-2 text-sm text-gray-600">{{ member.attendance }}%</span>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div class="flex space-x-2">
                            <button class="text-indigo-600 hover:text-indigo-900">Edit</button>
                            <button class="text-red-600 hover:text-red-900">Remove</button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <!-- Resources Tab Content -->
              <div v-if="activeTab === 'resources'" class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    v-for="resource in resources" 
                    :key="resource.id" 
                    class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div class="flex justify-between">
                      <div>
                        <h4 class="text-lg font-semibold text-gray-800">{{ resource.title }}</h4>
                        <p class="text-gray-600 text-sm">{{ resource.description }}</p>
                      </div>
                      <div class="flex items-start">
                        <span 
                          class="px-2 py-1 text-xs rounded-full"
                          :class="{
                            'bg-blue-100 text-blue-800': resource.type === 'Document',
                            'bg-purple-100 text-purple-800': resource.type === 'Video',
                            'bg-amber-100 text-amber-800': resource.type === 'Audio'
                          }"
                        >
                          {{ resource.type }}
                        </span>
                      </div>
                    </div>
                    
                    <div class="mt-4 flex justify-between items-center">
                      <div class="flex items-center text-sm text-gray-500">
                        <Icon name="mdi:calendar" class="mr-1" />
                        {{ resource.date }}
                      </div>
                      <div class="flex space-x-2">
                        <button class="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
                          View
                        </button>
                        <button class="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Recent Activity -->
            <div class="bg-white rounded-xl shadow-md p-6 animate-slide-in" style="--delay: 0.4s">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
              <div class="space-y-4">
                <div v-for="(activity, index) in activities" :key="index" class="flex">
                  <div class="mr-4 flex-shrink-0">
                    <div 
                      class="w-10 h-10 rounded-full flex items-center justify-center"
                      :class="{
                        'bg-green-100 text-green-600': activity.type === 'group',
                        'bg-blue-100 text-blue-600': activity.type === 'member',
                        'bg-purple-100 text-purple-600': activity.type === 'resource'
                      }"
                    >
                      <Icon 
                        :name="{
                          'group': 'mdi:account-group',
                          'member': 'mdi:account',
                          'resource': 'mdi:file-document'
                        }[activity.type]" 
                      />
                    </div>
                  </div>
                  <div>
                    <p class="text-gray-800">{{ activity.message }}</p>
                    <p class="text-sm text-gray-500">{{ activity.time }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Create Group Modal -->
      <Teleport to="body">
        <div v-if="showCreateGroupModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 animate-modal-in">
            <div class="p-6">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold text-gray-800">Create New Group</h3>
                <button @click="showCreateGroupModal = false" class="text-gray-500 hover:text-gray-700">
                  <Icon name="mdi:close" class="text-xl" />
                </button>
              </div>
              
              <form @submit.prevent="createGroup">
                <div class="space-y-4">
                  <div>
                    <label for="group-name" class="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
                    <input 
                      id="group-name" 
                      v-model="newGroup.name" 
                      type="text" 
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      placeholder="Enter group name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label for="group-description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea 
                      id="group-description" 
                      v-model="newGroup.description" 
                      rows="3" 
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      placeholder="Enter group description"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label for="meeting-day" class="block text-sm font-medium text-gray-700 mb-1">Meeting Day</label>
                    <select 
                      id="meeting-day" 
                      v-model="newGroup.meetingDay" 
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    >
                      <option value="Sunday">Sunday</option>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Group Leaders</label>
                    <div class="flex flex-wrap gap-2 mb-2">
                      <span 
                        v-for="(leader, index) in newGroup.leaders" 
                        :key="index" 
                        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                      >
                        {{ leader }}
                        <button @click="removeLeader(index)" type="button" class="ml-1 text-green-600 hover:text-green-800">
                          <Icon name="mdi:close-circle" />
                        </button>
                      </span>
                    </div>
                    <div class="flex">
                      <input 
                        v-model="leaderInput" 
                        type="text" 
                        class="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        placeholder="Add leader"
                      />
                      <button 
                        @click="addLeader" 
                        type="button"
                        class="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
                
                <div class="mt-6 flex justify-end space-x-3">
                  <button 
                    type="button" 
                    @click="showCreateGroupModal = false"
                    class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Create Group
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from 'vue';
  
  useHead({
    title: 'Group & Discipleship Management',
    meta: [
      { name: 'description', content: 'Create and manage small groups and discipleship activities' }
    ]
  });
  
  // Stats data
  const stats = reactive({
    totalGroups: 12,
    activeMembers: 156,
    leaders: 24,
    resources: 45
  });
  
  // Tabs
  const tabs = [
    { id: 'groups', name: 'Small Groups' },
    { id: 'members', name: 'Members' },
    { id: 'resources', name: 'Resources' }
  ];
  const activeTab = ref('groups');
  
  // Groups data
  const groups = ref([
    {
      id: 1,
      name: 'Young Adults Bible Study',
      description: 'Weekly Bible study for young adults ages 18-30',
      memberCount: 18,
      meetingDay: 'Tuesday',
      leaders: ['John Smith', 'Sarah Johnson']
    },
    {
      id: 2,
      name: 'Women\'s Prayer Group',
      description: 'A supportive community for women to pray together',
      memberCount: 24,
      meetingDay: 'Wednesday',
      leaders: ['Mary Williams', 'Lisa Brown']
    },
    {
      id: 3,
      name: 'Men\'s Discipleship',
      description: 'Helping men grow in their faith and leadership',
      memberCount: 15,
      meetingDay: 'Thursday',
      leaders: ['David Miller']
    },
    {
      id: 4,
      name: 'Family Ministry',
      description: 'Supporting families in their spiritual journey',
      memberCount: 32,
      meetingDay: 'Sunday',
      leaders: ['Robert Davis', 'Jennifer Wilson']
    }
  ]);
  
  // Members data
  const members = ref([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      group: 'Young Adults Bible Study',
      role: 'Leader',
      attendance: 95
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      group: 'Young Adults Bible Study',
      role: 'Leader',
      attendance: 90
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'michael.b@example.com',
      group: 'Men\'s Discipleship',
      role: 'Member',
      attendance: 85
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.d@example.com',
      group: 'Women\'s Prayer Group',
      role: 'Member',
      attendance: 75
    },
    {
      id: 5,
      name: 'David Miller',
      email: 'david.m@example.com',
      group: 'Men\'s Discipleship',
      role: 'Leader',
      attendance: 100
    }
  ]);
  
  // Resources data
  const resources = ref([
    {
      id: 1,
      title: 'Discipleship 101',
      description: 'Introduction to discipleship principles',
      type: 'Document',
      date: '2025-02-15'
    },
    {
      id: 2,
      title: 'Prayer Guide',
      description: 'A comprehensive guide to prayer',
      type: 'Document',
      date: '2025-01-20'
    },
    {
      id: 3,
      title: 'Leadership Training',
      description: 'Video series on Christian leadership',
      type: 'Video',
      date: '2025-03-05'
    },
    {
      id: 4,
      title: 'Bible Study Method',
      description: 'How to study the Bible effectively',
      type: 'Audio',
      date: '2025-02-28'
    }
  ]);
  
  // Activities data
  const activities = ref([
    {
      type: 'group',
      message: 'New group "Youth Discipleship" was created',
      time: '2 hours ago'
    },
    {
      type: 'member',
      message: 'Sarah Johnson was assigned as a leader to "Young Adults Bible Study"',
      time: '4 hours ago'
    },
    {
      type: 'resource',
      message: 'New resource "Prayer Guide" was added',
      time: '1 day ago'
    },
    {
      type: 'member',
      message: 'Michael Brown joined "Men\'s Discipleship"',
      time: '2 days ago'
    }
  ]);

  definePageMeta({
      layout: 'dashboard'
  })
  
  // Create Group Modal
  const showCreateGroupModal = ref(false);
  const newGroup = reactive({
    name: '',
    description: '',
    meetingDay: 'Sunday',
    leaders: [] as string[]
  });
  const leaderInput = ref('');
  
  function addLeader() {
    if (leaderInput.value.trim() && !newGroup.leaders.includes(leaderInput.value.trim())) {
      newGroup.leaders.push(leaderInput.value.trim());
      leaderInput.value = '';
    }
  }
  
  function removeLeader(index: number) {
    newGroup.leaders.splice(index, 1);
  }
  
  function createGroup() {
    // Add the new group to the list
    const id = groups.value.length + 1;
    groups.value.push({
      id,
      name: newGroup.name,
      description: newGroup.description,
      meetingDay: newGroup.meetingDay,
      memberCount: 0,
      leaders: [...newGroup.leaders]
    });
    
    // Add activity
    activities.value.unshift({
      type: 'group',
      message: `New group "${newGroup.name}" was created`,
      time: 'Just now'
    });
    
    // Reset form and close modal
    newGroup.name = '';
    newGroup.description = '';
    newGroup.meetingDay = 'Sunday';
    newGroup.leaders = [];
    showCreateGroupModal.value = false;
  }
  </script>
  
  <style scoped>
  .animate-fade-in {
    animation: fadeIn 0.8s ease-in-out;
  }
  
  .animate-slide-in {
    animation: slideIn 0.5s ease-out;
    animation-fill-mode: both;
    animation-delay: var(--delay, 0s);
  }
  
  .animate-modal-in {
    animation: modalIn 0.3s ease-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes modalIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>