$(document).ready(function () {
    // Function to toggle sticky navbar class
    function toggleNavbarSticky() {
        const $navbar = $('.navbar');
        const $homeSection = $('#home');

        // Get home section height
        const homeSectionHeight = $homeSection.outerHeight();

        // Check scroll position
        if ($(window).scrollTop() > homeSectionHeight) {
            $navbar.addClass('sticky');
        } else {
            $navbar.removeClass('sticky');
        }
    }

    // Initial call to toggleNavbarSticky to set initial state
    toggleNavbarSticky();

    // Toggle sticky class on scroll
    $(window).scroll(toggleNavbarSticky);

    // Scroll up button visibility on scroll
    $(window).scroll(function () {
        if (this.scrollY > 500) {
            $(".scroll-up-btn").addClass("show");
        } else {
            $(".scroll-up-btn").removeClass("show");
        }
    });

    // Scroll up button action
    $(".scroll-up-btn").click(function () {
        $("html").animate({ scrollTop: 0 }, "slow");
    });

    // Typing animation script
    const animationScript = ["MCA graduate" ,"Python Aspirant", "Web Development Aspirant"];

    if ($(".typing").length) {
        new Typed(".typing", {
            strings: animationScript,
            typeSpeed: 100,
            backSpeed: 60,
            loop: true,
        });
    }

    if ($(".typing2").length) {
        new Typed(".typing2", {
            strings: animationScript,
            typeSpeed: 100,
            backSpeed: 60,
            loop: true,
        });
    }

    // Toggle menu/navbar script
    $(".menu-btn").click(function () {
        $(".navbar .menu").toggleClass("active");
        $(".menu-btn i").toggleClass("active");
    });

    // Owl carousel initialization
    $(".carousel").owlCarousel({
        margin: 20,
        loop: true,
        autoplay: false,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        items: 4, // Show one item at a time
        nav: false,
        dots: true,
    });

    // Display the current year in footer
    const currentYear = new Date().getFullYear();
    $("#year").text(currentYear);
});

// Contact form handling
document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".contact-content .column.right form");
    const nameInput = form.querySelector("input[name='name']");
    const emailInput = form.querySelector("input[name='email']");
    const subjectInput = form.querySelector("input[name='subject']");
    const messageTextarea = form.querySelector("textarea[name='message']");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        if (validateForm()) {
            submitForm();
        }
    });

    function validateForm() {
        if (nameInput.value.trim() === "") {
            alert("Please enter your name.");
            nameInput.focus();
            return false;
        }
        if (emailInput.value.trim() === "") {
            alert("Please enter your email.");
            emailInput.focus();
            return false;
        }
        if (!validateEmail(emailInput.value.trim())) {
            alert("Please enter a valid email address.");
            emailInput.focus();
            return false;
        }
        if (subjectInput.value.trim() === "") {
            alert("Please enter a subject.");
            subjectInput.focus();
            return false;
        }
        if (messageTextarea.value.trim() === "") {
            alert("Please enter a message.");
            messageTextarea.focus();
            return false;
        }
        return true;
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function submitForm() {
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            subject: subjectInput.value.trim(),
            message: messageTextarea.value.trim(),
        };

        fetch('https://your-backend-endpoint.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            alert('Message sent successfully!');
            form.reset(); // Reset the form after successful submission
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error sending your message. Please try again later.');
        });
    }
});
