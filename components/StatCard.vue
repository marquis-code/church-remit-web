<template>
    <div 
      class="bg-white rounded-xl shadow-md border border-gray-100 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <div class="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100">
            <Icon :name="icon" :class="[color, 'h-6 w-6']" />
          </div>
        </div>
        <div class="ml-5 w-0 flex-1">
          <dl>
            <dt class="text-sm font-medium text-gray-500 truncate">{{ title }}</dt>
            <dd>
              <div class="text-lg font-bold text-gray-900">{{ value }}</div>
              <div class="mt-1 flex items-center text-sm">
                <div :class="change.includes('+') ? 'text-green-500' : 'text-red-500'">{{ change }}</div>
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps({
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    change: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'text-emerald-500'
    }
  })
  </script>
  
  