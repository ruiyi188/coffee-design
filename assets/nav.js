/**
 * Unified Navigation System for 匠心咖啡
 * Generates consistent bottom nav and side drawer across all pages.
 */

(function () {
  'use strict';

  const BRAND_NAME = '匠心咖啡';

  // Determine the base path relative to the current page
  function getBasePath() {
    const path = window.location.pathname;
    // If we're in a subdirectory like /_1/, /brew_guide/, /regions/, etc.
    if (path.includes('/regions/')) return '../';
    if (path.includes('/_1/') || path.includes('/_2/') || path.includes('/_3/') ||
        path.includes('/brew_guide/') || path.includes('/terroir/') ||
        path.includes('/varieties/') || path.includes('/settings/')) return '../';
    // Root level
    return './';
  }

  const NAV_ITEMS = [
    { icon: 'home', label: '首页', path: '_1/code.html', id: 'home' },
    { icon: 'public', label: '产地', path: 'terroir/code.html', id: 'terroir' },
    { icon: 'coffee', label: '品种', path: 'varieties/code.html', id: 'varieties' },
    { icon: 'timer', label: '冲煮', path: 'brew_guide/code.html', id: 'brew' },
    { icon: 'settings', label: '设置', path: 'settings/code.html', id: 'settings' }
  ];

  const DRAWER_ITEMS = [
    { icon: 'home', label: '首页 — 时间之种', path: '_1/code.html' },
    { icon: 'auto_awesome', label: '原豆品鉴', path: '_2/code.html' },
    { icon: 'local_cafe', label: '感官巡礼', path: '_3/code.html' },
    { divider: true },
    { icon: 'public', label: '咖啡风土', path: 'terroir/code.html' },
    { icon: 'coffee', label: '咖啡品种', path: 'varieties/code.html' },
    { icon: 'timer', label: '冲煮仪式', path: 'brew_guide/code.html' },
    { divider: true },
    { icon: 'settings', label: '设置', path: 'settings/code.html' },
    { icon: 'admin_panel_settings', label: '后台管理', path: 'admin/login.html' }
  ];

  function detectActivePage() {
    const path = window.location.pathname;
    if (path.includes('/_1/')) return 'home';
    if (path.includes('/terroir/') || path.includes('/regions/')) return 'terroir';
    if (path.includes('/varieties/')) return 'varieties';
    if (path.includes('/brew_guide/')) return 'brew';
    if (path.includes('/settings/')) return 'settings';
    return '';
  }

  function createBottomNav() {
    const existingNav = document.querySelector('nav.coffee-bottom-nav');
    if (existingNav) return; // Already created

    const basePath = getBasePath();
    const activePage = detectActivePage();

    const nav = document.createElement('nav');
    nav.className = 'coffee-bottom-nav fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-2';
    nav.setAttribute('aria-label', '主导航');
    nav.innerHTML = `
      <div class="nav-backdrop"></div>
      ${NAV_ITEMS.map(item => {
        const isActive = item.id === activePage;
        return `
        <a href="${basePath}${item.path}" 
           class="nav-item ${isActive ? 'nav-item--active' : ''}" 
           ${isActive ? 'aria-current="page"' : ''}
           id="nav-${item.id}">
          <span class="material-symbols-outlined nav-icon"${isActive ? ' style="font-variation-settings: \'FILL\' 1;"' : ''}>${item.icon}</span>
          <span class="nav-label">${item.label}</span>
        </a>`;
      }).join('')}
    `;

    document.body.appendChild(nav);
  }

  function createSideDrawer() {
    const existingDrawer = document.getElementById('side-drawer-overlay');
    if (existingDrawer) return;

    const basePath = getBasePath();

    // Overlay
    const overlay = document.createElement('div');
    overlay.id = 'side-drawer-overlay';
    overlay.className = 'drawer-overlay';
    overlay.setAttribute('aria-hidden', 'true');

    // Drawer
    const drawer = document.createElement('aside');
    drawer.id = 'side-drawer';
    drawer.className = 'drawer';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-label', '导航菜单');

    drawer.innerHTML = `
      <div class="drawer-header">
        <div class="drawer-brand">
          <span class="material-symbols-outlined drawer-brand-icon" style="font-variation-settings: 'FILL' 1;">coffee</span>
          <div>
            <h2 class="drawer-brand-name">${BRAND_NAME}</h2>
            <p class="drawer-brand-sub">匠心烘焙 · 感官叙事</p>
          </div>
        </div>
        <button class="drawer-close" aria-label="关闭菜单" id="drawer-close-btn">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      <nav class="drawer-nav" aria-label="站点导航">
        ${DRAWER_ITEMS.map(item => {
          if (item.divider) return '<div class="drawer-divider"></div>';
          return `
          <a href="${basePath}${item.path}" class="drawer-link">
            <span class="material-symbols-outlined drawer-link-icon">${item.icon}</span>
            <span class="drawer-link-text">${item.label}</span>
          </a>`;
        }).join('')}
      </nav>
      <div class="drawer-footer">
        <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1; font-size: 20px; opacity: 0.3;">coffee</span>
        <p class="drawer-footer-text">匠心咖啡 © 2026</p>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    // Event listeners
    overlay.addEventListener('click', closeDrawer);
    document.getElementById('drawer-close-btn').addEventListener('click', closeDrawer);

    // Close on escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });
  }

  function openDrawer() {
    const overlay = document.getElementById('side-drawer-overlay');
    const drawer = document.getElementById('side-drawer');
    if (!overlay || !drawer) return;
    
    overlay.classList.add('drawer-overlay--open');
    drawer.classList.add('drawer--open');
    document.body.style.overflow = 'hidden';
    overlay.setAttribute('aria-hidden', 'false');
  }

  function closeDrawer() {
    const overlay = document.getElementById('side-drawer-overlay');
    const drawer = document.getElementById('side-drawer');
    if (!overlay || !drawer) return;

    overlay.classList.remove('drawer-overlay--open');
    drawer.classList.remove('drawer--open');
    document.body.style.overflow = '';
    overlay.setAttribute('aria-hidden', 'true');
  }

  // Bind all menu buttons on the page
  function bindMenuButtons() {
    // Look for menu buttons (spans with "menu" text inside buttons or clickable elements)
    document.querySelectorAll('[data-icon="menu"], span.material-symbols-outlined').forEach(el => {
      if (el.textContent.trim() === 'menu') {
        const btn = el.closest('button') || el.closest('span');
        if (btn) {
          btn.style.cursor = 'pointer';
          btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            openDrawer();
          });
        }
      }
    });
  }

  // Remove existing bottom navs from pages (they'll be replaced by the unified one)
  function removeOldNavs() {
    // Don't remove navs on admin pages
    if (window.location.pathname.includes('/admin/')) return;
    
    document.querySelectorAll('nav').forEach(nav => {
      // Only remove bottom nav bars (fixed at bottom)
      const style = window.getComputedStyle(nav);
      if (style.position === 'fixed' && nav.style.bottom === '0' || 
          nav.classList.contains('fixed') && nav.innerHTML.includes('首页')) {
        // Check if it's a bottom nav by looking for bottom-0 class or bottom: 0 style
        if (nav.className.includes('bottom-0') && !nav.classList.contains('coffee-bottom-nav')) {
          nav.remove();
        }
      }
    });
  }

  // Initialize
  function init() {
    // Skip nav injection on admin pages  
    if (window.location.pathname.includes('/admin/')) {
      createSideDrawer();
      bindMenuButtons();
      return;
    }

    removeOldNavs();
    createBottomNav();
    createSideDrawer();
    bindMenuButtons();
  }

  // Run on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export for external use
  window.CoffeeNav = {
    openDrawer,
    closeDrawer
  };
})();
