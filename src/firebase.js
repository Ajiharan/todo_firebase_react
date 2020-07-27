
import firebase from 'firebase';

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyDKCsxh6ot-5A5xPMKcAsSR8rA89D4dumI",
    authDomain: "todo-app-pro-74bd3.firebaseapp.com",
    databaseURL: "https://todo-app-pro-74bd3.firebaseio.com",
    projectId: "todo-app-pro-74bd3",
    storageBucket: "todo-app-pro-74bd3.appspot.com",
    messagingSenderId: "877423244406",
    appId: "1:877423244406:web:295240f65bafe95249db57",
    measurementId: "G-MQ2Q3L4RSV"
  });

  const db=firebaseConfig.firestore();

  export default db;



  
