<template>
  <main>
    <NuxtLink to={props.to} class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
        <div class="flex items-center">
          <!-- <div class={`flex h-12 w-12 items-center justify-center rounded-lg ${props.color}`}>
            {h(icons[props.icon], { class: 'h-6 w-6 text-white' })}
          </div> -->
          <div class="ml-4">
            <!-- <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ title }}</h3>
            <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{  value }}</p> -->
          </div>
        </div>
      </NuxtLink>
  </main>
</template>

<script setup lang="ts">
const props= defineProps({
    title: String,
    value: [String, Number],
    icon: String,
    color: String,
    to: String
})
</script>
