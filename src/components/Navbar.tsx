import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SITE, SOCIALS, WHATSAPP_URL } from '../data/portfolioData';

const LINKS = ['Projects', 'About', 'Experience', 'Services', 'Skills', 'Contact'];
const initials = SITE.name
  .split(/\s+/)
  .map((w) => w.charAt(0))
  .join('')
  .slice(0, 2)
  .toUpperCase();

/**
 * Floating "dock" navbar:
 *  - glowing monogram with a rotating ring
 *  - red pill that slides under the section you're reading (and follows hover)
 *  - scroll-progress line along the bottom edge
 *  - tucks away while scrolling down, comes back when scrolling up
 *  - full-screen menu with big numbered links on phones/tablets
 */
export const Navbar: React.FC = () => {
  const [active, setActive] = useState<string>('');
  const [hovered, setHovered] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const progressRef = useRef<HTMLSpanElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);

  // scroll: progress line, hide on scroll-down / show on scroll-up
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      setScrolled(y > 40);
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 320);
        lastY = y;
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // which section is in the middle of the screen
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.toLowerCase())).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    const onTop = () => window.scrollY < 200 && setActive('');
    window.addEventListener('scroll', onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onTop);
    };
  }, []);

  // slide the pill under the hovered link, else the active one
  useLayoutEffect(() => {
    const wrap = linksRef.current;
    const pill = pillRef.current;
    if (!wrap || !pill) return;
    const key = hovered ?? active;
    const el = key ? (wrap.querySelector(`[data-key="${key}"]`) as HTMLElement | null) : null;
    if (!el) {
      pill.style.opacity = '0';
      return;
    }
    pill.style.opacity = '1';
    pill.style.width = `${el.offsetWidth}px`;
    pill.style.transform = `translateX(${el.offsetLeft}px)`;
  }, [hovered, active]);

  // full-screen menu: lock page scroll, close on Escape / desktop width
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const mq = window.matchMedia('(min-width: 1024px)');
    const onMq = () => mq.matches && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    mq.addEventListener('change', onMq);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      mq.removeEventListener('change', onMq);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const firstName = SITE.name.split(' ')[0];

  return (
    <>
      <nav
        className={`dock-nav ${hidden && !open ? 'is-hidden' : ''} ${scrolled ? 'is-scrolled' : ''}`}
        aria-label="Main"
      >
        <div className="dock">
          {/* brand */}
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="dock-brand group" aria-label={`${SITE.name} – back to top`}>
            <span className="dock-mono">
              <span className="dock-mono-ring" aria-hidden="true" />
              <span className="dock-mono-core">{initials}</span>
            </span>
            <span className="hidden sm:flex flex-col leading-none min-w-0">
              <span className="text-[13px] font-black uppercase tracking-[0.14em] text-white group-hover:text-red-400 transition-colors">
                {firstName}
              </span>
              <span className="dock-role mt-1 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-500">{SITE.role}</span>
            </span>
          </a>

          {/* desktop links with sliding pill */}
          <div ref={linksRef} className="dock-links hidden lg:flex" onMouseLeave={() => setHovered(null)}>
            <span ref={pillRef} className="dock-pill" aria-hidden="true" />
            {LINKS.map((item) => {
              const key = item.toLowerCase();
              const isActive = active === key;
              return (
                <a
                  key={item}
                  data-key={key}
                  href={`#${key}`}
                  onMouseEnter={() => setHovered(key)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`dock-link ${isActive ? 'is-active' : ''}`}
                >
                  {item}
                </a>
              );
            })}
          </div>

          {/* actions */}
          <div className="flex items-center gap-2">
            <a href="#contact" className="dock-cta hidden sm:inline-flex">
              {SITE.available && <span className="dock-cta-dot" aria-hidden="true" />}
              Let's Talk
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className={`dock-burger lg:hidden ${open ? 'is-open' : ''}`}
            >
              <span />
              <span />
            </button>
          </div>

          {/* scroll progress */}
          <span className="dock-progress" aria-hidden="true">
            <span ref={progressRef} />
          </span>
        </div>
      </nav>

      {/* full-screen menu (phones / tablets) */}
      <div className={`dock-menu lg:hidden ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="dock-menu-inner">
          <nav className="flex flex-col" aria-label="Mobile">
            {LINKS.map((item, i) => {
              const key = item.toLowerCase();
              return (
                <a
                  key={item}
                  href={`#${key}`}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  className={`dock-menu-link ${active === key ? 'is-active' : ''}`}
                  style={{ transitionDelay: open ? `${80 + i * 55}ms` : '0ms' }}
                >
                  <span className="dock-menu-num">0{i + 1}</span>
                  <span className="dock-menu-text">{item}</span>
                  <ArrowUpRight className="dock-menu-arrow" aria-hidden="true" />
                </a>
              );
            })}
          </nav>

          <div className="dock-menu-foot" style={{ transitionDelay: open ? '440ms' : '0ms' }}>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} className="dock-cta w-full justify-center">
              <span className="dock-cta-dot" aria-hidden="true" />
              Chat on WhatsApp
            </a>
            <div className="mt-5 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              <span className="truncate normal-case tracking-normal text-gray-400">{SITE.email}</span>
              <span className="flex gap-4 shrink-0 pl-4">
                {SOCIALS.map((s) => (
                  <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} className="hover:text-white">
                    {s.label}
                  </a>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
