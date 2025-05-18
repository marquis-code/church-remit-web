<template>
    <main>
      <div class="space-y-8">
      
        <div class="sm:flex sm:items-center sm:justify-between">
          <div>
            <h2 class="text-2xl font-bold leading-7 text-gray-900">Training & Certification</h2>
            <p class="mt-1 text-sm text-gray-500">Manage online training modules, certifications, and track progress</p>
          </div>
          <div class="mt-4 flex sm:ml-4 sm:mt-0">
            <button
              type="button"
              @click="openAddCourseModal"
              class="inline-flex items-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            >
              <BookPlus class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              Add Course
            </button>
          </div>
        </div>
  

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in">
          <div v-for="(stat, index) in trainingStats" :key="stat.name" 
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
  

        <div class="animate-fade-in animation-delay-100">
          <div class="border-b border-gray-200">
            <nav class="-mb-px flex space-x-8" aria-label="Categories">
              <button
                v-for="category in courseCategories"
                :key="category.id"
                @click="selectedCategory = category.id"
                :class="[
                  selectedCategory === category.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium'
                ]"
              >
                {{ category.name }}
              </button>
            </nav>
          </div>
        </div>
  

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in animation-delay-200">
          <div v-for="course in filteredCourses" :key="course.id" 
            class="group relative overflow-hidden rounded-lg bg-white shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div class="relative h-48 overflow-hidden">
              <img :src="course.image" alt="" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute bottom-4 left-4 right-4">
                <span :class="[
                  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                  course.category === 'leadership' ? 'bg-blue-100 text-blue-800' :
                  course.category === 'ministry' ? 'bg-green-100 text-green-800' :
                  course.category === 'technical' ? 'bg-amber-100 text-amber-800' :
                  'bg-purple-100 text-purple-800'
                ]">
                  {{ getCategoryName(course.category) }}
                </span>
                <h3 class="mt-2 text-lg font-medium text-white">{{ course.title }}</h3>
              </div>
            </div>
            <div class="p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <Clock class="h-4 w-4 text-gray-400" />
                  <span class="ml-1 text-sm text-gray-500">{{ course.duration }}</span>
                </div>
                <div class="flex items-center">
                  <Users class="h-4 w-4 text-gray-400" />
                  <span class="ml-1 text-sm text-gray-500">{{ course.enrollments }} enrolled</span>
                </div>
              </div>
              <p class="mt-3 text-sm text-gray-500 line-clamp-2">{{ course.description }}</p>
              <div class="mt-4 flex items-center justify-between">
                <div class="flex items-center">
                  <img :src="course.instructorAvatar" alt="" class="h-8 w-8 rounded-full" />
                  <span class="ml-2 text-sm font-medium text-gray-900">{{ course.instructor }}</span>
                </div>
                <button
                  type="button"
                  @click="viewCourseDetails(course)"
                  class="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  View Course
                </button>
              </div>
            </div>
          </div>
        </div>
  

        <div class="bg-white shadow rounded-lg animate-fade-in animation-delay-300">
          <div class="px-4 py-5 sm:p-6">
            <div class="sm:flex sm:items-center sm:justify-between">
              <h3 class="text-base font-semibold leading-6 text-gray-900">Training Progress</h3>
              <div class="mt-3 flex sm:ml-4 sm:mt-0">
                <div class="relative">
                  <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search class="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type="search"
                    v-model="searchQuery"
                    class="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                    placeholder="Search volunteers..."
                  />
                </div>
              </div>
            </div>
  
            <div class="mt-6 flow-root">
              <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table v-if="filteredProgress.length > 0" class="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Volunteer</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Course</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Started</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Progress</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                          <span class="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr v-for="progress in filteredProgress" :key="`${progress.volunteerId}-${progress.courseId}`" class="hover:bg-gray-50 transition-colors">
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          <div class="flex items-center">
                            <img :src="progress.volunteerAvatar" alt="" class="h-8 w-8 rounded-full mr-2" />
                            <span>{{ progress.volunteerName }}</span>
                          </div>
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ progress.courseName }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ formatDateShort(progress.startDate) }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div class="flex items-center">
                            <span class="text-sm font-medium text-gray-900 mr-2">{{ progress.progress }}%</span>
                            <div class="h-2 w-20 rounded-full bg-gray-200">
                              <div
                                :class="[
                                  'h-2 rounded-full',
                                  progress.progress >= 80 ? 'bg-green-600' :
                                  progress.progress >= 40 ? 'bg-amber-500' :
                                  'bg-purple-600'
                                ]"
                                :style="{ width: `${progress.progress}%` }"
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm">
                          <span :class="[
                            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                            progress.status === 'completed' ? 'bg-green-100 text-green-800' :
                            progress.status === 'in-progress' ? 'bg-amber-100 text-amber-800' :
                            'bg-purple-100 text-purple-800'
                          ]">
                            {{ progress.status === 'completed' ? 'Completed' : 
                               progress.status === 'in-progress' ? 'In Progress' : 
                               'Not Started' }}
                          </span>
                        </td>
                        <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <Menu as="div" class="relative inline-block text-left">
                            <div>
                              <MenuButton class="inline-flex items-center rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
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
                                      @click.prevent="viewProgressDetails(progress)"
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
                                      @click.prevent="sendReminder(progress)"
                                      :class="[
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'flex px-4 py-2 text-sm items-center'
                                      ]"
                                    >
                                      <Bell class="mr-3 h-5 w-5 text-gray-400" />
                                      Send Reminder
                                    </a>
                                  </MenuItem>
                                  <MenuItem v-if="progress.progress === 100 && progress.status !== 'completed'" v-slot="{ active }">
                                    <a
                                      href="#"
                                      @click.prevent="issueCertificate(progress)"
                                      :class="[
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'flex px-4 py-2 text-sm items-center'
                                      ]"
                                    >
                                      <Award class="mr-3 h-5 w-5 text-gray-400" />
                                      Issue Certificate
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
                    <GraduationCap class="mx-auto h-12 w-12 text-gray-400" />
                    <h3 class="mt-2 text-sm font-semibold text-gray-900">No training progress found</h3>
                    <p class="mt-1 text-sm text-gray-500">Try adjusting your search to find what you're looking for.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  

        <div class="bg-white shadow rounded-lg animate-fade-in animation-delay-400">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-base font-semibold leading-6 text-gray-900">Certification Analytics</h3>
            <div class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-3">Certifications by Department</h4>
                <div class="h-80">
                  <div class="h-full w-full" ref="departmentChartRef"></div>
                </div>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-3">Certifications by Course</h4>
                <div class="h-80">
                  <div class="h-full w-full" ref="courseChartRef"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
  
      <TransitionRoot appear :show="isAddCourseModalOpen" as="template">
        <Dialog as="div" @close="isAddCourseModalOpen = false" class="relative z-50">
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
                    Add New Course
                  </DialogTitle>
                  <div class="mt-4">
                    <div class="space-y-6">
                      <div>
                        <label for="course-title" class="block text-sm font-medium leading-6 text-gray-900">
                          Course Title
                        </label>
                        <div class="mt-2">
                          <input
                            type="text"
                            id="course-title"
                            v-model="newCourse.title"
                            class="block w-full rounded-md py-2.5 px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                            placeholder="Enter course title"
                          />
                        </div>
                      </div>
  
                      <div>
                        <label for="course-category" class="block text-sm font-medium leading-6 text-gray-900">
                          Category
                        </label>
                        <div class="mt-2">
                          <select
                            id="course-category"
                            v-model="newCourse.category"
                            class="block w-full rounded-md py-2.5 px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                          >
                            <option v-for="category in courseCategories" :key="category.id" :value="category.id">
                              {{ category.name }}
                            </option>
                          </select>
                        </div>
                      </div>
  
                      <div>
                        <label for="course-description" class="block text-sm font-medium leading-6 text-gray-900">
                          Description
                        </label>
                        <div class="mt-2">
                          <textarea
                            id="course-description"
                            v-model="newCourse.description"
                            rows="3"
                            class="block w-full rounded-md py-2.5 px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                            placeholder="Enter course description"
                          ></textarea>
                        </div>
                      </div>
  
                      <div>
                        <label for="course-duration" class="block text-sm font-medium leading-6 text-gray-900">
                          Duration
                        </label>
                        <div class="mt-2">
                          <input
                            type="text"
                            id="course-duration"
                            v-model="newCourse.duration"
                            class="block w-full rounded-md py-2.5 px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                            placeholder="e.g. 2 hours"
                          />
                        </div>
                      </div>
  
                      <div>
                        <label for="course-instructor" class="block text-sm font-medium leading-6 text-gray-900">
                          Instructor
                        </label>
                        <div class="mt-2">
                          <input
                            type="text"
                            id="course-instructor"
                            v-model="newCourse.instructor"
                            class="block w-full rounded-md py-2.5 px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                            placeholder="Enter instructor name"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <div class="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      @click="isAddCourseModalOpen = false"
                      class="inline-flex justify-center rounded-md py-2.5 px-3 border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      @click="addCourse"
                      class="inline-flex justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
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
  

      <TransitionRoot appear :show="isCourseDetailsModalOpen" as="template">
        <Dialog as="div" @close="isCourseDetailsModalOpen = false" class="relative z-50">
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
                <DialogPanel class="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <div class="relative h-56 overflow-hidden">
                    <img :src="selectedCourse?.image" alt="" class="h-full w-full object-cover" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div class="absolute bottom-4 left-4 right-4">
                      <span :class="[
                        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                        selectedCourse?.category === 'leadership' ? 'bg-blue-100 text-blue-800' :
                        selectedCourse?.category === 'ministry' ? 'bg-green-100 text-green-800' :
                        selectedCourse?.category === 'technical' ? 'bg-amber-100 text-amber-800' :
                        'bg-purple-100 text-purple-800'
                      ]">
                        {{ selectedCourse ? getCategoryName(selectedCourse.category) : '' }}
                      </span>
                      <h3 class="mt-2 text-2xl font-medium text-white">{{ selectedCourse?.title }}</h3>
                    </div>
                    <button
                      type="button"
                      @click="isCourseDetailsModalOpen = false"
                      class="absolute top-4 right-4 rounded-md bg-white/10 p-1 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <span class="sr-only">Close</span>
                      <X class="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div class="p-6">
                    <div class="flex items-center justify-between mb-4">
                      <div class="flex items-center">
                        <img :src="selectedCourse?.instructorAvatar" alt="" class="h-10 w-10 rounded-full" />
                        <div class="ml-3">
                          <p class="text-sm font-medium text-gray-900">{{ selectedCourse?.instructor }}</p>
                          <p class="text-xs text-gray-500">Instructor</p>
                        </div>
                      </div>
                      <div class="flex items-center space-x-4">
                        <div class="flex items-center">
                          <Clock class="h-5 w-5 text-gray-400" />
                          <span class="ml-1 text-sm text-gray-500">{{ selectedCourse?.duration }}</span>
                        </div>
                        <div class="flex items-center">
                          <Users class="h-5 w-5 text-gray-400" />
                          <span class="ml-1 text-sm text-gray-500">{{ selectedCourse?.enrollments }} enrolled</span>
                        </div>
                      </div>
                    </div>
  
                    <div class="border-t border-gray-200 pt-4">
                      <h4 class="text-base font-medium text-gray-900 mb-2">About this course</h4>
                      <p class="text-sm text-gray-500">{{ selectedCourse?.description }}</p>
                    </div>
  
                    <div class="border-t border-gray-200 pt-4 mt-4">
                      <h4 class="text-base font-medium text-gray-900 mb-2">Course Content</h4>
                      <div class="space-y-3">
                        <div v-for="(module, index) in selectedCourse?.modules || []" :key="index" class="bg-gray-50 rounded-md p-3">
                          <div class="flex items-center justify-between">
                            <div class="flex items-center">
                              <span class="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-xs font-medium text-purple-800">{{ index + 1 }}</span>
                              <h5 class="ml-2 text-sm font-medium text-gray-900">{{ module.title }}</h5>
                            </div>
                            <span class="text-xs text-gray-500">{{ module.duration }}</span>
                          </div>
                          <ul class="mt-2 ml-8 space-y-1">
                            <li v-for="(lesson, lessonIndex) in module.lessons" :key="lessonIndex" class="flex items-center text-sm text-gray-500">
                              <component :is="lesson.type === 'video' ? Video : FileText" class="h-4 w-4 mr-2 text-gray-400" />
                              {{ lesson.title }}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="bg-gray-50 px-6 py-3 flex justify-end">
                    <button
                      type="button"
                      @click="enrollInCourse(selectedCourse)"
                      class="inline-flex justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    >
                      Enroll Volunteer
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
  

      <TransitionRoot appear :show="isProgressDetailsModalOpen" as="template">
        <Dialog as="div" @close="isProgressDetailsModalOpen = false" class="relative z-50">
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
                      Training Progress Details
                    </DialogTitle>
                    <button
                      type="button"
                      @click="isProgressDetailsModalOpen = false"
                      class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    >
                      <span class="sr-only">Close</span>
                      <X class="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div class="mt-4">
                    <div class="bg-purple-50 p-4 rounded-lg mb-4">
                      <div class="flex justify-between">
                        <div class="flex items-center">
                          <img :src="selectedProgress?.volunteerAvatar" alt="" class="h-10 w-10 rounded-full mr-3" />
                          <div>
                            <p class="text-sm font-medium text-gray-900">{{ selectedProgress?.volunteerName }}</p>
                            <p class="text-xs text-gray-500">{{ selectedProgress?.courseName }}</p>
                          </div>
                        </div>
                        <div>
                          <span :class="[
                            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                            selectedProgress?.status === 'completed' ? 'bg-green-100 text-green-800' :
                            selectedProgress?.status === 'in-progress' ? 'bg-amber-100 text-amber-800' :
                            'bg-purple-100 text-purple-800'
                          ]">
                            {{ selectedProgress?.status === 'completed' ? 'Completed' : 
                               selectedProgress?.status === 'in-progress' ? 'In Progress' : 
                               'Not Started' }}
                          </span>
                        </div>
                      </div>
                    </div>
  
                    <div class="mb-6">
                      <h4 class="text-sm font-medium text-gray-500 mb-2">Overall Progress</h4>
                      <div class="flex items-center">
                        <div class="h-2 flex-1 rounded-full bg-gray-200">
                          <div
                            :class="[
                              'h-2 rounded-full',
                              selectedProgress?.progress >= 80 ? 'bg-green-600' :
                              selectedProgress?.progress >= 40 ? 'bg-amber-500' :
                              'bg-purple-600'
                            ]"
                            :style="{ width: `${selectedProgress?.progress}%` }"
                          ></div>
                        </div>
                        <span class="ml-3 text-sm font-medium text-gray-900">{{ selectedProgress?.progress }}%</span>
                      </div>
                    </div>
  
                    <div class="border-t border-gray-200 pt-4">
                      <h4 class="text-sm font-medium text-gray-900 mb-3">Module Completion</h4>
                      <div class="space-y-4">
                        <div v-for="(module, index) in selectedProgress?.moduleProgress || []" :key="index" class="bg-gray-50 rounded-md p-3">
                          <div class="flex items-center justify-between mb-2">
                            <div class="flex items-center">
                              <span class="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-xs font-medium text-purple-800">{{ index + 1 }}</span>
                              <h5 class="ml-2 text-sm font-medium text-gray-900">{{ module.title }}</h5>
                            </div>
                            <span :class="[
                              'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                              module.completed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            ]">
                              {{ module.completed ? 'Completed' : 'Incomplete' }}
                            </span>
                          </div>
                          <div class="flex items-center">
                            <div class="h-2 flex-1 rounded-full bg-gray-200">
                              <div
                                class="h-2 rounded-full bg-purple-600"
                                :style="{ width: `${module.progress}%` }"
                              ></div>
                            </div>
                            <span class="ml-3 text-xs text-gray-500">{{ module.progress }}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
  
                    <div class="border-t border-gray-200 pt-4 mt-4">
                      <h4 class="text-sm font-medium text-gray-900 mb-2">Activity Timeline</h4>
                      <ul role="list" class="space-y-4">
                        <li v-for="(activity, index) in selectedProgress?.activityTimeline || []" :key="index" class="relative flex gap-x-4">
                          <div class="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                            <div class="w-px bg-gray-200"></div>
                          </div>
                          <div class="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                            <component :is="activity.type === 'started' ? Play : 
                                           activity.type === 'completed' ? CheckCircle : 
                                           activity.type === 'quiz' ? FileQuestion : Clock" 
                              class="h-4 w-4 text-purple-600" aria-hidden="true" />
                          </div>
                          <div class="flex-auto py-0.5 text-sm leading-5 text-gray-500">
                            <span class="font-medium text-gray-900">{{ activity.title }}</span>
                            <span class="whitespace-nowrap text-gray-400 ml-2">{{ activity.date }}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
  
                  <div class="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      @click="sendReminder(selectedProgress)"
                      class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    >
                      <Bell class="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                      Send Reminder
                    </button>
                    <button
                      v-if="selectedProgress?.progress === 100 && selectedProgress?.status !== 'completed'"
                      type="button"
                      @click="issueCertificate(selectedProgress)"
                      class="inline-flex justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    >
                      <Award class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                      Issue Certificate
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
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from '#app';
  import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue';
  import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
  import {
    BookPlus,
    GraduationCap,
    Search,
    MoreVertical,
    Eye,
    Bell,
    Award,
    TrendingUp,
    TrendingDown,
    Clock,
    Users,
    Video,
    FileText,
    Play,
    CheckCircle,
    FileQuestion,
    X
  } from 'lucide-vue-next';
  
  // Define types for better TypeScript support
  interface TrainingStat {
    name: string;
    value: string;
    change?: string;
    changeType?: 'increase' | 'decrease';
    icon: any;
    bgColor: string;
  }
  
  interface CourseCategory {
    id: string;
    name: string;
  }
  
  interface Lesson {
    title: string;
    type: 'video' | 'document';
  }
  
  interface Module {
    title: string;
    duration: string;
    lessons: Lesson[];
  }
  
  interface Course {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
    instructor: string;
    instructorAvatar: string;
    duration: string;
    enrollments: number;
    modules: Module[];
  }
  
  interface ModuleProgress {
    title: string;
    progress: number;
    completed: boolean;
  }
  
  interface ActivityTimeline {
    type: 'started' | 'completed' | 'quiz';
    title: string;
    date: string;
  }
  
  interface TrainingProgress {
    volunteerId: number;
    volunteerName: string;
    volunteerAvatar: string;
    courseId: number;
    courseName: string;
    startDate: string;
    progress: number;
    status: 'completed' | 'in-progress' | 'not-started';
    moduleProgress: ModuleProgress[];
    activityTimeline: ActivityTimeline[];
  }
  
  interface NewCourse {
    title: string;
    category: string;
    description: string;
    duration: string;
    instructor: string;
  }
  
  const router = useRouter();
  const searchQuery = ref('');
  const selectedCategory = ref('all');
  const isAddCourseModalOpen = ref(false);
  const isCourseDetailsModalOpen = ref(false);
  const isProgressDetailsModalOpen = ref(false);
  const selectedCourse = ref<Course | null>(null);
  const selectedProgress = ref<TrainingProgress | null>(null);
  const departmentChartRef = ref<HTMLElement | null>(null);
  const courseChartRef = ref<HTMLElement | null>(null);
  
  // Course categories
  const courseCategories: CourseCategory[] = [
    { id: 'all', name: 'All Categories' },
    { id: 'leadership', name: 'Leadership' },
    { id: 'ministry', name: 'Ministry Skills' },
    { id: 'technical', name: 'Technical Training' },
    { id: 'safety', name: 'Safety & Compliance' }
  ];
  
  // Training stats
  const trainingStats: TrainingStat[] = [
    {
      name: 'Available Courses',
      value: '15',
      change: '3',
      changeType: 'increase',
      icon: GraduationCap,
      bgColor: 'bg-purple-600'
    },
    {
      name: 'Active Learners',
      value: '45',
      change: '12%',
      changeType: 'increase',
      icon: Users,
      bgColor: 'bg-blue-600'
    },
    {
      name: 'Completion Rate',
      value: '85%',
      change: '5%',
      changeType: 'increase',
      icon: CheckCircle,
      bgColor: 'bg-green-600'
    },
    {
      name: 'Certifications',
      value: '78',
      change: '15',
      changeType: 'increase',
      icon: Award,
      bgColor: 'bg-amber-600'
    }
  ];
  
  // Courses
  const courses: Course[] = [
    {
      id: 1,
      title: 'Leadership Fundamentals',
      category: 'leadership',
      description: 'Learn the essential skills needed to lead effectively in a church context. This course covers vision casting, team building, and conflict resolution.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      instructor: 'Pastor David Wilson',
      instructorAvatar: 'https://randomuser.me/api/portraits/men/5.jpg',
      duration: '4 hours',
      enrollments: 32,
      modules: [
        {
          title: 'Introduction to Leadership',
          duration: '45 min',
          lessons: [
            { title: 'What is Leadership?', type: 'video' },
            { title: 'Leadership Styles', type: 'video' },
            { title: 'Leadership Assessment', type: 'document' }
          ]
        },
        {
          title: 'Building Effective Teams',
          duration: '1 hour',
          lessons: [
            { title: 'Team Dynamics', type: 'video' },
            { title: 'Recruiting Team Members', type: 'video' },
            { title: 'Developing Team Members', type: 'video' },
            { title: 'Team Building Exercises', type: 'document' }
          ]
        },
        {
          title: 'Conflict Resolution',
          duration: '1 hour',
          lessons: [
            { title: 'Understanding Conflict', type: 'video' },
            { title: 'Conflict Resolution Strategies', type: 'video' },
            { title: 'Practice Scenarios', type: 'document' }
          ]
        },
        {
          title: 'Vision Casting',
          duration: '1 hour 15 min',
          lessons: [
            { title: 'Developing a Vision', type: 'video' },
            { title: 'Communicating Vision', type: 'video' },
            { title: 'Implementing Vision', type: 'video' },
            { title: 'Vision Worksheet', type: 'document' }
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Child Safety Training',
      category: 'safety',
      description: 'Essential training for all volunteers working with children. Learn about child protection policies, safety procedures, and creating a secure environment.',
      image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      instructor: 'Sarah Johnson',
      instructorAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      duration: '3 hours',
      enrollments: 45,
      modules: [
        {
          title: 'Child Protection Basics',
          duration: '45 min',
          lessons: [
            { title: 'Understanding Child Safety', type: 'video' },
            { title: 'Legal Requirements', type: 'video' },
            { title: 'Church Policies', type: 'document' }
          ]
        },
        {
          title: 'Recognizing and Reporting',
          duration: '1 hour',
          lessons: [
            { title: 'Signs of Abuse', type: 'video' },
            { title: 'Reporting Procedures', type: 'video' },
            { title: 'Documentation Requirements', type: 'document' }
          ]
        },
        {
          title: 'Creating Safe Environments',
          duration: '45 min',
          lessons: [
            { title: 'Physical Space Safety', type: 'video' },
            { title: 'Supervision Guidelines', type: 'video' },
            { title: 'Safety Checklist', type: 'document' }
          ]
        },
        {
          title: 'Emergency Procedures',
          duration: '30 min',
          lessons: [
            { title: 'Medical Emergencies', type: 'video' },
            { title: 'Evacuation Procedures', type: 'video' },
            { title: 'Emergency Contact Protocol', type: 'document' }
          ]
        }
      ]
    },
    {
      id: 3,
      title: 'Sound System Operation',
      category: 'technical',
      description: 'Learn how to operate the church sound system effectively. This course covers basic audio principles, equipment operation, and troubleshooting.',
      image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      instructor: 'James Lee',
      instructorAvatar: 'https://randomuser.me/api/portraits/men/7.jpg',
      duration: '5 hours',
      enrollments: 18,
      modules: [
        {
          title: 'Audio Basics',
          duration: '1 hour',
          lessons: [
            { title: 'Sound Properties', type: 'video' },
            { title: 'Signal Flow', type: 'video' },
            { title: 'Audio Terminology', type: 'document' }
          ]
        },
        {
          title: 'Equipment Overview',
          duration: '1.5 hours',
          lessons: [
            { title: 'Microphones', type: 'video' },
            { title: 'Mixers', type: 'video' },
            { title: 'Speakers and Amplifiers', type: 'video' },
            { title: 'Equipment Guide', type: 'document' }
          ]
        },
        {
          title: 'Live Sound Mixing',
          duration: '1.5 hours',
          lessons: [
            { title: 'Setting Levels', type: 'video' },
            { title: 'EQ and Effects', type: 'video' },
            { title: 'Mixing for Worship', type: 'video' },
            { title: 'Mixing Worksheet', type: 'document' }
          ]
        },
        {
          title: 'Troubleshooting',
          duration: '1 hour',
          lessons: [
            { title: 'Common Issues', type: 'video' },
            { title: 'Problem Solving', type: 'video' },
            { title: 'Preventative Maintenance', type: 'video' },
            { title: 'Troubleshooting Checklist', type: 'document' }
          ]
        }
      ]
    },
    {
      id: 4,
      title: 'First Aid Certification',
      category: 'safety',
      description: 'Essential first aid skills for church volunteers. Learn how to respond to medical emergencies, perform CPR, and provide basic first aid care.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      instructor: 'Dr. Emily Chen',
      instructorAvatar: 'https://randomuser.me/api/portraits/women/8.jpg',
      duration: '6 hours',
      enrollments: 28,
      modules: [
        {
          title: 'Emergency Response Basics',
          duration: '1 hour',
          lessons: [
            { title: 'Assessment and Response', type: 'video' },
            { title: 'Calling for Help', type: 'video' },
            { title: 'Emergency Action Plan', type: 'document' }
          ]
        },
        {
          title: 'CPR Training',
          duration: '2 hours',
          lessons: [
            { title: 'Adult CPR', type: 'video' },
            { title: 'Child CPR', type: 'video' },
            { title: 'Infant CPR', type: 'video' },
            { title: 'CPR Practice Guide', type: 'document' }
          ]
        },
        {
          title: 'Common Injuries',
          duration: '1.5 hours',
          lessons: [
            { title: 'Cuts and Bleeding', type: 'video' },
            { title: 'Burns', type: 'video' },
            { title: 'Sprains and Fractures', type: 'video' },
            { title: 'Injury Treatment Guide', type: 'document' }
          ]
        },
        {
          title: 'Medical Emergencies',
          duration: '1.5 hours',
          lessons: [
            { title: 'Heart Attack and Stroke', type: 'video' },
            { title: 'Allergic Reactions', type: 'video' },
            { title: 'Seizures', type: 'video' },
            { title: 'Emergency Reference Sheet', type: 'document' }
          ]
        }
      ]
    },
    {
      id: 5,
      title: 'Children\'s Ministry Basics',
      category: 'ministry',
      description: 'Learn the fundamentals of effective children\'s ministry. This course covers age-appropriate teaching methods, classroom management, and curriculum development.',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      instructor: 'Rachel Adams',
      instructorAvatar: 'https://randomuser.me/api/portraits/women/6.jpg',
      duration: '4 hours',
      enrollments: 22,
      modules: [
        {
          title: 'Understanding Child Development',
          duration: '1 hour',
          lessons: [
            { title: 'Developmental Stages', type: 'video' },
            { title: 'Learning Styles', type: 'video' },
            { title: 'Development Chart', type: 'document' }
          ]
        },
        {
          title: 'Teaching Methods',
          duration: '1 hour',
          lessons: [
            { title: 'Storytelling', type: 'video' },
            { title: 'Interactive Activities', type: 'video' },
            { title: 'Visual Aids', type: 'video' },
            { title: 'Teaching Resources', type: 'document' }
          ]
        },
        {
          title: 'Classroom Management',
          duration: '1 hour',
          lessons: [
            { title: 'Setting Expectations', type: 'video' },
            { title: 'Positive Discipline', type: 'video' },
            { title: 'Managing Difficult Behaviors', type: 'video' },
            { title: 'Classroom Management Tips', type: 'document' }
          ]
        },
        {
          title: 'Curriculum Planning',
          duration: '1 hour',
          lessons: [
            { title: 'Selecting Curriculum', type: 'video' },
            { title: 'Adapting Lessons', type: 'video' },
            { title: 'Creating Lesson Plans', type: 'video' },
            { title: 'Curriculum Planning Template', type: 'document' }
          ]
        }
      ]
    },
    {
      id: 6,
      title: 'Worship Team Training',
      category: 'ministry',
      description: 'Comprehensive training for worship team members. Learn about musical excellence, spiritual preparation, and effective team collaboration.',
      image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      instructor: 'John Smith',
      instructorAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      duration: '5 hours',
      enrollments: 15,
      modules: [
        {
          title: 'Worship Foundations',
          duration: '1 hour',
          lessons: [
            { title: 'Biblical Basis for Worship', type: 'video' },
            { title: 'Heart of Worship', type: 'video' },
            { title: 'Worship Study Guide', type: 'document' }
          ]
        },
        {
          title: 'Musical Excellence',
          duration: '1.5 hours',
          lessons: [
            { title: 'Instrumental Skills', type: 'video' },
            { title: 'Vocal Techniques', type: 'video' },
            { title: 'Music Theory Basics', type: 'video' },
            { title: 'Practice Exercises', type: 'document' }
          ]
        },
        {
          title: 'Team Dynamics',
          duration: '1 hour',
          lessons: [
            { title: 'Effective Rehearsals', type: 'video' },
            { title: 'Communication', type: 'video' },
            { title: 'Conflict Resolution', type: 'video' },
            { title: 'Team Guidelines', type: 'document' }
          ]
        },
        {
          title: 'Service Planning',
          duration: '1.5 hours',
          lessons: [
            { title: 'Song Selection', type: 'video' },
            { title: 'Flow and Transitions', type: 'video' },
            { title: 'Working with Tech Team', type: 'video' },
            { title: 'Service Planning Template', type: 'document' }
          ]
        }
      ]
    }
  ];
  
  // Training progress
  const trainingProgress: TrainingProgress[] = [
    {
      volunteerId: 1,
      volunteerName: 'John Smith',
      volunteerAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      courseId: 1,
      courseName: 'Leadership Fundamentals',
      startDate: '2024-01-15',
      progress: 75,
      status: 'in-progress',
      moduleProgress: [
        { title: 'Introduction to Leadership', progress: 100, completed: true },
        { title: 'Building Effective Teams', progress: 100, completed: true },
        { title: 'Conflict Resolution', progress: 80, completed: false },
        { title: 'Vision Casting', progress: 20, completed: false }
      ],
      activityTimeline: [
        { type: 'started', title: 'Started course', date: 'Jan 15, 2024' },
        { type: 'completed', title: 'Completed Introduction to Leadership', date: 'Jan 18, 2024' },
        { type: 'quiz', title: 'Passed Leadership Styles Quiz', date: 'Jan 18, 2024' },
        { type: 'completed', title: 'Completed Building Effective Teams', date: 'Jan 25, 2024' },
        { type: 'quiz', title: 'Passed Team Building Quiz', date: 'Jan 26, 2024' }
      ]
    },
    {
      volunteerId: 2,
      volunteerName: 'Sarah Johnson',
      volunteerAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      courseId: 2,
      courseName: 'Child Safety Training',
      startDate: '2024-02-01',
      progress: 100,
      status: 'completed',
      moduleProgress: [
        { title: 'Child Protection Basics', progress: 100, completed: true },
        { title: 'Recognizing and Reporting', progress: 100, completed: true },
        { title: 'Creating Safe Environments', progress: 100, completed: true },
        { title: 'Emergency Procedures', progress: 100, completed: true }
      ],
      activityTimeline: [
        { type: 'started', title: 'Started course', date: 'Feb 1, 2024' },
        { type: 'completed', title: 'Completed Child Protection Basics', date: 'Feb 3, 2024' },
        { type: 'quiz', title: 'Passed Child Protection Quiz', date: 'Feb 3, 2024' },
        { type: 'completed', title: 'Completed Recognizing and Reporting', date: 'Feb 8, 2024' },
        { type: 'completed', title: 'Completed Creating Safe Environments', date: 'Feb 12, 2024' },
        { type: 'completed', title: 'Completed Emergency Procedures', date: 'Feb 15, 2024' },
        { type: 'quiz', title: 'Passed Final Assessment', date: 'Feb 16, 2024' },
        { type: 'completed', title: 'Received Certificate', date: 'Feb 17, 2024' }
      ]
    },
    {
      volunteerId: 3,
      volunteerName: 'Michael Brown',
      volunteerAvatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      courseId: 4,
      courseName: 'First Aid Certification',
      startDate: '2024-01-20',
      progress: 60,
      status: 'in-progress',
      moduleProgress: [
        { title: 'Emergency Response Basics', progress: 100, completed: true },
        { title: 'CPR Training', progress: 100, completed: true },
        { title: 'Common Injuries', progress: 40, completed: false },
        { title: 'Medical Emergencies', progress: 0, completed: false }
      ],
      activityTimeline: [
        { type: 'started', title: 'Started course', date: 'Jan 20, 2024' },
        { type: 'completed', title: 'Completed Emergency Response Basics', date: 'Jan 25, 2024' },
        { type: 'quiz', title: 'Passed Emergency Response Quiz', date: 'Jan 26, 2024' },
        { type: 'completed', title: 'Completed CPR Training', date: 'Feb 5, 2024' },
        { type: 'quiz', title: 'Passed CPR Assessment', date: 'Feb 6, 2024' }
      ]
    },
    {
      volunteerId: 4,
      volunteerName: 'Emily Davis',
      volunteerAvatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      courseId: 3,
      courseName: 'Sound System Operation',
      startDate: '2024-02-10',
      progress: 45,
      status: 'in-progress',
      moduleProgress: [
        { title: 'Audio Basics', progress: 100, completed: true },
        { title: 'Equipment Overview', progress: 80, completed: false },
        { title: 'Live Sound Mixing', progress: 0, completed: false },
        { title: 'Troubleshooting', progress: 0, completed: false }
      ],
      activityTimeline: [
        { type: 'started', title: 'Started course', date: 'Feb 10, 2024' },
        { type: 'completed', title: 'Completed Audio Basics', date: 'Feb 15, 2024' },
        { type: 'quiz', title: 'Passed Audio Terminology Quiz', date: 'Feb 16, 2024' }
      ]
    },
    {
      volunteerId: 5,
      volunteerName: 'David Wilson',
      volunteerAvatar: 'https://randomuser.me/api/portraits/men/5.jpg',
      courseId: 1,
      courseName: 'Leadership Fundamentals',
      startDate: '2024-01-05',
      progress: 100,
      status: 'completed',
      moduleProgress: [
        { title: 'Introduction to Leadership', progress: 100, completed: true },
        { title: 'Building Effective Teams', progress: 100, completed: true },
        { title: 'Conflict Resolution', progress: 100, completed: true },
        { title: 'Vision Casting', progress: 100, completed: true }
      ],
      activityTimeline: [
        { type: 'started', title: 'Started course', date: 'Jan 5, 2024' },
        { type: 'completed', title: 'Completed Introduction to Leadership', date: 'Jan 8, 2024' },
        { type: 'completed', title: 'Completed Building Effective Teams', date: 'Jan 15, 2024' },
        { type: 'completed', title: 'Completed Conflict Resolution', date: 'Jan 22, 2024' },
        { type: 'completed', title: 'Completed Vision Casting', date: 'Jan 28, 2024' },
        { type: 'quiz', title: 'Passed Final Assessment', date: 'Jan 30, 2024' },
        { type: 'completed', title: 'Received Certificate', date: 'Feb 1, 2024' }
      ]
    },
    {
      volunteerId: 6,
      volunteerName: 'Rachel Adams',
      volunteerAvatar: 'https://randomuser.me/api/portraits/women/6.jpg',
      courseId: 2,
      courseName: 'Child Safety Training',
      startDate: '2024-02-15',
      progress: 25,
      status: 'in-progress',
      moduleProgress: [
        { title: 'Child Protection Basics', progress: 100, completed: true },
        { title: 'Recognizing and Reporting', progress: 0, completed: false },
        { title: 'Creating Safe Environments', progress: 0, completed: false },
        { title: 'Emergency Procedures', progress: 0, completed: false }
      ],
      activityTimeline: [
        { type: 'started', title: 'Started course', date: 'Feb 15, 2024' },
        { type: 'completed', title: 'Completed Child Protection Basics', date: 'Feb 20, 2024' },
        { type: 'quiz', title: 'Passed Child Protection Quiz', date: 'Feb 21, 2024' }
      ]
    }
  ];
  
  // New course form data
  const newCourse = ref<NewCourse>({
    title: '',
    category: 'leadership',
    description: '',
    duration: '',
    instructor: ''
  });
  
  // Filtered courses
  const filteredCourses = computed(() => {
    return courses.filter(course => {
      if (selectedCategory.value === 'all') {
        return true;
      }
      return course.category === selectedCategory.value;
    });
  });

  definePageMeta({
      layout: 'dashboard'
  })
  
  // Filtered progress
  const filteredProgress = computed(() => {
    return trainingProgress.filter(progress => {
      if (searchQuery.value) {
        return progress.volunteerName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
               progress.courseName.toLowerCase().includes(searchQuery.value.toLowerCase());
      }
      return true;
    });
  });
  
  // Helper functions
  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  const getCategoryName = (categoryId: string) => {
    const category = courseCategories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
  };
  
  // Action functions
  const openAddCourseModal = () => {
    newCourse.value = {
      title: '',
      category: 'leadership',
      description: '',
      duration: '',
      instructor: ''
    };
    isAddCourseModalOpen.value = true;
  };
  
  const addCourse = () => {
    // In a real app, this would add the course to the server
    const newCourseData = {
      id: courses.length + 1,
      title: newCourse.value.title,
      category: newCourse.value.category,
      description: newCourse.value.description,
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      instructor: newCourse.value.instructor,
      instructorAvatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${courses.length + 1}.jpg`,
      duration: newCourse.value.duration,
      enrollments: 0,
      modules: []
    };
  
    courses.unshift(newCourseData as Course);
    isAddCourseModalOpen.value = false;
  
    // Show success message (in a real app)
    alert('Course added successfully!');
  };
  
  const viewCourseDetails = (course: Course) => {
    selectedCourse.value = course;
    isCourseDetailsModalOpen.value = true;
  };
  
  const viewProgressDetails = (progress: TrainingProgress) => {
    selectedProgress.value = progress;
    isProgressDetailsModalOpen.value = true;
  };
  
  const sendReminder = (progress: TrainingProgress) => {
    // In a real app, this would send a reminder to the volunteer
    alert(`Reminder sent to ${progress.volunteerName} about ${progress.courseName} course.`);
  };
  
  const issueCertificate = (progress: TrainingProgress) => {
    // In a real app, this would issue a certificate
    if (confirm(`Issue certificate to ${progress.volunteerName} for completing ${progress.courseName}?`)) {
      progress.status = 'completed';
      
      // Add certification to volunteer record (simplified for demo)
      alert('Certificate issued successfully!');
    }
  };
  
  const enrollInCourse = (course: Course | null) => {
    if (!course) return;
    // In a real app, this would open an enrollment form
    alert(`Opening enrollment form for ${course.title}...`);
    isCourseDetailsModalOpen.value = false;
  };
  
  // Initialize charts
  const renderDepartmentChart = () => {
    if (!departmentChartRef.value) return;
  
    const options = {
      series: [12, 8, 6, 5, 4],
      chart: {
        type: 'donut',
        height: 320
      },
      labels: ['Worship Team', 'Children\'s Ministry', 'Media Team', 'Hospitality', 'Outreach'],
      colors: ['#6366f1', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'],
      legend: {
        position: 'bottom'
      },
      plotOptions: {
        pie: {
          donut: {
            size: '50%'
          }
        }
      }
    };
  
    // Clear previous chart if it exists
    if (departmentChartRef.value.innerHTML) {
      departmentChartRef.value.innerHTML = '';
    }
  
    const chart = new ApexCharts(departmentChartRef.value, options);
    chart.render();
  };
  
  const renderCourseChart = () => {
    if (!courseChartRef.value) return;
  
    const options = {
      series: [
        {
          name: 'Certifications',
          data: [25, 18, 12, 15, 8]
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
          horizontal: true
        }
      },
      colors: ['#8b5cf6'],
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['Child Safety Training', 'First Aid Certification', 'Leadership Fundamentals', 'Children\'s Ministry Basics', 'Sound System Operation']
      }
    };
  
    // Clear previous chart if it exists
    if (courseChartRef.value.innerHTML) {
      courseChartRef.value.innerHTML = '';
    }
  
    const chart = new ApexCharts(courseChartRef.value, options);
    chart.render();
  };
  
  // Fix for "window is not defined" error
  // Only import and use ApexCharts on the client side
  let ApexCharts: any = null;

  // Initialize charts on mount
  onMounted(() => {
    // Import ApexCharts dynamically only on the client side
    import('apexcharts').then(module => {
      ApexCharts = module.default;
      // Now that ApexCharts is available, render the charts
      renderDepartmentChart();
      renderCourseChart();
    });
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
  
  .animation-delay-400 {
    animation-delay: 400ms;
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