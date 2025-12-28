// DSCode - Data Science, AI & ML Learning Platform
// Interactive Features and Progress Tracking

// ============================================
// State Management
// ============================================
let completedProblems = new Set();
let currentDifficulty = 'all';
let searchQuery = '';

// ============================================
// Initialize on Load
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    loadProgress();
    attachEventListeners();
    updateAllStats();
    setupTopicToggles(); // Setup expand/collapse
    setupTopicLinks(); // Setup clickable topic links
});

// ============================================
// Topic Link Navigation
// ============================================
function setupTopicLinks() {
    const problemLinks = document.querySelectorAll('.problem-title');
    
    problemLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const problemItem = link.closest('.problem-item');
            const problemId = problemItem.dataset.problemId;
            const topic = problemItem.dataset.topic;
            const title = link.textContent;
            
            // Store current problem data
            localStorage.setItem('currentProblem', JSON.stringify({
                id: problemId,
                topic: topic,
                title: title,
                difficulty: problemItem.dataset.difficulty
            }));
            
            // Navigate to topic detail page
            window.location.href = `topic-detail.html?id=${problemId}&topic=${topic}`;
        });
    });
}

// ============================================
// Initialization
// ============================================
function initializeApp() {
    // Check for saved dark mode preference
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }
    
    // Update toggle switch if it exists
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.checked = darkMode === 'enabled';
    }
}

// ============================================
// Topic Toggle (Expand/Collapse)
// ============================================
function setupTopicToggles() {
    const topicHeaders = document.querySelectorAll('[data-topic-toggle]');
    
    topicHeaders.forEach(header => {
        header.addEventListener('click', (e) => {
            // Don't toggle if clicking on progress bar or checkbox
            if (e.target.closest('.problem-checkbox') || e.target.closest('input')) {
                return;
            }
            
            const topicCard = header.closest('.topic-card');
            topicCard.classList.toggle('collapsed');
            
            // Save collapse state
            const topicName = header.dataset.topicToggle;
            const isCollapsed = topicCard.classList.contains('collapsed');
            localStorage.setItem(`topic-${topicName}-collapsed`, isCollapsed);
        });
    });
    
    // Restore collapse states
    topicHeaders.forEach(header => {
        const topicName = header.dataset.topicToggle;
        const isCollapsed = localStorage.getItem(`topic-${topicName}-collapsed`) === 'true';
        
        if (isCollapsed) {
            header.closest('.topic-card').classList.add('collapsed');
        }
    });
}

// ============================================
// Event Listeners
// ============================================
function attachEventListeners() {
    // Settings modal
    const settingsBtn = document.getElementById('settingsBtn');
    const closeSettings = document.getElementById('closeSettings');
    const modalOverlay = document.getElementById('modalOverlay');
    const saveSettings = document.getElementById('saveSettings');
    
    settingsBtn?.addEventListener('click', openSettings);
    closeSettings?.addEventListener('click', closeSettingsModal);
    modalOverlay?.addEventListener('click', closeSettingsModal);
    saveSettings?.addEventListener('click', closeSettingsModal);

    // Dark mode toggle (from settings)
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle?.addEventListener('change', toggleDarkMode);

    // Reset progress (from settings)
    const resetProgressBtn = document.getElementById('resetProgressBtn');
    resetProgressBtn?.addEventListener('click', resetProgress);
    
    // Legacy reset button (if exists)
    const resetButton = document.getElementById('resetProgress');
    resetButton?.addEventListener('click', resetProgress);

    // Export/Import progress
    const exportBtn = document.getElementById('exportProgressBtn');
    const importBtn = document.getElementById('importProgressBtn');
    const importFileInput = document.getElementById('importFileInput');
    
    exportBtn?.addEventListener('click', exportProgress);
    importBtn?.addEventListener('click', () => importFileInput?.click());
    importFileInput?.addEventListener('change', handleImportFile);

    // Difficulty filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const difficulty = e.target.dataset.difficulty;
            setDifficultyFilter(difficulty);
        });
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput?.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        filterProblems();
    });

    // Problem checkboxes
    const checkboxes = document.querySelectorAll('.problem-item input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleCheckboxChange);
    });

    // Smooth scrolling for navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
}

// ============================================
// Settings Modal
// ============================================
function openSettings() {
    const modal = document.getElementById('settingsModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateSettingsStats();
        
        // Update toggle switch state
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) {
            darkModeToggle.checked = document.body.classList.contains('dark-mode');
        }
    }
}

function closeSettingsModal() {
    const modal = document.getElementById('settingsModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function updateSettingsStats() {
    const totalProblems = document.querySelectorAll('.problem-item').length;
    const completed = completedProblems.size;
    const remaining = totalProblems - completed;
    const percentage = totalProblems > 0 ? Math.round((completed / totalProblems) * 100) : 0;
    
    const totalCompletedEl = document.getElementById('totalCompleted');
    const totalRemainingEl = document.getElementById('totalRemaining');
    const completionPercentEl = document.getElementById('completionPercent');
    
    if (totalCompletedEl) totalCompletedEl.textContent = completed;
    if (totalRemainingEl) totalRemainingEl.textContent = remaining;
    if (completionPercentEl) completionPercentEl.textContent = percentage + '%';
}

// ============================================
// Dark Mode
// ============================================
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
}

