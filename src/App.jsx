import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import SolutionsSection from "./components/SolutionsSection";
import Contact from "./components/Contact";
import About from "./components/About";
import Solutions from "./components/Solutions";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <SolutionsSection />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-[#07111f] transition-colors duration-300">
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/"          element={<HomePage />} />
          <Route path="/about"     element={<About />} />
          <Route path="/solutions" element={<Solutions />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}