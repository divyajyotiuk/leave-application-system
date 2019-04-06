import firebase from 'firebase';

let Firebase = firebase;

const config = {
    apiKey: "AIzaSyAe4DNqyyFwMjAJIYiN0BOCm_3-43emDiI",
    authDomain: "wtlproject-8f41a.firebaseapp.com",
    databaseURL: "https://wtlproject-8f41a.firebaseio.com",
    projectId: "wtlproject-8f41a",
    storageBucket: "wtlproject-8f41a.appspot.com",
    messagingSenderId: "766706853449"
};

Firebase.initializeApp(config);

export default Firebase;