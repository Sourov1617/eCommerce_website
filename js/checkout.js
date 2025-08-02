// Checkout Management
class CheckoutManager {
    constructor() {
        this.currentStep = 1;
        this.maxSteps = 3;
        this.shippingInfo = {};
        this.paymentInfo = {};
        this.orderSummary = {};
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Close checkout modal
        document.getElementById('closeCheckoutModal').addEventListener('click', () => {
            this.hideCheckout();
        });
    }

    startCheckout() {
        if (!window.cartManager || window.cartManager.getItemCount() === 0) {
            if (window.productManager) {
                window.productManager.showToast('Your cart is empty', 'warning');
            }
            return;
        }

        if (!window.authManager || !window.authManager.isLoggedIn()) {
            if (window.productManager) {
                window.productManager.showToast('Please log in to checkout', 'warning');
            }
            window.authManager.showAuthModal();
            return;
        }

        this.currentStep = 1;
        this.showCheckout();
        this.updateStepDisplay();
        this.renderCurrentStep();
    }

    showCheckout() {
        const modal = document.getElementById('checkoutModal');
        const overlay = document.getElementById('modalOverlay');
        
        modal.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    hideCheckout() {
        const modal = document.getElementById('checkoutModal');
        const overlay = document.getElementById('modalOverlay');
        
        modal.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    updateStepDisplay() {
        const steps = document.querySelectorAll('.step');
        steps.forEach((step, index) => {
            if (index + 1 <= this.currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }

    renderCurrentStep() {
        const container = document.getElementById('checkoutFormContainer');
        
        switch (this.currentStep) {
            case 1:
                this.renderShippingStep(container);
                break;
            case 2:
                this.renderPaymentStep(container);
                break;
            case 3:
                this.renderReviewStep(container);
                break;
        }
    }

    renderShippingStep(container) {
        const user = window.authManager.getCurrentUser();
        
        container.innerHTML = `
            <form class="checkout-form" id="shippingForm">
                <h3>Shipping Information</h3>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>First Name *</label>
                        <input type="text" name="firstName" value="${user?.name?.split(' ')[0] || ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Last Name *</label>
                        <input type="text" name="lastName" value="${user?.name?.split(' ').slice(1).join(' ') || ''}" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Email Address *</label>
                    <input type="email" name="email" value="${user?.email || ''}" required>
                </div>
                
                <div class="form-group">
                    <label>Phone Number *</label>
                    <input type="tel" name="phone" required>
                </div>
                
                <div class="form-group">
                    <label>Street Address *</label>
                    <input type="text" name="address" required>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>City *</label>
                        <input type="text" name="city" required>
                    </div>
                    <div class="form-group">
                        <label>State *</label>
                        <input type="text" name="state" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>ZIP Code *</label>
                        <input type="text" name="zipCode" required>
                    </div>
                    <div class="form-group">
                        <label>Country *</label>
                        <select name="country" required>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="UK">United Kingdom</option>
                            <option value="AU">Australia</option>
                        </select>
                    </div>
                </div>
                
                <div class="shipping-options">
                    <h4>Shipping Method</h4>
                    <div class="shipping-option">
                        <input type="radio" id="standard" name="shipping" value="standard" checked>
                        <label for="standard">
                            <div class="option-info">
                                <span class="option-title">Standard Shipping</span>
                                <span class="option-description">5-7 business days</span>
                            </div>
                            <span class="option-price">$9.99</span>
                        </label>
                    </div>
                    <div class="shipping-option">
                        <input type="radio" id="express" name="shipping" value="express">
                        <label for="express">
                            <div class="option-info">
                                <span class="option-title">Express Shipping</span>
                                <span class="option-description">2-3 business days</span>
                            </div>
                            <span class="option-price">$19.99</span>
                        </label>
                    </div>
                    <div class="shipping-option">
                        <input type="radio" id="overnight" name="shipping" value="overnight">
                        <label for="overnight">
                            <div class="option-info">
                                <span class="option-title">Overnight Shipping</span>
                                <span class="option-description">Next business day</span>
                            </div>
                            <span class="option-price">$39.99</span>
                        </label>
                    </div>
                </div>
                
                <div class="checkout-actions">
                    <button type="button" class="btn btn-back" onclick="checkoutManager.hideCheckout()">
                        <i class="fas fa-arrow-left"></i> Back to Cart
                    </button>
                    <button type="submit" class="btn btn-next">
                        Continue to Payment <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </form>
        `;

        document.getElementById('shippingForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleShippingSubmit(e.target);
        });
    }

    renderPaymentStep(container) {
        container.innerHTML = `
            <form class="checkout-form" id="paymentForm">
                <h3>Payment Information</h3>
                
                <div class="payment-methods">
                    <div class="payment-method">
                        <input type="radio" id="credit-card" name="paymentMethod" value="credit-card" checked>
                        <label for="credit-card">
                            <i class="fas fa-credit-card"></i>
                            Credit/Debit Card
                        </label>
                    </div>
                    <div class="payment-method">
                        <input type="radio" id="paypal" name="paymentMethod" value="paypal">
                        <label for="paypal">
                            <i class="fab fa-paypal"></i>
                            PayPal
                        </label>
                    </div>
                    <div class="payment-method">
                        <input type="radio" id="apple-pay" name="paymentMethod" value="apple-pay">
                        <label for="apple-pay">
                            <i class="fab fa-apple-pay"></i>
                            Apple Pay
                        </label>
                    </div>
                </div>
                
                <div class="credit-card-form" id="creditCardForm">
                    <div class="form-group">
                        <label>Card Number *</label>
                        <input type="text" name="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19" required>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Expiry Date *</label>
                            <input type="text" name="expiryDate" placeholder="MM/YY" maxlength="5" required>
                        </div>
                        <div class="form-group">
                            <label>CVV *</label>
                            <input type="text" name="cvv" placeholder="123" maxlength="4" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Cardholder Name *</label>
                        <input type="text" name="cardholderName" required>
                    </div>
                </div>
                
                <div class="billing-address">
                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="sameAsShipping" checked>
                            Billing address same as shipping
                        </label>
                    </div>
                </div>
                
                <div class="discount-section">
                    <h4>Discount Code</h4>
                    <div class="discount-input">
                        <input type="text" id="discountCode" placeholder="Enter discount code">
                        <button type="button" class="apply-discount-btn" onclick="checkoutManager.applyDiscount()">
                            Apply
                        </button>
                    </div>
                    <div class="discount-message" id="discountMessage"></div>
                </div>
                
                <div class="order-summary-card">
                    <h4>Order Summary</h4>
                    <div class="summary-content" id="orderSummaryContent">
                        ${this.generateOrderSummary()}
                    </div>
                </div>
                
                <div class="checkout-actions">
                    <button type="button" class="btn btn-back" onclick="checkoutManager.previousStep()">
                        <i class="fas fa-arrow-left"></i> Back
                    </button>
                    <button type="submit" class="btn btn-next">
                        Review Order <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </form>
        `;

        this.initializePaymentForm();
        document.getElementById('paymentForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handlePaymentSubmit(e.target);
        });
    }

    renderReviewStep(container) {
        const cartSummary = window.cartManager.getCartSummaryWithDiscount();
        
        container.innerHTML = `
            <div class="checkout-form">
                <h3>Order Review</h3>
                
                <div class="review-section">
                    <h4>Shipping Information</h4>
                    <div class="review-card">
                        <p><strong>${this.shippingInfo.firstName} ${this.shippingInfo.lastName}</strong></p>
                        <p>${this.shippingInfo.address}</p>
                        <p>${this.shippingInfo.city}, ${this.shippingInfo.state} ${this.shippingInfo.zipCode}</p>
                        <p>${this.shippingInfo.country}</p>
                        <p>Phone: ${this.shippingInfo.phone}</p>
                        <p>Email: ${this.shippingInfo.email}</p>
                        <p><strong>Shipping Method:</strong> ${this.getShippingMethodName(this.shippingInfo.shipping)}</p>
                    </div>
                </div>
                
                <div class="review-section">
                    <h4>Payment Information</h4>
                    <div class="review-card">
                        <p><strong>Payment Method:</strong> ${this.getPaymentMethodName(this.paymentInfo.paymentMethod)}</p>
                        ${this.paymentInfo.paymentMethod === 'credit-card' ? 
                            `<p>Card ending in ****${this.paymentInfo.cardNumber.slice(-4)}</p>` : ''
                        }
                    </div>
                </div>
                
                <div class="review-section">
                    <h4>Order Items</h4>
                    <div class="review-items">
                        ${this.generateReviewItems()}
                    </div>
                </div>
                
                <div class="review-section">
                    <h4>Order Total</h4>
                    <div class="review-card final-total">
                        ${this.generateFinalSummary()}
                    </div>
                </div>
                
                <div class="terms-agreement">
                    <label>
                        <input type="checkbox" id="agreeTerms" required>
                        I agree to the <a href="#" target="_blank">Terms of Service</a> and <a href="#" target="_blank">Privacy Policy</a>
                    </label>
                </div>
                
                <div class="checkout-actions">
                    <button type="button" class="btn btn-back" onclick="checkoutManager.previousStep()">
                        <i class="fas fa-arrow-left"></i> Back
                    </button>
                    <button type="button" class="btn btn-next place-order-btn" onclick="checkoutManager.placeOrder()">
                        <i class="fas fa-lock"></i> Place Order
                    </button>
                </div>
            </div>
        `;
    }

    handleShippingSubmit(form) {
        const formData = new FormData(form);
        this.shippingInfo = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            city: formData.get('city'),
            state: formData.get('state'),
            zipCode: formData.get('zipCode'),
            country: formData.get('country'),
            shipping: formData.get('shipping')
        };
        
        this.nextStep();
    }

    handlePaymentSubmit(form) {
        const formData = new FormData(form);
        this.paymentInfo = {
            paymentMethod: formData.get('paymentMethod'),
            cardNumber: formData.get('cardNumber')?.replace(/\s/g, ''),
            expiryDate: formData.get('expiryDate'),
            cvv: formData.get('cvv'),
            cardholderName: formData.get('cardholderName')
        };
        
        this.nextStep();
    }

    nextStep() {
        if (this.currentStep < this.maxSteps) {
            this.currentStep++;
            this.updateStepDisplay();
            this.renderCurrentStep();
        }
    }

    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateStepDisplay();
            this.renderCurrentStep();
        }
    }

