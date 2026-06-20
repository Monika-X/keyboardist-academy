/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Gallery Page View (Dynamic Connection)
 *  frontend/pages/gallery.js
 * ============================================================
 */

'use strict';

Router.register('/gallery', async () => {
  const app = document.getElementById('app');
  if (!app) return;

  const FALLBACK_GALLERY = [
    {
      _id: 'fallback-1',
      title: 'Concert Recital Hall',
      imageUrl: 'https://images.unsplash.com/photo-1552422535-c45813c61732?auto=format&fit=crop&q=80&w=800',
      description: 'Our main recital studio equipped with two premium Grand Pianos.'
    },
    {
      _id: 'fallback-2',
      title: 'Digital Lab Suite',
      imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800',
      description: 'Acoustic workstations used for recording student performance audios.'
    },
    {
      _id: 'fallback-3',
      title: 'Practice Chamber',
      imageUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&q=80&w=800',
      description: 'Soundproof booths designed for individual distraction-free practice.'
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
    <!-- 1. HERO SECTION -->
    <section class="section  relative" style="padding-top: calc(var(--section-md) + 2rem);">
      <div class="container text-center">
        <span class="eyebrow mb-4">Visual Tour</span>
        <h1 class="display-lg text-primary mb-6" style="font-size: clamp(var(--text-2xl), 6vw, var(--text-6xl)); line-height: 1.15;">
          Inside Our Premium <br>Chennai Studios
        </h1>
        <p class="body-lg text-secondary mx-auto mb-12" style="max-width: 700px; font-size: clamp(var(--text-sm), 2vw, var(--text-base));">
          A visual showcase of our state-of-the-art concert acoustic pianos, learning suites, and physical class environments.
        </p>
      </div>
    </section>

    <!-- 2. CONTENT GRID & 3. MEDIA SECTIONS (Modern Gallery Cards) -->
    <section class="section section--alt border-top border-bottom">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="eyebrow">Studio Showcase</span>
          <h2 class="section-header__title">Images From Our Studios</h2>
        </div>

        <div id="gallery-grid-container" class="grid grid-3" style="gap: clamp(var(--sp-4), 4vw, var(--sp-8));">
          <!-- Skeletons (Shown initially) -->
          ${[1, 2, 3].map(() => `
            <div class="card overflow-hidden">
              <div class="skeleton skeleton--card" style="height: 220px; border-radius: 0;"></div>
              <div class="p-6">
                <div class="skeleton skeleton--text w-1/2 mb-4" style="height: 20px;"></div>
                <div class="skeleton skeleton--text w-full mb-2"></div>
                <div class="skeleton skeleton--text w-5/6"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- 3. STUDIO INSTRUMENTS & AMENITIES -->
    <section class="section border-top border-bottom">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="eyebrow">Acoustic Setup</span>
          <h2 class="section-header__title">Studio Setup & Instruments</h2>
        </div>
        <div class="grid grid-3" style="gap: clamp(var(--sp-4), 4vw, var(--sp-8));">
          <div class="card p-6 border bg-overlay">
            <h3 class="h6 text-primary mb-2">Acoustic Pianos</h3>
            <p class="body-xs text-secondary">Premium weighted-action acoustic pianos designed for precise touch and dynamic response.</p>
          </div>
          <div class="card p-6 border bg-overlay">
            <h3 class="h6 text-primary mb-2">Optimized Chambers</h3>
            <p class="body-xs text-secondary">Acoustically soundproofed chambers ensuring complete concentration during physical practice.</p>
          </div>
          <div class="card p-6 border bg-overlay">
            <h3 class="h6 text-primary mb-2">Workstation Access</h3>
            <p class="body-xs text-secondary">Access to standard recording interfaces and MIDI keyboard equipment for contemporary learning.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. CALL TO ACTION -->
    <section class="section ">
      <div class="container text-center py-8">
        <span class="eyebrow">Campus Visit</span>
        <h2 class="display-md text-primary mb-6" style="font-size: clamp(var(--text-xl), 5vw, var(--text-4xl));">Experience the Atmosphere In-Person</h2>
        <p class="body-md text-secondary mb-12 mx-auto" style="max-width: 600px;">
          Plan a physical tour of our Chennai campus, meet our faculty, and practice on our grand pianos.
        </p>
        <div class="flex gap-4 sm\:flex-col w-full justify-center items-center">
          <a href="/contact" class="btn btn--primary btn--lg w-fit text-center" style="min-width: 200px;">Schedule Studio Tour</a>
          <a href="/contact" class="btn btn--outline btn--lg w-fit text-center" style="min-width: 200px;">Inquire Admissions</a>
        </div>
      </div>
    </section>
  `;

  app.innerHTML = App.wrapWithLayout(html);
  App.initNavbarScroll();
  App.highlightActiveLink('/gallery');

  const renderGallery = (list) => {
    const container = document.getElementById('gallery-grid-container');
    if (!container) return;

    if (list.length === 0) {
      container.innerHTML = `
        <div class="card p-8 text-center border bg-overlay w-full" style="grid-column: 1 / -1; max-width: 600px; margin: 0 auto;">
          <h3 class="h4 text-primary mb-2">No Gallery Media Found</h3>
          <p class="body-sm text-secondary">Our campus photos are being updated. Please check back later!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = list.map(f => `
      <div class="card hover\:scale overflow-hidden">
        <div class="relative bg-overlay flex items-center justify-center text-center overflow-hidden" style="height: 220px;">
          <img src="${getImageUrl(f.imageUrl)}" alt="${f.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;" loading="lazy">
        </div>
        <div class="p-6">
          <h3 class="h6 text-primary mb-2">${f.title}</h3>
          <p class="body-xs text-secondary">${f.description || ''}</p>
        </div>
      </div>
    `).join('');
  };

  try {
    const res = await Api.get('/gallery?isPublished=true');
    const items = res.data.galleryItems || [];
    renderGallery(items);
  } catch (err) {
    console.warn('API error fetching gallery, falling back to static tour:', err);
    renderGallery(FALLBACK_GALLERY);
  }
});
