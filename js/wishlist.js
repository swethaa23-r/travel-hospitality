/**
 * Stackly - Customer Wishlist Management Script
 */

function renderWishlistItems() {
  const container = document.getElementById('wishlistItemsContainer');
  const countBadge = document.getElementById('wishlistCountBadge');
  if (!container) return;

  const wishlistIds = StacklyData.getWishlist();
  if (countBadge) countBadge.textContent = wishlistIds.length;

  if (wishlistIds.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="p-5 bg-white rounded-4 shadow-sm">
          <i class="fa-regular fa-heart fa-3x text-sunset-gold mb-3"></i>
          <h4 class="mb-2">Your Wishlist is Empty</h4>
          <p class="text-muted">Start bookmarking your dream destinations, tour packages, and luxury resorts.</p>
          <a href="../destinations.html" class="btn btn-primary-wn mt-3">
            <i class="fa-solid fa-compass"></i> Discover Destinations
          </a>
        </div>
      </div>
    `;
    return;
  }

  const allDestinations = StacklyData.getDestinations();
  const allPackages = StacklyData.getPackages();
  const allHotels = StacklyData.getHotels();

  let html = '';

  wishlistIds.forEach(id => {
    // Check if destination
    const dest = allDestinations.find(d => d.id === id);
    if (dest) {
      html += `
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="wn-card hover-lift h-100">
            <div class="wn-card-img-wrapper" style="height: 200px;">
              <img src="${dest.image}" alt="${dest.name}">
              <span class="card-badge">Destination</span>
              <button class="wishlist-btn active" data-id="${dest.id}" title="Remove from wishlist">
                <i class="fa-solid fa-heart"></i>
              </button>
            </div>
            <div class="wn-card-body">
              <h5 class="card-title fs-5 mb-1"><a href="../destination-details.html?id=${dest.id}">${dest.name}</a></h5>
              <p class="small text-muted mb-2"><i class="fa-solid fa-location-dot text-sunset-gold"></i> ${dest.country}</p>
              <div class="card-price-row mt-3">
                <span class="card-price-value fs-5">$${dest.price} <small class="text-muted fs-6 fw-normal">from</small></span>
                <a href="../destination-details.html?id=${dest.id}" class="btn btn-outline-wn btn-sm-wn">Explore</a>
              </div>
            </div>
          </div>
        </div>
      `;
      return;
    }

    // Check if package
    const pkg = allPackages.find(p => p.id === id);
    if (pkg) {
      html += `
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="wn-card hover-lift h-100">
            <div class="wn-card-img-wrapper" style="height: 200px;">
              <img src="${pkg.image}" alt="${pkg.title}">
              <span class="card-badge gold">Tour Package</span>
              <button class="wishlist-btn active" data-id="${pkg.id}" title="Remove from wishlist">
                <i class="fa-solid fa-heart"></i>
              </button>
            </div>
            <div class="wn-card-body">
              <h5 class="card-title fs-5 mb-1"><a href="../package-details.html?id=${pkg.id}">${pkg.title}</a></h5>
              <p class="small text-muted mb-2"><i class="fa-solid fa-clock text-sunset-gold"></i> ${pkg.duration}</p>
              <div class="card-price-row mt-3">
                <span class="card-price-value fs-5">$${pkg.price} <small class="text-muted fs-6 fw-normal">/ person</small></span>
                <a href="../package-details.html?id=${pkg.id}" class="btn btn-primary-wn btn-sm-wn">Book</a>
              </div>
            </div>
          </div>
        </div>
      `;
      return;
    }

    // Check if hotel
    const hotel = allHotels.find(h => h.id === id);
    if (hotel) {
      html += `
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="wn-card hover-lift h-100">
            <div class="wn-card-img-wrapper" style="height: 200px;">
              <img src="${hotel.image}" alt="${hotel.name}">
              <span class="card-badge">Resort</span>
              <button class="wishlist-btn active" data-id="${hotel.id}" title="Remove from wishlist">
                <i class="fa-solid fa-heart"></i>
              </button>
            </div>
            <div class="wn-card-body">
              <h5 class="card-title fs-5 mb-1"><a href="../hotel-details.html?id=${hotel.id}">${hotel.name}</a></h5>
              <p class="small text-muted mb-2"><i class="fa-solid fa-star text-warning"></i> ${hotel.starRating} Stars &bull; ${hotel.destinationName}</p>
              <div class="card-price-row mt-3">
                <span class="card-price-value fs-5">$${hotel.pricePerNight} <small class="text-muted fs-6 fw-normal">/ night</small></span>
                <a href="../hotel-details.html?id=${hotel.id}" class="btn btn-outline-wn btn-sm-wn">View</a>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  });

  container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
  renderWishlistItems();
});
