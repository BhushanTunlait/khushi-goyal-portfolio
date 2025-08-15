// Portfolio JavaScript - Khushi Goyal
// Handles scroll animations, navigation, and interactive features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initScrollAnimations();
    initNavigation();
    initSmoothScrolling();
    initLazyLoading();
    initBackToTop();
    initArticleModals();
    console.log('Portfolio loaded successfully');
});

// Scroll-triggered animations using IntersectionObserver
function initScrollAnimations() {
    try {
        // Check if IntersectionObserver is supported
        if (!('IntersectionObserver' in window)) {
            console.warn('IntersectionObserver not supported. Applying animations immediately.');
            applyAnimationsImmediately();
            return;
        }

        // Create intersection observer
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all elements with animate-on-scroll class
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        animateElements.forEach(element => {
            observer.observe(element);
        });

    } catch (error) {
        console.error('Error initializing scroll animations:', error);
        applyAnimationsImmediately();
    }
}

// Fallback function for browsers without IntersectionObserver
function applyAnimationsImmediately() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(element => {
        element.classList.add('fade-in');
    });
}

// Navigation functionality
function initNavigation() {
    try {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Toggle mobile menu
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });

        // Navbar background on scroll
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    navbar.style.background = 'rgba(10, 26, 47, 0.98)';
                } else {
                    navbar.style.background = 'rgba(10, 26, 47, 0.95)';
                }
            });
        }

        // Active navigation link highlighting
        highlightActiveNavLink();

    } catch (error) {
        console.error('Error initializing navigation:', error);
    }
}

// Highlight active navigation link based on scroll position
function highlightActiveNavLink() {
    try {
        const sections = document.querySelectorAll('section[id], header[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (window.scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

    } catch (error) {
        console.error('Error highlighting active nav link:', error);
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    try {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');

        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                // Skip if it's just a hash
                if (href === '#') return;

                const targetElement = document.querySelector(href);

                if (targetElement) {
                    e.preventDefault();
                    const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

    } catch (error) {
        console.error('Error initializing smooth scrolling:', error);
    }
}

// Enhanced lazy loading for images
function initLazyLoading() {
    try {
        // Check if native lazy loading is supported
        if ('loading' in HTMLImageElement.prototype) {
            console.log('Native lazy loading supported');
            return;
        }

        // Fallback for browsers without native lazy loading
        const images = document.querySelectorAll('img[loading="lazy"]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for very old browsers
            images.forEach(img => {
                img.src = img.dataset.src || img.src;
            });
        }

    } catch (error) {
        console.error('Error initializing lazy loading:', error);
    }
}

// Back to Top Button functionality
function initBackToTop() {
    try {
        const backToTopBtn = document.getElementById('backToTop');

        if (!backToTopBtn) {
            console.warn('Back to top button not found');
            return;
        }

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        // Smooth scroll to top when clicked
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            // Optional: Focus on the top of the page for accessibility
            document.querySelector('#home').focus();
        });

        // Keyboard accessibility
        backToTopBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                backToTopBtn.click();
            }
        });

    } catch (error) {
        console.error('Error initializing back to top button:', error);
    }
}

