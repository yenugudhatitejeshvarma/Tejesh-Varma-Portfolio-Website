// Logo Gallery JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initNavigation();
    
    // Initialize logo lightbox
    initLogoLightbox();
    
    // Add page transition effect
    document.body.classList.add('page-loaded');
});

// Initialize navigation
function initNavigation() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('toggle');
    });
    
    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add active class to current nav item
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('#')[0];
        if (currentLocation.includes(linkPath) && linkPath !== '') {
            link.classList.add('active');
        }
    });
}

// Initialize logo lightbox
function initLogoLightbox() {
    const logoCards = document.querySelectorAll('.view-logo-btn');
    const lightbox = document.querySelector('.logo-lightbox');
    const closeLightbox = document.querySelector('.close-lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const lightboxDescription = document.querySelector('.lightbox-description');
    const lightboxClient = document.querySelector('.lightbox-client');
    const lightboxIndustry = document.querySelector('.lightbox-industry');
    const lightboxYear = document.querySelector('.lightbox-year');
    const prevLogo = document.querySelector('.prev-logo');
    const nextLogo = document.querySelector('.next-logo');
    
    // Logo data with enhanced descriptions
    const logoData = [
        {
            title: 'Aleph',
            description: 'A minimalist tech logo designed for a software development company. The geometric design represents precision and innovation, with clean lines and a modern aesthetic that conveys technical expertise.',
            image: 'images/logos/logo1.png',
            client: 'Aleph Technologies',
            industry: 'Software Development',
            year: '2023'
        },
        {
            title: 'Colorful Blocks',
            description: 'Vibrant and playful logo created for a creative agency. The colorful blocks represent diversity in ideas and creative solutions, with each color symbolizing different aspects of the creative process.',
            image: 'images/logos/logo2.png',
            client: 'Creative Minds Agency',
            industry: 'Design & Marketing',
            year: '2023'
        },
        {
            title: 'Infinity',
            description: 'A modern logo featuring an infinity symbol, designed for a digital solutions company. Represents endless possibilities and continuous innovation in the digital landscape, with a sleek and sophisticated design.',
            image: 'images/logos/logo3.png',
            client: 'Infinite Digital',
            industry: 'Technology',
            year: '2024'
        },
        {
            title: 'Flow',
            description: 'Fluid and dynamic logo designed for a workflow management application. The flowing design represents seamless processes and efficiency, with a color gradient that suggests transformation and progress.',
            image: 'images/logos/logo4.png',
            client: 'FlowWorks Inc.',
            industry: 'Productivity Software',
            year: '2023'
        },
        {
            title: 'Levido',
            description: 'A gradient-based logo with a modern lettermark design for a tech startup. The gradient colors represent innovation and forward-thinking, creating a memorable and distinctive brand identity.',
            image: 'images/logos/logo5.png',
            client: 'Levido Tech',
            industry: 'SaaS',
            year: '2024'
        },
        {
            title: 'Nexus',
            description: 'Geometric logo design representing connection and integration for a tech company specializing in system integration. The interlocking shapes symbolize seamless connectivity and unified solutions.',
            image: 'images/logos/logo6.png',
            client: 'Nexus Integration',
            industry: 'System Integration',
            year: '2023'
        },
        {
            title: 'Feather',
            description: 'Minimalist logo design for a lightweight content management system. The feather symbolizes lightness and ease of use, with a clean and elegant design that reflects the product\'s simplicity.',
            image: 'images/logos/logo7.png',
            client: 'Feather CMS',
            industry: 'Content Management',
            year: '2024'
        },
        {
            title: 'X-Mark',
            description: 'Bold and distinctive logo for a brand identity agency. The X-mark represents precision and uniqueness in brand development, with strong lines that convey confidence and authority in the branding space.',
            image: 'images/logos/logo8.png',
            client: 'X-Mark Identity',
            industry: 'Branding',
            year: '2023'
        }
    ];
    
    let currentIndex = 0;
    
    // Open lightbox with smooth transition
    logoCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            currentIndex = parseInt(card.getAttribute('data-index'));
            
            // Preload image before showing lightbox
            const preloadImage = new Image();
            preloadImage.src = logoData[currentIndex].image;
            
            preloadImage.onload = () => {
                updateLightboxContent(currentIndex);
                lightbox.style.display = 'block';
                
                // Force reflow for smooth transition
                void lightbox.offsetWidth;
                
                setTimeout(() => {
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }, 10);
            };
        });
    });
    
    // Close lightbox with smooth transition
    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    });
    
    // Close on outside click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            setTimeout(() => {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }
    });
    
    // Navigate to previous logo with smooth transition
    prevLogo.addEventListener('click', () => {
        // Add a small animation to the button
        prevLogo.classList.add('clicked');
        setTimeout(() => prevLogo.classList.remove('clicked'), 300);
        
        currentIndex = (currentIndex - 1 + logoData.length) % logoData.length;
        updateLightboxContent(currentIndex, 'prev');
    });
    
    // Navigate to next logo with smooth transition
    nextLogo.addEventListener('click', () => {
        // Add a small animation to the button
        nextLogo.classList.add('clicked');
        setTimeout(() => nextLogo.classList.remove('clicked'), 300);
        
        currentIndex = (currentIndex + 1) % logoData.length;
        updateLightboxContent(currentIndex, 'next');
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
                setTimeout(() => {
                    lightbox.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }, 300);
            } else if (e.key === 'ArrowLeft') {
                // Simulate button click animation
                prevLogo.classList.add('clicked');
                setTimeout(() => prevLogo.classList.remove('clicked'), 300);
                
                currentIndex = (currentIndex - 1 + logoData.length) % logoData.length;
                updateLightboxContent(currentIndex, 'prev');
            } else if (e.key === 'ArrowRight') {
                // Simulate button click animation
                nextLogo.classList.add('clicked');
                setTimeout(() => nextLogo.classList.remove('clicked'), 300);
                
                currentIndex = (currentIndex + 1) % logoData.length;
                updateLightboxContent(currentIndex, 'next');
            }
        }
    });
    
    // Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - next logo
            currentIndex = (currentIndex + 1) % logoData.length;
            updateLightboxContent(currentIndex, 'next');
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - previous logo
            currentIndex = (currentIndex - 1 + logoData.length) % logoData.length;
            updateLightboxContent(currentIndex, 'prev');
        }
    }
    
    // Update lightbox content with transition effect
    function updateLightboxContent(index, direction = 'none') {
        const logo = logoData[index];
        
        // Add transition classes based on direction
        if (direction !== 'none') {
            const slideOutClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
            const slideInClass = direction === 'next' ? 'slide-in-right' : 'slide-in-left';
            
            // Apply slide out animation
            lightboxImage.classList.add(slideOutClass);
            lightboxTitle.classList.add(slideOutClass);
            lightboxDescription.classList.add(slideOutClass);
            
            // After slide out, update content and slide in
            setTimeout(() => {
                // Update content
                lightboxImage.src = logo.image;
                lightboxTitle.textContent = logo.title;
                lightboxDescription.textContent = logo.description;
                lightboxClient.textContent = logo.client;
                lightboxIndustry.textContent = logo.industry;
                lightboxYear.textContent = logo.year;
                
                // Remove slide out class and add slide in class
                lightboxImage.classList.remove(slideOutClass);
                lightboxTitle.classList.remove(slideOutClass);
                lightboxDescription.classList.remove(slideOutClass);
                
                lightboxImage.classList.add(slideInClass);
                lightboxTitle.classList.add(slideInClass);
                lightboxDescription.classList.add(slideInClass);
                
                // Remove slide in class after animation completes
                setTimeout(() => {
                    lightboxImage.classList.remove(slideInClass);
                    lightboxTitle.classList.remove(slideInClass);
                    lightboxDescription.classList.remove(slideInClass);
                }, 500);
            }, 300);
        } else {
            // Simple fade effect for initial load
            lightboxImage.style.opacity = 0;
            lightboxTitle.style.opacity = 0;
            lightboxDescription.style.opacity = 0;
            
            setTimeout(() => {
                lightboxImage.src = logo.image;
                lightboxTitle.textContent = logo.title;
                lightboxDescription.textContent = logo.description;
                lightboxClient.textContent = logo.client;
                lightboxIndustry.textContent = logo.industry;
                lightboxYear.textContent = logo.year;
                
                lightboxImage.style.opacity = 1;
                lightboxTitle.style.opacity = 1;
                lightboxDescription.style.opacity = 1;
            }, 200);
        }
    }
} 