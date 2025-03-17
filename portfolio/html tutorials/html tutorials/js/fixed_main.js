// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality once DOM is fully loaded
    document.body.classList.add('black-red-theme');
    
    // Initialize all functions
    initNavigation();
    createStars();
    createLightning();
    initCustomCursor();
    initScrollAnimations();
    initPortfolioFilters();
    initPortfolioModals();
    initContactForm();
    initBackToTop();
    initTypewriter();
    
    // Log to console that the site has initialized
    console.log('Portfolio site initialized with Black & Red theme.');
});

// Navigation functionality
function initNavigation() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const navbar = document.querySelector('.navbar');

    // Toggle mobile navigation
    burger.addEventListener('click', () => {
        // Toggle navigation
        nav.classList.toggle('active');

        // Animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger animation
        burger.classList.toggle('toggle');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                burger.classList.remove('toggle');
            }
            
            // Smooth scroll to target
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Change navbar style on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Custom cursor with green color
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });

    // Custom cursor effects on links and buttons
    const links = document.querySelectorAll('a, button, .portfolio-item, .social-icon');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(0)';
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.display = 'block';
        cursorFollower.style.display = 'block';
    });
    
    // Check if device supports hover
    if (window.matchMedia('(hover: none)').matches) {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
        document.body.style.cursor = 'auto';
    }
}

// Create stars in the background
function createStars() {
    const starsContainer = document.getElementById('stars-container');
    const starCount = 200;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Random size
        const size = Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random color - red or white stars
        const rand = Math.random();
        if (rand > 0.7) {
            // Red stars
            const redIntensity = Math.floor(Math.random() * 156) + 100;
            star.style.backgroundColor = `rgb(${redIntensity}, 0, 0)`;
        } else {
            // White stars
            const whiteIntensity = Math.floor(Math.random() * 156) + 100;
            star.style.backgroundColor = `rgb(${whiteIntensity}, ${whiteIntensity}, ${whiteIntensity})`;
        }
        
        // Random animation delay
        star.style.animationDelay = `${Math.random() * 3}s`;
        
        starsContainer.appendChild(star);
    }
}

// Create lightning effect
function createLightning() {
    const lightning = document.querySelector('.lightning');
    
    function flash() {
        // Red lightning
        lightning.style.opacity = Math.random() * 0.3;
        lightning.style.backgroundColor = 'rgba(239, 68, 68, 0.05)'; // Red
        
        setTimeout(() => {
            lightning.style.opacity = 0;
        }, 100);
        
        // Random interval for next flash
        setTimeout(flash, Math.random() * 10000);
    }
    
    flash();
}

// Scroll animations
function initScrollAnimations() {
    // Show sections when scrolled into view
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('active');
            }
        });

        // Animate skill bars when scrolled into view
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (barTop < windowHeight * 0.8) {
                const width = bar.getAttribute('style').match(/width:\s*(\d+)%/)[1];
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = `${width}%`;
                }, 100);
            }
        });

        // Back to top button visibility
        const backToTop = document.querySelector('.back-to-top');
        
        if (window.scrollY > 700) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    // Add parallax effect to floating elements
    document.addEventListener('mousemove', (e) => {
        const floatingElements = document.querySelectorAll('.floating-element');
        
        floatingElements.forEach(element => {
            const x = (window.innerWidth / 2 - e.clientX) / 30;
            const y = (window.innerHeight / 2 - e.clientY) / 30;
            
            element.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    });
}

// Portfolio filtering
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filter = button.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = 1;
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = 0;
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Portfolio modals
function initPortfolioModals() {
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modals = document.querySelectorAll('.portfolio-modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Make entire portfolio item clickable
    portfolioItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // If clicking on a direct link, don't interfere
            if (e.target.closest('.portfolio-link') && !e.target.closest('.modal-trigger')) {
                return;
            }
            
            // Otherwise, find the modal trigger within this item and click it
            const trigger = item.querySelector('.modal-trigger');
            if (trigger) {
                e.preventDefault();
                const targetModalId = trigger.getAttribute('href');
                const targetModal = document.querySelector(targetModalId);
                
                if (targetModal) {
                    targetModal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            }
        });
    });
    
    // Open modal on trigger click (keep this for direct clicks on the info icon)
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Prevent bubbling to parent
            
            const targetModalId = trigger.getAttribute('href');
            const targetModal = document.querySelector(targetModalId);
            
            if (targetModal) {
                targetModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal on close button click
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.portfolio-modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close modal on outside click
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Close modal on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formObject = Object.fromEntries(formData);
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formObject);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for your message! I will get back to you soon.';
        
        contactForm.innerHTML = '';
        contactForm.appendChild(successMessage);
    });
}

// Back to top button
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Ripple effect for buttons
function createRipple(event) {
    const button = event.currentTarget;
    
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    const rect = button.getBoundingClientRect();
    
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 1000);
}

// Add ripple effect to all buttons
const buttons = document.querySelectorAll('button, .cta-button, .outline-button');
buttons.forEach(button => {
    button.addEventListener('click', createRipple);
});

// Typewriter effect for animated subtitle
function initTypewriter() {
    const typewriterElements = document.querySelectorAll('.animated-subtitle .typewriter');
    let currentIndex = 0;
    
    function showNextTypewriter() {
        // Hide all typewriters
        typewriterElements.forEach(element => {
            element.style.opacity = 0;
        });
        
        // Show current typewriter
        typewriterElements[currentIndex].style.opacity = 1;
        
        // Increment index
        currentIndex = (currentIndex + 1) % typewriterElements.length;
        
        // Schedule next typewriter
        setTimeout(showNextTypewriter, 2000);
    }
    
    // Start typewriter effect
    showNextTypewriter();
}
