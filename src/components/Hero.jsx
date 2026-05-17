import { useState, useEffect, useRef } from "react";

const WORDS = ["Excellence", "Innovation", "Intelligence", "Reliability"];

const STATS = [
  { value: 50,  suffix: "+", label: "Global Clients"   },
  { value: 12,  suffix: "+", label: "Years Experience"  },
  { value: 7,   suffix: "",  label: "Core Solutions"    },
  { value: 99,  suffix: "%", label: "Uptime Delivered"  },
];

export default function Hero() {
  const canvasRef = useRef(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState(STATS.map(() => 0));

  useEffect(() => { 
    const t = setTimeout(() => setVisible(true), 120); 
    return () => clearTimeout(t); 
  }, []);

  /* Typewriter */
  useEffect(() => {
    const word = WORDS[wordIndex];
    let t;
    if (!deleting && displayed.length < word.length)
      t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 85);
    else if (!deleting && displayed.length === word.length)
      t = setTimeout(() => setDeleting(true), 2000);
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 42);
    else {
      t = setTimeout(() => {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % WORDS.length);
      }, 0);
    }
    return () => clearTimeout(t);
  }, [displayed, deleting, wordIndex]);

  /* Counters */
  useEffect(() => {
    const steps = 55; let step = 0;
    const t = setInterval(() => {
      step++;
      const ease = 1 - Math.pow(1 - Math.min(step / steps, 1), 3);
      setCounts(STATS.map((s) => Math.round(s.value * ease)));
      if (step >= steps) clearInterval(t);
    }, 36);
    return () => clearInterval(t);
  }, []);

  /* Particle network - removed darkMode dependency, using fixed colors */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId, particles = [];

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const count = Math.floor((canvas.width * canvas.height) / 16000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 2 + 0.8, 
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,87,184,${p.opacity})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,87,184,${(1 - d / 120) * 0.12})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative flex flex-col items-center justify-center text-center overflow-hidden"
      style={{ 
        minHeight: "100vh",
        background: "linear-gradient(160deg, #060d18 0%, #0A1628 45%, #0d1f3c 80%, #0e2548 100%)",
        paddingTop: "68px",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      }}>

      {/* Subtle grid texture - same as About page */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}>

        {/* Badge - matching About page style */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-6"
          style={{ background: "rgba(0,87,184,0.2)", border: "1px solid rgba(0,163,224,0.22)", color: "#93c5fd" }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#00A3E0" }} />
          AI-Powered Telecom Solutions
        </div>

        {/* Headline - matching About page style */}
        <h1 className="font-display font-black text-white mb-4"
          style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
          AI-Powered{" "}
          <span style={{ color: "#00A3E0" }}>
            {displayed}
            <span className="inline-block w-[3px] ml-1 align-middle animate-blink"
              style={{ height: "0.8em", background: "#00A3E0", borderRadius: "2px" }} />
          </span>
          <br />
          <span>for Modern Telecom</span>
        </h1>

        {/* Sub - matching About page style */}
        <p className="max-w-2xl mx-auto text-[15px] leading-relaxed mb-12"
          style={{ color: "rgba(191,219,254,0.65)" }}>
          Transforming telecommunications with cutting-edge AI solutions that optimise operations,
          reduce costs, and future-proof infrastructure for a sustainable world.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button onClick={() => scrollTo("contact")}
            className="px-8 py-3.5 rounded-lg font-bold text-[15px] text-white transition-all duration-250 hover:scale-105 active:scale-95"
            style={{ background: "#0057B8", boxShadow: "0 4px 20px rgba(0,87,184,0.3)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#004a9e"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#0057B8"; }}>
            Get Started →
          </button>
          <button onClick={() => scrollTo("solutions")}
            className="px-8 py-3.5 rounded-lg font-bold text-[15px] transition-all duration-250 hover:scale-105 active:scale-95"
            style={{ 
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.18)",
              color: "#bfdbfe",
              backdropFilter: "blur(8px)" 
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.13)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}>
            Explore Solutions
          </button>
        </div>

        {/* Stats - matching About page style */}
        <div className="grid grid-cols-2 sm:grid-cols-4 rounded-xl overflow-hidden max-w-2xl mx-auto"
          style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(10,22,40,0.55)", backdropFilter: "blur(12px)" }}>
          {STATS.map((s, i) => (
            <div key={s.label} className="flex flex-col items-center py-4 px-3"
              style={{ borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
              <div className="font-display font-black text-2xl mb-0.5" style={{ color: "#00A3E0" }}>
                {counts[i]}{s.suffix}
              </div>
              <div className="text-[10px] font-semibold uppercase tracking-widest"
                style={{ color: "rgba(148,197,233,0.5)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.9s ease 1.1s" }}
        onClick={() => scrollTo("about")}>
        <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "rgba(148,197,233,0.4)" }}>Scroll</span>
        <div className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
          <div className="w-1 h-2 rounded-full animate-scrollBounce" 
            style={{ background: "#00A3E0" }} />
        </div>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}