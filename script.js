const appRoot = document.querySelector('.app');
const screens = document.querySelectorAll('.screen');
const navButtons = document.querySelectorAll('.tabbar__item');
const subpages = document.querySelectorAll('[data-subpage]');
const subpageOpeners = document.querySelectorAll('[data-open-subpage]');
const subpageClosers = document.querySelectorAll('[data-close-subpage]');

let activeSubpage = null;
let lastSubpageTrigger = null;
const subpageOpenCallbacks = new Map();

function registerSubpageCallback(id, callback) {
  if (!id || typeof callback !== 'function') return;
  subpageOpenCallbacks.set(id, callback);
}

function closeSubpage({ restoreFocus = true } = {}) {
  if (!activeSubpage) return;
  activeSubpage.classList.remove('subpage--active');
  activeSubpage.setAttribute('aria-hidden', 'true');
  activeSubpage = null;
  if (appRoot) {
    appRoot.classList.remove('has-subpage');
  }
  if (restoreFocus && lastSubpageTrigger instanceof HTMLElement) {
    lastSubpageTrigger.focus();
  }
  lastSubpageTrigger = null;
}

function openSubpage(id, trigger) {
  const page = Array.from(subpages).find((section) => section.dataset.subpage === id);
  if (!page) return;
  if (activeSubpage) {
    activeSubpage.classList.remove('subpage--active');
    activeSubpage.setAttribute('aria-hidden', 'true');
  }
  activeSubpage = page;
  lastSubpageTrigger = trigger || null;
  if (appRoot) {
    appRoot.classList.add('has-subpage');
  }
  page.classList.add('subpage--active');
  page.setAttribute('aria-hidden', 'false');
  page.scrollTop = 0;
  const callback = subpageOpenCallbacks.get(id);
  if (typeof callback === 'function') {
    callback();
  }
  const focusTarget =
    page.querySelector('[data-autofocus]') ||
    page.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (focusTarget instanceof HTMLElement) {
    focusTarget.focus();
  }
}

subpages.forEach((page) => {
  page.setAttribute('aria-hidden', page.classList.contains('subpage--active') ? 'false' : 'true');
});

subpageOpeners.forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.openSubpage;
    if (target) {
      openSubpage(target, button);
    }
  });
});

