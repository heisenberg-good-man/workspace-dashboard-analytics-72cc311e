import request, { withMock } from '@/utils/request'
import { API } from '@/utils/apiConfig'
import { getMockCandidates, getMockCandidate, mockPassCandidate, mockRejectCandidate } from '@/utils/mockData'

export function queryCandidates(params) {
  return withMock(
    () => request({
      url: API.CANDIDATES_QUERY,
      method: 'post',
      data: params
    }),
    () => getMockCandidates(params)
  )
}

export function listCandidates() {
  return withMock(
    () => request({ url: API.CANDIDATES_LIST, method: 'get' }),
    () => getMockCandidates().list
  )
}

export function getCandidate(id) {
  return withMock(
    () => request({
      url: API.CANDIDATE_DETAIL(id),
      method: 'get'
    }),
    () => getMockCandidate(id)
  )
}

export function passCandidate(data) {
  return withMock(
    () => request({
      url: API.CANDIDATE_PASS,
      method: 'post',
      data: data
    }),
    () => mockPassCandidate(data)
  )
}

export function rejectCandidate(data) {
  return withMock(
    () => request({
      url: API.CANDIDATE_REJECT,
      method: 'post',
      data: data
    }),
    () => mockRejectCandidate(data)
  )
}
