/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — About Academy Page View
 *  frontend/pages/about.js
 * ============================================================
 */

'use strict';

Router.register('/about', async () => {
  const app = document.getElementById('app');
  if (!app) return;

  const html = `
    <!-- 1. ACADEMY STORY -->
    <section class="section  relative" style="padding-top: calc(var(--section-md) + 2rem);">
      <div class="container text-center">
        <span class="eyebrow mb-4">Our Story</span>
        <h1 class="display-lg text-primary mb-6" style="font-size: clamp(var(--text-2xl), 6vw, var(--text-6xl)); line-height: 1.15;">
          Cultivating Musical Excellence <br>Across the Globe
        </h1>
        <p class="body-lg text-secondary mx-auto mb-12" style="max-width: 700px; font-size: clamp(var(--text-sm), 2vw, var(--text-lg));">
          Keyboardist Academy emerged from a desire to combine traditional training rigor with cutting-edge, accessible digital pedagogy. We help students unlock authentic musical freedom.
        </p>
      </div>
    </section>

    <!-- 2. VISION & 3. MISSION -->
    <section class="section section--alt border-top border-bottom">
      <div class="container grid grid-2" style="gap: clamp(var(--sp-6), 6vw, var(--sp-12));">
        <!-- Vision -->
        <div class="card p-8 border bg-overlay border-subtle flex col justify-between">
          <div>
            <div style="color: var(--violet); margin-bottom: 1rem;"><svg class="icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></div>
            <h2 class="h3 text-primary mb-4">Our Vision</h2>
            <p class="body-sm text-secondary">
              To be the premier global destination for online keyboard instruction, bridging the gap between mechanical dexterity and artistic expression. We envision a community of inspired, self-sufficient keyboardists who play with confidence and deep emotional clarity.
            </p>
          </div>
        </div>
        <!-- Mission -->
        <div class="card p-8 border bg-overlay border-subtle flex col justify-between">
          <div>
            <div style="color: var(--violet); margin-bottom: 1rem;"><svg class="icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></div>
            <h2 class="h3 text-primary mb-4">Our Mission</h2>
            <p class="body-sm text-secondary">
              To demystify keyboard learning through structured curriculums, pristine HD close-up video tutorials, and dedicated practice files. We aim to make conservatory-level pedagogy accessible, encouraging consistent, perfect practice methods.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. FOUNDER MESSAGE -->
    <section class="section">
      <div class="container grid grid-2 items-center" style="gap: clamp(var(--sp-6), 6vw, var(--sp-16));">
        <div class="relative w-full overflow-hidden" style="border-radius: var(--radius-xl); border: 1px solid var(--border-default); aspect-ratio: 4/5;">
          <img src="${App.getAssetPath('/assets/images/founder_new.jpg')}" alt="Founder Agilan" style="width: 100%; height: 100%; object-fit: cover;" / loading="lazy">
          <div class="absolute bottom-0 left-0 right-0 p-6" style="background: linear-gradient(to top, rgba(18,18,18,0.95) 0%, rgba(18,18,18,0) 100%); text-align: left;">
            <h3 style="font-family: 'Oswald', sans-serif; font-weight: 600; font-size: clamp(1.5rem, 4vw, 2.5rem); color: var(--white); line-height: 1.1; margin-bottom: 0.5rem; letter-spacing: 0;">Agilan T</h3>
            <p style="font-family: var(--font-body); font-weight: 300; font-size: var(--text-md); color: rgba(255,255,255,0.8); margin-bottom: 0.75rem;">Director</p>
            <p style="font-family: var(--font-display); font-style: italic; font-size: var(--text-lg); color: var(--white); line-height: 1.4; font-variation-settings: 'opsz' 14;">Advanced Music<br>Production &<br>Composing</p>
          </div>
        </div>
        <div>
          <span class="eyebrow">A Message from Our Founder</span>
          <h2 class="h2 text-primary mb-6" style="font-size: clamp(var(--text-xl), 4vw, var(--text-4xl));">"Empowering Your Unique Musical Voice"</h2>
          <p class="body-md text-secondary mb-6 italic">
            "We believe music is more than just mechanical notation; it is an art of creative expression. Our goal is to make conservatory-level training accessible, engaging, and highly rewarding for every student."
          </p>
          <p class="body-sm text-tertiary mb-6">
            Our student dashboards, interactive study guides, and custom exercises are specifically optimized around modern keyboard pedagogy and progress feedback.
          </p>
          <div style="width: 80px; height: 1px; background: var(--violet); margin-top: var(--sp-6);"></div>
        </div>
      </div>
    </section>

    <!-- 5. TEACHING PHILOSOPHY -->
    <section class="section section--alt border-top border-bottom">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="eyebrow">The Method</span>
          <h2 class="section-header__title">Our Teaching Philosophy</h2>
          <p class="section-header__desc">Curriculum methodologies focused on building organic technique and self-sufficient musicality.</p>
        </div>

        <div class="grid grid-3">
          <div class="card p-6 border bg-overlay border-subtle">
            <h3 class="h5 text-primary mb-4">Structured Dexterity</h3>
            <p class="body-sm text-secondary">
              We focus on building strength and independence in weaker fingers (like the 4th and 5th) early on, using techniques inspired by Chopin and Liszt.
            </p>
          </div>
          <div class="card p-6 border bg-overlay border-subtle">
            <h3 class="h5 text-primary mb-4">Harmonic Visualization</h3>
            <p class="body-sm text-secondary">
              We teach how to visualize chord shapes, intervals, and key scale zones instantly, rather than rote mechanical memorization.
            </p>
          </div>
          <div class="card p-6 border bg-overlay border-subtle">
            <h3 class="h5 text-primary mb-4">Ear-First Integration</h3>
            <p class="body-sm text-secondary">
              Music is an auditory art. We train students to hear intervals, chord extensions, and melodies before converting them to sheets.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. STUDENT SUCCESS -->
    <section class="section">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="eyebrow">Our Alumni</span>
          <h2 class="section-header__title">Student Accomplishments</h2>
        </div>
        <div class="grid grid-2" style="gap: clamp(var(--sp-4), 4vw, var(--sp-8));">
          <div class="card p-8 border">
            <span class="badge badge--violet mb-4">Advanced Level</span>
            <p class="body-base italic text-secondary mb-6" style="font-size: clamp(var(--text-xs), 2vw, var(--text-base));">
              "Thanks to the advanced Chopin technique guide, I finally understood how to perform rubato cleanly without dragging the tempo. Successfully completed my performance level assessment!"
            </p>
            <h4 class="body-md text-primary font-semibold">&mdash; Chennai Offline Student</h4>
            <span class="body-xs text-tertiary">Classical Student</span>
          </div>
          <div class="card p-8 border">
            <span class="badge badge--violet mb-4">Jazz Improvisation Honors</span>
            <p class="body-base italic text-secondary mb-6" style="font-size: clamp(var(--text-xs), 2vw, var(--text-base));">
              "The Jazz Harmony section completely transformed my playing. I was stuck replicating sheet music for years; now I can improvise chord variations over standard progressions easily."
            </p>
            <h4 class="body-md text-primary font-semibold">&mdash; Improvisation Alumnus</h4>
            <span class="body-xs text-tertiary">Jazz Keyboard Student</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. ACADEMY MILESTONES -->
    <section class="section section--alt border-top">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="eyebrow">Our Journey</span>
          <h2 class="section-header__title">Academy Milestones</h2>
        </div>

        <div class="flex col gap-8 mx-auto w-full" style="max-width: 800px; position: relative;">
          <!-- Timeline Vertical line in CSS background -->
          <div class="card p-6 border flex sm\:flex-col gap-6 bg-overlay border-subtle items-center w-full">
            <div style="font-size: 32px; font-weight: var(--fw-bold); color: var(--violet);" class="flex-shrink-0">2020</div>
            <div class="flex-1 text-left">
              <h3 class="h5 text-primary">Academy Founded</h3>
              <p class="body-xs text-secondary mt-1">Launched Keyboardist Academy in Avadi with a single classical syllabus and local keyboard students.</p>
            </div>
          </div>

          <div class="card p-6 border flex sm\:flex-col gap-6 bg-overlay border-subtle items-center w-full">
            <div style="font-size: 32px; font-weight: var(--fw-bold); color: var(--violet);" class="flex-shrink-0">2022</div>
            <div class="flex-1 text-left">
              <h3 class="h5 text-primary">Digital Platform Launch</h3>
              <p class="body-xs text-secondary mt-1">Migrated our curriculum online, introducing multi-angle HD lessons, student dashboard, and automated progress tools.</p>
            </div>
          </div>

          <div class="card p-6 border flex sm\:flex-col gap-6 bg-overlay border-subtle items-center w-full">
            <div style="font-size: 32px; font-weight: var(--fw-bold); color: var(--violet);" class="flex-shrink-0">2024</div>
            <div class="flex-1 text-left">
              <h3 class="h5 text-primary">Improvisation Department Open</h3>
              <p class="body-xs text-secondary mt-1">Expanded our syllabus to build out contemporary and jazz keyboard improvisational branches.</p>
            </div>
          </div>

          <div class="card p-6 border flex sm\:flex-col gap-6 bg-overlay border-subtle items-center w-full">
            <div style="font-size: 32px; font-weight: var(--fw-bold); color: var(--violet);" class="flex-shrink-0">2026</div>
            <div class="flex-1 text-left">
              <h3 class="h5 text-primary">5,000+ Enrolled Students</h3>
              <p class="body-xs text-secondary mt-1">Celebrating our global community of pianists practicing structured, keyboard methods daily.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 8. CALL TO ACTION -->
    <section class="section border-top">
      <div class="container text-center py-8">
        <h2 class="display-md text-primary mb-6" style="font-size: clamp(var(--text-xl), 5vw, var(--text-4xl));">Start Your Musical Journey Today</h2>
        <p class="body-md text-secondary mb-12 mx-auto" style="max-width: 600px;">
          Join Keyboardist Academy to learn structured, conservatory-grade methods paced around your schedule.
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
  App.highlightActiveLink('/about');
});