subpageClosers.forEach((button) => {
  button.addEventListener('click', () => {
    closeSubpage();
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeSubpage();
  }
});

navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    closeSubpage({ restoreFocus: false });
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
const rewardButtons = document.querySelectorAll('[data-reward]');
const badgeTokens = document.querySelectorAll('[data-badge-key]');
const badgeSelectButtons = document.querySelectorAll('[data-badge-select]');
const badgeSelectionMessage = document.getElementById('badgeSelectionMessage');
const questButtons = document.querySelectorAll('[data-track-quest]');
const questMessage = document.getElementById('questSelectionMessage');
const trendFilterForm = document.getElementById('trendFilterForm');
const trendFilterSummary = document.getElementById('trendFilterSummary');
const filterTriggerLabel = document.querySelector('[data-filter-label]');
const customWorkoutForm = document.getElementById('customWorkoutForm');
const customWorkoutSummary = document.getElementById('customWorkoutSummary');
const customWorkoutIntensityValue = document.getElementById('customIntensityValue');
const customWorkoutIntensityLabel = document.getElementById('customWorkoutIntensityLabel');
const customWorkoutSteps = document.getElementById('customWorkoutSteps');
const squadChatForm = document.getElementById('squadChatForm');
const squadChatInput = document.getElementById('squadChatMessage');
const squadChatLog = document.getElementById('squadChatLog');

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

const pinnedBadges = new Set(
  Array.from(badgeTokens)
    .filter((token) => token.classList.contains('is-highlighted'))
    .map((token) => token.dataset.badgeKey || '')
    .filter(Boolean)
);
let badgeMessageTimeout = null;

const trackedQuests = new Set(
  Array.from(questButtons)
    .filter((button) => button.classList.contains('is-active'))
    .map((button) => button.dataset.trackQuest || '')
    .filter(Boolean)
);

let activeTrendFilters = new Set();

const communityComposer = document.getElementById('communityComposer');
const communityFeed = document.getElementById('communityFeed');

function updateTrendFilterUI() {
  if (filterTriggerLabel) {
    const count = activeTrendFilters.size;
    filterTriggerLabel.textContent = count ? `Trends (${count})` : 'Filtrar trends';
  }
  if (trendFilterSummary) {
    const visibleCount = communityFeed
      ? Array.from(communityFeed.querySelectorAll('.post')).filter((post) => !post.classList.contains('is-hidden')).length
      : 0;
    if (!activeTrendFilters.size) {
      trendFilterSummary.textContent = 'Todos os posts visíveis.';
    } else if (visibleCount === 0) {
      trendFilterSummary.textContent = `Nenhum post corresponde a ${Array.from(activeTrendFilters).join(', ')} ainda.`;
    } else {
      trendFilterSummary.textContent = `Filtrando por ${Array.from(activeTrendFilters).join(', ')} · ${visibleCount} posts.`;
    }
  }
}

function applyFeedFilters() {
  if (!communityFeed) return;
  const posts = communityFeed.querySelectorAll('.post');
  posts.forEach((post) => {
    const tags = (post.dataset.tags || '')
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
    const isVisible = activeTrendFilters.size === 0 || tags.some((tag) => activeTrendFilters.has(tag));
    post.classList.toggle('is-hidden', !isVisible);
    post.setAttribute('aria-hidden', isVisible ? 'false' : 'true');
  });
  updateTrendFilterUI();
}

const likeIcon =
  '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.13 2.44h.74C13.09 5.01 14.76 4 16.5 4 19 4 21 6 21 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>';
const commentIcon =
  '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H8l-4 4V6a2 2 0 012-2zm2 4v9.17L7.17 16H20V8H6z"></path></svg>';
const shareIcon =
  '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7a3.07 3.07 0 000-1.41l7-3.35a3 3 0 10-.91-1.81l-7 3.35a3 3 0 10.02 4.6l7.11 3.55a3 3 0 102.87-1.55z"></path></svg>';

function createPost({ author, message, tags }) {
  const article = document.createElement('article');
  article.className = 'post card';
  const normalizedTags = Array.isArray(tags)
    ? tags.map((tag) => tag.trim()).filter(Boolean)
    : [];
  const safeAuthor = escapeHTML(author);
  const safeMessage = escapeHTML(message);
  const initials = getInitials(author);
  const tagMarkup =
    normalizedTags.length > 0
      ? `<div class="post__tags">${normalizedTags
          .map((tag) => `<span class="chip">${escapeHTML(tag)}</span>`)
          .join('')}</div>`
      : '';
  const primaryTag = normalizedTags[0] ? `${escapeHTML(normalizedTags[0])}` : 'Treino livre';
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
  article.dataset.tags = normalizedTags.join(',');
  article.setAttribute('aria-hidden', 'false');
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
    applyFeedFilters();

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


function updateBadgeSelections(feedback) {
  badgeTokens.forEach((token) => {
    const key = token.dataset.badgeKey || '';
    if (!key) return;
    const isSelected = pinnedBadges.has(key);
    token.classList.toggle('is-highlighted', isSelected);
  });

  badgeSelectButtons.forEach((button) => {
    const key = button.dataset.badgeSelect || '';
    const isLocked = button.dataset.badgeLocked === 'true';
    if (isLocked) {
      button.setAttribute('aria-disabled', 'true');
      button.setAttribute('aria-pressed', 'false');
      button.classList.remove('is-active');
      return;
    }
    const isSelected = pinnedBadges.has(key);
    button.classList.toggle('is-active', isSelected);
    button.setAttribute('aria-pressed', String(isSelected));
  });

  if (badgeSelectionMessage) {
    if (feedback) {
      badgeSelectionMessage.textContent = feedback;
      if (badgeMessageTimeout) {
        clearTimeout(badgeMessageTimeout);
      }
      badgeMessageTimeout = setTimeout(() => {
        badgeMessageTimeout = null;
        updateBadgeSelections();
      }, 2600);
    } else {
      if (badgeMessageTimeout) {
        clearTimeout(badgeMessageTimeout);
        badgeMessageTimeout = null;
      }
      if (pinnedBadges.size) {
        const labels = Array.from(badgeSelectButtons)
          .filter((button) => pinnedBadges.has(button.dataset.badgeSelect || ''))
          .map((button) => button.dataset.badgeLabel || button.textContent.trim())
          .filter(Boolean);
        badgeSelectionMessage.textContent = `Destaques ativos: ${labels.join(', ')}.`;
      } else {
        badgeSelectionMessage.textContent = 'Selecione até 3 badges para destacar.';
      }
    }
  }
}

badgeSelectButtons.forEach((button) => {
  const key = button.dataset.badgeSelect || '';
  const isLocked = button.dataset.badgeLocked === 'true';
  if (isLocked) {
    button.setAttribute('aria-disabled', 'true');
    button.setAttribute('aria-pressed', 'false');
    return;
  }
  button.addEventListener('click', () => {
    if (!key) return;
    if (pinnedBadges.has(key)) {
      pinnedBadges.delete(key);
      updateBadgeSelections();
      return;
    }
    if (pinnedBadges.size >= 3) {
      updateBadgeSelections('Limite de 3 badges. Desmarque uma para adicionar outra.');
      return;
    }
    pinnedBadges.add(key);
    updateBadgeSelections();
  });
});

rewardButtons.forEach((button) => {
  const card = button.closest('[data-reward-card]');
  button.setAttribute(
    'aria-pressed',
    card && card.classList.contains('is-claimed') ? 'true' : 'false'
  );
  button.addEventListener('click', () => {
    const rewardCard = button.closest('[data-reward-card]');
    if (!rewardCard) return;
    const originalLabel = button.dataset.originalLabel || button.textContent.trim();
    button.dataset.originalLabel = originalLabel;
    const willClaim = !rewardCard.classList.contains('is-claimed');
    rewardCard.classList.toggle('is-claimed', willClaim);
    if (willClaim) {
      const lower = originalLabel.toLowerCase();
      const claimedLabel = lower.includes('reservar')
        ? 'Reservado'
        : lower.includes('desbloquear')
        ? 'Desbloqueado'
        : 'Resgatado';
      button.textContent = claimedLabel;
      button.setAttribute('aria-pressed', 'true');
    } else {
      button.textContent = originalLabel;
      button.setAttribute('aria-pressed', 'false');
    }
  });
});

function updateQuestMessage() {
  if (!questMessage) return;
  if (!trackedQuests.size) {
    questMessage.textContent = 'Selecione missões para acompanhar no topo do quadro.';
    return;
  }
  const labels = Array.from(questButtons)
    .filter((button) => trackedQuests.has(button.dataset.trackQuest || ''))
    .map((button) => button.closest('li')?.querySelector('strong')?.textContent?.trim() || button.textContent.trim())
    .filter(Boolean);
  questMessage.textContent = `Acompanhando: ${labels.join(', ')}.`;
}

questButtons.forEach((button) => {
  const key = button.dataset.trackQuest || '';
  if (!key) return;
  const isTracked = trackedQuests.has(key);
  button.classList.toggle('is-active', isTracked);
  button.setAttribute('aria-pressed', String(isTracked));
  button.addEventListener('click', () => {
    if (trackedQuests.has(key)) {
      trackedQuests.delete(key);
    } else {
      trackedQuests.add(key);
    }
    const active = trackedQuests.has(key);
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
    updateQuestMessage();
  });
});

if (trendFilterForm) {
  trendFilterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const selected = Array.from(
      trendFilterForm.querySelectorAll('input[name="trendFilters"]:checked')
    )
      .map((input) => input.value.trim())
      .filter(Boolean);
    activeTrendFilters = new Set(selected);
    applyFeedFilters();
    closeSubpage();
  });

  trendFilterForm.addEventListener('reset', () => {
    setTimeout(() => {
      activeTrendFilters = new Set();
      applyFeedFilters();
    }, 0);
  });

  registerSubpageCallback('trend-filter', () => {
    trendFilterForm
      .querySelectorAll('input[name="trendFilters"]')
      .forEach((input) => {
        input.checked = activeTrendFilters.has(input.value);
      });
    updateTrendFilterUI();
  });
}

