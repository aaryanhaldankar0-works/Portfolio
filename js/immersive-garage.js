// immersive-garage.js — Space 04: The Colonnade Garage
// =============================================================================
// ARCHITECTURAL PHILOSOPHY: A 10-YEAR EXTENSIBLE DESIGN STUDIO SANCTUARY
// Designed to house 2 projects today, and expand naturally to 20+ projects over
// the next decade without ever requiring redesign or structural modification.
//
// Natural Sunday morning daylight. Board-formed cast concrete, warm solid timber,
// and brushed raw steel. The room quietly supports the prototypes; the vehicles
// are the architecture.
// =============================================================================

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

window.THREE = THREE;

(function () {
  // ===========================================================================
  // 10-YEAR EXTENSIBLE PROTOTYPE REGISTRY
  // To introduce a new vehicle or physical hardware system at any point in the
  // future, simply append an entry here. The colonnade hall expands procedurally,
  // floor slabs extend, natural sunbeams track, and memory streams automatically.
  // ===========================================================================
  const STUDIO_BAYS = [
    {
      id: 'bharat-mobility',
      bayNumber: '01',
      title: 'BHARAT MOBILITY POD',
      discipline: 'Transportation Design · Public Mobility',
      subtitle: 'Autonomous Last-Mile Transit Pod for Tier 2 & 3 Indian Corridors',
      assetType: 'ORIGINAL CAD MODEL',
      assetNote: 'Parametric 3D NURBS dataset (Detailed Sharp V2)',
      modelUrl: 'assets/Project_1/3D Models/Detailed Sharp V2 · Highest 3D model.glb',
      targetScale: 3.6,
      cameraOffset: new THREE.Vector3(0, 1.7, 5.6),
      footprint: { w: 1.38, l: 3.6, h: 1.7 }
    },
    {
      id: 'ebs-tech',
      bayNumber: '02',
      title: 'EMERGENCY COMMUNICATION SYSTEMS',
      discipline: 'Disaster Resilience & Hardware Design',
      subtitle: 'Decentralized Kinetic Mesh Hardware for Extreme Himalayan Terrain',
      assetType: 'ORIGINAL CAD MODEL',
      assetNote: 'Production-ready hardware assembly (Max · Highest)',
      modelUrl: 'assets/Project_2/3D Models/Max · Highest 3D model.glb',
      targetScale: 1.8,
      cameraOffset: new THREE.Vector3(0, 1.6, 5.2),
      footprint: { w: 1.1, l: 1.8, h: 1.4 }
    }
  ];

  const BAY_SPACING = 28; // Fixed architectural metric: 28 meters per bay centerline

  // CMF (Color, Material, Finish) Curated Architectural Palettes
  const CMF_PALETTES = [
    { name: 'Original Studio CMF', color: null, roughness: 0.32, metalness: 0.12 },
    { name: 'Sandstone Ochre', color: 0xba9570, roughness: 0.88, metalness: 0.04 },
    { name: 'Frosted Obsidian', color: 0x222428, roughness: 0.45, metalness: 0.72 },
    { name: 'Arctic Ceramic White', color: 0xe8e6e3, roughness: 0.28, metalness: 0.15 }
  ];

  let scene, camera, renderer, controls;
  let activeBayIndex = 0;
  let isWalkingBetweenBays = false;
  let bayWalkStart = 0;
  let bayWalkDuration = 6.8;
  let bayWalkFromCam = new THREE.Vector3();
  let bayWalkToCam = new THREE.Vector3();
  let bayWalkMidCam = new THREE.Vector3();
  let bayWalkFromTarget = new THREE.Vector3();
  let bayWalkToTarget = new THREE.Vector3();
  let bayWalkMidTarget = new THREE.Vector3();

  // Bay 3D Groups & Dynamic Streaming Management
  const bayGroups = [];
  const bayParts = {};
  const bayPackageHelpers = {};
  const bayLoadedFlags = {};
  const bayLoadingFlags = {};
  const dustSystems = [];

  // Studio Lighting Entities (Track the active bay across the 500m+ colonnade)
  let hemiLight, sunLight, skyFill;

  let isInteracting = false;
  let isVisible = true;
  let inspectionPlate = null;
  let promenadeDatum = null;
  let isCloseToVehicle = false;
  let activeShaderMode = 'exterior';
  let activeCmfIndex = 0;

  // Natural human arrival walk into Bay 01 (Deliberate, slow, unhurried, human)
  let hasWalkedIn = false, isWalkingIn = false, walkStartTime = 0;
  const walkDuration = 9.2; // 9.2 seconds of calm, deliberate human footsteps

  // Human Walk-Around Simulation (No instant spinning showroom turntable)
  let walkAroundActive = false;
  let currentOrbitSpeed = 0.0;
  const targetOrbitSpeed = 0.11; // 57 seconds per 360-degree slow human stroll

  const clock = new THREE.Clock();
  let MAT = null;

  // Quintic smootherstep for C2 continuity (zero velocity and zero acceleration at bounds)
  function smootherstep(t) {
    const clamped = Math.max(0, Math.min(1, t));
    return clamped * clamped * clamped * (clamped * (clamped * 6 - 15) + 10);
  }

  // Natural Human Walking Gait Kinematics (1.65 Hz cadence, ~99 steps/min)
  function computeGaitKinematics(elapsedSeconds, progress) {
    const envelope = Math.sin(Math.PI * Math.max(0, Math.min(1, progress)));
    const cadence = 2 * Math.PI * 1.65 * elapsedSeconds;

    // Vertical bounce: 2 peaks per stride at midstance (~2.2 cm displacement)
    const verticalBob = Math.sin(cadence * 2) * 0.022 * envelope;
    // Lateral sway: 1 cycle per stride with left/right weight transfer (~1.6 cm displacement)
    const lateralSway = Math.cos(cadence) * 0.016 * envelope;
    // Forward surge: micro-dip and push-off (~0.7 cm displacement)
    const forwardSurge = Math.sin(cadence * 2) * 0.007 * envelope;

    return { verticalBob, lateralSway, forwardSurge };
  }

  function initMaterials() {
    MAT = {
      // Board-formed architectural cast concrete (matte, warm, quiet)
      concreteWall: new THREE.MeshStandardMaterial({
        color: 0xc8c3bb,
        roughness: 0.94,
        metalness: 0.02
      }),
      // Honed architectural concrete floor slab (soft diffuse surface, long raking shadows)
      concreteFloor: new THREE.MeshStandardMaterial({
        color: 0xbdb8ae,
        roughness: 0.65,
        metalness: 0.05
      }),
      // Natural solid white oak / cedar architectural timber screen
      warmTimber: new THREE.MeshStandardMaterial({
        color: 0x8f6a45,
        roughness: 0.85,
        metalness: 0.0
      }),
      // Low architectural timber bench
      benchTimber: new THREE.MeshStandardMaterial({
        color: 0x7c5a39,
        roughness: 0.82,
        metalness: 0.0
      }),
      // Brushed raw blackened structural steel (I-beams and columns)
      brushedSteel: new THREE.MeshStandardMaterial({
        color: 0x2b2e35,
        roughness: 0.45,
        metalness: 0.82
      }),
      // Shadow reveal gap
      shadowGap: new THREE.MeshBasicMaterial({
        color: 0x181a1d
      }),
      // High clerestory morning sky glass
      clerestorySky: new THREE.MeshBasicMaterial({
        color: 0xf5f8fc
      })
    };
  }

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

    const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window);

    // 1. WebGL Renderer
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: !isMobile,
      powerPreference: 'high-performance'
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.6));
    renderer.setClearColor(0xbdb8ae, 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.02;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 2. Scene with atmospheric Sunday morning haze (Dense at threshold to veil distant objects)
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xbdb8ae, 0.038);

    initMaterials();

    // 3. Camera starts at architectural entrance doorway threshold (22.0m back, 1.72m eye level)
    camera = new THREE.PerspectiveCamera(44, W / H, 0.1, 160);
    camera.position.set(0, 1.72, 22.0);

    // 4. Sunday Morning Natural Daylight (Tracks dynamically across all bays)
    setupColonnadeLighting();

    // 5. Procedural Colonnade Architecture (Automatically expands with bay count)
    buildColonnadeArchitecture();

    // 6. Instantiate Bays & Volumetric Anchors
    buildBaysAndAnchors();

    // 7. Human-Paced Orbit Controls
    setupControls();

    // 8. Architectural Promenade Datum & Proximity Controls
    setupColonnadeDatum(container);

    // 9. Keyboard Physical Navigation ([←/→] walk down hall, [↑/↓] step in/out)
    setupKeyboardNavigation();

    window.addEventListener('resize', onResize);
    setupVisibilityObserver(container);

    animate();
  }

  /* =========================================================================
     COLONNADE LIGHTING (Natural Sunday Morning Daylight across all bays)
     ========================================================================= */
  function setupColonnadeLighting() {
    // Ambient morning sky & warm floor bounce
    hemiLight = new THREE.HemisphereLight(0xf2f6fa, 0xded9d0, 0.85);
    scene.add(hemiLight);

    // Main low-angled Sunday morning sunbeam
    sunLight = new THREE.DirectionalLight(0xffeed9, 2.3);
    sunLight.position.set(16, 12, -9);
    sunLight.castShadow = true;

    const isMobile = window.innerWidth <= 768;
    const shadowRes = isMobile ? 1024 : 2048;
    sunLight.shadow.mapSize.set(shadowRes, shadowRes);
    sunLight.shadow.camera.near = 2;
    sunLight.shadow.camera.far = 65;
    sunLight.shadow.camera.left = -22;
    sunLight.shadow.camera.right = 22;
    sunLight.shadow.camera.top = 16;
    sunLight.shadow.camera.bottom = -16;
    sunLight.shadow.bias = -0.0003;
    sunLight.shadow.radius = 2.5;
    scene.add(sunLight);
    scene.add(sunLight.target);

    // Soft sky fill from northern clerestory
    skyFill = new THREE.DirectionalLight(0xe8f0f8, 0.45);
    skyFill.position.set(-14, 10, 8);
    scene.add(skyFill);
    scene.add(skyFill.target);
  }

  /* =========================================================================
     PROCEDURAL COLONNADE ARCHITECTURE (Expands effortlessly for 2 to 20 bays)
     ========================================================================= */
  function buildColonnadeArchitecture() {
    const bayCount = STUDIO_BAYS.length;
    const minX = -20;
    const maxX = (bayCount - 1) * BAY_SPACING + 20;
    const totalHallWidth = maxX - minX;
    const midX = (minX + maxX) / 2;

    const H = 13, backZ = -16, frontZ = 30;
    const roomDepth = frontZ - backZ;
    const midZ = (frontZ + backZ) / 2;

    // 1. Continuous Honed Concrete Floor Slab spanning all bays
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(totalHallWidth + 12, roomDepth + 6), MAT.concreteFloor);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(midX, 0, midZ);
    floor.receiveShadow = true;
    scene.add(floor);

    // Architectural expansion joints along floor
    STUDIO_BAYS.forEach((_, i) => {
      const bx = i * BAY_SPACING;
      [-7, 7].forEach(ox => {
        addBox(0.02, 0.005, roomDepth, MAT.shadowGap, [bx + ox, 0.003, midZ], scene, false, false);
      });
    });
    [-6, 2, 10, 18, 26].forEach(z => {
      addBox(totalHallWidth + 10, 0.005, 0.02, MAT.shadowGap, [midX, 0.003, z], scene, false, false);
    });

    // 2. Continuous Monolithic Rear Concrete Wall
    addBox(totalHallWidth, H, 1.0, MAT.concreteWall, [midX, H / 2, backZ], scene, false, true);

    // Form-tie reveals across entire rear wall
    [2.8, 5.6, 8.4, 11.2].forEach(y => {
      addBox(totalHallWidth, 0.03, 0.04, MAT.shadowGap, [midX, y, backZ + 0.51], scene, false, false);
    });

    // 3. Continuous Clerestory Light Slit along the ceiling
    const clerestoryHeight = 1.8;
    const clerestoryY = 9.8;
    addBox(totalHallWidth, clerestoryHeight, 0.12, MAT.clerestorySky, [midX, clerestoryY, backZ + 0.48], scene, false, false);
    addBox(totalHallWidth, 0.06, 0.35, MAT.brushedSteel, [midX, clerestoryY - clerestoryHeight / 2, backZ + 0.55], scene, false, false);
    addBox(totalHallWidth, 0.06, 0.35, MAT.brushedSteel, [midX, clerestoryY + clerestoryHeight / 2, backZ + 0.55], scene, false, false);

    // 4. Per-Bay Architectural Elements (Timber screen, bench, steel columns, dust motes)
    STUDIO_BAYS.forEach((_, i) => {
      const bx = i * BAY_SPACING;

      // Natural Cedar Vertical Timber Batten Screen behind prototype
      const timberWidth = 14, timberHeight = 6.8;
      addBox(timberWidth, timberHeight, 0.08, MAT.warmTimber, [bx - 4, timberHeight / 2, backZ + 0.55], scene, false, true);
      for (let tx = bx - 4 - timberWidth / 2 + 0.3; tx <= bx - 4 + timberWidth / 2 - 0.3; tx += 0.45) {
        addBox(0.06, timberHeight, 0.12, MAT.warmTimber, [tx, timberHeight / 2, backZ + 0.62], scene, true, true);
      }

      // Solid Timber Observation Bench
      const benchW = 5.2, benchH = 0.42, benchD = 0.65;
      addBox(benchW, 0.08, benchD, MAT.benchTimber, [bx + 7.5, benchH, backZ + 1.2], scene, true, true);
      addBox(0.08, benchH - 0.04, benchD - 0.06, MAT.benchTimber, [bx + 7.5 - benchW / 2 + 0.3, (benchH - 0.04) / 2, backZ + 1.2], scene, true, true);
      addBox(0.08, benchH - 0.04, benchD - 0.06, MAT.benchTimber, [bx + 7.5 + benchW / 2 - 0.3, (benchH - 0.04) / 2, backZ + 1.2], scene, true, true);

      // Slender structural blackened steel column between bays
      if (i < bayCount - 1) {
        const colX = bx + BAY_SPACING / 2;
        addBox(0.35, H, 0.35, MAT.brushedSteel, [colX, H / 2, 2], scene, true, true);
      }

      // Overhead structural steel I-beams running longitudinally
      addBox(0.22, 0.45, roomDepth, MAT.brushedSteel, [bx - 5, H - 0.22, midZ], scene, false, false);
      addBox(0.22, 0.45, roomDepth, MAT.brushedSteel, [bx + 5, H - 0.22, midZ], scene, false, false);

      // Dedicated Dust Mote System in this Bay
      setupBayDustMotes(bx);
    });

    // 5. Left & Right Hall Terminal Walls
    addBox(1.0, H, roomDepth, MAT.concreteWall, [minX, H / 2, midZ], scene, false, true);
    addBox(1.0, H, roomDepth, MAT.concreteWall, [maxX, H / 2, midZ], scene, false, true);

    // 6. Front Wall (Behind camera threshold)
    addBox(totalHallWidth, H, 0.8, MAT.concreteWall, [midX, H / 2, frontZ], scene, false, true);

    // 7. Enclosed Ceiling
    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(totalHallWidth, roomDepth), MAT.concreteWall);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(midX, H, midZ);
    scene.add(ceiling);
  }

  /* =========================================================================
     DUST MOTES PER BAY
     ========================================================================= */
  function setupBayDustMotes(bayX) {
    const count = 130;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = bayX + (Math.random() - 0.4) * 12;
      positions[i * 3 + 1] = 0.3 + Math.random() * 6.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;

      speeds[i * 3] = (Math.random() - 0.5) * 0.0015;
      speeds[i * 3 + 1] = 0.0012 + Math.random() * 0.002;
      speeds[i * 3 + 2] = (Math.random() - 0.5) * 0.0015;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.userData.speeds = speeds;

    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 248, 230, 0.85)');
    grad.addColorStop(0.35, 'rgba(255, 242, 218, 0.35)');
    grad.addColorStop(1, 'rgba(255, 235, 205, 0)');
    pCtx.fillStyle = grad;
    pCtx.fillRect(0, 0, 32, 32);
    const pTexture = new THREE.CanvasTexture(pCanvas);

    const pMaterial = new THREE.PointsMaterial({
      size: 0.13,
      map: pTexture,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const dust = new THREE.Points(geometry, pMaterial);
    scene.add(dust);
    dustSystems.push(dust);
  }

  function updateAllDust() {
    const time = clock.getElapsedTime();
    dustSystems.forEach(dust => {
      const pos = dust.geometry.attributes.position.array;
      const speeds = dust.geometry.userData.speeds;
      const count = pos.length / 3;

      for (let i = 0; i < count; i++) {
        pos[i * 3] += speeds[i * 3] + Math.sin(time * 0.4 + i) * 0.0005;
        pos[i * 3 + 1] += speeds[i * 3 + 1];
        pos[i * 3 + 2] += speeds[i * 3 + 2] + Math.cos(time * 0.4 + i) * 0.0005;

        if (pos[i * 3 + 1] > 6.8) {
          pos[i * 3 + 1] = 0.3;
        }
      }
      dust.geometry.attributes.position.needsUpdate = true;
    });
  }

  /* =========================================================================
     BAY ANCHORS & GROUNDED PROTOTYPES (No podiums. No pedestals.)
     ========================================================================= */
  function buildBaysAndAnchors() {
    STUDIO_BAYS.forEach((bay, index) => {
      const bx = index * BAY_SPACING;
      const bayGroup = new THREE.Group();
      bayGroup.position.set(bx, 0, 0);
      scene.add(bayGroup);
      bayGroups.push(bayGroup);

      // Subtle initial study buck on the floor slab
      const fp = bay.footprint;
      const tempGeo = new THREE.BoxGeometry(fp.l * 1.8, fp.h * 1.4, fp.w * 1.8);
      const tempMat = new THREE.MeshStandardMaterial({
        color: 0x9c968d,
        roughness: 0.85,
        metalness: 0.05,
        transparent: true,
        opacity: 0.4
      });
      const tempMesh = new THREE.Mesh(tempGeo, tempMat);
      tempMesh.position.y = (fp.h * 1.4) / 2;
      bayGroup.add(tempMesh);
      bayGroup.userData.tempMesh = tempMesh;

      // Volumetric Packaging envelope
      const pkgGeo = new THREE.BoxGeometry(fp.l * 2.0, fp.h * 1.6, fp.w * 2.0);
      const pkgMat = new THREE.MeshBasicMaterial({
        color: 0x8a847a,
        wireframe: true,
        transparent: true,
        opacity: 0.32
      });
      const pkgHelper = new THREE.Mesh(pkgGeo, pkgMat);
      pkgHelper.position.y = (fp.h * 1.6) / 2;
      pkgHelper.visible = false;
      bayGroup.add(pkgHelper);
      bayPackageHelpers[bay.id] = pkgHelper;

      // Heavy Physical Contact Occlusion (Grounded directly to concrete floor)
      const shadowCanvas = document.createElement('canvas');
      shadowCanvas.width = 256;
      shadowCanvas.height = 256;
      const sCtx = shadowCanvas.getContext('2d');
      const grad = sCtx.createRadialGradient(128, 128, 20, 128, 128, 120);
      grad.addColorStop(0, 'rgba(10, 12, 14, 0.76)');
      grad.addColorStop(0.4, 'rgba(18, 20, 24, 0.44)');
      grad.addColorStop(0.75, 'rgba(28, 30, 34, 0.12)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 256, 256);

      const shadowTex = new THREE.CanvasTexture(shadowCanvas);
      const contactGeo = new THREE.PlaneGeometry(fp.l * 1.45, fp.w * 1.65);
      const contactMat = new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        opacity: 0.92,
        depthWrite: false
      });
      const contactMesh = new THREE.Mesh(contactGeo, contactMat);
      contactMesh.rotation.x = -Math.PI / 2;
      contactMesh.position.y = 0.002;
      bayGroup.add(contactMesh);
    });
  }

  /* =========================================================================
     LAZY / ON-DEMAND MODEL STREAMING (Guarantees 20 projects never crash VRAM)
     ========================================================================= */
  function manageBayStreaming(targetIndex) {
    loadBayModel(targetIndex);
    if (targetIndex > 0) loadBayModel(targetIndex - 1);
    if (targetIndex < STUDIO_BAYS.length - 1) loadBayModel(targetIndex + 1);

    // Unload distant models (> 2 bays away) to prevent memory bloating over 10 years
    STUDIO_BAYS.forEach((_, idx) => {
      if (Math.abs(idx - targetIndex) > 2) {
        unloadBayModel(idx);
      }
    });
  }

  function unloadBayModel(bayIndex) {
    const bay = STUDIO_BAYS[bayIndex];
    if (!bay || !bayLoadedFlags[bay.id]) return;

    const bayGroup = bayGroups[bayIndex];
    if (!bayGroup) return;

    // Restore study buck mesh if missing
    if (!bayGroup.userData.tempMesh) {
      const fp = bay.footprint;
      const tempGeo = new THREE.BoxGeometry(fp.l * 1.8, fp.h * 1.4, fp.w * 1.8);
      const tempMat = new THREE.MeshStandardMaterial({
        color: 0x9c968d,
        roughness: 0.85,
        metalness: 0.05,
        transparent: true,
        opacity: 0.35
      });
      const tempMesh = new THREE.Mesh(tempGeo, tempMat);
      tempMesh.position.y = (fp.h * 1.4) / 2;
      bayGroup.add(tempMesh);
      bayGroup.userData.tempMesh = tempMesh;
    }

    // Remove model and dispose geometries & materials
    if (bayGroup.userData.modelObj) {
      bayGroup.remove(bayGroup.userData.modelObj);
      bayGroup.userData.modelObj = null;
    }

    const parts = bayParts[bay.id] || [];
    parts.forEach(({ mesh }) => {
      if (mesh.geometry) mesh.geometry.dispose();
      if (mesh.material) {
        if (Array.isArray(mesh.material)) mesh.material.forEach(m => m.dispose());
        else mesh.material.dispose();
      }
    });

    delete bayParts[bay.id];
    bayLoadedFlags[bay.id] = false;
    bayLoadingFlags[bay.id] = false;
  }

  function loadBayModel(bayIndex) {
    const bay = STUDIO_BAYS[bayIndex];
    if (!bay || bayLoadedFlags[bay.id] || bayLoadingFlags[bay.id]) return;

    bayLoadingFlags[bay.id] = true;
    const loader = new GLTFLoader();

    loader.load(
      bay.modelUrl,
      (gltf) => {
        bayLoadedFlags[bay.id] = true;
        bayLoadingFlags[bay.id] = false;

        const bayGroup = bayGroups[bayIndex];
        const tempMesh = bayGroup.userData.tempMesh;
        if (tempMesh) {
          bayGroup.remove(tempMesh);
          if (tempMesh.geometry) tempMesh.geometry.dispose();
          if (tempMesh.material) tempMesh.material.dispose();
          bayGroup.userData.tempMesh = null;
        }

        const model = gltf.scene;
        bayGroup.userData.modelObj = model;

        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        box.getSize(size);

        const maxDim = Math.max(size.x, size.y, size.z);
        const targetScale = bay.targetScale / (maxDim || 1);
        model.scale.setScalar(targetScale);

        const scaledBox = new THREE.Box3().setFromObject(model);
        const scaledCenter = new THREE.Vector3();
        scaledBox.getCenter(scaledCenter);

        model.position.set(-scaledCenter.x, -scaledBox.min.y, -scaledCenter.z);

        const parts = [];
        model.traverse(node => {
          if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = false;

            const originalPos = node.position.clone();
            const explodedPos = node.position.clone();

            const nodeBox = new THREE.Box3().setFromObject(node);
            const nodeCenter = new THREE.Vector3();
            nodeBox.getCenter(nodeCenter);

            const yNorm = (nodeCenter.y - scaledBox.min.y) / (scaledBox.max.y - scaledBox.min.y || 1);
            if (yNorm > 0.62) explodedPos.y += 0.85;
            else if (yNorm < 0.28) explodedPos.y -= 0.18;

            if (nodeCenter.x > 0.1) explodedPos.x += 0.55;
            else if (nodeCenter.x < -0.1) explodedPos.x -= 0.55;

            if (nodeCenter.z > 0.1) explodedPos.z += 0.45;
            else if (nodeCenter.z < -0.1) explodedPos.z -= 0.45;

            parts.push({
              mesh: node,
              originalPos,
              explodedPos,
              originalMat: node.material
            });

            if (node.material) {
              node.material.roughness = Math.max(node.material.roughness, 0.25);
            }
          }
        });

        bayParts[bay.id] = parts;
        bayGroup.add(model);
      },
      undefined,
      (err) => {
        bayLoadingFlags[bay.id] = false;
        console.warn(`[Colonnade] Model fallback for ${bay.id}:`, err);
      }
    );
  }

  /* =========================================================================
     HUMAN-PACED CONTROLS & WALKING PROMENADE BETWEEN BAYS
     ========================================================================= */
  function setupControls() {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.024; // Weighted, physical inertia (physical prototype on exhibition floor)
    controls.rotateSpeed = 0.12;   // Slow, human pacing — walking around an exhibition prototype
    controls.zoomSpeed = 0.16;     // Measured, unhurried dolly
    controls.enablePan = false;
    controls.enabled = false;      // Kept disabled during deliberate walks so it does not pull camera

    controls.minDistance = 3.6;
    controls.maxDistance = 9.5;
    controls.minPolarAngle = 0.95; // Standing human eye level
    controls.maxPolarAngle = 1.49; // Strictly standing eye height (cannot clip into concrete floor slab)
    controls.target.set(0, 1.05, 0);

    controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN
    };

    controls.addEventListener('start', () => {
      isInteracting = true;
      // Disengage automatic walk-around immediately when human touches the canvas
      if (walkAroundActive) {
        walkAroundActive = false;
        if (inspectionPlate) {
          const rotateBtn = inspectionPlate.querySelector('.proximity-btn[data-mode="rotate"]');
          if (rotateBtn) rotateBtn.classList.remove('active');
        }
      }
      if (isWalkingIn) {
        isWalkingIn = false;
        hasWalkedIn = true;
        controls.enabled = true;
      }
      if (inspectionPlate) inspectionPlate.classList.add('is-panned');
    });

    controls.addEventListener('end', () => {
      isInteracting = false;
      if (inspectionPlate) inspectionPlate.classList.remove('is-panned');
    });
  }

  // Walk deliberately down the hall from one bay to another (Human promenade pace)
  function walkToBay(targetIndex) {
    if (targetIndex < 0 || targetIndex >= STUDIO_BAYS.length) return;
    if (targetIndex === activeBayIndex && !isWalkingBetweenBays) return;

    if (controls) controls.enabled = false;

    const fromIndex = activeBayIndex;
    activeBayIndex = targetIndex;

    manageBayStreaming(targetIndex);

    const fromCenterX = fromIndex * BAY_SPACING;
    const targetCenterX = targetIndex * BAY_SPACING;
    const walkDir = Math.sign(targetIndex - fromIndex) || 1;

    bayWalkFromCam.copy(camera.position);
    bayWalkToCam.set(targetCenterX, 1.72, 5.8);

    bayWalkFromTarget.copy(controls.target);
    bayWalkToTarget.set(targetCenterX, 1.05, 0);

    // Human colonnade promenade path:
    // Step back slightly into the hallway centerline, gaze leads forward along the corridor,
    // then smoothly turns toward the new bay upon approach.
    const midX = (bayWalkFromCam.x + targetCenterX) / 2;
    bayWalkMidCam.set(midX, 1.72, 8.4);
    bayWalkMidTarget.set(midX + walkDir * 4.5, 1.15, 0);

    // Duration scales with distance for an unhurried, measured stroll (7.2s for 1 bay)
    const bayDist = Math.abs(targetIndex - fromIndex);
    bayWalkDuration = 5.6 + bayDist * 1.6;

    bayWalkStart = clock.getElapsedTime();
    isWalkingBetweenBays = true;
    walkAroundActive = false;

    // Fade out inspection plate during hallway stroll
    if (inspectionPlate) {
      inspectionPlate.classList.remove('is-revealed');
    }

    // Reset physical evaluation mode to exterior for new bay
    setPhysicalMode('exterior');
    updatePromenadeUI();
  }

  function stepCloser() {
    if (isWalkingBetweenBays) return;
    const currentCenterX = activeBayIndex * BAY_SPACING;
    bayWalkFromCam.copy(camera.position);
    bayWalkToCam.set(currentCenterX, 1.55, 3.8);
    bayWalkFromTarget.copy(controls.target);
    bayWalkToTarget.set(currentCenterX, 0.95, 0);
    bayWalkMidCam.copy(bayWalkFromCam).lerp(bayWalkToCam, 0.5);
    bayWalkMidTarget.copy(bayWalkFromTarget).lerp(bayWalkToTarget, 0.5);
    bayWalkDuration = 3.6; // Deliberate, measured step forward
    bayWalkStart = clock.getElapsedTime();
    isWalkingBetweenBays = true;
  }

  function stepBack() {
    if (isWalkingBetweenBays) return;
    const currentCenterX = activeBayIndex * BAY_SPACING;
    bayWalkFromCam.copy(camera.position);
    bayWalkToCam.set(currentCenterX, 1.72, 7.8);
    bayWalkFromTarget.copy(controls.target);
    bayWalkToTarget.set(currentCenterX, 1.05, 0);
    bayWalkMidCam.copy(bayWalkFromCam).lerp(bayWalkToCam, 0.5);
    bayWalkMidTarget.copy(bayWalkFromTarget).lerp(bayWalkToTarget, 0.5);
    bayWalkDuration = 3.6; // Deliberate, measured step back
    bayWalkStart = clock.getElapsedTime();
    isWalkingBetweenBays = true;
  }

  function updateBayWalking() {
    if (!isWalkingBetweenBays) return;

    const elapsed = clock.getElapsedTime() - bayWalkStart;
    const t = Math.min(elapsed / bayWalkDuration, 1.0);
    const ease = smootherstep(t);

    // Natural human promenade cadence along colonnade (1.65 Hz step rate)
    const gait = computeGaitKinematics(elapsed, t);

    // Smooth quadratic Bezier along the promenade
    const omt = 1 - ease;
    const bx = omt * omt * bayWalkFromCam.x + 2 * omt * ease * bayWalkMidCam.x + ease * ease * bayWalkToCam.x;
    const bz = omt * omt * bayWalkFromCam.z + 2 * omt * ease * bayWalkMidCam.z + ease * ease * bayWalkToCam.z;

    const tx = omt * omt * bayWalkFromTarget.x + 2 * omt * ease * bayWalkMidTarget.x + ease * ease * bayWalkToTarget.x;
    const tz = omt * omt * bayWalkFromTarget.z + 2 * omt * ease * bayWalkMidTarget.z + ease * ease * bayWalkToTarget.z;

    camera.position.set(bx, 1.72 + gait.verticalBob, bz + gait.lateralSway);
    controls.target.set(tx, 1.25, tz);

    if (t >= 1.0) {
      isWalkingBetweenBays = false;
      const targetCenterX = activeBayIndex * BAY_SPACING;
      camera.position.set(targetCenterX, 1.72, 5.8);
      controls.target.set(targetCenterX, 1.05, 0);
      if (controls) {
        controls.enabled = true;
        controls.update();
      }
      updateProximityState();
    }
  }

  function startArrivalWalk() {
    if (hasWalkedIn || isWalkingIn) return;
    isWalkingIn = true;
    walkStartTime = clock.getElapsedTime();
    if (controls) controls.enabled = false;
    camera.position.set(0, 1.72, 22.0);
    controls.target.set(0, 1.05, 0);
    if (scene.fog) scene.fog.density = 0.038;
  }

  function updateArrivalWalk() {
    if (!isWalkingIn || isInteracting || isWalkingBetweenBays) return;

    const elapsed = clock.getElapsedTime() - walkStartTime;
    const t = Math.min(elapsed / walkDuration, 1.0);
    const ease = smootherstep(t);

    // Human gait kinematics: realistic 1.65 Hz walking cadence
    const gait = computeGaitKinematics(elapsed, t);

    const startZ = 22.0;
    const targetZ = 5.8;
    const currentZ = startZ + (targetZ - startZ) * ease + gait.forwardSurge;

    camera.position.z = currentZ;
    camera.position.y = 1.72 + gait.verticalBob;
    camera.position.x = gait.lateralSway;
    controls.target.set(0, 1.05, 0);

    // Gradual revelation: morning fog gently thins as the visitor approaches the prototype
    if (scene.fog) {
      scene.fog.density = 0.038 - (0.038 - 0.0075) * ease;
    }

    if (t >= 1.0) {
      isWalkingIn = false;
      hasWalkedIn = true;
      camera.position.set(0, 1.72, 5.8);
      controls.target.set(0, 1.05, 0);
      if (controls) {
        controls.enabled = true;
        controls.update();
      }
      if (scene.fog) scene.fog.density = 0.0075;
      updateProximityState();
    }
  }

  /* =========================================================================
     PHYSICAL INTERACTION (Exterior, Interior, Explode, Packaging, CMF, Engineering, Walk around)
     ========================================================================= */
  function setPhysicalMode(mode) {
    if (mode === 'rotate') {
      walkAroundActive = !walkAroundActive;
      activeShaderMode = walkAroundActive ? 'rotate' : 'exterior';
    } else {
      walkAroundActive = false;
      if (mode === 'cmf') {
        activeCmfIndex = (activeCmfIndex + 1) % CMF_PALETTES.length;
      }
      activeShaderMode = mode;
    }

    const currentBay = STUDIO_BAYS[activeBayIndex];
    if (!currentBay) return;

    const pkgHelper = bayPackageHelpers[currentBay.id];
    if (pkgHelper) {
      pkgHelper.visible = (activeShaderMode === 'packaging');
    }

    const bayGroup = bayGroups[activeBayIndex];
    if (!bayGroup) return;

    const parts = bayParts[currentBay.id] || [];

    parts.forEach(({ mesh, originalMat }) => {
      const name = (mesh.name || '').toLowerCase();
      const isFrame = name.includes('frame') || name.includes('chassis') || name.includes('wheel') || name.includes('sub');
      const isSeat = name.includes('seat') || name.includes('interior') || name.includes('cushion') || name.includes('cabin');
      const isGlass = name.includes('glass') || name.includes('canopy') || name.includes('windshield');

      if (activeShaderMode === 'exterior' || activeShaderMode === 'explode' || activeShaderMode === 'packaging' || activeShaderMode === 'rotate') {
        mesh.material = originalMat;
        mesh.visible = true;
      } else if (activeShaderMode === 'cmf') {
        const palette = CMF_PALETTES[activeCmfIndex];
        if (palette.color !== null && !isGlass && !name.includes('tire') && !name.includes('wheel')) {
          mesh.material = new THREE.MeshStandardMaterial({
            color: palette.color,
            roughness: palette.roughness,
            metalness: palette.metalness
          });
        } else {
          mesh.material = originalMat;
        }
        mesh.visible = true;
      } else if (activeShaderMode === 'interior') {
        if (isSeat || isFrame) {
          mesh.material = originalMat;
          mesh.visible = true;
        } else {
          mesh.material = new THREE.MeshStandardMaterial({
            color: 0x9c968d,
            roughness: 0.2,
            metalness: 0.1,
            transparent: true,
            opacity: 0.14
          });
          mesh.visible = true;
        }
      } else if (activeShaderMode === 'engineering') {
        if (isFrame) {
          mesh.material = new THREE.MeshStandardMaterial({
            color: 0x2b2e35,
            roughness: 0.35,
            metalness: 0.85
          });
          mesh.visible = true;
        } else {
          mesh.material = new THREE.MeshStandardMaterial({
            color: 0x9c968d,
            roughness: 0.95,
            transparent: true,
            opacity: 0.16
          });
          mesh.visible = true;
        }
      }
    });

    if (inspectionPlate) {
      inspectionPlate.querySelectorAll('.proximity-btn').forEach(btn => {
        if (btn.dataset.mode === 'cmf') {
          btn.classList.toggle('active', activeShaderMode === 'cmf');
          btn.classList.toggle('cmf-active', activeShaderMode === 'cmf');
          btn.textContent = activeShaderMode === 'cmf' ? `CMF · ${CMF_PALETTES[activeCmfIndex].name}` : 'CMF';
        } else if (btn.dataset.mode === 'rotate') {
          btn.classList.toggle('active', walkAroundActive);
        } else {
          btn.classList.toggle('active', btn.dataset.mode === activeShaderMode);
        }
      });
    }
  }

  function updateKinematicExplosion() {
    const currentBay = STUDIO_BAYS[activeBayIndex];
    if (!currentBay) return;
    const parts = bayParts[currentBay.id];
    if (!parts || !parts.length) return;

    const targetExploded = (activeShaderMode === 'explode');
    const lerpSpeed = 0.08;

    parts.forEach(({ mesh, originalPos, explodedPos }) => {
      const target = targetExploded ? explodedPos : originalPos;
      mesh.position.lerp(target, lerpSpeed);
    });
  }

  /* =========================================================================
     COLONNADE DATUM & 10-YEAR PROXIMITY CONTROLS
     ========================================================================= */
  function setupColonnadeDatum(container) {
    promenadeDatum = document.createElement('div');
    promenadeDatum.className = 'garage-spatial-datum colonnade-datum';
    container.appendChild(promenadeDatum);
    updatePromenadeUI();

    // Tactile Proximity Inspection Plate (Appears ONLY when approaching < 6.5m)
    inspectionPlate = document.createElement('div');
    inspectionPlate.className = 'garage-proximity-plate';
    inspectionPlate.innerHTML = `
      <span class="proximity-kicker">PHYSICAL EVALUATION</span>
      <div class="proximity-actions">
        <button class="proximity-btn active" data-mode="exterior">Exterior</button>
        <button class="proximity-btn" data-mode="rotate">Walk around</button>
        <button class="proximity-btn" data-mode="interior">Interior</button>
        <button class="proximity-btn" data-mode="explode">Explode</button>
        <button class="proximity-btn" data-mode="packaging">Packaging</button>
        <button class="proximity-btn" data-mode="cmf">CMF</button>
        <button class="proximity-btn" data-mode="engineering">Engineering</button>
      </div>
    `;
    container.appendChild(inspectionPlate);

    inspectionPlate.querySelectorAll('.proximity-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        setPhysicalMode(btn.dataset.mode);
      });
    });
  }

  function updatePromenadeUI() {
    if (!promenadeDatum) return;
    const currentBay = STUDIO_BAYS[activeBayIndex];
    const totalBays = STUDIO_BAYS.length;
    const prevBay = activeBayIndex > 0 ? STUDIO_BAYS[activeBayIndex - 1] : null;
    const nextBay = activeBayIndex < totalBays - 1 ? STUDIO_BAYS[activeBayIndex + 1] : null;

    promenadeDatum.innerHTML = `
      <div class="promenade-colonnade-nav">
        ${prevBay ? `<button class="promenade-walk-btn prev" id="btn-walk-prev" title="Walk to previous bay">← ${prevBay.bayNumber} ${prevBay.title}</button>` : `<button class="promenade-walk-btn threshold" id="btn-walk-threshold-origin" title="Experience deliberate walk from entrance threshold">⟲ Walk from Threshold</button>`}
      </div>

      <div class="datum-coords" style="flex-direction: column; align-items: center; gap: 0.35rem;">
        <div style="display: flex; align-items: center; gap: 0.65rem; flex-wrap: wrap; justify-content: center;">
          <span class="datum-tag">BAY ${currentBay.bayNumber}</span>
          <span class="datum-sep">—</span>
          <span class="datum-vehicle">${currentBay.title}</span>
          <span class="datum-asset-pill" style="font-family: var(--font-mono, monospace); font-size: 0.65rem; padding: 2px 7px; background: rgba(90, 160, 240, 0.15); border: 1px solid rgba(90, 160, 240, 0.4); color: #82baff; letter-spacing: 0.08em; text-transform: uppercase;">${currentBay.assetType}</span>
        </div>
        <span style="font-family: var(--font-mono, monospace); font-size: 0.65rem; color: var(--text-tertiary, #9c968d);">${currentBay.assetNote}</span>

        <div class="colonnade-ledger">
          ${STUDIO_BAYS.map((b, idx) => `
            <button class="colonnade-bay-pill ${idx === activeBayIndex ? 'active' : ''}" data-bay-idx="${idx}" title="${b.bayNumber}: ${b.title} [${b.assetType}]">
              ${b.bayNumber}
            </button>
          `).join('')}
          <span class="colonnade-bay-pill future-expansion" title="Colonnade Horizon: Future Model (In CAD Development)">+</span>
        </div>
      </div>

      <div class="promenade-colonnade-nav">
        ${nextBay ? `<button class="promenade-walk-btn next" id="btn-walk-next" title="Walk to next bay">${nextBay.bayNumber} ${nextBay.title} →</button>` : `<button class="promenade-walk-btn threshold" id="btn-walk-threshold" title="Experience deliberate walk from entrance threshold">Walk from Threshold ⟲</button>`}
      </div>
    `;

    const prevBtn = promenadeDatum.querySelector('#btn-walk-prev');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => walkToBay(activeBayIndex - 1));
    }
    const nextBtn = promenadeDatum.querySelector('#btn-walk-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => walkToBay(activeBayIndex + 1));
    }
    const resetWalk = () => {
      hasWalkedIn = false;
      isWalkingIn = false;
      isWalkingBetweenBays = false;
      walkAroundActive = false;
      activeBayIndex = 0;
      startArrivalWalk();
      updatePromenadeUI();
    };
    const thresholdBtn = promenadeDatum.querySelector('#btn-walk-threshold');
    if (thresholdBtn) thresholdBtn.addEventListener('click', resetWalk);
    const originThresholdBtn = promenadeDatum.querySelector('#btn-walk-threshold-origin');
    if (originThresholdBtn) originThresholdBtn.addEventListener('click', resetWalk);

    promenadeDatum.querySelectorAll('.colonnade-bay-pill[data-bay-idx]').forEach(pill => {
      pill.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.bayIdx, 10);
        if (!isNaN(idx)) walkToBay(idx);
      });
    });
  }

  function setupKeyboardNavigation() {
    window.addEventListener('keydown', (e) => {
      if (!isVisible) return;
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        if (activeBayIndex < STUDIO_BAYS.length - 1) {
          walkToBay(activeBayIndex + 1);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        if (activeBayIndex > 0) {
          walkToBay(activeBayIndex - 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        stepCloser();
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        stepBack();
      }
    });
  }

  function updateProximityState() {
    if (!camera || !inspectionPlate) return;
    const currentCenterX = activeBayIndex * BAY_SPACING;
    const dist = camera.position.distanceTo(new THREE.Vector3(currentCenterX, 1.05, 0));

    const shouldShow = dist < 7.0 && hasWalkedIn && !isWalkingIn && !isWalkingBetweenBays;

    if (shouldShow !== isCloseToVehicle) {
      isCloseToVehicle = shouldShow;
      if (shouldShow) {
        inspectionPlate.classList.add('is-revealed');
      } else {
        inspectionPlate.classList.remove('is-revealed');
      }
    }
  }

  function setupVisibilityObserver(container) {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      isVisible = entry.isIntersecting;
      // Trigger arrival promenade ONLY when the garage is clearly in the visitor's view (>= 35%)
      if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
        if (!hasWalkedIn && !isWalkingIn) {
          startArrivalWalk();
        }
        manageBayStreaming(activeBayIndex);
      }
    }, { threshold: [0, 0.35, 0.7], rootMargin: '0px' });
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

  // Expose studio promenade navigation globally for cross-studio navigation
  window.walkToStudioBay = function (bayIndex) {
    const garageElem = document.getElementById('immersive-garage');
    if (garageElem) {
      garageElem.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => {
      walkToBay(bayIndex);
    }, 450);
  };

  /* =========================================================================
     ANIMATION LOOP
     ========================================================================= */
  let lastTime = 0;

  function animate() {
    requestAnimationFrame(animate);

    if (!isVisible) return;

    // Human arrival walk
    updateArrivalWalk();

    // Human walking between bays
    updateBayWalking();

    // Kinematic exploded lerp for active prototype
    updateKinematicExplosion();

    // Proximity detection for physical evaluation plate reveal
    updateProximityState();

    // Smooth, deliberate human walk-around orbit (No sudden showroom turntable spin)
    if (walkAroundActive && !isInteracting && !isWalkingBetweenBays && !isWalkingIn) {
      currentOrbitSpeed = THREE.MathUtils.lerp(currentOrbitSpeed, targetOrbitSpeed, 0.025);
    } else {
      currentOrbitSpeed = THREE.MathUtils.lerp(currentOrbitSpeed, 0.0, 0.06);
    }

    if (Math.abs(currentOrbitSpeed) > 0.0003 && controls) {
      const currentCenterX = activeBayIndex * BAY_SPACING;
      const targetCenter = new THREE.Vector3(currentCenterX, 1.25, 0);
      const dx = camera.position.x - targetCenter.x;
      const dz = camera.position.z - targetCenter.z;
      const radius = Math.sqrt(dx * dx + dz * dz);
      let angle = Math.atan2(dz, dx);
      
      const now = clock.getElapsedTime();
      const dt = Math.min(now - (lastTime || now), 0.05);
      lastTime = now;

      angle += currentOrbitSpeed * dt;

      // Human walking kinematics applied while walking around prototype
      const orbitBob = Math.sin(now * 3.3) * 0.012;
      const orbitSway = Math.cos(now * 1.65) * 0.008;

      const effectiveRadius = radius + orbitSway;
      camera.position.x = targetCenter.x + effectiveRadius * Math.cos(angle);
      camera.position.z = targetCenter.z + effectiveRadius * Math.sin(angle);
      camera.position.y = 1.72 + orbitBob;
      controls.target.copy(targetCenter);
    } else {
      lastTime = clock.getElapsedTime();
    }

    if (controls) controls.update();

    updateAllDust();

    // Dynamic Natural Sunbeam Tracking (Follows visitor down the colonnade)
    if (sunLight && controls) {
      const targetX = controls.target.x;
      sunLight.position.x = THREE.MathUtils.lerp(sunLight.position.x, targetX + 16, 0.05);
      sunLight.target.position.x = THREE.MathUtils.lerp(sunLight.target.position.x, targetX, 0.05);
      sunLight.target.updateMatrixWorld();

      skyFill.position.x = THREE.MathUtils.lerp(skyFill.position.x, targetX - 14, 0.05);
      skyFill.target.position.x = THREE.MathUtils.lerp(skyFill.target.position.x, targetX, 0.05);
      skyFill.target.updateMatrixWorld();
    }

    // Dynamic Hall Boundary Clamping (Supports 2 to 20 bays)
    const bayCount = STUDIO_BAYS.length;
    const hallMinX = -18;
    const hallMaxX = (bayCount - 1) * BAY_SPACING + 18;
    camera.position.x = THREE.MathUtils.clamp(camera.position.x, hallMinX, hallMaxX);
    camera.position.y = THREE.MathUtils.clamp(camera.position.y, 0.7, 11.2);
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, -12, 26);

    renderer.render(scene, camera);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
