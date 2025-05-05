import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC84_nYlkma4R_5-nlB6Co5JFnK03Q21wk",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "psl-score-predictor",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
