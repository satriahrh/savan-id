
import 'firebase/firestore';
import fire from './firebase.init';

const firestore = fire.firestore();
try {
  firestore.useEmulator('localhost', 8080);
} catch (err) {
  if (err.name === ' FirebaseError') {
    err.code !== 'failed-precondition' ? console.error(err) : null;
  } else {
    console.error(err);
  }
}

export default firestore;
