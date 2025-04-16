// Cart functionality for YUVO e-commerce site

// Cart object to store items
let cart = {
    items: [],
    total: 0,
    itemCount: 0
};

// Initialize cart from localStorage
function initCart() {
    const savedCart = localStorage.getItem('yuvoCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

// Add item to cart
function addToCart(productId, quantity = 1) {
    // Check if product already in cart
    const existingItem = cart.items.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        // In a real implementation, you would fetch product details
        const product = {
            id: productId,
            name: `Product ${productId}`,
            price: 99.99,
            image: `assets/products/product${productId}-thumb.jpg`,
            quantity: quantity
        };
        cart.items.push(product);
    }
      
    // Update cart totals
    updateCartTotals();
    
    // Save to localStorage
    saveCart();
    
    // Update UI
    updateCartUI();
}

// Remove item from cart
function removeFromCart(productId) {
    cart.items = cart.items.filter(item => item.id !== productId);
    updateCartTotals();
    saveCart();
    updateCartUI();
}

// Update item quantity in cart
function updateQuantity(productId, newQuantity) {
    const item = cart.items.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCartTotals();
        saveCart();
        updateCartUI();
    }
}

// Clear the entire cart
function clearCart() {
    cart.items = [];
    cart.total = 0;
    cart.itemCount = 0;
    saveCart();
    updateCartUI();
}

// Update cart totals
function updateCartTotals() {
    cart.itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);
    cart.total = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('yuvoCart', JSON.stringify(cart));
}

// Update cart UI
function updateCartUI() {
    // Update cart count in navbar
    const cartBadge = document.querySelector('.navbar .badge');
    if (cartBadge) {
        cartBadge.textContent = cart.itemCount;
    }
    
    // If on cart page, update cart items and totals
    if (document.querySelector('.cart-page')) {
        renderCartItems();
        updateOrderSummary();
    }
}

// Render cart items in cart page
function renderCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items-container');
    if (!cartItemsContainer) return;
    
    // Clear existing items
    cartItemsContainer.innerHTML = '';
    
    if (cart.items.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-shopping-cart fa-4x text-muted mb-4"></i>
                <h4>Your cart is empty</h4>
                <p class="text-muted mb-4">Looks like you haven't added anything to your cart yet</p>
                <a href="products.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
        return;
    }

    // Render each cart item
    cart.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'row g-3 align-items-center mb-4 pb-4 border-bottom';
        itemElement.innerHTML = `
            <div class="col-3 col-md-2">
                <img src="${item.image}" alt="${item.name}" class="img-fluid rounded-3">
            </div>
            <div class="col-5 col-md-6">
                <h6 class="mb-1">${item.name}</h6>
                <p class="text-muted small mb-2">Color: Black</p>
                <div class="text-warning small mb-2">
                 <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                </div>
                <div class="d-flex align-items-center">
                    <button class="btn btn-sm btn-outline-secondary me-2">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger remove-item" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="col-4 col-md-4">
                <div class="input-group mb-2">
                    <button class="btn btn-outline-secondary decrement" type="button">-</button>
                    <input type="text" class="form-control text-center quantity-input" value="${item.quantity}" data-id="${item.id}">
                    <button class="btn btn-outline-secondary increment" type="button">+</button>
                </div>
                <div class="text-end">
                    <span class="fw-bold">$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

     // Add event listeners to new elements
     addCartItemEventListeners();
    }
    
    // Update order summary in cart page
    function updateOrderSummary() {
        const subtotalElement = document.querySelector('.order-summary .subtotal');
        const shippingElement = document.querySelector('.order-summary .shipping');
        const taxElement = document.querySelector('.order-summary .tax');
        const discountElement = document.querySelector('.order-summary .discount');
        const totalElement = document.querySelector('.order-summary .total');
        
        if (subtotalElement) subtotalElement.textContent = `$${cart.total.toFixed(2)}`;
        
         // Calculate other values (simplified for demo)
    const shipping = cart.total > 50 ? 0 : 5.99;
    const tax = cart.total * 0.08;
    const discount = cart.items.length > 0 ? 30 : 0;
    const total = cart.total + shipping + tax - discount;
    
    if (shippingElement) shippingElement.textContent = `$${shipping.toFixed(2)}`;
    if (taxElement) taxElement.textContent = `$${tax.toFixed(2)}`;
    if (discountElement) discountElement.textContent = `-$${discount.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
}

// Add event listeners to cart items
function addCartItemEventListeners() {
    // Quantity increment
    document.querySelectorAll('.increment').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentNode.querySelector('.quantity-input');
            const productId = input.getAttribute('data-id');
            const newQuantity = parseInt(input.value) + 1;
            updateQuantity(productId, newQuantity);
        });
    });

    // Quantity decrement
    document.querySelectorAll('.decrement').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentNode.querySelector('.quantity-input');
            const productId = input.getAttribute('data-id');
            const newQuantity = parseInt(input.value) - 1;
            
            if (newQuantity > 0) {
                updateQuantity(productId, newQuantity);
            } else {
                removeFromCart(productId);
            }
        });
    });

     // Remove item
     document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            removeFromCart(productId);
        });
    });
    
    // Quantity input change
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            const productId = this.getAttribute('data-id');
            const newQuantity = parseInt(this.value) || 1;
            updateQuantity(productId, newQuantity);
        });
    });
}

// Clear cart button
document.getElementById('clear-cart')?.addEventListener('click', clearCart);

// Initialize cart when page loads
document.addEventListener('DOMContentLoaded', initCart);