<!-- <template>
    <div class="relative h-full">
      <TransitionGroup 
        tag="div"
        class="h-full"
        :name="direction === 'next' ? 'slide-left' : 'slide-right'"
      >
        <div 
          v-for="(slide, index) in testimonials" 
          :key="slide.id"
          v-show="currentIndex === index"
          class="absolute inset-0"
        >
          <img 
            :src="slide.image" 
            :alt="slide.name"
            class="h-full w-full object-cover"
          />
          
          <div class="absolute inset-0 bg-black/40">
            <div class="absolute bottom-20 left-12 right-12 text-white">
              <p class="text-3xl font-medium leading-relaxed text-yellow-400 mb-8">
                {{ slide.testimonial }}
              </p>
              
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-xl font-semibold">{{ slide.name }}</p>
                  <p class="text-gray-300">{{ slide.location }}</p>
                </div>
                
                <div class="flex space-x-4">
                  <button @click="prevSlide" class="text-yellow-400 hover:text-yellow-300">
                  </button>
                  <button @click="nextSlide" class="text-yellow-400 hover:text-yellow-300">
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  // import { IconChevronLeft, IconChevronRight } from '@iconify/vue'
  import testimonial1 from '@/assets/img/testimonials/conor-neville.jpg'
  import testimonial2 from '@/assets/img/testimonials/amy-chase.jpg'
  import testimonial3 from '@/assets/img/testimonials/harriet-arron.jpg'
  
  const testimonials = ref([
    {
      id: 1,
      name: 'Pastor John D.',
      location: 'Grace Community Church, California',
      testimonial: 'This platform has transformed how we manage our church. The seamless integration of all features has made administration a breeze!',
      image: testimonial1
    },
    {
      id: 2,
      name: 'Sarah M.',
      location: 'Hope Fellowship, Texas',
      testimonial: 'The financial management tools have helped us maintain transparency and accountability in all our church operations.',
      image: testimonial2
    },
    {
      id: 3,
      name: 'Rev. Michael P.',
      location: 'Faith Baptist Church, New York',
      testimonial: 'From event management to member engagement, everything is now streamlined and efficient.',
      image: testimonial3
    }
  ])
  
  const currentIndex = ref(0)
  const direction = ref<'next' | 'prev'>('next')
  let autoplayInterval: NodeJS.Timeout
  
  const nextSlide = () => {
    direction.value = 'next'
    currentIndex.value = (currentIndex.value + 1) % testimonials.value.length
  }
  
  const prevSlide = () => {
    direction.value = 'prev'
    currentIndex.value = currentIndex.value === 0 
      ? testimonials.value.length - 1 
      : currentIndex.value - 1
  }
  
  onMounted(() => {
    autoplayInterval = setInterval(nextSlide, 5000)
  })
  
  onBeforeUnmount(() => {
    clearInterval(autoplayInterval)
  })
  </script>
  
  <style scoped>
  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition: all 0.5s ease-in-out;
  }
  
  .slide-left-enter-from {
    transform: translateX(100%);
  }
  
  .slide-left-leave-to {
    transform: translateX(-100%);
  }
  
  .slide-right-enter-from {
    transform: translateX(-100%);
  }
  
  .slide-right-leave-to {
    transform: translateX(100%);
  }
  </style> -->

  <template>
    <div class="relative h-full overflow-hidden">
      <!-- Carousel Items -->
      <div class="h-full relative">
        <transition-group 
          :name="direction === 'next' ? 'slide-left' : 'slide-right'"
          tag="div"
          class="h-full"
        >
          <div 
            v-for="(slide, index) in testimonials" 
            :key="slide.id"
            v-show="currentIndex === index"
            class="absolute inset-0 w-full h-full"
          >
            <!-- Background Image -->
            <img 
              :src="slide.image" 
              :alt="slide.name"
              class="h-full w-full object-cover"
            />
            
            <!-- Overlay -->
            <div class="absolute inset-0 bg-black/40">
              <div class="absolute bottom-20 left-12 right-12 text-white">
                <!-- Testimonial Text -->
                <p class="text-3xl font-medium leading-relaxed text-yellow-400 mb-8">
                  {{ slide.testimonial }}
                </p>
                
                <!-- Author Info -->
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-xl font-semibold">{{ slide.name }}</p>
                    <p class="text-gray-300">{{ slide.location }}</p>
                  </div>
                  
                  <!-- Navigation Arrows -->
                  <div class="flex space-x-4">
                    <button 
                      @click="prevSlide" 
                      class="text-yellow-400 hover:text-yellow-300 transition-colors"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft class="w-8 h-8" />
                    </button>
                    <button 
                      @click="nextSlide" 
                      class="text-yellow-400 hover:text-yellow-300 transition-colors"
                      aria-label="Next slide"
                    >
                      <ChevronRight class="w-8 h-8" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </template>
    
  <script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
  import testimonial1 from '@/assets/img/testimonials/conor-neville.jpg'
  import testimonial2 from '@/assets/img/testimonials/amy-chase.jpg'
  import testimonial3 from '@/assets/img/testimonials/harriet-arron.jpg'
  
  // Define testimonial interface
  interface Testimonial {
    id: number
    name: string
    location: string
    testimonial: string
    image: string
  }
  
  // In Nuxt 3, we can use the public directory for images or use assets with the ~ syntax
  
  const testimonials = ref([
    {
      id: 1,
      name: 'Pastor John D.',
      location: 'Grace Community Church, California',
      testimonial: 'This platform has transformed how we manage our church. The seamless integration of all features has made administration a breeze!',
      image: testimonial1
    },
    {
      id: 2,
      name: 'Sarah M.',
      location: 'Hope Fellowship, Texas',
      testimonial: 'The financial management tools have helped us maintain transparency and accountability in all our church operations.',
      image: testimonial2
    },
    {
      id: 3,
      name: 'Rev. Michael P.',
      location: 'Faith Baptist Church, New York',
      testimonial: 'From event management to member engagement, everything is now streamlined and efficient.',
      image: testimonial3
    }
  ])
  
  const currentIndex = ref(0)
  const direction = ref<'next' | 'prev'>('next')
  let autoplayInterval: ReturnType<typeof setInterval>
  
  const nextSlide = () => {
    direction.value = 'next'
    currentIndex.value = (currentIndex.value + 1) % testimonials.value.length
  }
  
  const prevSlide = () => {
    direction.value = 'prev'
    currentIndex.value = currentIndex.value === 0 
      ? testimonials.value.length - 1 
      : currentIndex.value - 1
  }
  
  // Use lifecycle hooks to manage the autoplay interval [^1]
  onMounted(() => {
    autoplayInterval = setInterval(nextSlide, 5000)
  })
  
  onBeforeUnmount(() => {
    clearInterval(autoplayInterval)
  })
  </script>
    
  <style scoped>
  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition: transform 0.5s ease-in-out;
    position: absolute;
    width: 100%;
    height: 100%;
  }
  
  .slide-left-enter-from {
    transform: translateX(100%);
  }
  
  .slide-left-leave-to {
    transform: translateX(-100%);
  }
  
  .slide-right-enter-from {
    transform: translateX(-100%);
  }
  
  .slide-right-leave-to {
    transform: translateX(100%);
  }
  
  /* Ensure all slides are properly positioned */
  .transition-group-item {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  </style>