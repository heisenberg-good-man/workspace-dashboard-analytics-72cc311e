import request from '@/utils/request'

export function listInterviews() {
  return request({
    url: '/api/interviews',
    method: 'get'
  })
}

export function getInterview(id) {
  return request({
    url: `/api/interviews/${id}`,
    method: 'get'
  })
}

export function createInterview(data) {
  return request({
    url: '/api/interviews',
    method: 'post',
    data: data
  })
}

export function listInterviewsByCandidate(candidateId) {
  return request({
    url: `/api/interviews/candidate/${candidateId}`,
    method: 'get'
  })
}
