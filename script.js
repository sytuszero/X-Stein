// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.addEventListener('DOMContentLoaded', () => {
    // Set initial state for animations
    const animatedElements = document.querySelectorAll('section, .bot-card, .stat-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add click tracking for buttons (optional analytics)
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Add a subtle click effect
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 150);
            
            // You can add analytics tracking here
            console.log('Button clicked:', btn.textContent.trim());
        });
    });

    // Add hover effect for bot cards
    document.querySelectorAll('.bot-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Animate stats numbers
    const animateStats = () => {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const finalValue = stat.textContent;
            if (finalValue.includes('K')) {
                const numValue = parseFloat(finalValue.replace('K', ''));
                animateNumber(stat, 0, numValue, 'K', 2000);
            } else if (finalValue.includes('%')) {
                const numValue = parseInt(finalValue.replace('%', ''));
                animateNumber(stat, 0, numValue, '%', 2000);
            } else if (!isNaN(parseInt(finalValue))) {
                const numValue = parseInt(finalValue);
                animateNumber(stat, 0, numValue, '', 2000);
            }
        });
    };

    const animateNumber = (element, start, end, suffix, duration) => {
        const startTime = performance.now();
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = start + (end - start) * easeOutQuart(progress);
            
            if (suffix === 'K') {
                element.textContent = current.toFixed(1) + suffix;
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };
        requestAnimationFrame(update);
    };

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    // Trigger stats animation when stats section is visible
    const statsSection = document.querySelector('.stats-section');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Add typing effect to description
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        const text = 'بوتات تليجرام مدعومة بالذكاء الاصطناعي';
        typingText.textContent = '';
        let i = 0;

        const typeWriter = () => {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 80); // Keep the same typing speed
            } else {
                // Remove the blinking cursor after typing is complete
                setTimeout(() => {
                    typingText.classList.add('typing-complete');
                }, 500);
            }
        };

        // Start typing immediately
        setTimeout(typeWriter, 100); // Very short delay, just enough for DOM to be ready
    }

    // Add particle effect to header (simple version)
    createParticles();
});

function createParticles() {
    const header = document.querySelector('.header');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'rgba(255, 255, 255, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        header.appendChild(particle);
    }
}

// Add CSS animation for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
        50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Add copy to clipboard functionality for bot usernames
document.querySelectorAll('.bot-card h3, .channel-details h3').forEach(username => {
    username.style.cursor = 'pointer';
    username.title = 'Click to copy username';
    
    username.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(username.textContent);
            
            // Show feedback
            const originalText = username.textContent;
            username.textContent = 'Copied!';
            username.style.color = '#27ae60';
            
            setTimeout(() => {
                username.textContent = originalText;
                username.style.color = '';
            }, 1000);
        } catch (err) {
            console.log('Failed to copy text');
        }
    });
});

// Bot Carousel Functionality
let currentSlide = 0;
let totalSlides = 0;

function updateSlideIndicator() {
    const currentSlideEl = document.querySelector('.current-slide');
    const totalSlidesEl = document.querySelector('.total-slides');
    if (currentSlideEl && totalSlidesEl) {
        currentSlideEl.textContent = currentSlide + 1;
        totalSlidesEl.textContent = totalSlides;
    }
}

function showSlide(slideIndex) {
    const slides = document.querySelectorAll('.bot-slide');
    const container = document.querySelector('.bot-slides-container');

    if (!slides.length || !container) return;

    // Remove active class from all slides
    slides.forEach(slide => slide.classList.remove('active'));

    // Add active class to current slide
    if (slides[slideIndex]) {
        slides[slideIndex].classList.add('active');
    }

    // Move container
    const translateX = -slideIndex * 100;
    container.style.transform = `translateX(${translateX}%)`;

    updateSlideIndicator();
}

function nextSlide() {
    if (totalSlides > 0) {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
}

function previousSlide() {
    if (totalSlides > 0) {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.bot-slide');
    totalSlides = slides.length;

    if (totalSlides > 0) {
        updateSlideIndicator();

        // Only enable auto-slide if there are multiple slides
        if (totalSlides > 1) {
            setInterval(nextSlide, 10000);
        }

        // Add touch/swipe support for mobile
        let startX = 0;
        let endX = 0;

        const carousel = document.querySelector('.bot-carousel');
        if (carousel) {
            carousel.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });

            carousel.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                handleSwipe();
            });

            function handleSwipe() {
                const swipeThreshold = 50;
                const diff = startX - endX;

                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        nextSlide();
                    } else {
                        previousSlide();
                    }
                }
            }
        }
    }
});
