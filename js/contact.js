/**
 * Stackly - Contact Form Script
 * Includes script-based validation and user feedback
 */

function setContactFieldError(inputEl, message) {
  if (!inputEl) return;
  inputEl.classList.add('is-invalid');
  inputEl.classList.remove('is-valid');

  let parent = inputEl.parentElement;
  let existingErr = parent.querySelector(`.script-error-feedback[data-for="${inputEl.id}"]`);

  if (!existingErr) {
    const errDiv = document.createElement('div');
    errDiv.className = 'script-error-feedback text-danger small mt-1';
    errDiv.setAttribute('data-for', inputEl.id);
    errDiv.innerHTML = `<i class="fa-solid fa-circle-exclamation me-1"></i>${message}`;
    parent.appendChild(errDiv);
  } else {
    existingErr.innerHTML = `<i class="fa-solid fa-circle-exclamation me-1"></i>${message}`;
  }
}

function clearContactFieldError(inputEl) {
  if (!inputEl) return;
  inputEl.classList.remove('is-invalid');
  const parent = inputEl.parentElement;
  const existingErr = parent.querySelector(`.script-error-feedback[data-for="${inputEl.id}"]`);
  if (existingErr) {
    existingErr.remove();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('travelContactForm');
  if (!contactForm) return;

  contactForm.setAttribute('novalidate', 'true');

  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const messageInput = document.getElementById('contactMessage');
  const subjectInput = document.getElementById('contactSubject');

  [nameInput, emailInput, messageInput, subjectInput].forEach(inp => {
    if (inp) {
      inp.addEventListener('input', () => clearContactFieldError(inp));
      inp.addEventListener('change', () => clearContactFieldError(inp));
    }
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const subject = subjectInput ? subjectInput.value : '';
    const message = messageInput ? messageInput.value.trim() : '';

    let hasError = false;

    if (!name) {
      setContactFieldError(nameInput, 'Full name is required.');
      hasError = true;
    }

    if (!email) {
      setContactFieldError(emailInput, 'Email address is required.');
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setContactFieldError(emailInput, 'Please enter a valid email address.');
      hasError = true;
    }

    if (!message) {
      setContactFieldError(messageInput, 'Inquiry message is required.');
      hasError = true;
    }

    if (hasError) {
      showWnNotification('Missing Information', 'Please provide all required fields highlighted in red.', 'warning');
      return;
    }

    // After entering all details, redirect to 404 page on clicking Transmit Inquiry
    window.location.href = '404.html';
  });
});
