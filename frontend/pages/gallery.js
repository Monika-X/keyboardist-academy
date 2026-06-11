/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Gallery Page View
 *  frontend/pages/gallery.js
 * ============================================================
 */

'use strict';

Router.register('/gallery', async () => {
  const app = document.getElementById('app');
  if (!app) return;

  const html = `
    <!-- 1. HERO SECTION -->
    <section class="section section--glow relative" style="padding-top: calc(var(--section-md) + 2rem);">
      <div class="container text-center">
        <span class="eyebrow">Visual Tour</span>
        <h1 class="display-lg text-gradient mb-6" style="font-size: clamp(var(--text-2xl), 6vw, var(--text-6xl)); line-height: 1.15;">
          Inside Our Premium <br>Vienna Studios
        </h1>
        <p class="body-lg text-secondary mx-auto mb-12" style="max-width: 700px; font-size: clamp(var(--text-sm), 2vw, var(--text-base));">
          A visual showcase of our state-of-the-art concert Grand Pianos, learning suites, and physical class environments.
        </p>
      </div>
    </section>

    <!-- 2. CONTENT GRID & 3. MEDIA SECTIONS (Modern Gallery Cards) -->
    <section class="section section--alt border-top border-bottom">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="eyebrow">Studio Showcase</span>
          <h2 class="section-header__title">Images From Our Studios</h2>
        </div>

        <div class="grid grid-3" style="gap: clamp(var(--sp-4), 4vw, var(--sp-8));">
          <!-- Gallery Item 1 -->
          <div class="card hover\:scale overflow-hidden">
            <div class="relative bg-overlay flex items-center justify-center text-center" style="height: 220px; font-size: 48px;">
              <svg class="icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;"><rect x="2" y="3" width="20" height="18" rx="2" ry="2"/><line x1="6" y1="3" x2="6" y2="21"/><line x1="10" y1="3" x2="10" y2="21"/><line x1="14" y1="3" x2="14" y2="21"/><line x1="18" y1="3" x2="18" y2="21"/></svg>
            </div>
            <div class="p-6">
              <h3 class="h6 text-white mb-2">Steinway Concert Hall</h3>
              <p class="body-xs text-secondary">Our main recital studio equipped with two Steinway Grand Pianos.</p>
            </div>
          </div>

          <!-- Gallery Item 2 -->
          <div class="card hover\:scale overflow-hidden">
            <div class="relative bg-overlay flex items-center justify-center text-center" style="height: 220px; font-size: 48px;">
              <svg class="icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M12 1v11a4 4 0 0 0 8 0V1z"/><path d="M19 10v1a7 7 0 0 1-14 0v-1"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
            </div>
            <div class="p-6">
              <h3 class="h6 text-white mb-2">Digital Lab Suite</h3>
              <p class="body-xs text-secondary">Acoustic workstations used for recording student performance audios.</p>
            </div>
          </div>

          <!-- Gallery Item 3 -->
          <div class="card hover\:scale overflow-hidden">
            <div class="relative bg-overlay flex items-center justify-center text-center" style="height: 220px; font-size: 48px;">
              <svg class="icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="16"/><line x1="15" y1="22" x2="15" y2="16"/><line x1="9" y1="16" x2="15" y2="16"/><path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M12 6h.01M12 10h.01"/></svg>
            </div>
            <div class="p-6">
              <h3 class="h6 text-white mb-2">Practice Chamber</h3>
              <p class="body-xs text-secondary">Soundproof booths designed for individual distraction-free practice.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. CALL TO ACTION -->
    <section class="section section--glow">
      <div class="container text-center py-8">
        <span class="eyebrow">Campus Visit</span>
        <h2 class="display-md text-white mb-6" style="font-size: clamp(var(--text-xl), 5vw, var(--text-4xl));">Experience the Atmosphere In-Person</h2>
        <p class="body-md text-secondary mb-12 mx-auto" style="max-width: 600px;">
          Plan a physical tour of our Vienna campus, meet our faculty, and practice on our Steinway Grand Pianos.
        </p>
        <div class="flex gap-4 sm\:flex-col w-full justify-center items-center">
          <a href="/contact" class="btn btn--primary btn--lg w-fit text-center" style="min-width: 200px;">Schedule Studio Tour</a>
          <a href="/contact" class="btn btn--outline btn--lg w-fit text-center" style="min-width: 200px;">Inquire Admissions</a>
        </div>
      </div>
    </section>
  `;

  app.innerHTML = App.wrapWithLayout(html);
  App.initNavbarScroll();
  App.highlightActiveLink('/gallery');
});
