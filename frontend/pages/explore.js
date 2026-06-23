/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Explore Page (Consolidated Discovery)
 *  frontend/pages/explore.js
 * ============================================================
 */

'use strict';

Router.register('/explore', async () => {
  const app = document.getElementById('app');
  if (!app) return;

  const html = `
    <!-- 1. MASTER HERO -->
    <section class="section  relative" style="padding-top: calc(var(--section-md) + 2rem); padding-bottom: var(--section-lg);">
      <div class="container text-center">
        <span class="eyebrow mx-auto justify-center">Discovery</span>
        <h1 class="display-lg text-primary mb-6" style="font-size: clamp(var(--text-3xl), 8vw, var(--text-7xl)); line-height: 1.1;">
          Explore the Academy
        </h1>
        <p class="body-lg text-secondary mx-auto mb-10" style="max-width: 700px;">
          Discover our premium programs, meet our world-class faculty, tour our state-of-the-art facilities, and find your path to musical mastery.
        </p>
      </div>
    </section>

    <!-- 2. ONLINE CLASSES PREVIEW -->
    <section class="section border-top">
      <div class="container reveal">
        <div class="section-header section-header--center">
          <span class="eyebrow">Digital Campus</span>
          <h2 class="section-header__title">Online Classes</h2>
          <p class="section-header__desc">Master the keys from anywhere in the world with our interactive digital curriculum.</p>
        </div>
        <div class="grid grid-2 text-left stagger-children mt-12 gap-6">
          <div class="card border bg-overlay border-subtle" style="padding: clamp(var(--sp-4), 5vw, var(--sp-8));">
            <h3 class="h4 text-primary mb-2">Live Masterclasses</h3>
            <p class="body-sm text-secondary mb-6">Interactive weekly sessions with immediate feedback from our principal instructors.</p>
            <a href="/online-classes" class="btn btn--outline btn--sm w-full md:w-auto text-center" style="justify-content: center;">Explore Online Curriculum</a>
          </div>
          <div class="card border bg-overlay border-subtle" style="padding: clamp(var(--sp-4), 5vw, var(--sp-8));">
            <h3 class="h4 text-primary mb-2">HD Video Library</h3>
            <p class="body-sm text-secondary mb-6">On-demand access to 500+ hours of multi-angle technique demonstrations.</p>
            <a href="/online-classes" class="btn btn--outline btn--sm w-full md:w-auto text-center" style="justify-content: center;">View Sample Lessons</a>
          </div>
        </div>
        <div class="text-center mt-10">
          <a href="/online-classes" class="btn btn--primary">View All Online Programs &rarr;</a>
        </div>
      </div>
    </section>

    <!-- 3. OFFLINE CLASSES PREVIEW -->
    <section class="section section--alt border-top border-bottom">
      <div class="container reveal">
        <div class="section-header section-header--center">
          <span class="eyebrow">Physical Conservatory</span>
          <h2 class="section-header__title">In-Person Studios</h2>
          <p class="section-header__desc">Practice on premium acoustic grand pianos in acoustically optimized chambers.</p>
        </div>
        <div class="grid grid-3 stagger-children mt-12 gap-6">
          <div class="card hover\:scale overflow-hidden flex col justify-between">
            <div>
              <div class="relative text-center overflow-hidden" style="height: 180px;">
                <img src="https://res.cloudinary.com/doij66qnv/image/upload/v1782193119/keyboardist-academy/explore/explore_traditional.jpg" alt="Classical Piano" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;" loading="lazy">
              </div>
              <div class="p-6">
                <span class="label text-accent">Classical Studio</span>
                <h3 class="h5 text-primary mt-2 mb-3">Traditional Foundations</h3>
              </div>
            </div>
            <div class="p-6 pt-0">
              <a href="/offline-classes" class="btn btn--outline btn--sm w-full text-center">View Program</a>
            </div>
          </div>
          <div class="card hover\:scale overflow-hidden flex col justify-between">
            <div>
              <div class="relative text-center overflow-hidden" style="height: 180px;">
                <img src="https://res.cloudinary.com/doij66qnv/image/upload/v1782193120/keyboardist-academy/explore/explore_jazz.jpg" alt="Jazz Keyboard" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;" loading="lazy">
              </div>
              <div class="p-6">
                <span class="label text-accent">Jazz & Improv</span>
                <h3 class="h5 text-primary mt-2 mb-3">Modern Jazz Collective</h3>
              </div>
            </div>
            <div class="p-6 pt-0">
              <a href="/offline-classes" class="btn btn--outline btn--sm w-full text-center">View Program</a>
            </div>
          </div>
          <div class="card hover\:scale overflow-hidden flex col justify-between">
            <div>
              <div class="relative text-center overflow-hidden" style="height: 180px;">
                <img src="https://res.cloudinary.com/doij66qnv/image/upload/v1782193121/keyboardist-academy/explore/explore_virtuoso.jpg" alt="Concert Virtuoso" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;" loading="lazy">
              </div>
              <div class="p-6">
                <span class="label text-accent">Private Coaching</span>
                <h3 class="h5 text-primary mt-2 mb-3">Concert Virtuoso</h3>
              </div>
            </div>
            <div class="p-6 pt-0">
              <a href="/offline-classes" class="btn btn--outline btn--sm w-full text-center">View Program</a>
            </div>
          </div>
        </div>
        <div class="text-center mt-10">
          <a href="/offline-classes" class="btn btn--primary">View All Campus Details &rarr;</a>
        </div>
      </div>
    </section>

    <!-- 4. FACULTY PREVIEW -->
    <section class="section border-bottom">
      <div class="container reveal">
        <div class="section-header section-header--center">
          <span class="eyebrow">World-Class Instructors</span>
          <h2 class="section-header__title">Meet the Faculty</h2>
          <p class="section-header__desc">Learn directly from conservatory graduates and active recording artists.</p>
        </div>
        <div id="explore-faculty-grid" class="grid grid-3 stagger-children mt-12 gap-6">
          <!-- Skeletons (Shown initially) -->
          ${[1, 2, 3].map(() => `
            <div class="card p-6 border bg-overlay border-subtle text-center flex col items-center">
              <div class="skeleton skeleton--avatar mb-4" style="width: 100px; height: 100px;"></div>
              <div class="skeleton skeleton--text w-1/2 mb-2" style="height: 16px;"></div>
              <div class="skeleton skeleton--text w-1/3" style="height: 10px;"></div>
            </div>
          `).join('')}
        </div>
        <div class="text-center mt-10">
          <a href="/faculty" class="btn btn--primary">View All Instructor Profiles &rarr;</a>
        </div>
      </div>
    </section>

    <!-- 5. PORTFOLIO & GALLERY PREVIEW -->
    <section class="section section--alt border-bottom">
      <div class="container reveal">
        <div class="grid grid-2 items-center gap-12">
          <div>
            <span class="eyebrow">Student Outcomes</span>
            <h2 class="display-md text-primary mb-6">See The Results</h2>
            <p class="body-md text-secondary mb-8">Listen to recital performances from our graduates and take a visual tour through our premium recording and practice studios.</p>
            <div class="flex flex-col md:flex-row gap-4 w-full">
              <a href="/portfolio" class="btn btn--primary w-full md:w-auto text-center" style="justify-content: center;">Watch Performances</a>
              <a href="/gallery" class="btn btn--outline w-full md:w-auto text-center" style="justify-content: center;">View Studio Gallery</a>
            </div>
          </div>
          <div class="grid grid-2 gap-4">
            <div class="bg-overlay rounded-md overflow-hidden" style="aspect-ratio: 1; border: 1px solid var(--border-subtle);">
              <img src="https://res.cloudinary.com/doij66qnv/image/upload/v1782209271/keyboardist-academy/assets/sovbcnzxzqi7kfk07mvv.jpg" alt="Portfolio Preview" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy">
            </div>
            <div class="bg-overlay rounded-md overflow-hidden gallery-preview-img-2" style="aspect-ratio: 1; border: 1px solid var(--border-subtle);">
              <img src="https://res.cloudinary.com/doij66qnv/image/upload/v1782209272/keyboardist-academy/assets/xxat68bo6uvdtclnwxub.jpg" alt="Gallery Preview" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. EVENTS PREVIEW -->
    <section class="section border-bottom">
      <div class="container reveal text-center">
        <span class="eyebrow mx-auto justify-center">Upcoming</span>
        <h2 class="display-md text-primary mb-6">Masterclasses & Events</h2>
        <p class="body-md text-secondary mx-auto mb-10" style="max-width: 600px;">Join our live recitals, Q&A sessions with recording artists, and intensive weekend workshops.</p>
        
        <div class="card p-6 border bg-overlay border-subtle text-left mx-auto mb-10" style="max-width: 700px;">
          <div class="flex items-center justify-between sm:flex-col sm:items-start sm:gap-4">
            <div class="flex items-center gap-6">
              <div class="text-center bg-base border-subtle rounded-md" style="padding: var(--sp-2) var(--sp-3); border: 1px solid var(--border-subtle);">
                <div class="text-xs text-violet fw-bold uppercase">AUG</div>
                <div class="h4 text-primary">15</div>
              </div>
              <div>
                <h3 class="h5 text-primary mb-1">Jazz Improvisation Masterclass</h3>
                <p class="body-sm text-secondary">Studio A &bull; 18:00 - 20:00</p>
              </div>
            </div>
            <a href="/events" class="btn btn--outline btn--sm shrink-0">RSVP Now</a>
          </div>
        </div>
        <a href="/events" class="btn btn--primary">View Full Event Calendar &rarr;</a>
      </div>
    </section>

    <!-- 7. ADMISSION & FAQ PREVIEW -->
    <section class="section section--alt border-bottom">
      <div class="container reveal">
        <div class="grid grid-2 gap-12">
          <!-- Admissions -->
          <div>
            <span class="eyebrow">Enrollment</span>
            <h2 class="display-md text-primary mb-6">Admission Process</h2>
            <p class="body-md text-secondary mb-8">We accept students on a rolling basis. The process involves a short technical audition and a consultation with our principal.</p>
            <ul class="flex col gap-4 mb-8">
              <li class="flex gap-4 items-start">
                <div class="badge badge--violet shrink-0 mt-1">1</div>
                <p class="body-sm text-secondary">Submit online application form.</p>
              </li>
              <li class="flex gap-4 items-start">
                <div class="badge badge--violet shrink-0 mt-1">2</div>
                <p class="body-sm text-secondary">Schedule a 15-minute video consultation.</p>
              </li>
              <li class="flex gap-4 items-start">
                <div class="badge badge--violet shrink-0 mt-1">3</div>
                <p class="body-sm text-secondary">Receive placement and syllabus.</p>
              </li>
            </ul>
            <a href="/admission" class="btn btn--primary">Start Application &rarr;</a>
          </div>
          
          <!-- FAQs -->
          <div>
            <span class="eyebrow">Support</span>
            <h2 class="display-md text-primary mb-6">Common Questions</h2>
            <div class="flex col gap-4 mb-8">
              <div class="card p-6 border bg-overlay border-subtle">
                <h4 class="h6 text-primary mb-2">Do I need my own piano?</h4>
                <p class="body-sm text-secondary">For online classes, yes. For physical conservatory cohorts, you may use our practice rooms.</p>
              </div>
              <div class="card p-6 border bg-overlay border-subtle">
                <h4 class="h6 text-primary mb-2">Are beginners accepted?</h4>
                <p class="body-sm text-secondary">Absolutely. Our Fundamentals pathway is designed specifically for students with zero prior experience.</p>
              </div>
            </div>
            <a href="/faq" class="btn btn--outline">Read All FAQs &rarr;</a>
          </div>
        </div>
      </div>
    </section>

    <!-- 8. CTA -->
    <section class="section ">
      <div class="container text-center py-8 reveal">
        <h2 class="display-lg text-primary mb-6" style="font-size: clamp(var(--text-xl), 5vw, var(--text-5xl));">Ready to touch the keys?</h2>
        <p class="body-lg text-secondary mx-auto mb-10" style="max-width: 600px;">
          Join thousands of passionate musicians worldwide who have already started their journey with us.
        </p>
        <div class="flex flex-col md:flex-row gap-4 justify-center w-full px-4">
          <a href="/contact" class="btn btn--primary btn--xl w-full md:w-auto" style="justify-content: center;">Start Free Trial</a>
          <a href="/testimonials" class="btn btn--outline btn--xl w-full md:w-auto" style="justify-content: center;">Read Student Reviews</a>
        </div>
      </div>
    </section>
  `;

  app.innerHTML = App.wrapWithLayout(html);
  App.initNavbarScroll();
  App.highlightActiveLink('/explore');

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
      return url;
    }
    return App.getAssetPath(url);
  };

  const FALLBACK_FACULTY = [
    {
      name: 'Karan Mehta',
      role: 'Founder & Principal Instructor',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800'
    },
    {
      name: 'Arun Kumar',
      role: 'Senior Keyboard Instructor',
      imageUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=800'
    },
    {
      name: 'Priya Raman',
      role: 'Music Theory Instructor',
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const renderFaculty = (list) => {
    const gridContainer = document.getElementById('explore-faculty-grid');
    if (!gridContainer) return;
    const renderList = list.slice(0, 3); // Preview max 3
    if (renderList.length === 0) {
      gridContainer.innerHTML = `
        <div class="card p-6 border bg-overlay border-subtle text-center w-full" style="grid-column: 1 / -1;">
          <p class="body-sm text-secondary">No faculty members found. Meet our principal roster under the Faculty page!</p>
        </div>
      `;
      return;
    }
    gridContainer.innerHTML = renderList.map(f => `
      <div class="card p-6 border bg-overlay border-subtle text-center">
        <div class="mx-auto mb-4 overflow-hidden rounded-full border border-subtle" style="width: 100px; height: 100px;">
          <img src="${getImageUrl(f.imageUrl)}" alt="${f.name}" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy">
        </div>
        <h3 class="h5 text-primary mb-1">${f.name}</h3>
        <p class="body-xs text-tertiary">${f.role}</p>
      </div>
    `).join('');
  };

  try {
    const res = await Api.get('/faculty?isPublished=true');
    renderFaculty(res.data.faculty || []);
  } catch (err) {
    console.warn('API error loading faculty preview:', err);
    renderFaculty(FALLBACK_FACULTY);
  }
  
  // Initialize scroll reveal animations for the new DOM elements
  setTimeout(() => {
    if (window.Helpers && window.Helpers.initReveal) {
      window.Helpers.initReveal();
    }
  }, 50);
});
