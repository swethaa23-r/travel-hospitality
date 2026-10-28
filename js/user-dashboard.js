/**
 * Stackly - Customer Dashboard & Booking Management Script
 */

document.addEventListener('DOMContentLoaded', () => {
  const currentUser = StacklyData.getCurrentUser() || {
    name: 'Swetha Ramesh',
    email: 'swetha.ramesh@gmail.com',
    phone: '+1 (555) 382-9910',
    preferredDestinations: 'Tropical Beaches, Mountain Trekking'
  };

  // Sync profile display across user pages
  document.querySelectorAll('.user-display-name').forEach(el => el.textContent = currentUser.name);
  document.querySelectorAll('.user-display-email').forEach(el => el.textContent = currentUser.email);

  // 1. Dashboard Overview Metrics
  const totalBookingsWidget = document.getElementById('statTotalBookings');
  const upcomingTripsWidget = document.getElementById('statUpcomingTrips');
  const completedTripsWidget = document.getElementById('statCompletedTrips');
  const savedDestinationsWidget = document.getElementById('statSavedDestinations');

  const allBookings = StacklyData.getBookings();
  const wishlist = StacklyData.getWishlist();

  if (totalBookingsWidget) totalBookingsWidget.textContent = allBookings.length;
  if (upcomingTripsWidget) {
    const upcomingCount = allBookings.filter(b => b.status === 'Confirmed').length;
    upcomingTripsWidget.textContent = upcomingCount;
  }
  if (completedTripsWidget) {
    const completedCount = allBookings.filter(b => b.status === 'Completed').length;
    completedTripsWidget.textContent = completedCount;
  }
  if (savedDestinationsWidget) savedDestinationsWidget.textContent = wishlist.length;

  // 2. Recent Bookings Table on Dashboard Overview
  const recentBookingsTableBody = document.getElementById('recentBookingsTableBody');
  if (recentBookingsTableBody) {
    const recentList = allBookings.slice(0, 4);
    if (recentList.length === 0) {
      recentBookingsTableBody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">No booking activity yet.</td></tr>`;
    } else {
      recentBookingsTableBody.innerHTML = recentList.map(b => `
        <tr>
          <td><span class="fw-bold text-primary-blue">${b.id}</span></td>
          <td>
            <strong>${b.title}</strong>
            <span class="d-block small text-muted"><i class="fa-solid fa-location-dot text-sunset-gold"></i> ${b.destination}</span>
          </td>
          <td>${b.checkInDate}</td>
          <td>${b.travelers} Persons</td>
          <td><span class="fw-bold">$${b.totalPrice}</span></td>
          <td>
            <span class="status-badge ${b.status === 'Confirmed' ? 'status-confirmed' : b.status === 'Completed' ? 'status-completed' : 'status-cancelled'}">
              <i class="fa-solid fa-${b.status === 'Confirmed' ? 'circle-check' : b.status === 'Completed' ? 'flag-checkered' : 'circle-xmark'}"></i>
              ${b.status}
            </span>
          </td>
        </tr>
      `).join('');
    }
  }

  // 3. My Bookings Page Table & Actions
  const myBookingsTableBody = document.getElementById('myBookingsTableBody');
  if (myBookingsTableBody) {
    function renderMyBookings() {
      const bookings = StacklyData.getBookings();
      if (bookings.length === 0) {
        myBookingsTableBody.innerHTML = `
          <tr>
            <td colspan="7" class="text-center py-5">
              <i class="fa-solid fa-calendar-xmark fa-3x text-sunset-gold mb-3"></i>
              <h5>No Bookings on Record</h5>
              <p class="text-muted small">You haven't made any bookings yet.</p>
              <a href="../packages.html" class="btn btn-primary-wn btn-sm-wn">Browse Packages</a>
            </td>
          </tr>
        `;
        return;
      }

      myBookingsTableBody.innerHTML = bookings.map(b => `
        <tr>
          <td class="fw-bold text-primary-blue">${b.id}</td>
          <td>
            <strong>${b.title}</strong>
            <span class="d-block small text-muted">${b.destination}</span>
          </td>
          <td>${b.checkInDate} &rarr; ${b.checkOutDate || 'Ongoing'}</td>
          <td>${b.travelers} Guests</td>
          <td class="fw-bold">$${b.totalPrice}</td>
          <td>
            <span class="status-badge ${b.status === 'Confirmed' ? 'status-confirmed' : b.status === 'Completed' ? 'status-completed' : 'status-cancelled'}">
              ${b.status}
            </span>
          </td>
          <td>
            <div class="d-flex gap-2">
              <button class="btn btn-sm btn-outline-wn" onclick="viewBookingVoucher('${b.id}')" title="View Voucher">
                <i class="fa-solid fa-receipt"></i>
              </button>
              ${b.status === 'Confirmed' ? `
                <button class="btn btn-sm btn-outline-danger" onclick="cancelDemoBooking('${b.id}')" title="Cancel Booking">
                  <i class="fa-solid fa-ban"></i>
                </button>
              ` : ''}
            </div>
          </td>
        </tr>
      `).join('');
    }

    renderMyBookings();

    window.cancelDemoBooking = (id) => {
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: 'Cancel Reservation?',
          text: `Are you sure you wish to cancel reservation ${id}? Free demo cancellation applies.`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#ef4444',
          cancelButtonColor: '#123B52',
          confirmButtonText: 'Yes, Cancel'
        }).then((result) => {
          if (result.isConfirmed) {
            const list = StacklyData.getBookings();
            const target = list.find(b => b.id === id);
            if (target) {
              target.status = 'Cancelled';
              StacklyData.saveBookings(list);
              renderMyBookings();
              showWnNotification('Booking Cancelled', `Reservation ${id} has been marked as cancelled.`, 'info');
            }
          }
        });
      } else {
        if (confirm(`Cancel reservation ${id}?`)) {
          const list = StacklyData.getBookings();
          const target = list.find(b => b.id === id);
          if (target) {
            target.status = 'Cancelled';
            StacklyData.saveBookings(list);
            renderMyBookings();
          }
        }
      }
    };

    window.viewBookingVoucher = (id) => {
      const b = StacklyData.getBookings().find(item => item.id === id);
      if (!b) return;
      showWnNotification(`Booking Voucher: ${b.id}`, `Destination: ${b.destination}\nTraveler: ${b.guestName}\nDates: ${b.checkInDate}\nTotal: $${b.totalPrice}\nStatus: ${b.status} (Verified)`, 'info');
    };
  }

  // 4. Customer Profile Form
  const profileForm = document.getElementById('userProfileForm');
  if (profileForm) {
    // Populate form fields
    const nameInput = document.getElementById('profileName');
    const emailInput = document.getElementById('profileEmail');
    const phoneInput = document.getElementById('profilePhone');
    const prefInput = document.getElementById('profilePreferences');

    if (nameInput) nameInput.value = currentUser.name;
    if (emailInput) emailInput.value = currentUser.email;
    if (phoneInput) phoneInput.value = currentUser.phone || '';
    if (prefInput) prefInput.value = currentUser.preferredDestinations || '';

    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      currentUser.name = nameInput.value.trim();
      currentUser.email = emailInput.value.trim();
      currentUser.phone = phoneInput.value.trim();
      currentUser.preferredDestinations = prefInput.value.trim();

      StacklyData.setCurrentUser(currentUser);

      // Also update in all users list
      const users = StacklyData.getUsers();
      const idx = users.findIndex(u => u.email === currentUser.email);
      if (idx > -1) {
        users[idx] = currentUser;
        StacklyData.saveUsers(users);
      }

      showWnNotification('Profile Updated', 'Your profile details have been successfully saved.', 'success');
    });
  }
});
