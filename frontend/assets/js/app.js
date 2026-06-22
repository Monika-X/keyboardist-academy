/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — App Entry Point & Layout Controller
 *  frontend/assets/js/app.js
 * ============================================================
 */

'use strict';

const App = (() => {
  const renderNavbar = () => {
    const isLoggedIn = Auth.isLoggedIn();
    const user = Auth.getUser();

    return `
      <nav class="navbar" id="app-navbar">
        <div class="navbar__inner">
          <a href="/" class="navbar__logo">
            <div class="navbar__logo-mark"><svg class="icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;"><rect x="2" y="3" width="20" height="18" rx="2" ry="2"/><line x1="6" y1="3" x2="6" y2="21"/><line x1="10" y1="3" x2="10" y2="21"/><line x1="14" y1="3" x2="14" y2="21"/><line x1="18" y1="3" x2="18" y2="21"/></svg></div>
            <div>
              <div class="navbar__logo-name">Keyboardist</div>
              <div class="navbar__logo-tag">Academy</div>
            </div>
          </a>
          
          <ul class="navbar__nav">
            <li><a href="/" class="nav-link" id="nav-home">Home</a></li>
            <li><a href="/about" class="nav-link" id="nav-about">About</a></li>
            <li><a href="/courses" class="nav-link" id="nav-courses">Courses</a></li>
            
            <!-- Explore Page -->
            <li><a href="/explore" class="nav-link" id="nav-explore">Explore</a></li>

            <li><a href="/contact" class="nav-link" id="nav-contact">Contact</a></li>
            ${isLoggedIn && Auth.isAdmin() ? `<li><a href="/admin" class="nav-link" id="nav-admin">Admin Panel</a></li>` : ''}
          </ul>

          <div class="navbar__actions">
            ${isLoggedIn ? `
              <div class="flex items-center gap-4">
                <span class="body-sm text-secondary sm\:hidden">Hi, ${user.firstName}</span>
                <button onclick="App.handleLogout()" class="btn btn--outline btn--sm">Logout</button>
              </div>
            ` : `
              <a href="/login" class="btn btn--ghost btn--sm">Sign In</a>
              <a href="/register" class="btn btn--primary btn--sm">Join Free</a>
            `}
          </div>

          <button class="navbar__hamburger" aria-label="Toggle menu" onclick="App.toggleMobileMenu()">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <!-- Mobile Dropdown Menu (Scrollable for many items) -->
        <div class="navbar__mobile-menu hidden" id="mobile-menu">
          <ul class="flex col gap-4 items-center py-8">
            <li><a href="/" onclick="App.toggleMobileMenu()" class="nav-link">Home</a></li>
            <li><a href="/about" onclick="App.toggleMobileMenu()" class="nav-link">About</a></li>
            <li><a href="/courses" onclick="App.toggleMobileMenu()" class="nav-link">Courses</a></li>
            <li><a href="/explore" onclick="App.toggleMobileMenu()" class="nav-link">Explore</a></li>
            <li><a href="/contact" onclick="App.toggleMobileMenu()" class="nav-link">Contact</a></li>
            ${isLoggedIn ? `
              ${Auth.isAdmin() ? `<li><a href="/admin" onclick="App.toggleMobileMenu()" class="nav-link">Admin Panel</a></li>` : ''}
              <li class="w-full px-8"><button onclick="App.handleLogout();App.toggleMobileMenu()" class="btn btn--outline btn--sm w-full">Logout</button></li>
            ` : `
              <li><a href="/login" onclick="App.toggleMobileMenu()" class="nav-link">Sign In</a></li>
              <li class="w-full px-8"><a href="/register" onclick="App.toggleMobileMenu()" class="btn btn--primary btn--sm w-full text-center">Join Free</a></li>
            `}
          </ul>
        </div>
      </nav>
    `;
  };

  const renderFooter = () => `
    <footer class="footer">
      <div class="footer__main">
        <div class="footer__grid">
          <div class="footer__brand">
            <a href="/" class="footer__logo">
              <div class="footer__logo-mark"><svg class="icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;"><rect x="2" y="3" width="20" height="18" rx="2" ry="2"/><line x1="6" y1="3" x2="6" y2="21"/><line x1="10" y1="3" x2="10" y2="21"/><line x1="14" y1="3" x2="14" y2="21"/><line x1="18" y1="3" x2="18" y2="21"/></svg></div>
              <div>
                <div class="footer__logo-name">Keyboardist</div>
                <div class="footer__logo-tag">Academy</div>
              </div>
            </a>
            <p class="footer__desc">
              Premium conservatory-grade piano training delivered directly to your device. Master classical masterpieces, modern jazz progressions, and keyboard improvisation techniques.
            </p>
            <div class="footer__social">
              <a href="https://www.youtube.com/@agilanmusiq" target="_blank" rel="noopener noreferrer" aria-label="YouTube" class="footer__social-link"><svg class="icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg></a>
              <a href="https://www.instagram.com/agil_an__/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="footer__social-link"><svg class="icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
              <a href="https://wa.me/918220827783" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" class="footer__social-link"><svg class="icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" /><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" /></svg></a>
              <a href="tel:8220827783" aria-label="Call Us" class="footer__social-link"><svg class="icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></a>
            </div>
          </div>
 
          <div class="footer__col">
            <h4 class="footer__col-title">Quick Links</h4>
            <ul class="footer__links">
              <li><a href="/"            class="footer__link">Home</a></li>
              <li><a href="/about"       class="footer__link">About Us</a></li>
              <li><a href="/courses"     class="footer__link">Courses</a></li>
              <li><a href="/faculty"     class="footer__link">Faculty</a></li>
              <li><a href="/portfolio"   class="footer__link">Portfolio</a></li>
              <li><a href="/gallery"     class="footer__link">Gallery</a></li>
            </ul>
          </div>
 
          <div class="footer__col">
            <h4 class="footer__col-title">Admissions &amp; Info</h4>
            <ul class="footer__links">
              <li><a href="/admission"       class="footer__link">Admissions</a></li>
              <li><a href="/online-classes"  class="footer__link">Online Classes</a></li>
              <li><a href="/offline-classes" class="footer__link">Offline Classes</a></li>
              <li><a href="/events"          class="footer__link">Academy Events</a></li>
              <li><a href="/faq"             class="footer__link">FAQs</a></li>
            </ul>
          </div>
 
          <div class="footer__col">
            <h4 class="footer__col-title">Contact</h4>
            <ul class="flex flex-col gap-4">
              <li class="flex items-center gap-3 text-secondary body-sm"><span><svg class="icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span> <a href="https://maps.google.com/?q=Avadi,+Chennai,+Tamil+Nadu,+India" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none;" class="hover:text-white transition-colors">Avadi, Chennai, Tamil Nadu, India</a></li>
              <li class="flex items-center gap-3 text-secondary body-sm"><span><svg class="icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span> <a href="tel:8220827783" style="color: inherit; text-decoration: none;" class="hover:text-white transition-colors">+91 82208 27783</a></li>
            </ul>
            <div class="mt-6">
              <p class="footer__newsletter-label">Newsletter</p>
              <form onsubmit="App.handleSubscribe(event)" class="footer__newsletter-form">
                <input type="email" required placeholder="your@email.com" class="footer__newsletter-input" />
                <button type="submit" class="footer__newsletter-btn">Join</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <div class="footer__bottom-inner">
          <p class="footer__copyright">&copy; ${new Date().getFullYear()} Keyboardist Academy. All rights reserved.</p>
          <div class="footer__legal">
            <a href="#" class="footer__legal-link">Privacy Policy</a>
            <a href="#" class="footer__legal-link">Terms of Service</a>
            <a href="#" class="footer__legal-link">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  `;

  const initNavbarScroll = () => {
    const nav = document.getElementById('app-navbar');
    if (!nav) return;
    const handleScroll = () => {
      if (window.scrollY > 40) {
        nav.classList.add('is-scrolled');
      } else {
        nav.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', Helpers.throttle(handleScroll, 100));
    handleScroll();
  };

  const toggleMobileMenu = () => {
    const menu = document.getElementById('mobile-menu');
    if (!menu) return;
    const btn = document.querySelector('.navbar__hamburger');
    const isOpen = !menu.classList.contains('hidden');
    if (isOpen) {
      menu.classList.add('hidden');
      document.body.style.overflow = '';
      if (btn) {
        btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        `;
      }
    } else {
      menu.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      if (btn) {
        btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        `;
      }
    }
  };

  const handleLogout = async () => {
    try {
      await Auth.logout();
      Helpers.toast('Logged out successfully.');
    } catch (err) {
      Helpers.toast('Logout failed.', 'error');
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    if (input) {
      Helpers.toast(`Thank you! Subscribed with ${input.value}`);
      input.value = '';
    }
  };

  const wrapWithLayout = (pageHTML) => `
    ${renderNavbar()}
    <main class="page-main">
      ${pageHTML}
    </main>
    ${renderFooter()}
  `;

  const highlightActiveLink = (path) => {
    const explorePages = ['/faculty', '/portfolio', '/gallery', '/admission', '/online-classes', '/offline-classes', '/events', '/faq', '/testimonials'];
    const activePath = explorePages.includes(path) ? '/explore' : path;

    const links = document.querySelectorAll('.nav-link, .dropdown-link');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href === activePath) {
        link.classList.add('active');
        // If inside a dropdown, highlight the dropdown toggle too
        const parentDropdown = link.closest('.nav-dropdown-wrapper');
        if (parentDropdown) {
          const toggle = parentDropdown.querySelector('.dropdown-toggle');
          if (toggle) toggle.classList.add('active');
        }
      } else {
        link.classList.remove('active');
      }
    });
  };

  const fixFaviconPaths = () => {
    const favicon = document.querySelector('link[rel="icon"]');
    const appleIcon = document.querySelector('link[rel="apple-touch-icon"]');
    if (favicon) {
      const href = favicon.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('/frontend')) {
        const clean = href.startsWith('/') ? href : '/' + href;
        favicon.setAttribute('href', getAssetPath(clean));
      }
    }
    if (appleIcon) {
      const href = appleIcon.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('/frontend')) {
        const clean = href.startsWith('/') ? href : '/' + href;
        appleIcon.setAttribute('href', getAssetPath(clean));
      }
    }
  };

  const getAssetPath = (path) => {
    const prefix = window.location.port === '5500' ? '/frontend' : '';
    return `${prefix}${path}`;
  };

  return { wrapWithLayout, initNavbarScroll, toggleMobileMenu, handleLogout, handleSubscribe, highlightActiveLink, getAssetPath, fixFaviconPaths };
})();

