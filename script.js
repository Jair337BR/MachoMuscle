const appRoot = document.querySelector('.app');
const screens = document.querySelectorAll('.screen');
const navButtons = document.querySelectorAll('.tabbar__item');

const STORAGE_KEYS = {
  trainingPlans: 'machoTrainingPlans',
  trendFilters: 'machoTrendFilters',
  flashMessage: 'machoFlashMessage'
};

function storageAvailable() {
  try {
    const testKey = '__macho_muscle__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

const canPersistState = storageAvailable();

function readStorage(key, fallback = null) {
  if (!canPersistState) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (error) {
    return fallback;
  }
}

function writeStorage(key, value) {
  if (!canPersistState) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // ignore quota issues
  }
}

function clearStorage(key) {
  if (!canPersistState) return;
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    // ignore
  }
}

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
const profileId = document.getElementById('profileId');
const profileAvatar = document.getElementById('profileAvatar');
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
const plannerGrid = document.getElementById('plannerGrid');
const plannerPalette = document.getElementById('plannerPalette');
const plannerDetails = document.getElementById('plannerDetails');
const plannerDetailsTitle = document.getElementById('plannerDetailsTitle');
const plannerDetailsFocus = document.getElementById('plannerDetailsFocus');
const plannerDetailsSummary = document.getElementById('plannerDetailsSummary');
const plannerDetailsMeta = document.getElementById('plannerDetailsMeta');
const plannerDetailsExercises = document.getElementById('plannerDetailsExercises');
const plannerSaveButton = document.getElementById('plannerSaveButton');
const plannerResetButton = document.getElementById('plannerResetButton');
const squadChatForm = document.getElementById('squadChatForm');
const squadChatInput = document.getElementById('squadChatMessage');
const squadChatLog = document.getElementById('squadChatLog');
const dailyTrainingTitle = document.getElementById('dailyTrainingTitle');
const dailyTrainingDay = document.getElementById('dailyTrainingDay');
const dailyTrainingIntro = document.getElementById('dailyTrainingIntro');
const dailyTrainingChecklist = document.getElementById('dailyTrainingChecklist');
const dailyTrainingDuration = document.getElementById('dailyTrainingDuration');
const dailyTrainingCalories = document.getElementById('dailyTrainingCalories');
const dailyTrainingProgress = document.getElementById('dailyTrainingProgress');
const dailyTrainingVideo = document.getElementById('dailyTrainingVideo');
const adminLoginSection = document.getElementById('adminLoginSection');
const adminPanel = document.getElementById('adminPanel');
const adminLoginForm = document.getElementById('adminLoginForm');
const adminLoginFeedback = document.getElementById('adminLoginFeedback');
const adminUpdateForm = document.getElementById('adminUpdateForm');
const adminUserIdInput = document.getElementById('adminUserIdInput');
const adminUserIdButton = document.getElementById('adminUserIdButton');
const adminUserIdFeedback = document.getElementById('adminUserIdFeedback');
const adminUserSelect = document.getElementById('adminUserSelect');
const adminDaySelect = document.getElementById('adminDaySelect');
const adminFocusInput = document.getElementById('adminFocusInput');
const adminInstructionInput = document.getElementById('adminInstructionInput');
const adminExercisesInput = document.getElementById('adminExercisesInput');
const adminDurationInput = document.getElementById('adminDurationInput');
const adminCaloriesInput = document.getElementById('adminCaloriesInput');
const adminVideoInput = document.getElementById('adminVideoInput');
const adminUpdateFeedback = document.getElementById('adminUpdateFeedback');
const adminPlanPreview = document.getElementById('adminPlanPreview');
const globalMessage = document.getElementById('globalMessage');

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

const weekDayKeys = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
const adminDayOrder = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];
const weekDayLabels = {
  domingo: 'Domingo',
  segunda: 'Segunda-feira',
  terca: 'Terça-feira',
  quarta: 'Quarta-feira',
  quinta: 'Quinta-feira',
  sexta: 'Sexta-feira',
  sabado: 'Sábado'
};

const defaultAthleteKey = 'voce';

