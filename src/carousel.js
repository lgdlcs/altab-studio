import * as THREE from 'three';

const PROJECTS = [
  {
    title: 'PeakPick',
    tag: 'Application Web',
    desc: 'App de décision pour skieurs.\nScore météo, neige, affluence\nen temps réel.',
    color1: '#3b82f6',
    color2: '#1d4ed8',
    icon: 'mountain',
  },
  {
    title: 'Aero-Bi',
    tag: 'Site Vitrine',
    desc: 'Site immersif pour une école\nde parapente à Morzine.\nSVG interactifs, avis Google.',
    color1: '#06b6d4',
    color2: '#0891b2',
    icon: 'paraglide',
  },
  {
    title: 'Mezzanine',
    tag: 'Site & Réservation',
    desc: 'Vitrine et réservation en ligne\npour un restaurant de montagne\nà Samoëns.',
    color1: '#f59e0b',
    color2: '#d97706',
    icon: 'restaurant',
  },
  {
    title: 'Limedia',
    tag: 'Plateforme',
    desc: 'Gestion documentaire entreprise.\nReact, NestJS, PostgreSQL.\nRôles et suivi de progression.',
    color1: '#8b5cf6',
    color2: '#6d28d9',
    icon: 'document',
  },
  {
    title: 'Cosmic TD',
    tag: 'Jeu Multijoueur',
    desc: 'Tower Defense + Auto-Chess\nen temps réel. Phaser 3,\nWebSocket, 2-4 joueurs.',
    color1: '#10b981',
    color2: '#059669',
    icon: 'game',
  },
];

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawIcon(ctx, type, cx, cy, size) {
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const s = size;

  switch (type) {
    case 'mountain':
      // Mountain peaks (ski/alps)
      ctx.beginPath();
      ctx.moveTo(cx - s * 1.2, cy + s * 0.8);
      ctx.lineTo(cx - s * 0.4, cy - s * 0.9);
      ctx.lineTo(cx - s * 0.1, cy - s * 0.3);
      ctx.lineTo(cx + s * 0.2, cy - s * 1);
      ctx.lineTo(cx + s * 1.2, cy + s * 0.8);
      ctx.closePath();
      ctx.stroke();
      // Snow cap
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.beginPath();
      ctx.moveTo(cx + s * 0.2, cy - s * 1);
      ctx.lineTo(cx + s * 0.55, cy - s * 0.45);
      ctx.lineTo(cx + s * 0.35, cy - s * 0.55);
      ctx.lineTo(cx + s * 0.05, cy - s * 0.4);
      ctx.lineTo(cx - s * 0.1, cy - s * 0.55);
      ctx.closePath();
      ctx.fill();
      break;

    case 'paraglide':
      // Paraglider wing (arc)
      ctx.beginPath();
      ctx.moveTo(cx - s * 1.1, cy - s * 0.2);
      ctx.quadraticCurveTo(cx, cy - s * 1.3, cx + s * 1.1, cy - s * 0.2);
      ctx.stroke();
      // Lines to pilot
      ctx.beginPath();
      ctx.moveTo(cx - s * 0.7, cy - s * 0.35);
      ctx.lineTo(cx, cy + s * 0.8);
      ctx.moveTo(cx + s * 0.7, cy - s * 0.35);
      ctx.lineTo(cx, cy + s * 0.8);
      ctx.stroke();
      // Pilot dot
      ctx.beginPath();
      ctx.arc(cx, cy + s * 0.85, s * 0.15, 0, Math.PI * 2);
      ctx.fill();
      break;

    case 'restaurant':
      // Fork
      ctx.beginPath();
      ctx.moveTo(cx - s * 0.5, cy - s);
      ctx.lineTo(cx - s * 0.5, cy - s * 0.2);
      ctx.moveTo(cx - s * 0.5, cy - s);
      ctx.lineTo(cx - s * 0.5, cy + s);
      ctx.moveTo(cx - s * 0.7, cy - s);
      ctx.lineTo(cx - s * 0.7, cy - s * 0.2);
      ctx.moveTo(cx - s * 0.3, cy - s);
      ctx.lineTo(cx - s * 0.3, cy - s * 0.2);
      ctx.stroke();
      // Knife
      ctx.beginPath();
      ctx.moveTo(cx + s * 0.5, cy - s);
      ctx.lineTo(cx + s * 0.5, cy + s);
      ctx.moveTo(cx + s * 0.5, cy - s);
      ctx.quadraticCurveTo(cx + s * 0.9, cy - s * 0.3, cx + s * 0.5, cy - s * 0.1);
      ctx.stroke();
      break;

    case 'document':
      // Paper sheet
      ctx.beginPath();
      roundRect(ctx, cx - s * 0.7, cy - s, s * 1.4, s * 2, 4);
      ctx.stroke();
      // Folded corner
      ctx.beginPath();
      ctx.moveTo(cx + s * 0.3, cy - s);
      ctx.lineTo(cx + s * 0.7, cy - s + s * 0.4);
      ctx.stroke();
      // Text lines
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.moveTo(cx - s * 0.4, cy - s * 0.3);
      ctx.lineTo(cx + s * 0.4, cy - s * 0.3);
      ctx.moveTo(cx - s * 0.4, cy);
      ctx.lineTo(cx + s * 0.3, cy);
      ctx.moveTo(cx - s * 0.4, cy + s * 0.3);
      ctx.lineTo(cx + s * 0.45, cy + s * 0.3);
      ctx.moveTo(cx - s * 0.4, cy + s * 0.6);
      ctx.lineTo(cx + s * 0.2, cy + s * 0.6);
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.lineWidth = 3;
      break;

    case 'game':
      // Tower
      ctx.beginPath();
      ctx.moveTo(cx - s * 0.4, cy + s);
      ctx.lineTo(cx - s * 0.4, cy - s * 0.3);
      ctx.lineTo(cx - s * 0.6, cy - s * 0.3);
      ctx.lineTo(cx - s * 0.6, cy - s * 0.6);
      ctx.lineTo(cx - s * 0.3, cy - s * 0.6);
      ctx.lineTo(cx, cy - s * 1.1);
      ctx.lineTo(cx + s * 0.3, cy - s * 0.6);
      ctx.lineTo(cx + s * 0.6, cy - s * 0.6);
      ctx.lineTo(cx + s * 0.6, cy - s * 0.3);
      ctx.lineTo(cx + s * 0.4, cy - s * 0.3);
      ctx.lineTo(cx + s * 0.4, cy + s);
      ctx.closePath();
      ctx.stroke();
      // Energy burst
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.beginPath();
      ctx.arc(cx, cy - s * 1.1, s * 0.25, 0, Math.PI * 2);
      ctx.fill();
      break;
  }

  ctx.restore();
}

