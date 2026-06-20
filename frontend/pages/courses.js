/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Courses Page View
 *  frontend/pages/courses.js
 * ============================================================
 */

'use strict';

Router.register('/courses', async () => {
  const app = document.getElementById('app');
  if (!app) return;

  const html = `
    <!-- 1. HERO BANNER -->
    <section class="section  relative" style="padding-top: calc(var(--section-md) + 2rem); padding-bottom: var(--section-sm);">
      <div class="container text-center">
        <span class="eyebrow">Academy Curriculums</span>
        <h1 class="display-lg text-primary mb-6" style="font-size: clamp(var(--text-2xl), 6vw, var(--text-6xl)); line-height: 1.15;">
          Conservatory-Grade Curriculums
        </h1>
        <p class="body-lg text-secondary mx-auto mb-12" style="max-width: 700px; font-size: clamp(var(--text-sm), 2vw, var(--text-base));">
          Explore structured pathways designed to take you from absolute keyboard basics to advanced classical virtuosity, modern jazz harmonization, and sight-reading dexterity.
        </p>
      </div>
    </section>

    <!-- 2. COURSE DISCOVERY (Search & Filter) -->
    <section class="section section--alt border-top border-bottom" style="padding: 1.5rem 0;">
      <div class="container">
        <div class="flex sm:flex-col justify-between items-center gap-6">
          
          <!-- Category Filters -->
          <div class="flex flex-wrap gap-2" id="course-filters">
            <button class="btn btn--sm active" data-filter="all" style="border-radius: 50px; background: var(--violet); border-color: var(--violet); color: var(--white);">All Curriculums</button>
            <button class="btn btn--sm" data-filter="Classical Piano" style="border-radius: 50px; background: transparent; border-color: transparent; color: var(--text-secondary);">Classical</button>
            <button class="btn btn--sm" data-filter="Jazz Keyboard" style="border-radius: 50px; background: transparent; border-color: transparent; color: var(--text-secondary);">Jazz</button>
            <button class="btn btn--sm" data-filter="Music Theory" style="border-radius: 50px; background: transparent; border-color: transparent; color: var(--text-secondary);">Theory</button>
          </div>

          <!-- Search Bar -->
          <div class="relative w-full" style="max-width: 340px;">
            <svg class="absolute" style="left: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-secondary);" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" id="course-search" class="input w-full body-sm" placeholder="Search by title or topic..." style="padding-left: 2.5rem; background: var(--bg-overlay); border: 1px solid var(--border-subtle); border-radius: 50px; height: 44px; color: var(--white);">
          </div>

        </div>
      </div>
    </section>

    <!-- 3. COURSE GRID -->
    <section class="section" style="padding-top: var(--section-md); min-height: 500px;">
      <div class="container">
        <!-- Skeleton Loaders (Shown initially) -->
        <div id="courses-grid" class="grid grid-3" style="gap: clamp(var(--sp-6), 4vw, var(--sp-8));">
          ${[1,2,3,4,5,6].map(() => `
            <div class="card bg-overlay border-subtle overflow-hidden flex col justify-between" style="border-radius: 12px; border: 1px solid rgba(255,255,255,0.03);">
              <div>
                <div class="skeleton skeleton--card" style="height: 240px; border-radius: 0;"></div>
                <div class="p-6">
                  <div class="skeleton skeleton--text w-1/3 mb-4" style="height: 12px;"></div>
                  <div class="skeleton skeleton--text w-3/4 mb-4" style="height: 20px;"></div>
                  <div class="skeleton skeleton--text w-full mb-2"></div>
                  <div class="skeleton skeleton--text w-5/6 mb-2"></div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- 4. WHY CHOOSE OUR COURSES -->
    <section class="section section--alt border-top border-bottom bg-raised">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="eyebrow">Advantages</span>
          <h2 class="section-header__title">Why Choose Our Courses</h2>
        </div>
        <div class="grid grid-4" style="gap: clamp(var(--sp-4), 4vw, var(--sp-8));">
          <div class="card p-6 border bg-overlay border-subtle text-center">
            <div class="mb-4" style="color: var(--violet);"><svg class="icon-svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div>
            <h3 class="h5 text-primary mb-2">Structured Curriculum</h3>
            <p class="body-xs text-secondary">A step-by-step progress framework designed to take you from absolute basics to advanced performance mastery.</p>
          </div>
          <div class="card p-6 border bg-overlay border-subtle text-center">
            <div class="mb-4" style="color: var(--violet);"><svg class="icon-svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
            <h3 class="h5 text-primary mb-2">Flexible Learning Options</h3>
            <p class="body-xs text-secondary">Learn at your own pace online with high-definition multi-angle video tutorials or join our physical cohorts.</p>
          </div>
          <div class="card p-6 border bg-overlay border-subtle text-center">
            <div class="mb-4" style="color: var(--violet);"><svg class="icon-svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg></div>
            <h3 class="h5 text-primary mb-2">Performance Training</h3>
            <p class="body-xs text-secondary">Regular studio recital opportunities, live masterclass reviews, and practical performance preparations.</p>
          </div>
          <div class="card p-6 border bg-overlay border-subtle text-center">
            <div class="mb-4" style="color: var(--violet);"><svg class="icon-svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg></div>
            <h3 class="h5 text-primary mb-2">Personalized Guidance</h3>
            <p class="body-xs text-secondary">Direct video feedback and targeted scale, posture, and technical alignments from our expert faculty.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. ENROLLMENT CTA -->
    <section class="section  border-top">
      <div class="container text-center py-8">
        <span class="eyebrow">Academic Commitment</span>
        <h2 class="display-md text-primary mb-6" style="font-size: clamp(var(--text-xl), 5vw, var(--text-4xl));">Ready to Master the Keys?</h2>
        <p class="body-md text-secondary mb-12 mx-auto" style="max-width: 600px;">
          Our masterclasses are structured modularly, giving you control over your practice timeline. Enroll today to access lifetime curriculum updates.
        </p>
        <div class="flex gap-4 sm:flex-col w-full justify-center items-center">
          <a href="/register" class="btn btn--primary btn--lg w-fit text-center" style="min-width: 200px;">Start Free Trial</a>
        </div>
      </div>
    </section>
  `;

  app.innerHTML = App.wrapWithLayout(html);
  App.initNavbarScroll();
  App.highlightActiveLink('/courses');

  // --- COURSE LOGIC & FILTERING ---
  
  let allCourses = [];
  const coursesContainer = document.getElementById('courses-grid');
  const filterButtons = document.querySelectorAll('#course-filters button');
  const searchInput = document.getElementById('course-search');

  const renderCourses = (filterCategory = 'all', searchQuery = '') => {
    if (!coursesContainer) return;

    // Filter array
    const filtered = allCourses.filter(c => {
      const matchCat = filterCategory === 'all' || c.category === filterCategory;
      const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (c.description && c.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });

    // Empty State
    if (filtered.length === 0) {
      coursesContainer.innerHTML = `
        <div class="text-center py-16 flex col items-center justify-center border-subtle bg-overlay" style="grid-column: 1 / -1; border-radius: 16px; border: 1px solid rgba(255,255,255,0.03); animation: fadeIn 0.4s ease;">
          <svg class="mb-6" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <h3 class="h4 text-primary mb-2">No curriculums found</h3>
          <p class="body-sm text-secondary mb-8">We couldn't find any courses matching "${searchQuery}".</p>
          <button class="btn btn--outline" id="clear-filters-btn">Clear Filters</button>
        </div>
      `;
      
      const clearBtn = document.getElementById('clear-filters-btn');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          searchInput.value = '';
          filterButtons.forEach(btn => {
            btn.style.background = 'transparent';
            btn.style.color = 'var(--text-secondary)';
          });
          const allBtn = document.querySelector('[data-filter="all"]');
          if (allBtn) {
            allBtn.style.background = 'var(--violet)';
            allBtn.style.color = 'var(--white)';
          }
          renderCourses('all', '');
        });
      }
      return;
    }

    // Render Premium Cards
    coursesContainer.innerHTML = filtered.map(course => {
      let imgSrc = course.imageUrl;
      if (!imgSrc || imgSrc === 'default-course.webp' || imgSrc === '/assets/images/default-course.jpg') {
        if (course.category === 'Classical Piano') imgSrc = 'https://images.unsplash.com/photo-1552422535-c45813c61732?auto=format&fit=crop&q=80&w=800';
        else if (course.category === 'Jazz Keyboard') imgSrc = 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800';
        else if (course.category === 'Music Theory') imgSrc = 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&q=80&w=800';
        else imgSrc = 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&q=80&w=800';
      } else if (!imgSrc.startsWith('http') && !imgSrc.startsWith('/')) {
        imgSrc = App.getAssetPath('/assets/images/' + imgSrc);
      }

      return `
      <div class="premium-course-wrapper" style="animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; height: 100%;">
        <div class="card bg-overlay overflow-hidden flex col justify-between group premium-course-card" style="border: 1px solid rgba(255,255,255,0.03); border-radius: 12px; transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease; box-shadow: 0 4px 20px rgba(0,0,0,0.15); height: 100%;">
          <div class="block">
            <div class="relative overflow-hidden" style="height: 240px; border-bottom: 1px solid rgba(255,255,255,0.03);">
              <img src="${imgSrc}" alt="${course.title}" class="w-full h-full object-cover img-zoom" style="transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1); filter: brightness(0.85);" / loading="lazy">
              <span class="badge badge--violet absolute top-4 right-4 shadow-sm" style="z-index: 2; text-transform: capitalize; backdrop-filter: blur(8px); background: rgba(99, 102, 241, 0.9);">${course.level || 'All Levels'}</span>
              <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(18,18,18,0.95) 0%, rgba(18,18,18,0) 80%); z-index: 1;"></div>
            </div>
            <div class="p-6 pb-2">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xs font-bold uppercase tracking-wider text-violet">${course.category || 'Course'}</span>
              </div>
              <h3 class="h4 text-primary mb-3 leading-tight title-transition" style="transition: color 0.3s ease;">${course.title}</h3>
              <p class="body-sm text-secondary mb-4 clamp-3" style="line-height: 1.6;">${course.description || ''}</p>
            </div>
          </div>
          <div class="p-6 pt-0 mt-auto">
            <div class="flex justify-between items-center border-top pt-5" style="border-color: rgba(255,255,255,0.05);">
              <span class="body-xs text-secondary flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                ${course.totalDuration ? course.totalDuration + ' Mins' : 'Flexible'}
              </span>
              <span class="h5 text-primary font-bold" style="font-family: var(--font-body); letter-spacing: -0.02em;">${course.price ? '₹' + course.price : 'Free'}</span>
            </div>
            <a href="/courses/${course.slug || course._id}" class="btn btn--outline btn--sm w-full mt-6 text-center enroll-btn" style="transition: all 0.3s ease; border-radius: 8px;">View Details</a>
          </div>
        </div>
      </div>
      `;
    }).join('');

    // Staggered fade in animation for cards
    const wrappers = coursesContainer.querySelectorAll('.premium-course-wrapper');
    wrappers.forEach((wrapper, index) => {
      wrapper.style.animationDelay = `${index * 0.05}s`;
    });
  };

  // Fetch from API
  try {
    const response = await Api.get('/courses');
    if (response && response.data && response.data.courses) {
      allCourses = response.data.courses;
      // Artificial delay to show off the premium skeleton loader
      setTimeout(() => {
        renderCourses('all', '');
      }, 800);
    } else {
      coursesContainer.innerHTML = '<p class="text-secondary text-center" style="grid-column: 1 / -1;">No courses available yet.</p>';
    }
  } catch (err) {
    console.error('Failed to load courses:', err);
    coursesContainer.innerHTML = '<p class="text-red-500 text-center" style="grid-column: 1 / -1;">Failed to load courses. Please try again later.</p>';
  }

  // Bind Events
  if (filterButtons && searchInput) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Update active styling
        filterButtons.forEach(b => {
          b.style.background = 'transparent';
          b.style.color = 'var(--text-secondary)';
        });
        e.target.style.background = 'var(--violet)';
        e.target.style.color = 'var(--white)';
        
        const cat = e.target.getAttribute('data-filter');
        renderCourses(cat, searchInput.value);
      });
    });

    searchInput.addEventListener('input', Helpers.debounce((e) => {
      const activeBtn = Array.from(filterButtons).find(b => b.style.color === 'var(--white)') || filterButtons[0];
      const cat = activeBtn.getAttribute('data-filter') || 'all';
      renderCourses(cat, e.target.value);
    }, 300));
  }

  // Inject Custom Styles for specific hover effects (zoom & lift)
  const styleId = 'premium-course-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(15px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @media (hover: hover) and (pointer: fine) {
        .premium-course-card:hover {
          transform: translateY(-8px);
          border-color: rgba(255,255,255,0.12) !important;
        }
        .premium-course-card:hover .img-zoom {
          transform: scale(1.08) !important;
          filter: brightness(1) !important;
        }
        .premium-course-card:hover .title-transition {
          color: var(--violet);
        }
        .premium-course-card:hover .enroll-btn {
          background-color: var(--violet);
          border-color: var(--violet);
          color: var(--white);
        }
      }
    `;
    document.head.appendChild(style);
  }

});
