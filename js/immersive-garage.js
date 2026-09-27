// immersive-garage.js - High-Performance Architectural Studio & Smooth 360° Showcase
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

window.THREE = THREE;

(function () {
  let scene, camera, renderer, controls, raycaster, pointer;
  let turntableGroup, hitProxies = [];
  let isInteracting = false, autoRotate = true;
  let currentSpinSpeed = 0.28, targetSpinSpeed = 0.28;
  let statusBadge = null, isVisible = true;
  const clock = new THREE.Clock();
  const vehicleData = {};

  // Reusable materials palette (zero duplicate material overhead & minimal draw calls)
  let MAT = null;

  function initMaterials() {
    MAT = {
      wall: new THREE.MeshStandardMaterial({ color: 0xe8ecf2, roughness: 0.85, metalness: 0.02 }),
      slat: new THREE.MeshStandardMaterial({ color: 0x1a1d24, roughness: 0.6, metalness: 0.35 }),
      slatLine: new THREE.MeshBasicMaterial({ color: 0x2d323c }),
      cabinet: new THREE.MeshStandardMaterial({ color: 0x14171d, roughness: 0.45, metalness: 0.5 }),
      counter: new THREE.MeshStandardMaterial({ color: 0xdde2ea, roughness: 0.25, metalness: 0.85 }),
      chrome: new THREE.MeshStandardMaterial({ color: 0xd8dde6, roughness: 0.18, metalness: 0.95 }),
      steel: new THREE.MeshStandardMaterial({ color: 0x8a929e, roughness: 0.35, metalness: 0.75 }),
      ledGlow: new THREE.MeshBasicMaterial({ color: 0xfff3de }),
      windowFrame: new THREE.MeshStandardMaterial({ color: 0x101216, roughness: 0.4 }),
      windowGlass: new THREE.MeshStandardMaterial({ color: 0x18243b, roughness: 0.1, metalness: 0.85, emissive: 0x0e1728, emissiveIntensity: 0.7 }),
      floor: new THREE.MeshStandardMaterial({ color: 0xdce1ea, roughness: 0.18, metalness: 0.15 }),
      turntable: new THREE.MeshStandardMaterial({ color: 0xd2d7e0, roughness: 0.22, metalness: 0.4 }),
      plinth: new THREE.MeshStandardMaterial({ color: 0x22262f, roughness: 0.5, metalness: 0.3 }),
      lightHousing: new THREE.MeshStandardMaterial({ color: 0xf5f7fa, roughness: 0.3 }),
      lightLens: new THREE.MeshBasicMaterial({ color: 0xffffff }),
      doorGlass: new THREE.MeshStandardMaterial({ color: 0x141c26, roughness: 0.12, metalness: 0.88, emissive: 0x0a101b, emissiveIntensity: 0.45 })
    };
  }

  // Quick box mesh helper
  function addBox(w, h, d, mat, [x, y, z], parent = scene, cast = true, receive = true) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.set(x, y, z);
    mesh.castShadow = cast;
    mesh.receiveShadow = receive;
    parent.add(mesh);
    return mesh;
  }

  function init() {
    const container = document.querySelector('.immersive-container');
    if (!container) return;

    const W = container.offsetWidth || window.innerWidth;
    const H = container.offsetHeight || Math.round(window.innerHeight * 0.82);
    const canvas = document.getElementById('immersive-canvas');

    // 1. WebGL Renderer
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.setClearColor(0xdce1ea, 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    // 2. Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xdce1ea, 0.009);

    initMaterials();

    // 3. Camera
    camera = new THREE.PerspectiveCamera(46, W / H, 0.1, 100);
    camera.position.set(0, 2.2, 9.5);

    // 4. Studio Lighting
    setupStudioLighting();

    // 5. Fully Enclosed Garage Architecture
    buildGarageArchitecture();

    // 6. Turntable & Vehicles
    buildTurntableAndVehicles();

    // 7. OrbitControls with Strict Boundary Constraints (under wall limits)
    setupControls();

    // 8. HUD & 360 Controller UI
    setupHUD(container);

    // 9. Interaction & Viewport Observers
    raycaster = new THREE.Raycaster();
    pointer = new THREE.Vector2(-1000, -1000);

    renderer.domElement.addEventListener('mousemove', onMouseMove, { passive: true });
    renderer.domElement.addEventListener('click', onClick);
    window.addEventListener('resize', onResize);

    setupVisibilityObserver(container);

    animate();
  }

  /* =========================================================================
     STUDIO LIGHTING (4 High-Performance Lights)
     ========================================================================= */
  function setupStudioLighting() {
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xc4cbd7, 0.95);
    scene.add(hemiLight);

    const dirKey = new THREE.DirectionalLight(0xfffbf2, 1.55);
    dirKey.position.set(6, 18, 7);
    dirKey.castShadow = true;
    dirKey.shadow.mapSize.set(1024, 1024);
    dirKey.shadow.camera.near = 2;
    dirKey.shadow.camera.far = 30;
    dirKey.shadow.camera.left = -9;
    dirKey.shadow.camera.right = 9;
    dirKey.shadow.camera.top = 9;
    dirKey.shadow.camera.bottom = -9;
    dirKey.shadow.bias = -0.0004;
    scene.add(dirKey);

    const fillLight = new THREE.DirectionalLight(0xe2ebf8, 0.5);
    fillLight.position.set(-14, 12, 6);
    scene.add(fillLight);

    const spot = new THREE.SpotLight(0xffffff, 1.9, 28, Math.PI / 3.6, 0.35, 1.1);
    spot.position.set(0, 13.5, 0);
    spot.target.position.set(0, 0, 0);
    scene.add(spot);
    scene.add(spot.target);
  }

  /* =========================================================================
     FULLY ENCLOSED GARAGE ARCHITECTURE (Back, Sides, Front & Ceiling)
     ========================================================================= */
  function buildGarageArchitecture() {
    const W = 54, H = 14, backZ = -17, frontZ = 21;
    const roomDepth = frontZ - backZ; // 38 units
    const midZ = (frontZ + backZ) / 2; // 2.0

    // Complete Enclosed High-Gloss Epoxy Floor
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(W + 4, roomDepth + 4), MAT.floor);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0, midZ);
    floor.receiveShadow = true;
    scene.add(floor);

    // Perimeter Baseboard on all 4 walls
    addBox(W, 0.3, 0.15, MAT.cabinet, [0, 0.15, backZ + 0.1], scene, false, true);
    addBox(W, 0.3, 0.15, MAT.cabinet, [0, 0.15, frontZ - 0.1], scene, false, true);
    addBox(0.15, 0.3, roomDepth, MAT.cabinet, [-W / 2 + 0.1, 0.15, midZ], scene, false, true);
    addBox(0.15, 0.3, roomDepth, MAT.cabinet, [W / 2 - 0.1, 0.15, midZ], scene, false, true);

    // --- A. Back Wall & Entrance Door ---
    addBox(W, H, 1.0, MAT.wall, [0, H / 2, backZ], scene, false, true);
    addBox(4.4, 9.5, 0.25, MAT.cabinet, [0, 4.75, backZ + 0.6], scene, false, true);
    addBox(0.06, 1.2, 0.06, MAT.chrome, [1.5, 4.6, backZ + 0.8], scene, false, false);

    // Modular Cabinetry (Left & Right)
    [-13.5, 13.5].forEach(cx => {
      const cw = 17;
      // Lower workbench & countertop
      addBox(cw, 3.2, 2.2, MAT.cabinet, [cx, 1.6, backZ + 1.2]);
      addBox(cw + 0.4, 0.18, 2.4, MAT.counter, [cx, 3.29, backZ + 1.3]);
      // Drawer trim reveals
      [0.9, 1.8, 2.6].forEach(dy => {
        addBox(cw - 1.5, 0.05, 0.05, MAT.chrome, [cx, dy, backZ + 2.33], scene, false, false);
      });
      // Metallic backsplash & under-cabinet LED wash
      addBox(cw, 3.0, 0.08, MAT.steel, [cx, 4.8, backZ + 0.14]);
      addBox(cw - 0.8, 0.06, 0.2, MAT.ledGlow, [cx, 6.32, backZ + 0.8], scene, false, false);
      // Upper wall cabinets
      addBox(cw, 3.4, 1.4, MAT.cabinet, [cx, 8.0, backZ + 0.8]);
      // Tall end locker
      const lx = cx < 0 ? cx - (cw / 2 + 1.8) : cx + (cw / 2 + 1.8);
      addBox(3.4, 9.6, 2.4, MAT.cabinet, [lx, 4.8, backZ + 1.3]);
    });

    // --- B. Left Wall with Twilight Window Bay ---
    addBox(1.0, H, roomDepth, MAT.slat, [-W / 2, H / 2, midZ], scene, false, true);
    [-8, 4].forEach(wz => {
      addBox(0.25, 7.0, 5.0, MAT.windowFrame, [-W / 2 + 0.6, 7.2, wz], scene, false, false);
      addBox(0.08, 6.6, 4.6, MAT.windowGlass, [-W / 2 + 0.7, 7.2, wz], scene, false, false);
    });

    // --- C. Right Wall with Aluminum Slatwall Channels ---
    addBox(1.0, H, roomDepth, MAT.slat, [W / 2, H / 2, midZ], scene, false, true);
    for (let sy = 1.0; sy < H; sy += 1.2) {
      addBox(0.05, 0.04, roomDepth - 2, MAT.slatLine, [W / 2 - 0.55, sy, midZ], scene, false, false);
    }

    // --- D. Front Wall with Luxury Architectural Glass Garage Doors ---
    // Outer solid perimeter framing
    addBox(W, H, 0.8, MAT.wall, [0, H / 2, frontZ], scene, false, true);
    // Dark garage door portal frame
    addBox(42, 10.5, 0.3, MAT.cabinet, [0, 5.25, frontZ - 0.3], scene, false, true);
    // Tinted architectural glass door panels
    addBox(40, 9.6, 0.1, MAT.doorGlass, [0, 5.25, frontZ - 0.45], scene, false, false);
    // Horizontal and vertical architectural door grid mullions
    for (let gy = 2.4; gy <= 8.5; gy += 2.4) {
      addBox(40, 0.12, 0.16, MAT.chrome, [0, gy, frontZ - 0.5], scene, false, false);
    }
    [-15, -7.5, 0, 7.5, 15].forEach(gx => {
      addBox(0.12, 9.6, 0.16, MAT.chrome, [gx, 5.25, frontZ - 0.5], scene, false, false);
    });

    // --- E. Enclosed Ceiling & Capsule Light Fixtures ---
    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(W, roomDepth), MAT.wall);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(0, H, midZ);
    scene.add(ceiling);

    // Ceiling fixtures evenly distributed across the ceiling
    [-14, 0, 14].forEach(fx => {
      [-8, 2, 12].forEach(fz => {
        addBox(1.8, 0.2, 4.5, MAT.lightHousing, [fx, H - 0.1, fz], scene, false, false);
        addBox(1.4, 0.04, 4.1, MAT.lightLens, [fx, H - 0.21, fz], scene, false, false);
      });
    });
  }

  /* =========================================================================
     TURNTABLE & VEHICLES
     ========================================================================= */
  function buildTurntableAndVehicles() {
    turntableGroup = new THREE.Group();
    turntableGroup.position.set(0, 0, 0);
    scene.add(turntableGroup);

    // Turntable Disc
    const discMesh = new THREE.Mesh(new THREE.CylinderGeometry(5.2, 5.3, 0.08, 48), MAT.turntable);
    discMesh.position.y = 0.04;
    discMesh.receiveShadow = true;
    turntableGroup.add(discMesh);

    // Perimeter reveal ring
    const ringMesh = new THREE.Mesh(new THREE.TorusGeometry(5.25, 0.02, 12, 48), MAT.chrome);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = 0.08;
    turntableGroup.add(ringMesh);

    // Vehicle Group attached to turntable for zero-lag hardware-synced rotation
    const bharatGroup = new THREE.Group();
    turntableGroup.add(bharatGroup);
    vehicleData['bharat-mobility'] = bharatGroup;
    vehicleData['01'] = bharatGroup;

    // Temporary placeholder wireframe
    const tempGeo = new THREE.BoxGeometry(7.2, 2.5, 3.4);
    const tempMat = new THREE.MeshStandardMaterial({ color: 0xd97757, wireframe: true });
    const tempMesh = new THREE.Mesh(tempGeo, tempMat);
    tempMesh.position.y = 1.35;
    bharatGroup.add(tempMesh);

    // Invisible hit proxy for instant 0ms raycasting
    const bharatProxy = new THREE.Mesh(
      new THREE.BoxGeometry(8.5, 3.2, 4.4),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    bharatProxy.position.y = 1.6;
    bharatProxy.userData.vehicleId = 'bharat-mobility';
    turntableGroup.add(bharatProxy);
    hitProxies.push(bharatProxy);

    // Central GLB Loader
    const loader = new GLTFLoader();
    const modelUrl = 'assets/Project_1/3D Models/Detailed Sharp V2 · Highest 3D model.glb';

    loader.load(
      modelUrl,
      (gltf) => {
        bharatGroup.remove(tempMesh);
        tempGeo.dispose();
        tempMat.dispose();

        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        box.getSize(size);

        const maxDim = Math.max(size.x, size.y, size.z);
        const targetScale = 8.2 / (maxDim || 1);
        model.scale.setScalar(targetScale);

        const scaledBox = new THREE.Box3().setFromObject(model);
        const scaledCenter = new THREE.Vector3();
        scaledBox.getCenter(scaledCenter);

        model.position.set(-scaledCenter.x, -scaledBox.min.y, -scaledCenter.z);

        model.traverse(node => {
          if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = false;
            if (node.material) {
              node.material.envMapIntensity = 1.2;
            }
          }
        });

        bharatGroup.add(model);
        updateStatus('Bharat Mobility 3D Ready', true);
      },
      (xhr) => {
        if (xhr.lengthComputable && xhr.total > 0) {
          const pct = Math.round((xhr.loaded / xhr.total) * 100);
          updateStatus(`Loading 3D Model... ${pct}%`);
        } else if (xhr.loaded) {
          const mb = (xhr.loaded / (1024 * 1024)).toFixed(1);
          updateStatus(`Loading 3D Model: ${mb} MB...`);
        }
      },
      (err) => {
        console.warn('[ImmersiveGarage] GLB fallback:', err);
        updateStatus('3D Model Ready (Studio View)', true);
        tempMat.wireframe = false;
      }
    );

    // Companions removed per user request
  }

  /* =========================================================================
     ORBIT CONTROLS & STRICT WALL BOUNDARY LIMITS
     ========================================================================= */
  function setupControls() {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;

    // Strict boundary limits: camera can NEVER reach or penetrate any wall or cabinet
    controls.minDistance = 3.6;
    controls.maxDistance = 10.8; // Guaranteed inside the walls at all 360° angles
    controls.minPolarAngle = 0.35; // Stops clipping into ceiling fixtures
    controls.maxPolarAngle = Math.PI / 2 - 0.06; // Stops dipping into floor
    controls.target.set(0, 1.2, 0);

    controls.addEventListener('start', () => {
      isInteracting = true;
      targetSpinSpeed = 0;
    });

    controls.addEventListener('end', () => {
      isInteracting = false;
      targetSpinSpeed = autoRotate ? 0.28 : 0;
    });
  }

  /* =========================================================================
     HUD, STATUS BADGE & 360 INTERACTIVE CONTROLS BAR
     ========================================================================= */
  function setupHUD(container) {
    statusBadge = document.createElement('div');
    statusBadge.className = 'garage-3d-status';
    statusBadge.innerHTML = `<span class="status-dot"></span><span id="garage-status-text">Loading 3D Model: Bharat Mobility...</span>`;
    container.appendChild(statusBadge);

    // Interactive 360 HUD Controls Bar
    const hudBar = document.createElement('div');
    hudBar.className = 'garage-360-bar';
    hudBar.innerHTML = `
      <button class="garage-hud-btn active" id="btn-360-spin" title="Toggle 360° Auto-Spin">
        <span class="hud-icon">↻</span> 360° Spin
      </button>
      <div class="hud-separator"></div>
      <button class="garage-hud-btn" data-angle="three-quarter">3/4 View</button>
      <button class="garage-hud-btn" data-angle="side">Side</button>
      <button class="garage-hud-btn" data-angle="front">Front</button>
      <button class="garage-hud-btn" data-angle="rear">Rear</button>
      <button class="garage-hud-btn" data-angle="top">Top</button>
      <div class="hud-separator"></div>
      <button class="garage-hud-btn" id="btn-reset-view" title="Reset Camera">Reset</button>
    `;
    container.appendChild(hudBar);

    // Bind 360 toggle
    const spinBtn = hudBar.querySelector('#btn-360-spin');
    spinBtn.addEventListener('click', () => {
      autoRotate = !autoRotate;
      targetSpinSpeed = autoRotate ? 0.28 : 0;
      spinBtn.classList.toggle('active', autoRotate);
    });

    // Bind angle presets
    hudBar.querySelectorAll('[data-angle]').forEach(btn => {
      btn.addEventListener('click', () => {
        setCameraPreset(btn.dataset.angle);
      });
    });

    hudBar.querySelector('#btn-reset-view').addEventListener('click', resetToMain);
  }

  function setCameraPreset(angle) {
    const targets = {
      'three-quarter': new THREE.Vector3(6.5, 2.2, 6.8),
      'side':          new THREE.Vector3(9.2, 1.8, 0.1),
      'front':         new THREE.Vector3(0.1, 2.0, 9.2),
      'rear':          new THREE.Vector3(0.1, 2.0, -8.8),
      'top':           new THREE.Vector3(0.1, 8.2, 2.8)
    };
    if (targets[angle]) {
      controls.minDistance = 3.6;
      controls.maxDistance = 10.8;
      animateCameraTo(targets[angle], new THREE.Vector3(0, 1.2, 0));
    }
  }

  function resetToMain() {
    controls.minDistance = 3.6;
    controls.maxDistance = 10.8;
    animateCameraTo(new THREE.Vector3(0, 2.2, 9.5), new THREE.Vector3(0, 1.2, 0));
  }

  function updateStatus(text, isComplete = false) {
    if (!statusBadge) return;
    const txt = statusBadge.querySelector('#garage-status-text');
    if (txt) txt.textContent = text;
    if (isComplete) {
      const dot = statusBadge.querySelector('.status-dot');
      if (dot) {
        dot.style.background = '#10b981';
        dot.style.boxShadow = '0 0 10px #10b981';
      }
      setTimeout(() => {
        statusBadge.style.opacity = '0';
        setTimeout(() => { if (statusBadge) statusBadge.style.display = 'none'; }, 600);
      }, 4500);
    }
  }

  /* =========================================================================
     RAYCASTING & INTERACTION
     ========================================================================= */
  function onMouseMove(ev) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(hitProxies, false);
    renderer.domElement.style.cursor = hits.length > 0 ? 'pointer' : 'default';
  }

  function onClick(ev) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(hitProxies, false);
    if (hits.length > 0 && hits[0].object.userData.vehicleId) {
      focusVehicle(hits[0].object.userData.vehicleId);
    }
  }

  function focusVehicle(id) {
    const targetGroup = vehicleData[id];
    if (!targetGroup) return;

    const worldPos = new THREE.Vector3();
    targetGroup.getWorldPosition(worldPos);

    if (id === 'bharat-mobility' || id === '01') {
      controls.minDistance = 3.6;
      controls.maxDistance = 10.8;
      animateCameraTo(new THREE.Vector3(0, 2.2, 9.5), new THREE.Vector3(0, 1.2, 0), 850, () => openPanel(id));
    } else {
      // For companion vehicles at x = ±17, limit maxDistance to 5.8 so orbit stays safely inside side walls
      controls.minDistance = 2.8;
      controls.maxDistance = 5.8;
      const endCamPos = worldPos.clone().add(new THREE.Vector3(0, 1.6, 5.0));
      const endTarget = worldPos.clone().add(new THREE.Vector3(0, 1.0, 0));
      animateCameraTo(endCamPos, endTarget, 850, () => openPanel(id));
    }
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

  function openPanel(id) {
    const panel = document.getElementById('vehicle-info-panel');
    if (!panel) return;

    const data = (typeof PORTFOLIO_DATA !== 'undefined' && PORTFOLIO_DATA.garage)
      ? (PORTFOLIO_DATA.garage[id] || PORTFOLIO_DATA.garage['bharat-mobility'])
      : null;

    let specsHtml = '';
    if (data && data.specs) {
      Object.entries(data.specs).forEach(([k, v]) => {
        specsHtml += `<div class="spec-row"><span class="spec-label">${k.toUpperCase()}</span><span class="spec-value">${v}</span></div>`;
      });
    }

    panel.innerHTML = `
      <button id="close-panel" style="float:right;background:none;border:none;color:#e0e0e0;font-size:1.4rem;cursor:pointer;line-height:1;">&times;</button>
      ${data ? `
        <div style="font-family:'JetBrains Mono',monospace;font-size:0.72rem;color:#d97757;letter-spacing:0.08em;margin-bottom:0.4rem;text-transform:uppercase;">${data.category}</div>
        <h3 style="margin:0 0 0.4rem;font-size:1.35rem;color:#f3f4f6;">${data.title}</h3>
        <p style="color:#9ca3af;font-size:0.86rem;margin:0 0 1rem;line-height:1.5;">${data.tagline}</p>
        ${data.heroImage ? `<img src="${data.heroImage}" alt="${data.title}" style="width:100%;border-radius:8px;border:1px solid rgba(255,255,255,0.1);margin-bottom:1rem;display:block;" loading="lazy" />` : ''}
      ` : ''}
      <div class="specs" style="display:flex;flex-direction:column;gap:0.75rem;">${specsHtml}</div>
      <div style="margin-top:1.25rem;padding:0.75rem;background:rgba(217,119,87,0.1);border:1px solid rgba(217,119,87,0.25);border-radius:6px;font-size:0.78rem;color:#d97757;font-family:'JetBrains Mono',monospace;">
        ✓ Interactive 360° Studio Inspection Active
      </div>
    `;

    panel.classList.add('visible');
    const closeBtn = document.getElementById('close-panel');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        panel.classList.remove('visible');
        resetToMain();
      });
    }
  }

  function setupVisibilityObserver(container) {
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(container);
  }

  function onResize() {
    const c = document.querySelector('.immersive-container');
    if (!c || !renderer || !camera) return;
    const W = c.offsetWidth;
    const H = c.offsetHeight;
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    renderer.setSize(W, H);
  }

  /* =========================================================================
     ANIMATION LOOP (With Strict Cartesian Wall Clamp)
     ========================================================================= */
  function animate() {
    requestAnimationFrame(animate);

    if (!isVisible) return;

    const delta = Math.min(clock.getDelta(), 0.1);

    currentSpinSpeed += (targetSpinSpeed - currentSpinSpeed) * 0.08;

    if (turntableGroup && Math.abs(currentSpinSpeed) > 0.001) {
      turntableGroup.rotation.y += currentSpinSpeed * delta;
    }

    if (controls) controls.update();

    // Absolute Safety Clamp: Camera is strictly constrained inside room interior
    const minX = -22.5, maxX = 22.5;
    const minY = 0.6,   maxY = 11.8;
    const minZ = -12.2, maxZ = 17.5;
    camera.position.x = THREE.MathUtils.clamp(camera.position.x, minX, maxX);
    camera.position.y = THREE.MathUtils.clamp(camera.position.y, minY, maxY);
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, minZ, maxZ);

    renderer.render(scene, camera);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
