/**
 * Stackly - Authentication and Session Management Script
 * Handles Login (Client & Admin roles), Registration, Password Recovery, and Form Validation
 */

// Script-based Form Error Helper Functions
function setFieldError(inputEl, message) {
  if (!inputEl) return;
  inputEl.classList.add('is-invalid');
  inputEl.classList.remove('is-valid');

  const parent = inputEl.closest('.input-group') || inputEl.closest('.password-input-group') || inputEl.parentElement;
  const targetParent = (parent.classList.contains('input-group') || parent.classList.contains('password-input-group')) ? parent.parentElement : parent;
  let existingErr = targetParent.querySelector(`.script-error-feedback[data-for="${inputEl.id}"]`);

  if (!existingErr) {
    const errDiv = document.createElement('div');
    errDiv.className = 'script-error-feedback text-danger small mt-1';
    errDiv.setAttribute('data-for', inputEl.id);
    errDiv.innerHTML = `<i class="fa-solid fa-circle-exclamation me-1"></i>${message}`;
    if (parent.classList.contains('input-group') || parent.classList.contains('password-input-group')) {
      parent.after(errDiv);
    } else {
      parent.appendChild(errDiv);
    }
  } else {
    existingErr.innerHTML = `<i class="fa-solid fa-circle-exclamation me-1"></i>${message}`;
  }
}

function clearFieldError(inputEl) {
  if (!inputEl) return;
  inputEl.classList.remove('is-invalid');
  const parent = inputEl.closest('.input-group') || inputEl.closest('.password-input-group') || inputEl.parentElement;
  const targetParent = (parent.classList.contains('input-group') || parent.classList.contains('password-input-group')) ? parent.parentElement : parent;
  const existingErr = targetParent.querySelector(`.script-error-feedback[data-for="${inputEl.id}"]`) ||
                      document.querySelector(`.script-error-feedback[data-for="${inputEl.id}"]`);
  if (existingErr) {
    existingErr.remove();
  }
}

function clearAllFormErrors(formEl) {
  if (!formEl) return;
  formEl.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
  formEl.querySelectorAll('.script-error-feedback').forEach(el => el.remove());
  if (formEl.parentElement) {
    formEl.parentElement.querySelectorAll('.script-error-feedback').forEach(el => el.remove());
  }
}

function attachInputListeners(formEl) {
  if (!formEl) return;
  const inputs = formEl.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('input', () => clearFieldError(input));
    input.addEventListener('change', () => clearFieldError(input));
  });
}

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

