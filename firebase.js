import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDVDlFv3WvbZm82yr1622qZH__VF4hk3fY",
  authDomain: "gifted-chat-47038.firebaseapp.com",
  projectId: "gifted-chat-47038",
  databaseURL: "https://gifted-chat-47038-default-rtdb.firebaseio.com",
  storageBucket: "gifted-chat-47038.appspot.com",
  messagingSenderId: "289008858890",
  appId: "1:289008858890:web:e40a4ccbcb96085f6facf3",
  measurementId: "G-99W12CTCG7",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
export { db, auth };
