<template>
    <div class="relative">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import Chart from 'chart.js/auto';
  
  const props = defineProps({
    chartData: {
      type: Object,
      required: true
    }
  });
  
  const chartCanvas = ref<HTMLCanvasElement | null>(null);
  let chart: Chart | null = null;
  
  const createChart = () => {
    if (!chartCanvas.value) return;
    
    const ctx = chartCanvas.value.getContext('2d');
    if (!ctx) return;
    
    chart = new Chart(ctx, {
      type: 'line',
      data: props.chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeOutQuart'
        }
      }
    });
  };
  
  onMounted(() => {
    createChart();
  });
  
  watch(() => props.chartData, () => {
    if (chart) {
      chart.destroy();
    }
    createChart();
  }, { deep: true });
  </script>