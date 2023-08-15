import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAI8h_sO59kcXxIrD9KNXUk_Om_OFPSXjY",
  authDomain: "techshop-f6e4b.firebaseapp.com",
  projectId: "techshop-f6e4b",
  storageBucket: "techshop-f6e4b.appspot.com",
  messagingSenderId: "347495600363",
  appId: "1:347495600363:web:7451bfa9d9598768a06eae",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