// ============================================
// Progress Management
// ============================================
function loadProgress() {
    const saved = localStorage.getItem('completedProblems');
    if (saved) {
        completedProblems = new Set(JSON.parse(saved));
        
        // Update checkboxes
        completedProblems.forEach(problemId => {
            const checkbox = document.getElementById(problemId);
            if (checkbox) {
                checkbox.checked = true;
                checkbox.closest('.problem-item')?.classList.add('completed');
            }
        });
    }
}

function saveProgress() {
    localStorage.setItem('completedProblems', JSON.stringify([...completedProblems]));
}

function handleCheckboxChange(e) {
    const checkbox = e.target;
    const problemId = checkbox.id;
    const problemItem = checkbox.closest('.problem-item');

    if (checkbox.checked) {
        completedProblems.add(problemId);
        problemItem?.classList.add('completed');
        animateCompletion(problemItem);
    } else {
        completedProblems.delete(problemId);
        problemItem?.classList.remove('completed');
    }

    saveProgress();
    updateAllStats();
    
    // Update settings stats if modal is open
    const modal = document.getElementById('settingsModal');
    if (modal?.classList.contains('active')) {
        updateSettingsStats();
    }
}

function animateCompletion(element) {
    if (!element) return;
    
    element.style.animation = 'none';
    setTimeout(() => {
        element.style.animation = 'fadeIn 0.5s ease-out';
    }, 10);
}

function resetProgress() {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
        completedProblems.clear();
        localStorage.removeItem('completedProblems');
        
        // Uncheck all checkboxes
        const checkboxes = document.querySelectorAll('.problem-item input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
            checkbox.closest('.problem-item')?.classList.remove('completed');
        });
        
        updateAllStats();
        updateSettingsStats();
        
        // Show success message
        alert('Progress has been reset successfully!');
    }
}

// ============================================
// Statistics Update
// ============================================
function updateAllStats() {
    updateGlobalStats();
    updateTopicProgress();
}

function updateGlobalStats() {
    const completedCount = completedProblems.size;
    const completedElement = document.getElementById('completedProblems');
    
    if (completedElement) {
        completedElement.textContent = completedCount;
    }
}

function updateTopicProgress() {
    const topics = ['python', 'numpy', 'stats', 'ml', 'dl', 'nlp', 'cv', 'sql', 'fe', 'mlops', 'genai', 'rag', 'agents'];
    
    topics.forEach(topic => {
        const topicProblems = document.querySelectorAll(`[data-topic="${topic}"]`);
        const completedInTopic = Array.from(topicProblems).filter(problem => {
            const checkbox = problem.querySelector('input[type="checkbox"]');
            return checkbox?.checked;
        }).length;
        
        const totalInTopic = topicProblems.length;
        const percentage = totalInTopic > 0 ? (completedInTopic / totalInTopic) * 100 : 0;
        
        // Update progress text
        const progressText = document.querySelector(`.topic-completed[data-topic="${topic}"]`);
        if (progressText) {
            progressText.textContent = completedInTopic;
        }
        
        // Update progress bar
        const progressBar = document.querySelector(`.progress-fill[data-topic="${topic}"]`);
        if (progressBar) {
            progressBar.style.width = `${percentage}%`;
        }
    });
}

// ============================================
// Filtering
// ============================================
function setDifficultyFilter(difficulty) {
    currentDifficulty = difficulty;
    
    // Update active button
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.difficulty === difficulty) {
            btn.classList.add('active');
        }
    });
    
    filterProblems();
}

function filterProblems() {
    const problemItems = document.querySelectorAll('.problem-item');
    
    problemItems.forEach(item => {
        const difficulty = item.dataset.difficulty;
        const problemTitle = item.querySelector('.problem-title')?.textContent.toLowerCase() || '';
        
        // Check difficulty filter
        const matchesDifficulty = currentDifficulty === 'all' || difficulty === currentDifficulty;
        
        // Check search query
        const matchesSearch = searchQuery === '' || problemTitle.includes(searchQuery);
        
        // Show or hide
        if (matchesDifficulty && matchesSearch) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
    
    // Hide topic cards with no visible problems
    updateTopicVisibility();
}

function updateTopicVisibility() {
    const topicCards = document.querySelectorAll('.topic-card');
    
    topicCards.forEach(card => {
        const visibleProblems = card.querySelectorAll('.problem-item:not(.hidden)');
        
        if (visibleProblems.length === 0) {
            card.style.display = 'none';
        } else {
            card.style.display = 'block';
        }
    });
}

// ============================================
// Smooth Scrolling
// ============================================
function smoothScroll(e) {
    const href = e.target.getAttribute('href');
    
    if (href && href.startsWith('#')) {
        e.preventDefault();
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
            const targetPosition = targetElement.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update active nav link
            updateActiveNavLink(e.target);
        }
    }
}

function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// ============================================
// Scroll-based Navigation Highlighting
// ============================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Update active nav link based on scroll position
    if (currentSection) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
});

