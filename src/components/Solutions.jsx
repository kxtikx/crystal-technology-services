import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Import your images
import predictiveImage from "../assets/predictive maintainence.png";
import energyImage from "../assets/telco energy optimisation.png";
import costImage from "../assets/cost optimisation.png";
import networkImage from "../assets/network transformation.png";
import sapImage from "../assets/SAP.png";
import cxImage from "../assets/customer experience.png";
import ossImage from "../assets/telco modernisation.png";

/* ── constants ── */
const BLUE = "#0057B8";
const NAVY = "#0A1628";

const SERVICES = [
  {
    image: predictiveImage,
    tag: "AI & ML",
    title: "Predictive Maintenance",
    short:
      "Prevent network failures before they happen using AI and real-time data.",
    detail:
      "Our predictive maintenance solutions leverage real-time data, historical patterns, and machine learning algorithms to forecast network failures before they occur. By analysing vast streams of operational data, we identify anomalies and degradation signals early — minimising downtime, reducing emergency repair costs, and delivering exceptional service reliability across your entire network.",
    benefit: "Up to 40% reduction in unplanned downtime",
  },
  {
    image: energyImage,
    tag: "Energy",
    title: "Telco Energy Optimisation",
    short:
      "Cut energy costs across your entire network with intelligent analytics.",
    detail:
      "We analyse your network's energy consumption patterns across all sites and deploy AI-driven controls to dynamically reduce power usage. From smart cooling management to load-aware equipment scheduling, our solutions help operators meet sustainability targets while delivering significant operational savings — typically 15–30% reductions in energy spend.",
    benefit: "15–30% reduction in energy spend",
  },
  {
    image: costImage,
    tag: "Finance",
    title: "Cost Optimisation (Opex & Capex)",
    short: "Systematically reduce operational and capital expenditure.",
    detail:
      "From vendor contract renegotiation to infrastructure consolidation and procurement optimisation, we identify and eliminate cost inefficiencies across your entire telecom operation. Our data-driven approach ensures every cost reduction is sustainable and doesn't compromise network performance, customer experience, or future growth potential.",
    benefit: "Measurable Opex & Capex savings",
  },
  {
    image: networkImage,
    tag: "Network",
    title: "Transport & Network Transformation",
    short: "Modernise your core network infrastructure end-to-end.",
    detail:
      "We design and implement next-generation transport and network architectures — migrating legacy systems to scalable, cloud-ready platforms built for 5G, IoT, and edge computing. Our transformation methodology minimises service disruption during migration while accelerating your path to a future-proof, software-defined network.",
    benefit: "Future-ready 5G & cloud architecture",
  },
  {
    image: sapImage,
    tag: "SAP",
    title: "SAP Advisory Services",
    short: "End-to-end SAP implementation tailored for telecoms.",
    detail:
      "From SAP S/4HANA migrations to custom BSS/OSS integrations, our certified SAP advisors deliver seamless implementation with minimal business disruption. We combine deep telecom domain expertise with SAP technical proficiency to ensure your systems are configured for maximum efficiency, compliance, and ROI from day one.",
    benefit: "Certified SAP telecom specialists",
  },
  {
    image: cxImage,
    tag: "CX",
    title: "Customer Experience & Contact Centre",
    short: "Transform customer interactions with AI-powered CX solutions.",
    detail:
      "We modernise contact centre operations with conversational AI, intelligent routing, sentiment analysis, and real-time agent assist tools. By automating routine interactions and empowering agents with contextual intelligence, we help operators reduce handle time, improve first-call resolution, and turn every customer interaction into a loyalty-building moment.",
    benefit: "Higher CSAT & reduced churn",
  },
  {
    image: ossImage,
    tag: "OSS",
    title: "Telco OSS Modernisation",
    short: "Replace fragmented legacy systems with unified OSS platforms.",
    detail:
      "Our OSS modernisation services consolidate network inventory, fault management, configuration management, and service assurance into unified, automated platforms. We replace fragmented point solutions with integrated architectures that provide real-time network visibility, faster fault resolution, and the operational agility needed to support rapid service launches.",
    benefit: "Faster fault resolution & service launch",
  },
];

const PARTNERS = [
  "Infinera Coriant",
  "Aspect",
  "NICE",
  "Sterlite Tech",
  "Cisco",
  "Ericsson",
  "Nokia",
  "Oracle",
  "IBM",
  "Huawei",
];

/* ── shared hook ── */
function useInView(ref, threshold = 0.1) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
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

