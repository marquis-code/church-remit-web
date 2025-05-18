<template>
    <main>
      <div class="space-y-6 animate-fade-in">
        <!-- Page header -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 class="text-2xl font-bold leading-7 text-gray-900">Live Streaming & Media Archive</h2>
            <p class="mt-1 text-sm text-gray-500">Manage live streams and access archived content</p>
          </div>
          <div class="mt-4 flex flex-col sm:flex-row sm:space-x-3 md:mt-0">
            <button
              type="button"
              @click="showCreateStreamModal = true"
              class="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <Video class="mr-2 h-4 w-4" />
              New Stream
            </button>
  
            <button
              type="button"
              @click="showUploadModal = true"
              class="mt-3 inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0"
            >
              <Upload class="mr-2 h-4 w-4 text-gray-500" />
              Upload Media
            </button>
          </div>
        </div>
  
        <!-- Tabs -->
        <div class="border-b border-gray-200 animate-fade-in animation-delay-100">
          <nav class="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              @click="activeTab = 'live'"
              :class="[
                activeTab === 'live'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
              ]"
            >
              Live Streaming
            </button>
            <button
              @click="activeTab = 'archive'"
              :class="[
                activeTab === 'archive'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
              ]"
            >
              Media Archive
            </button>
          </nav>
        </div>
  
        <!-- Live Streaming Tab -->
        <div v-if="activeTab === 'live'" class="animate-fade-in animation-delay-200">
          <!-- Search and filter bar -->
          <div class="bg-white shadow rounded-lg p-4 mb-6">
            <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <!-- Search -->
              <div class="relative col-span-2">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search class="h-4 w-4 text-gray-400" />
                </div>
                <input
                  v-model="liveSearchQuery"
                  type="text"
                  class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  placeholder="Search by title or platform"
                />
              </div>
  
              <!-- Platform filter -->
              <div>
                <select
                  v-model="platformFilter"
                  class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                >
                  <option value="">All Platforms</option>
                  <option value="youtube">YouTube</option>
                  <option value="facebook">Facebook</option>
                  <option value="zoom">Zoom</option>
                </select>
              </div>
            </div>
          </div>
  
          <!-- Upcoming Streams -->
          <div class="bg-white shadow rounded-lg overflow-hidden mb-6">
            <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Upcoming Streams</h3>
            </div>
            <div class="px-4 py-5 sm:p-6">
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div
                  v-for="stream in upcomingStreams"
                  :key="stream.id"
                  class="group relative bg-white overflow-hidden rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300"
                >
                  <div class="relative h-40 bg-gray-200">
                    <img
                      :src="stream.thumbnail"
                      alt=""
                      class="h-full w-full object-cover"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black opacity-60"></div>
                    <div class="absolute bottom-0 left-0 right-0 p-4">
                      <div class="flex items-center justify-between">
                        <span
                          :class="[
                            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                            stream.platform === 'youtube' ? 'bg-red-100 text-red-800' :
                            stream.platform === 'facebook' ? 'bg-blue-100 text-blue-800' :
                            'bg-purple-100 text-purple-800'
                          ]"
                        >
                          {{ stream.platform }}
                        </span>
                        <span class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          <Clock class="mr-1 h-3 w-3" />
                          {{ stream.scheduledTime }}
                        </span>
                      </div>
                      <h3 class="mt-2 text-sm font-semibold text-white">{{ stream.title }}</h3>
                    </div>
                  </div>
                  <div class="p-4">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center text-sm text-gray-500">
                        <Calendar class="mr-1 h-4 w-4 text-gray-400" />
                        {{ stream.scheduledDate }}
                      </div>
                    </div>
                    <div class="mt-4 flex space-x-2">
                      <button
                        type="button"
                        @click="editStream(stream)"
                        class="flex-1 inline-flex justify-center items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        <Edit class="mr-1 h-4 w-4 text-gray-500" />
                        Edit
                      </button>
                      <button
                        type="button"
                        @click="startStream(stream)"
                        class="flex-1 inline-flex justify-center items-center rounded-md bg-blue-50 px-2.5 py-1.5 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-100"
                      >
                        <Play class="mr-1 h-4 w-4" />
                        Start
                      </button>
                    </div>
                  </div>
                </div>
  
                <!-- Add new stream card -->
                <div
                  @click="showCreateStreamModal = true"
                  class="relative bg-white overflow-hidden rounded-lg border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center text-center hover:border-blue-500 hover:bg-blue-50 transition-colors duration-300 cursor-pointer h-[240px]"
                >
                  <div class="rounded-full bg-blue-100 p-3 mb-4">
                    <Video class="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 class="text-lg font-semibold text-gray-900">Create New Stream</h3>
                  <p class="mt-2 text-sm text-gray-500">
                    Set up a new live stream for your event
                  </p>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Active Streams -->
          <div class="bg-white shadow rounded-lg overflow-hidden">
            <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Active Streams</h3>
            </div>
            <div class="px-4 py-5 sm:p-6">
              <div v-if="activeStreams.length === 0" class="text-center py-10">
                <Video class="mx-auto h-12 w-12 text-gray-400" />
                <h3 class="mt-2 text-sm font-semibold text-gray-900">No active streams</h3>
                <p class="mt-1 text-sm text-gray-500">Start a stream to see it here.</p>
              </div>
              <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div
                  v-for="stream in activeStreams"
                  :key="stream.id"
                  class="group relative bg-white overflow-hidden rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300"
                >
                  <div class="relative h-40 bg-gray-200">
                    <img
                      :src="stream.thumbnail"
                      alt=""
                      class="h-full w-full object-cover"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black opacity-60"></div>
                    <div class="absolute top-2 right-2">
                      <span class="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                        <span class="animate-pulse mr-1 h-2 w-2 rounded-full bg-red-600"></span>
                        LIVE
                      </span>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 p-4">
                      <div class="flex items-center justify-between">
                        <span
                          :class="[
                            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                            stream.platform === 'youtube' ? 'bg-red-100 text-red-800' :
                            stream.platform === 'facebook' ? 'bg-blue-100 text-blue-800' :
                            'bg-purple-100 text-purple-800'
                          ]"
                        >
                          {{ stream.platform }}
                        </span>
                        <span class="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                          <Users class="mr-1 h-3 w-3" />
                          {{ stream.viewerCount }}
                        </span>
                      </div>
                      <h3 class="mt-2 text-sm font-semibold text-white">{{ stream.title }}</h3>
                    </div>
                  </div>
                  <div class="p-4">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center text-sm text-gray-500">
                        <Clock class="mr-1 h-4 w-4 text-gray-400" />
                        Started {{ stream.startedAt }}
                      </div>
                    </div>
                    <div class="mt-4 flex space-x-2">
                      <button
                        type="button"
                        @click="viewStream(stream)"
                        class="flex-1 inline-flex justify-center items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        <Eye class="mr-1 h-4 w-4 text-gray-500" />
                        View
                      </button>
                      <button
                        type="button"
                        @click="endStream(stream)"
                        class="flex-1 inline-flex justify-center items-center rounded-md bg-red-50 px-2.5 py-1.5 text-sm font-semibold text-red-600 shadow-sm hover:bg-red-100"
                      >
                        <StopCircle class="mr-1 h-4 w-4" />
                        End
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Media Archive Tab -->
        <div v-if="activeTab === 'archive'" class="animate-fade-in animation-delay-200">
          <!-- Search and filter bar -->
          <div class="bg-white shadow rounded-lg p-4 mb-6">
            <div class="grid grid-cols-1 gap-4 lg:grid-cols-4">
              <!-- Search -->
              <div class="relative col-span-2">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search class="h-4 w-4 text-gray-400" />
                </div>
                <input
                  v-model="archiveSearchQuery"
                  type="text"
                  class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  placeholder="Search by title, speaker, or tags"
                />
              </div>
  
              <!-- Category filter -->
              <div>
                <select
                  v-model="categoryFilter"
                  class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                >
                  <option value="">All Categories</option>
                  <option value="sermon">Sermons</option>
                  <option value="teaching">Teachings</option>
                  <option value="special">Special Messages</option>
                  <option value="music">Music</option>
                </select>
              </div>
  
              <!-- Date filter -->
              <div>
                <select
                  v-model="dateFilter"
                  class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                >
                  <option value="">All Time</option>
                  <option value="week">Past Week</option>
                  <option value="month">Past Month</option>
                  <option value="year">Past Year</option>
                </select>
              </div>
            </div>
          </div>
  
          <!-- Media Grid -->
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div
              v-for="media in filteredArchiveMedia"
              :key="media.id"
              class="group relative bg-white overflow-hidden rounded-lg shadow hover:shadow-md transition-shadow duration-300"
            >
              <div class="relative h-48 overflow-hidden bg-gray-200">
                <img
                  :src="media.thumbnail"
                  alt=""
                  class="h-full w-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black opacity-60"></div>
                <div class="absolute bottom-0 left-0 right-0 p-4">
                  <span
                    :class="[
                      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                      media.category === 'sermon' ? 'bg-purple-100 text-purple-800' :
                      media.category === 'teaching' ? 'bg-green-100 text-green-800' :
                      media.category === 'special' ? 'bg-blue-100 text-blue-800' :
                      'bg-amber-100 text-amber-800'
                    ]"
                  >
                    {{ media.category }}
                  </span>
                  <h3 class="mt-2 text-sm font-semibold text-white line-clamp-2">{{ media.title }}</h3>
                </div>
                <div class="absolute top-2 right-2">
                  <span class="inline-flex items-center rounded-full bg-gray-800 bg-opacity-75 px-2 py-0.5 text-xs font-medium text-white">
                    {{ media.duration }}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center text-sm text-gray-500">
                    <Calendar class="mr-1 h-4 w-4 text-gray-400" />
                    {{ media.date }}
                  </div>
                  <div class="flex items-center text-sm text-gray-500">
                    <Eye class="mr-1 h-4 w-4 text-gray-400" />
                    {{ media.views }}
                  </div>
                </div>
                <p class="mt-2 text-sm text-gray-600 line-clamp-2">{{ media.description }}</p>
                <div class="mt-4 flex space-x-2">
                  <button
                    type="button"
                    @click="playMedia(media)"
                    class="flex-1 inline-flex justify-center items-center rounded-md bg-blue-50 px-2.5 py-1.5 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-100"
                  >
                    <Play class="mr-1 h-4 w-4" />
                    Play
                  </button>
                  <button
                    type="button"
                    @click="shareMedia(media)"
                    class="flex-1 inline-flex justify-center items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <Share2 class="mr-1 h-4 w-4 text-gray-500" />
                    Share
                  </button>
                </div>
              </div>
            </div>
  
            <!-- Upload media card -->
            <div
              @click="showUploadModal = true"
              class="relative bg-white overflow-hidden rounded-lg border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center text-center hover:border-blue-500 hover:bg-blue-50 transition-colors duration-300 cursor-pointer h-[320px]"
            >
              <div class="rounded-full bg-blue-100 p-3 mb-4">
                <Upload class="h-8 w-8 text-blue-600" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900">Upload Media</h3>
              <p class="mt-2 text-sm text-gray-500">
                Add sermons, teachings, or special messages to your archive
              </p>
            </div>
          </div>
  
          <!-- Pagination -->
          <div class="mt-6 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700">
                  Showing <span class="font-medium">1</span> to <span class="font-medium">{{ Math.min(filteredArchiveMedia.length, 12) }}</span> of <span class="font-medium">{{ filteredArchiveMedia.length }}</span> results
                </p>
              </div>
              <div>
                <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <a href="#" class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span class="sr-only">Previous</span>
                    <ChevronLeft class="h-5 w-5" aria-hidden="true" />
                  </a>
                  <a href="#" aria-current="page" class="relative z-10 inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">1</a>
                  <a href="#" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">2</a>
                  <a href="#" class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">3</a>
                  <span class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
                  <a href="#" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span class="sr-only">Next</span>
                    <ChevronRight class="h-5 w-5" aria-hidden="true" />
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Create Stream Modal -->
        <div v-if="showCreateStreamModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-10">
          <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto animate-fade-in">
            <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium leading-6 text-gray-900">{{ editingStream ? 'Edit Stream' : 'Create New Stream' }}</h3>
                <button
                  type="button"
                  @click="closeCreateStreamModal"
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500"
                >
                  <span class="sr-only">Close</span>
                  <X class="h-6 w-6" />
                </button>
              </div>
            </div>
            <form @submit.prevent="saveStream">
              <div class="px-4 py-5 sm:p-6 space-y-4">
                <div>
                  <label for="stream-title" class="block text-sm font-medium text-gray-700">Stream Title</label>
                  <input
                    type="text"
                    id="stream-title"
                    v-model="streamForm.title"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter stream title"
                    required
                  />
                </div>
                
                <div>
                  <label for="stream-platform" class="block text-sm font-medium text-gray-700">Platform</label>
                  <select
                    id="stream-platform"
                    v-model="streamForm.platform"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  >
                    <option value="youtube">YouTube</option>
                    <option value="facebook">Facebook</option>
                    <option value="zoom">Zoom</option>
                  </select>
                </div>
                
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label for="stream-date" class="block text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="date"
                      id="stream-date"
                      v-model="streamForm.scheduledDate"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label for="stream-time" class="block text-sm font-medium text-gray-700">Time</label>
                    <input
                      type="time"
                      id="stream-time"
                      v-model="streamForm.scheduledTime"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label for="stream-description" class="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    id="stream-description"
                    v-model="streamForm.description"
                    rows="3"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter stream description"
                  ></textarea>
                </div>
                
                <div>
                  <label for="stream-thumbnail" class="block text-sm font-medium text-gray-700">Thumbnail URL (optional)</label>
                  <input
                    type="text"
                    id="stream-thumbnail"
                    v-model="streamForm.thumbnail"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter thumbnail URL"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700">Stream Settings</label>
                  <div class="mt-2 space-y-2">
                    <div class="flex items-center">
                      <input
                        type="checkbox"
                        id="stream-public"
                        v-model="streamForm.isPublic"
                        class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label for="stream-public" class="ml-2 block text-sm text-gray-900">Make stream public</label>
                    </div>
                    <div class="flex items-center">
                      <input
                        type="checkbox"
                        id="stream-record"
                        v-model="streamForm.recordStream"
                        class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label for="stream-record" class="ml-2 block text-sm text-gray-900">Record stream for archive</label>
                    </div>
                    <div class="flex items-center">
                      <input
                        type="checkbox"
                        id="stream-chat"
                        v-model="streamForm.enableChat"
                        class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label for="stream-chat" class="ml-2 block text-sm text-gray-900">Enable chat</label>
                    </div>
                  </div>
                </div>
                
                <div v-if="streamForm.platform === 'youtube' || streamForm.platform === 'facebook'">
                  <label for="stream-key" class="block text-sm font-medium text-gray-700">Stream Key</label>
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="password"
                      id="stream-key"
                      v-model="streamForm.streamKey"
                      class="block w-full flex-1 rounded-none rounded-l-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="Enter stream key"
                    />
                    <button
                      type="button"
                      class="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm"
                      @click="toggleStreamKeyVisibility"
                    >
                      <component :is="showStreamKey ? Eye : EyeOff" class="h-4 w-4" />
                    </button>
                  </div>
                  <p class="mt-1 text-xs text-gray-500">Your stream key is sensitive information. Never share it publicly.</p>
                </div>
              </div>
              <div class="px-4 py-3 bg-gray-50 text-right sm:px-6 border-t border-gray-200">
                <button
                  type="button"
                  @click="closeCreateStreamModal"
                  class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mr-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {{ editingStream ? 'Update Stream' : 'Create Stream' }}
                </button>
              </div>
            </form>
          </div>
        </div>
  
        <!-- Upload Media Modal -->
        <div v-if="showUploadModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-10">
          <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto animate-fade-in">
            <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium leading-6 text-gray-900">Upload Media</h3>
                <button
                  type="button"
                  @click="showUploadModal = false"
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500"
                >
                  <span class="sr-only">Close</span>
                  <X class="h-6 w-6" />
                </button>
              </div>
            </div>
            <form @submit.prevent="uploadMedia">
              <div class="px-4 py-5 sm:p-6 space-y-4">
                <div>
                  <label for="media-title" class="block text-sm font-medium text-gray-700">Media Title</label>
                  <input
                    type="text"
                    id="media-title"
                    v-model="mediaForm.title"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter media title"
                    required
                  />
                </div>
                
                <div>
                  <label for="media-category" class="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    id="media-category"
                    v-model="mediaForm.category"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  >
                    <option value="sermon">Sermon</option>
                    <option value="teaching">Teaching</option>
                    <option value="special">Special Message</option>
                    <option value="music">Music</option>
                  </select>
                </div>
                
                <div>
                  <label for="media-date" class="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    id="media-date"
                    v-model="mediaForm.date"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>
                
                <div>
                  <label for="media-description" class="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    id="media-description"
                    v-model="mediaForm.description"
                    rows="3"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter media description"
                  ></textarea>
                </div>
                
                <div>
                  <label for="media-speaker" class="block text-sm font-medium text-gray-700">Speaker/Artist</label>
                  <input
                    type="text"
                    id="media-speaker"
                    v-model="mediaForm.speaker"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter speaker or artist name"
                  />
                </div>
                
                <div>
                  <label for="media-tags" class="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
                  <input
                    type="text"
                    id="media-tags"
                    v-model="mediaForm.tags"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="faith, prayer, worship"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700">Upload File</label>
                  <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div class="space-y-1 text-center">
                      <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      <div class="flex text-sm text-gray-600">
                        <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" class="sr-only" @change="handleFileUpload" />
                        </label>
                        <p class="pl-1">or drag and drop</p>
                      </div>
                      <p class="text-xs text-gray-500">MP4, MP3, or MOV up to 2GB</p>
                    </div>
                  </div>
                  <div v-if="uploadFile" class="mt-2 text-sm text-gray-600">
                    Selected file: {{ uploadFile.name }}
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700">Access Settings</label>
                  <div class="mt-2 space-y-2">
                    <div class="flex items-center">
                      <input
                        type="radio"
                        id="access-public"
                        name="access"
                        value="public"
                        v-model="mediaForm.access"
                        class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label for="access-public" class="ml-2 block text-sm text-gray-900">Public (anyone can view)</label>
                    </div>
                    <div class="flex items-center">
                      <input
                        type="radio"
                        id="access-members"
                        name="access"
                        value="members"
                        v-model="mediaForm.access"
                        class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label for="access-members" class="ml-2 block text-sm text-gray-900">Members only</label>
                    </div>
                    <div class="flex items-center">
                      <input
                        type="radio"
                        id="access-private"
                        name="access"
                        value="private"
                        v-model="mediaForm.access"
                        class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label for="access-private" class="ml-2 block text-sm text-gray-900">Private (only with direct link)</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="px-4 py-3 bg-gray-50 text-right sm:px-6 border-t border-gray-200">
                <button
                  type="button"
                  @click="showUploadModal = false"
                  class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mr-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
  
        <!-- Media Player Modal -->
        <div v-if="showMediaPlayerModal" class="fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center p-4 z-10">
          <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto animate-fade-in">
            <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium leading-6 text-gray-900">{{ selectedMedia?.title }}</h3>
                <button
                  type="button"
                  @click="showMediaPlayerModal = false"
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500"
                >
                  <span class="sr-only">Close</span>
                  <X class="h-6 w-6" />
                </button>
              </div>
            </div>
            <div class="bg-black aspect-video">
              <div class="w-full h-full flex items-center justify-center">
                <video
                  v-if="selectedMedia"
                  controls
                  class="max-w-full max-h-full"
                  :src="selectedMedia.videoUrl || '#'"
                  :poster="selectedMedia.thumbnail"
                ></video>
              </div>
            </div>
            <div class="px-4 py-5 sm:p-6" v-if="selectedMedia">
              <div class="flex items-center mb-4">
                <span
                  :class="[
                    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                    selectedMedia.category === 'sermon' ? 'bg-purple-100 text-purple-800' :
                    selectedMedia.category === 'teaching' ? 'bg-green-100 text-green-800' :
                    selectedMedia.category === 'special' ? 'bg-blue-100 text-blue-800' :
                    'bg-amber-100 text-amber-800'
                  ]"
                >
                  {{ selectedMedia.category }}
                </span>
                <span class="ml-2 text-sm text-gray-500">{{ selectedMedia.date }}</span>
                <span class="ml-2 text-sm text-gray-500">{{ selectedMedia.duration }}</span>
                <span class="ml-2 text-sm text-gray-500">{{ selectedMedia.views }} views</span>
              </div>
              
              <h2 class="text-xl font-bold text-gray-900">{{ selectedMedia.title }}</h2>
              <p class="mt-2 text-sm text-gray-600">{{ selectedMedia.description }}</p>
              
              <div class="mt-4">
                <h3 class="text-sm font-medium text-gray-700">Speaker/Artist</h3>
                <p class="mt-1 text-sm text-gray-900">{{ selectedMedia.speaker }}</p>
              </div>
              
              <div class="mt-4">
                <h3 class="text-sm font-medium text-gray-700">Tags</h3>
                <div class="mt-1 flex flex-wrap gap-2">
                  <span
                    v-for="(tag, index) in selectedMedia.tags.split(',')"
                    :key="index"
                    class="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                  >
                    {{ tag.trim() }}
                  </span>
                </div>
              </div>
              
              <div class="mt-6 flex space-x-3">
                <button
                  type="button"
                  @click="downloadMedia(selectedMedia)"
                  class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <Download class="mr-2 h-4 w-4 text-gray-500" />
                  Download
                </button>
                <button
                  type="button"
                  @click="shareMedia(selectedMedia)"
                  class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <Share2 class="mr-2 h-4 w-4 text-gray-500" />
                  Share
                </button>
                <button
                  type="button"
                  @click="addToPlaylist(selectedMedia)"
                  class="inline-flex items-center rounded-md bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-100"
                >
                  <ListPlus class="mr-2 h-4 w-4" />
                  Add to Playlist
                </button>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Share Modal -->
        <div v-if="showShareModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-10">
          <div class="bg-white rounded-lg shadow-xl max-w-md w-full animate-fade-in">
            <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium leading-6 text-gray-900">Share</h3>
                <button
                  type="button"
                  @click="showShareModal = false"
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500"
                >
                  <span class="sr-only">Close</span>
                  <X class="h-6 w-6" />
                </button>
              </div>
            </div>
            <div class="px-4 py-5 sm:p-6">
              <div class="mb-4">
                <label for="share-link" class="block text-sm font-medium text-gray-700">Share Link</label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    id="share-link"
                    v-model="shareLink"
                    readonly
                    class="block w-full flex-1 rounded-none rounded-l-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    @click="copyShareLink"
                    class="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm"
                  >
                    <component :is="linkCopied ? Check : Copy" class="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">Share on Social Media</label>
                <div class="mt-2 flex space-x-4">
                  <button
                    type="button"
                    class="inline-flex items-center rounded-md bg-[#1877F2] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#166FE5]"
                  >
                    <Facebook class="mr-2 h-4 w-4" />
                    Facebook
                  </button>
                  <button
                    type="button"
                    class="inline-flex items-center rounded-md bg-[#1DA1F2] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#1A91DA]"
                  >
                    <Twitter class="mr-2 h-4 w-4" />
                    Twitter
                  </button>
                  <button
                    type="button"
                    class="inline-flex items-center rounded-md bg-[#25D366] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#22C55E]"
                  >
                    <MessageCircle class="mr-2 h-4 w-4" />
                    WhatsApp
                  </button>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700">Embed</label>
                <div class="mt-1">
                  <textarea
                    rows="3"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    readonly
                    v-model="embedCode"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6 border-t border-gray-200">
              <button
                type="button"
                @click="showShareModal = false"
                class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import {
    Video,
    // Video
    // Video,
    Upload,
    Search,
    Calendar,
    Clock,
    Eye,
    EyeOff,
    Edit,
    Play,
    StopCircle,
    Users,
    X,
    Share2,
    ChevronLeft,
    ChevronRight,
    Download,
    ListPlus,
    Copy,
    Check,
    Facebook,
    Twitter,
    MessageCircle,
    Youtube
  } from 'lucide-vue-next';
  
  const router = useRouter();
  
  // Tab state
  const activeTab = ref('live');
  
  // Search and filters
  const liveSearchQuery = ref('');
  const archiveSearchQuery = ref('');
  const platformFilter = ref('');
  const categoryFilter = ref('');
  const dateFilter = ref('');
  
  // Modal states
  const showCreateStreamModal = ref(false);
  const showUploadModal = ref(false);
  const showMediaPlayerModal = ref(false);
  const showShareModal = ref(false);
  const editingStream = ref(false);
  const showStreamKey = ref(false);
  const linkCopied = ref(false);
  
  // Form states
  const streamForm = ref({
    id: 0,
    title: '',
    platform: 'youtube',
    scheduledDate: '',
    scheduledTime: '',
    description: '',
    thumbnail: '',
    isPublic: true,
    recordStream: true,
    enableChat: true,
    streamKey: ''
  });
  
  const mediaForm = ref({
    title: '',
    category: 'sermon',
    date: '',
    description: '',
    speaker: '',
    tags: '',
    access: 'public'
  });
  
  const uploadFile = ref<File | null>(null);
  const selectedMediaId = ref<number | null>(null);
  const shareLink = ref('https://yourchurch.com/media/123456');
  const embedCode = ref('<iframe width="560" height="315" src="https://yourchurch.com/embed/123456" frameborder="0" allowfullscreen></iframe>');
  
  // Dummy data for streams
  const upcomingStreams = ref([
    {
      id: 1,
      title: 'Sunday Morning Service',
      platform: 'youtube',
      scheduledDate: '2025-03-15',
      scheduledTime: '09:00 AM',
      description: 'Join us for our weekly Sunday morning worship service.',
      thumbnail: 'https://images.unsplash.com/photo-1616627052149-22c4f8a6316e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      isPublic: true,
      recordStream: true,
      enableChat: true,
      streamKey: 'xxxx-xxxx-xxxx-xxxx'
    },
    {
      id: 2,
      title: 'Easter Special Service',
      platform: 'facebook',
      scheduledDate: '2025-03-31',
      scheduledTime: '10:00 AM',
      description: 'Special Easter celebration service with choir performance.',
      thumbnail: 'https://images.unsplash.com/photo-1445264918150-66a2371142a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      isPublic: true,
      recordStream: true,
      enableChat: true,
      streamKey: 'xxxx-xxxx-xxxx-xxxx'
    },
    {
      id: 3,
      title: 'Youth Conference Day 1',
      platform: 'zoom',
      scheduledDate: '2025-04-05',
      scheduledTime: '02:00 PM',
      description: 'First day of our annual youth conference with guest speakers.',
      thumbnail: 'https://images.unsplash.com/photo-1609234656388-0ff363383899?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      isPublic: true,
      recordStream: true,
      enableChat: true,
      streamKey: ''
    }
  ]);
  
  const activeStreams = ref([
    {
      id: 4,
      title: 'Wednesday Bible Study',
      platform: 'youtube',
      startedAt: '45 minutes ago',
      viewerCount: '78',
      thumbnail: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ]);
  
  // Dummy data for archive media
  const archiveMedia = ref([
    {
      id: 1,
      title: 'The Power of Faith',
      category: 'sermon',
      date: 'Mar 10, 2025',
      description: 'Pastor David explores the transformative power of faith in our daily lives.',
      speaker: 'Pastor David Wilson',
      duration: '45:23',
      views: '1.2k',
      thumbnail: 'https://images.unsplash.com/photo-1616627052149-22c4f8a6316e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      videoUrl: '#',
      tags: 'faith, belief, trust, prayer',
      access: 'public'
    },
    {
      id: 2,
      title: 'Understanding Grace',
      category: 'teaching',
      date: 'Mar 3, 2025',
      description: 'A deep dive into the concept of grace and its importance in Christian life.',
      speaker: 'Sarah Johnson',
      duration: '38:15',
      views: '856',
      thumbnail: 'https://images.unsplash.com/photo-1445264918150-66a2371142a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      videoUrl: '#',
      tags: 'grace, mercy, forgiveness',
      access: 'public'
    },
    {
      id: 3,
      title: 'Easter Celebration Service',
      category: 'special',
      date: 'Mar 31, 2024',
      description: 'Full recording of our special Easter celebration service.',
      speaker: 'Pastor David Wilson',
      duration: '1:15:42',
      views: '2.3k',
      thumbnail: 'https://images.unsplash.com/photo-1609234656388-0ff363383899?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      videoUrl: '#',
      tags: 'easter, resurrection, hope',
      access: 'public'
    },
    {
      id: 4,
      title: 'Worship Set - March 10',
      category: 'music',
      date: 'Mar 10, 2025',
      description: 'Full worship set from our Sunday morning service.',
      speaker: 'Worship Team',
      duration: '28:37',
      views: '623',
      thumbnail: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      videoUrl: '#',
      tags: 'worship, praise, music',
      access: 'public'
    },
    {
      id: 5,
      title: 'Finding Peace in Troubled Times',
      category: 'sermon',
      date: 'Feb 25, 2025',
      description: 'Pastor David shares biblical principles for finding peace during difficult seasons.',
      speaker: 'Pastor David Wilson',
      duration: '42:18',
      views: '945',
      thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      videoUrl: '#',
      tags: 'peace, anxiety, trust, hope',
      access: 'public'
    },
    {
      id: 6,
      title: 'Youth Conference Keynote',
      category: 'special',
      date: 'Apr 5, 2024',
      description: 'Keynote address from our annual youth conference.',
      speaker: 'Michael Brown',
      duration: '52:09',
      views: '734',
      thumbnail: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      videoUrl: '#',
      tags: 'youth, purpose, calling',
      access: 'public'
    },
    {
      id: 7,
      title: 'Bible Study - Book of Romans',
      category: 'teaching',
      date: 'Mar 13, 2025',
      description: 'In-depth study of the Book of Romans, part 1.',
      speaker: 'John Smith',
      duration: '55:21',
      views: '512',
      thumbnail: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      videoUrl: '#',
      tags: 'bible study, romans, theology',
      access: 'members'
    },
    {
      id: 8,
      title: 'Prayer Workshop',
      category: 'teaching',
      date: 'Mar 5, 2025',
      description: 'Practical workshop on developing a meaningful prayer life.',
      speaker: 'Emily Davis',
      duration: '1:08:45',
      views: '678',
      thumbnail: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      videoUrl: '#',
      tags: 'prayer, spiritual disciplines',
      access: 'public'
    }
  ]);
  
  // Computed properties
  const filteredArchiveMedia = computed(() => {
    let result = [...archiveMedia.value];
    
    // Apply search filter
    if (archiveSearchQuery.value) {
      const search = archiveSearchQuery.value.toLowerCase();
      result = result.filter(
        media => media.title.toLowerCase().includes(search) ||
                 media.description.toLowerCase().includes(search) ||
                 media.speaker.toLowerCase().includes(search) ||
                 media.tags.toLowerCase().includes(search)
      );
    }
    
    // Apply category filter
    if (categoryFilter.value) {
      result = result.filter(media => media.category === categoryFilter.value);
    }
    
    // Apply date filter
    if (dateFilter.value) {
      const now = new Date();
      let cutoffDate = new Date();
      
      if (dateFilter.value === 'week') {
        cutoffDate.setDate(now.getDate() - 7);
      } else if (dateFilter.value === 'month') {
        cutoffDate.setMonth(now.getMonth() - 1);
      } else if (dateFilter.value === 'year') {
        cutoffDate.setFullYear(now.getFullYear() - 1);
      }
      
      result = result.filter(media => {
        const mediaDate = new Date(media.date);
        return mediaDate >= cutoffDate;
      });
    }
    
    return result;
  });
  
  const selectedMedia = computed(() => {
    if (selectedMediaId.value === null) return null;
    return archiveMedia.value.find(m => m.id === selectedMediaId.value) || null;
  });
  
  // Methods
  const closeCreateStreamModal = () => {
    showCreateStreamModal.value = false;
    resetStreamForm();
  };
  
  const resetStreamForm = () => {
    streamForm.value = {
      id: 0,
      title: '',
      platform: 'youtube',
      scheduledDate: '',
      scheduledTime: '',
      description: '',
      thumbnail: '',
      isPublic: true,
      recordStream: true,
      enableChat: true,
      streamKey: ''
    };
    editingStream.value = false;
    showStreamKey.value = false;
  };
  
  const toggleStreamKeyVisibility = () => {
    showStreamKey.value = !showStreamKey.value;
  };
  
  const saveStream = () => {
    if (editingStream.value) {
      // Update existing stream
      const index = upcomingStreams.value.findIndex(s => s.id === streamForm.value.id);
      if (index !== -1) {
        upcomingStreams.value[index] = { ...streamForm.value };
      }
    } else {
      // Create new stream
      const newId = Math.max(0, ...upcomingStreams.value.map(s => s.id)) + 1;
      upcomingStreams.value.push({
        ...streamForm.value,
        id: newId
      });
    }
    
    showCreateStreamModal.value = false;
    resetStreamForm();
  };
  
  const editStream = (stream: any) => {
    streamForm.value = { ...stream };
    editingStream.value = true;
    showCreateStreamModal.value = true;
  };
  
  const startStream = (stream: any) => {
    // Remove from upcoming streams
    upcomingStreams.value = upcomingStreams.value.filter(s => s.id !== stream.id);
    
    // Add to active streams
    activeStreams.value.push({
      id: stream.id,
      title: stream.title,
      platform: stream.platform,
      startedAt: 'just now',
      viewerCount: '0',
      thumbnail: stream.thumbnail
    });
  };
  
  const viewStream = (stream: any) => {
    // In a real app, this would navigate to the stream view
    console.log('Viewing stream:', stream);
  };
  
  const endStream = (stream: any) => {
    // Remove from active streams
    activeStreams.value = activeStreams.value.filter(s => s.id !== stream.id);
    
    // Add to archive media
    const newId = Math.max(0, ...archiveMedia.value.map(m => m.id)) + 1;
    archiveMedia.value.push({
      id: newId,
      title: stream.title,
      category: 'special',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      description: 'Recorded live stream',
      speaker: '',
      duration: '1:15:00',
      views: '0',
      thumbnail: stream.thumbnail,
      videoUrl: '#',
      tags: 'live, stream',
      access: 'public'
    });
  };
  
  const handleFileUpload = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      uploadFile.value = input.files[0];
    }
  };
  
  const uploadMedia = () => {
    // In a real app, this would upload the file to a server
    const newId = Math.max(0, ...archiveMedia.value.map(m => m.id)) + 1;
    
    // Generate a random duration between 30 and 90 minutes
    const minutes = Math.floor(Math.random() * 60) + 30;
    const seconds = Math.floor(Math.random() * 60);
    const duration = `${Math.floor(minutes / 60)}:${minutes % 60}:${seconds.toString().padStart(2, '0')}`;
    
    archiveMedia.value.push({
      id: newId,
      title: mediaForm.value.title,
      category: mediaForm.value.category,
      date: new Date(mediaForm.value.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      description: mediaForm.value.description,
      speaker: mediaForm.value.speaker,
      duration: duration,
      views: '0',
      thumbnail: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      videoUrl: '#',
      tags: mediaForm.value.tags,
      access: mediaForm.value.access
    });
    
    // Reset form and close modal
    mediaForm.value = {
      title: '',
      category: 'sermon',
      date: '',
      description: '',
      speaker: '',
      tags: '',
      access: 'public'
    };
    uploadFile.value = null;
    showUploadModal.value = false;
  };
  
  const playMedia = (media: any) => {
    selectedMediaId.value = media.id;
    showMediaPlayerModal.value = true;
  };
  
  const shareMedia = (media: any) => {
    selectedMediaId.value = media.id;
    shareLink.value = `https://yourchurch.com/media/${media.id}`;
    embedCode.value = `<iframe width="560" height="315" src="https://yourchurch.com/embed/${media.id}" frameborder="0" allowfullscreen></iframe>`;
    showShareModal.value = true;
    linkCopied.value = false;
  };
  
  const copyShareLink = () => {
    navigator.clipboard.writeText(shareLink.value);
    linkCopied.value = true;
    
    // Reset after 2 seconds
    setTimeout(() => {
      linkCopied.value = false;
    }, 2000);
  };
  
  const downloadMedia = (media: any) => {
    // In a real app, this would download the media file
    console.log('Downloading media:', media);
  };
  
  const addToPlaylist = (media: any) => {
    // In a real app, this would add the media to a playlist
    console.log('Adding to playlist:', media);
  };
  
  // Initialize with today's date for the forms
  onMounted(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    streamForm.value.scheduledDate = formattedDate;
    mediaForm.value.date = formattedDate;
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
  
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>