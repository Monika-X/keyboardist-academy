/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Contact Page View
 *  frontend/pages/contact.js
 * ============================================================
 */

'use strict';

Router.register('/contact', async () => {
  const app = document.getElementById('app');
  if (!app) return;

  const html = `
    <section class="section section--glow">
      <div class="container grid grid-2 gap-16 items-center">
        <!-- Contact Info & Socials -->
        <div class="reveal">
          <span class="eyebrow">Get In Touch</span>
          <h1 class="display-md text-white mb-6" style="font-size: clamp(var(--text-xl), 5vw, var(--text-4xl));">Let's Connect</h1>
          <p class="body-md text-secondary mb-8">
            Have questions about our curriculums, pricing, or corporate packages? Send us a message and our support team will reply within 24 hours.
          </p>
          
          <div class="flex col gap-6 mt-8">
            <div class="flex items-center gap-4">
              <span class="flex items-center justify-center bg-violet-10 text-accent rounded-full" style="width: 48px; height: 48px; font-size: 20px;"><svg class="icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
              <div>
                <h4 class="body-sm text-white font-semibold">Location</h4>
                <p class="body-xs text-tertiary"><a href="https://maps.google.com/?q=Avadi,+Chennai,+Tamil+Nadu,+India" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none;" class="hover:text-white transition-colors">Avadi, Chennai, Tamil Nadu, India (Online & Offline Classes)</a></p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <span class="flex items-center justify-center bg-violet-10 text-accent rounded-full" style="width: 48px; height: 48px; font-size: 20px;"><svg class="icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>
              <div>
                <h4 class="body-sm text-white font-semibold">Phone Contact</h4>
                <p class="body-xs text-tertiary"><a href="tel:8220827783" style="color: inherit; text-decoration: none;">8220827783</a></p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <span class="flex items-center justify-center bg-violet-10 text-accent rounded-full" style="width: 48px; height: 48px; font-size: 20px;"><svg class="icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" /><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" /></svg></span>
              <div>
                <h4 class="body-sm text-white font-semibold">WhatsApp Inquiry</h4>
                <p class="body-xs text-tertiary"><a href="https://wa.me/918220827783" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none;">8220827783 (Chat Now)</a></p>
              </div>
            </div>
          </div>

          <!-- Social Media Links -->
          <div class="mt-12">
            <h4 class="label text-white mb-4">Follow Our Channels</h4>
            <div class="flex gap-4">
              <a href="https://www.youtube.com/@agilanmusiq" target="_blank" rel="noopener noreferrer" aria-label="YouTube" class="social-icon flex items-center justify-center bg-glass border hover\:border-violet rounded-full" style="width: 44px; height: 44px; font-size: 20px; transition: all 0.3s;"><svg class="icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg></a>
              <a href="https://www.instagram.com/agil_an__/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="social-icon flex items-center justify-center bg-glass border hover\:border-violet rounded-full" style="width: 44px; height: 44px; font-size: 20px; transition: all 0.3s;"><svg class="icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="reveal">
          <div class="card p-8 border bg-glass">
            <h3 class="h4 text-white mb-6">Send Message</h3>
            
            <form id="contact-form" class="form flex col gap-6">
              <div class="form-group">
                <label for="contact-name" class="form-label label">Your Name</label>
                <input type="text" id="contact-name" required class="form-input" placeholder="Your Name" />
              </div>

              <div class="form-group">
                <label for="contact-email" class="form-label label">Email Address</label>
                <input type="email" id="contact-email" required class="form-input" placeholder="you@email.com" />
              </div>

              <div class="form-group">
                <label for="contact-subject" class="form-label label">Subject</label>
                <input type="text" id="contact-subject" required class="form-input" placeholder="Syllabus Question" />
              </div>

              <div class="form-group">
                <label for="contact-message" class="form-label label">Message</label>
                <textarea id="contact-message" required class="form-input" rows="4" placeholder="How can we help you?"></textarea>
              </div>

              <button type="submit" class="btn btn--primary w-full mt-4">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Embedded Google Map -->
    <section class="section section--alt border-top border-bottom p-0" style="overflow: hidden;">
      <div class="w-full" style="line-height: 0;">
        <iframe 
          src="https://maps.google.com/maps?q=Avadi,%20Chennai,%20Tamil%20Nadu,%20India&t=&z=14&ie=UTF8&iwloc=&output=embed" 
          width="100%" 
          height="450" 
          style="border:0; filter: grayscale(1) invert(0.9) contrast(1.2); display: block;" 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </section>
  `;

  app.innerHTML = App.wrapWithLayout(html);
  App.initNavbarScroll();
  App.highlightActiveLink('/contact');
  Helpers.initReveal();

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const subject = document.getElementById('contact-subject').value;
      const message = document.getElementById('contact-message').value;

      try {
        const btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.textContent = 'Sending...';

        await Api.post('/contact', { name, email, subject, message });
        Helpers.toast('Inquiry submitted successfully! We will contact you soon.');
        form.reset();
      } catch (err) {
        console.error(err);
        Helpers.toast(err.message || 'Failed to submit inquiry. Please try again.', 'error');
      } finally {
        const btn = form.querySelector('button[type="submit"]');
        if (btn) {
          btn.disabled = false;
          btn.textContent = 'Send Message';
        }
      }
    });
  }
});
