import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 * PrototypeRoom — Workshop Zone 05: The Centerpiece.
 *
 * Immersive virtual studio showcasing the Bharat Mobility Pod in 3D space.
 * Features:
 *  - High-performance WebGL rendering with studio softbox lighting.
 *  - 360° smooth orbit & auto-rotation turntable drift.
 *  - Exploded view with smooth kinematic lerp interpolation.
 *  - Layer visualization modes: Material, Body, Frame (X-ray spaceframe), Package.
 *  - Support for future GLB models and skeletal animations.
 *  - Minimal, non-intrusive UI so the prototype completely dominates the room.
 */
export default function PrototypeRoom({
  title = 'Bharat Mobility Pod · Prototype',
  tagline = 'Production-accurate 3D NURBS dataset in virtual studio space.',
  modelUrl = 'assets/Project_1/3D Models/Detailed Sharp V2 · Highest 3D model.glb',
  specs = {
    length: '3,600 mm',
    width: '1,380 mm',
    threshold: '< 320 mm',
    capacity: '6 Forward-Facing Occupants',
  },
  modes = [
    { id: 'material', label: 'Material' },
    { id: 'body', label: 'Body' },
    { id: 'frame', label: 'Frame' },
    { id: 'package', label: 'Package' },
    { id: 'exploded', label: 'Exploded' },
  ],
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const [activeMode, setActiveMode] = useState('material');
  const [autoRotate, setAutoRotate] = useState(false); // Prototype rests silently
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isClose, setIsClose] = useState(false);
  const isCloseRef = useRef(false);

  // References to live Three.js objects
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const modelGroupRef = useRef(null);
  const partsRef = useRef([]); // Stores { mesh, originalPos, explodedPos, originalMat }
  const mixerRef = useRef(null);
  const animFrameRef = useRef(null);
  const isExplodedRef = useRef(false);
  const packageHelperRef = useRef(null);

  // Update exploded state ref for animation loop
  useEffect(() => {
    isExplodedRef.current = activeMode === 'exploded';
  }, [activeMode]);

  // Handle Layer Visualization Modes
  useEffect(() => {
    if (!partsRef.current.length) return;

    partsRef.current.forEach(({ mesh, originalMat }) => {
      if (activeMode === 'material') {
        mesh.material = originalMat;
        mesh.visible = true;
      } else if (activeMode === 'body') {
        // Automotive styling clay shader
        mesh.material = new THREE.MeshStandardMaterial({
          color: 0xd4d8df,
          roughness: 0.35,
          metalness: 0.1,
        });
        mesh.visible = true;
      } else if (activeMode === 'frame') {
        // X-ray translucent skin revealing spaceframe
        const name = (mesh.name || '').toLowerCase();
        const isFramePart = name.includes('frame') || name.includes('chassis') || name.includes('structure') || name.includes('pillar');
        if (isFramePart) {
          mesh.material = new THREE.MeshStandardMaterial({
            color: 0x4cc9f0,
            roughness: 0.2,
            metalness: 0.8,
            emissive: 0x0a2540,
          });
          mesh.visible = true;
        } else {
          mesh.material = new THREE.MeshStandardMaterial({
            color: 0x8a929e,
            roughness: 0.9,
            metalness: 0.05,
            transparent: true,
            opacity: 0.18,
            wireframe: false,
          });
          mesh.visible = true;
        }
      } else if (activeMode === 'package') {
        mesh.material = new THREE.MeshStandardMaterial({
          color: 0xc8cdd6,
          roughness: 0.5,
          metalness: 0.2,
          transparent: true,
          opacity: 0.45,
        });
        mesh.visible = true;
      } else if (activeMode === 'exploded') {
        mesh.material = originalMat;
        mesh.visible = true;
      }
    });

    // Package view boundary box helper
    if (packageHelperRef.current) {
      packageHelperRef.current.visible = activeMode === 'package';
    }
  }, [activeMode]);

  // Initialize Three.js Scene
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 700;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(4.8, 2.4, 5.8);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    rendererRef.current = renderer;

    // 4. Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.02; // Do not go below floor
    controls.minDistance = 2.4;
    controls.maxDistance = 14;
    controls.target.set(0, 0.8, 0);
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.45;
    controlsRef.current = controls;

    // 5. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfff8f0, 0.7);
    scene.add(ambientLight);

    // Key Light (Overhead Studio Softbox)
    const keyLight = new THREE.DirectionalLight(0xfff5ea, 1.6);
    keyLight.position.set(5, 10, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 25;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    // Fill Light (Soft cool reflection)
    const fillLight = new THREE.DirectionalLight(0xa5c4e8, 0.75);
    fillLight.position.set(-6, 5, -4);
    scene.add(fillLight);

    // Rim / Shoulder Light
    const rimLight = new THREE.DirectionalLight(0xffc59e, 1.2);
    rimLight.position.set(0, 6, -8);
    scene.add(rimLight);

    // 6. Ground Studio Contact Floor (No podiums, no pedestals)
    const groundGeo = new THREE.PlaneGeometry(36, 36);
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.35 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.005;
    ground.receiveShadow = true;
    scene.add(ground);

    // Soft Radial Shadow Texture under plinth
    const canvasShadow = document.createElement('canvas');
    canvasShadow.width = 256;
    canvasShadow.height = 256;
    const ctx = canvasShadow.getContext('2d');
    const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 128);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
    grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.25)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(canvasShadow);
    const shadowGeo = new THREE.PlaneGeometry(5.4, 5.4);
    const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, opacity: 0.65 });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.002;
    scene.add(shadowMesh);

    // 7. Load GLB Model
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf) => {
        const model = gltf.scene;

        // Auto-scale and center model to studio dimensions
        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        box.getSize(size);

        const maxDim = Math.max(size.x, size.y, size.z);
        const targetScale = 3.6 / (maxDim || 1);
        model.scale.setScalar(targetScale);

        const scaledBox = new THREE.Box3().setFromObject(model);
        const scaledCenter = new THREE.Vector3();
        scaledBox.getCenter(scaledCenter);

        model.position.set(-scaledCenter.x, -scaledBox.min.y, -scaledCenter.z);

        // Store meshes and calculate exploded target vectors
        const parts = [];
        model.traverse((node) => {
          if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = false;

            const originalPos = node.position.clone();
            const explodedPos = node.position.clone();

            // Calculate intelligent exploded offset based on bounding position
            const nodeBox = new THREE.Box3().setFromObject(node);
            const nodeCenter = new THREE.Vector3();
            nodeBox.getCenter(nodeCenter);

            // Upward lift for canopy/roof, outward for panels
            const yOffset = (nodeCenter.y - scaledBox.min.y) / (scaledBox.max.y - scaledBox.min.y);
            if (yOffset > 0.65) {
              explodedPos.y += 0.85; // Canopy lifts
            } else if (yOffset < 0.25) {
              explodedPos.y -= 0.15; // Chassis drops slightly
            }

            if (nodeCenter.x > 0.1) explodedPos.x += 0.45;
            else if (nodeCenter.x < -0.1) explodedPos.x -= 0.45;

            if (nodeCenter.z > 0.1) explodedPos.z += 0.35;
            else if (nodeCenter.z < -0.1) explodedPos.z -= 0.35;

            parts.push({
              mesh: node,
              originalPos,
              explodedPos,
              originalMat: node.material,
            });
          }
        });

        partsRef.current = parts;
        modelGroup.add(model);

        // Package boundary helper
        const packageBoxGeo = new THREE.BoxGeometry(scaledBox.max.x - scaledBox.min.x + 0.1, scaledBox.max.y - scaledBox.min.y, scaledBox.max.z - scaledBox.min.z + 0.1);
        const packageBoxMat = new THREE.MeshBasicMaterial({
          color: 0x4cc9f0,
          wireframe: true,
          transparent: true,
          opacity: 0.3,
        });
        const packageHelper = new THREE.Mesh(packageBoxGeo, packageBoxMat);
        packageHelper.position.set(0, (scaledBox.max.y - scaledBox.min.y) / 2, 0);
        packageHelper.visible = false;
        scene.add(packageHelper);
        packageHelperRef.current = packageHelper;

        // Future Animations: Setup animation mixer if GLB contains keyframe tracks
        if (gltf.animations && gltf.animations.length) {
          const mixer = new THREE.AnimationMixer(model);
          gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
          mixerRef.current = mixer;
        }

        setIsLoaded(true);
      },
      (xhr) => {
        if (xhr.lengthComputable && xhr.total > 0) {
          setLoadingProgress(Math.round((xhr.loaded / xhr.total) * 100));
        } else if (xhr.loaded) {
          setLoadingProgress(Math.min(95, Math.round(xhr.loaded / 50000)));
        }
      },
      (err) => {
        console.warn('[PrototypeRoom] Model load notice:', err);
        setHasError(true);
        setIsLoaded(true); // Don't block studio
      }
    );

    // 8. Animation & Render Loop
    const clock = new THREE.Clock();
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      const delta = clock.getDelta();

      // Update future animations
      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }

      // Smooth kinematic lerp for exploded view transition
      if (partsRef.current.length) {
        const targetState = isExplodedRef.current;
        const lerpFactor = 0.08;

        partsRef.current.forEach(({ mesh, originalPos, explodedPos }) => {
          const target = targetState ? explodedPos : originalPos;
          mesh.position.lerp(target, lerpFactor);
        });
      }

      // Proximity detection: controls appear ONLY after approaching the prototype (< 4.8m)
      const dist = camera.position.distanceTo(controls.target);
      const closeNow = dist < 4.8;
      if (closeNow !== isCloseRef.current) {
        isCloseRef.current = closeNow;
        setIsClose(closeNow);
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Listener
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 700;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

      if (controlsRef.current) controlsRef.current.dispose();

      // Dispose geometries and materials
      partsRef.current.forEach(({ mesh, originalMat }) => {
        if (mesh.geometry) mesh.geometry.dispose();
        if (originalMat) {
          if (Array.isArray(originalMat)) originalMat.forEach((m) => m.dispose());
          else originalMat.dispose();
        }
      });

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [modelUrl]);

  return (
    <div ref={containerRef} className="pt-room" aria-label={title}>
      {/* Three.js Canvas */}
      <canvas ref={canvasRef} className="pt-canvas" />

      {/* Atmospheric Vignette Overlay */}
      <div className="pt-vignette" aria-hidden="true" />

      {/* Discreet Architectural Coordinate (No giant labels) */}
      <div className="pt-arch-datum">
        <span className="pt-arch-tag">SPACE 04 · THE PROTOTYPE</span>
        <span className="pt-arch-title">{title}</span>
      </div>

      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="pt-loader">
          <span className="ws-tape">Streaming 3D Studio Dataset</span>
          <div className="pt-loader__bar">
            <div className="pt-loader__fill" style={{ width: `${loadingProgress}%` }} />
          </div>
          <span className="pt-loader__pct">{loadingProgress}%</span>
        </div>
      )}

      {/* Proximity Layer Controls — Appear ONLY after approaching the prototype (< 4.8m) */}
      <div className={`pt-proximity-controls${isClose ? ' is-revealed' : ''}`}>
        <span className="pt-proximity-kicker">INSPECT PROTOTYPE LAYERS</span>
        <div className="pt-modes" role="tablist" aria-label="Prototype visualization layers">
          {modes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              role="tab"
              aria-selected={activeMode === mode.id}
              className={`pt-mode-btn${activeMode === mode.id ? ' is-active' : ''}`}
              onClick={() => setActiveMode(mode.id)}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
