<template>
  <div class="layout">
    <aside class="sidebar">
      <el-menu router :default-active="$route.path">
        <el-menu-item
          v-for="item in visibleMenuList"
          :key="item.path"
          :index="item.path"
        >
          {{ item.name }}
        </el-menu-item>
      </el-menu>
    </aside>

    <div class="main">
      <HeaderBar />

      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import HeaderBar from '../components/HeaderBar.vue'

const role = localStorage.getItem('role')

const menuList = [
  { name: 'Dashboard', path: '/', roles: ['admin', 'editor'] },
  { name: 'Products', path: '/products', roles: ['admin'] },
  { name: 'Orders', path: '/orders', roles: ['admin', 'editor'] },
]

const visibleMenuList = computed(() =>
  menuList.filter((item) => role && item.roles.includes(role))
)
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  background: #f5f7fa;
}

.sidebar {
  width: 220px;
  background: #001529;
}

.menu {
  height: 100%;
  border-right: none;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content {
  padding: 20px;
}
</style>
