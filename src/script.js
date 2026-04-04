// Vận Tải Hùng Anh - Script
import emailjs from '@emailjs/browser';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Loading Animation
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }, 1000);
    }

    // 2. Sticky Navbar
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('py-2', 'shadow-lg');
            nav.classList.remove('py-4');
        } else {
            nav.classList.add('py-4');
            nav.classList.remove('py-2', 'shadow-lg');
        }
    });

    // 3. Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = menuBtn?.querySelector('i');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('active');
            
            // Toggle icon
            if (menuIcon) {
                if (mobileMenu.classList.contains('active')) {
                    menuIcon.classList.replace('fa-bars', 'fa-xmark');
                } else {
                    menuIcon.classList.replace('fa-xmark', 'fa-bars');
                }
            }
        });

        // Close menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('active');
                if (menuIcon) {
                    menuIcon.classList.replace('fa-xmark', 'fa-bars');
                }
            });
        });
    }

    // 4. Form Validation & EmailJS
    const contactForm = document.getElementById('contact-form');
    
    // Initialize EmailJS - User will need to replace this with their own Public Key
    emailjs.init("y-aoKffE5Cxyrmu7V"); 

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            let isValid = true;
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Validate Name
            const nameInput = document.getElementById('fullname');
            if (!data.fullname || data.fullname.trim() === '') {
                nameInput.classList.add('invalid');
                isValid = false;
            } else {
                nameInput.classList.remove('invalid');
            }

            // Validate Phone
            const phoneInput = document.getElementById('phone');
            const phoneRegex = /^0\d{9,10}$/;
            if (!phoneRegex.test(data.phone)) {
                phoneInput.classList.add('invalid');
                isValid = false;
            } else {
                phoneInput.classList.remove('invalid');
            }

            // Validate Email
            const emailInput = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (data.email && !emailRegex.test(data.email)) {
                emailInput.classList.add('invalid');
                isValid = false;
            } else if (!data.email) {
                // Email is optional in the prompt but usually good to have
                // If user wants it mandatory, add logic here
                emailInput.classList.remove('invalid');
            } else {
                emailInput.classList.remove('invalid');
            }

            if (!isValid) return;

            // Show loading state on button
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Đang gửi...';

            try {
                // Note: To make this work, the user needs to:
                // 1. Sign up at emailjs.com
                // 2. Create a Service and a Template
                // 3. Replace the IDs below
                
                
                const result = await emailjs.send(
                    "service_yn0tzpe", 
                    "template_851h8xn", 
                    {
                        from_name: data.fullname,
                        phone: data.phone,
                        email: data.email,
                        weight: data.weight,
                        message: data.message,
                        to_email: "Duongthanhhung2672@gmail.com"
                    }
                );
                

                // Simulating success for demo purposes if EmailJS is not configured
                console.log("Form Data:", data);
                
                // For real implementation, uncomment the emailjs.send block above and use:
                // if (result.status === 200) { ... }

                alert('Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
                contactForm.reset();
            } catch (error) {
                console.error("Email Error:", error);
                alert('Gửi thất bại. Vui lòng thử lại hoặc gọi hotline: 0388572672');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }

    // 6. Image Slider Logic
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dotsContainer = document.querySelector('.slider-dots');

    if (sliderWrapper && slides.length > 0) {
        let currentIndex = 0;
        const totalSlides = slides.length;

        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        const updateSlider = () => {
            sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        };

        const goToSlide = (index) => {
            currentIndex = index;
            updateSlider();
        };

        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        };

        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
        };

        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        // Auto play
        let slideInterval = setInterval(nextSlide, 5000);

        // Pause on hover
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
            sliderContainer.addEventListener('mouseleave', () => {
                slideInterval = setInterval(nextSlide, 5000);
            });
        }
    }

    // 7. Scroll Reveal Animation (Simple version)
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 100) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Welcome Modal Logic
    const welcomeModal = document.getElementById('welcome-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const closeModalTop = document.getElementById('close-modal-top');

    if (welcomeModal) {
        // Hiện Pop-up sau 2 giây
        setTimeout(() => {
            welcomeModal.classList.remove('hidden');
            setTimeout(() => welcomeModal.classList.add('active'), 10);
        }, 2000);

        const closeModal = () => {
            welcomeModal.classList.remove('active');
            setTimeout(() => welcomeModal.classList.add('hidden'), 500);
        };

        if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
        if (closeModalTop) closeModalTop.addEventListener('click', closeModal);

        // Đóng khi nhấn ra ngoài vùng Pop-up
        welcomeModal.addEventListener('click', (e) => {
            if (e.target === welcomeModal) closeModal();
        });
    }


});
