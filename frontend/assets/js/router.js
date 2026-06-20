/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Client-Side Router
 *  frontend/assets/js/router.js
 * ============================================================
 *  Hash-based SPA router.
 *  Pages register themselves via Router.register(path, renderFn).
 * ============================================================
 */

'use strict';

const Router = (() => {
  const _routes = new Map();
  let   _current = null;

  /** Register a route and its render function. */
  const register = (path, handler, { auth = false, guest = false } = {}) => {
    _routes.set(path, { handler, auth, guest });
  };

  /** Navigate programmatically. */
  const navigate = (path, replace = false) => {
    if (replace) {
      window.location.replace('#' + path);
    } else {
      window.location.hash = path;
    }
  };

  /** Match path including dynamic segments (:param). */
  const _matchRoute = (path) => {
    for (const [pattern, config] of _routes) {
      const keys   = [];
      const regStr = pattern.replace(/:([^/]+)/g, (_, k) => { keys.push(k); return '([^/]+)'; });
      const regex  = new RegExp(`^${regStr}$`);
      const match  = path.match(regex);
      if (match) {
        const params = {};
        keys.forEach((k, i) => { params[k] = match[i + 1]; });
        return { config, params };
      }
    }
    return null;
  };

  /** Resolve and render a path. */
  const _resolve = async (path) => {
    let cleanPath = path.split('?')[0];

    // Map common dev server paths to root
    if (cleanPath === '/frontend/' || cleanPath === '/frontend' || cleanPath === '/frontend/index.html' || cleanPath === '/index.html') {
      cleanPath = '/';
    }

    const matched   = _matchRoute(cleanPath);

    const app = document.getElementById('app');
    if (!app) return;

    if (!matched) {
      app.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:center;min-height:100vh; background-color: var(--bg-base);">
          <div style="text-align:center; padding: 2rem;">
            <h1 style="font-size: clamp(4rem, 10vw, 8rem); font-weight: 700; color: var(--violet); margin-bottom: 1rem; line-height: 1;">404</h1>
            <h2 class="h3" style="color: var(--text-primary); margin-bottom: 1rem;">Page Not Found</h2>
            <p class="body-md" style="color: var(--text-secondary); margin-bottom: 2.5rem; max-width: 400px; margin-left: auto; margin-right: auto;">The page or curriculum you are looking for doesn't exist or has been moved.</p>
            <a href="/" class="btn btn--primary" onclick="Router.navigate('/');return false;">Return Home</a>
          </div>
        </div>`;
      return;
    }

    const { config, params } = matched;

    // Auth guards
    if (config.auth  && !Auth.isLoggedIn()) { navigate('/login',     true); return; }
    if (config.guest && Auth.isLoggedIn())  { navigate(Auth.isAdmin() ? '/admin' : '/', true); return; }

    _current = cleanPath;
    app.innerHTML = '';
    document.body.style.overflow = '';
    app.classList.add('animate-fade-in');

    try {
      await config.handler({ params, query: _parseQuery(window.location.search) });
    } catch (err) {
      console.error('[Router] render error:', err);
      app.innerHTML = `<div style="text-align:center;padding:4rem;">Something went wrong.</div>`;
    }
  };

  const _parseQuery = (search) => Object.fromEntries(new URLSearchParams(search));

  /** Start the router — listen to navigation events. */
  const init = () => {
    window.addEventListener('hashchange', () => _resolve(window.location.hash.substring(1) || '/'));

    // Intercept <a> clicks for internal navigation
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href]');
      if (!link) return;
      const href = link.getAttribute('href');
      if (href.startsWith('/') && !href.startsWith('//')) {
        e.preventDefault();
        navigate(href);
      }
    });

    _resolve(window.location.hash.substring(1) || '/');
  };

  const getCurrent = () => _current;

  return { register, navigate, init, getCurrent };
})();

window.Router = Router;
