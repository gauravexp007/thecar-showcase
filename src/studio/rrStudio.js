// The 3D preview room: one real car, one grid, and a camera that walks a circle
// around it as the page scrolls — with the car still able to be turned by hand.
//
// three.js, the glTF loader and the car all stream from jsDelivr at runtime, so
// the site's own bundle stays small. The car is the Ferrari 458 Italia from the
// three.js example library: a real, Draco-compressed model that is CORS-open.

const THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
const ADDONS = 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/';
const MODEL_URL =
  'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r160/examples/models/gltf/ferrari.glb';

export const STAGE_LABEL = 'Ferrari 458 Italia';

function buildGrid(THREE) {
  return new THREE.Mesh(
    new THREE.PlaneGeometry(260, 260),
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uLine: { value: new THREE.Color(0x9fadc4) },
        uMajor: { value: new THREE.Color(0xd8e2f2) },
      },
      vertexShader: /* glsl */ `
        varying vec3 vWorld;
        void main() {
          vec4 world = modelMatrix * vec4(position, 1.0);
          vWorld = world.xyz;
          gl_Position = projectionMatrix * viewMatrix * world;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uLine;
        uniform vec3 uMajor;
        varying vec3 vWorld;

        float gridMask(vec2 p, float spacing) {
          vec2 coord = p / spacing;
          vec2 deriv = max(fwidth(coord), vec2(0.00001));
          vec2 d = abs(fract(coord - 0.5) - 0.5) / deriv;
          return 1.0 - clamp(min(d.x, d.y), 0.0, 1.0);
        }

        void main() {
          float dist = length(vWorld.xz);
          float fade = 1.0 - smoothstep(11.0, 58.0, dist);
          float pool = exp(-dist * 0.08);

          float minor = gridMask(vWorld.xz, 1.0) * 0.25;
          float major = gridMask(vWorld.xz, 5.0) * 0.6;
          float line = clamp(minor + major, 0.0, 1.0);

          vec3 colour = mix(uLine, uMajor, major);
          float alpha = (line * (0.3 + pool * 0.85) + pool * 0.05) * fade;

          if (alpha < 0.002) discard;
          gl_FragColor = vec4(colour, alpha);
        }
      `,
    }),
  );
}

function buildEnvironment(THREE, renderer) {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x06070a);

  const panel = (w, h, rgb, position, rotation) => {
    const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
    material.color.setRGB(rgb[0], rgb[1], rgb[2]);
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), material);
    mesh.position.set(...position);
    mesh.rotation.set(...rotation);
    env.add(mesh);
  };

  panel(30, 30, [1.1, 1.14, 1.25], [0, 10, 0], [Math.PI / 2, 0, 0]);
  panel(1.5, 18, [6.5, 6.6, 7], [-8, 3.4, 0], [0, Math.PI / 2, 0]);
  panel(1.5, 18, [5, 5.4, 6.2], [8, 3.4, 0], [0, Math.PI / 2, 0]);
  panel(14, 2.4, [2.2, 2.3, 2.6], [0, 2.4, 9], [0, Math.PI, 0]);
  panel(14, 2, [1, 1.1, 1.3], [0, 2.2, -9], [0, 0, 0]);
  panel(16, 16, [0.14, 0.15, 0.18], [0, -0.4, 0], [-Math.PI / 2, 0, 0]);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const target = pmrem.fromScene(env, 0.04);
  pmrem.dispose();
  env.traverse((node) => {
    if (!node.isMesh) return;
    node.geometry.dispose();
    node.material.dispose();
  });
  return target.texture;
}

