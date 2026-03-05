// --- script.js ---
document.addEventListener('DOMContentLoaded', () => {

    /* -------------------------------------------------------------------------- */
    /* 1. Theme Selection Logic (Dark/Light Mode)                                 */
    /* -------------------------------------------------------------------------- */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Initialize Theme
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Toggle Theme
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    /* -------------------------------------------------------------------------- */
    /* 2. Smooth Scrolling for Anchor Links                                       */
    /* -------------------------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    /* -------------------------------------------------------------------------- */
    /* 3. Intersection Observer for Scroll Animations                             */
    /* -------------------------------------------------------------------------- */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('reveal')) {
                    const children = entry.target.querySelectorAll('.delay-100, .delay-200, .delay-300');
                    children.forEach(child => child.classList.add('animate-fade-up'));
                    entry.target.classList.add('animate-fade-up');
                } else {
                    entry.target.classList.add('animate-fade-up');
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal, .section-title');
    revealElements.forEach(el => observer.observe(el));

    /* -------------------------------------------------------------------------- */
    /* 4. Mobile Menu Logic                                                       */
    /* -------------------------------------------------------------------------- */
    const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    document.querySelectorAll('.nav-links a:not(#lang-toggle)').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    /* -------------------------------------------------------------------------- */
    /* 5. Advanced Interactivity (Custom Premium Cursor)                          */
    /* -------------------------------------------------------------------------- */
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Immediate update for the tiny dot
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    // Hover state over interactive elements (dot expansion)
    const interactiveElements = document.querySelectorAll('a, button, .feature-card, .contact-info-wrapper');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
        });
    });

    /* -------------------------------------------------------------------------- */
    /* 6. Dynamic 3D Tilt Effect for Feature Cards                                */
    /* -------------------------------------------------------------------------- */
    const cards = document.querySelectorAll('.feature-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate rotation (max 10 degrees)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            // Keep the baseline hover effect transition smooth
            card.style.transition = `transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)`;
        });

        card.addEventListener('mouseenter', () => {
            // Remove transition during movement for snappy tracking
            card.style.transition = `none`;
        });
    });

    /* -------------------------------------------------------------------------- */
    /* 7. Subtle Parallax on Hero Section                                         */
    /* -------------------------------------------------------------------------- */
    const heroSection = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
            heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
        }
    });
});
