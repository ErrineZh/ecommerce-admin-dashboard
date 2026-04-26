<template>
  <div>
    <h2>Orders</h2>

    <!-- 筛选 -->
    <el-select v-model="status" placeholder="Filter by status" style="width: 200px">
      <el-option label="All" value="All" />
      <el-option label="Paid" value="Paid" />
      <el-option label="Pending" value="Pending" />
      <el-option label="Shipped" value="Shipped" />
    </el-select>

    <el-button type="primary" @click="fetchData" style="margin-left: 10px">
      Search
    </el-button>

    <!-- 表格 -->
    <BaseTable :data="orders" :columns="columns" :loading="loading">
      <template #actions="{ row }">
        <el-tag :type="getTagType(row.status)">
          {{ row.status }}
        </el-tag>
      </template>
    </BaseTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getOrderList } from '../api/order'
import BaseTable from '../components/BaseTable.vue'

const columns = [
  { prop: 'id', label: 'Order ID' },
  { prop: 'user', label: 'User' },
  { prop: 'amount', label: 'Amount' },
]

const orders = ref<any[]>([])
const loading = ref(false)
const status = ref('All')

const fetchData = async () => {
  loading.value = true

  const res: any = await getOrderList({
    status: status.value,
  })

  orders.value = res.data

  loading.value = false
}

onMounted(fetchData)

// 状态颜色
const getTagType = (status: string) => {
  switch (status) {
    case 'Paid':
      return 'success'
    case 'Pending':
      return 'warning'
    case 'Shipped':
      return 'info'
    default:
      return ''
  }
}
</script>
