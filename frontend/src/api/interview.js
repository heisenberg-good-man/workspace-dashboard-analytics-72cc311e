import request, { withMock } from '@/utils/request'
import { API } from '@/utils/apiConfig'
import { getMockInterviews } from '@/utils/mockData'

export function listInterviews() {
  return withMock(
    () => request({ url: API.INTERVIEWS, method: 'get' }),
    getMockInterviews
  )
}

export function getInterview(id) {
  return request({
    url: API.INTERVIEW_DETAIL(id),
    method: 'get'
  })
}

export function createInterview(data) {
  return request({
    url: API.INTERVIEWS,
    method: 'post',
    data: data
  })
}

export function completeInterview(id) {
  return request({
    url: API.INTERVIEW_COMPLETE(id),
    method: 'post'
  })
}

export function cancelInterview(id) {
  return request({
    url: API.INTERVIEW_CANCEL(id),
    method: 'post'
  })
}

export function listInterviewsByCandidate(candidateId) {
  return request({
    url: API.INTERVIEWS_BY_CANDIDATE(candidateId),
    method: 'get'
  })
}
