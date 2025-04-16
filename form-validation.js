// Form Validation
$(document).ready(function() {
    // Checkout form validation
    if ($('#checkout-form').length) {
        setupCheckoutFormValidation();
    }
    
    // Contact form validation
    if ($('#contact-form').length) {
        setupContactFormValidation();
    }
    
    // Review form validation
    if ($('#review-form').length) {
        setupReviewFormValidation();
    }
});

function setupCheckoutFormValidation() {
    $('#checkout-form').validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            'first-name': 'required',
            'last-name': 'required',
            address: 'required',
            city: 'required',
            country: 'required',
            state: 'required',
            zip: 'required',
            phone: {
                required: true,
                minlength: 10
            },
            'card-number': {
                required: true,
                creditcard: true
            },
            'card-name': 'required',
            'card-expiry': {
                required: true,
                pattern: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/
            },
            'card-cvc': {
                required: true,
                minlength: 3,
                maxlength: 4,
                digits: true
            }
        },
        messages: {
            email: {
                required: "Please enter your email address",
                email: "Please enter a valid email address"
            },
            'first-name': "Please enter your first name",
            'last-name': "Please enter your last name",
            address: "Please enter your address",
            city: "Please enter your city",
            country: "Please select your country",
            state: "Please select your state",
            zip: "Please enter your ZIP code",
            phone: {
                required: "Please enter your phone number",
                minlength: "Phone number must be at least 10 digits"
            },
            'card-number': {
                required: "Please enter your card number",
                creditcard: "Please enter a valid card number"
            },
            'card-name': "Please enter the name on your card",
            'card-expiry': {
                required: "Please enter expiration date",
                pattern: "Please use MM/YY format"
            },
            'card-cvc': {
                required: "Please enter CVC code",
                minlength: "CVC must be 3-4 digits",
                maxlength: "CVC must be 3-4 digits",
                digits: "Please enter only digits"
            }
        },
        errorElement: 'span',
        errorPlacement: function(error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function(element, errorClass, validClass) {
            $(element).addClass('is-invalid').removeClass('is-valid');
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).removeClass('is-invalid').addClass('is-valid');
        },
        submitHandler: function(form) {
            // This is already handled in main.js
            return false;
        }
    });
}

function setupContactFormValidation() {
    $('#contact-form').validate({
        rules: {
            'contact-name': 'required',
            'contact-email': {
                required: true,
                email: true
            },
            'contact-subject': 'required',
            'contact-message': 'required'
        },
        messages: {
            'contact-name': "Please enter your name",
            'contact-email': {
                required: "Please enter your email address",
                email: "Please enter a valid email address"
            },
            'contact-subject': "Please select a subject",
            'contact-message': "Please enter your message"
        },
        errorElement: 'span',
        errorPlacement: function(error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function(element, errorClass, validClass) {
            $(element).addClass('is-invalid').removeClass('is-valid');
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).removeClass('is-invalid').addClass('is-valid');
        },
        submitHandler: function(form) {
            // This is already handled in main.js
            return false;
        }
    });
}

function setupReviewFormValidation() {
    $('#review-form').validate({
        rules: {
            'review-rating': 'required',
            'review-name': 'required',
            'review-text': 'required'
        },
        messages: {
            'review-rating': "Please select a rating",
            'review-name': "Please enter your name",
            'review-text': "Please enter your review"
        },
        errorElement: 'span',
        errorPlacement: function(error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function(element, errorClass, validClass) {
            $(element).addClass('is-invalid').removeClass('is-valid');
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).removeClass('is-invalid').addClass('is-valid');
        },
        submitHandler: function(form) {
            // Add the review to the page
            const rating = $('#review-rating').val();
            const name = $('#review-name').val();
            const text = $('#review-text').val();
            
            const reviewHtml = `
                <div class="review">
                    <div class="review-header">
                        <div class="review-rating">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</div>
                        <div class="review-author">${name}</div>
                    </div>
                    <div class="review-content">
                        <p>${text}</p>
                    </div>
                </div>
            `;
            
            $('.reviews-list').prepend(reviewHtml);
            
            // Reset the form
            form.reset();
            
            // Show success message
            showNotification('Thank you for your review!');
            
            return false;
        }
    });
}