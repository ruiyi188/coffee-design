// Global navigation and shared functionality

// Mobile menu toggle
function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) {
    menu.classList.toggle('hidden');
  }
}

// Smooth scroll
function smoothScroll(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Active nav indicator
function setActiveNav(currentPage) {
  const navButtons = document.querySelectorAll('[data-nav]');
  navButtons.forEach(btn => {
    btn.classList.remove('active', 'bg-secondary-container', 'text-primary');
    if (btn.getAttribute('data-nav') === currentPage) {
      btn.classList.add('active', 'bg-secondary-container', 'text-primary');
    }
  });
}

// Brew timer functionality
function startBrewTimer() {
  let seconds = 0;
  const timerDisplay = document.getElementById('brew-timer');
  
  const interval = setInterval(() => {
    seconds++;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const display = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    
    if (timerDisplay) {
      timerDisplay.textContent = display;
    }
  }, 1000);
  
  // Stop after 5 minutes (300 seconds)
  setTimeout(() => {
    clearInterval(interval);
    showNotification('冲煮完成！');
  }, 300000);
}

// Notification helper
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'fixed bottom-8 left-8 right-8 md:left-auto md:right-8 md:max-w-sm z-50 p-4 rounded-lg bg-primary text-on-primary shadow-lg animate-slide-in';
  notification.innerHTML = `
    <div class="flex items-center gap-3">
      <span class="material-symbols-outlined">check_circle</span>
      <span>${message}</span>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Image lazy loading
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for browsers without IntersectionObserver
    images.forEach(img => {
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
    });
  }
});

// Export for use in different pages
window.AppUtils = {
  toggleMenu,
  smoothScroll,
  setActiveNav,
  startBrewTimer,
  showNotification
};
