<template>
  <div class="page-container">
    <div class="page-header">
      <h2 class="page-title">面试安排</h2>
      <el-button type="primary" :icon="Refresh" @click="loadInterviews">刷新</el-button>
    </div>

    <div class="filter-bar">
      <el-select
        v-model="filters.status"
        placeholder="按面试状态筛选"
        clearable
        style="width: 180px;"
        @change="loadInterviews"
      >
        <el-option
          v-for="(v, k) in INTERVIEW_STATUS_MAP"
          :key="k"
          :label="v.label"
          :value="k"
        />
      </el-select>
      <el-select
        v-model="filters.method"
        placeholder="按面试方式筛选"
        clearable
        style="width: 180px;"
        @change="loadInterviews"
      >
        <el-option
          v-for="(v, k) in INTERVIEW_METHOD_MAP"
          :key="k"
          :label="v.label"
          :value="k"
        />
      </el-select>
      <el-input
        v-model="filters.keyword"
        placeholder="搜索候选人/面试官/职位"
        clearable
        style="width: 260px;"
        @keyup.enter="loadInterviews"
        @clear="loadInterviews"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
      <el-button type="primary" :icon="Search" @click="loadInterviews">筛选</el-button>
      <el-button :icon="RefreshLeft" @click="resetFilter">重置</el-button>
    </div>

    <div class="card" style="padding: 0;">
      <el-table
        :data="filteredInterviews"
        v-loading="loading"
        stripe
        style="width: 100%;"
        empty-text="暂无面试安排"
      >
        <el-table-column prop="id" label="ID" width="60" align="center" />
        <el-table-column prop="candidateName" label="候选人" width="100" />
        <el-table-column prop="jobTitle" label="面试职位" min-width="150" show-overflow-tooltip />
        <el-table-column label="面试时间" width="170" align="center">
          <template #default="scope">
            {{ formatDateTime(scope.row.interviewTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="interviewer" label="面试官" width="100" />
        <el-table-column label="面试方式" width="100" align="center">
          <template #default="scope">
            <el-tag size="small" :type="INTERVIEW_METHOD_MAP[scope.row.interviewMethod]?.type || ''">
              {{ INTERVIEW_METHOD_MAP[scope.row.interviewMethod]?.label || scope.row.interviewMethod }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="面试状态" width="100" align="center">
          <template #default="scope">
            <el-tag size="small" :type="INTERVIEW_STATUS_MAP[scope.row.status]?.type || 'info'">
              {{ INTERVIEW_STATUS_MAP[scope.row.status]?.label || scope.row.status || '待面试' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="地点/链接" min-width="160" show-overflow-tooltip>
          <template #default="scope">
            {{ scope.row.locationOrLink || '-' }}
          </template>
        </el-table-column>
        <el-table-column label="备注" min-width="140" show-overflow-tooltip>
          <template #default="scope">
            {{ scope.row.notes || '-' }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" fixed="right" align="center">
          <template #default="scope">
            <el-button
              v-if="scope.row.status === 'SCHEDULED'"
              size="small"
              type="success"
              link
              @click="handleComplete(scope.row)"
            >
              完成面试
            </el-button>
            <el-button
              v-if="scope.row.status === 'SCHEDULED'"
              size="small"
              type="warning"
              link
              @click="handleCancel(scope.row)"
            >
              取消面试
            </el-button>
            <span v-if="scope.row.status !== 'SCHEDULED'" style="color: #909399; font-size: 12px;">
              {{ INTERVIEW_STATUS_MAP[scope.row.status]?.label || '已结束' }}
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-empty
      v-if="!loading && filteredInterviews.length === 0 && interviews.length === 0"
      description="暂无面试安排，可在候选人管理页面为候选人安排面试"
      style="margin-top: 60px;"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Refresh, Search, RefreshLeft } from '@element-plus/icons-vue'
import { listInterviews, completeInterview, cancelInterview } from '@/api/interview'
import { INTERVIEW_METHOD_MAP, INTERVIEW_STATUS_MAP, formatDateTime } from '@/utils/constants'

const loading = ref(false)
const interviews = ref([])

const filters = reactive({
  status: '',
  method: '',
  keyword: ''
})

const filteredInterviews = computed(() => {
  let list = [...interviews.value]
  if (filters.status) {
    list = list.filter(i => i.status === filters.status)
  }
  if (filters.method) {
    list = list.filter(i => i.interviewMethod === filters.method)
  }
  if (filters.keyword) {
    const kw = filters.keyword.toLowerCase()
    list = list.filter(i =>
      (i.candidateName && i.candidateName.toLowerCase().includes(kw)) ||
      (i.interviewer && i.interviewer.toLowerCase().includes(kw)) ||
      (i.jobTitle && i.jobTitle.toLowerCase().includes(kw))
    )
  }
  return list
})

async function loadInterviews() {
  loading.value = true
  try {
    const res = await listInterviews()
    if (res.code === 200) {
      interviews.value = res.data || []
    } else {
      ElMessage.error(res.message || '加载面试安排失败')
    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

function resetFilter() {
  filters.status = ''
  filters.method = ''
  filters.keyword = ''
}

async function handleComplete(row) {
  try {
    await ElMessageBox.confirm(
      `确定要将【${row.candidateName}】的面试标记为已完成吗？`,
      '确认操作',
      { confirmButtonText: '确定', cancelButtonText: '取消', type: 'success' }
    )
  } catch { return }

  try {
    const res = await completeInterview(row.id)
    if (res.code === 200) {
      ElMessage.success(res.message || '面试已标记为完成')
      loadInterviews()
    } else {
      ElMessage.error(res.message || '操作失败')
    }
  } catch (e) {
    console.error(e)
  }
}

async function handleCancel(row) {
  try {
    await ElMessageBox.confirm(
      `确定要取消【${row.candidateName}】的面试吗？取消后候选人状态将回退至初筛通过。`,
      '确认操作',
      { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
    )
  } catch { return }

  try {
    const res = await cancelInterview(row.id)
    if (res.code === 200) {
      ElMessage.success(res.message || '面试已取消')
      loadInterviews()
    } else {
      ElMessage.error(res.message || '操作失败')
    }
  } catch (e) {
    console.error(e)
  }
}

onMounted(loadInterviews)
</script>
