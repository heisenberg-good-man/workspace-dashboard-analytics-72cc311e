export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const API = {
  HEALTH: '/api/health',
  DASHBOARD: '/api/dashboard',
  JOBS: '/api/jobs',
  JOBS_OPEN: '/api/jobs/open',
  JOB_DETAIL: (id) => `/api/jobs/${id}`,
  JOB_TOGGLE: (id) => `/api/jobs/${id}/toggle-status`,
  CANDIDATES_QUERY: '/api/candidates/query',
  CANDIDATES_LIST: '/api/candidates',
  CANDIDATE_DETAIL: (id) => `/api/candidates/${id}`,
  CANDIDATE_PASS: '/api/candidates/pass',
  CANDIDATE_REJECT: '/api/candidates/reject',
  INTERVIEWS: '/api/interviews',
  INTERVIEW_DETAIL: (id) => `/api/interviews/${id}`,
  INTERVIEW_COMPLETE: (id) => `/api/interviews/${id}/complete`,
  INTERVIEW_CANCEL: (id) => `/api/interviews/${id}/cancel`,
  INTERVIEWS_BY_CANDIDATE: (id) => `/api/interviews/candidate/${id}`,
}