function createCardTexture(project) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 680;
  const ctx = canvas.getContext('2d');

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, 680);
  gradient.addColorStop(0, project.color1);
  gradient.addColorStop(1, project.color2);

  roundRect(ctx, 0, 0, 512, 680, 24);
  ctx.fillStyle = gradient;
  ctx.fill();

  // Subtle grid overlay
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 680; i += 34) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }
  for (let i = 0; i <= 512; i += 34) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 680);
    ctx.stroke();
  }

  // Decorative circles
  ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.beginPath();
  ctx.arc(400, 100, 120, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(80, 600, 80, 0, Math.PI * 2);
  ctx.fill();

  // Icon
  drawIcon(ctx, project.icon, 256, 230, 45);

  // Icon ring
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(256, 230, 65, 0, Math.PI * 2);
  ctx.stroke();

  // Title
  ctx.font = 'bold 38px system-ui, -apple-system, "Segoe UI", sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.fillText(project.title, 256, 365);

  // Tag (project type)
  if (project.tag) {
    ctx.font = '600 14px system-ui, -apple-system, "Segoe UI", sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillText(project.tag.toUpperCase(), 256, 395);
  }

  // Divider
  const divGrad = ctx.createLinearGradient(156, 0, 356, 0);
  divGrad.addColorStop(0, 'rgba(255,255,255,0)');
  divGrad.addColorStop(0.5, 'rgba(255,255,255,0.4)');
  divGrad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = divGrad;
  ctx.fillRect(156, 415, 200, 1);

  // Description
  ctx.font = '19px system-ui, -apple-system, "Segoe UI", sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  const lines = project.desc.split('\n');
  lines.forEach((line, i) => {
    ctx.fillText(line, 256, 452 + i * 28);
  });

  // Bottom tag
  ctx.font = '600 12px system-ui, -apple-system, "Segoe UI", sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.fillText('ALTAB STUDIO', 256, 635);

  return new THREE.CanvasTexture(canvas);
}

