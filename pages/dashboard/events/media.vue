<template>
    <div>
      <div class="mb-6 flex items-center justify-between">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Live Streaming & Media Archive</h2>
        <button
          @click="showStreamModal = true"
          class="inline-flex items-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          <VideoIcon class="mr-2 h-4 w-4" />
          New Stream
        </button>
      </div>
  
      <!-- Upcoming and active streams -->
      <div class="mb-8 rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div class="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Upcoming & Active Streams</h3>
        </div>
        <div class="p-6">
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <!-- Active stream card -->
            <div class="relative overflow-hidden rounded-lg border border-red-200 bg-white shadow-sm dark:border-red-900 dark:bg-gray-800">
              <div class="absolute top-2 right-2 flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-300">
                <span class="mr-1 h-2 w-2 rounded-full bg-red-500"></span>
                Live Now
              </div>
              <div class="relative aspect-video bg-gray-100 dark:bg-gray-700">
                <!-- <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Sunday Service Live Stream"
                  class="h-full w-full object-cover"
                /> -->
                <div class="absolute inset-0 flex items-center justify-center">
                  <button class="rounded-full bg-white/80 p-3 text-gray-900 hover:bg-white dark:bg-gray-800/80 dark:text-white dark:hover:bg-gray-800">
                    <PlayIcon class="h-8 w-8" />
                  </button>
                </div>
              </div>
              <div class="p-4">
                <h4 class="text-base font-medium text-gray-900 dark:text-white">Sunday Morning Service</h4>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Live on YouTube and Facebook</p>
                <div class="mt-3 flex items-center justify-between">
                  <div class="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <UsersIcon class="mr-1 h-3 w-3" />
                    247 viewers
                  </div>
                  <div class="flex space-x-2">
                    <button class="rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 hover:bg-purple-100 dark:bg-purple-900/20 dark:text-purple-300 dark:hover:bg-purple-900/30">
                      View
                    </button>
                    <button class="rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/30">
                      End
                    </button>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Upcoming stream cards -->
            <div v-for="(stream, index) in upcomingStreams" :key="index" class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div class="relative aspect-video bg-gray-100 dark:bg-gray-700">
                <!-- <img
                  :src="`/placeholder.svg?height=200&width=400&text=${encodeURIComponent(stream.title)}`"
                  :alt="stream.title"
                  class="h-full w-full object-cover"
                /> -->
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="rounded-md bg-white/80 px-3 py-1 text-sm font-medium text-gray-900 dark:bg-gray-800/80 dark:text-white">
                    {{ stream.date }} • {{ stream.time }}
                  </div>
                </div>
              </div>
              <div class="p-4">
                <h4 class="text-base font-medium text-gray-900 dark:text-white">{{ stream.title }}</h4>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ stream.platform }}</p>
                <div class="mt-3 flex justify-end space-x-2">
                  <button class="rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                    Edit
                  </button>
                  <button class="rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 hover:bg-purple-100 dark:bg-purple-900/20 dark:text-purple-300 dark:hover:bg-purple-900/30">
                    Start
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Media Archive -->
      <div class="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div class="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Media Archive</h3>
            <div class="flex items-center space-x-2">
              <div class="relative">
                <SearchIcon class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Search media..."
                  class="h-9 rounded-md border border-gray-300 bg-white pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                />
              </div>
              <select
                class="h-9 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option>All Types</option>
                <option>Sermons</option>
                <option>Teachings</option>
                <option>Special Messages</option>
              </select>
            </div>
          </div>
        </div>
        <div class="p-6">
          <div class="overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Title
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Type
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Date
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Duration
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Views
                  </th>
                  <th scope="col" class="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                <tr v-for="(media, index) in mediaArchive" :key="index" class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td class="whitespace-nowrap px-6 py-4">
                    <div class="flex items-center">
                      <div class="h-10 w-10 flex-shrink-0 overflow-hidden rounded bg-gray-100 dark:bg-gray-700">
                        <component :is="media.type === 'Video' ? VideoIcon : MusicIcon" class="h-10 w-10 p-2 text-gray-500 dark:text-gray-400" />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900 dark:text-white">{{ media.title }}</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">{{ media.speaker }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {{ media.type }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {{ media.date }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {{ media.duration }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {{ media.views }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <button class="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300">
                      View
                    </button>
                    <button class="ml-3 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                      Download
                    </button>
                    <button class="ml-3 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                      Share
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="mt-4 flex items-center justify-between">
            <div class="text-sm text-gray-700 dark:text-gray-300">
              Showing <span class="font-medium">1</span> to <span class="font-medium">10</span> of <span class="font-medium">45</span> results
            </div>
            <div class="flex space-x-2">
              <button class="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                Previous
              </button>
              <button class="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- New Stream Modal -->
      <Teleport to="body">
        <div v-if="showStreamModal" class="fixed inset-0 z-50 overflow-y-auto">
          <div class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="showStreamModal = false"></div>
            <span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>
            <div
              class="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all dark:bg-gray-800 sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle"
            >
              <div class="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-500 dark:hover:text-gray-400"
                  @click="showStreamModal = false"
                >
                  <XIcon class="h-6 w-6" />
                </button>
              </div>
              <div>
                <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white">Create New Live Stream</h3>
                <div class="mt-6 space-y-4">
                  <div>
                    <label for="stream-title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Stream Title
                    </label>
                    <input
                      type="text"
                      id="stream-title"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    />
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label for="stream-date" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Date
                      </label>
                      <input
                        type="date"
                        id="stream-date"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label for="stream-time" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Time
                      </label>
                      <input
                        type="time"
                        id="stream-time"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label for="stream-description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Description
                    </label>
                    <textarea
                      id="stream-description"
                      rows="3"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    ></textarea>
                  </div>
                  <div>
                    <label for="stream-platforms" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Streaming Platforms
                    </label>
                    <div class="mt-2 space-y-2">
                      <div class="flex items-center">
                        <input
                          id="platform-youtube"
                          type="checkbox"
                          class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 dark:border-gray-600"
                        />
                        <label for="platform-youtube" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          YouTube
                        </label>
                      </div>
                      <div class="flex items-center">
                        <input
                          id="platform-facebook"
                          type="checkbox"
                          class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 dark:border-gray-600"
                        />
                        <label for="platform-facebook" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          Facebook Live
                        </label>
                      </div>
                      <div class="flex items-center">
                        <input
                          id="platform-zoom"
                          type="checkbox"
                          class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 dark:border-gray-600"
                        />
                        <label for="platform-zoom" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          Zoom
                        </label>
                      </div>
                      <div class="flex items-center">
                        <input
                          id="platform-website"
                          type="checkbox"
                          class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 dark:border-gray-600"
                        />
                        <label for="platform-website" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          Church Website
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    @click="showStreamModal = false"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    @click="createStream"
                  >
                    Schedule Stream
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import {
    Video as VideoIcon,
    Play as PlayIcon,
    Users as UsersIcon,
    Search as SearchIcon,
    X as XIcon,
    Music as MusicIcon
  } from 'lucide-vue-next';

  definePageMeta({
    layout: 'dashboard'
  })
  
  // Upcoming streams data
  const upcomingStreams = [
    {
      title: 'Wednesday Bible Study',
      date: 'Mar 8',
      time: '7:00 PM',
      platform: 'YouTube and Facebook Live'
    },
    {
      title: 'Youth Worship Night',
      date: 'Mar 10',
      time: '6:30 PM',
      platform: 'YouTube and Zoom'
    },
    {
      title: 'Sunday Evening Service',
      date: 'Mar 13',
      time: '6:00 PM',
      platform: 'All Platforms'
    }
  ];
  
  // Media archive data
  const mediaArchive = [
    {
      title: 'The Power of Faith',
      speaker: 'Pastor John Doe',
      type: 'Sermon',
      date: 'Mar 1, 2025',
      duration: '45:22',
      views: 328
    },
    {
      title: 'Finding Peace in Troubled Times',
      speaker: 'Pastor John Doe',
      type: 'Sermon',
      date: 'Feb 23, 2025',
      duration: '38:15',
      views: 412
    },
    {
      title: 'Youth Conference 2025',
      speaker: 'Various Speakers',
      type: 'Event',
      date: 'Feb 15, 2025',
      duration: '2:15:30',
      views: 567
    },
    {
      title: 'Worship Night Highlights',
      speaker: 'Worship Team',
      type: 'Music',
      date: 'Feb 10, 2025',
      duration: '1:12:45',
      views: 289
    },
    {
      title: 'Bible Study: Book of Romans',
      speaker: 'Elder Sarah Johnson',
      type: 'Teaching',
      date: 'Feb 5, 2025',
      duration: '52:18',
      views: 203
    },
    {
      title: 'Prayer and Fasting Seminar',
      speaker: 'Guest Speaker Dr. Michael Brown',
      type: 'Teaching',
      date: 'Jan 28, 2025',
      duration: '1:05:33',
      views: 376
    },
    {
      title: 'Community Outreach Highlights',
      speaker: 'Outreach Team',
      type: 'Video',
      date: 'Jan 20, 2025',
      duration: '18:45',
      views: 198
    },
    {
      title: 'Walking in the Spirit',
      speaker: 'Pastor John Doe',
      type: 'Sermon',
      date: 'Jan 16, 2025',
      duration: '42:10',
      views: 345
    },
    {
      title: 'Christmas Eve Service',
      speaker: 'Various Speakers',
      type: 'Event',
      date: 'Dec 24, 2024',
      duration: '1:28:52',
      views: 723
    },
    {
      title: 'Worship Album Release',
      speaker: 'Church Worship Team',
      type: 'Music',
      date: 'Dec 15, 2024',
      duration: '58:27',
      views: 412
    }
  ];
  
  // Modal state
  const showStreamModal = ref(false);
  
  // Create new stream
  const createStream = () => {
    // Logic to create a new stream would go here
    showStreamModal.value = false;
    // Show success notification
    alert('Stream scheduled successfully!');
  };
  </script>