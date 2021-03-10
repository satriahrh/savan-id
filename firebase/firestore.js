const firebase = require('firebase');

const firebaseConfig = {
  apiKey: "AIzaSyCmxXgbawLs-ltxkZmuyv6Nh0_uuYcJtu4",
  authDomain: "savan-id.firebaseapp.com",
  databaseURL: "https://savan-id.firebaseio.com",
  projectId: "savan-id",
  storageBucket: "savan-id.appspot.com",
  messagingSenderId: "469976157461",
  appId: "1:469976157461:web:1d2dbd2c1bc32160ca6d1c",
  measurementId: "G-NDNPF8BBR2"
};

if (!firebase.apps.length) {
  try {
    firebase.initializeApp(firebaseConfig);
  } catch (error) {
    console.log('Firebase admin initialization error', error.stack);
  }
}
 
const firestore = firebase.firestore();
if (process.env.NODE_ENV === 'development') {
  if(typeof window === 'undefined' || !window['_init']) {
    firestore.useEmulator('localhost', 8080);
    if(typeof window !== 'undefined') {
      window['_init'] = true;
    }
  }
}

export default firestore;
