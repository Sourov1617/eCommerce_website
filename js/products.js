// Products Database
const productsData = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        category: "electronics",
        price: 199.99,
        originalPrice: 249.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        rating: 4.8,
        reviews: 324,
        description: "High-quality wireless headphones with active noise cancellation, 30-hour battery life, and premium sound quality. Perfect for music lovers and professionals.",
        features: ["Active Noise Cancellation", "30-hour battery", "Bluetooth 5.0", "Fast charging"],
        inStock: true,
        badge: "Best Seller"
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        category: "electronics",
        price: 299.99,
        originalPrice: 399.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        rating: 4.6,
        reviews: 189,
        description: "Advanced fitness tracking with heart rate monitoring, GPS, sleep tracking, and smartphone integration. Water-resistant design for all activities.",
        features: ["Heart Rate Monitor", "GPS Tracking", "Water Resistant", "7-day battery"],
        inStock: true,
        badge: "New"
    },
    {
        id: 3,
        name: "Designer Leather Jacket",
        category: "fashion",
        price: 159.99,
        originalPrice: 199.99,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        rating: 4.7,
        reviews: 156,
        description: "Premium genuine leather jacket with modern design. Perfect for casual and semi-formal occasions. Available in multiple sizes and colors.",
        features: ["Genuine Leather", "Modern Design", "Multiple Colors", "Comfortable Fit"],
        inStock: true,
        badge: "Sale"
    },
    {
        id: 4,
        name: "Ergonomic Office Chair",
        category: "home",
        price: 249.99,
        originalPrice: 319.99,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        rating: 4.5,
        reviews: 98,
        description: "Comfortable ergonomic office chair with lumbar support, adjustable height, and breathable mesh design. Perfect for long working hours.",
        features: ["Lumbar Support", "Adjustable Height", "Breathable Mesh", "360° Swivel"],
        inStock: true,
        badge: ""
    },
    {
        id: 5,
        name: "Professional Running Shoes",
        category: "sports",
        price: 129.99,
        originalPrice: 159.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        rating: 4.9,
        reviews: 234,
        description: "High-performance running shoes with advanced cushioning technology, breathable upper, and durable sole for all terrains.",
        features: ["Advanced Cushioning", "Breathable Upper", "Durable Sole", "Lightweight Design"],
        inStock: true,
        badge: "Top Rated"
    },
    {
        id: 6,
        name: "Wireless Bluetooth Speaker",
        category: "electronics",
        price: 79.99,
        originalPrice: 99.99,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        rating: 4.4,
        reviews: 167,
        description: "Portable wireless speaker with rich bass, 360-degree sound, waterproof design, and 12-hour battery life.",
        features: ["360° Sound", "Waterproof", "12-hour Battery", "Rich Bass"],
        inStock: true,
        badge: ""
    },
    {
        id: 7,
        name: "Vintage Denim Jeans",
        category: "fashion",
        price: 89.99,
        originalPrice: 119.99,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        rating: 4.3,
        reviews: 203,
        description: "Classic vintage-style denim jeans with comfortable fit, premium denim fabric, and timeless design.",
        features: ["Premium Denim", "Comfortable Fit", "Vintage Style", "Durable Construction"],
        inStock: true,
        badge: ""
    },
    {
        id: 8,
        name: "Modern Table Lamp",
        category: "home",
        price: 64.99,
        originalPrice: 89.99,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        rating: 4.6,
        reviews: 89,
        description: "Elegant modern table lamp with adjustable brightness, touch control, and minimalist design.",
        features: ["Touch Control", "Adjustable Brightness", "Modern Design", "Energy Efficient"],
        inStock: true,
        badge: ""
    },
    {
        id: 9,
        name: "Yoga Mat Pro",
        category: "sports",
        price: 39.99,
        originalPrice: 59.99,
        image: "https://images.unsplash.com/photo-1506629905607-c65c74f0dc7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        rating: 4.7,
        reviews: 145,
        description: "Professional yoga mat with non-slip surface, extra cushioning, and eco-friendly materials.",
        features: ["Non-slip Surface", "Extra Cushioning", "Eco-friendly", "Easy to Clean"],
        inStock: true,
        badge: "Eco-Friendly"
    },
    {
        id: 10,
        name: "Smartphone 128GB",
        category: "electronics",
        price: 599.99,
        originalPrice: 699.99,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        rating: 4.8,
        reviews: 412,
        description: "Latest smartphone with advanced camera system, fast processor, and all-day battery life.",
        features: ["Advanced Camera", "Fast Processor", "All-day Battery", "5G Ready"],
        inStock: true,
        badge: "New"
    },
    {
        id: 11,
        name: "Designer Handbag",
        category: "fashion",
        price: 199.99,
        originalPrice: 259.99,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        rating: 4.5,
        reviews: 98,
        description: "Elegant designer handbag with premium materials, spacious interior, and sophisticated design.",
        features: ["Premium Materials", "Spacious Interior", "Elegant Design", "Multiple Compartments"],
        inStock: true,
        badge: ""
    },
    {
        id: 12,
        name: "Coffee Maker Deluxe",
        category: "home",
        price: 149.99,
        originalPrice: 199.99,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        rating: 4.6,
        reviews: 234,
        description: "Premium coffee maker with programmable settings, thermal carafe, and automatic shut-off.",
        features: ["Programmable", "Thermal Carafe", "Auto Shut-off", "Easy Clean"],
        inStock: true,
        badge: "Best Seller"
    }
];

