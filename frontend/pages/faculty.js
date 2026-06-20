/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Faculty Page View (Dynamic Connection)
 *  frontend/pages/faculty.js
 * ============================================================
 */

'use strict';

Router.register('/faculty', async () => {
  const app = document.getElementById('app');
  if (!app) return;

  const FALLBACK_FACULTY = [
    {
      _id: 'fallback-1',
      name: 'Karan Mehta',
      role: 'Founder & Principal Instructor',
      yearsOfExp: 15,
      bio: 'Karan is the Founder and Principal Instructor of Keyboardist Academy. With over 15 years of experience in concert performance and composition, he guides students of all levels toward technical mastery and musical expression.',
      specialties: ['Classical Piano', 'Romantic technique', 'dynamic expression', 'classical score interpretation'],
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800'
    },
    {
      _id: 'fallback-2',
      name: 'Arun Kumar',
      role: 'Senior Keyboard Instructor',
      yearsOfExp: 12,
      bio: 'Arun specializes in contemporary chord voicings, arpeggios, and improvisational keyboard techniques, helping intermediate students transition smoothly into modern playing.',
      specialties: ['Jazz Keyboard', 'shell voicings', 'secondary dominants', 'contemporary jazz improvisation techniques'],
      imageUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=800'
    },
    {
      _id: 'fallback-3',
      name: 'Priya Raman',
      role: 'Music Theory Instructor',
      yearsOfExp: 10,
      bio: 'Priya Raman specializes in music theory, sight reading, ear training, beginner student development, performance preparation, and foundational keyboard education. She supports students across beginner and intermediate learning pathways.',
      specialties: ['Music Theory', 'sheet score analysis', 'key signature recognition', 'sight-reading dexterity'],
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
      return url;
    }
    return App.getAssetPath(url);
  };

  const html = `
    <!-- 1. HERO -->
    <section class="section  relative" style="padding-top: calc(var(--section-md) + 2rem);">
      <div class="container text-center">
        <span class="eyebrow">Our Faculty</span>
        <h1 class="display-lg text-primary mb-6" style="font-size: clamp(var(--text-2xl), 6vw, var(--text-6xl)); line-height: 1.15;">
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

        <div id="faculty-grid-container" class="grid grid-3">
          <!-- Skeletons (Shown initially) -->
          ${[1, 2, 3].map(() => `
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

    <!-- 3. FACULTY PROFILES & 4. EXPERIENCE & 5. ACHIEVEMENTS -->
    <section class="section" id="profiles">
      <div class="container flex col gap-16">
        <div class="section-header section-header--center">
          <span class="eyebrow">Faculty Profiles</span>
          <h2 class="section-header__title">Biographies & Experience</h2>
        </div>

        <div id="faculty-profiles-container" class="flex col gap-16">
          <!-- Skeletons (Shown initially) -->
          ${[1, 2].map(() => `
            <div class="grid grid-2 items-center" style="gap: clamp(var(--sp-6), 6vw, var(--sp-16));">
              <div class="card p-8 border bg-overlay text-center flex col items-center">
                <div class="skeleton skeleton--avatar mb-6" style="width: 120px; height: 120px;"></div>
                <div class="skeleton skeleton--text w-1/2 mb-4" style="height: 20px;"></div>
                <div class="skeleton skeleton--text w-1/3" style="height: 12px;"></div>
              </div>
              <div>
                <div class="skeleton skeleton--text w-1/3 mb-6" style="height: 24px;"></div>
                <div class="skeleton skeleton--text w-full mb-4"></div>
                <div class="skeleton skeleton--text w-5/6 mb-6"></div>
                <div class="skeleton skeleton--text w-1/4 mb-4" style="height: 18px;"></div>
                <div class="skeleton skeleton--text w-3/4 mb-2"></div>
                <div class="skeleton skeleton--text w-2/3"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- 6. CTA -->
    <section class="section  border-top">
      <div class="container text-center py-8">
        <span class="eyebrow">Consultation</span>
        <h2 class="display-md text-primary mb-6" style="font-size: clamp(var(--text-xl), 5vw, var(--text-4xl));">Learn with Our Expert Team</h2>
        <p class="body-md text-secondary mb-12 mx-auto" style="max-width: 600px;">
          Create a free account to access basic piano posture lessons, custom sheet notation files, and track your progress.
        </p>
        <div class="flex gap-4 sm\:flex-col w-full justify-center items-center">
          <a href="/contact" class="btn btn--primary btn--lg w-fit text-center" style="min-width: 200px;">Register Free</a>
          <a href="/contact" class="btn btn--outline btn--lg w-fit text-center" style="min-width: 200px;">Contact Faculty</a>
        </div>
      </div>
    </section>
  `;

  app.innerHTML = App.wrapWithLayout(html);
  App.initNavbarScroll();
  App.highlightActiveLink('/faculty');

  const renderRoster = (facultyList) => {
    const gridContainer = document.getElementById('faculty-grid-container');
    const profilesContainer = document.getElementById('faculty-profiles-container');
    if (!gridContainer || !profilesContainer) return;

    if (facultyList.length === 0) {
      gridContainer.innerHTML = `
        <div class="card p-8 text-center border bg-overlay w-full" style="grid-column: 1 / -1; max-width: 600px; margin: 0 auto;">
          <h3 class="h4 text-primary mb-2">No Instructors Found</h3>
          <p class="body-sm text-secondary">Our faculty roster is currently being updated. Please check back later!</p>
        </div>
      `;
      profilesContainer.innerHTML = '';
      return;
    }

    // Render Grid Cards
    gridContainer.innerHTML = facultyList.map(f => `
      <div class="card hover\:scale overflow-hidden flex col justify-between">
        <div>
          <div class="relative overflow-hidden" style="height: 240px;">
            <img src="${getImageUrl(f.imageUrl)}" alt="${f.name}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;" loading="lazy">
          </div>
          <div class="p-6">
            <span class="label text-accent">${(f.specialties && f.specialties[0]) || 'Instructor'}</span>
            <h3 class="h5 text-primary mt-2 mb-1">${f.name}</h3>
            <p class="body-xs text-tertiary">${f.yearsOfExp || 0} Years Exp</p>
            <p class="body-xs text-secondary mt-4">${f.bio.split('.')[0]}.</p>
          </div>
        </div>
        <div class="p-6 pt-0">
          <a href="#profiles" class="btn btn--outline btn--sm w-full text-center">View Profile</a>
        </div>
      </div>
    `).join('');

    // Render Biographies & Highlights (Alternating structure)
    profilesContainer.innerHTML = facultyList.map((f, i) => {
      const isEven = i % 2 === 0;
      const cardHtml = `
        <div class="card p-8 border bg-overlay text-center">
          <div class="mx-auto mb-6 overflow-hidden rounded-full border border-subtle" style="width: 120px; height: 120px;">
            <img src="${getImageUrl(f.imageUrl)}" alt="${f.name}" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy">
          </div>
          <h3 class="h4 text-primary">${f.name}</h3>
          <p class="body-xs text-accent uppercase font-bold tracking-wider mt-2">${f.role}</p>
        </div>
      `;
      const textHtml = `
        <div>
          <h3 class="h3 text-primary mb-4">Background & Experience</h3>
          <p class="body-sm text-secondary mb-6">${f.bio}</p>
          <h4 class="h5 text-primary mb-3">Key Highlights</h4>
          <ul class="flex col gap-2 text-sm text-secondary">
            <li><span class="text-accent">&bull;</span> Over ${f.yearsOfExp || 0} years of active teaching and performance experience</li>
            ${(f.specialties || []).map(s => `<li><span class="text-accent">&bull;</span> Specializes in ${s}</li>`).join('')}
          </ul>
        </div>
      `;

      return `
        <div class="grid grid-2 items-center" style="gap: clamp(var(--sp-6), 6vw, var(--sp-16));">
          ${isEven ? cardHtml + textHtml : textHtml + cardHtml}
        </div>
        ${i < facultyList.length - 1 ? '<div class="divider"></div>' : ''}
      `;
    }).join('');
  };

  try {
    const res = await Api.get('/faculty?isPublished=true');
    const faculty = res.data.faculty || [];
    // Show dynamic data
    renderRoster(faculty);
  } catch (err) {
    console.warn('API error fetching faculty, falling back to static team:', err);
    renderRoster(FALLBACK_FACULTY);
  }
});
