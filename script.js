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
const profileId = document.getElementById('profileId');
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
  focus: 'Sessão de hipertrofia personalizada',
  summary: 'Defina o grupamento muscular, cadência e carga sugerida para potencializar o ganho de massa.',
  duration: '45 min',
  calories: '420 kcal',
  video: '',
  exercises: []
};

const trainingPlans = {
  voce: {
    id: 'MM-001',
    name: 'Você',
    routine: {
      segunda: {
        focus: 'Peito e tríceps para hipertrofia',
        summary: 'Trabalhe supinos e isoladores com cadência controlada para maximizar a tensão mecânica.',
        duration: '45 min',
        calories: '420 kcal',
        video: 'https://www.youtube.com/embed/m8K3b0UpwOQ',
        exercises: [
          { name: 'Supino reto com halteres', detail: '4 séries de 8-10 repetições' },
          { name: 'Crucifixo inclinado', detail: '3 séries de 12 repetições' },
          { name: 'Mergulho no banco', detail: '3 séries de 10-12 repetições' },
          { name: 'Tríceps francês com halteres', detail: '3 séries de 12 repetições' }
        ]
      },
      terca: {
        focus: 'Costas e bíceps em tempo sob tensão',
        summary: 'Remadas horizontais e puxadas com pausa isométrica para ativar dorsais sem perder postura.',
        duration: '46 min',
        calories: '400 kcal',
        video: 'https://www.youtube.com/embed/Ob5Avzkdxl0',
        exercises: [
          { name: 'Remada curvada com barra', detail: '4 séries de 8-10 repetições' },
          { name: 'Puxada aberta na polia', detail: '3 séries de 10-12 repetições' },
          { name: 'Remada unilateral com halter', detail: '3 séries de 12 repetições por lado' },
          { name: 'Rosca direta com barra W', detail: '3 séries de 10-12 repetições' }
        ]
      },
      quarta: {
        focus: 'Pernas focadas em quadríceps',
        summary: 'Agachamentos controlados combinados com isoladores para estimular o quadríceps em diferentes ângulos.',
        duration: '48 min',
        calories: '450 kcal',
        video: 'https://www.youtube.com/embed/COd4IITZ1wk',
        exercises: [
          { name: 'Agachamento livre', detail: '4 séries de 8-10 repetições' },
          { name: 'Leg press 45°', detail: '3 séries de 12 repetições' },
          { name: 'Avanço caminhando', detail: '3 séries de 12 passos por perna' },
          { name: 'Extensora unilateral', detail: '3 séries de 12-15 repetições' }
        ]
      },
      quinta: {
        focus: 'Ombros e trapézio com ênfase em volume',
        summary: 'Use variações de desenvolvimento e elevações laterais para preencher a parte superior.',
        duration: '42 min',
        calories: '360 kcal',
        video: 'https://www.youtube.com/embed/5sGOlKn-IxI',
        exercises: [
          { name: 'Desenvolvimento com halteres', detail: '4 séries de 8-10 repetições' },
          { name: 'Elevação lateral em pé', detail: '3 séries de 12-15 repetições' },
          { name: 'Remada alta com barra', detail: '3 séries de 10-12 repetições' },
          { name: 'Face pull com elástico', detail: '3 séries de 15 repetições' }
        ]
      },
      sexta: {
        focus: 'Posterior de coxa e glúteos',
        summary: 'Enfatize a fase excêntrica em movimentos de hinge para recrutar posteriores e glúteos.',
        duration: '47 min',
        calories: '430 kcal',
        video: 'https://www.youtube.com/embed/3i7iI-yRzyc',
        exercises: [
          { name: 'Levantamento romeno com halteres', detail: '4 séries de 8-10 repetições' },
          { name: 'Mesa flexora ou flexão nórdica assistida', detail: '3 séries de 10-12 repetições' },
          { name: 'Elevação de quadril com barra', detail: '4 séries de 12 repetições' },
          { name: 'Abdução de quadril em polia ou miniband', detail: '3 séries de 15 repetições' }
        ]
      },
      sabado: {
        focus: 'Braços com técnicas de pico de contração',
        summary: 'Superséries de bíceps e tríceps para manter congestionamento e sensação de pump.',
        duration: '40 min',
        calories: '330 kcal',
        video: 'https://www.youtube.com/embed/Xfx6tDr7guo',
        exercises: [
          { name: 'Rosca alternada com giro', detail: '3 séries de 12 repetições' },
          { name: 'Rosca martelo no banco inclinado', detail: '3 séries de 10-12 repetições' },
          { name: 'Tríceps testa com barra', detail: '3 séries de 10-12 repetições' },
          { name: 'Tríceps na corda com pausa', detail: '3 séries de 12-15 repetições' }
        ]
      },
      domingo: {
        focus: 'Recuperação ativa e mobilidade para hipertrofia',
        summary: 'Descarregue a musculatura com mobilidade específica e respiração profunda.',
        duration: '30 min',
        calories: '220 kcal',
        video: 'https://www.youtube.com/embed/w0l9F9lYGDI',
        exercises: [
          { name: 'Alongamento de peitoral com apoio', detail: '3 séries de 40 segundos por lado' },
          { name: 'Mobilidade torácica com foam roller', detail: '3 séries de 12 repetições' },
          { name: 'Relaxamento de quadril com 90/90', detail: '3 séries de 45 segundos por lado' },
          { name: 'Respiração diafragmática guiada', detail: '5 ciclos de 1 minuto' }
        ]
      }
    }
  },
  ana: {
    id: 'MM-204',
    name: 'Ana Torres',
    routine: {
      segunda: {
        focus: 'Peito e tríceps com estabilidade',
        summary: 'Combine halteres leves e cadência lenta para sentir o peitoral trabalhando sem perder postura.',
        duration: '42 min',
        calories: '360 kcal',
        video: 'https://www.youtube.com/embed/AV6wQK1WyPM',
        exercises: [
          { name: 'Supino reto com halteres', detail: '4 séries de 10-12 repetições' },
          { name: 'Crucifixo com elástico', detail: '3 séries de 15 repetições controladas' },
          { name: 'Flexão inclinada apoiada', detail: '3 séries de 12 repetições' },
          { name: 'Tríceps testa com halteres', detail: '3 séries de 12 repetições' }
        ]
      },
      terca: {
        focus: 'Costas e bíceps com foco em postura',
        summary: 'Remadas sentadas e unilaterais com tempo sob tensão para ativar dorsais sem sobrecarregar a lombar.',
        duration: '44 min',
        calories: '370 kcal',
        video: 'https://www.youtube.com/embed/Ob5Avzkdxl0',
        exercises: [
          { name: 'Puxada frente com triângulo', detail: '4 séries de 10-12 repetições' },
          { name: 'Remada baixa no cabo', detail: '3 séries de 12 repetições' },
          { name: 'Remada unilateral com apoio', detail: '3 séries de 12 repetições por lado' },
          { name: 'Rosca direta na polia', detail: '3 séries de 12 repetições' }
        ]
      },
      quarta: {
        focus: 'Pernas e glúteos para volume',
        summary: 'Estruture a sessão com agachamentos guiados e ênfase na subida explosiva.',
        duration: '48 min',
        calories: '430 kcal',
        video: 'https://www.youtube.com/embed/COd4IITZ1wk',
        exercises: [
          { name: 'Agachamento no smith', detail: '4 séries de 10 repetições' },
          { name: 'Passada no step', detail: '3 séries de 12 repetições por perna' },
          { name: 'Cadeira abdutora', detail: '3 séries de 15 repetições' },
          { name: 'Elevação de quadril com miniband', detail: '3 séries de 15 repetições' }
        ]
      },
      quinta: {
        focus: 'Ombros e deltoides definidos',
        summary: 'Variações de elevação e desenvolvimento alternando ângulos para preencher os deltoides.',
        duration: '40 min',
        calories: '320 kcal',
        video: 'https://www.youtube.com/embed/5sGOlKn-IxI',
        exercises: [
          { name: 'Desenvolvimento arnold', detail: '3 séries de 10-12 repetições' },
          { name: 'Elevação lateral sentada', detail: '3 séries de 15 repetições' },
          { name: 'Elevação frontal com disco', detail: '3 séries de 12 repetições' },
          { name: 'Encolhimento com halteres', detail: '3 séries de 15 repetições' }
        ]
      },
      sexta: {
        focus: 'Posterior e glúteos concentrados',
        summary: 'Mantenha a cadência lenta na fase excêntrica para sentir a contração máxima.',
        duration: '45 min',
        calories: '380 kcal',
        video: 'https://www.youtube.com/embed/3i7iI-yRzyc',
        exercises: [
          { name: 'Stiff com halteres', detail: '4 séries de 10-12 repetições' },
          { name: 'Glúteo quatro apoios com caneleira', detail: '3 séries de 15 repetições por perna' },
          { name: 'Mesa flexora alternada', detail: '3 séries de 12 repetições' },
          { name: 'Abdução em pé na polia', detail: '3 séries de 15 repetições por lado' }
        ]
      },
      sabado: {
        focus: 'Braços e core com ênfase em pump',
        summary: 'Superséries de bíceps, tríceps e pranchas para finalizar a semana energizada.',
        duration: '38 min',
        calories: '300 kcal',
        video: 'https://www.youtube.com/embed/Xfx6tDr7guo',
        exercises: [
          { name: 'Rosca alternada com halteres', detail: '3 séries de 12 repetições' },
          { name: 'Rosca concentrada no banco', detail: '3 séries de 12 repetições por braço' },
          { name: 'Tríceps na corda', detail: '3 séries de 15 repetições' },
          { name: 'Prancha com toque no ombro', detail: '3 séries de 20 repetições alternadas' }
        ]
      },
      domingo: {
        focus: 'Mobilidade guiada e descarrego',
        summary: 'Use alongamentos ativos para acelerar a recuperação e preparar a próxima semana.',
        duration: '28 min',
        calories: '200 kcal',
        video: 'https://www.youtube.com/embed/w0l9F9lYGDI',
        exercises: [
          { name: 'Alongamento de dorsal em banco', detail: '3 séries de 40 segundos' },
          { name: 'Liberação de glúteo com bola', detail: '3 séries de 30 segundos por lado' },
          { name: 'Cadeia posterior em PNF', detail: '3 séries de 45 segundos' },
          { name: 'Respiração 4-7-8', detail: '4 ciclos completos' }
        ]
      }
    }
  },
  carlos: {
    id: 'MM-418',
    name: 'Carlos Lima',
    routine: {
      segunda: {
        focus: 'Peito pesado com pré-exaustão',
        summary: 'Abra a semana com movimentos compostos seguidos de isoladores para congestionar o peitoral.',
        duration: '50 min',
        calories: '480 kcal',
        video: 'https://www.youtube.com/embed/m8K3b0UpwOQ',
        exercises: [
          { name: 'Supino reto com barra', detail: '4 séries de 6-8 repetições' },
          { name: 'Supino inclinado com halteres', detail: '4 séries de 8-10 repetições' },
          { name: 'Crucifixo no crossover', detail: '3 séries de 12-15 repetições' },
          { name: 'Tríceps mergulho nas paralelas', detail: '3 séries até a falha técnica' }
        ]
      },
      terca: {
        focus: 'Costas densas e bíceps fortes',
        summary: 'Remadas pesadas e puxadas neutras para aumentar densidade e largura dorsal.',
        duration: '52 min',
        calories: '460 kcal',
        video: 'https://www.youtube.com/embed/Ob5Avzkdxl0',
        exercises: [
          { name: 'Barra fixa com sobrecarga', detail: '4 séries de 6-8 repetições' },
          { name: 'Remada curvada pronada', detail: '4 séries de 8-10 repetições' },
          { name: 'Pulldown neutro com pausa', detail: '3 séries de 12 repetições' },
          { name: 'Rosca direta pesada', detail: '3 séries de 8-10 repetições' }
        ]
      },
      quarta: {
        focus: 'Pernas completas com foco em força',
        summary: 'Volume alto com ênfase em compostos para gerar estímulo máximo em quadríceps e glúteos.',
        duration: '55 min',
        calories: '520 kcal',
        video: 'https://www.youtube.com/embed/COd4IITZ1wk',
        exercises: [
          { name: 'Agachamento livre pesado', detail: '5 séries de 6-8 repetições' },
          { name: 'Leg press unilateral', detail: '4 séries de 10 repetições por perna' },
          { name: 'Hack machine', detail: '3 séries de 10-12 repetições' },
          { name: 'Afundo búlgaro com halteres', detail: '3 séries de 12 repetições por perna' }
        ]
      },
      quinta: {
        focus: 'Ombros 3D e trapézio ativo',
        summary: 'Alternância entre desenvolvimentos, elevações e remadas altas para destacar os deltoides.',
        duration: '44 min',
        calories: '360 kcal',
        video: 'https://www.youtube.com/embed/5sGOlKn-IxI',
        exercises: [
          { name: 'Desenvolvimento militar com barra', detail: '4 séries de 6-8 repetições' },
          { name: 'Elevação lateral na máquina', detail: '4 séries de 12-15 repetições' },
          { name: 'Face pull pesado', detail: '3 séries de 15 repetições' },
          { name: 'Encolhimento com barra', detail: '4 séries de 12 repetições' }
        ]
      },
      sexta: {
        focus: 'Posterior dominante com cargas altas',
        summary: 'Movimentos de hinge e flexão combinados para consolidar posteriores de coxa e glúteos.',
        duration: '50 min',
        calories: '440 kcal',
        video: 'https://www.youtube.com/embed/3i7iI-yRzyc',
        exercises: [
          { name: 'Levantamento terra romeno', detail: '4 séries de 8 repetições' },
          { name: 'Mesa flexora bilateral', detail: '4 séries de 10-12 repetições' },
          { name: 'Glúteo máquina 45°', detail: '3 séries de 12 repetições' },
          { name: 'Good morning com barra', detail: '3 séries de 10 repetições' }
        ]
      },
      sabado: {
        focus: 'Braços volumosos e antebraço forte',
        summary: 'Estruture superséries entre bíceps e tríceps para manter o pump até o final.',
        duration: '42 min',
        calories: '340 kcal',
        video: 'https://www.youtube.com/embed/Xfx6tDr7guo',
        exercises: [
          { name: 'Rosca scott', detail: '4 séries de 8-10 repetições' },
          { name: 'Rosca martelo cruzada', detail: '3 séries de 12 repetições' },
          { name: 'Tríceps testa com corda', detail: '4 séries de 10-12 repetições' },
          { name: 'Tríceps coice com halter', detail: '3 séries de 12 repetições por braço' }
        ]
      },
      domingo: {
        focus: 'Recuperação ativa estruturada',
        summary: 'Ative a circulação e alivie tensões com mobilidade guiada e respiração consciente.',
        duration: '32 min',
        calories: '230 kcal',
        video: 'https://www.youtube.com/embed/w0l9F9lYGDI',
        exercises: [
          { name: 'Caminhada regenerativa', detail: '25 minutos em ritmo leve' },
          { name: 'Mobilidade de quadril com bastão', detail: '3 séries de 12 repetições' },
          { name: 'Liberação miofascial de dorsais', detail: '3 séries de 45 segundos por lado' },
          { name: 'Respiração profunda supina', detail: '5 ciclos de 90 segundos' }
        ]
      }
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
        exercises: normaliseExercises(planValue.exercises)
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
