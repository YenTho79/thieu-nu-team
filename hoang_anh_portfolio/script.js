// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initScrollAnimations();
    initHeaderScroll();
    initScrollDownButton();
    initContactButtons();
    initSkillTags();
    initParallaxEffect();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations for elements
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.hero-content, .about-content, .resume-content, .resume-section, .skills-section, .language-section, .hobbies-section');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.backgroundColor = 'rgba(47, 79, 79, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(47, 79, 79, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Scroll down button functionality
function initScrollDownButton() {
    const scrollDownBtn = document.querySelector('.scroll-down-btn');
    
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = aboutSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Contact buttons functionality
function initContactButtons() {
    const contactButtons = document.querySelectorAll('.btn-contact, .linkedin-btn');
    
    contactButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add ripple effect
            createRippleEffect(this);
            
            // Handle different button types
            if (this.classList.contains('btn-contact')) {
                // Scroll to contact section or open contact modal
                const contactBox = document.querySelector('.contact-box');
                if (contactBox) {
                    contactBox.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            } else if (this.classList.contains('linkedin-btn')) {
                // Open LinkedIn profile
                window.open('https://linkedin.com/in/han-nnb', '_blank');
            }
        });
    });
}

// Create ripple effect for buttons
function createRippleEffect(button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Skill tags interaction
function initSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag, .design-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 5px 15px rgba(232, 141, 58, 0.3)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

// Parallax effect for background elements
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.star-decoration, .folio-repeated');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Software skills buttons interaction
document.addEventListener('DOMContentLoaded', function() {
    const softwareButtons = document.querySelectorAll('.software-btn');
    
    softwareButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            softwareButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Add tooltip effect
            showTooltip(this);
        });
    });
});

// Show tooltip for software skills
function showTooltip(button) {
    const tooltips = {
        'Ps': 'Adobe Photoshop',
        'Ai': 'Adobe Illustrator', 
        'Id': 'Adobe InDesign',
        'Xd': 'Adobe XD',
        'Pr': 'Adobe Premiere Pro'
    };
    
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltips[button.textContent] || button.textContent;
    tooltip.style.cssText = `
        position: absolute;
        background: #000;
        color: #F5F5DC;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        white-space: nowrap;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = button.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    // Show tooltip
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 10);
    
    // Hide tooltip after 2 seconds
    setTimeout(() => {
        tooltip.style.opacity = '0';
        setTimeout(() => {
            tooltip.remove();
        }, 300);
    }, 2000);
}

// Add CSS for active state and transitions
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .software-btn {
        transition: all 0.3s ease;
    }
    
    .software-btn.active {
        background-color: #E88D3A !important;
        color: #F5F5DC !important;
        transform: scale(1.1);
    }
    
    .skill-tag, .design-tag {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .header {
        transition: all 0.3s ease;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .star-decoration {
        transition: transform 0.3s ease;
    }
    
    .folio-repeated {
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(additionalStyles);

// Loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add loading styles
    const loadingStyles = document.createElement('style');
    loadingStyles.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(loadingStyles);
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close any open modals or reset states
    if (e.key === 'Escape') {
        const activeButtons = document.querySelectorAll('.software-btn.active');
        activeButtons.forEach(btn => btn.classList.remove('active'));
    }
    
    // Arrow keys for navigation
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const sections = ['#about', '#resume'];
        const currentSection = getCurrentSection();
        const currentIndex = sections.indexOf(currentSection);
        
        if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
            document.querySelector(sections[currentIndex + 1]).scrollIntoView({ 
                behavior: 'smooth' 
            });
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            document.querySelector(sections[currentIndex - 1]).scrollIntoView({ 
                behavior: 'smooth' 
            });
        }
    }
});

// Get current visible section
function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    for (let section of sections) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            return '#' + section.id;
        }
    }
    
    return '#about'; // Default fallback
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(function() {
    // Scroll-based animations and effects
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);
