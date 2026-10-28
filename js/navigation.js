document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.wn-navbar');
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const drawerOverlay = document.querySelector('.mobile-drawer-overlay');
  const drawerCloseBtn = document.querySelector('.mobile-drawer-close');
  const drawerLinks = document.querySelectorAll('.mobile-drawer-link');

  let isTransitioning = false;
  let scrollY = 0;

  const handleScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  const updateToggleIcon = (isOpen) => {
    if (!mobileToggle) return;
    mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (isOpen) {
      mobileToggle.classList.add('active');
    } else {
      mobileToggle.classList.remove('active');
    }
    const icon = mobileToggle.querySelector('i');
    if (icon) {
      if (isOpen) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    }
  };

  const openDrawer = () => {
    if (isTransitioning || !mobileDrawer || !drawerOverlay) return;
    if (mobileDrawer.classList.contains('active')) return;
    isTransitioning = true;

    scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    document.body.style.top = `-${scrollY}px`;
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.classList.add('menu-open');

    mobileDrawer.classList.add('active');
    drawerOverlay.classList.add('active');
    updateToggleIcon(true);

    setTimeout(() => {
      isTransitioning = false;
    }, 360);
  };

  const closeDrawer = () => {
    if (isTransitioning || !mobileDrawer || !drawerOverlay) return;
    if (!mobileDrawer.classList.contains('active')) return;
    isTransitioning = true;

    mobileDrawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    updateToggleIcon(false);

    document.body.classList.remove('menu-open');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollY);

    setTimeout(() => {
      isTransitioning = false;
    }, 360);
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (mobileDrawer && mobileDrawer.classList.contains('active')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeDrawer();
    });
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', (e) => {
      e.stopPropagation();
      closeDrawer();
    });

    drawerOverlay.addEventListener('touchmove', (e) => {
      e.preventDefault();
    }, { passive: false });
  }

  document.addEventListener('click', (e) => {
    if (mobileDrawer && mobileDrawer.classList.contains('active')) {
      if (!mobileDrawer.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeDrawer();
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('active')) {
      closeDrawer();
    }
  });

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && mobileDrawer && mobileDrawer.classList.contains('active')) {
      closeDrawer();
    }
  });

  const currentPath = window.location.pathname;
  let pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
  if (pageName === '') pageName = 'index.html';

  const parentMap = {
    'destination-details.html': 'destinations.html',
    'package-details.html': 'packages.html',
    'destinations.html': 'destinations.html',
    'packages.html': 'packages.html',
    'booking.html': 'packages.html',
    'hotel-details.html': 'services.html',
    'hotels.html': 'services.html',
    'experiences.html': 'services.html',
    'gallery.html': 'services.html',
    'faq.html': 'about.html',
    'blog-details.html': 'blog.html'
  };
  const effectivePage = parentMap[pageName] || pageName;

  document.querySelectorAll('.nav-link-wn, .nav-login-btn').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const targetFile = href.split('/').pop().split('?')[0];
    if (targetFile === effectivePage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  drawerLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const targetFile = href.split('/').pop().split('?')[0];
    if (targetFile === effectivePage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});
