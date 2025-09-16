const screens = document.querySelectorAll('.screen');
const navButtons = document.querySelectorAll('.tabbar__item');

navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.target;
    screens.forEach((screen) => {
      const isActive = screen.dataset.screen === target;
      screen.classList.toggle('screen--active', isActive);
    });
    navButtons.forEach((other) => {
      const isCurrent = other === button;
      other.classList.toggle('tabbar__item--active', isCurrent);
      other.setAttribute('aria-current', isCurrent ? 'page' : 'false');
    });
  });
});

navButtons.forEach((button) => {
  const isActive = button.classList.contains('tabbar__item--active');
  button.setAttribute('aria-current', isActive ? 'page' : 'false');
});

const accentConfig = {
  roxo: {
    color: '#6c63ff',
    gradient: 'linear-gradient(135deg, #6c63ff, #4b5dff)',
    contrast: '#f8fafc',
    glass: 'rgba(108, 99, 255, 0.12)',
    glassStrong: 'rgba(108, 99, 255, 0.2)',
    border: 'rgba(108, 99, 255, 0.35)',
    shadow: 'rgba(108, 99, 255, 0.28)'
  },
  amarelo: {
    color: '#f7c948',
    gradient: 'linear-gradient(135deg, #f7c948, #ffb951)',
    contrast: '#0f172a',
    glass: 'rgba(247, 201, 72, 0.2)',
    glassStrong: 'rgba(247, 201, 72, 0.28)',
    border: 'rgba(247, 201, 72, 0.45)',
    shadow: 'rgba(247, 201, 72, 0.25)'
  },
  laranja: {
    color: '#ff8852',
    gradient: 'linear-gradient(135deg, #ff8852, #ffb347)',
    contrast: '#0f172a',
    glass: 'rgba(255, 136, 82, 0.18)',
    glassStrong: 'rgba(255, 136, 82, 0.26)',
    border: 'rgba(255, 136, 82, 0.4)',
    shadow: 'rgba(255, 136, 82, 0.22)'
  },
  azul: {
    color: '#1fb6ff',
    gradient: 'linear-gradient(135deg, #1fb6ff, #4d9dff)',
    contrast: '#04101e',
    glass: 'rgba(31, 182, 255, 0.16)',
    glassStrong: 'rgba(31, 182, 255, 0.24)',
    border: 'rgba(31, 182, 255, 0.4)',
    shadow: 'rgba(31, 182, 255, 0.24)'
  }
};

const accentButtons = document.querySelectorAll('.accent-picker__option');
const root = document.documentElement;
let currentAccent = 'roxo';

function applyAccent(accentKey) {
  const settings = accentConfig[accentKey];
  if (!settings) return;
  currentAccent = accentKey;
  root.style.setProperty('--accent-color', settings.color);
  root.style.setProperty('--accent-gradient', settings.gradient);
  root.style.setProperty('--accent-contrast', settings.contrast);
  root.style.setProperty('--accent-glass', settings.glass);
  root.style.setProperty('--accent-glass-strong', settings.glassStrong);
  root.style.setProperty('--accent-border', settings.border);
  root.style.setProperty('--accent-shadow', settings.shadow);
  accentButtons.forEach((option) => {
    const isActive = option.dataset.accent === accentKey;
    option.classList.toggle('is-active', isActive);
    option.setAttribute('aria-pressed', String(isActive));
  });
}

accentButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const accent = button.dataset.accent;
    if (accent) {
      applyAccent(accent);
    }
  });
});

applyAccent(currentAccent);

const displayNameInput = document.getElementById('displayName');
const usernameInput = document.getElementById('username');
const bioInput = document.getElementById('bio');
const profileName = document.getElementById('profileName');
const profileUsername = document.getElementById('profileUsername');
const profileBio = document.getElementById('profileBio');
const profileAvatar = document.getElementById('profileAvatar');
const composerAvatar = document.querySelector('.composer__avatar');

function getInitials(name) {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (!parts.length) return 'MM';
  const first = parts[0][0] || '';
  const second = parts[1] ? parts[1][0] : '';
  return `${first}${second}`.toUpperCase();
}

function escapeHTML(value) {
  const wrapper = document.createElement('div');
  wrapper.textContent = value;
  return wrapper.innerHTML;
}

