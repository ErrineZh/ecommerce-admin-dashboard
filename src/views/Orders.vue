<template>
  <section class="management-page">
    <header class="page-heading">
      <div>
        <h2>Order Management</h2>
        <p>Filter orders and keep track of fulfilment.</p>
      </div>
    </header>

    <div class="panel">
      <div class="toolbar">
        <el-select v-model="status" placeholder="Filter by status" class="status-select">
          <el-option label="All" value="All" />
          <el-option label="Paid" value="Paid" />
          <el-option label="Pending" value="Pending" />
          <el-option label="Shipped" value="Shipped" />
        </el-select>

        <el-button type="primary" @click="fetchData">Search</el-button>
      </div>

      <BaseTable :data="orders" :columns="columns" :loading="loading">
        <template #cell-amount="{ value }">
          ${{ Number(value).toFixed(2) }}
        </template>
        <template #actions="{ row }">
          <el-tag :type="getTagType(row.status)">
            {{ row.status }}
          </el-tag>
        </template>
      </BaseTable>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getOrderList } from '../api/order'
import BaseTable from '../components/BaseTable.vue'

const columns = [
  { prop: 'id', label: 'Order ID' },
  { prop: 'user', label: 'User' },
  { prop: 'product', label: 'Product' },
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

<style scoped>
.management-page {
  color: #16213d;
}

.page-heading {
  margin-bottom: 23px;
}

.page-heading h2 {
  margin: 0 0 7px;
  font-size: 20px;
  font-weight: 600;
}

.page-heading p {
  color: #697792;
  font-size: 13px;
}

.panel {
  padding: 24px;
  border: 1px solid #e9edf5;
  border-radius: 10px;
  background: #fff;
}

.toolbar {
  display: flex;
  gap: 10px;
}

.status-select {
  width: 210px;
}
</style>
