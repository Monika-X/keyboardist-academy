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
    <style>
      /* Scoped Auth Page Styles */
      .auth-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        min-height: 100vh;
        background-color: var(--bg-base);
      }
      
      .auth-form-side {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: clamp(2rem, 5vw, 6rem);
        padding-top: calc(var(--nav-h) + 2rem);
        max-width: 680px;
        margin: 0 auto;
        width: 100%;
        animation: fade-in-left 0.6s var(--ease-out) forwards;
      }
      
      .auth-image-side {
        position: relative;
        overflow: hidden;
        border-left: 1px solid rgba(255, 255, 255, 0.03);
        background-color: #000;
        animation: fade-in-right 0.6s var(--ease-out) forwards;
      }
      
      .auth-input {
        width: 100%;
        background-color: rgba(255, 255, 255, 0.02) !important;
        border: 1px solid rgba(255, 255, 255, 0.05) !important;
        border-radius: 8px;
        padding: 14px 16px;
        color: var(--text-primary);
        font-family: var(--font-body);
        font-size: 1rem;
        transition: border-color 0.3s ease, background-color 0.3s ease;
      }
      
      .auth-input:focus {
        outline: none;
        border-color: var(--violet) !important;
        background-color: rgba(255, 255, 255, 0.04) !important;
      }
      
      .auth-input::placeholder {
        color: var(--text-tertiary);
      }
      
      .auth-checkbox {
        appearance: none;
        width: 18px;
        height: 18px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        background: transparent;
        cursor: pointer;
        position: relative;
        transition: all 0.2s ease;
      }
      
      .auth-checkbox:checked {
        background-color: var(--violet);
        border-color: var(--violet);
      }
      
      .auth-checkbox:checked::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 5px;
        width: 4px;
        height: 9px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }

      @media (max-width: 992px) {
        .auth-container { grid-template-columns: 1fr; }
        .auth-image-side { display: none; }
      }
    </style>

    <section class="auth-container">
      
      <!-- LEFT: FORM -->
      <div class="auth-form-side">
        <div class="mb-10">
          <span class="badge badge--violet mb-4 shadow-sm" style="background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.3); color: var(--violet);">Member Access</span>
          <h1 class="h2 text-primary" style="letter-spacing: -0.02em;">Welcome Back</h1>
          <p class="body-lg text-secondary mt-2" style="max-width: 400px; line-height: 1.6;">Sign in to resume your conservatory-grade keyboard mastery journey.</p>
        </div>
        
        <form id="login-form" class="flex col gap-6 w-full">
          <div>
            <label for="login-email" class="form-label label text-secondary mb-2 block font-medium" style="font-size: 0.85rem; letter-spacing: 0.02em; text-transform: uppercase;">Email Address</label>
            <input type="email" id="login-email" required class="auth-input" placeholder="you@example.com" />
          </div>

          <div>
            <div class="flex justify-between items-center mb-2">
              <label for="login-password" class="form-label label text-secondary mb-0 block font-medium" style="font-size: 0.85rem; letter-spacing: 0.02em; text-transform: uppercase;">Password</label>
              <a href="#" class="text-xs text-violet font-medium hover-opacity" style="transition: opacity 0.2s;">Forgot password?</a>
            </div>
            <div class="relative">
              <input type="password" id="login-password" required class="auth-input" placeholder="••••••••" style="padding-right: 48px;" />
              <button type="button" id="toggle-password" class="absolute flex items-center justify-center" style="right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--text-tertiary); cursor: pointer; padding: 4px; transition: color 0.2s;">
                <svg class="toggle-icon-show" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                <svg class="toggle-icon-hide" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: none;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              </button>
            </div>
          </div>
          
          <div class="flex items-center gap-3 mt-1">
            <input type="checkbox" id="login-remember" class="auth-checkbox">
            <label for="login-remember" class="body-sm text-secondary cursor-pointer select-none">Remember me for 30 days</label>
          </div>

          <button type="submit" class="btn btn--primary w-full mt-2" style="padding: 16px; border-radius: 8px; font-weight: 600; letter-spacing: 0.02em;">Sign In</button>
        </form>

        <div class="mt-8 pt-8" style="border-top: 1px solid rgba(255,255,255,0.05);">
          <p class="body-sm text-secondary">
            Don't have an account? 
            <a href="/register" class="text-primary font-medium" style="border-bottom: 1px solid var(--violet); padding-bottom: 2px; transition: color 0.2s;">Create one for free</a>
          </p>
        </div>
      </div>
      
      <!-- RIGHT: IMAGE -->
      <div class="auth-image-side">
        <img src="https://res.cloudinary.com/doij66qnv/image/upload/v1782195006/keyboardist-academy/assets/login_bg_image.jpg" alt="Vintage Piano Keys" class="w-full h-full object-cover" style="opacity: 0.7;" loading="lazy">
        <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(18,18,18,1) 0%, rgba(18,18,18,0) 50%);"></div>
        
        <!-- Elegant overlay badge -->
        <div class="absolute bottom-12 left-12 right-12">
          <div class="p-8" style="background: rgba(18, 18, 18, 0.6); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px;">
            <p class="body-lg text-primary italic mb-4">"The piano keys are black and white but they sound like a million colors in your mind."</p>
            <p class="text-xs text-secondary font-bold uppercase tracking-wider">— Maria João Pires</p>
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
        toggleBtn.style.color = 'var(--violet)';
      } else {
        input.type = 'password';
        showIcon.style.display = 'block';
        hideIcon.style.display = 'none';
        toggleBtn.style.color = 'var(--text-tertiary)';
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