if (displayNameInput) {
  displayNameInput.addEventListener('input', () => {
    const value = displayNameInput.value.trim();
    profileName.textContent = value || 'Seu nome';
    const initials = getInitials(value || 'Macho Muscle');
    profileAvatar.textContent = initials;
    if (composerAvatar) {
      composerAvatar.textContent = initials;
    }
  });
}

if (usernameInput) {
  usernameInput.addEventListener('input', () => {
    const sanitized = usernameInput.value
      .toLowerCase()
      .replace(/[^a-z0-9._-]+/g, '');
    if (usernameInput.value !== sanitized) {
      usernameInput.value = sanitized;
    }
    profileUsername.textContent = sanitized ? `@${sanitized}` : '@seunome';
  });
}

if (bioInput) {
  bioInput.addEventListener('input', () => {
    const value = bioInput.value.trim();
    profileBio.textContent = value || 'Compartilhe sua energia com a tribo.';
  });
}

const tagButtons = document.querySelectorAll('.chip-toggle');
tagButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const isActive = button.classList.toggle('is-active');
    button.setAttribute('aria-pressed', String(isActive));
  });
});

const communityComposer = document.getElementById('communityComposer');
const communityFeed = document.getElementById('communityFeed');

const likeIcon =
  '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.13 2.44h.74C13.09 5.01 14.76 4 16.5 4 19 4 21 6 21 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>';
const commentIcon =
  '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H8l-4 4V6a2 2 0 012-2zm2 4v9.17L7.17 16H20V8H6z"></path></svg>';
const shareIcon =
  '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7a3.07 3.07 0 000-1.41l7-3.35a3 3 0 10-.91-1.81l-7 3.35a3 3 0 10.02 4.6l7.11 3.55a3 3 0 102.87-1.55z"></path></svg>';

function createPost({ author, message, tags }) {
  const article = document.createElement('article');
  article.className = 'post card';
  const safeAuthor = escapeHTML(author);
  const safeMessage = escapeHTML(message);
  const initials = getInitials(author);
  const tagMarkup =
    tags.length > 0
      ? `<div class="post__tags">${tags
          .map((tag) => `<span class="chip">${escapeHTML(tag)}</span>`)
          .join('')}</div>`
      : '';
  const primaryTag = tags[0] ? `${escapeHTML(tags[0])}` : 'Treino livre';
  article.innerHTML = `
    <div class="post__avatar" aria-hidden="true">${initials}</div>
    <div class="post__content">
      <header class="post__header">
        <div>
          <h3>${safeAuthor}</h3>
          <span class="post__meta">agora mesmo · ${primaryTag}</span>
        </div>
      </header>
      <p>${safeMessage}</p>
      ${tagMarkup}
      <footer class="post__footer">
        <button class="post-action" type="button">${likeIcon}<span>0</span></button>
        <button class="post-action" type="button">${commentIcon}<span>0</span></button>
        <button class="post-action" type="button">${shareIcon}<span>0</span></button>
      </footer>
    </div>`;
  return article;
}

if (communityComposer && communityFeed) {
  communityComposer.addEventListener('submit', (event) => {
    event.preventDefault();
    const messageField = communityComposer.querySelector('textarea');
    if (!messageField) return;
    const message = messageField.value.trim();
    if (!message) return;
    const selectedTags = Array.from(
      communityComposer.querySelectorAll('.chip-toggle.is-active')
    ).map((button) => button.dataset.tag || '');

    const authorName = displayNameInput && displayNameInput.value.trim() ? displayNameInput.value.trim() : 'Você';
    const post = createPost({ author: authorName, message, tags: selectedTags });
    communityFeed.prepend(post);

    messageField.value = '';
    communityComposer
      .querySelectorAll('.chip-toggle.is-active')
      .forEach((button) => {
        button.classList.remove('is-active');
        button.setAttribute('aria-pressed', 'false');
      });
  });
}

const highlightForm = document.getElementById('highlightForm');
const highlightInput = document.getElementById('highlightInput');
const highlightList = document.getElementById('profileHighlights');

if (highlightForm && highlightInput && highlightList) {
  highlightForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = highlightInput.value.trim();
    if (!value) return;
    const now = new Date();
    const timeLabel = new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(now);
    const item = document.createElement('li');
    item.className = 'profile-feed__item card';
    item.innerHTML = `
      <span class="profile-feed__date">Agora mesmo · ${timeLabel}</span>
      <p>${escapeHTML(value)}</p>`;
    highlightList.prepend(item);
    highlightInput.value = '';
  });
}
