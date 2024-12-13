import { links, initializeLinks } from './links.js';
import { Scene3D } from "./three-scene.js";
import { DynamicBackground } from "./background.js";
import { starField } from "./star-animation.js";
import { hamburgerMenu } from "./hamburger.js";

// Initialize background
const background = new DynamicBackground();

// Initialize 3D scene
const scene3D = new Scene3D();
scene3D.animate();

// Update star speed based on scroll position
window.addEventListener('scroll', () => {
    const scrollFactor = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    starField.updateSpeed(scrollFactor);
});

// Initialize links with animations
document.addEventListener('DOMContentLoaded', () => {
    initializeLinks();
});

// 3D Card Effect
function init3DEffect() {
    const cards = document.querySelectorAll('.stackoverflow-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateZ(10px)
            `;
            
            // Update parallax layers
            const layers = card.querySelectorAll('.parallax-layer');
            layers.forEach((layer, index) => {
                const depth = (index + 1) * 5;
                const moveX = (x - centerX) / (10 + depth);
                const moveY = (y - centerY) / (10 + depth);
                layer.style.transform = `translate(${moveX}px, ${moveY}px) translateZ(${depth * 2}px)`;
            });
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            const layers = card.querySelectorAll('.parallax-layer');
            layers.forEach(layer => {
                layer.style.transform = 'translate(0, 0) translateZ(0)';
            });
        });
    });
}

// Initialize 3D effects
document.addEventListener('DOMContentLoaded', () => {
    init3DEffect();
    // Add floating effect to specific elements
    document.querySelectorAll('.so-logo-wrapper').forEach(elem => {
        elem.classList.add('floating');
    });
});

// Add this to your existing JavaScript
function initializeLoadingAnimation() {
    const skeletonScreen = document.querySelector('.skeleton-screen');
    const loadingCounter = document.querySelector('.loading-counter');
    let progress = 0;

    // Add glitch effect
    function addGlitchEffect() {
        const container = document.querySelector('.skeleton-container');
        if (Math.random() > 0.97) {
            container.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
            setTimeout(() => {
                container.style.transform = 'none';
            }, 50);
        }
    }
    
    // Add periodic glitch effect
    setInterval(addGlitchEffect, 100);
    
    // Add cyber typing effect to counter
    function updateCounterWithEffect(value) {
        const counter = document.querySelector('.loading-counter');
        counter.style.textShadow = '0 0 20px var(--neon-blue)';
        setTimeout(() => {
            counter.style.textShadow = '0 0 10px var(--neon-blue)';
        }, 50);
        counter.textContent = `${Math.round(value)}%`;
    }
    
    // Simulate loading progress
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        updateCounterWithEffect(progress);
        
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                skeletonScreen.classList.add('loaded');
                // Initialize your actual content
                initializeScrollProgress();
            }, 500);
        }
    }, 200);
}

function initializeScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        
        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
        progressBar.style.width = `${scrollPercentage}%`;
    });
}

// Add this function for elegant scroll animations
function initElegantScrollEffects() {
    const elements = document.querySelectorAll('.stat-item, .link, .stackoverflow-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px) scale(0.95)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(element);
    });
}

// Enhance the 3D effect
function enhancedInit3DEffect() {
    const cards = document.querySelectorAll('.stackoverflow-card, .profile-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / 20) * 1.5;
            const rotateY = ((centerX - x) / 20) * 1.5;
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateZ(20px)
                scale(1.02)
            `;
            
            // Enhanced parallax effect
            const layers = card.querySelectorAll('.parallax-layer');
            layers.forEach((layer, index) => {
                const depth = (index + 1) * 8;
                const moveX = (x - centerX) / (8 + depth);
                const moveY = (y - centerY) / (8 + depth);
                layer.style.transform = `translate(${moveX}px, ${moveY}px) translateZ(${depth * 2}px)`;
            });
        });
    });
}

// Add this to your existing JavaScript
function initializeGlowEffects() {
    const logos = document.querySelectorAll('.link svg, .so-logo, .nav-logo img');
    
    logos.forEach(logo => {
        logo.addEventListener('mousemove', (e) => {
            const rect = logo.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate distance from center
            const distanceX = (x - centerX) / centerX;
            const distanceY = (y - centerY) / centerY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            
            // Adjust glow intensity based on mouse position
            const intensity = Math.max(0.5, 1 - distance);
            const glowSize = 8 + (intensity * 4);
            const glowOpacity = 0.3 + (intensity * 0.3);
            
            logo.style.filter = `drop-shadow(0 0 ${glowSize}px rgba(255, 255, 255, ${glowOpacity}))`;
        });
        
        logo.addEventListener('mouseleave', () => {
            logo.style.filter = '';
        });
    });
}

