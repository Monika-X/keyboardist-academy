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
    <div class="container py-16 text-center text-secondary">
      <p>Loading course details...</p>
    </div>
  `;

  try {
    const res = await Api.get(`/courses/${params.slug}`);
    const course = res.data.course;
    
    // Check if the current user is enrolled in this course
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

    const html = `
      <section class="section section--glow border-bottom">
        <div class="container grid grid-12 gap-12 items-center">
          <div class="col-span-7 md\:col-span-full">
            <span class="badge badge--violet mb-4">${course.level}</span>
            <span class="label text-tertiary ml-4">${course.category}</span>
            <h1 class="display-md text-white mt-4 mb-6">${course.title}</h1>
            <p class="body-md text-secondary mb-8">${course.description}</p>
            
            <div class="flex items-center gap-8 flex-wrap mb-8">
              <div>
                <span class="label text-tertiary block mb-1">Duration</span>
                <span class="body-base text-white font-semibold">${course.totalDuration} mins</span>
              </div>
              <div>
                <span class="label text-tertiary block mb-1">Lessons</span>
                <span class="body-base text-white font-semibold">${course.totalLessons} videos</span>
              </div>
              <div>
                <span class="label text-tertiary block mb-1">Rating</span>
                <span class="body-base text-white font-semibold">${course.averageRating} ★ (${course.reviewCount})</span>
              </div>
            </div>

            <div class="flex items-center gap-4">
              ${isEnrolled ? `
                <a href="#syllabus" class="btn btn--outline">View Lessons</a>
                <span class="body-sm text-accent font-semibold">✓ You are enrolled!</span>
              ` : `
                <button id="enroll-btn" class="btn btn--primary btn--lg">${course.isFree ? 'Enroll Free' : `Enroll for ${Helpers.formatPrice(course.price)}`}</button>
              `}
            </div>
          </div>
          
          <div class="col-span-5 md\:col-span-full">
            <div class="card p-8 border" style="background: var(--surface-1);">
              <div style="height: 200px; display:flex; align-items:center; justify-content:center; font-size: 80px; background: var(--surface-2); border-radius: var(--radius-md);" class="mb-6">
                <svg class="icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;"><rect x="2" y="3" width="20" height="18" rx="2" ry="2"/><line x1="6" y1="3" x2="6" y2="21"/><line x1="10" y1="3" x2="10" y2="21"/><line x1="14" y1="3" x2="14" y2="21"/><line x1="18" y1="3" x2="18" y2="21"/></svg>
              </div>
              <h3 class="h5 text-white mb-4">Course Info</h3>
              <ul class="flex col gap-3 mb-6">
                <li class="flex justify-between text-sm">
                  <span class="text-secondary">Instructor:</span>
                  <span class="text-white font-medium">${course.instructor?.firstName} ${course.instructor?.lastName}</span>
                </li>
                <li class="flex justify-between text-sm">
                  <span class="text-secondary">Language:</span>
                  <span class="text-white font-medium">${course.language || 'English'}</span>
                </li>
                <li class="flex justify-between text-sm">
                  <span class="text-secondary">Enrolled:</span>
                  <span class="text-white font-medium">${course.enrollmentCount} students</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Video / Lesson Player Panel (if enrolled) -->
      ${isEnrolled ? `
        <section class="section section--alt border-bottom" id="lesson-player-section">
          <div class="container">
            <div class="section-header">
              <span class="eyebrow">Interactive Classroom</span>
              <h2 class="h2 text-white">Student Video Player</h2>
              <p class="body-sm text-secondary mt-2">Select a lesson from the syllabus below to load the video tutorial here.</p>
            </div>
            
            <div class="card border overflow-hidden bg-base" style="max-width: 900px; margin: 0 auto;">
              <div class="relative" style="aspect-ratio: 16/9; background: #000; display:flex; align-items:center; justify-content:center;">
                <video id="classroom-video" controls class="w-full h-full" style="display:none;"></video>
                <div id="classroom-placeholder" class="text-center p-8">
                  <span style="font-size: 60px;"><svg class="icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg></span>
                  <p class="body-base text-secondary mt-4">Select a lesson below to start learning.</p>
                </div>
              </div>
              <div class="p-6 flex justify-between items-center sm\:flex-col gap-4">
                <div>
                  <h4 class="h5 text-white" id="player-lesson-title">No Lesson Selected</h4>
                  <p class="body-xs text-secondary mt-1" id="player-lesson-desc">Click any lesson in the syllabus list below to play.</p>
                </div>
                <div>
                  <button id="mark-complete-btn" class="btn btn--outline btn--sm hidden">Mark as Completed</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ` : ''}

      <!-- Syllabus & Content -->
      <section class="section" id="syllabus">
        <div class="container grid grid-12 gap-12">
          <!-- Left side: Requirements & Goals -->
          <div class="col-span-4 md\:col-span-full">
            <div class="mb-8">
              <h3 class="h4 text-white mb-4">What You'll Learn</h3>
              <ul class="flex col gap-3">
                ${(course.whatYouLearn || []).map(item => `
                  <li class="flex items-start gap-3 text-sm text-secondary">
                    <span class="text-accent mt-0.5">✓</span>
                    <span>${item}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
            <div>
              <h3 class="h4 text-white mb-4">Requirements</h3>
              <ul class="flex col gap-3">
                ${(course.requirements || []).map(item => `
                  <li class="flex items-start gap-3 text-sm text-secondary">
                    <span class="text-accent mt-0.5">&bull;</span>
                    <span>${item}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>

          <!-- Right side: Syllabus Accordion -->
          <div class="col-span-8 md\:col-span-full">
            <h3 class="h4 text-white mb-6">Course Syllabus</h3>
            <div class="flex col gap-4">
              ${(course.lessons || []).map(lesson => {
                const isCompleted = completedLessons.includes(lesson._id);
                const canPreview = lesson.isFree || isEnrolled;
                return `
                  <div class="card p-6 border flex justify-between items-center gap-4 ${canPreview ? 'cursor-pointer hover\:scale' : ''}" 
                       ${canPreview ? `onclick="window.loadLessonVideo('${lesson._id}', '${encodeURIComponent(lesson.title)}', '${encodeURIComponent(lesson.description || '')}', '${lesson.videoUrl}')"` : ''}>
                    <div class="flex items-center gap-4">
                      <div style="font-size: 24px;">
                        ${isCompleted ? '<svg class="icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:8px;color:var(--violet);"><polyline points="20 6 9 17 4 12"/></svg>' : (canPreview ? '▶️' : '<svg class="icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:6px;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>')}
                      </div>
                      <div>
                        <h4 class="body-md text-white font-semibold">${lesson.order}. ${lesson.title}</h4>
                        <span class="body-xs text-tertiary">${lesson.section || 'Intro'} &bull; ${Math.round(lesson.videoDuration / 60)} mins</span>
                      </div>
                    </div>
                    <div>
                      ${lesson.isFree ? '<span class="badge badge--violet">Preview</span>' : ''}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </section>
    `;

    app.innerHTML = App.wrapWithLayout(html);
    App.initNavbarScroll();

    // Bind Player Loader globally so inline onclick handlers work
    window.loadLessonVideo = (lessonId, titleEncoded, descEncoded, videoUrl) => {
      const title = decodeURIComponent(titleEncoded);
      const desc = decodeURIComponent(descEncoded);

      const videoEl = document.getElementById('classroom-video');
      const placeholderEl = document.getElementById('classroom-placeholder');
      const playerTitle = document.getElementById('player-lesson-title');
      const playerDesc = document.getElementById('player-lesson-desc');
      const markBtn = document.getElementById('mark-complete-btn');

      if (!videoEl || !placeholderEl) return;

      placeholderEl.style.display = 'none';
      videoEl.style.display = 'block';
      videoEl.src = videoUrl;
      videoEl.play();

      playerTitle.textContent = title;
      playerDesc.textContent = desc;

      if (markBtn && isEnrolled) {
        markBtn.classList.remove('hidden');
        const completed = completedLessons.includes(lessonId);
        markBtn.textContent = completed ? '✓ Completed' : 'Mark as Completed';
        markBtn.disabled = completed;
        markBtn.onclick = async () => {
          try {
            await Api.patch(`/enrollments/${enrollmentId}/progress`, { lessonId });
            Helpers.toast('Lesson marked as completed!');
            completedLessons.push(lessonId);
            markBtn.textContent = '✓ Completed';
            markBtn.disabled = true;
            Router.navigate(`/courses/${params.slug}`); // Refresh page state
          } catch (err) {
            Helpers.toast('Failed to update progress.', 'error');
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
          enrollBtn.textContent = 'Enroll';
        }
      });
    }

  } catch (err) {
    console.error(err);
    app.innerHTML = App.wrapWithLayout(`
      <div class="container py-16 text-center">
        <h1 class="display-md text-gradient">Course Error</h1>
        <p class="body-base text-secondary mt-4">Failed to load course details. It may not exist or is unpublished.</p>
        <a href="/courses" class="btn btn--primary mt-8">Back to Courses</a>
      </div>
    `);
  }
});
