// immersive-workshop.js - Scandinavian Ash & Concrete Plinth 3D Product Showroom
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

(function () {
  let scene, camera, renderer, controls, raycaster, pointer;
  let isVisible = true, activeProductId = null;
  const clock = new THREE.Clock();
  const plinthObjects = {};
  const hitProxies = [];
  const spotlights = {};
  let currentStageKey = 'rendering';

  // Shared CMF Materials Palette
  let MAT = null;

  function initMaterials() {
    MAT = {
      // Minimalist Scandinavian Ash Blonde Wood
      ashWoodSlat: new THREE.MeshStandardMaterial({
        color: 0xdfd4c2, // Warm blonde ash wood tone
        roughness: 0.65,
        metalness: 0.02
      }),
      ashWoodDark: new THREE.MeshStandardMaterial({
        color: 0xc8bba5,
        roughness: 0.7,
        metalness: 0.02
      }),
      woodAcousticBacking: new THREE.MeshStandardMaterial({
        color: 0x181a20, // Dark recessed acoustic shadow backing
        roughness: 0.9,
        metalness: 0.1
      }),
      // Raw Architectural Cast Concrete Plinth
      concretePlinth: new THREE.MeshStandardMaterial({
        color: 0xa4abb5, // Tactile raw light grey concrete
        roughness: 0.82,
        metalness: 0.04
      }),
      concreteBase: new THREE.MeshStandardMaterial({
        color: 0x22262e, // Recessed plinth foundation
        roughness: 0.85,
        metalness: 0.2
      }),
      concreteFloor: new THREE.MeshStandardMaterial({
        color: 0xcad0d8, // Polished studio micro-cement floor
        roughness: 0.38,
        metalness: 0.08
      }),
      // Brushed Aluminum Labels & Details
      brushedMetal: new THREE.MeshStandardMaterial({
        color: 0xd8dde5,
        roughness: 0.22,
        metalness: 0.9
      }),
      darkPlaque: new THREE.MeshStandardMaterial({
        color: 0x16181e,
        roughness: 0.4,
        metalness: 0.6
      }),
      // Concept Buck Materials
      forgedCarbon: new THREE.MeshStandardMaterial({
        color: 0x1a1d22,
        roughness: 0.3,
        metalness: 0.75
      }),
      frostedAcrylic: new THREE.MeshStandardMaterial({
        color: 0x242a35,
        roughness: 0.18,
        metalness: 0.9,
        transparent: true,
        opacity: 0.88
      }),
      amberAccent: new THREE.MeshBasicMaterial({ color: 0xf59e0b }),
      cyanAccent: new THREE.MeshBasicMaterial({ color: 0x00f2fe }),
      emeraldAccent: new THREE.MeshBasicMaterial({ color: 0x10b981 }),
      markerGlow: new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.55 })
    };
  }

  // Quick box builder
  function addBox(w, h, d, mat, [x, y, z], parent = scene, cast = true, receive = true) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.set(x, y, z);
    mesh.castShadow = cast;
    mesh.receiveShadow = receive;
    parent.add(mesh);
    return mesh;
  }

  function init() {
    const container = document.querySelector('.workshop-3d-wrapper');
    if (!container) return;

    const W = container.offsetWidth || window.innerWidth;
    const H = container.offsetHeight || 580;
    const canvas = document.getElementById('workshop-canvas');

    // 1. WebGL Renderer
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.setClearColor(0x181a20, 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    // 2. Scene & Subtle Studio Fog
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x181a20, 0.015);

    initMaterials();

    // 3. Camera
    camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 80);
    camera.position.set(0, 3.2, 9.2);

    // 4. Studio Lighting (Warm Ambient + Museum Track Spotlights)
    setupStudioLighting();

    // 5. Build Architectural Scandinavian Ash Wall & Concrete Floor
    buildArchitecture();

    // 6. Build 3 Concrete Product Plinths
    buildProductPlatforms();

    // 7. OrbitControls
    setupControls();

    // 8. HUD & Interaction
    setupHUD(container);

    raycaster = new THREE.Raycaster();
    pointer = new THREE.Vector2(-1000, -1000);

    renderer.domElement.addEventListener('mousemove', onMouseMove, { passive: true });
    renderer.domElement.addEventListener('click', onClick);
    window.addEventListener('resize', onResize);

    setupVisibilityObserver(container);

    animate();
  }

  /* =========================================================================
     LIGHTING: Warm Studio Fill + Focused Museum Downlight Spotlights
     ========================================================================= */
  function setupStudioLighting() {
    // Soft skylight & floor bounce fill
    const hemiLight = new THREE.HemisphereLight(0xfffaf0, 0x9ca3af, 0.85);
    scene.add(hemiLight);

    // Gentle front-diagonal soft key
    const dirKey = new THREE.DirectionalLight(0xfff8ee, 0.55);
    dirKey.position.set(4, 12, 10);
    dirKey.castShadow = true;
    dirKey.shadow.mapSize.set(1024, 1024);
    dirKey.shadow.camera.near = 2;
    dirKey.shadow.camera.far = 25;
    dirKey.shadow.camera.left = -12;
    dirKey.shadow.camera.right = 12;
    dirKey.shadow.camera.top = 10;
    dirKey.shadow.camera.bottom = -4;
    dirKey.shadow.bias = -0.0004;
    scene.add(dirKey);

    // Subtle warm backlight washing along the Scandinavian Ash wood wall
    const wallWash = new THREE.DirectionalLight(0xffecd4, 0.35);
    wallWash.position.set(0, 7, -2.5);
    scene.add(wallWash);
  }

  /* =========================================================================
     ARCHITECTURE: Minimalist Scandinavian Ash Slat Wall & Polished Concrete Floor
     ========================================================================= */
  function buildArchitecture() {
    const wallW = 34, wallH = 10, wallZ = -4.5;

    // Floor: Cast Concrete Micro-Cement
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(wallW + 8, 22), MAT.concreteFloor);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0, 3);
    floor.receiveShadow = true;
    scene.add(floor);

    // Dark Acoustic Shadow Backing Wall
    addBox(wallW, wallH, 0.4, MAT.woodAcousticBacking, [0, wallH / 2, wallZ], scene, false, true);

    // Rhythmic Vertical Scandinavian Ash Wood Slats
    const slatW = 0.28;
    const slatGap = 0.1;
    const slatPitch = slatW + slatGap; // 0.38
    const numSlats = Math.floor(wallW / slatPitch);
    const startX = -(numSlats * slatPitch) / 2 + slatPitch / 2;

    for (let i = 0; i < numSlats; i++) {
      const sx = startX + i * slatPitch;
      // Alternate subtle tone variations for natural wood beauty
      const slatMat = (i % 3 === 0) ? MAT.ashWoodDark : MAT.ashWoodSlat;
      const slat = addBox(slatW, wallH, 0.12, slatMat, [sx, wallH / 2, wallZ + 0.25], scene, false, true);
    }

    // Horizontal Recessed Architectural Timber Rail (Anchors concrete plinths visually)
    addBox(wallW, 0.24, 0.35, MAT.ashWoodSlat, [0, 2.3, wallZ + 0.35], scene, false, true);

    // Subtle dark baseboard trim
    addBox(wallW, 0.2, 0.12, MAT.darkPlaque, [0, 0.1, wallZ + 0.32], scene, false, true);

    // Ceiling & Museum Lighting Track
    const trackBar = addBox(wallW - 2, 0.12, 0.12, MAT.darkPlaque, [0, 8.8, -1.8], scene, false, false);
  }

  /* =========================================================================
     PRODUCT PLATFORMS: Raw Concrete Plinths with Dedicated Spotlights
     ========================================================================= */
  function buildProductPlatforms() {
    const products = [
      {
        id: 'ebs-tech',
        name: 'EBS Tech',
        x: 0.0,
        accent: 0x38bdf8,
        category: 'Autonomous Micro-Mobility Pod',
        modelUrl: 'assets/Project_2/3D Models/Segmented 3D model_ Max · Balanced 3D model.glb'
      }
    ];

    products.forEach((p, idx) => {
      const plinthGroup = new THREE.Group();
      plinthGroup.position.set(p.x, 0, -2.2);

      // 1. Concrete Plinth Base (Recessed Shadow Gap)
      addBox(3.4, 0.16, 2.4, MAT.concreteBase, [0, 0.08, 0], plinthGroup, false, true);

      // 2. Main Raw Cast Concrete Pedestal
      const mainPlinth = addBox(3.6, 1.85, 2.6, MAT.concretePlinth, [0, 1.085, 0], plinthGroup, true, true);

      // 3. Brushed Metal Plinth Chamfer Trim & Front Label Plaque
      addBox(2.2, 0.35, 0.04, MAT.darkPlaque, [0, 1.6, 1.32], plinthGroup, false, false);
      addBox(2.0, 0.04, 0.02, MAT.brushedMetal, [0, 1.45, 1.34], plinthGroup, false, false);

      // 4. Glowing Circular Target Marker Disc on top of plinth
      const markerGroup = new THREE.Group();
      markerGroup.position.set(0, 2.02, 0);

      // Concentric Outer Ring
      const ringGeo = new THREE.TorusGeometry(0.85, 0.016, 12, 48);
      const ringMat = new THREE.MeshBasicMaterial({ color: p.accent, transparent: true, opacity: 0.7 });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      markerGroup.add(ringMesh);

      // Inner Target Disc with Crosshairs
      const innerDisc = new THREE.Mesh(
        new THREE.CircleGeometry(0.82, 32),
        new THREE.MeshBasicMaterial({ color: p.accent, transparent: true, opacity: 0.18 })
      );
      innerDisc.rotation.x = -Math.PI / 2;
      innerDisc.position.y = -0.005;
      markerGroup.add(innerDisc);

      // Subtle Crosshair Ticks
      [-0.8, 0.8].forEach(tx => {
        const tick = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.01, 0.02), new THREE.MeshBasicMaterial({ color: p.accent }));
        tick.position.set(tx, 0.005, 0);
        markerGroup.add(tick);
      });
      [-0.8, 0.8].forEach(tz => {
        const tick = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.01, 0.14), new THREE.MeshBasicMaterial({ color: p.accent }));
        tick.position.set(0, 0.005, tz);
        markerGroup.add(tick);
      });

      plinthGroup.add(markerGroup);

      // 5. Concept Model Placeholder / Custom GLB Anchor
      const modelAnchor = new THREE.Group();
      modelAnchor.position.set(0, 2.05, 0);
      plinthGroup.add(modelAnchor);

      // Concept Styling Buck (Sculpted industrial silhouette floating on target marker)
      const buckGroup = buildConceptBuck(p);
      modelAnchor.add(buckGroup);

      // 6. Dedicated Museum Track Spotlight focused directly down onto this plinth
      const spot = new THREE.SpotLight(0xfff7ed, 1.8, 14, Math.PI / 4.4, 0.55, 1.2);
      spot.position.set(p.x, 8.6, -1.8);
      spot.target.position.set(p.x, 2.0, -2.2);
      spot.castShadow = true;
      spot.shadow.mapSize.set(512, 512);
      spot.shadow.bias = -0.0003;
      scene.add(spot);
      scene.add(spot.target);
      spotlights[p.id] = spot;

      // Fixture housing on track bar
      addBox(0.4, 0.35, 0.4, MAT.darkPlaque, [p.x, 8.7, -1.8], scene, false, false);

      // 7. Hit Proxy for 0ms CPU Raycasting
      const proxy = new THREE.Mesh(
        new THREE.BoxGeometry(3.8, 3.4, 2.8),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      proxy.position.set(p.x, 2.4, -2.2);
      proxy.userData.productId = p.id;
      proxy.userData.markerGroup = markerGroup;
      proxy.userData.modelAnchor = modelAnchor;
      scene.add(proxy);
      hitProxies.push(proxy);

      scene.add(plinthGroup);
      const pObj = {
        group: plinthGroup,
        marker: markerGroup,
        modelAnchor: modelAnchor,
        buck: buckGroup,
        spot: spot,
        data: p,
        baseX: p.x,
        loadedModel: null
      };
      plinthObjects[p.id] = pObj;

      // Load custom .glb model
      tryLoadCustomGLB(p, modelAnchor, buckGroup, pObj);
    });
  }

  // Sculpted architectural concept buck for placeholder display
  function buildConceptBuck(cfg) {
    const g = new THREE.Group();
    const mat = (cfg.id === 'nexus-haptic-handle') ? MAT.forgedCarbon : MAT.frostedAcrylic;

    if (cfg.id === 'nexus-haptic-handle') {
      // Ergonomic power tool handle silhouette
      const mainGrip = addBox(0.85, 1.7, 0.65, mat, [0, 0.85, 0], g);
      mainGrip.rotation.z = -0.15; // 108° angle
      // Tool Head & Anodized Dial
      addBox(1.3, 0.65, 0.8, mat, [-0.15, 1.6, 0], g);
      addBox(0.2, 0.35, 0.35, new THREE.MeshStandardMaterial({ color: cfg.accent, roughness: 0.25, metalness: 0.9 }), [0.55, 1.6, 0], g);
      // Battery Base
      addBox(0.95, 0.45, 0.8, mat, [0.2, 0.22, 0], g);
      // Glowing CMF Accent Strip
      addBox(0.04, 1.4, 0.05, new THREE.MeshBasicMaterial({ color: cfg.accent }), [-0.38, 0.85, 0.34], g, false, false);
    } else if (cfg.id === 'ebs-tech') {
      // Sleek Autonomous Urban Transit Pod buck (silhouette while GLB is loading)
      addBox(2.1, 1.25, 1.3, new THREE.MeshStandardMaterial({ color: 0xefede8, roughness: 0.25, metalness: 0.1 }), [0, 0.75, 0], g);
      // Tinted Panoramic Glass Window band
      addBox(2.12, 0.65, 1.32, new THREE.MeshStandardMaterial({ color: 0x111317, roughness: 0.1, metalness: 0.85, transparent: true, opacity: 0.85 }), [0, 0.85, 0], g);
      // Lower Cladding
      addBox(2.14, 0.35, 1.34, new THREE.MeshStandardMaterial({ color: 0x23272f, roughness: 0.7, metalness: 0.1 }), [0, 0.2, 0], g);
      // Accent lighting strip
      addBox(2.16, 0.03, 1.36, new THREE.MeshBasicMaterial({ color: cfg.accent }), [0, 0.4, 0], g);
    } else if (cfg.id === 'aura-air-node') {
      // Computational Air Purifier Toroidal Silhouette
      const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.75, 1.65, 36), mat);
      cyl.position.y = 0.85;
      cyl.castShadow = true;
      g.add(cyl);
      // Toroidal Top Vent Ring
      const vent = new THREE.Mesh(new THREE.TorusGeometry(0.68, 0.08, 16, 36), new THREE.MeshStandardMaterial({ color: 0x111317, roughness: 0.3, metalness: 0.8 }));
      vent.rotation.x = Math.PI / 2;
      vent.position.y = 1.68;
      g.add(vent);
      // Glowing Halo Ring
      const halo = new THREE.Mesh(new THREE.TorusGeometry(0.74, 0.02, 12, 36), new THREE.MeshBasicMaterial({ color: cfg.accent }));
      halo.rotation.x = Math.PI / 2;
      halo.position.y = 1.62;
      g.add(halo);
    } else {
      // Telemetry Module
      const box = addBox(1.2, 0.75, 1.2, mat, [0, 0.4, 0], g);
      const dome = new THREE.Mesh(new THREE.SphereGeometry(0.45, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x0f131a, roughness: 0.1, metalness: 0.9 }));
      dome.position.y = 0.75;
      g.add(dome);
      addBox(1.22, 0.04, 1.22, new THREE.MeshBasicMaterial({ color: cfg.accent }), [0, 0.4, 0], g, false, false);
    }

    return g;
  }

  // Attempts to load custom GLB if user places one in the project
  function tryLoadCustomGLB(productCfg, parentAnchor, placeholderBuck, pObj) {
    const rawPaths = [
      productCfg.modelUrl,
      'assets/Project_2/3D Models/Segmented 3D model_ Max · Balanced 3D model.glb',
      'assets/Project_2/3D%20Models/Segmented%203D%20model_%20Max%20%C2%B7%20Balanced%203D%20model.glb',
      `assets/workshop/${productCfg.id}.glb`,
      `assets/Project_2/${productCfg.id}.glb`
    ].filter(Boolean);

    const candidatePaths = [];
    rawPaths.forEach(p => {
      const enc = encodeURI(p);
      if (!candidatePaths.includes(enc)) candidatePaths.push(enc);
      if (!candidatePaths.includes(p)) candidatePaths.push(p);
    });

    const loader = new GLTFLoader();

    function tryPath(idx) {
      if (idx >= candidatePaths.length) return;
      const url = candidatePaths[idx];

      loader.load(
        url,
        (gltf) => {
          if (placeholderBuck && placeholderBuck.parent) {
            placeholderBuck.parent.remove(placeholderBuck);
          }
          const model = gltf.scene;

          const box = new THREE.Box3().setFromObject(model);
          const size = new THREE.Vector3();
          box.getSize(size);
          const maxDim = Math.max(size.x, size.y, size.z);
          // Scale nicely on plinth (width 3.6, depth 2.6)
          const targetScale = 2.4 / (maxDim || 1);
          model.scale.setScalar(targetScale);

          const scaledBox = new THREE.Box3().setFromObject(model);
          const scaledCenter = new THREE.Vector3();
          scaledBox.getCenter(scaledCenter);

          // Center horizontally and rest bottom flush on plinth top
          model.position.set(-scaledCenter.x, -scaledBox.min.y, -scaledCenter.z);

          model.traverse(node => {
            if (node.isMesh) {
              node.castShadow = true;
              node.receiveShadow = true;
              if (node.material) {
                node.material.roughness = Math.min(Math.max(node.material.roughness, 0.2), 0.85);
              }
            }
          });

          parentAnchor.add(model);
          if (pObj) pObj.loadedModel = model;
          console.log(`[Workshop] Loaded custom 3D model for ${productCfg.id} from ${url}`);
        },
        null,
        (err) => {
          console.warn(`[Workshop] Candidate ${url} could not load, checking next...`);
          tryPath(idx + 1);
        }
      );
    }

    tryPath(0);
  }

  /* =========================================================================
     ORBIT CONTROLS & CAMERA BOUNDS
     ========================================================================= */
  function setupControls() {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.minDistance = 2.4;
    controls.maxDistance = 11.5;
    controls.minPolarAngle = 0.35;
    controls.maxPolarAngle = Math.PI / 2 - 0.06;
    controls.target.set(0, 2.0, -2.2);
  }

  /* =========================================================================
     HUD, NAVIGATION BAR & PRODUCT DETAIL PANEL
     ========================================================================= */
  function setupHUD(container) {
    // Status Badge
    const status = document.createElement('div');
    status.className = 'workshop-hud-status';
    status.innerHTML = `<span class="hud-dot"></span><span>✦ Scandinavian Ash Workshop • Click Any Product Plinth</span>`;
    container.appendChild(status);

    setTimeout(() => {
      status.style.transition = 'opacity 1.2s';
      status.style.opacity = '0';
      setTimeout(() => status.remove(), 1300);
    }, 6000);

    // Bottom Navigation Bar
    const hudBar = document.createElement('div');
    hudBar.className = 'workshop-hud-bar';
    hudBar.innerHTML = `
      <button class="workshop-hud-btn active" id="btn-show-all">Overview</button>
      <div class="workshop-hud-separator"></div>
      <button class="workshop-hud-btn" data-product="ebs-tech">01: EBS Tech (3D)</button>
      <div class="workshop-hud-separator"></div>
      <button class="workshop-hud-btn" id="btn-reset-workshop">Reset View</button>
    `;
    container.appendChild(hudBar);

    hudBar.querySelector('#btn-show-all').addEventListener('click', () => {
      resetToGallery();
      updateHudActive(hudBar, '#btn-show-all');
    });

    hudBar.querySelector('#btn-reset-workshop').addEventListener('click', () => {
      resetToGallery();
      updateHudActive(hudBar, '#btn-show-all');
    });

    hudBar.querySelectorAll('[data-product]').forEach(btn => {
      btn.addEventListener('click', () => {
        focusProduct(btn.dataset.product);
        updateHudActive(hudBar, btn);
      });
    });
  }

  function updateHudActive(hudBar, activeElOrSelector) {
    hudBar.querySelectorAll('.workshop-hud-btn').forEach(b => b.classList.remove('active'));
    const target = (typeof activeElOrSelector === 'string')
      ? hudBar.querySelector(activeElOrSelector)
      : activeElOrSelector;
    if (target) target.classList.add('active');
  }

  /* =========================================================================
     INTERACTION & RAYCASTING (0ms CPU Overhead on hitProxies)
     ========================================================================= */
  let hoveredId = null;

  function onMouseMove(ev) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(hitProxies, false);

    if (hits.length > 0) {
      const pid = hits[0].object.userData.productId;
      renderer.domElement.style.cursor = 'pointer';

      if (hoveredId !== pid) {
        hoveredId = pid;
        // Boost spotlight on hover
        Object.entries(spotlights).forEach(([id, sp]) => {
          sp.targetIntensity = (id === pid) ? 3.0 : 1.4;
        });
      }
    } else {
      renderer.domElement.style.cursor = 'default';
      if (hoveredId && !activeProductId) {
        hoveredId = null;
        Object.values(spotlights).forEach(sp => { sp.targetIntensity = 1.8; });
      }
    }
  }

  function onClick(ev) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(hitProxies, false);

    if (hits.length > 0) {
      const pid = hits[0].object.userData.productId;
      focusProduct(pid);
    }
  }

  function focusProduct(productId) {
    const pObj = plinthObjects[productId];
    if (!pObj) return;

    activeProductId = productId;

    // Highlight spotlight on selected product
    Object.entries(spotlights).forEach(([id, sp]) => {
      sp.targetIntensity = (id === productId) ? 3.4 : 0.8;
    });

    const targetPos = new THREE.Vector3(pObj.baseX, 2.15, -2.2);
    const endCamPos = new THREE.Vector3(pObj.baseX + 1.8, 2.9, 1.2);

    controls.minDistance = 1.8;
    controls.maxDistance = 5.2;

    animateCameraTo(endCamPos, targetPos, 850, () => {
      openProductPanel(productId);
    });
  }

  function resetToGallery() {
    activeProductId = null;
    hoveredId = null;

    Object.values(spotlights).forEach(sp => { sp.targetIntensity = 1.8; });

    controls.minDistance = 2.4;
    controls.maxDistance = 11.5;

    animateCameraTo(new THREE.Vector3(0, 3.2, 9.2), new THREE.Vector3(0, 2.0, -2.2), 750, () => {
      const panel = document.getElementById('product-info-panel');
      if (panel) panel.classList.remove('visible');
    });
  }

  function animateCameraTo(endCamPos, endTarget, duration = 750, onComplete = null) {
    const startCamPos = camera.position.clone();
    const startTarget = controls.target.clone();
    let startTime = null;

    function step(now) {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      camera.position.lerpVectors(startCamPos, endCamPos, ease);
      controls.target.lerpVectors(startTarget, endTarget, ease);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else if (onComplete) {
        onComplete();
      }
    }
    requestAnimationFrame(step);
  }

  /* =========================================================================
     PRODUCT DETAIL PANEL (CMF Matrix, Process Stages & Custom GLB Instructions)
     ========================================================================= */
  function openProductPanel(productId) {
    const panel = document.getElementById('product-info-panel');
    if (!panel) return;

    // Fetch data from PORTFOLIO_DATA.workshop or fallbacks
    const rawData = (typeof PORTFOLIO_DATA !== 'undefined' && PORTFOLIO_DATA.workshop)
      ? PORTFOLIO_DATA.workshop.find(p => p.id === productId)
      : null;

    const data = rawData || getDefaultProductData(productId);

    // Render Panel HTML
    panel.innerHTML = `
      <button class="panel-close-btn" id="panel-close-btn" title="Close Panel">&times;</button>
      
      <div>
        <div class="panel-category">${data.category}</div>
        <h3 class="panel-title">${data.title}</h3>
      </div>

      <!-- CMF Matrix Callout -->
      <div class="cmf-matrix-box">
        <div class="cmf-matrix-title">
          <span>✦ CMF Materials & Texture Matrix</span>
        </div>
        <div class="cmf-tags-grid">
          ${getCMFTags(productId).map(t => `<span class="cmf-tag-pill">${t}</span>`).join('')}
        </div>
      </div>

      <!-- 3-Stage Design Process Switcher -->
      ${data.stages ? `
        <div>
          <div class="panel-stages-nav" id="panel-stages-nav">
            <button class="panel-stage-btn ${currentStageKey === 'ideation' ? 'active' : ''}" data-stage="ideation">01 Ideation</button>
            <button class="panel-stage-btn ${currentStageKey === 'rendering' ? 'active' : ''}" data-stage="rendering">02 CAD/CMF</button>
            <button class="panel-stage-btn ${currentStageKey === 'prototyping' ? 'active' : ''}" data-stage="prototyping">03 Prototyping</button>
          </div>
          <div id="stage-card-mount" style="margin-top: 0.85rem;">
            ${buildStageCardHTML(data.stages[currentStageKey])}
          </div>
        </div>
      ` : ''}

      <!-- Custom 3D Model Notice -->
      <div class="glb-upload-notice">
        <strong>✦ Import Your 3D Model:</strong><br>
        Place your exported <code>${productId}.glb</code> file into <code>assets/workshop/</code> or <code>assets/Project_2/</code> to automatically replace the concept plinth silhouette with your live 3D mesh.
      </div>
    `;

    panel.classList.add('visible');

    // Bind Close Button
    const closeBtn = panel.querySelector('#panel-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        panel.classList.remove('visible');
        resetToGallery();
      });
    }

    // Bind Stage Tabs
    const stagesNav = panel.querySelector('#panel-stages-nav');
    if (stagesNav && data.stages) {
      stagesNav.querySelectorAll('.panel-stage-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          currentStageKey = btn.dataset.stage;
          stagesNav.querySelectorAll('.panel-stage-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const mount = panel.querySelector('#stage-card-mount');
          if (mount) {
            mount.innerHTML = buildStageCardHTML(data.stages[currentStageKey]);
          }
        });
      });
    }
  }

  function buildStageCardHTML(stage) {
    if (!stage) return '';
    let specsHtml = '';
    if (stage.specs) {
      Object.entries(stage.specs).forEach(([k, v]) => {
        specsHtml += `
          <div class="panel-spec-item">
            <span class="panel-spec-k">${k}</span>
            <span class="panel-spec-v">${v}</span>
          </div>
        `;
      });
    }

    return `
      <div class="panel-stage-card">
        ${stage.image ? `<img src="${stage.image}" alt="${stage.title}" class="panel-stage-img" loading="lazy" />` : ''}
        <div class="panel-stage-body">
          <h4 class="panel-stage-title">${stage.title}</h4>
          <p class="panel-stage-desc">${stage.description}</p>
          <div class="panel-specs-grid">${specsHtml}</div>
        </div>
      </div>
    `;
  }

  function getCMFTags(productId) {
    if (productId === 'nexus-haptic-handle') {
      return [
        'Continuous Twill Carbon Shell',
        '6061-T6 Anodized Amber CNC',
        '108° Ergonomic Santoprene Grip',
        'Formlabs SLA Tough 2000',
        'Micro-Resonant Haptic Core'
      ];
    } else if (productId === 'ebs-tech') {
      return [
        'Class-A Segmented Surfacing',
        'Ceramic Gloss White Unibody',
        'Satin Basalt Lower Cladding',
        'Smart Electrochromic Glazing',
        'Aerodynamic Disc Wheel Covers',
        'Flush 360° LIDAR & Radar Pods'
      ];
    } else if (productId === 'aura-air-node') {
      return [
        'Bead-Blasted Recycled Aluminum',
        'Grasshopper Parametric Perforations',
        'Sub-Surface Status Halo (0x10b981)',
        'Injection Molded ABS Chassis',
        'Dual HEPA H13 Filter Core'
      ];
    }
    return [
      'Aerospace Titanium Housing',
      'Optical Sapphire Top Cap',
      'Matte Dark Basalt Finish',
      'IP68 Hermetic O-Ring Seal',
      'Integrated Lidar Sensor Array'
    ];
  }

  function getDefaultProductData(productId) {
    return {
      id: productId,
      title: 'Modular Telemetry & Sensor Node',
      category: 'Autonomous Perception Hardware',
      stages: {
        ideation: {
          title: 'Perception Geometry & Optical Ray Analysis',
          image: '',
          description: 'Designed an unibody 360° sensor puck that minimizes aerodynamic boundary layer disturbance while shielding multi-spectral lidar lenses from environmental debris.',
          specs: {
            'Field of View': '360° Horizontal × 90° Vertical',
            'Optical Window': 'Anti-Reflective Sapphire Glass',
            'Mounting': 'Quick-Disconnect Bayonet Collar'
          }
        },
        rendering: {
          title: 'Precision CAD & Thermal Fin Simulation',
          image: '',
          description: 'Modeled passive heatsink convection channels along the rear housing in SolidWorks, achieving optimal heat dissipation without internal cooling fans.',
          specs: {
            'Material': '6063 Aluminum Extrusion',
            'Finish': 'Type III Hard Anodize Charcoal',
            'Thermal TDP': '18 Watts Passive Rejection'
          }
        },
        prototyping: {
          title: 'Direct Metal Laser Sintering (DMLS)',
          image: '',
          description: 'Additive manufactured functional titanium test housings for vibration resonance validation on high-speed autonomous vehicle test tracks.',
          specs: {
            'Process': 'EOS DMLS Titanium Ti64',
            'Vibration Test': 'ISO 16750-3 Random Vibe 10G',
            'Ingress': 'IP68 Submersible Verified'
          }
        }
      }
    };
  }

  function setupVisibilityObserver(container) {
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(container);
  }

  function onResize() {
    const c = document.querySelector('.workshop-3d-wrapper');
    if (!c || !renderer || !camera) return;
    const W = c.offsetWidth;
    const H = c.offsetHeight;
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    renderer.setSize(W, H);
  }

  /* =========================================================================
     ANIMATION LOOP (Smooth Delta-Time Rotation & Gentle Hover Effects)
     ========================================================================= */
  function animate() {
    requestAnimationFrame(animate);

    if (!isVisible) return;

    const delta = Math.min(clock.getDelta(), 0.1);
    const time = clock.getElapsedTime();

    // Gentle micro-animation on concept models & target markers
    Object.values(plinthObjects).forEach((pObj, idx) => {
      if (pObj.loadedModel) {
        // Slow architectural showcase rotation
        pObj.loadedModel.rotation.y += 0.2 * delta;
      } else if (pObj.buck) {
        // Subtle floating levitation
        pObj.buck.position.y = 0.04 * Math.sin(time * 1.8 + idx * 1.5);
        pObj.buck.rotation.y += 0.25 * delta;
      }
      if (pObj.marker) {
        // Subtle rhythmic target pulse
        const s = 1.0 + 0.03 * Math.sin(time * 2.2 + idx * 1.2);
        pObj.marker.scale.set(s, 1, s);
      }
      if (pObj.spot && pObj.spot.targetIntensity !== undefined) {
        pObj.spot.intensity += (pObj.spot.targetIntensity - pObj.spot.intensity) * 0.1;
      }
    });

    if (controls) controls.update();

    // Strict boundary safety clamp inside the room
    camera.position.x = THREE.MathUtils.clamp(camera.position.x, -14, 14);
    camera.position.y = THREE.MathUtils.clamp(camera.position.y, 0.8, 8.5);
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, -3.2, 11.0);

    renderer.render(scene, camera);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
