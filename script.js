// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
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
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set initial state for animations - only for elements that exist
    const animatedElements = document.querySelectorAll('.bot-card-mini, .pricing-card, .video-section, .pricing-section');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

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

    // Add copy to clipboard functionality for bot usernames
    document.querySelectorAll('.bot-card-mini h3').forEach(username => {
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

    // Add typing effect to description - mobile optimized
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        const text = 'بوتات تليكرام مدعومة بالذكاء الاصطناعي';
        typingText.textContent = '';
        let i = 0;
        
        // Check if device is mobile for slower typing
        const isMobile = window.innerWidth <= 768;
        const typingSpeed = isMobile ? 100 : 80; // Slower on mobile
        
        const typeWriter = () => {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, typingSpeed);
            } else {
                // Remove the blinking cursor after typing is complete
                setTimeout(() => {
                    typingText.classList.add('typing-complete');
                }, 500);
            }
        };
        
        // Start typing with a short delay
        setTimeout(typeWriter, 200);
    }
});
