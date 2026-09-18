// Simple script for homepage interactions
document.addEventListener('DOMContentLoaded', () => {
  // Scroll reveal effect (simple version)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s, transform 0.6s';
    observer.observe(section);
  });

  // Mobile menu toggle (simple)
  const navbar = document.querySelector('.navbar');
  let isMenuOpen = false;

  const createToggle = () => {
    const toggle = document.createElement('div');
    toggle.className = 'menu-toggle';
    toggle.innerHTML = '<span></span><span></span><span></span>';
    toggle.addEventListener('click', () => {
      isMenuOpen = !isMenuOpen;
      const links = navbar.querySelector('.nav-links');
      if (isMenuOpen) {
        links.style.display = 'block';
        links.style.position = 'absolute';
        links.style.top = '100%';
        links.style.left = '0';
        links.style.width = '100%';
        links.style.background = '#111';
        links.style.flexDirection = 'column';
        links.style.padding = '1rem 0';
      } else {
        links.style.display = 'none';
      }
    });
    navbar.appendChild(toggle);
  };

  // Only add toggle if screen is narrow (simple check)
  if (window.innerWidth < 768) {
    createToggle();
  }

  // Handle booking form
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(bookingForm);
      const data = Object.fromEntries(formData.entries());
      // Here you would send to your backend or Cloudflare Functions
      alert('Pedido de aluguer submetido! Entraremos em contacto em ' + data.email);
      bookingForm.reset();
    });
  }

  // Frota slideshow: present cars 1-6 in slide mode
  const slider = document.getElementById('frotaSlider');
  if (slider) {
    const track = slider.querySelector('.slides');
    const slides = track.children;
    const dotsBox = document.getElementById('frotaDots');
    let current = 0;
    let timer = null;

    const render = () => {
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dotsBox.querySelectorAll('.dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    };
    const goTo = (i) => {
      current = (i + slides.length) % slides.length;
      render();
    };
    const restart = () => {
      clearInterval(timer);
      timer = setInterval(() => goTo(current + 1), 6000);
    };

    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'dot';
      dot.setAttribute('aria-label', 'Ir para a foto ' + (i + 1));
      dot.addEventListener('click', () => { goTo(i); restart(); });
      dotsBox.appendChild(dot);
    }
    slider.querySelector('.slider-btn.prev').addEventListener('click', () => { goTo(current - 1); restart(); });
    slider.querySelector('.slider-btn.next').addEventListener('click', () => { goTo(current + 1); restart(); });

    render();
    restart();
  }
});

// Simple lightbox for gallery images (placeholder)
document.querySelectorAll('.car-card').forEach(card => {
  card.addEventListener('click', () => {
    alert('Pedido de orçamento para ' + card.querySelector('h3').innerText);
  });
});