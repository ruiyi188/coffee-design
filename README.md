# ☕ Coffee Design - 匠心咖啡

## 📦 Release v1.1.0 — 2026-03-29

### 交付范围

- **路由总表**：新增 `assets/routes.js` 作为全站 URL 单一数据源（21 条路由）
- **导航重构**：`nav.js` 改为读取路由总表，消除所有硬编码路径
- **链接治理**：186 条内部链接验证通过，0 死链
- **404 页面**：新增 `404.html` 兜底页，含品牌设计 + 返回首页入口
- **质量脚本**：`npm run lint:links`（链接检查）、`npm run verify`（构建+检查）
- **页面地图**：新增 `docs/pages-map.md`，完整页面清单与导航入口统计
- **页面模板**：新增 `docs/page-template.html`，标准化新增页面流程

### 路由管理与发版流程

#### 路由总表

所有页面路径由 `assets/routes.js` 统一管理，禁止在 HTML 中散落硬编码路径。

```javascript
// 示例：获取路由路径
CoffeeRoutes.getPath('home')     // → '../_1/code.html'
CoffeeRoutes.getPath('brew')     // → '../brew_guide/code.html'
CoffeeRoutes.isActive('terroir') // → true/false
```

#### 新增页面流程

1. 在 `assets/routes.js` → `ROUTES` 对象中注册新路由
2. 复制 `docs/page-template.html` 到目标目录
3. 若需导航入口，在 `NAV_ITEMS` 或 `DRAWER_ITEMS` 中追加
4. 运行 `npm run lint:links` 验证无死链
5. 提交代码

#### 质量检查

```bash
npm run lint:links   # 扫描全站 HTML 内部链接是否可达
npm run verify       # 构建 + 链接检查（CI 可用）
```

---

## 📦 Release v1.0.0 — 2026-03-29

### 交付范围

- **品牌统一**：全站品牌名统一为"匠心咖啡"（原有 6 个不同名称）
- **导航系统**：新增 `assets/nav.js`，实现统一底部 5 标签导航 + 侧边抽屉菜单，自动高亮当前页
- **冲煮计时器**：`brew_guide` 页面实现互动计时器（开始/暂停/重置/2:30&3:00 到点通知）
- **SEO 基础**：所有页面补全 `<title>` / `<meta description>` / `<meta theme-color>`
- **响应式 & safe-area**：底部导航适配 `env(safe-area-inset-bottom)`，Tailwind sm/md/lg/xl 断点覆盖
- **可访问性**：抽屉 `role="dialog"` + `aria-label`，Escape 键关闭，关闭按钮 `aria-label`
- **交付文档**：README 完整重写，含启动指南、目录结构、技术栈、功能清单

### 已知风险

| # | 风险 | 优先级 |
|---|------|--------|
| 1 | Tailwind 通过 CDN 加载未 PurgeCSS，首屏多约 300KB | P1 |
| 2 | 后台管理系统为纯 UI 模拟，无后端 API / 数据库 | P1 |
| 3 | 无障碍仅覆盖抽屉组件，缺少 `aria-live`（计时器）和部分图片 `alt` | P2 |
| 4 | 无 E2E 自动化测试脚本 | P2 |
| 5 | 图片均为外链，缺少 favicon / OG meta | P2 |
| 6 | 无 Service Worker / PWA 支持 | P3 |

---

一个高端、精美的咖啡品牌网站和后台管理系统，采用现代设计系统理念，提供卓越的用户体验。

## 🚀 快速开始

### 安装与启动

```bash
# 进入项目目录
cd coffee-design

# 启动本地开发服务器
npm run dev
# 或者使用 Python
python3 -m http.server 3000

# 构建（纯静态项目，无需构建）
npm run build
```

访问: `http://localhost:3000/_1/code.html`

### 可用脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动本地开发服务器 (端口 3000) |
| `npm run start` | 同上 |
| `npm run build` | 构建验证（纯静态，直接通过） |
| `npm run preview` | 预览模式（端口 8080） |

## 📁 项目结构

```
coffee-design/
├── package.json           # 项目配置与脚本
├── README.md              # 本文件
├── _1/                    # 首页 - 时间之种
│   └── code.html
├── _2/                    # 标志性咖啡原豆品鉴
│   └── code.html
├── _3/                    # 匠心烘焙感官巡礼
│   └── code.html
├── admin/                 # 后台管理系统
│   ├── login.html         # 登录页面
│   ├── dashboard.html     # 仪表盘
│   ├── content.html       # 内容管理
│   ├── accounts.html      # 账户管理
│   ├── analytics.html     # 数据分析
│   └── settings.html      # 系统设置
├── brew_guide/            # 冲煮仪式（含互动计时器）
│   └── code.html
├── terroir/               # 咖啡风土（含互动地图）
│   └── code.html
├── varieties/             # 咖啡品种百科
│   └── code.html
├── regions/               # 各产地详情页
│   ├── ethiopia.html
│   ├── colombia.html
│   ├── indonesia.html
│   ├── kenya.html
│   ├── brazil.html
│   ├── panama.html
│   └── costa-rica.html
├── settings/              # 用户设置
│   └── code.html
├── assets/                # 共享资源
│   ├── style.css          # 全局样式（含导航、抽屉、计时器样式）
│   ├── main.js            # 共享工具函数（通知、懒加载等）
│   ├── nav.js             # 统一导航系统（底部栏 + 侧边抽屉）
│   └── *.svg              # 国旗SVG图标
└── roast_ritual/          # 设计系统文档
    └── DESIGN.md          # 完整设计规范
```

