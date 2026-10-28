/**
 * Stackly - Multi-Step Interactive Travel Booking Script
 * Steps:
 * 1. Select Destination / Package
 * 2. Select Travel Dates
 * 3. Select Number of Travelers
 * 4. Traveler Information
 * 5. Review & Pricing Summary
 * 6. Confirmation & LocalStorage Persistence
 */

document.addEventListener('DOMContentLoaded', () => {
  const bookingWizard = document.getElementById('bookingWizard');
  if (!bookingWizard) return;

  const packages = StacklyData.getPackages();
  const destinations = StacklyData.getDestinations();

  // URL parameters check
  const urlParams = new URLSearchParams(window.location.search);
  const paramPkgId = urlParams.get('pkg');
  const paramDestId = urlParams.get('dest');

  // State object
  const bookingState = {
    step: 1,
    selectedPackage: null,
    checkInDate: '',
    checkOutDate: '',
    travelers: 2,
    children: 0,
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    specialRequests: '',
    subtotal: 0,
    tax: 0,
    total: 0,
    referenceId: ''
  };

  // Find initial package if specified
  if (paramPkgId) {
    bookingState.selectedPackage = packages.find(p => p.id === paramPkgId) || packages[0];
  } else if (paramDestId) {
    bookingState.selectedPackage = packages.find(p => p.destinationId === paramDestId) || packages[0];
  } else {
    bookingState.selectedPackage = packages[0];
  }

  // Pre-calculate price
  function recalculateTotals() {
    if (!bookingState.selectedPackage) return;
    const basePrice = bookingState.selectedPackage.price;
    bookingState.subtotal = (basePrice * bookingState.travelers) + (basePrice * 0.5 * bookingState.children);
    bookingState.tax = Math.round(bookingState.subtotal * 0.08); // 8% demo hospitality tax
    bookingState.total = bookingState.subtotal + bookingState.tax;
  }

  recalculateTotals();

  // Wizard Step Indicators
  function updateStepUI() {
    const steps = document.querySelectorAll('.wizard-step-item');
    steps.forEach((el, index) => {
      const stepNum = index + 1;
      el.classList.remove('active', 'completed');
      if (stepNum === bookingState.step) {
        el.classList.add('active');
      } else if (stepNum < bookingState.step) {
        el.classList.add('completed');
      }
    });

    const stepPanels = document.querySelectorAll('.wizard-panel');
    stepPanels.forEach((panel) => {
      const panelStep = parseInt(panel.dataset.step, 10);
      if (panelStep === bookingState.step) {
        panel.classList.remove('d-none');
      } else {
        panel.classList.add('d-none');
      }
    });

    // Populate dynamic summary sidebar
    renderSidebarSummary();
  }

  function renderSidebarSummary() {
    const summaryCard = document.getElementById('bookingSummaryCard');
    if (!summaryCard) return;

    if (!bookingState.selectedPackage) {
      summaryCard.innerHTML = `<p class="text-muted small">Please select a tour package to view summary.</p>`;
      return;
    }

    const pkg = bookingState.selectedPackage;
    summaryCard.innerHTML = `
      <div class="d-flex align-items-center gap-3 mb-3">
        <img src="${pkg.image}" alt="${pkg.title}" class="rounded-3" style="width: 72px; height: 60px; object-fit: cover;">
        <div>
          <h6 class="mb-1 text-primary-blue fs-6">${pkg.title}</h6>
          <span class="small text-muted"><i class="fa-solid fa-location-dot text-sunset-gold"></i> ${pkg.destinationName}</span>
        </div>
      </div>
      <div class="border-top pt-3 small">
        <div class="d-flex justify-content-between mb-2">
          <span class="text-muted">Duration:</span>
          <strong>${pkg.duration}</strong>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <span class="text-muted">Travelers:</span>
          <strong>${bookingState.travelers} Adults ${bookingState.children ? `+ ${bookingState.children} Kids` : ''}</strong>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <span class="text-muted">Dates:</span>
          <strong>${bookingState.checkInDate || 'Not selected'}</strong>
        </div>
        <hr class="my-2">
        <div class="d-flex justify-content-between mb-2">
          <span class="text-muted">Subtotal:</span>
          <span>$${bookingState.subtotal}</span>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <span class="text-muted">Taxes & Fees (8%):</span>
          <span>$${bookingState.tax}</span>
        </div>
        <div class="d-flex justify-content-between fs-5 fw-bold text-primary-blue border-top pt-2 mt-2">
          <span>Total:</span>
          <span class="text-sunset-gold">$${bookingState.total}</span>
        </div>
      </div>
    `;
  }

  // Populate Package Selector in Step 1
  const packageSelector = document.getElementById('stepPackageSelect');
  if (packageSelector) {
    packageSelector.innerHTML = packages.map(p => `
      <div class="col-md-6 mb-3">
        <div class="card p-3 border rounded-3 package-option-card ${bookingState.selectedPackage.id === p.id ? 'border-primary-blue bg-warm-ivory' : ''}" data-id="${p.id}" style="cursor: pointer;">
          <div class="d-flex gap-3 align-items-center">
            <img src="${p.image}" class="rounded-3" style="width: 80px; height: 65px; object-fit: cover;">
            <div>
              <h6 class="mb-1 text-primary-blue fs-6">${p.title}</h6>
              <span class="small text-muted d-block">${p.duration} &bull; $${p.price}/person</span>
              <span class="badge bg-sunset-gold text-white small mt-1">${p.category}</span>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    packageSelector.addEventListener('click', (e) => {
      const card = e.target.closest('.package-option-card');
      if (card) {
        const id = card.dataset.id;
        bookingState.selectedPackage = packages.find(p => p.id === id);
        document.querySelectorAll('.package-option-card').forEach(c => c.classList.remove('border-primary-blue', 'bg-warm-ivory'));
        card.classList.add('border-primary-blue', 'bg-warm-ivory');
        recalculateTotals();
        renderSidebarSummary();
      }
    });
  }

  // Next / Previous Buttons
  document.querySelectorAll('.btn-wizard-next').forEach(btn => {
    btn.addEventListener('click', () => {
      // Validate current step
      if (bookingState.step === 1) {
        if (!bookingState.selectedPackage) {
          showWnNotification('Select a Package', 'Please choose a package to continue.', 'warning');
          return;
        }
      } else if (bookingState.step === 2) {
        const checkInEl = document.getElementById('bookingCheckInDate');
        const checkOutEl = document.getElementById('bookingCheckOutDate');
        const checkIn = checkInEl ? checkInEl.value : '';
        const checkOut = checkOutEl ? checkOutEl.value : '';

        // Clear previous script errors
        document.querySelectorAll('.script-error-feedback').forEach(el => el.remove());
        if (checkInEl) checkInEl.classList.remove('is-invalid');

        if (!checkIn) {
          if (checkInEl) {
            checkInEl.classList.add('is-invalid');
            const errDiv = document.createElement('div');
            errDiv.className = 'script-error-feedback text-danger small mt-1';
            errDiv.innerHTML = '<i class="fa-solid fa-circle-exclamation me-1"></i>Please choose a departure date.';
            checkInEl.parentElement.appendChild(errDiv);
          }
          showWnNotification('Date Required', 'Please choose a departure date.', 'warning');
          return;
        }
        bookingState.checkInDate = checkIn;
        bookingState.checkOutDate = checkOut || checkIn;
      } else if (bookingState.step === 3) {
        const adults = parseInt(document.getElementById('bookingAdults').value, 10) || 1;
        const children = parseInt(document.getElementById('bookingChildren').value, 10) || 0;
        bookingState.travelers = adults;
        bookingState.children = children;
        recalculateTotals();
      } else if (bookingState.step === 4) {
        const nameEl = document.getElementById('guestFullName');
        const emailEl = document.getElementById('guestEmail');
        const phoneEl = document.getElementById('guestPhone');

        const name = nameEl ? nameEl.value.trim() : '';
        const email = emailEl ? emailEl.value.trim() : '';
        const phone = phoneEl ? phoneEl.value.trim() : '';
        const requests = document.getElementById('guestSpecialRequests')?.value.trim() || '';

        // Clear previous script errors
        document.querySelectorAll('.script-error-feedback').forEach(el => el.remove());
        [nameEl, emailEl, phoneEl].forEach(el => { if (el) el.classList.remove('is-invalid'); });

        let hasError = false;
        if (!name) {
          nameEl.classList.add('is-invalid');
          const errDiv = document.createElement('div');
          errDiv.className = 'script-error-feedback text-danger small mt-1';
          errDiv.innerHTML = '<i class="fa-solid fa-circle-exclamation me-1"></i>Full legal name is required.';
          nameEl.parentElement.appendChild(errDiv);
          hasError = true;
        }

        if (!email) {
          emailEl.classList.add('is-invalid');
          const errDiv = document.createElement('div');
          errDiv.className = 'script-error-feedback text-danger small mt-1';
          errDiv.innerHTML = '<i class="fa-solid fa-circle-exclamation me-1"></i>Email address is required.';
          emailEl.parentElement.appendChild(errDiv);
          hasError = true;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          emailEl.classList.add('is-invalid');
          const errDiv = document.createElement('div');
          errDiv.className = 'script-error-feedback text-danger small mt-1';
          errDiv.innerHTML = '<i class="fa-solid fa-circle-exclamation me-1"></i>Please enter a valid email address.';
          emailEl.parentElement.appendChild(errDiv);
          hasError = true;
        }

        if (!phone) {
          phoneEl.classList.add('is-invalid');
          const errDiv = document.createElement('div');
          errDiv.className = 'script-error-feedback text-danger small mt-1';
          errDiv.innerHTML = '<i class="fa-solid fa-circle-exclamation me-1"></i>Contact phone number is required.';
          phoneEl.parentElement.appendChild(errDiv);
          hasError = true;
        }

        if (hasError) {
          showWnNotification('Missing Information', 'Please fill in all highlighted fields.', 'warning');
          return;
        }

        bookingState.guestName = name;
        bookingState.guestEmail = email;
        bookingState.guestPhone = phone;
        bookingState.specialRequests = requests;

        // Render Step 5 Review
        const reviewContainer = document.getElementById('bookingReviewDetails');
        if (reviewContainer) {
          reviewContainer.innerHTML = `
            <div class="row g-3">
              <div class="col-md-6">
                <p class="small mb-1 text-muted">Lead Traveler Name:</p>
                <strong>${bookingState.guestName}</strong>
              </div>
              <div class="col-md-6">
                <p class="small mb-1 text-muted">Email Address:</p>
                <strong>${bookingState.guestEmail}</strong>
              </div>
              <div class="col-md-6">
                <p class="small mb-1 text-muted">Contact Phone:</p>
                <strong>${bookingState.guestPhone}</strong>
              </div>
              <div class="col-md-6">
                <p class="small mb-1 text-muted">Travel Dates:</p>
                <strong>${bookingState.checkInDate}</strong>
              </div>
              <div class="col-12">
                <p class="small mb-1 text-muted">Special Requests:</p>
                <p class="small text-dark fst-italic">${bookingState.specialRequests || 'None specified'}</p>
              </div>
            </div>
          `;
        }
      } else if (bookingState.step === 5) {
        // Complete booking and generate reference
        const agreeTermsEl = document.getElementById('agreeBookingTerms');
        const agreeTerms = agreeTermsEl?.checked;
        document.querySelectorAll('.script-error-feedback').forEach(el => el.remove());

        if (!agreeTerms) {
          if (agreeTermsEl) {
            agreeTermsEl.classList.add('is-invalid');
            const errDiv = document.createElement('div');
            errDiv.className = 'script-error-feedback text-danger small mt-1';
            errDiv.innerHTML = '<i class="fa-solid fa-circle-exclamation me-1"></i>Please agree to the booking policies and conditions.';
            agreeTermsEl.closest('.form-check').appendChild(errDiv);
          }
          showWnNotification('Terms Acceptance', 'Please agree to the booking policies and conditions.', 'warning');
          return;
        }

        // Generate Demo Booking ID
        const refId = `STK-2026-${Math.floor(10000 + Math.random() * 90000)}`;
        bookingState.referenceId = refId;

        const newBookingRecord = {
          id: refId,
          packageId: bookingState.selectedPackage.id,
          title: bookingState.selectedPackage.title,
          destination: bookingState.selectedPackage.destinationName,
          travelers: bookingState.travelers + bookingState.children,
          checkInDate: bookingState.checkInDate,
          checkOutDate: bookingState.checkOutDate,
          totalPrice: bookingState.total,
          status: 'Confirmed',
          guestName: bookingState.guestName,
          guestEmail: bookingState.guestEmail,
          guestPhone: bookingState.guestPhone,
          createdAt: new Date().toISOString().split('T')[0]
        };

        // Save to localStorage
        StacklyData.addBooking(newBookingRecord);

        // Populate Confirmation Step 6
        const confirmationCard = document.getElementById('bookingConfirmationDetails');
        if (confirmationCard) {
          confirmationCard.innerHTML = `
            <div class="text-center py-4">
              <div class="mb-3">
                <i class="fa-solid fa-circle-check text-success fa-4x animate-float"></i>
              </div>
              <h2 class="text-primary-blue mb-2">Reservation Confirmed!</h2>
              <p class="text-muted">A confirmation voucher and receipt have been dispatched to <strong>${bookingState.guestEmail}</strong>.</p>
              <div class="p-3 bg-warm-ivory rounded-4 d-inline-block text-start my-3 border border-warning-subtle">
                <div class="small text-muted">Your Demo Booking Reference:</div>
                <div class="fs-4 fw-bold text-primary-blue">${refId}</div>
              </div>
              <div class="mt-4 d-flex justify-content-center gap-3">
                <a href="user/my-bookings.html" class="btn btn-primary-wn">
                  <i class="fa-solid fa-list-check"></i> View in My Bookings
                </a>
                <a href="index.html" class="btn btn-outline-wn">
                  <i class="fa-solid fa-house"></i> Return Home
                </a>
              </div>
            </div>
          `;
        }
      }

      bookingState.step++;
      updateStepUI();
      window.scrollTo({ top: 150, behavior: 'smooth' });
    });
  });

  document.querySelectorAll('.btn-wizard-prev').forEach(btn => {
    btn.addEventListener('click', () => {
      if (bookingState.step > 1) {
        bookingState.step--;
        updateStepUI();
        window.scrollTo({ top: 150, behavior: 'smooth' });
      }
    });
  });

  // Initial UI paint
  updateStepUI();
});
