"use client";

import { useEffect, useRef } from "react";

const CARDS = [
  { id: "c1", pct: "58%", label: "Increase in pick up point use",     bg: "#D4F542", color: "#111", start: 0.2, end: 0.3 },
  { id: "c2", pct: "27%", label: "Increase in pick up point use",     bg: "#1a1a1a", color: "#fff", start: 0.4, end: 0.5 },
  { id: "c3", pct: "23%", label: "Decreased in customer phone calls", bg: "#7DD4F8", color: "#111", start: 0.6, end: 0.7 },
  { id: "c4", pct: "40%", label: "Decreased in customer phone calls", bg: "#F97316", color: "#111", start: 0.8, end: 0.9 },
];

const HEADLINE = "WELCOME  ITZFIZZ";
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const norm  = (v, a, b)   => clamp((v - a) / (b - a), 0, 1);

function StatCard({ pct, label, bg, color }) {
  return (
    <div
      style={{
        background: bg,
        color,
        borderRadius: 14,
        padding: "24px 28px",
        minWidth: 195,
        opacity: 0,
        willChange: "opacity,transform",
      }}
    >
      <div style={{ fontSize: "2.7rem", fontWeight: 900 }}>
        {pct}
      </div>
      <div style={{ fontSize: ".82rem", marginTop: 8, opacity: 0.85 }}>
        {label}
      </div>
    </div>
  );
}

export default function Hero() {
  const rafRef = useRef(null);
  const carRef = useRef(null);
  const stripRef = useRef(null);
  const hlRef = useRef(null);
  const hintRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    let progress = 0;
    let targetP  = 0;
    const SPEED  = 0.0012;
    const EASE   = 0.08;

    let mounted = true;

    import("gsap").then(({ gsap }) => {
      if (!mounted) return;

      const maxTravel = () =>
        window.innerWidth - (carRef.current?.offsetWidth ?? 400) - 40;

      function tick() {
        progress += (targetP - progress) * EASE;
        if (Math.abs(targetP - progress) < 0.0001) progress = targetP;

        const p = progress;

        if (carRef.current) {
          gsap.set(carRef.current, { x: p * maxTravel() });
        }

        const stripOp = clamp((p - 0.05) / 0.08, 0, 1);

        if (stripRef.current)
          gsap.set(stripRef.current, { opacity: stripOp });

        if (hlRef.current)
          gsap.set(hlRef.current, { opacity: stripOp });

        cardRefs.current.forEach((el, i) => {
          const { start, end } = CARDS[i];
          const t = norm(p, start, end);
          if (el) gsap.set(el, { opacity: t, y: 40 * (1 - t) });
        });

        if (hintRef.current)
          hintRef.current.style.opacity = p > 0.03 ? "0" : "1";

        rafRef.current = requestAnimationFrame(tick);
      }

      tick();
    });

    const onWheel = (e) => {
      e.preventDefault();
      targetP = clamp(targetP + e.deltaY * SPEED, 0, 1);
    };

    const onKey = (e) => {
      if (e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        targetP = clamp(targetP + 0.05, 0, 1);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        targetP = clamp(targetP - 0.05, 0, 1);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);

    return () => {
      mounted = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const rowStyle = (pos) => ({
    position: "absolute",
    [pos]: "7%",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: 18,
    zIndex: 10,
  });

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        overflow: "hidden",
      }}
    >
      {/* Top cards */}
      <div style={rowStyle("top")}>
        {CARDS.slice(0, 2).map((c, i) => (
          <div key={i} ref={(el) => (cardRefs.current[i] = el)}>
            <StatCard {...c} />
          </div>
        ))}
      </div>

      {/* Green strip */}
      <div
        ref={stripRef}
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: "100%",
          height: 220,
          transform: "translateY(-50%)",
          background: "#22c55e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0,
          zIndex: 2,
        }}
      >
        <div
          ref={hlRef}
          style={{
            fontSize: "clamp(2.6rem,5.8vw,6rem)",
            fontWeight: 900,
            color: "#000",
            letterSpacing: ".05em",
            opacity: 0,
          }}
        >
          {HEADLINE}
        </div>
      </div>

      {/* Car */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: "100%",
          transform: "translateY(-50%)",
          zIndex: 3,
          pointerEvents: "none",
        }}
      >
        <img
          ref={carRef}
          src={`${
            process.env.NODE_ENV === "production"
              ? "/itzfizz-car-animation"
              : ""
          }/car.png`}
          alt="car"
          style={{
            width: "clamp(300px,34vw,520px)",
            display: "block",
            filter: "drop-shadow(0 6px 28px rgba(0,0,0,.8))",
          }}
        />
      </div>

      {/* Bottom cards */}
      <div style={rowStyle("bottom")}>
        {CARDS.slice(2).map((c, i) => (
          <div key={i} ref={(el) => (cardRefs.current[i + 2] = el)}>
            <StatCard {...c} />
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div
        ref={hintRef}
        style={{
          position: "fixed",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 1,
        }}
      >
        <span style={{ fontSize: ".7rem", color: "#666" }}>
          Scroll / Arrow Keys
        </span>
      </div>
    </div>
  );
}
