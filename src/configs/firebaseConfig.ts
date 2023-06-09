import { getApp, getApps, initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  initializeAuth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCSa_2xDHzbli_1H2O8IR0K9hMbUQ2N95I",
  authDomain: "control-qr-380300.firebaseapp.com",
  projectId: "control-qr-380300",
  storageBucket: "control-qr-380300.appspot.com",
  messagingSenderId: "911129246688",
  appId: "1:911129246688:web:435b3f17a29660dc650985",
  measurementId: "G-WC849PQ6XB",
};
let app;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    initializeAuth(app, {
      persistence: [browserLocalPersistence],
    });
  } catch (error) {
    console.warn("Error initializing app: " + error);
  }
} else {
  app = getApp();
  getAuth(app);
}
