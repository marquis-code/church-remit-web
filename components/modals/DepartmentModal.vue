<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="closeModal"></div>

      <!-- Modal panel -->
      <div class="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:align-middle">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 sm:mx-0 sm:h-10 sm:w-10">
              <Building2 class="h-6 w-6 text-amber-600" aria-hidden="true" />
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                {{ editMode ? 'Edit Department' : 'Create New Department' }}
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  {{ editMode ? 'Update department details and manage roles.' : 'Create a new department and define roles.' }}
                </p>
              </div>
            </div>
          </div>

          <div class="mt-6 space-y-6">
            <!-- Department Information -->
            <div>
              <label for="departmentName" class="block text-sm font-medium text-gray-700">Department Name</label>
              <div class="mt-1">
                <input
                  type="text"
                  id="departmentName"
                  v-model="formData.name"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="e.g., Worship Team"
                />
              </div>
            </div>

            <!-- Department Description -->
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
              <div class="mt-1">
                <textarea
                  id="description"
                  v-model="formData.description"
                  rows="3"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Provide a brief description of the department"
                ></textarea>
              </div>
            </div>

            <!-- Department Leader -->
            <div>
              <label for="leader" class="block text-sm font-medium text-gray-700">Department Leader</label>
              <div class="mt-1">
                <select
                  id="leader"
                  v-model="formData.leaderId"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="" disabled>Select a leader</option>
                  <option v-for="volunteer in volunteers" :key="volunteer.id" :value="volunteer.id">
                    {{ volunteer.name }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Department Roles -->
            <div>
              <div class="flex items-center justify-between">
                <label class="block text-sm font-medium text-gray-700">Roles</label>
                <button
                  type="button"
                  class="inline-flex items-center text-xs font-medium text-amber-600 hover:text-amber-500"
                  @click="addRole"
                >
                  <PlusCircle class="mr-1 h-4 w-4" />
                  Add Role
                </button>
              </div>
              <div class="mt-2 space-y-3">
                <div
                  v-for="(role, index) in formData.roles"
                  :key="index"
                  class="rounded-md border border-gray-200 p-3"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex-1">
                      <input
                        type="text"
                        v-model="role.name"
                        class="block w-full border-0 p-0 text-sm font-medium text-gray-900 focus:ring-0"
                        placeholder="Role Title"
                      />
                    </div>
                    <button
                      type="button"
                      class="text-gray-400 hover:text-gray-500"
                      @click="removeRole(index)"
                    >
                      <XCircle class="h-5 w-5" />
                    </button>
                  </div>
                  <div class="mt-2">
                    <textarea
                      v-model="role.description"
                      rows="2"
                      class="block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Role description and responsibilities"
                    ></textarea>
                  </div>
                  <div class="mt-2 flex items-center">
                    <input
                      :id="`role-training-${index}`"
                      type="checkbox"
                      v-model="role.requiresTraining"
                      class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label :for="`role-training-${index}`" class="ml-2 text-sm text-gray-600">
                      Requires Training
                    </label>
                  </div>
                </div>
                <div v-if="formData.roles.length === 0" class="rounded-md border border-dashed border-gray-300 p-4 text-center">
                  <Users class="mx-auto h-8 w-8 text-gray-400" />
                  <p class="mt-1 text-sm text-gray-500">No roles added yet</p>
                  <button
                    type="button"
                    class="mt-2 inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-500"
                    @click="addRole"
                  >
                    <PlusCircle class="mr-1 h-4 w-4" />
                    Add Your First Role
                  </button>
                </div>
              </div>
            </div>

            <!-- Department Settings -->
            <div>
              <h4 class="text-sm font-medium text-gray-900">Department Settings</h4>
              <div class="mt-2 space-y-2">
                <div class="flex items-center">
                  <input
                    id="autoApprove"
                    type="checkbox"
                    v-model="formData.autoApproveAssignments"
                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label for="autoApprove" class="ml-2 block text-sm text-gray-700">
                    Auto-approve volunteer assignments
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    id="scheduleEnabled"
                    type="checkbox"
                    v-model="formData.scheduleEnabled"
                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label for="scheduleEnabled" class="ml-2 block text-sm text-gray-700">
                    Enable scheduling for this department
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            class="inline-flex w-full justify-center rounded-md border border-transparent bg-amber-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
            :disabled="isSubmitting"
            @click="submitForm"
          >
            <Loader2 v-if="isSubmitting" class="mr-2 h-4 w-4 animate-spin" />
            {{ isSubmitting ? (editMode ? 'Updating...' : 'Creating...') : (editMode ? 'Update Department' : 'Create Department') }}
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
import { Building2, PlusCircle, XCircle, Users, Loader2 } from 'lucide-vue-next';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  editData: {
    type: Object,
    default: null
  }
});

const resetForm = () => {
  formData.value = {
    name: '',
    description: '',
    leaderId: '',
    roles: [],
    autoApproveAssignments: false,
    scheduleEnabled: true
  };
};

const emit = defineEmits(['close', 'created', 'updated']);

// Computed property to determine if we're in edit mode
const editMode = computed(() => !!props.editData);

// Form data
const formData = ref({
  name: '',
  description: '',
  leaderId: '',
  roles: [],
  autoApproveAssignments: false,
  scheduleEnabled: true
});

// Watch for changes to editData to update form
watch(() => props.editData, (newVal) => {
  if (newVal) {
    formData.value = { ...newVal };
  } else {
    resetForm();
  }
}, { immediate: true });

// State variables
const isSubmitting = ref(false);

// Mock data
const volunteers = ref([
  { id: '1', name: 'John Smith' },
  { id: '2', name: 'Sarah Johnson' },
  { id: '3', name: 'Michael Brown' },
  { id: '4', name: 'Emily Davis' },
  { id: '5', name: 'David Wilson' }
]);

// Methods
const addRole = () => {
  formData.value.roles.push({
    name: '',
    description: '',
    requiresTraining: false
  });
};

const removeRole = (index) => {
  formData.value.roles.splice(index, 1);
};

const submitForm = async () => {
  isSubmitting.value = true;
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, you would send the form data to your API
    console.log('Form submitted:', formData.value);
    
    // Emit appropriate event based on mode
    if (editMode.value) {
      emit('updated', {
        ...formData.value,
        leaderName: volunteers.value.find(v => v.id === formData.value.leaderId)?.name
      });
    } else {
      emit('created', {
        id: Math.random().toString(36).substr(2, 9),
        ...formData.value,
        leaderName: volunteers.value.find(v => v.id === formData.value.leaderId)?.name,
        createdAt: new Date().toISOString()
      });
    }
    
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