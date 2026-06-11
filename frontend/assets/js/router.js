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
      history.replaceState(null, '', path);
    } else {
      history.pushState(null, '', path);
    }
    _resolve(path);
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
    const cleanPath = path.split('?')[0];
    const matched   = _matchRoute(cleanPath);

    const app = document.getElementById('app');
    if (!app) return;

    if (!matched) {
      app.innerHTML = `
        <div class="page-wrapper" style="display:flex;align-items:center;justify-content:center;min-height:100vh;">
          <div style="text-align:center;">
            <h1 class="display-md text-gradient">404</h1>
            <p class="body-lg text-white-60 mt-4">Page not found.</p>
            <a href="/" class="btn btn--primary mt-8" onclick="Router.navigate('/');return false;">Go Home</a>
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
    window.addEventListener('popstate', () => _resolve(window.location.pathname));

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

    _resolve(window.location.pathname);
  };

  const getCurrent = () => _current;

  return { register, navigate, init, getCurrent };
})();

window.Router = Router;
