import request, { withMock } from '@/utils/request'
import { API } from '@/utils/apiConfig'
import { getMockInterviews, mockCreateInterview, mockCompleteInterview, mockCancelInterview } from '@/utils/mockData'

export function listInterviews() {
  return withMock(
    () => request({ url: API.INTERVIEWS, method: 'get' }),
    getMockInterviews
  )
}

export function getInterview(id) {
  return withMock(
    () => request({
      url: API.INTERVIEW_DETAIL(id),
      method: 'get'
    }),
    () => {
      const list = getMockInterviews()
      return list.find(i => i.id === Number(id)) || null
    }
  )
}

export function createInterview(data) {
  return withMock(
    () => request({
      url: API.INTERVIEWS,
      method: 'post',
      data: data
    }),
    () => mockCreateInterview(data)
  )
}

export function completeInterview(id) {
  return withMock(
    () => request({
      url: API.INTERVIEW_COMPLETE(id),
      method: 'post'
    }),
    () => mockCompleteInterview(id)
  )
}

export function cancelInterview(id) {
  return withMock(
    () => request({
      url: API.INTERVIEW_CANCEL(id),
      method: 'post'
    }),
    () => mockCancelInterview(id)
  )
}

export function listInterviewsByCandidate(candidateId) {
  return withMock(
    () => request({
      url: API.INTERVIEWS_BY_CANDIDATE(candidateId),
      method: 'get'
    }),
    () => {
      const list = getMockInterviews()
      return list.filter(i => i.candidateId === Number(candidateId))
    }
  )
}
