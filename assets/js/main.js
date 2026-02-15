(function() {
  "use strict";

  /**
   * Navbar scroll effect - add .scrolled class on scroll
   */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const toggleNavbarScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('load', toggleNavbarScroll);
    document.addEventListener('scroll', toggleNavbarScroll);
  }

  /**
   * Navbar active state on scroll
   */
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
  const updateActiveLink = () => {
    const scrollPos = window.scrollY + 200;
    navLinks.forEach(link => {
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      const section = document.querySelector(hash);
      if (!section) return;
      if (scrollPos >= section.offsetTop && scrollPos <= section.offsetTop + section.offsetHeight) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };
  window.addEventListener('load', updateActiveLink);
  document.addEventListener('scroll', updateActiveLink);

  /**
   * Smooth scroll for nav links
   */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const hash = this.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();

      // Close mobile nav if open
      const navCollapse = document.querySelector('.navbar-collapse.show');
      if (navCollapse) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) bsCollapse.hide();
      }

      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const targetPos = target.offsetTop - navbarHeight - 10;
      window.scrollTo({
        top: targetPos,
        behavior: 'smooth'
      });
    });
  });

  /**
   * Back to top button
   */
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    const toggleBackToTop = () => {
      if (window.scrollY > 100) {
        backToTop.classList.add('active');
      } else {
        backToTop.classList.remove('active');
      }
    };
    window.addEventListener('load', toggleBackToTop);
    document.addEventListener('scroll', toggleBackToTop);
  }

  /**
   * Scroll with offset on page load with hash in URL
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        setTimeout(() => {
          window.scrollTo({
            top: target.offsetTop - navbarHeight - 10,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * AOS (Animate on Scroll) initialization
   */
  window.addEventListener('load', () => {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: true,
        mirror: false
      });
    }
  });

  /**
   * Set current year in footer
   */
  const yearSpan = document.querySelector('#currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

})();
