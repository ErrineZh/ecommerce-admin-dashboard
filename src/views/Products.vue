<template>
  <section class="management-page">
    <header class="page-heading">
      <div>
        <h2>Catalog</h2>
        <p>Search, add, and maintain your store products.</p>
      </div>
      <el-button type="primary" @click="openDialog()">Add Product</el-button>
    </header>

    <div class="panel">
      <div class="toolbar">
        <el-input
          v-model="keyword"
          placeholder="Search product"
          class="keyword-input"
          @keyup.enter="handleSearch"
        />
        <el-button type="primary" @click="handleSearch">Search</el-button>
        <el-button @click="resetSearch">Reset</el-button>
      </div>

      <BaseTable :data="products" :columns="columns" :loading="loading">
        <template #cell-name="{ row }">
          <div class="product-cell">
            <img v-if="row.image" :src="row.image" :alt="row.name" />
            <span v-else class="image-fallback" aria-hidden="true" />
            <strong>{{ row.name }}</strong>
          </div>
        </template>
        <template #cell-price="{ value }">
          ${{ Number(value).toFixed(2) }}
        </template>
        <template #cell-categoryLabel="{ value }">
          {{ value || 'Custom Product' }}
        </template>
        <template #actions="{ row }">
          <el-button size="small" @click="openDialog(row)">Edit</el-button>
          <el-button size="small" type="danger" @click="handleDelete(row.id)">
            Delete
          </el-button>
        </template>
      </BaseTable>

      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        @current-change="handlePageChange"
      />
    </div>

    <el-dialog v-model="visible" title="Product" width="470px">
      <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
        <el-form-item label="Name" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>

        <el-form-item label="Price" prop="price">
          <el-input v-model="form.price" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="visible = false">Cancel</el-button>
        <el-button type="primary" @click="handleSubmit">Confirm</el-button>
      </template>
    </el-dialog>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import {
  getProductList,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../api/product'
import BaseTable from '../components/BaseTable.vue'

const columns = [
  { prop: 'name', label: 'Product Name' },
  { prop: 'categoryLabel', label: 'Collection' },
  { prop: 'price', label: 'Price' },
]

const products = ref<any[]>([])
const loading = ref(false)

const page = ref(1)
const pageSize = ref(5)
const total = ref(0)
const keyword = ref('')

const visible = ref(false)
const form = ref<any>({})
const isEdit = ref(false)
const formRef = ref()

const fetchData = async () => {
  loading.value = true

  const res: any = await getProductList({
    page: page.value,
    pageSize: pageSize.value,
    keyword: keyword.value,
  })

  products.value = res.list
  total.value = res.total
  loading.value = false
}

onMounted(fetchData)

const handleSearch = () => {
  page.value = 1
  fetchData()
}

const resetSearch = () => {
  keyword.value = ''
  page.value = 1
  fetchData()
}

const handlePageChange = (p: number) => {
  page.value = p
  fetchData()
}

const rules = {
  name: [{ required: true, message: 'Name required', trigger: 'blur' }],
  price: [{ required: true, message: 'Price required', trigger: 'blur' }],
}

const openDialog = (row?: any) => {
  if (row) {
    form.value = { ...row }
    isEdit.value = true
  } else {
    form.value = {}
    isEdit.value = false
  }
  visible.value = true
}

const handleSubmit = async () => {
  formRef.value.validate(async (valid: boolean) => {
    if (!valid) return

    if (isEdit.value) {
      await updateProduct(form.value)
      ElMessage.success('Updated successfully')
    } else {
      await addProduct(form.value)
      ElMessage.success('Added successfully')
    }

    visible.value = false
    fetchData()
  })
}

const handleDelete = async (id: number) => {
  await deleteProduct(id)
  fetchData()
}
</script>

<style scoped>
.management-page {
  color: #16213d;
}

.page-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
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

.keyword-input {
  width: 250px;
}

.pagination {
  justify-content: flex-end;
  margin-top: 22px;
}

.product-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.product-cell img,
.image-fallback {
  display: block;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 9px;
  object-fit: cover;
  background: #f1efe9;
}

.product-cell strong {
  font-weight: 500;
}

@media (max-width: 620px) {
  .page-heading {
    align-items: flex-start;
    gap: 18px;
    flex-direction: column;
  }

  .toolbar {
    flex-wrap: wrap;
  }
}
</style>
