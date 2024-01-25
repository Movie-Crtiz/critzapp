
import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase

const firebaseConfig = {
    apiKey: "AIzaSyBHSlMBBDWXWS2LzWcgSbvelq4wFPX-p6s",
    authDomain: "critzapplication.firebaseapp.com",
    projectId: "critzapplication",
    storageBucket: "critzapplication.appspot.com",
    messagingSenderId: "733448868006",
    appId: "1:733448868006:web:dbde4241ddce83b30de467",
    measurementId: "G-5D2SSB968E"
  };


  const app = initializeApp(firebaseConfig);

