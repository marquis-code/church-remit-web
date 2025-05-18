<template>
  <NuxtLayout name="facilities">
    <div class="space-y-8">
      <!-- Page header -->
      <div class="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 class="text-2xl font-bold leading-7 text-gray-900">Asset Tracking</h2>
          <p class="mt-1 text-sm text-gray-500">Manage inventory, maintenance, and asset lifecycle</p>
        </div>
        <div class="mt-4 flex sm:ml-4 sm:mt-0">
          <button
            type="button"
            @click="openAddAssetModal"
            class="inline-flex items-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
          >
            <Plus class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Add Asset
          </button>
        </div>
      </div>

      <!-- Asset Overview -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in">
        <div v-for="(stat, index) in assetStats" :key="stat.name" 
          class="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:pt-6 transform transition-all duration-300 hover:shadow-md hover:-translate-y-1"
        >
          <dt>
            <div :class="[
              'absolute rounded-md p-3',
              stat.bgColor
            ]">
              <component :is="stat.icon" class="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p class="ml-16 truncate text-sm font-medium text-gray-500">{{ stat.name }}</p>
          </dt>
          <dd class="ml-16 flex items-baseline">
            <p class="text-2xl font-semibold text-gray-900">{{ stat.value }}</p>
            <p v-if="stat.change" :class="[
              stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
              'ml-2 flex items-baseline text-sm font-semibold'
            ]">
              <component :is="stat.changeType === 'increase' ? TrendingUp : TrendingDown" 
                class="h-5 w-5 flex-shrink-0 self-center" 
                aria-hidden="true" 
              />
              <span class="sr-only">
                {{ stat.changeType === 'increase' ? 'Increased' : 'Decreased' }} by
              </span>
              {{ stat.change }}
            </p>
          </dd>
        </div>
      </div>

      <!-- Asset Value Chart -->
      <div class="bg-white shadow rounded-lg animate-fade-in animation-delay-100">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-base font-semibold leading-6 text-gray-900">Asset Value by Category</h3>
          <div class="mt-6 h-80">
            <div class="relative h-full">
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="h-full w-full">
                  <ClientOnly>
                    <div class="h-full w-full" ref="assetChartRef"></div>
                  </ClientOnly>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Asset Inventory -->
      <div class="bg-white shadow rounded-lg animate-fade-in animation-delay-200">
        <div class="px-4 py-5 sm:p-6">
          <div class="sm:flex sm:items-center sm:justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900">Asset Inventory</h3>
            <div class="mt-3 flex sm:ml-4 sm:mt-0">
              <div class="relative">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="search"
                  v-model="searchQuery"
                  class="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                  placeholder="Search assets..."
                />
              </div>
              <Menu as="div" class="relative ml-3 inline-block text-left">
                <div>
                  <MenuButton class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    Filter
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
                      <div class="px-4 py-2 text-xs font-medium text-gray-700">Category</div>
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
                            class="mr-2 h-4 w-4 text-violet-600" 
                          />
                          <span v-else class="mr-6"></span>
                          {{ category.name }}
                        </a>
                      </MenuItem>
                      <div class="border-t border-gray-100"></div>
                      <div class="px-4 py-2 text-xs font-medium text-gray-700">Status</div>
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
                            class="mr-2 h-4 w-4 text-violet-600" 
                          />
                          <span v-else class="mr-6"></span>
                          {{ status.name }}
                        </a>
                      </MenuItem>
                      <div class="border-t border-gray-100"></div>
                      <MenuItem v-slot="{ active }">
                        <a
                          href="#"
                          @click.prevent="clearFilters"
                          :class="[
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          ]"
                        >
                          Clear filters
                        </a>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>

          <div class="mt-6 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table v-if="filteredAssets.length > 0" class="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Asset</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Category</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Location</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Purchase Date</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Value</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                        <span class="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    <tr v-for="asset in filteredAssets" :key="asset.id" class="hover:bg-gray-50 transition-colors">
                      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        <div class="flex items-center">
                          <component :is="getAssetIcon(asset.category)" :class="[
                            'h-5 w-5 mr-2',
                            asset.category === 'electronics' ? 'text-blue-500' :
                            asset.category === 'furniture' ? 'text-amber-500' :
                            asset.category === 'vehicle' ? 'text-emerald-500' :
                            'text-violet-500'
                          ]" />
                          <a 
                            href="#" 
                            @click.prevent="viewAssetDetails(asset)"
                            class="hover:text-violet-600 hover:underline transition-colors"
                          >
                            {{ asset.name }}
                          </a>
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ getCategoryName(asset.category) }}</td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ asset.location }}</td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ formatDateShort(asset.purchaseDate) }}</td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${{ asset.value.toLocaleString() }}</td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm">
                        <span :class="[
                          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                          asset.status === 'active' ? 'bg-green-100 text-green-800' :
                          asset.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                          asset.status === 'retired' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        ]">
                          {{ asset.status }}
                        </span>
                      </td>
                      <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <Menu as="div" class="relative inline-block text-left">
                          <div>
                            <MenuButton class="inline-flex items-center rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2">
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
                                    @click.prevent="viewAssetDetails(asset)"
                                    :class="[
                                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                      'flex px-4 py-2 text-sm items-center'
                                    ]"
                                  >
                                    <Eye class="mr-3 h-5 w-5 text-gray-400" />
                                    View Details
                                  </a>
                                </MenuItem>
                                <MenuItem v-slot="{ active }">
                                  <a
                                    href="#"
                                    @click.prevent="scheduleMaintenance(asset)"
                                    :class="[
                                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                      'flex px-4 py-2 text-sm items-center'
                                    ]"
                                  >
                                    <Wrench class="mr-3 h-5 w-5 text-gray-400" />
                                    Schedule Maintenance
                                  </a>
                                </MenuItem>
                                <MenuItem v-slot="{ active }">
                                  <a
                                    href="#"
                                    @click.prevent="editAsset(asset)"
                                    :class="[
                                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                      'flex px-4 py-2 text-sm items-center'
                                    ]"
                                  >
                                    <Edit class="mr-3 h-5 w-5 text-gray-400" />
                                    Edit
                                  </a>
                                </MenuItem>
                                <div class="border-t border-gray-100"></div>
                                <MenuItem v-slot="{ active }">
                                  <a
                                    href="#"
                                    @click.prevent="retireAsset(asset)"
                                    :class="[
                                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                      'flex px-4 py-2 text-sm items-center text-red-600'
                                    ]"
                                  >
                                    <Archive class="mr-3 h-5 w-5 text-red-400" />
                                    Retire Asset
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
                  <Boxes class="mx-auto h-12 w-12 text-gray-400" />
                  <h3 class="mt-2 text-sm font-semibold text-gray-900">No assets found</h3>
                  <p class="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Maintenance Schedule -->
      <div class="bg-white shadow rounded-lg animate-fade-in animation-delay-300">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900">Maintenance Schedule</h3>
            <button
              type="button"
              @click="openScheduleMaintenanceModal"
              class="inline-flex items-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
            >
              <Plus class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              Schedule Maintenance
            </button>
          </div>
          <div class="mt-6 flow-root">
            <ul role="list" class="divide-y divide-gray-200">
              <li v-for="task in maintenanceTasks" :key="task.id" class="py-4">
                <div class="flex items-center space-x-4">
                  <div class="flex-shrink-0">
                    <span :class="[
                      'inline-flex h-8 w-8 items-center justify-center rounded-full',
                      task.priority === 'high' ? 'bg-red-100' :
                      task.priority === 'medium' ? 'bg-yellow-100' :
                      'bg-blue-100'
                    ]">
                      <Wrench :class="[
                        'h-5 w-5',
                        task.priority === 'high' ? 'text-red-600' :
                        task.priority === 'medium' ? 'text-yellow-600' :
                        'text-blue-600'
                      ]" />
                    </span>
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="truncate text-sm font-medium text-gray-900">{{ task.asset }}</p>
                    <p class="truncate text-sm text-gray-500">{{ task.description }}</p>
                  </div>
                  <div class="flex-shrink-0">
                    <p class="text-sm text-gray-500">Due: {{ task.dueDate }}</p>
                  </div>
                  <div>
                    <button
                      type="button"
                      @click="completeTask(task)"
                      class="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      <CheckCircle class="h-4 w-4 text-green-500 mr-1" />
                      Complete
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Asset Modal -->
    <TransitionRoot appear :show="isAddAssetModalOpen" as="template">
      <Dialog as="div" @close="isAddAssetModalOpen = false" class="relative z-50">
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
                  Add New Asset
                </DialogTitle>
                <div class="mt-4">
                  <div class="space-y-6">
                    <div>
                      <label for="asset-name" class="block text-sm font-medium leading-6 text-gray-900">
                        Asset Name
                      </label>
                      <div class="mt-2">
                        <input
                          type="text"
                          id="asset-name"
                          v-model="newAsset.name"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                          placeholder="Enter asset name"
                        />
                      </div>
                    </div>

                    <div>
                      <label for="asset-category" class="block text-sm font-medium leading-6 text-gray-900">
                        Category
                      </label>
                      <div class="mt-2">
                        <select
                          id="asset-category"
                          v-model="newAsset.category"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                        >
                          <option value="electronics">Electronics</option>
                          <option value="furniture">Furniture</option>
                          <option value="vehicle">Vehicle</option>
                          <option value="musical">Musical Equipment</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label for="asset-location" class="block text-sm font-medium leading-6 text-gray-900">
                        Location
                      </label>
                      <div class="mt-2">
                        <input
                          type="text"
                          id="asset-location"
                          v-model="newAsset.location"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                          placeholder="Enter asset location"
                        />
                      </div>
                    </div>

                    <div>
                      <label for="asset-purchase-date" class="block text-sm font-medium leading-6 text-gray-900">
                        Purchase Date
                      </label>
                      <div class="mt-2">
                        <input
                          type="date"
                          id="asset-purchase-date"
                          v-model="newAsset.purchaseDate"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <label for="asset-value" class="block text-sm font-medium leading-6 text-gray-900">
                        Value ($)
                      </label>
                      <div class="mt-2">
                        <input
                          type="number"
                          id="asset-value"
                          v-model="newAsset.value"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                          placeholder="Enter asset value"
                        />
                      </div>
                    </div>

                    <div>
                      <label for="asset-notes" class="block text-sm font-medium leading-6 text-gray-900">
                        Notes
                      </label>
                      <div class="mt-2">
                        <textarea
                          id="asset-notes"
                          v-model="newAsset.notes"
                          rows="3"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                          placeholder="Enter any additional notes"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    @click="isAddAssetModalOpen = false"
                    class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    @click="addAsset"
                    class="inline-flex justify-center rounded-md border border-transparent bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                  >
                    Add
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Asset Details Modal -->
    <TransitionRoot appear :show="isDetailsModalOpen" as="template">
      <Dialog as="div" @close="isDetailsModalOpen = false" class="relative z-50">
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
              <DialogPanel class="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div class="flex justify-between items-center">
                  <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                    {{ selectedAsset?.name }}
                  </DialogTitle>
                  <button
                    type="button"
                    @click="isDetailsModalOpen = false"
                    class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                  >
                    <span class="sr-only">Close</span>
                    <X class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <!-- <div class="mt-4">
                  <div  />
                  </button>
                </div> -->
                <div class="mt-4">
                  <div class="bg-violet-50 p-4 rounded-lg mb-4">
                    <div class="flex justify-between">
                      <div>
                        <span class="inline-flex items-center rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-medium text-violet-800">
                          {{ selectedAsset ? getCategoryName(selectedAsset.category) : '' }}
                        </span>
                        <span :class="[
                          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ml-2',
                          selectedAsset?.status === 'active' ? 'bg-green-100 text-green-800' :
                          selectedAsset?.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                          selectedAsset?.status === 'retired' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        ]">
                          {{ selectedAsset?.status }}
                        </span>
                      </div>
                      <div>
                        <span class="text-sm font-medium text-gray-900">${{ selectedAsset?.value.toLocaleString() }}</span>
                      </div>
                    </div>
                  </div>

                  <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 class="text-sm font-medium text-gray-500">Location</h4>
                      <p class="mt-1 text-sm text-gray-900">{{ selectedAsset?.location }}</p>
                    </div>
                    <div>
                      <h4 class="text-sm font-medium text-gray-500">Purchase Date</h4>
                      <p class="mt-1 text-sm text-gray-900">{{ selectedAsset ? formatDateShort(selectedAsset.purchaseDate) : '' }}</p>
                    </div>
                  </div>

                  <div class="border-t border-gray-200 pt-4">
                    <h4 class="text-sm font-medium text-gray-500 mb-2">Maintenance History</h4>
                    <ul role="list" class="space-y-4">
                      <li v-for="(record, index) in selectedAsset?.maintenanceHistory || []" :key="index" class="relative flex gap-x-4">
                        <div class="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                          <div class="w-px bg-gray-200"></div>
                        </div>
                        <div class="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                          <Wrench class="h-4 w-4 text-violet-600" aria-hidden="true" />
                        </div>
                        <div class="flex-auto py-0.5 text-sm leading-5 text-gray-500">
                          <span class="font-medium text-gray-900">{{ record.type }}</span> - {{ record.description }}
                          <span class="whitespace-nowrap text-gray-400">{{ record.date }}</span>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div class="border-t border-gray-200 pt-4 mt-4">
                    <h4 class="text-sm font-medium text-gray-500 mb-2">Notes</h4>
                    <p class="text-sm text-gray-900">{{ selectedAsset?.notes || 'No additional notes provided.' }}</p>
                  </div>
                </div>

                <div class="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    @click="scheduleMaintenance(selectedAsset)"
                    class="inline-flex justify-center rounded-md border border-transparent bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                  >
                    <Wrench class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                    Schedule Maintenance
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import {
  Plus,
  Search,
  ChevronDown,
  Check,
  Tv,
  Boxes,
  MoreVertical,
  Eye,
  Wrench,
  Edit,
  Archive,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Music,
  Car,
  X
} from 'lucide-vue-next';

