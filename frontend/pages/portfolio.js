/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Student Portfolio Page View (Dynamic Connection)
 *  frontend/pages/portfolio.js
 * ============================================================
 */

'use strict';

Router.register('/portfolio', async () => {
  const app = document.getElementById('app');
  if (!app) return;

  const FALLBACK_PORTFOLIOS = [
    {
      _id: 'fallback-1',
      title: 'Chopin Nocturne Op. 9 No. 2',
      studentName: 'Fundamentals Student',
      courseName: 'Fundamentals',
      description: 'A meticulous interpretation focusing on balanced left-hand rhythms and right-hand expressiveness.',
      imageUrl: 'https://images.unsplash.com/photo-1571974599782-87624638275e?auto=format&fit=crop&q=80&w=800',
      type: 'video',
      mediaUrl: 'https://www.youtube.com/watch?v=9E6b3swavWg'
    },
    {
      _id: 'fallback-2',
      title: 'Autumn Leaves Improvisation',
      studentName: 'Jazz Keyboard Student',
      courseName: 'Jazz Keyboard',
      description: 'Exploring 2-5-1 voicings, custom triad pairs, and modern keyboard rhythmic phrasing.',
      imageUrl: 'https://images.unsplash.com/photo-1460036521480-ff49c08c2781?auto=format&fit=crop&q=80&w=800',
      type: 'video',
      mediaUrl: 'https://www.youtube.com/watch?v=2n55k_aLd94'
    },
    {
      _id: 'fallback-3',
      title: 'Bach C-Major Prelude',
      studentName: 'Advanced Student',
      courseName: 'Advanced',
      description: 'Emphasizing even finger curvature, articulation precision, and clean acoustic sustain pedal timing.',
      imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800',
      type: 'image'
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
    <!-- 1. FEATURED STUDENTS (Hero) -->
    <section class="section  relative" style="padding-top: calc(var(--section-md) + 2rem);">
      <div class="container text-center">
        <span class="eyebrow">Student Portfolios</span>
        <h1 class="display-lg text-primary mb-6" style="font-size: clamp(var(--text-2xl), 6vw, var(--text-6xl)); line-height: 1.15;">
          Showcasing Our <br>Talented Students
        </h1>
        <p class="body-lg text-secondary mx-auto mb-12" style="max-width: 700px; font-size: clamp(var(--text-sm), 2vw, var(--text-base));">
          Explore performances, audio recordings, certification accomplishments, and growth milestones achieved by our global academy community.
        </p>
      </div>
    </section>

    <!-- 2. VIDEO SHOWCASE (Modern Gallery Cards) -->
    <section class="section section--alt border-top border-bottom">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="eyebrow">Exhibitions</span>
          <h2 class="section-header__title">Video Performance Showcase</h2>
          <p class="section-header__desc">Watch students perform classical masterworks and spontaneous jazz standards.</p>
          ${Auth.isLoggedIn() && Auth.isAdmin() ? `
            <button class="btn btn--primary btn--sm mt-4 admin-add-btn" data-type="video" style="margin-top: 1rem;">+ Add Video/Image Spotlight</button>
          ` : ''}
        </div>

        <div id="portfolio-grid-container" class="grid grid-3">
          <!-- Skeletons (Shown initially) -->
          ${[1, 2, 3].map(() => `
            <div class="card overflow-hidden">
              <div class="skeleton skeleton--card" style="height: 180px; border-radius: 0;"></div>
              <div class="p-6">
                <div class="skeleton skeleton--text w-1/3 mb-4" style="height: 12px;"></div>
                <div class="skeleton skeleton--text w-3/4 mb-4" style="height: 20px;"></div>
                <div class="skeleton skeleton--text w-full mb-2"></div>
                <div class="skeleton skeleton--text w-5/6"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- 3. AUDIO SHOWCASE -->
    <section class="section">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="eyebrow">Studio Recitals</span>
          <h2 class="section-header__title">Audio Recital Highlights</h2>
          ${Auth.isLoggedIn() && Auth.isAdmin() ? `
            <button class="btn btn--primary btn--sm mt-4 admin-add-btn" data-type="audio" style="margin-top: 1rem;">+ Add Audio Recital</button>
          ` : ''}
        </div>

        <div id="audio-recitals-container" class="flex col gap-4" style="max-width: 800px; margin: 0 auto;">
          <!-- Skeletons (Shown initially) -->
          ${[1, 2].map(() => `
            <div class="card border bg-overlay border-subtle flex justify-between items-center gap-4 text-left" style="padding: clamp(var(--sp-4), 5vw, var(--sp-6));">
              <div class="w-full">
                <div class="skeleton skeleton--text w-1/3 mb-2" style="height: 18px;"></div>
                <div class="skeleton skeleton--text w-1/2" style="height: 12px;"></div>
              </div>
              <div class="skeleton w-24" style="height: 32px; border-radius: 20px;"></div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- 4. CERTIFICATES & 5. ACHIEVEMENTS -->
    <section class="section section--alt border-top border-bottom">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="eyebrow">Credentials</span>
          <h2 class="section-header__title">Certifications & Honors</h2>
          <p class="section-header__desc">Our graduates successfully clear advanced performance levels and academy milestones with distinction.</p>
        </div>

         <div class="grid grid-3">
          <div class="card p-6 border bg-overlay border-subtle text-center">
            <div class="mb-4" style="color: var(--violet);"><svg class="icon-svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div>
            <h3 class="h5 text-primary">Advanced Program</h3>
            <p class="body-xs text-secondary mt-2">12 graduates successfully cleared advanced performance levels in 2025.</p>
          </div>
          <div class="card p-6 border bg-overlay border-subtle text-center">
            <div class="mb-4" style="color: var(--violet);"><svg class="icon-svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg></div>
            <h3 class="h5 text-primary">Studio Recital Honors</h3>
            <p class="body-xs text-secondary mt-2">First prize honors awarded to our classical cohorts at the local Keyboardist Studio Recital.</p>
          </div>
          <div class="card p-6 border bg-overlay border-subtle text-center">
            <div class="mb-4" style="color: var(--violet);"><svg class="icon-svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg></div>
            <h3 class="h5 text-primary">Conservatory Admits</h3>
            <p class="body-xs text-secondary mt-2">3 alumni successfully admitted to prestigious classical conservatories for performance degrees.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. SUCCESS STORIES -->
    <section class="section">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="eyebrow">Case Studies</span>
          <h2 class="section-header__title">Student Success Stories</h2>
        </div>

        <div class="grid grid-2" style="gap: clamp(var(--sp-4), 4vw, var(--sp-8));">
          <div class="card p-8 border">
            <p class="body-base italic text-secondary mb-6" style="font-size: clamp(var(--text-xs), 2vw, var(--text-base));">
              "I struggled with stiffness in my pinky and ring fingers for years. The structured warmups and hand alignments unlocked my technical limit. Passed my conservatory audition with ease!"
            </p>
            <h4 class="body-md text-primary font-semibold">&mdash; Fundamentals Alumnus</h4>
            <span class="body-xs text-tertiary">Admit Graduate</span>
          </div>

          <div class="card p-8 border">
            <p class="body-base italic text-secondary mb-6" style="font-size: clamp(var(--text-xs), 2vw, var(--text-base));">
              "Being self-taught, I was lost in scales and notation. The clear category pathways and video close-ups allowed me to read advanced scores comfortably in under 6 months."
            </p>
            <h4 class="body-md text-primary font-semibold">&mdash; Advanced Alumnus</h4>
            <span class="body-xs text-tertiary">Advanced Program Graduate</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. CTA -->
    <section class="section  border-top">
      <div class="container text-center py-8">
        <span class="eyebrow">Join the Alumni</span>
        <h2 class="display-md text-primary mb-6" style="font-size: clamp(var(--text-xl), 5vw, var(--text-4xl));">Build Your Piano Portfolio Today</h2>
        <p class="body-md text-secondary mb-12 mx-auto" style="max-width: 600px;">
          Create a free account to log your practice milestones, download score notation files, and submit performance reviews.
        </p>
        <div class="flex gap-4 sm\:flex-col w-full justify-center items-center">
          <a href="/contact" class="btn btn--primary btn--lg w-fit text-center" style="min-width: 200px;">Register Free</a>
          <a href="/contact" class="btn btn--outline btn--lg w-fit text-center" style="min-width: 200px;">Contact Faculty</a>
        </div>
      </div>
    </section>

    <!-- Admin CRUD Dialog Modal -->
    <div id="portfolio-admin-modal" class="fixed inset-0 bg-black-90 items-center justify-center hidden z-modal" style="display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.85); align-items: center; justify-content: center; z-index: 9999; padding: 8px; box-sizing: border-box;">
      <div class="card border bg-overlay w-full" style="border-radius: var(--radius-lg); box-shadow: var(--shadow-xl); max-height: 90vh; overflow-y: auto; overflow-x: hidden; background: var(--bg-modal, #252525); max-width: 500px; width: 100%; padding: clamp(16px, 4vw, 32px); box-sizing: border-box;">
        <div class="flex justify-between items-center mb-6 border-bottom pb-4" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 16px;">
          <h3 class="h4 text-primary" id="p-modal-title">Edit Spotlight Recital</h3>
          <button class="text-tertiary hover:text-primary" id="p-close-modal-btn" style="font-size: 24px; border: none; background: none; cursor: pointer;">&times;</button>
        </div>
        <form id="p-modal-form" class="form flex col gap-6" style="display: flex; flex-direction: column; gap: 16px;">
          <input type="hidden" id="admin-p-id" />
          <div class="form-group" style="overflow: hidden;">
            <label class="form-label label">Recital / Spotlight Title</label>
            <input type="text" id="admin-p-title" required class="form-input" style="width: 100%; box-sizing: border-box;" />
          </div>
          <div class="form-group" style="overflow: hidden;">
            <label class="form-label label">Student Name</label>
            <input type="text" id="admin-p-student" required class="form-input" style="width: 100%; box-sizing: border-box;" />
          </div>
          <div class="form-group" style="overflow: hidden;">
            <label class="form-label label">Course / Academy Path / Location</label>
            <input type="text" id="admin-p-course" required class="form-input" style="width: 100%; box-sizing: border-box;" />
          </div>
          <div class="form-group" style="overflow: hidden;">
            <label class="form-label label">Spotlight Type</label>
            <select id="admin-p-type" class="form-input" style="width: 100%; max-width: 100%; display: block; box-sizing: border-box; background: var(--surface-input); color: var(--text-primary); overflow: hidden; text-overflow: ellipsis;">
              <option value="image">Certificate / Image Only</option>
              <option value="video">Video Performance</option>
              <option value="audio">Audio Recital Highlight</option>
            </select>
          </div>
          <div class="form-group" id="admin-p-media-file-group" style="display: none; overflow: hidden;">
            <label class="form-label label" id="admin-p-mediafile-label">Upload Video File</label>
            <input type="file" id="admin-p-mediafile" class="form-input" style="width: 100%; max-width: 100%; height: auto; padding: 10px 12px; display: block; box-sizing: border-box;" />
          </div>
          <div class="form-group" style="overflow: hidden;">
            <label class="form-label label">Upload Portfolio Image/Certificate/Thumbnail</label>
            <input type="file" id="admin-p-file" accept="image/*" class="form-input" style="width: 100%; max-width: 100%; height: auto; padding: 10px 12px; display: block; box-sizing: border-box;" />
          </div>
          <div class="form-group" style="overflow: hidden;">
            <label class="form-label label">Performance Description</label>
            <textarea id="admin-p-desc" required class="form-input" rows="3" style="width: 100%; box-sizing: border-box;"></textarea>
          </div>
          <div class="form-group flex items-center gap-3" style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <input type="checkbox" id="admin-p-published" checked style="width: 18px; height: 18px; flex-shrink: 0;" />
            <label for="admin-p-published" class="label text-primary cursor-pointer">Publish on public website</label>
          </div>
          <div class="flex gap-4 justify-end mt-4" style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 16px; flex-wrap: wrap;">
            <button type="button" class="btn btn--outline btn--sm" id="p-cancel-modal-btn">Cancel</button>
            <button type="submit" class="btn btn--primary btn--sm" id="p-submit-modal-btn">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  `;

  app.innerHTML = App.wrapWithLayout(html);
  App.initNavbarScroll();
  App.highlightActiveLink('/portfolio');

  const playVideoInline = (containerId, mediaUrl) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let embedHtml = '';
    if (mediaUrl.includes('youtube.com') || mediaUrl.includes('youtu.be')) {
      let videoId = '';
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = mediaUrl.match(regExp);
      if (match && match[2].length === 11) {
        videoId = match[2];
      }
      if (videoId) {
        embedHtml = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" width="100%" height="100%" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen style="position: absolute; top:0; left:0; width:100%; height:100%; border:none;"></iframe>`;
      }
    }
    
    if (!embedHtml) {
      embedHtml = `<video src="${mediaUrl}" autoplay controls style="position: absolute; top:0; left:0; width:100%; height:100%; object-fit: cover;"></video>`;
    }
    
    container.innerHTML = embedHtml;
  };

  const renderPortfolios = (list) => {
    const container = document.getElementById('portfolio-grid-container');
    if (!container) return;

    // Filter out audio highlights from the video/image showcase grid
    const spotlights = list.filter(p => p.type !== 'audio');

    if (spotlights.length === 0) {
      container.innerHTML = `
        <div class="card p-8 text-center border bg-overlay w-full" style="grid-column: 1 / -1; max-width: 600px; margin: 0 auto;">
          <h3 class="h4 text-primary mb-2">No Student Portfolios Found</h3>
          <p class="body-sm text-secondary">Our student recital spotlights are being prepared. Check back shortly!</p>
        </div>
      `;
      return;
    }

    const isAdminUser = Auth.isLoggedIn() && Auth.isAdmin();

    container.innerHTML = spotlights.map(p => {
      const cardId = `video-card-${p._id}`;
      return `
        <div class="card hover\:scale overflow-hidden">
          ${p.type === 'video' ? `
            <div id="${cardId}" class="relative block overflow-hidden cursor-pointer" style="height: 180px;">
              <img src="${getImageUrl(p.imageUrl)}" alt="${p.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;" loading="lazy">
              <div class="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors play-video-trigger" data-url="${p.mediaUrl || ''}" data-container-id="${cardId}">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="1"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
              </div>
            </div>
          ` : `
            <div class="relative overflow-hidden" style="height: 180px;">
              <img src="${getImageUrl(p.imageUrl)}" alt="${p.title}" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy">
            </div>
          `}
          <div class="p-6">
            <span class="badge badge--violet" style="display: inline-block; margin-bottom: 12px;">${p.title}</span>
            <h3 class="h6 text-primary mb-2">Performed by ${p.studentName}</h3>
            <span class="body-xs text-tertiary block mb-2">${p.courseName}</span>
            <p class="body-xs text-secondary">${p.description}</p>
            ${isAdminUser ? `
              <div class="flex gap-2 mt-4 pt-3 border-top justify-end" style="border-top: 1px solid var(--border-subtle); display: flex; justify-content: flex-end; gap: 8px;">
                <button class="btn btn--outline btn--xs admin-edit-btn" data-id="${p._id}" style="padding: 4px 8px; font-size: 10px;">Edit</button>
                <button class="btn btn--outline btn--xs text-accent admin-delete-btn" data-id="${p._id}" style="padding: 4px 8px; font-size: 10px;">Delete</button>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');

    // Bind video play triggers
    container.querySelectorAll('.play-video-trigger').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const url = trigger.dataset.url;
        const containerId = trigger.dataset.containerId;
        if (url && containerId) {
          playVideoInline(containerId, url);
        }
      });
    });

    // Bind edit/delete handlers
    if (isAdminUser) {
      container.querySelectorAll('.admin-edit-btn').forEach(btn => {
        btn.addEventListener('click', () => openAdminModal(btn.dataset.id));
      });
      container.querySelectorAll('.admin-delete-btn').forEach(btn => {
        btn.addEventListener('click', () => deletePortfolioItem(btn.dataset.id));
      });
    }
  };

  const FALLBACK_AUDIOS = [
    {
      _id: 'fallback-audio-1',
      title: 'Beethoven Pathétique Sonata (1st Mov)',
      studentName: 'Advanced Student',
      courseName: 'Recorded in Avadi Studio A',
      type: 'audio',
      mediaUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    },
    {
      _id: 'fallback-audio-2',
      title: 'Chords & Scale Modulation Study',
      studentName: 'Improvisation Student',
      courseName: 'Recorded in Avadi Studio B',
      type: 'audio',
      mediaUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
    }
  ];

  let activeAudio = null;
  let activePlayBadge = null;

  const renderAudioRecitals = (list) => {
    const container = document.getElementById('audio-recitals-container');
    if (!container) return;

    const audios = list.filter(p => p.type === 'audio');

    // If no dynamic audio exists, fall back to default highlights
    const itemsToRender = audios.length > 0 ? audios : FALLBACK_AUDIOS;
    const isAdminUser = Auth.isLoggedIn() && Auth.isAdmin();

    container.innerHTML = itemsToRender.map(a => `
      <div class="card border bg-overlay border-subtle flex justify-between items-center sm:flex-col gap-4 text-left sm:text-center audio-recital-card" style="padding: clamp(var(--sp-4), 5vw, var(--sp-6));" data-url="${a.mediaUrl || ''}">
        <div style="flex: 1; min-width: 0;">
          <h4 class="h5 text-primary">${a.title}</h4>
          <p class="body-xs text-secondary mt-1">Piano: ${a.studentName} &bull; ${a.courseName}</p>
        </div>
        <div class="flex flex-wrap items-center gap-2 justify-center sm:justify-start" style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px; justify-content: center;">
          <div class="play-audio-wrapper">
            <span class="badge badge--violet play-audio-btn" style="font-size: 14px; flex-shrink: 0; cursor: pointer; user-select: none;">
              <svg class="icon-svg play-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:6px;"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <span class="btn-text">Play Audio</span>
            </span>
          </div>
          ${isAdminUser && !(a._id && String(a._id).startsWith('fallback')) ? `
            <button class="btn btn--outline btn--xs admin-edit-audio-btn" data-id="${a._id}" style="padding: 6px 12px; font-size: 12px; flex-shrink: 0;">Edit</button>
            <button class="btn btn--outline btn--xs text-accent admin-delete-audio-btn" data-id="${a._id}" style="padding: 6px 12px; font-size: 12px; flex-shrink: 0;">Delete</button>
          ` : ''}
        </div>
      </div>
    `).join('');

    const updatePlayState = (badge, isPlaying) => {
      const iconSvg = badge.querySelector('.play-icon');
      const textSpan = badge.querySelector('.btn-text');
      if (isPlaying) {
        iconSvg.innerHTML = `<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>`;
        textSpan.textContent = 'Pause Audio';
      } else {
        iconSvg.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"/>`;
        textSpan.textContent = 'Play Audio';
      }
    };

    container.querySelectorAll('.audio-recital-card').forEach(card => {
      const playBtn = card.querySelector('.play-audio-btn');
      const url = card.dataset.url;
      if (!playBtn || !url) return;

      playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        if (activeAudio && activeAudio.src === url) {
          if (activeAudio.paused) {
            activeAudio.play();
            updatePlayState(playBtn, true);
          } else {
            activeAudio.pause();
            updatePlayState(playBtn, false);
          }
          return;
        }

        if (activeAudio) {
          activeAudio.pause();
          if (activePlayBadge) {
            updatePlayState(activePlayBadge, false);
          }
        }

        activeAudio = new Audio(url);
        activePlayBadge = playBtn;
        activeAudio.play().then(() => {
          updatePlayState(playBtn, true);
        }).catch(err => {
          console.error('Error playing audio:', err);
          Helpers.toast('Failed to load audio file.', 'error');
        });

        activeAudio.addEventListener('ended', () => {
          updatePlayState(playBtn, false);
          activeAudio = null;
          activePlayBadge = null;
        });
      });
    });

    // Bind edit/delete handlers for audio cards
    if (isAdminUser) {
      container.querySelectorAll('.admin-edit-audio-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          openAdminModal(btn.dataset.id);
        });
      });
      container.querySelectorAll('.admin-delete-audio-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          deletePortfolioItem(btn.dataset.id);
        });
      });
    }
  };

  let portfoliosList = [];

  const loadPortfolios = async () => {
    try {
      const isAdminUser = Auth.isLoggedIn() && Auth.isAdmin();
      const endpoint = isAdminUser ? '/portfolios' : '/portfolios?isPublished=true';
      const res = await Api.get(endpoint);
      portfoliosList = res.data.portfolios || [];
      renderPortfolios(portfoliosList);
      renderAudioRecitals(portfoliosList);
    } catch (err) {
      console.warn('API error fetching portfolios, falling back to static roster:', err);
      renderPortfolios(FALLBACK_PORTFOLIOS);
      renderAudioRecitals([]);
    }
  };

  await loadPortfolios();

  // Admin Modal Elements & Handlers
  const modal = document.getElementById('portfolio-admin-modal');
  const modalTitle = document.getElementById('p-modal-title');
  const modalForm = document.getElementById('p-modal-form');
  const closeBtn = document.getElementById('p-close-modal-btn');
  const cancelBtn = document.getElementById('p-cancel-modal-btn');
  const pType = document.getElementById('admin-p-type');
  const mediaFileGroup = document.getElementById('admin-p-media-file-group');
  const mediaFileLabel = document.getElementById('admin-p-mediafile-label');
  const mediaFileInput = document.getElementById('admin-p-mediafile');

  const toggleMediaFileGroup = (type) => {
    if (type === 'video' || type === 'audio') {
      mediaFileGroup.style.display = 'block';
      mediaFileLabel.textContent = type === 'audio' ? 'Upload Audio File' : 'Upload Video File';
      mediaFileInput.accept = type === 'audio' ? 'audio/*' : 'video/*';
    } else {
      mediaFileGroup.style.display = 'none';
    }
  };

  if (pType) {
    pType.addEventListener('change', (e) => {
      toggleMediaFileGroup(e.target.value);
    });
  }

  const openAdminModal = (id = null) => {
    if (!modal) return;
    modalForm.reset();
    
    if (id) {
      const item = portfoliosList.find(p => p._id === id);
      if (!item) return;
      modalTitle.textContent = 'Edit Portfolio Spotlight';
      document.getElementById('admin-p-id').value = item._id;
      document.getElementById('admin-p-title').value = item.title;
      document.getElementById('admin-p-student').value = item.studentName;
      document.getElementById('admin-p-course').value = item.courseName;
      document.getElementById('admin-p-type').value = item.type || 'image';
      document.getElementById('admin-p-desc').value = item.description;
      document.getElementById('admin-p-published').checked = item.isPublished !== false;
      toggleMediaFileGroup(item.type || 'image');
    } else {
      modalTitle.textContent = 'Add Spotlight Recital';
      document.getElementById('admin-p-id').value = '';
      toggleMediaFileGroup('image');
    }

    modal.style.display = 'flex';
    modal.classList.remove('hidden');
  };

  const closeAdminModal = () => {
    if (!modal) return;
    modal.style.display = 'none';
    modal.classList.add('hidden');
  };

  if (closeBtn) closeBtn.addEventListener('click', closeAdminModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeAdminModal);

  // Bind Add Buttons in Section Headers
  document.querySelectorAll('.admin-add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      openAdminModal();
      const typeVal = btn.dataset.type;
      if (typeVal) {
        document.getElementById('admin-p-type').value = typeVal;
        toggleMediaFileGroup(typeVal);
      }
    });
  });

  const deletePortfolioItem = async (id) => {
    if (!confirm('Are you sure you want to delete this portfolio item?')) return;
    try {
      await Api.delete(`/portfolios/${id}`);
      Helpers.toast('Item deleted successfully.');
      await loadPortfolios();
    } catch (err) {
      console.error(err);
      Helpers.toast(err.message || 'Delete failed', 'error');
    }
  };

  if (modalForm) {
    modalForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = document.getElementById('admin-p-id').value;
      const title = document.getElementById('admin-p-title').value;
      const studentName = document.getElementById('admin-p-student').value;
      const courseName = document.getElementById('admin-p-course').value;
      const type = document.getElementById('admin-p-type').value;
      const description = document.getElementById('admin-p-desc').value;
      const isPublished = document.getElementById('admin-p-published').checked;
      const imageFileInput = document.getElementById('admin-p-file');
      const mediaFileInput = document.getElementById('admin-p-mediafile');

      try {
        const btn = document.getElementById('p-submit-modal-btn');
        btn.disabled = true;
        btn.textContent = 'Saving...';

        const formData = new FormData();
        formData.append('title', title);
        formData.append('studentName', studentName);
        formData.append('courseName', courseName);
        formData.append('type', type);
        formData.append('description', description);
        formData.append('isPublished', isPublished);

        if (imageFileInput && imageFileInput.files[0]) {
          formData.append('image', imageFileInput.files[0]);
        }
        if (mediaFileInput && mediaFileInput.files[0] && (type === 'video' || type === 'audio')) {
          formData.append('mediaFile', mediaFileInput.files[0]);
        }

        if (id) {
          await Api.patch(`/portfolios/${id}`, formData);
          Helpers.toast('Portfolio highlight updated.');
        } else {
          await Api.post('/portfolios', formData);
          Helpers.toast('Portfolio highlight created successfully.');
        }

        closeAdminModal();
        await loadPortfolios();
      } catch (err) {
        console.error(err);
        Helpers.toast(err.message || 'Operation failed', 'error');
      } finally {
        const btn = document.getElementById('p-submit-modal-btn');
        if (btn) {
          btn.disabled = false;
          btn.textContent = 'Save Changes';
        }
      }
    });
  }
});
