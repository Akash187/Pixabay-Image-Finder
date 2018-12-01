import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
};
firebase.initializeApp(config);

const database = firebase.database();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

//code to check device is connected to internet or not

// let connectedRef = firebase.database().ref(".info/connected");
// connectedRef.on("value", function(snap) {
//   if (snap.val() === true) {
//     alert("connected");
//   } else {
//     alert("not connected");
//   }
// });


export {
  database,
  auth,
  provider
};

// database.ref('favourites')
//   .on('value', (snapshot) => {
//     const favourites = [];
//     snapshot.forEach((childSnapshot) => {
//       favourites.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       })
//     });
//     console.log(favourites);
//   });

// firebase.database().ref('/user').set({
//   name: 'Akash Kumar Seth',
//   age: 21,
//   isSingle: true
// }).then(() => {
//   console.log("success");
// }).catch((err) => {
//   console.log("Error in saving data to firebase.");
// });

// firebase.database().ref('/attributes').set({
//   height: 170,
//   weight: 75
// }).then(() => {
//   console.log("success");
// }).catch((err) => {
//   console.log("Error in saving data to firebase.");
// });

// let adaRef = firebase.database().ref('user');
// adaRef.update({name: 'Ayushi Gupta', age: 22})
//   .then(function() {
//     console.log("Remove succeeded.")
//   })
//   .catch(function(error) {
//     console.log("Remove failed: " + error.message)
//   });

console.log("firebase is running");