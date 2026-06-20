import request from '@/utils/request'

export function listJobs() {
  return request({
    url: '/api/jobs',
    method: 'get'
  })
}

export function listOpenJobs() {
  return request({
    url: '/api/jobs/open',
    method: 'get'
  })
}

export function getJob(id) {
  return request({
    url: `/api/jobs/${id}`,
    method: 'get'
  })
}

export function toggleJobStatus(id) {
  return request({
    url: `/api/jobs/${id}/toggle-status`,
    method: 'post'
  })
}
