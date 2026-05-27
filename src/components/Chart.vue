<template>
  <div ref="chartRef" class="revenue-chart" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref<HTMLDivElement>()
let chart: echarts.ECharts | undefined

const resizeChart = () => chart?.resize()

onMounted(() => {
  if (!chartRef.value) return

  chart = echarts.init(chartRef.value)
  chart.setOption({
    animationDuration: 700,
    grid: {
      top: 28,
      right: 11,
      bottom: 35,
      left: 42,
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#fff',
      borderColor: '#e6eaf3',
      borderWidth: 1,
      padding: [10, 13],
      textStyle: {
        color: '#16213d',
        fontSize: 12,
        fontWeight: 600,
      },
      formatter: (items: any[]) => {
        const item = items[0]
        return `${item.axisValue}<br/><strong>$${Number(item.value).toLocaleString()}</strong>`
      },
      extraCssText: 'box-shadow: 0 8px 20px rgba(24, 38, 70, .08); border-radius: 8px;',
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['May 7', 'May 8', 'May 9', 'May 10', 'May 11', 'May 12', 'May 13'],
      axisLine: {
        lineStyle: {
          color: '#e7ebf3',
        },
      },
      axisTick: { show: false },
      axisLabel: {
        margin: 19,
        color: '#697892',
        fontSize: 11,
      },
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 4000,
      interval: 1000,
      axisLabel: {
        color: '#697892',
        fontSize: 11,
        formatter: (value: number) => (value === 0 ? '$0' : `$${value / 1000}K`),
      },
      splitLine: {
        lineStyle: {
          color: '#edf0f6',
        },
      },
    },
    series: [
      {
        name: 'Revenue',
        type: 'line',
        smooth: 0.35,
        showSymbol: false,
        data: [1280, 1760, 2140, 1960, 2510, 2280, 2908],
        lineStyle: {
          width: 3,
          color: '#7456fc',
        },
        itemStyle: {
          color: '#7456fc',
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(116, 86, 252, .18)' },
            { offset: 1, color: 'rgba(116, 86, 252, .01)' },
          ]),
        },
      },
    ],
  })

  window.addEventListener('resize', resizeChart)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart)
  chart?.dispose()
})
</script>

<style scoped>
.revenue-chart {
  height: 233px;
  margin-top: 8px;
}
</style>
