// Firebase Configuration
// Replace these values with your own Firebase config
const firebaseConfig = {
    apiKey: "YOUR-API-KEY-HERE",
    authDomain: "YOUR-PROJECT-ID.firebaseapp.com",
    projectId: "YOUR-PROJECT-ID",
    storageBucket: "YOUR-PROJECT-ID.appspot.com",
    messagingSenderId: "YOUR-MESSAGING-SENDER-ID",
    appId: "YOUR-APP-ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Google Auth Provider
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Login Button Handler
document.getElementById('loginBtn')?.addEventListener('click', () => {
    showLoginModal();
});

// Show Login Modal
function showLoginModal() {
    const modalHTML = `
        <div id="authModal" class="modal active">
            <div class="modal-content">
                <span class="close-modal" onclick="closeAuthModal()">&times;</span>
                <h2>🔐 Sign In to DSCode</h2>
                <p>Track your progress across devices</p>
                
                <div class="auth-tabs">
                    <button class="auth-tab active" onclick="showTab('signin')">Sign In</button>
                    <button class="auth-tab" onclick="showTab('signup')">Sign Up</button>
                </div>
                
                <div id="signinTab" class="tab-content active">
                    <input type="email" id="signinEmail" placeholder="Email" class="auth-input">
                    <input type="password" id="signinPassword" placeholder="Password" class="auth-input">
                    <button onclick="signInWithEmail()" class="auth-btn">Sign In</button>
                </div>
                
                <div id="signupTab" class="tab-content">
                    <input type="email" id="signupEmail" placeholder="Email" class="auth-input">
                    <input type="password" id="signupPassword" placeholder="Password (min 6 chars)" class="auth-input">
                    <button onclick="signUpWithEmail()" class="auth-btn">Create Account</button>
                </div>
                
                <div class="auth-divider">OR</div>
                
                <button onclick="signInWithGoogle()" class="google-btn">
                    <span>🔍</span> Continue with Google
                </button>
                
                <div id="authError" class="auth-error"></div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Close Modal
function closeAuthModal() {
    document.getElementById('authModal')?.remove();
}

// Tab Switching
function showTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    
    if (tab === 'signin') {
        document.querySelector('.auth-tab:first-child').classList.add('active');
        document.getElementById('signinTab').classList.add('active');
    } else {
        document.querySelector('.auth-tab:last-child').classList.add('active');
        document.getElementById('signupTab').classList.add('active');
    }
}

// Sign In with Email
async function signInWithEmail() {
    const email = document.getElementById('signinEmail').value;
    const password = document.getElementById('signinPassword').value;
    
    try {
        await auth.signInWithEmailAndPassword(email, password);
        closeAuthModal();
        showSuccess('Welcome back! 🎉');
    } catch (error) {
        showAuthError(error.message);
    }
}

// Sign Up with Email
async function signUpWithEmail() {
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    if (password.length < 6) {
        showAuthError('Password must be at least 6 characters');
        return;
    }
    
    try {
        await auth.createUserWithEmailAndPassword(email, password);
        closeAuthModal();
        showSuccess('Account created! Welcome to DSCode! 🎉');
    } catch (error) {
        showAuthError(error.message);
    }
}

// Sign In with Google
async function signInWithGoogle() {
    try {
        await auth.signInWithPopup(googleProvider);
        closeAuthModal();
        showSuccess('Welcome! 🎉');
    } catch (error) {
        showAuthError(error.message);
    }
}

// Sign Out
async function signOut() {
    try {
        await auth.signOut();
        showSuccess('Signed out successfully');
    } catch (error) {
        console.error('Sign out error:', error);
    }
}

// Auth State Observer
auth.onAuthStateChanged(user => {
    const loginBtn = document.getElementById('loginBtn');
    const userMenu = document.getElementById('userMenu');
    
    if (user) {
        // User is signed in
        if (loginBtn) loginBtn.style.display = 'none';
        if (userMenu) {
            userMenu.style.display = 'block';
            document.getElementById('userName').textContent = user.displayName || user.email;
            document.getElementById('userEmail').textContent = user.email;
            document.getElementById('userInitials').textContent = getInitials(user.displayName || user.email);
        }
        
        // Sync progress to Firestore
        syncProgressToCloud();
    } else {
        // User is signed out
        if (loginBtn) loginBtn.style.display = 'block';
        if (userMenu) userMenu.style.display = 'none';
    }
});

// Logout Button Handler
document.getElementById('logoutBtn')?.addEventListener('click', signOut);

// User Menu Toggle
document.getElementById('userAvatar')?.addEventListener('click', () => {
    document.getElementById('userDropdown')?.classList.toggle('show');
});

// Helper Functions
function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
}

function showAuthError(message) {
    const errorDiv = document.getElementById('authError');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
}

function showSuccess(message) {
    alert(message); // Replace with a nicer toast notification
}

// Sync Progress to Cloud
async function syncProgressToCloud() {
    if (!auth.currentUser) return;
    
    const progress = {
        completedProblems: [...completedProblems],
        lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    try {
        await db.collection('users').doc(auth.currentUser.uid).set({
            progress: progress,
            email: auth.currentUser.email
        }, { merge: true });
    } catch (error) {
        console.error('Sync error:', error);
    }
}

// Load Progress from Cloud
async function loadProgressFromCloud() {
    if (!auth.currentUser) return;
    
    try {
        const doc = await db.collection('users').doc(auth.currentUser.uid).get();
        if (doc.exists) {
            const data = doc.data();
            completedProblems = new Set(data.progress?.completedProblems || []);
            loadProgress(); // Reload UI
            updateAllStats();
        }
    } catch (error) {
        console.error('Load error:', error);
    }
}
