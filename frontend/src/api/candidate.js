import request, { withMock } from '@/utils/request'
import { API } from '@/utils/apiConfig'
import { getMockCandidates } from '@/utils/mockData'

export function queryCandidates(params) {
  return withMock(
    () => request({
      url: API.CANDIDATES_QUERY,
      method: 'post',
      data: params
    }),
    () => getMockCandidates()
  )
}

export function listCandidates() {
  return withMock(
    () => request({ url: API.CANDIDATES_LIST, method: 'get' }),
    () => getMockCandidates().list
  )
}

export function getCandidate(id) {
  return request({
    url: API.CANDIDATE_DETAIL(id),
    method: 'get'
  })
}

export function passCandidate(data) {
  return request({
    url: API.CANDIDATE_PASS,
    method: 'post',
    data: data
  })
}

export function rejectCandidate(data) {
  return request({
    url: API.CANDIDATE_REJECT,
    method: 'post',
    data: data
  })
}
