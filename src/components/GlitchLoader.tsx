import React, { useEffect, useRef, useState } from 'react';

import { LOADER, ABOUT, HERO, PORTFOLIO_PROJECTS } from '../data/portfolioData';

interface GlitchLoaderProps {
  onComplete: () => void;
}

const STATEMENT = LOADER.statement;
const WORDS = STATEMENT.split(' ');
const RED_WORDS = new Set(LOADER.redWords);
// everything visible on first scroll is fetched during the intro, so pictures appear instantly
const PRELOAD_ASSETS = [
  HERO.image,
  ABOUT.portraitDots,
  ABOUT.portrait,
  ...PORTFOLIO_PROJECTS.map((p) => p.poster).filter((x): x is string => !!x),
];
const TIMEOUT_MS = 3000;
const REVEAL_DELAY_MS = 250;
const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function trackPreload(onProgress: (ratio: number) => void) {
  const total = PRELOAD_ASSETS.length + 2;
  let loaded = 0;
  let cancelled = false;

  const tick = () => {
    if (!cancelled) {
      loaded += 1;
      onProgress(Math.min(1, loaded / total));
    }
  };

  PRELOAD_ASSETS.forEach((src) => {
    const img = new Image();
    img.onload = img.onerror = tick;
    img.src = src;
  });

  (document.fonts?.ready ?? Promise.resolve()).then(tick, tick);

  if (document.readyState === 'complete') {
    tick();
  } else {
    window.addEventListener('load', tick, { once: true });
  }

  // (no longer waits for the projects 3D scene: it only renders once scrolled into view,
  //  so waiting for it always ran the loader into its timeout)

  return () => {
    cancelled = true;
    window.removeEventListener('load', tick);
  };
}

export const GlitchLoader: React.FC<GlitchLoaderProps> = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'reveal'>('loading');
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const tensStripRef = useRef<HTMLSpanElement>(null);
  const onesStripRef = useRef<HTMLSpanElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const cancelPreload = trackPreload((ratio) => {
      targetRef.current = ratio;
    });

    const maxTimer = window.setTimeout(() => {
      targetRef.current = 1;
    }, TIMEOUT_MS);

    const timeouts: number[] = [];
    let animId = 0;
    let lastTime = performance.now();

    const loop = (now: number) => {
      // time-based (not frame-based) so a slow frame rate on weak devices can't stretch the loader
      const dt = Math.max(0, now - lastTime);
      lastTime = now;

      const targetVal = targetRef.current * 100;
      const gap = targetVal - currentRef.current;
      const nextVal = Math.min(
        targetVal,
        currentRef.current + Math.max(0.12 * dt, gap * (1 - Math.exp(-0.008 * dt)))
      );
      currentRef.current = nextVal;
      setPercent(Math.floor(nextVal));

      const v = currentRef.current;
      if (tensStripRef.current) {
        tensStripRef.current.style.transform = `translateY(${-(v / 10)}em)`;
      }
      if (onesStripRef.current) {
        onesStripRef.current.style.transform = `translateY(${-(9 - (v % 10))}em)`;
      }

      if (nextVal >= 99.999) {
        setPercent(100);
        timeouts.push(
          window.setTimeout(() => setPhase('reveal'), REVEAL_DELAY_MS),
          window.setTimeout(() => {
            document.body.style.overflow = '';
            onCompleteRef.current();
          }, 1500)
        );
        return;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelPreload();
      cancelAnimationFrame(animId);
      window.clearTimeout(maxTimer);
      timeouts.forEach(window.clearTimeout);
      document.body.style.overflow = '';
    };
  }, []);

  const progressFraction = percent / 100;

  return (
    <div
      className={`glitch-loader ${phase === 'reveal' ? 'is-revealing' : ''}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      aria-label={STATEMENT}
    >
      <div className="glitch-loader__veil" />
      <div className="glitch-loader__count" aria-hidden="true">
        {percent >= 100 ? (
          <span className="glitch-loader__final">100</span>
        ) : (
          <>
            <span className="glitch-loader__digit">
              <span ref={tensStripRef} className="glitch-loader__digit-strip">
                {DIGITS.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </span>
            </span>
            <span className="glitch-loader__digit">
              <span ref={onesStripRef} className="glitch-loader__digit-strip">
                {[...DIGITS].reverse().map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </span>
            </span>
          </>
        )}
      </div>

      <div className="glitch-loader__center">
        <p
          className="glitch-loader__statement"
          style={{ filter: `blur(${(1 - progressFraction) * 6}px)` }}
          aria-hidden="true"
        >
          {WORDS.map((w, idx) => {
            const wordOffset = idx / WORDS.length;
            const wordOpacity = Math.max(0, Math.min(1, (progressFraction - wordOffset * 0.7) * 3));
            return (
              <span
                key={idx}
                className={`glitch-loader__word${RED_WORDS.has(w) ? ' glitch-loader__word--red' : ''}`}
                style={{ opacity: wordOpacity }}
              >
                {w}
              </span>
            );
          })}
        </p>

        {[0, 1, 2, 3, 4].map((idx) => (
          <p key={idx} className={`glitch-loader__frag glitch-loader__frag--${idx}`} aria-hidden="true">
            {STATEMENT}
          </p>
        ))}
      </div>
    </div>
  );
};
