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

    // Countdown Timer for Translation Bot
    const countdownElement = document.getElementById('translation-countdown');
    if (countdownElement) {
        // Fixed global launch date - set to a specific future date
        // This ensures all users see the same countdown that doesn't restart
        const countdownDate = new Date('2025-10-30T00:00:00'); // Set your launch date here (October 30, 2025)
        
        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = countdownDate.getTime() - now;
            
            if (distance < 0) {
                // Countdown finished
                countdownElement.innerHTML = `
                    <div class="countdown-finished">
                        <span style="color: #27ae60; font-weight: 700;">متاح الآن!</span>
                    </div>
                `;
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Update the countdown display
            const daysElement = document.getElementById('days');
            const hoursElement = document.getElementById('hours');
            const minutesElement = document.getElementById('minutes');
            const secondsElement = document.getElementById('seconds');
            
            if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
            if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
            if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
            if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
        };
        
        // Update countdown immediately and then every second
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

});