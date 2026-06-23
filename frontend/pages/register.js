/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Register View
 *  frontend/pages/register.js
 * ============================================================
 */

'use strict';

Router.register('/register', async () => {
  const app = document.getElementById('app');
  if (!app) return;

  const html = `    <style>
      .auth-page-wrapper {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: calc(var(--nav-h) + 2rem) 1rem 2rem;
        background-color: var(--bg-base);
        background-image: radial-gradient(circle at top right, rgba(99, 102, 241, 0.05), transparent 40%),
                          radial-gradient(circle at bottom left, rgba(99, 102, 241, 0.05), transparent 40%);
      }

      .auth-card {
        display: grid;
        grid-template-columns: 1fr 1fr;
        width: 100%;
        max-width: 1100px;
        min-height: 600px;
        background: var(--surface-1);
        border-radius: 1.5rem;
        box-shadow: var(--shadow-2xl);
        overflow: hidden;
        border: 1px solid var(--border-subtle);
        animation: fade-in-up 0.6s var(--ease-out) forwards;
      }
      
      .auth-form-side {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: clamp(2rem, 4vw, 4rem);
      }
      
      .auth-image-side {
        position: relative;
        background-color: #000;
      }
      
      .auth-input {
        width: 100%;
        background-color: rgba(255, 255, 255, 0.02) !important;
        border: 1px solid rgba(255, 255, 255, 0.05) !important;
        border-radius: 8px;
        padding: 12px 16px;
        color: var(--text-primary);
        font-family: var(--font-body);
        font-size: 0.95rem;
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

      @media (max-width: 992px) {
        .auth-card { grid-template-columns: 1fr; max-width: 500px; }
        .auth-image-side { display: none; }
      }
      
      @media (max-width: 576px) {
        .auth-name-grid {
          grid-template-columns: 1fr !important;
          gap: 1.5rem !important;
        }
      }
    </style>

    <div class="auth-page-wrapper">
      <section class="auth-card">
        
        <!-- LEFT: FORM -->
        <div class="auth-form-side">
          <div class="mb-8">
            <span class="badge badge--violet mb-3 shadow-sm" style="background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.3); color: var(--violet);">Admissions</span>
            <h1 class="h3 text-primary" style="letter-spacing: -0.02em;">Start Your Journey</h1>
            <p class="body-md text-secondary mt-2" style="line-height: 1.6;">Create a free account and explore our beginner syllabus.</p>
          </div>
          
          <form id="register-form" class="flex col gap-5 w-full">
            <div class="grid auth-name-grid" style="grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div>
                <label for="reg-first" class="form-label label text-secondary mb-1 block font-medium" style="font-size: 0.8rem; letter-spacing: 0.02em; text-transform: uppercase;">First Name</label>
                <input type="text" id="reg-first" required class="auth-input" placeholder="Mozart" />
              </div>
              <div>
                <label for="reg-last" class="form-label label text-secondary mb-1 block font-medium" style="font-size: 0.8rem; letter-spacing: 0.02em; text-transform: uppercase;">Last Name</label>
                <input type="text" id="reg-last" required class="auth-input" placeholder="Wolfgang" />
              </div>
            </div>

            <div>
              <label for="reg-email" class="form-label label text-secondary mb-1 block font-medium" style="font-size: 0.8rem; letter-spacing: 0.02em; text-transform: uppercase;">Email Address</label>
              <input type="email" id="reg-email" required class="auth-input" placeholder="composer@academy.com" />
            </div>

            <div>
              <label for="reg-password" class="form-label label text-secondary mb-1 block font-medium" style="font-size: 0.8rem; letter-spacing: 0.02em; text-transform: uppercase;">Password</label>
              <div class="relative">
                <input type="password" id="reg-password" required minlength="8" class="auth-input" placeholder="Minimum 8 characters" style="padding-right: 48px;" />
                <button type="button" id="toggle-reg-password" class="absolute flex items-center justify-center" style="right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--text-tertiary); cursor: pointer; padding: 4px; transition: color 0.2s;">
                  <svg class="toggle-icon-show" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  <svg class="toggle-icon-hide" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: none;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                </button>
              </div>
            </div>

            <div>
              <label for="reg-confirm" class="form-label label text-secondary mb-1 block font-medium" style="font-size: 0.8rem; letter-spacing: 0.02em; text-transform: uppercase;">Confirm Password</label>
              <div class="relative">
                <input type="password" id="reg-confirm" required minlength="8" class="auth-input" placeholder="••••••••" style="padding-right: 48px;" />
                <button type="button" id="toggle-reg-confirm" class="absolute flex items-center justify-center" style="right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--text-tertiary); cursor: pointer; padding: 4px; transition: color 0.2s;">
                  <svg class="toggle-icon-show" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  <svg class="toggle-icon-hide" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: none;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                </button>
              </div>
            </div>

            <button type="submit" class="btn btn--primary w-full mt-2" style="padding: 14px; border-radius: 8px; font-weight: 600; letter-spacing: 0.02em;">Join Academy</button>
          </form>

          <div class="mt-6 pt-6" style="border-top: 1px solid rgba(255,255,255,0.05);">
            <p class="body-sm text-secondary">
              Already have an account? 
              <a href="/login" class="text-primary font-medium" style="border-bottom: 1px solid var(--violet); padding-bottom: 2px; transition: color 0.2s;">Sign in here</a>
            </p>
          </div>
        </div>
        
        <!-- RIGHT: IMAGE -->
        <div class="auth-image-side">
          <img src="https://res.cloudinary.com/doij66qnv/image/upload/v1782204547/keyboardist-academy/assets/media__1782204451259.jpg" alt="Keyboardist Elements" class="w-full h-full object-cover" style="opacity: 0.85;" loading="lazy">
          <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(18,18,18,0.95) 0%, rgba(18,18,18,0) 60%);"></div>
          
          <!-- Elegant overlay badge -->
          <div class="absolute bottom-6 left-6 right-6">
            <div class="p-5" style="background: rgba(18, 18, 18, 0.4); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); border-radius: 1rem;">
              <p class="body-sm text-primary italic mb-2">"The beautiful thing about learning is that nobody can take it away from you."</p>
              <p class="text-xs text-secondary font-bold uppercase tracking-wider">— B.B. King</p>
            </div>
          </div>
        </div>
        
      </section>
    </div>    
  `;

  app.innerHTML = App.wrapWithLayout(html);
  App.initNavbarScroll();

  const setupToggle = (btnId, inputId) => {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.addEventListener('click', () => {
        const input = document.getElementById(inputId);
        const showIcon = btn.querySelector('.toggle-icon-show');
        const hideIcon = btn.querySelector('.toggle-icon-hide');
        if (input.type === 'password') {
          input.type = 'text';
          showIcon.style.display = 'none';
          hideIcon.style.display = 'block';
          btn.style.color = 'var(--violet)';
        } else {
          input.type = 'password';
          showIcon.style.display = 'block';
          hideIcon.style.display = 'none';
          btn.style.color = 'var(--text-tertiary)';
        }
      });
    }
  };
  setupToggle('toggle-reg-password', 'reg-password');
  setupToggle('toggle-reg-confirm', 'reg-confirm');

  const form = document.getElementById('register-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const firstName = document.getElementById('reg-first').value;
      const lastName = document.getElementById('reg-last').value;
      const email = document.getElementById('reg-email').value;
      const password = document.getElementById('reg-password').value;
      const confirmPassword = document.getElementById('reg-confirm').value;

      if (password !== confirmPassword) {
        Helpers.toast('Passwords do not match.', 'error');
        return;
      }

      try {
        const btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.textContent = 'Creating Account...';

        await Auth.register({ firstName, lastName, email, password });
        Helpers.toast('Account created successfully!');

        Router.navigate(Auth.isAdmin() ? '/admin' : '/');
      } catch (err) {
        console.error(err);
        Helpers.toast(err.message || 'Registration failed.', 'error');
        const btn = form.querySelector('button[type="submit"]');
        btn.disabled = false;
        btn.textContent = 'Join Academy';
      }
    });
  }
}, { guest: true });
