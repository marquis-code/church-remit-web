<template>
    <div class="h-full w-full bg-white rounded-lg p-4 flex items-center justify-center">
      <div class="w-full h-full relative">
        <div class="absolute bottom-0 left-0 w-full h-full flex items-end">
          <div 
            v-for="(item, index) in data" 
            :key="index" 
            class="flex-1 mx-1 flex flex-col items-center"
          >
            <div class="w-full flex justify-center space-x-1">
              <div 
                v-for="(series, seriesIndex) in item.series" 
                :key="seriesIndex"
                class="w-4 rounded-t-sm transition-all duration-500" 
                :class="series.color"
                :style="{ height: `${calculateHeight(series.value)}px` }"
              ></div>
            </div>
            <div class="text-xs text-gray-500 mt-2">{{ item.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  interface Series {
    value: number;
    color: string;
  }
  
  interface ChartItem {
    label: string;
    series: Series[];
  }
  
  interface Props {
    data: ChartItem[];
    maxHeight?: number;
    scale?: number;
  }
  
  const props = withDefaults(defineProps<Props>(), {
    maxHeight: 200,
    scale: 1
  });
  
  const calculateHeight = (value: number) => {
    return Math.min(value * props.scale, props.maxHeight);
  };
  </script>