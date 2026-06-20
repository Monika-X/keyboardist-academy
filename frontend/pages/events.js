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
    <section class="section  relative" style="padding-top: calc(var(--section-md) + 2rem);">
      <div class="container text-center">
        <span class="eyebrow">Academy Calendar</span>
        <h1 class="display-lg text-primary mb-6" style="font-size: clamp(var(--text-2xl), 6vw, var(--text-6xl)); line-height: 1.15;">
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

        <div class="flex flex-wrap justify-center stagger-children mt-8" style="gap: clamp(var(--sp-4), 4vw, var(--sp-8));">
          ${events.map((ev, i) => {
            const fallbackImages = [
              'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800',
              'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=800',
              'https://images.unsplash.com/photo-1470229722913-7c092fb12d59?auto=format&fit=crop&q=80&w=800'
            ];
            const fallbackSrc = fallbackImages[i % fallbackImages.length];
            return `
            <div class="card hover\:scale overflow-hidden flex col justify-between" style="width: 100%; max-width: 380px; flex: 1 1 300px;">
              <div>
                <div class="relative overflow-hidden flex items-center justify-center text-center bg-overlay" style="height: 180px;">
                  ${ev.imageUrl && ev.imageUrl !== 'default-event.webp' 
                    ? `<img src="${ev.imageUrl}" alt="${ev.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;" loading="lazy">`
                    : `<img src="${fallbackSrc}" alt="Academy Event" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;" loading="lazy">`
                  }
                </div>
                <div class="p-6">
                  <span class="badge badge--violet mb-2">${Helpers.formatDate(ev.date)}</span>
                  <h3 class="h6 text-primary mb-2">${ev.title}</h3>
                  <p class="body-xs text-secondary">${ev.description}</p>
                  <p class="body-xs text-tertiary mt-2">📍 ${ev.location}</p>
                </div>
              </div>
              <div class="p-6 pt-0">
                <span class="btn btn--outline btn--sm w-full pointer-none text-center">${Helpers.formatTime(ev.time)}</span>
              </div>
            </div>
            `;
          }).join('')}
          ${events.length === 0 ? `<div class="text-secondary text-center w-full py-8 col-span-3">No scheduled events.</div>` : ''}
        </div>
      </div>
    </section>

    <!-- 3. RECITAL ATTENDANCE & RSVP GUIDELINES -->
    <section class="section border-top border-bottom bg-raised">
      <div class="container text-center">
        <div class="section-header section-header--center">
          <span class="eyebrow">Guidelines</span>
          <h2 class="section-header__title">Concert Attendance & Recital Guidelines</h2>
        </div>
        <div class="grid grid-2" style="gap: clamp(var(--sp-6), 6vw, var(--sp-12));">
          <div class="card p-6 border bg-overlay">
            <h3 class="h6 text-primary mb-2">RSVP & Entry Requirements</h3>
            <p class="body-xs text-secondary">All recitals and masterclasses require prior registration. Registered students can obtain entry passes from their dashboard, and guests can RSVP via our contact form.</p>
          </div>
          <div class="card p-6 border bg-overlay">
            <h3 class="h6 text-primary mb-2">Webinar Participation</h3>
            <p class="body-xs text-secondary">Zoom links and security codes for online webinars are shared with registered candidates via email and dashboard announcements 1 hour before the session.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. CALL TO ACTION -->
    <section class="section ">
      <div class="container text-center py-8">
        <span class="eyebrow">Participation</span>
        <h2 class="display-md text-primary mb-6" style="font-size: clamp(var(--text-xl), 5vw, var(--text-4xl));">Register for Upcoming Events</h2>
        <p class="body-md text-secondary mb-12 mx-auto" style="max-width: 600px;">
          Create a free student profile to get access credentials for our live streams and save seats for studio recitals.
        </p>
        <div class="flex gap-4 sm\:flex-col w-full justify-center items-center">
          <a href="/contact" class="btn btn--primary btn--lg w-fit text-center" style="min-width: 200px;">Register Free</a>
          <a href="/contact" class="btn btn--outline btn--lg w-fit text-center" style="min-width: 200px;">Contact Organizer</a>
        </div>
      </div>
    </section>
  `;

  app.innerHTML = App.wrapWithLayout(html);
  App.initNavbarScroll();
  App.highlightActiveLink('/events');
  
  if (window.Helpers && window.Helpers.initReveal) {
    window.Helpers.initReveal();
  }
});
