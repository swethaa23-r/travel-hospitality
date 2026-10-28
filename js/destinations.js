/**
 * Stackly - Destinations Listing and Details Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  const destinationsGrid = document.getElementById('destinationsGrid');
  const destinationSearchInput = document.getElementById('destSearch');
  const regionFilter = document.getElementById('regionFilter');
  const categoryFilter = document.getElementById('categoryFilter');
  const budgetFilter = document.getElementById('budgetFilter');
  const loadMoreBtn = document.getElementById('loadMoreDestinations');
  const destinationDetailsContainer = document.getElementById('destinationDetailsContainer');

  let currentLimit = 6;

  // 1. Destinations Listing Page Logic
  if (destinationsGrid) {
    const allDestinations = StacklyData.getDestinations();

    // Check for query parameters to prefill filters
    const urlParams = new URLSearchParams(window.location.search);
    const initialSearch = urlParams.get('search') || urlParams.get('dest') || '';
    const initialRegion = urlParams.get('region') || '';
    const initialCat = urlParams.get('cat') || '';

    if (destinationSearchInput && initialSearch) destinationSearchInput.value = initialSearch;
    if (regionFilter && initialRegion) regionFilter.value = initialRegion;
    if (categoryFilter && initialCat) categoryFilter.value = initialCat;

    function renderDestinations() {
      const searchTerm = destinationSearchInput ? destinationSearchInput.value.toLowerCase().trim() : '';
      const selectedRegion = regionFilter ? regionFilter.value : '';
      const selectedCategory = categoryFilter ? categoryFilter.value : '';
      const maxBudget = budgetFilter ? parseFloat(budgetFilter.value) || 99999 : 99999;

      const filtered = allDestinations.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm) || 
                              item.country.toLowerCase().includes(searchTerm) ||
                              item.description.toLowerCase().includes(searchTerm);
        const matchesRegion = !selectedRegion || item.region === selectedRegion;
        const matchesCategory = !selectedCategory || item.category === selectedCategory;
        const matchesBudget = item.price <= maxBudget;

        return matchesSearch && matchesRegion && matchesCategory && matchesBudget;
      });

      const displayList = filtered.slice(0, currentLimit);

      if (displayList.length === 0) {
        destinationsGrid.innerHTML = `
          <div class="col-12 text-center py-5">
            <div class="p-5 bg-white rounded-4 shadow-sm">
              <i class="fa-solid fa-compass fa-3x text-sunset-gold mb-3"></i>
              <h4 class="mb-2">No Destinations Found</h4>
              <p class="text-muted">Try adjusting your search criteria or resetting filters.</p>
              <button class="btn btn-primary-wn mt-3" onclick="resetDestFilters()">Reset Filters</button>
            </div>
          </div>
        `;
        if (loadMoreBtn) loadMoreBtn.style.display = 'none';
        return;
      }

      destinationsGrid.innerHTML = displayList.map((dest, index) => {
        const isWish = StacklyData.isInWishlist(dest.id);
        return `
          <div class="col-lg-4 col-md-6 mb-4 animate-card-fade" style="animation-delay: ${(index % 6) * 0.08}s;" data-aos="fade-up" data-aos-delay="${(index % 3) * 100}">
            <div class="wn-card hover-lift">
              <div class="wn-card-img-wrapper">
                <img src="${dest.image}" alt="${dest.name}, ${dest.country}" loading="lazy">
                <span class="card-badge ${dest.isTrending ? 'gold' : ''}">
                  ${dest.isTrending ? '<i class="fa-solid fa-fire me-1"></i> Trending' : dest.category}
                </span>
                <button class="wishlist-btn ${isWish ? 'active' : ''}" data-id="${dest.id}" aria-label="Save ${dest.name} to wishlist">
                  <i class="fa-${isWish ? 'solid' : 'regular'} fa-heart"></i>
                </button>
              </div>
              <div class="wn-card-body">
                <div class="card-location">
                  <i class="fa-solid fa-location-dot"></i>
                  <span>${dest.country} &bull; ${dest.region}</span>
                </div>
                <h3 class="card-title">
                  <a href="destination-details.html?id=${dest.id}">${dest.name}</a>
                </h3>
                <p class="text-muted small mb-3">${dest.description}</p>
                <div class="card-meta-list">
                  <div class="card-meta-item">
                    <i class="fa-solid fa-star text-warning"></i>
                    <span class="fw-bold text-dark">${dest.rating}</span>
                    <span class="text-muted">(${dest.reviewsCount})</span>
                  </div>
                  <div class="card-meta-item">
                    <i class="fa-solid fa-route"></i>
                    <span>${dest.experiencesCount} Experiences</span>
                  </div>
                </div>
                <div class="card-price-row">
                  <div>
                    <span class="card-price-label">Starting from</span>
                    <span class="card-price-value">$${dest.price}</span>
                  </div>
                  <a href="destination-details.html?id=${dest.id}" class="btn btn-outline-wn btn-sm-wn">
                    Explore <i class="fa-solid fa-arrow-right"></i>
                  </a>
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

      if (loadMoreBtn) {
        if (currentLimit >= filtered.length) {
          loadMoreBtn.style.display = 'none';
        } else {
          loadMoreBtn.style.display = 'inline-flex';
        }
      }
    }

    window.resetDestFilters = () => {
      if (destinationSearchInput) destinationSearchInput.value = '';
      if (regionFilter) regionFilter.value = '';
      if (categoryFilter) categoryFilter.value = '';
      if (budgetFilter) budgetFilter.value = '99999';
      currentLimit = 6;
      renderDestinations();
    };

    if (destinationSearchInput) {
      destinationSearchInput.addEventListener('input', () => {
        currentLimit = 6;
        renderDestinations();
      });
      destinationSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          currentLimit = 6;
          renderDestinations();
        }
      });
      const searchIcon = destinationSearchInput.closest('.input-group')?.querySelector('.input-group-text');
      if (searchIcon) {
        searchIcon.style.cursor = 'pointer';
        searchIcon.title = 'Click to search';
        searchIcon.addEventListener('click', () => {
          currentLimit = 6;
          renderDestinations();
        });
      }
    }
    if (regionFilter) regionFilter.addEventListener('change', renderDestinations);
    if (categoryFilter) categoryFilter.addEventListener('change', renderDestinations);
    if (budgetFilter) budgetFilter.addEventListener('change', renderDestinations);

    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        currentLimit += 6;
        renderDestinations();
      });
    }

    renderDestinations();
  }

  // 2. Destination Details Page Logic
  if (destinationDetailsContainer) {
    const urlParams = new URLSearchParams(window.location.search);
    const destId = urlParams.get('id') || 'dest-bali';
    const destinations = StacklyData.getDestinations();
    const dest = destinations.find(d => d.id === destId) || destinations[0];

    const packages = StacklyData.getPackages().filter(p => p.destinationId === dest.id);
    const hotels = StacklyData.getHotels().filter(h => h.destinationId === dest.id);

    // Update document title
    document.title = `${dest.name}, ${dest.country} — Luxury Guide & Packages | Stackly`;

    destinationDetailsContainer.innerHTML = `
      <!-- Hero Banner -->
      <section class="hero-section" style="background-image: url('${dest.bannerImage || dest.image}'); min-height: 60vh;">
        <div class="hero-overlay"></div>
        <div class="container hero-content">
          <div class="row align-items-center">
            <div class="col-lg-8">
              <span class="hero-badge"><i class="fa-solid fa-location-dot"></i> ${dest.country} &bull; ${dest.region}</span>
              <h1 class="hero-title">${dest.name} <span>Excellence</span></h1>
              <p class="hero-description text-white">${dest.description}</p>
            </div>
            <div class="col-lg-4 text-lg-end">
              <a href="booking.html?dest=${dest.id}" class="btn btn-primary-wn btn-lg px-4 shadow">
                <i class="fa-solid fa-calendar-check"></i> Book a Trip to ${dest.name}
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Destination Content & Sticky Info Card -->
      <section class="section-padding">
        <div class="container">
          <div class="row g-4">
            <div class="col-lg-8">
              <!-- Overview -->
              <div class="bg-white p-4 p-md-5 rounded-4 shadow-sm mb-4">
                <h3 class="mb-3 text-primary-blue">Destination Overview</h3>
                <p class="lead text-muted">${dest.overview}</p>
                <hr class="my-4">
                <div class="row g-3">
                  <div class="col-md-6">
                    <div class="p-3 bg-warm-ivory rounded-3">
                      <div class="d-flex align-items-center gap-2 text-primary-blue fw-bold mb-1">
                        <i class="fa-solid fa-calendar-day text-sunset-gold"></i> Best Time to Visit
                      </div>
                      <p class="small text-muted mb-0">${dest.bestTimeToVisit}</p>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="p-3 bg-warm-ivory rounded-3">
                      <div class="d-flex align-items-center gap-2 text-primary-blue fw-bold mb-1">
                        <i class="fa-solid fa-cloud-sun text-sunset-gold"></i> Climate & Weather
                      </div>
                      <p class="small text-muted mb-0">${dest.weather}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Popular Attractions -->
              <div class="bg-white p-4 p-md-5 rounded-4 shadow-sm mb-4">
                <h3 class="mb-3 text-primary-blue">Top Attractions & Landmarks</h3>
                <div class="row g-3">
                  ${dest.popularAttractions.map(attraction => `
                    <div class="col-md-6">
                      <div class="d-flex align-items-center gap-3 p-3 border rounded-3 bg-light">
                        <div class="feature-icon-wrapper p-2 bg-sunset-gold-light text-sunset-gold rounded mb-0" style="width:40px;height:40px;font-size:1.1rem;">
                          <i class="fa-solid fa-check"></i>
                        </div>
                        <span class="fw-bold text-dark">${attraction}</span>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Culture & Food -->
              <div class="bg-white p-4 p-md-5 rounded-4 shadow-sm mb-4">
                <h3 class="mb-3 text-primary-blue">Culture, Gastronomy & Traditions</h3>
                <p class="text-muted">${dest.localCulture}</p>
                <h5 class="mt-4 mb-3 text-primary-blue">Curated Local Experiences:</h5>
                <ul class="list-unstyled">
                  ${dest.activities.map(act => `
                    <li class="mb-2 d-flex align-items-center gap-2 text-dark">
                      <i class="fa-solid fa-compass text-sunset-gold"></i> ${act}
                    </li>
                  `).join('')}
                </ul>
              </div>

              <!-- Available Tour Packages -->
              <div class="mb-5">
                <h3 class="mb-4 text-primary-blue">Available Tour Packages in ${dest.name}</h3>
                <div class="row g-4">
                  ${packages.length > 0 ? packages.map(pkg => `
                    <div class="col-md-6">
                      <div class="wn-card hover-lift h-100">
                        <div class="wn-card-img-wrapper" style="height: 180px;">
                          <img src="${pkg.image}" alt="${pkg.title}">
                          <span class="card-badge gold">${pkg.duration}</span>
                        </div>
                        <div class="wn-card-body">
                          <h5 class="card-title fs-6"><a href="package-details.html?id=${pkg.id}">${pkg.title}</a></h5>
                          <div class="card-price-row mt-3">
                            <span class="card-price-value fs-5">$${pkg.price} <small class="text-muted fs-6 fw-normal">/ person</small></span>
                            <a href="package-details.html?id=${pkg.id}" class="btn btn-outline-wn btn-sm-wn">Details</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  `).join('') : '<div class="col-12"><p class="text-muted">Contact our travel designers for customized private departures to this destination.</p></div>'}
                </div>
              </div>

              <!-- Luxury Accommodations -->
              <div>
                <h3 class="mb-4 text-primary-blue">Luxury Accommodations in ${dest.name}</h3>
                <div class="row g-4">
                  ${hotels.length > 0 ? hotels.map(hotel => `
                    <div class="col-md-6">
                      <div class="wn-card hover-lift h-100">
                        <div class="wn-card-img-wrapper" style="height: 180px;">
                          <img src="${hotel.image}" alt="${hotel.name}">
                          <span class="card-badge"><i class="fa-solid fa-star text-warning"></i> ${hotel.starRating} Stars</span>
                        </div>
                        <div class="wn-card-body">
                          <h5 class="card-title fs-6"><a href="hotel-details.html?id=${hotel.id}">${hotel.name}</a></h5>
                          <p class="small text-muted mb-2"><i class="fa-solid fa-location-dot text-sunset-gold"></i> ${hotel.destinationName}</p>
                          <div class="card-price-row mt-3">
                            <span class="card-price-value fs-5">$${hotel.pricePerNight} <small class="text-muted fs-6 fw-normal">/ night</small></span>
                            <a href="hotel-details.html?id=${hotel.id}" class="btn btn-outline-wn btn-sm-wn">View Rooms</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  `).join('') : '<div class="col-12"><p class="text-muted">Partner luxury villas and boutique hotels are available on request.</p></div>'}
                </div>
              </div>
            </div>

            <!-- Sticky Sidebar -->
            <div class="col-lg-4">
              <div class="sticky-info-card">
                <div class="d-flex align-items-center justify-content-between mb-3">
                  <div>
                    <span class="text-muted small">Starting Price</span>
                    <h3 class="card-price-value mb-0 text-sunset-gold">$${dest.price}</h3>
                  </div>
                  <div class="text-end">
                    <div class="d-flex align-items-center gap-1 text-primary-blue fw-bold">
                      <i class="fa-solid fa-star text-sunset-gold"></i> ${dest.rating}
                    </div>
                    <span class="small text-muted">${dest.reviewsCount} verified reviews</span>
                  </div>
                </div>

                <hr class="my-3">

                <ul class="list-unstyled mb-4">
                  <li class="py-2 border-bottom d-flex justify-content-between small">
                    <span class="text-muted"><i class="fa-solid fa-earth-americas me-2 text-sunset-gold"></i> Region</span>
                    <span class="fw-bold">${dest.region}</span>
                  </li>
                  <li class="py-2 border-bottom d-flex justify-content-between small">
                    <span class="text-muted"><i class="fa-solid fa-tags me-2 text-sunset-gold"></i> Travel Style</span>
                    <span class="fw-bold">${dest.category}</span>
                  </li>
                  <li class="py-2 border-bottom d-flex justify-content-between small">
                    <span class="text-muted"><i class="fa-solid fa-shield-halved me-2 text-sunset-gold"></i> Safety Rating</span>
                    <span class="fw-bold text-success">Grade A (Verified)</span>
                  </li>
                  <li class="py-2 d-flex justify-content-between small">
                    <span class="text-muted"><i class="fa-solid fa-user-tie me-2 text-sunset-gold"></i> Concierge</span>
                    <span class="fw-bold">24/7 Dedicated</span>
                  </li>
                </ul>

                <a href="booking.html?dest=${dest.id}" class="btn btn-primary-wn w-100 mb-2">
                  <i class="fa-solid fa-calendar-check"></i> Plan Trip to ${dest.name}
                </a>
                <a href="packages.html?dest=${dest.id}" class="btn btn-outline-wn w-100">
                  <i class="fa-solid fa-suitcase"></i> View All Packages
                </a>

                <div class="p-3 bg-warm-ivory rounded-3 mt-4 text-center">
                  <i class="fa-solid fa-headset text-sunset-gold fa-2x mb-2"></i>
                  <h6 class="mb-1 text-primary-blue">Need Custom Itinerary?</h6>
                  <p class="small text-muted mb-2">Our destination specialists will craft your dream itinerary.</p>
                  <a href="contact.html" class="fw-bold text-primary-blue small">Talk with a Specialist &rarr;</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
});
