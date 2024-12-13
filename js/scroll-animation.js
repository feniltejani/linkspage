document.addEventListener('DOMContentLoaded', () => {
    const scrollSections = document.querySelectorAll('.scroll-section');
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '-50px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelector('.scroll-content').classList.add('visible');
            } else {
                entry.target.querySelector('.scroll-content').classList.remove('visible');
            }
        });
    }, observerOptions);

    scrollSections.forEach(section => {
        scrollObserver.observe(section);
    });

    // Parallax effect on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const direction = scrollTop > lastScrollTop ? 'down' : 'up';
        
        document.querySelectorAll('.transform-container').forEach(container => {
            const rect = container.getBoundingClientRect();
            const visible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (visible) {
                const speed = 0.15;
                const distance = direction === 'down' ? 
                    Math.min(rect.top * speed, 100) : 
                    Math.max(rect.top * speed, -100);
                
                container.style.transform = `translate3d(0, ${distance}px, 0)`;
            }
        });
        
        lastScrollTop = scrollTop;
    });
}); 