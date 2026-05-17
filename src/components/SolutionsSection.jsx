import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const BLUE = "#0057B8";

const SERVICES = [
  { 
    icon: () => (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9h14M5 15h14M5 9h14M5 15h14M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" />
      </svg>
    ),
    tag: "AI & ML",  
    title: "Predictive Maintenance",          
    short: "Prevent network failures before they happen using AI."        
  },
  { 
    icon: () => (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    tag: "Energy",   
    title: "Telco Energy Optimisation",        
    short: "Cut energy costs with intelligent analytics."                 
  },
  { 
    icon: () => (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    tag: "Finance",  
    title: "Cost Optimisation (Opex & Capex)", 
    short: "Systematically reduce operational and capital expenditure."   
  },
  { 
    icon: () => (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9" />
      </svg>
    ),
    tag: "Network",  
    title: "Network Transformation",           
    short: "Modernise your core network infrastructure end-to-end."       
  },
  { 
    icon: () => (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    tag: "SAP",      
    title: "SAP Advisory Services",            
    short: "End-to-end SAP implementation tailored for telecoms."         
  },
  { 
    icon: () => (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
      </svg>
    ),
    tag: "CX",       
    title: "Customer Experience",              
    short: "Transform customer interactions with AI-powered CX."          
  },
  { 
    icon: () => (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    tag: "OSS",      
    title: "Telco OSS Modernisation",          
    short: "Replace fragmented legacy systems with unified platforms."    
  },
];

const PARTNERS = [
  "Infinera Coriant", "Aspect", "NICE", "Sterlite Tech",
  "Cisco", "Ericsson", "Nokia", "Oracle", "IBM", "Huawei",
];

function useInView(ref, threshold = 0.1) {
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

export default function SolutionsSection() {
  const ref      = useRef(null);
  const inView   = useInView(ref);
  const navigate = useNavigate();
  const [paused, setPaused] = useState(false);

  // Triple the partners array for seamless continuous movement
  const allPartners = [...PARTNERS, ...PARTNERS, ...PARTNERS];

  return (
    <section id="solutions" ref={ref}
      className="py-28 overflow-hidden transition-colors duration-300"
      style={{ background: "#F8FAFC" }}>
      <style>{`.dark #solutions { background: #0b1826; }`}</style>

      <div className="max-w-7xl mx-auto px-6">

        {/* header */}
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: BLUE }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: BLUE }}>What We Do</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <h2 className="font-display font-black text-[#0A1628] dark:text-white"
              style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", letterSpacing: "-0.03em" }}>
              Our <span style={{ color: BLUE }}>Solutions</span>
            </h2>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/solutions")}
                className="px-5 py-2.5 rounded-lg text-sm font-bold text-white transition-all duration-200 hover:scale-105"
                style={{ background: BLUE, boxShadow: "0 4px 14px rgba(0,87,184,0.3)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#004a9e"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = BLUE; }}>
                View All Solutions →
              </button>
            </div>
          </div>
        </div>

        {/* 7 cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              onClick={() => navigate("/solutions")}
              className="rounded-2xl p-6 border bg-white dark:bg-[#0d1f35] cursor-pointer transition-all duration-250"
              style={{
                borderColor: "rgba(10,22,40,0.08)",
                opacity:     inView ? 1 : 0,
                transform:   inView ? "translateY(0)" : "translateY(28px)",
                transition:  `opacity 0.55s ease ${0.06 + i * 0.06}s, transform 0.55s ease ${0.06 + i * 0.06}s, box-shadow 0.25s, border-color 0.25s`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,87,184,0.1)"; e.currentTarget.style.borderColor = "rgba(0,87,184,0.2)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "rgba(10,22,40,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: "#f0f6ff", color: BLUE }}>
                  {s.icon()}
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(0,87,184,0.07)", color: BLUE }}>
                  {s.tag}
                </span>
              </div>
              <h3 className="font-display font-black text-[15px] mb-2 text-[#0A1628] dark:text-white">{s.title}</h3>
              <p className="text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">{s.short}</p>
              <div className="mt-4 text-[12px] font-bold flex items-center gap-1" style={{ color: BLUE }}>
                Learn more →
              </div>
            </div>
          ))}
        </div>

        {/* partner marquee - continuous moving */}
        <div className="mt-20 overflow-hidden"
          style={{ opacity: inView ? 1 : 0, transition: "opacity 0.7s ease 0.4s" }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1" style={{ background: "rgba(10,22,40,0.08)" }} />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 whitespace-nowrap">
              Skills &amp; Capabilities Targeted At
            </p>
            <div className="h-px flex-1" style={{ background: "rgba(10,22,40,0.08)" }} />
          </div>

          <div
            className="overflow-hidden"
            style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              className="flex gap-5"
              style={{
                width: "max-content",
                animation: "marquee 20s linear infinite",
                animationPlayState: paused ? "paused" : "running",
              }}
            >
              {allPartners.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center px-6 py-3 rounded-xl text-[13px] font-bold whitespace-nowrap border cursor-default transition-all duration-250 flex-shrink-0"
                  style={{ background: "#ffffff", borderColor: "rgba(10,22,40,0.08)", color: "#94a3b8", minWidth: "150px" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = BLUE; e.currentTarget.style.borderColor = "rgba(0,87,184,0.25)"; e.currentTarget.style.background = "#f0f6ff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.borderColor = "rgba(10,22,40,0.08)"; e.currentTarget.style.background = "#ffffff"; }}
                >
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Add keyframe animation if not in global CSS */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
      `}</style>
    </section>
  );
}