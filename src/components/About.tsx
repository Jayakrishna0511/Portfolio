import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { SITE, ABOUT, WHY_ME } from '../data/portfolioData';
import { Check } from 'lucide-react';
import { PortraitDots } from './PortraitDots';

gsap.registerPlugin(ScrollTrigger);

/** Portrait made of 3D dots that assemble into the photo, inside an offset red frame. */
export const PortraitCard: React.FC = () => (
  <div className="portrait-wrap">
    <div className="portrait-tilt">
      <div className="portrait-glow" aria-hidden="true" />
      <div className="portrait-offset" aria-hidden="true" />
      <div className="portrait-img">
        <PortraitDots src={ABOUT.portraitDots} fallbackSrc={ABOUT.portrait} alt={ABOUT.portraitAlt} />
        <span className="portrait-corner tl" aria-hidden="true" />
        <span className="portrait-corner br" aria-hidden="true" />
      </div>
    </div>
    {SITE.available && (
      <div className="portrait-status glass">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[11px] md:text-xs font-bold uppercase tracking-[0.18em] text-gray-100">Open to work</span>
      </div>
    )}
  </div>
);

/** "Why me" card shown under the portrait: headline numbers, reasons and core skills. */
const WhyMe: React.FC = () => (
  <div className="glass glass-panel-card why-me w-full rounded-3xl p-5 md:p-7 flex flex-col gap-5 lg:flex-1 lg:justify-between">
    <div className="flex items-center gap-3">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#ff2a3b]/60" />
      <h3 className="text-[#ff2a3b] font-black uppercase tracking-[0.3em] text-sm md:text-base">Why Me</h3>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#ff2a3b]/60" />
    </div>

    <div className="grid grid-cols-3 gap-2 md:gap-3">
      {WHY_ME.stats.map((s) => (
        <div key={s.label} className="glass-chip rounded-2xl px-2 py-3 text-center">
          <div className="text-2xl md:text-3xl font-black text-white leading-none">{s.value}</div>
          <div className="mt-1.5 text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-gray-400 leading-tight">{s.label}</div>
        </div>
      ))}
    </div>

    <ul className="flex flex-col gap-3 list-none p-0 m-0">
      {WHY_ME.points.map((pt) => (
        <li key={pt} className="flex items-start gap-3 text-sm md:text-[15px] text-gray-300 leading-snug">
          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#ff2a3b]/15 ring-1 ring-[#ff2a3b]/50">
            <Check className="h-3 w-3 text-[#ff4d5c]" strokeWidth={3} />
          </span>
          <span>{pt}</span>
        </li>
      ))}
    </ul>

    <div className="flex flex-wrap gap-2">
      {WHY_ME.skills.map((sk) => (
        <span key={sk} className="px-3 py-1.5 text-xs font-bold text-gray-200 rounded-full ring-1 ring-white/12 bg-white/[0.04]">
          {sk}
        </span>
      ))}
    </div>
  </div>
);

const STACK = ABOUT.technologies;

const FOCUS = ABOUT.focus;

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const photoCardRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })
        .fromTo(headRef.current, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' })
        .fromTo(bioRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .fromTo(
          photoCardRef.current,
          { scale: 0.85, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.2)' },
          '-=0.6'
        )
        .fromTo(
          stackRef.current?.children || [],
          { scale: 0.7, opacity: 0, y: 15 },
          { scale: 1, opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: 'back.out(1.5)' },
          '-=0.6'
        );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full text-gray-100 py-24 overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-12 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        {/* Left column */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-[#a31515] font-bold uppercase text-sm md:text-base tracking-[0.2em]">
              {ABOUT.eyebrow}
            </span>
            <h2
              ref={headRef}
              className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight uppercase text-white"
            >
              ABOUT ME.
            </h2>
            <div className="w-24 h-1.5 bg-[#a31515] rounded-full mt-2" />
          </div>

          <div className="relative lg:flex-1 flex flex-col">
            <div className="red-halo" aria-hidden="true" />
            <div className="glass glass-panel-card relative rounded-3xl p-5 md:p-10 flex flex-col gap-5 md:gap-7 lg:flex-1 lg:justify-between">
              <div ref={bioRef} className="flex flex-col gap-4 md:gap-5">
                {ABOUT.paragraphs.map((text, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? 'text-gray-200 text-base md:text-xl leading-relaxed font-medium'
                        : 'text-gray-400 text-base md:text-lg leading-relaxed'
                    }
                  >
                    {text}
                  </p>
                ))}
              </div>

              <div>
                <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider text-gray-500 mb-3 md:mb-4">
                  Technologies
                </h3>
                <div ref={stackRef} className="flex flex-wrap gap-2 md:gap-3">
                  {STACK.map((tool) => (
                    <span
                      key={tool}
                      className="tech-pill glass-chip px-3.5 py-1.5 text-xs md:px-4 md:py-2 md:text-base font-bold text-gray-200 rounded-full cursor-default"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider text-gray-500 mb-3 md:mb-4">
                  Areas of Focus
                </h3>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {FOCUS.map((f) => (
                    <span
                      key={f}
                      className="px-3.5 py-1.5 text-xs md:px-4 md:py-2 md:text-[15px] font-semibold text-red-300 rounded-full ring-1 ring-red-500/30 bg-[#a31515]/10"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right column: dot portrait + why me */}
        <div className="lg:col-span-5 flex flex-col items-center gap-8 relative">
          <div ref={photoCardRef} data-photo-reveal={true} className="flex flex-col items-center pointer-events-auto">
            <PortraitCard />
          </div>
          <div className="w-full max-w-[26rem] lg:flex-1 flex flex-col">
            <WhyMe />
          </div>
        </div>
      </div>
    </section>
  );
};
