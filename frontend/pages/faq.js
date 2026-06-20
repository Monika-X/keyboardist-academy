/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — FAQ Page View
 *  frontend/pages/faq.js
 * ============================================================
 */

'use strict';

Router.register('/faq', async () => {
  const app = document.getElementById('app');
  if (!app) return;

  const html = `
    <style>
      .faq-accordion-container {
        max-width: 800px;
        margin: 0 auto;
      }
      .faq-item {
        border: 1px solid var(--border-default);
        border-radius: var(--radius-md);
        background: var(--white-4);
        backdrop-filter: blur(12px);
        margin-bottom: 1rem;
        transition: border-color 0.3s ease, box-shadow 0.3s ease;
      }
      .faq-item:hover {
        border-color: var(--border-violet);
        box-shadow: var(--shadow-violet-sm);
      }
      .faq-item.active {
        border-color: var(--violet);
        background: rgba(108, 99, 255, 0.04);
      }
      .faq-header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        text-align: left;
      }
      .faq-title {
        font-family: var(--font-body);
        font-size: var(--text-base);
        font-weight: 600;
        color: var(--white);
        margin: 0;
        transition: color 0.3s ease;
      }
      .faq-item:hover .faq-title {
        color: var(--text-primary);
      }
      .faq-item.active .faq-title {
        color: var(--violet);
      }
      .faq-trigger-icon {
        width: 24px;
        height: 24px;
        min-width: 24px;
        min-height: 24px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: var(--white-6);
        color: var(--white-80);
        font-size: 18px;
        line-height: 1;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .faq-item:hover .faq-trigger-icon {
        background: var(--violet-15);
        color: var(--violet);
      }
      .faq-item.active .faq-trigger-icon {
        background: var(--violet);
        color: var(--white);
        transform: rotate(45deg);
      }
      .faq-collapse {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .faq-item.active .faq-collapse {
        grid-template-rows: 1fr;
      }
      .faq-content-inner {
        overflow: hidden;
      }
      .faq-body {
        padding: 0 1.5rem 1.5rem 1.5rem;
        color: var(--text-secondary);
        font-size: var(--text-sm);
        line-height: 1.7;
      }
    </style>

    <!-- Hero -->
    <section class="section  relative" style="padding-top: calc(var(--section-md) + 2rem);">
      <div class="container text-center reveal">
        <span class="eyebrow">Assistance</span>
        <h1 class="display-lg text-primary mb-6" style="font-size: clamp(var(--text-2xl), 6vw, var(--text-6xl)); line-height: 1.15;">
          Frequently Asked Questions
        </h1>
        <p class="body-lg text-secondary mx-auto mb-12" style="max-width: 700px; font-size: clamp(var(--text-sm), 2vw, var(--text-base));">
          Find answers regarding syllabus commitments, pricing plans, lesson configurations, and offline cohorts.
        </p>
      </div>
    </section>

    <!-- FAQ ACCORDION -->
    <section class="section section--alt border-top border-bottom">
      <div class="container">
        <div class="faq-accordion-container reveal">
          <!-- Accordion item 1 -->
          <div class="faq-item">
            <button class="faq-header">
              <h3 class="faq-title">Do I need to own a piano before enrolling?</h3>
              <span class="faq-trigger-icon">＋</span>
            </button>
            <div class="faq-collapse">
              <div class="faq-content-inner">
                <div class="faq-body">
                  No. You can start practicing on any standard 61-key or 88-key electronic keyboard. For advanced classical courses, an 88-key weighted action piano is recommended to develop finger velocity and control correctly.
                </div>
              </div>
            </div>
          </div>

          <!-- Accordion item 2 -->
          <div class="faq-item">
            <button class="faq-header">
              <h3 class="faq-title">Is the Virtual Live Session Plus schedule flexible?</h3>
              <span class="faq-trigger-icon">＋</span>
            </button>
            <div class="faq-collapse">
              <div class="faq-content-inner">
                <div class="faq-body">
                  Yes. All live webinars and masterclasses are recorded in high-definition. If you miss a live stream, you can replay the video file at any time from your student learning dashboard.
                </div>
              </div>
            </div>
          </div>

          <!-- Accordion item 3 -->
          <div class="faq-item">
            <button class="faq-header">
              <h3 class="faq-title">How large are the offline studio cohorts?</h3>
              <span class="faq-trigger-icon">＋</span>
            </button>
            <div class="faq-collapse">
              <div class="faq-content-inner">
                <div class="faq-body">
                  To ensure that every student receives dedicated, tactile instruction from our faculty, we limit all physical studio classes in Avadi, Chennai to a maximum of 6 students per session.
                </div>
              </div>
            </div>
          </div>

          <!-- Accordion item 4 -->
          <div class="faq-item">
            <button class="faq-header">
              <h3 class="faq-title">Can I switch plans or request cancellations?</h3>
              <span class="faq-trigger-icon">＋</span>
            </button>
            <div class="faq-collapse">
              <div class="faq-content-inner">
                <div class="faq-body">
                  Yes. You can upgrade, downgrade, or cancel your packages at any time directly through your dashboard billing panel. There are no registration lock-in periods.
                </div>
              </div>
            </div>
          </div>

          <!-- Accordion item 5 -->
          <div class="faq-item">
            <button class="faq-header">
              <h3 class="faq-title">What syllabus certifications do you support?</h3>
              <span class="faq-trigger-icon">＋</span>
            </button>
            <div class="faq-collapse">
              <div class="faq-content-inner">
                <div class="faq-body">
                  We prepare students for standard keyboard examinations and performance grade assessments, alongside our proprietary Academy Performance Diplomas.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. ADMISSIONS & ACADEMY POLICIES -->
    <section class="section border-bottom">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="eyebrow">Policies</span>
          <h2 class="section-header__title">Admissions & Registration Guidelines</h2>
        </div>
        <div class="grid grid-2" style="gap: clamp(var(--sp-6), 6vw, var(--sp-12));">
          <div class="card p-6 border bg-overlay">
            <h3 class="h6 text-primary mb-2">Flexible Batch Transfers</h3>
            <p class="body-xs text-secondary">Offline students can request batch transfers based on slot availability by contacting our coordinator. Online students can transition to offline batches if seats open up.</p>
          </div>
          <div class="card p-6 border bg-overlay">
            <h3 class="h6 text-primary mb-2">Portal Access</h3>
            <p class="body-xs text-secondary">All registered students receive lifetime access to their student portal dashboard, lesson materials, progress logs, and syllabus updates.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section">
      <div class="container text-center py-8 reveal">
        <span class="eyebrow">Support</span>
        <h2 class="display-md text-primary mb-6" style="font-size: clamp(var(--text-xl), 5vw, var(--text-4xl));">Still Have Questions?</h2>
        <p class="body-md text-secondary mb-12 mx-auto" style="max-width: 600px;">
          Send us a message directly and our customer support team will reply within 24 hours.
        </p>
        <div class="flex gap-4 sm\:flex-col w-full justify-center items-center">
          <a href="/contact" class="btn btn--primary btn--lg w-fit text-center" style="min-width: 200px;">Contact Support</a>
          <a href="/" class="btn btn--outline btn--lg w-fit text-center" style="min-width: 200px;">Return Home</a>
        </div>
      </div>
    </section>
  `;

  app.innerHTML = App.wrapWithLayout(html);
  App.initNavbarScroll();
  App.highlightActiveLink('/faq');
  Helpers.initReveal();

  // Accordion Toggle Logic
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const header = item.querySelector('.faq-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all items
      items.forEach(i => i.classList.remove('active'));
      
      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
});
