import request, { withMock } from '@/utils/request'
import { API } from '@/utils/apiConfig'
import { getMockDashboardStats } from '@/utils/mockData'

export function getDashboardStats() {
  return withMock(
    () => request({ url: API.DASHBOARD, method: 'get' }),
    getMockDashboardStats
  )
}
