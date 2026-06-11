/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Admission Page View
 *  frontend/pages/admission.js
 * ============================================================
 */

'use strict';

Router.register('/admission', async () => {
  const app = document.getElementById('app');
  if (!app) return;

  const html = `
    <!-- Hero -->
    <section class="section section--glow relative" style="padding-top: calc(var(--section-md) + 2rem);">
      <div class="container text-center reveal">
        <span class="eyebrow">Admissions</span>
        <h1 class="display-lg text-gradient mb-6" style="font-size: clamp(var(--text-2xl), 6vw, var(--text-6xl)); line-height: 1.15;">
          Join the Keyboardist <br>Academy Program
        </h1>
        <p class="body-lg text-secondary mx-auto mb-12" style="max-width: 700px; font-size: clamp(var(--text-sm), 2vw, var(--text-base));">
          Explore our enrollment steps and submit your registration request to join our next studio or online cohort.
        </p>
      </div>
    </section>

    <!-- 1. ENROLLMENT PROCESS -->
    <section class="section section--alt border-top border-bottom">
      <div class="container">
        <div class="section-header section-header--center reveal">
          <span class="eyebrow">Steps</span>
          <h2 class="section-header__title">Our Enrollment Process</h2>
        </div>

        <div class="grid grid-4 text-center">
          <div class="card p-6 border bg-glass reveal hover-up" style="transition: all 0.3s;">
            <div class="flex items-center justify-center mx-auto mb-4" style="width: 44px; height: 44px; border-radius: 50%; background: var(--violet-15); color: var(--violet); font-size: var(--text-lg); font-weight: var(--fw-bold); border: 1px solid var(--border-violet);">1</div>
            <h3 class="h6 text-white">Online Application</h3>
            <p class="body-xs text-secondary mt-2">Submit your details, class level preference, and cohort options using the form below.</p>
          </div>
          <div class="card p-6 border bg-glass reveal hover-up" style="transition: all 0.3s; transition-delay: 0.1s;">
            <div class="flex items-center justify-center mx-auto mb-4" style="width: 44px; height: 44px; border-radius: 50%; background: var(--violet-15); color: var(--violet); font-size: var(--text-lg); font-weight: var(--fw-bold); border: 1px solid var(--border-violet);">2</div>
            <h3 class="h6 text-white">Consultation Call</h3>
            <p class="body-xs text-secondary mt-2">Schedule a brief virtual evaluation session with one of our principal coordinators.</p>
          </div>
          <div class="card p-6 border bg-glass reveal hover-up" style="transition: all 0.3s; transition-delay: 0.2s;">
            <div class="flex items-center justify-center mx-auto mb-4" style="width: 44px; height: 44px; border-radius: 50%; background: var(--violet-15); color: var(--violet); font-size: var(--text-lg); font-weight: var(--fw-bold); border: 1px solid var(--border-violet);">3</div>
            <h3 class="h6 text-white">Batch Allocation</h3>
            <p class="body-xs text-secondary mt-2">Receive final batch confirm details based on level limits and space availability.</p>
          </div>
          <div class="card p-6 border bg-glass reveal hover-up" style="transition: all 0.3s; transition-delay: 0.3s;">
            <div class="flex items-center justify-center mx-auto mb-4" style="width: 44px; height: 44px; border-radius: 50%; background: var(--violet-15); color: var(--violet); font-size: var(--text-lg); font-weight: var(--fw-bold); border: 1px solid var(--border-violet);">4</div>
            <h3 class="h6 text-white">Start Practicing</h3>
            <p class="body-xs text-secondary mt-2">Get access to your customized dashboard and practice guidelines material.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. REGISTRATION FORM -->
    <section class="section">
      <div class="container--sm reveal">
        <div class="card border bg-glass" style="padding: clamp(var(--sp-5), 6vw, var(--sp-10));">
          <h3 class="h4 text-white text-center mb-8">Registration Form</h3>
          
          <form id="admission-form" class="form flex col gap-6">
            <div class="flex gap-4 sm\:flex-col">
              <div class="form-group mb-0 flex-1">
                <label for="adm-first" class="form-label label">First Name</label>
                <input type="text" id="adm-first" required class="form-input" placeholder="Glenn" />
              </div>
              <div class="form-group mb-0 flex-1">
                <label for="adm-last" class="form-label label">Last Name</label>
                <input type="text" id="adm-last" required class="form-input" placeholder="Gould" />
              </div>
            </div>

            <div class="form-group">
              <label for="adm-email" class="form-label label">Email Address</label>
              <input type="email" id="adm-email" required class="form-input" placeholder="pianist@gould.com" />
            </div>

            <div class="form-group">
              <label for="adm-level" class="form-label label">Skill Level</label>
              <select id="adm-level" required class="form-input">
                <option value="beginner">Beginner (Never played before)</option>
                <option value="intermediate">Intermediate (Can play scale runs & chords)</option>
                <option value="advanced">Advanced (ABRSM Grade 5+)</option>
              </select>
            </div>

            <div class="form-group">
              <label for="adm-batch" class="form-label label">Preferred Batch</label>
              <select id="adm-batch" required class="form-input">
                <option value="online">Online Self-Paced / Live Plus</option>
                <option value="weekday-morning">Vienna Studio - Weekday Morning</option>
                <option value="weekday-evening">Vienna Studio - Weekday Evening</option>
                <option value="weekend-intensive">Vienna Studio - Weekend Intensive</option>
              </select>
            </div>

            <button type="submit" class="btn btn--primary w-full mt-4">Submit Application</button>
          </form>
        </div>
      </div>
    </section>
  `;

  app.innerHTML = App.wrapWithLayout(html);
  App.initNavbarScroll();
  App.highlightActiveLink('/admission');
  Helpers.initReveal();

  const form = document.getElementById('admission-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const firstName = document.getElementById('adm-first').value;
      const lastName = document.getElementById('adm-last').value;
      const email = document.getElementById('adm-email').value;
      const level = document.getElementById('adm-level').value;
      const batch = document.getElementById('adm-batch').value;

      try {
        const btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.textContent = 'Submitting...';

        await Api.post('/contact', {
          name: `${firstName} ${lastName}`,
          email,
          subject: `Admission Application (${level})`,
          message: `Admission request from ${firstName} ${lastName}.\nSkill Level: ${level}\nPreferred Batch: ${batch}`
        });

        Helpers.toast('Application submitted successfully! We will contact you soon.');
        form.reset();
      } catch (err) {
        console.error(err);
        Helpers.toast(err.message || 'Failed to submit application. Please try again.', 'error');
      } finally {
        const btn = form.querySelector('button[type="submit"]');
        if (btn) {
          btn.disabled = false;
          btn.textContent = 'Submit Application';
        }
      }
    });
  }
});
