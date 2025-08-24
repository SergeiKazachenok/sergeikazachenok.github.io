document.addEventListener('DOMContentLoaded', function() {
    const themeBtn = document.getElementById('themeBtn');
    const body = document.body;
    let isDarkMode = false;

    themeBtn.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        if (isDarkMode) {
            body.classList.add('dark-theme');
            themeBtn.textContent = '☀️ Light Mode';
        } else {
            body.classList.remove('dark-theme');
            themeBtn.textContent = '🌙 Dark Mode';
        }
    });

    // Animate skill progress bars on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressFill = entry.target.querySelector('.progress-fill');
                const percentage = entry.target.querySelector('.skill-percentage');
                const level = progressFill.getAttribute('data-level');
                
                progressFill.style.width = '0%';
                percentage.textContent = '0%';
                
                setTimeout(() => {
                    let currentLevel = 0;
                    const interval = setInterval(() => {
                        currentLevel += 1;
                        progressFill.style.width = currentLevel + '%';
                        percentage.textContent = currentLevel + '%';
                        
                        if (currentLevel >= level) {
                            clearInterval(interval);
                        }
                    }, 20);
                }, 500);
                
                skillObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all skill categories
    document.querySelectorAll('.skill-category').forEach(category => {
        skillObserver.observe(category);
    });

    // Project modal functionality
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const closeBtn = document.querySelector('.close');

    const projectDetails = {
        portfolio: {
            title: 'Personal Portfolio Website',
            content: `
                <h3>Project Overview</h3>
                <p>A responsive personal portfolio website built with modern web technologies.</p>
                
                <h3>Features</h3>
                <ul>
                    <li>Responsive design that works on all devices</li>
                    <li>Interactive navigation and smooth scrolling</li>
                    <li>Dark/Light theme toggle</li>
                    <li>Animated skill progress bars</li>
                    <li>Contact information and social links</li>
                </ul>
                
                <h3>Technologies Used</h3>
                <ul>
                    <li>HTML5 for structure</li>
                    <li>CSS3 for styling and animations</li>
                    <li>JavaScript for interactivity</li>
                    <li>Git for version control</li>
                </ul>
                
                <h3>Development Process</h3>
                <p>This project was developed using modern web development practices, focusing on clean code, accessibility, and user experience.</p>
            `
        },
        java: {
            title: 'Java Applications',
            content: `
                <h3>Project Overview</h3>
                <p>Various Java applications demonstrating programming concepts and problem-solving skills.</p>
                
                <h3>Applications Developed</h3>
                <ul>
                    <li>Data Structures Implementation (Arrays, Linked Lists, Trees)</li>
                    <li>Sorting and Searching Algorithms</li>
                    <li>Object-Oriented Programming Examples</li>
                    <li>File I/O Operations</li>
                    <li>Exception Handling</li>
                </ul>
                
                <h3>Key Concepts Demonstrated</h3>
                <ul>
                    <li>Object-Oriented Programming principles</li>
                    <li>Algorithm complexity and optimization</li>
                    <li>Data structure efficiency</li>
                    <li>Code organization and documentation</li>
                </ul>
                
                <h3>Tools Used</h3>
                <ul>
                    <li>IntelliJ IDEA</li>
                    <li>Java Development Kit (JDK)</li>
                    <li>Git for version control</li>
                </ul>
            `
        }
    };

    // Add click event to view details buttons
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const projectCard = btn.closest('.project-card');
            const projectType = projectCard.getAttribute('data-project');
            const project = projectDetails[projectType];
            
            modalTitle.textContent = project.title;
            modalContent.innerHTML = project.content;
            modal.style.display = 'block';
        });
    });

    // Close modal functionality
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Copy contact information functionality
    document.querySelector('.contact-email').addEventListener('click', function() {
        const email = this.getAttribute('data-email');
        navigator.clipboard.writeText(email).then(() => {
            this.style.color = '#27ae60';
            setTimeout(() => {
                this.style.color = '';
            }, 1000);
        });
    });

    document.querySelector('.contact-phone').addEventListener('click', function() {
        const phone = this.getAttribute('data-phone');
        navigator.clipboard.writeText(phone).then(() => {
            this.style.color = '#27ae60';
            setTimeout(() => {
                this.style.color = '';
            }, 1000);
        });
    });

    // Smooth scrolling for navigation links
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

    // Add typing effect to the subtitle
    const subtitle = document.querySelector('.subtitle');
    const originalText = subtitle.textContent;
    subtitle.textContent = '';
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < originalText.length) {
            subtitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        }
    }

    // Start typing effect after page loads
    setTimeout(typeWriter, 1000);

    // Add hover effects for interest items
    document.querySelectorAll('.interest-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add loading animation
    document.body.classList.add('loaded');

    // Timeline scroll animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function checkTimelineVisibility() {
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const itemBottom = item.getBoundingClientRect().bottom;
            
            if (itemTop < window.innerHeight && itemBottom > 0) {
                item.classList.add('visible');
            }
        });
    }

    // Check visibility on scroll
    window.addEventListener('scroll', checkTimelineVisibility);
    
    // Check initial visibility
    checkTimelineVisibility();

    // Progress bar animations
    const progressBars = document.querySelectorAll('.progress-bar');
    
    function animateProgressBars() {
        progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.setProperty('--progress', progress + '%');
            bar.classList.add('animated');
        });
    }

    // Animate progress bars when they come into view
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                progressObserver.unobserve(entry.target);
            }
        });
    });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });

    // Add hover effects for certification cards
    document.querySelectorAll('.cert-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effects for timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.addEventListener('click', function() {
            // Add a subtle click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}); 