const hypertrophyCatalog = {
  ombros: {
    label: 'Ombros completos',
    focus: 'Ombros 3D e estabilidade escapular',
    summary:
      'Combine desenvolvimentos e elevações com cadência controlada para manter deltoides cheios e saudáveis.',
    duration: '45 min',
    calories: '360 kcal',
    video: 'https://www.youtube.com/embed/5sGOlKn-IxI',
    exercises: [
      {
        name: 'Desenvolvimento com halteres',
        detail: '4 séries de 8-10 repetições',
        media: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd29nbTN2aWIyNGZrbnJvdnRibGIyMzN4Mmw3dTY1cmNtZHVzejZmbSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/g9582DNuQppxC/giphy.gif'
      },
      {
        name: 'Elevação lateral em pé',
        detail: '3 séries de 12-15 repetições',
        media: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmg0MGwxM2RzdGdzMzZsYnA0MDVlN2JkYWo5OTMwZ3U5cGZlZzRzNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/XbJdo0AZ35cww/giphy.gif'
      },
      {
        name: 'Remada alta com barra',
        detail: '3 séries de 10-12 repetições',
        media: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHc2djV2OWM1anVwdXB1YnhwZjU3NWJiMmJvNjN2bXlrbnAxcmttcyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o7TKxy5G4ko7X1SNi/giphy.gif'
      },
      {
        name: 'Face pull com elástico',
        detail: '3 séries de 15 repetições',
        media: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3E5OTV5NXNnN2Jxb3p5bHQ3Y2Z5bnljcnBocnlyam9pejNyMG5oOCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o6ZtcQ4G1nL8eBFfa/giphy.gif'
      }
    ]
  },
  quadriceps: {
    label: 'Pernas quadríceps',
    focus: 'Pernas com foco em quadríceps',
    summary:
      'Agachamentos e isoladores estratégicos para estimular quadríceps em diferentes ângulos sem perder técnica.',
    duration: '48 min',
    calories: '430 kcal',
    video: 'https://www.youtube.com/embed/COd4IITZ1wk',
    exercises: [
      {
        name: 'Agachamento livre',
        detail: '4 séries de 8-10 repetições',
        media: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmcxamZzbHNkNTZzMmdpc2l6MjMxY3Y2cmg5YW1wdnhxaHRheWhsOSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o7TKCk0oRdbv6VJtu/giphy.gif'
      },
      {
        name: 'Leg press 45°',
        detail: '3 séries de 12 repetições',
        media: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnY2eGg2Y2g5djl3MmNpdjQyaGh3cGEzZGlnb25mdnFrMW10ZG52ciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0HlRJ1A5kKQJ4efK/giphy.gif'
      },
      {
        name: 'Avanço caminhando',
        detail: '3 séries de 12 passos por perna',
        media: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTZtYzU4NjI4d2FmcWJrdzV3bmwycjdwb3M4NmZsMW9qcTJqN3djNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o85xo5rXDBi0tyMJi/giphy.gif'
      },
      {
        name: 'Extensora unilateral',
        detail: '3 séries de 12-15 repetições',
        media: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGNrMGdyY2U2NnpoN2M4YnF5Z3RsdnZmanZrbWlyZHRuMDhnamZqMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/26BRuo6sLetdllPAQ/giphy.gif'
      }
    ]
  },
  peitoTriceps: {
    label: 'Peito e tríceps',
    focus: 'Peito e tríceps para hipertrofia',
    summary:
      'Abra peito e tríceps com compostos e isoladores que mantêm o tempo sob tensão elevado.',
    duration: '46 min',
    calories: '420 kcal',
    video: 'https://www.youtube.com/embed/m8K3b0UpwOQ',
    exercises: [
      {
        name: 'Supino reto com halteres',
        detail: '4 séries de 8-10 repetições',
        media: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdW5uY2d6aTJ2c2V4NTMxcTNsZzRwNHVta3o2aWx4Y2F2aGR4ZjdpZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o6ZtaO9D6HzJbD0tq/giphy.gif'
      },
      {
        name: 'Crucifixo inclinado',
        detail: '3 séries de 12 repetições',
        media: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnF2a2g2cjd4MzZ4NG1kaXVmZXo1a21nZjd5dDkyM3FycWlpcGdheSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o7TKAvj3b31c4EEn6/giphy.gif'
      },
      {
        name: 'Mergulho no banco',
        detail: '3 séries de 10-12 repetições',
        media: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDM0cTd0dXc0bzhwdGtpa3loNXl4OHlsdWtvNGdzYnNlYXMzYXlociZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0HlIkxz5pS6LbYic/giphy.gif'
      },
      {
        name: 'Tríceps francês com halteres',
        detail: '3 séries de 12 repetições',
        media: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmtvaXZuNmZsMGt6eTE2dXA5ajd2NnJjMG13NnZpcXhmcTEyaDk0YiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o7TKBv6fGIenp2S8Q/giphy.gif'
      }
    ]
  },
  posterior: {
    label: 'Posterior de coxa',
    focus: 'Posterior de coxa e glúteos',
    summary:
      'Ênfase excêntrica em movimentos de hinge para recrutar posteriores e glúteos com segurança.',
    duration: '47 min',
    calories: '430 kcal',
    video: 'https://www.youtube.com/embed/3i7iI-yRzyc',
    exercises: [
      {
        name: 'Levantamento romeno com halteres',
        detail: '4 séries de 8-10 repetições',
        media: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3FkN2Y4MW9jZmdqMnRranlzZHZhdXBmNXRzdTF2c3Vua3U0Zmx1dSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o7TKoOPcNTgYJQ3z6/giphy.gif'
      },
      {
        name: 'Mesa flexora',
        detail: '3 séries de 10-12 repetições',
        media: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTE0aDg3YTY3bzZ4cjcyd3A4Zmx0ZjA2c2dkeDJkYzQyZzNvYWtleiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0ExyZ5F7bKnzsyqk/giphy.gif'
      },
      {
        name: 'Elevação de quadril com barra',
        detail: '4 séries de 12 repetições',
        media: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2p1M3R6dmJ5MWRqM2UzOXZkbWZtbDZqYnpvYjhrOTZ5ZnNrOHphMiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/26BGzZxzzlDP7U9GQ/giphy.gif'
      },
      {
        name: 'Abdução de quadril em polia',
        detail: '3 séries de 15 repetições',
        media: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWJ2NXY3bTRpaWh2Y2IxMnZyamd2d2NnaTV6cmJqenFneTBqMWIzOCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ohzdPVa3vD8Q2Wkfm/giphy.gif'
      }
    ]
  },
  costasBiceps: {
    label: 'Costas e bíceps',
    focus: 'Costas densas e bíceps firmes',
    summary:
      'Remadas e puxadas com tempo sob tensão para engrossar dorsais enquanto os bíceps acompanham.',
    duration: '46 min',
    calories: '410 kcal',
    video: 'https://www.youtube.com/embed/Ob5Avzkdxl0',
    exercises: [
      {
        name: 'Remada curvada com barra',
        detail: '4 séries de 8-10 repetições',
        media: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2x2ZGpvNjV5NGFyaWwwa3R0a2l1dXk3Mmw4c2JrbnNqaTJ2bTZrOCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o7aTskHEUdgCQAXde/giphy.gif'
      },
      {
        name: 'Puxada aberta na polia',
        detail: '3 séries de 10-12 repetições',
        media: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWE1dnR0cW5rdXBuMjJzY20zcTN3YTB5NGQ3c3BodWRndXl4NjBqZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/26BGzKpO4nwx0HfHi/giphy.gif'
      },
      {
        name: 'Remada unilateral com halter',
        detail: '3 séries de 12 repetições por lado',
        media: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHpmNHphYTZlM2Q1NXZnOTUzMGEwZTFzeDJxcm43eWd1NmI3cGJ5biZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o7btR6yofk6RVYq2Q/giphy.gif'
      },
      {
        name: 'Rosca direta com barra W',
        detail: '3 séries de 10-12 repetições',
        media: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2ZxM2c3cmR4cnJnbDczcW1mM2o0OGdjNDN3ODByN3MxNGRhM3Y2eCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/26xBI73gWquCBBCDe/giphy.gif'
      }
    ]
  },
  descanso: {
    label: 'Descanso ativo',
    focus: 'Descanso e mobilidade leve',
    summary:
      'Reserve o dia para alongamentos suaves, respiração profunda e caminhada leve para recuperar energia.',
    duration: '25 min',
    calories: '180 kcal',
    video: 'https://www.youtube.com/embed/w0l9F9lYGDI',
    exercises: [
      {
        name: 'Caminhada regenerativa',
        detail: '15 minutos em ritmo confortável',
        media: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWVsMmU3d3lzcWNycGoxZTEzMHBoYjUxYzZuaGNkMTRramQ1c3NpMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o7btMCltyDvSgF92E/giphy.gif'
      },
      {
        name: 'Alongamento de peitoral apoiado',
        detail: '3 séries de 40 segundos por lado',
        media: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGZ6ZWNvcTcxMW80cnJ1dXF2cnZ1c3d1NWZucHgycmwxZzk4ZDIzNyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o7btMCltyDvSgF92E/giphy.gif'
      },
      {
        name: 'Mobilidade torácica com rolo',
        detail: '3 séries de 12 repetições controladas',
        media: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExczNsdmw1NmU3d2FubjQyYTAydWc0eDZlcWc0cDQ0cDAyNWp6azJjeiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0MYEqEzwMWFCg8rW/giphy.gif'
      },
      {
        name: 'Respiração diafragmática guiada',
        detail: '5 ciclos de 1 minuto',
        media: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2ptOThxejNtMGJ2cjJheHcwY3dpczdmYnEzNTBrN2c1ejY3ZXduYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0MYDGAODclXEGXy4/giphy.gif'
      }
    ]
  }
};

