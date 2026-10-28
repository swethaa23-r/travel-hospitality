/**
 * Stackly - Administrator Dashboard & Management Suite Script
 * Chart.js Integration, LocalStorage CRUD Operations, and Confirmations
 */

document.addEventListener('DOMContentLoaded', () => {
  // Ensure default datasets exist
  StacklyData.init();

  // 1. Chart.js Dashboard Charts (on admin-dashboard.html)
  const statusChartCanvas = document.getElementById('bookingStatusChart');
  const monthlyChartCanvas = document.getElementById('monthlyBookingsChart');

  if (statusChartCanvas && typeof Chart !== 'undefined') {
    const bookings = StacklyData.getBookings();
    const confirmedCount = bookings.filter(b => b.status === 'Confirmed').length;
    const completedCount = bookings.filter(b => b.status === 'Completed').length;
    const cancelledCount = bookings.filter(b => b.status === 'Cancelled').length;

    new Chart(statusChartCanvas, {
      type: 'doughnut',
      data: {
        labels: ['Confirmed', 'Completed', 'Cancelled'],
        datasets: [{
          data: [confirmedCount, completedCount, cancelledCount],
          backgroundColor: ['#10b981', '#123B52', '#ef4444'],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { font: { family: 'DM Sans', size: 12 } }
          }
        }
      }
    });
  }

  if (monthlyChartCanvas && typeof Chart !== 'undefined') {
    new Chart(monthlyChartCanvas, {
      type: 'bar',
      data: {
        labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Bookings Volume ($k)',
          data: [14.2, 19.8, 28.5, 34.0, 22.4, 38.6, 29.1, 44.5],
          backgroundColor: '#E9A23B',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: '#f1f5f9' }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  }

  // 2. Admin Metric Counters
  const adminStatBookings = document.getElementById('adminStatBookings');
  const adminStatCustomers = document.getElementById('adminStatCustomers');
  const adminStatPackages = document.getElementById('adminStatPackages');
  const adminStatHotels = document.getElementById('adminStatHotels');

  if (adminStatBookings) adminStatBookings.textContent = StacklyData.getBookings().length;
  if (adminStatCustomers) adminStatCustomers.textContent = StacklyData.getUsers().length;
  if (adminStatPackages) adminStatPackages.textContent = StacklyData.getPackages().length;
  if (adminStatHotels) adminStatHotels.textContent = StacklyData.getHotels().length;

  // 3. Manage Bookings Page Logic
  const adminBookingsTableBody = document.getElementById('adminBookingsTableBody');
  const adminBookingStatusFilter = document.getElementById('adminBookingStatusFilter');

  if (adminBookingsTableBody) {
    function renderAdminBookings() {
      const statusFilter = adminBookingStatusFilter ? adminBookingStatusFilter.value : '';
      let list = StacklyData.getBookings();

      if (statusFilter) {
        list = list.filter(b => b.status === statusFilter);
      }

      if (list.length === 0) {
        adminBookingsTableBody.innerHTML = `<tr><td colspan="7" class="text-center py-4 text-muted">No booking records found.</td></tr>`;
        return;
      }

      adminBookingsTableBody.innerHTML = list.map(b => `
        <tr>
          <td><span class="fw-bold text-primary-blue">${b.id}</span></td>
          <td>
            <strong>${b.guestName}</strong>
            <span class="d-block small text-muted">${b.guestEmail}</span>
          </td>
          <td>${b.destination}</td>
          <td>${b.checkInDate}</td>
          <td>$${b.totalPrice}</td>
          <td>
            <span class="status-badge ${b.status === 'Confirmed' ? 'status-confirmed' : b.status === 'Completed' ? 'status-completed' : 'status-cancelled'}">
              ${b.status}
            </span>
          </td>
          <td>
            <button class="admin-action-btn delete" onclick="deleteAdminBooking('${b.id}')" title="Delete Booking">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      `).join('');
    }

    renderAdminBookings();
    if (adminBookingStatusFilter) adminBookingStatusFilter.addEventListener('change', renderAdminBookings);

    window.deleteAdminBooking = (id) => {
      confirmDelete(`Delete reservation ${id}?`, () => {
        let list = StacklyData.getBookings().filter(b => b.id !== id);
        StacklyData.saveBookings(list);
        renderAdminBookings();
        showWnNotification('Record Deleted', `Booking ${id} was deleted.`, 'info');
      });
    };
  }

  // 4. Manage Destinations Page Logic
  const adminDestTableBody = document.getElementById('adminDestTableBody');
  const addDestForm = document.getElementById('addDestinationForm');

  if (adminDestTableBody) {
    function renderAdminDestinations() {
      const list = StacklyData.getDestinations();
      adminDestTableBody.innerHTML = list.map(d => `
        <tr>
          <td>
            <img src="${d.image}" alt="${d.name}" class="table-img-thumb">
          </td>
          <td>
            <strong>${d.name}</strong>
            <span class="d-block small text-muted">${d.region}</span>
          </td>
          <td>${d.country}</td>
          <td><span class="badge bg-light text-dark border">${d.category}</span></td>
          <td><span class="fw-bold text-primary-blue">$${d.price}</span></td>
          <td><i class="fa-solid fa-star text-warning"></i> ${d.rating}</td>
          <td>
            <button class="admin-action-btn delete" onclick="deleteAdminDest('${d.id}')" title="Delete Destination">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      `).join('');
    }

    renderAdminDestinations();

    window.deleteAdminDest = (id) => {
      confirmDelete('Delete this destination record?', () => {
        let list = StacklyData.getDestinations().filter(d => d.id !== id);
        StacklyData.saveDestinations(list);
        renderAdminDestinations();
        showWnNotification('Deleted', 'Destination deleted successfully.', 'info');
      });
    };

    if (addDestForm) {
      addDestForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('destName').value.trim();
        const country = document.getElementById('destCountry').value.trim();
        const region = document.getElementById('destRegion').value;
        const category = document.getElementById('destCategory').value;
        const price = parseFloat(document.getElementById('destPrice').value) || 999;
        const image = document.getElementById('destImage').value.trim() || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80';
        const description = document.getElementById('destDesc').value.trim() || 'A spectacular travel haven.';

        const newDest = {
          id: `dest-${Date.now()}`,
          name, country, region, category, price,
          rating: 5.0, reviewsCount: 1, experiencesCount: 12,
          image,
          description,
          overview: description,
          bestTimeToVisit: 'Year-round',
          weather: 'Temperate and pleasant',
          popularAttractions: ['City Center', 'Natural Reserve', 'Coastal Promenade'],
          localCulture: 'Vibrant local markets and warm hospitality.',
          activities: ['Walking Tour', 'Photography Safari', 'Gastronomy Trail'],
          isFeatured: false,
          isTrending: true
        };

        const list = StacklyData.getDestinations();
        list.unshift(newDest);
        StacklyData.saveDestinations(list);

        const modalEl = document.getElementById('addDestinationModal');
        if (modalEl) {
          bootstrap.Modal.getInstance(modalEl)?.hide();
        }
        addDestForm.reset();
        renderAdminDestinations();
        showWnNotification('Destination Added', `${name} has been added to live listings!`, 'success');
      });
    }
  }

  // 5. Manage Packages Page Logic
  const adminPackagesTableBody = document.getElementById('adminPackagesTableBody');
  const addPackageForm = document.getElementById('addPackageForm');

  if (adminPackagesTableBody) {
    function renderAdminPackages() {
      const list = StacklyData.getPackages();
      adminPackagesTableBody.innerHTML = list.map(p => `
        <tr>
          <td><img src="${p.image}" alt="${p.title}" class="table-img-thumb"></td>
          <td>
            <strong>${p.title}</strong>
            <span class="d-block small text-muted">${p.duration}</span>
          </td>
          <td>${p.destinationName}</td>
          <td><span class="badge bg-sunset-gold text-white">${p.category}</span></td>
          <td class="fw-bold">$${p.price}</td>
          <td><i class="fa-solid fa-star text-warning"></i> ${p.rating}</td>
          <td>
            <button class="admin-action-btn delete" onclick="deleteAdminPkg('${p.id}')" title="Delete Package">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      `).join('');
    }

    renderAdminPackages();

    window.deleteAdminPkg = (id) => {
      confirmDelete('Delete this tour package?', () => {
        let list = StacklyData.getPackages().filter(p => p.id !== id);
        StacklyData.savePackages(list);
        renderAdminPackages();
        showWnNotification('Package Deleted', 'Tour package removed.', 'info');
      });
    };

    if (addPackageForm) {
      addPackageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('pkgTitle').value.trim();
        const destName = document.getElementById('pkgDestName').value.trim();
        const category = document.getElementById('pkgCategory').value;
        const duration = document.getElementById('pkgDuration').value.trim();
        const price = parseFloat(document.getElementById('pkgPrice').value) || 1200;
        const image = document.getElementById('pkgImage').value.trim() || 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80';

        const newPkg = {
          id: `pkg-${Date.now()}`,
          title,
          destinationId: 'dest-bali',
          destinationName: destName,
          category,
          duration,
          durationDays: 7,
          groupSize: 'Max 12',
          price,
          rating: 5.0,
          reviewsCount: 1,
          badge: 'New Tour',
          image,
          overview: 'An exquisite hand-crafted luxury itinerary.',
          included: ['5-Star Hotel Accommodations', 'Daily Breakfast', 'Private Chauffeur'],
          excluded: ['International Flights', 'Travel Insurance'],
          hotelDetails: 'Luxury Boutique Stays',
          itinerary: [{ day: 1, title: 'Arrival & Welcome Dinner', desc: 'Private transfer from airport to resort.' }]
        };

        const list = StacklyData.getPackages();
        list.unshift(newPkg);
        StacklyData.savePackages(list);

        const modalEl = document.getElementById('addPackageModal');
        if (modalEl) bootstrap.Modal.getInstance(modalEl)?.hide();
        addPackageForm.reset();
        renderAdminPackages();
        showWnNotification('Package Created', `${title} is now available for booking!`, 'success');
      });
    }
  }

  // 6. Manage Hotels Page Logic
  const adminHotelsTableBody = document.getElementById('adminHotelsTableBody');
  if (adminHotelsTableBody) {
    function renderAdminHotels() {
      const list = StacklyData.getHotels();
      adminHotelsTableBody.innerHTML = list.map(h => `
        <tr>
          <td><img src="${h.image}" alt="${h.name}" class="table-img-thumb"></td>
          <td>
            <strong>${h.name}</strong>
            <span class="d-block small text-muted">${h.destinationName}</span>
          </td>
          <td>${h.starRating} Stars</td>
          <td class="fw-bold">$${h.pricePerNight} / night</td>
          <td>${h.guestRating} (${h.reviewsCount})</td>
          <td>
            <button class="admin-action-btn delete" onclick="deleteAdminHotel('${h.id}')" title="Delete Hotel">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      `).join('');
    }

    renderAdminHotels();

    window.deleteAdminHotel = (id) => {
      confirmDelete('Delete hotel property listing?', () => {
        let list = StacklyData.getHotels().filter(h => h.id !== id);
        StacklyData.saveHotels(list);
        renderAdminHotels();
        showWnNotification('Hotel Removed', 'Hotel listing deleted.', 'info');
      });
    };
  }

  // 7. Manage Reviews Page Logic
  const adminReviewsTableBody = document.getElementById('adminReviewsTableBody');
  if (adminReviewsTableBody) {
    function renderAdminReviews() {
      const list = StacklyData.getReviews();
      adminReviewsTableBody.innerHTML = list.map(r => `
        <tr>
          <td><strong>${r.author}</strong></td>
          <td>${r.destination}</td>
          <td><i class="fa-solid fa-star text-warning"></i> ${r.rating}</td>
          <td><small class="text-muted">${r.comment}</small></td>
          <td>
            <span class="badge ${r.status === 'Approved' ? 'bg-success' : 'bg-warning text-dark'}">
              ${r.status}
            </span>
          </td>
          <td>
            <div class="d-flex gap-1">
              ${r.status !== 'Approved' ? `
                <button class="admin-action-btn" onclick="toggleReviewStatus('${r.id}', 'Approved')" title="Approve">
                  <i class="fa-solid fa-check text-success"></i>
                </button>
              ` : `
                <button class="admin-action-btn" onclick="toggleReviewStatus('${r.id}', 'Pending')" title="Mark Pending">
                  <i class="fa-solid fa-clock text-warning"></i>
                </button>
              `}
              <button class="admin-action-btn delete" onclick="deleteReview('${r.id}')" title="Delete">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      `).join('');
    }

    renderAdminReviews();

    window.toggleReviewStatus = (id, newStatus) => {
      const list = StacklyData.getReviews();
      const target = list.find(r => r.id === id);
      if (target) {
        target.status = newStatus;
        StacklyData.saveReviews(list);
        renderAdminReviews();
        showWnNotification('Status Updated', `Review marked as ${newStatus}.`, 'info');
      }
    };

    window.deleteReview = (id) => {
      confirmDelete('Delete this guest review?', () => {
        let list = StacklyData.getReviews().filter(r => r.id !== id);
        StacklyData.saveReviews(list);
        renderAdminReviews();
        showWnNotification('Review Deleted', 'Review removed.', 'info');
      });
    };
  }

  // Helper delete confirmation
  function confirmDelete(msg, onConfirm) {
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        title: 'Confirm Deletion',
        text: msg,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#123B52',
        confirmButtonText: 'Yes, Delete'
      }).then((result) => {
        if (result.isConfirmed) {
          onConfirm();
        }
      });
    } else {
      if (confirm(msg)) {
        onConfirm();
      }
    }
  }
});
