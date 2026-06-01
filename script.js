document.addEventListener("DOMContentLoaded", () => {
    
    // Theme Animation Lock Release
    setTimeout(() => document.body.classList.add('transitions-enabled'), 50);

    // JS FEATURE 1: Advanced Trailing Cursor
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursorDot);

    const cursorOutline = document.createElement('div');
    cursorOutline.classList.add('cursor-outline');
    document.body.appendChild(cursorOutline);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outlineX = mouseX;
    let outlineY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });

    const animateCursor = () => {
        let distX = mouseX - outlineX;
        let distY = mouseY - outlineY;
        
        outlineX += distX * 0.2; // İmleç gecikmesi hızlandırıldı
        outlineY += distY * 0.2;
        
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
        
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    document.querySelectorAll('a, img, .project-item, label, iframe, button').forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('cursor-hover');
            cursorDot.classList.add('cursor-hover');
        });
        item.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('cursor-hover');
            cursorDot.classList.remove('cursor-hover');
        });
    });

    // JS FEATURE 2: Dark/Light Mode Pill Switch Toggle
    const themeCheckbox = document.getElementById('theme-checkbox');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'light' && themeCheckbox) {
        themeCheckbox.checked = true;
    }

    if (themeCheckbox) {
        themeCheckbox.addEventListener('change', function() {
            const newTheme = this.checked ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // JS FEATURE 3: Scroll Reveal Animations (Optimum Setup)
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Görünen elemanı dinlemeyi bırak ki performansı tüketmesin
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.hidden-reveal').forEach(el => {
        observer.observe(el);
    });

    // JS FEATURE 4: Image Lightbox with Zoom
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);

    let currentScale = 1;

    const images = document.querySelectorAll('.gallery-card img, .featured-item img');
    images.forEach(image => {
        image.addEventListener('click', () => {
            lightbox.classList.add('active');
            const img = document.createElement('img');
            img.src = image.src;
            
            currentScale = 1;
            img.style.transform = `scale(${currentScale})`;

            while (lightbox.firstChild) {
                lightbox.removeChild(lightbox.firstChild);
            }
            lightbox.appendChild(img);
        });
    });

    lightbox.addEventListener('wheel', (e) => {
        e.preventDefault();
        const img = lightbox.querySelector('img');
        if (img) {
            currentScale += e.deltaY * -0.002;
            currentScale = Math.min(Math.max(0.5, currentScale), 4);
            img.style.transform = `scale(${currentScale})`;
        }
    }, { passive: false });

    lightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    // JS FEATURE 5: Mobile Hamburger Menu
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    if (navbar && navLinks) {
        const menuToggle = document.createElement('div');
        menuToggle.classList.add('menu-toggle');
        menuToggle.innerHTML = '<span></span><span></span><span></span>';
        navbar.insertBefore(menuToggle, navLinks);

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            menuToggle.classList.toggle('toggle-active');
        });
    }

    // JS FEATURE 6: SPA-like Magic Line Navigation
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (navLinksContainer) {
        const indicator = document.createElement('div');
        indicator.classList.add('nav-indicator');
        navLinksContainer.appendChild(indicator);

        let activeItem = document.querySelector('.nav-links a.active');
        const prevLeft = sessionStorage.getItem('magicLineLeft');
        const prevWidth = sessionStorage.getItem('magicLineWidth');

        if (prevLeft && prevWidth && window.innerWidth > 768) {
            indicator.style.transition = 'none';
            indicator.style.left = `${prevLeft}px`;
            indicator.style.width = `${prevWidth}px`;
            indicator.style.opacity = '1';
        }

        document.fonts.ready.then(() => {
            if (activeItem && window.innerWidth > 768) {
                const containerRect = navLinksContainer.getBoundingClientRect();
                const itemRect = activeItem.getBoundingClientRect();
                
                indicator.style.top = `${itemRect.bottom - containerRect.top + 2}px`;

                if (prevLeft && prevWidth) {
                    indicator.offsetHeight; 
                    indicator.style.transition = 'left 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), width 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.3s ease';
                    
                    indicator.style.left = `${itemRect.left - containerRect.left}px`;
                    indicator.style.width = `${itemRect.width}px`;
                } else {
                    indicator.style.transition = 'none';
                    indicator.style.left = `${itemRect.left - containerRect.left}px`;
                    indicator.style.width = `${itemRect.width}px`;
                    indicator.style.opacity = '1';
                    
                    indicator.offsetHeight;
                    indicator.style.transition = 'left 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), width 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.3s ease';
                }
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                const cRect = navLinksContainer.getBoundingClientRect();
                const iRect = e.target.getBoundingClientRect();
                sessionStorage.setItem('magicLineLeft', iRect.left - cRect.left);
                sessionStorage.setItem('magicLineWidth', iRect.width);
            });
        });

        window.addEventListener('resize', () => {
            activeItem = document.querySelector('.nav-links a.active');
            if (activeItem && window.innerWidth > 768) {
                const containerRect = navLinksContainer.getBoundingClientRect();
                const itemRect = activeItem.getBoundingClientRect();
                indicator.style.transition = 'none';
                indicator.style.left = `${itemRect.left - containerRect.left}px`;
                indicator.style.width = `${itemRect.width}px`;
                indicator.style.top = `${itemRect.bottom - containerRect.top + 2}px`;
            } else {
                indicator.style.opacity = '0';
            }
        });
    }

    // JS FEATURE 7: Smooth Page Transitions (Hızlandırıldı)
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetUrl = this.getAttribute('href');
            const isInternal = targetUrl && !targetUrl.startsWith('http') && targetUrl !== '#' && !this.target;
            
            if (isInternal) {
                e.preventDefault();
                document.body.classList.add('page-fade-out');
                
                // Kararma süresi kısaltıldı (150ms)
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 150); 
            }
        });
    });
});