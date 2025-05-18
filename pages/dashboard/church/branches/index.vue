<template>
  <div>
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <h1 class="text-2xl font-semibold text-gray-800 dark:text-white">
        Branch Management
      </h1>
      <button 
        @click="showCreateBranchModal = true"
        class="mt-4 md:mt-0 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
        v-motion
        :initial="{ opacity: 0, y: 10 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
      >
        <PlusIcon class="w-5 h-5 mr-2" />
        Create New Branch
      </button>
    </div>

    <!-- Branch Search and Filters -->
    <div 
      class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6"
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }"
    >
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search Branches</label>
          <div class="relative">
            <input 
              type="text" 
              v-model="searchQuery"
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Search by name, location, or code..."
            />
            <MagnifyingGlassIcon class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div class="w-full md:w-48">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Region</label>
          <select 
            v-model="regionFilter"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">All Regions</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="East">East</option>
            <option value="West">West</option>
            <option value="Central">Central</option>
          </select>
        </div>
        <div class="w-full md:w-48">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
          <select 
            v-model="statusFilter"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Under Construction">Under Construction</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Branches Grid -->
    <div 
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      v-motion
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1, transition: { delay: 400 } }"
    >
      <div 
        v-for="(branch, index) in filteredBranches" 
        :key="branch.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 500 + (index * 100) } }"
      >
        <div class="h-32 bg-gradient-to-r from-purple-500 to-indigo-600 relative">
          <div class="absolute inset-0 flex items-center justify-center">
            <BuildingOffice2Icon class="w-16 h-16 text-white opacity-30" />
          </div>
          <div class="absolute top-4 right-4">
            <span 
              class="px-2 py-1 text-xs font-medium rounded-full"
              :class="{
                'bg-green-100 text-green-800': branch.status === 'Active',
                'bg-red-100 text-red-800': branch.status === 'Inactive',
                'bg-yellow-100 text-yellow-800': branch.status === 'Under Construction'
              }"
            >
              {{ branch.status }}
            </span>
          </div>
        </div>
        <div class="p-4">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-1">{{ branch.name }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">{{ branch.location }}</p>
          
          <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
            <UserIcon class="w-4 h-4 mr-2" />
            <span>{{ branch.administratorName || 'No administrator assigned' }}</span>
          </div>
          
          <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
            <MapPinIcon class="w-4 h-4 mr-2" />
            <span>{{ branch.region }}</span>
          </div>
          
          <div class="flex justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
            <button 
              @click="editBranch(branch)"
              class="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 flex items-center"
            >
              <PencilIcon class="w-4 h-4 mr-1" />
              Edit
            </button>
            <button 
              @click="viewBranchDetails(branch)"
              class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
            >
              <EyeIcon class="w-4 h-4 mr-1" />
              View
            </button>
            <button 
              @click="confirmDeleteBranch(branch)"
              class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 flex items-center"
            >
              <TrashIcon class="w-4 h-4 mr-1" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div 
      v-if="filteredBranches.length === 0"
      class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center"
      v-motion
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1, transition: { delay: 400 } }"
    >
      <BuildingOffice2Icon class="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
      <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-2">No branches found</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-4">
        {{ searchQuery || regionFilter || statusFilter ? 'No branches match your search criteria.' : 'Get started by creating your first branch.' }}
      </p>
      <button 
        @click="showCreateBranchModal = true"
        class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center"
      >
        <PlusIcon class="w-5 h-5 mr-2" />
        Create New Branch
      </button>
    </div>

    <!-- Create/Edit Branch Modal -->
    <Teleport to="body">
      <div v-if="showCreateBranchModal || showEditBranchModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div 
          class="w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl dark:bg-gray-800"
          v-motion
          :initial="{ opacity: 0, scale: 0.9 }"
          :enter="{ opacity: 1, scale: 1 }"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
              {{ showEditBranchModal ? 'Edit Branch' : 'Create New Branch' }}
            </h3>
            <button 
              @click="closeModals"
              class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <XMarkIcon class="w-5 h-5" />
            </button>
          </div>
          <form @submit.prevent="showEditBranchModal ? updateBranch() : createBranch()">
            <div class="mb-4">
              <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Branch Name</label>
              <input 
                type="text" 
                v-model="branchForm.name"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter branch name"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
              <input 
                type="text" 
                v-model="branchForm.location"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter location"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Region</label>
              <select 
                v-model="branchForm.region"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                <option value="">Select Region</option>
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="East">East</option>
                <option value="West">West</option>
                <option value="Central">Central</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
              <select 
                v-model="branchForm.status"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Under Construction">Under Construction</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Administrator</label>
              <select 
                v-model="branchForm.administratorId"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select Administrator</option>
                <option v-for="admin in administrators" :key="admin.id" :value="admin.id">
                  {{ admin.name }}
                </option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <textarea 
                v-model="branchForm.description"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter branch description"
                rows="3"
              ></textarea>
            </div>
            <div class="flex justify-end space-x-3">
              <button 
                type="button"
                @click="closeModals"
                class="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button 
                type="submit"
                class="px-4 py-2 text-sm font-medium text-white transition-colors bg-purple-600 rounded-md hover:bg-purple-700"
              >
                {{ showEditBranchModal ? 'Update Branch' : 'Create Branch' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Branch Details Modal -->
    <Teleport to="body">
      <div v-if="showBranchDetailsModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div 
          class="w-full max-w-2xl p-6 mx-4 bg-white rounded-lg shadow-xl dark:bg-gray-800"
          v-motion
          :initial="{ opacity: 0, scale: 0.9 }"
          :enter="{ opacity: 1, scale: 1 }"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
              Branch Details
            </h3>
            <button 
              @click="showBranchDetailsModal = false"
              class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <XMarkIcon class="w-5 h-5" />
            </button>
          </div>
          
          <div v-if="selectedBranch" class="space-y-6">
            <div class="flex flex-col md:flex-row gap-6">
              <div class="w-full md:w-1/3">
                <div class="h-48 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <BuildingOffice2Icon class="w-24 h-24 text-white opacity-30" />
                </div>
              </div>
              <div class="w-full md:w-2/3">
                <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-2">{{ selectedBranch.name }}</h2>
                <div class="flex items-center mb-2">
                  <span 
                    class="px-2 py-1 text-xs font-medium rounded-full mr-2"
                    :class="{
                      'bg-green-100 text-green-800': selectedBranch.status === 'Active',
                      'bg-red-100 text-red-800': selectedBranch.status === 'Inactive',
                      'bg-yellow-100 text-yellow-800': selectedBranch.status === 'Under Construction'
                    }"
                  >
                    {{ selectedBranch.status }}
                  </span>
                  <span class="text-sm text-gray-600 dark:text-gray-400">Branch Code: {{ selectedBranch.id }}</span>
                </div>
                <p class="text-gray-600 dark:text-gray-300 mb-4">{{ selectedBranch.description }}</p>
                
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Location</p>
                    <p class="text-gray-800 dark:text-white">{{ selectedBranch.location }}</p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Region</p>
                    <p class="text-gray-800 dark:text-white">{{ selectedBranch.region }}</p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Administrator</p>
                    <p class="text-gray-800 dark:text-white">{{ selectedBranch.administratorName || 'None assigned' }}</p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Established</p>
                    <p class="text-gray-800 dark:text-white">{{ selectedBranch.established }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Branch Statistics -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Members</p>
                <p class="text-2xl font-bold text-gray-800 dark:text-white">{{ selectedBranch.memberCount }}</p>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Staff</p>
                <p class="text-2xl font-bold text-gray-800 dark:text-white">{{ selectedBranch.staffCount }}</p>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Monthly Budget</p>
                <p class="text-2xl font-bold text-gray-800 dark:text-white">${{ formatNumber(selectedBranch.monthlyBudget) }}</p>
              </div>
            </div>
            
            <!-- Branch Reporting Lines -->
            <div>
              <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-3">Reporting Lines</h3>
              <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div v-if="selectedBranch.reportingLines && selectedBranch.reportingLines.length > 0">
                  <div v-for="(line, index) in selectedBranch.reportingLines" :key="index" class="flex items-center mb-2 last:mb-0">
                    <UserIcon class="w-5 h-5 mr-2 text-gray-500" />
                    <span class="text-gray-800 dark:text-white">{{ line.name }}</span>
                    <span class="mx-2 text-gray-500">→</span>
                    <span class="text-gray-600 dark:text-gray-300">{{ line.position }}</span>
                  </div>
                </div>
                <div v-else class="text-gray-600 dark:text-gray-400">
                  No reporting lines established for this branch.
                </div>
              </div>
            </div>
            
            <div class="flex justify-end space-x-3">
              <button 
                @click="editBranch(selectedBranch)"
                class="px-4 py-2 text-sm font-medium text-white transition-colors bg-purple-600 rounded-md hover:bg-purple-700"
              >
                <PencilIcon class="w-4 h-4 mr-1 inline" />
                Edit Branch
              </button>
              <button 
                @click="showBranchDetailsModal = false"
                class="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
      <div v-if="showDeleteConfirmModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div 
          class="w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl dark:bg-gray-800"
          v-motion
          :initial="{ opacity: 0, scale: 0.9 }"
          :enter="{ opacity: 1, scale: 1 }"
        >
          <div class="text-center">
            <ExclamationTriangleIcon class="w-12 h-12 mx-auto text-red-500 mb-4" />
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Delete Branch
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete <span class="font-medium">{{ selectedBranch?.name }}</span>? This action cannot be undone.
            </p>
            <div class="flex justify-center space-x-3">
              <button 
                @click="showDeleteConfirmModal = false"
                class="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button 
                @click="deleteBranch"
                class="px-4 py-2 text-sm font-medium text-white transition-colors bg-red-600 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { 
  PlusIcon, 
  BuildingOffice2Icon, 
  UserIcon, 
  MapPinIcon, 
  PencilIcon, 
  EyeIcon, 
  TrashIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline';
import { useToast } from '@/composables/useToast';

// Types
interface Branch {
  id: string;
  name: string;
  location: string;
  region: string;
  status: 'Active' | 'Inactive' | 'Under Construction';
  description: string;
  administratorId: string | null;
  administratorName: string | null;
  established: string;
  memberCount: number;
  staffCount: number;
  monthlyBudget: number;
  reportingLines?: Array<{
    name: string;
    position: string;
  }>;
}

interface Administrator {
  id: string;
  name: string;
  email: string;
  position: string;
}

// State
const branches = ref<Branch[]>([]);
const administrators = ref<Administrator[]>([]);
const searchQuery = ref('');
const regionFilter = ref('');
const statusFilter = ref('');
const showCreateBranchModal = ref(false);
const showEditBranchModal = ref(false);
const showBranchDetailsModal = ref(false);
const showDeleteConfirmModal = ref(false);
const selectedBranch = ref<Branch | null>(null);
const branchForm = ref<Partial<Branch>>({
  name: '',
  location: '',
  region: '',
  status: 'Active',
  description: '',
  administratorId: null
});

const { showToast } = useToast();

// Computed
const filteredBranches = computed(() => {
  return branches.value.filter(branch => {
    const matchesSearch = searchQuery.value === '' || 
      branch.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      branch.location.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      branch.id.toLowerCase().includes(searchQuery.value.toLowerCase());
    
    const matchesRegion = regionFilter.value === '' || branch.region === regionFilter.value;
    const matchesStatus = statusFilter.value === '' || branch.status === statusFilter.value;
    
    return matchesSearch && matchesRegion && matchesStatus;
  });
});

// Methods
const fetchBranches = () => {
  // In a real app, this would be an API call
  // For now, we'll use dummy data
  branches.value = [
    {
      id: 'BR001',
      name: 'Main Cathedral',
      location: '123 Main Street, New York',
      region: 'North',
      status: 'Active',
      description: 'Our main cathedral serving the community since 1985.',
      administratorId: 'ADM001',
      administratorName: 'John Smith',
      established: 'Jan 15, 1985',
      memberCount: 1250,
      staffCount: 35,
      monthlyBudget: 45000,
      reportingLines: [
        { name: 'John Smith', position: 'Branch Administrator' },
        { name: 'Sarah Johnson', position: 'Financial Officer' },
        { name: 'Michael Brown', position: 'Community Outreach' }
      ]
    },
    {
      id: 'BR002',
      name: 'Westside Chapel',
      location: '456 West Avenue, Los Angeles',
      region: 'West',
      status: 'Active',
      description: 'A vibrant community church serving the west side of the city.',
      administratorId: 'ADM002',
      administratorName: 'Emily Davis',
      established: 'Mar 22, 1998',
      memberCount: 780,
      staffCount: 18,
      monthlyBudget: 28000,
      reportingLines: [
        { name: 'Emily Davis', position: 'Branch Administrator' },
        { name: 'Robert Wilson', position: 'Youth Pastor' }
      ]
    },
    {
      id: 'BR003',
      name: 'Southside Community Church',
      location: '789 South Boulevard, Miami',
      region: 'South',
      status: 'Active',
      description: 'A welcoming church focused on community service and outreach.',
      administratorId: 'ADM003',
      administratorName: 'David Martinez',
      established: 'Sep 10, 2005',
      memberCount: 620,
      staffCount: 12,
      monthlyBudget: 22000,
      reportingLines: [
        { name: 'David Martinez', position: 'Branch Administrator' }
      ]
    },
    {
      id: 'BR004',
      name: 'Eastside Fellowship',
      location: '321 East Road, Boston',
      region: 'East',
      status: 'Under Construction',
      description: 'Our newest branch currently under construction, expected to open next year.',
      administratorId: null,
      administratorName: null,
      established: 'Expected Jan 2026',
      memberCount: 0,
      staffCount: 5,
      monthlyBudget: 15000,
      reportingLines: []
    },
    {
      id: 'BR005',
      name: 'Central City Church',
      location: '555 Central Avenue, Chicago',
      region: 'Central',
      status: 'Inactive',
      description: 'Temporarily closed for renovations.',
      administratorId: 'ADM004',
      administratorName: 'Lisa Johnson',
      established: 'Jun 5, 1992',
      memberCount: 450,
      staffCount: 0,
      monthlyBudget: 5000,
      reportingLines: [
        { name: 'Lisa Johnson', position: 'Branch Administrator' }
      ]
    }
  ];
};

const fetchAdministrators = () => {
  // In a real app, this would be an API call
  administrators.value = [
    { id: 'ADM001', name: 'John Smith', email: 'john.smith@example.com', position: 'Senior Administrator' },
    { id: 'ADM002', name: 'Emily Davis', email: 'emily.davis@example.com', position: 'Branch Manager' },
    { id: 'ADM003', name: 'David Martinez', email: 'david.martinez@example.com', position: 'Regional Director' },
    { id: 'ADM004', name: 'Lisa Johnson', email: 'lisa.johnson@example.com', position: 'Assistant Administrator' },
    { id: 'ADM005', name: 'Michael Wilson', email: 'michael.wilson@example.com', position: 'Operations Manager' }
  ];
};

const createBranch = () => {
  // In a real app, this would be an API call
  const newBranch: Branch = {
    id: `BR${String(branches.value.length + 1).padStart(3, '0')}`,
    name: branchForm.value.name || '',
    location: branchForm.value.location || '',
    region: branchForm.value.region || '',
    status: branchForm.value.status as 'Active' | 'Inactive' | 'Under Construction',
    description: branchForm.value.description || '',
    administratorId: branchForm.value.administratorId || null,
    administratorName: branchForm.value.administratorId ? 
      administrators.value.find(a => a.id === branchForm.value.administratorId)?.name || null : null,
    established: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    memberCount: 0,
    staffCount: 0,
    monthlyBudget: 0,
    reportingLines: []
  };
  
  branches.value.push(newBranch);
  showToast('Branch created successfully!', 'success');
  closeModals();
};

const updateBranch = () => {
  if (!selectedBranch.value) return;
  
  // In a real app, this would be an API call
  const index = branches.value.findIndex(b => b.id === selectedBranch.value?.id);
  if (index !== -1) {
    const updatedBranch = {
      ...branches.value[index],
      name: branchForm.value.name || branches.value[index].name,
      location: branchForm.value.location || branches.value[index].location,
      region: branchForm.value.region || branches.value[index].region,
      status: branchForm.value.status as 'Active' | 'Inactive' | 'Under Construction',
      description: branchForm.value.description || branches.value[index].description,
      administratorId: branchForm.value.administratorId,
      administratorName: branchForm.value.administratorId ? 
        administrators.value.find(a => a.id === branchForm.value.administratorId)?.name || null : null
    };
    
    branches.value[index] = updatedBranch;
    showToast('Branch updated successfully!', 'success');
    closeModals();
  }
};

const deleteBranch = () => {
  if (!selectedBranch.value) return;
  
  // In a real app, this would be an API call
  branches.value = branches.value.filter(b => b.id !== selectedBranch.value?.id);
  showToast('Branch deleted successfully!', 'success');
  showDeleteConfirmModal.value = false;
};

const editBranch = (branch: Branch) => {
  selectedBranch.value = branch;
  branchForm.value = {
    name: branch.name,
    location: branch.location,
    region: branch.region,
    status: branch.status,
    description: branch.description,
    administratorId: branch.administratorId
  };
  showBranchDetailsModal.value = false;
  showEditBranchModal.value = true;
};

const viewBranchDetails = (branch: Branch) => {
  selectedBranch.value = branch;
  showBranchDetailsModal.value = true;
};

const confirmDeleteBranch = (branch: Branch) => {
  selectedBranch.value = branch;
  showDeleteConfirmModal.value = true;
};

const closeModals = () => {
  showCreateBranchModal.value = false;
  showEditBranchModal.value = false;
  resetForm();
};

const resetForm = () => {
  branchForm.value = {
    name: '',
    location: '',
    region: '',
    status: 'Active',
    description: '',
    administratorId: null
  };
  selectedBranch.value = null;
};

const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

definePageMeta({
    layout: 'dashboard'
})

onMounted(() => {
  fetchBranches();
  fetchAdministrators();
});
</script>