document.addEventListener('DOMContentLoaded', () => {
  // Password Visibility Toggles
  const toggleButtons = document.querySelectorAll('.password-toggle-btn');
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const parentGroup = btn.closest('.password-input-group');
      if (!parentGroup) return;
      const input = parentGroup.querySelector('input');
      const icon = btn.querySelector('i');

      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    });
  });

  // Login Form (Client and Admin role selection)
  const loginForm = document.getElementById('customerLoginForm');
  if (loginForm) {
    loginForm.setAttribute('novalidate', 'true');
    attachInputListeners(loginForm);

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearAllFormErrors(loginForm);

      const roleEl = document.getElementById('loginRole');
      const emailEl = document.getElementById('loginEmail');
      const passwordEl = document.getElementById('loginPassword');

      const role = roleEl ? roleEl.value.trim() : '';
      const email = emailEl ? emailEl.value.trim() : '';
      const password = passwordEl ? passwordEl.value.trim() : '';

      let hasError = false;

      // Script-based validation
      if (!role) {
        setFieldError(roleEl, 'Please select your role (Client or Admin).');
        hasError = true;
      }

      if (!email) {
        setFieldError(emailEl, 'Email address is required.');
        hasError = true;
      } else if (!isValidEmail(email)) {
        setFieldError(emailEl, 'Please enter a valid email address (e.g. name@example.com).');
        hasError = true;
      }

      if (!password) {
        setFieldError(passwordEl, 'Password is required.');
        hasError = true;
      }

      if (hasError) {
        if (typeof Swal !== 'undefined') {
          Swal.fire({
            title: 'Input Required',
            text: 'Please fix the highlighted fields to continue.',
            icon: 'warning',
            confirmButtonColor: '#123B52'
          });
        }
        return;
      }

      const storageObj = window.StacklyData || window.WanderNestData;

      if (role === 'admin') {
        // Admin Login
        const adminUser = {
          id: 'usr-admin',
          name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()) + ' (Admin)',
          email: email,
          role: 'admin'
        };

        const keys = window.STACKLY_STORAGE_KEYS || window.WANDERNEST_STORAGE_KEYS;
        localStorage.setItem(keys.ADMIN_USER, JSON.stringify(adminUser));

        if (typeof Swal !== 'undefined') {
          Swal.fire({
            title: 'Administrator Access Granted',
            text: 'Initializing Stackly Management Suite...',
            icon: 'success',
            timer: 1200,
            timerProgressBar: true,
            confirmButtonColor: '#123B52',
            confirmButtonText: 'Go to Admin Dashboard'
          }).then(() => {
            window.location.href = 'admin/admin-dashboard.html';
          });
        } else {
          window.location.href = 'admin/admin-dashboard.html';
        }
      } else {
        // Client / User Login
        const users = storageObj.getUsers();
        let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (!user) {
          // Create account session for client
          user = {
            id: `usr-${Date.now()}`,
            name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
            email: email,
            phone: '+1 (555) 019-2834',
            role: 'client',
            joinDate: 'Today',
            preferredDestinations: 'Tropical Beaches',
            tripsCompleted: 1
          };
          users.push(user);
          storageObj.saveUsers(users);
        } else {
          user.role = 'client';
        }

        storageObj.setCurrentUser(user);

        if (typeof Swal !== 'undefined') {
          Swal.fire({
            title: 'Login Successful',
            text: `Welcome back, ${user.name}! Redirecting to Client Dashboard...`,
            icon: 'success',
            timer: 1200,
            timerProgressBar: true,
            confirmButtonColor: '#123B52',
            confirmButtonText: 'Go to Dashboard'
          }).then(() => {
            window.location.href = 'user/user-dashboard.html';
          });
        } else {
          window.location.href = 'user/user-dashboard.html';
        }
      }
    });
  }

  // Registration Form
  const registerForm = document.getElementById('customerRegisterForm');
  if (registerForm) {
    registerForm.setAttribute('novalidate', 'true');
    attachInputListeners(registerForm);

    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearAllFormErrors(registerForm);

      const fullNameEl = document.getElementById('regFullName');
      const emailEl = document.getElementById('regEmail');
      const roleEl = document.getElementById('regRole');
      const phoneEl = document.getElementById('regPhone');
      const passwordEl = document.getElementById('regPassword');
      const confirmPasswordEl = document.getElementById('regConfirmPassword');
      const termsEl = document.getElementById('regTermsCheckbox');

      const fullName = fullNameEl ? fullNameEl.value.trim() : '';
      const email = emailEl ? emailEl.value.trim() : '';
      const role = roleEl ? roleEl.value.trim() : '';
      const phone = phoneEl ? phoneEl.value.trim() : '';
      const password = passwordEl ? passwordEl.value : '';
      const confirmPassword = confirmPasswordEl ? confirmPasswordEl.value : '';
      const agreeTerms = termsEl ? termsEl.checked : false;

      let hasError = false;

      if (!fullName) {
        setFieldError(fullNameEl, 'Please enter your full legal name.');
        hasError = true;
      } else if (fullName.length < 2) {
        setFieldError(fullNameEl, 'Full name must be at least 2 characters.');
        hasError = true;
      }

      if (!email) {
        setFieldError(emailEl, 'Email address is required.');
        hasError = true;
      } else if (!isValidEmail(email)) {
        setFieldError(emailEl, 'Please enter a valid email address.');
        hasError = true;
      }

      if (!role) {
        setFieldError(roleEl, 'Please select your account role (Client or Admin).');
        hasError = true;
      }

      if (!password) {
        setFieldError(passwordEl, 'Password is required.');
        hasError = true;
      } else if (password.length < 6) {
        setFieldError(passwordEl, 'Password must be at least 6 characters.');
        hasError = true;
      }

      if (!confirmPassword) {
        setFieldError(confirmPasswordEl, 'Please confirm your password.');
        hasError = true;
      } else if (password !== confirmPassword) {
        setFieldError(confirmPasswordEl, 'Passwords do not match. Please verify.');
        hasError = true;
      }

      if (!agreeTerms) {
        setFieldError(termsEl, 'You must accept the Terms of Service & Privacy Policy.');
        hasError = true;
      }

      if (hasError) {
        if (typeof Swal !== 'undefined') {
          Swal.fire({
            title: 'Validation Error',
            text: 'Please complete all required fields properly.',
            icon: 'warning',
            confirmButtonColor: '#123B52'
          });
        }
        return;
      }

      const storageObj = window.StacklyData || window.WanderNestData;
      const newUser = {
        id: `usr-${Date.now()}`,
        name: fullName,
        email: email,
        phone: phone || '+1 (555) 123-4567',
        role: role,
        joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        preferredDestinations: 'Custom Selection',
        tripsCompleted: 0
      };

      const users = storageObj.getUsers();
      users.push(newUser);
      storageObj.saveUsers(users);

      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: 'Registration Successful',
          text: `Welcome to Stackly, ${fullName}! Your account has been created. Redirecting to login...`,
          icon: 'success',
          timer: 1300,
          timerProgressBar: true,
          confirmButtonColor: '#123B52',
          confirmButtonText: 'Proceed to Login'
        }).then(() => {
          window.location.href = 'login.html';
        });
      } else {
        window.location.href = 'login.html';
      }
    });
  }

  // Admin Dedicated Login Form (admin/admin-login.html)
  const adminLoginForm = document.getElementById('adminLoginForm');
  if (adminLoginForm) {
    adminLoginForm.setAttribute('novalidate', 'true');
    attachInputListeners(adminLoginForm);

    adminLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearAllFormErrors(adminLoginForm);

      const emailEl = document.getElementById('adminEmail');
      const passwordEl = document.getElementById('adminPassword');

      const email = emailEl ? emailEl.value.trim() : '';
      const password = passwordEl ? passwordEl.value.trim() : '';

      let hasError = false;

      if (!email) {
        setFieldError(emailEl, 'Admin email address is required.');
        hasError = true;
      } else if (!isValidEmail(email)) {
        setFieldError(emailEl, 'Please enter a valid administrator email address.');
        hasError = true;
      }

      if (!password) {
        setFieldError(passwordEl, 'Admin password is required.');
        hasError = true;
      }

      if (hasError) {
        if (typeof Swal !== 'undefined') {
          Swal.fire({
            title: 'Admin Credentials Required',
            text: 'Please provide valid admin credentials.',
            icon: 'warning',
            confirmButtonColor: '#123B52'
          });
        }
        return;
      }

      const adminUser = {
        id: 'usr-admin',
        name: 'Victoria Vance (Admin)',
        email: email,
        role: 'admin'
      };

      const keys = window.STACKLY_STORAGE_KEYS || window.WANDERNEST_STORAGE_KEYS;
      localStorage.setItem(keys.ADMIN_USER, JSON.stringify(adminUser));

      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: 'Administrator Access Granted',
          text: 'Initializing Stackly Management Suite...',
          icon: 'success',
          timer: 1000,
          timerProgressBar: true,
          confirmButtonColor: '#123B52',
          confirmButtonText: 'Access Dashboard'
        }).then(() => {
          window.location.href = 'admin-dashboard.html';
        });
      } else {
        window.location.href = 'admin-dashboard.html';
      }
    });
  }

  // Forgot Password Form
  const forgotPasswordForm = document.getElementById('forgotPasswordForm');
  if (forgotPasswordForm) {
    forgotPasswordForm.setAttribute('novalidate', 'true');
    attachInputListeners(forgotPasswordForm);

    forgotPasswordForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearAllFormErrors(forgotPasswordForm);

      const emailEl = document.getElementById('forgotEmail');
      const email = emailEl ? emailEl.value.trim() : '';

      if (!email) {
        setFieldError(emailEl, 'Please input your registered email address.');
        return;
      } else if (!isValidEmail(email)) {
        setFieldError(emailEl, 'Please enter a valid email format.');
        return;
      }

      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: 'Reset Link Dispatched',
          text: `A password reset token has been sent to ${email}. Check your inbox or proceed to login.`,
          icon: 'success',
          confirmButtonColor: '#123B52'
        });
      } else {
        alert(`Reset token sent to ${email}`);
      }
      forgotPasswordForm.reset();
    });
  }
});
