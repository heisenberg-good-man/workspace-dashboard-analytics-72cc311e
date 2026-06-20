<template>
  <div class="page-container">
    <div class="page-header">
      <h2 class="page-title">职位管理</h2>
      <el-button type="primary" :icon="Refresh" @click="loadJobs">刷新</el-button>
    </div>

    <div class="card" style="margin-bottom: 20px;">
      <el-table :data="jobs" v-loading="loading" stripe style="width: 100%" empty-text="暂无职位数据">
        <el-table-column prop="id" label="ID" width="70" />
        <el-table-column prop="title" label="职位名称" min-width="180" />
        <el-table-column prop="department" label="部门" width="120" />
        <el-table-column prop="location" label="地点" width="100" />
        <el-table-column prop="headcount" label="招聘人数" width="100" align="center" />
        <el-table-column prop="receivedResumes" label="已收简历数" width="110" align="center">
          <template #default="scope">
            <el-tag type="primary" effect="plain">{{ scope.row.receivedResumes }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="职位状态" width="110" align="center">
          <template #default="scope">
            <el-tag :type="JOB_STATUS_MAP[scope.row.status]?.type || 'info'">
              {{ JOB_STATUS_MAP[scope.row.status]?.label || scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="owner" label="负责人" width="100" />
        <el-table-column label="操作" width="200" fixed="right" align="center">
          <template #default="scope">
            <el-button size="small" type="primary" link @click="viewDetail(scope.row)">详情</el-button>
            <el-button
              v-if="scope.row.status !== 'CLOSED'"
              size="small"
              :type="scope.row.status === 'OPEN' ? 'warning' : 'success'"
              link
              @click="toggleStatus(scope.row)"
            >
              {{ scope.row.status === 'OPEN' ? '暂停' : '发布' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      v-model="detailVisible"
      :title="selectedJob?.title || '职位详情'"
      width="640px"
      destroy-on-close
    >
      <div v-if="selectedJob" class="detail-section">
        <div class="section-title">基本信息</div>
        <div class="detail-item">
          <div class="label">职位名称</div>
          <div class="value">{{ selectedJob.title }}</div>
        </div>
        <div class="detail-item">
          <div class="label">所属部门</div>
          <div class="value">{{ selectedJob.department }}</div>
        </div>
        <div class="detail-item">
          <div class="label">工作地点</div>
          <div class="value">{{ selectedJob.location }}</div>
        </div>
        <div class="detail-item">
          <div class="label">招聘人数</div>
          <div class="value">{{ selectedJob.headcount }} 人</div>
        </div>
        <div class="detail-item">
          <div class="label">职位状态</div>
          <div class="value">
            <el-tag :type="JOB_STATUS_MAP[selectedJob.status]?.type || 'info'">
              {{ JOB_STATUS_MAP[selectedJob.status]?.label || selectedJob.status }}
            </el-tag>
          </div>
        </div>
        <div class="detail-item">
          <div class="label">负责人</div>
          <div class="value">{{ selectedJob.owner }}</div>
        </div>
        <div class="detail-item">
          <div class="label">已收简历</div>
          <div class="value">
            <el-tag type="primary" effect="plain">{{ selectedJob.receivedResumes }} 份</el-tag>
          </div>
        </div>
      </div>

      <template #footer>
        <el-button @click="detailVisible = false">关闭</el-button>
        <el-button
          v-if="selectedJob && selectedJob.status !== 'CLOSED'"
          :type="selectedJob.status === 'OPEN' ? 'warning' : 'success'"
          @click="toggleStatus(selectedJob); detailVisible = false"
        >
          {{ selectedJob.status === 'OPEN' ? '暂停招聘' : '发布职位' }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Refresh } from '@element-plus/icons-vue'
import { listJobs, toggleJobStatus } from '@/api/job'
import { JOB_STATUS_MAP } from '@/utils/constants'

const loading = ref(false)
const jobs = ref([])
const detailVisible = ref(false)
const selectedJob = ref(null)

async function loadJobs() {
  loading.value = true
  try {
    const res = await listJobs()
    if (res.code === 200) {
      jobs.value = res.data || []
    } else {
      ElMessage.error(res.message || '加载职位失败')
    }
  } finally {
    loading.value = false
  }
}

function viewDetail(row) {
  selectedJob.value = { ...row }
  detailVisible.value = true
}

async function toggleStatus(row) {
  const action = row.status === 'OPEN' ? '暂停招聘' : '发布职位'
  try {
    await ElMessageBox.confirm(
      `确定要${action}【${row.title}】吗？`,
      '确认操作',
      { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
    )
  } catch {
    return
  }

  try {
    const res = await toggleJobStatus(row.id)
    if (res.code === 200) {
      ElMessage.success(res.message || '操作成功')
      loadJobs()
      if (selectedJob.value && selectedJob.value.id === row.id) {
        selectedJob.value = res.data
      }
    } else {
      ElMessage.error(res.message || '操作失败')
    }
  } catch (e) {
    console.error(e)
  }
}

onMounted(loadJobs)
</script>