function updateWorkoutPreview() {
  if (
    !customWorkoutForm ||
    !customWorkoutSummary ||
    !customWorkoutIntensityValue ||
    !customWorkoutIntensityLabel ||
    !customWorkoutSteps
  ) {
    return;
  }
  const focus = customWorkoutForm.elements['focus']?.value || 'treino personalizado';
  const intensity = Number(customWorkoutForm.elements['intensity']?.value || 5);
  const duration = customWorkoutForm.elements['duration']?.value || '40 min';
  const extras = Array.from(
    customWorkoutForm.querySelectorAll('input[name="extras"]:checked')
  )
    .map((input) => input.value)
    .filter(Boolean);

  customWorkoutIntensityValue.textContent = `${intensity} / 10`;
  customWorkoutIntensityLabel.textContent = `Intensidade ${intensity} / 10`;

  const focusText = focus.charAt(0).toUpperCase() + focus.slice(1);
  const extrasText = extras.length ? extras.join(', ') : 'sem extras adicionais';
  customWorkoutSummary.textContent = `${focusText} com ${duration} e ${extrasText}.`;

  const steps = [
    {
      title: 'Aquecimento dinâmico',
      detail: extras.includes('respiração guiada')
        ? 'Respiração guiada e mobilidade leve para preparar o corpo.'
        : 'Mobilidade articular e elevação gradual da frequência.'
    },
    {
      title: 'Bloco principal',
      detail: focus.includes('força')
        ? 'Séries compostas com foco em potência controlada.'
        : focus.includes('mobilidade')
        ? 'Sequências em fluxo para estabilidade e amplitude.'
        : focus.includes('mindset')
        ? 'Exercícios de respiração ativa com movimentos conscientes.'
        : 'Intervalos híbridos para manter o ritmo e o foco.'
    },
    {
      title: 'Finalização',
      detail: extras.includes('finisher de core')
        ? 'Finisher de core seguido de alongamento guiado.'
        : extras.includes('sprint final')
        ? 'Sprints curtos para fechar em alta intensidade.'
        : 'Desaceleração com alongamento e registro rápido da sensação.'
    }
  ];

  customWorkoutSteps.innerHTML = steps
    .map(
      (step) => `<li><strong>${escapeHTML(step.title)}</strong><p>${escapeHTML(step.detail)}</p></li>`
    )
    .join('');
}

