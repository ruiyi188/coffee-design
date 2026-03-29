# 📄 Coffee Design — 页面地图 (Pages Map)

> 版本：v1.1.0 | 更新日期：2026-03-29
> 数据源：`assets/routes.js` (Single Source of Truth)

## 页面总览

| 总页面数 | 前台页面 | 产地详情 | 后台管理 | 特殊页面 |
|----------|----------|----------|----------|----------|
| **21** | 7 | 7 | 5 | 2 (404 + DESIGN) |

---

## 前台页面 (group: front)

| Route ID | 路径 | 页面名称 | 底部导航 | 抽屉菜单 | 用途 |
|----------|------|----------|----------|----------|------|
| `home` | `_1/code.html` | 首页 — 时间之种 | ✅ 首页 | ✅ | 品牌落地页、编辑风格叙事 |
| `beans` | `_2/code.html` | 标志性咖啡原豆 | — | ✅ | 五款标志性咖啡豆品鉴 |
| `sensory` | `_3/code.html` | 感官巡礼 | — | ✅ | 每日精选、咖啡生活内容 |
| `terroir` | `terroir/code.html` | 咖啡风土 | ✅ 产地 | ✅ | 咖啡带互动地图、产地概览 |
| `varieties` | `varieties/code.html` | 咖啡品种 | ✅ 品种 | ✅ | 阿拉比卡/罗布斯塔百科 |
| `brew` | `brew_guide/code.html` | 冲煮仪式 | ✅ 冲煮 | ✅ | V60手冲教程、互动计时器 |
| `settings` | `settings/code.html` | 设置 | ✅ 设置 | ✅ | 语言、外观、通知偏好 |

## 产地详情 (group: region)

| Route ID | 路径 | 页面名称 | 入口来源 |
|----------|------|----------|----------|
| `region-ethiopia` | `regions/ethiopia.html` | 埃塞俄比亚 | terroir 页面卡片 |
| `region-colombia` | `regions/colombia.html` | 哥伦比亚 | terroir 页面卡片 |
| `region-indonesia` | `regions/indonesia.html` | 印度尼西亚 | terroir 页面卡片 |
| `region-kenya` | `regions/kenya.html` | 肯尼亚 | terroir 页面卡片 |
| `region-brazil` | `regions/brazil.html` | 巴西 | terroir 页面卡片 |
| `region-panama` | `regions/panama.html` | 巴拿马 | terroir 页面卡片 |
| `region-costa-rica` | `regions/costa-rica.html` | 哥斯达黎加 | terroir 页面卡片 |

## 后台管理 (group: admin)

| Route ID | 路径 | 页面名称 | 入口来源 |
|----------|------|----------|----------|
| `admin-login` | `admin/login.html` | 后台登录 | 抽屉菜单、各页面头像 |
| `admin-dashboard` | `admin/dashboard.html` | 仪表盘 | 登录后跳转 |
| `admin-content` | `admin/content.html` | 内容管理 | 后台侧栏 |
| `admin-accounts` | `admin/accounts.html` | 账户管理 | 后台侧栏 |
| `admin-analytics` | `admin/analytics.html` | 数据分析 | 后台侧栏 |
| `admin-settings` | `admin/settings.html` | 系统设置 | 后台侧栏 |

## 特殊页面

| Route ID | 路径 | 页面名称 | 用途 |
|----------|------|----------|------|
| `404` | `404.html` | 页面未找到 | 兜底 404，含返回首页入口 |

---

## 导航入口统计

### 底部导航 (5 tabs)
```
首页 → home (_1/code.html)
产地 → terroir (terroir/code.html) — 也匹配 /regions/*
品种 → varieties (varieties/code.html)
冲煮 → brew (brew_guide/code.html)
设置 → settings (settings/code.html)
```

### 侧边抽屉 (8 links + 2 dividers)
```
首页 — 时间之种 → home
原豆品鉴 → beans
感官巡礼 → sensory
───
咖啡风土 → terroir
咖啡品种 → varieties
冲煮仪式 → brew
───
设置 → settings
后台管理 → admin-login
```

---

## 新增页面流程

1. **注册路由**: 在 `assets/routes.js` 的 `ROUTES` 对象中添加新条目
2. **创建页面**: 复制 `docs/page-template.html` 并修改内容
3. **添加导航入口**（可选）: 在 `NAV_ITEMS` 或 `DRAWER_ITEMS` 中追加
4. **验证链接**: 运行 `npm run lint:links`
5. **提交代码**: `git add . && git commit -m "feat: add new page xxx"`