const defaultPlanTemplate = {
  focus: 'Sessão de hipertrofia personalizada',
  summary: 'Defina o grupamento muscular, cadência e carga sugerida para potencializar o ganho de massa.',
  duration: '45 min',
  calories: '420 kcal',
  video: '',
  exercises: [],
  template: 'personalizado'
};

function cloneCatalogEntry(key) {
  const catalogItem = hypertrophyCatalog[key];
  if (!catalogItem) {
    return {
      focus: defaultPlanTemplate.focus,
      summary: defaultPlanTemplate.summary,
      duration: defaultPlanTemplate.duration,
      calories: defaultPlanTemplate.calories,
      video: defaultPlanTemplate.video,
      exercises: [],
      template: key || 'personalizado'
    };
  }
  return {
    focus: catalogItem.focus,
    summary: catalogItem.summary,
    duration: catalogItem.duration,
    calories: catalogItem.calories,
    video: catalogItem.video,
    exercises: catalogItem.exercises.map((exercise) => ({
      name: exercise.name,
      detail: exercise.detail,
      media: exercise.media || ''
    })),
    template: key
  };
}

function createPlan(catalogKey, overrides = {}) {
  const plan = cloneCatalogEntry(catalogKey);
  const result = { ...plan, ...overrides };
  if (overrides.exercises) {
    result.exercises = overrides.exercises.map((exercise) => ({
      name: String(exercise.name || '').trim() || 'Exercício guiado',
      detail: String(exercise.detail || '').trim() || 'Repetições livres',
      media: String(exercise.media || '').trim()
    }));
  }
  if (!result.template) {
    result.template = catalogKey || plan.template || 'personalizado';
  }
  return result;
}

const trainingPlans = {
  voce: {
    id: 'MM-001',
    name: 'Você',
    routine: {
      segunda: createPlan('ombros'),
      terca: createPlan('quadriceps'),
      quarta: createPlan('peitoTriceps'),
      quinta: createPlan('posterior'),
      sexta: createPlan('costasBiceps'),
      sabado: createPlan('descanso'),
      domingo: createPlan('descanso')
    }
  },
  ana: {
    id: 'MM-204',
    name: 'Ana Torres',
    routine: {
      segunda: createPlan('ombros', {
        summary:
          'Cadência moderada e halteres controlados para fortalecer deltoides sem sobrecarregar a lombar.',
        duration: '42 min',
        calories: '330 kcal'
      }),
      terca: createPlan('quadriceps', {
        summary: 'Priorize amplitude nos movimentos guiados e mantenha a respiração estável do início ao fim.',
        duration: '45 min',
        calories: '380 kcal'
      }),
      quarta: createPlan('peitoTriceps', {
        summary: 'Foque em postura neutra e tempo sob tensão constante para sentir o peitoral trabalhando.',
        duration: '44 min',
        calories: '360 kcal'
      }),
      quinta: createPlan('posterior', {
        summary:
          'Alongue bem antes dos hinges e controle a descida para ativar posteriores de forma segura.',
        duration: '46 min',
        calories: '370 kcal'
      }),
      sexta: createPlan('costasBiceps', {
        summary: 'Use pegadas confortáveis e mantenha a escápula firme para proteger a lombar e otimizar o pump.',
        duration: '45 min',
        calories: '360 kcal'
      }),
      sabado: createPlan('descanso', {
        summary: 'Registre sensações da semana, alongue e prepare o corpo para o próximo ciclo de treinos.',
        duration: '25 min',
        calories: '180 kcal'
      }),
      domingo: createPlan('descanso', {
        summary: 'Dia livre para regeneração ativa leve e respiração consciente.',
        duration: '25 min',
        calories: '180 kcal'
      })
    }
  },
  carlos: {
    id: 'MM-418',
    name: 'Carlos Lima',
    routine: {
      segunda: createPlan('peitoTriceps', {
        focus: 'Peito pesado com pré-exaustão',
        summary: 'Abra a semana com movimentos compostos seguidos de isoladores para congestionar o peitoral.',
        duration: '50 min',
        calories: '480 kcal'
      }),
      terca: createPlan('costasBiceps', {
        focus: 'Costas densas e bíceps fortes',
        summary: 'Remadas pesadas e puxadas neutras para aumentar densidade e largura dorsal.',
        duration: '52 min',
        calories: '460 kcal'
      }),
      quarta: createPlan('quadriceps', {
        focus: 'Pernas completas com foco em força',
        summary: 'Volume alto em compostos para gerar estímulo máximo em quadríceps e glúteos.',
        duration: '55 min',
        calories: '520 kcal'
      }),
      quinta: createPlan('ombros', {
        focus: 'Ombros 3D e trapézio ativo',
        summary: 'Alterne desenvolvimentos, elevações e remadas altas para destacar os deltoides.',
        duration: '46 min',
        calories: '380 kcal'
      }),
      sexta: createPlan('posterior', {
        focus: 'Posterior dominante com cargas altas',
        summary: 'Movimentos de hinge e flexão combinados para consolidar posteriores de coxa e glúteos.',
        duration: '52 min',
        calories: '450 kcal'
      }),
      sabado: createPlan('descanso', {
        summary: 'Utilize o sábado para alongar suavemente e revisar indicadores no aplicativo.',
        duration: '30 min',
        calories: '190 kcal'
      }),
      domingo: createPlan('descanso', {
        summary: 'Respiração consciente e caminhada leve para iniciar uma nova semana com energia.',
        duration: '30 min',
        calories: '190 kcal'
      })
    }
  }
};


function ensureUserIdentifiers() {
  const used = new Set();
  Object.values(trainingPlans).forEach((user) => {
    if (!user || typeof user !== 'object') return;
    if (typeof user.id === 'string') {
      const trimmed = user.id.trim().toUpperCase();
      user.id = trimmed;
      if (trimmed) {
        used.add(trimmed);
      }
    } else {
      user.id = '';
    }
  });
  let counter = 1;
  Object.values(trainingPlans).forEach((user) => {
    if (!user || typeof user !== 'object') return;
    if (!user.id) {
      let candidate = '';
      while (!candidate || used.has(candidate)) {
        candidate = `MM-${String(counter).padStart(3, '0')}`;
        counter += 1;
      }
      user.id = candidate;
      used.add(candidate);
    }
  });
}

