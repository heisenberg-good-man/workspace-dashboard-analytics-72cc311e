<template>
  <div class="page-container">
    <div class="page-header">
      <h2 class="page-title">数据看板</h2>
      <el-button type="primary" :icon="Refresh" @click="loadStats">刷新数据</el-button>
    </div>

    <div class="four-col-layout" style="margin-bottom: 20px;">
      <div class="metric-card">
        <el-icon class="metric-icon" color="#409eff"><Briefcase /></el-icon>
        <div class="metric-value">{{ stats?.openJobs || 0 }}</div>
        <div class="metric-label">开放职位数</div>
      </div>
      <div class="metric-card">
        <el-icon class="metric-icon" color="#e6a23c"><Document /></el-icon>
        <div class="metric-value">{{ stats?.pendingResumes || 0 }}</div>
        <div class="metric-label">待筛选简历</div>
      </div>
      <div class="metric-card">
        <el-icon class="metric-icon" color="#67c23a"><Calendar /></el-icon>
        <div class="metric-value">{{ stats?.scheduledInterviews || 0 }}</div>
        <div class="metric-label">已安排面试</div>
      </div>
      <div class="metric-card">
        <el-icon class="metric-icon" color="#f56c6c"><UserFilled /></el-icon>
        <div class="metric-value">{{ stats?.newCandidatesThisWeek || 0 }}</div>
        <div class="metric-label">本周新增候选人</div>
      </div>
    </div>

    <div class="two-col-layout">
      <div class="card">
        <div class="section-title" style="margin-bottom: 16px;">简历状态分布</div>
        <div ref="statusChartRef" style="width: 100%; height: 320px;"></div>
      </div>
      <div class="card">
        <div class="section-title" style="margin-bottom: 16px;">各职位简历数</div>
        <div ref="jobChartRef" style="width: 100%; height: 320px;"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Refresh, Briefcase, Document, Calendar, UserFilled } from '@element-plus/icons-vue'
import * as echarts from 'echarts'
import { getDashboardStats } from '@/api/dashboard'
import { RESUME_STATUS_MAP } from '@/utils/constants'

const stats = ref(null)
const statusChartRef = ref(null)
const jobChartRef = ref(null)
let statusChart = null
let jobChart = null

const STATUS_LABEL = {
  PENDING: '待筛选',
  PASSED: '初筛通过',
  REJECTED: '不合适',
  INTERVIEW_SCHEDULED: '待面试',
  INTERVIEWED: '已面试',
  OFFERED: '已发Offer',
  HIRED: '已入职'
}

async function loadStats() {
  try {
    const res = await getDashboardStats()
    if (res.code === 200) {
      stats.value = res.data
      await nextTick()
      renderCharts()
    } else {
      ElMessage.error(res.message || '加载数据失败')
    }
  } catch (e) {
    console.error(e)
  }
}

function renderCharts() {
  if (!stats.value) return

  if (statusChartRef.value) {
    if (!statusChart) statusChart = echarts.init(statusChartRef.value)
    const data = stats.value.resumeStatusDistribution || {}
    const chartData = Object.keys(data).map(k => ({
      name: STATUS_LABEL[k] || k,
      value: data[k]
    }))
    statusChart.setOption({
      tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
      legend: { bottom: 0, type: 'scroll' },
      series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
        label: { show: true, formatter: '{b}\n{c}' },
        data: chartData,
        color: ['#e6a23c', '#409eff', '#909399', '#67c23a', '#36cfc9', '#f56c6c', '#13c2c2']
      }]
    })
  }

  if (jobChartRef.value) {
    if (!jobChart) jobChart = echarts.init(jobChartRef.value)
    const data = stats.value.jobResumeCounts || []
    jobChart.setOption({
      tooltip: { trigger: 'axis' },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: { type: 'value' },
      yAxis: {
        type: 'category',
        data: data.map(d => d.jobTitle),
        inverse: true
      },
      series: [{
        type: 'bar',
        data: data.map(d => d.count),
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#83bff6' },
            { offset: 1, color: '#188df0' }
          ]),
          borderRadius: [0, 4, 4, 0]
        },
        label: { show: true, position: 'right' }
      }]
    })
  }
}

function handleResize() {
  statusChart && statusChart.resize()
  jobChart && jobChart.resize()
}

onMounted(() => {
  loadStats()
  window.addEventListener('resize', handleResize)
})
</script>
