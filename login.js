function isLoggedIn() {
  return localStorage.getItem('jrUnlockedLoggedIn') === 'true';
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

  if (typeof window.auth === 'undefined') {
    alert('Firebase no está configurado correctamente. Revisa firebase-config.js.');
    return;
  }

  window.auth.signInWithEmailAndPassword(email, password)
    .then(function (userCredential) {
      localStorage.setItem('jrUnlockedEmail', email);
      localStorage.setItem('jrUnlockedLoggedIn', 'true');
      if (typeof window.saveLoginRecord === 'function') {
        window.saveLoginRecord(email);
      }
      window.location.href = 'perfil.html';
    })
    .catch(function (error) {
      console.error('Error al iniciar sesión:', error);
      alert('No se pudo iniciar sesión. Verifica tu correo y contraseña.');
    });
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

  if (typeof window.auth === 'undefined' || typeof window.db === 'undefined') {
    alert('Firebase no está configurado correctamente. Revisa firebase-config.js.');
    return;
  }

  window.auth.createUserWithEmailAndPassword(email, password)
    .then(function (userCredential) {
      return window.db.collection('users').doc(userCredential.user.uid).set({
        email: email,
        createdAt: window.firebase.firestore.FieldValue.serverTimestamp(),
        source: 'web-registration'
      });
    })
    .then(function () {
      localStorage.setItem('jrUnlockedEmail', email);
      localStorage.setItem('jrUnlockedLoggedIn', 'true');
      if (typeof window.saveLoginRecord === 'function') {
        window.saveLoginRecord(email);
      }
      alert('Cuenta creada correctamente. Bienvenido, ' + email + '.');
      window.location.href = 'perfil.html';
    })
    .catch(function (error) {
      console.error('Error creando cuenta:', error);
      var message = 'No se pudo crear la cuenta. Intenta de nuevo más tarde.';
      if (error && error.message) {
        message = error.message;
      }
      alert(message);
    });
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