function getUserKeyById(rawId) {
  if (!rawId || typeof rawId !== 'string') return '';
  const target = rawId.trim().toUpperCase();
  if (!target) return '';
  const entry = Object.entries(trainingPlans).find(([, user]) => {
    if (!user || typeof user !== 'object') return false;
    if (typeof user.id !== 'string') return false;
    return user.id.toUpperCase() === target;
  });
  return entry ? entry[0] : '';
}

function updateProfileIdDisplay() {
  if (!profileId) return;
  const current = trainingPlans[defaultAthleteKey];
  const idValue = current && typeof current.id === 'string' ? current.id : '';
  profileId.textContent = idValue ? `ID pessoal: ${idValue}` : 'ID pessoal: defina com o painel';
}

ensureUserIdentifiers();


function normaliseExercises(exercises = []) {
  if (!Array.isArray(exercises)) return [];
  return exercises
    .map((exercise) => {
      if (!exercise || typeof exercise !== 'object') return null;
      const name = String(exercise.name || '').trim();
      const detail = String(exercise.detail || '').trim();
      const media = String(exercise.media || '').trim();
      return {
        name: name || 'Exercício guiado',
        detail: detail || 'Repetições livres',
        media
      };
    })
    .filter(Boolean);
}

function mergeTrainingPlans(base, saved) {
  if (!saved || typeof saved !== 'object') return;
  Object.entries(saved).forEach(([userKey, userValue]) => {
    if (!userValue || typeof userValue !== 'object') return;
    if (!base[userKey]) {
      base[userKey] = { name: userValue.name || 'Atleta', routine: {} };
    }
    const targetUser = base[userKey];
    if (!targetUser.routine || typeof targetUser.routine !== 'object') {
      targetUser.routine = {};
    }
    if (userValue.name) {
      targetUser.name = userValue.name;
    }
    if (typeof userValue.id === 'string' && userValue.id.trim()) {
      targetUser.id = userValue.id.trim().toUpperCase();
    }
    const savedRoutine = userValue.routine;
    if (!savedRoutine || typeof savedRoutine !== 'object') return;
    Object.entries(savedRoutine).forEach(([dayKey, planValue]) => {
      if (!planValue || typeof planValue !== 'object') return;
      targetUser.routine[dayKey] = {
        focus: planValue.focus || defaultPlanTemplate.focus,
        summary: planValue.summary || defaultPlanTemplate.summary,
        duration: planValue.duration || defaultPlanTemplate.duration,
        calories: planValue.calories || defaultPlanTemplate.calories,
        video: planValue.video || '',
        exercises: normaliseExercises(planValue.exercises),
        template: planValue.template || (planValue.focus && '') || 'personalizado'
      };
    });
  });
}

function restoreTrainingPlansFromStorage() {
  const saved = readStorage(STORAGE_KEYS.trainingPlans, null);
  if (!saved || typeof saved !== 'object') return;
  mergeTrainingPlans(trainingPlans, saved);
  ensureUserIdentifiers();
}

function persistTrainingPlans() {
  ensureUserIdentifiers();
  writeStorage(STORAGE_KEYS.trainingPlans, trainingPlans);
  updateProfileIdDisplay();
}

restoreTrainingPlansFromStorage();
ensureUserIdentifiers();
updateProfileIdDisplay();

function showGlobalMessage(message) {
  if (!globalMessage || !message) return;
  globalMessage.textContent = message;
  globalMessage.hidden = false;
  globalMessage.classList.add('is-visible');
  setTimeout(() => {
    globalMessage.classList.add('is-fading');
  }, 4500);
  setTimeout(() => {
    globalMessage.hidden = true;
    globalMessage.classList.remove('is-visible', 'is-fading');
  }, 6000);
}

const pendingFlashMessage = readStorage(STORAGE_KEYS.flashMessage, '');
if (typeof pendingFlashMessage === 'string' && pendingFlashMessage.trim()) {
  showGlobalMessage(pendingFlashMessage.trim());
  clearStorage(STORAGE_KEYS.flashMessage);
}

const adminCredentials = { login: 'admin1', password: 'machomuscle' };
let isAdminAuthenticated = false;
let selectedAdminUser = trainingPlans[defaultAthleteKey] ? defaultAthleteKey : Object.keys(trainingPlans)[0] || '';
let selectedAdminDay = adminDayOrder[0];

function getCurrentDayKey() {
  const todayIndex = new Date().getDay();
  return weekDayKeys[todayIndex] || 'segunda';
}

selectedAdminDay = adminDayOrder.includes(getCurrentDayKey()) ? getCurrentDayKey() : adminDayOrder[0];

function normaliseVideoUrl(url) {
  if (!url) return '';
  const trimmed = url.trim();
  const embedMatch = trimmed.match(/embed\/([\w-]{6,})/);
  if (embedMatch) {
    return `https://www.youtube.com/embed/${embedMatch[1]}`;
  }
  const watchMatch = trimmed.match(/[?&]v=([\w-]{6,})/);
  if (watchMatch) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }
  const shortMatch = trimmed.match(/youtu\.be\/([\w-]{6,})/);
  if (shortMatch) {
    return `https://www.youtube.com/embed/${shortMatch[1]}`;
  }
  return trimmed;
}

function displayVideoUrl(url) {
  if (!url) return '';
  const embedMatch = url.match(/embed\/([\w-]{6,})/);
  if (embedMatch) {
    return `https://www.youtube.com/watch?v=${embedMatch[1]}`;
  }
  return url;
}

function getOrCreatePlan(userKey, dayKey) {
  const user = trainingPlans[userKey];
  if (!user) return null;
  if (!user.routine[dayKey]) {
    const fallback = cloneCatalogEntry('descanso');
    user.routine[dayKey] = { ...fallback, template: fallback.template || 'descanso' };
  }
  return user.routine[dayKey];
}

function parseExerciseLines(value) {
  if (!value) return [];
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const segments = line.split('|');
      const base = segments.shift() || '';
      const media = (segments.pop() || '').trim();
      const detailCandidate = segments.length ? segments[0] : '';
      const hyphenParts = base.split(/[-–—]/);
      const name = hyphenParts.shift() || base;
      const detailFromHyphen = hyphenParts.join(' - ').trim();
      const detail = (detailCandidate || detailFromHyphen).trim();
      return {
        name: name.trim(),
        detail: detail || 'Repetições livres',
        media
      };
    });
}

