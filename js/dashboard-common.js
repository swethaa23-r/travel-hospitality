/**
 * Stackly - Unified Dashboard Common Functionality
 * Handles:
 * 1. Mobile Sidebar Drawer toggle and overlay
 * 2. Profile Sync & Credentials display
 * 3. Search Bar validation:
 *    - If empty: shows script-based error message "Please enter the data"
 *    - If has details: redirects to 404
 * 4. Bell icon click: redirects to 404
 * 5. Profile dropdown:
 *    - "Account Settings" navigates to internal profile/settings page
 *    - "Sign Out" navigates to login page
 * 6. Form validation check before redirecting to 404
 * 7. Action button redirection to 404
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Sidebar Toggle & Overlay
  const toggleBtn = document.getElementById('dashboardSidebarToggle');
  const sidebar = document.querySelector('.dashboard-sidebar, .admin-sidebar');
  const closeBtn = document.getElementById('closeSidebarBtn');
  let overlay = document.querySelector('.dashboard-sidebar-overlay');

  if (!overlay && sidebar) {
    overlay = document.createElement('div');
    overlay.className = 'dashboard-sidebar-overlay';
    document.body.appendChild(overlay);
  }

  function openSidebar() {
    if (sidebar) sidebar.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    if (sidebar) sidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openSidebar();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeSidebar);
  }

  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }

  // Close sidebar on navigation click (mobile)
  document.querySelectorAll('.dashboard-nav-link, .admin-nav-item').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992) {
        closeSidebar();
      }
    });
  });

  // 2. Profile Information
  const defaultUser = {
    name: 'Swetha Ramesh',
    email: 'swetha.ramesh@gmail.com',
    role: 'VIP Traveler / Administrator'
  };

  // Sync profile display in header & pages
  document.querySelectorAll('.profile-name, .user-display-name').forEach(el => {
    el.textContent = defaultUser.name;
  });
  document.querySelectorAll('.profile-email, .user-display-email').forEach(el => {
    el.textContent = defaultUser.email;
  });

  // Handle Logout / Sign Out click - clear session and redirect to login page
  document.querySelectorAll('a[href*="login.html"]').forEach(link => {
    link.addEventListener('click', () => {
      const keys = window.STACKLY_STORAGE_KEYS || window.WANDERNEST_STORAGE_KEYS;
      if (keys) {
        localStorage.removeItem(keys.CURRENT_USER);
        localStorage.removeItem(keys.ADMIN_USER);
      }
    });
  });

  // 3. Search Bar Handling:
  // If details provided -> redirects to 404
  // If empty -> shows script error message "Please enter the data"
  const searchForms = document.querySelectorAll('.dashboard-search-form, #dashboardSearchForm');
  searchForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      const query = input ? input.value.trim() : '';

      if (!query) {
        // Show script-based error message
        if (typeof Swal !== 'undefined') {
          Swal.fire({
            icon: 'warning',
            title: 'Search Validation',
            text: 'Please enter the data',
            confirmButtonColor: '#123B52',
            confirmButtonText: 'OK'
          });
        } else {
          alert('Please enter the data');
        }
        if (input) input.focus();
        return false;
      }

      // Details entered -> redirect to 404!
      window.location.href = '../404.html';
    });
  });

  // 4. Bell Icon Click -> Redirect to 404
  document.querySelectorAll('.dashboard-notif-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      window.location.href = '../404.html';
    });
  });

  // 5. Form validation checking before redirecting to 404
  document.querySelectorAll('form:not(.dashboard-search-form):not(#dashboardSearchForm)').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Check HTML5 validity
      if (!form.checkValidity()) {
        form.reportValidity();
        return false;
      }

      // Form is fully valid! Redirect to 404 as requested
      window.location.href = '../404.html';
    });
  });

  // 6. Action buttons & CTA redirection to 404
  // Using capture phase to intercept before inline onclick handlers
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button, a.btn, .admin-action-btn');
    if (!btn) return;

    // Bell icon click handled above
    if (btn.classList.contains('dashboard-notif-btn') || btn.closest('.dashboard-notif-btn')) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      window.location.href = '../404.html';
      return;
    }

    // Search button inside search form is handled by search form submit
    if (btn.closest('.dashboard-search-form, #dashboardSearchForm')) {
      return;
    }

    // Skip if button is inside a normal form submit
    if (btn.type === 'submit' || btn.closest('form')) {
      return;
    }

    // Skip sidebar mobile toggles / dismissals
    if (btn.id === 'dashboardSidebarToggle' || btn.id === 'closeSidebarBtn' || btn.classList.contains('dashboard-hamburger-btn') || btn.classList.contains('dashboard-sidebar-close')) {
      return;
    }

    // Skip profile dropdown toggle button itself
    if (btn.classList.contains('dashboard-header-profile') || btn.closest('.dashboard-header-profile')) {
      return;
    }

    // Skip bootstrap dropdown / modal dismiss
    if (btn.hasAttribute('data-bs-dismiss')) {
      return;
    }

    // Allowed internal dashboard page navigation
    const href = btn.getAttribute('href');
    if (href && (
      href.startsWith('user-dashboard') ||
      href.startsWith('my-bookings') ||
      href.startsWith('wishlist') ||
      href.startsWith('profile.html') ||
      href.startsWith('browse-tours') ||
      href.startsWith('explore-destinations') ||
      href.startsWith('admin-dashboard') ||
      href.startsWith('manage-') ||
      href.includes('login.html')
    )) {
      return;
    }

    // Modal open triggers: if opening a modal that contains a form, allow opening the modal
    if (btn.hasAttribute('data-bs-toggle') && btn.getAttribute('data-bs-toggle') === 'modal') {
      const targetModal = document.querySelector(btn.getAttribute('data-bs-target'));
      if (targetModal && targetModal.querySelector('form')) {
        return;
      }
    }

    // All other action buttons: redirect to 404!
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    window.location.href = '../404.html';
  }, true);
});