## 📦 技术栈

| 类别 | 技术 |
|------|------|
| **核心** | HTML5 + CSS3 + 原生 JavaScript |
| **CSS 框架** | Tailwind CSS (CDN) + 自定义 CSS |
| **字体** | Google Fonts (Noto Serif SC + Plus Jakarta Sans) |
| **图标** | Material Symbols Outlined |
| **本地服务** | serve (npm) / Python SimpleHTTPServer |

> 纯静态项目，零构建依赖。所有页面可直接在浏览器中打开。

## 🎨 设计系统

### 品牌名称
统一使用 **匠心咖啡** 作为品牌名。

### 配色方案
- **主色 (Primary)**: `#3E2723` / `#271310` - 浓郁的意式浓缩
- **次色 (Secondary)**: `#655d5a` - 烤杏仁棕
- **点缀色 (Tertiary)**: `#031e08` - 植物绿
- **背景 (Surface)**: `#fafaf5` - 奶油浅色

### 排版
- **标题字体**: Noto Serif SC (衬线 - 编辑风格)
- **正文字体**: Plus Jakarta Sans (无衬线 - 可读性)
- **图标库**: Material Symbols Outlined

### 设计原则
- 无边框设计 - 使用色调过渡替代 1px 边框
- 玻璃态效果 - Glassmorphism 与背景模糊
- 非对称布局 - 图片与内容的有意错落
- 大量留白 - 展现咖啡品味与仪式感
- 编辑风格 - 宛如高端杂志的视觉效果

## ✨ 主要功能

### 前端页面
| 页面 | 路径 | 功能 |
|------|------|------|
| 首页 | `_1/code.html` | 编辑风格落地页，品牌故事展示 |
| 原豆品鉴 | `_2/code.html` | 五款标志性咖啡豆详细介绍 |
| 感官巡礼 | `_3/code.html` | 每日精选、咖啡生活社区 |
| 咖啡风土 | `terroir/code.html` | 互动咖啡带地图、产地Bento Grid |
| 咖啡品种 | `varieties/code.html` | 阿拉比卡 vs 罗布斯塔、子品种 |
| 冲煮仪式 | `brew_guide/code.html` | V60 手冲教程、**互动计时器** |
| 产地详情 | `regions/*.html` | 7 个产区深度页面 |
| 用户设置 | `settings/code.html` | 语言、外观、通知管理 |

### 交互功能
- ✅ **统一底部导航** - 5个标签页，自动高亮当前页
- ✅ **侧边抽屉菜单** - 汉堡按钮打开完整导航
- ✅ **冲煮计时器** - 开始/暂停/重置，到达目标时间通知
- ✅ **登录系统** - 表单验证、密码可见性切换、记住我
- ✅ **通知系统** - 全局 toast 通知
- ✅ **图片懒加载** - IntersectionObserver 实现

### 后台管理系统
访问 `admin/login.html`，演示账户：`admin@coffee.com`（任意密码）

| 页面 | 功能 |
|------|------|
| 仪表盘 | 数据概览、访问趋势、内容分布 |
| 内容管理 | CRUD 操作，发布/草稿/存档 |
| 账户管理 | 用户列表、角色权限 |
| 数据分析 | 实时统计、流量分析 |
| 系统设置 | 网站配置、安全策略 |

## 📱 响应式设计

使用 Tailwind CSS 标准断点：
- `sm`: 640px | `md`: 768px | `lg`: 1024px | `xl`: 1280px

## ♿ 无障碍支持

- 语义化 HTML 与 ARIA 标签
- 键盘导航支持
- `prefers-reduced-motion` 动画降级
- 高对比度支持

## 🔧 后续优化建议

### 短期
- [ ] 添加 Service Worker 实现 PWA 离线支持
- [ ] 集成 Tailwind CLI 构建（生产环境 PurgeCSS）
- [ ] 添加 Open Graph meta 标签用于社交分享
- [ ] 添加 favicon.ico 和 apple-touch-icon

### 中期
- [ ] 后端 API 集成（用户认证、内容CRUD）
- [ ] 搜索功能实现
- [ ] 评论与社区互动系统
- [ ] 国际化 (i18n) 支持

### 长期
- [ ] 迁移至 Vite/Next.js 框架
- [ ] 数据库持久化
- [ ] CDN 图片优化（WebP/AVIF）
- [ ] 性能监控与分析集成

---

**最后更新**: 2026年3月29日
**版本**: 1.0.0
**作者**: Artisan Coffee Team
