import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * 3D dot portrait: thousands of particles fly in from a scattered cloud and assemble into the
 * photo whenever it scrolls into view. Dots carry a little depth (brighter = closer) so the
 * portrait reads as 3D when it tilts towards the pointer; dots near the pointer get pushed away.
 * Falls back to the plain image without WebGL or with reduced motion.
 */
interface Props {
  src: string; // transparent cut-out (alpha = the person)
  fallbackSrc: string;
  alt: string;
}

const VERT = /* glsl */ `
  attribute vec3 aStart;
  attribute vec3 aColor;
  attribute float aDelay;
  attribute float aSize;
  uniform float uProgress;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMouseOn;
  uniform float uPx;
  uniform float uDepth;
  uniform float uDotsAlpha;
  varying vec3 vColor;
  varying float vAlpha;

  float easeOutCubic(float t) { return 1.0 - pow(1.0 - t, 3.0); }

  void main() {
    float t = clamp((uProgress - aDelay) / 0.55, 0.0, 1.0);
    float e = easeOutCubic(t);
    vec3 p = mix(aStart, vec3(position.xy, position.z * uDepth), e);

    // swirl while flying in
    float swirl = (1.0 - e) * 2.4;
    float cs = cos(swirl), sn = sin(swirl);
    p.xz = mat2(cs, -sn, sn, cs) * p.xz;

    // gentle breathing shimmer once assembled
    p.z += sin(uTime * 1.6 + aDelay * 40.0 + position.y * 9.0) * 0.006 * e * uDepth;

    // push dots away from the pointer
    vec2 d = p.xy - uMouse;
    float dist = length(d);
    float push = uMouseOn * e * smoothstep(0.11, 0.0, dist);
    p.xy += normalize(d + 1e-5) * push * 0.035;
    p.z += push * 0.18;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPx * (2.2 / -mv.z);
    vColor = aColor;
    vAlpha = mix(0.35, 1.0, e) * uDotsAlpha;
  }
`;

// zoom so head-to-waist fills the 4:5 frame (image top 10% is empty wall)
const SCALE = 1.42;
const TOP = 0.07;

const FRAG = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float r = length(c);
    if (r > 0.5) discard;
    float a = smoothstep(0.5, 0.32, r);
    gl_FragColor = vec4(vColor, a * vAlpha);
  }
