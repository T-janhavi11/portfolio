/**
 * Janhavi Talhar — Portfolio Script
 * AI / Audio ML / Cyberpunk Theme
 */

document.addEventListener('DOMContentLoaded', () => {
    initMatrixRain();
    populatePortfolio();
    initNavigation();
    initScrollAnimations();
    initCounters();

    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* Local file helper: keeps docs in same folder as data.js/script.js */
function filePath(path) {
    if (!path) return '#';
    return path
        .replace('assets/docs/', '')
        .replace('assets/images/', '')
        .replace('portfolio/', '');
}

/* ══════════════════════════════════════
   MATRIX RAIN CANVAS
══════════════════════════════════════ */
function initMatrixRain() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();

    const chars = 'JANHAVI0110AIML_AUDIO_SIGNAL_PORSCHE_RWTH_PYTHON_TENSORFLOW_PYTORCH_AZURE'.split('');
    const fontSize = 13;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = Array(columns).fill(1);

    function drawMatrix() {
        ctx.fillStyle = 'rgba(2, 4, 8, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00ff88';
        ctx.font = fontSize + 'px Share Tech Mono, monospace';

        drops.forEach((y, i) => {
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(char, i * fontSize, y * fontSize);
            if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        });
    }

    setInterval(drawMatrix, 45);

    window.addEventListener('resize', () => {
        resizeCanvas();
        columns = Math.floor(canvas.width / fontSize);
        drops = Array(columns).fill(1);
    });
}

/* ══════════════════════════════════════
   POPULATE PORTFOLIO FROM DATA.JS
══════════════════════════════════════ */
function populatePortfolio() {
    const d = portfolioData;

    const contactEl = document.getElementById('contact-info');
    if (contactEl) {
        contactEl.innerHTML = `
            <span class="hero-badge"><i class="fas fa-map-marker-alt"></i> ${d.personal.location}</span>
            <a href="mailto:${d.personal.email}" class="hero-badge"><i class="fas fa-envelope"></i> ${d.personal.email}</a>
            <a href="tel:${d.personal.phone.replace(/[^0-9+]/g, '')}" class="hero-badge"><i class="fas fa-phone"></i> ${d.personal.phone}</a>
            <a href="${d.personal.linkedin}" target="_blank" rel="noopener" class="hero-badge"><i class="fab fa-linkedin"></i> LinkedIn</a>
        `;
    }

    const summaryEl = document.getElementById('summary-content');
    if (summaryEl) {
        summaryEl.innerHTML = d.summary.replace(
            /(Python|SQL|AzureML|Azure|AWS|Databricks|Docker|PyTorch|TensorFlow|Keras|CNN|RNN|PINNs|Audio ML|Signal Processing|Machine Learning|Real-Time ML|Porsche|RWTH Aachen|NLP|LLM|RAG|Transformers)/g,
            '<strong>$1</strong>'
        );
    }

    const highlightsEl = document.getElementById('highlights-container');
    if (highlightsEl && d.highlights) {
        highlightsEl.innerHTML = d.highlights.map(h => `
            <div class="terminal-card highlight-card reveal">
                <i class="fas fa-bolt"></i>
                <span>${h}</span>
            </div>
        `).join('');
    }

    const skillsEl = document.getElementById('skills-container');
    if (skillsEl) {
        skillsEl.innerHTML = '';
        Object.entries(d.skills).forEach(([category, items]) => {
            const card = document.createElement('div');
            card.className = 'terminal-card skill-category reveal';
            card.innerHTML = `
                <div class="card-header-bar">
                    <span class="dot dot-r"></span><span class="dot dot-y"></span><span class="dot dot-g"></span>
                    <span class="card-filename">${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.js</span>
                </div>
                <div class="skill-category-title">${category}</div>
                <div class="skill-pills">
                    ${items.map(item => `<span class="skill-pill">${item}</span>`).join('')}
                </div>
            `;
            skillsEl.appendChild(card);
        });
    }

    const expEl = document.getElementById('experience-container');
    if (expEl) {
        expEl.innerHTML = '';
        d.experience.forEach(job => {
            const certsHTML = job.certificates?.length
                ? `<div class="cert-section">
                    <span class="cert-label"><i class="fas fa-certificate"></i> Documents</span>
                    <div class="cert-links">
                        ${job.certificates.map(c => `
                            <a href="${filePath(c.file)}" target="_blank" rel="noopener" class="cert-btn">
                                <i class="fas fa-file-pdf"></i> ${c.name}
                            </a>`).join('')}
                    </div>
                   </div>`
                : '';

            const item = document.createElement('div');
            item.className = 'timeline-item terminal-card reveal';
            item.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-header">
                    <div class="timeline-title">${job.title}</div>
                    <div class="timeline-company">${job.company} &nbsp;·&nbsp; ${job.location}</div>
                </div>
                <div class="timeline-meta">
                    <span><i class="fas fa-calendar-alt"></i> ${job.period}</span>
                </div>
                <ul class="timeline-responsibilities">
                    ${job.responsibilities.map(r => `<li>${r}</li>`).join('')}
                </ul>
                ${certsHTML}
            `;
            expEl.appendChild(item);
        });
    }

    const projEl = document.getElementById('projects-container');
    if (projEl) {
        projEl.innerHTML = '';
        d.projects.forEach((proj, i) => {
            const docHTML = proj.document
                ? `<a href="${filePath(proj.document)}" target="_blank" rel="noopener" class="cert-btn project-doc-btn">
                    <i class="fas fa-file-pdf"></i> View Project Document
                   </a>`
                : '';

            const imageHTML = proj.image
                ? `<div class="project-image-wrap">
                    <img src="${filePath(proj.image)}" alt="${proj.title}" class="project-image" onerror="this.parentElement.style.display='none'">
                   </div>`
                : '';

            const card = document.createElement('div');
            card.className = 'project-card terminal-card reveal';
            card.innerHTML = `
                <div class="card-header-bar">
                    <span class="dot dot-r"></span><span class="dot dot-y"></span><span class="dot dot-g"></span>
                    <span class="card-filename">project_${String(i + 1).padStart(2, '0')}.py</span>
                </div>
                ${imageHTML}
                <div class="project-index">${String(i + 1).padStart(2, '0')}</div>
                <h4 class="project-title">${proj.title}</h4>
                <div class="project-tech-tags">
                    ${proj.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                </div>
                <ul class="project-details">
                    ${proj.details.map(det => `<li>${det}</li>`).join('')}
                </ul>
                ${docHTML}
            `;
            projEl.appendChild(card);
        });
    }

    const eduEl = document.getElementById('education-container');
    if (eduEl) {
        eduEl.innerHTML = '';
        d.education.forEach(edu => {
            const certHTML = edu.certificate
                ? `<a href="${filePath(edu.certificate)}" target="_blank" rel="noopener" class="cert-btn" style="margin-top:0.75rem;display:inline-flex;">
                       <i class="fas fa-file-pdf"></i> View Transcript / Certificate
                   </a>`
                : '';

            const item = document.createElement('div');
            item.className = 'edu-item reveal';
            item.innerHTML = `
                <div class="edu-degree">${edu.degree}</div>
                <div class="edu-inst">${edu.institution}</div>
                <div class="edu-details mt-2">${edu.period} &nbsp;|&nbsp; ${edu.details}</div>
                ${certHTML}
            `;
            eduEl.appendChild(item);
        });
    }

    const pubEl = document.getElementById('publications-container');
    if (pubEl && d.publications) {
        pubEl.innerHTML = '';
        d.publications.forEach(pub => {
            const docHTML = pub.document
                ? `<a href="${filePath(pub.document)}" target="_blank" rel="noopener" class="cert-btn">
                    <i class="fas fa-file-pdf"></i> PDF
                   </a>`
                : '';

            const linkHTML = pub.link
                ? `<a href="${pub.link}" target="_blank" rel="noopener" class="cert-btn">
                    <i class="fas fa-external-link-alt"></i> Publication
                   </a>`
                : '';

            const card = document.createElement('div');
            card.className = 'terminal-card publication-card reveal';
            card.innerHTML = `
                <h4 class="project-title">${pub.title}</h4>
                <div class="timeline-company">${pub.venue}</div>
                <p class="ach-desc">${pub.description}</p>
                <div class="cert-links">${linkHTML}${docHTML}</div>
            `;
            pubEl.appendChild(card);
        });
    }

    const certEl = document.getElementById('certifications-container');
    if (certEl && d.certifications) {
        certEl.innerHTML = '';
        d.certifications.forEach(cert => {
            const fileHTML = cert.file
                ? `<a href="${filePath(cert.file)}" target="_blank" rel="noopener" class="cert-btn">
                    <i class="fas fa-file-pdf"></i> View Certificate
                   </a>`
                : '';

            const card = document.createElement('div');
            card.className = 'terminal-card certification-card reveal';
            card.innerHTML = `
                <div class="skill-category-title">${cert.name}</div>
                <div class="timeline-company">${cert.issuer}</div>
                <p class="ach-desc">
                    ${cert.date || ''}
                    ${cert.score ? ` · Score: ${cert.score}` : ''}
                    ${cert.verify ? ` · Verify: ${cert.verify}` : ''}
                    ${cert.achievement ? ` · ${cert.achievement}` : ''}
                </p>
                ${fileHTML}
            `;
            certEl.appendChild(card);
        });
    }

    const achEl = document.getElementById('achievements-container');
    if (achEl) {
        achEl.innerHTML = '';

        if (d.achievements) {
            d.achievements.forEach(ach => {
                ach.items.forEach(item => renderAchievementCard(achEl, item));
            });
        }

        if (d.leadershipAndActivities) {
            d.leadershipAndActivities.forEach(item => {
                renderAchievementCard(achEl, {
                    title: `${item.title} — ${item.organization}`,
                    description: `${item.period}. ${item.description}`,
                    image: item.image,
                    link: item.document ? filePath(item.document) : null,
                    linkLabel: 'View Document'
                });
            });
        }
    }

    const langEl = document.getElementById('languages-container');
    if (langEl && d.languages) {
        langEl.innerHTML = d.languages.map(l => `
            <span class="skill-pill language-pill">${l.language}: ${l.level}</span>
        `).join('');
    }

    const ctaEl = document.getElementById('contact-cta');
    if (ctaEl) {
        ctaEl.innerHTML = `
            <a href="mailto:${d.personal.email}" class="btn btn-primary" id="cta-email"><i class="fas fa-envelope"></i> Send Email</a>
            <a href="${d.personal.linkedin}" target="_blank" rel="noopener" class="btn btn-secondary" id="cta-linkedin"><i class="fab fa-linkedin"></i> LinkedIn</a>
        `;
    }

    const footerLinks = document.getElementById('footer-links');
    if (footerLinks) {
        footerLinks.innerHTML = `
            <a href="mailto:${d.personal.email}" id="footer-email">Email</a>
            <a href="${d.personal.linkedin}" target="_blank" id="footer-linkedin">LinkedIn</a>
            <a href="#hero" id="footer-top">Back to Top</a>
        `;
    }
}

function renderAchievementCard(container, item) {
    const imageHTML = item.image
        ? `<div class="ach-image-wrap">
               <img src="${filePath(item.image)}" alt="${item.title}" class="ach-image" onerror="this.parentElement.style.display='none'">
           </div>`
        : '';

    const linkHTML = item.link
        ? `<a href="${item.link}" target="_blank" rel="noopener" class="ach-link-btn">
               <i class="fas fa-external-link-alt"></i> ${item.linkLabel || 'View'}
           </a>`
        : '';

    const card = document.createElement('div');
    card.className = 'achievement-card reveal';
    card.innerHTML = `
        ${imageHTML}
        <div class="ach-content">
            <div class="ach-title"><i class="fas fa-trophy"></i> ${item.title}</div>
            <p class="ach-desc">${item.description}</p>
            ${linkHTML}
        </div>
    `;
    container.appendChild(card);
}

/* ══════════════════════════════════════
   NAVIGATION
══════════════════════════════════════ */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileBtn = document.getElementById('mobile-btn');
    const navLinks = document.querySelector('.nav-links');

    if (!navbar || !mobileBtn || !navLinks) return;

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    mobileBtn.addEventListener('click', () => {
        const open = navLinks.style.display === 'flex';
        navLinks.style.display = open ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.right = '0';
        navLinks.style.background = 'rgba(2, 4, 8, 0.97)';
        navLinks.style.backdropFilter = 'blur(12px)';
        navLinks.style.padding = '1rem 2rem';
        navLinks.style.border = '1px solid var(--border-glow)';
        navLinks.style.minWidth = '220px';
        mobileBtn.innerHTML = open ? '<i class="fas fa-bars"></i>' : '<i class="fas fa-times"></i>';
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
                mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });

    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 120;
        sections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');
            const link = navLinks.querySelector(`a[href="#${id}"]`);
            if (link) {
                link.style.color = scrollY >= top && scrollY < top + height
                    ? 'var(--neon-green)'
                    : '';
            }
        });
    }, { passive: true });
}

/* ══════════════════════════════════════
   SCROLL REVEAL ANIMATIONS
══════════════════════════════════════ */
function initScrollAnimations() {
    const allReveal = () => document.querySelectorAll('.reveal, .reveal-stagger');

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    allReveal().forEach(el => observer.observe(el));

    const mutationObs = new MutationObserver(() => {
        allReveal().forEach(el => {
            if (!el.classList.contains('active')) observer.observe(el);
        });
    });

    mutationObs.observe(document.body, { childList: true, subtree: true });
}

/* ══════════════════════════════════════
   COUNTER ANIMATIONS
══════════════════════════════════════ */
function initCounters() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');

    const counterObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-target'), 10);
            animateCounter(el, target);
            obs.unobserve(el);
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));
}

function animateCounter(el, target) {
    const duration = 1800;
    const startTime = performance.now();
    const isLarge = target > 10000;

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);

        el.textContent = isLarge ? current.toLocaleString() : current;

        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = isLarge ? target.toLocaleString() : target;
    }

    requestAnimationFrame(update);
}