function renderAdminPreview() {
  if (!adminPlanPreview) return;
  if (!selectedAdminUser || !trainingPlans[selectedAdminUser]) {
    adminPlanPreview.innerHTML = '<p class="admin-card__help">Selecione uma pessoa para visualizar o plano.</p>';
    return;
  }
  const previewMarkup = adminDayOrder
    .map((dayKey) => {
      const plan = getOrCreatePlan(selectedAdminUser, dayKey);
      const exerciseList = plan.exercises.length
        ? `<ul class="admin-plan-preview__list">${plan.exercises
            .map(
              (exercise) =>
                `<li><strong>${escapeHTML(exercise.name)}</strong> — ${escapeHTML(exercise.detail)}</li>`
            )
            .join('')}</ul>`
        : '<p class="admin-card__help">Adicione exercícios para este dia.</p>';
      const videoLink = plan.video
        ? `<a class="admin-preview__link" href="${escapeHTML(displayVideoUrl(plan.video))}" target="_blank" rel="noopener noreferrer">Abrir vídeo de apoio</a>`
        : '';
      return `
        <article class="admin-plan-preview__day">
          <strong>${escapeHTML(weekDayLabels[dayKey] || dayKey)}</strong>
          <span class="admin-plan-preview__title">${escapeHTML(plan.focus)}</span>
          <span class="admin-plan-preview__meta">${escapeHTML(plan.duration)} · ${escapeHTML(plan.calories)}</span>
          <p class="admin-card__help">${escapeHTML(plan.summary)}</p>
          ${exerciseList}
          ${videoLink}
        </article>`;
    })
    .join('');
  adminPlanPreview.innerHTML = previewMarkup;
}

function setAdminUserById(rawId) {
  const key = getUserKeyById(rawId);
  if (!key) {
    if (adminUserIdFeedback) {
      adminUserIdFeedback.textContent = 'ID não encontrado. Confira com o usuário.';
    }
    return false;
  }
  selectedAdminUser = key;
  if (adminUserSelect) {
    adminUserSelect.value = key;
  }
  fillAdminForm();
  renderAdminPreview();
  if (adminUserIdFeedback) {
    const userName = trainingPlans[key]?.name || 'Usuário';
    adminUserIdFeedback.textContent = `Plano carregado para ${userName}.`;
  }
  if (selectedAdminUser === defaultAthleteKey && selectedAdminDay === getCurrentDayKey()) {
    renderDailyTrainingCard();
  }
  return true;
}

function populateAdminUserOptions() {
  if (!adminUserSelect) return;
  const options = Object.entries(trainingPlans)
    .map(([key, value]) => `<option value="${escapeHTML(key)}">${escapeHTML(value.name)}</option>`)
    .join('');
  adminUserSelect.innerHTML = options;
  if (!trainingPlans[selectedAdminUser]) {
    selectedAdminUser = Object.keys(trainingPlans)[0] || '';
  }
  if (selectedAdminUser) {
    adminUserSelect.value = selectedAdminUser;
  }
}

function populateAdminDayOptions() {
  if (!adminDaySelect) return;
  const options = adminDayOrder
    .map((dayKey) => `<option value="${dayKey}">${escapeHTML(weekDayLabels[dayKey] || dayKey)}</option>`)
    .join('');
  adminDaySelect.innerHTML = options;
  if (!adminDayOrder.includes(selectedAdminDay)) {
    selectedAdminDay = adminDayOrder[0];
  }
  adminDaySelect.value = selectedAdminDay;
}

function fillAdminForm() {
  if (!adminUpdateForm) return;
  const plan = getOrCreatePlan(selectedAdminUser, selectedAdminDay);
  if (!plan) return;
  if (adminFocusInput) {
    adminFocusInput.value = plan.focus;
  }
  if (adminInstructionInput) {
    adminInstructionInput.value = plan.summary;
  }
  if (adminExercisesInput) {
    adminExercisesInput.value = plan.exercises
      .map((exercise) => {
        const detail = exercise.detail ? ` - ${exercise.detail}` : '';
        const media = exercise.media ? ` | ${exercise.media}` : '';
        return `${exercise.name}${detail}${media}`;
      })
      .join('\n');
  }
  if (adminDurationInput) {
    adminDurationInput.value = plan.duration;
  }
  if (adminCaloriesInput) {
    adminCaloriesInput.value = plan.calories;
  }
  if (adminVideoInput) {
    adminVideoInput.value = displayVideoUrl(plan.video);
  }
  if (adminUpdateFeedback) {
    adminUpdateFeedback.textContent = '';
  }
}

function toggleAdminSections() {
  if (adminLoginSection) {
    adminLoginSection.hidden = isAdminAuthenticated;
  }
  if (adminPanel) {
    adminPanel.hidden = !isAdminAuthenticated;
  }
  if (!isAdminAuthenticated && adminLoginFeedback) {
    adminLoginFeedback.textContent = '';
  }
}

function prepareAdminPanel() {
  populateAdminUserOptions();
  populateAdminDayOptions();
  fillAdminForm();
  renderAdminPreview();
  if (adminUserIdFeedback) {
    adminUserIdFeedback.textContent = '';
  }
  if (adminUserIdInput) {
    adminUserIdInput.value = '';
  }
}

function getPlanForDailyCard() {
  const dayKey = getCurrentDayKey();
  const userKey = trainingPlans[defaultAthleteKey] ? defaultAthleteKey : Object.keys(trainingPlans)[0];
  if (!userKey) return { plan: { ...defaultPlanTemplate }, dayKey };
  const plan = getOrCreatePlan(userKey, dayKey) || { ...defaultPlanTemplate };
  return { plan, userKey, dayKey };
}

function updateDailyTrainingProgress() {
  if (!dailyTrainingChecklist || !dailyTrainingProgress) return;
  const checkboxes = dailyTrainingChecklist.querySelectorAll('input[type="checkbox"]');
  if (!checkboxes.length) {
    dailyTrainingProgress.textContent = '0 de 0 concluídos';
    return;
  }
  const completed = Array.from(checkboxes).filter((input) => input.checked).length;
  dailyTrainingProgress.textContent = `${completed} de ${checkboxes.length} concluídos`;
}

