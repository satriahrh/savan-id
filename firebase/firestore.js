const firebase = require('firebase');
if (!firebase.apps.length) {
  try {
    const firebaseConfigJson = process.env.FIREBASE_CONFIG_JSON;
    const firebaseConfig = JSON.parse(firebaseConfigJson);

    firebase.initializeApp(firebaseConfig);
  } catch (error) {
    console.log('Firebase admin initialization error', error.stack);
  }
}

const firestore = firebase.firestore();
// if (process.env.NODE_ENV === 'development') {
//   if (typeof window === 'undefined' || !window['_init']) {
//     firestore.useEmulator(process.env.FIRESTORE_EMULATOR_HOST, process.env.FIRESTORE_EMULATOR_PORT);
//     if (typeof window !== 'undefined') {
//       window['_init'] = true;
//     }
//   }
// }

export default firestore;
