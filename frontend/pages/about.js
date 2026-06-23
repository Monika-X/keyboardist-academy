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
    <section class="relative bg-base" style="padding-bottom: var(--section-xl);">
      <!-- Top Background Image -->
      <div style="position: relative; width: 100%; height: 70vh; min-height: 550px; overflow: hidden;">
        <img src="https://res.cloudinary.com/doij66qnv/image/upload/v1782228101/keyboardist-academy/assets/zl8uzqrfgqxddtscga3f.jpg" alt="Founder Background" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 25%; z-index: 0;">
        
        <!-- Gradient Overlay for Text Readability -->
        <div class="absolute inset-0" style="background: linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%); z-index: 1;"></div>
        
        <!-- Background Text Content -->
        <div class="relative w-full h-full flex col justify-center" style="z-index: 10; padding-bottom: 5vh; padding-left: clamp(1.5rem, 6vw, 8rem);">
          <div style="max-width: 600px;">
            <!-- Eyebrow -->
            <div class="flex items-center gap-6 mb-4">
              <span style="color: #d4af37; font-family: var(--font-body); font-weight: 300; font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase;">A Message from</span>
              <div style="height: 1px; width: 40px; background-color: #d4af37; opacity: 0.7;"></div>
            </div>
            
            <!-- Main Headline -->
            <h2 class="text-white mb-6" style="font-family: 'Bodoni Moda', 'Playfair Display', serif; font-size: clamp(2.5rem, 5vw, 4.5rem); font-weight: 500; line-height: 1.1; letter-spacing: -0.01em; text-shadow: 0 10px 30px rgba(0,0,0,0.3);">
              Our Founder
            </h2>
            
            <!-- Paragraph -->
            <p class="text-white" style="font-family: var(--font-body); font-weight: 300; opacity: 0.85; line-height: 1.8; font-size: 0.95rem; letter-spacing: 0.03em; max-width: 400px;">
              Driven by passion. Guided by purpose.<br>
              Committed to helping you become<br>
              the musician you’re meant to be.
            </p>
          </div>
        </div>
      </div>

      <!-- Floating Card -->
      <div class="container relative" style="margin-top: -10vh; z-index: 20;">
        <div style="background-color: #fcf9f2; border-radius: 1.5rem; box-shadow: 0 30px 60px rgba(0,0,0,0.15); padding: clamp(2.5rem, 5vw, 4rem); color: #2a2a2a;">
          
          <!-- Top Row (Split Content) -->
          <div class="grid grid-2 gap-12" style="border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 3rem; margin-bottom: 3rem; align-items: start;">
            
            <!-- Left Side (Name & Titles) -->
            <div style="border-right: 1px solid rgba(0,0,0,0.08); padding-right: 2rem; height: 100%;">
              <h3 style="font-family: 'Bodoni Moda', serif; font-size: clamp(2.5rem, 4vw, 3.5rem); font-weight: 400; color: #1a1a1a; line-height: 1.1; margin-bottom: 0.5rem;">
                Agilan T
              </h3>
              <div style="color: #c9a050; font-family: var(--font-body); font-weight: 600; font-size: 1.1rem; margin-bottom: 2.5rem;">
                Director
              </div>
              <h4 style="font-family: 'Bodoni Moda', serif; font-style: italic; font-size: clamp(1.5rem, 2.5vw, 2rem); color: #1a1a1a; line-height: 1.3; font-weight: 400;">
                Advanced Music Production &amp; Composing
              </h4>
            </div>

            <!-- Right Side (Quotes & Text) -->
            <div>
              <div class="flex items-start gap-3 mb-6">
                <span style="color: #c9a050; font-family: 'Bodoni Moda', serif; font-size: 3rem; line-height: 0.6;">&ldquo;</span>
                <h4 style="font-family: 'Bodoni Moda', serif; font-style: italic; font-size: clamp(1.4rem, 2vw, 1.8rem); color: #1a1a1a; font-weight: 400; margin-top: -0.2rem;">
                  Empowering Your Unique Musical Voice&rdquo;
                </h4>
              </div>
              <p style="font-family: var(--font-body); font-size: 0.95rem; line-height: 1.8; color: #4a4a4a; margin-bottom: 1.5rem;">
                We believe music is more than just mechanical notation; it is an art of creative expression. Our goal is to make conservatory-level training accessible, engaging, and highly rewarding for every student.
              </p>
              
              <div class="flex items-center gap-4 mb-4">
                <div style="height: 1px; flex: 1; background-color: rgba(0,0,0,0.05);"></div>
                <div style="width: 6px; height: 6px; border-radius: 50%; background-color: #c9a050; opacity: 0.5;"></div>
                <div style="height: 1px; flex: 1; background-color: rgba(0,0,0,0.05);"></div>
              </div>
              
              <div class="flex items-start gap-4">
                <div style="color: #c9a050; flex-shrink: 0; padding-top: 5px;">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/><path d="M13 17l2-2 4 4"/><path d="M13 13l2 2 4-4"/></svg>
                </div>
                <p style="font-family: var(--font-body); font-size: 0.95rem; line-height: 1.8; color: #4a4a4a;">
                  Our student dashboards, interactive study guides, and custom exercises are specifically optimized around modern keyboard pedagogy and progress feedback.
                </p>
              </div>
            </div>
            
          </div>

          <!-- Bottom Row (Features Grid) -->
          <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 2rem; text-align: center;">
            <!-- Feature 1 -->
            <div class="flex col items-center">
              <div style="color: #c9a050; margin-bottom: 1rem;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
              </div>
              <h5 style="font-family: 'Bodoni Moda', serif; font-size: 1rem; color: #1a1a1a; margin-bottom: 0.5rem; font-weight: 500;">Creative Excellence</h5>
              <p style="font-size: 0.8rem; color: #6a6a6a; line-height: 1.6;">Nurturing creativity through advanced musical training.</p>
            </div>
            <!-- Feature 2 -->
            <div class="flex col items-center relative">
              <div class="hidden md:block absolute" style="left: -1rem; top: 10%; bottom: 10%; width: 1px; background-color: rgba(0,0,0,0.05);"></div>
              <div style="color: #c9a050; margin-bottom: 1rem;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              </div>
              <h5 style="font-family: 'Bodoni Moda', serif; font-size: 1rem; color: #1a1a1a; margin-bottom: 0.5rem; font-weight: 500;">Conservatory-Level Training</h5>
              <p style="font-size: 0.8rem; color: #6a6a6a; line-height: 1.6;">Bringing world-class standards to every aspiring musician.</p>
            </div>
            <!-- Feature 3 -->
            <div class="flex col items-center relative">
              <div class="hidden md:block absolute" style="left: -1rem; top: 10%; bottom: 10%; width: 1px; background-color: rgba(0,0,0,0.05);"></div>
              <div style="color: #c9a050; margin-bottom: 1rem;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
              </div>
              <h5 style="font-family: 'Bodoni Moda', serif; font-size: 1rem; color: #1a1a1a; margin-bottom: 0.5rem; font-weight: 500;">Personalized Learning</h5>
              <p style="font-size: 0.8rem; color: #6a6a6a; line-height: 1.6;">Custom paths, exercises and feedback tailored to your growth.</p>
            </div>
            <!-- Feature 4 -->
            <div class="flex col items-center relative">
              <div class="hidden md:block absolute" style="left: -1rem; top: 10%; bottom: 10%; width: 1px; background-color: rgba(0,0,0,0.05);"></div>
              <div style="color: #c9a050; margin-bottom: 1rem;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
              </div>
              <h5 style="font-family: 'Bodoni Moda', serif; font-size: 1rem; color: #1a1a1a; margin-bottom: 0.5rem; font-weight: 500;">Progress & Performance</h5>
              <p style="font-size: 0.8rem; color: #6a6a6a; line-height: 1.6;">Track your progress, refine your skills and perform with confidence.</p>
            </div>
          </div>
          
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
          <a href="/admission" class="btn btn--primary btn--lg w-fit text-center" style="min-width: 200px;">Register Free</a>
          <a href="/contact" class="btn btn--outline btn--lg w-fit text-center" style="min-width: 200px;">Inquire Admissions</a>
        </div>
      </div>
    </section>
  `;

  app.innerHTML = App.wrapWithLayout(html);
  App.initNavbarScroll();
  App.highlightActiveLink('/about');
});
