document.addEventListener("DOMContentLoaded", () => {
    
    // 1. DİNAMİK İMLEÇ OLUŞTURMA VE TAKİP
    if (window.innerWidth > 768) {
        const dot = document.createElement("div");
        dot.classList.add("cursor-dot");
        const outline = document.createElement("div");
        outline.classList.add("cursor-outline");
        document.body.appendChild(dot);
        document.body.appendChild(outline);

        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');

        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
        });

        // Tıklanabilir elementler için Hover efekti
        document.querySelectorAll('a, button, input, label, .logo').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('cursor-hover');
                cursorOutline.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('cursor-hover');
                cursorOutline.classList.remove('cursor-hover');
            });
        });

        // 2. IFRAME VE PENCERE KENARI İMLEÇ ÇAKIŞMASI ÇÖZÜMÜ
        document.addEventListener('mouseleave', () => {
            cursorDot.classList.add('hide-custom-cursor');
            cursorOutline.classList.add('hide-custom-cursor');
        });

        document.addEventListener('mouseenter', () => {
            cursorDot.classList.remove('hide-custom-cursor');
            cursorOutline.classList.remove('hide-custom-cursor');
        });

        window.addEventListener('blur', () => {
            if (document.activeElement && document.activeElement.tagName === 'IFRAME') {
                cursorDot.classList.add('hide-custom-cursor');
                cursorOutline.classList.add('hide-custom-cursor');
            }
        });

        window.addEventListener('focus', () => {
            cursorDot.classList.remove('hide-custom-cursor');
            cursorOutline.classList.remove('hide-custom-cursor');
        });
    }

    // 3. SCROLL REVEAL EFEKTİ
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.hidden-reveal').forEach(el => {
        observer.observe(el);
    });

    // 4. TEMA DEĞİŞTİRİCİ
    const themeCheckbox = document.getElementById('theme-checkbox');
    if (themeCheckbox) {
        themeCheckbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // Slider animasyonlarını baştan yüklenirken engellemek için gecikme
    setTimeout(() => {
        document.body.classList.add('transitions-enabled');
    }, 100);

    // 5. SAYFA GEÇİŞ EFEKTLERİ
    document.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = this.getAttribute('href');
            
            if (!target || target.startsWith('http') || target.startsWith('#') || this.getAttribute('target') === '_blank' || target.endsWith('.pdf')) {
                return;
            }
            
            e.preventDefault();
            document.body.classList.add('page-fade-out');
            
            setTimeout(() => {
                window.location.href = target;
            }, 150);
        });
    });
});