<template>
  <div class="login-page">
    <section class="login-card">
      <div class="brand">Loopi Handmade<span>.</span></div>
      <h1>Welcome back</h1>
      <p class="subtitle">Sign in to manage your store dashboard.</p>

      <div class="demo-credentials" aria-label="Demo account credentials">
        <div>
          <span class="demo-label">Demo account</span>
          <p>Use this account to explore the dashboard.</p>
        </div>
        <div class="credential-list">
          <span>Username <code>{{ demoCredentials.username }}</code></span>
          <span>Password <code>{{ demoCredentials.password }}</code></span>
        </div>
        <el-button class="demo-button" type="primary" plain @click="fillDemoCredentials">
          Use demo account
        </el-button>
      </div>

      <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
        <el-form-item label="Username" prop="username">
          <el-input v-model="form.username" placeholder="Enter username" />
        </el-form-item>

        <el-form-item label="Password" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="Enter password"
            show-password
          />
        </el-form-item>

        <el-button class="login-button" type="primary" :loading="loading" @click="handleLogin">
          Login
        </el-button>
      </el-form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginApi } from '../api/auth'

const router = useRouter()
const formRef = ref()

const form = reactive({
  username: '',
  password: '',
})

const demoCredentials = {
  username: 'admin',
  password: 'admin123',
}

const rules = {
  username: [{ required: true, message: 'Username required', trigger: 'blur' }],
  password: [{ required: true, message: 'Password required', trigger: 'blur' }],
}

const loading = ref(false)

const fillDemoCredentials = () => {
  form.username = demoCredentials.username
  form.password = demoCredentials.password
}

const handleLogin = () => {
  formRef.value.validate(async (valid: boolean) => {
    if (!valid) return

    loading.value = true

    try {
      const res = await loginApi(form)
      localStorage.setItem('token', res.token)
      localStorage.setItem('role', res.role)
      localStorage.setItem('username', form.username || 'Alex')
      router.push('/')
    } catch (err: any) {
      alert(err.message)
    } finally {
      loading.value = false
    }
  })
}
</script>

<style scoped>
.login-page {
  display: grid;
  min-height: 100vh;
  place-items: center;
  padding: 24px;
  background: #f7f8fc;
}

.login-card {
  width: min(430px, 100%);
  padding: 43px 44px 47px;
  border: 1px solid #e9edf5;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 16px 44px rgba(19, 34, 68, 0.07);
}

.brand {
  margin-bottom: 38px;
  color: #101c3e;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -1px;
}

.brand span {
  color: #7058ff;
}

h1 {
  margin: 0 0 9px;
  color: #111b39;
  font-size: 27px;
  font-weight: 600;
  letter-spacing: -0.6px;
}

.subtitle {
  margin: 0 0 18px;
  color: #697792;
  font-size: 14px;
}

.demo-credentials {
  display: grid;
  gap: 13px;
  margin-bottom: 28px;
  padding: 16px;
  border: 1px solid #e6e1ff;
  border-radius: 14px;
  background: #f8f6ff;
}

.demo-label {
  color: #7058ff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.7px;
  text-transform: uppercase;
}

.demo-credentials p {
  margin: 5px 0 0;
  color: #697792;
  font-size: 13px;
}

.credential-list {
  display: grid;
  gap: 8px;
  color: #34405f;
  font-size: 13px;
}

.credential-list span {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.credential-list code {
  padding: 4px 8px;
  border-radius: 8px;
  background: #fff;
  color: #101c3e;
  font-family: inherit;
  font-weight: 700;
  box-shadow: inset 0 0 0 1px #e4e8f3;
}

.demo-button {
  width: 100%;
}

.login-button {
  width: 100%;
  height: 42px;
  margin-top: 12px;
}
</style>
