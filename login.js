function isLoggedIn() {
  return localStorage.getItem('jrUnlockedLoggedIn') === 'true';
}

function loginUser(event) {
  event.preventDefault();
  localStorage.setItem('jrUnlockedLoggedIn', 'true');
  window.location.href = 'perfil.html';
}

function logoutUser() {
  localStorage.removeItem('jrUnlockedLoggedIn');
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
