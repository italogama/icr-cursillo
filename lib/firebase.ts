// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAfNIca3x2_GLM9sd9qd2ZLrVFp243c2NQ',
  authDomain: 'icr-members-c94f2.firebaseapp.com',
  projectId: 'icr-members-c94f2',
  storageBucket: 'icr-members-c94f2.appspot.com',
  messagingSenderId: '11774409413',
  appId: '1:11774409413:web:78529dce36fc7069210eac',
  measurementId: 'G-PCPN0N4EH1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
