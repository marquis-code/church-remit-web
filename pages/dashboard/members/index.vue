<template>
    <div class="min-h-screen ">
      <div class="container mx-auto">
        <div class="text-start mb-12">
          <h1 class="text-2xl font-bold text-indigo-800 mb-4 animate-fade-in">
            Member Engagement & Discipleship
          </h1>
          <p class="text-lg text-gray-600">
            Manage your church community with powerful tools for group management and automated follow-ups.
          </p>
        </div>
  
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8  mx-auto">
          <NuxtLink to="/dashboard/members/group-management" 
            class="feature-card group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <div class="h-40 bg-indigo-600 flex items-center justify-center p-6">
              <div class="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <Icon name="mdi:account-group" class="text-white text-5xl" />
              </div>
            </div>
            <div class="p-6">
              <h2 class="text-2xl font-bold text-indigo-800 mb-3 group-hover:text-indigo-600 transition-colors">
                7.1 Group & Discipleship Management
              </h2>
              <ul class="space-y-2 text-gray-700">
                <li class="flex items-start">
                  <Icon name="mdi:check-circle" class="text-green-500 mt-1 mr-2" />
                  <span>Create & Manage Small Groups</span>
                </li>
                <li class="flex items-start">
                  <Icon name="mdi:check-circle" class="text-green-500 mt-1 mr-2" />
                  <span>Assign Leaders & Track Member Participation</span>
                </li>
                <li class="flex items-start">
                  <Icon name="mdi:check-circle" class="text-green-500 mt-1 mr-2" />
                  <span>Group Discussion & Resource Sharing</span>
                </li>
              </ul>
              <div class="mt-6 text-center">
                <span class="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full font-medium transition-colors group-hover:bg-indigo-700 group-hover:text-white">
                  Explore Feature
                </span>
              </div>
            </div>
          </NuxtLink>
  
          <NuxtLink to="/dashboard/members/automated-followups" 
            class="feature-card group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <div class="h-40 bg-purple-600 flex items-center justify-center p-6">
              <div class="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <Icon name="mdi:bell-ring" class="text-white text-5xl" />
              </div>
            </div>
            <div class="p-6">
              <h2 class="text-2xl font-bold text-purple-800 mb-3 group-hover:text-purple-600 transition-colors">
                7.2 Automated Follow-ups
              </h2>
              <ul class="space-y-2 text-gray-700">
                <li class="flex items-start">
                  <Icon name="mdi:check-circle" class="text-green-500 mt-1 mr-2" />
                  <span>Engagement Automation for New Members & Absentees</span>
                </li>
                <li class="flex items-start">
                  <Icon name="mdi:check-circle" class="text-green-500 mt-1 mr-2" />
                  <span>Personalized Content Recommendations</span>
                </li>
                <li class="flex items-start">
                  <Icon name="mdi:check-circle" class="text-green-500 mt-1 mr-2" />
                  <span>Birthday & Anniversary Notifications</span>
                </li>
              </ul>
              <div class="mt-6 text-center">
                <span class="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-medium transition-colors group-hover:bg-purple-700 group-hover:text-white">
                  Explore Feature
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  useHead({
    title: 'Member Engagement & Discipleship Dashboard',
    meta: [
      { name: 'description', content: 'Manage church member engagement and discipleship with powerful tools' }
    ]
  })

  definePageMeta({
      layout: 'dashboard'
  })
  </script>
  
  <style>
  .animate-fade-in {
    animation: fadeIn 0.8s ease-in-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .feature-card {
    animation: slideIn 0.5s ease-out;
    animation-fill-mode: both;
  }
  
  .feature-card:nth-child(1) {
    animation-delay: 0.2s;
  }
  
  .feature-card:nth-child(2) {
    animation-delay: 0.4s;
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>