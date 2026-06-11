/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Home Page  (Premium Edition)
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

    <!-- ═══════════════════════════════════════════════════════
         1. HERO — Full-bleed editorial hero
         ═══════════════════════════════════════════════════ -->
    <section class="lux-hero">

      <!-- Ambient glow layers -->
      <div class="lux-hero__glow lux-hero__glow--tl" aria-hidden="true"></div>
      <div class="lux-hero__glow lux-hero__glow--br" aria-hidden="true"></div>

      <!-- Grid overlay texture -->
      <div class="lux-hero__grid" aria-hidden="true"></div>

      <!-- Top horizontal rule -->
      <div class="lux-hero__line" aria-hidden="true"></div>

      <div class="container lux-hero__inner">

        <!-- Left — editorial copy -->
        <div class="lux-hero__copy">

          <div class="lux-kicker animate-fade-in-up" style="animation-delay:.05s">
            <span class="lux-kicker__dot"></span>
            Premium Keyboard Education
          </div>

          <h1 class="lux-hero__title animate-fade-in-up" style="animation-delay:.15s">
            <span class="lux-hero__title-serif">Master the</span>
            <span class="lux-hero__title-accent">Piano.</span>
            <span class="lux-hero__title-serif">Redefine</span>
            <span class="lux-hero__title-light">your sound.</span>
          </h1>

          <p class="lux-hero__desc animate-fade-in-up" style="animation-delay:.25s">
            From first chord to concert hall. Our conservatory-grade
            curriculum is built for serious musicians who refuse to
            compromise on quality.
          </p>

          <div class="lux-hero__actions animate-fade-in-up" style="animation-delay:.35s">
            <a href="/courses" class="btn btn--primary btn--lg">
              Begin Your Journey
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="/about" class="lux-link">
              Our Philosophy
              <span class="lux-link__line"></span>
            </a>
          </div>

          <!-- Accreditation strip -->
          <div class="lux-trust animate-fade-in-up" style="animation-delay:.45s">
            <span class="lux-trust__item">
              <span class="lux-trust__num">15+</span>
              <span class="lux-trust__lbl">Years teaching</span>
            </span>
            <span class="lux-trust__sep" aria-hidden="true"></span>
            <span class="lux-trust__item">
              <span class="lux-trust__num">5,000+</span>
              <span class="lux-trust__lbl">Alumni worldwide</span>
            </span>
            <span class="lux-trust__sep" aria-hidden="true"></span>
            <span class="lux-trust__item">
              <span class="lux-trust__num">4.9 ★</span>
              <span class="lux-trust__lbl">Student rating</span>
            </span>
          </div>

        </div>

        <!-- Right — decorative visual panel -->
        <div class="lux-hero__visual animate-fade-in" style="animation-delay:.3s" aria-hidden="true">
          <div class="lux-visual-card">
            <div class="lux-visual-card__top">
              <div class="lux-visual-card__brand">
                <div class="lux-visual-card__mark"><svg class="icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;"><rect x="2" y="3" width="20" height="18" rx="2" ry="2"/><line x1="6" y1="3" x2="6" y2="21"/><line x1="10" y1="3" x2="10" y2="21"/><line x1="14" y1="3" x2="14" y2="21"/><line x1="18" y1="3" x2="18" y2="21"/></svg></div>
                <div>
                  <div class="lux-visual-card__name">Keyboardist</div>
                  <div class="lux-visual-card__sub">Academy</div>
                </div>
              </div>
              <span class="lux-visual-card__pill">Live Now</span>
            </div>

            <div class="lux-score">
              <div class="lux-score__staff">
                <div class="lux-score__line"></div>
                <div class="lux-score__line"></div>
                <div class="lux-score__line"></div>
                <div class="lux-score__line"></div>
                <div class="lux-score__line"></div>
              </div>
              <div class="lux-score__notes">
                <div class="lux-score__note lux-score__note--1"></div>
                <div class="lux-score__note lux-score__note--2"></div>
                <div class="lux-score__note lux-score__note--3"></div>
                <div class="lux-score__note lux-score__note--4"></div>
              </div>
            </div>

            <div class="lux-keys">
              <div class="lux-keys__track">
                <div class="lux-key lux-key--w"></div>
                <div class="lux-key lux-key--b"></div>
                <div class="lux-key lux-key--w"></div>
                <div class="lux-key lux-key--b"></div>
                <div class="lux-key lux-key--w"></div>
                <div class="lux-key lux-key--w"></div>
                <div class="lux-key lux-key--b"></div>
                <div class="lux-key lux-key--w"></div>
                <div class="lux-key lux-key--b"></div>
                <div class="lux-key lux-key--w"></div>
                <div class="lux-key lux-key--b"></div>
                <div class="lux-key lux-key--w"></div>
              </div>
            </div>

            <div class="lux-visual-card__bottom">
              <div class="lux-progress-bar">
                <div class="lux-progress-bar__fill"></div>
              </div>
              <div class="lux-visual-card__meta">
                <span>Chopin — Nocturne Op. 9</span>
                <span>Lesson 4 of 12</span>
              </div>
            </div>
          </div>

          <!-- Floating badge -->
          <div class="lux-float-badge" style="bottom: 80px !important; right: -24px !important;">
            <span class="lux-float-badge__num">98%</span>
            <span class="lux-float-badge__txt">Completion rate</span>
          </div>
        </div>

      </div>

      <!-- Scroll indicator -->
      <div class="lux-scroll-hint" aria-hidden="true">
        <div class="lux-scroll-hint__line"></div>
        <span>Scroll</span>
      </div>

    </section>


    <!-- ═══════════════════════════════════════════════════════
         2. MARQUEE — Social proof ticker
         ═══════════════════════════════════════════════════ -->
    <div class="lux-marquee" aria-hidden="true">
      <div class="lux-marquee__track">
        <span>Classical Piano</span><span class="lux-marquee__dot">·</span>
        <span>Jazz Keyboard</span><span class="lux-marquee__dot">·</span>
        <span>Conservatory Faculty</span><span class="lux-marquee__dot">·</span>
        <span>Live Masterclasses</span><span class="lux-marquee__dot">·</span>
        <span>Sheet Music Library</span><span class="lux-marquee__dot">·</span>
        <span>1-on-1 Coaching</span><span class="lux-marquee__dot">·</span>
        <span>Certificate Programs</span><span class="lux-marquee__dot">·</span>
        <span>MIDI Production</span><span class="lux-marquee__dot">·</span>
        <!-- Duplicate for seamless loop -->
        <span>Classical Piano</span><span class="lux-marquee__dot">·</span>
        <span>Jazz Keyboard</span><span class="lux-marquee__dot">·</span>
        <span>Conservatory Faculty</span><span class="lux-marquee__dot">·</span>
        <span>Live Masterclasses</span><span class="lux-marquee__dot">·</span>
        <span>Sheet Music Library</span><span class="lux-marquee__dot">·</span>
        <span>1-on-1 Coaching</span><span class="lux-marquee__dot">·</span>
        <span>Certificate Programs</span><span class="lux-marquee__dot">·</span>
        <span>MIDI Production</span><span class="lux-marquee__dot">·</span>
      </div>
    </div>


    <!-- ═══════════════════════════════════════════════════════
         3. ABOUT SPLIT — Editorial image + copy
         ═══════════════════════════════════════════════════ -->
    <section class="section lux-about">
      <div class="container lux-about__inner">

        <!-- Left — large decorative panel -->
        <div class="lux-about__visual reveal-left">
          <div class="lux-about__panel">
            <div class="lux-about__panel-icon"><svg class="icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="16"/><line x1="15" y1="22" x2="15" y2="16"/><line x1="9" y1="16" x2="15" y2="16"/><path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M12 6h.01M12 10h.01"/></svg></div>
            <div class="lux-about__panel-label">Est. 2009 · Vienna, Austria</div>

            <div class="lux-about__stat-pair">
              <div class="lux-about__stat">
                <span class="lux-about__stat-n">Juilliard</span>
                <span class="lux-about__stat-l">Accredited Faculty</span>
              </div>
              <div class="lux-about__stat">
                <span class="lux-about__stat-n">120+</span>
                <span class="lux-about__stat-l">HD Lesson Videos</span>
              </div>
            </div>
          </div>

          <!-- Small floating card -->
          <div class="lux-about__badge" style="top: 20% !important; bottom: auto !important; transform: translateY(-50%) !important; right: -56px !important; left: auto !important;">
            <span class="lux-about__badge-icon"><svg class="icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:8px;"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg></span>
            <div>
              <div class="lux-about__badge-title">Award-Winning</div>
              <div class="lux-about__badge-sub">Music Education Platform 2024</div>
            </div>
          </div>
        </div>

        <!-- Right — copy -->
        <div class="lux-about__copy reveal-right">
          <div class="lux-overline">Welcome to Keyboardist Academy</div>
          <h2 class="lux-section-title">
            A Conservatory<br>
            <em>in Your Home.</em>
          </h2>
          <p class="lux-body-lg">
            We believe that music education should be as refined as the art
            itself. Our curriculum was developed alongside concert pianists
            and Juilliard faculty to bring you a structured, intuitive path
            from first keystroke to masterful performance.
          </p>
          <p class="lux-body">
            Whether your goal is classical precision, jazz improvisation,
            or modern composition — our curriculum adapts to where you are
            and takes you to where you want to be.
          </p>

          <div class="lux-divider" aria-hidden="true"></div>

          <div class="lux-feature-row">
            <div class="lux-feature-item">
              <div class="lux-feature-item__icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <span>Structured, progressive curriculum</span>
            </div>
            <div class="lux-feature-item">
              <div class="lux-feature-item__icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <span>HD multi-angle lesson recordings</span>
            </div>
            <div class="lux-feature-item">
              <div class="lux-feature-item__icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <span>Custom sheet music &amp; MIDI files</span>
            </div>
            <div class="lux-feature-item">
              <div class="lux-feature-item__icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <span>Live masterclasses &amp; feedback</span>
            </div>
          </div>

          <a href="/about" class="btn btn--outline mt-8">Explore the Academy</a>
        </div>

      </div>
    </section>


    <!-- ═══════════════════════════════════════════════════════
         4. COURSES — Large editorial cards
         ═══════════════════════════════════════════════════ -->
    <section class="section lux-courses">

      <!-- Ambient background -->
      <div class="lux-courses__bg" aria-hidden="true"></div>

      <div class="container">

        <div class="lux-section-head reveal">
          <div>
            <div class="lux-overline">Our Curriculum</div>
            <h2 class="lux-section-title">Featured<br><em>Masterclasses</em></h2>
          </div>
          <a href="/courses" class="lux-link lux-link--sm">
            View all courses
            <span class="lux-link__line"></span>
          </a>
        </div>

        <div class="lux-course-grid stagger-children">

          <!-- Course 1 — Beginner -->
          <article class="lux-course-card">
            <div class="lux-course-card__visual" style="position: relative; height: 220px; overflow: hidden;">
              <img src="${App.getAssetPath('/assets/images/fundamentals.png')}" alt="Fundamentals" style="width: 100%; height: 100%; object-fit: cover;" />
              <div class="lux-course-card__level-tag" style="z-index: 2;">Beginner</div>
              <div class="lux-course-card__overlay" style="z-index: 1;"></div>
            </div>
            <div class="lux-course-card__body">
              <div class="lux-course-card__cat">Keyboard Basics</div>
              <h3 class="lux-course-card__title">Fundamentals</h3>
              <p class="lux-course-card__desc">Master the absolute basics of piano playing, finger posture, keyboard layouts, and scale warm-ups.</p>
              <div class="lux-course-card__meta">
                <span>3 Months Duration</span>
                <span class="lux-course-card__price">₹799/mo</span>
              </div>
              <a href="/courses" class="lux-course-card__cta">
                View Syllabus
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </article>

          <!-- Course 2 — Intermediate (featured) -->
          <article class="lux-course-card lux-course-card--featured">
            <div class="lux-course-card__visual" style="position: relative; height: 220px; overflow: hidden;">
              <img src="${App.getAssetPath('/assets/images/advanced.png')}" alt="Advanced Techniques" style="width: 100%; height: 100%; object-fit: cover;" />
              <div class="lux-course-card__level-tag lux-course-card__level-tag--gold" style="z-index: 2;">Intermediate</div>
              <div class="lux-course-card__overlay" style="z-index: 1;"></div>
            </div>
            <div class="lux-course-card__body">
              <div class="lux-course-card__cat">Technique & Performance</div>
              <h3 class="lux-course-card__title">Advanced Techniques</h3>
              <p class="lux-course-card__desc">Take your piano skills to the next level with advanced chord voicings, arpeggios, speed runs, and classical compositions.</p>
              <div class="lux-course-card__meta">
                <span>6 Months Duration</span>
                <span class="lux-course-card__price">₹999/mo</span>
              </div>
              <a href="/courses" class="lux-course-card__cta">
                View Syllabus
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </article>

          <!-- Course 3 — Advanced -->
          <article class="lux-course-card">
            <div class="lux-course-card__visual" style="position: relative; height: 220px; overflow: hidden;">
              <img src="${App.getAssetPath('/assets/images/theory.png')}" alt="Music Theory & Composition" style="width: 100%; height: 100%; object-fit: cover;" />
              <div class="lux-course-card__level-tag lux-course-card__level-tag--adv" style="z-index: 2;">Advanced</div>
              <div class="lux-course-card__overlay" style="z-index: 1;"></div>
            </div>
            <div class="lux-course-card__body">
              <div class="lux-course-card__cat">Theory & Writing</div>
              <h3 class="lux-course-card__title">Music Theory & Composition</h3>
              <p class="lux-course-card__desc">Delve deep into musical intervals, score composition, circle of fifths, scale modulations, and song writing.</p>
              <div class="lux-course-card__meta">
                <span>4 Months Duration</span>
                <span class="lux-course-card__price">₹1,499/mo</span>
              </div>
              <a href="/courses" class="lux-course-card__cta">
                View Syllabus
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </article>

        </div>
      </div>
    </section>


    <!-- ═══════════════════════════════════════════════════════
         5. METRICS — Large typographic numbers
         ═══════════════════════════════════════════════════ -->
    <section class="section lux-metrics">
      <div class="container">
        <div class="lux-metrics__grid stagger-children">
          <div class="lux-metric">
            <div class="lux-metric__n text-gradient">5,000<span>+</span></div>
            <div class="lux-metric__l">Alumni worldwide</div>
            <div class="lux-metric__bar"></div>
          </div>
          <div class="lux-metric">
            <div class="lux-metric__n text-gradient">120<span>+</span></div>
            <div class="lux-metric__l">HD lesson videos</div>
            <div class="lux-metric__bar"></div>
          </div>
          <div class="lux-metric">
            <div class="lux-metric__n text-gradient">98<span>%</span></div>
            <div class="lux-metric__l">Completion rate</div>
            <div class="lux-metric__bar"></div>
          </div>
          <div class="lux-metric">
            <div class="lux-metric__n text-gradient">4.9<span>★</span></div>
            <div class="lux-metric__l">Student rating</div>
            <div class="lux-metric__bar"></div>
          </div>
        </div>
      </div>
    </section>


    <!-- ═══════════════════════════════════════════════════════
         6. WHY US — Horizontal feature strips
         ═══════════════════════════════════════════════════ -->
    <section class="section lux-why section--alt">
      <div class="container">

        <div class="lux-section-head lux-section-head--left reveal">
          <div>
            <div class="lux-overline">The Academy Difference</div>
            <h2 class="lux-section-title">Why serious<br><em>pianists choose us.</em></h2>
          </div>
        </div>

        <div class="lux-why__list stagger-children">

          <div class="lux-why-item">
            <div class="lux-why-item__num" aria-hidden="true">01</div>
            <div class="lux-why-item__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            </div>
            <div class="lux-why-item__body">
              <h3 class="lux-why-item__title">Juilliard Faculty Coaching</h3>
              <p class="lux-why-item__desc">Guidance and curriculum crafted by active concert pianists and prestigious conservatory graduates who perform internationally.</p>
            </div>
            <div class="lux-why-item__arrow" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
            </div>
          </div>

          <div class="lux-why-item">
            <div class="lux-why-item__num" aria-hidden="true">02</div>
            <div class="lux-why-item__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            </div>
            <div class="lux-why-item__body">
              <h3 class="lux-why-item__title">Prismatic Multi-Angle Video</h3>
              <p class="lux-why-item__desc">Ultra-HD multi-camera angles capture hand position, wrist motion, and finger technique with surgical clarity.</p>
            </div>
            <div class="lux-why-item__arrow" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
            </div>
          </div>

          <div class="lux-why-item">
            <div class="lux-why-item__num" aria-hidden="true">03</div>
            <div class="lux-why-item__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
            </div>
            <div class="lux-why-item__body">
              <h3 class="lux-why-item__title">Custom Sheet Music & MIDI</h3>
              <p class="lux-why-item__desc">Every lesson ships with custom PDF notation, MIDI backing tracks, and exercise sheets tailored to accelerate your practice.</p>
            </div>
            <div class="lux-why-item__arrow" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
            </div>
          </div>

        </div>
      </div>
    </section>


    <!-- ═══════════════════════════════════════════════════════
         7. TESTIMONIALS — Full-width quote block
         ═══════════════════════════════════════════════════ -->
    <section class="section lux-testimonials">

      <div class="lux-testimonials__bg" aria-hidden="true"></div>

      <div class="container">
        <div class="lux-overline text-center reveal">Student Stories</div>

        <div class="lux-testimonials__grid stagger-children">

          <blockquote class="lux-quote">
            <div class="lux-quote__mark" aria-hidden="true">"</div>
            <p class="lux-quote__text">
              The C-major finger patterns and hand posture guides helped me correct bad habits I
              accumulated self-teaching for years. This is not a course — it is a
              <em>transformation.</em>
            </p>
            <footer class="lux-quote__author">
              <div class="lux-quote__avatar" aria-hidden="true">AR</div>
              <div>
                <div class="lux-quote__name">Arthur Rubinstein</div>
                <div class="lux-quote__role">Beginner · Alumni 2023</div>
              </div>
            </footer>
          </blockquote>

          <blockquote class="lux-quote lux-quote--alt">
            <div class="lux-quote__mark" aria-hidden="true">"</div>
            <p class="lux-quote__text">
              2-5-1 voicings, seventh chords, and the art of jazz feel — explained
              with more depth and clarity than anything I found in ten years of searching.
              <em>Genuinely world-class.</em>
            </p>
            <footer class="lux-quote__author">
              <div class="lux-quote__avatar" aria-hidden="true">CS</div>
              <div>
                <div class="lux-quote__name">Clara Schumann</div>
                <div class="lux-quote__role">Intermediate · Alumni 2024</div>
              </div>
            </footer>
          </blockquote>

        </div>
      </div>
    </section>


    <!-- ═══════════════════════════════════════════════════════
         8. EVENTS — Timeline strip
         ═══════════════════════════════════════════════════ -->
    <section class="section section--alt lux-events">
      <div class="container">

        <div class="lux-section-head reveal">
          <div>
            <div class="lux-overline">Masterclass Schedule</div>
            <h2 class="lux-section-title">Upcoming<br><em>Live Events</em></h2>
          </div>
          <a href="/events" class="lux-link lux-link--sm">
            All events
            <span class="lux-link__line"></span>
          </a>
        </div>

        <div class="lux-event-list stagger-children">
          ${events.slice(0, 3).map(ev => {
            const dateObj = new Date(ev.date);
            const monthShort = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
            const dayNum = dateObj.getDate().toString().padStart(2, '0');
            return `
              <div class="lux-event">
                <div class="lux-event__date">
                  <span class="lux-event__month">${monthShort}</span>
                  <span class="lux-event__day">${dayNum}</span>
                </div>
                <div class="lux-event__body">
                  <div class="lux-event__tag">${ev.location}</div>
                  <h3 class="lux-event__title">${ev.title}</h3>
                  <p class="lux-event__desc">${ev.description}</p>
                </div>
                <div class="lux-event__time">${Helpers.formatTime(ev.time)}</div>
              </div>
            `;
          }).join('')}
          ${events.length === 0 ? `<div class="text-secondary text-center w-full py-8">No scheduled events.</div>` : ''}
        </div>
      </div>
    </section>


    <!-- ═══════════════════════════════════════════════════════
         9. CTA — Full-bleed enrollment section
         ═══════════════════════════════════════════════════ -->
    <section class="lux-cta">
      <div class="lux-cta__glow" aria-hidden="true"></div>
      <div class="lux-cta__grid" aria-hidden="true"></div>

      <div class="container lux-cta__inner reveal">
        <div class="lux-overline text-center">Enrollment Open</div>
        <h2 class="lux-cta__title">
          Your musical journey<br>
          <em>begins today.</em>
        </h2>
        <p class="lux-cta__desc">
          Join thousands of pianists who chose the academy's path.
          Free starter lessons. No credit card required.
        </p>
        <div class="lux-cta__actions">
          <a href="/register" class="btn btn--primary btn--xl">
            Begin for Free
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="/contact" class="btn btn--outline btn--xl">Contact Admissions</a>
        </div>
        <p class="lux-cta__note">No commitment. Cancel anytime. Trusted by 5,000+ students.</p>
      </div>
    </section>

  `;

  app.innerHTML = App.wrapWithLayout(html);
  App.initNavbarScroll();
  App.highlightActiveLink('/');

  // Re-init reveal after content injection
  Helpers.initReveal();
});
