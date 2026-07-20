import { useEffect, useRef, useState } from 'react';

/**
 * The playful mode's 3D stage.
 *
 * A soft noise-displaced blob in maroon, orbited by glossy rose and white
 * spheres, lit like a studio product shot. The whole rig leans toward the
 * cursor; the satellites are pushed away by it.
 *
 * Three deliberate constraints:
 *
 * 1. three.js is ~150kb gzipped and the crafted hero is what loads first.
 *    The import is dynamic, so that cost is paid only once someone actually
 *    switches modes — the default visitor never downloads it.
 *
 * 2. The render loop stops when the tab is hidden or the stage scrolls out
 *    of view. A portfolio that pins a core spinning behind a background tab
 *    is making the opposite of the argument this site wants to make.
 *
 * 3. Under prefers-reduced-motion the scene still builds and renders — once,
 *    as a still. Removing it entirely would leave a blank half-screen; what
 *    the preference asks to remove is the motion, not the image.
 */

const DPR_CAP = 1.75;

/* Maroon / rose / white. Linear-space friendly hex; the renderer is in sRGB
   output mode so these read as authored. */
const COLORS = {
  blob: 0xa31545,
  satelliteA: 0xe85c86,
  satelliteB: 0xffffff,
  satelliteC: 0xf2a0b5,
  key: 0xffffff,
  rim: 0xff8fa3,
};

