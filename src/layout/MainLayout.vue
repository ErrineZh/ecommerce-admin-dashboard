<template>
  <div class="page-shell">
    <div class="layout">
      <aside class="sidebar">
        <router-link to="/" class="brand" aria-label="Loopi Handmade home">
          Loopi Handmade<span>.</span>
        </router-link>

        <nav class="navigation" aria-label="Main navigation">
          <router-link
            v-for="item in visibleMenuList"
            :key="item.path"
            :to="item.path"
            class="nav-item"
            :class="{ active: $route.path === item.path }"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path :d="item.icon" />
            </svg>
            <span>{{ item.name }}</span>
            <small v-if="item.badge">{{ item.badge }}</small>
          </router-link>

          <div v-for="item in secondaryMenuList" :key="item.name" class="nav-item secondary">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path :d="item.icon" />
            </svg>
            <span>{{ item.name }}</span>
          </div>
        </nav>

        <div class="upgrade-card">
          <div class="crown" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M4 7.5 8.3 12 12 5l3.7 7L20 7.5l-1.2 10h-14z" />
            </svg>
          </div>
          <div>
            <strong>Pro Plan</strong>
            <span>Upgrade</span>
          </div>
          <svg class="chevron" viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </div>
      </aside>

      <div class="main">
        <HeaderBar />
        <main class="content">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import HeaderBar from '../components/HeaderBar.vue'

const role = localStorage.getItem('role')

const menuList = [
  {
    name: 'Overview',
    path: '/',
    roles: ['admin', 'editor'],
    icon: 'M4.5 10.5 12 4l7.5 6.5v8.25a1.25 1.25 0 0 1-1.25 1.25H15v-6h-6v6H5.75a1.25 1.25 0 0 1-1.25-1.25z',
  },
  {
    name: 'Orders',
    path: '/orders',
    roles: ['admin', 'editor'],
    badge: '4',
    icon: 'M7 7V5.5a5 5 0 0 1 10 0V7h2v12H5V7zm2 0h6V5.5a3 3 0 0 0-6 0z',
  },
  {
    name: 'Products',
    path: '/products',
    roles: ['admin'],
    icon: 'M4 12 12 4h6l2 2v6l-8 8-8-8zm12-4.5a1.35 1.35 0 1 0 0 .01z',
  },
]

const secondaryMenuList = [
  {
    name: 'Customers',
    icon: 'M16.5 20a5 5 0 0 0-9 0M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm8 6a4 4 0 0 0-4-4',
  },
  {
    name: 'Analytics',
    icon: 'M5 19V12h4v7zm6 0V5h4v14zm6 0V9h3v10z',
  },
  {
    name: 'Marketing',
    icon: 'm4 12 12-5v10L4 12zm12 1.5 3 2.5M7 13l1 5h3l-1.5-6',
  },
  {
    name: 'Discounts',
    icon: 'M4 8a2 2 0 0 0 0 4v4h16v-4a2 2 0 0 1 0-4V4H4z',
  },
  {
    name: 'Settings',
    icon: 'M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4zm7-3.2 1.5-2-2-3.4-2.5 1a7 7 0 0 0-1.5-.9L14 4h-4l-.5 2.7c-.5.2-1 .5-1.5.9l-2.5-1-2 3.4L5 12l-1.5 2 2 3.4 2.5-1c.5.4 1 .7 1.5.9L10 20h4l.5-2.7c.5-.2 1-.5 1.5-.9l2.5 1 2-3.4z',
  },
]

const visibleMenuList = computed(() =>
  menuList.filter((item) => role && item.roles.includes(role))
)
</script>

<style scoped>
.page-shell {
  min-height: 100vh;
  padding: 28px;
  background: #f7f8fc;
}

.layout {
  display: flex;
  max-width: 1480px;
  min-height: calc(100vh - 56px);
  margin: 0 auto;
  overflow: hidden;
  background: #fff;
  border: 1px solid #eef1f7;
  border-radius: 18px;
  box-shadow: 0 16px 45px rgba(19, 34, 68, 0.08);
}

.sidebar {
  display: flex;
  flex: 0 0 244px;
  flex-direction: column;
  padding: 40px 26px 28px;
  border-right: 1px solid #edf0f7;
  background: #fff;
}

.brand {
  display: inline-flex;
  margin: 2px 14px 70px;
  color: #101c3e;
  font-size: 23px;
  font-weight: 700;
  letter-spacing: -1px;
  white-space: nowrap;
  text-decoration: none;
}

.brand span {
  color: #7058ff;
}

.navigation {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.nav-item {
  display: flex;
  align-items: center;
  height: 54px;
  padding: 0 17px;
  gap: 17px;
  border-radius: 11px;
  color: #687692;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.18s ease, background 0.18s ease;
}

.nav-item svg {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.65;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.nav-item.active,
.nav-item:hover:not(.secondary) {
  color: #6749ff;
  background: #f0edff;
}

.nav-item small {
  min-width: 28px;
  margin-left: auto;
  padding: 3px 0;
  border-radius: 13px;
  background: #efebff;
  color: #6749ff;
  font-size: 12px;
  text-align: center;
}

.secondary {
  cursor: default;
}

.upgrade-card {
  display: flex;
  align-items: center;
  gap: 13px;
  margin-top: auto;
  padding: 18px 14px;
  border: 1px solid #e8ebf4;
  border-radius: 12px;
  color: #17223d;
}

.upgrade-card .crown {
  display: grid;
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  place-items: center;
  border-radius: 10px;
  color: #fff;
  background: #7256fd;
  box-shadow: 0 8px 16px rgba(114, 86, 253, 0.25);
}

.upgrade-card .crown svg {
  width: 22px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linejoin: round;
}

.upgrade-card strong,
.upgrade-card span {
  display: block;
  font-size: 14px;
}

.upgrade-card strong {
  margin-bottom: 4px;
  font-weight: 600;
}

.upgrade-card span {
  color: #697694;
}

.chevron {
  width: 17px;
  height: 17px;
  margin-left: auto;
  fill: none;
  stroke: #63718e;
  stroke-width: 1.8;
}

.main {
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
}

.content {
  flex: 1;
  min-width: 0;
  padding: 14px 29px 30px 40px;
}

@media (max-width: 1120px) {
  .page-shell {
    padding: 0;
  }

  .layout {
    min-height: 100vh;
    border-radius: 0;
  }

  .sidebar {
    flex-basis: 86px;
    padding: 30px 14px;
  }

  .brand {
    display: none;
  }

  .nav-item {
    justify-content: center;
    padding: 0;
  }

  .nav-item span,
  .nav-item small,
  .upgrade-card div:not(.crown),
  .chevron {
    display: none;
  }

  .upgrade-card {
    justify-content: center;
    padding: 12px 0;
  }

  .content {
    padding: 14px 22px 26px;
  }
}

@media (max-width: 720px) {
  .layout {
    display: block;
  }

  .sidebar {
    display: block;
    padding: 18px;
    border-right: 0;
    border-bottom: 1px solid #edf0f7;
  }

  .brand {
    display: none;
  }

  .navigation {
    flex-direction: row;
    overflow-x: auto;
  }

  .nav-item.secondary,
  .upgrade-card {
    display: none;
  }
}
</style>
