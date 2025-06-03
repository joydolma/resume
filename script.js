document.addEventListener("DOMContentLoaded", function() {
    // Initialize particles
    initParticles();
    
    // Initialize typing animation
    initTypingAnimation();
    
    // Initialize skill hexagons
    initSkillHexagons();
    
    // Initialize navigation
    initNavigation();
    
    // Add scroll animations
    initScrollAnimations();
});

// Particle animation for hero section
function initParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random particle properties
        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.backgroundColor = Math.random() > 0.5 ? 'var(--primary-color)' : 'var(--secondary-color)';
        particle.style.boxShadow = `0 0 ${size * 2}px ${particle.style.backgroundColor}`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        particlesContainer.appendChild(particle);
    }
    
    // Add CSS for particles
    const style = document.createElement('style');
    style.textContent = `
        .particle {
            position: absolute;
            border-radius: 50%;
            opacity: 0;
            animation: float-particle linear infinite;
        }
        
        @keyframes float-particle {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Typing animation for roles
function initTypingAnimation() {
    const roles = [
        "VFX Compositor.",
        "Web Developer.",
        "Python Nuke TD.",
        "UI/UX Designer."
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById('typing-role');
    
    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Deleting text
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(type, 500); // Pause before typing next role
            } else {
                setTimeout(type, 50); // Deleting speed
            }
        } else {
            // Typing text
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentRole.length) {
                isDeleting = true;
                setTimeout(type, 1000); // Pause before deleting
            } else {
                setTimeout(type, 100); // Typing speed
            }
        }
    }
    
    // Start typing animation
    setTimeout(type, 1000);
}

// Initialize skill hexagons with animation
function initSkillHexagons() {
    const skillHexagons = document.querySelectorAll('.skill-hexagon');
    
    skillHexagons.forEach(hexagon => {
        const percentage = hexagon.getAttribute('data-percentage');
        const levelElement = hexagon.querySelector('.skill-level');
        
        // Animate the percentage
        let currentPercentage = 0;
        const interval = setInterval(() => {
            if (currentPercentage >= parseInt(percentage)) {
                clearInterval(interval);
            } else {
                currentPercentage++;
                levelElement.textContent = `${currentPercentage}%`;
            }
        }, 20);
        
        // Add glow effect based on percentage
        const hexagonOuter = hexagon.querySelector('.hexagon-outer');
        hexagonOuter.style.filter = `drop-shadow(0 0 ${parseInt(percentage) / 10}px var(--primary-color))`;
    });
}

// Initialize navigation and mobile menu
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Animate hamburger menu
            const hamburger = navToggle.querySelector('.hamburger');
            hamburger.classList.toggle('active');
            
            if (hamburger.classList.contains('active')) {
                hamburger.querySelector('span:nth-child(1)').style.transform = 'rotate(45deg) translate(5px, 5px)';
                hamburger.querySelector('span:nth-child(2)').style.opacity = '0';
                hamburger.querySelector('span:nth-child(3)').style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                hamburger.querySelector('span:nth-child(1)').style.transform = 'rotate(0)';
                hamburger.querySelector('span:nth-child(2)').style.opacity = '1';
                hamburger.querySelector('span:nth-child(3)').style.transform = 'rotate(0)';
            }
        });
    }
    
    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                
                // Reset hamburger
                const hamburger = navToggle.querySelector('.hamburger');
                hamburger.classList.remove('active');
                hamburger.querySelector('span:nth-child(1)').style.transform = 'rotate(0)';
                hamburger.querySelector('span:nth-child(2)').style.opacity = '1';
                hamburger.querySelector('span:nth-child(3)').style.transform = 'rotate(0)';
            }
        });
    });
    
    // Add active class to nav links on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('.section');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    });
}

// Add scroll animations to elements
function initScrollAnimations() {
    // Add CSS for scroll animations
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Add fade-in class to elements
    const animatedElements = [
        ...document.querySelectorAll('.section-header'),
        ...document.querySelectorAll('.data-card'),
        ...document.querySelectorAll('.data-item'),
        ...document.querySelectorAll('.skill-hexagon'),
        ...document.querySelectorAll('.service-card'),
        ...document.querySelectorAll('.timeline-block'),
        ...document.querySelectorAll('.portfolio-item'),
        ...document.querySelectorAll('.contact-form')
    ];
    
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Check if elements are in viewport
    function checkVisibility() {
        const fadeElements = document.querySelectorAll('.fade-in');
        const windowHeight = window.innerHeight;
        
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }
    
    // Initial check
    checkVisibility();
    
    // Check on scroll
    window.addEventListener('scroll', checkVisibility);
}

// Add terminal cursor blinking effect
function blinkCursor() {
    const cursor = document.querySelector('.cursor');
    setInterval(() => {
        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
    }, 500);
}

// Add contact form functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name && email && message) {
                // In a real application, you would send this data to a server
                alert('Message sent successfully!');
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
});