    initializePaymentForm() {
        // Card number formatting
        const cardNumberInput = document.querySelector('input[name="cardNumber"]');
        if (cardNumberInput) {
            cardNumberInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\s/g, '');
                let formattedValue = value.replace(/(.{4})/g, '$1 ');
                e.target.value = formattedValue.trim();
            });
        }

        // Expiry date formatting
        const expiryInput = document.querySelector('input[name="expiryDate"]');
        if (expiryInput) {
            expiryInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length >= 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value;
            });
        }

        // CVV input restriction
        const cvvInput = document.querySelector('input[name="cvv"]');
        if (cvvInput) {
            cvvInput.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/\D/g, '');
            });
        }

        // Payment method switching
        const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
        paymentMethods.forEach(method => {
            method.addEventListener('change', () => {
                const creditCardForm = document.getElementById('creditCardForm');
                if (method.value === 'credit-card') {
                    creditCardForm.style.display = 'block';
                } else {
                    creditCardForm.style.display = 'none';
                }
            });
        });
    }

    applyDiscount() {
        const discountCode = document.getElementById('discountCode').value.trim();
        const messageEl = document.getElementById('discountMessage');
        
        if (!discountCode) {
            messageEl.innerHTML = '<span class="error">Please enter a discount code</span>';
            return;
        }

        const result = window.cartManager.applyDiscount(discountCode);
        
        if (result.success) {
            messageEl.innerHTML = `<span class="success">${result.message}</span>`;
            document.getElementById('orderSummaryContent').innerHTML = this.generateOrderSummary();
        } else {
            messageEl.innerHTML = `<span class="error">${result.message}</span>`;
        }
    }

    generateOrderSummary() {
        const cartSummary = window.cartManager.getCartSummaryWithDiscount();
        
        return `
            <div class="summary-line">
                <span>Subtotal (${cartSummary.itemCount} items)</span>
                <span>$${cartSummary.subtotal.toFixed(2)}</span>
            </div>
            ${cartSummary.discount ? `
                <div class="summary-line discount">
                    <span>Discount (${cartSummary.discountCode})</span>
                    <span>-$${cartSummary.discount.toFixed(2)}</span>
                </div>
            ` : ''}
            <div class="summary-line">
                <span>Shipping</span>
                <span>${cartSummary.shipping === 0 ? 'FREE' : '$' + cartSummary.shipping.toFixed(2)}</span>
            </div>
            <div class="summary-line">
                <span>Tax</span>
                <span>$${cartSummary.tax.toFixed(2)}</span>
            </div>
            <hr>
            <div class="summary-line total">
                <span><strong>Total</strong></span>
                <span><strong>$${cartSummary.total.toFixed(2)}</strong></span>
            </div>
        `;
    }

    generateReviewItems() {
        const items = window.cartManager.getCartItems();
        return items.map(item => `
            <div class="review-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h5>${item.name}</h5>
                    <p>Quantity: ${item.quantity}</p>
                    <p class="item-price">$${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            </div>
        `).join('');
    }

    generateFinalSummary() {
        return this.generateOrderSummary();
    }

    getShippingMethodName(method) {
        const methods = {
            'standard': 'Standard Shipping (5-7 days)',
            'express': 'Express Shipping (2-3 days)',
            'overnight': 'Overnight Shipping (Next day)'
        };
        return methods[method] || method;
    }

    getPaymentMethodName(method) {
        const methods = {
            'credit-card': 'Credit/Debit Card',
            'paypal': 'PayPal',
            'apple-pay': 'Apple Pay'
        };
        return methods[method] || method;
    }

    async placeOrder() {
        const agreeTerms = document.getElementById('agreeTerms');
        if (!agreeTerms.checked) {
            if (window.productManager) {
                window.productManager.showToast('Please agree to the terms and conditions', 'error');
            }
            return;
        }

        const placeOrderBtn = document.querySelector('.place-order-btn');
        placeOrderBtn.disabled = true;
        placeOrderBtn.innerHTML = '<div class="loading"></div> Processing Order...';

        try {
            // Simulate order processing
            await this.simulateOrderProcessing();
            
            // Create order object
            const order = {
                id: this.generateOrderId(),
                items: window.cartManager.getCartItems(),
                shipping: this.shippingInfo,
                payment: this.paymentInfo,
                summary: window.cartManager.getCartSummaryWithDiscount(),
                status: 'confirmed',
                orderDate: new Date().toISOString(),
                estimatedDelivery: this.calculateDeliveryDate()
            };

            // Save order (in real app, this would be sent to server)
            this.saveOrder(order);
            
            // Clear cart
            window.cartManager.clearCart();
            
            // Show success
            this.showOrderSuccess(order);
            
        } catch (error) {
            if (window.productManager) {
                window.productManager.showToast('Order failed. Please try again.', 'error');
            }
        } finally {
            placeOrderBtn.disabled = false;
            placeOrderBtn.innerHTML = '<i class="fas fa-lock"></i> Place Order';
        }
    }

    async simulateOrderProcessing() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate occasional failure
                if (Math.random() < 0.05) {
                    reject(new Error('Payment failed'));
                } else {
                    resolve();
                }
            }, 2000);
        });
    }

    generateOrderId() {
        return 'ES' + Date.now().toString().slice(-8);
    }

    calculateDeliveryDate() {
        const days = {
            'standard': 7,
            'express': 3,
            'overnight': 1
        };
        
        const deliveryDays = days[this.shippingInfo.shipping] || 7;
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);
        
        return deliveryDate.toISOString();
    }

    saveOrder(order) {
        const orders = JSON.parse(localStorage.getItem('eliteshop_orders') || '[]');
        orders.unshift(order);
        localStorage.setItem('eliteshop_orders', JSON.stringify(orders));
    }

    showOrderSuccess(order) {
        const container = document.getElementById('checkoutFormContainer');
        
        container.innerHTML = `
            <div class="order-success">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h2>Order Confirmed!</h2>
                <p>Thank you for your purchase. Your order has been successfully placed.</p>
                
                <div class="order-details">
                    <h3>Order Details</h3>
                    <p><strong>Order ID:</strong> ${order.id}</p>
                    <p><strong>Order Date:</strong> ${new Date(order.orderDate).toLocaleDateString()}</p>
                    <p><strong>Total:</strong> $${order.summary.total.toFixed(2)}</p>
                    <p><strong>Estimated Delivery:</strong> ${new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                </div>
                
                <div class="success-actions">
                    <button class="btn btn-primary" onclick="checkoutManager.hideCheckout()">
                        Continue Shopping
                    </button>
                    <button class="btn btn-secondary" onclick="checkoutManager.viewOrder('${order.id}')">
                        View Order Details
                    </button>
                </div>
            </div>
        `;

        // Hide steps
        document.querySelector('.checkout-steps').style.display = 'none';
        
        // Show toast
        if (window.productManager) {
            window.productManager.showToast(`Order ${order.id} placed successfully!`);
        }
    }

    viewOrder(orderId) {
        this.hideCheckout();
        if (window.productManager) {
            window.productManager.showToast('Order tracking feature coming soon!', 'info');
        }
    }
}

