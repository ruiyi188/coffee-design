/**
 * Unified Navigation System for 匠心咖啡
 * 
 * Reads from CoffeeRoutes (assets/routes.js) — the single source of truth.
 * Generates: bottom nav bar + side drawer menu.
 * 
 * @version 1.1.0
 */

(function () {
  'use strict';

  var BRAND_NAME = '匠心咖啡';

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  ready(function () {
    // Wait for CoffeeRoutes to load
    if (typeof CoffeeRoutes === 'undefined') {
      console.warn('[nav] CoffeeRoutes not found. Include routes.js before nav.js');
      return;
    }

    var R = CoffeeRoutes;

    // Skip nav injection on admin pages
    var isAdmin = window.location.pathname.indexOf('/admin/') !== -1;

    if (!isAdmin) {
      removeOldNavs();
      createBottomNav(R);
    }
    createSideDrawer(R);
    bindMenuButtons();
  });

  // ================================
  //  Bottom Navigation
  // ================================

  function createBottomNav(R) {
    if (document.querySelector('nav.coffee-bottom-nav')) return;

    var nav = document.createElement('nav');
    nav.className = 'coffee-bottom-nav fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-2';
    nav.setAttribute('aria-label', '主导航');

    var html = '<div class="nav-backdrop"></div>';

    R.NAV_ITEMS.forEach(function (item) {
      var active = R.matchNav(item.matchPattern);
      var href = R.getPath(item.routeId);
      html += '<a href="' + href + '" ' +
        'class="nav-item' + (active ? ' nav-item--active' : '') + '" ' +
        (active ? 'aria-current="page"' : '') +
        ' id="nav-' + item.routeId + '">' +
        '<span class="material-symbols-outlined nav-icon"' +
        (active ? " style=\"font-variation-settings: 'FILL' 1;\"" : '') +
        '>' + item.icon + '</span>' +
        '<span class="nav-label">' + item.label + '</span></a>';
    });

    nav.innerHTML = html;
    document.body.appendChild(nav);
  }

  // ================================
  //  Side Drawer
  // ================================

  function createSideDrawer(R) {
    if (document.getElementById('side-drawer-overlay')) return;

    var overlay = document.createElement('div');
    overlay.id = 'side-drawer-overlay';
    overlay.className = 'drawer-overlay';
    overlay.setAttribute('aria-hidden', 'true');

    var drawer = document.createElement('aside');
    drawer.id = 'side-drawer';
    drawer.className = 'drawer';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-label', '导航菜单');

    var linksHtml = '';
    R.DRAWER_ITEMS.forEach(function (item) {
      if (item.divider) {
        linksHtml += '<div class="drawer-divider"></div>';
        return;
      }
      var href = R.getPath(item.routeId);
      linksHtml += '<a href="' + href + '" class="drawer-link">' +
        '<span class="material-symbols-outlined drawer-link-icon">' + item.icon + '</span>' +
        '<span class="drawer-link-text">' + item.label + '</span></a>';
    });

    drawer.innerHTML =
      '<div class="drawer-header">' +
        '<div class="drawer-brand">' +
          '<span class="material-symbols-outlined drawer-brand-icon" style="font-variation-settings: \'FILL\' 1;">coffee</span>' +
          '<div><h2 class="drawer-brand-name">' + BRAND_NAME + '</h2>' +
          '<p class="drawer-brand-sub">匠心烘焙 · 感官叙事</p></div>' +
        '</div>' +
        '<button class="drawer-close" aria-label="关闭菜单" id="drawer-close-btn">' +
          '<span class="material-symbols-outlined">close</span>' +
        '</button>' +
      '</div>' +
      '<nav class="drawer-nav" aria-label="站点导航">' + linksHtml + '</nav>' +
      '<div class="drawer-footer">' +
        '<span class="material-symbols-outlined" style="font-variation-settings: \'FILL\' 1; font-size: 20px; opacity: 0.3;">coffee</span>' +
        '<p class="drawer-footer-text">匠心咖啡 © 2026</p>' +
      '</div>';

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    overlay.addEventListener('click', closeDrawer);
    document.getElementById('drawer-close-btn').addEventListener('click', closeDrawer);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });
  }

  // ================================
  //  Drawer open/close
  // ================================

  function openDrawer() {
    var overlay = document.getElementById('side-drawer-overlay');
    var drawer = document.getElementById('side-drawer');
    if (!overlay || !drawer) return;
    overlay.classList.add('drawer-overlay--open');
    drawer.classList.add('drawer--open');
    document.body.style.overflow = 'hidden';
    overlay.setAttribute('aria-hidden', 'false');
  }

  function closeDrawer() {
    var overlay = document.getElementById('side-drawer-overlay');
    var drawer = document.getElementById('side-drawer');
    if (!overlay || !drawer) return;
    overlay.classList.remove('drawer-overlay--open');
    drawer.classList.remove('drawer--open');
    document.body.style.overflow = '';
    overlay.setAttribute('aria-hidden', 'true');
  }

  // ================================
  //  Menu button binding
  // ================================

  function bindMenuButtons() {
    document.querySelectorAll('span.material-symbols-outlined').forEach(function (el) {
      if (el.textContent.trim() === 'menu') {
        var btn = el.closest('button') || el.closest('span');
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

  // ================================
  //  Remove legacy inline navs
  // ================================

  function removeOldNavs() {
    document.querySelectorAll('nav').forEach(function (nav) {
      if (nav.className.indexOf('bottom-0') !== -1 && !nav.classList.contains('coffee-bottom-nav')) {
        nav.remove();
      }
    });
  }

  // Export
  window.CoffeeNav = { openDrawer: openDrawer, closeDrawer: closeDrawer };
})();
