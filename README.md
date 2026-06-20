# 招聘管理平台

基于前后端分离架构的招聘平台业务骨架，聚焦招聘方工作台，实现职位、候选人、简历筛选、面试安排和统计看板的完整闭环。

## 项目结构

```
workspace-dashboard-analytics-72cc311e/
├── backend/                         # 后端 Spring Boot 工程
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/recruitment/
│       │   ├── RecruitmentApplication.java    # 启动类
│       │   ├── config/                        # 配置（CORS）
│       │   ├── common/                        # 通用（Result 响应封装）
│       │   ├── dto/                           # 数据传输对象
│       │   ├── model/                         # 数据模型
│       │   ├── storage/                       # 内存数据存储
│       │   ├── init/                          # Mock 数据初始化
│       │   ├── service/                       # 业务服务层
│       │   └── controller/                    # REST 接口层
│       └── resources/
│           └── application.properties
│
├── frontend/                        # 前端 Vue3 工程
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── main.js                  # 入口
│       ├── App.vue
│       ├── style.css                # 全局样式
│       ├── router/                  # 路由配置
│       ├── layout/                  # 布局组件（侧边栏+顶栏）
│       ├── views/                   # 页面组件
│       │   ├── Dashboard.vue        # 数据看板
│       │   ├── Jobs.vue             # 职位管理
│       │   ├── Candidates.vue       # 候选人管理（含筛选+面试）
│       │   └── Interviews.vue       # 面试安排列表
│       ├── api/                     # 接口封装
│       │   ├── dashboard.js
│       │   ├── job.js
│       │   ├── candidate.js
│       │   └── interview.js
│       └── utils/                   # 工具函数
│           ├── request.js           # axios 封装
│           └── constants.js         # 状态映射+格式化
│
└── README.md
```

## 技术栈

### 后端
- **Java 17** + **Spring Boot 3.2**
- Spring Web（RESTful API）
- Spring Validation
- Lombok（简化 POJO）
- 内存存储（ConcurrentHashMap，无数据库依赖）

### 前端
- **Vue 3** + Composition API
- **Vite 5**（构建工具）
- **Vue Router 4**（路由）
- **Pinia**（状态管理）
- **Element Plus**（UI 组件库）
- **ECharts 5**（图表）
- **Axios**（HTTP 请求）

## 核心功能

### 1. 职位管理
- 职位列表展示（名称、部门、地点、招聘人数、状态、负责人、简历数）
- 职位详情弹窗
- 发布 / 暂停 状态切换（已关闭职位不可操作）

### 2. 候选人管理
- 候选人列表（含头像、状态标签、评分、联系方式、投递时间）
- 搜索筛选：按投递职位、简历状态、关键词（姓名/电话/邮箱/职位）
- 分页查询
- 候选人详情：基本信息、投递信息、工作经验、综合评分
- 完整详情弹窗：含跟进时间线

### 3. 简历筛选
- 通过初筛：待筛选 → 初筛通过，自动添加跟进记录
- 标记不合适：任何状态 → 不合适，自动添加跟进记录
- 操作前二次确认，可填写操作备注
- 状态不可操作时按钮禁用并提示

### 4. 面试安排
- 为 PENDING / PASSED 状态候选人安排面试
- 表单：面试时间、面试官、面试方式（现场/视频/电话）、地点/链接、备注
- 保存后候选人状态自动变为 `待面试`，跟进记录同步
- 已安排面试列表独立页面查看

### 5. 统计看板（实时联动）
- 四大指标卡片：开放职位数、待筛选简历、已安排面试、本周新增
- 简历状态分布环形图
- 各职位简历数横向柱状图
- 所有数据随页面操作实时变化

## 数据联动说明

