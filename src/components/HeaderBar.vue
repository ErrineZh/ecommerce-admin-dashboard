<template>
  <header class="header">
    <div class="heading">
      <h1>{{ title }} <span v-if="isDashboard" aria-hidden="true">&#128075;</span></h1>
      <p>{{ subtitle }}</p>
    </div>

    <div class="actions">
      <span class="icon-button" aria-hidden="true">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="10.8" cy="10.8" r="7.4" />
          <path d="m16.4 16.4 5 5" />
        </svg>
      </span>
      <span class="icon-button notification" aria-hidden="true">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 10.5a6 6 0 0 1 12 0v5l2 2H4l2-2z" />
          <path d="M9.5 19a2.7 2.7 0 0 0 5 0" />
        </svg>
        <span />
      </span>

      <el-dropdown trigger="click" @command="handleCommand">
        <button class="profile" type="button" aria-label="Open user menu">
          <span class="avatar">{{ userInitial }}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m8 10 4 4 4-4" />
          </svg>
        </button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">Log out</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const userName = localStorage.getItem('username')?.trim() || 'Alex'

const isDashboard = computed(() => route.path === '/')
const userInitial = computed(() => userName.charAt(0).toUpperCase())
const greeting = computed(() => {
  const hour = new Date().getHours()

  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
})
const title = computed(() => {
  if (route.path === '/') return `${greeting.value}, ${userName}`
  if (route.path === '/products') return 'Products'
  if (route.path === '/orders') return 'Orders'
  return 'Dashboard'
})
const subtitle = computed(() => {
  if (route.path === '/') return "Here's what's happening with your store today."
  if (route.path === '/products') return 'Organize products and keep your catalog up to date.'
  return 'Review customer orders and track fulfilment status.'
})

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  localStorage.removeItem('username')
  router.push('/login')
}

const handleCommand = (command: string) => {
  if (command === 'logout') logout()
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 119px;
  padding: 19px 40px 0;
}

.heading h1 {
  margin: 0 0 10px;
  color: #111b39;
  font-size: 27px;
  font-weight: 600;
  letter-spacing: -0.7px;
}

.heading h1 span {
  font-size: 22px;
}

.heading p {
  margin: 0;
  color: #697792;
  font-size: 14px;
}

.actions {
  display: flex;
  align-items: center;
  gap: 25px;
}

.icon-button,
.profile {
  border: 0;
  background: transparent;
}

.icon-button {
  position: relative;
  display: grid;
  width: 30px;
  height: 42px;
  place-items: center;
  padding: 0;
  color: #16213f;
}

.icon-button svg {
  width: 25px;
  height: 25px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.45;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.notification span {
  position: absolute;
  top: 6px;
  right: 2px;
  width: 9px;
  height: 9px;
  border: 2px solid #fff;
  border-radius: 50%;
  background: #7356fc;
}

.profile {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-left: 5px;
  padding: 0;
  color: #77839c;
  cursor: pointer;
}

.avatar {
  display: grid;
  width: 43px;
  height: 43px;
  place-items: center;
  border-radius: 50%;
  color: #1c2943;
  background: linear-gradient(145deg, #e1e5eb, #f5f0eb);
  font-size: 16px;
  font-weight: 600;
}

.profile svg {
  width: 19px;
  height: 19px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

@media (max-width: 720px) {
  .header {
    min-height: 96px;
    padding: 20px;
  }

  .heading h1 {
    font-size: 22px;
  }

  .heading p,
  .icon-button {
    display: none;
  }

  .actions {
    gap: 0;
  }
}
</style>
