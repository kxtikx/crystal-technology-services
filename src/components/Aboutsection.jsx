import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import excellenceImg from "../assets/values/excellence.png";
import integrityImg from "../assets/values/integrity.png";
import innovationImg from "../assets/values/innovation.png";
import collaborationImg from "../assets/values/collaboration.png";

const BLUE = "#0057B8";

const VALUES = [
  {
    image: excellenceImg,
    icon: () => (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Excellence",
    desc: "Solutions that meet the highest standards and surpass client expectations.",
  },
  {
    image: integrityImg,
    icon: () => (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
        />
      </svg>
    ),
    title: "Integrity",
    desc: "Unwavering honesty, transparency, and ethical conduct at every level.",
  },
  {
    image: innovationImg,
    icon: () => (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    title: "Innovation",
    desc: "Continuously exploring new technologies to drive positive change.",
  },
  {
    image: collaborationImg,
    icon: () => (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    title: "Collaboration",
    desc: "Working closely with clients to deliver customised, impactful solutions.",
  },
];

function useInView(ref, threshold = 0.12) {
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

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const navigate = useNavigate();

  const anim = (delay = 0, dir = "up") => ({
    opacity: inView ? 1 : 0,
    transform: inView
      ? "translate(0,0)"
      : dir === "left"
        ? "translateX(-36px)"
        : dir === "right"
          ? "translateX(36px)"
          : "translateY(24px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <section
      id="about"
      ref={ref}
      className="py-28 bg-white dark:bg-[#07111f] overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* section label */}
        <div className="flex items-center gap-3 mb-4" style={anim(0)}>
          <div className="h-px w-12" style={{ background: BLUE }} />
          <span
            className="text-[11px] font-bold uppercase tracking-[0.2em]"
            style={{ color: BLUE }}
          >
            About Us
          </span>
        </div>

        {/* intro grid */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-20">
          <div style={anim(0.05, "left")}>
            <h2
              className="font-display font-black leading-tight mb-6 text-[#0A1628] dark:text-white"
              style={{
                fontSize: "clamp(2rem, 3.8vw, 3rem)",
                letterSpacing: "-0.03em",
              }}
            >
              A Leading Provider of
              <br />
              <span style={{ color: BLUE }}>Innovative Solutions</span>
            </h2>
            <p className="text-[15px] leading-relaxed mb-5 text-slate-600 dark:text-slate-300">
              With a deep understanding of the evolving telecommunications
              landscape, we specialise in delivering cutting-edge AI-driven
              services to optimise operational expenses, transform network
              infrastructure, implement SAP solutions, and leverage AI for
              predictive maintenance.
            </p>
            <p className="text-[15px] leading-relaxed mb-10 text-slate-500 dark:text-slate-400">
              Based in Singapore, Crystal Technology Services partners with
              global telecom operators to unlock efficiency, reduce costs, and
              build sustainable competitive advantages.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/about")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95"
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
                Learn More About Us →
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
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
                Contact Us
              </button>
            </div>
          </div>

          {/* stat cards */}
          <div className="grid grid-cols-2 gap-4" style={anim(0.15, "right")}>
            {[
              {
                v: "50+",
                label: "Global Clients",
                icon: () => (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                desc: "Operators worldwide",
              },
              {
                v: "12+",
                label: "Years Experience",
                icon: () => (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                ),
                desc: "In the industry",
              },
              {
                v: "99%",
                label: "Uptime Delivered",
                icon: () => (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                ),
                desc: "Across deployments",
              },
              {
                v: "7",
                label: "Core AI Solutions",
                icon: () => (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9h14M5 15h14M5 9h14M5 15h14M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z"
                    />
                  </svg>
                ),
                desc: "Purpose-built",
              },
            ].map((s, i) => (
              <div
                key={s.label}
                className="rounded-2xl p-6 border bg-white dark:bg-[#0d1f35] transition-all duration-250 cursor-default"
                style={{
                  borderColor: "rgba(10,22,40,0.08)",
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.6s ease ${0.2 + i * 0.09}s, transform 0.6s ease ${0.2 + i * 0.09}s, box-shadow 0.25s`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 8px 28px rgba(0,87,184,0.1)";
                  e.currentTarget.style.borderColor = "rgba(0,87,184,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "rgba(10,22,40,0.08)";
                }}
              >
                <div className="mb-3" style={{ color: BLUE }}>
                  {s.icon()}
                </div>
                <div
                  className="font-display font-black text-3xl mb-0.5"
                  style={{ color: BLUE }}
                >
                  {s.v}
                </div>
                <div className="text-[13px] font-bold text-slate-700 dark:text-slate-300">
                  {s.label}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* values */}
        <div style={anim(0.2)}>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-12" style={{ background: BLUE }} />
            <span
              className="text-[11px] font-bold uppercase tracking-[0.2em]"
              style={{ color: BLUE }}
            >
              Our Values
            </span>
          </div>
          <h3
            className="font-display font-black text-[#0A1628] dark:text-white mb-10"
            style={{
              fontSize: "clamp(1.5rem, 2.8vw, 2rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Guided by Purpose, Driven by Values
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                className="rounded-2xl p-6 border bg-white dark:bg-[#0d1f35] cursor-default overflow-hidden relative"
                style={{
                  borderColor: "rgba(10,22,40,0.08)",
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity 0.6s ease ${0.3 + i * 0.08}s, transform 0.6s ease ${0.3 + i * 0.08}s, box-shadow 0.25s, border-color 0.25s`,
                  minHeight: "280px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 8px 28px rgba(0,87,184,0.1)";
                  e.currentTarget.style.borderColor = "rgba(0,87,184,0.2)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "rgba(10,22,40,0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 opacity-10 dark:opacity-5"
                  style={{
                    backgroundImage: `url(${v.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "#f0f6ff", color: BLUE }}
                  >
                    {v.icon()}
                  </div>
                  <h4
                    className="font-display font-black text-[15px] mb-2"
                    style={{ color: BLUE }}
                  >
                    {v.title}
                  </h4>
                  <p className="text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
