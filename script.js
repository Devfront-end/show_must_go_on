document.addEventListener('DOMContentLoaded', () => {
    // Initialize login/logout state based on localStorage
    initializeUserState();
  
    // Attach event listeners for opening and closing popups
    attachPopupEventListeners();
  
    // Adjust popup position initially
    adjustPopupPosition();
  });
  
  // Adjust the popup position on window resize to ensure it's always correct
  window.addEventListener('resize', adjustPopupPosition);
  
  function adjustPopupPosition() {
    // Adjust the popup position based on the navbar height
    const navbar = document.querySelector('header');
    const navbarHeight = navbar.offsetHeight;
    document.querySelectorAll('.popup').forEach(popup => {
      popup.style.top = `${navbarHeight}px`;
    });
  }
  
  function attachPopupEventListeners() {
    // Event listeners for opening and closing popups
    document.getElementById('signupBtn')?.addEventListener('click', () => openPopup('signupPopup'));
    document.getElementById('loginBtn')?.addEventListener('click', () => openPopup('loginPopup'));
    document.querySelectorAll('.close').forEach(button => {
      button.addEventListener('click', () => closePopup(button.closest('.popup').id));
    });
  
    // Logout button event listener
    document.getElementById('logoutBtn')?.addEventListener('click', logout);
  }
  
  function openPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
      popup.classList.add('active');
      // Call adjustPopupPosition() after a slight delay to allow for CSS transitions
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
    window.location.reload(); // Refresh the page to reflect the logout state
  }
  
  function login() {
    const email = prompt('Please enter your email');
    if (email) {
      localStorage.setItem('loggedInUserEmail', email);
      window.location.reload(); // Refresh the page to reflect the login state
    }
  }
  