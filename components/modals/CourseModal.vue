<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="closeModal"></div>
  
        <!-- Modal panel -->
        <div class="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:align-middle">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 sm:mx-0 sm:h-10 sm:w-10">
                <BookOpen class="h-6 w-6 text-purple-600" aria-hidden="true" />
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                  Create New Training Course
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Create a new training course for volunteers.
                  </p>
                </div>
              </div>
            </div>
  
            <div class="mt-6 space-y-6">
              <!-- Course Information -->
              <div>
                <label for="courseName" class="block text-sm font-medium text-gray-700">Course Name</label>
                <div class="mt-1">
                  <input
                    type="text"
                    id="courseName"
                    v-model="formData.name"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="e.g., Child Safety Training"
                  />
                </div>
              </div>
  
              <!-- Course Description -->
              <div>
                <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                <div class="mt-1">
                  <textarea
                    id="description"
                    v-model="formData.description"
                    rows="3"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Provide a brief description of the course"
                  ></textarea>
                </div>
              </div>
  
              <!-- Course Category -->
              <div>
                <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
                <div class="mt-1">
                  <select
                    id="category"
                    v-model="formData.categoryId"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="" disabled>Select a category</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                      {{ category.name }}
                    </option>
                  </select>
                </div>
              </div>
  
              <!-- Required For -->
              <div>
                <label class="block text-sm font-medium text-gray-700">Required For</label>
                <div class="mt-2 max-h-48 overflow-y-auto rounded-md border border-gray-200 p-2">
                  <div class="space-y-2">
                    <div v-for="department in departments" :key="department.id" class="rounded-md px-2 py-1 hover:bg-gray-50">
                      <div class="font-medium text-sm text-gray-700">{{ department.name }}</div>
                      <div class="ml-6 mt-1 space-y-1">
                        <div v-for="role in getRolesForDepartment(department.id)" :key="role.id" class="flex items-center">
                          <input
                            :id="`role-${role.id}`"
                            type="checkbox"
                            :value="role.id"
                            v-model="formData.requiredRoles"
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label :for="`role-${role.id}`" class="ml-2 text-sm text-gray-600">
                            {{ role.name }}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- Course Duration -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="duration" class="block text-sm font-medium text-gray-700">Duration (minutes)</label>
                  <div class="mt-1">
                    <input
                      type="number"
                      id="duration"
                      v-model="formData.durationMinutes"
                      min="1"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label for="expiryMonths" class="block text-sm font-medium text-gray-700">Expires After (months)</label>
                  <div class="mt-1">
                    <input
                      type="number"
                      id="expiryMonths"
                      v-model="formData.expiryMonths"
                      min="0"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="0 = never expires"
                    />
                  </div>
                </div>
              </div>
  
              <!-- Course Content Sections -->
              <div>
                <div class="flex items-center justify-between">
                  <label class="block text-sm font-medium text-gray-700">Course Content</label>
                  <button
                    type="button"
                    class="inline-flex items-center text-xs font-medium text-purple-600 hover:text-purple-500"
                    @click="addSection"
                  >
                    <PlusCircle class="mr-1 h-4 w-4" />
                    Add Section
                  </button>
                </div>
                <div class="mt-2 space-y-3">
                  <div
                    v-for="(section, index) in formData.sections"
                    :key="index"
                    class="rounded-md border border-gray-200 p-3"
                  >
                    <div class="flex items-center justify-between">
                      <div class="flex-1">
                        <input
                          type="text"
                          v-model="section.title"
                          class="block w-full border-0 p-0 text-sm font-medium text-gray-900 focus:ring-0"
                          placeholder="Section Title"
                        />
                      </div>
                      <button
                        type="button"
                        class="text-gray-400 hover:text-gray-500"
                        @click="removeSection(index)"
                      >
                        <XCircle class="h-5 w-5" />
                      </button>
                    </div>
                    <div class="mt-2">
                      <textarea
                        v-model="section.content"
                        rows="2"
                        class="block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Section content or description"
                      ></textarea>
                    </div>
                    <div class="mt-2 flex items-center text-sm text-gray-500">
                      <FileText class="mr-1 h-4 w-4" />
                      <span>Content Type:</span>
                      <select
                        v-model="section.type"
                        class="ml-2 rounded-md border-gray-300 py-1 pl-2 pr-7 text-xs focus:border-indigo-500 focus:ring-indigo-500"
                      >
                        <option value="video">Video</option>
                        <option value="text">Text</option>
                        <option value="quiz">Quiz</option>
                        <option value="pdf">PDF Document</option>
                      </select>
                    </div>
                  </div>
                  <div v-if="formData.sections.length === 0" class="rounded-md border border-dashed border-gray-300 p-4 text-center">
                    <BookOpen class="mx-auto h-8 w-8 text-gray-400" />
                    <p class="mt-1 text-sm text-gray-500">No content sections added yet</p>
                    <button
                      type="button"
                      class="mt-2 inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-500"
                      @click="addSection"
                    >
                      <PlusCircle class="mr-1 h-4 w-4" />
                      Add Your First Section
                    </button>
                  </div>
                </div>
              </div>
  
              <!-- Certification -->
              <div>
                <div class="flex items-center">
                  <input
                    id="certification"
                    type="checkbox"
                    v-model="formData.hasCertification"
                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label for="certification" class="ml-2 block text-sm font-medium text-gray-700">
                    Issue Certification Upon Completion
                  </label>
                </div>
                <div v-if="formData.hasCertification" class="mt-3 rounded-md bg-gray-50 p-3">
                  <div class="text-sm font-medium text-gray-700">Certification Details</div>
                  <div class="mt-2 grid grid-cols-2 gap-4">
                    <div>
                      <label for="certName" class="block text-xs font-medium text-gray-500">Certificate Name</label>
                      <input
                        type="text"
                        id="certName"
                        v-model="formData.certificationName"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-xs"
                        placeholder="e.g., Child Safety Certified"
                      />
                    </div>
                    <div>
                      <label for="passingScore" class="block text-xs font-medium text-gray-500">Passing Score (%)</label>
                      <input
                        type="number"
                        id="passingScore"
                        v-model="formData.passingScore"
                        min="1"
                        max="100"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              class="inline-flex w-full justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              :disabled="isSubmitting"
              @click="submitForm"
            >
              <Loader2 v-if="isSubmitting" class="mr-2 h-4 w-4 animate-spin" />
              {{ isSubmitting ? 'Creating...' : 'Create Course' }}
            </button>
            <button
              type="button"
              class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
              @click="closeModal"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { BookOpen, PlusCircle, XCircle, FileText, Loader2 } from 'lucide-vue-next';
  
  const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false
    }
  });
  
  const emit = defineEmits(['close', 'created']);
  
  const resetForm = () => {
    formData.value = {
      name: '',
      description: '',
      categoryId: '',
      durationMinutes: 60,
      expiryMonths: 12,
      requiredRoles: [],
      sections: [],
      hasCertification: false,
      certificationName: '',
      passingScore: 80
    };
  };
  
  
  // Form data
  const formData = ref({
    name: '',
    description: '',
    categoryId: '',
    durationMinutes: 60,
    expiryMonths: 12,
    requiredRoles: [],
    sections: [],
    hasCertification: false,
    certificationName: '',
    passingScore: 80
  });
  
  // State variables
  const isSubmitting = ref(false);
  
  // Mock data
  const categories = ref([
    { id: '1', name: 'Safety & Compliance' },
    { id: '2', name: 'Leadership' },
    { id: '3', name: 'Technical Skills' },
    { id: '4', name: 'Ministry Specific' },
    { id: '5', name: 'Onboarding' }
  ]);
  
  const departments = ref([
    { id: '1', name: 'Worship Team' },
    { id: '2', name: 'Children\'s Ministry' },
    { id: '3', name: 'Media Team' },
    { id: '4', name: 'Hospitality' },
    { id: '5', name: 'Outreach' }
  ]);
  
  const rolesByDepartment = {
    '1': [
      { id: '101', name: 'Worship Leader' },
      { id: '102', name: 'Vocalist' },
      { id: '103', name: 'Guitarist' },
      { id: '104', name: 'Drummer' }
    ],
    '2': [
      { id: '201', name: 'Children\'s Director' },
      { id: '202', name: 'Nursery Worker' },
      { id: '203', name: 'Elementary Teacher' },
      { id: '204', name: 'Check-in Assistant' }
    ],
    '3': [
      { id: '301', name: 'Sound Engineer' },
      { id: '302', name: 'Camera Operator' },
      { id: '303', name: 'Presentation Manager' },
      { id: '304', name: 'Lighting Technician' }
    ],
    '4': [
      { id: '401', name: 'Greeter' },
      { id: '402', name: 'Usher' },
      { id: '403', name: 'Coffee Service' },
      { id: '404', name: 'Welcome Desk' }
    ],
    '5': [
      { id: '501', name: 'Outreach Coordinator' },
      { id: '502', name: 'Community Volunteer' },
      { id: '503', name: 'Event Planner' },
      { id: '504', name: 'Donation Manager' }
    ]
  };
  
  // Methods
  const getRolesForDepartment = (departmentId) => {
    return rolesByDepartment[departmentId] || [];
  };
  
  const addSection = () => {
    formData.value.sections.push({
      title: '',
      content: '',
      type: 'video'
    });
  };
  
  const removeSection = (index) => {
    formData.value.sections.splice(index, 1);
  };
  
  const submitForm = async () => {
    isSubmitting.value = true;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would send the form data to your API
      console.log('Form submitted:', formData.value);
      
      // Emit success event
      emit('created', {
        id: Math.random().toString(36).substr(2, 9),
        ...formData.value,
        categoryName: categories.value.find(c => c.id === formData.value.categoryId)?.name,
        createdAt: new Date().toISOString()
      });
      
      // Reset form and close modal
      resetForm();
      closeModal();
    } catch (error) {
      console.error('Error submitting form:', error);
      // In a real app, you would show an error message
    } finally {
      isSubmitting.value = false;
    }
  };
  

  const closeModal = () => {
    emit('close');
  };
  </script>