const router = useRouter();
const searchQuery = ref('');
const selectedCategory = ref(null);
const selectedStatus = ref(null);
const isAddAssetModalOpen = ref(false);
const isDetailsModalOpen = ref(false);
const selectedAsset = ref(null);
const assetChartRef = ref(null);

// Asset statistics
const assetStats = [
  {
    name: 'Total Assets',
    value: '156',
    change: '12',
    changeType: 'increase',
    icon: Boxes,
    bgColor: 'bg-violet-600'
  },
  {
    name: 'Asset Value',
    value: '$124.5k',
    change: '8%',
    changeType: 'increase',
    icon: DollarSign,
    bgColor: 'bg-emerald-600'
  },
  {
    name: 'Maintenance Due',
    value: '5',
    change: '2',
    changeType: 'increase',
    icon: Wrench,
    bgColor: 'bg-amber-600'
  },
  {
    name: 'Depreciation Rate',
    value: '15%',
    change: '3%',
    changeType: 'decrease',
    icon: TrendingDown,
    bgColor: 'bg-blue-600'
  }
];

// Categories
const categories = [
  { id: 'electronics', name: 'Electronics' },
  { id: 'furniture', name: 'Furniture' },
  { id: 'vehicle', name: 'Vehicle' },
  { id: 'musical', name: 'Musical Equipment' },
  { id: 'other', name: 'Other' }
];

