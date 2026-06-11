/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Login View
 *  frontend/pages/login.js
 * ============================================================
 */

'use strict';

Router.register('/login', async () => {
  const app = document.getElementById('app');
  if (!app) return;

  const html = `
    <section class="section section--glow min-h-screen flex items-center justify-center" style="padding-top: var(--nav-h);">
      <div class="container--sm">
        <div class="card border bg-glass" style="padding: clamp(var(--sp-5), 6vw, var(--sp-12));">
          <div class="text-center mb-10">
            <h1 class="h2 text-white">Welcome Back</h1>
            <p class="body-sm text-secondary mt-2">Sign in to resume your keyboard mastery journey.</p>
          </div>
          
          <form id="login-form" class="form flex col gap-6">
            <div class="form-group">
              <label for="login-email" class="form-label label">Email Address</label>
              <input type="email" id="login-email" required class="form-input" placeholder="you@example.com" />
            </div>

            <div class="form-group">
              <label for="login-password" class="form-label label">Password</label>
              <div class="relative">
                <input type="password" id="login-password" required class="form-input" placeholder="••••••••" style="padding-right: 48px;" />
                <button type="button" id="toggle-password" class="absolute flex items-center justify-center" style="right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--violet); cursor: pointer; padding: 4px;">
                  <svg class="icon-svg toggle-icon-show" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  <svg class="icon-svg toggle-icon-hide" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: none;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                </button>
              </div>
            </div>

            <button type="submit" class="btn btn--primary w-full mt-4">Sign In</button>
          </form>

          <div class="text-center mt-8 border-top pt-6">
            <p class="body-xs text-secondary">
              Don't have an account? 
              <a href="/register" class="text-accent font-semibold">Create one for free</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  `;

  app.innerHTML = App.wrapWithLayout(html);
  App.initNavbarScroll();

  const toggleBtn = document.getElementById('toggle-password');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const input = document.getElementById('login-password');
      const showIcon = toggleBtn.querySelector('.toggle-icon-show');
      const hideIcon = toggleBtn.querySelector('.toggle-icon-hide');
      if (input.type === 'password') {
        input.type = 'text';
        showIcon.style.display = 'none';
        hideIcon.style.display = 'block';
      } else {
        input.type = 'password';
        showIcon.style.display = 'block';
        hideIcon.style.display = 'none';
      }
    });
  }

  const form = document.getElementById('login-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;

      try {
        const btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.textContent = 'Signing In...';

        await Auth.login({ email, password });
        Helpers.toast('Signed in successfully!');

        // Fully reload or navigate to force navbar update
        Router.navigate(Auth.isAdmin() ? '/admin' : '/');
      } catch (err) {
        console.error(err);
        Helpers.toast(err.message || 'Login failed. Please check credentials.', 'error');
        const btn = form.querySelector('button[type="submit"]');
        btn.disabled = false;
        btn.textContent = 'Sign In';
      }
    });
  }
}, { guest: true });
