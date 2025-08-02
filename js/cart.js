// Shopping Cart Management
class CartManager {
    constructor() {
        this.items = [];
        this.isOpen = false;
        this.loadCartFromStorage();
        this.initializeEventListeners();
        this.updateCartDisplay();
    }

    initializeEventListeners() {
        // Cart toggle button
        document.getElementById('cartBtn').addEventListener('click', () => {
            this.toggleCart();
        });

        // Close cart button
        document.getElementById('closeCart').addEventListener('click', () => {
            this.closeCart();
        });

        // Checkout button
        document.getElementById('checkoutBtn').addEventListener('click', () => {
            this.proceedToCheckout();
        });

        // Modal overlay click to close
        document.getElementById('modalOverlay').addEventListener('click', () => {
            this.closeCart();
            if (window.productManager) {
                window.productManager.hideModal('productModal');
                window.productManager.hideModal('authModal');
            }
            if (window.checkoutManager) {
                window.checkoutManager.hideCheckout();
            }
        });
    }

    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }

        this.saveCartToStorage();
        this.updateCartDisplay();
        this.animateCartIcon();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCartToStorage();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveCartToStorage();
                this.updateCartDisplay();
            }
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartItems();
        this.updateCartTotal();
        this.updateCheckoutButton();
    }

    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        const count = this.getItemCount();
        cartCount.textContent = count;
        cartCount.style.display = count > 0 ? 'flex' : 'none';
    }

    updateCartItems() {
        const cartItemsContainer = document.getElementById('cartItems');
        
        if (this.items.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                </div>
            `;
            return;
        }

        cartItemsContainer.innerHTML = this.items.map(item => `
            <div class="cart-item" data-item-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity - 1})">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="cart-item-quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity + 1})">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button class="remove-item" onclick="cartManager.removeItem(${item.id})" title="Remove item">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    updateCartTotal() {
        const cartTotal = document.getElementById('cartTotal');
        cartTotal.textContent = this.getTotal().toFixed(2);
    }

    updateCheckoutButton() {
        const checkoutBtn = document.getElementById('checkoutBtn');
        checkoutBtn.disabled = this.items.length === 0;
    }

    toggleCart() {
        if (this.isOpen) {
            this.closeCart();
        } else {
            this.openCart();
        }
    }

    openCart() {
        const cartSidebar = document.getElementById('cartSidebar');
        const overlay = document.getElementById('modalOverlay');
        
        cartSidebar.classList.add('open');
        overlay.classList.add('active');
        this.isOpen = true;
        document.body.style.overflow = 'hidden';
    }

    closeCart() {
        const cartSidebar = document.getElementById('cartSidebar');
        const overlay = document.getElementById('modalOverlay');
        
        cartSidebar.classList.remove('open');
        overlay.classList.remove('active');
        this.isOpen = false;
        document.body.style.overflow = 'auto';
    }

    animateCartIcon() {
        const cartBtn = document.getElementById('cartBtn');
        cartBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartBtn.style.transform = 'scale(1)';
        }, 200);
    }

    proceedToCheckout() {
        if (this.items.length === 0) {
            return;
        }

        // Check if user is logged in
        if (!window.authManager || !window.authManager.isLoggedIn()) {
            this.closeCart();
            setTimeout(() => {
                window.authManager.showAuthModal();
                if (window.productManager) {
                    window.productManager.showToast('Please log in to proceed with checkout', 'warning');
                }
            }, 300);
            return;
        }

        // Proceed to checkout
        this.closeCart();
        setTimeout(() => {
            if (window.checkoutManager) {
                window.checkoutManager.startCheckout();
            }
        }, 300);
    }

    clearCart() {
        this.items = [];
        this.saveCartToStorage();
        this.updateCartDisplay();
    }

    saveCartToStorage() {
        localStorage.setItem('eliteshop_cart', JSON.stringify(this.items));
    }

    loadCartFromStorage() {
        const savedCart = localStorage.getItem('eliteshop_cart');
        if (savedCart) {
            this.items = JSON.parse(savedCart);
        }
    }

    // Methods for checkout integration
    getCartItems() {
        return [...this.items];
    }

    getCartSummary() {
        const subtotal = this.getTotal();
        const shipping = subtotal > 100 ? 0 : 9.99;
        const tax = subtotal * 0.08; // 8% tax
        const total = subtotal + shipping + tax;

        return {
            subtotal: subtotal,
            shipping: shipping,
            tax: tax,
            total: total,
            itemCount: this.getItemCount()
        };
    }

    // Apply discount code
    applyDiscount(code) {
        const discountCodes = {
            'SAVE10': { type: 'percentage', value: 0.10, description: '10% off' },
            'SAVE20': { type: 'percentage', value: 0.20, description: '20% off' },
            'FREESHIP': { type: 'shipping', value: 0, description: 'Free shipping' },
            'WELCOME': { type: 'fixed', value: 15, description: '$15 off' }
        };

        const discount = discountCodes[code.toUpperCase()];
        if (discount) {
            this.appliedDiscount = discount;
            this.discountCode = code.toUpperCase();
            return {
                success: true,
                message: `Discount applied: ${discount.description}`,
                discount: discount
            };
        } else {
            return {
                success: false,
                message: 'Invalid discount code'
            };
        }
    }

    removeDiscount() {
        this.appliedDiscount = null;
        this.discountCode = null;
    }

    getCartSummaryWithDiscount() {
        const summary = this.getCartSummary();
        
        if (this.appliedDiscount) {
            let discountAmount = 0;
            
            switch (this.appliedDiscount.type) {
                case 'percentage':
                    discountAmount = summary.subtotal * this.appliedDiscount.value;
                    break;
                case 'fixed':
                    discountAmount = this.appliedDiscount.value;
                    break;
                case 'shipping':
                    summary.shipping = 0;
                    break;
            }
            
            if (this.appliedDiscount.type !== 'shipping') {
                summary.subtotal -= discountAmount;
                summary.total = summary.subtotal + summary.shipping + (summary.subtotal * 0.08);
            } else {
                summary.total = summary.subtotal + summary.shipping + summary.tax;
            }
            
            summary.discount = discountAmount;
            summary.discountCode = this.discountCode;
        }
        
        return summary;
    }
}

// Initialize Cart Manager
let cartManager;
document.addEventListener('DOMContentLoaded', () => {
    cartManager = new CartManager();
    window.cartManager = cartManager;
});
