"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sun, 
  Moon, 
  Sparkles, 
  ArrowUpRight, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Mail, 
  ExternalLink, 
  Code2, 
  Palette, 
  Clock, 
  Music, 
  Copy, 
  Check, 
  Send, 
  ChevronRight,
  Monitor,
  Heart,
  Volume2
} from "lucide-react";

// --- CUSTOM HOOKS ---
// A hook to handle cursor-tracking flashlight glow on Bento cards
function useMouseGlow() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty("--mouse-x", `${x}px`);
    containerRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (el) {
        el.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return containerRef;
}

export default function Portfolio() {
  // --- STATES ---
  const [theme, setTheme] = useState<"a" | "b">("a");
  const [copied, setCopied] = useState(false);
  const [timeString, setTimeString] = useState("12:00:00 PM");
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState<"exp" | "edu">("exp");
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<"design" | "tech" | "all">("all");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "success">("idle");

  // Mouse tracking references for specific cards
  const heroGlow = useMouseGlow();
  const avatarGlow = useMouseGlow();
  const clockGlow = useMouseGlow();
  const musicGlow = useMouseGlow();
  const timelineGlow = useMouseGlow();
  const skillsGlow = useMouseGlow();
  const project1Glow = useMouseGlow();
  const project2Glow = useMouseGlow();
  const contactGlow = useMouseGlow();
  const socialsGlow = useMouseGlow();

  // --- INITIALIZATION ---
  useEffect(() => {
    // Check if theme preference is cached in client local storage
    const savedTheme = localStorage.getItem("portfolio-theme") as "a" | "b" | null;
    if (savedTheme === "a" || savedTheme === "b") {
      setTheme(savedTheme);
    }
  }, []);

  // Update localStorage and HTML element class when theme changes
  const toggleTheme = () => {
    const newTheme = theme === "a" ? "b" : "a";
    setTheme(newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
  };

  // Live clock logic: Local time in Paris, France (GMT+2 or GMT+1 depending on DST)
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Europe/Paris",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      const formatter = new Intl.DateTimeFormat([], options);
      setTimeString(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Copy Email to Clipboard
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@leamartin.design");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Contact Form Submission (Mock)
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail || !contactMessage) return;
    setContactStatus("sending");
    setTimeout(() => {
      setContactStatus("success");
      setContactName("");
      setContactEmail("");
      setContactMessage("");
      setTimeout(() => setContactStatus("idle"), 4000);
    }, 1500);
  };

  // --- EXPERIENCE & EDUCATION DATA ---
  const experienceData = [
    {
      period: "2024 - Present",
      role: "Lead Product Designer",
      company: "Villo Studio (Paris)",
      desc: "Architecting core design systems and design-to-code pipelines using Next.js and Tailwind."
    },
    {
      period: "2022 - 2024",
      role: "UX Architect & Developer",
      company: "Helix Labs",
      desc: "Designed and engineered interactive dashboard structures and spatial UX concepts."
    },
    {
      period: "2020 - 2022",
      role: "UI/UX Designer",
      company: "Nova Agency",
      desc: "Delivered minimalist corporate brand portals and high-fidelity product prototypes."
    }
  ];

  const educationData = [
    {
      period: "2018 - 2020",
      role: "Master of Digital Design & Interaction",
      company: "Gobelins, l'école de l'image",
      desc: "Specialized in advanced prototyping, motion design, and user interface architectures."
    },
    {
      period: "2015 - 2018",
      role: "Bachelor of Arts in Graphic Design",
      company: "Sorbonne Université",
      desc: "Grounded in classic typography, grid theory, modernist aesthetics, and human-computer interaction."
    }
  ];

  const activeTimeline = activeTab === "exp" ? experienceData : educationData;

  // --- SKILLS DATA ---
  const skillsData = [
    { name: "Figma", level: 95, category: "design" },
    { name: "React / Next.js", level: 90, category: "tech" },
    { name: "Tailwind CSS", level: 95, category: "tech" },
    { name: "Framer Motion", level: 90, category: "tech" },
    { name: "Spline / 3D UI", level: 75, category: "design" },
    { name: "TypeScript", level: 80, category: "tech" },
    { name: "Typography & Layout", level: 95, category: "design" },
    { name: "Design Systems", level: 95, category: "design" }
  ];

  const filteredSkills = selectedSkillCategory === "all" 
    ? skillsData 
    : skillsData.filter(s => s.category === selectedSkillCategory);

  // --- ANIMATION VARIANTS ---
  const bentoContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15
      }
    }
  };

  const bentoItemVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.96 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 80, 
        damping: 15 
      }
    }
  };

  return (
    <div className={`theme-${theme} bg-background text-foreground transition-colors duration-500 w-full min-h-screen py-12 px-4 md:px-8 lg:px-12 flex flex-col items-center justify-start relative selection:bg-accent selection:text-background`}>
      {/* Background Ambience Lines/Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-accent blur-[120px] opacity-25 transition-all duration-700" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-accent blur-[150px] opacity-15 transition-all duration-700" />
      </div>

      <div className="w-full max-w-7xl z-10 flex flex-col gap-8">
        
        {/* HEADER BRANDING */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-between items-center px-2 py-4"
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs border border-accent/20 px-2.5 py-1 rounded-full bg-accent/5 tracking-wider font-semibold">
              VILLO SPEC v1.0
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-text-muted">
              LÉA MARTIN • PARIS, FR
            </span>
          </div>
        </motion.header>

        {/* BENTO GRID */}
        <motion.main 
          variants={bentoContainerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-auto lg:auto-rows-[190px]"
        >
          
          {/* 1. HERO & INTRO CARD */}
          <motion.div
            variants={bentoItemVariants}
            ref={heroGlow}
            whileHover={{ scale: 1.01 }}
            className="bento-glow-container lg:col-span-2 lg:row-span-2 rounded-3xl p-8 bg-card-bg border border-card-border hover:border-card-border-hover transition-colors duration-300 flex flex-col justify-between group overflow-hidden relative"
          >
            <div className="flex justify-between items-start z-10">
              <div className="flex items-center gap-2 bg-accent/10 px-3 py-1.5 rounded-full border border-accent/20 text-accent">
                <Sparkles size={14} className="animate-pulse" />
                <span className="text-[11px] font-semibold tracking-wider font-mono uppercase">Open for Commissions</span>
              </div>
              
              {/* THEME SWITCHER */}
              <button 
                onClick={toggleTheme}
                className="p-3 rounded-2xl bg-background border border-card-border hover:border-accent hover:text-accent transition-all duration-300 flex items-center gap-2 shadow-sm cursor-pointer group/btn"
                title="Toggle Theme Palette"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === "a" ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-1.5"
                    >
                      <Sun size={16} className="text-accent" />
                      <span className="text-xs font-mono font-medium hidden sm:inline">Noir & Rose</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-1.5"
                    >
                      <Moon size={16} className="text-accent" />
                      <span className="text-xs font-mono font-medium hidden sm:inline">Gris & Violet</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>

            <div className="mt-8 lg:mt-0 z-10">
              <span className="text-text-muted font-mono text-xs tracking-widest uppercase block mb-1">
                Creative Director
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                Léa Martin
              </h1>
              <p className="text-text-muted text-sm md:text-base leading-relaxed max-w-md">
                An expert Lead UI/UX Designer and Frontend Architect crafting pristine, high-fidelity interfaces at the intersection of geometric minimalism and advanced code.
              </p>
            </div>

            <div className="flex items-center gap-4 mt-6 lg:mt-0 z-10 border-t border-card-border pt-4">
              <div className="flex gap-1.5 items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
                <div className="w-2.5 h-2.5 rounded-full bg-accent absolute" />
              </div>
              <span className="text-xs font-mono text-text-muted font-medium">
                Designing immersive dashboards & web systems.
              </span>
            </div>
          </motion.div>

          {/* 2. DYNAMIC GEOMETRIC AVATAR CARD */}
          <motion.div
            variants={bentoItemVariants}
            ref={avatarGlow}
            whileHover={{ scale: 1.02 }}
            className="bento-glow-container lg:col-span-1 lg:row-span-2 rounded-3xl p-6 bg-card-bg border border-card-border hover:border-card-border-hover transition-colors duration-300 flex flex-col justify-between items-center group relative overflow-hidden"
          >
            {/* Ambient Accent Glow behind Avatar */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
              <div className="w-32 h-32 rounded-full bg-accent/25 filter blur-[30px] group-hover:bg-accent/40 transition-all duration-500 avatar-glow" />
            </div>

            <div className="w-full flex justify-between items-center z-10">
              <span className="font-mono text-[10px] text-text-muted tracking-widest uppercase">CREATIVE ID</span>
              <span className="font-mono text-[10px] text-accent font-semibold bg-accent/10 px-2 py-0.5 rounded-full">LM-07</span>
            </div>

            {/* Stunning Procedural SVG Abstract Sculpture (Avatar) */}
            <div className="w-44 h-44 my-4 flex items-center justify-center relative z-10">
              {/* Spinning outer rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-accent/20 flex items-center justify-center"
              >
                <div className="w-[150px] h-[150px] rounded-full border border-accent/10" />
              </motion.div>
              
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                className="absolute inset-2 rounded-full border-2 border-double border-accent/20"
              />

              {/* Main abstract design */}
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="relative drop-shadow-2xl">
                {/* Layer 1: Core Gradient Shape */}
                <defs>
                  <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="var(--background)" stopOpacity="0.4" />
                  </linearGradient>
                  <filter id="shadow">
                    <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="var(--accent)" floodOpacity="0.2" />
                  </filter>
                </defs>

                {/* Animated Rotating Triangle inside */}
                <motion.polygon
                  points="60,22 93,78 27,78"
                  fill="url(#avatarGradient)"
                  filter="url(#shadow)"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    y: [0, -3, 0]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 4, 
                    ease: "easeInOut" 
                  }}
                />
                
                {/* Overlaid minimal geometric elements */}
                <circle cx="60" cy="56" r="14" fill="var(--background)" className="opacity-95" />
                <circle cx="60" cy="56" r="6" fill="var(--accent)" />
                
                {/* Orbiting Satellite Dots */}
                <motion.circle 
                  cx="60" 
                  cy="56" 
                  r="35" 
                  stroke="var(--accent)" 
                  strokeWidth="1" 
                  strokeDasharray="4 8"
                />
              </svg>
            </div>

            <div className="w-full text-center z-10">
              <h3 className="text-sm font-bold tracking-tight">Leamoji-V4 PRO</h3>
              <p className="text-[11px] font-mono text-text-muted mt-1">
                Generative Aesthetic Identity
              </p>
            </div>
          </motion.div>

          {/* 3. LOCATION & LIVE TIME CARD */}
          <motion.div
            variants={bentoItemVariants}
            ref={clockGlow}
            whileHover={{ scale: 1.02 }}
            className="bento-glow-container lg:col-span-1 lg:row-span-1 rounded-3xl p-6 bg-card-bg border border-card-border hover:border-card-border-hover transition-colors duration-300 flex flex-col justify-between overflow-hidden relative"
          >
            <div className="flex justify-between items-center z-10">
              <div className="flex items-center gap-1.5 text-text-muted">
                <MapPin size={14} className="text-accent" />
                <span className="text-xs font-mono font-medium">Paris, FR</span>
              </div>
              <span className="font-mono text-[9px] border border-accent/20 px-2 py-0.5 rounded bg-accent/5 uppercase text-accent">
                GMT +2
              </span>
            </div>

            <div className="z-10 my-1">
              <h4 className="text-2xl font-extrabold font-mono tracking-tight text-accent tabular-nums">
                {timeString.split(" ")[0]}
                <span className="text-xs font-semibold text-text-muted ml-1 uppercase">
                  {timeString.split(" ")[1]}
                </span>
              </h4>
              <p className="text-[10px] font-mono text-text-muted mt-1 uppercase tracking-wider">
                Paris local time
              </p>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-text-muted border-t border-card-border/60 pt-2 z-10">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for remote contracts</span>
            </div>
          </motion.div>

          {/* 4. SPOTIFY NOW PLAYING CARD */}
          <motion.div
            variants={bentoItemVariants}
            ref={musicGlow}
            whileHover={{ scale: 1.02 }}
            className="bento-glow-container lg:col-span-1 lg:row-span-1 rounded-3xl p-6 bg-card-bg border border-card-border hover:border-card-border-hover transition-colors duration-300 flex flex-col justify-between overflow-hidden relative group"
          >
            <div className="flex justify-between items-center z-10">
              <div className="flex items-center gap-1.5 text-text-muted">
                <Music size={14} className="text-accent" />
                <span className="text-xs font-mono font-medium">Favorites</span>
              </div>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-accent bg-accent/10 hover:bg-accent/20 p-1.5 rounded-full transition-colors z-20 cursor-pointer"
                title={isPlaying ? "Pause visualizer" : "Play visualizer"}
              >
                <Volume2 size={12} />
              </button>
            </div>

            <div className="flex gap-4 items-center z-10 my-1">
              {/* Rotating Vinyl Record illustration */}
              <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-700/50 flex items-center justify-center relative flex-shrink-0">
                <motion.div
                  animate={isPlaying ? { rotate: 360 } : {}}
                  transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                  className="w-full h-full rounded-full border-4 border-neutral-800 flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-700 via-neutral-900 to-black"
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-accent border-2 border-neutral-900" />
                </motion.div>
                {/* Ambient vinyl shine highlight */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
              </div>

              <div className="overflow-hidden min-w-0">
                <h4 className="text-xs font-extrabold truncate text-foreground">Midnight City</h4>
                <p className="text-[10px] text-text-muted font-mono truncate">M83</p>
              </div>
            </div>

            {/* Audio Visualizer Waves */}
            <div className="flex items-end justify-between h-4 w-full z-10 mt-1">
              {[50, 85, 30, 95, 60, 40, 75, 45, 90, 20, 65, 55].map((h, i) => (
                <motion.div
                  key={i}
                  className="w-[6%] bg-accent rounded-full"
                  animate={{ 
                    height: isPlaying ? [`${h * 0.25}%`, `${h}%`, `${h * 0.25}%`] : "20%" 
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.2 + (i % 3) * 0.2, 
                    ease: "easeInOut" 
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* 5. EXPERIENCE & TIMELINE CARD */}
          <motion.div
            variants={bentoItemVariants}
            ref={timelineGlow}
            whileHover={{ scale: 1.01 }}
            className="bento-glow-container lg:col-span-2 lg:row-span-2 rounded-3xl p-8 bg-card-bg border border-card-border hover:border-card-border-hover transition-colors duration-300 flex flex-col justify-between relative"
          >
            <div className="flex justify-between items-center z-10 border-b border-card-border/60 pb-4 mb-2">
              <div className="flex items-center gap-2">
                <Briefcase size={16} className="text-accent" />
                <h2 className="font-extrabold text-sm font-mono uppercase tracking-widest">Chronicle</h2>
              </div>
              
              {/* Tab Selector */}
              <div className="flex gap-1 bg-background border border-card-border p-1 rounded-2xl">
                <button
                  onClick={() => setActiveTab("exp")}
                  className={`px-3 py-1.5 rounded-xl font-mono text-[10px] font-bold transition-all cursor-pointer ${
                    activeTab === "exp" 
                      ? "bg-accent text-background" 
                      : "text-text-muted hover:text-foreground"
                  }`}
                >
                  Exp
                </button>
                <button
                  onClick={() => setActiveTab("edu")}
                  className={`px-3 py-1.5 rounded-xl font-mono text-[10px] font-bold transition-all cursor-pointer ${
                    activeTab === "edu" 
                      ? "bg-accent text-background" 
                      : "text-text-muted hover:text-foreground"
                  }`}
                >
                  Edu
                </button>
              </div>
            </div>

            {/* Vertical Timeline */}
            <div className="flex flex-col gap-5 my-3 z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: -10, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-4 relative"
                >
                  {/* Timeline vertical connector line */}
                  <div className="absolute left-[7px] top-[10px] bottom-[10px] w-[1px] bg-card-border" />

                  {activeTimeline.map((item, idx) => (
                    <div key={idx} className="flex gap-4 group/timeline-item relative">
                      {/* Timeline Accent Dot */}
                      <div className="w-3.5 h-3.5 rounded-full border border-accent/40 bg-background flex items-center justify-center mt-1 z-10 flex-shrink-0 group-hover/timeline-item:border-accent transition-all duration-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent scale-100 group-hover/timeline-item:scale-125 transition-transform" />
                      </div>

                      <div className="flex flex-col min-w-0">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <span className="text-[10px] font-mono text-accent font-semibold tracking-wider">
                            {item.period}
                          </span>
                          <span className="text-text-muted text-[10px] font-mono">• {item.company}</span>
                        </div>
                        <h4 className="font-bold text-xs md:text-sm mt-0.5 text-foreground group-hover/timeline-item:text-accent transition-colors">
                          {item.role}
                        </h4>
                        <p className="text-[11px] text-text-muted leading-relaxed mt-1">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-text-muted border-t border-card-border/60 pt-3 z-10">
              <span>Paris & Hybrid Contracts Only</span>
              <span className="flex items-center gap-1">5+ Yrs Experience <ChevronRight size={10} /></span>
            </div>
          </motion.div>

          {/* 6. SKILLS GRID CARD */}
          <motion.div
            variants={bentoItemVariants}
            ref={skillsGlow}
            whileHover={{ scale: 1.01 }}
            className="bento-glow-container lg:col-span-2 lg:row-span-2 rounded-3xl p-8 bg-card-bg border border-card-border hover:border-card-border-hover transition-colors duration-300 flex flex-col justify-between relative"
          >
            <div className="flex justify-between items-center z-10 border-b border-card-border/60 pb-4 mb-2">
              <div className="flex items-center gap-2">
                <Code2 size={16} className="text-accent" />
                <h2 className="font-extrabold text-sm font-mono uppercase tracking-widest">Ammunition</h2>
              </div>

              {/* Skills filters */}
              <div className="flex gap-1.5 bg-background border border-card-border p-1 rounded-2xl">
                {(["all", "design", "tech"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedSkillCategory(cat)}
                    className={`px-2 py-1 rounded-xl font-mono text-[9px] font-bold uppercase transition-all cursor-pointer ${
                      selectedSkillCategory === cat 
                        ? "bg-accent text-background" 
                        : "text-text-muted hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Compact Skills Grid with lit-up accent bars */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 my-3 z-10">
              {filteredSkills.map((skill, index) => (
                <div key={index} className="flex flex-col group/skill">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold truncate group-hover/skill:text-accent transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-[10px] font-mono text-text-muted font-semibold group-hover/skill:text-accent">
                      {skill.level}%
                    </span>
                  </div>
                  {/* Progress bar container */}
                  <div className="h-1.5 w-full bg-background/50 rounded-full overflow-hidden border border-card-border">
                    <motion.div 
                      className="h-full bg-accent"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono text-text-muted border-t border-card-border/60 pt-3 z-10">
              <Palette size={12} className="text-accent" />
              <span>Merging pixel perfection with optimized react engines</span>
            </div>
          </motion.div>

          {/* 7. FEATURED PROJECT CARD 1 */}
          <motion.div
            variants={bentoItemVariants}
            ref={project1Glow}
            whileHover={{ scale: 1.01 }}
            className="bento-glow-container lg:col-span-2 lg:row-span-2 rounded-3xl p-8 bg-card-bg border border-card-border hover:border-card-border-hover transition-colors duration-300 flex flex-col justify-between overflow-hidden relative group"
          >
            {/* Visual background element */}
            <div className="absolute right-0 bottom-0 w-[42%] h-[60%] bg-background/25 border-l border-t border-card-border rounded-tl-3xl p-4 hidden sm:flex flex-col gap-2 group-hover:bg-background/45 transition-all duration-500 overflow-hidden select-none">
              <div className="flex items-center gap-1.5 border-b border-card-border pb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                <div className="ml-auto font-mono text-[7px] text-text-muted">Aether_System</div>
              </div>
              <div className="flex flex-col gap-1.5 text-text-muted">
                <div className="h-3 w-[85%] bg-accent/20 rounded" />
                <div className="h-2 w-full bg-card-border rounded" />
                <div className="h-12 w-full bg-accent/5 rounded border border-accent/10 flex items-center justify-center">
                  {/* Mini graph widget inside project card */}
                  <svg width="100%" height="100%" viewBox="0 0 100 40" className="stroke-accent stroke-[1.5] fill-none">
                    <path d="M0,30 Q20,10 40,25 T80,5 T100,20 L100,40 L0,40 Z" fill="var(--badge-bg)" strokeWidth="0" />
                    <path d="M0,30 Q20,10 40,25 T80,5 T100,20" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-start z-10">
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-mono text-accent font-bold bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-full uppercase">
                  Featured Project
                </span>
                <span className="text-[10px] font-mono text-text-muted bg-background/50 border border-card-border px-2.5 py-1 rounded-full">
                  Figma / Next.js
                </span>
              </div>

              <a 
                href="#aether" 
                className="p-3 rounded-full bg-background border border-card-border group-hover:border-accent group-hover:text-accent transition-all duration-300"
                title="View Aether Project"
              >
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            <div className="max-w-sm z-10 mt-6 lg:mt-0">
              <h3 className="text-2xl font-extrabold tracking-tight group-hover:text-accent transition-colors mb-2">
                Aether Web3 Dashboard
              </h3>
              <p className="text-text-muted text-xs md:text-sm leading-relaxed">
                A premium crypto-asset dashboard utilizing customized geometric charting systems, integrated React widgets, and unified dark schemas. Winner of CSS Design Awards.
              </p>
            </div>

            <div className="flex gap-4 items-center z-10 mt-6 lg:mt-0 pt-4 border-t border-card-border">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-text-muted">
                <Monitor size={12} className="text-accent" />
                <span>Live deployment</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-text-muted">
                <Heart size={12} className="text-accent fill-accent" />
                <span>1.4k Saves</span>
              </div>
            </div>
          </motion.div>

          {/* 8. FEATURED PROJECT CARD 2 */}
          <motion.div
            variants={bentoItemVariants}
            ref={project2Glow}
            whileHover={{ scale: 1.01 }}
            className="bento-glow-container lg:col-span-2 lg:row-span-2 rounded-3xl p-8 bg-card-bg border border-card-border hover:border-card-border-hover transition-colors duration-300 flex flex-col justify-between overflow-hidden relative group"
          >
            {/* Visual background element */}
            <div className="absolute right-0 bottom-0 w-[42%] h-[60%] bg-background/25 border-l border-t border-card-border rounded-tl-3xl p-4 hidden sm:flex flex-col justify-between group-hover:bg-background/45 transition-all duration-500 overflow-hidden select-none">
              <div className="flex flex-col gap-1">
                <span className="font-serif italic text-xs border-b border-card-border pb-1 text-foreground">Vellum Journal</span>
                <span className="font-mono text-[7px] text-text-muted">Issue 04 • Modernism</span>
              </div>
              
              {/* Abstract editorial layout mock */}
              <div className="flex gap-2 items-end">
                <div className="w-[30%] h-12 bg-accent/15 border border-accent/20 rounded" />
                <div className="w-[70%] flex flex-col gap-1">
                  <div className="h-1.5 w-full bg-accent/20 rounded" />
                  <div className="h-1 w-[80%] bg-card-border rounded" />
                  <div className="h-1 w-[90%] bg-card-border rounded" />
                  <div className="h-1 w-[50%] bg-card-border rounded" />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-start z-10">
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-mono text-accent font-bold bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-full uppercase">
                  Featured Project
                </span>
                <span className="text-[10px] font-mono text-text-muted bg-background/50 border border-card-border px-2.5 py-1 rounded-full">
                  E-Commerce / UX
                </span>
              </div>

              <a 
                href="#vellum" 
                className="p-3 rounded-full bg-background border border-card-border group-hover:border-accent group-hover:text-accent transition-all duration-300"
                title="View Vellum Project"
              >
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            <div className="max-w-sm z-10 mt-6 lg:mt-0">
              <h3 className="text-2xl font-extrabold tracking-tight group-hover:text-accent transition-colors mb-2">
                Vellum Headless Portal
              </h3>
              <p className="text-text-muted text-xs md:text-sm leading-relaxed">
                An ultra-luxury e-commerce framework placing supreme focus on typography, negative space, and lightning-fast edge-cached transition architectures.
              </p>
            </div>

            <div className="flex gap-4 items-center z-10 mt-6 lg:mt-0 pt-4 border-t border-card-border">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-text-muted">
                <Monitor size={12} className="text-accent" />
                <span>Product design</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-text-muted">
                <Globe size={12} className="text-accent" />
                <span>Speed Rank 100</span>
              </div>
            </div>
          </motion.div>

          {/* 9. CONTACT CTA CARD */}
          <motion.div
            variants={bentoItemVariants}
            ref={contactGlow}
            whileHover={{ scale: 1.015 }}
            className="bento-glow-container lg:col-span-2 lg:row-span-1 rounded-3xl p-6 bg-card-bg border border-card-border hover:border-card-border-hover transition-colors duration-300 flex flex-col md:flex-row justify-between items-center overflow-hidden relative gap-6"
          >
            <div className="flex flex-col gap-1 z-10 w-full md:w-1/2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="font-mono text-[10px] text-accent font-extrabold uppercase tracking-widest">Connect</span>
              </div>
              <h3 className="text-lg md:text-xl font-extrabold tracking-tight mt-1">
                Let's launch something iconic together.
              </h3>
              <p className="text-[11px] text-text-muted leading-relaxed font-mono">
                Currently booking projects for Q3/Q4.
              </p>
            </div>

            {/* Email copying widget */}
            <div className="flex flex-col gap-2 w-full md:w-1/2 z-10">
              <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-background border border-card-border">
                <div className="flex flex-col overflow-hidden mr-2">
                  <span className="text-[9px] font-mono text-text-muted uppercase tracking-wider">Direct Email</span>
                  <span className="text-xs font-bold truncate">hello@leamartin.design</span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-xl bg-accent/10 text-accent hover:bg-accent hover:text-background transition-all duration-300 cursor-pointer flex-shrink-0"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check size={14} className="animate-scale" /> : <Copy size={14} />}
                </button>
              </div>

              {/* Dynamic Feedback Label */}
              <AnimatePresence>
                {copied && (
                  <motion.span 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[10px] font-mono text-accent font-semibold text-right"
                  >
                    Successfully copied to clipboard!
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* 10. SOCIALS CARD */}
          <motion.div
            variants={bentoItemVariants}
            ref={socialsGlow}
            whileHover={{ scale: 1.015 }}
            className="bento-glow-container lg:col-span-2 lg:row-span-1 rounded-3xl p-6 bg-card-bg border border-card-border hover:border-card-border-hover transition-colors duration-300 flex flex-col justify-between overflow-hidden relative"
          >
            <div className="flex justify-between items-center z-10">
              <span className="font-mono text-[10px] text-text-muted tracking-widest uppercase">Global Nodes</span>
              <span className="font-mono text-[9px] text-accent font-bold">@LEAMARTIN</span>
            </div>

            <div className="grid grid-cols-4 gap-4 my-2 z-10">
              {[
                { icon: <Github size={20} />, label: "GitHub", href: "https://github.com" },
                { icon: <Linkedin size={20} />, label: "LinkedIn", href: "https://linkedin.com" },
                { icon: <Dribbble size={20} />, label: "Dribbble", href: "https://dribbble.com" },
                { icon: <Twitter size={20} />, label: "X / Twitter", href: "https://twitter.com" }
              ].map((soc, idx) => (
                <a
                  key={idx}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center py-3 rounded-2xl bg-background border border-card-border hover:border-accent hover:text-accent transition-all duration-300 group/social-btn"
                >
                  <div className="group-hover/social-btn:scale-110 transition-transform duration-300">
                    {soc.icon}
                  </div>
                  <span className="text-[9px] font-mono mt-1.5 text-text-muted group-hover/social-btn:text-accent font-medium hidden sm:inline">
                    {soc.label}
                  </span>
                </a>
              ))}
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-text-muted border-t border-card-border/60 pt-2 z-10">
              <span>Updated July 2026</span>
              <span>All rights reserved © Léa Martin</span>
            </div>
          </motion.div>

        </motion.main>

        {/* COMPREHENSIVE FOOTER */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-text-muted mt-8 mb-4 border-t border-card-border/40 pt-6 gap-4"
        >
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>Designed & Engineered autonomously by Léa Martin</span>
          </div>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-accent transition-colors">POLICIES</a>
            <span className="text-card-border">•</span>
            <a href="#sitemap" className="hover:text-accent transition-colors">INDEX</a>
            <span className="text-card-border">•</span>
            <span className="text-accent">VERSION 4.2.0</span>
          </div>
        </motion.footer>

      </div>
    </div>
  );
}
