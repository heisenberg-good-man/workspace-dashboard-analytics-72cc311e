<template>
  <div class="page-container">
    <div class="page-header">
      <h2 class="page-title">候选人管理</h2>
      <el-button type="primary" :icon="Refresh" @click="loadData">刷新数据</el-button>
    </div>

    <div class="filter-bar">
      <el-select
        v-model="filters.jobId"
        placeholder="按投递职位筛选"
        clearable
        style="width: 220px;"
        @change="handleFilter"
      >
        <el-option
          v-for="j in jobs"
          :key="j.id"
          :label="j.title"
          :value="String(j.id)"
        />
      </el-select>
      <el-select
        v-model="filters.resumeStatus"
        placeholder="按简历状态筛选"
        clearable
        style="width: 180px;"
        @change="handleFilter"
      >
        <el-option
          v-for="(v, k) in RESUME_STATUS_MAP"
          :key="k"
          :label="v.label"
          :value="k"
        />
      </el-select>
      <el-input
        v-model="filters.keyword"
        placeholder="搜索姓名/电话/邮箱/职位关键词"
        clearable
        style="width: 280px;"
        @keyup.enter="handleFilter"
        @clear="handleFilter"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
      <el-button type="primary" :icon="Search" @click="handleFilter">筛选</el-button>
      <el-button :icon="RefreshLeft" @click="resetFilter">重置</el-button>
    </div>

    <div class="two-col-layout" style="gap: 16px;">
      <div class="card" style="padding: 0;">
        <el-table
          :data="candidates"
          v-loading="loading"
          stripe
          style="width: 100%;"
          height="calc(100vh - 280px)"
          highlight-current-row
          @current-change="handleRowSelect"
          empty-text="暂无候选人数据"
        >
          <el-table-column prop="id" label="ID" width="60" align="center" />
          <el-table-column label="姓名" width="90">
            <template #default="scope">
              <div style="display: flex; align-items: center; gap: 6px;">
                <el-avatar :size="28" style="background-color: #409eff; font-size: 12px;">
                  {{ scope.row.name.charAt(0) }}
                </el-avatar>
                <span>{{ scope.row.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="appliedJobTitle" label="投递职位" min-width="150" show-overflow-tooltip />
          <el-table-column label="状态" width="90" align="center">
            <template #default="scope">
              <el-tag size="small" :type="RESUME_STATUS_MAP[scope.row.resumeStatus]?.type || 'info'">
                {{ RESUME_STATUS_MAP[scope.row.resumeStatus]?.label || scope.row.resumeStatus }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="评分" width="80" align="center">
            <template #default="scope">
              <el-rate
                v-model="scope.row.rating"
                disabled
                size="small"
                max="5"
              />
            </template>
          </el-table-column>
          <el-table-column label="联系方式" width="130">
            <template #default="scope">
              <div style="font-size: 12px; line-height: 1.4;">
                <div>{{ scope.row.phone }}</div>
                <div style="color: #909399;">{{ scope.row.email }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="投递时间" width="110" align="center">
            <template #default="scope">
              {{ formatDate(scope.row.applyDate) }}
            </template>
          </el-table-column>
        </el-table>

        <div style="padding: 12px 16px; display: flex; justify-content: center; border-top: 1px solid #ebeef5;">
          <el-pagination
            v-model:current-page="pagination.page"
            v-model:page-size="pagination.pageSize"
            :page-sizes="[10, 20, 50]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total"
            background
            @current-change="handlePageChange"
            @size-change="handlePageChange"
          />
        </div>
      </div>

      <div>
        <div v-if="selectedCandidate" class="card" style="margin-bottom: 16px;">
          <div class="detail-section">
            <div class="section-title">
              候选人详情
              <el-tag :type="RESUME_STATUS_MAP[selectedCandidate.resumeStatus]?.type" style="margin-left: 8px;">
                {{ RESUME_STATUS_MAP[selectedCandidate.resumeStatus]?.label }}
              </el-tag>
            </div>
            <div class="detail-item">
              <div class="label">姓名</div>
              <div class="value">{{ selectedCandidate.name }} · {{ selectedCandidate.gender }} · {{ selectedCandidate.age }}岁</div>
            </div>
            <div class="detail-item">
              <div class="label">学历</div>
              <div class="value">{{ selectedCandidate.education }}</div>
            </div>
            <div class="detail-item">
              <div class="label">电话</div>
              <div class="value">{{ selectedCandidate.phone }}</div>
            </div>
            <div class="detail-item">
              <div class="label">邮箱</div>
              <div class="value">{{ selectedCandidate.email }}</div>
            </div>
            <div class="detail-item">
              <div class="label">投递职位</div>
              <div class="value">{{ selectedCandidate.appliedJobTitle }}</div>
            </div>
            <div class="detail-item">
              <div class="label">投递时间</div>
              <div class="value">{{ formatDate(selectedCandidate.applyDate) }}</div>
            </div>
            <div class="detail-item">
              <div class="label">工作经验</div>
              <div class="value">{{ selectedCandidate.workExperience }}</div>
            </div>
            <div class="detail-item">
              <div class="label">综合评分</div>
              <div class="value">
                <el-rate v-model="selectedCandidate.rating" disabled max="5" />
              </div>
            </div>
          </div>
        </div>
        <div v-else class="card" style="text-align: center; padding: 60px 20px; color: #909399;">
          <el-icon size="48" style="color: #c0c4cc;"><User /></el-icon>
          <p style="margin-top: 12px;">请在左侧选择候选人查看详情</p>
        </div>

        <div v-if="selectedCandidate" class="operation-area">
          <div class="section-title">简历操作</div>
          <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 12px;">
            <el-button
              type="success"
              :icon="Check"
              :disabled="selectedCandidate.resumeStatus !== 'PENDING'"
              @click="handlePass"
            >
              通过初筛
            </el-button>
            <el-button
              type="info"
              :icon="Close"
              :disabled="selectedCandidate.resumeStatus === 'REJECTED'"
              @click="handleReject"
            >
              标记不合适
            </el-button>
            <el-button
              type="primary"
              :icon="Calendar"
              :disabled="!canScheduleInterview(selectedCandidate.resumeStatus)"
              @click="openInterviewDialog"
            >
              安排面试
            </el-button>
            <el-button
              :icon="View"
              @click="viewFullDetail"
            >
              查看完整详情
            </el-button>
          </div>
          <el-alert
            v-if="selectedCandidate.resumeStatus !== 'PENDING' && selectedCandidate.resumeStatus !== 'PASSED'"
            title="当前状态下部分操作不可用"
            type="warning"
            :closable="false"
            style="margin-top: 12px;"
            show-icon
          />
        </div>
      </div>
    </div>

    <el-dialog v-model="interviewVisible" title="安排面试" width="560px" destroy-on-close>
      <el-form
        ref="interviewFormRef"
        :model="interviewForm"
        :rules="interviewRules"
        label-width="100px"
      >
        <el-form-item label="候选人">
          <el-input :value="selectedCandidate?.name" disabled />
        </el-form-item>
        <el-form-item label="面试职位">
          <el-select v-model="interviewForm.jobId" placeholder="请选择职位" style="width: 100%;">
            <el-option
              v-for="j in openJobs"
              :key="j.id"
              :label="j.title"
              :value="j.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="面试时间" prop="interviewTime">
          <el-date-picker
            v-model="interviewForm.interviewTime"
            type="datetime"
            placeholder="选择面试时间"
            style="width: 100%;"
            format="YYYY-MM-DD HH:mm"
            value-format="YYYY-MM-DDTHH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="面试官" prop="interviewer">
          <el-input v-model="interviewForm.interviewer" placeholder="请输入面试官姓名" />
        </el-form-item>
        <el-form-item label="面试方式" prop="interviewMethod">
          <el-radio-group v-model="interviewForm.interviewMethod">
            <el-radio-button label="ONSITE">现场</el-radio-button>
            <el-radio-button label="ONLINE">视频</el-radio-button>
            <el-radio-button label="PHONE">电话</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="地点/链接">
          <el-input
            v-model="interviewForm.locationOrLink"
            :placeholder="interviewForm.interviewMethod === 'ONLINE' ? '请输入视频会议链接' : '请输入面试地点'"
          />
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="interviewForm.notes"
            type="textarea"
            :rows="3"
            placeholder="可选：填写面试注意事项等"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="interviewVisible = false">取消</el-button>
        <el-button type="primary" :loading="submitting" @click="submitInterview">保存安排</el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="fullDetailVisible"
      :title="selectedCandidate?.name + ' - 完整详情'"
      width="720px"
      destroy-on-close
    >
      <div v-if="selectedCandidate" class="detail-section">
        <div class="section-title">基本信息</div>
        <div class="two-col-layout">
          <div class="detail-item">
            <div class="label">姓名</div>
            <div class="value">{{ selectedCandidate.name }}</div>
          </div>
          <div class="detail-item">
            <div class="label">性别/年龄</div>
            <div class="value">{{ selectedCandidate.gender }} / {{ selectedCandidate.age }}岁</div>
          </div>
          <div class="detail-item">
            <div class="label">电话</div>
            <div class="value">{{ selectedCandidate.phone }}</div>
          </div>
          <div class="detail-item">
            <div class="label">邮箱</div>
            <div class="value">{{ selectedCandidate.email }}</div>
          </div>
          <div class="detail-item">
            <div class="label">学历</div>
            <div class="value">{{ selectedCandidate.education }}</div>
          </div>
          <div class="detail-item">
            <div class="label">评分</div>
            <div class="value"><el-rate v-model="selectedCandidate.rating" disabled /></div>
          </div>
        </div>
      </div>

      <div v-if="selectedCandidate" class="detail-section">
        <div class="section-title">投递信息</div>
        <div class="detail-item">
          <div class="label">投递职位</div>
          <div class="value">{{ selectedCandidate.appliedJobTitle }}</div>
        </div>
        <div class="detail-item">
          <div class="label">投递时间</div>
          <div class="value">{{ formatDate(selectedCandidate.applyDate) }}</div>
        </div>
        <div class="detail-item">
          <div class="label">当前状态</div>
          <div class="value">
            <el-tag :type="RESUME_STATUS_MAP[selectedCandidate.resumeStatus]?.type">
              {{ RESUME_STATUS_MAP[selectedCandidate.resumeStatus]?.label }}
            </el-tag>
          </div>
        </div>
        <div class="detail-item">
          <div class="label">工作经验</div>
          <div class="value">{{ selectedCandidate.workExperience }}</div>
        </div>
      </div>

      <div v-if="selectedCandidate" class="detail-section">
        <div class="section-title">跟进记录</div>
        <div v-if="selectedCandidate.followRecords && selectedCandidate.followRecords.length" class="follow-timeline">
          <div
            v-for="(record, idx) in [...selectedCandidate.followRecords].reverse()"
            :key="idx"
            class="timeline-item"
          >
            <div class="timeline-content">
              <strong>{{ record.operator }}</strong>：{{ record.content }}
            </div>
            <div class="timeline-meta">{{ formatDate(record.date) }}</div>
          </div>
        </div>
        <div v-else class="empty-state" style="padding: 20px;">暂无跟进记录</div>
      </div>

      <template #footer>
        <el-button @click="fullDetailVisible = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Refresh, Search, RefreshLeft, User, Check, Close, Calendar, View
} from '@element-plus/icons-vue'
import { queryCandidates, passCandidate, rejectCandidate, getCandidate } from '@/api/candidate'
import { listJobs, listOpenJobs } from '@/api/job'
import { createInterview } from '@/api/interview'
import { RESUME_STATUS_MAP, formatDate } from '@/utils/constants'

const loading = ref(false)
const candidates = ref([])
const jobs = ref([])
const openJobs = ref([])
const selectedCandidate = ref(null)

const filters = reactive({
  jobId: '',
  resumeStatus: '',
  keyword: ''
})

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

const interviewVisible = ref(false)
const fullDetailVisible = ref(false)
const submitting = ref(false)
const interviewFormRef = ref(null)
const interviewForm = reactive({
  jobId: null,
  interviewTime: null,
  interviewer: '',
  interviewMethod: 'ONLINE',
  locationOrLink: '',
  notes: ''
})

const interviewRules = {
  interviewTime: [{ required: true, message: '请选择面试时间', trigger: 'change' }],
  interviewer: [{ required: true, message: '请输入面试官姓名', trigger: 'blur' }],
  interviewMethod: [{ required: true, message: '请选择面试方式', trigger: 'change' }]
}

function canScheduleInterview(status) {
  return status === 'PENDING' || status === 'PASSED'
}

async function loadJobs() {
  try {
    const res = await listJobs()
    if (res.code === 200) jobs.value = res.data || []
    const res2 = await listOpenJobs()
    if (res2.code === 200) openJobs.value = res2.data || []
  } catch (e) { console.error(e) }
}

async function loadData() {
  loading.value = true
  try {
    const params = {
      ...filters,
      page: pagination.page,
      pageSize: pagination.pageSize
    }
    const res = await queryCandidates(params)
    if (res.code === 200) {
      candidates.value = res.data?.list || []
      pagination.total = res.data?.total || 0
      if (candidates.value.length > 0 && !selectedCandidate.value) {
        handleRowSelect(candidates.value[0])
      }
    } else {
      ElMessage.error(res.message || '加载候选人失败')
    }
  } finally {
    loading.value = false
  }
}

function handleFilter() {
  pagination.page = 1
  loadData()
}

function resetFilter() {
  filters.jobId = ''
  filters.resumeStatus = ''
  filters.keyword = ''
  pagination.page = 1
  loadData()
}

function handlePageChange() {
  loadData()
}

async function handleRowSelect(row) {
  if (!row) return
  try {
    const res = await getCandidate(row.id)
    if (res.code === 200) {
      selectedCandidate.value = res.data
    } else {
      selectedCandidate.value = { ...row }
    }
  } catch {
    selectedCandidate.value = { ...row }
  }
}

async function handlePass() {
  if (!selectedCandidate.value) return
  try {
    await ElMessageBox.confirm(
      `确定要将【${selectedCandidate.value.name}】标记为通过初筛吗？`,
      '确认操作',
      { confirmButtonText: '确定', cancelButtonText: '取消', type: 'success' }
    )
  } catch { return }

  try {
    const { value: remark } = await ElMessageBox.prompt('请输入通过备注（可选）', '通过初筛', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPlaceholder: '如：技术能力匹配，经验符合',
      inputValidator: () => true
    }).catch(() => ({ value: '' }))
    if (remark === undefined) return

    const res = await passCandidate({
      candidateId: selectedCandidate.value.id,
      remark: remark || ''
    })
    if (res.code === 200) {
      ElMessage.success(res.message || '已通过初筛')
      selectedCandidate.value = res.data
      loadData()
    } else {
      ElMessage.error(res.message || '操作失败')
    }
  } catch (e) { console.error(e) }
}

async function handleReject() {
  if (!selectedCandidate.value) return
  try {
    await ElMessageBox.confirm(
      `确定要将【${selectedCandidate.value.name}】标记为不合适吗？`,
      '确认操作',
      { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
    )
  } catch { return }

  try {
    const { value: remark } = await ElMessageBox.prompt('请输入不合适原因（可选）', '标记不合适', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPlaceholder: '如：经验不足 / 薪资期望不符',
      inputValidator: () => true
    }).catch(() => ({ value: '' }))
    if (remark === undefined) return

    const res = await rejectCandidate({
      candidateId: selectedCandidate.value.id,
      remark: remark || ''
    })
    if (res.code === 200) {
      ElMessage.success(res.message || '已标记不合适')
      selectedCandidate.value = res.data
      loadData()
    } else {
      ElMessage.error(res.message || '操作失败')
    }
  } catch (e) { console.error(e) }
}

function openInterviewDialog() {
  if (!selectedCandidate.value) return
  Object.assign(interviewForm, {
    jobId: Number(selectedCandidate.value.appliedJobId) || null,
    interviewTime: null,
    interviewer: '',
    interviewMethod: 'ONLINE',
    locationOrLink: '',
    notes: ''
  })
  interviewVisible.value = true
}

async function submitInterview() {
  if (!interviewFormRef.value) return
  try {
    await interviewFormRef.value.validate()
  } catch {
    ElMessage.warning('请完善表单必填项')
    return
  }

  submitting.value = true
  try {
    const payload = {
      candidateId: selectedCandidate.value.id,
      jobId: interviewForm.jobId,
      interviewTime: interviewForm.interviewTime ? new Date(interviewForm.interviewTime).toISOString() : null,
      interviewer: interviewForm.interviewer,
      interviewMethod: interviewForm.interviewMethod,
      locationOrLink: interviewForm.locationOrLink,
      notes: interviewForm.notes
    }
    const res = await createInterview(payload)
    if (res.code === 200) {
      ElMessage.success(res.message || '面试安排已保存')
      interviewVisible.value = false
      selectedCandidate.value.resumeStatus = 'INTERVIEW_SCHEDULED'
      loadData()
    } else {
      ElMessage.error(res.message || '保存失败')
    }
  } finally {
    submitting.value = false
  }
}

function viewFullDetail() {
  fullDetailVisible.value = true
}

onMounted(async () => {
  await loadJobs()
  loadData()
})
</script>
