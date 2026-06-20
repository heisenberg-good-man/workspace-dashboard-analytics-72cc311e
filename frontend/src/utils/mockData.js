const today = new Date()
const fmt = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

const mockJobs = [
  { id: 1, title: '高级Java开发工程师', department: '技术部', location: '北京', headcount: 3, status: 'OPEN', owner: '张三', receivedResumes: 8 },
  { id: 2, title: '前端开发工程师', department: '技术部', location: '上海', headcount: 2, status: 'OPEN', owner: '李四', receivedResumes: 12 },
  { id: 3, title: '产品经理', department: '产品部', location: '北京', headcount: 1, status: 'OPEN', owner: '王五', receivedResumes: 6 },
  { id: 4, title: 'UI设计师', department: '设计部', location: '深圳', headcount: 2, status: 'PAUSED', owner: '赵六', receivedResumes: 4 },
  { id: 5, title: '数据分析师', department: '数据部', location: '北京', headcount: 2, status: 'OPEN', owner: '钱七', receivedResumes: 5 },
  { id: 6, title: '测试工程师', department: '质量部', location: '杭州', headcount: 1, status: 'CLOSED', owner: '孙八', receivedResumes: 10 }
]

const mockCandidates = [
  { id: 1, name: '陈晓明', gender: '男', age: 28, phone: '13800138001', email: 'chenxm@email.com', education: '本科', workExperience: '5年Java开发经验', appliedJobId: '1', appliedJobTitle: '高级Java开发工程师', resumeStatus: 'PENDING', rating: 3, applyDate: fmt(new Date(today.getTime() - 2 * 86400000)), followRecords: [{ date: fmt(new Date(today.getTime() - 2 * 86400000)), operator: '系统', content: '投递简历' }] },
  { id: 2, name: '王芳', gender: '女', age: 26, phone: '13800138002', email: 'wangfang@email.com', education: '硕士', workExperience: '3年前端开发', appliedJobId: '2', appliedJobTitle: '前端开发工程师', resumeStatus: 'PASSED', rating: 4, applyDate: fmt(new Date(today.getTime() - 5 * 86400000)), followRecords: [{ date: fmt(new Date(today.getTime() - 5 * 86400000)), operator: '系统', content: '投递简历' }, { date: fmt(new Date(today.getTime() - 3 * 86400000)), operator: '李四', content: '通过初筛' }] },
  { id: 5, name: '张伟', gender: '男', age: 27, phone: '13800138005', email: 'zhangwei@email.com', education: '硕士', workExperience: '4年数据分析经验', appliedJobId: '5', appliedJobTitle: '数据分析师', resumeStatus: 'PENDING', rating: 4, applyDate: fmt(new Date(today.getTime() - 1 * 86400000)), followRecords: [{ date: fmt(new Date(today.getTime() - 1 * 86400000)), operator: '系统', content: '投递简历' }] },
  { id: 6, name: '赵敏', gender: '女', age: 25, phone: '13800138006', email: 'zhaomin@email.com', education: '本科', workExperience: '2年前端开发经验', appliedJobId: '2', appliedJobTitle: '前端开发工程师', resumeStatus: 'PENDING', rating: 3, applyDate: fmt(new Date(today.getTime() - 3 * 86400000)), followRecords: [{ date: fmt(new Date(today.getTime() - 3 * 86400000)), operator: '系统', content: '投递简历' }] },
  { id: 8, name: '周婷', gender: '女', age: 23, phone: '13800138008', email: 'zhouting@email.com', education: '本科', workExperience: '应届生', appliedJobId: '2', appliedJobTitle: '前端开发工程师', resumeStatus: 'PENDING', rating: 2, applyDate: fmt(today), followRecords: [{ date: fmt(today), operator: '系统', content: '投递简历' }] },
  { id: 12, name: '林静', gender: '女', age: 27, phone: '13800138012', email: 'linjing@email.com', education: '本科', workExperience: '4年数据分析经验', appliedJobId: '5', appliedJobTitle: '数据分析师', resumeStatus: 'PASSED', rating: 4, applyDate: fmt(new Date(today.getTime() - 2 * 86400000)), followRecords: [{ date: fmt(new Date(today.getTime() - 2 * 86400000)), operator: '系统', content: '投递简历' }, { date: fmt(new Date(today.getTime() - 1 * 86400000)), operator: '钱七', content: '通过初筛' }] },
]

const mockInterviews = [
  { id: 1, candidateId: 3, candidateName: '刘强', jobId: 3, jobTitle: '产品经理', interviewTime: new Date(today.getTime() + 2 * 86400000).toISOString().replace('Z', ''), interviewer: '王五', interviewMethod: 'ONSITE', locationOrLink: '北京总部3楼会议室A', notes: '重点考察产品思维', status: 'SCHEDULED' },
  { id: 2, candidateId: 7, candidateName: '孙浩', jobId: 1, jobTitle: '高级Java开发工程师', interviewTime: new Date(today.getTime() - 3 * 86400000).toISOString().replace('Z', ''), interviewer: '张三', interviewMethod: 'ONLINE', locationOrLink: 'https://meeting.example.com/room/123', notes: '微服务架构经验丰富', status: 'COMPLETED' },
]

const mockDashboardStats = {
  openJobs: 4,
  pendingResumes: 5,
  scheduledInterviews: 1,
  newCandidatesThisWeek: 3,
  totalCandidates: 6,
  resumeStatusDistribution: { PENDING: 3, PASSED: 2, REJECTED: 0, INTERVIEW_SCHEDULED: 0, INTERVIEWED: 0, OFFERED: 0, HIRED: 0 },
  jobResumeCounts: [
    { jobId: 2, jobTitle: '前端开发工程师', count: 3 },
    { jobId: 1, jobTitle: '高级Java开发工程师', count: 1 },
    { jobId: 5, jobTitle: '数据分析师', count: 2 },
    { jobId: 3, jobTitle: '产品经理', count: 0 },
    { jobId: 4, jobTitle: 'UI设计师', count: 0 },
    { jobId: 6, jobTitle: '测试工程师', count: 0 },
  ]
}

export function getMockJobs() { return [...mockJobs] }
export function getMockOpenJobs() { return mockJobs.filter(j => j.status === 'OPEN') }
export function getMockCandidates() { return { total: mockCandidates.length, page: 1, pageSize: 10, list: [...mockCandidates] } }
export function getMockInterviews() { return [...mockInterviews] }
export function getMockDashboardStats() { return { ...mockDashboardStats, resumeStatusDistribution: { ...mockDashboardStats.resumeStatusDistribution }, jobResumeCounts: [...mockDashboardStats.jobResumeCounts] } }
