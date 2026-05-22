// Custom cursor interaction
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Enlarge cursor when hovering over links or buttons
document.querySelectorAll('a, button, .swiper-button-next-custom, .swiper-button-prev-custom').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('big'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
});

// Scroll reveal effect using Intersection Observer
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Stagger animation for siblings inside the same container
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const idx = siblings.indexOf(entry.target);
      
      entry.target.style.transitionDelay = (idx * 0.08) + 's';
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));

// Counter/Stats animation when section comes into view
const stats = document.querySelectorAll('.stat-num');
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.innerHTML;
      const num = parseInt(text.replace(/\D/g, ''));
      const suffix = text.replace(/[\d]/g, '').replace('<span>','').replace('</span>','');
      
      if (!isNaN(num) && num > 0) {
        let start = 0;
        const step = num / 50;
        const timer = setInterval(() => {
          start = Math.min(start + step, num);
          el.innerHTML = Math.round(start) + '<span>' + suffix + '</span>';
          if (start >= num) clearInterval(timer);
        }, 25);
      }
      countObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

stats.forEach(el => countObserver.observe(el));

// INITIALIZE SWIPER CAROUSEL (5 SLIDES SEJAJAR MENYAMPING)
const swiper = new Swiper('.portfolioSwiper', {
  slidesPerView: 1.2,       
  centeredSlides: true,     
  spaceBetween: 16,        
  grabCursor: true,        
  loop: true,               
  initialSlide: 2,          
  observer: true,
  observeParents: true,
  navigation: {
    nextEl: '.swiper-button-next-custom.main-nav',
    prevEl: '.swiper-button-prev-custom.main-nav',
  },
  breakpoints: {
    640: {
      slidesPerView: 3,     
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 5,     
      spaceBetween: 24,     
    }
  }
});

window.addEventListener('load', () => {
    swiper.update();
});

// AUTOMATIC INFINITE MARQUEE GENERATOR
const marqueeInner = document.querySelector('.marquee');
if (marqueeInner) {
    const originalItems = Array.from(marqueeInner.children);
    if (originalItems.length > 0) {
        const minItemsNeeded = 16; 
        while (marqueeInner.children.length < minItemsNeeded) {
            originalItems.forEach(item => {
                marqueeInner.appendChild(item.cloneNode(true));
            });
        }
        const combinedItems = Array.from(marqueeInner.children);
        combinedItems.forEach(item => {
            marqueeInner.appendChild(item.cloneNode(true));
        });
    }
}