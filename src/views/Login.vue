<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2>Login</h2>

      <el-form
        :model="form"
        :rules="rules"
        ref="formRef"
        label-position="top"
      >
        <el-form-item label="Username" prop="username">
          <el-input v-model="form.username" placeholder="Enter username" />
        </el-form-item>

        <el-form-item label="Password" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="Enter password"
          />
        </el-form-item>

        <el-button
          type="primary"
          style="width: 100%"
          :loading="loading"
          @click="handleLogin"
        >
          Login
        </el-button>
      </el-form>
    </el-card>
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

const rules = {
  username: [{ required: true, message: 'Username required', trigger: 'blur' }],
  password: [{ required: true, message: 'Password required', trigger: 'blur' }],
}

const loading = ref(false)

const handleLogin = () => {
  formRef.value.validate(async (valid: boolean) => {
    if (!valid) return

    loading.value = true

    try {
      const res = await loginApi(form)
      localStorage.setItem('token', res.token)
      localStorage.setItem('role', res.role)

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
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f7fa;
}

.login-card {
  width: 350px;
}
</style>
