import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
 apiKey: "AIzaSyAVwfgDRrb22Patm4-TMv9WwYHkQIv3DIM",

  authDomain: "pbtp5-c36f6.firebaseapp.com",

  projectId: "pbtp5-c36f6",

  storageBucket: "pbtp5-c36f6.appspot.com",

  messagingSenderId: "39700296617",

  appId: "1:39700296617:web:f997b8ffc727f68984cab8",

  measurementId: "G-QE4N5RKXW5"

  
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
