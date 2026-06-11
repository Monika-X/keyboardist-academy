/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Premium Admin Dashboard View
 *  frontend/pages/admin-dashboard.js
 * ============================================================
 */

'use strict';

Router.register('/admin', async () => {
  const app = document.getElementById('app');
  if (!app) return;

  // Route guard: Require admin access
  if (!Auth.isLoggedIn() || !Auth.isAdmin()) {
    Helpers.toast('Access denied. Admin privileges required.', 'error');
    Router.navigate('/', true);
    return;
  }

  const user = Auth.getUser();

  const logAdminActivity = (text) => {
    const logs = Storage.get('ka_activity_log') || [];
    logs.unshift({ text, time: new Date().toISOString() });
    if (logs.length > 20) logs.pop();
    Storage.set('ka_activity_log', logs);
  };

  const getRelativeTime = (isoString) => {
    const diff = Date.now() - new Date(isoString).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins} mins ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  const getAuditLogs = () => {
    const logs = Storage.get('ka_activity_log');
    if (logs && logs.length > 0) return logs.slice(0, 4);
    return [
      { text: 'Course "Jazz Keyboard 101" was updated by admin', time: new Date(Date.now() - 10 * 60000).toISOString() },
      { text: 'New student portfolio performance approved', time: new Date(Date.now() - 60 * 60000).toISOString() },
      { text: 'Testimonial from Alice Vance published to homepage', time: new Date(Date.now() - 3 * 3600000).toISOString() },
      { text: 'Settings key "contact_email" was updated', time: new Date(Date.now() - 24 * 3600000).toISOString() }
    ];
  };

  // Active module state
  let currentModule = 'overview';
  let searchTerm = '';
  let filterStatus = 'all';
  let sortBy = 'newest';

  // Navigation sidebar options
  const sidebarItems = [
    { id: 'overview', name: 'Dashboard Overview', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'courses', name: 'Course Management', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { id: 'faculty', name: 'Faculty Management', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { id: 'portfolios', name: 'Portfolio Management', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'gallery', name: 'Gallery Management', icon: 'M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1a2 2 0 002 2h2a2 2 0 012 2v3a2 2 0 01-2 2H5z' },
    { id: 'events', name: 'Event Management', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'testimonials', name: 'Testimonials Management', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
    { id: 'contacts', name: 'Contact Management', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { id: 'socials', name: 'Social Media Management', icon: 'M8.684 10.742l5.136-2.568m0 5.652l-5.136-2.568M20 7.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm-10 5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm10 5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z' },
    { id: 'livestream', name: 'Live Stream Links', icon: 'M15 10l4.553-2.069A1 1 0 0121 8.87V15.13a1 1 0 01-1.447.9L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
    { id: 'settings', name: 'Website Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
    { id: 'profile', name: 'Admin Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
  ];

  // Render Base Layout
  const renderLayout = () => {
    return `
      <section class="section section--glow" style="padding-top: calc(var(--nav-h) + 1rem); min-height: 100vh; background: var(--surface-0);">
        <div class="container flex col md:flex-row gap-8 items-start">
          
          <!-- Desktop Sidebar / Mobile Nav Wrapper -->
          <div class="card p-6 border bg-glass w-full md:w-72 flex-shrink-0" style="border-radius: var(--radius-md); box-shadow: var(--shadow-card);">
            <!-- Admin Brand / Header -->
            <div class="flex items-center gap-3 mb-6 pb-4 border-bottom">
              <div class="flex items-center justify-center bg-tinted text-accent rounded-full" style="width: 44px; height: 44px;">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 19V6l12-3v13M6 18c0-.75-.5-1.5-1.5-1.5S3 17.25 3 18s.5 1.5 1.5 1.5S6 18.75 6 18zm12-2c0-.75-.5-1.5-1.5-1.5S15 15.25 15 16s.5 1.5 1.5 1.5S18 16.75 18 16z"/></svg>
              </div>
              <div>
                <h4 class="body-sm text-white font-bold leading-none">Admin Panel</h4>
                <span class="text-xs text-tertiary">Keyboardist Academy</span>
              </div>
            </div>

            <!-- Sidebar Navigation List -->
            <ul class="flex col gap-2">
              ${sidebarItems.map(mod => `
                <li>
                  <button 
                    id="tab-btn-${mod.id}" 
                    class="btn w-full text-left py-3 px-4 rounded-md flex items-center gap-3 transition-all ${currentModule === mod.id ? 'btn--primary' : 'hover:bg-glass text-secondary'}" 
                    style="border: none; justify-content: flex-start; text-transform: none; font-size: var(--text-sm);"
                  >
                    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="${mod.icon}"></path>
                    </svg>
                    <span>${mod.name}</span>
                  </button>
                </li>
              `).join('')}
              <li class="mt-4 pt-4 border-top">
                <button 
                  id="tab-btn-logout" 
                  class="btn w-full text-left py-3 px-4 rounded-md flex items-center gap-3 hover:bg-glass text-accent transition-all" 
                  style="border: none; justify-content: flex-start; text-transform: none; font-size: var(--text-sm);"
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                  <span>Logout Control</span>
                </button>
              </li>
            </ul>
          </div>

          <!-- Main Panel Content Area -->
          <div class="flex-1 w-full" id="admin-main-pane">
            <!-- Dynamic Content Renders Here -->
          </div>

        </div>
      </section>

      <!-- Modal Management Container -->
      <div id="admin-modal" class="fixed inset-0 bg-black-90 items-center justify-center hidden z-modal" style="display: none;">
        <div class="card p-8 border bg-glass w-full max-width-md mx-4 overflow-auto max-h-screen" style="border-radius: var(--radius-lg); box-shadow: var(--shadow-xl);">
          <div class="flex justify-between items-center mb-6 border-bottom pb-4">
            <h3 class="h4 text-white" id="modal-title">Form Title</h3>
            <button class="text-tertiary hover:text-white" id="close-modal-btn" style="font-size: 24px; border: none; background: none;">&times;</button>
          </div>
          <form id="modal-form" class="form flex col gap-6">
            <div id="modal-form-fields" class="flex col gap-4"></div>
            <div class="flex gap-4 justify-end mt-4">
              <button type="button" class="btn btn--outline btn--sm" id="cancel-modal-btn">Cancel</button>
              <button type="submit" class="btn btn--primary btn--sm" id="submit-modal-btn">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    `;
  };

  app.innerHTML = App.wrapWithLayout(renderLayout());
  App.initNavbarScroll();
  App.highlightActiveLink('/admin');

  // Elements
  const mainPane = document.getElementById('admin-main-pane');
  const modal = document.getElementById('admin-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalFields = document.getElementById('modal-form-fields');
  const modalForm = document.getElementById('modal-form');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const cancelModalBtn = document.getElementById('cancel-modal-btn');
  const logoutBtn = document.getElementById('tab-btn-logout');

  // Logout control
  logoutBtn.addEventListener('click', async () => {
    if (confirm('Are you sure you want to securely log out?')) {
      await Auth.logout();
    }
  });

  // Handle Tab Switch
  sidebarItems.forEach(item => {
    const btn = document.getElementById(`tab-btn-${item.id}`);
    if (btn) {
      btn.addEventListener('click', () => {
        sidebarItems.forEach(m => {
          const b = document.getElementById(`tab-btn-${m.id}`);
          if (b) {
            b.className = `btn w-full text-left py-3 px-4 rounded-md flex items-center gap-3 transition-all ${m.id === item.id ? 'btn--primary' : 'hover:bg-glass text-secondary'}`;
          }
        });
        currentModule = item.id;
        searchTerm = '';
        filterStatus = 'all';
        sortBy = 'newest';
        loadPane(item.id);
      });
    }
  });

  // Modal actions
  const openModalDialog = (title, fieldsHTML, onSubmit) => {
    modalTitle.textContent = title;
    modalFields.innerHTML = fieldsHTML;
    modal.style.display = 'flex';
    modal.classList.remove('hidden');

    modalForm.onsubmit = async (e) => {
      e.preventDefault();
      const saveBtn = document.getElementById('submit-modal-btn');
      saveBtn.disabled = true;
      saveBtn.textContent = 'Saving...';
      try {
        await onSubmit(e);
        closeModalDialog();
      } catch (err) {
        Helpers.toast(err.message || 'Operation failed', 'error');
      } finally {
        saveBtn.disabled = false;
        saveBtn.textContent = 'Save Changes';
      }
    };
  };

  const closeModalDialog = () => {
    modal.style.display = 'none';
    modal.classList.add('hidden');
    modalFields.innerHTML = '';
  };

  closeModalBtn.addEventListener('click', closeModalDialog);
  cancelModalBtn.addEventListener('click', closeModalDialog);

  // Dynamic Module router
  const loadPane = async (moduleId) => {
    mainPane.innerHTML = `<div class="card p-12 text-center border bg-glass">Loading Content Panel...</div>`;
    try {
      switch (moduleId) {
        case 'overview':
          await displayOverview();
          break;
        case 'courses':
          await displayCourses();
          break;
        case 'faculty':
          await displayFaculty();
          break;
        case 'portfolios':
          await displayPortfolios();
          break;
        case 'gallery':
          await displayGallery();
          break;
        case 'events':
          await displayEvents();
          break;
        case 'testimonials':
          await displayTestimonials();
          break;
        case 'contacts':
          await displayContacts();
          break;
        case 'socials':
          await displaySocials();
          break;
        case 'livestream':
          await displayLiveStream();
          break;
        case 'settings':
          await displaySettings();
          break;
        case 'profile':
          await displayProfile();
          break;
      }
    } catch (err) {
      console.error(err);
      mainPane.innerHTML = `<div class="card p-12 text-center border text-accent">Failed to render ${moduleId}: ${err.message}</div>`;
    }
  };

  // Render Filters / Controls header
  const renderControlsHeader = (placeholder = 'Search...') => {
    return `
      <style>
        @media (max-width: 576px) {
          .controls-header {
            flex-direction: column !important;
            align-items: stretch !important;
            padding: var(--sp-3) !important;
          }
          .controls-header .controls-dropdowns {
            width: 100% !important;
            flex-direction: column !important;
            gap: var(--sp-2) !important;
          }
          .controls-header select {
            max-width: none !important;
            width: 100% !important;
          }
        }
      </style>
      <div class="flex flex-wrap gap-4 items-center justify-between mb-6 card p-4 border bg-glass controls-header" style="border-radius: var(--radius-sm);">
        <div class="flex-1 min-w-[200px] relative">
          <input type="text" id="admin-search-input" class="form-input w-full" value="${searchTerm}" placeholder="${placeholder}" style="padding-left: 2.5rem;" />
          <svg class="absolute text-tertiary" style="left: 12px; top: 12px;" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </div>
        <div class="flex gap-4 controls-dropdowns">
          <select id="admin-filter-status" class="form-input" style="background: var(--surface-input); max-width: 150px;">
            <option value="all" ${filterStatus === 'all' ? 'selected' : ''}>All Status</option>
            <option value="published" ${filterStatus === 'published' ? 'selected' : ''}>Published</option>
            <option value="unpublished" ${filterStatus === 'unpublished' ? 'selected' : ''}>Unpublished</option>
          </select>
          <select id="admin-sort-by" class="form-input" style="background: var(--surface-input); max-width: 150px;">
            <option value="newest" ${sortBy === 'newest' ? 'selected' : ''}>Newest</option>
            <option value="oldest" ${sortBy === 'oldest' ? 'selected' : ''}>Oldest</option>
            <option value="alphabetical" ${sortBy === 'alphabetical' ? 'selected' : ''}>A-Z Name</option>
          </select>
        </div>
      </div>
    `;
  };

  const bindControls = (refreshFn) => {
    const search = document.getElementById('admin-search-input');
    const filter = document.getElementById('admin-filter-status');
    const sort = document.getElementById('admin-sort-by');
    if (search) search.addEventListener('input', (e) => { searchTerm = e.target.value; refreshFn(); });
    if (filter) filter.addEventListener('change', (e) => { filterStatus = e.target.value; refreshFn(); });
    if (sort) sort.addEventListener('change', (e) => { sortBy = e.target.value; refreshFn(); });
  };

  // 1. DISPLAY MODULE: OVERVIEW
  const displayOverview = async () => {
    const [coursesRes, facultyRes, portfoliosRes, galleryRes, eventsRes, testimonialsRes, contactsRes] = await Promise.all([
      Api.get('/courses'),
      Api.get('/faculty'),
      Api.get('/portfolios'),
      Api.get('/gallery'),
      Api.get('/events'),
      Api.get('/testimonials'),
      Api.get('/contact')
    ]);

    const stats = [
      { name: 'Total Courses', value: coursesRes.data.courses?.length || 0, label: 'Course Catalog' },
      { name: 'Total Faculty', value: facultyRes.data.faculty?.length || 0, label: 'Instructors & Staff' },
      { name: 'Total Portfolios', value: portfoliosRes.data.portfolios?.length || 0, label: 'Student Spotlights' },
      { name: 'Gallery Items', value: galleryRes.data.galleryItems?.length || 0, label: 'Showcase Files' },
      { name: 'Total Events', value: eventsRes.data.events?.length || 0, label: 'Scheduled Concerts' },
      { name: 'Total Testimonials', value: testimonialsRes.data.testimonials?.length || 0, label: 'User Feedback' },
      { name: 'Contact Inquiries', value: (contactsRes.data.messages || []).length, label: 'Inbox Messages' }
    ];

    mainPane.innerHTML = `
      <style>
        @media (max-width: 1023px) {
          .admin-welcome {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: var(--sp-4) !important;
          }
          .admin-welcome > div:first-child {
            padding-right: 0 !important;
          }
          .admin-welcome > div:last-child {
            width: 100% !important;
          }
          .admin-welcome button {
            width: 100% !important;
            justify-content: center !important;
          }
        }
        @media (max-width: 480px) {
          .admin-welcome h2 {
            font-size: var(--text-2xl) !important;
            line-height: var(--lh-tight) !important;
          }
        }
      </style>
      <!-- Welcome Banner -->
      <div class="card p-8 border bg-tinted mb-8 flex justify-between items-center admin-welcome" style="border-radius: var(--radius-md);">
        <div style="flex: 1; min-width: 0; padding-right: var(--sp-6);">
          <span class="eyebrow">Academy CMS</span>
          <h2 class="display-sm text-gradient font-bold mt-2">Welcome Back, ${user.firstName || 'Agilan'}!</h2>
          <p class="body-sm text-secondary mt-1">Manage public website content, instructors, events, and student Spotlights.</p>
        </div>
        <div class="flex gap-4" style="flex-shrink: 0;">
          <button onclick="document.getElementById('tab-btn-courses').click()" class="btn btn--primary btn--sm">Manage Catalog</button>
        </div>
      </div>

      <!-- Statistics Grid -->
      <h3 class="h5 text-white mb-4">Branding & Catalog Health</h3>
      <div class="grid grid-3 sm:grid-2 gap-6 mb-8">
        ${stats.map(stat => `
          <div class="card p-6 border bg-glass flex col gap-2 hover:scale transition-transform" style="border-radius: var(--radius-md);">
            <span class="label text-tertiary">${stat.name}</span>
            <span class="display-sm text-white font-bold leading-none">${stat.value}</span>
            <span class="text-xs text-secondary mt-2">${stat.label}</span>
          </div>
        `).join('')}
      </div>

      <div class="grid grid-hero gap-8">
        <!-- Upcoming Events Widget -->
        <div class="card p-6 border bg-glass flex col gap-4" style="border-radius: var(--radius-md);">
          <h4 class="h5 text-white font-semibold flex items-center gap-2">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            Upcoming Events Schedule
          </h4>
          <ul class="flex col gap-4">
            ${(eventsRes.data.events || []).slice(0, 3).map(ev => `
              <li class="flex items-center justify-between border-bottom pb-3">
                <div>
                  <h5 class="body-sm text-white font-bold">${ev.title}</h5>
                  <span class="text-xs text-secondary">${ev.location} &bull; ${Helpers.formatTime(ev.time)}</span>
                </div>
                <span class="text-xs text-accent">${Helpers.formatDate(ev.date)}</span>
              </li>
            `).join('')}
            ${(eventsRes.data.events || []).length === 0 ? `<li class="text-center py-4 text-tertiary">No scheduled events.</li>` : ''}
          </ul>
        </div>

        <!-- Recent Audit Log Trail -->
        <div class="card p-6 border bg-glass flex col gap-4" style="border-radius: var(--radius-md);">
          <h4 class="h5 text-white font-semibold flex items-center gap-2">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Recent System Activity
          </h4>
          <ul class="flex col gap-4">
            ${getAuditLogs().map(log => `
              <li class="flex items-center justify-between border-bottom pb-3">
                <span class="text-xs text-secondary">${log.text}</span>
                <span class="text-xs text-tertiary">${getRelativeTime(log.time)}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    `;
  };

  // 2. MODULE: COURSE MANAGEMENT
  const displayCourses = async () => {
    const res = await Api.get('/courses');
    const courses = res.data.courses || [];

    const refreshList = () => {
      let items = [...courses];

      // Search
      if (searchTerm) {
        items = items.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.category.toLowerCase().includes(searchTerm.toLowerCase()));
      }

      // Filter
      if (filterStatus === 'published') {
        items = items.filter(c => c.isPublished);
      } else if (filterStatus === 'unpublished') {
        items = items.filter(c => !c.isPublished);
      }

      // Sort
      if (sortBy === 'newest') {
        items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (sortBy === 'oldest') {
        items.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      } else if (sortBy === 'alphabetical') {
        items.sort((a, b) => a.title.localeCompare(b.title));
      }

      const tbody = document.getElementById('courses-tbody');
      if (tbody) {
        tbody.innerHTML = items.map(course => `
          <tr class="border-bottom">
            <td class="py-3 text-white font-medium">${course.title}</td>
            <td class="py-3 text-secondary">${course.category || 'Piano Masterclass'}</td>
            <td class="py-3 text-secondary">${course.level}</td>
            <td class="py-3 text-secondary">${course.price ? Helpers.formatPrice(course.price) : 'Free'}</td>
            <td class="py-3 text-secondary">
              <span class="badge ${course.isPublished ? 'badge--violet' : 'badge--outline'}">
                ${course.isPublished ? 'Published' : 'Draft'}
              </span>
            </td>
            <td class="py-3 text-right" style="white-space: nowrap;">
              <div class="flex gap-2 justify-end">
                <button class="btn btn--outline btn--sm edit-course-btn" data-id="${course._id}">Edit</button>
                <button class="btn btn--outline btn--sm text-accent delete-course-btn" data-id="${course._id}">Delete</button>
              </div>
            </td>
          </tr>
        `).join('');

        // Rebind handlers
        document.querySelectorAll('.edit-course-btn').forEach(btn => {
          btn.addEventListener('click', () => triggerEditCourse(btn.dataset.id, courses));
        });
        document.querySelectorAll('.delete-course-btn').forEach(btn => {
          btn.addEventListener('click', () => triggerDeleteCourse(btn.dataset.id, courses));
        });
      }
    };

    mainPane.innerHTML = `
      <style>
        @media (max-width: 576px) {
          .admin-section-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: var(--sp-3) !important;
          }
          .admin-section-header button {
            width: 100% !important;
          }
          .admin-table-card {
            padding: var(--sp-3) !important;
          }
        }
      </style>
      <div class="flex justify-between items-center mb-6 admin-section-header">
        <h2 class="h3 text-white">Course Catalog</h2>
        <button id="add-course-btn" class="btn btn--primary btn--sm">Add Course</button>
      </div>
      ${renderControlsHeader('Search courses by title or category...')}
      <div class="overflow-x-auto card border bg-glass p-6 admin-table-card">
        <table class="w-full text-left" style="border-collapse: collapse; font-size: var(--text-sm);">
          <thead>
            <tr class="border-bottom text-tertiary">
              <th class="py-3">Course Title</th>
              <th class="py-3">Category</th>
              <th class="py-3">Skill Level</th>
              <th class="py-3">Price</th>
              <th class="py-3">Status</th>
              <th class="py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody id="courses-tbody"></tbody>
        </table>
      </div>
    `;

    document.getElementById('add-course-btn').addEventListener('click', triggerAddCourse);
    bindControls(refreshList);
    refreshList();
  };

  const getCourseFields = (data = {}) => `
    <div class="form-group">
      <label class="form-label label">Course Title</label>
      <input type="text" id="c-title" required class="form-input" value="${data.title || ''}" />
    </div>
    <div class="form-group">
      <label class="form-label label">Category</label>
      <select id="c-category" class="form-input" style="background: var(--surface-input);">
        <option value="Classical Piano" ${data.category === 'Classical Piano' ? 'selected' : ''}>Classical Piano</option>
        <option value="Jazz Keyboard" ${data.category === 'Jazz Keyboard' ? 'selected' : ''}>Jazz Keyboard</option>
        <option value="Contemporary" ${data.category === 'Contemporary' ? 'selected' : ''}>Contemporary</option>
        <option value="Music Theory" ${data.category === 'Music Theory' ? 'selected' : ''}>Music Theory</option>
        <option value="Sight Reading" ${data.category === 'Sight Reading' ? 'selected' : ''}>Sight Reading</option>
        <option value="Improvisation" ${data.category === 'Improvisation' ? 'selected' : ''}>Improvisation</option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-label label">Description</label>
      <textarea id="c-desc" required class="form-input" rows="4">${data.description || ''}</textarea>
    </div>
    <div class="grid grid-2 gap-4">
      <div class="form-group">
        <label class="form-label label">Duration (Mins)</label>
        <input type="number" id="c-duration" required class="form-input" value="${data.totalDuration || 60}" />
      </div>
      <div class="form-group">
        <label class="form-label label">Fee / Price (₹)</label>
        <input type="number" id="c-price" required class="form-input" value="${data.price || 0}" />
      </div>
    </div>
    <div class="grid grid-2 gap-4">
      <div class="form-group">
        <label class="form-label label">Mode</label>
        <select id="c-mode" class="form-input" style="background: var(--surface-input);">
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label label">Skill Level</label>
        <select id="c-level" class="form-input" style="background: var(--surface-input);">
          <option value="beginner" ${data.level === 'beginner' ? 'selected' : ''}>Beginner</option>
          <option value="intermediate" ${data.level === 'intermediate' ? 'selected' : ''}>Intermediate</option>
          <option value="advanced" ${data.level === 'advanced' ? 'selected' : ''}>Advanced</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label label">Thumbnail Image URL</label>
      <input type="text" id="c-thumb" class="form-input" value="${data.thumbnail || '/assets/images/default.jpg'}" />
    </div>
    <div class="form-group flex items-center gap-3">
      <input type="checkbox" id="c-published" ${data.isPublished ? 'checked' : ''} style="width: 18px; height: 18px;" />
      <label for="c-published" class="label text-white cursor-pointer">Publish on public website</label>
    </div>
  `;

  const triggerAddCourse = () => {
    openModalDialog('Add Course', getCourseFields(), async () => {
      const payload = {
        title: document.getElementById('c-title').value,
        category: document.getElementById('c-category').value,
        description: document.getElementById('c-desc').value,
        totalDuration: parseInt(document.getElementById('c-duration').value),
        price: parseFloat(document.getElementById('c-price').value),
        level: document.getElementById('c-level').value,
        thumbnail: document.getElementById('c-thumb').value,
        isPublished: document.getElementById('c-published').checked
      };
      await Api.post('/courses', payload);
      logAdminActivity(`Course "${payload.title}" was created by admin`);
      Helpers.toast('Course created.');
      displayCourses();
    });
  };

  const triggerEditCourse = (id, courses) => {
    const course = courses.find(c => c._id === id);
    if (!course) return;
    openModalDialog('Edit Course', getCourseFields(course), async () => {
      const payload = {
        title: document.getElementById('c-title').value,
        category: document.getElementById('c-category').value,
        description: document.getElementById('c-desc').value,
        totalDuration: parseInt(document.getElementById('c-duration').value),
        price: parseFloat(document.getElementById('c-price').value),
        level: document.getElementById('c-level').value,
        thumbnail: document.getElementById('c-thumb').value,
        isPublished: document.getElementById('c-published').checked
      };
      await Api.patch(`/courses/${id}`, payload);
      logAdminActivity(`Course "${payload.title}" was updated by admin`);
      Helpers.toast('Course updated.');
      displayCourses();
    });
  };

  const triggerDeleteCourse = async (id, courses) => {
    const course = courses.find(c => c._id === id);
    const title = course ? course.title : 'Unknown';
    if (confirm('Are you sure you want to delete this course?')) {
      await Api.delete(`/courses/${id}`);
      logAdminActivity(`Course "${title}" was removed by admin`);
      Helpers.toast('Course removed.');
      displayCourses();
    }
  };

  // 3. MODULE: FACULTY MANAGEMENT
  const displayFaculty = async () => {
    const res = await Api.get('/faculty');
    const faculty = res.data.faculty || [];

    const refreshList = () => {
      let items = [...faculty];
      if (searchTerm) {
        items = items.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()) || f.role.toLowerCase().includes(searchTerm.toLowerCase()));
      }

      const tbody = document.getElementById('faculty-tbody');
      if (tbody) {
        tbody.innerHTML = items.map(f => `
          <tr class="border-bottom">
            <td class="py-3 text-white font-medium">${f.name}</td>
            <td class="py-3 text-secondary">${f.role}</td>
            <td class="py-3 text-secondary">${(f.specialties || []).join(', ')}</td>
            <td class="py-3 text-right" style="white-space: nowrap;">
              <div class="flex gap-2 justify-end">
                <button class="btn btn--outline btn--sm edit-fac-btn" data-id="${f._id}">Edit</button>
                <button class="btn btn--outline btn--sm text-accent delete-fac-btn" data-id="${f._id}">Delete</button>
              </div>
            </td>
          </tr>
        `).join('');

        document.querySelectorAll('.edit-fac-btn').forEach(btn => {
          btn.addEventListener('click', () => triggerEditFaculty(btn.dataset.id, faculty));
        });
        document.querySelectorAll('.delete-fac-btn').forEach(btn => {
          btn.addEventListener('click', () => triggerDeleteFaculty(btn.dataset.id, faculty));
        });
      }
    };

    mainPane.innerHTML = `
      <div class="flex justify-between items-center mb-6">
        <h2 class="h3 text-white">Faculty profiles</h2>
        <button id="add-fac-btn" class="btn btn--primary btn--sm">Add Faculty</button>
      </div>
      ${renderControlsHeader('Search faculty by name or role...')}
      <div class="overflow-x-auto card border bg-glass p-6">
        <table class="w-full text-left" style="border-collapse: collapse; font-size: var(--text-sm);">
          <thead>
            <tr class="border-bottom text-tertiary">
              <th class="py-3">Name</th>
              <th class="py-3">Role</th>
              <th class="py-3">Specialization</th>
              <th class="py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody id="faculty-tbody"></tbody>
        </table>
      </div>
    `;

    document.getElementById('add-fac-btn').addEventListener('click', triggerAddFaculty);
    bindControls(refreshList);
    refreshList();
  };

  const getFacultyFields = (data = {}) => `
    <div class="form-group">
      <label class="form-label label">Full Name</label>
      <input type="text" id="f-name" required class="form-input" value="${data.name || ''}" />
    </div>
    <div class="form-group">
      <label class="form-label label">Designation / Role</label>
      <input type="text" id="f-role" required class="form-input" value="${data.role || ''}" placeholder="Principal Concert Pianist" />
    </div>
    <div class="form-group">
      <label class="form-label label">Experience Years</label>
      <input type="number" id="f-exp" class="form-input" value="${data.yearsOfExp || 5}" />
    </div>
    <div class="form-group">
      <label class="form-label label">Biography</label>
      <textarea id="f-bio" required class="form-input" rows="3">${data.bio || ''}</textarea>
    </div>
    <div class="form-group">
      <label class="form-label label">Specialties (comma separated)</label>
      <input type="text" id="f-specialties" class="form-input" value="${(data.specialties || []).join(', ')}" />
    </div>
    <div class="form-group">
      <label class="form-label label">Profile Photo Link</label>
      <input type="text" id="f-photo" class="form-input" value="${data.image || '/assets/images/default.jpg'}" />
    </div>
  `;

  const triggerAddFaculty = () => {
    openModalDialog('Add Faculty Profile', getFacultyFields(), async () => {
      const payload = {
        name: document.getElementById('f-name').value,
        role: document.getElementById('f-role').value,
        bio: document.getElementById('f-bio').value,
        yearsOfExp: parseInt(document.getElementById('f-exp').value),
        specialties: document.getElementById('f-specialties').value.split(',').map(s => s.trim()).filter(Boolean),
        image: document.getElementById('f-photo').value
      };
      await Api.post('/faculty', payload);
      logAdminActivity(`Faculty member "${payload.name}" was added by admin`);
      Helpers.toast('Faculty profile created.');
      displayFaculty();
    });
  };

  const triggerEditFaculty = (id, faculty) => {
    const f = faculty.find(item => item._id === id);
    if (!f) return;
    openModalDialog('Edit Faculty Profile', getFacultyFields(f), async () => {
      const payload = {
        name: document.getElementById('f-name').value,
        role: document.getElementById('f-role').value,
        bio: document.getElementById('f-bio').value,
        yearsOfExp: parseInt(document.getElementById('f-exp').value),
        specialties: document.getElementById('f-specialties').value.split(',').map(s => s.trim()).filter(Boolean),
        image: document.getElementById('f-photo').value
      };
      await Api.patch(`/faculty/${id}`, payload);
      logAdminActivity(`Faculty member "${payload.name}" was updated by admin`);
      Helpers.toast('Faculty updated successfully.');
      displayFaculty();
    });
  };

  const triggerDeleteFaculty = async (id, faculty) => {
    const f = faculty.find(item => item._id === id);
    const name = f ? f.name : 'Unknown';
    if (confirm('Delete faculty profile?')) {
      await Api.delete(`/faculty/${id}`);
      logAdminActivity(`Faculty member "${name}" was removed by admin`);
      Helpers.toast('Faculty removed.');
      displayFaculty();
    }
  };

  // 4. MODULE: PORTFOLIO MANAGEMENT
  const displayPortfolios = async () => {
    const res = await Api.get('/portfolios');
    const portfolios = res.data.portfolios || [];

    const refreshList = () => {
      let items = [...portfolios];
      if (searchTerm) {
        items = items.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.studentName.toLowerCase().includes(searchTerm.toLowerCase()));
      }

      const tbody = document.getElementById('portfolios-tbody');
      if (tbody) {
        tbody.innerHTML = items.map(p => `
          <tr class="border-bottom">
            <td class="py-3 text-white font-medium">${p.title}</td>
            <td class="py-3 text-secondary">${p.studentName}</td>
            <td class="py-3 text-secondary">${p.courseName}</td>
            <td class="py-3 text-right" style="white-space: nowrap;">
              <div class="flex gap-2 justify-end">
                <button class="btn btn--outline btn--sm edit-port-btn" data-id="${p._id}">Edit</button>
                <button class="btn btn--outline btn--sm text-accent delete-port-btn" data-id="${p._id}">Delete</button>
              </div>
            </td>
          </tr>
        `).join('');

        document.querySelectorAll('.edit-port-btn').forEach(btn => {
          btn.addEventListener('click', () => triggerEditPortfolio(btn.dataset.id, portfolios));
        });
        document.querySelectorAll('.delete-port-btn').forEach(btn => {
          btn.addEventListener('click', () => triggerDeletePortfolio(btn.dataset.id, portfolios));
        });
      }
    };

    mainPane.innerHTML = `
      <div class="flex justify-between items-center mb-6">
        <h2 class="h3 text-white">Student Spotlights</h2>
        <button id="add-port-btn" class="btn btn--primary btn--sm">Add Spotlight</button>
      </div>
      ${renderControlsHeader('Search portfolios by title or performer...')}
      <div class="overflow-x-auto card border bg-glass p-6">
        <table class="w-full text-left" style="border-collapse: collapse; font-size: var(--text-sm);">
          <thead>
            <tr class="border-bottom text-tertiary">
              <th class="py-3">Performance Title</th>
              <th class="py-3">Student Performer</th>
              <th class="py-3">Course / Path</th>
              <th class="py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody id="portfolios-tbody"></tbody>
        </table>
      </div>
    `;

    document.getElementById('add-port-btn').addEventListener('click', triggerAddPortfolio);
    bindControls(refreshList);
    refreshList();
  };

  const getPortfolioFields = (data = {}) => `
    <div class="form-group">
      <label class="form-label label">Recital Title</label>
      <input type="text" id="p-title" required class="form-input" value="${data.title || ''}" />
    </div>
    <div class="form-group">
      <label class="form-label label">Student Name</label>
      <input type="text" id="p-student" required class="form-input" value="${data.studentName || ''}" />
    </div>
    <div class="form-group">
      <label class="form-label label">Course / Academy Path</label>
      <input type="text" id="p-course" required class="form-input" value="${data.courseName || ''}" />
    </div>
    <div class="form-group">
      <label class="form-label label">Media Url (YouTube Video or Certificate)</label>
      <input type="url" id="p-media" required class="form-input" value="${data.mediaUrl || ''}" placeholder="https://youtube.com/..." />
    </div>
    <div class="form-group">
      <label class="form-label label">Performance Description</label>
      <textarea id="p-desc" required class="form-input" rows="3">${data.description || ''}</textarea>
    </div>
  `;

  const triggerAddPortfolio = () => {
    openModalDialog('Add Performance spotlight', getPortfolioFields(), async () => {
      const payload = {
        title: document.getElementById('p-title').value,
        studentName: document.getElementById('p-student').value,
        courseName: document.getElementById('p-course').value,
        mediaUrl: document.getElementById('p-media').value,
        description: document.getElementById('p-desc').value
      };
      await Api.post('/portfolios', payload);
      logAdminActivity(`Student portfolio for "${payload.studentName}" was approved by admin`);
      Helpers.toast('Spotlight portfolio added.');
      displayPortfolios();
    });
  };

  const triggerEditPortfolio = (id, portfolios) => {
    const p = portfolios.find(item => item._id === id);
    if (!p) return;
    openModalDialog('Edit Spotlight', getPortfolioFields(p), async () => {
      const payload = {
        title: document.getElementById('p-title').value,
        studentName: document.getElementById('p-student').value,
        courseName: document.getElementById('p-course').value,
        mediaUrl: document.getElementById('p-media').value,
        description: document.getElementById('p-desc').value
      };
      await Api.patch(`/portfolios/${id}`, payload);
      logAdminActivity(`Student portfolio for "${payload.studentName}" was updated by admin`);
      Helpers.toast('Spotlight updated.');
      displayPortfolios();
    });
  };

  const triggerDeletePortfolio = async (id, portfolios) => {
    const p = portfolios.find(item => item._id === id);
    const studentName = p ? p.studentName : 'Unknown';
    if (confirm('Delete student spotlight portfolio entry?')) {
      await Api.delete(`/portfolios/${id}`);
      logAdminActivity(`Student portfolio for "${studentName}" was removed by admin`);
      Helpers.toast('Spotlight removed.');
      displayPortfolios();
    }
  };

  // 5. MODULE: GALLERY MANAGEMENT
  const displayGallery = async () => {
    const res = await Api.get('/gallery');
    const items = res.data.galleryItems || [];

    const refreshList = () => {
      let files = [...items];
      if (searchTerm) {
        files = files.filter(f => f.title.toLowerCase().includes(searchTerm.toLowerCase()));
      }

      const grid = document.getElementById('gallery-grid');
      if (grid) {
        grid.innerHTML = files.map(f => `
          <div class="card border bg-glass overflow-hidden flex col justify-between hover:scale transition-transform" style="border-radius: var(--radius-sm);">
            <div style="height: 160px; background: url('${App.getAssetPath(f.imageUrl)}') center/cover no-repeat;"></div>
            <div class="p-4 flex col gap-1">
              <span class="badge badge--violet self-start mb-2">${f.category}</span>
              <h5 class="body-sm text-white font-bold truncate">${f.title}</h5>
              <p class="text-xs text-tertiary truncate">${f.description || 'Showcase snapshot'}</p>
            </div>
            <div class="p-4 pt-0 flex gap-2">
              <button class="btn btn--outline btn--sm flex-grow edit-gal-btn" data-id="${f._id}">Edit</button>
              <button class="btn btn--outline btn--sm text-accent flex-grow delete-gal-btn" data-id="${f._id}">Delete</button>
            </div>
          </div>
        `).join('');

        document.querySelectorAll('.edit-gal-btn').forEach(btn => {
          btn.addEventListener('click', () => triggerEditGallery(btn.dataset.id, items));
        });
        document.querySelectorAll('.delete-gal-btn').forEach(btn => {
          btn.addEventListener('click', () => triggerDeleteGallery(btn.dataset.id, items));
        });
      }
    };

    mainPane.innerHTML = `
      <div class="flex justify-between items-center mb-6">
        <h2 class="h3 text-white">Academy Gallery</h2>
        <button id="add-gal-btn" class="btn btn--primary btn--sm">Add Media File</button>
      </div>
      ${renderControlsHeader('Search gallery by title...')}
      <div id="gallery-grid" class="grid grid-4 sm:grid-2 gap-6"></div>
    `;

    document.getElementById('add-gal-btn').addEventListener('click', triggerAddGallery);
    bindControls(refreshList);
    refreshList();
  };

  const getGalleryFields = (data = {}) => `
    <div class="form-group">
      <label class="form-label label">Image / Item Title</label>
      <input type="text" id="g-title" required class="form-input" value="${data.title || ''}" />
    </div>
    <div class="form-group">
      <label class="form-label label">Category</label>
      <input type="text" id="g-category" required class="form-input" value="${data.category || 'Studios'}" placeholder="Studios, Cohorts, Recitals" />
    </div>
    <div class="form-group">
      <label class="form-label label">Image URL</label>
      <input type="text" id="g-url" required class="form-input" value="${data.imageUrl || '/assets/images/default.jpg'}" />
    </div>
    <div class="form-group">
      <label class="form-label label">Description</label>
      <input type="text" id="g-desc" class="form-input" value="${data.description || ''}" />
    </div>
  `;

  const triggerAddGallery = () => {
    openModalDialog('Add Gallery Media', getGalleryFields(), async () => {
      const payload = {
        title: document.getElementById('g-title').value,
        category: document.getElementById('g-category').value,
        imageUrl: document.getElementById('g-url').value,
        description: document.getElementById('g-desc').value
      };
      await Api.post('/gallery', payload);
      logAdminActivity(`Gallery item "${payload.title}" was added by admin`);
      Helpers.toast('Gallery item created.');
      displayGallery();
    });
  };

  const triggerEditGallery = (id, items) => {
    const item = items.find(i => i._id === id);
    if (!item) return;
    openModalDialog('Edit Gallery Media', getGalleryFields(item), async () => {
      const payload = {
        title: document.getElementById('g-title').value,
        category: document.getElementById('g-category').value,
        imageUrl: document.getElementById('g-url').value,
        description: document.getElementById('g-desc').value
      };
      await Api.patch(`/gallery/${id}`, payload);
      logAdminActivity(`Gallery item "${payload.title}" was updated by admin`);
      Helpers.toast('Gallery item updated.');
      displayGallery();
    });
  };

  const triggerDeleteGallery = async (id, items) => {
    const item = items.find(i => i._id === id);
    const title = item ? item.title : 'Unknown';
    if (confirm('Delete media file?')) {
      await Api.delete(`/gallery/${id}`);
      logAdminActivity(`Gallery item "${title}" was removed by admin`);
      Helpers.toast('Media removed.');
      displayGallery();
    }
  };

  // 6. MODULE: EVENT MANAGEMENT
  const displayEvents = async () => {
    const res = await Api.get('/events');
    const events = res.data.events || [];

    const refreshList = () => {
      let list = [...events];
      if (searchTerm) {
        list = list.filter(e => e.title.toLowerCase().includes(searchTerm.toLowerCase()));
      }

      const tbody = document.getElementById('events-tbody');
      if (tbody) {
        tbody.innerHTML = list.map(ev => `
          <tr class="border-bottom">
            <td class="py-3 text-white font-medium">${ev.title}</td>
            <td class="py-3 text-secondary">${ev.location}</td>
            <td class="py-3 text-secondary">${Helpers.formatDate(ev.date)}</td>
            <td class="py-3 text-secondary">${Helpers.formatTime(ev.time)}</td>
            <td class="py-3 text-right" style="white-space: nowrap;">
              <div class="flex gap-2 justify-end">
                <button class="btn btn--outline btn--sm edit-ev-btn" data-id="${ev._id}">Edit</button>
                <button class="btn btn--outline btn--sm text-accent delete-ev-btn" data-id="${ev._id}">Delete</button>
              </div>
            </td>
          </tr>
        `).join('');

        document.querySelectorAll('.edit-ev-btn').forEach(btn => {
          btn.addEventListener('click', () => triggerEditEvent(btn.dataset.id, events));
        });
        document.querySelectorAll('.delete-ev-btn').forEach(btn => {
          btn.addEventListener('click', () => triggerDeleteEvent(btn.dataset.id, events));
        });
      }
    };

    mainPane.innerHTML = `
      <div class="flex justify-between items-center mb-6">
        <h2 class="h3 text-white">Event Scheduling</h2>
        <button id="add-ev-btn" class="btn btn--primary btn--sm">Add Event</button>
      </div>
      ${renderControlsHeader('Search events by title...')}
      <div class="overflow-x-auto card border bg-glass p-6">
        <table class="w-full text-left" style="border-collapse: collapse; font-size: var(--text-sm);">
          <thead>
            <tr class="border-bottom text-tertiary">
              <th class="py-3">Event Title</th>
              <th class="py-3">Location</th>
              <th class="py-3">Date</th>
              <th class="py-3">Time</th>
              <th class="py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody id="events-tbody"></tbody>
        </table>
      </div>
    `;

    document.getElementById('add-ev-btn').addEventListener('click', triggerAddEvent);
    bindControls(refreshList);
    refreshList();
  };

  const getEventFields = (data = {}) => `
    <div class="form-group">
      <label class="form-label label">Concert Title</label>
      <input type="text" id="e-title" required class="form-input" value="${data.title || ''}" />
    </div>
    <div class="form-group">
      <label class="form-label label">Location</label>
      <input type="text" id="e-location" required class="form-input" value="${data.location || 'Avadi, Chennai'}" />
    </div>
    <div class="grid grid-2 gap-4">
      <div class="form-group">
        <label class="form-label label">Date</label>
        <input type="date" id="e-date" required class="form-input" value="${data.date ? new Date(data.date).toISOString().split('T')[0] : ''}" style="background: var(--surface-input);" />
      </div>
      <div class="form-group">
        <label class="form-label label">Time</label>
        <input type="time" id="e-time" required class="form-input" value="${Helpers.convertTo24Hour(data.time)}" style="background: var(--surface-input);" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label label">Description</label>
      <textarea id="e-desc" required class="form-input" rows="3">${data.description || ''}</textarea>
    </div>
  `;

  const triggerAddEvent = () => {
    openModalDialog('Add Showcase Event', getEventFields(), async () => {
      const payload = {
        title: document.getElementById('e-title').value,
        location: document.getElementById('e-location').value,
        date: document.getElementById('e-date').value,
        time: document.getElementById('e-time').value,
        description: document.getElementById('e-desc').value
      };
      await Api.post('/events', payload);
      logAdminActivity(`Showcase event "${payload.title}" was scheduled by admin`);
      Helpers.toast('Showcase event scheduled.');
      displayEvents();
    });
  };

  const triggerEditEvent = (id, events) => {
    const ev = events.find(item => item._id === id);
    if (!ev) return;
    openModalDialog('Edit Event Schedule', getEventFields(ev), async () => {
      const payload = {
        title: document.getElementById('e-title').value,
        location: document.getElementById('e-location').value,
        date: document.getElementById('e-date').value,
        time: document.getElementById('e-time').value,
        description: document.getElementById('e-desc').value
      };
      await Api.patch(`/events/${id}`, payload);
      logAdminActivity(`Showcase event "${payload.title}" was updated by admin`);
      Helpers.toast('Showcase event updated.');
      displayEvents();
    });
  };

  const triggerDeleteEvent = async (id, events) => {
    const ev = events.find(item => item._id === id);
    const title = ev ? ev.title : 'Unknown';
    if (confirm('Delete scheduled event?')) {
      await Api.delete(`/events/${id}`);
      logAdminActivity(`Showcase event "${title}" was removed by admin`);
      Helpers.toast('Event removed.');
      displayEvents();
    }
  };

  // 7. MODULE: TESTIMONIALS MANAGEMENT
  const displayTestimonials = async () => {
    const res = await Api.get('/testimonials');
    const items = res.data.testimonials || [];

    const refreshList = () => {
      let list = [...items];
      if (searchTerm) {
        list = list.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()));
      }

      const tbody = document.getElementById('testimonials-tbody');
      if (tbody) {
        tbody.innerHTML = list.map(t => `
          <tr class="border-bottom">
            <td class="py-3 text-white font-medium">${t.name}</td>
            <td class="py-3 text-secondary">${t.role}</td>
            <td class="py-3 text-accent">${'★'.repeat(t.rating)}</td>
            <td class="py-3 text-right" style="white-space: nowrap;">
              <div class="flex gap-2 justify-end">
                <button class="btn btn--outline btn--sm edit-t-btn" data-id="${t._id}">Edit</button>
                <button class="btn btn--outline btn--sm text-accent delete-t-btn" data-id="${t._id}">Delete</button>
              </div>
            </td>
          </tr>
        `).join('');

        document.querySelectorAll('.edit-t-btn').forEach(btn => {
          btn.addEventListener('click', () => triggerEditTestimonial(btn.dataset.id, items));
        });
        document.querySelectorAll('.delete-t-btn').forEach(btn => {
          btn.addEventListener('click', () => triggerDeleteTestimonial(btn.dataset.id, items));
        });
      }
    };

    mainPane.innerHTML = `
      <div class="flex justify-between items-center mb-6">
        <h2 class="h3 text-white">Student & Parent Reviews</h2>
        <button id="add-t-btn" class="btn btn--primary btn--sm">Add Testimonial</button>
      </div>
      ${renderControlsHeader('Search testimonials by name...')}
      <div class="overflow-x-auto card border bg-glass p-6">
        <table class="w-full text-left" style="border-collapse: collapse; font-size: var(--text-sm);">
          <thead>
            <tr class="border-bottom text-tertiary">
              <th class="py-3">Reviewer Name</th>
              <th class="py-3">Role / Subtitle</th>
              <th class="py-3">Stars</th>
              <th class="py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody id="testimonials-tbody"></tbody>
        </table>
      </div>
    `;

    document.getElementById('add-t-btn').addEventListener('click', triggerAddTestimonial);
    bindControls(refreshList);
    refreshList();
  };

  const getTestimonialFields = (data = {}) => `
    <div class="form-group">
      <label class="form-label label">Reviewer Name</label>
      <input type="text" id="t-name" required class="form-input" value="${data.name || ''}" />
    </div>
    <div class="form-group">
      <label class="form-label label">Designation / Role</label>
      <input type="text" id="t-role" required class="form-input" value="${data.role || ''}" placeholder="Parent of Student / Adult Learner" />
    </div>
    <div class="form-group">
      <label class="form-label label">Stars Rating (1 to 5)</label>
      <input type="number" id="t-rating" required class="form-input" min="1" max="5" value="${data.rating || 5}" />
    </div>
    <div class="form-group">
      <label class="form-label label">Review Text</label>
      <textarea id="t-text" required class="form-input" rows="3">${data.text || ''}</textarea>
    </div>
  `;

  const triggerAddTestimonial = () => {
    openModalDialog('Add Review Testimonial', getTestimonialFields(), async () => {
      const payload = {
        name: document.getElementById('t-name').value,
        role: document.getElementById('t-role').value,
        rating: parseInt(document.getElementById('t-rating').value),
        text: document.getElementById('t-text').value
      };
      await Api.post('/testimonials', payload);
      logAdminActivity(`Testimonial from "${payload.name}" was published to homepage`);
      Helpers.toast('Review testimonial created.');
      displayTestimonials();
    });
  };

  const triggerEditTestimonial = (id, items) => {
    const t = items.find(item => item._id === id);
    if (!t) return;
    openModalDialog('Edit Review Testimonial', getTestimonialFields(t), async () => {
      const payload = {
        name: document.getElementById('t-name').value,
        role: document.getElementById('t-role').value,
        rating: parseInt(document.getElementById('t-rating').value),
        text: document.getElementById('t-text').value
      };
      await Api.patch(`/testimonials/${id}`, payload);
      logAdminActivity(`Testimonial from "${payload.name}" was updated by admin`);
      Helpers.toast('Review testimonial updated.');
      displayTestimonials();
    });
  };

  const triggerDeleteTestimonial = async (id, items) => {
    const t = items.find(item => item._id === id);
    const name = t ? t.name : 'Unknown';
    if (confirm('Delete this testimonial feedback entry?')) {
      await Api.delete(`/testimonials/${id}`);
      logAdminActivity(`Testimonial from "${name}" was removed by admin`);
      Helpers.toast('Review deleted.');
      displayTestimonials();
    }
  };

  // 8. MODULE: CONTACT MESSAGES
  const getContactFields = (data = {}) => `
    <div class="form-group">
      <label class="form-label label">Sender Name</label>
      <input type="text" id="cnt-name" required class="form-input" value="${data.name || ''}" />
    </div>
    <div class="form-group">
      <label class="form-label label">Email Address</label>
      <input type="email" id="cnt-email" required class="form-input" value="${data.email || ''}" />
    </div>
    <div class="form-group">
      <label class="form-label label">Phone (Optional)</label>
      <input type="text" id="cnt-phone" class="form-input" value="${data.phone || ''}" />
    </div>
    <div class="form-group">
      <label class="form-label label">Subject</label>
      <input type="text" id="cnt-subject" required class="form-input" value="${data.subject || ''}" />
    </div>
    <div class="form-group">
      <label class="form-label label">Message</label>
      <textarea id="cnt-message" required class="form-input" rows="4">${data.message || ''}</textarea>
    </div>
  `;

  const triggerAddContact = () => {
    openModalDialog('Add Contact Entry', getContactFields(), async () => {
      const payload = {
        name: document.getElementById('cnt-name').value,
        email: document.getElementById('cnt-email').value,
        phone: document.getElementById('cnt-phone').value,
        subject: document.getElementById('cnt-subject').value,
        message: document.getElementById('cnt-message').value
      };
      await Api.post('/contact', payload);
      logAdminActivity(`Contact inquiry from "${payload.name}" was created manually`);
      Helpers.toast('Contact inquiry created.');
      displayContacts();
    });
  };

  const displayContacts = async () => {
    const res = await Api.get('/contact');
    const messages = res.data.messages || [];

    const refreshList = () => {
      let list = [...messages];
      if (searchTerm) {
        list = list.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.subject.toLowerCase().includes(searchTerm.toLowerCase()));
      }

      const tbody = document.getElementById('contacts-tbody');
      if (tbody) {
        tbody.innerHTML = list.map(m => `
          <tr class="border-bottom ${!m.isRead ? 'font-semibold text-white' : 'text-secondary'}">
            <td class="py-3">${m.name}</td>
            <td class="py-3">${m.subject}</td>
            <td class="py-3 text-xs"><span class="badge ${m.isRead ? 'badge--outline' : 'badge--violet'}">${m.isRead ? 'Read' : 'New'}</span></td>
            <td class="py-3 text-right" style="white-space: nowrap;">
              <div class="flex gap-2 justify-end">
                <button class="btn btn--outline btn--sm view-msg-btn" data-id="${m._id}">Read</button>
                <button class="btn btn--outline btn--sm text-accent delete-msg-btn" data-id="${m._id}">Delete</button>
              </div>
            </td>
          </tr>
        `).join('');

        document.querySelectorAll('.view-msg-btn').forEach(btn => {
          btn.addEventListener('click', () => viewMessageContent(btn.dataset.id, messages));
        });
        document.querySelectorAll('.delete-msg-btn').forEach(btn => {
          btn.addEventListener('click', () => triggerDeleteMessage(btn.dataset.id, messages));
        });
      }
    };

    mainPane.innerHTML = `
      <div class="flex justify-between items-center mb-6">
        <h2 class="h3 text-white">Academy Inquiry Inbox</h2>
        <button id="add-contact-btn" class="btn btn--primary btn--sm">Add Entry</button>
      </div>
      ${renderControlsHeader('Search inbox by name or subject...')}
      <div class="overflow-x-auto card border bg-glass p-6">
        <table class="w-full text-left" style="border-collapse: collapse; font-size: var(--text-sm);">
          <thead>
            <tr class="border-bottom text-tertiary">
              <th class="py-3">Sender Name</th>
              <th class="py-3">Subject / Inquiry</th>
              <th class="py-3">Status</th>
              <th class="py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody id="contacts-tbody"></tbody>
        </table>
      </div>
    `;

    document.getElementById('add-contact-btn').addEventListener('click', triggerAddContact);
    bindControls(refreshList);
    refreshList();
  };

  const viewMessageContent = async (id, messages) => {
    const m = messages.find(item => item._id === id);
    if (!m) return;

    if (!m.isRead) {
      await Api.patch(`/contact/${id}/read`, {});
      logAdminActivity(`Contact inquiry from "${m.name}" was read by admin`);
    }

    openModalDialog(`Inquiry: ${m.subject}`, `
      <div class="flex col gap-4 text-secondary" style="font-size: var(--text-sm);">
        <p><strong class="text-white">Sender:</strong> ${m.name} (${m.email})</p>
        <p><strong class="text-white">Phone:</strong> ${m.phone || 'Not provided'}</p>
        <p><strong class="text-white">Received At:</strong> ${Helpers.formatDate(m.createdAt)}</p>
        <div class="divider"></div>
        <p class="text-white" style="white-space: pre-wrap; font-size: var(--text-base);">${m.message}</p>
      </div>
    `, () => closeModalDialog());

    displayContacts();
  };

  const triggerDeleteMessage = async (id, messages) => {
    const m = messages.find(item => item._id === id);
    const name = m ? m.name : 'Unknown';
    if (confirm('Delete contact message record?')) {
      await Api.delete(`/contact/${id}`);
      logAdminActivity(`Contact inquiry from "${name}" was deleted by admin`);
      Helpers.toast('Message removed.');
      displayContacts();
    }
  };

  // 9. MODULE: LIVE STREAM MANAGEMENT
  const displayLiveStream = async () => {
    const [ytRes, fbRes, igRes, studioRes] = await Promise.all([
      Api.get('/settings/live_youtube').catch(() => null),
      Api.get('/settings/live_facebook').catch(() => null),
      Api.get('/settings/live_instagram').catch(() => null),
      Api.get('/settings/live_studio_name').catch(() => null),
    ]);

    const liveYT     = ytRes?.data?.setting?.value     || '';
    const liveFB     = fbRes?.data?.setting?.value     || '';
    const liveIG     = igRes?.data?.setting?.value     || '';
    const studioName = studioRes?.data?.setting?.value || '';
    const hasAnyLive = liveYT || liveFB || liveIG;

    mainPane.innerHTML = `
      <div class="flex justify-between items-center mb-6">
        <div>
          <h2 class="h3 text-white">Live Stream Links</h2>
          <p class="body-xs text-secondary mt-1">Set the live stream URLs for the Online Classes page. Clear all fields to end the live session.</p>
        </div>
        ${hasAnyLive ? `<span class="badge badge--violet" style="background: rgba(255,68,68,.15); border: 1px solid #ff4444; color: #ff6666;">&#11044; Session Active</span>` : `<span class="body-xs text-tertiary">No active session</span>`}
      </div>

      <div class="card border bg-glass p-8" style="border-radius: var(--radius-md);">
        <form id="livestream-form" class="form flex col gap-6">

          <!-- Studio Name -->
          <div class="form-group">
            <label class="form-label label" style="display: flex; align-items: center; gap: 8px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Studio / Location Name
            </label>
            <input type="text" id="live-studio" class="form-input" value="${studioName}" placeholder="e.g. Vienna Studio, Chennai Campus, Home Studio" />
            <span class="body-xs text-tertiary mt-1" style="display:block;">This name appears as "Broadcasting Live from <em>Location</em>" on the Online Classes page.</span>
          </div>

          <!-- YouTube -->
          <div class="form-group">
            <label class="form-label label" style="display: flex; align-items: center; gap: 8px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF0000"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/></svg>
              YouTube Live URL
            </label>
            <input type="url" id="live-yt" class="form-input" value="${liveYT}" placeholder="https://youtube.com/live/..." />
            <span class="body-xs text-tertiary mt-1" style="display:block;">Paste the YouTube Live stream or video URL. Leave blank to hide.</span>
          </div>

          <!-- Facebook -->
          <div class="form-group">
            <label class="form-label label" style="display: flex; align-items: center; gap: 8px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              Facebook Live URL
            </label>
            <input type="url" id="live-fb" class="form-input" value="${liveFB}" placeholder="https://facebook.com/..." />
            <span class="body-xs text-tertiary mt-1" style="display:block;">Paste the Facebook Live stream URL. Leave blank to hide.</span>
          </div>

          <!-- Instagram -->
          <div class="form-group">
            <label class="form-label label" style="display: flex; align-items: center; gap: 8px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E1306C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              Instagram Live URL
            </label>
            <input type="url" id="live-ig" class="form-input" value="${liveIG}" placeholder="https://instagram.com/..." />
            <span class="body-xs text-tertiary mt-1" style="display:block;">Paste the Instagram Live link. Leave blank to hide.</span>
          </div>

          <div class="flex gap-4 items-center pt-2 border-top">
            <button type="submit" class="btn btn--primary">Save Live Links</button>
            <button type="button" id="clear-live-btn" class="btn btn--outline" style="color: var(--text-accent);">Clear All (End Session)</button>
          </div>
        </form>
      </div>

      <div class="card border bg-glass p-6 mt-6" style="border-radius: var(--radius-md);">
        <h3 class="h6 text-white mb-3">How it works</h3>
        <ul class="flex col gap-2 text-sm text-secondary">
          <li>&#8226; Enter a live URL for any platform(s) and save — the Online Classes page will show live join buttons immediately.</li>
          <li>&#8226; You can set one, two, or all three platforms simultaneously.</li>
          <li>&#8226; To end the session, click <strong class="text-white">Clear All</strong> or manually remove the URLs and save.</li>
          <li>&#8226; Links open in a new tab for visitors.</li>
        </ul>
      </div>
    `;

    document.getElementById('livestream-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const saveBtn = e.target.querySelector('button[type="submit"]');
      saveBtn.disabled = true;
      saveBtn.textContent = 'Saving...';
      try {
        await Promise.all([
          Api.post('/settings', { key: 'live_studio_name', value: document.getElementById('live-studio').value.trim(), description: 'Live Studio Location Name' }),
          Api.post('/settings', { key: 'live_youtube',    value: document.getElementById('live-yt').value.trim(), description: 'YouTube Live URL' }),
          Api.post('/settings', { key: 'live_facebook',   value: document.getElementById('live-fb').value.trim(), description: 'Facebook Live URL' }),
          Api.post('/settings', { key: 'live_instagram',  value: document.getElementById('live-ig').value.trim(), description: 'Instagram Live URL' }),
        ]);
        logAdminActivity('Live stream links were updated');
        Helpers.toast('Live stream links saved.');
        displayLiveStream();
      } catch (err) {
        Helpers.toast(err.message || 'Save failed', 'error');
      } finally {
        saveBtn.disabled = false;
        saveBtn.textContent = 'Save Live Links';
      }
    });

    document.getElementById('clear-live-btn').addEventListener('click', async () => {
      if (!confirm('This will clear all live stream links and end the session on the website. Continue?')) return;
      try {
        await Promise.all([
          Api.post('/settings', { key: 'live_studio_name', value: '',  description: 'Live Studio Location Name' }),
          Api.post('/settings', { key: 'live_youtube',     value: '', description: 'YouTube Live URL' }),
          Api.post('/settings', { key: 'live_facebook',    value: '', description: 'Facebook Live URL' }),
          Api.post('/settings', { key: 'live_instagram',   value: '', description: 'Instagram Live URL' }),
        ]);
        logAdminActivity('Live stream session was ended by admin');
        Helpers.toast('Live session ended. All links cleared.');
        displayLiveStream();
      } catch (err) {
        Helpers.toast(err.message || 'Clear failed', 'error');
      }
    });
  };

  // 10. MODULE: SOCIAL LINKS MANAGEMENT
  const displaySocials = async () => {
    const youtubeRes = await Api.get('/settings/social_youtube').catch(() => null);
    const instaRes = await Api.get('/settings/social_instagram').catch(() => null);
    const fbRes = await Api.get('/settings/social_facebook').catch(() => null);
    const whatsappRes = await Api.get('/settings/social_whatsapp').catch(() => null);
    const linkedinRes = await Api.get('/settings/social_linkedin').catch(() => null);

    mainPane.innerHTML = `
      <h2 class="h3 text-white mb-6">Social Platform Links</h2>
      <div class="card border bg-glass p-8 max-width-md" style="border-radius: var(--radius-md);">
        <form id="socials-config-form" class="form flex col gap-6">
          <div class="form-group">
            <label class="form-label label">YouTube Channel</label>
            <input type="url" id="soc-yt" class="form-input" value="${youtubeRes?.data?.setting?.value || ''}" />
          </div>
          <div class="form-group">
            <label class="form-label label">Instagram Profile</label>
            <input type="url" id="soc-insta" class="form-input" value="${instaRes?.data?.setting?.value || ''}" />
          </div>
          <div class="form-group">
            <label class="form-label label">Facebook Page</label>
            <input type="url" id="soc-fb" class="form-input" value="${fbRes?.data?.setting?.value || ''}" />
          </div>
          <div class="form-group">
            <label class="form-label label">WhatsApp API Url</label>
            <input type="url" id="soc-wa" class="form-input" value="${whatsappRes?.data?.setting?.value || ''}" />
          </div>
          <div class="form-group">
            <label class="form-label label">LinkedIn Profile</label>
            <input type="url" id="soc-li" class="form-input" value="${linkedinRes?.data?.setting?.value || ''}" />
          </div>
          <button type="submit" class="btn btn--primary w-fit mt-4">Save Configuration</button>
        </form>
      </div>
    `;

    document.getElementById('socials-config-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const saveBtn = e.target.querySelector('button[type="submit"]');
      saveBtn.disabled = true;
      saveBtn.textContent = 'Saving...';
      try {
        await Promise.all([
          Api.post('/settings', { key: 'social_youtube', value: document.getElementById('soc-yt').value, description: 'YouTube URL' }),
          Api.post('/settings', { key: 'social_instagram', value: document.getElementById('soc-insta').value, description: 'Instagram URL' }),
          Api.post('/settings', { key: 'social_facebook', value: document.getElementById('soc-fb').value, description: 'Facebook URL' }),
          Api.post('/settings', { key: 'social_whatsapp', value: document.getElementById('soc-wa').value, description: 'WhatsApp URL' }),
          Api.post('/settings', { key: 'social_linkedin', value: document.getElementById('soc-li').value, description: 'LinkedIn URL' })
        ]);
        logAdminActivity(`Social media platform links were updated`);
        Helpers.toast('Social settings updated.');
      } catch (err) {
        Helpers.toast(err.message || 'Save failed', 'error');
      } finally {
        saveBtn.disabled = false;
        saveBtn.textContent = 'Save Configuration';
      }
    });
  };

  // 10. MODULE: WEBSITE SETTINGS
  const displaySettings = async () => {
    const res = await Api.get('/settings');
    const settings = res.data.settings || [];

    const refreshList = () => {
      const tbody = document.getElementById('settings-tbody');
      if (tbody) {
        tbody.innerHTML = settings.map(s => `
          <tr class="border-bottom">
            <td class="py-3 text-white font-semibold">${s.key}</td>
            <td class="py-3 text-secondary truncate" style="max-width: 250px;">${JSON.stringify(s.value)}</td>
            <td class="py-3 text-right" style="white-space: nowrap;">
              <div class="flex gap-2 justify-end">
                <button class="btn btn--outline btn--sm edit-set-btn" data-key="${s.key}">Edit</button>
                <button class="btn btn--outline btn--sm text-accent delete-set-btn" data-key="${s.key}">Delete</button>
              </div>
            </td>
          </tr>
        `).join('');

        document.querySelectorAll('.edit-set-btn').forEach(btn => {
          btn.addEventListener('click', () => triggerEditSetting(btn.dataset.key, settings));
        });
        document.querySelectorAll('.delete-set-btn').forEach(btn => {
          btn.addEventListener('click', () => triggerDeleteSetting(btn.dataset.key, settings));
        });
      }
    };

    const getSettingFields = (data = {}) => `
      <div class="form-group">
        <label class="form-label label">Config Key</label>
        <input type="text" id="s-key" required class="form-input" value="${data.key || ''}" ${data.key ? 'disabled style="opacity: 0.5;"' : ''} />
      </div>
      <div class="form-group">
        <label class="form-label label">Config Value (JSON or String)</label>
        <input type="text" id="s-val" required class="form-input" value="${data.value !== undefined ? JSON.stringify(data.value) : ''}" />
      </div>
      <div class="form-group">
        <label class="form-label label">Description</label>
        <input type="text" id="s-desc" class="form-input" value="${data.description || ''}" />
      </div>
    `;

    const triggerAddSetting = () => {
      openModalDialog('Add Config', getSettingFields(), async () => {
        const key = document.getElementById('s-key').value;
        const rawVal = document.getElementById('s-val').value;
        let parsed;
        try { parsed = JSON.parse(rawVal); } catch { parsed = rawVal; }
        await Api.post('/settings', {
          key,
          value: parsed,
          description: document.getElementById('s-desc').value
        });
        logAdminActivity(`Settings key "${key}" was created`);
        Helpers.toast('Config created.');
        displaySettings();
      });
    };

    const triggerEditSetting = (key, settingsList) => {
      const s = settingsList.find(item => item.key === key);
      if (!s) return;
      openModalDialog('Edit Config', getSettingFields(s), async () => {
        const rawVal = document.getElementById('s-val').value;
        let parsed;
        try { parsed = JSON.parse(rawVal); } catch { parsed = rawVal; }
        await Api.post('/settings', {
          key,
          value: parsed,
          description: document.getElementById('s-desc').value
        });
        logAdminActivity(`Settings key "${key}" was updated`);
        Helpers.toast('Config saved.');
        displaySettings();
      });
    };

    const triggerDeleteSetting = async (key, settingsList) => {
      if (confirm(`Delete config key ${key}?`)) {
        await Api.delete(`/settings/${key}`);
        logAdminActivity(`Settings key "${key}" was deleted`);
        Helpers.toast('Config key removed.');
        displaySettings();
      }
    };

    mainPane.innerHTML = `
      <div class="flex justify-between items-center mb-6">
        <h2 class="h3 text-white">Website Settings</h2>
        <button id="add-set-btn" class="btn btn--primary btn--sm">Add Config</button>
      </div>
      <div class="overflow-x-auto card border bg-glass p-6">
        <table class="w-full text-left" style="border-collapse: collapse; font-size: var(--text-sm);">
          <thead>
            <tr class="border-bottom text-tertiary">
              <th class="py-3">Config Key</th>
              <th class="py-3">Config Value</th>
              <th class="py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody id="settings-tbody"></tbody>
        </table>
      </div>
    `;

    document.getElementById('add-set-btn').addEventListener('click', triggerAddSetting);
    refreshList();
  };

  // 11. MODULE: ADMIN PROFILE
  const displayProfile = async () => {
    mainPane.innerHTML = `
      <h2 class="h3 text-white mb-6">Admin Profile Info</h2>
      <div class="card border bg-glass p-8 max-width-md flex col gap-6" style="border-radius: var(--radius-md);">
        <div class="flex items-center gap-4 border-bottom pb-4">
          <div class="flex items-center justify-center bg-tinted text-accent rounded-full font-bold" style="width: 60px; height: 60px; font-size: var(--text-lg);">
            ${user.firstName[0]}${user.lastName[0]}
          </div>
          <div>
            <h4 class="h5 text-white font-bold leading-none">${user.firstName} ${user.lastName}</h4>
            <span class="text-xs text-accent uppercase font-bold mt-2 tracking-wider">System Administrator</span>
          </div>
        </div>
        
        <form id="profile-config-form" class="form flex col gap-4">
          <div class="grid grid-2 gap-4">
            <div class="form-group">
              <label class="form-label label">First Name</label>
              <input type="text" id="p-first" class="form-input" value="${user.firstName}" />
            </div>
            <div class="form-group">
              <label class="form-label label">Last Name</label>
              <input type="text" id="p-last" class="form-input" value="${user.lastName}" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label label">Email Address</label>
            <input type="email" disabled class="form-input" value="${user.email}" style="opacity: 0.5;" />
          </div>
          <button type="submit" class="btn btn--primary w-fit mt-4">Save Profiles</button>
        </form>
      </div>
    `;

    document.getElementById('profile-config-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const saveBtn = e.target.querySelector('button[type="submit"]');
      saveBtn.disabled = true;
      saveBtn.textContent = 'Saving...';
      try {
        const payload = {
          firstName: document.getElementById('p-first').value,
          lastName: document.getElementById('p-last').value
        };
        await Api.patch('/users/update-me', payload);
        logAdminActivity(`Admin profile info was updated`);
        Helpers.toast('Admin profiles updated. Syncing login state...');
        await Auth.refreshUser();
        displayProfile();
      } catch (err) {
        Helpers.toast(err.message || 'Failed to save profile changes', 'error');
      } finally {
        saveBtn.disabled = false;
        saveBtn.textContent = 'Save Profiles';
      }
    });
  };

  // Render overview pane on startup
  await loadPane('overview');
}, { auth: true });
