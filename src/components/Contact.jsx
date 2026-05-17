import { useState, useEffect, useRef } from "react";

function useInView(ref, threshold = 0.1) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

const INFO = [
  { 
    icon: () => (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Office",  
    value: "446 Hougang Avenue 8, #08-1633", 
    sub: "Singapore 530446" 
  },
  { 
    icon: () => (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",   
    value: "support@crystalts.com",          
    link: "mailto:support@crystalts.com" 
  },
  { 
    icon: () => (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9" />
      </svg>
    ),
    label: "Website", 
    value: "www.crystalts.com",              
    link: "https://www.crystalts.com" 
  },
];

const TOPICS = ["General Inquiry", "Predictive Maintenance", "Energy Optimisation", "Cost Optimisation", "SAP Advisory", "Network Transformation", "Other"];

export default function Contact() {
  const ref    = useRef(null);
  const inView = useInView(ref);
  const [form,    setForm]    = useState({ name: "", email: "", company: "", topic: "", message: "" });
  const [sent,    setSent]    = useState(false);
  const [sending, setSending] = useState(false);

  const blue = "#0057B8";
  const navy = "#0A1628";

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1400);
  };

  const anim = (delay = 0) => ({
    opacity:    inView ? 1 : 0,
    transform:  inView ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  const baseInput = {
    width: "100%", padding: "11px 14px", borderRadius: "10px",
    border: "1px solid rgba(10,22,40,0.12)", background: "#ffffff",
    color: navy, fontSize: "14px", outline: "none",
    fontFamily: "Manrope, sans-serif", transition: "border-color 0.2s, box-shadow 0.2s",
  };

  return (
    <section id="contact" ref={ref}
      className="py-28 bg-white dark:bg-[#07111f] transition-colors duration-300 overflow-hidden">

      <style>{`
        .ci:focus { border-color: #0057B8 !important; box-shadow: 0 0 0 3px rgba(0,87,184,0.1) !important; }
        .dark .ci { background: #0d1f35 !important; border-color: rgba(255,255,255,0.08) !important; color: #e2e8f0 !important; }
        .dark .ci::placeholder { color: #475569; }
        .ci::placeholder { color: #94a3b8; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div style={anim(0)}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-[48px]" style={{ background: blue }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: blue }}>Contact</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <h2 className="font-display font-black text-[#0A1628] dark:text-white"
              style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", letterSpacing: "-0.03em" }}>
              Let's <span style={{ color: blue }}>Work Together</span>
            </h2>
            <p className="text-[14px] text-slate-500 dark:text-slate-400 max-w-xs">
              Reach out and we'll respond within one business day.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">

          {/* Left info */}
          <div className="lg:col-span-2 flex flex-col gap-4" style={anim(0.1)}>
            {INFO.map((item) => (
              <div key={item.label}
                className="flex items-start gap-4 p-5 rounded-2xl border bg-white dark:bg-[#0d1f35] transition-all duration-250"
                style={{ borderColor: "rgba(10,22,40,0.08)" }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,87,184,0.09)"; e.currentTarget.style.borderColor = "rgba(0,87,184,0.18)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "rgba(10,22,40,0.08)"; }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "#f0f6ff", color: blue }}>
                  {item.icon()}
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: blue }}>{item.label}</div>
                  {item.link
                    ? <a href={item.link} className="text-[14px] font-semibold hover:underline"
                        style={{ color: navy }} target={item.link.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                        <span className="dark:text-white">{item.value}</span>
                      </a>
                    : <div className="text-[14px] font-semibold text-[#0A1628] dark:text-white">{item.value}</div>
                  }
                  {item.sub && <div className="text-[12px] text-slate-400 mt-0.5">{item.sub}</div>}
                </div>
              </div>
            ))}

            {/* Map card */}
            <a href="https://maps.google.com/?q=446+Hougang+Avenue+8+Singapore"
              target="_blank" rel="noreferrer"
              className="rounded-2xl overflow-hidden border block transition-all duration-250 hover:scale-[1.02]"
              style={{ borderColor: "rgba(10,22,40,0.08)" }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,87,184,0.12)"; e.currentTarget.style.borderColor = "rgba(0,87,184,0.2)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "rgba(10,22,40,0.08)"; }}>
              <div className="h-32 flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #0A1628 0%, #0d1f3c 50%, #0057B8 100%)" }}>
                <div className="text-center">
                  <div className="flex justify-center mb-1" style={{ color: "#ffffff" }}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="text-white text-[13px] font-bold">View on Google Maps</div>
                  <div className="text-blue-300 text-[11px] mt-0.5 opacity-70">Singapore Office</div>
                </div>
              </div>
            </a>

            {/* Social links */}
            <div className="flex items-center gap-3 pt-2">
              {["LinkedIn", "Twitter", "Email"].map((s) => (
                <a key={s} href="#"
                  className="flex-1 text-center py-2.5 rounded-xl border text-[12px] font-bold transition-all duration-200"
                  style={{ borderColor: "rgba(10,22,40,0.1)", color: "#64748b" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(0,87,184,0.25)"; e.currentTarget.style.color = blue; e.currentTarget.style.background = "#f0f6ff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(10,22,40,0.1)"; e.currentTarget.style.color = "#64748b"; e.currentTarget.style.background = "transparent"; }}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-3" style={anim(0.2)}>
            <div className="rounded-2xl border p-8 bg-white dark:bg-[#0d1f35]"
              style={{ borderColor: "rgba(10,22,40,0.08)" }}>

              {sent ? (
                <div className="flex flex-col items-center justify-center py-14 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                    style={{ background: "#f0f6ff", border: "1px solid rgba(0,87,184,0.15)", color: blue }}>
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-display font-black text-xl text-[#0A1628] dark:text-white mb-2">Message Sent!</h3>
                  <p className="text-[14px] text-slate-500 max-w-xs">
                    Thank you for reaching out. Our team will respond within one business day.
                  </p>
                  <button onClick={() => { setSent(false); setForm({ name: "", email: "", company: "", topic: "", message: "" }); }}
                    className="mt-6 px-6 py-2.5 rounded-lg text-sm font-bold text-white"
                    style={{ background: blue }}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-widest mb-1.5 text-slate-500">Full Name *</label>
                      <input name="name" required value={form.name} onChange={handleChange}
                        placeholder="John Smith" className="ci" style={baseInput} />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-widest mb-1.5 text-slate-500">Email *</label>
                      <input name="email" type="email" required value={form.email} onChange={handleChange}
                        placeholder="john@company.com" className="ci" style={baseInput} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-widest mb-1.5 text-slate-500">Company</label>
                      <input name="company" value={form.company} onChange={handleChange}
                        placeholder="Your company" className="ci" style={baseInput} />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-widest mb-1.5 text-slate-500">Topic</label>
                      <select name="topic" value={form.topic} onChange={handleChange} className="ci"
                        style={{ ...baseInput, appearance: "none" }}>
                        <option value="">Select a topic</option>
                        {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-[11px] font-bold uppercase tracking-widest mb-1.5 text-slate-500">Message *</label>
                    <textarea name="message" required rows={5} value={form.message} onChange={handleChange}
                      placeholder="Tell us about your project or challenge..."
                      className="ci" style={{ ...baseInput, resize: "vertical", minHeight: "120px" }} />
                  </div>
                  <button type="submit" disabled={sending}
                    className="w-full py-3.5 rounded-lg font-bold text-[14px] text-white transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
                    style={{ background: blue, boxShadow: "0 4px 16px rgba(0,87,184,0.3)" }}
                    onMouseEnter={(e) => { if (!sending) { e.currentTarget.style.background = "#004a9e"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,87,184,0.45)"; }}}
                    onMouseLeave={(e) => { e.currentTarget.style.background = blue; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,87,184,0.3)"; }}>
                    {sending ? "Sending..." : "Send Message →"}
                  </button>
                  <p className="text-center text-[12px] text-slate-400 mt-4">
                    We typically respond within one business day.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(10,22,40,0.08)", ...anim(0.35) }}>
          <p className="text-[12px] text-slate-400">
            © Crystal Technology Services 2026 · All Rights Reserved
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: blue }} />
            <span className="text-[12px] font-semibold" style={{ color: blue }}>Singapore</span>
            <span className="text-[12px] text-slate-400 ml-2">support@crystalts.com</span>
          </div>
        </div>

      </div>
    </section>
  );
}