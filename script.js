// script.js - Main JavaScript for University Website

// ================ COMMON FUNCTIONS ================
function initMobileMenu() {
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '☰';
    document.querySelector('header').appendChild(mobileMenuToggle);
    
    mobileMenuToggle.addEventListener('click', function() {
        const nav = document.querySelector('nav');
        nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
    });
    
    window.addEventListener('resize', function() {
        const nav = document.querySelector('nav');
        if (window.innerWidth > 768) {
            nav.style.display = '';
        }
    });
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

function generateCsrfToken() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ================ PAGE-SPECIFIC FUNCTIONS ================

// Index Page
function initIndexPage() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const hiddenContent = this.parentElement.nextElementSibling;
            
            if (hiddenContent.style.display === 'none' || hiddenContent.style.display === '') {
                hiddenContent.style.display = 'block';
                this.textContent = '[-]';
            } else {
                hiddenContent.style.display = 'none';
                this.textContent = '[+]';
            }
        });
    });
}

// Courses Page
function initCoursesPage() {
    document.querySelectorAll('.course-type').forEach(course => {
        course.addEventListener('click', function() {
            const targetId = this.classList.contains('undergraduate') ? 'undergraduate' : 'postgraduate';
            const courseBox = document.getElementById(targetId);
            
            document.querySelectorAll('.course-box').forEach(box => {
                box.style.display = 'none';
            });
            
            if (courseBox.style.display === 'none' || courseBox.style.display === '') {
                courseBox.style.display = 'block';
                courseBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                courseBox.style.display = 'none';
            }
        });
    });
}

// University Life Page
function initUniversityLifePage() {
    // Testimonial Slider
    const slider = document.querySelector('.testimonial-slider');
    if (slider) {
        let isDown = false;
        let startX;
        let scrollLeft;
        let autoScrollInterval;
        
        const startAutoScroll = () => {
            clearInterval(autoScrollInterval);
            autoScrollInterval = setInterval(() => {
                if (!isDown) {
                    const firstCard = document.querySelector('.testimonial-card');
                    const cardWidth = firstCard.offsetWidth + 20;
                    
                    if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth - 50) {
                        slider.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
                    }
                }
            }, 5000);
        };

        // Mouse Events
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.style.cursor = 'grabbing';
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            clearInterval(autoScrollInterval);
        });

        ['mouseleave', 'mouseup'].forEach(evt => {
            slider.addEventListener(evt, () => {
                isDown = false;
                slider.style.cursor = 'grab';
                startAutoScroll();
            });
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });

        // Touch Events
        slider.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            clearInterval(autoScrollInterval);
        });

        slider.addEventListener('touchend', () => {
            isDown = false;
            startAutoScroll();
        });

        slider.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });

        startAutoScroll();
    }

    // Campus Tabs
    document.querySelectorAll('.campus-tabs .tab-button').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.campus-tabs .tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            document.querySelectorAll('.campus-content').forEach(content => {
                content.style.display = 'none';
            });
            
            const campusId = this.textContent.trim().replace(' Campus', '').toLowerCase();
            document.getElementById(campusId).style.display = 'block';
        });
    });
}

// Register Page
function initRegisterPage() {
    const form = document.getElementById('bookingForm');
    if (!form) return;

    document.getElementById('csrf_token').value = generateCsrfToken();
    
    document.getElementById("purpose").addEventListener("change", function() {
        const otherReason = document.getElementById("otherReason");
        const otherText = document.getElementById("otherText");
        
        if (this.value === "Other") {
            otherReason.style.display = "block";
            otherText.setAttribute("required", "true");
        } else {
            otherReason.style.display = "none";
            otherText.removeAttribute("required");
            otherText.value = "";
        }
    });
    
    document.getElementById("course").addEventListener("change", function() {
        const otherCourseBox = document.getElementById("otherCourseBox");
        const otherCourse = document.getElementById("otherCourse");
        
        if (this.value === "Other") {
            otherCourseBox.style.display = "block";
            otherCourse.setAttribute("required", "true");
        } else {
            otherCourseBox.style.display = "none";
            otherCourse.removeAttribute("required");
            otherCourse.value = "";
        }
    });
    
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value) {
                field.style.borderColor = 'red';
                isValid = false;
                
                if (isValid === false) {
                    field.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
        
        const email = document.getElementById('email');
        if (email.value && !validateEmail(email.value)) {
            email.style.borderColor = 'red';
            isValid = false;
            alert('Please enter a valid email address.');
        }
        
        if (isValid) {
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                const formData = new FormData(form);
                const name = formData.get('name');
                const visitPurpose = formData.get('purpose') === "Other" ? 
                                    `Other: ${formData.get('otherText')}` : 
                                    formData.get('purpose');
                const selectedCourse = formData.get('course') === "Other" ? 
                                     `Other: ${formData.get('otherCourse')}` : 
                                     formData.get('course');
                const date = formData.get('date');
                const time = formData.get('time');
                
                const confirmationMessage = document.getElementById('confirmationMessage');
                confirmationMessage.innerHTML = `Thank you, ${name}! Your visit for "${visitPurpose}" on ${date} at ${time} for the course "${selectedCourse}" is confirmed.`;
                confirmationMessage.style.display = "block";
                
                form.reset();
                document.getElementById("otherReason").style.display = "none";
                document.getElementById("otherCourseBox").style.display = "none";
                
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                
                confirmationMessage.scrollIntoView({ behavior: 'smooth' });
            }, 1500);
        }
    });
    
    // Set minimum date to today
    document.getElementById('date').min = new Date().toISOString().split('T')[0];
}

// Contact Page
function initContactPage() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        alert('Thank you for your message. We will respond to you shortly.');
        this.reset();
    });
}

// News Page
function initNewsPage() {
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            document.querySelectorAll('.news-card').forEach(card => {
                card.style.display = (filter === 'all' || card.getAttribute('data-category') === filter) 
                    ? 'block' 
                    : 'none';
            });
        });
    });
}

// ================ INITIALIZATION ================
document.addEventListener('DOMContentLoaded', function() {
    // Common functionality
    initMobileMenu();
    setupSmoothScrolling();
    
    // Page-specific initialization
    if (document.querySelector('.expect-container')) initIndexPage();
    if (document.querySelector('.course-types')) initCoursesPage();
    if (document.querySelector('.testimonial-slider')) initUniversityLifePage();
    if (document.getElementById('bookingForm')) initRegisterPage();
    if (document.getElementById('contactForm')) initContactPage();
    if (document.querySelector('.news-filter')) initNewsPage();
});