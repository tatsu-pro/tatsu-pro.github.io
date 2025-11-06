// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavigation();
    initScrollAnimations();
    initCounterAnimation();
    initSmoothScrolling();
    initContactForm();
    initParallaxEffect();
    initLoadingScreen();
    
    // Initialize typing effect after a short delay to ensure elements are ready
    setTimeout(initTypingEffect, 100);
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section');
    const navLinksArray = Array.from(navLinks);

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinksArray.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements
    const animateElements = document.querySelectorAll('.section-title, .about-text, .service-card, .strength-item, .tech-category, .contact-info, .contact-cta');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Enhanced typing effect for hero section
function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) {
        // Try again after a delay
        setTimeout(initTypingEffect, 500);
        return;
    }
    
    const texts = [
        'こんにちは、たつプロです。',
        'Hello, I am TatsuPro.',
        '你好，我是たつプロ。',
        'Bonjour, je suis TatsuPro.',
        '안녕하세요, 타츠프로입니다.'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        // Set typing speed with some randomness for natural feel
        let typeSpeed;
        if (isDeleting) {
            typeSpeed = Math.random() * 50 + 30; // 30-80ms for deleting
        } else {
            typeSpeed = Math.random() * 100 + 80; // 80-180ms for typing
        }

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end to read
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before next text
        }

        setTimeout(typeEffect, typeSpeed);
    }

    // Start typing effect immediately
    typeEffect();
}

// Counter animation for stats
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;

                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link, .btn[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact CTA functionality
function initContactForm() {
    const ctaButton = document.querySelector('.contact-cta .btn');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {            
            // Add a small animation feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }
}



// Parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const floatingElements = document.querySelectorAll('.floating-element');

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }

        floatingElements.forEach((element, index) => {
            const speed = 0.2 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Loading screen with progress
function initLoadingScreen() {
    // Create loading screen with progress
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loader"></div>
            <div class="progress-container">
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
                <div class="progress-text">0%</div>
            </div>
            <div class="loading-message">読み込み中...</div>
        </div>
    `;
    document.body.appendChild(loadingScreen);

    // Progress simulation
    let progress = 0;
    const progressFill = loadingScreen.querySelector('.progress-fill');
    const progressText = loadingScreen.querySelector('.progress-text');
    const loadingMessage = loadingScreen.querySelector('.loading-message');

    const messages = [
        '読み込み中...',
        'リソースを準備中...',
        'コンテンツを構築中...',
        '最終調整中...',
        '完了しました！'
    ];

    const progressInterval = setInterval(() => {
        progress += Math.random() * 15 + 5; // 5-20%ずつ増加
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
        }

        progressFill.style.width = progress + '%';
        progressText.textContent = Math.floor(progress) + '%';

        // メッセージを進捗に応じて変更
        if (progress < 25) {
            loadingMessage.textContent = messages[0];
        } else if (progress < 50) {
            loadingMessage.textContent = messages[1];
        } else if (progress < 75) {
            loadingMessage.textContent = messages[2];
        } else if (progress < 100) {
            loadingMessage.textContent = messages[3];
        } else {
            loadingMessage.textContent = messages[4];
        }
    }, 200);

    // Hide loading screen after page load
    window.addEventListener('load', function() {
        // 実際のページ読み込み完了時に100%にする
        setTimeout(() => {
            progress = 100;
            progressFill.style.width = '100%';
            progressText.textContent = '100%';
            loadingMessage.textContent = messages[4];
            
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
            }, 800);
        }, 500);
    });
}

// Utility functions
function debounce(func, wait) {
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

// Theme toggle (bonus feature)
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.style.cssText = `
        position: fixed;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: #2563eb;
        color: white;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
    `;

    document.body.appendChild(themeToggle);

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const icon = this.querySelector('i');
        if (document.body.classList.contains('dark-theme')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    });
}

// Initialize theme toggle
// initThemeToggle();

// Performance optimization
const debouncedScroll = debounce(() => {
    // Scroll-based animations can be added here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});