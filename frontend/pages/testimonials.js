/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Testimonials Page View (Dynamic Connection)
 *  frontend/pages/testimonials.js
 * ============================================================
 */

'use strict';

Router.register('/testimonials', async () => {
  const app = document.getElementById('app');
  if (!app) return;

  const FALLBACK_TESTIMONIALS = [
    {
      _id: 'fallback-1',
      rating: 5,
      text: 'The C-major finger patterns and hand posture guides helped me correct minor bad habits I accumulated while trying to self-teach. This course is an absolute masterpiece.',
      name: 'Online Keyboard Alumnus',
      role: 'Beginner Alumni'
    },
    {
      _id: 'fallback-2',
      rating: 5,
      text: 'Learning scales, 2-5-1 voicings, and seventh chords has never been this simple. I feel so much more comfortable sitting at my keyboard and just playing.',
      name: 'Avadi Weekend Batch Alumnus',
      role: 'Intermediate Alumni'
    },
    {
      _id: 'fallback-3',
      rating: 5,
      text: 'Successfully completed my advanced performance assessment! The Chopin technique guide clarified rubato timings and dynamic expressions beautifully.',
      name: 'Advanced Program Student',
      role: 'Advanced Alumni'
    }
  ];

  const html = `
    <!-- 1. HERO SECTION -->
    <section class="section  relative" style="padding-top: calc(var(--section-md) + 2rem);">
      <div class="container text-center">
        <span class="eyebrow">Student Stories</span>
        <h1 class="display-lg text-primary mb-6" style="font-size: clamp(var(--text-2xl), 6vw, var(--text-6xl)); line-height: 1.15;">
          What Our Global Alumni <br>Say About Us
        </h1>
        <p class="body-lg text-secondary mx-auto mb-12" style="max-width: 700px; font-size: clamp(var(--text-sm), 2vw, var(--text-base));">
          Discover how structured methods, pristine camera guides, and conservatory coaches helped students achieve technical confidence.
        </p>
      </div>
    </section>

    <!-- 2. CONTENT GRID & 3. MEDIA SECTIONS (Modern Testimonial Cards) -->
    <section class="section section--alt border-top border-bottom">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="eyebrow">Testimonials</span>
          <h2 class="section-header__title">Student Success Stories</h2>
        </div>

        <div id="testimonials-grid-container" class="grid grid-3" style="gap: clamp(var(--sp-4), 4vw, var(--sp-8));">
          <!-- Skeletons (Shown initially) -->
          ${[1, 2, 3].map(() => `
            <div class="card p-6 border bg-overlay border-subtle flex col justify-between">
              <div>
                <div class="skeleton skeleton--text w-1/4 mb-4" style="height: 12px;"></div>
                <div class="skeleton skeleton--text w-full mb-2"></div>
                <div class="skeleton skeleton--text w-5/6 mb-4"></div>
              </div>
              <div>
                <div class="skeleton skeleton--text w-1/2 mb-2" style="height: 16px;"></div>
                <div class="skeleton skeleton--text w-1/3" style="height: 10px;"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- 3. STUDENT MILESTONES TRACKER -->
    <section class="section border-top border-bottom bg-raised">
      <div class="container text-center">
        <div class="section-header section-header--center">
          <span class="eyebrow">Roadmap</span>
          <h2 class="section-header__title">Typical Student Progress Milestones</h2>
        </div>
        <div class="grid grid-3" style="gap: clamp(var(--sp-4), 4vw, var(--sp-8));">
          <div class="card p-6 border bg-overlay">
            <h3 class="h6 text-primary mb-2">Month 1</h3>
            <p class="body-xs text-secondary">Focus on basic key recognition, hand posture alignment, finger independence, and simple scale coordination runs.</p>
          </div>
          <div class="card p-6 border bg-overlay">
            <h3 class="h6 text-primary mb-2">Month 3</h3>
            <p class="body-xs text-secondary">Develop clean arpeggios, basic chord configurations, and transition smoothly from fundamentals to intermediate pieces.</p>
          </div>
          <div class="card p-6 border bg-overlay">
            <h3 class="h6 text-primary mb-2">Month 6</h3>
            <p class="body-xs text-secondary">Master dynamics, sight-read score sheets comfortably, and perform complete intermediate pieces with expression.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 2.5. SUBMIT REVIEW FORM SECTION -->
    <section class="section border-top" style="padding-top: 4rem; padding-bottom: 4rem;">
      <div class="container" style="max-width: 600px; margin: 0 auto; overflow: hidden;">
        <div class="card border bg-overlay border-subtle" style="padding: clamp(16px, 5vw, 32px); overflow: hidden; box-sizing: border-box;">
          <h3 class="h4 text-primary mb-2 text-center">Share Your Experience</h3>
          <p class="body-xs text-secondary mb-6 text-center">Submit a review. It will update on the website in real time.</p>
          
          <form id="submit-review-form" class="form flex col gap-6" style="overflow: hidden;">
            <div class="form-group" style="overflow: hidden;">
              <label for="review-name" class="form-label label">Your Name</label>
              <input type="text" id="review-name" required class="form-input" placeholder="e.g. Monika" style="width: 100%; box-sizing: border-box;" />
            </div>

            <div class="form-group" style="overflow: hidden;">
              <label for="review-role" class="form-label label">Your Designation / Role</label>
              <input type="text" id="review-role" required class="form-input" placeholder="e.g. Beginner Student, Parent of Alumnus" style="width: 100%; box-sizing: border-box;" />
            </div>

            <div class="form-group" style="overflow: hidden;">
              <label for="review-rating" class="form-label label">Stars Rating</label>
              <select id="review-rating" required class="form-input" style="width: 100%; max-width: 100%; box-sizing: border-box; display: block; background: var(--surface-input); color: var(--text-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                <option value="5">★★★★★ — 5 Stars (Excellent)</option>
                <option value="4">★★★★☆ — 4 Stars (Good)</option>
                <option value="3">★★★☆☆ — 3 Stars (Average)</option>
                <option value="2">★★☆☆☆ — 2 Stars (Below Avg)</option>
                <option value="1">★☆☆☆☆ — 1 Star (Poor)</option>
              </select>
            </div>

            <div class="form-group" style="overflow: hidden;">
              <label for="review-text" class="form-label label">Your Review</label>
              <textarea id="review-text" required class="form-input" rows="4" placeholder="How has your learning experience been at Keyboardist Academy?" style="width: 100%; box-sizing: border-box;"></textarea>
            </div>

            <div class="form-group" style="overflow: hidden;">
              <label for="review-file" class="form-label label">Profile Picture (Optional)</label>
              <input type="file" id="review-file" accept="image/*" class="form-input" style="width: 100%; box-sizing: border-box;" />
            </div>

            <button type="submit" class="btn btn--primary w-full mt-2">Submit Review</button>
          </form>
        </div>
      </div>
    </section>

    <!-- 4. CALL TO ACTION -->
    <section class="section ">
      <div class="container text-center py-8">
        <span class="eyebrow">Your Story Starts Here</span>
        <h2 class="display-md text-primary mb-6" style="font-size: clamp(var(--text-xl), 5vw, var(--text-4xl));">Write Your Own Musical Story</h2>
        <p class="body-md text-secondary mb-12 mx-auto" style="max-width: 600px;">
          Create a free account to log your practice milestones, download score notation files, and submit performance reviews.
        </p>
        <div class="flex gap-4 sm\:flex-col w-full justify-center items-center">
          <a href="/contact" class="btn btn--primary btn--lg w-fit text-center" style="min-width: 200px;">Register Free</a>
          <a href="/contact" class="btn btn--outline btn--lg w-fit text-center" style="min-width: 200px;">Inquire Admissions</a>
        </div>
      </div>
    </section>
  `;

  app.innerHTML = App.wrapWithLayout(html);
  App.initNavbarScroll();
  App.highlightActiveLink('/testimonials');

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
      return url;
    }
    return App.getAssetPath(url);
  };

  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 1).toUpperCase();
    return (parts[0].substring(0, 1) + parts[parts.length - 1].substring(0, 1)).toUpperCase();
  };

  const renderTestimonials = (list) => {
    const container = document.getElementById('testimonials-grid-container');
    if (!container) return;

    if (list.length === 0) {
      container.innerHTML = `
        <div class="card p-8 text-center border bg-overlay w-full" style="grid-column: 1 / -1; max-width: 600px; margin: 0 auto;">
          <h3 class="h4 text-primary mb-2">No Testimonials Found</h3>
          <p class="body-sm text-secondary">Be the first to share your learning experience! Contact admissions to register.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = list.map(t => `
      <div class="card p-6 border bg-overlay border-subtle flex col justify-between">
        <div>
          <div class="rating mb-4">
            <span class="rating__stars">${'★'.repeat(t.rating || 5)}${'☆'.repeat(5 - (t.rating || 5))}</span>
          </div>
          <p class="body-xs italic text-secondary mb-6">
            "${t.text}"
          </p>
        </div>
        <div class="flex items-center gap-3">
          ${t.imageUrl && t.imageUrl !== 'default-avatar.webp' && t.imageUrl !== 'default-avatar.jpg' && !t.imageUrl.includes('default-avatar') ? `
            <div class="rounded-full overflow-hidden border border-subtle" style="width: 44px; height: 44px; flex-shrink: 0;">
              <img src="${getImageUrl(t.imageUrl)}" alt="${t.name}" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy">
            </div>
          ` : `
            <div class="rounded-full flex items-center justify-center font-bold text-accent border" style="width: 44px; height: 44px; background: rgba(138,43,226,0.15); border-color: rgba(138,43,226,0.3); flex-shrink: 0; font-size: 14px; color: var(--violet);">
              ${getInitials(t.name)}
            </div>
          `}
          <div>
            <h4 class="body-sm text-primary font-semibold leading-tight mb-0.5">${t.name}</h4>
            <span class="body-xs text-tertiary">${t.role}</span>
          </div>
        </div>
      </div>
    `).join('');
  };

  const loadTestimonials = async () => {
    try {
      const res = await Api.get('/testimonials?isPublished=true');
      const testimonials = res.data.testimonials || [];
      renderTestimonials(testimonials);
    } catch (err) {
      console.warn('API error fetching testimonials, falling back to static reviews:', err);
      renderTestimonials(FALLBACK_TESTIMONIALS);
    }
  };

  await loadTestimonials();

  const reviewForm = document.getElementById('submit-review-form');
  if (reviewForm) {
    reviewForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('review-name').value;
      const role = document.getElementById('review-role').value;
      const rating = document.getElementById('review-rating').value;
      const text = document.getElementById('review-text').value;
      const fileInput = document.getElementById('review-file');

      try {
        const btn = reviewForm.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.textContent = 'Submitting...';

        const formData = new FormData();
        formData.append('name', name);
        formData.append('role', role);
        formData.append('rating', rating);
        formData.append('text', text);
        formData.append('isPublished', true); // real-time dynamic update

        if (fileInput && fileInput.files[0]) {
          formData.append('image', fileInput.files[0]);
        }

        await Api.post('/testimonials', formData);
        Helpers.toast('Review submitted successfully! It is now live.');
        reviewForm.reset();
        await loadTestimonials();
      } catch (err) {
        console.error(err);
        Helpers.toast(err.message || 'Failed to submit review. Please try again.', 'error');
      } finally {
        const btn = reviewForm.querySelector('button[type="submit"]');
        if (btn) {
          btn.disabled = false;
          btn.textContent = 'Submit Review';
        }
      }
    });
  }
});
