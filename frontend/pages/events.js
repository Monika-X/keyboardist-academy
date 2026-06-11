/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Events Page View
 *  frontend/pages/events.js
 * ============================================================
 */

'use strict';

Router.register('/events', async () => {
  const app = document.getElementById('app');
  if (!app) return;

  let events = [];
  try {
    const res = await Api.get('/events');
    events = res.data.events || [];
  } catch (err) {
    console.error('Failed to load events page:', err);
  }

  const html = `
    <!-- 1. HERO SECTION -->
    <section class="section section--glow relative" style="padding-top: calc(var(--section-md) + 2rem);">
      <div class="container text-center">
        <span class="eyebrow">Academy Calendar</span>
        <h1 class="display-lg text-gradient mb-6" style="font-size: clamp(var(--text-2xl), 6vw, var(--text-6xl)); line-height: 1.15;">
          Live Performance Recitals <br>& Masterclass Events
        </h1>
        <p class="body-lg text-secondary mx-auto mb-12" style="max-width: 700px; font-size: clamp(var(--text-sm), 2vw, var(--text-base));">
          Stay updated with upcoming virtual recitals, physical masterclasses, collaborative workshops, and live theory webinars.
        </p>
      </div>
    </section>

    <!-- 2. CONTENT GRID & 3. MEDIA SECTIONS (Modern Event Cards) -->
    <section class="section section--alt border-top border-bottom">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="eyebrow">Schedule</span>
          <h2 class="section-header__title">Upcoming Schedule</h2>
        </div>

        <div class="grid grid-3" style="gap: clamp(var(--sp-4), 4vw, var(--sp-8));">
          ${events.map(ev => `
            <div class="card hover\:scale overflow-hidden flex col justify-between">
              <div>
                <div class="relative bg-overlay flex items-center justify-center text-center" style="height: 180px; font-size: 48px;">
                  <svg class="icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                </div>
                <div class="p-6">
                  <span class="badge badge--violet mb-2">${Helpers.formatDate(ev.date)}</span>
                  <h3 class="h6 text-white mb-2">${ev.title}</h3>
                  <p class="body-xs text-secondary">${ev.description}</p>
                  <p class="body-xs text-tertiary mt-2">📍 ${ev.location}</p>
                </div>
              </div>
              <div class="p-6 pt-0">
                <span class="btn btn--outline btn--sm w-full pointer-none text-center">${Helpers.formatTime(ev.time)}</span>
              </div>
            </div>
          `).join('')}
          ${events.length === 0 ? `<div class="text-secondary text-center w-full py-8 col-span-3">No scheduled events.</div>` : ''}
        </div>
      </div>
    </section>

    <!-- 4. CALL TO ACTION -->
    <section class="section section--glow">
      <div class="container text-center py-8">
        <span class="eyebrow">Participation</span>
        <h2 class="display-md text-white mb-6" style="font-size: clamp(var(--text-xl), 5vw, var(--text-4xl));">Register for Upcoming Events</h2>
        <p class="body-md text-secondary mb-12 mx-auto" style="max-width: 600px;">
          Create a free student profile to get access credentials for our live streams and save seats for studio recitals.
        </p>
        <div class="flex gap-4 sm\:flex-col w-full justify-center items-center">
          <a href="/register" class="btn btn--primary btn--lg w-fit text-center" style="min-width: 200px;">Register Free</a>
          <a href="/contact" class="btn btn--outline btn--lg w-fit text-center" style="min-width: 200px;">Contact Organizer</a>
        </div>
      </div>
    </section>
  `;

  app.innerHTML = App.wrapWithLayout(html);
  App.initNavbarScroll();
  App.highlightActiveLink('/events');
});
