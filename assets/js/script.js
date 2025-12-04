// Debug: Log page visibility changes
document.addEventListener('visibilitychange', () => {
    console.log('Page visibility changed:', document.visibilityState);
});

// Debug: Log page unload events
window.addEventListener('beforeunload', () => {
    console.log('Page is about to unload/refresh');
});

// Debug: Log page reload
if (performance.navigation.type === 1) {
    console.log('Page was reloaded');
}

// Debug: Monitor for unexpected location changes
let lastHref = window.location.href;
setInterval(() => {
    if (window.location.href !== lastHref) {
        console.log('Location changed from:', lastHref, 'to:', window.location.href);
        lastHref = window.location.href;
    }
}, 1000);

// Page Transition Handler
function handlePageTransition(e) {
    const href = e.currentTarget.getAttribute('href');

    // Only handle internal page transitions (clean URLs)
    if (href && (href === '/' || href === '/store' || href.endsWith('.html'))) {
        e.preventDefault();

        // Add exit animation
        document.body.classList.add('page-exit');

        // Navigate after animation completes
        setTimeout(() => {
            window.location.href = href;
        }, 400);
    }
}

// Add transition handler to all internal links
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href="/"], a[href="/store"], a[href$=".html"]').forEach(link => {
        // Skip anchor links
        if (!link.getAttribute('href').includes('#')) {
            link.addEventListener('click', handlePageTransition);
        }
    });
});

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
            // Use requestAnimationFrame to ensure smooth animation without layout shift
            requestAnimationFrame(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            });
        }
    });
}, observerOptions);

// Telegram Web App Integration
let tg = window.Telegram?.WebApp;

// Initialize Telegram Web App
if (tg) {
    console.log('Telegram WebApp detected');
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
        console.log('Telegram viewport changed');
        // Recalculate layout when viewport changes
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 100);
    });

    // Monitor Telegram events
    tg.onEvent('themeChanged', () => {
        console.log('Telegram theme changed');
    });

    tg.onEvent('mainButtonClicked', () => {
        console.log('Telegram main button clicked');
    });
} else {
    console.log('Telegram WebApp not detected');
}


// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Remove page-exit class to ensure smooth entry animation
    document.body.classList.remove('page-exit');

    // Check if device is mobile
    const isMobile = window.innerWidth <= 768;


    if (isMobile) {
        // Mobile: Standard website fade-in behavior
        // Use will-change and avoid initial opacity 0 to prevent layout shift
        const sectionContainers = document.querySelectorAll('.bot-cards-container, .pricing-section, .video-section');
        sectionContainers.forEach((el, index) => {
            el.style.willChange = 'opacity, transform';
            el.style.transitionDelay = `${index * 0.15}s`; // Natural stagger like other sites
            observer.observe(el);
        });
    } else {
        // Desktop: Only video section fades in on scroll, others load immediately
        const videoSection = document.querySelector('.video-section');
        if (videoSection) {
            videoSection.style.willChange = 'opacity, transform';
            observer.observe(videoSection);
        }
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
