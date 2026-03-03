import * as THREE from 'three';

const PROJECTS = [
  {
    title: 'Sites Vitrines',
    desc: 'Des vitrines digitales qui captent\nl\'attention et convertissent.',
    color1: '#3b82f6',
    color2: '#1d4ed8',
    icon: 'window',
  },
  {
    title: 'Automatisation',
    desc: 'Optimisez vos processus avec\ndes workflows intelligents.',
    color1: '#8b5cf6',
    color2: '#6d28d9',
    icon: 'bolt',
  },
  {
    title: 'Identité Visuelle',
    desc: 'Une identité de marque unique\nqui vous démarque.',
    color1: '#06b6d4',
    color2: '#0891b2',
    icon: 'palette',
  },
  {
    title: 'Applications Web',
    desc: 'Des apps sur-mesure,\nperformantes et intuitives.',
    color1: '#10b981',
    color2: '#059669',
    icon: 'app',
  },
  {
    title: 'SEO & Croissance',
    desc: 'Boostez votre visibilité\net votre présence en ligne.',
    color1: '#f59e0b',
    color2: '#d97706',
    icon: 'chart',
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
    case 'window':
      ctx.beginPath();
      roundRect(ctx, cx - s, cy - s * 0.7, s * 2, s * 1.4, 6);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - s, cy - s * 0.25);
      ctx.lineTo(cx + s, cy - s * 0.25);
      ctx.stroke();
      // Dots in title bar
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      [cx - s * 0.7, cx - s * 0.45, cx - s * 0.2].forEach((dx) => {
        ctx.beginPath();
        ctx.arc(dx, cy - s * 0.48, 3, 0, Math.PI * 2);
        ctx.fill();
      });
      break;

    case 'bolt':
      ctx.beginPath();
      ctx.moveTo(cx + s * 0.1, cy - s);
      ctx.lineTo(cx - s * 0.5, cy + s * 0.1);
      ctx.lineTo(cx + s * 0.05, cy + s * 0.1);
      ctx.lineTo(cx - s * 0.1, cy + s);
      ctx.lineTo(cx + s * 0.5, cy - s * 0.1);
      ctx.lineTo(cx - s * 0.05, cy - s * 0.1);
      ctx.closePath();
      ctx.fill();
      break;

    case 'palette':
      ctx.beginPath();
      ctx.arc(cx, cy, s, 0, Math.PI * 2);
      ctx.stroke();
      // Color dots
      const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff'];
      colors.forEach((color, i) => {
        const angle = (i / colors.length) * Math.PI * 2 - Math.PI / 2;
        const dx = cx + Math.cos(angle) * s * 0.55;
        const dy = cy + Math.sin(angle) * s * 0.55;
        ctx.beginPath();
        ctx.arc(dx, dy, s * 0.18, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });
      break;

    case 'app':
      ctx.beginPath();
      roundRect(ctx, cx - s * 0.5, cy - s, s * 1, s * 2, 8);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - s * 0.5, cy - s * 0.55);
      ctx.lineTo(cx + s * 0.5, cy - s * 0.55);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy + s * 0.7, 4, 0, Math.PI * 2);
      ctx.fill();
      break;

    case 'chart':
      // Bars
      const barW = s * 0.3;
      const bars = [0.4, 0.7, 0.5, 1.0];
      bars.forEach((h, i) => {
        const bx = cx - s + i * (barW + s * 0.16);
        const bh = h * s * 1.5;
        ctx.fillStyle = `rgba(255,255,255,${0.4 + h * 0.5})`;
        roundRect(ctx, bx, cy + s * 0.75 - bh, barW, bh, 3);
        ctx.fill();
      });
      // Arrow
      ctx.strokeStyle = 'rgba(255,255,255,0.9)';
      ctx.beginPath();
      ctx.moveTo(cx - s, cy - s * 0.6);
      ctx.lineTo(cx, cy - s * 0.9);
      ctx.lineTo(cx + s, cy - s * 0.4);
      ctx.stroke();
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
  ctx.fillText(project.title, 256, 370);

  // Divider
  const divGrad = ctx.createLinearGradient(156, 0, 356, 0);
  divGrad.addColorStop(0, 'rgba(255,255,255,0)');
  divGrad.addColorStop(0.5, 'rgba(255,255,255,0.4)');
  divGrad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = divGrad;
  ctx.fillRect(156, 395, 200, 1);

  // Description
  ctx.font = '20px system-ui, -apple-system, "Segoe UI", sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  const lines = project.desc.split('\n');
  lines.forEach((line, i) => {
    ctx.fillText(line, 256, 435 + i * 30);
  });

  // Bottom tag
  ctx.font = '600 13px system-ui, -apple-system, "Segoe UI", sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.letterSpacing = '3px';
  ctx.fillText('ALTAB STUDIO', 256, 630);

  return new THREE.CanvasTexture(canvas);
}