// ============================================
// Analytics and Insights
// ============================================
function getCompletionStats() {
    const stats = {
        total: 0,
        completed: completedProblems.size,
        byDifficulty: {
            easy: { total: 0, completed: 0 },
            medium: { total: 0, completed: 0 },
            hard: { total: 0, completed: 0 }
        },
        byTopic: {}
    };
    
    const problemItems = document.querySelectorAll('.problem-item');
    stats.total = problemItems.length;
    
    problemItems.forEach(item => {
        const difficulty = item.dataset.difficulty;
        const topic = item.dataset.topic;
        const problemId = item.dataset.problemId;
        
        // Count by difficulty
        if (stats.byDifficulty[difficulty]) {
            stats.byDifficulty[difficulty].total++;
            if (completedProblems.has(problemId)) {
                stats.byDifficulty[difficulty].completed++;
            }
        }
        
        // Count by topic
        if (!stats.byTopic[topic]) {
            stats.byTopic[topic] = { total: 0, completed: 0 };
        }
        stats.byTopic[topic].total++;
        if (completedProblems.has(problemId)) {
            stats.byTopic[topic].completed++;
        }
    });
    
    return stats;
}

// ============================================
// Export/Import Progress (Advanced Feature)
// ============================================
function exportProgress() {
    const data = {
        completedProblems: [...completedProblems],
        exportDate: new Date().toISOString(),
        version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dscode-progress.json';
    a.click();
    URL.revokeObjectURL(url);
}

function importProgress(file) {
    const reader = new FileReader();
    
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.completedProblems && Array.isArray(data.completedProblems)) {
                completedProblems = new Set(data.completedProblems);
                saveProgress();
                loadProgress();
                updateAllStats();
                updateSettingsStats();
                alert('Progress imported successfully!');
            } else {
                alert('Invalid progress file format.');
            }
        } catch (error) {
            alert('Error importing progress file.');
            console.error(error);
        }
    };
    
    reader.readAsText(file);
}

function handleImportFile(event) {
    const file = event.target.files[0];
    if (file) {
        importProgress(file);
        // Reset the input so the same file can be imported again if needed
        event.target.value = '';
    }
}

// ============================================
// Keyboard Shortcuts
// ============================================
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('searchInput')?.focus();
    }
    
    // Ctrl/Cmd + , to open settings
    if ((e.ctrlKey || e.metaKey) && e.key === ',') {
        e.preventDefault();
        openSettings();
    }
    
    // ESC to close settings modal
    if (e.key === 'Escape') {
        closeSettingsModal();
    }
});

// ============================================
// Performance Optimization
// ============================================
// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to search
const debouncedSearch = debounce((query) => {
    searchQuery = query.toLowerCase();
    filterProblems();
}, 300);

// Update search event listener with debounce
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.removeEventListener('input', searchInput._listener);
    searchInput._listener = (e) => debouncedSearch(e.target.value);
    searchInput.addEventListener('input', searchInput._listener);
}

// ============================================
// Utility Functions
// ============================================
function getCompletionPercentage() {
    const total = document.querySelectorAll('.problem-item').length;
    return total > 0 ? Math.round((completedProblems.size / total) * 100) : 0;
}

function getStreak() {
    // This would require more complex date tracking
    // Placeholder for future implementation
    return 0;
}

// ============================================
// Console Info (for developers)
// ============================================
console.log('%c📊 DSCode - Data Science Learning Platform', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
console.log('%cKeyboard Shortcuts:', 'color: #6366f1; font-weight: bold;');
console.log('  • Ctrl/Cmd + K: Focus search');
console.log('  • Ctrl/Cmd + ,: Open settings');
console.log('  • ESC: Close settings modal');
console.log('%cAvailable Functions:', 'color: #6366f1; font-weight: bold;');
console.log('  • getCompletionStats(): View detailed progress');
console.log('  • exportProgress(): Export your progress');
console.log('  • getCompletionPercentage(): Get overall completion %');

// Export functions for console access
window.dsCode = {
    getCompletionStats,
    exportProgress,
    importProgress,
    getCompletionPercentage,
    resetProgress
};

// ============================================
// Donate Modal Functions
// ============================================
document.getElementById('donateBtn')?.addEventListener('click', () => {
    document.getElementById('donateModal')?.classList.add('active');
    document.body.style.overflow = 'hidden';
});

function closeDonateModal() {
    document.getElementById('donateModal')?.classList.remove('active');
    document.body.style.overflow = '';
}

function copyUPI() {
    const upiId = document.getElementById('upiId').textContent;
    navigator.clipboard.writeText(upiId).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '✅ Copied!';
        btn.style.background = '#10b981';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
    }).catch(err => {
        alert('Failed to copy. UPI ID: ' + upiId);
    });
}

// Close donate modal on overlay click
document.querySelector('#donateModal .modal-overlay')?.addEventListener('click', closeDonateModal);

