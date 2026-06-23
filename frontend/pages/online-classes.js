/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Online Classes Page View
 *  frontend/pages/online-classes.js
 * ============================================================
 */

'use strict';

Router.register('/online-classes', async () => {
  const app = document.getElementById('app');
  if (!app) return;

  // Fetch live stream links from settings API (fail gracefully if not set)
  const [ytRes, fbRes, igRes, studioRes] = await Promise.all([
    Api.get('/settings/live_youtube').catch(() => null),
    Api.get('/settings/live_facebook').catch(() => null),
    Api.get('/settings/live_instagram').catch(() => null),
    Api.get('/settings/live_studio_name').catch(() => null),
  ]);

  const liveYT     = ytRes?.data?.setting?.value     || '';
  const liveFB     = fbRes?.data?.setting?.value     || '';
  const liveIG     = igRes?.data?.setting?.value     || '';
  const studioName = studioRes?.data?.setting?.value || 'Our Studio';

  const hasAnyLive = liveYT || liveFB || liveIG;

  // Build a styled join-live button
  const buildLiveButton = (url, platform, icon, color) => {
    if (!url) return '';
    return `
      <a href="${url}" target="_blank" rel="noopener noreferrer"
        style="display: inline-flex; align-items: center; gap: 10px; padding: 11px 22px; border-radius: 8px; background: ${color}; color: #fff; font-weight: 600; font-size: 0.9rem; text-decoration: none; transition: opacity .2s ease; width: 100%; max-width: 240px; justify-content: center;"
        onmouseover="this.style.opacity='.82'" onmouseout="this.style.opacity='1'">
        ${icon}
        Join on ${platform}
      </a>`;
  };

  const ytIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/></svg>`;
  const fbIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`;
  const igIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`;

  const liveBroadcastCard = hasAnyLive ? `
    <div class="relative w-full" style="background: var(--surface-2); border-radius: var(--radius-xl); padding: clamp(var(--sp-6), 5vw, var(--sp-10)); border: 1px solid var(--border-violet); text-align: center; box-shadow: var(--shadow-violet-md);">
      <div class="flex justify-center items-center gap-2 mb-4">
        <span style="display: inline-block; width: 10px; height: 10px; background: #ff4444; border-radius: 50%; animation: ka-pulse 1.5s ease-in-out infinite;"></span>
        <span style="font-size: 0.75rem; font-weight: 700; color: #ff4444; letter-spacing: .1em; text-transform: uppercase;">Live Now</span>
      </div>
      <p class="body-sm text-primary font-semibold mb-6">Broadcasting Live from ${studioName}</p>
      <div class="flex col gap-3 items-center">
        ${buildLiveButton(liveYT, 'YouTube', ytIcon, '#FF0000')}
        ${buildLiveButton(liveFB, 'Facebook', fbIcon, '#1877F2')}
        ${buildLiveButton(liveIG, 'Instagram', igIcon, '#E1306C')}
      </div>
    </div>
  ` : `
    <div class="relative w-full" style="background: var(--surface-2); border-radius: var(--radius-xl); padding: clamp(var(--sp-6), 5vw, var(--sp-12)); border: 1px solid var(--border-default); text-align: center; box-shadow: var(--shadow-xl);">
      <div style="line-height: 1; margin-bottom: 16px; opacity: .35;">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
      </div>
      <p class="body-sm text-primary font-semibold">Broadcasting Live from ${studioName}</p>
      <p class="body-xs text-tertiary mt-2">No live session active right now. Check back soon!</p>
    </div>
  `;

  const html = `
    <!-- 1. ONLINE LEARNING OVERVIEW -->
    <section class="section  relative" style="padding-top: calc(var(--section-md) + 2rem);">
      <div class="container text-center">
        <span class="eyebrow">Virtual Conservatory</span>
        <h1 class="display-lg text-primary mb-6" style="font-size: clamp(var(--text-2xl), 6vw, var(--text-6xl)); line-height: 1.15;">
          Conservatory-Grade Learning <br>From Any Location
        </h1>
        <p class="body-lg text-secondary mx-auto mb-12" style="max-width: 700px; font-size: clamp(var(--text-sm), 2vw, var(--text-base));">
          Access high-definition live streams, dynamic progress analytics, downloadable exercises, and direct virtual instructor reviews, entirely paced around your personal schedule.
        </p>
      </div>
    </section>

    <!-- 2. COURSE PACKAGES -->
    <section class="section section--alt border-top border-bottom">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="eyebrow">Online Packages</span>
          <h2 class="section-header__title">Select Your Plan</h2>
        </div>

        <div class="grid grid-3" style="gap: clamp(var(--sp-6), 6vw, var(--sp-12));">
          <!-- Standard -->
          <div class="card border bg-overlay border-subtle flex col justify-between" style="padding: clamp(var(--sp-4), 5vw, var(--sp-8));">
            <div>
              <span class="label text-tertiary">Beginner</span>
              <h3 class="h4 text-primary mt-2 mb-4" style="min-height: 2.5em;">Fundamentals</h3>
              <div class="mb-6 flex justify-center items-baseline gap-2"><span style="font-size: 2rem; font-weight: 700; font-family: var(--font-body); color: var(--violet); letter-spacing: -.02em;">&#8377;799</span><span style="font-size: 0.9rem; font-weight: 400; color: var(--text-secondary);">/mo</span></div>
              <ul class="flex col gap-3 text-sm text-secondary mb-8">
                <li><span class="text-accent">&bull;</span> Basic posture &amp; finger technique</li>
                <li><span class="text-accent">&bull;</span> Foundational scales and notation</li>
                <li><span class="text-accent">&bull;</span> 3 Months course length</li>
                <li><span class="text-accent">&bull;</span> Online portal learning materials</li>
              </ul>
            </div>
            <a href="/contact" class="btn btn--outline btn--sm w-full text-center">Enroll Now</a>
          </div>
 
          <!-- Live Plus -->
          <div class="card border bg-overlay border-subtle flex col justify-between" style="border-color: var(--violet); padding: clamp(var(--sp-4), 5vw, var(--sp-8));">
            <div>
              <span class="badge badge--violet mb-2">Recommended</span>
              <h3 class="h4 text-primary mt-2 mb-4" style="min-height: 2.5em;">Advanced Techniques</h3>
              <div class="mb-6 flex justify-center items-baseline gap-2"><span style="font-size: 2rem; font-weight: 700; font-family: var(--font-body); color: var(--violet); letter-spacing: -.02em;">&#8377;999</span><span style="font-size: 0.9rem; font-weight: 400; color: var(--text-secondary);">/mo</span></div>
              <ul class="flex col gap-3 text-sm text-secondary mb-8">
                <li><span class="text-accent">&bull;</span> Advanced chord shapes &amp; composition</li>
                <li><span class="text-accent">&bull;</span> Speed drills and arpeggios</li>
                <li><span class="text-accent">&bull;</span> 6 Months course length</li>
                <li><span class="text-accent">&bull;</span> Live feedback on recordings</li>
              </ul>
            </div>
            <a href="/contact" class="btn btn--primary btn--sm w-full text-center">Enroll Now</a>
          </div>
 
          <!-- Elite Coaching -->
          <div class="card border bg-overlay border-subtle flex col justify-between" style="padding: clamp(var(--sp-4), 5vw, var(--sp-8));">
            <div>
              <span class="label text-tertiary">Advanced</span>
              <h3 class="h4 text-primary mt-2 mb-4" style="min-height: 2.5em;">Theory &amp; Composition</h3>
              <div class="mb-6 flex justify-center items-baseline gap-2"><span style="font-size: 2rem; font-weight: 700; font-family: var(--font-body); color: var(--violet); letter-spacing: -.02em;">&#8377;1,499</span><span style="font-size: 0.9rem; font-weight: 400; color: var(--text-secondary);">/mo</span></div>
              <ul class="flex col gap-3 text-sm text-secondary mb-8">
                <li><span class="text-accent">&bull;</span> Intervals, chord structure, scale theory</li>
                <li><span class="text-accent">&bull;</span> Songwriting &amp; composition basics</li>
                <li><span class="text-accent">&bull;</span> 4 Months course length</li>
                <li><span class="text-accent">&bull;</span> Custom sheet notation downloads</li>
              </ul>
            </div>
            <a href="/contact" class="btn btn--outline btn--sm w-full text-center">Enroll Now</a>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. BENEFITS -->
    <section class="section">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="eyebrow">Virtual Advantage</span>
          <h2 class="section-header__title">Why Practice Online With Us?</h2>
        </div>

        <div class="grid grid-3">
          <div class="card p-6 border bg-overlay">
            <div style="font-size: 32px;" class="mb-3"><svg class="icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="16"/><line x1="15" y1="22" x2="15" y2="16"/><line x1="9" y1="16" x2="15" y2="16"/><path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M12 6h.01M12 10h.01"/></svg></div>
            <h3 class="h5 text-primary mb-2">Practice from Home</h3>
            <p class="body-xs text-secondary">Learn on your own keyboard or grand piano without the hassle of commuting.</p>
          </div>
          <div class="card p-6 border bg-overlay">
            <div style="font-size: 32px;" class="mb-3"><svg class="icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg></div>
            <h3 class="h5 text-primary mb-2">Replay Anytime</h3>
            <p class="body-xs text-secondary">Review complex lessons, hand positions, and dynamic closeups as many times as you need.</p>
          </div>
          <div class="card p-6 border bg-overlay">
            <div style="font-size: 32px;" class="mb-3"><svg class="icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></div>
            <h3 class="h5 text-primary mb-2">Track Milestones</h3>
            <p class="body-xs text-secondary">Log your practice times, mark completed lessons, and track syllabus metrics dynamically.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. LIVE SESSION FEATURES -->
    <section class="section section--alt border-top border-bottom">
      <div class="container grid grid-2 items-center" style="gap: clamp(var(--sp-6), 6vw, var(--sp-16));">
        <div>
          <span class="eyebrow">Interactive Live Streams</span>
          <h2 class="h2 text-primary mb-6">Real-Time Performance Feedback</h2>
          <p class="body-md text-secondary mb-6">
            Our live webinars aren't simple lectures. We host active Q&amp;A panels, execute chord analysis live, and allow students to submit video performances for real-time technical feedback.
          </p>
          <ul class="flex col gap-4">
            <li class="flex items-center gap-3 text-sm text-secondary">
              <span class="text-accent">&#10003;</span>
              <span>HD Multi-Cam Live Video Feeds</span>
            </li>
            <li class="flex items-center gap-3 text-sm text-secondary">
              <span class="text-accent">&#10003;</span>
              <span>Live Chat Q&amp;A &amp; Chord Visualizations</span>
            </li>
          </ul>
        </div>
        ${liveBroadcastCard}
      </div>
    </section>

    <!-- 5. STUDENT REVIEWS -->
    <section class="section">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="eyebrow">Student Voice</span>
          <h2 class="section-header__title">Reviews From Online Students</h2>
        </div>

        <div class="grid grid-2" style="gap: clamp(var(--sp-4), 4vw, var(--sp-8));">
          <div class="card border" style="padding: clamp(var(--sp-4), 5vw, var(--sp-8));">
            <div class="rating mb-4">
              <span class="rating__stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            </div>
            <p class="body-base italic text-secondary mb-6" style="font-size: clamp(var(--text-xs), 2vw, var(--text-base));">
              "Being able to watch close-up videos of scale runs and finger crossings repeatedly completely changed my practice. Excellent online tools!"
            </p>
            <h4 class="body-md text-primary font-semibold">&mdash; Online Fundamentals Student</h4>
            <span class="body-xs text-tertiary">Live Plus Student</span>
          </div>

          <div class="card border" style="padding: clamp(var(--sp-4), 5vw, var(--sp-8));">
            <div class="rating mb-4">
              <span class="rating__stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            </div>
            <p class="body-base italic text-secondary mb-6" style="font-size: clamp(var(--text-xs), 2vw, var(--text-base));">
              "The live masterclass reviews are phenomenal. Getting personal feedback on my fingering runs was exactly what I needed to pass the intermediate keyboard level."
            </p>
            <h4 class="body-md text-primary font-semibold">&mdash; Advanced Online Batch Graduate</h4>
            <span class="body-xs text-tertiary">Virtuoso Private Student</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. CTA -->
    <section class="section  border-top">
      <div class="container text-center py-8">
        <span class="eyebrow">Virtual Campus</span>
        <h2 class="display-md text-primary mb-6" style="font-size: clamp(var(--text-xl), 5vw, var(--text-4xl));">Access the Virtual Classroom Now</h2>
        <p class="body-md text-secondary mb-12 mx-auto" style="max-width: 600px;">
          Create a free account to access basic piano posture lessons, custom sheet notation files, and track your progress.
        </p>
        <div class="flex flex-col md:flex-row gap-4 w-full justify-center items-center px-4">
          <a href="/register" class="btn btn--primary btn--lg w-full md:w-auto text-center" style="min-width: 200px; justify-content: center;">Register Free</a>
          <a href="/contact" class="btn btn--outline btn--lg w-full md:w-auto text-center" style="min-width: 200px; justify-content: center;">Inquire About Plans</a>
        </div>
      </div>
    </section>
  `;

  app.innerHTML = App.wrapWithLayout(html);
  App.initNavbarScroll();
  App.highlightActiveLink('/online-classes');
});
