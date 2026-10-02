'use strict';

const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');

const nameHeading = document.querySelector('.name');
const nameCursor = document.querySelector('.cursor');
const fullName = nameHeading.textContent;
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let typingTimer;
let cursorTimer;

function finishTyping() {
  clearTimeout(typingTimer);
  clearTimeout(cursorTimer);
  nameHeading.textContent = fullName;
  nameHeading.dataset.typing = 'complete';
  nameCursor.classList.remove('is-typing');
}

function typeName() {
  clearTimeout(typingTimer);
  clearTimeout(cursorTimer);
  if (motionPreference.matches) {
    finishTyping();
    return;
  }

  nameHeading.textContent = '';
  nameHeading.dataset.typing = 'active';
  nameCursor.classList.add('is-typing');
  let letter = 0;

  function typeNextLetter() {
    letter += 1;
    nameHeading.textContent = fullName.slice(0, letter);
    if (letter < fullName.length) {
      typingTimer = setTimeout(typeNextLetter, fullName[letter] === ' ' ? 220 : 115);
    } else {
      nameHeading.dataset.typing = 'complete';
      cursorTimer = setTimeout(() => nameCursor.classList.remove('is-typing'), 1200);
    }
  }

  typingTimer = setTimeout(typeNextLetter, 350);
}

typeName();
motionPreference.addEventListener('change', () => {
  if (motionPreference.matches) finishTyping();
});
window.addEventListener('pageshow', event => {
  if (event.persisted) typeName();
});
window.addEventListener('beforeprint', finishTyping);

function updateThemeLabel() {
  const label = root.dataset.theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
  themeButton.setAttribute('aria-label', label);
  themeButton.setAttribute('title', label);
}

themeButton.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('haqq-theme', root.dataset.theme); } catch (_) { /* Theme remains usable when storage is unavailable. */ }
  updateThemeLabel();
});
updateThemeLabel();

const clock = document.getElementById('ghana-clock');
const timeFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Africa/Accra', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
});
const yearFormatter = new Intl.DateTimeFormat('en', { timeZone: 'Africa/Accra', year: 'numeric' });
function updateClock() {
  const now = new Date();
  clock.textContent = timeFormatter.format(now).toLowerCase() + ' gmt';
  clock.dateTime = now.toISOString();
  document.getElementById('year').textContent = yearFormatter.format(now);
}
updateClock();
setInterval(updateClock, 1000);

const details = {
  focus: {
    label: 'where i’m headed', title: 'cybersecurity & security operations',
    paragraphs: ['I’m pursuing a career in cybersecurity, with SOC Analyst as my intended entry role. My interests include network defense, incident response, and investigating suspicious activity.', 'I’m developing my networking, Linux, and security fundamentals. My programming background helps me understand how applications work and build tools for investigation and automation.'],
    stack: 'learning · networking / linux / security fundamentals',
    link: 'connect on linkedin', href: 'https://www.linkedin.com/in/just-haqq'
  },
  experience: {
    label: 'experience', title: 'learning through IT support',
    paragraphs: ['Corenet IT Limited · November–December 2025. Remote internship supporting system monitoring, technical notes, issue escalation, and troubleshooting follow-ups.', 'Bureau Veritas · September–November 2025. IT internship supporting system management, maintenance checks, software updates, and user support.', 'New Crystal Hospital Headquarters · September–December 2024. IT internship supporting hospital applications, monitoring, troubleshooting, and staff guidance.'],
    stack: 'system monitoring / troubleshooting / user support',
    link: 'connect on linkedin', href: 'https://www.linkedin.com/in/just-haqq'
  },
  cyber: {
    label: 'selected work · cybersecurity', title: 'Cyber-Helper 1.0',
    paragraphs: ['A phishing-awareness browser extension connected to a FastAPI service for URL classification during browsing.', 'I built the extension workflow, API connection, and URL evaluation logic, then used sample URLs for controlled testing. The project brought together browser APIs, Python, and an interest in helping users recognize suspicious links.'],
    stack: 'chrome manifest v3 / fastapi / python',
    link: 'browse my work on github', href: 'https://github.com/Just-haqq'
  },
  safemeds: {
    label: 'selected work · web application', title: 'SafeMeds',
    paragraphs: ['A medicine management web application with authentication, database-backed records, and protected user workflows.', 'I worked with Prisma and PostgreSQL to build the data models, and connected authenticated routes through NextAuth. The project gave me practical experience with access control and the way an application’s interface, authentication, and data fit together.'],
    stack: 'next.js / prisma / postgresql / nextauth',
    link: 'browse my work on github', href: 'https://github.com/Just-haqq'
  },
  rtc: {
    label: 'selected work · embedded systems', title: 'Real-Time Clock · Group 12',
    paragraphs: ['I led a nine-member team at KNUST building an ESP32 real-time clock with an I2C OLED display, alarm feedback, button controls, and a 3D-printed enclosure.', 'My role covered team coordination, module integration, documentation, testing, GitHub deliverables, and final presentation readiness. We completed the physical build and final integration.'],
    stack: 'esp32 / i2c oled / buzzer / buttons / 3d printing',
    link: 'browse my work on github', href: 'https://github.com/Just-haqq'
  }
};

const dialog = document.getElementById('detail-dialog');
let dialogOpener = null;
document.querySelectorAll('[data-detail]').forEach(button => {
  button.addEventListener('click', () => {
    const detail = details[button.dataset.detail];
    if (!detail) return;
    dialogOpener = button;
    document.getElementById('detail-label').textContent = detail.label;
    document.getElementById('detail-title').textContent = detail.title;
    const body = document.getElementById('detail-body');
    body.replaceChildren(...detail.paragraphs.map(text => {
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      return paragraph;
    }));
    document.getElementById('detail-stack').textContent = detail.stack;
    const link = document.getElementById('detail-link');
    link.textContent = detail.link;
    link.href = detail.href;
    dialog.showModal();
  });
});
document.getElementById('close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const box = dialog.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
});
dialog.addEventListener('close', () => { if (dialogOpener) dialogOpener.focus(); });
