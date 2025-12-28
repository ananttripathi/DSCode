// Firebase Configuration for DSCode
// Your Firebase project: dscode-acd2a

// Wait for Firebase SDK to load
if (typeof firebase !== 'undefined') {
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

    console.log('✅ Firebase initialized successfully!');
} else {
    console.error('❌ Firebase SDK not loaded! Make sure Firebase CDN scripts are in <head>');
}

