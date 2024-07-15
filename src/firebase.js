import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDZOaLkPPqE-CDjdpWZgmnAdBXTnGiFzyw",
  authDomain: "mobigic-ffe84.firebaseapp.com",
  projectId: "mobigic-ffe84",
  storageBucket: "mobigic-ffe84.appspot.com",
  messagingSenderId: "71060914208",
  appId: "1:71060914208:web:9e1b3775efa21dc75abc45",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
