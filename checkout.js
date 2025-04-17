// checkout.js
document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const checkoutForm = document.getElementById('checkout-form');
    
    if (!cartItemsContainer || !subtotalElement || !totalElement) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="alert alert-info">Your cart is empty. <a href="products.html">Continue shopping</a></div>';
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) checkoutBtn.disabled = true;
        subtotalElement.textContent = '$0.00';
        totalElement.textContent = '$0.00';
        return;
    }
    
    renderCartItems();
    updateTotals();
    
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validateCheckoutForm()) {
                return;
            }
            
            const order = {
                items: cart,
                customer: {
                    name: document.getElementById('name')?.value || '',
                    email: document.getElementById('email')?.value || '',
                    address: document.getElementById('address')?.value || '',
                    payment: document.querySelector('input[name="payment"]:checked')?.value || ''
                },
                total: calculateTotal(),
                date: new Date().toISOString()
            };
            
            console.log('Order submitted:', order);
            alert('Order placed successfully! Thank you for your purchase.');
            
            localStorage.removeItem('cart');
            window.location.href = 'order-confirmation.html';
        });
    }
    
    function validateCheckoutForm() {
        // Basic validation - in a real app, use form-validation.js
        const name = document.getElementById('name')?.value;
        const email = document.getElementById('email')?.value;
        const address = document.getElementById('address')?.value;
        
        if (!name || !email || !address) {
            alert('Please fill in all required fields');
            return false;
        }
        
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            alert('Please enter a valid email address');
            return false;
        }
        
        return true;
    }
    
    function renderCartItems() {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="card mb-3 cart-item">
                <div class="row g-0">
                    <div class="col-md-2">
                        <img src="${escapeHtml(item.image)}" class="img-fluid rounded-start" alt="${escapeHtml(item.name)}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${escapeHtml(item.name)}</h5>
                            <p class="card-text">$${(item.price || 0).toFixed(2)} × ${item.quantity || 1}</p>
                            <div class="input-group" style="width: 120px;">
                                <button class="btn btn-outline-secondary quantity-btn minus" data-id="${escapeHtml(item.id)}">-</button>
                                <input type="text" class="form-control text-center quantity-input" value="${item.quantity || 1}" data-id="${escapeHtml(item.id)}">
                                <button class="btn btn-outline-secondary quantity-btn plus" data-id="${escapeHtml(item.id)}">+</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2 d-flex align-items-center justify-content-end">
                        <button class="btn btn-outline-danger remove-item" data-id="${escapeHtml(item.id)}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Event listeners...
        // (Rest of the event listener code remains the same)
    }
    
    // ... (Rest of the functions remain the same with added null checks)
    
    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
});