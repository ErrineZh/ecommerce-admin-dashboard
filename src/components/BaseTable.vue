<template>
  <el-table :data="data" v-loading="loading" style="width: 100%">
    <el-table-column
      v-for="col in columns"
      :key="col.prop"
      :prop="col.prop"
      :label="col.label"
    />

    <!-- 操作列插槽 -->
    <el-table-column v-if="$slots.actions" label="Actions">
      <template #default="scope">
        <slot name="actions" :row="scope.row" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
defineProps<{
  data: any[]
  columns: { prop: string; label: string }[]
  loading?: boolean
}>()
</script>