/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Courses Page View
 *  frontend/pages/courses.js
 * ============================================================
 */

'use strict';

Router.register('/courses', async () => {
  const app = document.getElementById('app');
  if (!app) return;

  const html = `
    <!-- 1. HERO BANNER -->
    <section class="section section--glow relative" style="padding-top: calc(var(--section-md) + 2rem);">
      <div class="container text-center">
        <span class="eyebrow">Academy Curriculums</span>
        <h1 class="display-lg text-gradient mb-6" style="font-size: clamp(var(--text-2xl), 6vw, var(--text-6xl)); line-height: 1.15;">
          Conservatory-Grade Curriculums <br>For Every Level
        </h1>
        <p class="body-lg text-secondary mx-auto mb-12" style="max-width: 700px; font-size: clamp(var(--text-sm), 2vw, var(--text-base));">
          Explore structured pathways designed to take you from absolute keyboard basics to advanced classical virtuosity, modern jazz harmonization, and sight-reading dexterity.
        </p>
      </div>
    </section>

    <!-- 2. COURSE CATEGORIES -->
    <section class="section section--alt border-top border-bottom">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="eyebrow">Academic Divisions</span>
          <h2 class="section-header__title">Explore by Category</h2>
        </div>
        <div class="grid grid-4 text-center">
          <div class="card p-6 border bg-glass">
            <div style="color: var(--violet); margin-bottom: 0.75rem;"><svg class="icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></div>
            <h3 class="h6 text-white">Classical Piano</h3>
            <p class="body-xs text-secondary mt-2">Posture, technique, notation, Chopin & classical pieces.</p>
          </div>
          <div class="card p-6 border bg-glass">
            <div style="color: var(--violet); margin-bottom: 0.75rem;"><svg class="icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/></svg></div>
            <h3 class="h6 text-white">Jazz Keyboard</h3>
            <p class="body-xs text-secondary mt-2">Shell voicings, 2-5-1 chord structures, pentatonics, improv.</p>
          </div>
          <div class="card p-6 border bg-glass">
            <div style="color: var(--violet); margin-bottom: 0.75rem;"><svg class="icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;"><rect x="2" y="3" width="20" height="18" rx="2" ry="2"/><line x1="6" y1="3" x2="6" y2="21"/><line x1="10" y1="3" x2="10" y2="21"/><line x1="14" y1="3" x2="14" y2="21"/><line x1="18" y1="3" x2="18" y2="21"/></svg></div>
            <h3 class="h6 text-white">Contemporary</h3>
            <p class="body-xs text-secondary mt-2">Pop arrangements, chord charts, scale runs, patterns.</p>
          </div>
          <div class="card p-6 border bg-glass">
            <div style="color: var(--violet); margin-bottom: 0.75rem;"><svg class="icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div>
            <h3 class="h6 text-white">Music Theory</h3>
            <p class="body-xs text-secondary mt-2">Intervals, key signatures, chord symbols, dynamic markers.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. COURSE DETAILS (Modern Cards) -->
    <section class="section">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="eyebrow">Syllabus Details</span>
          <h2 class="section-header__title">Our Core Programs</h2>
        </div>

        <div class="grid grid-3">
          <!-- Card 1 -->
          <div class="card hover\:scale overflow-hidden flex col justify-between">
            <div>
              <div class="relative overflow-hidden" style="height: 180px;">
                <img src="${App.getAssetPath('/assets/images/fundamentals.png')}" alt="Fundamentals" style="width: 100%; height: 100%; object-fit: cover;" />
                <span class="badge badge--violet absolute top-4 right-4" style="z-index: 2;">Beginner</span>
                <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(18,18,18,0.5) 0%, rgba(18,18,18,0) 100%); z-index: 1;"></div>
              </div>
              <div class="p-6">
                <span class="label text-accent">Keyboard Basics</span>
                <h3 class="h5 text-white mt-2 mb-3">Fundamentals</h3>
                <p class="body-xs text-secondary mb-4 clamp-3">Master the absolute basics of piano playing, finger posture, keyboard layouts, and scale warm-ups.</p>
              </div>
            </div>
            <div class="p-6 pt-0">
              <div class="flex justify-between items-center border-top pt-4">
                <span class="body-sm text-secondary">Duration</span>
                <span class="body-sm text-white font-bold">3 Months</span>
              </div>
              <a href="/register" class="btn btn--primary btn--sm w-full mt-6 text-center">Enroll Now</a>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="card hover\:scale overflow-hidden flex col justify-between">
            <div>
              <div class="relative overflow-hidden" style="height: 180px;">
                <img src="${App.getAssetPath('/assets/images/advanced.png')}" alt="Advanced Techniques" style="width: 100%; height: 100%; object-fit: cover;" />
                <span class="badge badge--violet absolute top-4 right-4" style="z-index: 2;">Intermediate</span>
                <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(18,18,18,0.5) 0%, rgba(18,18,18,0) 100%); z-index: 1;"></div>
              </div>
              <div class="p-6">
                <span class="label text-accent">Technique & Performance</span>
                <h3 class="h5 text-white mt-2 mb-3">Advanced Techniques</h3>
                <p class="body-xs text-secondary mb-4 clamp-3">Take your piano skills to the next level with advanced chord voicings, arpeggios, speed runs, and classical compositions.</p>
              </div>
            </div>
            <div class="p-6 pt-0">
              <div class="flex justify-between items-center border-top pt-4">
                <span class="body-sm text-secondary">Duration</span>
                <span class="body-sm text-white font-bold">6 Months</span>
              </div>
              <a href="/register" class="btn btn--primary btn--sm w-full mt-6 text-center">Enroll Now</a>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="card hover\:scale overflow-hidden flex col justify-between">
            <div>
              <div class="relative overflow-hidden" style="height: 180px;">
                <img src="${App.getAssetPath('/assets/images/theory.png')}" alt="Music Theory & Composition" style="width: 100%; height: 100%; object-fit: cover;" />
                <span class="badge badge--violet absolute top-4 right-4" style="z-index: 2;">Advanced</span>
                <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(18,18,18,0.5) 0%, rgba(18,18,18,0) 100%); z-index: 1;"></div>
              </div>
              <div class="p-6">
                <span class="label text-accent">Theory & Writing</span>
                <h3 class="h5 text-white mt-2 mb-3">Music Theory & Composition</h3>
                <p class="body-xs text-secondary mb-4 clamp-3">Delve deep into musical intervals, score composition, circle of fifths, scale modulations, and song writing.</p>
              </div>
            </div>
            <div class="p-6 pt-0">
              <div class="flex justify-between items-center border-top pt-4">
                <span class="body-sm text-secondary">Duration</span>
                <span class="body-sm text-white font-bold">4 Months</span>
              </div>
              <a href="/register" class="btn btn--primary btn--sm w-full mt-6 text-center">Enroll Now</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. FEE STRUCTURE -->
    <section class="section section--alt border-top border-bottom">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="eyebrow">Flexible Plans</span>
          <h2 class="section-header__title">Fee Structure</h2>
        </div>

        <div class="grid grid-3" style="gap: clamp(var(--sp-6), 6vw, var(--sp-12));">
          <!-- Free Pass -->
          <div class="card p-8 border bg-glass text-center flex col justify-between">
            <div>
              <span class="label text-tertiary">Beginner</span>
              <h3 class="h4 text-white mt-2 mb-4">Fundamentals</h3>
              <div class="mb-6 flex justify-center items-baseline gap-2"><span style="font-size: 2rem; font-weight: 700; font-family: var(--font-body); color: var(--white); letter-spacing: -.02em;">₹799</span><span style="font-size: 0.9rem; font-weight: 400; color: var(--text-secondary);">/mo</span></div>
              <ul class="flex col gap-3 text-sm text-secondary text-left mb-8">
                <li><span class="text-accent">&bull;</span> Basic posture & finger technique</li>
                <li><span class="text-accent">&bull;</span> Foundational scales and notation</li>
                <li><span class="text-accent">&bull;</span> 3 Months course length</li>
              </ul>
            </div>
            <a href="/register" class="btn btn--outline btn--sm w-full text-center">Enroll Now</a>
          </div>

          <!-- Course Pass -->
          <div class="card p-8 border bg-glass text-center flex col justify-between" style="border-color: var(--violet);">
            <div>
              <span class="badge badge--violet mb-2">Popular</span>
              <h3 class="h4 text-white mt-2 mb-4">Advanced Techniques</h3>
              <div class="mb-6 flex justify-center items-baseline gap-2"><span style="font-size: 2rem; font-weight: 700; font-family: var(--font-body); color: var(--violet); letter-spacing: -.02em;">₹999</span><span style="font-size: 0.9rem; font-weight: 400; color: var(--text-secondary);">/mo</span></div>
              <ul class="flex col gap-3 text-sm text-secondary text-left mb-8">
                <li><span class="text-accent">&bull;</span> Advanced chord shapes & composition</li>
                <li><span class="text-accent">&bull;</span> Speed drills and arpeggios</li>
                <li><span class="text-accent">&bull;</span> 6 Months course length</li>
                <li><span class="text-accent">&bull;</span> Course completion certificate</li>
              </ul>
            </div>
            <a href="/register" class="btn btn--primary btn--sm w-full text-center">Enroll Now</a>
          </div>

          <!-- All Access Pass -->
          <div class="card p-8 border bg-glass text-center flex col justify-between">
            <div>
              <span class="label text-tertiary">Advanced</span>
              <h3 class="h4 text-white mt-2 mb-4">Theory & Composition</h3>
              <div class="mb-6 flex justify-center items-baseline gap-2"><span style="font-size: 2rem; font-weight: 700; font-family: var(--font-body); color: var(--white); letter-spacing: -.02em;">₹1,499</span><span style="font-size: 0.9rem; font-weight: 400; color: var(--text-secondary);">/mo</span></div>
              <ul class="flex col gap-3 text-sm text-secondary text-left mb-8">
                <li><span class="text-accent">&bull;</span> Intervals, chord structure, scale theory</li>
                <li><span class="text-accent">&bull;</span> Songwriting & composition basics</li>
                <li><span class="text-accent">&bull;</span> 4 Months course length</li>
                <li><span class="text-accent">&bull;</span> Complete score sheets access</li>
              </ul>
            </div>
            <a href="/register" class="btn btn--outline btn--sm w-full text-center">Enroll Now</a>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. DURATION -->
    <section class="section">
      <div class="container">
        <div class="grid grid-2 items-center" style="gap: clamp(var(--sp-6), 6vw, var(--sp-16));">
          <div>
            <span class="eyebrow">Academic Commitment</span>
            <h2 class="h2 text-white mb-6">Paced For Steady Growth</h2>
            <p class="body-md text-secondary mb-6">
              Our masterclasses are structured modularly, giving you control over your practice timeline. We recommend dedicating 20 to 30 minutes of high-focus practice daily to see optimal development in muscle memory and score interpretation.
            </p>
            <ul class="flex col gap-4">
              <li class="flex items-center gap-3 text-sm text-secondary">
                <span class="text-accent"><svg class="icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:6px;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span>
                <span>Recommended: 20-30 mins daily practice</span>
              </li>
              <li class="flex items-center gap-3 text-sm text-secondary">
                <span class="text-accent"><svg class="icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:6px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>
                <span>Lifetime access: Practice entirely at your own pace</span>
              </li>
            </ul>
          </div>
          <div class="card p-8 border bg-overlay text-center">
            <h3 class="h5 text-white mb-6">Curriculum Durations</h3>
            <div class="flex col gap-4">
              <div class="flex justify-between border-bottom pb-3 text-sm">
                <span class="text-secondary">Piano Fundamentals:</span>
                <span class="text-white font-medium">4 Weeks (5 Hours)</span>
              </div>
              <div class="flex justify-between border-bottom pb-3 text-sm">
                <span class="text-secondary">Jazz Keyboard:</span>
                <span class="text-white font-medium">6 Weeks (6 Hours)</span>
              </div>
              <div class="flex justify-between pb-3 text-sm">
                <span class="text-secondary">Advanced Virtuoso:</span>
                <span class="text-white font-medium">8 Weeks (8 Hours)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. LEARNING OUTCOMES -->
    <section class="section section--alt border-top border-bottom">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="eyebrow">The Result</span>
          <h2 class="section-header__title">What You Will Accomplish</h2>
        </div>

        <div class="grid grid-3">
          <div class="card p-6 border bg-glass">
            <h4 class="h5 text-white mb-3">Read Sheets Effortlessly</h4>
            <p class="body-sm text-secondary">Decipher complex key signatures, dynamics, and notation patterns instantly on first-sight reads.</p>
          </div>
          <div class="card p-6 border bg-glass">
            <h4 class="h5 text-white mb-3">Construct Complex Chords</h4>
            <p class="body-sm text-secondary">Form 7th, 9th, 11th, and shell voicings across multiple scales to construct rich harmonic layers.</p>
          </div>
          <div class="card p-6 border bg-glass">
            <h4 class="h5 text-white mb-3">Improvise Melodies</h4>
            <p class="body-sm text-secondary">Break free from strict scores using blues scales and pentatonic runs to construct spontaneous solos.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. ENROLLMENT CTA -->
    <section class="section section--glow">
      <div class="container text-center py-8">
        <span class="eyebrow">Curriculum Enrollment</span>
        <h2 class="display-md text-white mb-6" style="font-size: clamp(var(--text-xl), 5vw, var(--text-4xl));">Start Your Learning Journey Today</h2>
        <p class="body-md text-secondary mb-12 mx-auto" style="max-width: 600px;">
          Join our premium online platform. Gain instant access to video syllabus tutorials, downloadable sheet notation, and progress tracking tools.
        </p>
        <div class="flex gap-4 sm\:flex-col w-full justify-center items-center">
          <a href="/register" class="btn btn--primary btn--lg w-fit text-center" style="min-width: 200px;">Register for Free</a>
          <a href="/contact" class="btn btn--outline btn--lg w-fit text-center" style="min-width: 200px;">Inquire About Fees</a>
        </div>
      </div>
    </section>
  `;

  app.innerHTML = App.wrapWithLayout(html);
  App.initNavbarScroll();
  App.highlightActiveLink('/courses');
});
