import axios from 'axios'
import { ElMessage } from 'element-plus'

const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD ? '/api' : 'http://localhost:3000')

const service = axios.create({
  baseURL,
  timeout: 5000,
})

service.interceptors.response.use(
  (response) => {
    const res = response.data

    if (res.code !== 0) {
      ElMessage.error(res.message || 'Error')
      return Promise.reject(res)
    }

    return res.data
  },
  (error) => {
    ElMessage.error(error.message || 'Network Error')
    return Promise.reject(error)
  }
)

export default service
