<template>
    <main>
      <div class="space-y-8">
        <!-- Page header -->
        <div class="sm:flex sm:items-center sm:justify-between">
          <div>
            <h2 class="text-2xl font-bold leading-7 text-gray-900">Document Storage</h2>
            <p class="mt-1 text-sm text-gray-500">Secure repository for church policies, agreements, and compliance documents</p>
          </div>
          <div class="mt-4 flex sm:ml-4 sm:mt-0">
            <button
              type="button"
              @click="openUploadModal"
              class="inline-flex items-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            >
              <Upload class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              Upload Document
            </button>
          </div>
        </div>
  
        <!-- Search and filters -->
        <div class="bg-white shadow rounded-lg animate-fade-in">
          <div class="px-4 py-5 sm:p-6">
            <div class="sm:flex sm:items-center sm:justify-between">
              <div class="w-full max-w-lg">
                <label for="search" class="sr-only">Search</label>
                <div class="relative">
                  <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search class="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="search"
                    v-model="searchQuery"
                    class="block w-full rounded-md border-0 py-2 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                    placeholder="Search documents..."
                    type="search"
                  />
                </div>
              </div>
              <div class="mt-4 flex space-x-3 sm:ml-4 sm:mt-0">
                <Menu as="div" class="relative inline-block text-left">
                  <div>
                    <MenuButton class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      Category
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
                        <MenuItem v-for="category in categories" :key="category.id" v-slot="{ active }">
                          <a
                            href="#"
                            @click.prevent="selectedCategory = category.id === selectedCategory ? null : category.id"
                            :class="[
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm flex items-center'
                            ]"
                          >
                            <Check 
                              v-if="selectedCategory === category.id" 
                              class="mr-2 h-4 w-4 text-teal-600" 
                            />
                            <span v-else class="mr-6"></span>
                            {{ category.name }}
                          </a>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </transition>
                </Menu>
  
                <Menu as="div" class="relative inline-block text-left">
                  <div>
                    <MenuButton class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      Status
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
                              class="mr-2 h-4 w-4 text-teal-600" 
                            />
                            <span v-else class="mr-6"></span>
                            {{ status.name }}
                          </a>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </transition>
                </Menu>
  
                <button
                  type="button"
                  @click="clearFilters"
                  class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <XCircle class="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Folder navigation -->
        <div class="bg-white shadow rounded-lg animate-fade-in animation-delay-100">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center space-x-2 text-sm text-gray-500 mb-4">
              <button 
                @click="currentFolder = null" 
                class="hover:text-teal-600 transition-colors"
                :class="{ 'text-teal-600 font-medium': !currentFolder }"
              >
                All Documents
              </button>
              <template v-if="currentFolder">
                <ChevronRight class="h-4 w-4" />
                <span class="text-teal-600 font-medium">{{ getFolderName(currentFolder) }}</span>
              </template>
            </div>
  
            <div v-if="!currentFolder" class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <button
                v-for="folder in folders"
                :key="folder.id"
                @click="currentFolder = folder.id"
                class="relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 text-left"
              >
                <div class="flex items-center">
                  <div class="inline-flex rounded-lg p-2 bg-teal-100">
                    <Folder class="h-5 w-5 text-teal-600" />
                  </div>
                  <div class="ml-3">
                    <h4 class="text-sm font-medium text-gray-900">{{ folder.name }}</h4>
                    <p class="text-xs text-gray-500 mt-1">{{ folder.count }} documents</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
  
        <!-- Document list -->
        <div class="bg-white shadow rounded-lg animate-fade-in animation-delay-200">
          <div class="px-4 py-5 sm:p-6">
            <div class="sm:flex sm:items-center sm:justify-between">
              <h3 class="text-base font-semibold leading-6 text-gray-900">
                {{ currentFolder ? getFolderName(currentFolder) : 'All Documents' }}
              </h3>
              <div class="mt-3 flex sm:ml-4 sm:mt-0">
                <span class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                  {{ filteredDocuments.length }} documents
                </span>
              </div>
            </div>
  
            <div class="mt-6 flow-root">
              <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table v-if="filteredDocuments.length > 0" class="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Name</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Category</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Last Modified</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Access</th>
                        <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                          <span class="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr v-for="document in filteredDocuments" :key="document.id" class="hover:bg-gray-50 transition-colors">
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          <div class="flex items-center">
                            <component :is="getDocumentIcon(document.type)" :class="[
                              'h-5 w-5 mr-2',
                              document.type === 'pdf' ? 'text-red-500' :
                              document.type === 'docx' ? 'text-blue-500' :
                              document.type === 'xlsx' ? 'text-green-500' :
                              'text-gray-500'
                            ]" />
                            <a 
                              href="#" 
                              @click.prevent="openDocumentPreview(document)"
                              class="hover:text-teal-600 hover:underline transition-colors"
                            >
                              {{ document.name }}
                            </a>
                          </div>
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ document.category }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ formatDate(document.lastModified) }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm">
                          <span :class="[
                            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                            document.status === 'active' ? 'bg-green-100 text-green-800' :
                            document.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                            document.status === 'archived' ? 'bg-gray-100 text-gray-800' :
                            'bg-red-100 text-red-800'
                          ]">
                            {{ document.status }}
                          </span>
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ document.access }}</td>
                        <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <Menu as="div" class="relative inline-block text-left">
                            <div>
                              <MenuButton class="inline-flex items-center rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
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
                                      @click.prevent="openDocumentPreview(document)"
                                      :class="[
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'flex px-4 py-2 text-sm items-center'
                                      ]"
                                    >
                                      <Eye class="mr-3 h-5 w-5 text-gray-400" />
                                      View
                                    </a>
                                  </MenuItem>
                                  <MenuItem v-slot="{ active }">
                                    <a
                                      href="#"
                                      @click.prevent="downloadDocument(document)"
                                      :class="[
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'flex px-4 py-2 text-sm items-center'
                                      ]"
                                    >
                                      <Download class="mr-3 h-5 w-5 text-gray-400" />
                                      Download
                                    </a>
                                  </MenuItem>
                                  <MenuItem v-slot="{ active }">
                                    <a
                                      href="#"
                                      @click.prevent="shareDocument(document)"
                                      :class="[
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'flex px-4 py-2 text-sm items-center'
                                      ]"
                                    >
                                      <Share2 class="mr-3 h-5 w-5 text-gray-400" />
                                      Share
                                    </a>
                                  </MenuItem>
                                  <div class="border-t border-gray-100"></div>
                                  <MenuItem v-slot="{ active }">
                                    <a
                                      href="#"
                                      @click.prevent="deleteDocument(document)"
                                      :class="[
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'flex px-4 py-2 text-sm items-center text-red-600'
                                      ]"
                                    >
                                      <Trash2 class="mr-3 h-5 w-5 text-red-400" />
                                      Delete
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
                    <FileSearch class="mx-auto h-12 w-12 text-gray-400" />
                    <h3 class="mt-2 text-sm font-semibold text-gray-900">No documents found</h3>
                    <p class="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Upload Document Modal -->
      <TransitionRoot appear :show="isUploadModalOpen" as="template">
        <Dialog as="div" @close="isUploadModalOpen = false" class="relative z-50">
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
                    Upload Document
                  </DialogTitle>
                  <div class="mt-4">
                    <div class="space-y-6">
                      <div>
                        <label for="document-name" class="block text-sm font-medium leading-6 text-gray-900">
                          Document Name
                        </label>
                        <div class="mt-2">
                          <input
                            type="text"
                            id="document-name"
                            v-model="newDocument.name"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                            placeholder="Enter document name"
                          />
                        </div>
                      </div>
  
                      <div>
                        <label for="document-category" class="block text-sm font-medium leading-6 text-gray-900">
                          Category
                        </label>
                        <div class="mt-2">
                          <select
                            id="document-category"
                            v-model="newDocument.categoryId"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                          >
                            <option v-for="category in categories" :key="category.id" :value="category.id">
                              {{ category.name }}
                            </option>
                          </select>
                        </div>
                      </div>
  
                      <div>
                        <label for="document-folder" class="block text-sm font-medium leading-6 text-gray-900">
                          Folder
                        </label>
                        <div class="mt-2">
                          <select
                            id="document-folder"
                            v-model="newDocument.folderId"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                          >
                            <option v-for="folder in folders" :key="folder.id" :value="folder.id">
                              {{ folder.name }}
                            </option>
                          </select>
                        </div>
                      </div>
  
                      <div>
                        <label for="document-access" class="block text-sm font-medium leading-6 text-gray-900">
                          Access Level
                        </label>
                        <div class="mt-2">
                          <select
                            id="document-access"
                            v-model="newDocument.access"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                          >
                            <option value="All Staff">All Staff</option>
                            <option value="Management Only">Management Only</option>
                            <option value="Board Members">Board Members</option>
                            <option value="Admin Only">Admin Only</option>
                          </select>
                        </div>
                      </div>
  
                      <div>
                        <label class="block text-sm font-medium leading-6 text-gray-900">
                          File
                        </label>
                        <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                          <div class="text-center">
                            <Upload class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                            <div class="mt-4 flex text-sm leading-6 text-gray-600">
                              <label
                                for="file-upload"
                                class="relative cursor-pointer rounded-md bg-white font-semibold text-teal-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-teal-600 focus-within:ring-offset-2 hover:text-teal-500"
                              >
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                              </label>
                              <p class="pl-1">or drag and drop</p>
                            </div>
                            <p class="text-xs leading-5 text-gray-600">PDF, DOC, DOCX, XLS, XLSX up to 10MB</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <div class="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      @click="isUploadModalOpen = false"
                      class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      @click="uploadDocument"
                      class="inline-flex justify-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                    >
                      Upload
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
  
      <!-- Document Preview Modal -->
      <TransitionRoot appear :show="isPreviewModalOpen" as="template">
        <Dialog as="div" @close="isPreviewModalOpen = false" class="relative z-50">
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
                <DialogPanel class="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div class="flex justify-between items-center">
                    <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                      {{ selectedDocument?.name }}
                    </DialogTitle>
                    <button
                      type="button"
                      @click="isPreviewModalOpen = false"
                      class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                    >
                      <span class="sr-only">Close</span>
                      <X class="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div class="mt-4">
                    <div class="flex space-x-4 text-sm text-gray-500 mb-4">
                      <div>
                        <span class="font-medium text-gray-900">Category:</span> {{ selectedDocument?.category }}
                      </div>
                      <div>
                        <span class="font-medium text-gray-900">Last Modified:</span> {{ selectedDocument ? formatDate(selectedDocument.lastModified) : '' }}
                      </div>
                      <div>
                        <span class="font-medium text-gray-900">Access:</span> {{ selectedDocument?.access }}
                      </div>
                    </div>
  
                    <div class="border rounded-lg bg-gray-50 h-96 flex items-center justify-center">
                      <div class="text-center">
                        <component :is="selectedDocument ? getDocumentIcon(selectedDocument.type) : FileText" class="mx-auto h-12 w-12 text-gray-400" />
                        <p class="mt-2 text-sm text-gray-500">Preview not available. Please download the document to view its contents.</p>
                      </div>
                    </div>
                  </div>
  
                  <div class="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      @click="downloadDocument(selectedDocument)"
                      class="inline-flex justify-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                    >
                      <Download class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                      Download
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </main>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue';
  import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
  import {
    Upload,
    Search,
    ChevronDown,
    ChevronRight,
    Check,
    XCircle,
    Folder,
    FileText,
    FilePlus,
    FileSpreadsheet,
    MoreVertical,
    Eye,
    Download,
    Share2,
    Trash2,
    FileSearch,
    X
  } from 'lucide-vue-next';
  
  const router = useRouter();
  const searchQuery = ref('');
  const selectedCategory = ref(null);
  const selectedStatus = ref(null);
  const currentFolder = ref(null);
  const isUploadModalOpen = ref(false);
  const isPreviewModalOpen = ref(false);
  const selectedDocument = ref(null);
  
  // New document form data
  const newDocument = ref({
    name: '',
    categoryId: 1,
    folderId: 1,
    access: 'All Staff'
  });
  
  definePageMeta({
    layout: 'dashboard'
})

  // Categories
  const categories = [
    { id: 1, name: 'Policies & Procedures' },
    { id: 2, name: 'Corporate Documents' },
    { id: 3, name: 'Financial Documents' },
    { id: 4, name: 'Legal Agreements' },
    { id: 5, name: 'Compliance Reports' }
  ];
  
  // Statuses
  const statuses = [
    { id: 'active', name: 'Active' },
    { id: 'draft', name: 'Draft' },
    { id: 'archived', name: 'Archived' },
    { id: 'expired', name: 'Expired' }
  ];
  
  // Folders
  const folders = [
    { id: 1, name: 'Policies & Procedures', count: 45 },
    { id: 2, name: 'Board Documents', count: 23 },
    { id: 3, name: 'Financial Records', count: 37 },
    { id: 4, name: 'Legal Agreements', count: 18 },
    { id: 5, name: 'Compliance Reports', count: 33 }
  ];
  
  // Documents
  const documents = [
    {
      id: 1,
      name: 'Privacy Policy.pdf',
      type: 'pdf',
      category: 'Policies & Procedures',
      categoryId: 1,
      folderId: 1,
      lastModified: '2024-03-01',
      status: 'active',
      access: 'All Staff'
    },
    {
      id: 2,
      name: 'Board Meeting Minutes.docx',
      type: 'docx',
      category: 'Corporate Documents',
      categoryId: 2,
      folderId: 2,
      lastModified: '2024-02-15',
      status: 'active',
      access: 'Board Members'
    },
    {
      id: 3,
      name: 'Annual Financial Report.xlsx',
      type: 'xlsx',
      category: 'Financial Documents',
      categoryId: 3,
      folderId: 3,
      lastModified: '2024-01-20',
      status: 'active',
      access: 'Management Only'
    },
    {
      id: 4,
      name: 'Vendor Agreement.pdf',
      type: 'pdf',
      category: 'Legal Agreements',
      categoryId: 4,
      folderId: 4,
      lastModified: '2024-02-28',
      status: 'active',
      access: 'Management Only'
    },
    {
      id: 5,
      name: 'Tax Compliance Report.pdf',
      type: 'pdf',
      category: 'Compliance Reports',
      categoryId: 5,
      folderId: 5,
      lastModified: '2024-03-05',
      status: 'active',
      access: 'Admin Only'
    },
    {
      id: 6,
      name: 'Employee Handbook.docx',
      type: 'docx',
      category: 'Policies & Procedures',
      categoryId: 1,
      folderId: 1,
      lastModified: '2023-12-10',
      status: 'active',
      access: 'All Staff'
    },
    {
      id: 7,
      name: 'Donation Policy.pdf',
      type: 'pdf',
      category: 'Policies & Procedures',
      categoryId: 1,
      folderId: 1,
      lastModified: '2024-01-15',
      status: 'draft',
      access: 'Management Only'
    },
    {
      id: 8,
      name: 'Budget Forecast.xlsx',
      type: 'xlsx',
      category: 'Financial Documents',
      categoryId: 3,
      folderId: 3,
      lastModified: '2024-02-01',
      status: 'active',
      access: 'Management Only'
    }
  ];
  
  // Filtered documents
  const filteredDocuments = computed(() => {
    return documents.filter(doc => {
      // Filter by search query
      if (searchQuery.value && !doc.name.toLowerCase().includes(searchQuery.value.toLowerCase())) {
        return false;
      }
      
      // Filter by category
      if (selectedCategory.value && doc.categoryId !== selectedCategory.value) {
        return false;
      }
      
      // Filter by status
      if (selectedStatus.value && doc.status !== selectedStatus.value) {
        return false;
      }
      
      // Filter by folder
      if (currentFolder.value && doc.folderId !== currentFolder.value) {
        return false;
      }
      
      return true;
    });
  });
  
  // Helper functions
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  const getFolderName = (folderId: number) => {
    const folder = folders.find(f => f.id === folderId);
    return folder ? folder.name : '';
  };
  
  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return FileText;
      case 'docx':
        return FilePlus;
      case 'xlsx':
        return FileSpreadsheet;
      default:
        return FileText;
    }
  };
  
  // Action functions
  const clearFilters = () => {
    searchQuery.value = '';
    selectedCategory.value = null;
    selectedStatus.value = null;
  };
  
  const openUploadModal = () => {
    newDocument.value = {
      name: '',
      categoryId: 1,
      folderId: currentFolder.value || 1,
      access: 'All Staff'
    };
    isUploadModalOpen.value = true;
  };
  
  const uploadDocument = () => {
    // In a real app, this would upload the document to the server
    // For now, we'll just add it to our local array
    const newDoc = {
      id: documents.length + 1,
      name: newDocument.value.name,
      type: 'pdf', // Assuming PDF for demo
      category: categories.find(c => c.id === newDocument.value.categoryId)?.name || '',
      categoryId: newDocument.value.categoryId,
      folderId: newDocument.value.folderId,
      lastModified: new Date().toISOString().split('T')[0],
      status: 'active',
      access: newDocument.value.access
    };
    
    documents.push(newDoc);
    isUploadModalOpen.value = false;
    
    // Show success message (in a real app)
    alert('Document uploaded successfully!');
  };
  
  const openDocumentPreview = (document: any) => {
    selectedDocument.value = document;
    isPreviewModalOpen.value = true;
  };
  
  const downloadDocument = (document: any) => {
    // In a real app, this would download the document
    // For now, we'll just show an alert
    alert(`Downloading ${document.name}...`);
  };
  
  const shareDocument = (document: any) => {
    // In a real app, this would open a sharing dialog
    // For now, we'll just show an alert
    alert(`Sharing ${document.name}...`);
  };
  
  const deleteDocument = (document: any) => {
    // In a real app, this would delete the document after confirmation
    if (confirm(`Are you sure you want to delete ${document.name}?`)) {
      const index = documents.findIndex(d => d.id === document.id);
      if (index !== -1) {
        documents.splice(index, 1);
        alert('Document deleted successfully!');
      }
    }
  };
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
  