<template>
  <div ref="chartRef" style="width: 100%; height: 400px;"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref()

onMounted(() => {
  const chart = echarts.init(chartRef.value)

  chart.setOption({
    title: {
      text: 'Sales Overview',
    },
    tooltip: {},
    xAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {},
    series: [
      {
        name: 'Sales',
        type: 'line',
        data: [120, 200, 150, 80, 70, 110, 130],
      },
    ],
  })
})
</script>
