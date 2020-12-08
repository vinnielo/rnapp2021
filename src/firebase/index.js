import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/database';
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPoohVlcDC5bCjGDoOSKy8dYhl91TFOYY",
  authDomain: "rnapp2021.firebaseapp.com",
  projectId: "rnapp2021",
  databaseURL: "https://rnapp2021-default-rtdb.firebaseio.com",
  storageBucket: "rnapp2021.appspot.com",
  messagingSenderId: "440207308793",
  appId: "1:440207308793:web:16f71c5df88aa500316f28",
  measurementId: "G-NKE8VSJDH4"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  // firebase.analytics();
}

// const DB = firebase.database();
// const usersCollection = DB.ref("users");

export { firebase};