// Bootstrap SPA
(() => {
  // Sync auth state in background (non-blocking)
  Auth.refreshUser().then(() => {
    const header = document.querySelector('nav.navbar');
    if (header) {
      const actions = header.querySelector('.navbar__actions');
      if (actions) {
        const isLoggedIn = Auth.isLoggedIn();
        const user = Auth.getUser();
        actions.innerHTML = isLoggedIn ? `
          <div class="flex items-center gap-4">
            <span class="body-sm text-secondary sm\:hidden">Hi, ${user.firstName}</span>
            <button onclick="App.handleLogout()" class="btn btn--outline btn--sm">Logout</button>
          </div>
        ` : `
          <a href="/login" class="btn btn--ghost btn--sm">Sign In</a>
          <a href="/register" class="btn btn--primary btn--sm">Join Free</a>
        `;
      }
    }
  }).catch(err => console.error('Failed to sync auth in background:', err));

  // All pages registered directly from page scripts.

  // Init general effects
  Helpers.initReveal();
  Helpers.initScrollTop();

  // Dynamically fix favicon and shortcut icon paths for Live Server
  App.fixFaviconPaths();

  // Start router
  Router.init();

  // Hide page loader
  const loader = document.getElementById('page-loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      loader.classList.add('is-hidden');
    }, 300);
  }
})();

window.App = App;