/* ════════════════════════════════════════════════════════ */
export default function Solutions() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-white transition-colors duration-300">
      <HeroSection visible={visible} />
      <IntroStrip />
      <ServicesGrid />
      <PartnersSection />
      <CTASection />
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   1. HERO BANNER
════════════════════════════════════════════════════════ */
function HeroSection({ visible }) {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center overflow-hidden"
      style={{
        minHeight: "400px",
        background: `linear-gradient(160deg, #060d18 0%, ${NAVY} 45%, #0d1f3c 80%, #0e2548 100%)`,
      }}
    >
      {/* grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div
        className="relative z-10 max-w-4xl mx-auto px-6 py-24"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        {/* badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-6"
          style={{
            background: "rgba(0,87,184,0.2)",
            border: "1px solid rgba(0,163,224,0.22)",
            color: "#93c5fd",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse_dot"
            style={{ background: "#00A3E0" }}
          />
          AI-Powered Telecom Solutions
        </div>

        <h1
          className="font-display font-black text-white mb-4"
          style={{
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          Transforming Telecom
          <br />
          <span style={{ color: "#00A3E0" }}>One Solution at a Time</span>
        </h1>

        <p
          className="max-w-2xl mx-auto text-[15px] leading-relaxed mb-10"
          style={{ color: "rgba(191,219,254,0.65)" }}
        >
          Data-driven insights and AI-powered tools designed to optimise every
          layer of your telecommunications operation — from the network core to
          the customer experience.
        </p>

        {/* quick stat pills - using SVG icons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            { label: "7 Core Solutions" },
            { label: "AI-Powered" },
            { label: "Global Reach" },
          ].map((p) => (
            <div
              key={p.label}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#bfdbfe",
              }}
            >
              {p.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   2. INTRO STRIP
════════════════════════════════════════════════════════ */
function IntroStrip() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const navigate = useNavigate();

  return (
    <section
      ref={ref}
      className="py-20 bg-white transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="max-w-2xl">
            <SectionLabel text="What We Do" />
            <h2
              className="font-display font-black text-[#0A1628] mb-4"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Data-Driven Insights &<br />
              <span style={{ color: BLUE }}>Revenue Growth for Telecoms</span>
            </h2>
            <p className="text-[15px] leading-relaxed text-slate-600">
              By harnessing the vast amounts of data generated within your
              network, we transform raw information into actionable insights —
              empowering you to make data-driven decisions, optimise revenue
              streams, and create a sustainable competitive advantage.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-6 py-3 rounded-lg text-sm font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: BLUE,
                boxShadow: "0 4px 16px rgba(0,87,184,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#004a9e";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = BLUE;
              }}
            >
              Talk to an Expert →
            </button>
            <button
              onClick={() => navigate("/about")}
              className="px-6 py-3 rounded-lg text-sm font-bold transition-all duration-200 hover:scale-105"
              style={{
                border: "1px solid rgba(0,87,184,0.25)",
                color: BLUE,
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f0f6ff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              About Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   3. SERVICES GRID 
════════════════════════════════════════════════════════ */
function ServicesGrid() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [active, setActive] = useState(null);

  return (
    <section ref={ref} className="pb-24" style={{ background: "#F8FAFC" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s, i) => {
            const on = active === i;
            return (
              <div
                key={s.title}
                onClick={() => setActive(on ? null : i)}
                className="rounded-2xl p-6 border cursor-pointer select-none bg-white transition-all duration-250"
                style={{
                  borderColor: on
                    ? "rgba(0,87,184,0.3)"
                    : "rgba(10,22,40,0.08)",
                  boxShadow: on ? `0 12px 40px rgba(0,87,184,0.15)` : "none",
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(28px)",
                  transition: `opacity 0.55s ease ${0.06 + i * 0.06}s, transform 0.55s ease ${0.06 + i * 0.06}s, box-shadow 0.25s, border-color 0.25s`,
                }}
                onMouseEnter={(e) => {
                  if (!on) {
                    e.currentTarget.style.boxShadow =
                      "0 6px 24px rgba(0,87,184,0.1)";
                    e.currentTarget.style.borderColor = "rgba(0,87,184,0.2)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!on) {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = "rgba(10,22,40,0.08)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }
                }}
              >
                {/* Image icon instead of emoji */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-30 h-30 rounded-xl flex items-center justify-center overflow-hidden bg-white"
                    style={{ border: "1px solid rgba(0,87,184,0.15)" }}
                  >
                    <img
                      src={s.image}
                      alt={s.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span
                    className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                    style={{
                      background: "rgba(0,87,184,0.07)",
                      color: BLUE,
                    }}
                  >
                    {s.tag}
                  </span>
                </div>

                <h3 className="font-display font-black text-[15px] mb-2 text-[#0A1628]">
                  {s.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-slate-500">
                  {s.short}
                </p>

                {/* benefit pill */}
                {!on && (
                  <div
                    className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold"
                    style={{ background: "#f0f6ff", color: BLUE }}
                  >
                    <span
                      className="w-1 h-1 rounded-full"
                      style={{ background: BLUE }}
                    />
                    {s.benefit}
                  </div>
                )}

                {/* expanded detail - remains white */}
                <div
                  style={{
                    maxHeight: on ? "300px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.4s ease",
                  }}
                >
                  <div
                    className="mt-5 pt-4 text-[13px] leading-relaxed text-slate-600"
                    style={{ borderTop: "1px solid rgba(0,87,184,0.15)" }}
                  >
                    {s.detail}

                    {/* benefit pill in expanded */}
                    <div
                      className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold"
                      style={{
                        background: "#f0f6ff",
                        color: BLUE,
                        border: "1px solid rgba(0,87,184,0.15)",
                      }}
                    >
                      ✓ {s.benefit}
                    </div>

                    <ContactButton />
                  </div>
                </div>

                {/* expand hint */}
                <div
                  className="mt-4 flex items-center gap-1 text-[11px] font-semibold"
                  style={{ color: "#94a3b8" }}
                >
                  <svg
                    className="w-3.5 h-3.5 transition-transform duration-300"
                    style={{ transform: on ? "rotate(180deg)" : "rotate(0)" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  {on ? "Collapse" : "Learn more"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ContactButton() {
  return (
    <button
      className="mt-3 flex items-center gap-1.5 text-[12px] font-bold transition-colors"
      style={{ color: BLUE }}
      onClick={(e) => {
        e.stopPropagation();
        document
          .getElementById("contact")
          ?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      Get in touch →
    </button>
  );
}

/* ════════════════════════════════════════════════════════
   4. PARTNERS MARQUEE - Continuous moving
════════════════════════════════════════════════════════ */
function PartnersSection() {
  const ref    = useRef(null);
  const inView = useInView(ref);
  const [paused, setPaused] = useState(false);

  // Duplicate partners array 3 times for seamless loop
  const allPartners = [...PARTNERS, ...PARTNERS, ...PARTNERS];

  return (
    <section ref={ref} className="py-20 bg-white transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div style={{ opacity: inView ? 1 : 0, transition: "opacity 0.7s ease" }}>
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1" style={{ background: "rgba(10,22,40,0.08)" }} />
            <div>
              <SectionLabel text="Skills & Capabilities Targeted At" />
            </div>
            <div className="h-px flex-1" style={{ background: "rgba(10,22,40,0.08)" }} />
          </div>

          {/* Marquee container */}
          <div className="relative overflow-hidden">
            <div
              className="flex gap-5"
              style={{
                width: "max-content",
                animation: "marquee 20s linear infinite",
                animationPlayState: paused ? "paused" : "running",
              }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {allPartners.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center px-6 py-3.5 rounded-xl text-[13px] font-bold whitespace-nowrap border cursor-default transition-all duration-250 flex-shrink-0"
                  style={{
                    background: "#ffffff",
                    borderColor: "rgba(10,22,40,0.08)",
                    color: "#94a3b8",
                    minWidth: "160px",
                  }}
                  onMouseEnter={(e) => { 
                    e.currentTarget.style.color = BLUE; 
                    e.currentTarget.style.borderColor = "rgba(0,87,184,0.25)"; 
                    e.currentTarget.style.background = "#f0f6ff"; 
                  }}
                  onMouseLeave={(e) => { 
                    e.currentTarget.style.color = "#94a3b8"; 
                    e.currentTarget.style.borderColor = "rgba(10,22,40,0.08)"; 
                    e.currentTarget.style.background = "#ffffff"; 
                  }}
                >
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add keyframe animation if not already in your global CSS */}
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

/* ════════════════════════════════════════════════════════
   5. CTA STRIP
════════════════════════════════════════════════════════ */
function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const navigate = useNavigate();

  return (
    <section ref={ref} className="py-24" style={{ background: "#F8FAFC" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="rounded-2xl p-12 flex flex-col md:flex-row items-center justify-between gap-8"
          style={{
            background: "#f0f6ff",
            border: "1px solid rgba(0,87,184,0.12)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div>
            <p
              className="text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
              style={{ color: BLUE }}
            >
              Ready to get started?
            </p>
            <h3
              className="font-display font-black text-[#0A1628] mb-2"
              style={{
                fontSize: "clamp(1.4rem, 2.8vw, 2rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Ready to Transform Your
              <br />
              Telecom Operations?
            </h3>
            <p className="text-[14px] text-slate-500 max-w-lg">
              Whether you're looking to reduce costs, modernise your network, or
              leverage AI for predictive maintenance — our team is ready to help
              you get there.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <button
              onClick={() => {
                navigate("/");
                setTimeout(
                  () =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" }),
                  100,
                );
              }}
              className="px-7 py-3 rounded-lg text-sm font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
              style={{
                background: BLUE,
                boxShadow: "0 4px 16px rgba(0,87,184,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#004a9e";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = BLUE;
              }}
            >
              Talk to an Expert →
            </button>
            <button
              onClick={() => navigate("/about")}
              className="px-7 py-3 rounded-lg text-sm font-bold transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
              style={{
                border: `1px solid rgba(0,87,184,0.3)`,
                color: BLUE,
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0,87,184,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              About Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
