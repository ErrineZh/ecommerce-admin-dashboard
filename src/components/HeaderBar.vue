<template>
  <div class="header">
    <div class="left">Admin Dashboard</div>

    <div class="right">
      <span class="user">Admin</span>
      <el-button size="small" @click="logout">Logout</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  router.push('/login')
}
</script>
