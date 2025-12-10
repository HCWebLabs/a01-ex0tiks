/* =====================================================
   a01.ex0tiks - Main JavaScript
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --------------------- Mobile Navigation Toggle ---------------------
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
    
    // --------------------- Scroll Animations ---------------------
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for fade-in animation
    document.querySelectorAll('.featured-card, .section-header, .vibe-text, .cta-content').forEach(el => {
        el.classList.add('fade-in-element');
        fadeInObserver.observe(el);
    });
    
    // --------------------- Glitch Effect on Hover (Gallery Cards) ---------------------
    const cards = document.querySelectorAll('.featured-card, .gallery-item, .shop-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('glitch-hover');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('glitch-hover');
        });
    });
    
    // --------------------- Random Floating Element Movement ---------------------
    const floaters = document.querySelectorAll('.floater');
    
    floaters.forEach(floater => {
        // Add random initial rotation
        const randomRotation = Math.random() * 360;
        floater.style.transform = `rotate(${randomRotation}deg)`;
        
        // Randomize animation duration slightly
        const baseDuration = 20;
        const randomDuration = baseDuration + (Math.random() * 10 - 5);
        floater.style.animationDuration = `${randomDuration}s`;
    });
    
    // --------------------- Form Validation (for commission page) ---------------------
    const commissionForm = document.getElementById('commission-form');
    
    if (commissionForm) {
        commissionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation
            const name = commissionForm.querySelector('#name');
            const email = commissionForm.querySelector('#email');
            const description = commissionForm.querySelector('#description');
            
            let isValid = true;
            
            // Reset previous errors
            commissionForm.querySelectorAll('.error-message').forEach(el => el.remove());
            commissionForm.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
            
            if (!name.value.trim()) {
                showError(name, 'Please enter your name');
                isValid = false;
            }
            
            if (!email.value.trim() || !isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                isValid = false;
            }
            
            if (!description.value.trim()) {
                showError(description, 'Please describe your commission idea');
                isValid = false;
            }
            
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.innerHTML = `
                    <span class="success-icon">✿</span>
                    <p>Thanks for reaching out! I'll get back to you soon.</p>
                `;
                commissionForm.innerHTML = '';
                commissionForm.appendChild(successMessage);
            }
        });
    }
    
    function showError(input, message) {
        input.classList.add('input-error');
        const error = document.createElement('span');
        error.className = 'error-message';
        error.textContent = message;
        input.parentNode.appendChild(error);
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // --------------------- Lightbox for Gallery ---------------------
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    if (lightbox) {
        // Open lightbox
        document.querySelectorAll('.gallery-item, .featured-card').forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const title = item.querySelector('h3');
                
                if (img && lightboxImg) {
                    lightboxImg.src = img.src;
                    lightboxImg.alt = img.alt;
                }
                
                if (title && lightboxTitle) {
                    lightboxTitle.textContent = title.textContent;
                }
                
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close lightbox
        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
        
        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // --------------------- Shop Item Interaction ---------------------
    const buyButtons = document.querySelectorAll('.btn-buy');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Prevent default if it's a placeholder
            if (button.getAttribute('href') === '#') {
                e.preventDefault();
                
                // Visual feedback
                const originalText = button.textContent;
                button.textContent = 'Coming Soon!';
                button.classList.add('btn-disabled');
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.classList.remove('btn-disabled');
                }, 2000);
            }
        });
    });
    
    // --------------------- Add CSS for JS-dependent animations ---------------------
    const style = document.createElement('style');
    style.textContent = `
        .fade-in-element {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in-element.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .featured-card.fade-in-element:nth-child(1) { transition-delay: 0.1s; }
        .featured-card.fade-in-element:nth-child(2) { transition-delay: 0.2s; }
        .featured-card.fade-in-element:nth-child(3) { transition-delay: 0.3s; }
        .featured-card.fade-in-element:nth-child(4) { transition-delay: 0.4s; }
        
        .form-success {
            text-align: center;
            padding: 2rem;
        }
        
        .form-success .success-icon {
            font-size: 3rem;
            display: block;
            margin-bottom: 1rem;
            animation: bounce 1s infinite ease-in-out;
        }
        
        .form-success p {
            font-size: 1.25rem;
            color: var(--cyan);
        }
        
        .btn-disabled {
            opacity: 0.7;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
    
    // --------------------- Console Easter Egg ---------------------
    console.log('%c✿ a01.ex0tiks ✿', 'font-size: 24px; font-weight: bold; color: #E84B8A; text-shadow: 2px 2px 0 #00C4D4;');
    console.log('%cArt by Ginger', 'font-size: 14px; color: #00C4D4;');
    console.log('%cSite crafted with 💜 by HC Web Labs', 'font-size: 12px; color: #7B4BA2;');
});
