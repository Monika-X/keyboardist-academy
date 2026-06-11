/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Faculty Page View
 *  frontend/pages/faculty.js
 * ============================================================
 */

'use strict';

Router.register('/faculty', async () => {
  const app = document.getElementById('app');
  if (!app) return;

  const html = `
    <!-- 1. HERO -->
    <section class="section section--glow relative" style="padding-top: calc(var(--section-md) + 2rem);">
      <div class="container text-center">
        <span class="eyebrow">Our Faculty</span>
        <h1 class="display-lg text-gradient mb-6" style="font-size: clamp(var(--text-2xl), 6vw, var(--text-6xl)); line-height: 1.15;">
          Learn from World-Class <br>Concert Pianists
        </h1>
        <p class="body-lg text-secondary mx-auto mb-12" style="max-width: 700px; font-size: clamp(var(--text-sm), 2vw, var(--text-base));">
          Our instructors are conservatory graduates, active recording artists, and passionate educators dedicated to helping you master the keys.
        </p>
      </div>
    </section>

    <!-- 2. FACULTY GRID -->
    <section class="section section--alt border-top border-bottom">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="eyebrow">The Roster</span>
          <h2 class="section-header__title">Meet the Instructors</h2>
        </div>

        <div class="grid grid-3">
          <!-- Faculty Card 1 -->
          <div class="card hover\:scale overflow-hidden flex col justify-between">
            <div>
              <div class="relative bg-overlay" style="height: 240px; display: flex; align-items: center; justify-content: center; color: var(--violet);"><svg class="icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;"><rect x="2" y="3" width="20" height="18" rx="2" ry="2"/><line x1="6" y1="3" x2="6" y2="21"/><line x1="10" y1="3" x2="10" y2="21"/><line x1="14" y1="3" x2="14" y2="21"/><line x1="18" y1="3" x2="18" y2="21"/></svg></div>
              <div class="p-6">
                <span class="label text-accent">Classical Piano</span>
                <h3 class="h5 text-white mt-2 mb-1">Ludwig Beethoven</h3>
                <p class="body-xs text-tertiary">Juilliard School &bull; 15 Years Exp</p>
                <p class="body-xs text-secondary mt-4">Specializes in Romantic technique, dynamic expression, and Chopin score interpretation.</p>
              </div>
            </div>
            <div class="p-6 pt-0">
              <a href="#profiles" class="btn btn--outline btn--sm w-full text-center">View Profile</a>
            </div>
          </div>

          <!-- Faculty Card 2 -->
          <div class="card hover\:scale overflow-hidden flex col justify-between">
            <div>
              <div class="relative bg-overlay" style="height: 240px; display: flex; align-items: center; justify-content: center; color: var(--violet);"><svg class="icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/></svg></div>
              <div class="p-6">
                <span class="label text-accent">Jazz Keyboard</span>
                <h3 class="h5 text-white mt-2 mb-1">Bill Evans</h3>
                <p class="body-xs text-tertiary">Berklee College &bull; 12 Years Exp</p>
                <p class="body-xs text-secondary mt-4">Specializes in shell voicings, secondary dominants, and contemporary modal jazz improvisation.</p>
              </div>
            </div>
            <div class="p-6 pt-0">
              <a href="#profiles" class="btn btn--outline btn--sm w-full text-center">View Profile</a>
            </div>
          </div>

          <!-- Faculty Card 3 -->
          <div class="card hover\:scale overflow-hidden flex col justify-between">
            <div>
              <div class="relative bg-overlay" style="height: 240px; display: flex; align-items: center; justify-content: center; color: var(--violet);"><svg class="icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div>
              <div class="p-6">
                <span class="label text-accent">Music Theory</span>
                <h3 class="h5 text-white mt-2 mb-1">Clara Schumann</h3>
                <p class="body-xs text-tertiary">Vienna Conservatory &bull; 10 Years Exp</p>
                <p class="body-xs text-secondary mt-4">Specializes in sheet score analysis, key signature recognition, and sight-reading dexterity.</p>
              </div>
            </div>
            <div class="p-6 pt-0">
              <a href="#profiles" class="btn btn--outline btn--sm w-full text-center">View Profile</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. FACULTY PROFILES & 4. EXPERIENCE & 5. ACHIEVEMENTS -->
    <section class="section" id="profiles">
      <div class="container flex col gap-16">
        <div class="section-header section-header--center">
          <span class="eyebrow">Faculty Profiles</span>
          <h2 class="section-header__title">Biographies & Experience</h2>
        </div>

        <!-- Instructor profile 1 -->
        <div class="grid grid-2 items-center" style="gap: clamp(var(--sp-6), 6vw, var(--sp-16));">
          <div class="card p-8 border bg-overlay text-center">
            <div style="font-size: 80px;" class="mb-4"><svg class="icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg></div>
            <h3 class="h4 text-white">Ludwig Beethoven</h3>
            <p class="body-xs text-accent uppercase font-bold tracking-wider mt-2">Principal Classical Instructor</p>
          </div>
          <div>
            <h3 class="h3 text-white mb-4">Background & Experience</h3>
            <p class="body-sm text-secondary mb-6">
              Ludwig holds a Master of Music degree in Piano Performance from the Juilliard School. He has performed as a soloist with orchestras across Europe and has spent over 15 years guiding intermediate and advanced pianists towards technical mastery.
            </p>
            <h4 class="h5 text-white mb-3">Key Achievements</h4>
            <ul class="flex col gap-2 text-sm text-secondary">
              <li><span class="text-accent">&bull;</span> Winner, Vienna International Piano Competition (2014)</li>
              <li><span class="text-accent">&bull;</span> Published technique manuals on Chopin Etudes interpretation</li>
              <li><span class="text-accent">&bull;</span> Trained over 500 students who successfully passed Grade 8 ABRSM</li>
            </ul>
          </div>
        </div>

        <div class="divider"></div>

        <!-- Instructor profile 2 -->
        <div class="grid grid-2 items-center" style="gap: clamp(var(--sp-6), 6vw, var(--sp-16));">
          <div>
            <h3 class="h3 text-white mb-4">Background & Experience</h3>
            <p class="body-sm text-secondary mb-6">
              Bill Evans earned his degree in Contemporary Keyboard from Berklee College of Music. An active recording jazz pianist, Bill specializes in breaking down complex modal concepts, voicing arrangements, and polyrhythms into logical, actionable exercises.
            </p>
            <h4 class="h5 text-white mb-3">Key Achievements</h4>
            <ul class="flex col gap-2 text-sm text-secondary">
              <li><span class="text-accent">&bull;</span> Recorded 5 studio jazz albums with local European trios</li>
              <li><span class="text-accent">&bull;</span> Hosted masterclass webinars with over 10,000 attendees</li>
              <li><span class="text-accent">&bull;</span> Consultant for conservatory jazz syllabus design</li>
            </ul>
          </div>
          <div class="card p-8 border bg-overlay text-center">
            <div style="font-size: 80px;" class="mb-4"><svg class="icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/></svg></div>
            <h3 class="h4 text-white">Bill Evans</h3>
            <p class="body-xs text-accent uppercase font-bold tracking-wider mt-2">Head of Jazz Department</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. CTA -->
    <section class="section section--glow border-top">
      <div class="container text-center py-8">
        <span class="eyebrow">Consultation</span>
        <h2 class="display-md text-white mb-6" style="font-size: clamp(var(--text-xl), 5vw, var(--text-4xl));">Learn with Our Expert Team</h2>
        <p class="body-md text-secondary mb-12 mx-auto" style="max-width: 600px;">
          Create a free account to access basic piano posture lessons, custom sheet notation files, and track your progress.
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
  App.highlightActiveLink('/faculty');
});
