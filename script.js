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

// INITIALIZE SWIPER CAROUSEL (UPDATED FOR 5 IN A ROW DISPLAY)
const swiper = new Swiper('.portfolioSwiper', {
  slidesPerView: 1.2,       // Default Mobile: Muncul 1 full dan sisa potongan samping
  centeredSlides: true,     // Kunci: Slide aktif selalu berada tepat di tengah
  spaceBetween: 16,        
  grabCursor: true,        
  loop: true,               // Diaktifkan agar looping kanan-kirinya infinity tak terbatas
  initialSlide: 2,          // Mulai langsung dari video tengah
  observer: true,
  observeParents: true,
  navigation: {
    nextEl: '.swiper-button-next-custom.main-nav',
    prevEl: '.swiper-button-prev-custom.main-nav',
  },
  breakpoints: {
    // Ukuran Tablet
    640: {
      slidesPerView: 3,     // Tablet: Muncul 3 video menyamping
      spaceBetween: 20,
    },
    // Ukuran Desktop
    1024: {
      slidesPerView: 5,     // ✦ Desktop: Muat 5 video sejajar menyamping sekaligus ✦
      spaceBetween: 24,     // Jarak disesuaikan agar proporsi 9:16 tetap rapi & tipis
    }
  }
});

window.addEventListener('load', () => {
    swiper.update();
});