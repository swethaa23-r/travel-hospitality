/**
 * Stackly - Hotels Listing and Hotel Details Script
 */

document.addEventListener('DOMContentLoaded', () => {
  const hotelsGrid = document.getElementById('hotelsGrid');
  const hotelSearch = document.getElementById('hotelSearch');
  const hotelStarFilter = document.getElementById('hotelStarFilter');
  const hotelPriceFilter = document.getElementById('hotelPriceFilter');
  const hotelSortSelect = document.getElementById('hotelSortSelect');
  const hotelDetailsContainer = document.getElementById('hotelDetailsContainer');

  // 1. Hotels Listing Page
  if (hotelsGrid) {
    const allHotels = StacklyData.getHotels();

    function renderHotels() {
      const searchTerm = hotelSearch ? hotelSearch.value.toLowerCase().trim() : '';
      const selectedStar = hotelStarFilter ? hotelStarFilter.value : '';
      const maxPrice = hotelPriceFilter ? parseFloat(hotelPriceFilter.value) || 99999 : 99999;
      const sortBy = hotelSortSelect ? hotelSortSelect.value : 'recommended';

      let filtered = allHotels.filter(hotel => {
        const matchesSearch = hotel.name.toLowerCase().includes(searchTerm) ||
                              hotel.destinationName.toLowerCase().includes(searchTerm) ||
                              hotel.description.toLowerCase().includes(searchTerm);
        const matchesStar = !selectedStar || hotel.starRating.toString() === selectedStar;
        const matchesPrice = hotel.pricePerNight <= maxPrice;

        return matchesSearch && matchesStar && matchesPrice;
      });

      // Sorting
      if (sortBy === 'price-low') {
        filtered.sort((a, b) => a.pricePerNight - b.pricePerNight);
      } else if (sortBy === 'price-high') {
        filtered.sort((a, b) => b.pricePerNight - a.pricePerNight);
      } else if (sortBy === 'rating') {
        filtered.sort((a, b) => b.guestRating - a.guestRating);
      }

      if (filtered.length === 0) {
        hotelsGrid.innerHTML = `
          <div class="col-12 text-center py-5">
            <div class="p-5 bg-white rounded-4 shadow-sm">
              <i class="fa-solid fa-hotel fa-3x text-sunset-gold mb-3"></i>
              <h4 class="mb-2">No Hotels Found</h4>
              <p class="text-muted">Adjust your search parameters or price thresholds.</p>
              <button class="btn btn-primary-wn mt-3" onclick="resetHotelFilters()">Reset Filters</button>
            </div>
          </div>
        `;
        return;
      }

      hotelsGrid.innerHTML = filtered.map(hotel => {
        const isWish = StacklyData.isInWishlist(hotel.id);
        return `
          <div class="col-lg-6 mb-4">
            <div class="wn-card hover-lift h-100 flex-md-row">
              <div class="wn-card-img-wrapper col-md-5" style="height: auto; min-height: 220px;">
                <img src="${hotel.image}" alt="${hotel.name}" loading="lazy" style="height: 100%;">
                <span class="card-badge gold">
                  <i class="fa-solid fa-star"></i> ${hotel.starRating} Stars
                </span>
                <button class="wishlist-btn ${isWish ? 'active' : ''}" data-id="${hotel.id}" aria-label="Save ${hotel.name} to wishlist">
                  <i class="fa-${isWish ? 'solid' : 'regular'} fa-heart"></i>
                </button>
              </div>
              <div class="wn-card-body col-md-7 d-flex flex-column justify-content-between">
                <div>
                  <div class="card-location">
                    <i class="fa-solid fa-location-dot"></i>
                    <span>${hotel.destinationName}</span>
                  </div>
                  <h3 class="card-title fs-5 mb-1">
                    <a href="hotel-details.html?id=${hotel.id}">${hotel.name}</a>
                  </h3>
                  <div class="d-flex align-items-center gap-2 mb-2">
                    <span class="badge bg-primary-blue text-white px-2 py-1">${hotel.guestRating}</span>
                    <span class="small text-muted fw-bold">Superb</span>
                    <span class="small text-muted">(${hotel.reviewsCount} reviews)</span>
                  </div>
                  <p class="text-muted small mb-3">${hotel.description.substring(0, 95)}...</p>
                  <div class="d-flex flex-wrap gap-1 mb-3">
                    ${hotel.amenities.slice(0, 3).map(a => `<span class="badge bg-warm-ivory text-primary-blue border small">${a}</span>`).join('')}
                  </div>
                </div>
                <div class="card-price-row mt-2 pt-2 border-top">
                  <div>
                    <span class="card-price-label">Starting from</span>
                    <span class="card-price-value fs-5">$${hotel.pricePerNight} <small class="text-muted fs-6 fw-normal">/ night</small></span>
                  </div>
                  <a href="hotel-details.html?id=${hotel.id}" class="btn btn-outline-wn btn-sm-wn">
                    View Hotel
                  </a>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    window.resetHotelFilters = () => {
      if (hotelSearch) hotelSearch.value = '';
      if (hotelStarFilter) hotelStarFilter.value = '';
      if (hotelPriceFilter) hotelPriceFilter.value = '99999';
      if (hotelSortSelect) hotelSortSelect.value = 'recommended';
      renderHotels();
    };

    if (hotelSearch) hotelSearch.addEventListener('input', renderHotels);
    if (hotelStarFilter) hotelStarFilter.addEventListener('change', renderHotels);
    if (hotelPriceFilter) hotelPriceFilter.addEventListener('change', renderHotels);
    if (hotelSortSelect) hotelSortSelect.addEventListener('change', renderHotels);

    renderHotels();
  }

  // 2. Hotel Details Page
  if (hotelDetailsContainer) {
    const urlParams = new URLSearchParams(window.location.search);
    const hotelId = urlParams.get('id') || 'hotel-royal-azure-bali';
    const hotels = StacklyData.getHotels();
    const hotel = hotels.find(h => h.id === hotelId) || hotels[0];
    const relatedHotels = hotels.filter(h => h.id !== hotel.id).slice(0, 2);

    document.title = `${hotel.name} — Luxury Resorts | Stackly`;

    hotelDetailsContainer.innerHTML = `
      <!-- Hero Banner -->
      <section class="hero-section" style="background-image: url('${hotel.image}'); min-height: 55vh;">
        <div class="hero-overlay"></div>
        <div class="container hero-content">
          <div class="row align-items-center">
            <div class="col-lg-8">
              <span class="hero-badge">
                <i class="fa-solid fa-star text-warning"></i> ${hotel.starRating}-Star Luxury Property
              </span>
              <h1 class="hero-title">${hotel.name}</h1>
              <p class="hero-description"><i class="fa-solid fa-location-dot text-sunset-gold me-2"></i> ${hotel.address}</p>
            </div>
            <div class="col-lg-4 text-lg-end">
              <div class="d-inline-block text-start p-3 bg-white text-dark rounded-4 shadow-lg">
                <span class="small text-muted d-block">From</span>
                <span class="fs-2 fw-bold text-primary-blue">$${hotel.pricePerNight}</span> <small class="text-muted">/ night</small>
                <div class="mt-2">
                  <a href="#roomSelectionSection" class="btn btn-primary-wn w-100">
                    <i class="fa-solid fa-bed"></i> Choose a Room
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Details & Booking Layout -->
      <section class="section-padding">
        <div class="container">
          <div class="row g-4">
            <div class="col-lg-8">
              <!-- Gallery Mosaic -->
              <div class="bg-white p-4 rounded-4 shadow-sm mb-4">
                <h3 class="mb-3 text-primary-blue">Property Gallery</h3>
                <div class="row g-2">
                  <div class="col-md-8">
                    <img src="${hotel.gallery[0] || hotel.image}" class="rounded-3 w-100" style="height: 340px; object-fit: cover;" alt="${hotel.name}">
                  </div>
                  <div class="col-md-4 d-flex flex-column gap-2">
                    <img src="${hotel.gallery[1] || hotel.image}" class="rounded-3 w-100" style="height: 165px; object-fit: cover;" alt="${hotel.name}">
                    <img src="${hotel.gallery[2] || hotel.gallery[0]}" class="rounded-3 w-100" style="height: 165px; object-fit: cover;" alt="${hotel.name}">
                  </div>
                </div>
              </div>

              <!-- Description & Amenities -->
              <div class="bg-white p-4 p-md-5 rounded-4 shadow-sm mb-4">
                <h3 class="mb-3 text-primary-blue">About the Property</h3>
                <p class="lead text-muted">${hotel.description}</p>
                <hr class="my-4">
                <h4 class="mb-3 text-primary-blue">Featured Amenities</h4>
                <div class="row g-3">
                  ${hotel.amenities.map(amenity => `
                    <div class="col-md-6">
                      <div class="d-flex align-items-center gap-2 p-2 border rounded-3 bg-light">
                        <i class="fa-solid fa-circle-check text-sunset-gold"></i>
                        <span class="text-dark small fw-bold">${amenity}</span>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Available Room Types -->
              <div class="bg-white p-4 p-md-5 rounded-4 shadow-sm mb-4" id="roomSelectionSection">
                <h3 class="mb-4 text-primary-blue">Available Room Types</h3>
                <div class="d-flex flex-column gap-4">
                  ${hotel.rooms.map(room => `
                    <div class="border rounded-4 p-3 d-flex flex-column flex-md-row gap-4 align-items-center">
                      <img src="${room.image}" alt="${room.name}" class="rounded-3" style="width: 200px; height: 140px; object-fit: cover;">
                      <div class="flex-grow-1">
                        <h5 class="text-primary-blue mb-1">${room.name}</h5>
                        <div class="d-flex gap-3 text-muted small mb-2">
                          <span><i class="fa-solid fa-ruler-combined text-sunset-gold me-1"></i> ${room.size}</span>
                          <span><i class="fa-solid fa-bed text-sunset-gold me-1"></i> ${room.bed}</span>
                          <span><i class="fa-solid fa-user-group text-sunset-gold me-1"></i> Max ${room.guests} Guests</span>
                        </div>
                        <span class="badge bg-success-subtle text-success border border-success-subtle">Complimentary Breakfast Included</span>
                      </div>
                      <div class="text-md-end">
                        <span class="fs-4 fw-bold text-primary-blue d-block">$${room.price}</span>
                        <span class="text-muted small d-block mb-2">per night</span>
                        <a href="booking.html?hotel=${hotel.id}&room=${room.id}" class="btn btn-primary-wn btn-sm-wn">
                          Reserve Room
                        </a>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Policies -->
              <div class="bg-white p-4 p-md-5 rounded-4 shadow-sm mb-4">
                <h3 class="mb-3 text-primary-blue">Hotel Policies</h3>
                <div class="row g-3">
                  <div class="col-md-6">
                    <strong class="d-block text-dark small"><i class="fa-solid fa-arrow-right-to-bracket text-sunset-gold me-1"></i> Check-in:</strong>
                    <span class="text-muted small">${hotel.policies.checkIn}</span>
                  </div>
                  <div class="col-md-6">
                    <strong class="d-block text-dark small"><i class="fa-solid fa-arrow-right-from-bracket text-sunset-gold me-1"></i> Check-out:</strong>
                    <span class="text-muted small">${hotel.policies.checkOut}</span>
                  </div>
                  <div class="col-12 mt-3">
                    <strong class="d-block text-dark small"><i class="fa-solid fa-ban text-sunset-gold me-1"></i> Cancellation:</strong>
                    <span class="text-muted small">${hotel.policies.cancellation}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sticky Availability Card -->
            <div class="col-lg-4">
              <div class="sticky-info-card">
                <h4 class="mb-3 text-primary-blue">Check Availability</h4>
                <form id="hotelAvailForm">
                  <div class="mb-3">
                    <label class="form-label small fw-bold">Check-in Date</label>
                    <input type="date" class="form-control" required min="${new Date().toISOString().split('T')[0]}">
                  </div>
                  <div class="mb-3">
                    <label class="form-label small fw-bold">Check-out Date</label>
                    <input type="date" class="form-control" required min="${new Date().toISOString().split('T')[0]}">
                  </div>
                  <div class="mb-3">
                    <label class="form-label small fw-bold">Guests</label>
                    <select class="form-select">
                      <option value="1">1 Adult</option>
                      <option value="2" selected>2 Adults</option>
                      <option value="3">3 Adults</option>
                      <option value="4">4 Adults / Family</option>
                    </select>
                  </div>
                  <a href="#roomSelectionSection" class="btn btn-primary-wn w-100 py-2">
                    <i class="fa-solid fa-magnifying-glass"></i> Check Rates
                  </a>
                </form>

                <hr class="my-4">
                <div class="p-3 bg-warm-ivory rounded-3 text-center">
                  <i class="fa-solid fa-crown text-sunset-gold fa-2x mb-2"></i>
                  <h6 class="mb-1 text-primary-blue">VIP Concierge Service</h6>
                  <p class="small text-muted mb-0">Includes private airport transfer and welcome champagne.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
});