export default function PlayfulScene({ reduced }) {
  const hostRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let cleanup = () => {};

    import('three')
      .then((THREE) => {
        if (disposed) return;

        let renderer;
        try {
          renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'low-power',
          });
        } catch {
          setFailed(true);
          return;
        }

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
        camera.position.set(0, 0, 7.2);

        renderer.setClearAlpha(0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        host.appendChild(renderer.domElement);
        Object.assign(renderer.domElement.style, {
          width: '100%',
          height: '100%',
          display: 'block',
        });

        /* ── The blob ──────────────────────────────────────────────
           Vertex displacement by 3-octave value noise. onBeforeCompile
           patches the stock physical material rather than replacing it,
           so we keep real clearcoat and lighting for free and only pay
           for the geometry wobble. */
        const uniforms = { uTime: { value: 0 }, uAmp: { value: 0.34 } };

        const blobMat = new THREE.MeshPhysicalMaterial({
          color: COLORS.blob,
          roughness: 0.28,
          clearcoat: 1,
          clearcoatRoughness: 0.22,
          sheen: 0.6,
          sheenColor: new THREE.Color(COLORS.satelliteA),
        });

        blobMat.onBeforeCompile = (shader) => {
          shader.uniforms.uTime = uniforms.uTime;
          shader.uniforms.uAmp = uniforms.uAmp;
          shader.vertexShader = shader.vertexShader
            .replace(
              '#include <common>',
              `#include <common>
               uniform float uTime;
               uniform float uAmp;

               vec3 hash3(vec3 p) {
                 p = vec3(dot(p, vec3(127.1, 311.7, 74.7)),
                          dot(p, vec3(269.5, 183.3, 246.1)),
                          dot(p, vec3(113.5, 271.9, 124.6)));
                 return fract(sin(p) * 43758.5453123) * 2.0 - 1.0;
               }

               float vnoise(vec3 p) {
                 vec3 i = floor(p);
                 vec3 f = fract(p);
                 vec3 u = f * f * (3.0 - 2.0 * f);
                 float n = 0.0;
                 for (int cx = 0; cx < 2; cx++)
                 for (int cy = 0; cy < 2; cy++)
                 for (int cz = 0; cz < 2; cz++) {
                   vec3 o = vec3(float(cx), float(cy), float(cz));
                   float w = mix(1.0 - u.x, u.x, o.x)
                           * mix(1.0 - u.y, u.y, o.y)
                           * mix(1.0 - u.z, u.z, o.z);
                   n += w * dot(hash3(i + o), f - o);
                 }
                 return n;
               }

               /* Weighted toward the base octave. Earlier weights put enough
                  energy in the 4x octave that the recomputed normals broke the
                  highlight into speckle and the blob read as a walnut. Soft,
                  few, large lobes is the target. */
               float fbm(vec3 p) {
                 return vnoise(p) * 0.74
                      + vnoise(p * 2.03) * 0.21
                      + vnoise(p * 4.01) * 0.05;
               }`
            )
            /* Displace along the normal, then rebuild the normal from two
               nudged neighbours. Without this the lighting stays spherical
               and the wobble reads as a texture rather than as form. */
            .replace(
              '#include <beginnormal_vertex>',
              `#include <beginnormal_vertex>
               float t = uTime * 0.28;
               vec3 np = position * 0.92 + vec3(t, t * 0.7, -t * 0.5);
               float d = fbm(np) * uAmp;

               /* Names avoid tangent/bitangent: three declares those as
                  attributes under USE_TANGENT, and shadowing an attribute is
                  a compile error on some drivers even when the define is off. */
               vec3 tanA = normalize(cross(objectNormal, vec3(0.0, 1.0, 0.0001)));
               vec3 tanB = normalize(cross(objectNormal, tanA));
               float e = 0.12;
               vec3 pa = position + tanA * e;
               vec3 pb = position + tanB * e;
               float da = fbm(pa * 0.92 + vec3(t, t * 0.7, -t * 0.5)) * uAmp;
               float db = fbm(pb * 0.92 + vec3(t, t * 0.7, -t * 0.5)) * uAmp;

               vec3 centre = position + objectNormal * d;
               vec3 dispA = (pa + normalize(pa) * da) - centre;
               vec3 dispB = (pb + normalize(pb) * db) - centre;

               /* The cross product's sign depends on the winding of the two
                  sample directions, which flips across the sphere. Re-orient
                  against the original normal so the blob is never lit inside
                  out. */
               vec3 bent = normalize(cross(dispA, dispB));
               objectNormal = dot(bent, objectNormal) < 0.0 ? -bent : bent;`
            )
            .replace(
              '#include <begin_vertex>',
              `#include <begin_vertex>
               transformed += normalize(position) * d;`
            );
        };

        const blob = new THREE.Mesh(new THREE.IcosahedronGeometry(1.85, 48), blobMat);
        scene.add(blob);

        /* ── Satellites ───────────────────────────────────────────── */
        const satGeo = new THREE.IcosahedronGeometry(1, 4);
        const satellites = [
          { color: COLORS.satelliteA, r: 0.42, dist: 3.15, speed: 0.42, phase: 0, tilt: 0.35 },
          { color: COLORS.satelliteB, r: 0.26, dist: 3.7, speed: -0.3, phase: 2.1, tilt: -0.55 },
          { color: COLORS.satelliteC, r: 0.33, dist: 2.75, speed: 0.55, phase: 4.0, tilt: 0.9 },
          { color: COLORS.satelliteB, r: 0.19, dist: 4.05, speed: -0.47, phase: 5.3, tilt: 0.15 },
        ].map((cfg) => {
          const mesh = new THREE.Mesh(
            satGeo,
            new THREE.MeshPhysicalMaterial({
              color: cfg.color,
              roughness: 0.16,
              clearcoat: 1,
              clearcoatRoughness: 0.1,
              metalness: 0,
            })
          );
          mesh.scale.setScalar(cfg.r);
          scene.add(mesh);
          return { mesh, cfg };
        });

        /* ── Light ────────────────────────────────────────────────── */
        const key = new THREE.DirectionalLight(COLORS.key, 2.6);
        key.position.set(3.5, 4.5, 5);
        const rim = new THREE.DirectionalLight(COLORS.rim, 1.9);
        rim.position.set(-4.5, -1.5, -3);
        scene.add(key, rim, new THREE.AmbientLight(0xffffff, 0.55));

        /* ── Pointer ──────────────────────────────────────────────
           Target vs. current, eased every frame. Reading the pointer
           straight into rotation makes the rig snap; the lag is what
           reads as weight. */
        const target = { x: 0, y: 0 };
        const current = { x: 0, y: 0 };

        const onPointer = (e) => {
          target.x = (e.clientX / window.innerWidth) * 2 - 1;
          target.y = -((e.clientY / window.innerHeight) * 2 - 1);
        };
        window.addEventListener('pointermove', onPointer, { passive: true });

        /* ── Size ─────────────────────────────────────────────────── */
        const resize = () => {
          const { clientWidth: w, clientHeight: h } = host;
          if (!w || !h) return;
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, DPR_CAP));
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        };
        const ro = new ResizeObserver(resize);
        ro.observe(host);
        resize();

        /* ── Loop ─────────────────────────────────────────────────── */
        const clock = new THREE.Clock();
        let raf = 0;
        let onScreen = true;

        const frame = () => {
          raf = requestAnimationFrame(frame);
          const t = clock.getElapsedTime();
          uniforms.uTime.value = t;

          current.x += (target.x - current.x) * 0.045;
          current.y += (target.y - current.y) * 0.045;

          blob.rotation.y = t * 0.12 + current.x * 0.5;
          blob.rotation.x = current.y * -0.4;
          blob.position.x = current.x * 0.32;
          blob.position.y = current.y * 0.22;

          for (const { mesh, cfg } of satellites) {
            const a = t * cfg.speed + cfg.phase;
            /* Satellites flee the cursor, and the further the cursor is
               pushed the wider they orbit. */
            const spread = cfg.dist + Math.hypot(current.x, current.y) * 0.45;
            mesh.position.set(
              Math.cos(a) * spread - current.x * 0.85,
              Math.sin(a) * spread * 0.55 + Math.sin(t * 0.7 + cfg.phase) * 0.3 - current.y * 0.85,
              Math.sin(a) * spread * cfg.tilt
            );
          }

          renderer.render(scene, camera);
        };

        const start = () => {
          if (!raf && onScreen && !document.hidden) {
            clock.start();
            frame();
          }
        };
        const stop = () => {
          cancelAnimationFrame(raf);
          raf = 0;
        };

        if (reduced) {
          /* One frame, held. The form is the point; the motion is not. */
          renderer.render(scene, camera);
        } else {
          const io = new IntersectionObserver(([entry]) => {
            onScreen = entry.isIntersecting;
            onScreen ? start() : stop();
          });
          io.observe(host);

          const onVisibility = () => (document.hidden ? stop() : start());
          document.addEventListener('visibilitychange', onVisibility);
          start();

          cleanup = () => {
            io.disconnect();
            document.removeEventListener('visibilitychange', onVisibility);
          };
        }

        const baseCleanup = cleanup;
        cleanup = () => {
          baseCleanup();
          stop();
          ro.disconnect();
          window.removeEventListener('pointermove', onPointer);
          blob.geometry.dispose();
          blobMat.dispose();
          satGeo.dispose();
          satellites.forEach(({ mesh }) => mesh.material.dispose());
          renderer.dispose();
          renderer.domElement.remove();
        };
      })
      .catch(() => setFailed(true));

    return () => {
      disposed = true;
      cleanup();
    };
  }, [reduced]);

  /* WebGL unavailable or three failed to load: a soft maroon gradient
     stands in. The layout never collapses. */
  if (failed) {
    return (
      <div
        aria-hidden
        className="h-full w-full rounded-full opacity-70"
        style={{
          background:
            'radial-gradient(circle at 38% 34%, #e85c86 0%, #a31545 46%, transparent 72%)',
          filter: 'blur(18px)',
        }}
      />
    );
  }

  return <div ref={hostRef} aria-hidden className="h-full w-full" />;
}
