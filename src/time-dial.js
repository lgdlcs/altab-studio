// ============================================
// TIME DIAL — Day/Night Cycle Controller
// ============================================

// --- Color Utilities ---

function hexToRgb(hex) {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

function rgbToHex(r, g, b) {
  return (
    '#' +
    [r, g, b]
      .map((c) =>
        Math.min(255, Math.max(0, Math.round(c)))
          .toString(16)
          .padStart(2, '0')
      )
      .join('')
  );
}

function lerpColor(a, b, t) {
  const [r1, g1, b1] = hexToRgb(a);
  const [r2, g2, b2] = hexToRgb(b);
  return rgbToHex(r1 + (r2 - r1) * t, g1 + (g2 - g1) * t, b1 + (b2 - b1) * t);
}

function lerpColors(arrA, arrB, t) {
  return arrA.map((c, i) => lerpColor(c, arrB[i], t));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

// --- Theme Keyframes (24h cycle) ---

const KEYFRAMES = [
  {
    hour: 0,
    bg: '#050810', bgSec: '#0a0f1a', text: '#f1f5f9', textSec: '#94a3b8', textMuted: '#64748b',
    sky: ['#050810', '#0a1628', '#122244', '#1a3a6a'],
    lake: ['#152d54', '#080e1a'],
    mtFar: ['#1a2d50', '#142040'], mtMid: ['#0f1f3a', '#0c1830'], mtNear: ['#0a1525', '#070e1a'],
    treeline: '#060d18', stars: 0.8, moon: 0.3, isDark: true,
  },
  {
    hour: 5,
    bg: '#0c0818', bgSec: '#140e22', text: '#f1f0f5', textSec: '#a898b8', textMuted: '#786888',
    sky: ['#0a0520', '#1a0a35', '#5a1845', '#c05040'],
    lake: ['#351040', '#0a0520'],
    mtFar: ['#2a1540', '#1e1030'], mtMid: ['#1a0d30', '#140a25'], mtNear: ['#100820', '#0a051a'],
    treeline: '#080514', stars: 0.25, moon: 0.08, isDark: true,
  },
  {
    hour: 7,
    bg: '#1a1018', bgSec: '#241520', text: '#f5f0eb', textSec: '#c9a898', textMuted: '#907868',
    sky: ['#1a0a2e', '#a01050', '#e06030', '#ffc040'],
    lake: ['#b84060', '#2a1040'],
    mtFar: ['#3d1f4a', '#2d1540'], mtMid: ['#2a1538', '#201030'], mtNear: ['#1a0d25', '#120820'],
    stars: 0.03, moon: 0, isDark: true,
  },
  {
    hour: 8.5,
    bg: '#161020', bgSec: '#1e1428', text: '#f2ede8', textSec: '#c4a090', textMuted: '#8a7060',
    sky: ['#152060', '#6838a0', '#c07050', '#e8a860'],
    lake: ['#704878', '#181030'],
    mtFar: ['#3a3050', '#2a2040'], mtMid: ['#282038', '#1e1830'], mtNear: ['#181025', '#100a1e'],
    stars: 0, moon: 0, isDark: true,
  },
  {
    hour: 9.5,
    bg: '#dce5f0', bgSec: '#d0daE8', text: '#1e293b', textSec: '#475569', textMuted: '#94a3b8',
    sky: ['#1850a8', '#3878d8', '#68a0f0', '#98c8e8'],
    lake: ['#3880c8', '#1850a8'],
    mtFar: ['#487858', '#387048'], mtMid: ['#305040', '#1e4030'], mtNear: ['#183520', '#0e2818'],
    stars: 0, moon: 0, isDark: false,
  },
  {
    hour: 14,
    bg: '#f0f4f8', bgSec: '#e2e8f0', text: '#1e293b', textSec: '#475569', textMuted: '#94a3b8',
    sky: ['#1e40af', '#3b82f6', '#60a5fa', '#87ceeb'],
    lake: ['#3b82f6', '#1e40af'],
    mtFar: ['#3a6850', '#2a5540'], mtMid: ['#254a35', '#1a3a28'], mtNear: ['#152d20', '#0d2015'],
    stars: 0, moon: 0, isDark: false,
  },
  {
    hour: 16.5,
    bg: '#e5eaf2', bgSec: '#dae0ec', text: '#1e293b', textSec: '#475569', textMuted: '#94a3b8',
    sky: ['#1a3898', '#3570d0', '#5898e8', '#80b8e0'],
    lake: ['#3568c0', '#1a3898'],
    mtFar: ['#385e48', '#284e3a'], mtMid: ['#204030', '#183525'], mtNear: ['#142a1e', '#0c2015'],
    stars: 0, moon: 0, isDark: false,
  },
  {
    hour: 17.5,
    bg: '#140a24', bgSec: '#1c0e30', text: '#f0e8f5', textSec: '#b898c8', textMuted: '#806898',
    sky: ['#121040', '#4828a0', '#a05080', '#e07848'],
    lake: ['#6030a0', '#121040'],
    mtFar: ['#2a1848', '#1e1038'], mtMid: ['#1a0e30', '#140a28'], mtNear: ['#100820', '#0a0518'],
    stars: 0.05, moon: 0, isDark: true,
  },
  {
    hour: 18.5,
    bg: '#120820', bgSec: '#1a0c2e', text: '#f0e8f5', textSec: '#b898c8', textMuted: '#806898',
    sky: ['#100530', '#6020a0', '#c04080', '#ff7030'],
    lake: ['#8030a0', '#100530'],
    mtFar: ['#2d1550', '#201040'], mtMid: ['#1a0d38', '#130830'], mtNear: ['#100825', '#0a051a'],
    stars: 0.12, moon: 0, isDark: true,
  },
  {
    hour: 21,
    bg: '#050810', bgSec: '#0a0f1a', text: '#f1f5f9', textSec: '#94a3b8', textMuted: '#64748b',
    sky: ['#050810', '#0a1628', '#142240', '#1a3a6a'],
    lake: ['#152d54', '#080e1a'],
    mtFar: ['#1a2d50', '#142040'], mtMid: ['#0f1f3a', '#0c1830'], mtNear: ['#0a1525', '#070e1a'],
    treeline: '#060d18', stars: 0.7, moon: 0.25, isDark: true,
  },
];

// --- Interpolation ---

function getThemeForHour(hour) {
  hour = ((hour % 24) + 24) % 24;

  let idxBefore = KEYFRAMES.length - 1;
  for (let i = 0; i < KEYFRAMES.length; i++) {
    if (KEYFRAMES[i].hour <= hour) idxBefore = i;
  }
  const idxAfter = (idxBefore + 1) % KEYFRAMES.length;
  const before = KEYFRAMES[idxBefore];
  const after = KEYFRAMES[idxAfter];

  let range = after.hour - before.hour;
  if (range <= 0) range += 24;
  let progress = hour - before.hour;
  if (progress < 0) progress += 24;
  const t = range === 0 ? 0 : progress / range;

  return {
    bg: lerpColor(before.bg, after.bg, t),
    bgSec: lerpColor(before.bgSec, after.bgSec, t),
    text: lerpColor(before.text, after.text, t),
    textSec: lerpColor(before.textSec, after.textSec, t),
    textMuted: lerpColor(before.textMuted, after.textMuted, t),
    sky: lerpColors(before.sky, after.sky, t),
    lake: lerpColors(before.lake, after.lake, t),
    mtFar: lerpColors(before.mtFar, after.mtFar, t),
    mtMid: lerpColors(before.mtMid, after.mtMid, t),
    mtNear: lerpColors(before.mtNear, after.mtNear, t),

    stars: lerp(before.stars, after.stars, t),
    moon: lerp(before.moon, after.moon, t),
    isDark: t < 0.5 ? before.isDark : after.isDark,
  };
}

// --- Apply Theme ---

function applyTheme(theme) {
  const root = document.documentElement;
  root.style.setProperty('--bg-primary', theme.bg);
  root.style.setProperty('--bg-secondary', theme.bgSec);
  root.style.setProperty('--text-primary', theme.text);
  root.style.setProperty('--text-secondary', theme.textSec);
  root.style.setProperty('--text-muted', theme.textMuted);

  if (theme.isDark) {
    root.style.setProperty('--bg-card', 'rgba(255,255,255,0.03)');
    root.style.setProperty('--border-card', 'rgba(255,255,255,0.08)');
  } else {
    root.style.setProperty('--bg-card', 'rgba(0,0,0,0.03)');
    root.style.setProperty('--border-card', 'rgba(0,0,0,0.08)');
  }

  // SVG landscape
  setStops('#sky-gradient', theme.sky);
  setStops('#lake-gradient', theme.lake);
  setStops('#mountain-far', theme.mtFar);
  setStops('#mountain-mid', theme.mtMid);
  setStops('#mountain-near', theme.mtNear);

  const starsGroup = document.querySelector('.stars');
  if (starsGroup) starsGroup.setAttribute('opacity', theme.stars);
}

// --- Celestial Bodies ---

function updateCelestialBodies(hour) {
  const sunGroup = document.getElementById('sun-group');
  const moonGroup = document.getElementById('moon-group');
  if (!sunGroup || !moonGroup) return;

  // Sun arc: rises at 5h, zenith at 12h, sets at 19h
  const sunStart = 5;
  const sunEnd = 19;
  const sunT = (hour - sunStart) / (sunEnd - sunStart);

  if (sunT > 0 && sunT < 1) {
    const x = 80 + sunT * 1280;
    const y = 640 - 520 * Math.sin(sunT * Math.PI);
    sunGroup.setAttribute('transform', `translate(${x}, ${y})`);
    // Fade near horizon, full in middle
    const sunOpacity = Math.min(1, Math.sin(sunT * Math.PI) * 2.5);
    sunGroup.setAttribute('opacity', sunOpacity);
  } else {
    sunGroup.setAttribute('opacity', 0);
  }

  // Moon arc: rises at 19h, zenith at 0h, sets at 5h
  let moonT;
  if (hour >= 19) {
    moonT = (hour - 19) / 10; // 19h → 0 .. 24h → 0.5
  } else if (hour < 5) {
    moonT = (hour + 5) / 10; // 0h → 0.5 .. 5h → 1
  } else {
    moonT = -1;
  }

  if (moonT >= 0 && moonT <= 1) {
    const x = 80 + moonT * 1280;
    const y = 640 - 480 * Math.sin(moonT * Math.PI);
    moonGroup.setAttribute('transform', `translate(${x}, ${y})`);
    const moonOpacity = Math.min(1, Math.sin(moonT * Math.PI) * 2);
    moonGroup.setAttribute('opacity', moonOpacity);
  } else {
    moonGroup.setAttribute('opacity', 0);
  }
}

function setStops(gradientId, colors) {
  const stops = document.querySelectorAll(`${gradientId} stop`);
  colors.forEach((color, i) => {
    if (stops[i]) stops[i].setAttribute('stop-color', color);
  });
}

// --- Dial Widget ---

function createDial(currentHour) {
  const el = document.createElement('div');
  el.className = 'time-dial';
  el.innerHTML = `
    <div class="dial-track"></div>
    <div class="dial-center">
      <span class="dial-hour">${Math.floor(currentHour)}</span>
      <span class="dial-h">h</span>
    </div>
    <div class="dial-indicator">
      <div class="dial-sun-moon"></div>
    </div>
    <div class="dial-tooltip">Cycle jour / nuit</div>
  `;
  document.body.appendChild(el);
  return el;
}

function updateDialVisual(dial, hour) {
  const hourEl = dial.querySelector('.dial-hour');
  hourEl.textContent = Math.floor(hour);

  const indicator = dial.querySelector('.dial-indicator');
  const angle = (hour / 24) * 360 - 90; // -90 so 0h is at top
  const rad = angle * (Math.PI / 180);
  const radius = 44;
  const x = 50 + radius * Math.cos(rad);
  const y = 50 + radius * Math.sin(rad);
  indicator.style.left = x + 'px';
  indicator.style.top = y + 'px';

  // Sun/moon appearance
  const sunMoon = dial.querySelector('.dial-sun-moon');
  const isDay = hour >= 7 && hour < 19;
  sunMoon.style.background = isDay
    ? 'radial-gradient(circle, #fbbf24, #f59e0b)'
    : 'radial-gradient(circle, #e2e8f0, #94a3b8)';
  sunMoon.style.boxShadow = isDay
    ? '0 0 12px #fbbf24, 0 0 24px rgba(251,191,36,0.4)'
    : '0 0 8px rgba(226,232,240,0.5)';
}

// --- Drag Interaction ---

function initDrag(dial, onHourChange) {
  let dragging = false;

  function getHourFromEvent(e) {
    const rect = dial.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    let angle = Math.atan2(clientY - cy, clientX - cx);
    angle = angle + Math.PI / 2; // rotate so top = 0
    if (angle < 0) angle += Math.PI * 2;
    return (angle / (Math.PI * 2)) * 24;
  }

  function onStart(e) {
    dragging = true;
    dial.classList.add('dragging');
    onMove(e);
  }

  function onMove(e) {
    if (!dragging) return;
    e.preventDefault();
    onHourChange(getHourFromEvent(e));
  }

  function onEnd() {
    dragging = false;
    dial.classList.remove('dragging');
  }

  dial.addEventListener('mousedown', onStart);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onEnd);
  dial.addEventListener('touchstart', onStart, { passive: false });
  window.addEventListener('touchmove', onMove, { passive: false });
  window.addEventListener('touchend', onEnd);

  // Scroll wheel on dial
  dial.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.5 : -0.5;
    onHourChange(null, delta);
  }, { passive: false });
}

// --- Init ---

export function initTimeDial() {
  let currentHour = new Date().getHours() + new Date().getMinutes() / 60;

  const dial = createDial(currentHour);

  function setHour(hour, delta) {
    if (delta !== undefined && hour === null) {
      currentHour = ((currentHour + delta) % 24 + 24) % 24;
    } else {
      currentHour = ((hour % 24) + 24) % 24;
    }
    update();
  }

  function update() {
    const theme = getThemeForHour(currentHour);
    applyTheme(theme);
    updateCelestialBodies(currentHour);
    updateDialVisual(dial, currentHour);
  }

  initDrag(dial, setHour);
  update();

  return { setHour, getCurrentHour: () => currentHour };
}
