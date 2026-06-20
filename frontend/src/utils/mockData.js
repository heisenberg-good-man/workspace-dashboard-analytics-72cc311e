const today = new Date()
const fmt = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const fmtDateTime = (d) => {
  const dt = new Date(d)
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')} ${String(dt.getHours()).padStart(2, '0')}:${String(dt.getMinutes()).padStart(2, '0')}`
}

const state = {
  jobs: [
    { id: 1, title: '高级Java开发工程师', department: '技术部', location: '北京', headcount: 3, status: 'OPEN', owner: '张三', receivedResumes: 8 },
    { id: 2, title: '前端开发工程师', department: '技术部', location: '上海', headcount: 2, status: 'OPEN', owner: '李四', receivedResumes: 12 },
    { id: 3, title: '产品经理', department: '产品部', location: '北京', headcount: 1, status: 'OPEN', owner: '王五', receivedResumes: 6 },
    { id: 4, title: 'UI设计师', department: '设计部', location: '深圳', headcount: 2, status: 'PAUSED', owner: '赵六', receivedResumes: 4 },
    { id: 5, title: '数据分析师', department: '数据部', location: '北京', headcount: 2, status: 'OPEN', owner: '钱七', receivedResumes: 5 },
    { id: 6, title: '测试工程师', department: '质量部', location: '杭州', headcount: 1, status: 'CLOSED', owner: '孙八', receivedResumes: 10 }
  ],
  candidates: [
    { id: 1, name: '陈晓明', gender: '男', age: 28, phone: '13800138001', email: 'chenxm@email.com', education: '本科', workExperience: '5年Java开发经验，熟悉Spring全家桶', appliedJobId: '1', appliedJobTitle: '高级Java开发工程师', resumeStatus: 'PENDING', rating: 3, applyDate: fmt(new Date(today.getTime() - 2 * 86400000)), followRecords: [{ date: fmt(new Date(today.getTime() - 2 * 86400000)), operator: '系统', content: '投递简历' }] },
    { id: 2, name: '王芳', gender: '女', age: 26, phone: '13800138002', email: 'wangfang@email.com', education: '硕士', workExperience: '3年前端开发，精通Vue/React', appliedJobId: '2', appliedJobTitle: '前端开发工程师', resumeStatus: 'PASSED', rating: 4, applyDate: fmt(new Date(today.getTime() - 5 * 86400000)), followRecords: [{ date: fmt(new Date(today.getTime() - 5 * 86400000)), operator: '系统', content: '投递简历' }, { date: fmt(new Date(today.getTime() - 3 * 86400000)), operator: '李四', content: '通过初筛' }] },
    { id: 3, name: '刘强', gender: '男', age: 30, phone: '13800138003', email: 'liuqiang@email.com', education: '本科', workExperience: '8年产品经理经验，擅长B端产品', appliedJobId: '3', appliedJobTitle: '产品经理', resumeStatus: 'INTERVIEW_SCHEDULED', rating: 5, applyDate: fmt(new Date(today.getTime() - 7 * 86400000)), followRecords: [{ date: fmt(new Date(today.getTime() - 7 * 86400000)), operator: '系统', content: '投递简历' }, { date: fmt(new Date(today.getTime() - 5 * 86400000)), operator: '王五', content: '通过初筛' }, { date: fmt(new Date(today.getTime() - 2 * 86400000)), operator: '王五', content: '安排面试' }] },
    { id: 4, name: '李娜', gender: '女', age: 24, phone: '13800138004', email: 'lina@email.com', education: '本科', workExperience: '2年UI设计经验，有作品集', appliedJobId: '4', appliedJobTitle: 'UI设计师', resumeStatus: 'REJECTED', rating: 2, applyDate: fmt(new Date(today.getTime() - 4 * 86400000)), followRecords: [{ date: fmt(new Date(today.getTime() - 4 * 86400000)), operator: '系统', content: '投递简历' }, { date: fmt(new Date(today.getTime() - 2 * 86400000)), operator: '赵六', content: '经验不足，标记不合适' }] },
    { id: 5, name: '张伟', gender: '男', age: 27, phone: '13800138005', email: 'zhangwei@email.com', education: '硕士', workExperience: '4年数据分析经验，精通SQL/Python', appliedJobId: '5', appliedJobTitle: '数据分析师', resumeStatus: 'PENDING', rating: 4, applyDate: fmt(new Date(today.getTime() - 1 * 86400000)), followRecords: [{ date: fmt(new Date(today.getTime() - 1 * 86400000)), operator: '系统', content: '投递简历' }] },
    { id: 6, name: '赵敏', gender: '女', age: 25, phone: '13800138006', email: 'zhaomin@email.com', education: '本科', workExperience: '2年前端开发经验', appliedJobId: '2', appliedJobTitle: '前端开发工程师', resumeStatus: 'PENDING', rating: 3, applyDate: fmt(new Date(today.getTime() - 3 * 86400000)), followRecords: [{ date: fmt(new Date(today.getTime() - 3 * 86400000)), operator: '系统', content: '投递简历' }] },
    { id: 7, name: '孙浩', gender: '男', age: 29, phone: '13800138007', email: 'sunhao@email.com', education: '本科', workExperience: '6年Java开发经验，微服务架构', appliedJobId: '1', appliedJobTitle: '高级Java开发工程师', resumeStatus: 'INTERVIEWED', rating: 5, applyDate: fmt(new Date(today.getTime() - 10 * 86400000)), followRecords: [{ date: fmt(new Date(today.getTime() - 10 * 86400000)), operator: '系统', content: '投递简历' }, { date: fmt(new Date(today.getTime() - 8 * 86400000)), operator: '张三', content: '通过初筛' }, { date: fmt(new Date(today.getTime() - 5 * 86400000)), operator: '张三', content: '安排面试' }, { date: fmt(new Date(today.getTime() - 3 * 86400000)), operator: '张三', content: '已面试，评价优秀' }] },
    { id: 8, name: '周婷', gender: '女', age: 23, phone: '13800138008', email: 'zhouting@email.com', education: '本科', workExperience: '应届生，软件工程专业', appliedJobId: '2', appliedJobTitle: '前端开发工程师', resumeStatus: 'PENDING', rating: 2, applyDate: fmt(today), followRecords: [{ date: fmt(today), operator: '系统', content: '投递简历' }] },
    { id: 9, name: '吴迪', gender: '男', age: 31, phone: '13800138009', email: 'wudi@email.com', education: '硕士', workExperience: '7年Java开发，有团队管理经验', appliedJobId: '1', appliedJobTitle: '高级Java开发工程师', resumeStatus: 'OFFERED', rating: 5, applyDate: fmt(new Date(today.getTime() - 14 * 86400000)), followRecords: [{ date: fmt(new Date(today.getTime() - 14 * 86400000)), operator: '系统', content: '投递简历' }, { date: fmt(new Date(today.getTime() - 12 * 86400000)), operator: '张三', content: '通过初筛' }, { date: fmt(new Date(today.getTime() - 9 * 86400000)), operator: '张三', content: '安排面试' }, { date: fmt(new Date(today.getTime() - 7 * 86400000)), operator: '张三', content: '已面试' }, { date: fmt(new Date(today.getTime() - 2 * 86400000)), operator: '张三', content: '发出Offer' }] },
    { id: 10, name: '郑雪', gender: '女', age: 26, phone: '13800138010', email: 'zhengxue@email.com', education: '硕士', workExperience: '3年产品经理经验，C端产品背景', appliedJobId: '3', appliedJobTitle: '产品经理', resumeStatus: 'PENDING', rating: 4, applyDate: fmt(new Date(today.getTime() - 1 * 86400000)), followRecords: [{ date: fmt(new Date(today.getTime() - 1 * 86400000)), operator: '系统', content: '投递简历' }] },
    { id: 11, name: '黄磊', gender: '男', age: 28, phone: '13800138011', email: 'huanglei@email.com', education: '本科', workExperience: '5年测试经验，自动化测试', appliedJobId: '6', appliedJobTitle: '测试工程师', resumeStatus: 'HIRED', rating: 4, applyDate: fmt(new Date(today.getTime() - 30 * 86400000)), followRecords: [{ date: fmt(new Date(today.getTime() - 30 * 86400000)), operator: '系统', content: '投递简历' }, { date: fmt(new Date(today.getTime() - 28 * 86400000)), operator: '孙八', content: '通过初筛' }, { date: fmt(new Date(today.getTime() - 25 * 86400000)), operator: '孙八', content: '安排面试' }, { date: fmt(new Date(today.getTime() - 22 * 86400000)), operator: '孙八', content: '已面试' }, { date: fmt(new Date(today.getTime() - 18 * 86400000)), operator: '孙八', content: '发出Offer' }, { date: fmt(new Date(today.getTime() - 5 * 86400000)), operator: '系统', content: '候选人已入职' }] },
    { id: 12, name: '林静', gender: '女', age: 27, phone: '13800138012', email: 'linjing@email.com', education: '本科', workExperience: '4年数据分析经验，用户增长分析', appliedJobId: '5', appliedJobTitle: '数据分析师', resumeStatus: 'PASSED', rating: 4, applyDate: fmt(new Date(today.getTime() - 2 * 86400000)), followRecords: [{ date: fmt(new Date(today.getTime() - 2 * 86400000)), operator: '系统', content: '投递简历' }, { date: fmt(new Date(today.getTime() - 1 * 86400000)), operator: '钱七', content: '通过初筛' }] },
    { id: 13, name: '马超', gender: '男', age: 26, phone: '13800138013', email: 'machao@email.com', education: '本科', workExperience: '3年前端开发经验', appliedJobId: '2', appliedJobTitle: '前端开发工程师', resumeStatus: 'PENDING', rating: 3, applyDate: fmt(new Date(today.getTime() - 1 * 86400000)), followRecords: [{ date: fmt(new Date(today.getTime() - 1 * 86400000)), operator: '系统', content: '投递简历' }] },
    { id: 14, name: '杨洋', gender: '男', age: 29, phone: '13800138014', email: 'yangyang@email.com', education: '硕士', workExperience: '6年Java开发经验，高并发系统', appliedJobId: '1', appliedJobTitle: '高级Java开发工程师', resumeStatus: 'PENDING', rating: 5, applyDate: fmt(today), followRecords: [{ date: fmt(today), operator: '系统', content: '投递简历' }] },
    { id: 15, name: '朱琳', gender: '女', age: 24, phone: '13800138015', email: 'zhulin@email.com', education: '本科', workExperience: '应届，设计专业', appliedJobId: '4', appliedJobTitle: 'UI设计师', resumeStatus: 'PENDING', rating: 2, applyDate: fmt(today), followRecords: [{ date: fmt(today), operator: '系统', content: '投递简历' }] }
  ],
  interviews: [
    { id: 1, candidateId: 3, candidateName: '刘强', jobId: 3, jobTitle: '产品经理', interviewTime: new Date(today.getTime() + 2 * 86400000).toISOString().replace('Z', ''), interviewer: '王五', interviewMethod: 'ONSITE', locationOrLink: '北京总部3楼会议室A', notes: 'B端产品经验丰富，重点考察产品思维', status: 'SCHEDULED' },
    { id: 2, candidateId: 7, candidateName: '孙浩', jobId: 1, jobTitle: '高级Java开发工程师', interviewTime: new Date(today.getTime() - 3 * 86400000).toISOString().replace('Z', ''), interviewer: '张三', interviewMethod: 'ONLINE', locationOrLink: 'https://meeting.example.com/room/123', notes: '微服务架构经验丰富', status: 'COMPLETED' },
    { id: 3, candidateId: 9, candidateName: '吴迪', jobId: 1, jobTitle: '高级Java开发工程师', interviewTime: new Date(today.getTime() - 7 * 86400000).toISOString().replace('Z', ''), interviewer: '张三', interviewMethod: 'ONSITE', locationOrLink: '北京总部5楼会议室B', notes: '团队管理经验，技术深度好', status: 'COMPLETED' }
  ],
  nextInterviewId: 4
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

function filterCandidates(params) {
  let list = [...state.candidates]
  if (params.jobId) {
    list = list.filter(c => String(c.appliedJobId) === String(params.jobId))
  }
  if (params.resumeStatus) {
    list = list.filter(c => c.resumeStatus === params.resumeStatus)
  }
  if (params.keyword) {
    const kw = String(params.keyword).toLowerCase()
    list = list.filter(c =>
      (c.name && c.name.toLowerCase().includes(kw)) ||
      (c.phone && c.phone.includes(kw)) ||
      (c.email && c.email.toLowerCase().includes(kw)) ||
      (c.appliedJobTitle && c.appliedJobTitle.toLowerCase().includes(kw)) ||
      (c.workExperience && c.workExperience.toLowerCase().includes(kw))
    )
  }
  list.sort((a, b) => b.id - a.id)
  const page = params.page || 1
  const pageSize = params.pageSize || 10
  const total = list.length
  const from = (page - 1) * pageSize
  const to = from + pageSize
  return {
    total,
    page,
    pageSize,
    list: list.slice(from, to).map(deepClone)
  }
}

function computeDashboardStats() {
  const openJobs = state.jobs.filter(j => j.status === 'OPEN').length
  const pendingResumes = state.candidates.filter(c => c.resumeStatus === 'PENDING').length
  const scheduledInterviews = state.interviews.filter(i => i.status === 'SCHEDULED').length
  const monday = new Date(today)
  monday.setDate(today.getDate() - today.getDay() + 1)
  monday.setHours(0, 0, 0, 0)
  const newCandidatesThisWeek = state.candidates.filter(c => {
    const d = new Date(c.applyDate)
    return d >= monday
  }).length
  const totalCandidates = state.candidates.length

  const resumeStatusDistribution = {
    PENDING: 0, PASSED: 0, REJECTED: 0, INTERVIEW_SCHEDULED: 0, INTERVIEWED: 0, OFFERED: 0, HIRED: 0
  }
  state.candidates.forEach(c => {
    if (resumeStatusDistribution[c.resumeStatus] !== undefined) {
      resumeStatusDistribution[c.resumeStatus]++
    }
  })

  const jobResumeCounts = state.jobs.map(job => ({
    jobId: job.id,
    jobTitle: job.title,
    count: state.candidates.filter(c => String(c.appliedJobId) === String(job.id)).length
  })).sort((a, b) => b.count - a.count)

  return {
    openJobs,
    pendingResumes,
    scheduledInterviews,
    newCandidatesThisWeek,
    totalCandidates,
    resumeStatusDistribution,
    jobResumeCounts
  }
}

function addFollowRecord(candidate, operator, content) {
  candidate.followRecords = candidate.followRecords || []
  candidate.followRecords.push({
    date: fmt(new Date()),
    operator: operator || '系统',
    content: content
  })
}

function findCandidate(id) {
  return state.candidates.find(c => c.id === Number(id))
}

function findInterview(id) {
  return state.interviews.find(i => i.id === Number(id))
}

function findJob(id) {
  return state.jobs.find(j => j.id === Number(id))
}

export function getMockJobs() { return deepClone(state.jobs) }
export function getMockOpenJobs() { return deepClone(state.jobs.filter(j => j.status === 'OPEN')) }
export function getMockCandidates(params = {}) { return filterCandidates(params) }
export function getMockCandidate(id) {
  const c = findCandidate(id)
  return c ? deepClone(c) : null
}
export function getMockInterviews() { return deepClone(state.interviews) }
export function getMockDashboardStats() { return deepClone(computeDashboardStats()) }

export function mockPassCandidate(data) {
  const c = findCandidate(data.candidateId)
  if (!c) return null
  if (c.resumeStatus !== 'PENDING') {
    throw new Error('当前状态不允许通过初筛')
  }
  c.resumeStatus = 'PASSED'
  addFollowRecord(c, '系统', data.remark ? `通过初筛：${data.remark}` : '通过初筛')
  return deepClone(c)
}

export function mockRejectCandidate(data) {
  const c = findCandidate(data.candidateId)
  if (!c) return null
  if (c.resumeStatus === 'REJECTED') return deepClone(c)
  c.resumeStatus = 'REJECTED'
  addFollowRecord(c, '系统', data.remark ? `标记不合适：${data.remark}` : '标记不合适')
  return deepClone(c)
}

export function mockCreateInterview(data) {
  const c = findCandidate(data.candidateId)
  if (!c) throw new Error('候选人不存在')
  if (!['PENDING', 'PASSED'].includes(c.resumeStatus)) {
    throw new Error('当前状态不允许安排面试')
  }
  const j = findJob(data.jobId)
  const interview = {
    id: state.nextInterviewId++,
    candidateId: data.candidateId,
    candidateName: c.name,
    jobId: data.jobId,
    jobTitle: j ? j.title : '',
    interviewTime: data.interviewTime ? new Date(data.interviewTime).toISOString().replace('Z', '') : null,
    interviewer: data.interviewer,
    interviewMethod: data.interviewMethod || 'ONLINE',
    locationOrLink: data.locationOrLink || '',
    notes: data.notes || '',
    status: 'SCHEDULED'
  }
  state.interviews.push(interview)
  c.resumeStatus = 'INTERVIEW_SCHEDULED'
  addFollowRecord(c, data.interviewer, '安排面试')
  return deepClone(interview)
}

export function mockCompleteInterview(id) {
  const interview = findInterview(id)
  if (!interview) return null
  if (interview.status !== 'SCHEDULED') {
    throw new Error('当前状态不允许完成面试')
  }
  interview.status = 'COMPLETED'
  const c = findCandidate(interview.candidateId)
  if (c && c.resumeStatus === 'INTERVIEW_SCHEDULED') {
    c.resumeStatus = 'INTERVIEWED'
    addFollowRecord(c, interview.interviewer, '已完成面试')
  }
  return deepClone(interview)
}

export function mockCancelInterview(id) {
  const interview = findInterview(id)
  if (!interview) return null
  if (interview.status !== 'SCHEDULED') {
    throw new Error('当前状态不允许取消面试')
  }
  interview.status = 'CANCELLED'
  const c = findCandidate(interview.candidateId)
  if (c && c.resumeStatus === 'INTERVIEW_SCHEDULED') {
    c.resumeStatus = 'PASSED'
    addFollowRecord(c, '系统', '面试已取消，状态回退至初筛通过')
  }
  return deepClone(interview)
}

export function mockToggleJobStatus(id) {
  const j = findJob(id)
  if (!j) return null
  if (j.status === 'OPEN') j.status = 'PAUSED'
  else if (j.status === 'PAUSED') j.status = 'OPEN'
  return deepClone(j)
}
