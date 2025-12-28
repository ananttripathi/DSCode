// Firebase Auth Functions
// Note: Firebase is initialized in firebase-config.js

// Make functions global so they can be called from onclick handlers
let auth, db, googleProvider;

// Initialize after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    // Check if Firebase is loaded
    if (typeof firebase === 'undefined') {
        console.error('❌ Firebase not loaded! Make sure firebase-config.js loads first.');
        return;
    }
    
    console.log('✅ Firebase Auth module loading...');
    
    // Get Firebase instances
    auth = firebase.auth();
    db = firebase.firestore();
    googleProvider = new firebase.auth.GoogleAuthProvider();

    // Login Button Handler
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', showLoginModal);
        console.log('✅ Login button handler attached');
    } else {
        console.warn('⚠️ Login button not found');
    }

    // Logout Button Handler
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', signOut);
    }

    // User Menu Toggle
    const userAvatar = document.getElementById('userAvatar');
    if (userAvatar) {
        userAvatar.addEventListener('click', () => {
            const dropdown = document.getElementById('userDropdown');
            if (dropdown) {
                dropdown.classList.toggle('show');
            }
        });
    }

    // Auth State Observer
    auth.onAuthStateChanged(handleAuthStateChange);
});

// Show Login Modal
function showLoginModal() {
    console.log('🔐 Opening login modal...');
    
    const modalHTML = `
        <div id="authModal" class="modal active">
            <div class="modal-overlay" onclick="closeAuthModal()"></div>
            <div class="modal-content">
                <span class="close-modal" onclick="closeAuthModal()">&times;</span>
                <h2>🔐 Sign In to DSCode</h2>
                <p>Track your progress across devices</p>
                
                <div class="auth-tabs">
                    <button class="auth-tab active" onclick="showAuthTab('signin')">Sign In</button>
                    <button class="auth-tab" onclick="showAuthTab('signup')">Sign Up</button>
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
    document.body.style.overflow = 'hidden';
}

// Close Modal
function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.remove();
    }
    document.body.style.overflow = '';
}

// Tab Switching
function showAuthTab(tab) {
    const tabs = document.querySelectorAll('.auth-tab');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));
    
    if (tab === 'signin') {
        tabs[0].classList.add('active');
        document.getElementById('signinTab').classList.add('active');
    } else {
        tabs[1].classList.add('active');
        document.getElementById('signupTab').classList.add('active');
    }
}

// Sign In with Email
async function signInWithEmail() {
    const email = document.getElementById('signinEmail').value;
    const password = document.getElementById('signinPassword').value;
    
    if (!email || !password) {
        showAuthError('Please enter email and password');
        return;
    }
    
    try {
        await auth.signInWithEmailAndPassword(email, password);
        closeAuthModal();
        showNotification('Welcome back! 🎉');
    } catch (error) {
        showAuthError(error.message);
    }
}

// Sign Up with Email
async function signUpWithEmail() {
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    if (!email || !password) {
        showAuthError('Please enter email and password');
        return;
    }
    
    if (password.length < 6) {
        showAuthError('Password must be at least 6 characters');
        return;
    }
    
    try {
        await auth.createUserWithEmailAndPassword(email, password);
        closeAuthModal();
        showNotification('Account created! Welcome to DSCode! 🎉');
    } catch (error) {
        showAuthError(error.message);
    }
}

// Sign In with Google
async function signInWithGoogle() {
    try {
        await auth.signInWithPopup(googleProvider);
        closeAuthModal();
        showNotification('Welcome! 🎉');
    } catch (error) {
        showAuthError(error.message);
    }
}

// Sign Out
async function signOut() {
    try {
        await auth.signOut();
        showNotification('Signed out successfully');
    } catch (error) {
        console.error('Sign out error:', error);
    }
}

// Auth State Handler
function handleAuthStateChange(user) {
    const loginBtn = document.getElementById('loginBtn');
    const userMenu = document.getElementById('userMenu');
    
    if (user) {
        // User is signed in
        console.log('✅ User signed in:', user.email);
        
        if (loginBtn) loginBtn.style.display = 'none';
        if (userMenu) {
            userMenu.style.display = 'block';
            
            const userName = document.getElementById('userName');
            const userEmail = document.getElementById('userEmail');
            const userInitials = document.getElementById('userInitials');
            
            if (userName) userName.textContent = user.displayName || user.email;
            if (userEmail) userEmail.textContent = user.email;
            if (userInitials) userInitials.textContent = getInitials(user.displayName || user.email);
        }
        
        // Sync progress to cloud
        syncProgressToCloud();
    } else {
        // User is signed out
        console.log('👤 User signed out');
        
        if (loginBtn) loginBtn.style.display = 'block';
        if (userMenu) userMenu.style.display = 'none';
    }
}

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

function showNotification(message) {
    // Simple alert for now - can be replaced with a nicer toast
    alert(message);
}

// Sync Progress to Cloud
async function syncProgressToCloud() {
    if (!auth || !auth.currentUser || !db) return;
    
    const progress = {
        completedProblems: [...(window.completedProblems || [])],
        lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    try {
        await db.collection('users').doc(auth.currentUser.uid).set({
            progress: progress,
            email: auth.currentUser.email
        }, { merge: true });
        console.log('✅ Progress synced to cloud');
    } catch (error) {
        console.error('❌ Sync error:', error);
    }
}

// Load Progress from Cloud
async function loadProgressFromCloud() {
    if (!auth || !auth.currentUser || !db) return;
    
    try {
        const doc = await db.collection('users').doc(auth.currentUser.uid).get();
        if (doc.exists) {
            const data = doc.data();
            if (data.progress && data.progress.completedProblems) {
                window.completedProblems = new Set(data.progress.completedProblems);
                // Reload UI
                if (typeof loadProgress === 'function') loadProgress();
                if (typeof updateAllStats === 'function') updateAllStats();
                console.log('✅ Progress loaded from cloud');
            }
        }
    } catch (error) {
        console.error('❌ Load error:', error);
    }
}

console.log('📦 Firebase Auth module loaded');
