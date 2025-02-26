document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('show');
            
            // Change icon
            const icon = mobileMenuBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('show');
                
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
    
    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Animation on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const animateElements = document.querySelectorAll('.animate');
    animateElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
    
    // Terminal typing effect
    const terminalCursor = document.querySelector('.cursor');
    if (terminalCursor) {
        const commandTexts = [
            'git checkout -b new-feature',
            'npm run build',
            'docker-compose up',
            'kubectl apply -f deployment.yml',
            'contact --hire'
        ];
        
        let currentCommandIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        let waitAfterTyping = 3000;
        let waitAfterDeleting = 500;
        
        function typeTerminal() {
            const commandElement = document.querySelector('.command:last-child .command-text');
            if (!commandElement) return;
            
            const currentCommand = commandTexts[currentCommandIndex];
            
            if (isDeleting) {
                // Deleting effect
                commandElement.textContent = currentCommand.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                
                // Speed up deleting
                typingSpeed = 50;
                
                if (currentCharIndex <= 0) {
                    isDeleting = false;
                    currentCommandIndex = (currentCommandIndex + 1) % commandTexts.length;
                    typingSpeed = waitAfterDeleting;
                }
            } else {
                // Typing effect
                commandElement.textContent = currentCommand.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                
                // Random typing speed
                typingSpeed = 50 + Math.random() * 100;
                
                if (currentCharIndex >= currentCommand.length) {
                    isDeleting = true;
                    typingSpeed = waitAfterTyping;
                }
            }
            
            setTimeout(typeTerminal, typingSpeed);
        }
        
        // Start the typing effect after a delay
        setTimeout(typeTerminal, 1000);
    }
});