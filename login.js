function isLoggedIn() {
  return localStorage.getItem('jrUnlockedLoggedIn') === 'true';
}

function getStoredUsers() {
  try {
    var users = JSON.parse(localStorage.getItem('jrUnlockedUsers') || '[]');
    return Array.isArray(users) ? users : [];
  } catch (error) {
    return [];
  }
}

function saveStoredUsers(users) {
  localStorage.setItem('jrUnlockedUsers', JSON.stringify(users));
}

function findStoredUser(email) {
  var users = getStoredUsers();
  return users.find(function (user) {
    return user.email && user.email.toLowerCase() === email.toLowerCase();
  });
}

function loginUser(event) {
  event.preventDefault();
  var emailInput = document.getElementById('email');
  var passwordInput = document.getElementById('password');
  var email = emailInput ? emailInput.value.trim() : '';
  var password = passwordInput ? passwordInput.value.trim() : '';

  if (!email || !password) {
    alert('Ingresa correo y contraseña para iniciar sesión.');
    return;
  }

  var user = findStoredUser(email);
  if (!user || user.password !== password) {
    alert('Correo o contraseña incorrectos.');
    return;
  }

  localStorage.setItem('jrUnlockedEmail', email);
  localStorage.setItem('jrUnlockedLoggedIn', 'true');
  window.location.href = 'perfil.html';
}

function createAccountUser() {
  var emailInput = document.getElementById('email');
  var passwordInput = document.getElementById('password');
  var email = emailInput ? emailInput.value.trim() : '';
  var password = passwordInput ? passwordInput.value.trim() : '';

  if (!email || !password) {
    alert('Por favor ingresa correo y contraseña para crear la cuenta.');
    return;
  }

  if (findStoredUser(email)) {
    alert('Ya existe una cuenta con ese correo.');
    return;
  }

  var users = getStoredUsers();
  users.push({
    email: email,
    password: password
  });
  saveStoredUsers(users);

  localStorage.setItem('jrUnlockedEmail', email);
  localStorage.setItem('jrUnlockedLoggedIn', 'true');
  alert('Cuenta creada correctamente. Bienvenido, ' + email + '.');
  window.location.href = 'perfil.html';
}

function logoutUser() {
  localStorage.removeItem('jrUnlockedLoggedIn');
  localStorage.removeItem('jrUnlockedEmail');
  window.location.href = 'index.html';
}

function ensureLoggedIn(redirectUrl) {
  if (!isLoggedIn()) {
    window.location.href = redirectUrl;
  }
}

function redirectWhenLogged(defaultPage) {
  if (isLoggedIn()) {
    window.location.href = defaultPage;
  }
}

function updateLoginState() {
  if (isLoggedIn()) {
    document.body.classList.add('logged-in');
  } else {
    document.body.classList.remove('logged-in');
  }
}

function getCategoryTarget(category) {
  switch (category) {
    case 'monitores':
      return 'monitores.html';
    case 'hardware':
      return 'hardware.html';
    case 'soporte':
      return 'soporte.html';
    default:
      return null;
  }
}

function setupCategorySelect() {
  var select = document.querySelector('.search-cats');
  if (!select) {
    return;
  }

  function navigateByCategory() {
    var target = getCategoryTarget(select.value);
    if (target) {
      window.location.href = target;
    }
  }

  select.addEventListener('change', navigateByCategory);

  var form = select.closest('form');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      navigateByCategory();
    });
  }
}

document.addEventListener('DOMContentLoaded', function () {
  updateLoginState();
  setupCategorySelect();
});