// Statuses
const statuses = [
  { id: 'active', name: 'Active' },
  { id: 'maintenance', name: 'Maintenance' },
  { id: 'retired', name: 'Retired' }
];

definePageMeta({
    layout: 'dashboard'
})

// Assets
const assets = [
  {
    id: 1,
    name: 'Sound System',
    category: 'electronics',
    location: 'Main Sanctuary',
    purchaseDate: '2022-05-15',
    value: 12500,
    status: 'active',
    notes: 'Complete sound system including mixer, speakers, and amplifiers.',
    maintenanceHistory: [
      { type: 'Inspection', description: 'Annual inspection completed', date: 'Jan 15, 2024' },
      { type: 'Repair', description: 'Replaced faulty speaker cable', date: 'Oct 10, 2023' }
    ]
  },
  {
    id: 2,
    name: 'Projector',
    category: 'electronics',
    location: 'Main Sanctuary',
    purchaseDate: '2023-02-10',
    value: 3200,
    status: 'active',
    notes: 'HD projector with wireless connectivity.',
    maintenanceHistory: [
      { type: 'Cleaning', description: 'Cleaned lens and filters', date: 'Feb 5, 2024' }
    ]
  },
  {
    id: 3,
    name: 'Church Van',
    category: 'vehicle',
    location: 'Parking Lot',
    purchaseDate: '2020-07-22',
    value: 35000,
    status: 'maintenance',
    notes: 'Ford Transit 15-passenger van.',
    maintenanceHistory: [
      { type: 'Service', description: 'Regular oil change and inspection', date: 'Mar 1, 2024' },
      { type: 'Repair', description: 'Replaced brake pads', date: 'Dec 12, 2023' },
      { type: 'Service', description: 'Tire rotation', date: 'Sep 5, 2023' }
    ]
  },
  {
    id: 4,
    name: 'Sanctuary Chairs (Set of 200)',
    category: 'furniture',
    location: 'Main Sanctuary',
    purchaseDate: '2021-03-15',
    value: 15000,
    status: 'active',
    notes: 'Padded chairs with book holders.',
    maintenanceHistory: [
      { type: 'Cleaning', description: 'Deep cleaning of all chairs', date: 'Jan 20, 2024' },
      { type: 'Repair', description: 'Repaired 5 damaged chairs', date: 'Nov 5, 2023' }
    ]
  },
  {
    id: 5,
    name: 'Digital Piano',
    category: 'musical',
    location: 'Worship Area',
    purchaseDate: '2022-11-30',
    value: 4500,
    status: 'active',
    notes: 'Yamaha digital piano with stand and bench.',
    maintenanceHistory: [
      { type: 'Tuning', description: 'Digital calibration', date: 'Feb 15, 2024' }
    ]
  },
  {
    id: 6,
    name: 'Air Conditioning System',
    category: 'other',
    location: 'Main Building',
    purchaseDate: '2019-06-10',
    value: 22000,
    status: 'maintenance',
    notes: 'Central air conditioning system for the main building.',
    maintenanceHistory: [
      { type: 'Service', description: 'Annual maintenance check', date: 'Mar 5, 2024' },
      { type: 'Repair', description: 'Replaced compressor', date: 'Aug 20, 2023' },
      { type: 'Service', description: 'Filter replacement', date: 'May 10, 2023' }
    ]
  },
  {
    id: 7,
    name: 'Drum Set',
    category: 'musical',
    location: 'Worship Area',
    purchaseDate: '2023-01-15',
    value: 3800,
    status: 'active',
    notes: 'Complete drum set with cymbals and hardware.',
    maintenanceHistory: [
      { type: 'Maintenance', description: 'Replaced drum heads', date: 'Feb 20, 2024' }
    ]
  },
  {
    id: 8,
    name: 'Office Computers (Set of 5)',
    category: 'electronics',
    location: 'Church Office',
    purchaseDate: '2022-08-05',
    value: 7500,
    status: 'active',
    notes: 'Desktop computers for administrative staff.',
    maintenanceHistory: [
      { type: 'Upgrade', description: 'Software updates and maintenance', date: 'Jan 10, 2024' }
    ]
  }
];

