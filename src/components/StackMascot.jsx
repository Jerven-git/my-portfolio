import { AnimatePresence, motion } from 'framer-motion';

/**
 * The stack section's mascot. Playful mode only.
 *
 * One character, not six. Six figures across the rows would need six times the
 * art at a quality this site cannot fake, and would put a second personality
 * system in rows that already carry the element flames. A single character that
 * travels to whatever row you are pointing at does the same job — it reacts,
 * it greets, it has opinions per stack — with one drawing to get right.
 *
 * It exists only in playful mode on purpose. The crafted mode is what a
 * recruiter lands on and forwards to a colleague, and a waving mascot beside
 * Docker and NGINX costs more there than it earns. Playful mode is where the
 * site has already declared the restraint is a choice, so this is where the
 * personality is paid for.
 *
 * Deliberately stylized rather than rendered: flat shapes, palette colors, no
 * attempt at detailed anime art. Simple and confident survives at 64px; detailed
 * and slightly wrong does not.
 */

/* Warm enough to hold an edge against playful mode's pure-white canvas.
   The first value (#fff1f4) was so close to #ffffff that the chin and the
   waving hand had no silhouette at all — the face only read because the hair
   framed it. */
const SKIN = '#ffe1e7';
const HAIR = '#7a0d38';
const BODY = '#e85c86';
const INK = '#2b0912';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

/**
 * Head and one waving hand — deliberately no torso.
 *
 * The first pass had a body with two arms. At 62px the three same-colored
 * rounded shapes merged into an amorphous blob, and framer's originX/originY
 * do not reliably set an SVG group's pivot (SVG needs transform-box: fill-box),
 * so the waving arm rotated about the wrong point and folded into the torso.
 * Fewer parts that cannot collide beats more parts that need to be tuned to
 * avoid colliding.
 */
function Character({ reduced }) {
  return (
    <motion.svg
      width="62"
      height="62"
      viewBox="0 0 62 62"
      fill="none"
      /* Idle bob. The character is alive between greetings, not a decal. */
      animate={reduced ? undefined : { y: [0, -3.5, 0] }}
      transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
    >
      {/* waving hand — behind the head, so any overlap reads as depth */}
      <motion.g
        style={{ transformBox: 'fill-box', transformOrigin: 'bottom center' }}
        animate={reduced ? { rotate: -14 } : { rotate: [-12, 16, -12] }}
        transition={{ repeat: Infinity, duration: 1.05, ease: 'easeInOut' }}
      >
        <rect x="46.5" y="25" width="8" height="15" rx="4" fill={BODY} />
        <circle cx="50.5" cy="23" r="6.4" fill={SKIN} />
      </motion.g>

      {/* head */}
      <circle cx="27" cy="32" r="19" fill={SKIN} />
      {/* hair: a cap plus one tuft, which is the whole silhouette */}
      <path
        d="M8 31a19 19 0 0 1 38 0c0-6.5-5-10-11-11-4.5-.8-8 .6-11.5 1.2C18 22.5 11 24 8 31Z"
        fill={HAIR}
      />
      <path d="M27 12.5c3.5-4.5 9-5 11-.5-3.5-1.8-7-1.2-11 .5Z" fill={HAIR} />

      {/* face */}
      <ellipse cx="20" cy="33" rx="2.4" ry="3" fill={INK} />
      <ellipse cx="34" cy="33" rx="2.4" ry="3" fill={INK} />
      <ellipse cx="14.5" cy="38.5" rx="3" ry="1.9" fill={BODY} opacity="0.55" />
      <ellipse cx="39.5" cy="38.5" rx="3" ry="1.9" fill={BODY} opacity="0.55" />
      <path
        d="M24.5 39.5c1.4 1.7 3.6 1.7 5 0"
        stroke={INK}
        strokeWidth="1.9"
        strokeLinecap="round"
        fill="none"
      />
    </motion.svg>
  );
}

/* No `reduced` prop: this only mounts when the section's flames are enabled,
   which already requires a hover-capable pointer and no reduced-motion
   preference. Threading the flag through would imply a state that cannot
   occur. */
export default function StackMascot({ active }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <AnimatePresence>
        {active && (
          <motion.div
            key="mascot"
            className="absolute right-2 flex items-center gap-2"
            initial={{ opacity: 0, x: 26 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 26, transition: { duration: 0.18 } }}
            /* `top` animates so the character travels between rows rather than
               teleporting. Everything else eases; position uses a damped spring
               so the trip has weight. */
            style={{ top: active.rowTop }}
            transition={{
              opacity: { duration: 0.22, ease: EASE_OUT_EXPO },
              x: { duration: 0.32, ease: EASE_OUT_EXPO },
            }}
          >
            <motion.div
              key={active.key}
              initial={{ opacity: 0, y: 6, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.26, ease: EASE_OUT_EXPO }}
              className="relative rounded-2xl bg-surface px-3.5 py-2 text-sm font-bold text-vermink"
            >
              {active.el.hi}
              {/* bubble tail */}
              <span className="absolute -right-1 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 rounded-[3px] bg-surface" />
            </motion.div>

            <Character reduced={false} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
