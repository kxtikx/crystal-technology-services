import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoImage from "../assets/logo-removebg-preview.png";

const NAV_LINKS = ["Home", "About", "Contact"];

const SOLUTIONS = [
  {
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
    title: "Predictive Maintenance",
    desc: "AI-driven network failure prevention",
    tag: "AI & ML",
  },
  {
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
    title: "Telco Energy Optimization",
    desc: "Reduce energy costs with smart analytics",
    tag: "Energy",
  },
  {
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
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Cost Optimization",
    desc: "Opex & Capex efficiency solutions",
    tag: "Finance",
  },
  {
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
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9"
        />
      </svg>
    ),
    title: "Network Transformation",
    desc: "Transport & network infrastructure upgrades",
    tag: "Network",
  },
  {
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
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    title: "SAP Advisory Services",
    desc: "End-to-end SAP implementation for telcos",
    tag: "SAP",
  },
  {
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
          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
        />
      </svg>
    ),
    title: "Customer Experience",
    desc: "Contact center & AI-powered CX solutions",
    tag: "CX",
  },
  {
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
          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Telco OSS",
    desc: "Operations support system modernization",
    tag: "OSS",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const megaRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const h = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target))
        setMegaOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const ids = ["home", "about", "solutions", "contact"];

    // Only run intersection observer on home page where elements exist
    if (location.pathname === "/") {
      const obs = ids.map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        const o = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting)
              setActiveSection(id.charAt(0).toUpperCase() + id.slice(1));
          },
          { threshold: 0.3 },
        );
        o.observe(el);
        return o;
      });
      return () => obs.forEach((o) => o?.disconnect());
    } else {
      // Use setTimeout to avoid the ESLint warning
      const timer = setTimeout(() => {
        const path = location.pathname.substring(1);
        if (path === "about") {
          setActiveSection("About");
        } else if (path === "solutions") {
          setActiveSection("Solutions");
        } else if (path === "contact") {
          setActiveSection("Contact");
        } else {
          setActiveSection("Home");
        }
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);


  const scrollTo = (id) => {
    const key = id.toLowerCase();
    if (key === "about") {
      navigate("/about");
      setMobileOpen(false);
      setMegaOpen(false);
      return;
    }
    if (key === "solutions") {
      navigate("/solutions");
      setMobileOpen(false);
      setMegaOpen(false);
      return;
    }
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(key)?.scrollIntoView({ behavior: "smooth" });
      }, 120);
    } else {
      document.getElementById(key)?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
    setMegaOpen(false);
  };

  /* ── colour tokens ── */
  const navy = "#0A1628";
  const blue = "#0057B8";

  // Transparent navbar when not scrolled
  const navBg = scrolled ? "rgba(255,255,255,0.97)" : "transparent";
  const navBorder = scrolled ? "1px solid rgba(10,22,40,0.08)" : "none";
  const navShadow = scrolled ? "0 2px 20px rgba(10,22,40,0.08)" : "none";
  const linkColor = scrolled ? navy : "#ffffff";

  return (
    <>
      {/* Scroll progress */}
      <ScrollProgress blue={blue} />

      <header
        className="fixed left-0 right-0 z-50 transition-all duration-300"
        style={{
          top: scrolled ? "0" : "0",
          background: navBg,
          borderBottom: navBorder,
          boxShadow: navShadow,
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          padding: scrolled ? "0" : "0",
        }}
      >
        <div className="max-w-7xl mx-auto px-2 flex items-center justify-between h-[72px] md:h-[84px] lg:h-[88px]">
          {/* Logo - Image */}
          <div className="-ml-4 md:-ml-20">
            <button
              onClick={() => scrollTo("home")}
              className="flex items-center group pt-2"
            >
              <img
                src={logoImage}
                alt="Crystal Technology Services"
                className="h-20 w-auto transition-all duration-300"
                style={{
                  opacity: 1,
                  filter: !scrolled
                    ? "drop-shadow(0 0 0.5px #fff) drop-shadow(0 0 0.5px #fff)"
                    : "none",
                  transition: "filter 0.3s ease",
                }}
              />
            </button>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link}
                label={link}
                active={activeSection === link}
                color={linkColor}
                blue={blue}
                onClick={() => scrollTo(link)}
              />
            ))}

            {/* Solutions mega */}
            <div ref={megaRef} className="relative">
              <button
                onClick={() => setMegaOpen((p) => !p)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                style={{
                  color: activeSection === "Solutions" ? blue : linkColor,
                  background:
                    activeSection === "Solutions"
                      ? "rgba(0,87,184,0.08)"
                      : "transparent",
                  borderBottom:
                    activeSection === "Solutions"
                      ? `2px solid ${blue}`
                      : "2px solid transparent",
                }}
              >
                Solutions
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}
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
              </button>

              {megaOpen && (
                <div
                  className="absolute right-0 top-full mt-2 rounded-2xl p-5 grid grid-cols-2 gap-1 animate-fadeIn"
                  style={{
                    width: "500px",
                    background: "#ffffff",
                    border: "1px solid rgba(10,22,40,0.1)",
                    boxShadow: "0 20px 60px rgba(10,22,40,0.12)",
                  }}
                >
                  <div
                    className="col-span-2 mb-2 pb-2"
                    style={{ borderBottom: "1px solid #f1f5f9" }}
                  >
                    <p
                      className="text-[11px] font-bold uppercase tracking-widest"
                      style={{ color: "#94a3b8" }}
                    >
                      Our Solutions
                    </p>
                  </div>
                  {SOLUTIONS.map((s) => (
                    <button
                      key={s.title}
                      onClick={() => {
                        scrollTo("solutions");
                        setMegaOpen(false);
                      }}
                      className="flex items-start gap-3 p-3 rounded-xl text-left transition-all duration-150 group"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#f0f7ff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <div
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: blue }}
                      >
                        {s.icon()}
                      </div>
                      <div className="min-w-0">
                        <div
                          className="text-[13px] font-bold transition-colors"
                          style={{ color: navy }}
                        >
                          {s.title}
                        </div>
                        <div
                          className="text-[11px] mt-0.5 leading-snug"
                          style={{ color: "#64748b" }}
                        >
                          {s.desc}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div
              className="flex items-center gap-2 ml-4 pl-4"
              style={{
                borderLeft: scrolled
                  ? "1px solid rgba(10,22,40,0.1)"
                  : "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <button
                onClick={() => scrollTo("contact")}
                className="px-5 py-2 rounded-lg text-sm font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: blue,
                  boxShadow: `0 4px 14px rgba(0,87,184,0.35)`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#004a9e";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = blue;
                }}
              >
                Get Started
              </button>
            </div>
          </nav>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileOpen((p) => !p)}
              aria-label="Toggle menu"
              className="p-2 rounded-lg"
              style={{ color: linkColor }}
            >
              {mobileOpen ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div
            className="relative ml-auto w-72 h-full flex flex-col p-6 animate-slideIn"
            style={{
              background: "#ffffff",
              boxShadow: "-4px 0 40px rgba(0,0,0,0.15)",
            }}
          >
            <div className="flex items-center gap-3 mb-8">
              <img
                src={logoImage}
                alt="Crystal Technology Services"
                className="h-10 w-auto"
              />
            </div>
            <nav className="flex flex-col gap-1">
              {[...NAV_LINKS, "Solutions"].map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link)}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{
                    background:
                      activeSection === link
                        ? `rgba(0,87,184,0.1)`
                        : "transparent",
                    color: activeSection === link ? blue : navy,
                    borderLeft:
                      activeSection === link
                        ? `3px solid ${blue}`
                        : "3px solid transparent",
                  }}
                >
                  {link}
                </button>
              ))}
            </nav>
            <div className="mt-auto">
              <button
                onClick={() => scrollTo("contact")}
                className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all"
                style={{
                  background: blue,
                  boxShadow: `0 4px 14px rgba(0,87,184,0.3)`,
                }}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function NavLink({ label, active, color, blue, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
      style={{
        color: active ? blue : color,
        background: "transparent",
        borderBottom: active ? `2px solid ${blue}` : "2px solid transparent",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = blue;
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.color = color;
      }}
    >
      {label}
    </button>
  );
}

function ScrollProgress({ blue }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      setP((scrollTop / (scrollHeight - clientHeight)) * 100);
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60]"
      style={{ height: "3px", background: "transparent" }}
    >
      <div
        className="h-full transition-all duration-75"
        style={{ width: `${p}%`, background: blue }}
      />
    </div>
  );
}
