/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Course Detail Page View
 *  frontend/pages/course-detail.js
 * ============================================================
 */

'use strict';

Router.register('/courses/:slug', async ({ params }) => {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="container py-24 text-center text-secondary">
      <div class="spinner mb-4" style="margin: 0 auto; border-color: var(--violet); border-right-color: transparent;"></div>
      <p class="body-sm">Loading curriculum...</p>
    </div>
  `;

  try {
    const res = await Api.get(`/courses/${params.slug}`);
    const course = res.data.course;
    
    // Check enrollment
    let isEnrolled = false;
    let enrollmentId = null;
    let completedLessons = [];

    if (Auth.isLoggedIn()) {
      const enrollRes = await Api.get('/enrollments/my');
      const myEnrollment = enrollRes.data.enrollments.find(e => e.course._id === course._id);
      if (myEnrollment) {
        isEnrolled = true;
        enrollmentId = myEnrollment._id;
        completedLessons = myEnrollment.completedLessons || [];
      }
    }

    // Resolve Image Fallback
    let imgSrc = course.imageUrl;
    if (!imgSrc || imgSrc === 'default-course.webp' || imgSrc === '/assets/images/default-course.jpg') {
      if (course.category === 'Classical Piano') imgSrc = 'https://images.unsplash.com/photo-1552422535-c45813c61732?auto=format&fit=crop&q=80&w=1200';
      else if (course.category === 'Jazz Keyboard') imgSrc = 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=1200';
      else if (course.category === 'Music Theory') imgSrc = 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&q=80&w=1200';
      else imgSrc = 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&q=80&w=1200';
    } else if (!imgSrc.startsWith('http') && !imgSrc.startsWith('/')) {
      imgSrc = App.getAssetPath('/assets/images/' + imgSrc);
    }

    // Instructor Initials Fallback
    let instInitials = 'KA';
    if (course.instructor?.firstName && course.instructor?.lastName) {
      instInitials = course.instructor.firstName.charAt(0) + course.instructor.lastName.charAt(0);
    }

    const html = `
      <!-- 1. HERO SECTION -->
      <section class="relative border-bottom" style="border-color: rgba(255,255,255,0.03); background-color: var(--bg-base); min-height: 50vh; display: flex; align-items: center; overflow: hidden;">
        <!-- Background Image overlay -->
        <div class="absolute inset-0" style="z-index: 0;">
          <img src="${imgSrc}" alt="${course.title}" class="w-full h-full object-cover" style="opacity: 0.15; filter: grayscale(100%) contrast(120%); mix-blend-mode: luminosity;" loading="lazy">
          <div class="absolute inset-0" style="background: linear-gradient(to right, rgba(18,18,18,1) 0%, rgba(18,18,18,0.8) 50%, rgba(18,18,18,0.4) 100%);"></div>
          <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(18,18,18,1) 0%, rgba(18,18,18,0) 40%);"></div>
        </div>
        
        <div class="container relative py-20" style="z-index: 1;">
          <div class="max-w-3xl course-fade-in">
            <div class="flex items-center gap-3 mb-6 flex-wrap">
              <span class="badge badge--violet shadow-sm" style="background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.3); color: var(--violet);">${course.level || 'All Levels'}</span>
              <span class="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-2">
                <span class="w-1 h-1 rounded-full bg-secondary"></span>
                ${course.category || 'Course'}
              </span>
            </div>
            
            <h1 class="h2 text-primary mb-6" style="line-height: 1.1; letter-spacing: -0.03em;">${course.title}</h1>
            <p class="body-lg text-secondary mb-10 clamp-3" style="line-height: 1.6;">${course.description || ''}</p>

            <div class="flex items-center gap-8 flex-wrap" style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 1.5rem;">
              <div class="flex items-center gap-3">
                <svg class="text-violet" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <div class="flex col gap-1"><span class="text-xs text-secondary uppercase font-bold tracking-wider">Duration</span><span class="text-primary font-medium">${course.totalDuration || '0'} Mins</span></div>
              </div>
              <div class="flex items-center gap-3">
                <svg class="text-violet" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <div class="flex col gap-1"><span class="text-xs text-secondary uppercase font-bold tracking-wider">Lessons</span><span class="text-primary font-medium">${course.lessons ? course.lessons.length : '0'} Classes</span></div>
              </div>
              <div class="flex items-center gap-3">
                <svg class="text-violet" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                <div class="flex col gap-1"><span class="text-xs text-secondary uppercase font-bold tracking-wider">Students</span><span class="text-primary font-medium">${course.studentsEnrolled ? course.studentsEnrolled.length : '0'}</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Content Area -->
      <section class="section py-16" style="background: var(--bg-base);">
        <div class="container grid-sidebar gap-12 items-start">
          
          <!-- LEFT COLUMN: Content -->
          <div class="flex col gap-16">
            
            <!-- Video Player (If Enrolled) -->
            ${isEnrolled ? `
              <div id="lesson-player-section" class="course-fade-in" style="animation-delay: 0.1s;">
                <div class="flex justify-between items-end mb-6">
                  <div>
                    <h2 class="h3 text-primary">Classroom</h2>
                    <p class="body-sm text-secondary mt-1">Select a lesson below to begin playback.</p>
                  </div>
                </div>
                
                <div class="card border-subtle overflow-hidden bg-overlay" style="border-radius: 16px; border: 1px solid rgba(255,255,255,0.05); box-shadow: 0 10px 40px rgba(0,0,0,0.5);">
                  <div class="relative" style="aspect-ratio: 16/9; background: #000; display:flex; align-items:center; justify-content:center; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <video id="classroom-video" controls class="w-full h-full" style="display:none;"></video>
                    <div id="classroom-placeholder" class="text-center p-8">
                      <div class="mb-4" style="color: var(--text-tertiary);">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>
                      </div>
                      <p class="body-base text-secondary">No lesson selected.</p>
                    </div>
                  </div>
                  <div class="p-6 flex justify-between items-center sm:flex-col gap-6">
                    <div class="flex-1">
                      <span class="text-xs font-bold uppercase tracking-wider text-violet mb-1 block" id="player-lesson-section">Now Playing</span>
                      <h4 class="h5 text-primary leading-tight" id="player-lesson-title">Select a lesson</h4>
                    </div>
                    <div>
                      <button id="mark-complete-btn" class="btn btn--outline hidden" style="border-radius: 8px;">Mark as Completed</button>
                    </div>
                  </div>
                </div>
              </div>
            ` : ''}

            <!-- What You'll Learn & Requirements -->
            ${((course.whatYouLearn && course.whatYouLearn.length > 0) || (course.requirements && course.requirements.length > 0)) ? `
              <div class="grid grid-2 gap-8 sm:grid-1 course-fade-in" style="animation-delay: 0.2s;">
                ${course.whatYouLearn && course.whatYouLearn.length > 0 ? `
                  <div class="card bg-overlay border-subtle p-8" style="border-radius: 16px; border: 1px solid rgba(255,255,255,0.03);">
                    <h3 class="h5 text-primary mb-6 flex items-center gap-3">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--violet)" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      What You'll Learn
                    </h3>
                    <ul class="flex col gap-4">
                      ${course.whatYouLearn.map(item => `
                        <li class="flex items-start gap-3 text-sm text-secondary leading-relaxed">
                          <span class="text-violet mt-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></span>
                          <span>${item}</span>
                        </li>
                      `).join('')}
                    </ul>
                  </div>
                ` : ''}
                
                ${course.requirements && course.requirements.length > 0 ? `
                  <div class="card bg-overlay border-subtle p-8" style="border-radius: 16px; border: 1px solid rgba(255,255,255,0.03);">
                    <h3 class="h5 text-primary mb-6 flex items-center gap-3">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--violet)" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                      Requirements
                    </h3>
                    <ul class="flex col gap-4">
                      ${course.requirements.map(item => `
                        <li class="flex items-start gap-3 text-sm text-secondary leading-relaxed">
                          <span class="text-tertiary mt-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/></svg></span>
                          <span>${item}</span>
                        </li>
                      `).join('')}
                    </ul>
                  </div>
                ` : ''}
              </div>
            ` : ''}

            <!-- Syllabus Section -->
            <div class="course-fade-in" style="animation-delay: 0.3s;">
              <h2 class="h3 text-primary mb-6">Course Syllabus</h2>
              ${(!course.lessons || course.lessons.length === 0) ? `
                <div class="card bg-overlay border-subtle p-8 text-center" style="border-radius: 16px; border: 1px solid rgba(255,255,255,0.03);">
                  <p class="body-sm text-secondary">No lessons have been published for this curriculum yet.</p>
                </div>
              ` : `
                <div class="flex col gap-3">
                  ${course.lessons.map((lesson, idx) => {
                    const isCompleted = completedLessons.includes(lesson._id);
                    const canPreview = lesson.isFree || isEnrolled;
                    
                    return `
                      <div class="lesson-row card bg-overlay border-subtle p-5 flex justify-between items-center gap-4 transition-all" 
                           style="border-radius: 12px; border: 1px solid rgba(255,255,255,0.03); ${canPreview ? 'cursor: pointer;' : 'opacity: 0.7;'}"
                           ${canPreview ? `onclick="window.loadLessonVideo('${lesson._id}', '${encodeURIComponent(lesson.title)}', '${encodeURIComponent(lesson.section || '')}', '${lesson.videoUrl}', this)"` : ''}>
                        
                        <div class="flex items-center gap-4">
                          <div class="flex-shrink-0 flex items-center justify-center" style="width: 32px; height: 32px; border-radius: 50%; background: ${isCompleted ? 'var(--violet)' : 'rgba(255,255,255,0.05)'}; color: ${isCompleted ? '#fff' : 'var(--text-tertiary)'};">
                            ${isCompleted 
                              ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' 
                              : (canPreview ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1"><polygon points="5 3 19 12 5 21 5 3"/></svg>' : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>')
                            }
                          </div>
                          <div>
                            <h4 class="body-base text-primary font-medium mb-1 ${!canPreview ? 'text-secondary' : ''}">${idx + 1}. ${lesson.title}</h4>
                            <span class="text-xs text-tertiary flex items-center gap-2">
                              ${lesson.section || 'General'} 
                              <span style="width: 3px; height: 3px; border-radius: 50%; background: var(--border-subtle);"></span> 
                              ${Math.round(lesson.videoDuration / 60)} mins
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          ${lesson.isFree && !isEnrolled ? '<span class="badge badge--violet" style="background: rgba(99, 102, 241, 0.1); color: var(--violet); border: none;">Preview</span>' : ''}
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              `}
            </div>

            <!-- Instructor Section -->
            <div class="course-fade-in" style="animation-delay: 0.4s;">
              <h2 class="h3 text-primary mb-6">Your Instructor</h2>
              <div class="card bg-overlay border-subtle p-8 flex sm:flex-col gap-8 items-start" style="border-radius: 16px; border: 1px solid rgba(255,255,255,0.03);">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center text-primary font-bold h3" style="width: 100px; height: 100px; border-radius: 50%; background: var(--surface-1); border: 1px solid rgba(255,255,255,0.05);">
                    ${instInitials}
                  </div>
                </div>
                <div>
                  <h3 class="h4 text-primary mb-2">${course.instructor?.firstName || 'Academy'} ${course.instructor?.lastName || 'Faculty'}</h3>
                  <p class="text-xs font-bold uppercase tracking-wider text-violet mb-4">Master Instructor</p>
                  <p class="body-sm text-secondary leading-relaxed">${course.instructor?.bio || 'Professional keyboardist and conservatory-trained faculty member dedicated to advancing piano technique and musical theory.'}</p>
                </div>
              </div>
            </div>

          </div>

          <!-- RIGHT COLUMN: Sticky Enrollment Sidebar -->
          <div class="relative w-full">
            <div class="card bg-overlay border-subtle p-1 sticky course-fade-in" style="top: 100px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.03); box-shadow: 0 10px 40px rgba(0,0,0,0.3); animation-delay: 0.5s;">
              
              <!-- Thumbnail -->
              <div class="relative overflow-hidden mb-6" style="border-radius: 14px 14px 0 0; aspect-ratio: 16/9;">
                <img src="${imgSrc}" class="w-full h-full object-cover" style="filter: brightness(0.9);" loading="lazy">
              </div>

              <div class="px-6 pb-6">
                <div class="flex items-baseline gap-2 mb-6">
                  <span class="display-sm text-primary" style="font-family: var(--font-body); letter-spacing: -0.02em;">${course.isFree ? 'Free' : `₹${course.price}`}</span>
                </div>

                ${isEnrolled ? `
                  <div class="text-center p-4 rounded bg-base border-subtle mb-4" style="border: 1px solid rgba(255,255,255,0.03);">
                    <span class="body-sm text-violet font-semibold flex items-center justify-center gap-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                      You are actively enrolled
                    </span>
                  </div>
                ` : `
                  <button id="enroll-btn" class="btn btn--primary w-full text-center mb-6" style="border-radius: 8px; font-weight: 600;">Enroll Now</button>
                  <p class="text-xs text-center text-tertiary mb-6">30-Day Money-Back Guarantee</p>
                `}

                <div class="border-top pt-6" style="border-color: rgba(255,255,255,0.05);">
                  <h4 class="text-sm text-primary font-semibold mb-4">This curriculum includes:</h4>
                  <ul class="flex col gap-3">
                    <li class="flex items-center gap-3 text-sm text-secondary">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--violet)" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
                      ${course.totalDuration} minutes of video
                    </li>
                    <li class="flex items-center gap-3 text-sm text-secondary">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--violet)" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                      Notation & Exercises
                    </li>
                    <li class="flex items-center gap-3 text-sm text-secondary">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--violet)" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      Full lifetime access
                    </li>
                    <li class="flex items-center gap-3 text-sm text-secondary">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--violet)" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      Access on mobile and desktop
                    </li>
                    <li class="flex items-center gap-3 text-sm text-secondary">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--violet)" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
                      Certificate of completion
                    </li>
                  </ul>
                </div>
                
              </div>
            </div>
          </div>

        </div>
      </section>
    `;

    app.innerHTML = App.wrapWithLayout(html);
    App.initNavbarScroll();

    // Bind Player Loader globally so inline onclick handlers work
    window.loadLessonVideo = (lessonId, titleEncoded, sectionEncoded, videoUrl, elementRow) => {
      const title = decodeURIComponent(titleEncoded);
      const section = decodeURIComponent(sectionEncoded);

      const videoEl = document.getElementById('classroom-video');
      const placeholderEl = document.getElementById('classroom-placeholder');
      const playerTitle = document.getElementById('player-lesson-title');
      const playerSection = document.getElementById('player-lesson-section');
      const markBtn = document.getElementById('mark-complete-btn');

      if (!videoEl || !placeholderEl) return;

      // Update styling for the active row
      document.querySelectorAll('.lesson-row').forEach(row => {
        row.style.background = 'var(--bg-overlay)';
        row.style.borderColor = 'rgba(255,255,255,0.03)';
      });
      if (elementRow) {
        elementRow.style.background = 'var(--surface-1)';
        elementRow.style.borderColor = 'rgba(255,255,255,0.1)';
      }

      placeholderEl.style.display = 'none';
      videoEl.style.display = 'block';
      videoEl.src = videoUrl;
      videoEl.play();

      playerTitle.textContent = title;
      playerSection.textContent = section || 'General';

      if (markBtn && isEnrolled) {
        markBtn.classList.remove('hidden');
        const completed = completedLessons.includes(lessonId);
        if (completed) {
          markBtn.textContent = '✓ Completed';
          markBtn.className = 'btn btn--sm';
          markBtn.style.background = 'var(--violet)';
          markBtn.style.borderColor = 'var(--violet)';
          markBtn.style.color = '#fff';
          markBtn.disabled = true;
        } else {
          markBtn.textContent = 'Mark as Completed';
          markBtn.className = 'btn btn--outline btn--sm';
          markBtn.style.background = 'transparent';
          markBtn.style.borderColor = 'var(--border-subtle)';
          markBtn.style.color = 'var(--text-primary)';
          markBtn.disabled = false;
        }
        
        markBtn.onclick = async () => {
          try {
            markBtn.textContent = 'Saving...';
            await Api.patch(`/enrollments/${enrollmentId}/progress`, { lessonId });
            Helpers.toast('Lesson marked as completed!');
            completedLessons.push(lessonId);
            
            // Update button state
            markBtn.textContent = '✓ Completed';
            markBtn.className = 'btn btn--sm';
            markBtn.style.background = 'var(--violet)';
            markBtn.style.borderColor = 'var(--violet)';
            markBtn.style.color = '#fff';
            markBtn.disabled = true;

            // Update row icon
            if (elementRow) {
              const iconContainer = elementRow.querySelector('.flex-shrink-0');
              if (iconContainer) {
                iconContainer.style.background = 'var(--violet)';
                iconContainer.style.color = '#fff';
                iconContainer.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>';
              }
            }
          } catch (err) {
            Helpers.toast('Failed to update progress.', 'error');
            markBtn.textContent = 'Mark as Completed';
          }
        };
      }
    };

    // Bind Enroll Action
    const enrollBtn = document.getElementById('enroll-btn');
    if (enrollBtn) {
      enrollBtn.addEventListener('click', async () => {
        if (!Auth.isLoggedIn()) {
          Helpers.toast('Please sign in to enroll.', 'error');
          Router.navigate('/login');
          return;
        }

        try {
          enrollBtn.disabled = true;
          enrollBtn.textContent = 'Processing...';
          await Api.post(`/enrollments/${course._id}`);
          Helpers.toast('Successfully enrolled!');
          Router.navigate(`/courses/${params.slug}`); // Refresh to show player
        } catch (err) {
          console.error(err);
          Helpers.toast(err.message || 'Enrollment failed.', 'error');
          enrollBtn.disabled = false;
          enrollBtn.textContent = 'Enroll Now';
        }
      });
    }

    // Inject custom hover styles for lesson rows
    const styleId = 'course-detail-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .course-fade-in {
          animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        @media (hover: hover) and (pointer: fine) {
          .lesson-row:hover {
            background: var(--surface-1) !important;
            border-color: rgba(255,255,255,0.08) !important;
          }
        }
      `;
      document.head.appendChild(style);
    }

  } catch (err) {
    console.error(err);
    app.innerHTML = App.wrapWithLayout(`
      <div class="container py-24 text-center">
        <div style="display: inline-flex; align-items: center; justify-content: center; width: 64px; height: 64px; border-radius: 50%; background: var(--surface-1); color: var(--text-tertiary); margin-bottom: 24px;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <h1 class="h3 text-primary mb-4">Curriculum Unavailable</h1>
        <p class="body-sm text-secondary mb-8 max-w-md mx-auto">We couldn't load the details for this course. It may have been unpublished or the URL is incorrect.</p>
        <a href="/courses" class="btn btn--outline">Back to Academy Directory</a>
      </div>
    `);
  }
});
