// Main JavaScript for YUVO e-commerce site

// Initialize tooltips
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

// Initialize popovers
const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
})

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.getAttribute('data-id');
        addToCart(productId);
        
        // Visual feedback
        this.innerHTML = '<i class="fas fa-check"></i>';
        this.classList.add('btn-success');
        this.classList.remove('btn-outline-primary');
        
        // Reset after 1.5 seconds
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-cart-plus"></i>';
            this.classList.add('btn-outline-primary');
            this.classList.remove('btn-success');
        }, 1500);
        
        // Update cart count
        updateCartCount();
    });
});

// Function to add item to cart
function addToCart(productId) {
    // In a real implementation, you would:
    // 1. Check if cart exists in localStorage
    // 2. If not, create empty cart
    // 3. Check if product already in cart
    // 4. If yes, increment quantity
    // 5. If no, add product to cart with quantity 1
    // 6. Save cart to localStorage
    
    console.log(`Product ${productId} added to cart`);
}

// Function to update cart count in navbar
function updateCartCount() {
    // In a real implementation, you would:
    // 1. Get cart from localStorage
    // 2. Calculate total quantity
    // 3. Update the badge in navbar
    
    // For demo, we'll just increment by 1
    const cartBadge = document.querySelector('.navbar .badge');
    if (cartBadge) {
        let currentCount = parseInt(cartBadge.textContent) || 0;
        cartBadge.textContent = currentCount + 1;
    }
}

// Mobile menu toggle
document.querySelector('.navbar-toggler').addEventListener('click', function() {
    document.body.classList.toggle('mobile-menu-open');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Initialize AOS (Animate On Scroll) - would need to include AOS library
// AOS.init();

// Product image zoom (would need a library like elevateZoom)
// $('.product-image').elevateZoom();

// Newsletter form submission
document.querySelector('.newsletter-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    
    // In a real implementation, you would send this to your server
    console.log('Newsletter subscription:', email);
    
    // Show success message
    alert('Thank you for subscribing to our newsletter!');
    this.reset();
});

// Initialize any other plugins or custom functionality here