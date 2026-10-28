function toggleLeadershipSocial(el, event) {
  if (event) {
    event.stopPropagation();
    if (event.target.closest('.leadership-social-btn')) {
      return;
    }
  }
  const wrapper = el.classList.contains('leadership-img-wrapper') ? el : el.closest('.leadership-img-wrapper');
  if (!wrapper) return;
  const wasOpen = wrapper.classList.contains('show-social');
  
  document.querySelectorAll('.leadership-img-wrapper').forEach(w => {
    w.classList.remove('show-social', 'active');
  });
  
  if (!wasOpen) {
    wrapper.classList.add('show-social', 'active');
  }
}
window.toggleLeadershipSocial = toggleLeadershipSocial;

/**
 * Stackly - Main Interactions, GSAP Animations & Utilities
 */

// Universal Notification Toast
function showWnNotification(title, message, iconType = 'success') {
  if (typeof Swal !== 'undefined') {
    Swal.fire({
      title: title,
      text: message,
      icon: iconType,
      confirmButtonColor: '#123B52',
      customClass: {
        confirmButton: 'btn-primary-wn'
      }
    });
  } else {
    alert(`${title}: ${message}`);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Initialize AOS if available with smooth timing and proper offset
  if (typeof AOS !== 'undefined' && !prefersReducedMotion) {
    AOS.init({
      once: true,
      duration: 700,
      offset: 30,
      easing: 'ease-out-cubic',
      mirror: false
    });

    // Refresh triggers once images and assets load
    window.addEventListener('load', () => {
      AOS.refresh();
    });
  } else {
    document.documentElement.classList.add('no-aos');
  }

  // GSAP & ScrollTrigger Animations
  if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Hero Section Animation
    const heroTitle = document.querySelector('.hero-title');
    const heroDesc = document.querySelector('.hero-description');
    const heroCta = document.querySelector('.hero-cta-group');
    const heroBadge = document.querySelector('.hero-badge');
    const heroStats = document.querySelector('.hero-stats-card');

    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (heroBadge) {
      heroTimeline.from(heroBadge, { opacity: 0, y: -20, duration: 0.6, delay: 0.2 });
    }
    if (heroTitle) {
      heroTimeline.from(heroTitle, { opacity: 0, y: 30, duration: 0.9 }, '-=0.3');
    }
    if (heroDesc) {
      heroTimeline.from(heroDesc, { opacity: 0, y: 25, duration: 0.7 }, '-=0.5');
    }
    if (heroCta) {
      heroTimeline.from(heroCta.children, { opacity: 0, y: 20, duration: 0.6, stagger: 0.15 }, '-=0.4');
    }
    if (heroStats) {
      heroTimeline.from(heroStats, { opacity: 0, scale: 0.9, y: 30, duration: 0.8 }, '-=0.5');
    }

    // Scroll-triggered section reveals for cards
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.utils.toArray('.animate-card-reveal').forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%'
          },
          opacity: 0,
          y: 40,
          duration: 0.7,
          delay: (index % 3) * 0.15,
          ease: 'power2.out'
        });
      });
    }
  }

  // Flatpickr Date Picker Initialization
  if (typeof flatpickr !== 'undefined') {
    flatpickr('.flatpickr-date', {
      minDate: 'today',
      dateFormat: 'Y-m-d',
      altInput: true,
      altFormat: 'M j, Y'
    });
  }

  // Wishlist Button Handlers
  document.addEventListener('click', (e) => {
    const wishlistBtn = e.target.closest('.wishlist-btn');
    if (wishlistBtn) {
      e.preventDefault();
      e.stopPropagation();
      const itemId = wishlistBtn.dataset.id;
      if (!itemId) return;

      const added = StacklyData.toggleWishlist(itemId);
      if (added) {
        wishlistBtn.classList.add('active');
        wishlistBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
        showWnNotification('Saved to Wishlist', 'This item has been added to your saved travel collection.', 'success');
      } else {
        wishlistBtn.classList.remove('active');
        wishlistBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
        showWnNotification('Removed', 'Item removed from your wishlist.', 'info');
      }

      // If on wishlist page, re-render
      if (typeof renderWishlistItems === 'function') {
        renderWishlistItems();
      }
    }
  });

  // Disable HTML native validation tooltips on all forms
  document.querySelectorAll('form').forEach(f => f.setAttribute('novalidate', 'true'));

  // Newsletter Form Submissions with Script Validation
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.setAttribute('novalidate', 'true');
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput) {
      emailInput.addEventListener('input', () => {
        emailInput.classList.remove('is-invalid');
        const err = form.querySelector('.script-error-feedback');
        if (err) err.remove();
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const oldErr = form.querySelector('.script-error-feedback');
      if (oldErr) oldErr.remove();

      const val = emailInput ? emailInput.value.trim() : '';

      if (!val) {
        if (emailInput) {
          emailInput.classList.add('is-invalid');
          const errDiv = document.createElement('div');
          errDiv.className = 'script-error-feedback text-danger small mt-1 w-100 text-start';
          errDiv.innerHTML = '<i class="fa-solid fa-circle-exclamation me-1"></i>Please enter your email address.';
          form.appendChild(errDiv);
        }
        showWnNotification('Input Required', 'Please enter your email address to subscribe.', 'warning');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        if (emailInput) {
          emailInput.classList.add('is-invalid');
          const errDiv = document.createElement('div');
          errDiv.className = 'script-error-feedback text-danger small mt-1 w-100 text-start';
          errDiv.innerHTML = '<i class="fa-solid fa-circle-exclamation me-1"></i>Please enter a valid email address.';
          form.appendChild(errDiv);
        }
        showWnNotification('Invalid Email', 'Please enter a valid email address to subscribe.', 'warning');
        return;
      }

      showWnNotification('Welcome to Stackly Club!', `Thank you for subscribing (${val}). You will receive our exclusive seasonal guides and private offers.`, 'success');
      form.reset();
    });
  });

  // Hero Search Form Redirection
  const heroSearchForm = document.querySelector('#heroSearchForm');
  if (heroSearchForm) {
    heroSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const destination = heroSearchForm.querySelector('#searchDestination')?.value || '';
      const category = heroSearchForm.querySelector('#searchCategory')?.value || '';
      const checkIn = heroSearchForm.querySelector('#searchCheckIn')?.value || '';
      const travelers = heroSearchForm.querySelector('#searchTravelers')?.value || '';

      const queryParams = new URLSearchParams();
      if (destination) queryParams.set('dest', destination);
      if (category) queryParams.set('cat', category);
      if (checkIn) queryParams.set('date', checkIn);
      if (travelers) queryParams.set('travelers', travelers);

      window.location.href = `packages.html?${queryParams.toString()}`;
    });
  }

  // Interactive Blog Search, Category Filtering & Pagination (<< 1 2 3 >>)
  const blogArticlesGrid = document.getElementById('blogArticlesGrid');
  const blogSearchInput = document.getElementById('blogSearchInput');
  const blogSearchBtn = document.getElementById('blogSearchBtn');
  const blogCategoryLinks = document.querySelectorAll('.blog-cat-link');
  const resetBlogFiltersBtn = document.getElementById('resetBlogFiltersBtn');
  const blogPaginationNav = document.getElementById('blogPaginationNav');

  if (blogArticlesGrid) {
    let currentBlogCat = '';
    let currentPage = 1;
    const totalPages = 3;
    const articleItems = Array.from(blogArticlesGrid.querySelectorAll('.blog-article-item'));

    function renderBlogPage(page) {
      currentPage = page;
      articleItems.forEach((article) => {
        const itemPage = parseInt(article.dataset.page || '1', 10);
        if (itemPage === page) {
          article.classList.remove('d-none');
          article.style.display = '';
        } else {
          article.classList.add('d-none');
          article.style.display = 'none';
        }
      });

      // Update pagination classes
      if (blogPaginationNav) {
        blogPaginationNav.querySelectorAll('.page-item[data-page]').forEach(li => {
          if (parseInt(li.dataset.page, 10) === page) {
            li.classList.add('active');
          } else {
            li.classList.remove('active');
          }
        });

        const prevBtn = document.getElementById('blogPrevPage');
        const nextBtn = document.getElementById('blogNextPage');

        if (prevBtn) {
          if (currentPage <= 1) {
            prevBtn.classList.add('disabled');
          } else {
            prevBtn.classList.remove('disabled');
          }
        }
        if (nextBtn) {
          if (currentPage >= totalPages) {
            nextBtn.classList.add('disabled');
          } else {
            nextBtn.classList.remove('disabled');
          }
        }
      }

      if (typeof AOS !== 'undefined') {
        AOS.refresh();
      }
    }

    // Initialize Page 1 if multi-page articles exist
    if (articleItems.some(item => item.hasAttribute('data-page'))) {
      renderBlogPage(1);
    }

    // Event listeners for pagination << 1 2 3 >>
    if (blogPaginationNav) {
      blogPaginationNav.addEventListener('click', (e) => {
        e.preventDefault();
        const numItem = e.target.closest('.page-item[data-page]');
        if (numItem) {
          const targetPage = parseInt(numItem.dataset.page, 10);
          if (targetPage && targetPage !== currentPage) {
            renderBlogPage(targetPage);
            blogArticlesGrid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
          return;
        }

        const prevItem = e.target.closest('#blogPrevPage');
        if (prevItem && !prevItem.classList.contains('disabled')) {
          if (currentPage > 1) {
            renderBlogPage(currentPage - 1);
            blogArticlesGrid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
          return;
        }

        const nextItem = e.target.closest('#blogNextPage');
        if (nextItem && !nextItem.classList.contains('disabled')) {
          if (currentPage < totalPages) {
            renderBlogPage(currentPage + 1);
            blogArticlesGrid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
          return;
        }
      });
    }

    function filterBlogArticles() {
      const query = (blogSearchInput ? blogSearchInput.value : '').toLowerCase().trim();
      
      // If no search query and no category filter, revert to paginated view
      if (!query && !currentBlogCat) {
        if (blogPaginationNav) blogPaginationNav.style.display = '';
        renderBlogPage(currentPage);
        const existingNoResult = blogArticlesGrid.querySelector('.blog-no-results');
        if (existingNoResult) existingNoResult.remove();
        if (resetBlogFiltersBtn) resetBlogFiltersBtn.style.display = 'none';
        return;
      }

      if (blogPaginationNav) blogPaginationNav.style.display = 'none';
      let matchCount = 0;

      // Check if no-results placeholder exists
      const existingNoResult = blogArticlesGrid.querySelector('.blog-no-results');
      if (existingNoResult) existingNoResult.remove();

      articleItems.forEach((article) => {
        const title = (article.dataset.title || article.textContent).toLowerCase();
        const category = (article.dataset.category || '').toLowerCase();
        const matchesQuery = !query || title.includes(query) || article.textContent.toLowerCase().includes(query);
        const matchesCat = !currentBlogCat || category.includes(currentBlogCat.toLowerCase());

        if (matchesQuery && matchesCat) {
          article.classList.remove('d-none');
          article.style.display = '';
          article.classList.add('animate-card-fade');
          article.style.animationDelay = `${(matchCount % 4) * 0.08}s`;
          matchCount++;
        } else {
          article.classList.add('d-none');
          article.style.display = 'none';
        }
      });

      if (resetBlogFiltersBtn) {
        resetBlogFiltersBtn.style.display = (query || currentBlogCat) ? 'inline-block' : 'none';
      }

      if (matchCount === 0) {
        const noResultEl = document.createElement('div');
        noResultEl.className = 'col-12 py-5 text-center blog-no-results';
        noResultEl.innerHTML = `
          <div class="p-5 bg-white rounded-4 shadow-sm border">
            <i class="fa-solid fa-feather-pointed fa-3x text-sunset-gold mb-3"></i>
            <h4 class="mb-2">No Articles Found</h4>
            <p class="text-muted">No journal entries match "${query || currentBlogCat}".</p>
            <button class="btn btn-primary-wn mt-2" id="resetBlogSearchBtn">Show All Dispatches</button>
          </div>
        `;
        blogArticlesGrid.appendChild(noResultEl);
        document.getElementById('resetBlogSearchBtn')?.addEventListener('click', resetBlogFilters);
      }

      if (typeof AOS !== 'undefined') {
        if (typeof AOS.refreshHard === 'function') {
          AOS.refreshHard();
        } else {
          AOS.refresh();
        }
      }
    }

    function resetBlogFilters() {
      if (blogSearchInput) blogSearchInput.value = '';
      currentBlogCat = '';
      blogCategoryLinks.forEach(link => link.classList.remove('fw-bold', 'text-sunset-gold'));
      const allLink = document.querySelector('.blog-cat-link[data-cat=""]');
      if (allLink) allLink.classList.add('fw-bold', 'text-sunset-gold');
      renderBlogPage(1);
      if (blogPaginationNav) blogPaginationNav.style.display = '';
      if (resetBlogFiltersBtn) resetBlogFiltersBtn.style.display = 'none';
      const existingNoResult = blogArticlesGrid.querySelector('.blog-no-results');
      if (existingNoResult) existingNoResult.remove();
    }

    if (blogSearchInput) {
      blogSearchInput.addEventListener('input', filterBlogArticles);
      blogSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          filterBlogArticles();
        }
      });
    }

    if (blogSearchBtn) {
      blogSearchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        filterBlogArticles();
      });
    }

    blogCategoryLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        currentBlogCat = link.dataset.cat || '';
        blogCategoryLinks.forEach(l => l.classList.remove('fw-bold', 'text-sunset-gold'));
        link.classList.add('fw-bold', 'text-sunset-gold');
        filterBlogArticles();
      });
    });

    if (resetBlogFiltersBtn) {
      resetBlogFiltersBtn.addEventListener('click', (e) => {
        e.preventDefault();
        resetBlogFilters();
      });
    }
  }

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.leadership-img-wrapper')) {
      document.querySelectorAll('.leadership-img-wrapper').forEach(w => {
        w.classList.remove('show-social', 'active');
      });
    }
  });

  document.querySelectorAll('.leadership-social-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      window.location.href = '404.html';
    });
  });

  // Horizontal Scroll for Words from Our Global Guests Testimonials
  const testimonialsScroll = document.getElementById('testimonialsScroll');
  const prevTestimonialBtn = document.querySelector('.prev-testimonial');
  const nextTestimonialBtn = document.querySelector('.next-testimonial');

  if (testimonialsScroll) {
    if (prevTestimonialBtn) {
      prevTestimonialBtn.addEventListener('click', () => {
        testimonialsScroll.scrollBy({ left: -400, behavior: 'smooth' });
      });
    }

    if (nextTestimonialBtn) {
      nextTestimonialBtn.addEventListener('click', () => {
        testimonialsScroll.scrollBy({ left: 400, behavior: 'smooth' });
      });
    }

    // Touch / Mouse Drag to Scroll
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    testimonialsScroll.addEventListener('mousedown', (e) => {
      isDown = true;
      testimonialsScroll.classList.add('active-dragging');
      startX = e.pageX - testimonialsScroll.offsetLeft;
      scrollLeft = testimonialsScroll.scrollLeft;
    });

    testimonialsScroll.addEventListener('mouseleave', () => {
      isDown = false;
      testimonialsScroll.classList.remove('active-dragging');
    });

    testimonialsScroll.addEventListener('mouseup', () => {
      isDown = false;
      testimonialsScroll.classList.remove('active-dragging');
    });

    testimonialsScroll.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - testimonialsScroll.offsetLeft;
      const walk = (x - startX) * 1.5;
      testimonialsScroll.scrollLeft = scrollLeft - walk;
    });
  }

  // Stats Counter Animation (94+ Handpicked Destinations, 12,500+ Discerning Guests, 450+ 5-Star Luxury Partners, 28 Global Travel Awards)
  const statCounters = document.querySelectorAll('.stat-counter');
  if (statCounters.length > 0) {
    const animateCounter = (counter) => {
      const target = parseInt(counter.dataset.target, 10);
      const suffix = counter.dataset.suffix || '';
      const useComma = counter.dataset.comma === 'true';
      const duration = 2000;
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease-out expo
        const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentVal = Math.floor(easeOut * target);

        let formattedVal = currentVal.toString();
        if (useComma) {
          formattedVal = currentVal.toLocaleString('en-US');
        }

        counter.textContent = formattedVal + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          let finalVal = target.toString();
          if (useComma) finalVal = target.toLocaleString('en-US');
          counter.textContent = finalVal + suffix;
        }
      };

      requestAnimationFrame(updateCount);
    };

    if ('IntersectionObserver' in window) {
      const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.25 });

      statCounters.forEach(counter => counterObserver.observe(counter));
    } else {
      statCounters.forEach(counter => animateCounter(counter));
    }
  }

  // Sequenced Animation for Our Travel Planning Process
  const processSequenceWrapper = document.querySelector('.process-sequence-wrapper');
  if (processSequenceWrapper) {
    if ('IntersectionObserver' in window) {
      const processObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      processObserver.observe(processSequenceWrapper);
    } else {
      processSequenceWrapper.classList.add('in-view');
    }
  }

});
