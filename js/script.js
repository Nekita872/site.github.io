(function() {
    const contentWrapper = document.getElementById('contentWrapper');
    const trigger = document.getElementById('scrollTrigger');
    let triggered = false;
    let bubbleInterval = null;

    // ===== 1. СОЗДАЁМ ФОНОВЫЕ ПУЗЫРИ (18 штук) =====
    const ocean = document.getElementById('ocean');
    const bgBubbleCount = 18;

    for (let i = 0; i < bgBubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bg-bubble';

        const size = 12 + Math.random() * 48;
        const left = 2 + Math.random() * 96;
        const duration = 10 + Math.random() * 12;
        const delay = Math.random() * 10;

        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = left + '%';
        bubble.style.bottom = '-60px';
        bubble.style.animationDuration = duration + 's';
        bubble.style.animationDelay = delay + 's';

        ocean.appendChild(bubble);
    }

    // ===== 2. ФУНКЦИЯ ЗАПУСКА ПУЗЫРЕЙ ПРИ СКРОЛЛЕ =====
    function createBurst() {
        if (triggered) return;
        triggered = true;

        let count = 0;
        const maxBubbles = 80; // больше пузырей

        if (bubbleInterval) clearInterval(bubbleInterval);

        bubbleInterval = setInterval(() => {
            if (count >= maxBubbles) {
                clearInterval(bubbleInterval);
                setTimeout(() => {
                    contentWrapper.classList.add('visible');
                }, 500);
                return;
            }

            const bubble = document.createElement('div');
            bubble.className = 'burst-bubble';

            const size = 10 + Math.random() * 50;
            const x = 2 + Math.random() * 96;
            const delay = Math.random() * 0.8;

            bubble.style.width = size + 'px';
            bubble.style.height = size + 'px';
            bubble.style.left = x + '%';
            bubble.style.bottom = '-30px';
            bubble.style.animationDelay = delay + 's';
            bubble.style.animationDuration = (1.4 + Math.random() * 1.6) + 's';

            document.body.appendChild(bubble);

            setTimeout(() => {
                if (bubble.parentNode) bubble.remove();
            }, 3500);

            count++;
        }, 60); // чаще создаются
    }

    // ===== 3. ОТСЛЕЖИВАНИЕ СКРОЛЛА =====
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !triggered) {
                    createBurst();
                }
            });
        }, {
            threshold: 0.0,
            rootMargin: '0px 0px -50px 0px'
        });
        observer.observe(trigger);
    }

    let scrollTimeout = false;
    window.addEventListener('scroll', function() {
        if (triggered) return;
        if (scrollTimeout) return;
        scrollTimeout = true;
        requestAnimationFrame(() => {
            const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
            if (scrollY > 80 && !triggered) {
                createBurst();
            }
            scrollTimeout = false;
        });
    });

    // ===== 4. ПРОВЕРКА ПРИ ЗАГРУЗКЕ =====
    window.addEventListener('load', function() {
        setTimeout(() => {
            const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
            if (scrollY > 80 && !triggered) {
                createBurst();
            }
        }, 400);
    });

    setTimeout(() => {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
        if (scrollY > 80 && !triggered) {
            createBurst();
        }
    }, 600);
})();