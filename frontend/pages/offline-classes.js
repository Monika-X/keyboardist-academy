/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Offline Classes Page View
 *  frontend/pages/offline-classes.js
 * ============================================================
 */

'use strict';

Router.register('/offline-classes', async () => {
  const app = document.getElementById('app');
  if (!app) return;

  const html = `
    <!-- 1. CLASSROOM EXPERIENCE -->
    <section class="section section--glow relative" style="padding-top: calc(var(--section-md) + 2rem);">
      <div class="container text-center">
        <span class="eyebrow">Physical Conservatory</span>
        <h1 class="display-lg text-gradient mb-6" style="font-size: clamp(var(--text-2xl), 6vw, var(--text-6xl)); line-height: 1.15;">
          Conservatory-Grade Training <br>In Our Premium Studios
        </h1>
        <p class="body-lg text-secondary mx-auto mb-12" style="max-width: 700px; font-size: clamp(var(--text-sm), 2vw, var(--text-base));">
          Practice on premium Steinway Grand pianos, study in acoustically optimized chambers, and receive direct, personal, tactile coaching in the heart of Vienna.
        </p>
      </div>
    </section>

    <!-- 2. INFRASTRUCTURE & 3. TRAINING ENVIRONMENT -->
    <section class="section section--alt border-top border-bottom">
      <div class="container grid grid-2" style="gap: clamp(var(--sp-6), 6vw, var(--sp-12));">
        <!-- Infrastructure -->
        <div class="card p-8 border bg-glass">
          <div style="font-size: 40px;" class="mb-4"><svg class="icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;"><rect x="2" y="3" width="20" height="18" rx="2" ry="2"/><line x1="6" y1="3" x2="6" y2="21"/><line x1="10" y1="3" x2="10" y2="21"/><line x1="14" y1="3" x2="14" y2="21"/><line x1="18" y1="3" x2="18" y2="21"/></svg></div>
          <h2 class="h3 text-white mb-4">World-Class Pianos</h2>
          <p class="body-sm text-secondary">
            Our campus features a fleet of concert-grade Steinway & Sons grand pianos, premium Yamaha hybrid keyboards, and dedicated digital labs equipped with advanced audio workstations. Every instrument is meticulously tuned and maintained daily.
          </p>
        </div>
        <!-- Training Environment -->
        <div class="card p-8 border bg-glass">
          <div style="font-size: 40px;" class="mb-4"><svg class="icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg></div>
          <h2 class="h3 text-white mb-4">Acoustic Optimization</h2>
          <p class="body-sm text-secondary">
            Every studio is isolated with professional sound dampening materials to ensure absolute clarity and zero distractions. Our spacious chambers allow students to hear and interpret dynamics and resonance precisely.
          </p>
        </div>
      </div>
    </section>

    <!-- 4. AVAILABLE COURSES -->
    <section class="section">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="eyebrow">Studio Courses</span>
          <h2 class="section-header__title">Our In-Person Programs</h2>
          <p class="section-header__desc">Join physical cohorts led by Juilliard accredited concert pianists.</p>
        </div>

        <div class="grid grid-3">
          <!-- Course 1 -->
          <div class="card hover\:scale overflow-hidden flex col justify-between">
            <div>
              <div class="relative text-center bg-overlay" style="height: 180px; display: flex; align-items: center; justify-content: center; font-size: 50px;">
                <svg class="icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
              </div>
              <div class="p-6">
                <span class="label text-accent">Classical Studio</span>
                <h3 class="h5 text-white mt-2 mb-3">Traditional Piano Foundations</h3>
                <p class="body-xs text-secondary">Master hand placement, scales, classical score reading, and finger technique on a real grand piano.</p>
              </div>
            </div>
            <div class="p-6 pt-0">
              <a href="/contact" class="btn btn--primary btn--sm w-full mt-4 text-center">Inquire Admissions</a>
            </div>
          </div>

          <!-- Course 2 -->
          <div class="card hover\:scale overflow-hidden flex col justify-between">
            <div>
              <div class="relative text-center bg-overlay" style="height: 180px; display: flex; align-items: center; justify-content: center; font-size: 50px;">
                <svg class="icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/></svg>
              </div>
              <div class="p-6">
                <span class="label text-accent">Jazz & Improvisation</span>
                <h3 class="h5 text-white mt-2 mb-3">Modern Jazz Collective</h3>
                <p class="body-xs text-secondary">Participate in group rhythm sections, explore complex chord variations, and practice live trio accompaniment.</p>
              </div>
            </div>
            <div class="p-6 pt-0">
              <a href="/contact" class="btn btn--primary btn--sm w-full mt-4 text-center">Inquire Admissions</a>
            </div>
          </div>

          <!-- Course 3 -->
          <div class="card hover\:scale overflow-hidden flex col justify-between">
            <div>
              <div class="relative text-center bg-overlay" style="height: 180px; display: flex; align-items: center; justify-content: center; font-size: 50px;">
                <svg class="icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              </div>
              <div class="p-6">
                <span class="label text-accent">Private Coaching</span>
                <h3 class="h5 text-white mt-2 mb-3">Concert Virtuoso Program</h3>
                <p class="body-xs text-secondary">Intense, private 1-on-1 coaching focusing on recital pieces, advanced technical exercises, and audition prep.</p>
              </div>
            </div>
            <div class="p-6 pt-0">
              <a href="/contact" class="btn btn--primary btn--sm w-full mt-4 text-center">Inquire Admissions</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. BATCH INFORMATION -->
    <section class="section section--alt border-top border-bottom">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="eyebrow">Class Times</span>
          <h2 class="section-header__title">Batch & Cohort Schedules</h2>
          <p class="section-header__desc">We limit cohorts to 6 students per session to guarantee personal instructor attention.</p>
        </div>

        <div class="grid grid-3" style="gap: clamp(var(--sp-6), 6vw, var(--sp-12));">
          <!-- Weekday Morning -->
          <div class="card p-8 border bg-glass text-center flex col justify-between">
            <div>
              <h3 class="h4 text-white mb-2">Morning Cohort</h3>
              <p class="body-xs text-secondary mb-6">Monday & Wednesday</p>
              <div class="display-md text-gradient font-bold mb-6">09:00 AM</div>
              <p class="body-xs text-tertiary">Ideal for students, homemakers, or early risers looking to practice early.</p>
            </div>
            <a href="/contact" class="btn btn--outline btn--sm w-full mt-6 text-center">Check Availability</a>
          </div>

          <!-- Weekday Evening -->
          <div class="card p-8 border bg-glass text-center flex col justify-between" style="border-color: var(--violet);">
            <div>
              <h3 class="h4 text-white mb-2">Evening Cohort</h3>
              <p class="body-xs text-secondary mb-6">Tuesday & Thursday</p>
              <div class="display-md text-gradient font-bold mb-6">06:30 PM</div>
              <p class="body-xs text-tertiary">Meticulously scheduled for working professionals and adult learners.</p>
            </div>
            <a href="/contact" class="btn btn--primary btn--sm w-full mt-6 text-center">Check Availability</a>
          </div>

          <!-- Weekend Intensive -->
          <div class="card p-8 border bg-glass text-center flex col justify-between">
            <div>
              <h3 class="h4 text-white mb-2">Weekend Studio</h3>
              <p class="body-xs text-secondary mb-6">Saturday Intensive</p>
              <div class="display-md text-gradient font-bold mb-6">10:00 AM</div>
              <p class="body-xs text-tertiary">A single 3-hour immersive session combining theory and studio practice.</p>
            </div>
            <a href="/contact" class="btn btn--outline btn--sm w-full mt-6 text-center">Check Availability</a>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. CTA -->
    <section class="section section--glow">
      <div class="container text-center py-8">
        <span class="eyebrow">Join the Conservatory</span>
        <h2 class="display-md text-white mb-6" style="font-size: clamp(var(--text-xl), 5vw, var(--text-4xl));">Schedule a Private Campus Tour</h2>
        <p class="body-md text-secondary mb-12 mx-auto" style="max-width: 600px;">
          Meet our world-class faculty, view ourSteinway grand pianos, and consult with our principal on the right program for you.
        </p>
        <div class="flex gap-4 sm\:flex-col w-full justify-center items-center">
          <a href="/contact" class="btn btn--primary btn--lg w-fit text-center" style="min-width: 200px;">Book Studio Tour</a>
          <a href="/contact" class="btn btn--outline btn--lg w-fit text-center" style="min-width: 200px;">Admissions Enquiry</a>
        </div>
      </div>
    </section>
  `;

  app.innerHTML = App.wrapWithLayout(html);
  App.initNavbarScroll();
  App.highlightActiveLink('/offline-classes');
});
