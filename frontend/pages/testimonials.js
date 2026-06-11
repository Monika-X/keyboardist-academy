/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Testimonials Page View
 *  frontend/pages/testimonials.js
 * ============================================================
 */

'use strict';

Router.register('/testimonials', async () => {
  const app = document.getElementById('app');
  if (!app) return;

  const html = `
    <!-- 1. HERO SECTION -->
    <section class="section section--glow relative" style="padding-top: calc(var(--section-md) + 2rem);">
      <div class="container text-center">
        <span class="eyebrow">Student Stories</span>
        <h1 class="display-lg text-gradient mb-6" style="font-size: clamp(var(--text-2xl), 6vw, var(--text-6xl)); line-height: 1.15;">
          What Our Global Alumni <br>Say About Us
        </h1>
        <p class="body-lg text-secondary mx-auto mb-12" style="max-width: 700px; font-size: clamp(var(--text-sm), 2vw, var(--text-base));">
          Discover how structured methods, pristine camera guides, and conservatory coaches helped students achieve technical confidence.
        </p>
      </div>
    </section>

    <!-- 2. CONTENT GRID & 3. MEDIA SECTIONS (Modern Testimonial Cards) -->
    <section class="section section--alt border-top border-bottom">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="eyebrow">Testimonials</span>
          <h2 class="section-header__title">Student Success Stories</h2>
        </div>

        <div class="grid grid-3" style="gap: clamp(var(--sp-4), 4vw, var(--sp-8));">
          <!-- Testimonial 1 -->
          <div class="card p-6 border bg-glass flex col justify-between">
            <div>
              <div class="rating mb-4">
                <span class="rating__stars">★★★★★</span>
              </div>
              <p class="body-xs italic text-secondary mb-6">
                "The C-major finger patterns and hand posture guides helped me correct minor bad habits I accumulated while trying to self-teach. This course is an absolute masterpiece."
              </p>
            </div>
            <div>
              <h4 class="body-md text-white font-semibold">Arthur Rubinstein</h4>
              <span class="body-xs text-tertiary">Beginner Alumni</span>
            </div>
          </div>

          <!-- Testimonial 2 -->
          <div class="card p-6 border bg-glass flex col justify-between">
            <div>
              <div class="rating mb-4">
                <span class="rating__stars">★★★★★</span>
              </div>
              <p class="body-xs italic text-secondary mb-6">
                "Learning scales, 2-5-1 voicings, and seventh chords has never been this simple. I feel so much more comfortable sitting at my keyboard and just playing."
              </p>
            </div>
            <div>
              <h4 class="body-md text-white font-semibold">Clara Schumann</h4>
              <span class="body-xs text-tertiary">Intermediate Alumni</span>
            </div>
          </div>

          <!-- Testimonial 3 -->
          <div class="card p-6 border bg-glass flex col justify-between">
            <div>
              <div class="rating mb-4">
                <span class="rating__stars">★★★★★</span>
              </div>
              <p class="body-xs italic text-secondary mb-6">
                "Passed my Grade 8 performance exam with distinctions! The Chopin technique guide clarified rubato timings and dynamic expressions beautifully."
              </p>
            </div>
            <div>
              <h4 class="body-md text-white font-semibold">Franz Liszt</h4>
              <span class="body-xs text-tertiary">Advanced Alumni</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. CALL TO ACTION -->
    <section class="section section--glow">
      <div class="container text-center py-8">
        <span class="eyebrow">Your Story Starts Here</span>
        <h2 class="display-md text-white mb-6" style="font-size: clamp(var(--text-xl), 5vw, var(--text-4xl));">Write Your Own Musical Story</h2>
        <p class="body-md text-secondary mb-12 mx-auto" style="max-width: 600px;">
          Create a free account to log your practice milestones, download score notation files, and submit performance reviews.
        </p>
        <div class="flex gap-4 sm\:flex-col w-full justify-center items-center">
          <a href="/register" class="btn btn--primary btn--lg w-fit text-center" style="min-width: 200px;">Register Free</a>
          <a href="/contact" class="btn btn--outline btn--lg w-fit text-center" style="min-width: 200px;">Inquire Admissions</a>
        </div>
      </div>
    </section>
  `;

  app.innerHTML = App.wrapWithLayout(html);
  App.initNavbarScroll();
  App.highlightActiveLink('/testimonials');
});
