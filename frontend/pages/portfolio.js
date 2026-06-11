/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Student Portfolio Page View
 *  frontend/pages/portfolio.js
 * ============================================================
 */

'use strict';

Router.register('/portfolio', async () => {
  const app = document.getElementById('app');
  if (!app) return;

  const html = `
    <!-- 1. FEATURED STUDENTS (Hero) -->
    <section class="section section--glow relative" style="padding-top: calc(var(--section-md) + 2rem);">
      <div class="container text-center">
        <span class="eyebrow">Student Portfolios</span>
        <h1 class="display-lg text-gradient mb-6" style="font-size: clamp(var(--text-2xl), 6vw, var(--text-6xl)); line-height: 1.15;">
          Showcasing Our <br>Talented Students
        </h1>
        <p class="body-lg text-secondary mx-auto mb-12" style="max-width: 700px; font-size: clamp(var(--text-sm), 2vw, var(--text-base));">
          Explore performances, audio recordings, certification accomplishments, and growth milestones achieved by our global academy community.
        </p>
      </div>
    </section>

    <!-- 2. VIDEO SHOWCASE (Modern Gallery Cards) -->
    <section class="section section--alt border-top border-bottom">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="eyebrow">Exhibitions</span>
          <h2 class="section-header__title">Video Performance Showcase</h2>
          <p class="section-header__desc">Watch students perform classical masterworks and spontaneous jazz standards.</p>
        </div>

        <div class="grid grid-3">
          <!-- Video Card 1 -->
          <div class="card hover\:scale overflow-hidden">
            <div class="relative bg-overlay flex items-center justify-center text-center" style="height: 180px;">
              <svg class="icon-svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--violet);"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>
            </div>
            <div class="p-6">
              <span class="badge badge--violet" style="display: inline-block; margin-bottom: 12px;">Chopin Nocturne Op. 9 No. 2</span>
              <h3 class="h6 text-white mb-2">Performed by Glenn Gould</h3>
              <p class="body-xs text-secondary">A meticulous interpretation focusing on balanced left-hand rhythms and right-hand expressiveness.</p>
            </div>
          </div>

          <!-- Video Card 2 -->
          <div class="card hover\:scale overflow-hidden">
            <div class="relative bg-overlay flex items-center justify-center text-center" style="height: 180px;">
              <svg class="icon-svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--violet);"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>
            </div>
            <div class="p-6">
              <span class="badge badge--violet" style="display: inline-block; margin-bottom: 12px;">Autumn Leaves Improvisation</span>
              <h3 class="h6 text-white mb-2">Performed by Herbie Hancock</h3>
              <p class="body-xs text-secondary">Exploring 2-5-1 shell voicings, custom triad pairs, and modern jazz rhythmic phrasing.</p>
            </div>
          </div>

          <!-- Video Card 3 -->
          <div class="card hover\:scale overflow-hidden">
            <div class="relative bg-overlay flex items-center justify-center text-center" style="height: 180px;">
              <svg class="icon-svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--violet);"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>
            </div>
            <div class="p-6">
              <span class="badge badge--violet" style="display: inline-block; margin-bottom: 12px;">Bach C-Major Prelude</span>
              <h3 class="h6 text-white mb-2">Performed by Mitsuko Uchida</h3>
              <p class="body-xs text-secondary">Emphasizing even finger curvature, articulation precision, and clean acoustic sustain pedal timing.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. AUDIO SHOWCASE -->
    <section class="section">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="eyebrow">Studio Recitals</span>
          <h2 class="section-header__title">Audio Recital Highlights</h2>
        </div>

        <div class="flex col gap-4" style="max-width: 800px; margin: 0 auto;">
          <div class="card p-6 border bg-glass flex justify-between items-center sm\:flex-col gap-4 text-left sm\:text-center">
            <div class="w-full">
              <h4 class="h5 text-white">Beethoven Pathétique Sonata (1st Mov)</h4>
              <p class="body-xs text-secondary mt-1">Piano: Arthur Rubinstein &bull; Recorded in Vienna Studio A</p>
            </div>
            <span class="badge badge--violet" style="font-size: 14px; flex-shrink: 0;"><svg class="icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:6px;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>Play Audio</span>
          </div>

          <div class="card p-6 border bg-glass flex justify-between items-center sm\:flex-col gap-4 text-left sm\:text-center">
            <div class="w-full">
              <h4 class="h5 text-white">Chords & Scale Modulation Study</h4>
              <p class="body-xs text-secondary mt-1">Piano: Bill Evans Jr &bull; Recorded in Studio B</p>
            </div>
            <span class="badge badge--violet" style="font-size: 14px; flex-shrink: 0;"><svg class="icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:6px;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>Play Audio</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. CERTIFICATES & 5. ACHIEVEMENTS -->
    <section class="section section--alt border-top border-bottom">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="eyebrow">Credentials</span>
          <h2 class="section-header__title">Certifications & Honors</h2>
          <p class="section-header__desc">Our graduates successfully clear ABRSM and Trinity Guildhall credentials with distinction.</p>
        </div>

        <div class="grid grid-3">
          <div class="card p-6 border bg-glass text-center">
            <div class="mb-4" style="color: var(--violet);"><svg class="icon-svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div>
            <h3 class="h5 text-white">ABRSM Grade 8</h3>
            <p class="body-xs text-secondary mt-2">12 graduates cleared advanced performance credentials with high distinctions in 2025.</p>
          </div>
          <div class="card p-6 border bg-glass text-center">
            <div class="mb-4" style="color: var(--violet);"><svg class="icon-svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg></div>
            <h3 class="h5 text-white">Vienna Recital Honors</h3>
            <p class="body-xs text-secondary mt-2">First prize honors awarded to our classical cohorts at the local Vienna Youth Piano Recital.</p>
          </div>
          <div class="card p-6 border bg-glass text-center">
            <div class="mb-4" style="color: var(--violet);"><svg class="icon-svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg></div>
            <h3 class="h5 text-white">Conservatory Admits</h3>
            <p class="body-xs text-secondary mt-2">3 alumni successfully admitted to prestigious classical conservatories for performance degrees.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. SUCCESS STORIES -->
    <section class="section">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="eyebrow">Case Studies</span>
          <h2 class="section-header__title">Student Success Stories</h2>
        </div>

        <div class="grid grid-2" style="gap: clamp(var(--sp-4), 4vw, var(--sp-8));">
          <div class="card p-8 border">
            <p class="body-base italic text-secondary mb-6" style="font-size: clamp(var(--text-xs), 2vw, var(--text-base));">
              "I struggled with stiffness in my pinky and ring fingers for years. The structured warmups and Chopin hand alignments unlocked my technical limit. Passed my conservatory audition with ease!"
            </p>
            <h4 class="body-md text-white font-semibold">&mdash; Glenn Gould</h4>
            <span class="body-xs text-tertiary">Juilliard School Admit</span>
          </div>

          <div class="card p-8 border">
            <p class="body-base italic text-secondary mb-6" style="font-size: clamp(var(--text-xs), 2vw, var(--text-base));">
              "Being self-taught, I was lost in scales and notation. The clear category pathways and video close-ups allowed me to read advanced scores comfortably in under 6 months."
            </p>
            <h4 class="body-md text-white font-semibold">&mdash; Mitsuko Uchida</h4>
            <span class="body-xs text-tertiary">ABRSM Grade 8 Distinctions</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. CTA -->
    <section class="section section--glow border-top">
      <div class="container text-center py-8">
        <span class="eyebrow">Join the Alumni</span>
        <h2 class="display-md text-white mb-6" style="font-size: clamp(var(--text-xl), 5vw, var(--text-4xl));">Build Your Piano Portfolio Today</h2>
        <p class="body-md text-secondary mb-12 mx-auto" style="max-width: 600px;">
          Create a free account to log your practice milestones, download score notation files, and submit performance reviews.
        </p>
        <div class="flex gap-4 sm\:flex-col w-full justify-center items-center">
          <a href="/register" class="btn btn--primary btn--lg w-fit text-center" style="min-width: 200px;">Register Free</a>
          <a href="/contact" class="btn btn--outline btn--lg w-fit text-center" style="min-width: 200px;">Contact Faculty</a>
        </div>
      </div>
    </section>
  `;

  app.innerHTML = App.wrapWithLayout(html);
  App.initNavbarScroll();
  App.highlightActiveLink('/portfolio');
});
