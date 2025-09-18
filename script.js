const appRoot = document.querySelector('.app');
const screens = document.querySelectorAll('.screen');
const navButtons = document.querySelectorAll('.tabbar__item');

const STORAGE_KEYS = {
  trainingPlans: 'machoTrainingPlans',
  trendFilters: 'machoTrendFilters'
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

const defaultPlanTemplate = {
  focus: 'Treino personalizado',
  summary: 'Descreva o objetivo do dia com orientações simples e linguagem acessível.',
  duration: '30 min',
  calories: '300 kcal',
  video: '',
  exercises: []
};

const trainingPlans = {
  voce: {
    name: 'Você',
    routine: {
      segunda: {
        focus: 'Base estável de pernas',
        summary: 'Primeiro contato com agachamentos usando apoio para garantir segurança do movimento.',
        duration: '35 min',
        calories: '320 kcal',
        video: 'https://www.youtube.com/embed/VHyGqsPOUHs',
        exercises: [
          { name: 'Agachamento assistido', detail: '3 séries de 12 repetições com apoio em cadeira' },
          { name: 'Elevação de calcanhar encostado na parede', detail: '2 séries de 15 repetições' },
          { name: 'Passada estacionária lenta', detail: '2 séries de 10 passos por perna' }
        ]
      },
      terca: {
        focus: 'Mobilidade tranquila',
        summary: 'Sequência suave para soltar quadris, ombros e coluna, ideal para dias de descanso ativo.',
        duration: '25 min',
        calories: '180 kcal',
        video: 'https://www.youtube.com/embed/UoC_O3HzsH0',
        exercises: [
          { name: 'Gato e vaca no solo', detail: '2 minutos com respiração controlada' },
          { name: 'Alongamento de flexor de quadril', detail: '2 séries de 30 segundos por lado' },
          { name: 'Rotação de ombros com toalha', detail: '2 séries de 12 repetições' }
        ]
      },
      quarta: {
        focus: 'Circuito leve de corpo inteiro',
        summary: 'Movimentos simples para elevar a frequência cardíaca de forma controlada.',
        duration: '28 min',
        calories: '260 kcal',
        video: 'https://www.youtube.com/embed/ml6cT4AZdqI',
        exercises: [
          { name: 'Polichinelo moderado', detail: '3 blocos de 40 segundos' },
          { name: 'Remada com elástico ou mochila', detail: '3 séries de 12 repetições' },
          { name: 'Prancha de joelhos', detail: '3 séries de 30 segundos' }
        ]
      },
      quinta: {
        focus: 'Postura e core consciente',
        summary: 'Exercícios lentos para fortalecer a região central e alinhar a postura.',
        duration: '22 min',
        calories: '190 kcal',
        video: 'https://www.youtube.com/embed/50kH47ZztHs',
        exercises: [
          { name: 'Respiração diafragmática deitada', detail: '3 ciclos de 1 minuto' },
          { name: 'Dead bug com apoio de almofada', detail: '3 séries de 10 repetições' },
          { name: 'Prancha lateral com joelho apoiado', detail: '2 séries de 20 segundos por lado' }
        ]
      },
      sexta: {
        focus: 'Força com peso corporal',
        summary: 'Sequência progressiva utilizando apenas o peso do corpo para ganhar confiança.',
        duration: '32 min',
        calories: '310 kcal',
        video: 'https://www.youtube.com/embed/VHyGqsPOUHs',
        exercises: [
          { name: 'Flexão inclinada em mesa', detail: '3 séries de 10 repetições' },
          { name: 'Ponte de glúteo', detail: '3 séries de 15 repetições' },
          { name: 'Agachamento sumô lento', detail: '3 séries de 12 repetições' }
        ]
      },
      sabado: {
        focus: 'Recuperação ativa completa',
        summary: 'Rotina relaxante para regenerar músculos e mente após a semana.',
        duration: '20 min',
        calories: '160 kcal',
        video: 'https://www.youtube.com/embed/UoC_O3HzsH0',
        exercises: [
          { name: 'Mobilidade de tornozelo na parede', detail: '2 séries de 10 repetições por lado' },
          { name: 'Alongamento de cadeia posterior com faixa', detail: '2 séries de 45 segundos' },
          { name: 'Respiração box sentada', detail: '4 ciclos de 4 segundos' }
        ]
      },
      domingo: {
        focus: 'Mindset e respiração guiada',
        summary: 'Finalize a semana com foco mental, visualização e respiração consciente.',
        duration: '18 min',
        calories: '120 kcal',
        video: 'https://www.youtube.com/embed/4pKly2JojMw',
        exercises: [
          { name: 'Respiração box guiada', detail: '5 ciclos completos' },
          { name: 'Visualização de metas', detail: '5 minutos anotando sensações' },
          { name: 'Alongamento cervical suave', detail: '2 séries de 30 segundos por lado' }
        ]
      }
    }
  },
  ana: {
    name: 'Ana Torres',
    routine: {
      segunda: {
        focus: 'Funcional com apoio leve',
        summary: 'Circuito introdutório com garrafas de água para ganhar resistência de forma segura.',
        duration: '30 min',
        calories: '280 kcal',
        video: 'https://www.youtube.com/embed/50kH47ZztHs',
        exercises: [
          { name: 'Agachamento com garrafa', detail: '3 séries de 12 repetições' },
          { name: 'Remada curvada com mochila', detail: '3 séries de 10 repetições' },
          { name: 'Prancha alta com joelho apoiado', detail: '3 séries de 20 segundos' }
        ]
      },
      terca: {
        focus: 'Cardio dançante leve',
        summary: 'Movimentos ritmados para elevar energia sem exigir coordenação avançada.',
        duration: '25 min',
        calories: '240 kcal',
        video: 'https://www.youtube.com/embed/ml6cT4AZdqI',
        exercises: [
          { name: 'Passos laterais com braço', detail: '3 blocos de 45 segundos' },
          { name: 'Giro de tronco controlado', detail: '3 séries de 12 repetições' },
          { name: 'Deslocamento frontal e voltar', detail: '3 séries de 30 segundos' }
        ]
      },
      quarta: {
        focus: 'Força superior consciente',
        summary: 'Exercícios simples para ombros e costas usando resistência moderada.',
        duration: '28 min',
        calories: '260 kcal',
        video: 'https://www.youtube.com/embed/VHyGqsPOUHs',
        exercises: [
          { name: 'Elevação lateral com garrafas', detail: '3 séries de 12 repetições' },
          { name: 'Tríceps testa com elástico', detail: '3 séries de 10 repetições' },
          { name: 'Prancha de antebraço', detail: '3 séries de 25 segundos' }
        ]
      },
      quinta: {
        focus: 'Yoga restaurativa guiada',
        summary: 'Sessão calma para relaxar lombar e ombros com foco na respiração.',
        duration: '24 min',
        calories: '170 kcal',
        video: 'https://www.youtube.com/embed/UoC_O3HzsH0',
        exercises: [
          { name: 'Cachorro olhando para baixo adaptado', detail: '3 séries de 30 segundos' },
          { name: 'Postura da criança com alongamento lateral', detail: '3 ciclos de 40 segundos' },
          { name: 'Torção suave deitado', detail: '2 séries de 45 segundos por lado' }
        ]
      },
      sexta: {
        focus: 'HIIT moderado guiado',
        summary: 'Intervalos curtos com intensidade controlada para quem já tem alguma experiência.',
        duration: '30 min',
        calories: '320 kcal',
        video: 'https://www.youtube.com/embed/ml6cT4AZdqI',
        exercises: [
          { name: 'Corrida estacionária', detail: '4 blocos de 30 segundos' },
          { name: 'Agachamento com salto leve', detail: '3 séries de 12 repetições' },
          { name: 'Prancha escalador controlada', detail: '3 séries de 30 segundos' }
        ]
      },
      sabado: {
        focus: 'Core e estabilidade',
        summary: 'Trabalhe o centro do corpo com movimentos conscientes e apoio de colchonete.',
        duration: '26 min',
        calories: '240 kcal',
        video: 'https://www.youtube.com/embed/50kH47ZztHs',
        exercises: [
          { name: 'Prancha com toque de ombro', detail: '3 séries de 10 repetições por lado' },
          { name: 'Abdominal bicicleta controlado', detail: '3 séries de 16 repetições' },
          { name: 'Elevação de quadril unilateral', detail: '3 séries de 12 repetições por lado' }
        ]
      },
      domingo: {
        focus: 'Caminhada guiada e alongamento',
        summary: 'Planejamento de caminhada leve com fechamento em alongamentos simples.',
        duration: '35 min',
        calories: '250 kcal',
        video: 'https://www.youtube.com/embed/UoC_O3HzsH0',
        exercises: [
          { name: 'Caminhada consciente', detail: '20 minutos em ritmo confortável' },
          { name: 'Alongamento de panturrilha na parede', detail: '2 séries de 30 segundos por lado' },
          { name: 'Respiração profunda sentada', detail: '5 ciclos completos' }
        ]
      }
    }
  },
  carlos: {
    name: 'Carlos Lima',
    routine: {
      segunda: {
        focus: 'Força funcional básica',
        summary: 'Comece a semana reforçando membros inferiores e postura com apoio de cadeira.',
        duration: '32 min',
        calories: '300 kcal',
        video: 'https://www.youtube.com/embed/VHyGqsPOUHs',
        exercises: [
          { name: 'Agachamento na cadeira', detail: '3 séries de 15 repetições' },
          { name: 'Avanço estático com apoio', detail: '3 séries de 10 repetições por perna' },
          { name: 'Prancha no sofá', detail: '3 séries de 25 segundos' }
        ]
      },
      terca: {
        focus: 'Mobilidade de ombro e coluna',
        summary: 'Solte tensões com movimentos circulares e respiração guiada.',
        duration: '20 min',
        calories: '150 kcal',
        video: 'https://www.youtube.com/embed/UoC_O3HzsH0',
        exercises: [
          { name: 'Círculo de ombros com bastão', detail: '3 séries de 12 repetições' },
          { name: 'Torção torácica sentado', detail: '3 séries de 8 repetições por lado' },
          { name: 'Respiração 4-4-4-4', detail: '5 ciclos completos' }
        ]
      },
      quarta: {
        focus: 'Cardio acessível',
        summary: 'Intervalos de intensidade baixa a moderada que cabem na pausa do almoço.',
        duration: '27 min',
        calories: '240 kcal',
        video: 'https://www.youtube.com/embed/ml6cT4AZdqI',
        exercises: [
          { name: 'Marcha com joelhos altos', detail: '4 blocos de 40 segundos' },
          { name: 'Shadow boxing leve', detail: '3 séries de 45 segundos' },
          { name: 'Burpee sem salto', detail: '3 séries de 8 repetições' }
        ]
      },
      quinta: {
        focus: 'Estabilidade de core',
        summary: 'Sequência para fortalecer abdômen e lombar com movimentos controlados.',
        duration: '24 min',
        calories: '210 kcal',
        video: 'https://www.youtube.com/embed/50kH47ZztHs',
        exercises: [
          { name: 'Prancha com apoio nos antebraços', detail: '3 séries de 30 segundos' },
          { name: 'Superman alternado', detail: '3 séries de 12 repetições' },
          { name: 'Prancha lateral com apoio de joelho', detail: '2 séries de 20 segundos por lado' }
        ]
      },
      sexta: {
        focus: 'Treino combinado força + cardio',
        summary: 'Blocos curtos que alternam resistência e ritmo para fechar a semana em alta.',
        duration: '30 min',
        calories: '320 kcal',
        video: 'https://www.youtube.com/embed/VHyGqsPOUHs',
        exercises: [
          { name: 'Agachamento com joelho alto', detail: '3 séries de 12 repetições' },
          { name: 'Flexão inclinada', detail: '3 séries de 10 repetições' },
          { name: 'Polichinelo com braço cruzado', detail: '3 séries de 40 segundos' }
        ]
      },
      sabado: {
        focus: 'Alongamento completo',
        summary: 'Tempo para relaxar musculatura posterior e quadris com apoio de tapete.',
        duration: '22 min',
        calories: '170 kcal',
        video: 'https://www.youtube.com/embed/UoC_O3HzsH0',
        exercises: [
          { name: 'Alongamento borboleta', detail: '3 séries de 40 segundos' },
          { name: 'Postura do pombo adaptada', detail: '2 séries de 40 segundos por lado' },
          { name: 'Respiração profunda deitada', detail: '4 ciclos de 1 minuto' }
        ]
      },
      domingo: {
        focus: 'Planejamento da nova semana',
        summary: 'Revise metas, caminhe leve e prepare o corpo para o próximo ciclo.',
        duration: '30 min',
        calories: '200 kcal',
        video: 'https://www.youtube.com/embed/4pKly2JojMw',
        exercises: [
          { name: 'Caminhada consciente', detail: '15 minutos em ritmo relaxado' },
          { name: 'Alongamento de peitoral na parede', detail: '2 séries de 30 segundos por lado' },
          { name: 'Anotações de progresso', detail: '5 minutos refletindo sobre aprendizados' }
        ]
      }
    }
  }
};

function normaliseExercises(exercises = []) {
  if (!Array.isArray(exercises)) return [];
  return exercises
    .map((exercise) => {
      if (!exercise || typeof exercise !== 'object') return null;
      const name = String(exercise.name || '').trim();
      const detail = String(exercise.detail || '').trim();
      return {
        name: name || 'Exercício guiado',
        detail: detail || 'Repetições livres'
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
        exercises: normaliseExercises(planValue.exercises)
      };
    });
  });
}

function restoreTrainingPlansFromStorage() {
  const saved = readStorage(STORAGE_KEYS.trainingPlans, null);
  if (!saved || typeof saved !== 'object') return;
  mergeTrainingPlans(trainingPlans, saved);
}

function persistTrainingPlans() {
  writeStorage(STORAGE_KEYS.trainingPlans, trainingPlans);
}

restoreTrainingPlansFromStorage();

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
    user.routine[dayKey] = { ...defaultPlanTemplate };
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
      const parts = line.split(/[-–—|]/);
      const name = parts.shift() || line;
      const detail = parts.join(' - ').trim();
      return {
        name: name.trim(),
        detail: detail || 'Repetições livres'
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
      .map((exercise) => `${exercise.name} - ${exercise.detail}`)
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
        <span>
          ${escapeHTML(exercise.name)}
          <span class="checklist__detail">${escapeHTML(exercise.detail)}</span>
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

if (adminUserSelect) {
  adminUserSelect.addEventListener('change', (event) => {
    selectedAdminUser = event.target.value;
    if (!trainingPlans[selectedAdminUser]) {
      selectedAdminUser = Object.keys(trainingPlans)[0] || '';
    }
    fillAdminForm();
    renderAdminPreview();
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
