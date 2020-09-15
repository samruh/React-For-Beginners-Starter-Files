import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyDVSPShkaQKDT5u89NNJ8OnkQg_0QHdSoI",
        authDomain: "catch-of-the-day-sam-ruh.firebaseapp.com",
        databaseURL: "https://catch-of-the-day-sam-ruh.firebaseio.com",
        projectId: "catch-of-the-day-sam-ruh",
        storageBucket: "catch-of-the-day-sam-ruh.appspot.com",
        messagingSenderId: "458790378311",
        appId: "1:458790378311:web:8d0bbb2c27a37f92760a62",
        measurementId: "G-XWFB8FE5P7"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a name export
export {firebaseApp};

// this is a default export
export default base;