// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.05,
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

// Telegram Web App Integration
let tg = window.Telegram?.WebApp;

// Initialize Telegram Web App
if (tg) {
    tg.ready();
    tg.expand();
    tg.enableClosingConfirmation();
    
    // Set theme parameters
    tg.setHeaderColor('#1e293b');
    tg.setBackgroundColor('#0f172a');
    
    // Add Telegram Mini App class to body for specific styling
    document.body.classList.add('telegram-mini-app');
    
    // Disable Telegram's default header
    tg.setHeaderColor('transparent');
    
    // Handle viewport changes
    tg.onEvent('viewportChanged', () => {
        // Recalculate layout when viewport changes
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 100);
    });
}


// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if device is mobile
    const isMobile = window.innerWidth <= 768;
    
    
    if (isMobile) {
        // Mobile: Standard website fade-in behavior
        const sectionContainers = document.querySelectorAll('.bot-cards-container, .pricing-section, .video-section');
        sectionContainers.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            el.style.transitionDelay = `${index * 0.15}s`; // Natural stagger like other sites
            observer.observe(el);
        });
    } else {
        // Desktop: Only video section fades in on scroll, others load immediately
        const videoSection = document.querySelector('.video-section');
        if (videoSection) {
            videoSection.style.opacity = '0';
            videoSection.style.transform = 'translateY(30px)';
            videoSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(videoSection);
        }
        
        // Desktop: Immediately show bot cards and pricing sections
        const immediateSections = document.querySelectorAll('.bot-cards-container, .pricing-section');
        immediateSections.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }

    // Add click tracking for buttons
    document.querySelectorAll('.chat-btn-mini, .telegram-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Add a subtle click effect
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 150);
            
            console.log('Button clicked:', btn.textContent.trim());
        });
    });


    // Set description text normally
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        const text = 'بوتات تليكرام مدعومة بالذكاء الاصطناعي';
        typingText.textContent = text;
    }


});
