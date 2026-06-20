import axios from 'axios'
import { ElMessage } from 'element-plus'
import { API_BASE_URL } from '@/utils/apiConfig'
import { ref } from 'vue'

export const usingMockData = ref(false)

const request = axios.create({
  baseURL: API_BASE_URL || '/',
  timeout: 15000
})

request.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error.response) {
      const status = error.response.status
      if (status === 404) {
        ElMessage.error('请求的资源不存在')
      } else if (status === 400) {
        ElMessage.error(error.response.data?.message || '请求参数错误')
      } else if (status >= 500) {
        ElMessage.error('服务器内部错误，请稍后重试')
      } else {
        ElMessage.error(error.response.data?.message || '请求失败')
      }
    } else if (error.code === 'ECONNABORTED') {
      ElMessage.error('请求超时，请检查网络连接')
    } else {
      ElMessage.error('网络连接失败，请检查后端服务是否启动')
    }
    return Promise.reject(error)
  }
)

export function withMock(apiCall, mockFn) {
  return apiCall().catch(err => {
    console.warn('[Mock Fallback] API请求失败，使用本地兜底数据:', err.message)
    usingMockData.value = true
    const mockData = mockFn()
    return { code: 200, message: 'success (mock)', data: mockData }
  })
}

export default request
