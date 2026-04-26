<template>
  <div>
    <h2>Products</h2>

    <el-input
      v-model="keyword"
      placeholder="Search product"
      style="width: 200px; margin-right: 10px"
    />

    <el-button type="primary" @click="handleSearch">Search</el-button>
    <el-button @click="resetSearch">Reset</el-button>

    <el-button type="primary" @click="openDialog()" style="float: right">
      Add Product
    </el-button>

    <!-- <el-table :data="products" v-loading="loading" style="margin-top: 20px">
      <el-table-column prop="name" label="Product Name" />
      <el-table-column prop="price" label="Price" />

      <el-table-column label="Actions">
        <template #default="scope">
          <el-button size="small" @click="openDialog(scope.row)">Edit</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table> -->

    <BaseTable :data="products" :columns="columns" :loading="loading">
      <template #actions="{ row }">
        <el-button size="small" @click="openDialog(row)">Edit</el-button>
        <el-button size="small" type="danger" @click="handleDelete(row.id)">
          Delete
        </el-button>
      </template>
    </BaseTable>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      @current-change="handlePageChange"
    />

    <!-- Dialog -->
    <el-dialog v-model="visible" title="Product">
      <el-form :model="form" :rules="rules" ref="formRef">
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  getProductList,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../api/product'
import { ElMessage } from 'element-plus'
import BaseTable from '../components/BaseTable.vue'

const columns = [
  { prop: 'name', label: 'Product Name' },
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

// 搜索
const handleSearch = () => {
  page.value = 1
  fetchData()
}

const resetSearch = () => {
  keyword.value = ''
  fetchData()
}

// 分页
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

const formRef = ref()

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
