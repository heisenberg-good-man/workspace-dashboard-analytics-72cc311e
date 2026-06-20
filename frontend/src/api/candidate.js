import request from '@/utils/request'

export function queryCandidates(params) {
  return request({
    url: '/api/candidates/query',
    method: 'post',
    data: params
  })
}

export function listCandidates() {
  return request({
    url: '/api/candidates',
    method: 'get'
  })
}

export function getCandidate(id) {
  return request({
    url: `/api/candidates/${id}`,
    method: 'get'
  })
}

export function passCandidate(data) {
  return request({
    url: '/api/candidates/pass',
    method: 'post',
    data: data
  })
}

export function rejectCandidate(data) {
  return request({
    url: '/api/candidates/reject',
    method: 'post',
    data: data
  })
}
