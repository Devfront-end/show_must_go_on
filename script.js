// script.js
document.addEventListener('DOMContentLoaded', () => {
  // Initialize login/logout state based on localStorage
  initializeUserState();

  // Attach event listeners for opening and closing popups
  attachPopupEventListeners();

  // Adjust popup position initially
  adjustPopupPosition();

  // Attach form submission listener
  attachFormSubmissionListener();
});

// Adjust the popup position on window resize to ensure it's always correct
window.addEventListener('resize', adjustPopupPosition);

function adjustPopupPosition() {
  const navbar = document.querySelector('header');
  const navbarHeight = navbar.offsetHeight;
  document.querySelectorAll('.popup').forEach(popup => {
    popup.style.top = `${navbarHeight}px`;
  });
}

function attachPopupEventListeners() {
  document.getElementById('signupBtn')?.addEventListener('click', () => openPopup('signupPopup'));
  document.getElementById('loginBtn')?.addEventListener('click', () => openPopup('loginPopup'));
  document.querySelectorAll('.close').forEach(button => {
    button.addEventListener('click', () => closePopup(button.closest('.popup').id));
  });

  document.getElementById('logoutBtn')?.addEventListener('click', logout);
  document.getElementById('switchToLogin')?.addEventListener('click', switchPopup);
  document.getElementById('switchToSignup')?.addEventListener('click', switchPopup);
}

function openPopup(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) {
    popup.classList.add('active');
    setTimeout(adjustPopupPosition, 10);
  }
}

function closePopup(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) {
    popup.classList.remove('active');
  }
}

function initializeUserState() {
  const userEmailSpan = document.getElementById('userEmail');
  const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
  if (userEmailSpan) {
    userEmailSpan.textContent = loggedInUserEmail || '';
  }
  document.getElementById('userPanel').classList.toggle('hidden', !loggedInUserEmail);
  document.getElementById('authButtons').classList.toggle('hidden', !!loggedInUserEmail);
}

function logout() {
  localStorage.removeItem('loggedInUserEmail');
  window.location.reload();
}

function login() {
  const email = prompt('Please enter your email');
  if (email) {
    localStorage.setItem('loggedInUserEmail', email);
    window.location.reload();
  }
}

function switchPopup() {
  const loginPopup = document.getElementById('loginPopup');
  const signupPopup = document.getElementById('signupPopup');
  loginPopup.classList.toggle('active');
  signupPopup.classList.toggle('active');
  setTimeout(adjustPopupPosition, 10);
}

function attachFormSubmissionListener() {
  const form = document.getElementById('rsvp-form'); // Update this ID based on your form's ID
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const name = document.getElementById('name').value;
      const attendance = document.getElementById('attendance').value;
      const comments = document.getElementById('comments').value;
      const formData = { name, attendance, comments };
      // Replace '/api/add-guest' with your actual endpoint
      fetch('/api/add-guest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      .then(response => response.json())
      .then(data => {
        updateGuestListUI(data.updatedGuestList);
      })
      .catch(error => {
        console.error('Error updating guest list:', error);
      });
    });
  }
}

function updateGuestListUI(guestList) {
  const guestListContainer = document.getElementById('guest-list'); // Update this ID based on your container's ID
  if (guestListContainer) {
    guestListContainer.innerHTML = '';
    guestList.forEach(guest => {
      const guestElement = document.createElement('div');
      guestElement.textContent = `${guest.date} - ${guest.name}: ${guest.comments}`;
      guestListContainer.appendChild(guestElement);
    });
  }
}
