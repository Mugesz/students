import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDB29Wt8q03ErUw2N5_WmyXwAoGBOxpDH8",
  authDomain: "student-3afba.firebaseapp.com",
  projectId: "student-3afba",
  storageBucket: "student-3afba.appspot.com",
  messagingSenderId: "382639804313",
  appId: "1:382639804313:web:429376af7d2d88abc1cd08"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const imagedb = getStorage(app);