if (
  customWorkoutForm &&
  customWorkoutSummary &&
  customWorkoutIntensityValue &&
  customWorkoutIntensityLabel &&
  customWorkoutSteps
) {
  customWorkoutForm.addEventListener('input', () => {
    updateWorkoutPreview();
  });
  customWorkoutForm.addEventListener('submit', (event) => {
    event.preventDefault();
    updateWorkoutPreview();
  });
  registerSubpageCallback('customize-workout', updateWorkoutPreview);
  updateWorkoutPreview();
}

function appendChatMessage({ author, message, self = false }) {
  if (!squadChatLog) return;
  const item = document.createElement('li');
  item.className = `chat-message${self ? ' chat-message--self' : ''}`;
  const initials = getInitials(author);
  item.innerHTML = `
    <div class="chat-message__avatar" aria-hidden="true">${escapeHTML(initials)}</div>
    <div class="chat-message__content">
      <span class="chat-message__author">${escapeHTML(author)}</span>
      <span class="chat-message__timestamp">agora mesmo</span>
      <p>${escapeHTML(message)}</p>
    </div>`;
  squadChatLog.append(item);
  squadChatLog.scrollTop = squadChatLog.scrollHeight;
}

if (squadChatForm && squadChatInput && squadChatLog) {
  squadChatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = squadChatInput.value.trim();
    if (!value) return;
    const authorName = displayNameInput && displayNameInput.value.trim() ? displayNameInput.value.trim() : 'Você';
    appendChatMessage({ author: authorName, message: value, self: true });
    squadChatInput.value = '';
  });

  registerSubpageCallback('squad-chat', () => {
    if (squadChatInput) {
      squadChatInput.focus();
    }
  });
}

registerSubpageCallback('badge-curation', () => updateBadgeSelections());
registerSubpageCallback('quest-board', updateQuestMessage);

applyFeedFilters();
updateBadgeSelections();
updateQuestMessage();
updateTrendFilterUI();
