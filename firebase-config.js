// Firebase configuration for "my store" project.
// Usa esta plantilla con la configuración web del proyecto Firebase.
// El archivo de servicio que compartiste es para la Admin SDK en servidor,
// no debe incluirse directamente en el frontend.
var firebaseConfig = {
  apiKey: "AIzaSyCBiB9d6bxnxZKmt4awqcFih85fHHPwvls",
  authDomain: "my-store-b57e1.firebaseapp.com",
  databaseURL: "https://my-store-b57e1-default-rtdb.firebaseio.com",
  projectId: "my-store-b57e1",
  storageBucket: "my-store-b57e1.firebasestorage.app",
  messagingSenderId: "544909685855",
  appId: "1:544909685855:web:e1d7b216df50c4353217ea",
  measurementId: "G-VGWPGHCJ5J"
};

// Inicializa Firebase.
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
}

window.auth = window.firebase.auth();
window.db = window.firebase.firestore();

window.saveLoginRecord = function (email) {
  if (!email || !window.db) {
    return;
  }

  return window.db.collection('logins').add({
    email: email,
    timestamp: window.firebase.firestore.FieldValue.serverTimestamp(),
    source: 'web-login'
  }).catch(function (error) {
    console.error('No se pudo guardar el login en Firestore:', error);
  });
};