// Add checkout-specific styles
const checkoutStyles = `
.order-summary-card {
    background: #f8f9fa;
    border-radius: 10px;
    padding: 1.5rem;
    margin: 1.5rem 0;
}

.summary-line {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
}

.summary-line.total {
    font-size: 1.2rem;
    margin-top: 0.5rem;
}

.summary-line.discount {
    color: #28a745;
}

.shipping-options {
    margin: 1.5rem 0;
}

.shipping-option {
    border: 2px solid #e1e8ed;
    border-radius: 10px;
    margin-bottom: 1rem;
    transition: all 0.3s ease;
}

.shipping-option:has(input:checked) {
    border-color: #667eea;
    background: rgba(102,126,234,0.05);
}

.shipping-option label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    cursor: pointer;
    margin: 0;
}

.shipping-option input {
    margin-right: 1rem;
}

.option-title {
    font-weight: 600;
    display: block;
}

.option-description {
    font-size: 0.9rem;
    color: #666;
    display: block;
}

.option-price {
    font-weight: 600;
    color: #667eea;
}

.payment-methods {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
}

.payment-method {
    border: 2px solid #e1e8ed;
    border-radius: 10px;
    transition: all 0.3s ease;
}

.payment-method:has(input:checked) {
    border-color: #667eea;
    background: rgba(102,126,234,0.05);
}

.payment-method label {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    cursor: pointer;
    margin: 0;
    text-align: center;
}

.payment-method input {
    margin-bottom: 0.5rem;
}

.payment-method i {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #667eea;
}

.discount-input {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
}

.discount-input input {
    flex: 1;
}

.apply-discount-btn {
    background: #667eea;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
}

.discount-message .success {
    color: #28a745;
    font-weight: 600;
}

.discount-message .error {
    color: #dc3545;
    font-weight: 600;
}

.review-section {
    margin-bottom: 2rem;
}

.review-card {
    background: #f8f9fa;
    border-radius: 10px;
    padding: 1.5rem;
    border: 1px solid #e1e8ed;
}

.review-items {
    background: #f8f9fa;
    border-radius: 10px;
    padding: 1rem;
}

.review-item {
    display: flex;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid #e1e8ed;
}

.review-item:last-child {
    border-bottom: none;
}

.review-item img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
}

.item-details h5 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
}

.item-details p {
    margin: 0.2rem 0;
    font-size: 0.9rem;
    color: #666;
}

.item-price {
    font-weight: 600 !important;
    color: #333 !important;
}

.terms-agreement {
    margin: 2rem 0 1rem 0;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 10px;
    border: 1px solid #e1e8ed;
}

.terms-agreement label {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    margin: 0;
    cursor: pointer;
}

.terms-agreement a {
    color: #667eea;
    text-decoration: none;
}

.terms-agreement a:hover {
    text-decoration: underline;
}

.order-success {
    text-align: center;
    padding: 2rem;
}

.success-icon {
    font-size: 4rem;
    color: #28a745;
    margin-bottom: 1rem;
}

.order-success h2 {
    color: #28a745;
    margin-bottom: 1rem;
}

.order-details {
    background: #f8f9fa;
    border-radius: 10px;
    padding: 2rem;
    margin: 2rem 0;
    text-align: left;
}

.success-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
}

@media (max-width: 768px) {
    .success-actions {
        flex-direction: column;
    }
}
`;

// Inject styles
const checkoutStyleSheet = document.createElement('style');
checkoutStyleSheet.textContent = checkoutStyles;
document.head.appendChild(checkoutStyleSheet);

// Initialize Checkout Manager
let checkoutManager;
document.addEventListener('DOMContentLoaded', () => {
    checkoutManager = new CheckoutManager();
    window.checkoutManager = checkoutManager;
});
