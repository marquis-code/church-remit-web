<template>
  <div class="min-h-screen flex">
      <!-- Left Panel - Auth Forms -->
      <div class="w-full lg:w-1/2 p-8 lg:p-12 flex items-center justify-center">
        <slot />
      </div>
  
      <!-- Right Panel - Testimonial Carousel -->
      <div class="hidden lg:block lg:w-1/2 relative bg-gray-900">
        <Carousel />
      </div>
  </div>
</template>