/**
 * Coffee Design — 路由总表 (Single Source of Truth)
 * 
 * 所有页面路径在此统一管理。
 * 导航组件、页面链接、链接检查脚本 均从此文件读取。
 * 
 * 新增页面流程：
 *   1. 在 ROUTES 中注册
 *   2. 若需导航入口，在 NAV_ITEMS / DRAWER_ITEMS 中添加
 *   3. 运行 npm run lint:links 验证
 * 
 * @version 1.1.0
 */

(function (root) {
  'use strict';

  /**
   * 全站路由表
   * - id:    唯一标识（slug）
   * - path:  相对于项目根目录的文件路径
   * - title: 页面中文名
   * - group: 分组（front=前台, admin=后台, region=产地详情）
   * - nav:   是否出现在底部导航
   */
  var ROUTES = {
    // ===== 前台页面 =====
    home:       { id: 'home',       path: '_1/code.html',           title: '首页 — 时间之种',        group: 'front' },
    beans:      { id: 'beans',      path: '_2/code.html',           title: '标志性咖啡原豆',          group: 'front' },
    sensory:    { id: 'sensory',    path: '_3/code.html',           title: '感官巡礼',              group: 'front' },
    terroir:    { id: 'terroir',    path: 'terroir/code.html',      title: '咖啡风土',              group: 'front' },
    varieties:  { id: 'varieties',  path: 'varieties/code.html',    title: '咖啡品种',              group: 'front' },
    brew:       { id: 'brew',       path: 'brew_guide/code.html',   title: '冲煮仪式',              group: 'front' },
    settings:   { id: 'settings',   path: 'settings/code.html',     title: '设置',                 group: 'front' },

    // ===== 产地详情 =====
    'region-ethiopia':   { id: 'region-ethiopia',   path: 'regions/ethiopia.html',   title: '埃塞俄比亚', group: 'region' },
    'region-colombia':   { id: 'region-colombia',   path: 'regions/colombia.html',   title: '哥伦比亚',   group: 'region' },
    'region-indonesia':  { id: 'region-indonesia',  path: 'regions/indonesia.html',  title: '印度尼西亚', group: 'region' },
    'region-kenya':      { id: 'region-kenya',      path: 'regions/kenya.html',      title: '肯尼亚',    group: 'region' },
    'region-brazil':     { id: 'region-brazil',     path: 'regions/brazil.html',     title: '巴西',      group: 'region' },
    'region-panama':     { id: 'region-panama',     path: 'regions/panama.html',     title: '巴拿马',    group: 'region' },
    'region-costa-rica': { id: 'region-costa-rica', path: 'regions/costa-rica.html', title: '哥斯达黎加', group: 'region' },

    // ===== 后台管理 =====
    'admin-login':     { id: 'admin-login',     path: 'admin/login.html',     title: '后台登录',   group: 'admin' },
    'admin-dashboard': { id: 'admin-dashboard', path: 'admin/dashboard.html', title: '仪表盘',    group: 'admin' },
    'admin-content':   { id: 'admin-content',   path: 'admin/content.html',   title: '内容管理',   group: 'admin' },
    'admin-accounts':  { id: 'admin-accounts',  path: 'admin/accounts.html',  title: '账户管理',   group: 'admin' },
    'admin-analytics': { id: 'admin-analytics', path: 'admin/analytics.html', title: '数据分析',   group: 'admin' },
    'admin-settings':  { id: 'admin-settings',  path: 'admin/settings.html',  title: '系统设置',   group: 'admin' },

    // ===== 特殊页面 =====
    '404':             { id: '404',             path: '404.html',             title: '页面未找到', group: 'special' }
  };

  /**
   * 底部导航项（5 个标签页）
   */
  var NAV_ITEMS = [
    { icon: 'home',     label: '首页', routeId: 'home',      matchPattern: '/_1/' },
    { icon: 'public',   label: '产地', routeId: 'terroir',   matchPattern: '/terroir/|/regions/' },
    { icon: 'coffee',   label: '品种', routeId: 'varieties', matchPattern: '/varieties/' },
    { icon: 'timer',    label: '冲煮', routeId: 'brew',      matchPattern: '/brew_guide/' },
    { icon: 'settings', label: '设置', routeId: 'settings',  matchPattern: '/settings/' }
  ];

  /**
   * 侧边抽屉导航项
   */
  var DRAWER_ITEMS = [
    { icon: 'home',                  label: '首页 — 时间之种',  routeId: 'home' },
    { icon: 'auto_awesome',          label: '原豆品鉴',         routeId: 'beans' },
    { icon: 'local_cafe',            label: '感官巡礼',         routeId: 'sensory' },
    { divider: true },
    { icon: 'public',                label: '咖啡风土',         routeId: 'terroir' },
    { icon: 'coffee',                label: '咖啡品种',         routeId: 'varieties' },
    { icon: 'timer',                 label: '冲煮仪式',         routeId: 'brew' },
    { divider: true },
    { icon: 'settings',              label: '设置',            routeId: 'settings' },
    { icon: 'admin_panel_settings',  label: '后台管理',         routeId: 'admin-login' }
  ];

  // =========================================
  //  工具函数
  // =========================================

  /**
   * 获取某条路由的完整路径（相对于当前页面）
   * @param {string} routeId — ROUTES 中的 key
   * @returns {string} 可直接用于 href 的相对路径
   */
  function getPath(routeId) {
    var route = ROUTES[routeId];
    if (!route) {
      console.warn('[routes] Unknown routeId: ' + routeId);
      return '#';
    }
    return _toRelative(route.path);
  }

  /**
   * 根据当前 URL 判断某 routeId 是否为当前页
   */
  function isActive(routeId) {
    var route = ROUTES[routeId];
    if (!route) return false;
    var pathname = window.location.pathname;
    // 精确匹配：路径以 route.path 结尾
    return pathname.indexOf(route.path) !== -1;
  }

  /**
   * 根据 matchPattern（正则字符串）判断当前页是否匹配某导航项
   */
  function matchNav(matchPattern) {
    if (!matchPattern) return false;
    var pathname = window.location.pathname;
    var patterns = matchPattern.split('|');
    for (var i = 0; i < patterns.length; i++) {
      if (pathname.indexOf(patterns[i]) !== -1) return true;
    }
    return false;
  }

  /**
   * 将根目录相对路径转换为当前页面的相对路径
   */
  function _toRelative(rootRelativePath) {
    var pathname = window.location.pathname;
    // Count depth: /coffee/_1/code.html => need ../
    // Find how many directories deep we are from project root
    // Strategy: detect known subdirectory patterns
    var depth = 0;
    var segments = pathname.split('/').filter(Boolean);
    
    // Find the index of the file (last segment with . in it)
    // Then count dirs between project root and file
    // For static sites served at various mount points, 
    // we look for known directory names to determine depth
    var knownDirs = ['_1', '_2', '_3', 'admin', 'brew_guide', 'terroir', 'varieties', 'settings', 'regions'];
    for (var i = 0; i < segments.length; i++) {
      if (knownDirs.indexOf(segments[i]) !== -1) {
        depth = segments.length - i - 1; // -1 for the file itself
        break;
      }
    }

    var prefix = '';
    for (var j = 0; j < depth; j++) {
      prefix += '../';
    }
    return prefix + rootRelativePath;
  }

  /**
   * 获取所有路由（供脚本使用）
   */
  function getAllRoutes() {
    return ROUTES;
  }

  // =========================================
  //  导出
  // =========================================

  var CoffeeRoutes = {
    ROUTES: ROUTES,
    NAV_ITEMS: NAV_ITEMS,
    DRAWER_ITEMS: DRAWER_ITEMS,
    getPath: getPath,
    isActive: isActive,
    matchNav: matchNav,
    getAllRoutes: getAllRoutes
  };

  // Browser global
  if (typeof root !== 'undefined') {
    root.CoffeeRoutes = CoffeeRoutes;
  }

  // Node.js / CommonJS (for link checker script)
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = CoffeeRoutes;
  }

})(typeof window !== 'undefined' ? window : this);