function renderDailyTrainingCard() {
  if (!dailyTrainingTitle || !dailyTrainingDay || !dailyTrainingChecklist) return;
  const { plan, dayKey } = getPlanForDailyCard();
  dailyTrainingTitle.textContent = plan.focus;
  if (dailyTrainingDay) {
    dailyTrainingDay.textContent = `${weekDayLabels[dayKey] || dayKey} guiado`;
  }
  if (dailyTrainingIntro) {
    dailyTrainingIntro.textContent = plan.summary;
  }
  if (dailyTrainingDuration) {
    dailyTrainingDuration.textContent = plan.duration;
  }
  if (dailyTrainingCalories) {
    dailyTrainingCalories.textContent = plan.calories;
  }
  if (dailyTrainingVideo) {
    const nextSrc = plan.video || 'https://www.youtube.com/embed/ml6cT4AZdqI';
    if (dailyTrainingVideo.getAttribute('src') !== nextSrc) {
      dailyTrainingVideo.setAttribute('src', nextSrc);
    }
  }
  dailyTrainingChecklist.innerHTML = '';
  if (!plan.exercises.length) {
    const emptyItem = document.createElement('li');
    emptyItem.className = 'checklist__empty';
    emptyItem.textContent = 'Adicione exercícios no painel administrativo para liberar o checklist.';
    dailyTrainingChecklist.append(emptyItem);
    updateDailyTrainingProgress();
    return;
  }
  plan.exercises.forEach((exercise, index) => {
    const item = document.createElement('li');
    item.innerHTML = `
      <label class="checklist__item">
        <input type="checkbox" data-daily-exercise="${dayKey}-${index}" />
        <span class="checklist__content">
          <span class="checklist__text">
            ${escapeHTML(exercise.name)}
            <span class="checklist__detail">${escapeHTML(exercise.detail)}</span>
          </span>
          ${exercise.media
            ? `<span class="checklist__media"><img src="${escapeHTML(exercise.media)}" alt="Demonstração de ${escapeHTML(
                exercise.name
              )}" loading="lazy" /></span>`
            : ''}
        </span>
      </label>`;
    const checkbox = item.querySelector('input');
    if (checkbox) {
      checkbox.addEventListener('change', updateDailyTrainingProgress);
    }
    dailyTrainingChecklist.append(item);
  });
  updateDailyTrainingProgress();
}

if (displayNameInput) {
  displayNameInput.addEventListener('input', () => {
    const value = displayNameInput.value.trim();
    profileName.textContent = value || 'Seu nome';
    const initials = getInitials(value || 'Macho Muscle');
    profileAvatar.textContent = initials;
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

function restoreTrendFiltersFromStorage() {
  const saved = readStorage(STORAGE_KEYS.trendFilters, []);
  if (!Array.isArray(saved)) {
    activeTrendFilters = new Set();
    return;
  }
  activeTrendFilters = new Set(saved.filter(Boolean));
}

function persistTrendFilters() {
  writeStorage(STORAGE_KEYS.trendFilters, Array.from(activeTrendFilters));
}

restoreTrendFiltersFromStorage();

const communityComposer = document.getElementById('communityComposer');
const communityFeed = document.getElementById('communityFeed');

function updateTrendFilterUI() {
  if (filterTriggerLabel) {
    const count = activeTrendFilters.size;
    filterTriggerLabel.textContent = count ? `Trends (${count})` : 'Filtrar trends';
  }
  if (trendFilterSummary) {
    const hasCommunityFeed = Boolean(communityFeed);
    const visibleCount = hasCommunityFeed
      ? Array.from(communityFeed.querySelectorAll('.post')).filter((post) => !post.classList.contains('is-hidden')).length
      : activeTrendFilters.size;
    if (!activeTrendFilters.size) {
      trendFilterSummary.textContent = 'Todos os posts visíveis.';
    } else if (hasCommunityFeed && visibleCount === 0) {
      trendFilterSummary.textContent = `Nenhum post corresponde a ${Array.from(activeTrendFilters).join(', ')} ainda.`;
    } else {
      const activeLabels = Array.from(activeTrendFilters).join(', ');
      trendFilterSummary.textContent = hasCommunityFeed
        ? `Filtrando por ${activeLabels} · ${visibleCount} posts.`
        : `Filtrando por ${activeLabels}.`;
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
        : lower.includes('equipar')
        ? 'Equipado'
        : lower.includes('aplicar')
        ? 'Aplicado'
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
  trendFilterForm
    .querySelectorAll('input[name="trendFilters"]')
    .forEach((input) => {
      input.checked = activeTrendFilters.has(input.value);
    });
  updateTrendFilterUI();

  trendFilterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const selected = Array.from(
      trendFilterForm.querySelectorAll('input[name="trendFilters"]:checked')
    )
      .map((input) => input.value.trim())
      .filter(Boolean);
    activeTrendFilters = new Set(selected);
    persistTrendFilters();
    applyFeedFilters();
    updateTrendFilterUI();
    if (!communityFeed) {
      window.location.href = 'index.html';
    }
  });

  trendFilterForm.addEventListener('reset', () => {
    setTimeout(() => {
      activeTrendFilters = new Set();
      applyFeedFilters();
      persistTrendFilters();
      updateTrendFilterUI();
    }, 0);
  });
}

const plannerDayOrder = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
let plannerAssignments = {};
let plannerInitialAssignments = {};
let plannerSelectedDay = 'segunda';
let plannerActivePalette = '';
let plannerDragData = null;

function inferTemplateFromPlan(plan) {
  if (!plan || typeof plan !== 'object') return 'descanso';
  if (plan.template && hypertrophyCatalog[plan.template]) {
    return plan.template;
  }
  const match = Object.entries(hypertrophyCatalog).find(([, catalogPlan]) => {
    return catalogPlan.focus === plan.focus;
  });
  return match ? match[0] : 'descanso';
}

function initialisePlannerAssignments() {
  const user = trainingPlans[defaultAthleteKey];
  plannerAssignments = {};
  plannerInitialAssignments = {};
  plannerDayOrder.forEach((dayKey) => {
    const plan = user?.routine?.[dayKey];
    const template = inferTemplateFromPlan(plan);
    plannerAssignments[dayKey] = template;
    plannerInitialAssignments[dayKey] = template;
  });
  if (!plannerAssignments[plannerSelectedDay]) {
    plannerSelectedDay = plannerDayOrder[1] || plannerDayOrder[0] || 'segunda';
  }
  plannerActivePalette = plannerAssignments[plannerSelectedDay] || 'descanso';
}

function updatePaletteSelection() {
  if (!plannerPalette) return;
  const options = plannerPalette.querySelectorAll('[data-template]');
  options.forEach((option) => {
    const isActive = option.dataset.template === plannerActivePalette;
    option.classList.toggle('is-active', isActive);
    option.setAttribute('aria-pressed', String(isActive));
  });
}

function plannerHasPendingChanges() {
  return plannerDayOrder.some(
    (dayKey) => (plannerAssignments[dayKey] || 'descanso') !== (plannerInitialAssignments[dayKey] || 'descanso')
  );
}

function updatePlannerActions() {
  const hasChanges = plannerHasPendingChanges();
  if (plannerSaveButton) {
    plannerSaveButton.disabled = false;
    plannerSaveButton.setAttribute('aria-disabled', 'false');
    plannerSaveButton.dataset.hasChanges = String(hasChanges);
  }
  if (plannerResetButton) {
    plannerResetButton.disabled = !hasChanges;
    plannerResetButton.setAttribute('aria-disabled', String(!hasChanges));
  }
}

function setSelectedDay(dayKey) {
  plannerSelectedDay = dayKey;
  updatePlannerGrid();
  updatePlannerDetails();
  updatePaletteSelection();
}

function createPlannerBlock(templateKey, dayKey) {
  const block = document.createElement('div');
  const catalogItem = hypertrophyCatalog[templateKey] || hypertrophyCatalog.descanso;
  block.className = 'planner-block';
  if (plannerSelectedDay === dayKey) {
    block.classList.add('is-selected');
  }
  block.dataset.template = templateKey;
  block.dataset.day = dayKey;
  block.draggable = true;
  block.innerHTML = `
    <span class="planner-block__title">${escapeHTML(catalogItem.label)}</span>
    <span class="planner-block__subtitle">${escapeHTML(catalogItem.focus)}</span>
  `;
  block.addEventListener('dragstart', handlePlannerDragStart);
  block.addEventListener('dragend', handlePlannerDragEnd);
  block.addEventListener('click', (event) => {
    event.stopPropagation();
    setSelectedDay(dayKey);
  });
  return block;
}

function updatePlannerGrid() {
  if (!plannerGrid) return;
  plannerDayOrder.forEach((dayKey) => {
    const slot = plannerGrid.querySelector(`[data-slot-day="${dayKey}"]`);
    if (!slot) return;
    const templateKey = plannerAssignments[dayKey] || 'descanso';
    slot.innerHTML = '';
    slot.append(createPlannerBlock(templateKey, dayKey));
    slot.classList.toggle('is-selected', plannerSelectedDay === dayKey);
    const catalogItem = hypertrophyCatalog[templateKey] || hypertrophyCatalog.descanso;
    slot.setAttribute(
      'aria-label',
      `${weekDayLabels[dayKey] || dayKey}: ${catalogItem.label}`
    );
    const summaryEl = plannerGrid.querySelector(`[data-summary-day="${dayKey}"]`);
    if (summaryEl) {
      summaryEl.textContent = catalogItem.summary;
    }
  });
}

function updatePlannerDetails() {
  if (!plannerDetails || !plannerDetailsFocus || !plannerDetailsSummary || !plannerDetailsMeta) return;
  const dayKey = plannerSelectedDay || plannerDayOrder[0];
  const templateKey = plannerAssignments[dayKey] || 'descanso';
  const plan = createPlan(templateKey);
  if (plannerDetailsTitle) {
    plannerDetailsTitle.textContent = weekDayLabels[dayKey] || 'Dia selecionado';
  }
  plannerDetailsFocus.textContent = plan.focus;
  plannerDetailsSummary.textContent = plan.summary;
  plannerDetailsMeta.textContent = `${plan.duration} · ${plan.calories}`;
  if (plannerDetailsExercises) {
    plannerDetailsExercises.innerHTML = plan.exercises
      .map(
        (exercise) => `
          <li>
            <strong>${escapeHTML(exercise.name)}</strong>
            <span>${escapeHTML(exercise.detail)}</span>
          </li>`
      )
      .join('');
  }
}

function assignTemplateToDay(dayKey, templateKey) {
  if (!hypertrophyCatalog[templateKey]) {
    templateKey = 'descanso';
  }
  plannerAssignments[dayKey] = templateKey;
  plannerActivePalette = templateKey;
  plannerSelectedDay = dayKey;
  updatePlannerGrid();
  updatePlannerDetails();
  updatePlannerActions();
  updatePaletteSelection();
}

function handlePlannerDragStart(event) {
  const template = event.currentTarget?.dataset?.template;
  if (!template) return;
  plannerDragData = {
    template,
    sourceDay: event.currentTarget.dataset.day || '',
    fromPalette: event.currentTarget.classList.contains('planner-block--palette')
  };
  plannerActivePalette = template;
  updatePaletteSelection();
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', template);
  }
}

function handlePlannerDragEnd() {
  plannerDragData = null;
}

function handlePlannerDragOver(event) {
  if (!plannerDragData) return;
  event.preventDefault();
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move';
  }
}

function handlePlannerDragEnter(event) {
  if (!plannerDragData) return;
  event.currentTarget.classList.add('is-over');
}

function handlePlannerDragLeave(event) {
  event.currentTarget.classList.remove('is-over');
}

function handlePlannerDrop(event) {
  if (!plannerDragData) return;
  event.preventDefault();
  const dayKey = event.currentTarget.dataset.day;
  if (!dayKey) return;
  const targetTemplate = plannerAssignments[dayKey] || 'descanso';
  const { template, sourceDay, fromPalette } = plannerDragData;
  if (sourceDay && sourceDay !== dayKey && !fromPalette) {
    plannerAssignments[sourceDay] = targetTemplate;
  }
  assignTemplateToDay(dayKey, template);
  event.currentTarget.classList.remove('is-over');
  plannerDragData = null;
}

function buildPlannerGrid() {
  if (!plannerGrid) return;
  plannerGrid.innerHTML = '';
  plannerDayOrder.forEach((dayKey) => {
    const dayCard = document.createElement('article');
    dayCard.className = 'planner-day card';
    dayCard.dataset.day = dayKey;
    dayCard.innerHTML = `
      <header class="planner-day__header">
        <span class="planner-day__label">${escapeHTML(weekDayLabels[dayKey] || dayKey)}</span>
      </header>
      <div class="planner-day__body">
        <div
          class="planner-slot"
          data-slot-day="${dayKey}"
          data-day="${dayKey}"
          role="button"
          tabindex="0"
          aria-label="Configurar ${escapeHTML(weekDayLabels[dayKey] || dayKey)}"
        ></div>
        <p class="planner-day__summary" data-summary-day="${dayKey}"></p>
      </div>
    `;
    const slot = dayCard.querySelector('.planner-slot');
    if (slot) {
      slot.addEventListener('click', () => {
        setSelectedDay(dayKey);
        if (plannerActivePalette) {
          assignTemplateToDay(dayKey, plannerActivePalette);
        }
      });
      slot.addEventListener('focus', () => {
        setSelectedDay(dayKey);
      });
      slot.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          assignTemplateToDay(dayKey, plannerActivePalette || plannerAssignments[dayKey]);
        }
      });
      slot.addEventListener('dragover', handlePlannerDragOver);
      slot.addEventListener('dragenter', handlePlannerDragEnter);
      slot.addEventListener('dragleave', handlePlannerDragLeave);
      slot.addEventListener('drop', handlePlannerDrop);
    }
    plannerGrid.append(dayCard);
  });
  updatePlannerGrid();
}

function resetPlanner() {
  plannerAssignments = { ...plannerInitialAssignments };
  plannerActivePalette = plannerAssignments[plannerSelectedDay] || plannerActivePalette || 'descanso';
  updatePlannerGrid();
  updatePlannerDetails();
  updatePlannerActions();
  updatePaletteSelection();
}

function savePlanner() {
  const user = trainingPlans[defaultAthleteKey];
  if (!user || !user.routine) return;
  const hadChanges = plannerHasPendingChanges();
  plannerDayOrder.forEach((dayKey) => {
    const templateKey = plannerAssignments[dayKey] || 'descanso';
    const plan = user.routine[dayKey];
    const currentTemplate = inferTemplateFromPlan(plan);
    if (currentTemplate === templateKey && plan) {
      plan.template = templateKey;
      return;
    }
    user.routine[dayKey] = createPlan(templateKey);
  });
  persistTrainingPlans();
  const feedbackMessage = hadChanges
    ? 'Configurações salvas! Seu calendário de hipertrofia foi atualizado.'
    : 'Nenhuma alteração detectada, sua rotina permanece a mesma.';
  writeStorage(STORAGE_KEYS.flashMessage, feedbackMessage);
  window.location.href = 'index.html';
}

function preparePlanner() {
  if (!plannerGrid || !plannerPalette) return;
  initialisePlannerAssignments();
  buildPlannerGrid();
  updatePlannerDetails();
  updatePlannerActions();
  const paletteOptions = plannerPalette.querySelectorAll('[data-template]');
  paletteOptions.forEach((option) => {
    option.addEventListener('dragstart', handlePlannerDragStart);
    option.addEventListener('dragend', handlePlannerDragEnd);
    option.addEventListener('click', () => {
      const templateKey = option.dataset.template;
      if (!templateKey) return;
      plannerActivePalette = templateKey;
      updatePaletteSelection();
      assignTemplateToDay(plannerSelectedDay, templateKey);
    });
    option.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const templateKey = option.dataset.template;
        if (!templateKey) return;
        plannerActivePalette = templateKey;
        updatePaletteSelection();
        assignTemplateToDay(plannerSelectedDay, templateKey);
      }
    });
  });
  updatePaletteSelection();
  if (plannerResetButton) {
    plannerResetButton.addEventListener('click', (event) => {
      event.preventDefault();
      resetPlanner();
    });
  }
  if (plannerSaveButton) {
    plannerSaveButton.addEventListener('click', (event) => {
      event.preventDefault();
      savePlanner();
    });
  }
}

preparePlanner();

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
  if (!communityFeed) {
    squadChatInput.focus();
  }
}

renderDailyTrainingCard();
toggleAdminSections();

const isAdminView = Boolean(adminLoginSection || adminPanel);
if (isAdminView) {
  if (isAdminAuthenticated) {
    prepareAdminPanel();
    if (adminUserSelect instanceof HTMLElement) {
      adminUserSelect.focus();
    }
  } else if (adminLoginForm) {
    const loginField = adminLoginForm.elements['login'];
    if (loginField instanceof HTMLElement) {
      loginField.focus();
    }
  }
}

if (adminLoginForm) {
  adminLoginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const loginValue = adminLoginForm.elements['login']?.value?.trim() || '';
    const passwordValue = adminLoginForm.elements['password']?.value || '';
    if (loginValue === adminCredentials.login && passwordValue === adminCredentials.password) {
      isAdminAuthenticated = true;
      adminLoginForm.reset();
      toggleAdminSections();
      prepareAdminPanel();
      if (adminUserSelect instanceof HTMLElement) {
        adminUserSelect.focus();
      }
    } else if (adminLoginFeedback) {
      adminLoginFeedback.textContent = 'Credenciais inválidas. Verifique usuário e senha.';
    }
  });

  adminLoginForm.addEventListener('input', () => {
    if (adminLoginFeedback) {
      adminLoginFeedback.textContent = '';
    }
  });
}

if (adminUserIdButton && adminUserIdInput) {
  const triggerLookup = () => {
    const rawValue = adminUserIdInput.value.trim();
    if (!rawValue) {
      if (adminUserIdFeedback) {
        adminUserIdFeedback.textContent = 'Informe um ID válido.';
      }
      return;
    }
    if (!isAdminAuthenticated) {
      if (adminUserIdFeedback) {
        adminUserIdFeedback.textContent = 'Faça login para buscar um ID.';
      }
      return;
    }
    const success = setAdminUserById(rawValue);
    if (success && adminUserIdInput) {
      adminUserIdInput.value = '';
    }
  };
  adminUserIdButton.addEventListener('click', () => {
    triggerLookup();
  });
  adminUserIdInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      triggerLookup();
    }
  });
  adminUserIdInput.addEventListener('input', () => {
    if (adminUserIdFeedback) {
      adminUserIdFeedback.textContent = '';
    }
  });
}

if (adminUserSelect) {
  adminUserSelect.addEventListener('change', (event) => {
    selectedAdminUser = event.target.value;
    if (!trainingPlans[selectedAdminUser]) {
      selectedAdminUser = Object.keys(trainingPlans)[0] || '';
    }
    fillAdminForm();
    renderAdminPreview();
    if (adminUserIdFeedback) {
      adminUserIdFeedback.textContent = '';
    }
    if (adminUserIdInput) {
      adminUserIdInput.value = '';
    }
  });
}

if (adminDaySelect) {
  adminDaySelect.addEventListener('change', (event) => {
    const value = event.target.value;
    selectedAdminDay = adminDayOrder.includes(value) ? value : adminDayOrder[0];
    fillAdminForm();
    renderAdminPreview();
  });
}

if (adminUpdateForm) {
  adminUpdateForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!isAdminAuthenticated) {
      if (adminUpdateFeedback) {
        adminUpdateFeedback.textContent = 'Faça login para salvar alterações.';
      }
      return;
    }
    const plan = getOrCreatePlan(selectedAdminUser, selectedAdminDay);
    if (!plan) return;
    const focusValue = adminFocusInput?.value?.trim() || defaultPlanTemplate.focus;
    const summaryValue = adminInstructionInput?.value?.trim() || defaultPlanTemplate.summary;
    const durationValue = adminDurationInput?.value?.trim() || defaultPlanTemplate.duration;
    const caloriesValue = adminCaloriesInput?.value?.trim() || defaultPlanTemplate.calories;
    const videoValue = normaliseVideoUrl(adminVideoInput?.value || '');
    const exercisesValue = parseExerciseLines(adminExercisesInput?.value || '');
    plan.focus = focusValue;
    plan.summary = summaryValue;
    plan.duration = durationValue;
    plan.calories = caloriesValue;
    plan.video = videoValue;
    plan.exercises = exercisesValue;
    persistTrainingPlans();
    if (adminUpdateFeedback) {
      adminUpdateFeedback.textContent = 'Plano atualizado com sucesso!';
    }
    renderAdminPreview();
    if (selectedAdminUser === defaultAthleteKey && selectedAdminDay === getCurrentDayKey()) {
      renderDailyTrainingCard();
    }
  });

  adminUpdateForm.addEventListener('input', () => {
    if (adminUpdateFeedback) {
      adminUpdateFeedback.textContent = '';
    }
  });
}

applyFeedFilters();
updateBadgeSelections();
updateQuestMessage();
updateTrendFilterUI();
