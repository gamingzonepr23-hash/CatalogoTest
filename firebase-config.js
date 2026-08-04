// Firebase configuration for "my store" project.
// Usa esta plantilla con la configuración web del proyecto Firebase.
// El archivo de servicio que compartiste es para la Admin SDK en servidor,
// no debe incluirse directamente en el frontend.
var firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "my-store-b57e1.firebaseapp.com",
  projectId: "my-store-b57e1",
  storageBucket: "my-store-b57e1.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Inicializa Firebase.
if (!window.firebase.apps.length) {
  window.firebase.initializeApp(firebaseConfig);
}

window.db = window.firebase.firestore();

window.saveLoginRecord = function (email) {
  if (!email) {
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
