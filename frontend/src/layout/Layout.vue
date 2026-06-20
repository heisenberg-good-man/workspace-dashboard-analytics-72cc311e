<template>
  <el-container class="layout-container">
    <el-aside class="sidebar" :width="sidebarWidth">
      <div class="logo">
        <el-icon size="24" color="#409eff"><OfficeBuilding /></el-icon>
        <span class="logo-text">招聘管理平台</span>
      </div>
      <el-menu
        :default-active="activeMenu"
        router
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#ffffff"
        unique-opened
      >
        <el-menu-item
          v-for="item in menuItems"
          :key="item.path"
          :index="item.path"
        >
          <el-icon><component :is="item.icon" /></el-icon>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="header">
        <div class="header-left">
          <span class="breadcrumb-title">{{ currentTitle }}</span>
        </div>
        <div class="header-right">
          <el-avatar :size="32" style="background-color: #409eff;">管</el-avatar>
          <span class="username">管理员</span>
        </div>
      </el-header>

      <el-main class="main-content">
        <router-view v-slot="{ Component }">
          <keep-alive include="Dashboard">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const sidebarWidth = '220px'

const menuItems = [
  { path: '/dashboard', title: '数据看板', icon: 'DataLine' },
  { path: '/jobs', title: '职位管理', icon: 'Briefcase' },
  { path: '/candidates', title: '候选人管理', icon: 'User' },
  { path: '/interviews', title: '面试安排', icon: 'Calendar' }
]

const activeMenu = computed(() => route.path)
const currentTitle = computed(() => route.meta.title || '')
</script>

<style scoped>
.layout-container {
  height: 100vh;
}

.sidebar {
  background-color: #304156;
  overflow: hidden;
  transition: width 0.3s;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #2b3648;
  border-bottom: 1px solid #1f2d3d;
}

.logo-text {
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
}

.sidebar :deep(.el-menu) {
  border-right: none;
}

.sidebar :deep(.el-menu-item) {
  height: 50px;
  line-height: 50px;
}

.sidebar :deep(.el-menu-item:hover),
.sidebar :deep(.el-menu-item.is-active) {
  background-color: #409eff !important;
  color: #fff !important;
}

.header {
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
}

.header-left .breadcrumb-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.username {
  color: #606266;
  font-size: 14px;
}

.main-content {
  padding: 0;
  overflow: auto;
  background-color: #f5f7fa;
}
</style>