所有操作都围绕同一批内存数据联动：
1. **通过初筛** → 候选人状态变更 + 跟进记录 + 看板 PENDING -1 / PASSED +1
2. **标记不合适** → 候选人状态变更 + 跟进记录 + 看板 REJECTED +1
3. **安排面试** → 面试记录 + 候选人状态 → 待面试 + 跟进记录 + 面试数 +1
4. **职位状态切换** → 看板开放职位数变化
5. **Mock 数据**：启动时自动注入 6 个职位 + 15 个候选人（覆盖全部状态）

## 本地 Mock 数据

启动后系统自动加载，无需任何数据库：

| 职位 | 状态 | 负责人 |
|------|------|--------|
| 高级Java开发工程师 | 招聘中 | 张三 |
| 前端开发工程师 | 招聘中 | 李四 |
| 产品经理 | 招聘中 | 王五 |
| UI设计师 | 已暂停 | 赵六 |
| 数据分析师 | 招聘中 | 钱七 |
| 测试工程师 | 已关闭 | 孙八 |

候选人覆盖所有简历状态：待筛选、初筛通过、不合适、待面试、已面试、已发Offer、已入职。

## 启动说明

### 环境要求
- JDK 17+
- Maven 3.8+
- Node.js 16+

---

### 后端启动（Windows PowerShell）

```powershell
# 进入后端目录
cd backend

# 编译打包（首次会下载依赖，需联网）
mvn clean package -DskipTests

# 启动服务（默认 8080 端口）
mvn spring-boot:run
# 或：java -jar target/recruitment-backend-1.0.0.jar
```

验证：浏览器访问 `http://localhost:8080/api/dashboard`，返回 JSON 即成功。

---

### 前端启动（Windows PowerShell）

> 注意：为避免 PowerShell 执行策略问题，使用 `npm.cmd` / `npx.cmd`，并将 npm 缓存设置到项目目录。

```powershell
# 进入前端目录
cd frontend

# 1. 设置 npm 缓存到当前项目目录（避免全局路径问题）
$env:npm_config_cache = "$(Get-Location)\.npm-cache"
# 或持久化设置：
# npm.cmd config set cache "$(Get-Location)\.npm-cache" --location project

# 2. 安装依赖（首次约 1-2 分钟）
npm.cmd install

# 3. 启动开发服务器（默认 3000 端口，已代理 /api → 8080）
npm.cmd run dev

# 4. 生产构建（可选）
# npm.cmd run build
# npm.cmd run preview
```

访问：`http://localhost:3000`

---

### 一键启动顺序

1. 先启动后端（端口 8080）
2. 再启动前端（端口 3000）
3. 浏览器打开 `http://localhost:3000`

## REST API 一览

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/dashboard | 获取看板统计 |
| GET | /api/jobs | 职位列表 |
| GET | /api/jobs/open | 开放职位列表 |
| GET | /api/jobs/{id} | 职位详情 |
| POST | /api/jobs/{id}/toggle-status | 切换职位发布/暂停 |
| POST | /api/candidates/query | 分页查询候选人（含筛选） |
| GET | /api/candidates/{id} | 候选人详情 |
| POST | /api/candidates/pass | 通过初筛 |
| POST | /api/candidates/reject | 标记不合适 |
| GET | /api/interviews | 面试列表 |
| POST | /api/interviews | 创建面试安排 |
| GET | /api/interviews/candidate/{id} | 候选人面试记录 |

## 错误处理与反馈

- 字段缺失：表单校验红色提示 + `请完善表单必填项`
- 状态不允许操作：按钮禁用 + 顶部 Alert 提示
- 保存失败：接口返回错误信息通过 ElMessage 弹出
- 空列表：空状态图标 + 友好文字提示
- 危险操作：二次确认弹窗（通过/拒绝/发布/暂停）

## 后续扩展点

- 接入 MySQL / PostgreSQL 替换内存存储
- 增加登录鉴权 + 权限控制（招聘方 / 候选人角色）
- 候选人端：注册、投递简历、查看进度
- 简历解析、评分算法、智能匹配
- 面试视频集成、Offer 审批流
- 在线实名认证、平台担保支付
- 消息通知（邮件 / 短信 / 站内信）
