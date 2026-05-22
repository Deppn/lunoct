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

// INITIALIZE SWIPER CAROUSEL (Untuk Portofolio)
const swiper = new Swiper('.portfolioSwiper', {
  slidesPerView: 1,         
  spaceBetween: 20,        
  grabCursor: true,        
  loop: false,             
  observer: true,          // Reset otomatis jika ukuran layar berubah
  observeParents: true,    // Menghitung ulang container setelah animasi Scroll Reveal selesai
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next-custom',
    prevEl: '.swiper-button-prev-custom',
  },
  breakpoints: {
    640: {
      slidesPerView: 2,    // Ukuran Tablet: muncul 2 baris video
      spaceBetween: 24,
    },
    1024: {
      slidesPerView: 3,    // Ukuran Desktop: muncul 3 baris video
      spaceBetween: 30,
    }
  }
});