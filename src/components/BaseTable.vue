<template>
  <div class="table-shell">
    <el-table :data="data" v-loading="loading">
      <el-table-column v-for="col in columns" :key="col.prop" :prop="col.prop" :label="col.label">
        <template #default="scope">
          <slot :name="`cell-${col.prop}`" :row="scope.row" :value="scope.row[col.prop]">
            {{ scope.row[col.prop] }}
          </slot>
        </template>
      </el-table-column>

      <el-table-column v-if="$slots.actions" label="Actions">
        <template #default="scope">
          <slot name="actions" :row="scope.row" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  data: any[]
  columns: { prop: string; label: string }[]
  loading?: boolean
}>()
</script>

<style scoped>
.table-shell {
  margin-top: 22px;
  overflow: hidden;
  border: 1px solid #edf0f7;
  border-radius: 10px;
}

:deep(.el-table) {
  --el-table-header-bg-color: #fafbfe;
  --el-table-border-color: #edf0f7;
  --el-table-row-hover-bg-color: #faf9ff;
  color: #14203c;
}

:deep(.el-table th.el-table__cell) {
  height: 52px;
  color: #687792;
  font-size: 13px;
  font-weight: 500;
}

:deep(.el-table td.el-table__cell) {
  height: 55px;
  font-size: 14px;
}
</style>
