import firebase from "firebase/app";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBEFxsDNVUpXS10oDrmLlUQvz6819FwVao",
  authDomain: "interdiplinar.firebaseapp.com",
  databaseURL: "https://interdiplinar.firebaseio.com",
  projectId: "interdiplinar",
  storageBucket: "interdiplinar.appspot.com",
  messagingSenderId: "259613422518",
  appId: "1:259613422518:web:ad2dbd664d17e648014717",
  measurementId: "G-5QNN4Z884M",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