// Maintenance tasks
const maintenanceTasks = [
  {
    id: 1,
    asset: 'Air Conditioning System',
    description: 'Annual maintenance check',
    dueDate: 'Mar 15, 2024',
    priority: 'high'
  },
  {
    id: 2,
    asset: 'Sound System',
    description: 'Quarterly inspection and testing',
    dueDate: 'Mar 20, 2024',
    priority: 'medium'
  },
  {
    id: 3,
    asset: 'Church Van',
    description: 'Oil change and tire rotation',
    dueDate: 'Mar 25, 2024',
    priority: 'medium'
  },
  {
    id: 4,
    asset: 'Projector',
    description: 'Clean filters and check bulb life',
    dueDate: 'Mar 30, 2024',
    priority: 'low'
  }
];

// New asset form data
const newAsset = ref({
  name: '',
  category: 'electronics',
  location: '',
  purchaseDate: '',
  value: 0,
  notes: ''
});

// Filtered assets
const filteredAssets = computed(() => {
  return assets.filter(asset => {
    // Filter by search query
    if (searchQuery.value && !asset.name.toLowerCase().includes(searchQuery.value.toLowerCase())) {
      return false;
    }
    
    // Filter by category
    if (selectedCategory.value && asset.category !== selectedCategory.value) {
      return false;
    }
    
    // Filter by status
    if (selectedStatus.value && asset.status !== selectedStatus.value) {
      return false;
    }
    
    return true;
  });
});

