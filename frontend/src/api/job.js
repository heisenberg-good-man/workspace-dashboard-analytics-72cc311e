import request, { withMock } from '@/utils/request'
import { API } from '@/utils/apiConfig'
import { getMockJobs, getMockOpenJobs, mockToggleJobStatus, getMockCandidates } from '@/utils/mockData'

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
  return withMock(
    () => request({
      url: API.JOB_DETAIL(id),
      method: 'get'
    }),
    () => {
      const jobs = getMockJobs()
      return jobs.find(j => j.id === Number(id)) || null
    }
  )
}

export function toggleJobStatus(id) {
  return withMock(
    () => request({
      url: API.JOB_TOGGLE(id),
      method: 'post'
    }),
    () => mockToggleJobStatus(id)
  )
}
