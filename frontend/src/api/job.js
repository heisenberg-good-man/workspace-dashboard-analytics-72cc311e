import request, { withMock } from '@/utils/request'
import { API } from '@/utils/apiConfig'
import { getMockJobs, getMockOpenJobs, getMockCandidates } from '@/utils/mockData'

export function listJobs() {
  return withMock(
    () => request({ url: API.JOBS, method: 'get' }),
    getMockJobs
  )
}

export function listOpenJobs() {
  return withMock(
    () => request({ url: API.JOBS_OPEN, method: 'get' }),
    getMockOpenJobs
  )
}

export function getJob(id) {
  return request({
    url: API.JOB_DETAIL(id),
    method: 'get'
  })
}

export function toggleJobStatus(id) {
  return request({
    url: API.JOB_TOGGLE(id),
    method: 'post'
  })
}