// Helper functions
const formatDateShort = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const getAssetIcon = (category: string) => {
  switch (category) {
    case 'electronics':
      return Tv;
    case 'furniture':
      return Boxes;
    case 'vehicle':
      return Car;
    case 'musical':
      return Music;
    default:
      return Boxes;
  }
};

const getCategoryName = (categoryId: string) => {
  const category = categories.find(c => c.id === categoryId);
  return category ? category.name : categoryId;
};

// Action functions
const clearFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = null;
  selectedStatus.value = null;
};

const openAddAssetModal = () => {
  const today = new Date();
  newAsset.value = {
    name: '',
    category: 'electronics',
    location: '',
    purchaseDate: today.toISOString().split('T')[0],
    value: 0,
    notes: ''
  };
  isAddAssetModalOpen.value = true;
};

const addAsset = () => {
  // In a real app, this would add the asset to the server
  const newAssetData = {
    id: assets.length + 1,
    name: newAsset.value.name,
    category: newAsset.value.category,
    location: newAsset.value.location,
    purchaseDate: newAsset.value.purchaseDate,
    value: parseFloat(newAsset.value.value.toString()),
    status: 'active',
    notes: newAsset.value.notes,
    maintenanceHistory: []
  };
  
  assets.unshift(newAssetData);
  isAddAssetModalOpen.value = false;
  
  // Show success message (in a real app)
  alert('Asset added successfully!');
};

