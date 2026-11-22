import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPERIENCES } from '../data/portfolioData';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

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
        .fromTo(titleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' })
        .fromTo(
          '.experience-card',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.15, ease: 'back.out(1.2)' },
          '-=0.2'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full text-gray-100 py-24 px-6 md:px-12 lg:px-20 flex flex-col items-center justify-center overflow-hidden border-t border-white/5"
    >
      {/* Section Title */}
      <div ref={titleRef} className="flex flex-col items-center text-center mb-16 z-10">
        <span className="text-[#a31515] font-bold uppercase text-[10px] md:text-xs tracking-[0.2em] mb-2 flex items-center gap-1.5">
          <Briefcase className="w-4 h-4 text-[#ff2a3b]" />
          Career Journey
        </span>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase text-white">
          PROFESSIONAL EXPERIENCE.
        </h2>
        <div className="w-20 h-1.5 bg-[#a31515] mt-3 rounded-full" />
      </div>

      {/* Experience Timeline Cards */}
      <div className="relative w-full max-w-5xl z-10 flex flex-col gap-8 md:gap-10">
        <div className="red-halo" aria-hidden="true" />
        {EXPERIENCES.map((exp, idx) => (
          <div
            key={exp.id}
            className="experience-card glass glass-panel-card relative p-6 sm:p-8 md:p-10 rounded-3xl flex flex-col gap-6 group hover:border-[#ff334b]/40 transition-colors"
          >
            {/* Header: Role, Company, Period */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white group-hover:text-[#ff334b] transition-colors">
                    {exp.role}
                  </h3>
                  {exp.current && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Current
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs md:text-sm text-gray-300 font-semibold mt-1.5">
                  <span className="text-gray-100 font-bold">{exp.company}</span>
                  <span className="text-gray-500">•</span>
                  <span className="flex items-center gap-1 text-gray-400">
                    <MapPin className="w-3.5 h-3.5 text-[#ff2a3b]" />
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Period badge */}
              <div className="shrink-0">
                <span className="glass-chip inline-flex items-center gap-2 text-xs md:text-sm font-bold text-gray-200 px-4 py-2 rounded-full">
                  <Calendar className="w-3.5 h-3.5 text-red-400" />
                  {exp.period}
                </span>
              </div>
            </div>

            {/* Summary */}
            <p className="text-sm md:text-base text-gray-300 leading-relaxed font-medium">
              {exp.summary}
            </p>

            {/* Bullet Highlights */}
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              {exp.highlights.map((item, hIdx) => (
                <li key={hIdx} className="flex items-start gap-3 text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-[#ff2a3b] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Technologies */}
            <div className="pt-2 border-t border-white/5">
              <span className="block text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-3">
                Key Technologies
              </span>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="tech-pill glass-chip text-xs md:text-sm font-semibold text-gray-200 px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