// Article modal functionality
function initArticleModals() {
    try {
        // Article data
        const articleData = {
            'article1': {
                title: 'Landmark Supreme Court Judgement',
                content: `
                    <p>A comprehensive analysis of a landmark judgment delivered by the Supreme Court of India that has significantly shaped the interpretation of constitutional rights and public interest litigation.</p>
                    
                    <h3>Background</h3>
                    <p>The case originated from a public interest litigation filed in 2020, challenging certain provisions that were alleged to infringe upon fundamental rights guaranteed under the Constitution.</p>
                    
                    <h3>Key Legal Principles</h3>
                    <ul>
                        <li>Interpretation of Article 21 in modern context</li>
                        <li>Balance between individual rights and public interest</li>
                        <li>Scope of judicial review in constitutional matters</li>
                    </ul>
                    
                    <h3>Impact and Implications</h3>
                    <p>This judgment has far-reaching implications for constitutional law jurisprudence in India, particularly in the realm of fundamental rights and their interpretation in contemporary times.</p>`,
                tags: ['Constitutional Law', 'Supreme Court', 'Fundamental Rights']
            },
            'article2': {
                title: 'Legal Aid in India',
                content: `
                    <p>A detailed exploration of the legal aid system in India, its constitutional foundations, and practical implementation.</p>
                    
                    <h3>Constitutional Mandate</h3>
                    <p>Article 39A of the Indian Constitution mandates free legal aid to ensure that opportunities for securing justice are not denied to any citizen by reason of economic or other disabilities.</p>
                    
                    <h3>Current Framework</h3>
                    <ul>
                        <li>Structure of legal aid committees</li>
                        <li>Eligibility criteria for free legal services</li>
                        <li>Types of legal aid available</li>
                    </ul>
                    
                    <h3>Challenges and Solutions</h3>
                    <p>Analysis of current challenges in the legal aid system and proposed solutions for better implementation.</p>`,
                tags: ['Human Rights', 'Access to Justice', 'Legal Aid']
            },
            'article3': {
                title: 'Analysis of Fundamental Rights in India',
                content: `
                    <p>An in-depth analysis of Fundamental Rights under the Indian Constitution, their evolution, and contemporary relevance.</p>
                    
                    <h3>Historical Development</h3>
                    <p>Tracing the evolution of fundamental rights from the constituent assembly debates to modern interpretations.</p>
                    
                    <h3>Key Aspects</h3>
                    <ul>
                        <li>Right to Equality (Articles 14-18)</li>
                        <li>Right to Freedom (Articles 19-22)</li>
                        <li>Right against Exploitation (Articles 23-24)</li>
                    </ul>
                    
                    <h3>Judicial Interpretation</h3>
                    <p>Analysis of landmark cases that have shaped the understanding and scope of fundamental rights.</p>`,
                tags: ['Fundamental Rights', 'Constitutional Analysis', 'Indian Constitution']
            },
            'article4': {
                title: 'Legal Framework for Environment in India',
                content: `
                    <p>A comprehensive overview of India's environmental legal framework and its effectiveness in addressing contemporary environmental challenges.</p>
                    
                    <h3>Legislative Framework</h3>
                    <p>Analysis of key environmental legislation including the Environment Protection Act, 1986, and various pollution control acts.</p>
                    
                    <h3>Judicial Contribution</h3>
                    <ul>
                        <li>Role of PIL in environmental protection</li>
                        <li>Landmark environmental cases</li>
                        <li>Principles developed by courts</li>
                    </ul>
                    
                    <h3>International Obligations</h3>
                    <p>India's commitments under international environmental conventions and their domestic implementation.</p>`,
                tags: ['Environmental Law', 'Sustainable Development', 'Legal Framework']
            }
        };

        // Create modal container
        const modalContainer = document.createElement('div');
        modalContainer.classList.add('modal');
        modalContainer.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2 class="modal-title"></h2>
                <div class="modal-body"></div>
                <div class="modal-tags"></div>
            </div>
        `;
        document.body.appendChild(modalContainer);

        // Add click handlers to all "Read More" links
        const readMoreLinks = document.querySelectorAll('.card-link');
        readMoreLinks.forEach((link, index) => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const articleId = `article${index + 1}`;
                showModal(articleId);
            });
        });

        // Close modal when clicking the close button or outside
        const modal = document.querySelector('.modal');
        const closeBtn = document.querySelector('.close-modal');

        // Function to close modal and restore scrolling
        function closeModal() {
            modal.style.display = 'none';
            document.body.classList.remove('no-scroll');

            // Restore scroll progress visibility
            const scrollProgress = document.querySelector('.scroll-progress');
            if (scrollProgress) {
                scrollProgress.style.display = 'block';
            }
        }

        closeBtn.addEventListener('click', closeModal);

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Add keyboard support for closing modal
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });

        // Function to show modal with article content
        function showModal(articleId) {
            const modal = document.querySelector('.modal');
            const modalTitle = modal.querySelector('.modal-title');
            const modalBody = modal.querySelector('.modal-body');
            const modalTags = modal.querySelector('.modal-tags');
            const scrollProgress = document.querySelector('.scroll-progress');

            const article = articleData[articleId];
            if (article) {
                // Hide scroll progress when modal is open
                if (scrollProgress) {
                    scrollProgress.style.display = 'none';
                }

                // Prevent background scrolling
                document.body.classList.add('no-scroll');

                modalTitle.textContent = article.title;
                modalBody.innerHTML = article.content;
                modalTags.innerHTML = article.tags.map(tag => `<span class="modal-tag">${tag}</span>`).join('');
                modal.style.display = 'block';

                // Reset modal scroll position
                modal.querySelector('.modal-content').scrollTop = 0;
            }
        }

    } catch (error) {
        console.error('Error initializing article modals:', error);
    }
}

// Utility function to handle resume download
function handleResumeDownload() {
    try {
        const downloadBtn = document.querySelector('.btn-download');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', function(e) {
                // Check if the PDF file exists (basic check)
                const link = this.getAttribute('href');
                // Add analytics or tracking here if needed
                console.log('Resume download initiated');
            });
        }
    } catch (error) {
        console.error('Error handling resume download:', error);
    }
}

// Initialize resume download handler
document.addEventListener('DOMContentLoaded', handleResumeDownload);

// Form validation
function validateContactForm(formData) {
    const errors = [];

    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }

    if (!formData.email || !isValidEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }

    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }

    return errors;
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Performance monitoring
function initPerformanceMonitoring() {
    try {
        // Log page load time
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        });

        // Monitor scroll performance
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(() => {
                // Scroll ended - can perform cleanup or optimizations
            }, 150);
        });

    } catch (error) {
        console.error('Error initializing performance monitoring:', error);
    }
}

// Initialize performance monitoring
document.addEventListener('DOMContentLoaded', initPerformanceMonitoring);

// Error handling for missing elements
function handleMissingElements() {
    const requiredElements = [
        '.hero',
        '.navbar',
        '.about',
        '.articles',
        '.resume',
        '.contact'
    ];

    requiredElements.forEach(selector => {
        if (!document.querySelector(selector)) {
            console.warn(`Required element not found: ${selector}`);
        }
    });
}

// Initialize error handling
document.addEventListener('DOMContentLoaded', handleMissingElements);

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initScrollAnimations,
        initNavigation,
        initSmoothScrolling,
        initLazyLoading,
        validateContactForm,
        isValidEmail,
        initArticleModals
    };
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initScrollAnimations();
    initNavigation();
    initSmoothScrolling();
    initLazyLoading();
    initBackToTop();
    initArticleModals();
    console.log('Portfolio loaded successfully');
});

// Scroll-triggered animations using IntersectionObserver
function initScrollAnimations() {
    try {
        // Check if IntersectionObserver is supported
        if (!('IntersectionObserver' in window)) {
            console.warn('IntersectionObserver not supported. Applying animations immediately.');
            applyAnimationsImmediately();
            return;
        }

        // Create intersection observer
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    // Unobserve after animation to improve performance
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all elements with animate-on-scroll class
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        animateElements.forEach(element => {
            observer.observe(element);
        });

    } catch (error) {
        console.error('Error initializing scroll animations:', error);
        applyAnimationsImmediately();
    }
}

// Fallback function for browsers without IntersectionObserver
function applyAnimationsImmediately() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(element => {
        element.classList.add('fade-in');
    });
}

// Navigation functionality
function initNavigation() {
    try {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Toggle mobile menu
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });

        // Navbar background on scroll
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    navbar.style.background = 'rgba(10, 26, 47, 0.98)';
                } else {
                    navbar.style.background = 'rgba(10, 26, 47, 0.95)';
                }
            });
        }

        // Active navigation link highlighting
        highlightActiveNavLink();

    } catch (error) {
        console.error('Error initializing navigation:', error);
    }
}

// Highlight active navigation link based on scroll position
function highlightActiveNavLink() {
    try {
        const sections = document.querySelectorAll('section[id], header[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

    } catch (error) {
        console.error('Error highlighting active nav link:', error);
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    try {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');

        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                // Skip if it's just a hash
                if (href === '#') return;

                const targetElement = document.querySelector(href);

                if (targetElement) {
                    e.preventDefault();

                    const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

    } catch (error) {
        console.error('Error initializing smooth scrolling:', error);
    }
}

// Enhanced lazy loading for images
function initLazyLoading() {
    try {
        // Check if native lazy loading is supported
        if ('loading' in HTMLImageElement.prototype) {
            console.log('Native lazy loading supported');
            return;
        }

        // Fallback for browsers without native lazy loading
        const images = document.querySelectorAll('img[loading="lazy"]');
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for very old browsers
            images.forEach(img => {
                img.src = img.dataset.src || img.src;
            });
        }

    } catch (error) {
        console.error('Error initializing lazy loading:', error);
    }
}

// Back to Top Button functionality
function initBackToTop() {
    try {
        const backToTopBtn = document.getElementById('backToTop');
        if (!backToTopBtn) {
            console.warn('Back to top button not found');
            return;
        }

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        // Smooth scroll to top when clicked
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            // Optional: Focus on the top of the page for accessibility
            document.querySelector('#home').focus();
        });

        // Keyboard accessibility
        backToTopBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                backToTopBtn.click();
            }
        });

    } catch (error) {
        console.error('Error initializing back to top button:', error);
    }
}

// Utility function to handle resume download
function handleResumeDownload() {
    try {
        const downloadBtn = document.querySelector('.btn-download');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', function(e) {
                // Check if the PDF file exists (basic check)
                const link = this.getAttribute('href');
                // Add analytics or tracking here if needed
                console.log('Resume download initiated');
                // You can add additional functionality here like:
                // - Analytics tracking
                // - Download counter
                // - User feedback
            });
        }

    } catch (error) {
        console.error('Error handling resume download:', error);
    }
}

// Initialize resume download handler
document.addEventListener('DOMContentLoaded', handleResumeDownload);

// Typing animation for hero subtitle (optional enhancement)
function initTypingAnimation() {
    try {
        const subtitle = document.querySelector('.hero-subtitle');
        if (!subtitle) return;

        const text = subtitle.textContent;
        subtitle.textContent = '';
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };

        // Start typing animation after a delay
        setTimeout(typeWriter, 1000);

    } catch (error) {
        console.error('Error initializing typing animation:', error);
    }
}

// Scroll progress indicator
function initScrollProgress() {
    try {
        // Create progress bar element
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 70px;
            left: 0;
            width: 0%;
            height: 3px;
            background: var(--accent-gold, #cfa349);
            z-index: 1001;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        // Update progress on scroll
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });

    } catch (error) {
        console.error('Error initializing scroll progress:', error);
    }
}

// Initialize scroll progress indicator
document.addEventListener('DOMContentLoaded', initScrollProgress);

// Form validation (if contact form is added later)
function validateContactForm(formData) {
    const errors = [];

    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }

    if (!formData.email || !isValidEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }

    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    return errors;
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Performance monitoring
function initPerformanceMonitoring() {
    try {
        // Log page load time
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        });

        // Monitor scroll performance
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(() => {
                // Scroll ended - can perform cleanup or optimizations
            }, 150);
        });

    } catch (error) {
        console.error('Error initializing performance monitoring:', error);
    }
}

// Initialize performance monitoring
document.addEventListener('DOMContentLoaded', initPerformanceMonitoring);

// Error handling for missing elements
function handleMissingElements() {
    const requiredElements = [
        '.hero',
        '.navbar',
        '.about',
        '.articles',
        '.resume',
        '.contact'
    ];

    requiredElements.forEach(selector => {
        if (!document.querySelector(selector)) {
            console.warn(`Required element not found: ${selector}`);
        }
    });
}

// Initialize error handling
document.addEventListener('DOMContentLoaded', handleMissingElements);

// Article modal functionality
function initArticleModals() {
    try {
        // Article data
        const articleData = {
            'article1': {
                title: 'Landmark Supreme Court Judgement',
                content: `
                    <p>A comprehensive analysis of a landmark judgment delivered by the Supreme Court of India that has significantly shaped the interpretation of constitutional rights and public interest litigation.</p>
                    
                    <h3>Background</h3>
                    <p>The case originated from a public interest litigation filed in 2020, challenging certain provisions that were alleged to infringe upon fundamental rights guaranteed under the Constitution.</p>
                    
                    <h3>Key Legal Principles</h3>
                    <ul>
                        <li>Interpretation of Article 21 in modern context</li>
                        <li>Balance between individual rights and public interest</li>
                        <li>Scope of judicial review in constitutional matters</li>
                    </ul>
                    
                    <h3>Impact and Implications</h3>
                    <p>This judgment has far-reaching implications for constitutional law jurisprudence in India, particularly in the realm of fundamental rights and their interpretation in contemporary times.</p>`,
                tags: ['Constitutional Law', 'Supreme Court', 'Fundamental Rights']
            },
            'article2': {
                title: 'Legal Aid in India',
                content: `
                    <p>A detailed exploration of the legal aid system in India, its constitutional foundations, and practical implementation.</p>
                    
                    <h3>Constitutional Mandate</h3>
                    <p>Article 39A of the Indian Constitution mandates free legal aid to ensure that opportunities for securing justice are not denied to any citizen by reason of economic or other disabilities.</p>
                    
                    <h3>Current Framework</h3>
                    <ul>
                        <li>Structure of legal aid committees</li>
                        <li>Eligibility criteria for free legal services</li>
                        <li>Types of legal aid available</li>
                    </ul>
                    
                    <h3>Challenges and Solutions</h3>
                    <p>Analysis of current challenges in the legal aid system and proposed solutions for better implementation.</p>`,
                tags: ['Human Rights', 'Access to Justice', 'Legal Aid']
            },
            'article3': {
                title: 'Analysis of Fundamental Rights in India',
                content: `
                    <p>An in-depth analysis of Fundamental Rights under the Indian Constitution, their evolution, and contemporary relevance.</p>
                    
                    <h3>Historical Development</h3>
                    <p>Tracing the evolution of fundamental rights from the constituent assembly debates to modern interpretations.</p>
                    
                    <h3>Key Aspects</h3>
                    <ul>
                        <li>Right to Equality (Articles 14-18)</li>
                        <li>Right to Freedom (Articles 19-22)</li>
                        <li>Right against Exploitation (Articles 23-24)</li>
                    </ul>
                    
                    <h3>Judicial Interpretation</h3>
                    <p>Analysis of landmark cases that have shaped the understanding and scope of fundamental rights.</p>`,
                tags: ['Fundamental Rights', 'Constitutional Analysis', 'Indian Constitution']
            },
            'article4': {
                title: 'Legal Framework for Environment in India',
                content: `
                    <p>A comprehensive overview of India's environmental legal framework and its effectiveness in addressing contemporary environmental challenges.</p>
                    
                    <h3>Legislative Framework</h3>
                    <p>Analysis of key environmental legislation including the Environment Protection Act, 1986, and various pollution control acts.</p>
                    
                    <h3>Judicial Contribution</h3>
                    <ul>
                        <li>Role of PIL in environmental protection</li>
                        <li>Landmark environmental cases</li>
                        <li>Principles developed by courts</li>
                    </ul>
                    
                    <h3>International Obligations</h3>
                    <p>India's commitments under international environmental conventions and their domestic implementation.</p>`,
                tags: ['Environmental Law', 'Sustainable Development', 'Legal Framework']
            }
        };

        // Create modal container
        const modalContainer = document.createElement('div');
        modalContainer.classList.add('modal');
        modalContainer.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2 class="modal-title"></h2>
                <div class="modal-body"></div>
                <div class="modal-tags"></div>
            </div>
        `;
        document.body.appendChild(modalContainer);

        // Add click handlers to all "Read More" links
        const readMoreLinks = document.querySelectorAll('.card-link');
        readMoreLinks.forEach((link, index) => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const articleId = `article${index + 1}`;
                showModal(articleId);
            });
        });

        // Close modal when clicking the close button or outside
        const modal = document.querySelector('.modal');
        const closeBtn = document.querySelector('.close-modal');

        // Function to close modal and restore scrolling
        function closeModal() {
            modal.style.display = 'none';
            document.body.classList.remove('no-scroll');

            // Restore scroll progress visibility
            const scrollProgress = document.querySelector('.scroll-progress');
            if (scrollProgress) {
                scrollProgress.style.display = 'block';
            }
        }

        closeBtn.addEventListener('click', closeModal);

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Add keyboard support for closing modal
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });

        // Function to show modal with article content
        function showModal(articleId) {
            const modal = document.querySelector('.modal');
            const modalTitle = modal.querySelector('.modal-title');
            const modalBody = modal.querySelector('.modal-body');
            const modalTags = modal.querySelector('.modal-tags');
            const scrollProgress = document.querySelector('.scroll-progress');

            const article = articleData[articleId];
            if (article) {
                // Hide scroll progress when modal is open
                if (scrollProgress) {
                    scrollProgress.style.display = 'none';
                }

                // Prevent background scrolling
                document.body.classList.add('no-scroll');

                modalTitle.textContent = article.title;
                modalBody.innerHTML = article.content;
                modalTags.innerHTML = article.tags.map(tag => `<span class="modal-tag">${tag}</span>`).join('');
                modal.style.display = 'block';

                // Reset modal scroll position
                modal.querySelector('.modal-content').scrollTop = 0;
            }
        }

    } catch (error) {
        console.error('Error initializing article modals:', error);
    }
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initScrollAnimations,
        initNavigation,
        initSmoothScrolling,
        initLazyLoading,
        validateContactForm,
        isValidEmail,
        initArticleModals
    };
}