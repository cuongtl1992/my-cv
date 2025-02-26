document.addEventListener('DOMContentLoaded', function() {
    // Fix for anchor links and active nav state
    function fixLinks() {
        // Get all navigation links
        const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
        
        // Get current page path
        const currentPath = window.location.pathname;
        const currentHash = window.location.hash;
        
        // Set active state for current section
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            // If we're on the homepage and there's a hash in the URL
            if (currentPath === '/' || currentPath === '/index.html') {
                if (currentHash && href.includes(currentHash)) {
                    link.classList.add('active');
                } else if (!currentHash && href === '/#home') {
                    link.classList.add('active');
                }
            }
            
            // Ensure links work correctly with trailing slashes
            if (href.startsWith('#') && !href.startsWith('/#')) {
                // Convert "#section" to "/#section"
                link.setAttribute('href', '/' + href);
            }
        });
    }
    
    // Run fix on page load
    fixLinks();
    
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
    
    // Fix for scrolling to sections - adjust scroll position to account for fixed header
    window.addEventListener('hashchange', function() {
        if (window.location.hash) {
            const targetId = window.location.hash;
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Delay slightly to ensure browser has finished its native scroll
                setTimeout(function() {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    
                    window.scrollTo({
                        top: targetPosition - headerHeight - 20, // 20px extra padding
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    document.querySelectorAll('.nav-links a').forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href').includes(targetId)) {
                            link.classList.add('active');
                        }
                    });
                }, 10);
            }
        }
    }, false);
    
    // Smooth scrolling for all anchor links - fixed with absolute paths
    document.querySelectorAll('a[href^="/#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').replace('/', '');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - headerHeight - 20,
                    behavior: 'smooth'
                });
                
                // Update active state
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Update URL without reloading
                history.pushState(null, null, this.getAttribute('href'));
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