// Authentication Management
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.loadUserFromStorage();
        this.initializeEventListeners();
        this.updateAuthDisplay();
    }

    initializeEventListeners() {
        // Auth button click
        document.getElementById('authBtn').addEventListener('click', () => {
            if (this.isLoggedIn()) {
                this.showUserMenu();
            } else {
                this.showAuthModal();
            }
        });

        // Close auth modal
        document.getElementById('closeAuthModal').addEventListener('click', () => {
            this.hideAuthModal();
        });

        // Auth tab switching
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchAuthTab(tab.dataset.tab);
            });
        });

        // Auth form links
        document.querySelectorAll('.switch-auth').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchAuthTab(link.dataset.tab);
            });
        });

        // Form submissions
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin(e.target);
        });

        document.getElementById('registerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister(e.target);
        });
    }

    showAuthModal() {
        const modal = document.getElementById('authModal');
        const overlay = document.getElementById('modalOverlay');
        
        modal.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    hideAuthModal() {
        const modal = document.getElementById('authModal');
        const overlay = document.getElementById('modalOverlay');
        
        modal.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    switchAuthTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update forms
        document.querySelectorAll('.auth-form').forEach(form => {
            form.classList.remove('active');
        });
        document.getElementById(tabName + 'Form').classList.add('active');
    }

    async handleLogin(form) {
        const formData = new FormData(form);
        const email = formData.get('email') || form.querySelector('input[type="email"]').value;
        const password = formData.get('password') || form.querySelector('input[type="password"]').value;

        // Simple validation
        if (!email || !password) {
            this.showToast('Please fill in all fields', 'error');
            return;
        }

        // Simulate API call
        this.showLoading(form);

        try {
            // In a real app, this would be an API call
            await this.simulateApiCall(1000);
            
            // Mock successful login
            const user = {
                id: Date.now(),
                email: email,
                name: this.getNameFromEmail(email),
                loginTime: new Date().toISOString(),
                preferences: {
                    newsletter: false,
                    notifications: true
                }
            };

            this.setCurrentUser(user);
            this.hideAuthModal();
            this.showToast(`Welcome back, ${user.name}!`);

        } catch (error) {
            this.showToast('Login failed. Please try again.', 'error');
        } finally {
            this.hideLoading(form);
        }
    }

    async handleRegister(form) {
        const formData = new FormData(form);
        const name = formData.get('name') || form.querySelector('input[type="text"]').value;
        const email = formData.get('email') || form.querySelector('input[type="email"]').value;
        const password = formData.get('password') || form.querySelectorAll('input[type="password"]')[0].value;
        const confirmPassword = formData.get('confirmPassword') || form.querySelectorAll('input[type="password"]')[1].value;

        // Validation
        if (!name || !email || !password || !confirmPassword) {
            this.showToast('Please fill in all fields', 'error');
            return;
        }

        if (password !== confirmPassword) {
            this.showToast('Passwords do not match', 'error');
            return;
        }

        if (password.length < 6) {
            this.showToast('Password must be at least 6 characters', 'error');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showToast('Please enter a valid email address', 'error');
            return;
        }

        // Simulate API call
        this.showLoading(form);

        try {
            await this.simulateApiCall(1500);
            
            // Mock successful registration
            const user = {
                id: Date.now(),
                email: email,
                name: name,
                loginTime: new Date().toISOString(),
                preferences: {
                    newsletter: true,
                    notifications: true
                }
            };

            this.setCurrentUser(user);
            this.hideAuthModal();
            this.showToast(`Welcome to EliteShop, ${user.name}!`);

        } catch (error) {
            this.showToast('Registration failed. Please try again.', 'error');
        } finally {
            this.hideLoading(form);
        }
    }

    setCurrentUser(user) {
        this.currentUser = user;
        this.saveUserToStorage();
        this.updateAuthDisplay();
    }

    logout() {
        this.currentUser = null;
        this.clearUserFromStorage();
        this.updateAuthDisplay();
        this.showToast('You have been logged out');
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    updateAuthDisplay() {
        const authBtn = document.getElementById('authBtn');
        const authText = authBtn.querySelector('.auth-text');
        const authIcon = authBtn.querySelector('i');

        if (this.isLoggedIn()) {
            authText.textContent = this.currentUser.name;
            authIcon.className = 'fas fa-user-circle';
            authBtn.title = 'Account menu';
        } else {
            authText.textContent = 'Login';
            authIcon.className = 'fas fa-user';
            authBtn.title = 'Login or Register';
        }
    }

    showUserMenu() {
        // Create and show user dropdown menu
        const existingMenu = document.querySelector('.user-menu');
        if (existingMenu) {
            existingMenu.remove();
            return;
        }

        const userMenu = document.createElement('div');
        userMenu.className = 'user-menu';
        userMenu.innerHTML = `
            <div class="user-menu-header">
                <div class="user-avatar">
                    <i class="fas fa-user-circle"></i>
                </div>
                <div class="user-info">
                    <div class="user-name">${this.currentUser.name}</div>
                    <div class="user-email">${this.currentUser.email}</div>
                </div>
            </div>
            <div class="user-menu-items">
                <a href="#" class="user-menu-item" onclick="authManager.showProfile()">
                    <i class="fas fa-user"></i> Profile
                </a>
                <a href="#" class="user-menu-item" onclick="authManager.showOrders()">
                    <i class="fas fa-shopping-bag"></i> Orders
                </a>
                <a href="#" class="user-menu-item" onclick="authManager.showSettings()">
                    <i class="fas fa-cog"></i> Settings
                </a>
                <hr>
                <a href="#" class="user-menu-item logout" onclick="authManager.logout()">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </a>
            </div>
        `;

        // Position the menu
        const authBtn = document.getElementById('authBtn');
        const rect = authBtn.getBoundingClientRect();
        userMenu.style.position = 'fixed';
        userMenu.style.top = (rect.bottom + 10) + 'px';
        userMenu.style.right = '20px';
        userMenu.style.zIndex = '2000';

        document.body.appendChild(userMenu);

        // Close menu when clicking outside
        setTimeout(() => {
            document.addEventListener('click', function closeMenu(e) {
                if (!userMenu.contains(e.target) && e.target !== authBtn) {
                    userMenu.remove();
                    document.removeEventListener('click', closeMenu);
                }
            });
        }, 100);
    }

    showProfile() {
        this.removeUserMenu();
        this.showToast('Profile feature coming soon!', 'info');
    }

    showOrders() {
        this.removeUserMenu();
        this.showToast('Orders feature coming soon!', 'info');
    }

    showSettings() {
        this.removeUserMenu();
        this.showToast('Settings feature coming soon!', 'info');
    }

    removeUserMenu() {
        const userMenu = document.querySelector('.user-menu');
        if (userMenu) {
            userMenu.remove();
        }
    }

    // Utility methods
    getNameFromEmail(email) {
        return email.split('@')[0].replace(/[^a-zA-Z]/g, '').replace(/^./, str => str.toUpperCase());
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async simulateApiCall(delay) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate occasional failure
                if (Math.random() < 0.1) {
                    reject(new Error('Network error'));
                } else {
                    resolve();
                }
            }, delay);
        });
    }

    showLoading(form) {
        const submitBtn = form.querySelector('.auth-submit-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<div class="loading"></div> Processing...';
    }

    hideLoading(form) {
        const submitBtn = form.querySelector('.auth-submit-btn');
        submitBtn.disabled = false;
        const isLogin = form.id === 'loginForm';
        submitBtn.textContent = isLogin ? 'Login' : 'Create Account';
    }

    showToast(message, type = 'success') {
        if (window.productManager) {
            window.productManager.showToast(message, type);
        }
    }

    // Storage methods
    saveUserToStorage() {
        if (this.currentUser) {
            localStorage.setItem('eliteshop_user', JSON.stringify(this.currentUser));
        }
    }

    loadUserFromStorage() {
        const savedUser = localStorage.getItem('eliteshop_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
        }
    }

    clearUserFromStorage() {
        localStorage.removeItem('eliteshop_user');
    }
}

// Add user menu styles
const userMenuStyles = `
.user-menu {
    background: white;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    min-width: 250px;
    overflow: hidden;
    border: 1px solid #e1e8ed;
}

.user-menu-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
}

.user-avatar i {
    font-size: 2rem;
}

.user-name {
    font-weight: 600;
    margin-bottom: 0.2rem;
}

.user-email {
    font-size: 0.8rem;
    opacity: 0.9;
}

.user-menu-items {
    padding: 0.5rem 0;
}

.user-menu-item {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.8rem 1.5rem;
    color: #333;
    text-decoration: none;
    transition: background-color 0.2s ease;
}

.user-menu-item:hover {
    background-color: #f8f9fa;
}

.user-menu-item.logout {
    color: #ff4757;
}

.user-menu-item.logout:hover {
    background-color: #fff5f5;
}

.user-menu hr {
    margin: 0.5rem 0;
    border: none;
    border-top: 1px solid #e1e8ed;
}
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = userMenuStyles;
document.head.appendChild(styleSheet);

// Initialize Auth Manager
let authManager;
document.addEventListener('DOMContentLoaded', () => {
    authManager = new AuthManager();
    window.authManager = authManager;
});
