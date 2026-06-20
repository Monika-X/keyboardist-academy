/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Home Page (Premium SaaS UI)
 *  frontend/pages/home.js
 * ============================================================
 */

'use strict';

Router.register('/', async () => {
  const app = document.getElementById('app');
  if (!app) return;

  let events = [];
  try {
    const res = await Api.get('/events');
    events = res.data.events || [];
  } catch (err) {
    console.error('Failed to load events on home page:', err);
  }

  const html = `
    <!-- 1. HERO — Typography Driven -->
    <section class="section section--lg relative flex items-center min-h-screen">
      <div class="container text-center reveal">
        <h1 class="display-lg mb-6" style="font-size: clamp(var(--text-xl), 8vw, var(--text-6xl)); line-height: 1.15;">
          <span class="block text-secondary" style="white-space: nowrap;">Master the Piano.</span>
          <span class="block text-primary mt-2" style="white-space: nowrap;">Redefine your sound.</span>
        </h1>
        <p class="body-lg text-tertiary mx-auto mb-12" style="max-width: 600px;">
          From first chord to concert hall. Our conservatory-grade curriculum is built for serious musicians who refuse to compromise on quality.
        </p>
        <div class="flex flex-col md:flex-row justify-center items-center gap-4 w-full px-4">
          <a href="/courses" class="btn btn--primary btn--xl w-full md:w-auto" style="justify-content: center;">Begin Your Journey</a>
          <a href="/about" class="btn btn--ghost btn--xl w-full md:w-auto" style="justify-content: center;">Explore Curriculum</a>
        </div>
      </div>
    </section>

    <!-- 2. METRICS — Minimal Stats -->
    <section class="section border-top border-bottom">
      <div class="container">
        <div class="grid grid-4 text-center reveal stagger-children">
          <div>
            <div class="display-md text-primary mb-2">15+</div>
            <div class="text-xs text-secondary uppercase fw-semibold" style="letter-spacing: .08em;">Years Teaching</div>
          </div>
          <div>
            <div class="display-md text-primary mb-2">5,000+</div>
            <div class="text-xs text-secondary uppercase fw-semibold" style="letter-spacing: .08em;">Alumni Worldwide</div>
          </div>
          <div>
            <div class="display-md text-primary mb-2">120+</div>
            <div class="text-xs text-secondary uppercase fw-semibold" style="letter-spacing: .08em;">HD Masterclasses</div>
          </div>
          <div>
            <div class="display-md text-primary mb-2">4.9/5</div>
            <div class="text-xs text-secondary uppercase fw-semibold" style="letter-spacing: .08em;">Student Rating</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. CURRICULUM — Elegant Cards -->
    <section class="section section--lg">
      <div class="container">
        <div class="section-header reveal text-center mx-auto" style="max-width: 600px;">
          <div class="eyebrow mx-auto justify-center">Our Curriculum</div>
          <h2 class="display-md mb-4 text-primary">Featured Pathways</h2>
          <p class="body-lg text-secondary">Structured development for every stage of your musical journey.</p>
        </div>

        <div class="grid grid-3 reveal stagger-children mt-12">
          <!-- Card 1 -->
          <article class="card card--course flex flex-col" style="height: 100%;">
            <div class="card__media">
              <img src="${App.getAssetPath('/assets/images/fundamentals.png')}" alt="Fundamentals" loading="lazy">
            </div>
            <div class="card__body flex flex-col" style="flex: 1;">
              <div class="badge badge--subtle mb-4" style="align-self: center; width: max-content;">Beginner</div>
              <h3 class="h4 mb-2 text-primary">Keyboard Fundamentals</h3>
              <p class="body-sm text-secondary mb-6">Master the absolute basics of piano playing, posture, and scale warm-ups.</p>
              <div class="border-top pt-4 flex justify-between items-center" style="margin-top: auto; padding-top: var(--sp-4);">
                <span class="text-sm fw-medium text-primary">3 Months</span>
                <a href="/courses" class="text-sm fw-semibold text-violet transition">View Syllabus &rarr;</a>
              </div>
            </div>
          </article>
          
          <!-- Card 2 -->
          <article class="card card--course bg-raised flex flex-col" style="height: 100%;">
            <div class="card__media">
              <img src="${App.getAssetPath('/assets/images/advanced.png')}" alt="Advanced" loading="lazy">
            </div>
            <div class="card__body flex flex-col" style="flex: 1;">
              <div class="badge badge--violet mb-4" style="align-self: center; width: max-content;">Intermediate</div>
              <h3 class="h4 mb-2 text-primary">Advanced Techniques</h3>
              <p class="body-sm text-secondary mb-6">Take your piano skills to the next level with advanced chord voicings and speed runs.</p>
              <div class="border-top pt-4 flex justify-between items-center" style="margin-top: auto; padding-top: var(--sp-4);">
                <span class="text-sm fw-medium text-primary">6 Months</span>
                <a href="/courses" class="text-sm fw-semibold text-violet transition">View Syllabus &rarr;</a>
              </div>
            </div>
          </article>

          <!-- Card 3 -->
          <article class="card card--course">
            <div class="card__media">
              <img src="${App.getAssetPath('/assets/images/theory.png')}" alt="Theory" loading="lazy">
            </div>
            <div class="card__body flex flex-col" style="flex: 1;">
              <div class="badge badge--subtle mb-4" style="align-self: center; width: max-content;">Advanced</div>
              <h3 class="h4 mb-2 text-primary">Music Theory & Composition</h3>
              <p class="body-sm text-secondary mb-6">Delve deep into musical intervals, score composition, and song writing.</p>
              <div class="border-top pt-4 flex justify-between items-center" style="margin-top: auto; padding-top: var(--sp-4);">
                <span class="text-sm fw-medium text-primary">4 Months</span>
                <a href="/courses" class="text-sm fw-semibold text-violet transition">View Syllabus &rarr;</a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- 4. PHILOSOPHY — Typography Grid -->
    <section class="section section--lg bg-raised">
      <div class="container">
        <div class="grid grid-2 items-center gap-12 reveal">
          <div>
            <div class="eyebrow">Philosophy</div>
            <h2 class="display-md mb-6 text-primary">A Conservatory in Your Home.</h2>
            <p class="body-lg text-secondary mb-6">
              We believe that music education should be as refined as the art itself. Our curriculum was developed alongside experienced concert pianists and expert instructors.
            </p>
            <a href="/about" class="btn btn--secondary mt-4">Read Our Story</a>
          </div>
          <div class="grid grid-2 gap-6 stagger-children">
            <div class="card" style="padding: var(--sp-6);">
              <h4 class="h5 mb-2 text-primary">Structured</h4>
              <p class="body-sm text-tertiary">Progressive curriculum designed for tangible results.</p>
            </div>
            <div class="card" style="padding: var(--sp-6);">
              <h4 class="h5 mb-2 text-primary">Multi-Angle</h4>
              <p class="body-sm text-tertiary">Ultra-HD lesson recordings capture every technique.</p>
            </div>
            <div class="card" style="padding: var(--sp-6);">
              <h4 class="h5 mb-2 text-primary">Custom Sheets</h4>
              <p class="body-sm text-tertiary">PDF notation and MIDI backing tracks included.</p>
            </div>
            <div class="card" style="padding: var(--sp-6);">
              <h4 class="h5 mb-2 text-primary">Live Feedback</h4>
              <p class="body-sm text-tertiary">Masterclasses and direct feedback from instructors.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. TESTIMONIALS -->
    <section class="section section--lg">
      <div class="container text-center reveal">
        <div class="eyebrow mb-12 mx-auto justify-center">Student Stories</div>
        <div class="grid grid-2 text-left stagger-children mt-8">
          <div class="card" style="padding: var(--sp-8);">
            <p class="body-lg text-primary mb-8">"The C-major finger patterns and hand posture guides helped me correct bad habits I accumulated self-teaching for years. This is not a course — it is a transformation."</p>
            <div class="flex items-center gap-4 border-top" style="padding-top: var(--sp-6);">
              <div class="bg-raised text-sm fw-bold" style="display: flex; align-items: center; justify-content: center; min-width: 48px; width: 48px; height: 48px; border-radius: 50%; border: 1px solid var(--border-subtle); line-height: 1; text-align: center;">SA</div>
              <div>
                <div class="fw-semibold text-primary">Avadi Offline Course Alumnus</div>
                <div class="text-xs text-tertiary uppercase fw-semibold" style="letter-spacing: .08em;">Alumni 2023</div>
              </div>
            </div>
          </div>
          <div class="card" style="padding: var(--sp-8);">
            <p class="body-lg text-primary mb-8">"2-5-1 voicings, seventh chords, and the art of jazz feel — explained with more depth and clarity than anything I found in ten years of searching. Genuinely world-class."</p>
            <div class="flex items-center gap-4 border-top" style="padding-top: var(--sp-6);">
              <div class="bg-raised text-sm fw-bold" style="display: flex; align-items: center; justify-content: center; min-width: 48px; width: 48px; height: 48px; border-radius: 50%; border: 1px solid var(--border-subtle); line-height: 1; text-align: center;">IS</div>
              <div>
                <div class="fw-semibold text-primary">Online Jazz & Improvisation Student</div>
                <div class="text-xs text-tertiary uppercase fw-semibold" style="letter-spacing: .08em;">Alumni 2024</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. EVENTS -->
    <section class="section section--lg border-top border-bottom bg-raised">
      <div class="container reveal">
        <div class="section-header section-header--center">
          <span class="eyebrow">Live Masterclasses</span>
          <h2 class="section-header__title">Upcoming Events</h2>
        </div>
        <div class="flex flex-wrap justify-center stagger-children mt-8" style="gap: var(--sp-6);">
          ${events.slice(0, 3).map(ev => {
            const dateObj = new Date(ev.date);
            const monthShort = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
            const dayNum = dateObj.getDate().toString().padStart(2, '0');
            return `
              <div class="card" style="padding: var(--sp-6); width: 100%; max-width: 380px; flex: 1 1 300px;">
                <div class="flex justify-between items-start mb-6">
                  <div class="text-center bg-base border-subtle rounded-md" style="padding: var(--sp-2) var(--sp-3); border: 1px solid var(--border-subtle);">
                    <div class="text-xs text-violet fw-bold uppercase">${monthShort}</div>
                    <div class="h4 text-primary">${dayNum}</div>
                  </div>
                  <div class="badge badge--subtle">${ev.location}</div>
                </div>
                <h3 class="h5 mb-2 text-primary">${ev.title}</h3>
                <p class="body-sm text-tertiary mb-6 clamp-2">${ev.description}</p>
                <div class="text-xs text-secondary fw-medium border-top" style="padding-top: var(--sp-4);">${Helpers.formatTime(ev.time)}</div>
              </div>
            `;
          }).join('')}
          ${events.length === 0 ? `<p class="text-tertiary text-center w-full" style="grid-column: 1 / -1;">No scheduled events at this time.</p>` : ''}
        </div>
        <div class="text-center mt-12">
          <a href="/events" class="btn btn--primary">View Full Schedule &rarr;</a>
        </div>
      </div>
    </section>

    <!-- 7. CTA -->
    <section class="section section--lg text-center">
      <div class="container reveal">
        <h2 class="display-lg mb-6 text-primary">Begin your journey.</h2>
        <p class="body-lg text-secondary mx-auto mb-10" style="max-width: 500px;">Join thousands of pianists who chose the academy's path. Start your free trial today.</p>
        <div class="flex flex-col md:flex-row justify-center items-center gap-4 w-full px-4">
          <a href="/register" class="btn btn--primary btn--xl w-full md:w-auto" style="justify-content: center;">Start Free Trial</a>
          <a href="/contact" class="btn btn--ghost btn--xl w-full md:w-auto" style="justify-content: center;">Contact Admissions</a>
        </div>
      </div>
    </section>
  `;

  app.innerHTML = App.wrapWithLayout(html);
  App.initNavbarScroll();
  App.highlightActiveLink('/');

  // Re-init reveal after content injection
  Helpers.initReveal();
});
