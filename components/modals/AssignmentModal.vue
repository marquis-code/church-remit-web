<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="closeModal"></div>
  
        <!-- Modal panel -->
        <div class="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:align-middle">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                <UserPlus class="h-6 w-6 text-indigo-600" aria-hidden="true" />
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                  Create New Volunteer Assignment
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Assign a volunteer to a role in a specific department.
                  </p>
                </div>
              </div>
            </div>
  
            <div class="mt-6 space-y-6">
              <!-- Volunteer Selection -->
              <div>
                <label for="volunteer" class="block text-sm font-medium text-gray-700">Volunteer</label>
                <div class="mt-1">
                  <select
                    id="volunteer"
                    v-model="formData.volunteerId"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="" disabled>Select a volunteer</option>
                    <option v-for="volunteer in volunteers" :key="volunteer.id" :value="volunteer.id">
                      {{ volunteer.name }}
                    </option>
                  </select>
                </div>
              </div>
  
              <!-- Department Selection -->
              <div>
                <label for="department" class="block text-sm font-medium text-gray-700">Department</label>
                <div class="mt-1">
                  <select
                    id="department"
                    v-model="formData.departmentId"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    @change="loadRoles"
                  >
                    <option value="" disabled>Select a department</option>
                    <option v-for="department in departments" :key="department.id" :value="department.id">
                      {{ department.name }}
                    </option>
                  </select>
                </div>
              </div>
  
              <!-- Role Selection -->
              <div>
                <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
                <div class="mt-1">
                  <select
                    id="role"
                    v-model="formData.roleId"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    :disabled="!formData.departmentId"
                  >
                    <option value="" disabled>{{ roleSelectPlaceholder }}</option>
                    <option v-for="role in roles" :key="role.id" :value="role.id">
                      {{ role.name }}
                    </option>
                  </select>
                </div>
              </div>
  
              <!-- Schedule -->
              <div>
                <label for="schedule" class="block text-sm font-medium text-gray-700">Schedule</label>
                <div class="mt-1 grid grid-cols-2 gap-4">
                  <div>
                    <label for="startDate" class="block text-xs font-medium text-gray-500">Start Date</label>
                    <input
                      type="date"
                      id="startDate"
                      v-model="formData.startDate"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label for="endDate" class="block text-xs font-medium text-gray-500">End Date (Optional)</label>
                    <input
                      type="date"
                      id="endDate"
                      v-model="formData.endDate"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
  
              <!-- Notes -->
              <div>
                <label for="notes" class="block text-sm font-medium text-gray-700">Notes</label>
                <div class="mt-1">
                  <textarea
                    id="notes"
                    v-model="formData.notes"
                    rows="3"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Add any additional information about this assignment"
                  ></textarea>
                </div>
              </div>
  
              <!-- Required Training -->
              <div v-if="requiredTraining.length > 0">
                <div class="flex items-center justify-between">
                  <h4 class="text-sm font-medium text-gray-900">Required Training</h4>
                  <span class="text-xs text-amber-600">{{ completedTrainingCount }} of {{ requiredTraining.length }} completed</span>
                </div>
                <div class="mt-2 space-y-2">
                  <div v-for="training in requiredTraining" :key="training.id" class="flex items-center justify-between rounded-md border border-gray-200 px-3 py-2">
                    <div class="flex items-center">
                      <div :class="[
                        'mr-3 h-2 w-2 rounded-full',
                        training.completed ? 'bg-green-500' : 'bg-amber-500'
                      ]"></div>
                      <span class="text-sm">{{ training.name }}</span>
                    </div>
                    <button
                      v-if="!training.completed"
                      type="button"
                      class="text-xs font-medium text-indigo-600 hover:text-indigo-500"
                      @click="enrollInTraining(training.id)"
                    >
                      Enroll
                    </button>
                    <span v-else class="text-xs text-green-600">Completed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              class="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              :disabled="isSubmitting"
              @click="submitForm"
            >
              <Loader2 v-if="isSubmitting" class="mr-2 h-4 w-4 animate-spin" />
              {{ isSubmitting ? 'Creating...' : 'Create Assignment' }}
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
  import { ref, computed, watch } from 'vue';
  import { UserPlus, Loader2 } from 'lucide-vue-next';
  
  const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false
    }
  });
  
  const emit = defineEmits(['close', 'created']);
  
  // Form data
  const formData = ref({
    volunteerId: '',
    departmentId: '',
    roleId: '',
    startDate: '',
    endDate: '',
    notes: ''
  });
  
  // Mock data - in a real app, this would come from an API
  const volunteers = ref([
    { id: '1', name: 'John Smith' },
    { id: '2', name: 'Sarah Johnson' },
    { id: '3', name: 'Michael Brown' },
    { id: '4', name: 'Emily Davis' },
    { id: '5', name: 'David Wilson' }
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
  
  const trainingByRole = {
    '101': [
      { id: 't1', name: 'Worship Planning', completed: true },
      { id: 't2', name: 'Team Leadership', completed: false }
    ],
    '201': [
      { id: 't3', name: 'Child Safety', completed: true },
      { id: 't4', name: 'Curriculum Training', completed: true },
      { id: 't5', name: 'Leadership Development', completed: false }
    ],
    '301': [
      { id: 't6', name: 'Audio Equipment Training', completed: false },
      { id: 't7', name: 'Live Sound Mixing', completed: false }
    ]
    // Other roles would have their own training requirements
  };
  
  // State variables
  const roles = ref([]);
  const requiredTraining = ref([]);
  const isSubmitting = ref(false);
  
  // Computed properties
  const roleSelectPlaceholder = computed(() => {
    return formData.value.departmentId ? 'Select a role' : 'Select a department first';
  });
  
  const completedTrainingCount = computed(() => {
    return requiredTraining.value.filter(t => t.completed).length;
  });
  
  // Methods
  const loadRoles = () => {
    const departmentId = formData.value.departmentId;
    if (departmentId) {
      roles.value = rolesByDepartment[departmentId] || [];
      formData.value.roleId = ''; // Reset role when department changes
      requiredTraining.value = []; // Reset training when department changes
    } else {
      roles.value = [];
    }
  };
  
  const loadRequiredTraining = () => {
    const roleId = formData.value.roleId;
    if (roleId && trainingByRole[roleId]) {
      requiredTraining.value = trainingByRole[roleId];
    } else {
      requiredTraining.value = [];
    }
  };
  
  const enrollInTraining = (trainingId) => {
    // In a real app, this would navigate to the training page or enroll the user
    // For this demo, we'll just mark it as "in progress"
    const training = requiredTraining.value.find(t => t.id === trainingId);
    if (training) {
      // This would typically be an API call
      setTimeout(() => {
        training.enrolled = true;
      }, 500);
    }
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
        volunteerName: volunteers.value.find(v => v.id === formData.value.volunteerId)?.name,
        departmentName: departments.value.find(d => d.id === formData.value.departmentId)?.name,
        roleName: roles.value.find(r => r.id === formData.value.roleId)?.name,
        status: 'pending'
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
  
  const resetForm = () => {
    formData.value = {
      volunteerId: '',
      departmentId: '',
      roleId: '',
      startDate: '',
      endDate: '',
      notes: ''
    };
    requiredTraining.value = [];
  };
  
  const closeModal = () => {
    emit('close');
  };
  
  // Watch for changes to roleId to load required training
  watch(() => formData.value.roleId, loadRequiredTraining);
  
  // Set today's date as the default start date when the component is mounted
  onMounted(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    formData.value.startDate = `${year}-${month}-${day}`;
  });
  </script>