export async function createStudio({ canvas, onReady, onError, onProgress }) {
  let THREE;
  let GLTFLoader;
  let DRACOLoader;
  try {
    THREE = await import(/* @vite-ignore */ THREE_URL);
    ({ GLTFLoader } = await import(/* @vite-ignore */ `${ADDONS}loaders/GLTFLoader.js`));
    ({ DRACOLoader } = await import(/* @vite-ignore */ `${ADDONS}loaders/DRACOLoader.js`));
  } catch (error) {
    onError?.(error);
    return null;
  }

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
  } catch (error) {
    onError?.(error);
    return null;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x05060a, 0.018);
  scene.environment = buildEnvironment(THREE, renderer);

  const camera = new THREE.PerspectiveCamera(36, 1, 0.05, 320);

  const key = new THREE.DirectionalLight(0xfff4e6, 3.2);
  key.position.set(6, 9, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.bias = -0.0004;
  key.shadow.normalBias = 0.02;
  key.shadow.camera.near = 0.5;
  key.shadow.camera.far = 40;
  key.shadow.camera.left = -8;
  key.shadow.camera.right = 8;
  key.shadow.camera.top = 8;
  key.shadow.camera.bottom = -8;
  scene.add(key);

  const rim = new THREE.DirectionalLight(0x9fb6ff, 2);
  rim.position.set(-7, 4.5, -6);
  scene.add(rim);

  scene.add(new THREE.HemisphereLight(0x8fa3c8, 0x05060a, 0.7));

  const grid = buildGrid(THREE);
  grid.rotation.x = -Math.PI / 2;
  grid.renderOrder = 1;
  scene.add(grid);

  const catcher = new THREE.Mesh(
    new THREE.PlaneGeometry(64, 64),
    new THREE.ShadowMaterial({ color: 0x000000, opacity: 0.58 }),
  );
  catcher.rotation.x = -Math.PI / 2;
  catcher.position.y = 0.004;
  catcher.material.depthWrite = false;
  catcher.receiveShadow = true;
  catcher.renderOrder = 2;
  scene.add(catcher);

  const pivot = new THREE.Vector3(0, 0.6, 0);
  let radius = 7.4;
  let disposed = false;
  let frameId = 0;

  /* ---- the car ---- */
  const draco = new DRACOLoader();
  draco.setDecoderPath(`${ADDONS}libs/draco/gltf/`);
  draco.preload();

  const loader = new GLTFLoader();
  loader.setDRACOLoader(draco);
  loader.load(
    MODEL_URL,
    (gltf) => {
      if (disposed) return;
      const car = gltf.scene;
      car.traverse((node) => {
        if (!node.isMesh) return;
        node.castShadow = true;
        const materials = Array.isArray(node.material) ? node.material : [node.material];
        materials.forEach((material) => {
          if (material && 'envMapIntensity' in material) material.envMapIntensity = 1.2;
        });
      });

      const box = new THREE.Box3().setFromObject(car);
      const size = box.getSize(new THREE.Vector3());
      const centre = box.getCenter(new THREE.Vector3());

      car.position.x -= centre.x;
      car.position.z -= centre.z;
      car.position.y -= box.min.y;
      // The model is delivered nose-first along -Z; turn it to face +Z so the
      // opening shot looks down the bonnet.
      car.rotation.y = Math.PI;
      scene.add(car);

      const length = Math.max(size.x, size.z);
      radius = Math.max(length * 1.38, 6.4);
      pivot.set(0, Math.max(size.y * 0.32, 0.5), 0);

      onProgress?.(1);
      onReady?.();
    },
    (event) => {
      if (!event.total) return;
      onProgress?.(Math.min(1, event.loaded / event.total));
    },
    (error) => {
      console.error('[studio] the car could not be loaded', error);
      onError?.(error);
    },
  );

  /* ---- drag ---- */
  let spin = 0;
  let spinVelocity = 0;
  let lift = 0;
  let liftTarget = 0;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;

  const onPointerDown = (event) => {
    if (event.button !== undefined && event.button !== 0) return;
    dragging = true;
    lastX = event.clientX;
    lastY = event.clientY;
    spinVelocity = 0;
    canvas.classList.add('is-dragging');
    canvas.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (!dragging) return;
    const dx = event.clientX - lastX;
    const dy = event.clientY - lastY;
    lastX = event.clientX;
    lastY = event.clientY;
    const step = -dx * 0.0065;
    spin += step;
    spinVelocity = step;
    liftTarget = THREE.MathUtils.clamp(liftTarget - dy * 0.012, -0.7, 1.6);
  };

  const onPointerUp = (event) => {
    if (!dragging) return;
    dragging = false;
    canvas.classList.remove('is-dragging');
    canvas.releasePointerCapture?.(event.pointerId);
  };

  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerup', onPointerUp);
  canvas.addEventListener('pointercancel', onPointerUp);

  /* ---- scroll ---- */
  let progress = 0;
  let smoothProgress = 0;
  let framing = 1;

  const resize = () => {
    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;
    if (!width || !height) return;
    const aspect = width / height;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);
    camera.aspect = aspect;
    // Phones need a wider lens and a little more distance to keep the car whole.
    const narrow = THREE.MathUtils.clamp((1.6 - aspect) / 1.1, 0, 1);
    camera.fov = 38 + narrow * 16;
    framing = 1 + narrow * 0.35;
    camera.updateProjectionMatrix();
  };

  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  resize();

  const clock = new THREE.Clock();
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let azimuth = -0.75;
  let height = 2.1;
  let distance = radius;
  const smooth = (current, target, rate, delta) =>
    reduced ? target : current + (target - current) * (1 - Math.exp(-rate * delta));

  const tick = () => {
    if (disposed) return;
    const delta = Math.min(clock.getDelta(), 0.05);

    if (!dragging) {
      spin += spinVelocity;
      spinVelocity *= Math.exp(-3.2 * delta);
      if (Math.abs(spinVelocity) < 0.00002) spinVelocity = 0;
    }

    smoothProgress = reduced
      ? progress
      : smoothProgress + (progress - smoothProgress) * (1 - Math.exp(-7 * delta));

    const targetAzimuth = -0.75 + smoothProgress * Math.PI * 2 + spin;
    // A slow rise as the camera crosses the flanks, and a dip at both ends.
    const targetHeight = pivot.y + 1.15 + Math.sin(smoothProgress * Math.PI) * 0.85 + lift;
    const targetDistance = radius * framing * (1 + Math.sin(smoothProgress * Math.PI * 2) * 0.04);

    azimuth = smooth(azimuth, targetAzimuth, 6.5, delta);
    height = smooth(height, targetHeight, 5, delta);
    distance = smooth(distance, targetDistance, 4, delta);
    lift = smooth(lift, liftTarget, 5, delta);

    camera.position.set(
      Math.sin(azimuth) * distance,
      height,
      Math.cos(azimuth) * distance,
    );
    camera.lookAt(pivot.x, pivot.y * 0.9, pivot.z);

    renderer.render(scene, camera);
    frameId = requestAnimationFrame(tick);
  };

  frameId = requestAnimationFrame(tick);

  return {
    setProgress(value) {
      progress = THREE.MathUtils.clamp(value, 0, 1);
    },
    resize,
    dispose() {
      disposed = true;
      cancelAnimationFrame(frameId);
      observer.disconnect();
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      scene.traverse((node) => {
        if (!node.isMesh) return;
        node.geometry?.dispose();
        const materials = Array.isArray(node.material) ? node.material : [node.material];
        materials.forEach((material) => material?.dispose());
      });
      scene.environment?.dispose();
      draco.dispose();
      renderer.dispose();
    },
  };
}
