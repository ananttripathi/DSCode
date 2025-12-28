// Firebase Configuration for DSCode
// Your Firebase project: dscode-acd2a

const firebaseConfig = {
    apiKey: "AIzaSyA0_ZouRwANKHGXr4kNZCJGwarXbbKW7Vc",
    authDomain: "dscode-acd2a.firebaseapp.com",
    projectId: "dscode-acd2a",
    storageBucket: "dscode-acd2a.firebasestorage.app",
    messagingSenderId: "953240156250",
    appId: "1:953240156250:web:0e938e047d0e94dd98c063"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize services
const auth = firebase.auth();
const db = firebase.firestore();

console.log('✅ Firebase initialized successfully!');

