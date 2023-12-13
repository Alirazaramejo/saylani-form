import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

 const firebaseConfig = {
    apiKey: "AIzaSyAQjlwhuwWYJ-OdhhPP4XRxEgWSfQ5d3-o",
    authDomain: "ali-raza-518df.firebaseapp.com",
    databaseURL: "https://ali-raza-518df-default-rtdb.firebaseio.com",
    projectId: "ali-raza-518df",
    storageBucket: "ali-raza-518df.appspot.com",
    messagingSenderId: "308309137877",
    appId: "1:308309137877:web:ac0be37dd3c2bb9544055c",
    measurementId: "G-82NM2JZS9D"
  };

const app = initializeApp(firebaseConfig);

export {app};