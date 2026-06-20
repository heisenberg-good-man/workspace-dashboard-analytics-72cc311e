# 招聘管理平台

基于前后端分离架构的招聘平台业务骨架，聚焦招聘方工作台，实现职位、候选人、简历筛选、面试安排和统计看板的完整闭环。

## 项目结构

```
workspace-dashboard-analytics-72cc311e/
├── backend/                         # 后端 Spring Boot 工程
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/recruitment/
│       │   ├── RecruitmentApplication.java
│       │   ├── config/                        # CORS 配置
│       │   ├── common/                        # Result 响应封装
│       │   ├── controller/                    # REST 接口层
│       │   │   ├── HealthController.java      # 健康检查
│       │   │   ├── DashboardController.java
│       │   │   ├── JobController.java
│       │   │   ├── CandidateController.java
│       │   │   └── InterviewController.java
│       │   ├── dto/                           # 数据传输对象
│       │   ├── model/                         # 数据模型
│       │   ├── storage/                       # 内存数据存储
│       │   ├── init/                          # Mock 数据初始化
│       │   └── service/                       # 业务服务层
│       └── resources/
│           └── application.properties
│
├── frontend/                        # 前端 Vue3 工程
│   ├── package.json
│   ├── .npmrc                       # npm 缓存配置
│   ├── vite.config.js               # Vite 配置（端口 3000，API 代理）
│   ├── index.html
│   └── src/
│       ├── main.js
│       ├── App.vue
│       ├── style.css
│       ├── router/                  # 路由配置
│       ├── layout/                  # 布局组件
│       ├── views/                   # 页面组件
│       ├── api/                     # 接口封装（含 mock 兜底）
│       └── utils/
│           ├── apiConfig.js         # API 地址集中配置
│           ├── mockData.js          # 本地 mock 数据兜底
│           ├── request.js           # axios 封装 + withMock
│           └── constants.js         # 状态映射 + 格式化
│
└── README.md
```

## 技术栈

### 后端
- **Java 17** + **Spring Boot 3.2**
- Spring Web（RESTful API）
- Spring Validation
- Lombok
- 内存存储（ConcurrentHashMap，无数据库依赖）

### 前端
- **Vue 3** + Composition API
- **Vite 5**（构建工具）
- **Vue Router 4**（路由，history 模式）
- **Pinia**（状态管理）
- **Element Plus**（UI 组件库）
- **ECharts 5**（图表）
- **Axios**（HTTP 请求，含 mock 兜底机制）

## 本地端口

| 服务 | 端口 | 说明 |
|------|------|------|
| 后端 API | **8080** | Spring Boot 默认端口 |
| 前端开发 | **3000** | Vite dev server，自动代理 /api → 8080 |

## 启动说明

### 环境要求
- JDK 17+
- Maven 3.8+（或使用项目自带 mvnw）
- Node.js 16+

---

### 后端启动（Windows PowerShell）

```powershell
# 进入后端目录
cd backend

# 编译打包（首次会下载依赖）
mvn clean package -DskipTests

# 启动服务（端口 8080）
mvn spring-boot:run
# 或：java -jar target/recruitment-backend-1.0.0.jar
```

验证：浏览器访问 `http://localhost:8080/api/health`，返回 JSON 即成功。

---

### 前端启动（Windows PowerShell）

> 为避免 PowerShell 执行策略和全局缓存问题，使用 `npm.cmd` 并将缓存设到项目目录。

```powershell
# 进入前端目录
cd frontend

# 安装依赖（缓存已配置到 .npm-cache）
npm.cmd install

# 启动开发服务器（端口 3000，已代理 /api → 8080）
npm.cmd run dev

# 生产构建（可选）
# npm.cmd run build
# npm.cmd run preview
```

访问：`http://localhost:3000`

---

### 一键启动顺序

1. **先启动后端**（端口 8080）：`cd backend && mvn spring-boot:run`
2. **再启动前端**（端口 3000）：`cd frontend && npm.cmd run dev`
3. 浏览器打开 `http://localhost:3000`

> 即使后端未启动，前端也会使用本地 mock 数据兜底，确保页面可操作。

## 页面路由

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | 自动跳转 | → `/dashboard` |
| `/dashboard` | 数据看板 | 四大指标 + 饼图 + 柱状图 |
| `/jobs` | 职位管理 | 职位列表 + 详情 + 状态切换 |
| `/candidates` | 候选人管理 | 候选人列表 + 详情 + 筛选 + 面试安排 |
| `/interviews` | 面试安排 | 面试列表 + 筛选 + 完成/取消 |

未知路径自动重定向到 `/dashboard`。

## REST API 一览

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/health | 健康检查 |
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
| POST | /api/interviews/{id}/complete | 完成面试 |
| POST | /api/interviews/{id}/cancel | 取消面试 |
| GET | /api/interviews/candidate/{id} | 候选人面试记录 |

## 数据联动说明

所有操作围绕同一批内存数据联动：

1. **通过初筛** → 候选人状态 PENDING→PASSED + 跟进记录 + 看板数字变化
2. **标记不合适** → 候选人状态→REJECTED + 跟进记录 + 看板数字变化
3. **安排面试** → 面试记录 + 候选人状态→INTERVIEW_SCHEDULED + 跟进记录 + 看板面试数+1
4. **完成面试** → 面试状态→COMPLETED + 候选人状态→INTERVIEWED + 跟进记录
5. **取消面试** → 面试状态→CANCELLED + 候选人状态回退→PASSED + 跟进记录
6. **职位状态切换** → 看板开放职位数变化

## 错误处理与状态边界

- **API 请求失败**：自动使用本地 mock 数据兜底，页面顶部显示警告提示
- **字段缺失**：表单校验红色提示 + `请完善表单必填项`
- **状态不允许操作**：按钮禁用 + Alert 提示
- **保存失败**：接口返回错误信息通过 ElMessage 弹出
- **空列表**：空状态图标 + 友好文字提示
- **危险操作**：二次确认弹窗
- **健康检查**：`/api/health` 确认后端可用性

## Mock 数据

启动后系统自动加载，无需任何数据库：

| 职位 | 状态 | 负责人 |
|------|------|--------|
| 高级Java开发工程师 | 招聘中 | 张三 |
| 前端开发工程师 | 招聘中 | 李四 |
| 产品经理 | 招聘中 | 王五 |
| UI设计师 | 已暂停 | 赵六 |
| 数据分析师 | 招聘中 | 钱七 |
| 测试工程师 | 已关闭 | 孙八 |

15 个候选人覆盖所有简历状态，3 条面试记录（1 条待面试、2 条已完成）。