// Products Management
class ProductManager {
    constructor() {
        this.products = [...productsData];
        this.filteredProducts = [...this.products];
        this.currentPage = 1;
        this.productsPerPage = 8;
        this.totalPages = Math.ceil(this.products.length / this.productsPerPage);
        
        this.initializeEventListeners();
        this.renderProducts();
    }

    initializeEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.querySelector('.search-btn');
        
        searchInput.addEventListener('input', (e) => {
            this.searchProducts(e.target.value);
        });
        
        searchBtn.addEventListener('click', () => {
            this.searchProducts(searchInput.value);
        });

        // Filter functionality
        document.getElementById('categoryFilter').addEventListener('change', () => {
            this.applyFilters();
        });

        document.getElementById('priceFilter').addEventListener('change', () => {
            this.applyFilters();
        });

        document.getElementById('sortFilter').addEventListener('change', () => {
            this.applyFilters();
        });

        // Category card clicks
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', () => {
                const category = card.dataset.category;
                document.getElementById('categoryFilter').value = category;
                this.applyFilters();
                document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
            });
        });

        // Load more button
        document.getElementById('loadMoreBtn').addEventListener('click', () => {
            this.loadMoreProducts();
        });
    }

    searchProducts(query) {
        if (!query.trim()) {
            this.filteredProducts = [...this.products];
        } else {
            this.filteredProducts = this.products.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.category.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase())
            );
        }
        
        this.currentPage = 1;
        this.renderProducts();
    }

    applyFilters() {
        let filtered = [...this.products];
        
        // Category filter
        const categoryFilter = document.getElementById('categoryFilter').value;
        if (categoryFilter) {
            filtered = filtered.filter(product => product.category === categoryFilter);
        }

        // Price filter
        const priceFilter = document.getElementById('priceFilter').value;
        if (priceFilter) {
            filtered = filtered.filter(product => {
                const price = product.price;
                switch (priceFilter) {
                    case '0-50':
                        return price <= 50;
                    case '50-100':
                        return price > 50 && price <= 100;
                    case '100-200':
                        return price > 100 && price <= 200;
                    case '200+':
                        return price > 200;
                    default:
                        return true;
                }
            });
        }

        // Sort filter
        const sortFilter = document.getElementById('sortFilter').value;
        switch (sortFilter) {
            case 'name':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
        }

        this.filteredProducts = filtered;
        this.currentPage = 1;
        this.renderProducts();
    }

    renderProducts() {
        const productsGrid = document.getElementById('productsGrid');
        const startIndex = 0;
        const endIndex = this.currentPage * this.productsPerPage;
        const productsToShow = this.filteredProducts.slice(startIndex, endIndex);

        if (this.currentPage === 1) {
            productsGrid.innerHTML = '';
        }

        productsToShow.forEach((product, index) => {
            if (index >= (this.currentPage - 1) * this.productsPerPage) {
                const productCard = this.createProductCard(product);
                productsGrid.appendChild(productCard);
            }
        });

        // Update load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        const loadMoreContainer = document.querySelector('.load-more-container');
        
        if (endIndex >= this.filteredProducts.length) {
            loadMoreContainer.style.display = 'none';
        } else {
            loadMoreContainer.style.display = 'block';
        }

        // Add fade-in animation
        setTimeout(() => {
            const newCards = productsGrid.querySelectorAll('.product-card:not(.fade-in)');
            newCards.forEach(card => card.classList.add('fade-in'));
        }, 100);
    }

    loadMoreProducts() {
        this.currentPage++;
        this.renderProducts();
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.productId = product.id;

        const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    <div class="stars">
                        ${this.generateStars(product.rating)}
                    </div>
                    <span class="rating-text">(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">$${product.price}</span>
                    ${product.originalPrice > product.price ? 
                        `<span class="original-price">$${product.originalPrice}</span>
                         <span class="discount">${discount}% OFF</span>` : ''
                    }
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary add-to-cart" data-product-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="btn btn-secondary quick-view" data-product-id="${product.id}">
                        <i class="fas fa-eye"></i> Quick View
                    </button>
                </div>
            </div>
        `;

        // Add event listeners
        const addToCartBtn = card.querySelector('.add-to-cart');
        const quickViewBtn = card.querySelector('.quick-view');

        addToCartBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.addToCart(product.id);
        });

        quickViewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.showProductModal(product.id);
        });

        card.addEventListener('click', () => {
            this.showProductModal(product.id);
        });

        return card;
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        let starsHTML = '';
        
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fas fa-star star"></i>';
        }
        
        if (halfStar) {
            starsHTML += '<i class="fas fa-star-half-alt star"></i>';
        }
        
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<i class="far fa-star star empty"></i>';
        }

        return starsHTML;
    }

    addToCart(productId, quantity = 1) {
        const product = this.products.find(p => p.id === productId);
        if (product && window.cartManager) {
            window.cartManager.addItem(product, quantity);
            this.showToast(`${product.name} added to cart!`);
        }
    }

    showProductModal(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const modal = document.getElementById('productModal');
        const modalContent = modal.querySelector('.product-modal-content');

        const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

        modalContent.innerHTML = `
            <div class="product-modal-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-modal-info">
                <div class="product-modal-category">${product.category}</div>
                <h2>${product.name}</h2>
                <div class="product-rating">
                    <div class="stars">
                        ${this.generateStars(product.rating)}
                    </div>
                    <span class="rating-text">(${product.reviews} reviews)</span>
                </div>
                <p class="product-modal-description">${product.description}</p>
                <div class="product-features">
                    <h4>Features:</h4>
                    <ul>
                        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="product-modal-price">
                    <span class="modal-current-price">$${product.price}</span>
                    ${product.originalPrice > product.price ? 
                        `<span class="modal-original-price">$${product.originalPrice}</span>
                         <span class="discount">${discount}% OFF</span>` : ''
                    }
                </div>
                <div class="quantity-selector">
                    <label>Quantity:</label>
                    <div class="quantity-controls">
                        <button type="button" onclick="this.nextElementSibling.stepDown()">-</button>
                        <input type="number" value="1" min="1" max="10" id="modalQuantity">
                        <button type="button" onclick="this.previousElementSibling.stepUp()">+</button>
                    </div>
                </div>
                <div class="product-modal-actions">
                    <button class="btn btn-primary" onclick="productManager.addToCartFromModal(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="btn btn-secondary" onclick="productManager.buyNow(${product.id})">
                        <i class="fas fa-bolt"></i> Buy Now
                    </button>
                </div>
            </div>
        `;

        this.showModal('productModal');
    }

    addToCartFromModal(productId) {
        const quantity = parseInt(document.getElementById('modalQuantity').value);
        this.addToCart(productId, quantity);
        this.hideModal('productModal');
    }

    buyNow(productId) {
        const quantity = parseInt(document.getElementById('modalQuantity').value);
        this.addToCart(productId, quantity);
        this.hideModal('productModal');
        
        // Open cart and proceed to checkout
        setTimeout(() => {
            window.cartManager.toggleCart();
            setTimeout(() => {
                window.checkoutManager.startCheckout();
            }, 300);
        }, 500);
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        const overlay = document.getElementById('modalOverlay');
        
        modal.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        const overlay = document.getElementById('modalOverlay');
        
        modal.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastMessage = toast.querySelector('.toast-message');
        
        toastMessage.textContent = message;
        toast.className = `toast ${type}`;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    getProductById(id) {
        return this.products.find(product => product.id === id);
    }
}

// Initialize Product Manager
let productManager;
document.addEventListener('DOMContentLoaded', () => {
    productManager = new ProductManager();
    window.productManager = productManager;
});