// Enhanced glow effects for links and buttons
function initializeEnhancedGlowEffects() {
    const elements = document.querySelectorAll('.link, .nav-link, .contact-btn, .stackoverflow-link');
    
    elements.forEach(element => {
        // Add interactive glow div
        const glowDiv = document.createElement('div');
        glowDiv.className = 'interactive-glow';
        element.appendChild(glowDiv);
        
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            element.style.setProperty('--mouse-x', `${x}%`);
            element.style.setProperty('--mouse-y', `${y}%`);
            
            // Add dynamic shadow based on mouse position
            const shadowX = (x - 50) / 10;
            const shadowY = (y - 50) / 10;
            element.style.boxShadow = `
                ${shadowX}px ${shadowY}px 20px rgba(0, 0, 0, 0.2),
                0 4px 15px rgba(0, 0, 0, 0.1)
            `;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.boxShadow = '';
        });
    });
}

// Add this function to handle LinkedIn badge responsiveness
function initLinkedInBadgeResponsive() {
    const badgeWrapper = document.querySelector('.linkedin-badge-wrapper');
    const badge = document.querySelector('.badge-base');
    
    if (!badgeWrapper || !badge) return;

    // Adjust iframe size based on container width
    function adjustBadgeSize() {
        const wrapperWidth = badgeWrapper.offsetWidth;
        let aspectRatio = 0.6; // Default aspect ratio
        
        if (wrapperWidth < 480) {
            aspectRatio = 1; // Square for mobile
        } else if (wrapperWidth < 768) {
            aspectRatio = 0.7; // Slightly taller for tablets
        }
        
        const height = wrapperWidth * aspectRatio;
        badge.style.height = `${height}px`;
    }

    // Initial size adjustment
    adjustBadgeSize();

    // Adjust on window resize
    window.addEventListener('resize', adjustBadgeSize);
    
    // Add loading state
    badgeWrapper.classList.add('loading');
    
    // Remove loading state when iframe loads
    const iframe = badge.querySelector('iframe');
    if (iframe) {
        iframe.addEventListener('load', () => {
            badgeWrapper.classList.remove('loading');
            badgeWrapper.classList.add('loaded');
        });
    }
}

// Enhanced custom cursor implementation
function initializeCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    const smoothFactor = 0.15; // Adjust for smoother/faster movement

    // Cursor trail effect with improved performance
    const maxTrails = 8;
    const trails = Array.from({ length: maxTrails }, () => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        document.body.appendChild(trail);
        return {
            element: trail,
            x: 0,
            y: 0
        };
    });

    // Smooth cursor animation
    function animate() {
        // Smooth main cursor movement
        cursorX += (mouseX - cursorX) * smoothFactor;
        cursorY += (mouseY - cursorY) * smoothFactor;
        
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

        // Update trails with delay
        trails.forEach((trail, index) => {
            const delay = index * 2;
            setTimeout(() => {
                trail.x += (mouseX - trail.x) * (smoothFactor / (index + 1));
                trail.y += (mouseY - trail.y) * (smoothFactor / (index + 1));
                trail.element.style.transform = `translate(${trail.x}px, ${trail.y}px) translate(-50%, -50%) scale(${1 - (index * 0.1)})`;
            }, delay);
        });

        requestAnimationFrame(animate);
    }

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Enhanced hover effects
    const interactiveElements = document.querySelectorAll('a, button, .link, .nav-link');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hovering');
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovering');
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });

    // Enhanced click effect
    document.addEventListener('mousedown', () => {
        cursor.classList.add('clicking');
        cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('clicking');
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    animate();
}

// Update your DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', () => {
    initializeLoadingAnimation();
    initScrollProgress();
    initElegantScrollEffects();
    enhancedInit3DEffect();
    initializeGlowEffects();
    initializeEnhancedGlowEffects();
    initLinkedInBadgeResponsive();
    initializeCustomCursor();
});
  