// --- CoverFlow Transform ---

function getCardTransform(offset) {
  const clamped = Math.max(-3, Math.min(3, offset));

  // X position: center card at 0, neighbors spaced out
  let x;
  if (Math.abs(clamped) <= 1) {
    x = clamped * 3.2;
  } else {
    const sign = Math.sign(clamped);
    const extra = Math.abs(clamped) - 1;
    x = sign * (3.2 + extra * 2.6);
  }

  // Z depth: push side cards back
  const z = -Math.abs(clamped) * 1.6;

  // Y rotation: CoverFlow tilt via atan for natural curve
  const rotY = -Math.atan(clamped * 0.8) * 0.85;

  // Scale: active card biggest
  const scale = Math.max(0.55, 1.0 - Math.abs(clamped) * 0.16);

  // Opacity
  const opacity = Math.max(0.25, 1.0 - Math.abs(clamped) * 0.28);

  return { x, z, rotY, scale, opacity };
}

// --- Init Carousel ---

export function initCarousel(container) {
  const scene = new THREE.Scene();
  const numCards = PROJECTS.length;

  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    50
  );
  camera.position.set(0, 0, 8);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  container.appendChild(renderer.domElement);

  // Lighting
  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(5, 5, 5);
  scene.add(dirLight);
  const backLight = new THREE.DirectionalLight(0x3b82f6, 0.3);
  backLight.position.set(-3, 2, -5);
  scene.add(backLight);

  // Create cards
  const cards = [];
  PROJECTS.forEach((project) => {
    const texture = createCardTexture(project);
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const geometry = new THREE.PlaneGeometry(2.8, 3.7);
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      side: THREE.FrontSide,
      transparent: true,
      roughness: 0.3,
      metalness: 0.1,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    cards.push({ mesh, material });
  });

  // State
  let activeIndex = 0;
  let targetIndex = 0;
  let isDragging = false;
  let isInteracting = false;
  const EASING = 0.12;

  // Indicators
  const indicatorContainer = document.getElementById('carousel-indicator');
  for (let i = 0; i < numCards; i++) {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    indicatorContainer.appendChild(dot);
  }

  function updateIndicator() {
    const idx = ((Math.round(targetIndex) % numCards) + numCards) % numCards;
    indicatorContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });
  }

  // Navigation
  function goTo(index) {
    const wrappedTarget = ((index % numCards) + numCards) % numCards;

    // Find shortest path (handle wrap-around)
    let diff = wrappedTarget - (((Math.round(activeIndex) % numCards) + numCards) % numCards);
    if (diff > numCards / 2) diff -= numCards;
    if (diff < -numCards / 2) diff += numCards;

    targetIndex = activeIndex + diff;
    // Correct target to exact card position
    targetIndex = Math.round(targetIndex);

    updateIndicator();
    resetAutoAdvance();
  }

  function next() { goTo(Math.round(activeIndex) + 1); }
  function prev() { goTo(Math.round(activeIndex) - 1); }

  // Auto-advance
  let autoTimer = null;
  const AUTO_INTERVAL = 5000;

  function startAutoAdvance() {
    stopAutoAdvance();
    autoTimer = setInterval(() => {
      if (!isInteracting && !isDragging) next();
    }, AUTO_INTERVAL);
  }

  function stopAutoAdvance() {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
  }

  function resetAutoAdvance() {
    isInteracting = true;
    stopAutoAdvance();
    setTimeout(() => {
      isInteracting = false;
      startAutoAdvance();
    }, 4000);
  }

  startAutoAdvance();

  // Drag interaction
  let dragStartX = 0;
  let dragStartIndex = 0;
  let dragVelocity = 0;
  let lastDragX = 0;
  let lastDragTime = 0;
  const DRAG_SENS = 'ontouchstart' in window ? 180 : 250;

  function onDragStart(clientX) {
    isDragging = true;
    isInteracting = true;
    stopAutoAdvance();
    dragStartX = clientX;
    dragStartIndex = activeIndex;
    lastDragX = clientX;
    lastDragTime = performance.now();
    dragVelocity = 0;
    container.style.cursor = 'grabbing';
  }

  function onDragMove(clientX) {
    if (!isDragging) return;
    const now = performance.now();
    const dt = now - lastDragTime;
    if (dt > 0) dragVelocity = (lastDragX - clientX) / dt;
    lastDragX = clientX;
    lastDragTime = now;

    const delta = (dragStartX - clientX) / DRAG_SENS;
    activeIndex = dragStartIndex + delta;
    targetIndex = activeIndex;
  }

  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    container.style.cursor = 'grab';

    let snapTarget = Math.round(activeIndex);
    if (Math.abs(dragVelocity) > 0.3) {
      snapTarget = dragVelocity > 0 ? Math.ceil(activeIndex) : Math.floor(activeIndex);
    }
    goTo(snapTarget);
  }

  container.addEventListener('mousedown', (e) => onDragStart(e.clientX));
  window.addEventListener('mousemove', (e) => { if (isDragging) { e.preventDefault(); onDragMove(e.clientX); } });
  window.addEventListener('mouseup', onDragEnd);
  container.addEventListener('touchstart', (e) => onDragStart(e.touches[0].clientX), { passive: true });
  container.addEventListener('touchmove', (e) => onDragMove(e.touches[0].clientX), { passive: true });
  container.addEventListener('touchend', onDragEnd);
  container.style.cursor = 'grab';

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Smooth easing toward target
    if (!isDragging) {
      activeIndex += (targetIndex - activeIndex) * EASING;
      if (Math.abs(targetIndex - activeIndex) < 0.001) activeIndex = targetIndex;
    }

    // Position each card
    cards.forEach((card, i) => {
      // Compute wrapped offset for infinite feel
      let offset = i - ((activeIndex % numCards) + numCards) % numCards;
      // Wrap offset to keep cards centered
      if (offset > numCards / 2) offset -= numCards;
      if (offset < -numCards / 2) offset += numCards;

      const t = getCardTransform(offset);
      card.mesh.position.set(t.x, 0, t.z);
      card.mesh.rotation.set(0, t.rotY, 0);
      card.mesh.scale.setScalar(t.scale);
      card.material.opacity = t.opacity;
      card.mesh.visible = Math.abs(offset) < 3;

      // Render order: front cards on top
      card.mesh.renderOrder = 100 - Math.abs(offset) * 10;
    });

    renderer.render(scene, camera);
  }

  animate();

  // Resize
  function onResize() {
    const w = container.clientWidth;
    camera.aspect = w / container.clientHeight;
    if (w < 480) { camera.position.z = 11; camera.fov = 50; }
    else if (w < 768) { camera.position.z = 10; camera.fov = 48; }
    else if (w < 1024) { camera.position.z = 9; camera.fov = 46; }
    else { camera.position.z = 8; camera.fov = 45; }
    camera.updateProjectionMatrix();
    renderer.setSize(w, container.clientHeight);
  }

  window.addEventListener('resize', onResize);

  return { next, prev, goTo };
}
