import firebase from 'firebase/app';

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

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (err.name === ' FirebaseError') {
    err.code !== 'app/duplicate-app' ? console.error(err) : null;
  } else {
    console.error(err);
  }
}

const fire = firebase;
export default fire;
