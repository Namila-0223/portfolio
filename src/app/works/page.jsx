"use client";

import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { PROJECTS } from "../../data/projects";

// ── CONSTANTS ──────────────────────────────────────────────────────────────
const RADIUS = 10.5;
const DOLLY = 14.5;
const SEGMENTS = 12;
const SLOT_ANGLE = (2 * Math.PI) / 6;
const HALF = SLOT_ANGLE / 2;
const LERP = 0.12;
const SCALE_LERP = 0.09;
const VEL_DECAY = 0.88;
const MAX_TILT = Math.PI / 10;
const TEXT_TOP_OFFSET = 2.75;
const TEXT_BOTTOM_OFFSET = -2.37;
const N = PROJECTS.length;

// ── ROW CONFIGS ────────────────────────────────────────────────────────────
const ROWS = [
  { lat: 0, y: 0, w: 8, h: 4.4, ao: 0, main: true, op: 1 },
  { lat: 0.6, y: 5.08, w: 3.2, h: 2, ao: HALF, main: false, op: 1 },
  { lat: -0.6, y: -5.08, w: 3.2, h: 2, ao: HALF, main: false, op: 1 },
];
const GHOSTS = [
  { lat: 0.92, y: 7.16, w: 3, h: 1.8, ao: 0, op: 0.38 },
  { lat: 1.18, y: 8.32, w: 2.4, h: 1.5, ao: HALF, op: 0.16 },
  { lat: -0.92, y: -7.16, w: 3, h: 1.8, ao: 0, op: 0.38 },
  { lat: -1.18, y: -8.32, w: 2.4, h: 1.5, ao: HALF, op: 0.16 },
];

// ── VERTEX SHADER ──────────────────────────────────────────────────────────
const VERT = `
  uniform float uFlat;
  uniform float uTime;
  uniform float uActive;
  uniform float uCenter;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Cylindrical bow
    float arch = sin(uv.x * 3.14159) * (1.0 - uFlat);
    pos.z += arch * 0.42;

    // Bend top and bottom to the inside for all cards
    float bend = 0.16 * (1.0 - uFlat);
    pos.y *= 1.0 - sin(uv.x * 3.14159) * bend;

    // Subtle breathing
    pos *= 1.0 + uActive * sin(uTime * 1.3) * 0.007;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// ── FRAGMENT SHADER ────────────────────────────────────────────────────────
const FRAG = `
  uniform float uSat;
  uniform vec3  uColor;
  uniform vec3  uAccent;
  uniform float uActive;
  uniform float uTime;
  uniform sampler2D uTex;
  uniform float uOpacity;
  varying vec2 vUv;

  void main() {
    // Sample texture map
    vec4 texCol = texture2D(uTex, vUv);

    // Blend the background theme color with the texture color
    vec3 col = mix(uColor, texCol.rgb, 0.82);

    // Base gradient
    col += uAccent * 0.04 * vUv.y;
    col += (uColor * 0.3) * (1.0 - vUv.y);

    // Grid lines
    float gx = abs(fract(vUv.x * 12.0) - 0.5);
    float gy = abs(fract(vUv.y * 7.0) - 0.5);
    float grid = 1.0 - smoothstep(0.0, 0.04, min(gx, gy));
    col += uAccent * grid * 0.05 * uSat;

    // Edge vignette
    float ex = abs(vUv.x - 0.5) * 2.0;
    float ey = abs(vUv.y - 0.5) * 2.0;
    col *= 1.0 - pow(max(ex, ey), 3.0) * 0.55;

    // Active shimmer
    float sh = uActive * max(0.0, sin(vUv.x * 10.0 - uTime * 2.2)) * 0.07;
    col += uAccent * sh;

    // Saturation
    float luma = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(vec3(luma), col, uSat);

    gl_FragColor = vec4(col, uOpacity);
  }
