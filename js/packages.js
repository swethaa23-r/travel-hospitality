/**
 * Stackly - Packages Listing and Package Details Script
 */

document.addEventListener('DOMContentLoaded', () => {
  const packagesGrid = document.getElementById('packagesGrid');
  const packageSearch = document.getElementById('packageSearch');
  const pkgCategoryFilter = document.getElementById('pkgCategoryFilter');
  const pkgDurationFilter = document.getElementById('pkgDurationFilter');
  const pkgBudgetFilter = document.getElementById('pkgBudgetFilter');
  const pkgSortSelect = document.getElementById('pkgSortSelect');
  const packageDetailsContainer = document.getElementById('packageDetailsContainer');

  // 1. Packages Listing Page
  if (packagesGrid) {
    const allPackages = StacklyData.getPackages();

    // Support incoming search query parameters from homepage search
    const urlParams = new URLSearchParams(window.location.search);
    const initialSearch = urlParams.get('dest') || urlParams.get('search') || '';
    const initialCat = urlParams.get('cat') || '';
    const initialDuration = urlParams.get('duration') || '';

    if (packageSearch && initialSearch) packageSearch.value = initialSearch;
    if (pkgCategoryFilter && initialCat) pkgCategoryFilter.value = initialCat;
    if (pkgDurationFilter && initialDuration) pkgDurationFilter.value = initialDuration;

    function renderPackages() {
      const searchTerm = packageSearch ? packageSearch.value.toLowerCase().trim() : '';
      const selectedCategory = pkgCategoryFilter ? pkgCategoryFilter.value : '';
      const selectedDuration = pkgDurationFilter ? pkgDurationFilter.value : '';
      const maxBudget = pkgBudgetFilter ? parseFloat(pkgBudgetFilter.value) || 99999 : 99999;
      const sortBy = pkgSortSelect ? pkgSortSelect.value : 'featured';

      let filtered = allPackages.filter(pkg => {
        const matchesSearch = pkg.title.toLowerCase().includes(searchTerm) ||
                              pkg.destinationName.toLowerCase().includes(searchTerm) ||
                              pkg.overview.toLowerCase().includes(searchTerm);
        const matchesCat = !selectedCategory || pkg.category === selectedCategory;
        const matchesBudget = pkg.price <= maxBudget;

        let matchesDuration = true;
        if (selectedDuration === 'short') matchesDuration = pkg.durationDays <= 5;
        else if (selectedDuration === 'medium') matchesDuration = pkg.durationDays >= 6 && pkg.durationDays <= 8;
        else if (selectedDuration === 'long') matchesDuration = pkg.durationDays > 8;

        return matchesSearch && matchesCat && matchesBudget && matchesDuration;
      });

      // Sorting
      if (sortBy === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
      }

      if (filtered.length === 0) {
        packagesGrid.innerHTML = `
          <div class="col-12 text-center py-5">
            <div class="p-5 bg-white rounded-4 shadow-sm">
              <i class="fa-solid fa-suitcase-rolling fa-3x text-sunset-gold mb-3"></i>
              <h4 class="mb-2">No Tour Packages Found</h4>
              <p class="text-muted">No tour packages match your current filter preferences.</p>
              <button class="btn btn-primary-wn mt-3" onclick="resetPkgFilters()">Reset Filters</button>
            </div>
          </div>
        `;
        return;
      }

      packagesGrid.innerHTML = filtered.map((pkg, index) => {
        const isWish = StacklyData.isInWishlist(pkg.id);
        return `
          <div class="col-lg-4 col-md-6 mb-4 animate-card-fade" style="animation-delay: ${(index % 6) * 0.08}s;" data-aos="fade-up" data-aos-delay="${(index % 3) * 100}">
            <div class="wn-card hover-lift">
              <div class="wn-card-img-wrapper">
                <img src="${pkg.image}" alt="${pkg.title}" loading="lazy">
                <span class="card-badge gold">${pkg.badge || pkg.duration}</span>
                <button class="wishlist-btn ${isWish ? 'active' : ''}" data-id="${pkg.id}" aria-label="Save ${pkg.title} to wishlist">
                  <i class="fa-${isWish ? 'solid' : 'regular'} fa-heart"></i>
                </button>
              </div>
              <div class="wn-card-body">
                <div class="card-location">
                  <i class="fa-solid fa-location-dot"></i>
                  <span>${pkg.destinationName}</span>
                </div>
                <h3 class="card-title">
                  <a href="package-details.html?id=${pkg.id}">${pkg.title}</a>
                </h3>
                <div class="card-meta-list">
                  <div class="card-meta-item">
                    <i class="fa-solid fa-clock"></i>
                    <span>${pkg.duration}</span>
                  </div>
                  <div class="card-meta-item">
                    <i class="fa-solid fa-users"></i>
                    <span>${pkg.groupSize}</span>
                  </div>
                  <div class="card-meta-item">
                    <i class="fa-solid fa-star text-warning"></i>
                    <span class="fw-bold">${pkg.rating}</span>
                    <span class="text-muted">(${pkg.reviewsCount})</span>
                  </div>
                </div>
                <p class="text-muted small mb-3">${pkg.overview.substring(0, 110)}...</p>
                <div class="card-price-row">
                  <div>
                    <span class="card-price-label">Price per person</span>
                    <span class="card-price-value">$${pkg.price}</span>
                  </div>
                  <div class="d-flex gap-2">
                    <a href="package-details.html?id=${pkg.id}" class="btn btn-outline-wn btn-sm-wn">Details</a>
                    <a href="booking.html?pkg=${pkg.id}" class="btn btn-primary-wn btn-sm-wn">Book</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('');

      if (typeof AOS !== 'undefined') {
        if (typeof AOS.refreshHard === 'function') {
          AOS.refreshHard();
        } else {
          AOS.refresh();
        }
      }
    }

    window.resetPkgFilters = () => {
      if (packageSearch) packageSearch.value = '';
      if (pkgCategoryFilter) pkgCategoryFilter.value = '';
      if (pkgDurationFilter) pkgDurationFilter.value = '';
      if (pkgBudgetFilter) pkgBudgetFilter.value = '99999';
      if (pkgSortSelect) pkgSortSelect.value = 'featured';
      renderPackages();
    };

    if (packageSearch) packageSearch.addEventListener('input', renderPackages);
    if (pkgCategoryFilter) pkgCategoryFilter.addEventListener('change', renderPackages);
    if (pkgDurationFilter) pkgDurationFilter.addEventListener('change', renderPackages);
    if (pkgBudgetFilter) pkgBudgetFilter.addEventListener('change', renderPackages);
    if (pkgSortSelect) pkgSortSelect.addEventListener('change', renderPackages);

    renderPackages();
  }

  // 2. Package Details Page
  if (packageDetailsContainer) {
    const urlParams = new URLSearchParams(window.location.search);
    const pkgId = urlParams.get('id') || 'pkg-bali-paradise';
    const packages = StacklyData.getPackages();
    const pkg = packages.find(p => p.id === pkgId) || packages[0];
    const relatedPackages = packages.filter(p => p.id !== pkg.id).slice(0, 2);

    document.title = `${pkg.title} — Stackly Luxury Packages`;

    packageDetailsContainer.innerHTML = `
      <!-- Hero Banner -->
      <section class="hero-section" style="background-image: url('${pkg.image}'); min-height: 55vh;">
        <div class="hero-overlay"></div>
        <div class="container hero-content">
          <div class="row align-items-center">
            <div class="col-lg-8">
              <span class="hero-badge"><i class="fa-solid fa-compass"></i> ${pkg.category} &bull; ${pkg.duration}</span>
              <h1 class="hero-title">${pkg.title}</h1>
              <p class="hero-description"><i class="fa-solid fa-location-dot text-sunset-gold me-2"></i> ${pkg.destinationName}</p>
            </div>
            <div class="col-lg-4 text-lg-end">
              <div class="d-inline-block text-start p-3 bg-white text-dark rounded-4 shadow-lg">
                <span class="small text-muted d-block">Starting from</span>
                <span class="fs-2 fw-bold text-primary-blue">$${pkg.price}</span> <small class="text-muted">/ person</small>
                <div class="mt-2">
                  <a href="booking.html?pkg=${pkg.id}" class="btn btn-primary-wn w-100">
                    <i class="fa-solid fa-bolt"></i> Book This Tour
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Details Content -->
      <section class="section-padding">
        <div class="container">
          <div class="row g-4">
            <div class="col-lg-8">
              <!-- Tour Specs Bar -->
              <div class="bg-white p-4 rounded-4 shadow-sm mb-4">
                <div class="row g-3 text-center">
                  <div class="col-3 border-end">
                    <i class="fa-solid fa-clock text-sunset-gold fa-lg mb-1"></i>
                    <span class="d-block small text-muted">Duration</span>
                    <strong class="text-primary-blue">${pkg.duration}</strong>
                  </div>
                  <div class="col-3 border-end">
                    <i class="fa-solid fa-users text-sunset-gold fa-lg mb-1"></i>
                    <span class="d-block small text-muted">Group Size</span>
                    <strong class="text-primary-blue">${pkg.groupSize}</strong>
                  </div>
                  <div class="col-3 border-end">
                    <i class="fa-solid fa-star text-sunset-gold fa-lg mb-1"></i>
                    <span class="d-block small text-muted">Rating</span>
                    <strong class="text-primary-blue">${pkg.rating} (${pkg.reviewsCount})</strong>
                  </div>
                  <div class="col-3">
                    <i class="fa-solid fa-shield-halved text-sunset-gold fa-lg mb-1"></i>
                    <span class="d-block small text-muted">Guarantee</span>
                    <strong class="text-success">Best Price</strong>
                  </div>
                </div>
              </div>

              <!-- Overview -->
              <div class="bg-white p-4 p-md-5 rounded-4 shadow-sm mb-4">
                <h3 class="mb-3 text-primary-blue">Tour Overview</h3>
                <p class="lead text-muted">${pkg.overview}</p>
                <div class="alert alert-light border mt-4">
                  <div class="d-flex align-items-center gap-2 text-primary-blue fw-bold mb-1">
                    <i class="fa-solid fa-hotel text-sunset-gold"></i> Accommodations
                  </div>
                  <p class="small text-muted mb-0">${pkg.hotelDetails}</p>
                </div>
              </div>

              <!-- Day by Day Itinerary -->
              <div class="bg-white p-4 p-md-5 rounded-4 shadow-sm mb-4">
                <h3 class="mb-4 text-primary-blue">Day-by-Day Itinerary</h3>
                <div class="accordion wn-accordion" id="itineraryAccordion">
                  ${pkg.itinerary.map((item, idx) => `
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingDay${item.day}">
                        <button class="accordion-button ${idx !== 0 ? 'collapsed' : ''}" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDay${item.day}" aria-expanded="${idx === 0 ? 'true' : 'false'}">
                          <span class="badge bg-sunset-gold text-white me-3 px-3 py-2 rounded-pill">Day ${item.day}</span>
                          ${item.title}
                        </button>
                      </h2>
                      <div id="collapseDay${item.day}" class="accordion-collapse collapse ${idx === 0 ? 'show' : ''}" data-bs-parent="#itineraryAccordion">
                        <div class="accordion-body">
                          ${item.desc}
                        </div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Inclusions & Exclusions -->
              <div class="bg-white p-4 p-md-5 rounded-4 shadow-sm mb-4">
                <h3 class="mb-4 text-primary-blue">What is Included & Excluded</h3>
                <div class="row g-4">
                  <div class="col-md-6">
                    <h5 class="text-success mb-3"><i class="fa-solid fa-circle-check me-2"></i> Included Services</h5>
                    <ul class="list-unstyled">
                      ${pkg.included.map(inc => `
                        <li class="mb-2 small d-flex align-items-start gap-2 text-muted">
                          <i class="fa-solid fa-check text-success mt-1"></i>
                          <span>${inc}</span>
                        </li>
                      `).join('')}
                    </ul>
                  </div>
                  <div class="col-md-6">
                    <h5 class="text-danger mb-3"><i class="fa-solid fa-circle-xmark me-2"></i> Excluded Services</h5>
                    <ul class="list-unstyled">
                      ${pkg.excluded.map(exc => `
                        <li class="mb-2 small d-flex align-items-start gap-2 text-muted">
                          <i class="fa-solid fa-xmark text-danger mt-1"></i>
                          <span>${exc}</span>
                        </li>
                      `).join('')}
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Requirements & Policies -->
              <div class="bg-white p-4 p-md-5 rounded-4 shadow-sm mb-4">
                <h3 class="mb-3 text-primary-blue">Travel Requirements & Cancellation Policy</h3>
                <p class="text-muted small"><strong>Passport & Visas:</strong> Valid passport with minimum 6 months validity from date of departure required. Complimentary visa assistance is provided upon booking.</p>
                <p class="text-muted small"><strong>Cancellation Policy:</strong> Free cancellation up to 30 days prior to departure for a full refund minus a 5% administrative fee. Between 15-29 days, a 50% refund is applicable. Under 14 days, non-refundable.</p>
              </div>

              <!-- Related Packages -->
              <div>
                <h3 class="mb-4 text-primary-blue">You May Also Like</h3>
                <div class="row g-4">
                  ${relatedPackages.map(rel => `
                    <div class="col-md-6">
                      <div class="wn-card hover-lift">
                        <div class="wn-card-img-wrapper" style="height: 180px;">
                          <img src="${rel.image}" alt="${rel.title}">
                          <span class="card-badge gold">${rel.duration}</span>
                        </div>
                        <div class="wn-card-body">
                          <h5 class="card-title fs-6"><a href="package-details.html?id=${rel.id}">${rel.title}</a></h5>
                          <div class="card-price-row mt-3">
                            <span class="card-price-value fs-5">$${rel.price}</span>
                            <a href="package-details.html?id=${rel.id}" class="btn btn-outline-wn btn-sm-wn">View</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- Sticky Booking Card -->
            <div class="col-lg-4">
              <div class="sticky-info-card">
                <h4 class="mb-3 text-primary-blue">Book This Experience</h4>
                <div class="p-3 bg-warm-ivory rounded-3 mb-4">
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="text-muted small">Price per traveler</span>
                    <span class="fs-4 fw-bold text-primary-blue">$${pkg.price}</span>
                  </div>
                  <div class="small text-muted">All government taxes & service fees included.</div>
                </div>

                <form id="quickInquiryForm" class="mb-3">
                  <div class="mb-3">
                    <label class="form-label small fw-bold">Select Departure Date</label>
                    <input type="date" class="form-control" required min="${new Date().toISOString().split('T')[0]}">
                  </div>
                  <div class="mb-3">
                    <label class="form-label small fw-bold">Number of Travelers</label>
                    <select class="form-select" id="quickTravelersSelect">
                      <option value="1">1 Adult</option>
                      <option value="2" selected>2 Adults</option>
                      <option value="3">3 Adults</option>
                      <option value="4">4 Adults</option>
                      <option value="5">5+ Adults</option>
                    </select>
                  </div>
                  <a href="booking.html?pkg=${pkg.id}" class="btn btn-primary-wn w-100 py-2 mb-2">
                    <i class="fa-solid fa-arrow-right"></i> Proceed to Booking
                  </a>
                  <a href="contact.html" class="btn btn-outline-wn w-100 py-2">
                    <i class="fa-solid fa-envelope"></i> Inquire Custom Dates
                  </a>
                </form>

                <div class="border-top pt-3 text-center">
                  <span class="small text-muted"><i class="fa-solid fa-lock text-success me-1"></i> Instant Confirmation & 24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
});