`;

export const PortraitDots: React.FC<Props> = ({ src, fallbackSrc, alt }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setFallback(true);
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
    } catch {
      setFallback(true);
      return;
    }
    const mobile = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0, 0);
    renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block';
    wrap.appendChild(renderer.domElement);

    // Frame is 4:5 → world box x ∈ [-0.5, 0.5], y ∈ [-0.625, 0.625] at z = 0
    const CAM_Z = 2.2;
    const camera = new THREE.PerspectiveCamera((2 * Math.atan(0.625 / CAM_Z) * 180) / Math.PI, 0.8, 0.1, 20);
    camera.position.z = CAM_Z;
    const scene = new THREE.Scene();
    const group = new THREE.Group();
    scene.add(group);

    const uniforms = {
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(9, 9) },
      uMouseOn: { value: 0 },
      uPx: { value: 1 },
      uDepth: { value: 1 },
      uDotsAlpha: { value: 1 },
    };
    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
      transparent: true,
      depthWrite: false,
    });
    let geometry: THREE.BufferGeometry | null = null;
    let disposed = false;

    // ── build the dots from the image ──
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => {
      if (disposed) return;
      const GRID = mobile ? 150 : 200;
      const cv = document.createElement('canvas');
      cv.width = GRID;
      cv.height = GRID;
      const ctx = cv.getContext('2d', { willReadFrequently: true });
      if (!ctx) return setFallback(true);
      ctx.drawImage(img, 0, 0, GRID, GRID);
      const data = ctx.getImageData(0, 0, GRID, GRID).data;

      const pos: number[] = [], start: number[] = [], col: number[] = [], delay: number[] = [], size: number[] = [];
      const red = new THREE.Color('#ff2a3b');
      const c = new THREE.Color();
      const cell = 1 / GRID;
      for (let y = 0; y < GRID; y++) {
        for (let x = 0; x < GRID; x++) {
          const i = (y * GRID + x) * 4;
          const a = data[i + 3] / 255;
          if (a < 0.5) continue;
          const r = data[i] / 255, g = data[i + 1] / 255, b = data[i + 2] / 255;
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          const wx = (x * cell - 0.5) * SCALE + (Math.random() - 0.5) * cell * SCALE * 0.5;
          const wy = 0.625 - (y * cell - TOP) * SCALE + (Math.random() - 0.5) * cell * SCALE * 0.5;
          if (Math.abs(wx) > 0.5 || wy < -0.625 || wy > 0.625) continue;
          pos.push(wx, wy, (lum - 0.45) * 0.16);
          // scattered start: a wide shell around the frame
          const th = Math.random() * Math.PI * 2;
          const ph = Math.acos(2 * Math.random() - 1);
          const rad = 1.1 + Math.random() * 1.4;
          start.push(rad * Math.sin(ph) * Math.cos(th), rad * Math.sin(ph) * Math.sin(th), rad * Math.cos(ph) - 0.6);
          // true colour, lifted a touch and kissed with red so it fits the theme
          c.setRGB(r, g, b).lerp(red, 0.06 + 0.1 * (1 - lum));
          c.multiplyScalar(1.35);
          col.push(c.r, c.g, c.b);
          // assemble from the head downwards, with randomness
          delay.push(y / GRID * 0.25 + Math.random() * 0.12);
          size.push((mobile ? 2.4 : 2.5) * (0.8 + lum * 0.5));
        }
      }
      geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      geometry.setAttribute('aStart', new THREE.Float32BufferAttribute(start, 3));
      geometry.setAttribute('aColor', new THREE.Float32BufferAttribute(col, 3));
      geometry.setAttribute('aDelay', new THREE.Float32BufferAttribute(delay, 1));
      geometry.setAttribute('aSize', new THREE.Float32BufferAttribute(size, 1));
      group.add(new THREE.Points(geometry, material));
      wrap.setAttribute('data-dots-ready', '1');
    };
    img.onerror = () => setFallback(true);
    img.src = src;

    // ── sizing ──
    const resize = () => {
      const w = wrap.clientWidth || 1;
      const h = wrap.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      // point size scales with the frame so the density looks the same at every width
      uniforms.uPx.value = (w / 380) * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // ── pointer: tilt + repel ──
    const target = { rx: 0, ry: 0 };
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const hit = new THREE.Vector3();
    const inv = new THREE.Matrix4();
    let mouseOn = 0;
    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width;
      const ny = (e.clientY - r.top) / r.height;
      target.ry = (nx - 0.5) * 0.7;
      target.rx = (ny - 0.5) * 0.45;
      ndc.set(nx * 2 - 1, -(ny * 2 - 1));
      raycaster.setFromCamera(ndc, camera);
      if (raycaster.ray.intersectPlane(plane, hit)) {
        inv.copy(group.matrixWorld).invert();
        hit.applyMatrix4(inv);
        uniforms.uMouse.value.set(hit.x, hit.y);
      }
      mouseOn = 1;
      if (!mobile) hovering = true;
    };
    const onLeave = () => {
      target.rx = 0;
      target.ry = 0;
      mouseOn = 0;
      hovering = false;
    };
    wrap.addEventListener('pointermove', onMove);
    wrap.addEventListener('pointerleave', onLeave);

    // ── visibility: assemble each time it scrolls in, scatter again when it leaves ──
    let visible = false;
    let goal = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        goal = entry.isIntersecting && entry.intersectionRatio > 0.1 ? 1 : 0;
      },
      { threshold: [0, 0.1, 0.3] }
    );
    io.observe(wrap);

    // states: dots fly in → flatten → real photo fades in. Hover (desktop) dissolves back to dots.
    let hovering = false;
    let photoA = 0;
    const photo = photoRef.current;
    const approach = (v: number, to: number, rate: number, dt: number) =>
      v + Math.sign(to - v) * Math.min(Math.abs(to - v), rate * dt);

    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible || document.hidden) return;
      uniforms.uTime.value += dt;
      const u = uniforms;
      // assemble in ~1.2s, scatter faster
      u.uProgress.value = approach(u.uProgress.value, goal, goal > u.uProgress.value ? 0.85 : 1.6, dt);
      const formed = goal === 1 && u.uProgress.value >= 1 && geometry !== null;
      const wantPhoto = formed && !hovering;
      // flatten the relief before the photo appears so dots and photo line up exactly
      u.uDepth.value = approach(u.uDepth.value, wantPhoto ? 0 : 1, 3, dt);
      photoA = approach(photoA, wantPhoto && u.uDepth.value < 0.05 ? 1 : 0, wantPhoto ? 2.2 : 4, dt);
      u.uDotsAlpha.value = 1 - photoA * 0.92;
      if (photo) photo.style.opacity = String(photoA);
      u.uMouseOn.value += (mouseOn - u.uMouseOn.value) * (1 - Math.exp(-6 * dt));
      // tilt + idle sway only while it's dots; settle square when showing the photo
      const sway = wantPhoto ? 0 : Math.sin(u.uTime.value * 0.5) * 0.06;
      const tx = wantPhoto ? 0 : target.rx;
      const ty = wantPhoto ? 0 : target.ry + sway;
      group.rotation.y += (ty - group.rotation.y) * (1 - Math.exp(-5 * dt));
      group.rotation.x += (tx - group.rotation.x) * (1 - Math.exp(-5 * dt));
      if (photoA < 1) renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(loop);

    const onLost = (e: Event) => {
      e.preventDefault();
      setFallback(true);
    };
    renderer.domElement.addEventListener('webglcontextlost', onLost);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerleave', onLeave);
      renderer.domElement.removeEventListener('webglcontextlost', onLost);
      geometry?.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [src]);

  return (
    <div ref={wrapRef} className="absolute inset-0" role="img" aria-label={alt}>
      {/* the real photo, placed exactly where the dots land (same zoom as the dot sampling) */}
      {!fallback && (
        <img
          ref={photoRef}
          src={src}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="absolute max-w-none pointer-events-none select-none"
          style={{ width: `${SCALE * 100}%`, left: `${((1 - SCALE) / 2) * 100}%`, top: `${(-(TOP * SCALE) / 1.25) * 100}%`, opacity: 0 }}
        />
      )}
      {fallback && <img src={fallbackSrc} alt={alt} draggable={false} className="w-full h-full object-cover" />}
    </div>
  );
};