export function initCarousel(container) {
  // Scene setup
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    50,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 0.3, 9);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  container.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(5, 5, 5);
  scene.add(dirLight);

  const backLight = new THREE.DirectionalLight(0x3b82f6, 0.3);
  backLight.position.set(-3, 2, -5);
  scene.add(backLight);

  // Create cards
  const cardGroup = new THREE.Group();
  const numCards = PROJECTS.length;
  const radius = 5;
  const cardWidth = 2.8;
  const cardHeight = 3.7;

  const cards = [];
  let currentIndex = 0;

  PROJECTS.forEach((project, i) => {
    const angle = (i / numCards) * Math.PI * 2;

    const texture = createCardTexture(project);
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const geometry = new THREE.PlaneGeometry(cardWidth, cardHeight);
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      side: THREE.FrontSide,
      transparent: true,
      roughness: 0.3,
      metalness: 0.1,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.sin(angle) * radius;
    mesh.position.z = Math.cos(angle) * radius;

    // Make card face outward
    mesh.lookAt(
      mesh.position.x * 2,
      mesh.position.y,
      mesh.position.z * 2
    );

    cardGroup.add(mesh);
    cards.push({ mesh, material, angle });
  });

  scene.add(cardGroup);

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
    const dots = indicatorContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  // Rotation
  let targetAngle = 0;
  let currentAngle = 0;
  let autoRotateSpeed = 0.001;
  let isInteracting = false;

  function goTo(index) {
    currentIndex = ((index % numCards) + numCards) % numCards;
    targetAngle = -(currentIndex / numCards) * Math.PI * 2;
    updateIndicator();
  }

  function next() {
    goTo(currentIndex + 1);
  }

  function prev() {
    goTo(currentIndex - 1);
  }

  // Mouse / touch drag
  let startX = 0;
  let dragAngle = 0;
  let isDragging = false;

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    isInteracting = true;
    startX = e.clientX;
    dragAngle = targetAngle;
    container.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const delta = (e.clientX - startX) * 0.005;
    targetAngle = dragAngle + delta;
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    container.style.cursor = 'grab';

    // Snap to nearest card
    const step = (Math.PI * 2) / numCards;
    const snapped = Math.round(targetAngle / step) * step;
    targetAngle = snapped;
    currentIndex = (((-Math.round(snapped / step)) % numCards) + numCards) % numCards;
    updateIndicator();

    setTimeout(() => {
      isInteracting = false;
    }, 2000);
  });

  container.style.cursor = 'grab';

  // Touch support
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    isInteracting = true;
    startX = e.touches[0].clientX;
    dragAngle = targetAngle;
  }, { passive: true });

  container.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const delta = (e.touches[0].clientX - startX) * 0.005;
    targetAngle = dragAngle + delta;
  }, { passive: true });

  container.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;

    const step = (Math.PI * 2) / numCards;
    const snapped = Math.round(targetAngle / step) * step;
    targetAngle = snapped;
    currentIndex = (((-Math.round(snapped / step)) % numCards) + numCards) % numCards;
    updateIndicator();

    setTimeout(() => {
      isInteracting = false;
    }, 2000);
  });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Auto-rotate when not interacting
    if (!isInteracting && !isDragging) {
      targetAngle += autoRotateSpeed;

      // Update currentIndex based on angle
      const step = (Math.PI * 2) / numCards;
      const newIndex = (((-Math.round(targetAngle / step)) % numCards) + numCards) % numCards;
      if (newIndex !== currentIndex) {
        currentIndex = newIndex;
        updateIndicator();
      }
    }

    // Smooth rotation
    currentAngle += (targetAngle - currentAngle) * 0.06;
    cardGroup.rotation.y = currentAngle;

    // Update card visibility (fade cards facing away)
    cards.forEach((card) => {
      const worldDir = new THREE.Vector3();
      card.mesh.getWorldDirection(worldDir);

      const cameraDir = new THREE.Vector3();
      camera.getWorldDirection(cameraDir);

      const dot = worldDir.dot(cameraDir);
      const opacity = THREE.MathUtils.smoothstep(dot, -0.5, 0.3);
      card.material.opacity = 0.3 + opacity * 0.7;
    });

    renderer.render(scene, camera);
  }

  animate();

  // Resize
  function onResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }

  window.addEventListener('resize', onResize);

  return { next, prev, goTo };
}
