'use client';

import { useEffect, useRef } from 'react';

const CARDS = [
  { id: 'c1', pct: '58%', label: 'Increase in pick up point use',     bg: '#D4F542', color: '#111', start: 0.20, end: 0.30 },
  { id: 'c2', pct: '27%', label: 'Increase in pick up point use',     bg: '#1a1a1a', color: '#fff', start: 0.40, end: 0.50 },
  { id: 'c3', pct: '23%', label: 'Decreased in customer phone calls', bg: '#7DD4F8', color: '#111', start: 0.60, end: 0.70 },
  { id: 'c4', pct: '40%', label: 'Decreased in customer phone calls', bg: '#F97316', color: '#111', start: 0.80, end: 0.90 },
];

const HEADLINE = 'WELCOME  ITZFIZZ';
const clamp    = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const norm     = (v, a, b)   => clamp((v - a) / (b - a), 0, 1);

function StatCard({ id, pct, label, bg, color }) {
  return (
    <div id={id} style={{ background:bg, color, borderRadius:14, padding:'24px 28px', minWidth:195, opacity:0, willChange:'opacity,transform' }}>
      <div style={{ fontSize:'2.7rem', fontWeight:900, lineHeight:1, letterSpacing:'-1px', fontFamily:'"Arial Black",Arial,sans-serif' }}>{pct}</div>
      <div style={{ fontSize:'.82rem', fontWeight:500, marginTop:8, opacity:.85, fontFamily:'Arial,sans-serif' }}>{label}</div>
    </div>
  );
}

export default function Hero() {
  const rafRef = useRef(null);

  useEffect(() => {
    let gsap;
    let progress = 0;
    let targetP  = 0;
    const SPEED  = 0.0012;
    const EASE   = 0.08;

    const car   = document.getElementById('car');
    const strip = document.getElementById('strip');
    const hl    = document.getElementById('hl');
    const hint  = document.getElementById('hint');
    const cardEls = CARDS.map(c => ({
      el: document.getElementById(c.id),
      start: c.start,
      end:   c.end,
    }));

    const maxTravel = () => window.innerWidth - (car?.offsetWidth ?? 400) - 40;

    let mounted = true;

    (async () => {
      const mod = await import('gsap');
      gsap = mod.gsap;
      if (!mounted) return;

      function tick() {
        progress += (targetP - progress) * EASE;
        if (Math.abs(targetP - progress) < 0.0001) progress = targetP;

        const p = progress;

        gsap.set(car, { x: p * maxTravel() });

        const stripOp = clamp((p - 0.05) / 0.08, 0, 1);
        gsap.set(strip, { opacity: stripOp });
        gsap.set(hl,    { opacity: stripOp });

        cardEls.forEach(({ el, start, end }) => {
          const t = norm(p, start, end);
          gsap.set(el, { opacity: t, y: 40 * (1 - t) });
        });

        if (hint) hint.style.opacity = p > 0.03 ? '0' : '1';

        rafRef.current = requestAnimationFrame(tick);
      }
      tick();
    })();

    const onWheel = (e) => {
      e.preventDefault();
      targetP = clamp(targetP + e.deltaY * SPEED, 0, 1);
    };

    let lastTouch = null;
    const onTouchStart = (e) => { lastTouch = e.touches[0].clientY; };
    const onTouchMove  = (e) => {
      e.preventDefault();
      const dy = lastTouch - e.touches[0].clientY;
      lastTouch = e.touches[0].clientY;
      targetP = clamp(targetP + dy * SPEED * 2, 0, 1);
    };

    const onKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); targetP = clamp(targetP + 0.05, 0, 1); }
      if (e.key === 'ArrowUp')                    { e.preventDefault(); targetP = clamp(targetP - 0.05, 0, 1); }
    };

    const onResize  = () => { if (gsap && car) gsap.set(car, { x: progress * maxTravel() }); };
    const onScroll  = () => window.scrollTo(0, 0);

    window.addEventListener('wheel',      onWheel,      { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true  });
    window.addEventListener('touchmove',  onTouchMove,  { passive: false });
    window.addEventListener('keydown',    onKey);
    window.addEventListener('resize',     onResize);
    window.addEventListener('scroll',     onScroll);

    return () => {
      mounted = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('wheel',      onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove',  onTouchMove);
      window.removeEventListener('keydown',    onKey);
      window.removeEventListener('resize',     onResize);
      window.removeEventListener('scroll',     onScroll);
    };
  }, []);

  const rowStyle = (pos) => ({
    position: 'absolute',
    [pos]: '7%',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: 18,
    zIndex: 10,
  });

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        overflow: 'hidden',
      }}
    >
      {/* top cards */}
      <div style={rowStyle('top')}>
        <StatCard {...CARDS[0]} />
        <StatCard {...CARDS[1]} />
      </div>

      {/* green strip — z:2 */}
      <div
        id="strip"
        style={{
          position: 'absolute', top: '50%', left: 0,
          width: '100%', height: 220,
          transform: 'translateY(-50%)',
          background: '#22c55e',
          zIndex: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: 0,
          willChange: 'opacity',
          overflow: 'visible',
        }}
      >
        {/* headline — z:4 */}
        <div
          id="hl"
          style={{
            position: 'relative', zIndex: 4,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '100%',
            opacity: 0, willChange: 'opacity',
            pointerEvents: 'none', userSelect: 'none',
          }}
        >
          {[...HEADLINE].map((ch, i) => (
            <span
              key={i}
              style={{
                fontSize: 'clamp(2.6rem,5.8vw,6rem)',
                fontWeight: 900, color: '#000',
                letterSpacing: '.05em', textTransform: 'uppercase',
                display: 'inline-block', whiteSpace: 'pre', lineHeight: 1,
                fontFamily: '"Arial Black",Arial,sans-serif',
              }}
            >
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          ))}
        </div>
      </div>

      {/* car — z:3 */}
      <div
        style={{
          position: 'absolute', top: '50%', left: 0,
          width: '100%', transform: 'translateY(-50%)',
          zIndex: 3, pointerEvents: 'none',
        }}
      >
        <img
          id="car"
          src="/car.png"
          alt="orange sports car top view"
          style={{
            width: 'clamp(300px,34vw,520px)',
            display: 'block',
            willChange: 'transform',
            filter: 'drop-shadow(0 6px 28px rgba(0,0,0,.8))',
          }}
        />
      </div>

      {/* bottom cards */}
      <div style={rowStyle('bottom')}>
        <StatCard {...CARDS[2]} />
        <StatCard {...CARDS[3]} />
      </div>

      {/* scroll hint */}
      <div
        id="hint"
        style={{
          position: 'fixed', bottom: 28, left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 200,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          opacity: 1, transition: 'opacity .5s',
          pointerEvents: 'none',
        }}
      >
        <span style={{ fontSize: '.7rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#666', fontFamily: 'Arial,sans-serif' }}>
          Scroll / Arrow Keys
        </span>
        <div className="scroll-arrow" />
      </div>
    </div>
  );
}
