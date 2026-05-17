/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans:    ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        display: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono:    ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      colors: {
        brand: {
          navy:    "#0A1628",
          blue:    "#0057B8",
          light:   "#3B82F6",
          accent:  "#00A3E0",
          surface: "#F0F4F8",
        },
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideLeft: {
          "0%":   { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideRight: {
          "0%":   { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideIn: {
          "0%":   { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulse_dot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%":      { opacity: "0.3", transform: "scale(0.8)" },
        },
        scrollBounce: {
          "0%, 100%": { transform: "translateY(0)",   opacity: "1" },
          "50%":      { transform: "translateY(8px)", opacity: "0.4" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0" },
        },
      },
      animation: {
        fadeUp:       "fadeUp 0.6s ease forwards",
        fadeIn:       "fadeIn 0.2s ease-out forwards",
        slideLeft:    "slideLeft 0.7s ease forwards",
        slideRight:   "slideRight 0.7s ease forwards",
        slideIn:      "slideIn 0.32s cubic-bezier(0.32,0.72,0,1) forwards",
        marquee:      "marquee 28s linear infinite",
        pulse_dot:    "pulse_dot 2s ease-in-out infinite",
        scrollBounce: "scrollBounce 1.8s ease-in-out infinite",
        blink:        "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};