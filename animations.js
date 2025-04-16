// Animation Effects
$(document).ready(function() {
    // Scroll animations
    $(window).scroll(function() {
        animateOnScroll();
    });
    
    // Initial check in case elements are already in view
    animateOnScroll();
    
    // Hero button hover effect
    $('.hero .btn').hover(
        function() {
            $(this).addClass('hover');
        },
        function() {
            $(this).removeClass('hover');
        }
    );
        
    // Product card hover effect
    $('.product-card').hover(
        function() {
            $(this).find('.product-image img').css('transform', 'scale(1.05)');
        },
        function() {
            $(this).find('.product-image img').css('transform', 'scale(1)');
        }
    );

    // Benefit card hover effect
    $('.benefit-card').hover(
        function() {
            $(this).find('.benefit-icon').css('transform', 'rotate(360deg)');
        },
        function() {
            $(this).find('.benefit-icon').css('transform', 'rotate(0deg)');
        }
    );

     // Smooth scrolling for anchor links
     $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        
        $('html, body').animate(
            {
                scrollTop: $($(this).attr('href')).offset().top - 100,
            },
            500,
            'linear'
        );
    });
});

function animateOnScroll() {
    $('.slide-in, .slide-up, .fade-in').each(function() {
        const element = $(this);
        const elementPosition = element.offset().top;
        const scrollPosition = $(window).scrollTop() + $(window).height();
        
        // If element is in viewport, add the animation class
        if (elementPosition < scrollPosition) {
            element.addClass('animate');
        }
    });
}