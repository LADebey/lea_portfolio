"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
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
  Volume2,
  Globe,
  ArrowRight,
  Download,
  FileText
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
  const [skillTab, setSkillTab] = useState<"hard" | "soft">("hard");
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
    navigator.clipboard.writeText("leagrivel@hotmail.fr");
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
      period: "Jan 2025 - Juil 2026",
      role: "UX Researcher & Designer (Alternance)",
      company: "KPMG France - Cellule DEE (Équipe EUC)",
      desc: "Au sein de la cellule Digital Employee Experience (DEE), accompagnement de la simplification de l'environnement de travail numérique des collaborateurs. Animation d'ateliers collaboratifs (parcours, personas), conception du PoC 'Device Health' et structuration de ressources SharePoint."
    },
    {
      period: "Oct 2021 - Nov 2022",
      role: "Webdesigner - Graphiste (Alternance puis CDD)",
      company: "DN Inforeso (Hauterives)",
      desc: "Conception d'interfaces web, création de maquettes et de prototypes. Création de l'identité visuelle et collaboration directe avec l'équipe de développement."
    }
  ];

  const educationData = [
    {
      period: "Sept 2024 - Juil 2026",
      role: "M2 UX Design Interactif",
      company: "IIM Digital School (Paris Nanterre)",
      desc: "Master spécialisé en UX Research, design d'expérience interactif, prototypage avancé et stratégie de parcours."
    },
    {
      period: "Oct 2021 - Juil 2022",
      role: "Licence Conceptrice Webdesigner",
      company: "Supcréa (Grenoble)",
      desc: "Design d'interface, conception graphique, maquettage et gestion de projets digitaux."
    },
    {
      period: "Juin 2020 - Avr 2021",
      role: "Titre Professionnel Webdesigner",
      company: "GRETA Midi-Pyrénées Centre (Toulouse)",
      desc: "Formation aux fondamentaux du design d'interface, du graphisme et de la création digitale."
    },
    {
      period: "Sept 2015 - Juin 2016",
      role: "Prépa Character Design",
      company: "Créapole (Paris 01)",
      desc: "Bases du dessin académique, étude de morphologie, univers graphiques et créativité visuelle."
    },
    {
      period: "Sept 2014 - Juil 2015",
      role: "Bac Pro Communication Visuelle (Plurimédia)",
      company: "Lycée Corvisart (Paris 13)",
      desc: "Chaîne graphique, typographie, mise en page et principes fondamentaux du design visuel."
    }
  ];

  const activeTimeline = activeTab === "exp" ? experienceData : educationData;

  // --- SKILLS DATA ---
  const hardSkillsCategories = [
    {
      category: "UX Research & Stratégie",
      items: [
        "Entretiens & Observation",
        "Animation d'atelier (FigJam)",
        "Cartographie (User Journey, Personas)",
        "Stratégie DEX (Digital Employee Experience)"
      ]
    },
    {
      category: "Conception UX",
      items: [
        "Prototypage & PoC",
        "Architecture de l'information",
        "Design d'interface",
        "Accessibilité numérique"
      ]
    },
    {
      category: "Outils & Transversalité",
      items: [
        "Figma / FigJam",
        "Écosystème Microsoft (SharePoint, PowerApps)",
        "Suite Adobe",
        "Notions de code (HTML / CSS / JS / PHP)"
      ]
    }
  ];

  const softSkillsData = [
    {
      title: "Empathie",
      desc: "Placer l'humain et la bienveillance au centre de chaque décision de conception."
    },
    {
      title: "Esprit d'analyse",
      desc: "Décortiquer les problèmes complexes pour proposer des solutions résilientes."
    },
    {
      title: "Facilitation",
      desc: "Fédérer les équipes, faire le pont avec la technique et encourager l'intelligence collective lors des ateliers."
    }
  ];

  // --- ANIMATION VARIANTS ---
  const bentoContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15
      }
    }
  };

  const bentoItemVariants: Variants = {
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
              LG-UX SPEC v1.0
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-text-muted">
              LÉA GRIVEL • PARIS, FR
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
                <span className="text-[11px] font-semibold tracking-wider font-mono uppercase">Disponible</span>
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
                      <span className="text-xs font-mono font-medium hidden sm:inline">Beige & Violet</span>
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
                      <span className="text-xs font-mono font-medium hidden sm:inline">Noir & Rose</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>

            <div className="mt-8 lg:mt-0 z-10">
              <span className="text-text-muted font-mono text-xs tracking-widest uppercase block mb-1">
                UX Researcher & Designer Orientée Stratégie
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                Léa Grivel
              </h1>
              <div className="text-text-muted text-sm leading-relaxed max-w-xl flex flex-col gap-3">
                <p>
                  Bonjour, je suis <strong className="text-foreground font-semibold">Léa Grivel</strong> 👋 UX Researcher & Designer orientée stratégie. Mon moteur au quotidien ? <em className="text-accent not-italic font-semibold">Décortiquer la complexité</em>. Passionnée par l'investigation et la stratégie, j'analyse les usages et lève les blocages. Mon objectif est d'aller sur le terrain pour comprendre les vrais besoins des utilisateurs, bien avant la création graphique.
                </p>
                <p>
                  Je suis convaincue qu'un bon design ne se résume pas à l'esthétique. Je conçois des expériences éthiques, bienveillantes et résilientes qui rendent les utilisateurs autonomes. Mon approche s'appuie sur l'intelligence collective et la co-construction, car pour moi, la technologie doit toujours s'adapter à l'humain, et non l'inverse.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-6 lg:mt-0 z-10 border-t border-card-border pt-4">
              <div className="flex gap-1.5 items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
                <div className="w-2.5 h-2.5 rounded-full bg-accent absolute" />
              </div>
              <span className="text-xs font-mono text-text-muted font-medium">
                UX Research, Stratégie & Design d'expérience
              </span>
            </div>
          </motion.div>

          {/* 2. PORTRAIT AVATAR CARD */}
          <motion.div
            variants={bentoItemVariants}
            ref={avatarGlow}
            whileHover={{ scale: 1.02 }}
            className="bento-glow-container lg:col-span-1 lg:row-span-2 rounded-3xl p-6 bg-card-bg border border-card-border hover:border-card-border-hover transition-colors duration-300 flex flex-col justify-between items-center group relative overflow-hidden"
          >
            {/* Dynamic Theme Ambient Glow behind Portrait */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 rounded-full bg-accent/30 filter blur-[45px] group-hover:bg-accent/50 transition-all duration-500 avatar-glow" />
            </div>

            <div className="w-full flex justify-between items-center z-10">
              <span className="font-mono text-[10px] text-text-muted tracking-widest uppercase">UX PROFILE</span>
              <span className="font-mono text-[10px] text-accent font-semibold bg-accent/10 px-2.5 py-0.5 rounded-full border border-accent/20">LG-UX</span>
            </div>

            {/* Photo Avatar with Halo & Rings */}
            <div className="w-48 h-56 my-2 flex items-center justify-center relative z-10">
              {/* Spinning outer subtle dashed ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-accent/25 flex items-center justify-center pointer-events-none"
              />

              {/* Portrait Container */}
              <div className="relative w-44 h-52 rounded-2xl overflow-hidden border border-accent/30 shadow-2xl flex items-end justify-center bg-gradient-to-b from-accent/10 to-background/60 group-hover:border-accent/60 transition-all duration-500">
                <img
                  src="/lea-grivel.png"
                  alt="Léa Grivel - UX Researcher & Designer"
                  className="w-full h-full object-cover object-top filter contrast-[1.03] group-hover:scale-105 transition-transform duration-500"
                />
                {/* Subtle gradient vignette at the bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
              </div>
            </div>

            <div className="w-full text-center z-10">
              <h3 className="text-sm font-bold tracking-tight text-foreground">Léa Grivel</h3>
              <p className="text-[11px] font-mono text-accent mt-0.5 font-medium">
                UX researcher & Designer orientée stratégie
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
                Heure locale à Paris
              </p>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-text-muted border-t border-card-border/60 pt-2 z-10">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Disponible pour missions & opportunités</span>
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
                <span className="text-xs font-mono font-medium">Coups de cœur</span>
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
                <h4 className="text-xs font-extrabold truncate text-foreground">Lost</h4>
                <p className="text-[10px] text-text-muted font-mono truncate">Linkin Park</p>
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
                <h2 className="font-extrabold text-sm font-mono uppercase tracking-widest">Parcours</h2>
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
            <div className="flex flex-col gap-5 my-3 z-10 max-h-[260px] overflow-y-auto pr-2">
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
              <span>Paris & Contrats Hybrides</span>
              <span className="flex items-center gap-1">3+ ans d'expérience <ChevronRight size={10} /></span>
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
                <Palette size={16} className="text-accent" />
                <h2 className="font-extrabold text-sm font-mono uppercase tracking-widest">Compétences</h2>
              </div>

              {/* Skills filters */}
              <div className="flex gap-1 bg-background border border-card-border p-1 rounded-2xl">
                <button
                  onClick={() => setSkillTab("hard")}
                  className={`px-3 py-1.5 rounded-xl font-mono text-[10px] font-bold transition-all cursor-pointer ${
                    skillTab === "hard" 
                      ? "bg-accent text-background" 
                      : "text-text-muted hover:text-foreground"
                  }`}
                >
                  Hard Skills
                </button>
                <button
                  onClick={() => setSkillTab("soft")}
                  className={`px-3 py-1.5 rounded-xl font-mono text-[10px] font-bold transition-all cursor-pointer ${
                    skillTab === "soft" 
                      ? "bg-accent text-background" 
                      : "text-text-muted hover:text-foreground"
                  }`}
                >
                  Soft Skills
                </button>
              </div>
            </div>

            {/* Skills Content Container */}
            <div className="my-3 z-10 max-h-[260px] overflow-y-auto pr-1">
              <AnimatePresence mode="wait">
                {skillTab === "hard" ? (
                  <motion.div
                    key="hard"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-4"
                  >
                    {hardSkillsCategories.map((cat, idx) => (
                      <div key={idx} className="flex flex-col gap-2">
                        <span className="text-[11px] font-mono font-bold text-accent tracking-wider uppercase">
                          {cat.category}
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {cat.items.map((item, iIdx) => (
                            <span 
                              key={iIdx}
                              className="text-xs bg-background/60 border border-card-border hover:border-accent/40 hover:text-accent px-3 py-1.5 rounded-xl text-foreground font-medium transition-all duration-200 shadow-sm"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="soft"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-3"
                  >
                    {softSkillsData.map((soft, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-background/50 border border-card-border hover:border-accent/40 transition-colors flex flex-col gap-1.5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-accent" />
                          <h4 className="font-bold text-xs md:text-sm text-foreground">{soft.title}</h4>
                        </div>
                        <p className="text-[11px] text-text-muted leading-relaxed">
                          {soft.desc}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono text-text-muted border-t border-card-border/60 pt-3 z-10">
              <Sparkles size={12} className="text-accent" />
              <span>Conception éthique & démarche centrée utilisateur</span>
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
            <div className="flex flex-col gap-1 z-10 w-full md:w-[62%]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-[10px] text-accent font-extrabold uppercase tracking-widest">Contact</span>
              </div>
              <h3 className="text-lg md:text-xl font-extrabold tracking-tight mt-1 leading-snug">
                Concevons des expériences éthiques et résilientes.
              </h3>
              <p className="text-[11px] text-text-muted leading-relaxed font-mono mt-0.5">
                À l'écoute d'opportunités en UX Research, Stratégie et Design.
              </p>
            </div>

            {/* Accent CTA Button & Email Copying Widget in Vertical Column */}
            <div className="flex flex-col gap-2.5 w-full md:w-[38%] z-10 items-stretch md:items-end justify-center flex-shrink-0">
              <a
                href="mailto:leagrivel@hotmail.fr"
                className="w-full md:w-[175px] px-4 py-2.5 rounded-2xl bg-accent text-background font-mono text-xs font-extrabold tracking-wide uppercase transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-accent/25 flex items-center justify-center gap-2 group/cta shadow-md cursor-pointer whitespace-nowrap text-center"
              >
                <span>Me Contacter</span>
                <Send size={13} className="group-hover/cta:translate-x-1 group-hover/cta:-translate-y-0.5 transition-transform" />
              </a>

              <button
                onClick={handleCopyEmail}
                className="w-full md:w-[175px] px-4 py-2.5 rounded-2xl bg-background border border-card-border hover:border-accent hover:text-accent transition-all duration-300 text-xs font-mono font-medium flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                title="Copier l'email dans le presse-papier"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-accent" />
                    <span className="text-accent font-semibold">Copié !</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copier l'Email</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* 10. SOCIALS & CV CARD */}
          <motion.div
            variants={bentoItemVariants}
            ref={socialsGlow}
            whileHover={{ scale: 1.015 }}
            className="bento-glow-container lg:col-span-2 lg:row-span-1 rounded-3xl p-6 bg-card-bg border border-card-border hover:border-card-border-hover transition-colors duration-300 flex flex-col justify-between overflow-hidden relative gap-4"
          >
            <div className="flex justify-between items-center z-10">
              <span className="font-mono text-[10px] text-text-muted tracking-widest uppercase">Réseau & Documents</span>
              <span className="font-mono text-[9px] text-accent font-bold">@LEAGRIVEL</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-1 z-10">
              {/* LinkedIn Link Card */}
              <a
                href="https://www.linkedin.com/in/l%C3%A9a-grivel-b3b597194/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-background border border-card-border hover:border-accent hover:text-accent transition-all duration-300 group/link"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-accent/10 text-accent group-hover/link:bg-accent group-hover/link:text-background transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-extrabold text-foreground group-hover/link:text-accent transition-colors">LinkedIn</span>
                    <span className="text-[10px] font-mono text-text-muted">Léa Grivel</span>
                  </div>
                </div>
                <ExternalLink size={16} className="text-text-muted group-hover/link:text-accent group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>

              {/* CV Download Card */}
              <a
                href="/CV_Lea_Grivel.pdf"
                download="CV_Lea_Grivel.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-accent/10 border border-accent/30 hover:bg-accent hover:text-background transition-all duration-300 group/cv shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-accent text-background group-hover/cv:bg-background group-hover/cv:text-accent transition-colors">
                    <FileText size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-extrabold text-accent group-hover/cv:text-background transition-colors">Télécharger mon CV</span>
                    <span className="text-[10px] font-mono text-text-muted group-hover/cv:text-background/80 transition-colors">Format PDF</span>
                  </div>
                </div>
                <Download size={16} className="text-accent group-hover/cv:text-background group-hover/cv:translate-y-0.5 transition-transform" />
              </a>
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-text-muted border-t border-card-border/60 pt-2 z-10">
              <span>Mis à jour en 2026</span>
              <span>Tous droits réservés © Léa Grivel</span>
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
            <span>Conçu et développé par Léa Grivel</span>
          </div>
          <div className="flex gap-4">
            <span className="text-accent font-semibold">VERSION 1.0.0</span>
          </div>
        </motion.footer>

      </div>
    </div>
  );
}