const viewAssetDetails = (asset: any) => {
  selectedAsset.value = asset;
  isDetailsModalOpen.value = true;
};

const scheduleMaintenance = (asset: any) => {
  // In a real app, this would open a maintenance scheduling form
  alert(`Scheduling maintenance for ${asset.name}...`);
  if (isDetailsModalOpen.value) {
    isDetailsModalOpen.value = false;
  }
};

const editAsset = (asset: any) => {
  // In a real app, this would open an edit form
  alert(`Editing asset ${asset.name}...`);
  if (isDetailsModalOpen.value) {
    isDetailsModalOpen.value = false;
  }
};

const retireAsset = (asset: any) => {
  if (confirm(`Are you sure you want to retire ${asset.name}?`)) {
    asset.status = 'retired';
    alert('Asset retired successfully!');
  }
};

const completeTask = (task: any) => {
  if (confirm(`Mark maintenance task for ${task.asset} as completed?`)) {
    const index = maintenanceTasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      maintenanceTasks.splice(index, 1);
      
      // In a real app, this would update the asset's maintenance history
      const asset = assets.find(a => a.name === task.asset);
      if (asset) {
        asset.status = 'active';
        asset.maintenanceHistory.unshift({
          type: 'Maintenance',
          description: task.description,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        });
      }
      
      alert('Maintenance task completed successfully!');
    }
  }
};

const openScheduleMaintenanceModal = () => {
  // In a real app, this would open a maintenance scheduling form
  alert('Opening maintenance scheduling form...');
};

// Initialize chart - FIX FOR WINDOW IS NOT DEFINED ERROR
onMounted(() => {
  // Only run this code on client-side
  if (process.client && assetChartRef.value) {
    // Dynamically import ApexCharts
    import('apexcharts').then((ApexChartsModule) => {
      const ApexCharts = ApexChartsModule.default;
      
      const options = {
        series: [
          {
            name: 'Asset Value',
            data: [
              { x: 'Electronics', y: 23200 },
              { x: 'Furniture', y: 15000 },
              { x: 'Vehicle', y: 35000 },
              { x: 'Musical', y: 8300 },
              { x: 'Other', y: 22000 }
            ]
          }
        ],
        chart: {
          type: 'bar',
          height: 320,
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
            distributed: true,
            dataLabels: {
              position: 'top'
            }
          }
        },
        colors: ['#8b5cf6', '#10b981', '#3b82f6', '#ec4899', '#f59e0b'],
        dataLabels: {
          enabled: true,
          formatter: function(val: number) {
            return '$' + val.toLocaleString();
          },
          offsetX: 30,
          style: {
            fontSize: '12px',
            colors: ['#304758']
          }
        },
        xaxis: {
          categories: ['Electronics', 'Furniture', 'Vehicle', 'Musical', 'Other'],
          labels: {
            formatter: function(val: number) {
              return '$' + val.toLocaleString();
            }
          }
        },
        yaxis: {
          title: {
            text: 'Category'
          }
        }
      };

      const chart = new ApexCharts(assetChartRef.value, options);
      chart.render();
    });
  }
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

.animation-delay-300 {
  animation-delay: 300ms;
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