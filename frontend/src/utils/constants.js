export const RESUME_STATUS_MAP = {
  PENDING: { label: '待筛选', type: 'warning' },
  PASSED: { label: '初筛通过', type: 'primary' },
  REJECTED: { label: '不合适', type: 'info' },
  INTERVIEW_SCHEDULED: { label: '待面试', type: 'success' },
  INTERVIEWED: { label: '已面试', type: 'success' },
  OFFERED: { label: '已发Offer', type: '' },
  HIRED: { label: '已入职', type: 'success' }
}

export const JOB_STATUS_MAP = {
  OPEN: { label: '招聘中', type: 'success' },
  PAUSED: { label: '已暂停', type: 'warning' },
  CLOSED: { label: '已关闭', type: 'info' }
}

export const INTERVIEW_METHOD_MAP = {
  ONSITE: { label: '现场面试', type: '' },
  ONLINE: { label: '视频面试', type: 'primary' },
  PHONE: { label: '电话面试', type: 'success' }
}

export function formatStatus(status, map) {
  const item = map[status]
  return item ? item.label : status
}

export function formatDate(dateStr) {
  if (!dateStr) return '-'
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  } catch (e) {
    return dateStr
  }
}

export function formatDateTime(dateStr) {
  if (!dateStr) return '-'
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const h = String(d.getHours()).padStart(2, '0')
    const min = String(d.getMinutes()).padStart(2, '0')
    return `${y}-${m}-${day} ${h}:${min}`
  } catch (e) {
    return dateStr
  }
}