`;

// ── TEXT FRAGMENT SHADER ───────────────────────────────────────────────────
const TEXT_FRAG = `
  uniform sampler2D uTex;
  uniform float uOpacity;
  varying vec2 vUv;

  void main() {
    vec4 col = texture2D(uTex, vUv);
    if (col.a < 0.05) discard;
    gl_FragColor = vec4(col.rgb, col.a * uOpacity);
  }
`;

// ── CANVAS TEXT GENERATOR ──────────────────────────────────────────────────
function createTextTexture(text1, text2, isTop, accentColor) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = isTop ? 96 : 38;
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = "left";

  const paddingLeft = 32;

  if (isTop) {
    // Line 1: "04 / 06"
    ctx.font = "600 18px 'Geist', 'Inter', sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.fillText(text1, paddingLeft, 30);

    // Line 2: "Epic Tokens"
    ctx.font = "900 38px 'Geist', 'Inter', sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(text2, paddingLeft, 74);
  } else {
    // Bottom: "2025 · NEXT.JS · GSAP"
    ctx.font = "600 15px 'Geist', 'Inter', sans-serif";
    ctx.fillStyle = accentColor || "rgba(255, 255, 255, 0.35)";
    ctx.fillText(text1, paddingLeft, 24);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

// ── BUILD THREE.JS SCENE ───────────────────────────────────────────────────
function buildScene(canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x0a0a0a, 1);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a0a0a, 0.031);

  const camera = new THREE.PerspectiveCamera(
    80,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    200,
  );
  camera.position.set(0, 0, 0);
  scene.add(camera);

  scene.add(new THREE.AmbientLight(0xffffff, 0.45));
  const dir = new THREE.DirectionalLight(0xffffff, 0.7);
  dir.position.set(4, 8, 4);
  scene.add(dir);
  const pt = new THREE.PointLight(0x6644ff, 0.4, 50);
  pt.position.set(-8, 3, -5);
  scene.add(pt);

  const group = new THREE.Group();
  scene.add(group);

  // Geometry cache
  const geoCache = {};
  const getGeo = (w, h) => {
    const k = `${w}_${h}`;
    if (!geoCache[k])
      geoCache[k] = new THREE.PlaneGeometry(
        w,
        h,
        SEGMENTS,
        Math.round(SEGMENTS * (h / w)),
      );
    return geoCache[k];
  };

  const cards = [];
  const ghosts = [];
  const texLoader = new THREE.TextureLoader();

  ROWS.forEach((row) => {
    PROJECTS.forEach((proj, pi) => {
      const angle = pi * SLOT_ANGLE + row.ao;
      const accentC = new THREE.Color(proj.accent);
      const colorC = new THREE.Color(proj.color);

      const texture = texLoader.load(proj.img, (tex) => {
        const img = tex.image;
        if (img) {
          const At = img.width / img.height;
          const Am = row.w / row.h;
          const zoom = proj.textureZoom || 1.0;
          let repeatX, repeatY;
          if (Am > At) {
            repeatX = 1.0 / zoom;
            repeatY = (At / Am) / zoom;
          } else {
            repeatX = (Am / At) / zoom;
            repeatY = 1.0 / zoom;
          }
          tex.repeat.set(repeatX, repeatY);
          tex.offset.set((1 - repeatX) / 2, (1 - repeatY) / 2);
          tex.needsUpdate = true;
        }
      });
      texture.minFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;

      const mat = new THREE.ShaderMaterial({
        uniforms: {
          uFlat: { value: 0 },
          uSat: { value: row.main ? 1 : 0.7 },
          uColor: { value: colorC },
          uAccent: { value: accentC },
          uActive: { value: 0 },
          uTime: { value: 0 },
          uTex: { value: texture },
          uCenter: { value: 0 },
          uOpacity: { value: 1.0 },
        },
        vertexShader: VERT,
        fragmentShader: FRAG,
        side: THREE.FrontSide,
        transparent: true,
      });

      const lat = row.lat || 0;
      const r = RADIUS * Math.cos(lat);
      const mesh = new THREE.Mesh(getGeo(row.w, row.h), mat);
      mesh.position.set(
        r * Math.sin(angle),
        RADIUS * Math.sin(lat),
        -(r * Math.cos(angle)),
      );
      mesh.lookAt(0, 0, 0);
      group.add(mesh);

      let topMesh = null;
      let bottomMesh = null;
      if (row.main) {
        const topTex = createTextTexture(
          `${String(pi + 1).padStart(2, "0")} / ${String(N).padStart(2, "0")}`,
          proj.title,
          true,
        );
        const topMat = new THREE.ShaderMaterial({
          uniforms: {
            uFlat: { value: 0 },
            uActive: { value: 0 },
            uTime: { value: 0 },
            uTex: { value: topTex },
            uCenter: { value: 0 },
            uOpacity: { value: 1 },
          },
          vertexShader: VERT,
          fragmentShader: TEXT_FRAG,
          transparent: true,
          side: THREE.FrontSide,
          depthWrite: false,
        });
        topMesh = new THREE.Mesh(getGeo(row.w, 1.35), topMat);
        topMesh.position.copy(mesh.position);
        const localUp = new THREE.Vector3(0, 1, 0).applyQuaternion(
          mesh.quaternion,
        );
        topMesh.position.addScaledVector(localUp, TEXT_TOP_OFFSET);
        topMesh.quaternion.copy(mesh.quaternion);
        group.add(topMesh);

        const bottomTex = createTextTexture(
          `${proj.year}  ·  ${proj.tags.join("  ·  ")}`.toUpperCase(),
          "",
          false,
          proj.accent,
        );
        const bottomMat = new THREE.ShaderMaterial({
          uniforms: {
            uFlat: { value: 0 },
            uActive: { value: 0 },
            uTime: { value: 0 },
            uTex: { value: bottomTex },
            uCenter: { value: 0 },
            uOpacity: { value: 1 },
          },
          vertexShader: VERT,
          fragmentShader: TEXT_FRAG,
          transparent: true,
          side: THREE.FrontSide,
          depthWrite: false,
        });
        bottomMesh = new THREE.Mesh(getGeo(row.w, 0.54), bottomMat);
        bottomMesh.position.copy(mesh.position);
        bottomMesh.position.addScaledVector(localUp, TEXT_BOTTOM_OFFSET);
        bottomMesh.quaternion.copy(mesh.quaternion);
        group.add(bottomMesh);
      }

      cards.push({
        mesh,
        mat,
        angle,
        rowY: row.y,
        lat: row.lat || 0,
        main: row.main,
        proj,
        topMesh,
        topMat: topMesh ? topMesh.material : null,
        bottomMesh,
        bottomMat: bottomMesh ? bottomMesh.material : null,
        rowW: row.w,
        rowH: row.h,
      });
    });
  });

  GHOSTS.forEach((row) => {
    PROJECTS.forEach((proj, pi) => {
      const angle = pi * SLOT_ANGLE + row.ao;
      const accentC = new THREE.Color(proj.accent);
      const colorC = new THREE.Color(proj.color);

      const texture = texLoader.load(proj.img, (tex) => {
        const img = tex.image;
        if (img) {
          const At = img.width / img.height;
          const Am = row.w / row.h;
          const zoom = proj.textureZoom || 1.0;
          let repeatX, repeatY;
          if (Am > At) {
            repeatX = 1.0 / zoom;
            repeatY = (At / Am) / zoom;
          } else {
            repeatX = (Am / At) / zoom;
            repeatY = 1.0 / zoom;
          }
          tex.repeat.set(repeatX, repeatY);
          tex.offset.set((1 - repeatX) / 2, (1 - repeatY) / 2);
          tex.needsUpdate = true;
        }
      });
      texture.minFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;

      const mat = new THREE.ShaderMaterial({
        uniforms: {
          uFlat: { value: 0 },
          uSat: { value: 0.4 },
          uColor: { value: colorC },
          uAccent: { value: accentC },
          uActive: { value: 0 },
          uTime: { value: 0 },
          uTex: { value: texture },
          uCenter: { value: 0 },
          uOpacity: { value: row.op },
        },
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        side: THREE.FrontSide,
        depthWrite: false,
      });

      const lat = row.lat || 0;
      const r = RADIUS * Math.cos(lat);
      const mesh = new THREE.Mesh(getGeo(row.w, row.h), mat);
      mesh.position.set(
        r * Math.sin(angle),
        RADIUS * Math.sin(lat),
        -(r * Math.cos(angle)),
      );
      mesh.lookAt(0, 0, 0);
      mesh.userData.baseOpacity = row.op;
      group.add(mesh);
      ghosts.push(mesh);
    });
  });

  return { renderer, scene, camera, group, cards, ghosts };
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────
export default function Works() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  // Physics refs
  const rotRef = useRef(0);
  const velRef = useRef(0);
  const targetRef = useRef(null);
  const tiltRef = useRef(0);
  const dragging = useRef(false);
  const dragPrev = useRef({ x: 0, y: 0 });
  const dragStartRef = useRef({ x: 0, y: 0 });
  const hasMovedRef = useRef(false);
  const ptrId = useRef(null);
  const timeRef = useRef(0);

  // UI state
  const [uiRot, setUiRot] = useState(0);
  const aspectRef = useRef(1.0);
  const scaleFactorRef = useRef(1.0);
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
  });

  // ── INIT THREE.JS ─────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { renderer, scene, camera, group, cards, ghosts } =
      buildScene(canvas);
    sceneRef.current = { renderer, scene, camera, group, cards, ghosts };

    const resize = () => {
      const w = canvas.clientWidth,
        h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      aspectRef.current = w / h;

      let sf = 1.0;
      if (w / h < 0.8) {
        sf = 1.15;
      }
      scaleFactorRef.current = sf;

      camera.fov = w < h ? Math.min(95, 80 + (1 - w / h) * 20) : 80;
      camera.updateProjectionMatrix();

      setScreenSize({
        isMobile: w < 768,
        isTablet: w >= 768 && w < 1024,
      });
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const dt = Math.min(0.05, 0.016);
      timeRef.current += dt;
      const t = timeRef.current;

      // ── Rotation physics ──
      if (!dragging.current) {
        if (targetRef.current !== null) {
          const diff = targetRef.current - rotRef.current;
          if (Math.abs(diff) < 0.0008) {
            rotRef.current = targetRef.current;
            targetRef.current = null;
          } else rotRef.current += LERP * diff;
        } else if (Math.abs(velRef.current) > 0.0004) {
          rotRef.current += velRef.current;
          velRef.current *= Math.pow(VEL_DECAY, 60 * dt);
        } else {
          velRef.current = 0;
        }
      }
      group.rotation.y = rotRef.current;

      // No dynamic focus progress (always 0 on main works index page)
      const efp = 0;

      // ── Camera dolly ──
      const t2 = 0;
      tiltRef.current *= 0.97;
      camera.position.z = -DOLLY * t2 * 0.55;
      camera.rotation.y = 0.14 * t2;
      camera.rotation.x = tiltRef.current * (1 - t2);

      // ── Per-card update ──
      cards.forEach(
        ({
          mesh,
          mat,
          angle,
          rowY,
          lat,
          main,
          topMesh,
          topMat,
          bottomMesh,
          bottomMat,
          rowW,
        }) => {
          const raw =
            (((angle - rotRef.current) % (2 * Math.PI)) + 2 * Math.PI) %
            (2 * Math.PI);
          const diff = raw > Math.PI ? raw - 2 * Math.PI : raw;
          const vis = Math.max(
            0,
            Math.min(1, 1 - Math.abs(diff) / (Math.PI / 2)),
          );

          // Scale
          const focusBoost = 1;
          const ts = (0.76 + 0.24 * vis) * focusBoost * scaleFactorRef.current;
          const cs = mesh.scale.x;
          const ns = cs + (ts - cs) * SCALE_LERP;
          mesh.scale.setScalar(ns);

          if (topMesh) topMesh.scale.setScalar(ns);
          if (bottomMesh) bottomMesh.scale.setScalar(ns);

          // Uniforms
          const u = mat.uniforms;
          const targetSat = main ? 0.28 + 0.72 * vis : 0.18 + 0.5 * vis;
          u.uSat.value += (targetSat - u.uSat.value) * 0.09;
          u.uFlat.value += (0 - u.uFlat.value) * 0.11;
          u.uActive.value += (0 - u.uActive.value) * 0.09;
          u.uTime.value = t;
          u.uCenter.value = main ? Math.pow(vis, 4.0) : 0.0;

          const baseOpacity = main ? 1.0 : 0.8;
          const targetOpacity = (1.0 - efp) * baseOpacity;
          u.uOpacity.value += (targetOpacity - u.uOpacity.value) * 0.15;

          if (topMat) {
            topMat.uniforms.uFlat.value = u.uFlat.value;
            topMat.uniforms.uActive.value = u.uActive.value;
            topMat.uniforms.uTime.value = t;
            topMat.uniforms.uCenter.value = u.uCenter.value;
            topMat.uniforms.uOpacity.value =
              (1.0 - efp) * Math.min(1.0, vis * 1.3);
          }
          if (bottomMat) {
            bottomMat.uniforms.uFlat.value = u.uFlat.value;
            bottomMat.uniforms.uActive.value = u.uActive.value;
            bottomMat.uniforms.uTime.value = t;
            bottomMat.uniforms.uCenter.value = u.uCenter.value;
            bottomMat.uniforms.uOpacity.value =
              (1.0 - efp) * Math.min(1.0, vis * 1.3);
          }

          const r = RADIUS * Math.cos(lat);
          mesh.position.set(
            r * Math.sin(angle),
            RADIUS * Math.sin(lat),
            -(r * Math.cos(angle)),
          );
          mesh.lookAt(0, 0, 0);

          if (topMesh) {
            topMesh.position.copy(mesh.position);
            const localUp = new THREE.Vector3(0, 1, 0).applyQuaternion(
              mesh.quaternion,
            );
            topMesh.position.addScaledVector(
              localUp,
              TEXT_TOP_OFFSET * ns * (1.0 - efp),
            );
            topMesh.quaternion.copy(mesh.quaternion);
          }
          if (bottomMesh) {
            bottomMesh.position.copy(mesh.position);
            const localUp = new THREE.Vector3(0, 1, 0).applyQuaternion(
              mesh.quaternion,
            );
            bottomMesh.position.addScaledVector(
              localUp,
              TEXT_BOTTOM_OFFSET * ns * (1.0 - efp),
            );
            bottomMesh.quaternion.copy(mesh.quaternion);
          }
        },
      );

      if (ghosts) {
        ghosts.forEach((mesh) => {
          if (mesh.material && mesh.material.uniforms) {
            if (mesh.material.uniforms.uTime) {
              mesh.material.uniforms.uTime.value = t;
            }
            if (mesh.material.uniforms.uOpacity) {
              const baseOp =
                mesh.userData.baseOpacity !== undefined
                  ? mesh.userData.baseOpacity
                  : 0.3;
              mesh.material.uniforms.uOpacity.value = (1.0 - efp) * baseOp;
            }
          }
        });
      }

      renderer.render(scene, camera);

      if (Math.round(t * 60) % 4 === 0) {
        setUiRot(rotRef.current);
      }
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.dispose();
    };
  }, []);

  // ── INPUT HANDLERS ─────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onWheel = (e) => {
      e.preventDefault();
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      velRef.current += 0.00022 * d;
      targetRef.current = null;
    };

    const onPtrDown = (e) => {
      dragging.current = true;
      ptrId.current = e.pointerId;
      dragPrev.current = { x: e.clientX, y: e.clientY };
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      hasMovedRef.current = false;
      velRef.current = 0;
      targetRef.current = null;
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {}
    };

    const onPtrMove = (e) => {
      if (!dragging.current || e.pointerId !== ptrId.current) return;
      const dx = e.clientX - dragPrev.current.x;
      const dy = e.clientY - dragPrev.current.y;
      dragPrev.current = { x: e.clientX, y: e.clientY };

      const totalDx = e.clientX - dragStartRef.current.x;
      const totalDy = e.clientY - dragStartRef.current.y;
      if (Math.sqrt(totalDx * totalDx + totalDy * totalDy) > 6) {
        hasMovedRef.current = true;
      }

      const impulse = -(0.0022 * dx);
      rotRef.current += impulse;
      velRef.current = impulse;
      tiltRef.current = Math.max(
        -MAX_TILT,
        Math.min(MAX_TILT, tiltRef.current + 0.0018 * dy),
      );
    };

    const onPtrUp = (e) => {
      if (e.pointerId !== ptrId.current) return;
      dragging.current = false;
      ptrId.current = null;
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {}
    };

    const onKey = (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        targetRef.current = rotRef.current + SLOT_ANGLE;
        velRef.current = 0;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        targetRef.current = rotRef.current - SLOT_ANGLE;
        velRef.current = 0;
      }
    };

    const onCanvasClick = (e) => {
      if (hasMovedRef.current) return;
      if (!sceneRef.current) return;
      const { camera, cards } = sceneRef.current;
      const rect = canvas.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1,
      );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const meshes = cards.filter((c) => c.main).map((c) => c.mesh);
      const hits = raycaster.intersectObjects(meshes);
      if (hits.length > 0) {
        const hitMesh = hits[0].object;
        const card = cards.find((c) => c.mesh === hitMesh);
        if (card) {
          // Project the 3D mesh corners to 2D screen coordinates
          const mesh = card.mesh;
          const canvasRect = canvas.getBoundingClientRect();
          
          // Width and height of card mesh
          const halfW = card.rowW / 2;
          const halfH = card.rowH / 2;
          
          // Project top-left and bottom-right corners
          const p1 = new THREE.Vector3(-halfW, halfH, 0).applyMatrix4(mesh.matrixWorld).project(camera);
          const p2 = new THREE.Vector3(halfW, -halfH, 0).applyMatrix4(mesh.matrixWorld).project(camera);
          
          // Convert NDC to client coordinates relative to viewport
          const x1 = (p1.x * 0.5 + 0.5) * canvasRect.width;
          const y1 = (-(p1.y * 0.5) + 0.5) * canvasRect.height;
          const x2 = (p2.x * 0.5 + 0.5) * canvasRect.width;
          const y2 = (-(p2.y * 0.5) + 0.5) * canvasRect.height;
          
          const left = Math.min(x1, x2);
          const top = Math.min(y1, y2);
          const width = Math.abs(x2 - x1);
          const height = Math.abs(y2 - y1);
          
          // Create a temporary DOM image overlay synchronously to be captured in view-transition snapshot immediately
          const img = document.createElement("img");
          img.src = card.proj.img;
          img.className = "temp-transition-image";
          img.style.position = "fixed";
          img.style.left = `${canvasRect.left + left}px`;
          img.style.top = `${canvasRect.top + top}px`;
          img.style.width = `${width}px`;
          img.style.height = `${height}px`;
          img.style.objectFit = "cover";
          img.style.borderRadius = "24px";
          img.style.zIndex = "999999";
          img.style.pointerEvents = "none";
          img.style.setProperty("view-transition-name", `project-image-${card.proj.id}`);
          document.body.appendChild(img);

          // Click the redirect link immediately in the same call stack
          const link = document.getElementById("works-redirect-link");
          if (link) {
            link.setAttribute("href", `/works/${card.proj.id}`);
            link.setAttribute("data-view-transition", "true");
            link.click();
          }
        }
      }
    };

    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.addEventListener("pointerdown", onPtrDown);
    window.addEventListener("pointermove", onPtrMove);
    window.addEventListener("pointerup", onPtrUp);
    window.addEventListener("keydown", onKey);
    canvas.addEventListener("click", onCanvasClick);

    return () => {
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("pointerdown", onPtrDown);
      window.removeEventListener("pointermove", onPtrMove);
      window.removeEventListener("pointerup", onPtrUp);
      window.removeEventListener("keydown", onKey);
      canvas.removeEventListener("click", onCanvasClick);
    };
  }, []);

  // ── DERIVED UI VALUES ──────────────────────────────────────────────────
  const activeIdx = ((Math.round(uiRot / SLOT_ANGLE) % N) + N) % N;

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#0a0a0a",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          cursor: "grab",
          display: "block",
          touchAction: "none",
        }}
      />

      {/* Radial vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 85% 65% at 50% 50%, transparent 38%, rgba(10,10,10,0.75) 100%)",
        }}
      />

      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: screenSize.isMobile ? 76 : 104,
          left: "50%",
          transform: "translateX(-50%)",
          pointerEvents: "none",
          transition: "opacity 0.4s",
          opacity: 1,
        }}
      >
        <span
          style={{
            fontFamily: "Geist, Inter, sans-serif",
            fontSize: 9,
            letterSpacing: "0.24em",
            color: "rgba(255, 255, 255, 0.35)",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            fontWeight: 600,
          }}
        >
          SELECTED PROJECTS
        </span>
      </div>

      {/* Slide counter */}
      <div
        style={{
          position: "absolute",
          top: screenSize.isMobile ? 76 : 104,
          left: screenSize.isMobile ? 20 : 32,
          pointerEvents: "none",
          opacity: 1,
          transition: "opacity 0.4s",
          fontFamily: "Geist, Inter, sans-serif",
          fontSize: screenSize.isMobile ? 10 : 11,
          letterSpacing: "0.14em",
          color: "rgba(255,255,255,0.25)",
          fontWeight: 500,
        }}
      >
        <span
          style={{
            color: "rgba(255,255,255,0.75)",
            fontSize: screenSize.isMobile ? 12 : 13,
            marginRight: 3,
            fontWeight: 600,
          }}
        >
          {String(activeIdx + 1).padStart(2, "0")}
        </span>
        / {String(N).padStart(2, "0")}
      </div>

      {/* Minimalist HUD Controls */}
      <div
        style={{
          position: "absolute",
          bottom: screenSize.isMobile ? 24 : 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          pointerEvents: "none",
          opacity: 1,
          transition: "opacity 0.4s",
        }}
      >
        {/* Progress Tracker Line */}
        <div
          style={{
            width: 180,
            height: 1,
            background: "rgba(255, 255, 255, 0.12)",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -0.5,
              left: 0,
              width: 32,
              height: 2,
              background: "#ffffff",
              transform: `translateX(${((((-uiRot / (2 * Math.PI)) % 1) + 1) % 1) * (180 - 32)}px)`,
              transition: "transform 0.1s ease-out",
            }}
          />
        </div>

        {/* HUD Typography Instruction */}
        <div
          style={{
            fontFamily: "Geist, Inter, sans-serif",
            fontSize: 9,
            letterSpacing: "0.24em",
            color: "rgba(255, 255, 255, 0.38)",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            fontWeight: 600,
          }}
        >
          DRAG · SCROLL · ARROWS ← →
        </div>
      </div>

      {/* Hidden redirect link to trigger PageTransition covering animation */}
      <a href="/works/0" id="works-redirect-link" style={{ display: "none" }} />
    </div>
  );
}
