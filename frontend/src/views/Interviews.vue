uu<template>
  <div class="page-container">
    <div class="page-header">
      <h2 class="page-title">面试安排</h2>
      <el-button type="primary" :icon="Refresh" @click="loadInterviews">刷新</el-button>
    </div>

    <div class="card">
      <el-table
        :data="interviews"
        v-loading="loading"
        stripe
        style="width: 100%;"
        empty-text="暂无面试安排"
      >
        <el-table-column prop="id" label="ID" width="70" align="center" />
        <el-table-column prop="candidateName" label="候选人" width="110" />
        <el-table-column prop="jobTitle" label="面试职位" min-width="160" show-overflow-tooltip />
        <el-table-column label="面试时间" width="170" align="center">
          <template #default="scope">
            {{ formatDateTime(scope.row.interviewTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="interviewer" label="面试官" width="110" />
        <el-table-column label="面试方式" width="110" align="center">
          <template #default="scope">
            <el-tag :type="INTERVIEW_METHOD_MAP[scope.row.interviewMethod]?.type || ''">
              {{ INTERVIEW_METHOD_MAP[scope.row.interviewMethod]?.label || scope.row.interviewMethod }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="地点/链接" min-width="180" show-overflow-tooltip>
          <template #default="scope">
            {{ scope.row.locationOrLink || '-' }}
          </template>
        </el-table-column>
        <el-table-column label="备注" min-width="180" show-overflow-tooltip>
          <template #default="scope">
            {{ scope.row.notes || '-' }}
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-empty
      v-if="!loading && interviews.length === 0"
      description="暂无面试安排，可在候选人管理页面为候选人安排面试"
      style="margin-top: 60px;"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Refresh } from '@element-plus/icons-vue'
import { listInterviews } from '@/api/interview'
import { INTERVIEW_METHOD_MAP, formatDateTime } from '@/utils/constants'

const loading = ref(false)
const interviews = ref([])

async function loadInterviews() {
  loading.value = true
  try {
    const res = await listInterviews()
    if (res.code === 200) {
      interviews.value = res.data || []
    } else {
      ElMessage.error(res.message || '加载面试安排失败')
    }
  } finally {
    loading.value = false
  }
}

onMounted(loadInterviews)
</script>
