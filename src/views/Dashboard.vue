<template>
  <div>
    <h2>Dashboard</h2>

    <!-- 数据卡片 -->
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="8">
        <el-card>Total Sales: $12,000</el-card>
      </el-col>
      <el-col :span="8">
        <el-card>Orders: 320</el-card>
      </el-col>
      <el-col :span="8">
        <el-card>Users: 120</el-card>
      </el-col>
    </el-row>

    <!-- 图表 -->
    <Chart />
  </div>
</template>

<script setup lang="ts">
import Chart from '../components/Chart.vue'
</script>