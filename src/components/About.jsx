import { useState, useEffect, useRef } from "react";

/* ── shared ── */
const BLUE = "#0057B8";
const NAVY = "#0A1628";

function useInView(ref, threshold = 0.12) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="h-px w-12" style={{ background: BLUE }} />
      <span
        className="text-[11px] font-bold uppercase tracking-[0.2em]"
        style={{ color: BLUE }}
      >
        {text}
      </span>
    </div>
  );
}

/* ── STATS (used in hero) ── */
const STATS = [
  { value: 50,  suffix: "+", label: "Global Clients"   },
  { value: 12,  suffix: "+", label: "Years Experience"  },
  { value: 7,   suffix: "",  label: "Core Solutions"    },
  { value: 99,  suffix: "%", label: "Uptime Delivered"  },
];

/* ── VMG data with SVG icons ── */
const VMG = [
  {
    icon: () => (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: "Our Vision",
    text: "To be the preferred partner for Telco organisations worldwide, empowering them to achieve exceptional operational efficiency, cost optimisation, and sustainable growth through advanced technologies and tailored solutions.",
  },
  {
    icon: () => (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v4h4M3 3l6 6M21 3v4h-4M21 3l-6 6M3 21v-4h4M3 21l6-6M21 21v-4h-4M21 21l-6-6" />
      </svg>
    ),
    title: "Our Mission",
    text: "To deliver innovative, value-driven IT and Telecom solutions through consulting, integration, and professional & managed services — enabling our clients to stay ahead in a rapidly evolving digital landscape.",
  },
  {
    icon: () => (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Our Goal",
    text: "To establish Crystal Technology Services as the benchmark for AI-driven telecom consulting globally, creating long-term partnerships built on measurable impact, trust, and excellence.",
  },
];

/* ── Key Focus cards with SVG icons ── */
const FOCUS = [
  { 
    icon: () => (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
      </svg>
    ),
    title: "Empowering Customers",          
    desc: "Equipping telecom operators with the tools, insights, and strategies to take full control of their operations and growth." 
  },
  { 
    icon: () => (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Improving Productivity",         
    desc: "Streamlining workflows and automating processes so your teams spend less time firefighting and more time delivering value." 
  },
  { 
    icon: () => (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Reducing Operational Costs",     
    desc: "Identifying and eliminating inefficiencies across Opex and Capex to free capital for strategic investment." 
  },
];

/* ── Expertise tags ── */
const TAGS = ["Artificial Intelligence", "Machine Learning", "Telecom Operations", "SAP Advisory", "Network Engineering", "Energy Optimisation", "OSS Modernisation", "Customer Experience"];

/* ── Timeline ── */
const TIMELINE = [
  { year: "2012", label: "Founded",            desc: "Established in Singapore with a vision to transform telecom through AI." },
  { year: "2015", label: "First Major Client", desc: "Partnered with a leading APAC telecom operator on network transformation." },
  { year: "2020", label: "Global Expansion",   desc: "Extended operations across Asia, Middle East, and Europe." },
  { year: "2024", label: "AI Leadership",      desc: "Recognised as a leading AI-driven telecom consultancy in the region." },
];

/* ════════════════════════════════════════════════════════ */
export default function About() {
  /* counter state for hero stats */
  const [counts, setCounts] = useState(STATS.map(() => 0));
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const steps = 55; let step = 0;
    const timer = setInterval(() => {
      step++;
      const ease = 1 - Math.pow(1 - Math.min(step / steps, 1), 3);
      setCounts(STATS.map((s) => Math.round(s.value * ease)));
      if (step >= steps) clearInterval(timer);
    }, 36);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white dark:bg-[#07111f] transition-colors duration-300">

      {/* ══════════════════════════════════════════
          1. HERO BANNER
      ══════════════════════════════════════════ */}
      <section
        className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{
          minHeight:  "420px",
          background: `linear-gradient(160deg, #060d18 0%, ${NAVY} 45%, #0d1f3c 80%, #0e2548 100%)`,
        }}
      >
        {/* subtle grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />

        <div
          className="relative z-10 max-w-4xl mx-auto px-6 py-24"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-6"
            style={{ background: "rgba(0,87,184,0.2)", border: "1px solid rgba(0,163,224,0.22)", color: "#93c5fd" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#00A3E0" }} />
            Who We Are
          </div>

          <h1 className="font-display font-black text-white mb-4"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Redefining Telecom<br />
            <span style={{ color: "#00A3E0" }}>Excellence</span>
          </h1>

          <p className="max-w-2xl mx-auto text-[15px] leading-relaxed mb-12"
            style={{ color: "rgba(191,219,254,0.65)" }}>
            Crystal-Tech is a Next Generation Consulting and Digital Transformation company with a
            key focus on AI-driven solutions, consulting services, and professional services for the
            global telecommunications industry.
          </p>

          {/* stat strip */}
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
      </section>

      {/* ══════════════════════════════════════════
          2. VISION / MISSION / GOAL
      ══════════════════════════════════════════ */}
      <VMGSection />

      {/* ══════════════════════════════════════════
          3. OUR STORY
      ══════════════════════════════════════════ */}
      <StorySection />

      {/* ══════════════════════════════════════════
          4. KEY FOCUS
      ══════════════════════════════════════════ */}
      <FocusSection />

      {/* ══════════════════════════════════════════
          5. OUR EXPERTISE
      ══════════════════════════════════════════ */}
      <ExpertiseSection />

      {/* ══════════════════════════════════════════
          6. CTA STRIP
      ══════════════════════════════════════════ */}
      <CTASection />

    </div>
  );
}

/* ════════════════════════════════════════════════════════ */
function VMGSection() {
  const ref    = useRef(null);
  const inView = useInView(ref);

  return (
    <section ref={ref} className="py-24 bg-white dark:bg-[#07111f] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
          <SectionLabel text="Our Foundation" />
          <h2 className="font-display font-black text-[#0A1628] dark:text-white mb-12"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", letterSpacing: "-0.03em" }}>
            Streamline, Optimise, and Innovate<br />
            <span style={{ color: BLUE }}>with Expert Telecom AI Consultation</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {VMG.map((v, i) => (
            <div
              key={v.title}
              className="rounded-2xl p-7 border bg-white dark:bg-[#0d1f35] cursor-default transition-all duration-250"
              style={{
                borderColor:  "rgba(10,22,40,0.09)",
                borderLeft:   `3px solid ${BLUE}`,
                opacity:      inView ? 1 : 0,
                transform:    inView ? "translateY(0)" : "translateY(28px)",
                transition:   `opacity 0.6s ease ${0.1 + i * 0.12}s, transform 0.6s ease ${0.1 + i * 0.12}s, box-shadow 0.25s`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,87,184,0.11)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div className="mb-4" style={{ color: BLUE }}>{v.icon()}</div>
              <h3 className="font-display font-black text-[17px] mb-3" style={{ color: BLUE }}>{v.title}</h3>
              <p className="text-[14px] leading-relaxed text-slate-600 dark:text-slate-400">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════ */
function StorySection() {
  const ref    = useRef(null);
  const inView = useInView(ref);

  return (
    <section ref={ref} className="py-24 transition-colors duration-300" style={{ background: "#F8FAFC" }}>
      <style>{`.dark #story-sec { background: #0b1826; }`}</style>
      <div id="story-sec" className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          {/* left */}
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-36px)", transition: "opacity 0.75s ease 0.05s, transform 0.75s ease 0.05s" }}>
            <SectionLabel text="Our Story" />
            <h2 className="font-display font-black text-[#0A1628] dark:text-white mb-6"
              style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.4rem)", letterSpacing: "-0.03em" }}>
              Passionate About Transforming<br />
              <span style={{ color: BLUE }}>Telecom Through AI</span>
            </h2>
            <p className="text-[15px] leading-relaxed text-slate-600 dark:text-slate-300 mb-5">
              We are passionate about transforming the telecom industry through the power of AI
              and expert consultation. Founded with a vision to revolutionise telecom operations,
              we have quickly established ourselves as a trusted partner for telecom providers worldwide.
            </p>
            <p className="text-[15px] leading-relaxed text-slate-500 dark:text-slate-400">
              With our deep understanding of the industry and cutting-edge AI technologies, we are
              driving innovation, efficiency, and growth in this rapidly evolving sector — serving
              operators across Asia, the Middle East, and Europe.
            </p>
          </div>

          {/* right: timeline */}
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(36px)", transition: "opacity 0.75s ease 0.15s, transform 0.75s ease 0.15s" }}>
            <div className="relative">
              {/* vertical line */}
              <div className="absolute left-5 top-2 bottom-2 w-px" style={{ background: "rgba(0,87,184,0.15)" }} />

              {TIMELINE.map((t, i) => (
                <div
                  key={t.year}
                  className="relative flex gap-5 mb-8 last:mb-0"
                  style={{
                    opacity:    inView ? 1 : 0,
                    transform:  inView ? "translateY(0)" : "translateY(16px)",
                    transition: `opacity 0.55s ease ${0.25 + i * 0.1}s, transform 0.55s ease ${0.25 + i * 0.1}s`,
                  }}
                >
                  {/* dot */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center z-10"
                    style={{ background: "#f0f6ff", border: `2px solid ${BLUE}` }}>
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: BLUE }} />
                  </div>
                  <div className="pb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-display font-black text-[13px]" style={{ color: BLUE }}>{t.year}</span>
                      <span className="font-bold text-[14px] text-[#0A1628] dark:text-white">{t.label}</span>
                    </div>
                    <p className="text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════ */
function FocusSection() {
  const ref    = useRef(null);
  const inView = useInView(ref);

  return (
    <section ref={ref} className="py-24 bg-white dark:bg-[#07111f] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">

        <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
          <SectionLabel text="Our Key Focus" />
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <h2 className="font-display font-black text-[#0A1628] dark:text-white"
              style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.4rem)", letterSpacing: "-0.03em" }}>
              Innovative, Value-Driven<br />
              <span style={{ color: BLUE }}>IT & Telecom Solutions</span>
            </h2>
            <p className="text-[14px] text-slate-500 dark:text-slate-400 max-w-xs">
              Through consulting, integration, and professional managed services.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {FOCUS.map((f, i) => (
            <div
              key={f.title}
              className="rounded-2xl p-7 border bg-white dark:bg-[#0d1f35] cursor-default"
              style={{
                borderColor: "rgba(10,22,40,0.08)",
                opacity:     inView ? 1 : 0,
                transform:   inView ? "translateY(0)" : "translateY(28px)",
                transition:  `opacity 0.6s ease ${0.1 + i * 0.12}s, transform 0.6s ease ${0.1 + i * 0.12}s, box-shadow 0.25s, border-color 0.25s`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,87,184,0.1)"; e.currentTarget.style.borderColor = "rgba(0,87,184,0.2)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "rgba(10,22,40,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "#f0f6ff", color: BLUE }}>
                {f.icon()}
              </div>
              <h3 className="font-display font-black text-[16px] mb-2 text-[#0A1628] dark:text-white">{f.title}</h3>
              <p className="text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════ */
function ExpertiseSection() {
  const ref    = useRef(null);
  const inView = useInView(ref);

  return (
    <section ref={ref} className="py-24 transition-colors duration-300" style={{ background: "#F8FAFC" }}>
      <style>{`.dark #exp-sec { background: #0b1826; }`}</style>
      <div id="exp-sec" className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* left: image placeholder */}
          <div
            style={{
              opacity:    inView ? 1 : 0,
              transform:  inView ? "translateX(0)" : "translateX(-36px)",
              transition: "opacity 0.75s ease 0.05s, transform 0.75s ease 0.05s",
            }}
          >
            <div
              className="rounded-2xl overflow-hidden flex items-center justify-center"
              style={{
                height:     "380px",
                background: `linear-gradient(135deg, ${NAVY} 0%, #0d1f3c 50%, #0057B8 100%)`,
                border:     "1px solid rgba(0,87,184,0.2)",
              }}
            >
              <img src="/src/assets/expertise.jpg" alt="Crystal Technology Services team" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* right: text */}
          <div
            style={{
              opacity:    inView ? 1 : 0,
              transform:  inView ? "translateX(0)" : "translateX(36px)",
              transition: "opacity 0.75s ease 0.15s, transform 0.75s ease 0.15s",
            }}
          >
            <SectionLabel text="Our Expertise" />
            <h2 className="font-display font-black text-[#0A1628] dark:text-white mb-6"
              style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.4rem)", letterSpacing: "-0.03em" }}>
              Managed by Industry Veterans &<br />
              <span style={{ color: BLUE }}>Highly Skilled Professionals</span>
            </h2>
            <p className="text-[15px] leading-relaxed text-slate-600 dark:text-slate-300 mb-5">
              Our team of seasoned professionals brings together a wealth of experience in both AI
              and the telecom industry. From data scientists and machine learning experts to telecom
              strategists and consultants, we have assembled a multidisciplinary team that understands
              the unique challenges faced by telecom providers.
            </p>
            <p className="text-[14px] leading-relaxed text-slate-500 dark:text-slate-400 mb-8">
              This expertise allows us to develop tailored solutions and provide strategic guidance
              that helps our clients stay ahead of the competition — consistently and measurably.
            </p>

            {/* expertise tags */}
            <div className="flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-lg text-[12px] font-bold border transition-all duration-200 cursor-default"
                  style={{ background: "#f0f6ff", borderColor: "rgba(0,87,184,0.18)", color: BLUE }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = BLUE; e.currentTarget.style.color = "#ffffff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#f0f6ff"; e.currentTarget.style.color = BLUE; }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════ */
function CTASection() {
  const ref    = useRef(null);
  const inView = useInView(ref);

  return (
    <section ref={ref} className="py-24 bg-white dark:bg-[#07111f] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="rounded-2xl p-12 flex flex-col md:flex-row items-center justify-between gap-8"
          style={{
            background:  "#f0f6ff",
            border:      "1px solid rgba(0,87,184,0.12)",
            opacity:     inView ? 1 : 0,
            transform:   inView ? "translateY(0)" : "translateY(24px)",
            transition:  "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: BLUE }}>
              Ready to get started?
            </p>
            <h3 className="font-display font-black text-[#0A1628] mb-2"
              style={{ fontSize: "clamp(1.4rem, 2.8vw, 2rem)", letterSpacing: "-0.02em" }}>
              Talk to a Telecom AI Expert Today
            </h3>
            <p className="text-[14px] text-slate-500 max-w-lg">
              Whether you're looking to reduce costs, modernise your network, or leverage AI for
              predictive maintenance — our team is ready to help. Let's start the conversation.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-7 py-3 rounded-lg text-sm font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
              style={{ background: BLUE, boxShadow: "0 4px 16px rgba(0,87,184,0.3)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#004a9e"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = BLUE; }}
            >
              Talk to an Expert →
            </button>
            <button
              onClick={() => document.getElementById("solutions")?.scrollIntoView({ behavior: "smooth" })}
              className="px-7 py-3 rounded-lg text-sm font-bold transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
              style={{ background: "transparent", border: `1px solid rgba(0,87,184,0.3)`, color: BLUE }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,87,184,0.06)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              View Solutions
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}