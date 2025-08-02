// Main Application Controller
class EliteShopApp {
    constructor() {
        this.isInitialized = false;
        this.mobileMenuOpen = false;
        
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeApp();
            });
        } else {
            this.initializeApp();
        }
    }

    initializeApp() {
        this.initializeNavigation();
        this.initializeSmoothScrolling();
        this.initializeScrollEffects();
        this.initializeNewsletterForm();
        this.initializeMobileMenu();
        this.initializeModalCloseOnEscape();
        this.initializeIntersectionObserver();
        this.initializeBackToTop();
        
        this.isInitialized = true;
        
        // Custom event for when app is fully initialized
        window.dispatchEvent(new CustomEvent('eliteshopInitialized'));
    }

    initializeNavigation() {
        // Smooth navigation between sections
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Remove active class from all nav links
                    navLinks.forEach(l => l.classList.remove('active'));
                    // Add active class to clicked link
                    link.classList.add('active');
                    
                    // Smooth scroll to section
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    this.closeMobileMenu();
                }
            });
        });

        // Update active nav link on scroll
        this.updateActiveNavOnScroll();
    }

    updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    initializeSmoothScrolling() {
        // Smooth scrolling for CTA button
        const ctaBtn = document.querySelector('.cta-btn');
        if (ctaBtn) {
            ctaBtn.addEventListener('click', () => {
                document.getElementById('products').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }
    }

    initializeScrollEffects() {
        // Header scroll effect
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(102, 126, 234, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                header.style.backdropFilter = 'none';
            }
        });
    }

    initializeNewsletterForm() {
        const newsletterForm = document.querySelector('.newsletter-form');
        const emailInput = document.getElementById('newsletterEmail');
        const subscribeBtn = document.querySelector('.subscribe-btn');

        if (newsletterForm && emailInput && subscribeBtn) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSubscription(emailInput.value);
            });

            subscribeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleNewsletterSubscription(emailInput.value);
            });
        }
    }

    async handleNewsletterSubscription(email) {
        if (!email || !this.isValidEmail(email)) {
            this.showToast('Please enter a valid email address', 'error');
            return;
        }

        const subscribeBtn = document.querySelector('.subscribe-btn');
        const originalText = subscribeBtn.textContent;
        
        subscribeBtn.textContent = 'Subscribing...';
        subscribeBtn.disabled = true;

        try {
            // Simulate API call
            await this.delay(1000);
            
            // Save to localStorage (in real app, would send to server)
            const subscribers = JSON.parse(localStorage.getItem('eliteshop_subscribers') || '[]');
            
            if (subscribers.includes(email)) {
                this.showToast('You are already subscribed!', 'warning');
            } else {
                subscribers.push(email);
                localStorage.setItem('eliteshop_subscribers', JSON.stringify(subscribers));
                
                document.getElementById('newsletterEmail').value = '';
                this.showToast('Thank you for subscribing!', 'success');
            }
        } catch (error) {
            this.showToast('Subscription failed. Please try again.', 'error');
        } finally {
            subscribeBtn.textContent = originalText;
            subscribeBtn.disabled = false;
        }
    }

    initializeMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const navMenu = document.querySelector('.nav-menu');

        if (mobileMenuToggle && navMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });

            // Close mobile menu when clicking on nav links
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMobileMenu();
                });
            });
        }
    }

    toggleMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const toggleIcon = mobileMenuToggle.querySelector('i');

        if (this.mobileMenuOpen) {
            this.closeMobileMenu();
        } else {
            navMenu.classList.add('active');
            toggleIcon.className = 'fas fa-times';
            this.mobileMenuOpen = true;
            document.body.style.overflow = 'hidden';
        }
    }

    closeMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const toggleIcon = mobileMenuToggle.querySelector('i');

        navMenu.classList.remove('active');
        toggleIcon.className = 'fas fa-bars';
        this.mobileMenuOpen = false;
        document.body.style.overflow = 'auto';
    }

    initializeModalCloseOnEscape() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close any open modals
                const activeModals = document.querySelectorAll('.modal-overlay.active');
                const activeSidebars = document.querySelectorAll('.cart-sidebar.open');
                const activeMenus = document.querySelectorAll('.user-menu');

                activeModals.forEach(modal => {
                    modal.classList.remove('active');
                });

                activeSidebars.forEach(sidebar => {
                    sidebar.classList.remove('open');
                });

                activeMenus.forEach(menu => {
                    menu.remove();
                });

                // Hide specific modals
                if (window.productManager) {
                    window.productManager.hideModal('productModal');
                    window.productManager.hideModal('authModal');
                }

                if (window.checkoutManager) {
                    window.checkoutManager.hideCheckout();
                }

                if (window.cartManager) {
                    window.cartManager.closeCart();
                }

                document.body.style.overflow = 'auto';
            }
        });
    }

    initializeIntersectionObserver() {
        // Animate elements when they come into view
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    
                    // Add staggered animation for grid items
                    if (entry.target.classList.contains('category-card') || 
                        entry.target.classList.contains('product-card')) {
                        const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                        entry.target.style.animationDelay = `${delay}ms`;
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll(
            '.category-card, .product-card, .newsletter-content, .footer-section'
        );
        
        animatedElements.forEach(el => observer.observe(el));
    }

    initializeBackToTop() {
        // Create back to top button
        const backToTopBtn = document.createElement('button');
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            transform: translateY(100px);
            transition: all 0.3s ease;
            z-index: 1000;
        `;

        document.body.appendChild(backToTopBtn);

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.style.transform = 'translateY(0)';
            } else {
                backToTopBtn.style.transform = 'translateY(100px)';
            }
        });

        // Scroll to top functionality
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Hover effect
        backToTopBtn.addEventListener('mouseenter', () => {
            backToTopBtn.style.transform = window.scrollY > 500 ? 'translateY(-5px)' : 'translateY(100px)';
        });

        backToTopBtn.addEventListener('mouseleave', () => {
            backToTopBtn.style.transform = window.scrollY > 500 ? 'translateY(0)' : 'translateY(100px)';
        });
    }

    // Utility methods
    showToast(message, type = 'success') {
        if (window.productManager) {
            window.productManager.showToast(message, type);
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Performance optimization
    debounce(func, wait) {
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

    throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }

    // Public API methods
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    openCart() {
        if (window.cartManager) {
            window.cartManager.openCart();
        }
    }

    openAuth() {
        if (window.authManager) {
            window.authManager.showAuthModal();
        }
    }

    searchProducts(query) {
        if (window.productManager) {
            window.productManager.searchProducts(query);
            this.scrollToSection('products');
        }
    }

    filterByCategory(category) {
        if (window.productManager) {
            document.getElementById('categoryFilter').value = category;
            window.productManager.applyFilters();
            this.scrollToSection('products');
        }
    }
}

// Global event handlers for onclick attributes in HTML
window.addEventListener('DOMContentLoaded', () => {
    // Initialize the main app
    window.eliteShopApp = new EliteShopApp();
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('EliteShop Error:', e.error);
    
    // Show user-friendly error message
    if (window.productManager) {
        window.productManager.showToast('Something went wrong. Please refresh the page.', 'error');
    }
});

// Performance monitoring
window.addEventListener('load', () => {
    // Log performance metrics
    if (window.performance) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`EliteShop loaded in ${loadTime}ms`);
    }
});

// Service Worker registration for better performance (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export for module systems (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EliteShopApp;
}
