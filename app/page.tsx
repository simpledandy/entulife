"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import Head from 'next/head';

type Stage = 'entry' | 'awe' | 'cosmos';
type CosmicObject = {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 'inspiration' | 'fact' | 'whisper';
  content: string;
  emoji?: string;
  size: number;
  hue: number;
  pulseOffset: number;
};

type Star = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  layer: number;
};

const inspirations = [
  { text: "Julia Child started cooking at 36", age: 36, emoji: "🍳" },
  { text: "Vera Wang designed her first dress at 40", age: 40, emoji: "👗" },
  { text: "Stan Lee created Spider-Man at 39", age: 39, emoji: "🕷️" },
  { text: "Alan Rickman got his first movie role at 46", age: 46, emoji: "🎭" },
  { text: "Morgan Freeman got his big break at 52", age: 52, emoji: "🎬" },
  { text: "Samuel L. Jackson's career took off at 43", age: 43, emoji: "⭐" },
  { text: "Harland Sanders founded KFC at 62", age: 62, emoji: "🍗" },
  { text: "Laura Ingalls Wilder published her first book at 65", age: 65, emoji: "📖" },
  { text: "Kathryn Joosten won her first Emmy at 66", age: 66, emoji: "🏆" },
  { text: "Grandma Moses painted her first piece at 78", age: 78, emoji: "🎨" },
  { text: "Ray Kroc founded McDonald's at 52", age: 52, emoji: "🍔" },
  { text: "Taikichiro Mori became a billionaire at 55", age: 55, emoji: "💼" },
  { text: "Lynda Weinman founded Lynda.com at 40", age: 40, emoji: "💻" },
  { text: "Momofuku Ando invented instant ramen at 48", age: 48, emoji: "🍜" },
  { text: "Anna Mary Robertson started painting at 76", age: 76, emoji: "🖼️" },
  { text: "Diana Nyad swam from Cuba to Florida at 64", age: 64, emoji: "🏊" },
  { text: "Fauja Singh ran his first marathon at 89", age: 89, emoji: "🏃" },
  { text: "Yuichiro Miura climbed Everest at 80", age: 80, emoji: "⛰️" },
  { text: "Nola Ochs got her college degree at 95", age: 95, emoji: "🎓" },
  { text: "Frank McCourt published Angela's Ashes at 66", age: 66, emoji: "📚" },
  { text: "Andrea Bocelli became famous at 36", age: 36, emoji: "🎤" },
  { text: "Vivienne Westwood opened her first shop at 30", age: 30, emoji: "👠" },
  { text: "Toni Morrison published her first novel at 39", age: 39, emoji: "✍️" },
  { text: "Peter Mark Roget published his Thesaurus at 73", age: 73, emoji: "📖" },
  { text: "Harry Bernstein published his memoir at 96", age: 96, emoji: "📝" },
  { text: "Wally Amos founded Famous Amos at 39", age: 39, emoji: "🍪" },
  { text: "Henry Ford created the Model T at 45", age: 45, emoji: "🚗" },
  { text: "Arianna Huffington founded HuffPost at 54", age: 54, emoji: "📰" },
  { text: "Charles Darwin published Origin of Species at 50", age: 50, emoji: "🧬" },
  { text: "J.R.R. Tolkien published The Hobbit at 45", age: 45, emoji: "📚" },
  { text: "Rodney Dangerfield got famous at 46", age: 46, emoji: "😄" },
  { text: "Mary Wesley published her first novel at 71", age: 71, emoji: "📖" },
  { text: "Laura Ingalls Wilder started writing at 64", age: 64, emoji: "🖊️" },
  { text: "Kathryn Bigelow won Best Director at 58", age: 58, emoji: "🎬" },
  { text: "Reid Hoffman founded LinkedIn at 36", age: 36, emoji: "💼" },
  { text: "Robin Chase founded Zipcar at 42", age: 42, emoji: "🚙" },
  { text: "Tim & Nina Zagat published their guide at 51", age: 51, emoji: "🍽️" },
  { text: "Gary Heavin founded Curves at 39", age: 39, emoji: "💪" },
  { text: "Bernie Marcus founded Home Depot at 50", age: 50, emoji: "🔨" },
  { text: "Wally Blume founded Denali Flavors at 57", age: 57, emoji: "🍦" },
  { text: "Someone learned to surf at 67", age: 67, emoji: "🏄" },
  { text: "Someone started a band at 72", age: 72, emoji: "🎸" },
  { text: "Someone wrote their first poem at 83", age: 83, emoji: "✨" },
  { text: "Someone opened a café at 55", age: 55, emoji: "☕" },
  { text: "Someone learned to sail at 70", age: 70, emoji: "⛵" },
  { text: "Someone became a yoga teacher at 68", age: 68, emoji: "🧘" },
  { text: "Someone started photography at 74", age: 74, emoji: "📸" },
  { text: "Someone learned piano at 81", age: 81, emoji: "🎹" },
];

const facts = [
  "Trees communicate through underground networks",
  "You've blinked about 250 million times",
  "Octopuses have three hearts",
  "The smell of rain is called petrichor",
  "Stars are always singing",
  "Your body regenerates every 7 years",
  "Butterflies taste with their feet",
  "A day on Venus is longer than its year",
  "Honey never spoils",
  "Whales have accents",
  "Mantis shrimp can see colors we can't imagine",
  "Plants can hear themselves being eaten",
  "The universe is humming",
  "Every atom in your body is billions of years old",
  "You're made of stardust",
];

const whispers = [
  "What made you smile today?",
  "What sound makes you feel at home?",
  "What would you do with infinite time?",
  "What did you love before anyone told you what to love?",
  "What makes time disappear?",
  "If you could learn anything, just for the joy of it?",
  "What would you create in secret?",
  "What calls to you in quiet moments?",
  "Where does your curiosity wander?",
  "What feels like play to you?",
];

export default function EntuLife() {
  const [stage, setStage] = useState<Stage>('entry');
  const [ageInput, setAgeInput] = useState("");
  const [age, setAge] = useState<number | null>(null);
  const [aweMessage, setAweMessage] = useState("");
  const [cosmicObjects, setCosmicObjects] = useState<CosmicObject[]>([]);
  const [stars, setStars] = useState<Star[]>([]);
  const [cameraPos, setCameraPos] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(0);

  const spring = useSpring(age ?? 0, { stiffness: 70, damping: 20 });
  const leftPercent = useTransform(spring, (v) => `${v}%`);

  const hue = age !== null ? Math.round(200 - age * 1.4) : 220;
  const bgGradient = `radial-gradient(ellipse at 50% 20%, 
    hsl(${hue}, 70%, 15%) 0%,
    hsl(${hue}, 60%, 8%) 40%,
    hsl(${(hue + 40) % 360}, 60%, 5%) 100%)`;

  useEffect(() => {
    if (age !== null) spring.set(age);
  }, [age, spring]);

  useEffect(() => {
    if (stage === 'cosmos') {
      generateStars();
    }
  }, [stage]);

  useEffect(() => {
    if (stage === 'cosmos' && cosmicObjects.length > 0) {
      const animate = () => {
        setCosmicObjects(prev => prev.map(obj => ({
          ...obj,
          x: obj.x + obj.vx,
          y: obj.y + obj.vy,
        })));
        animationFrameRef.current = requestAnimationFrame(animate);
      };
      animationFrameRef.current = requestAnimationFrame(animate);
      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };
    }
  }, [stage, cosmicObjects.length]);

  const generateStars = () => {
    const newStars: Star[] = [];
    for (let i = 0; i < 800; i++) {
      newStars.push({
        x: Math.random() * 4000 - 2000,
        y: Math.random() * 4000 - 2000,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 3 + 1,
        layer: Math.random() < 0.3 ? 0 : Math.random() < 0.6 ? 1 : 2,
      });
    }
    setStars(newStars);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      setAgeInput("");
      setAge(null);
      return;
    }
    if (!/^\d{0,3}$/.test(val)) return;
    const num = Number(val);
    if (num >= 0 && num <= 100) {
      setAgeInput(val);
      setAge(num);
    }
  };

  const proceedToAwe = () => {
    if (age === null) return;
    
    const aweMoments = [
      `You've experienced approximately ${Math.round(age * 365.25).toLocaleString()} sunrises`,
      `You've laughed roughly ${Math.round(age * 2000).toLocaleString()} times`,
      `You have time to read ${Math.round((100 - age) * 50).toLocaleString()} more books`,
      `You could still learn ${Math.floor((100 - age) / 5)} new languages`,
      `You've created ${Math.round(age * 1000).toLocaleString()} unique memories`,
      `You could visit ${Math.floor((100 - age) * 2)} countries`,
      `Your heart has beaten ${(age * 365.25 * 100000).toLocaleString()} times`,
      `There are still ${Math.round((100 - age) * 12).toLocaleString()} seasons ahead`,
    ];
    
    setAweMessage(aweMoments[Math.floor(Math.random() * aweMoments.length)]);
    setStage('awe');
    
    setTimeout(() => {
      setStage('cosmos');
      generateCosmos();
    }, 4000);
  };

  const generateCosmos = () => {
    const objects: CosmicObject[] = [];
    const spread = 2500;
    
    for (let i = 0; i < 25; i++) {
      const insp = inspirations[Math.floor(Math.random() * inspirations.length)];
      objects.push({
        id: `insp-${i}`,
        x: (Math.random() - 0.5) * spread,
        y: (Math.random() - 0.5) * spread,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        type: 'inspiration',
        content: insp.text,
        emoji: insp.emoji,
        size: 70 + Math.random() * 50,
        hue: 190 + Math.random() * 30,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }
    
    for (let i = 0; i < 20; i++) {
      objects.push({
        id: `fact-${i}`,
        x: (Math.random() - 0.5) * spread,
        y: (Math.random() - 0.5) * spread,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        type: 'fact',
        content: facts[Math.floor(Math.random() * facts.length)],
        size: 50 + Math.random() * 40,
        hue: 260 + Math.random() * 30,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }
    
    for (let i = 0; i < 12; i++) {
      objects.push({
        id: `whisper-${i}`,
        x: (Math.random() - 0.5) * spread,
        y: (Math.random() - 0.5) * spread,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        type: 'whisper',
        content: whispers[Math.floor(Math.random() * whispers.length)],
        size: 55 + Math.random() * 35,
        hue: 170 + Math.random() * 20,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }
    
    setCosmicObjects(objects);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (stage !== 'cosmos') return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - cameraPos.x, y: e.clientY - cameraPos.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    if (!isDragging) return;
    setCameraPos({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (stage !== 'cosmos') return;
    e.preventDefault();
    
    const zoomDelta = -e.deltaY * 0.001;
    setZoom(prev => Math.max(0.3, Math.min(2, prev + zoomDelta)));
  };

  const getDistanceToMouse = (objX: number, objY: number) => {
    const screenX = objX * zoom + cameraPos.x + window.innerWidth / 2;
    const screenY = objY * zoom + cameraPos.y + window.innerHeight / 2;
    const dx = screenX - mousePos.x;
    const dy = screenY - mousePos.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: bgGradient,
        transition: "background 1s ease",
        overflow: "hidden",
        cursor: stage === 'cosmos' ? (isDragging ? 'grabbing' : 'grab') : 'default',
        position: 'relative',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      <Head>
        <title>Entulife - Things to do In Your Life</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AnimatePresence mode="wait">
        {stage === 'entry' && (
          <motion.div
            key="entry"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              color: "#e9ecf8",
              padding: "48px",
            }}
          >
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                fontSize: "4rem",
                margin: 0,
                fontWeight: 800,
                background: "linear-gradient(90deg,#7dd3fc,#b392ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 40px rgba(125,211,252,0.3)",
              }}
            >
              EntuLife
            </motion.h1>

            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ marginTop: 10, color: "rgba(233,236,248,0.6)" }}
            >
              Discover where you are in your journey
            </motion.h2>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{ marginTop: 28 }}
            >
              <label style={{
                display: "block",
                fontSize: 13,
                color: "rgba(233,236,248,0.6)",
                marginBottom: 8,
              }}>
                How old are you?
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={ageInput}
                onChange={handleChange}
                onKeyDown={(e) => e.key === 'Enter' && proceedToAwe()}
                placeholder="Enter your age"
                autoFocus
                style={{
                  textAlign: "center",
                  fontSize: "1.4rem",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 10,
                  padding: "10px 18px",
                  color: "inherit",
                  width: 140,
                  outline: "none",
                  transition: "all 0.3s ease",
                }}
              />
            </motion.div>

            <div style={{ width: "85%", maxWidth: 1200, marginTop: 56, position: "relative" }}>
              <div style={{ position: "relative", height: 24 }}>
                <div style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: "50%",
                  height: 6,
                  transform: "translateY(-50%)",
                  borderRadius: 6,
                  background: "linear-gradient(90deg, rgba(125,211,252,0.15), rgba(179,146,255,0.15))",
                  boxShadow: "0 0 20px rgba(125,211,252,0.1)",
                }} />

                {[...Array(11)].map((_, i) => (
                  <div key={i} style={{
                    position: "absolute",
                    left: `${i * 10}%`,
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}>
                    <div style={{
                      width: 2,
                      height: 12,
                      background: "rgba(255,255,255,0.15)",
                      borderRadius: 2,
                    }} />
                    <div style={{
                      marginTop: 8,
                      fontSize: 12,
                      color: "rgba(233,236,248,0.4)",
                    }}>
                      {i * 10}
                    </div>
                  </div>
                ))}

                {age !== null && (
                  <>
                    <motion.div 
                      style={{
                        position: "absolute",
                        top: "50%",
                        translateY: "-50%",
                        left: leftPercent,
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(107,230,225,1) 0%, rgba(59,130,246,0.9) 60%)",
                        boxShadow: "0 0 30px rgba(107,230,225,0.5)",
                      }}
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(107,230,225,0.4)",
                          "0 0 40px rgba(107,230,225,0.6)",
                          "0 0 20px rgba(107,230,225,0.4)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />

                    <motion.div style={{
                      position: "absolute",
                      top: "10%",
                      translateY: "-50%",
                      left: leftPercent,
                      transform: "translateX(-50%)",
                      pointerEvents: "none",
                      fontSize: 13,
                      padding: "6px 10px",
                      borderRadius: 999,
                      background: "rgba(10,14,20,0.8)",
                      color: "#7be6e6",
                      border: "1px solid rgba(107,230,225,0.3)",
                      whiteSpace: "nowrap",
                      backdropFilter: "blur(10px)",
                    }}>
                      You are here
                    </motion.div>
                  </>
                )}
              </div>
            </div>

            {age !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  marginTop: 40,
                  display: "inline-block",
                }}
              >
                <button
                  onClick={proceedToAwe}
                  style={{
                    padding: "12px 32px",
                    fontSize: "1rem",
                    background: "rgba(107,230,225,0.15)",
                    border: "1px solid rgba(107,230,225,0.4)",
                    borderRadius: 999,
                    color: "#7be6e6",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  Continue →
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {stage === 'awe' && (
          <motion.div
            key="awe"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            style={{
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "48px",
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                fontSize: "2.2rem",
                fontWeight: 300,
                color: "#e9ecf8",
                maxWidth: 800,
                lineHeight: 1.6,
                textShadow: "0 0 40px rgba(125,211,252,0.3)",
              }}
            >
              {aweMessage}
            </motion.div>
          </motion.div>
        )}

        {stage === 'cosmos' && (
          <motion.div
            key="cosmos"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              minHeight: "100vh",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Starfield layers */}
            {[0, 1, 2].map(layer => (
              <div
                key={`layer-${layer}`}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: `translate(calc(-50% + ${cameraPos.x * (0.3 + layer * 0.2)}px), calc(-50% + ${cameraPos.y * (0.3 + layer * 0.2)}px)) scale(${zoom})`,
                  transition: isDragging ? 'none' : 'transform 0.3s ease-out',
                  pointerEvents: 'none',
                }}
              >
                {stars.filter(s => s.layer === layer).map((star, i) => (
                  <motion.div
                    key={`star-${layer}-${i}`}
                    animate={{
                      opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
                    }}
                    transition={{
                      duration: star.twinkleSpeed,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      position: "absolute",
                      left: star.x,
                      top: star.y,
                      width: star.size,
                      height: star.size,
                      borderRadius: "50%",
                      background: `radial-gradient(circle, rgba(255,255,255,${star.opacity}) 0%, transparent 70%)`,
                      boxShadow: `0 0 ${star.size * 2}px rgba(255,255,255,${star.opacity * 0.5})`,
                    }}
                  />
                ))}
              </div>
            ))}

            {/* Cosmic objects */}
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `translate(calc(-50% + ${cameraPos.x}px), calc(-50% + ${cameraPos.y}px)) scale(${zoom})`,
              transition: isDragging ? 'none' : 'transform 0.3s ease-out',
            }}>
              {cosmicObjects.map((obj) => {
                const distance = getDistanceToMouse(obj.x, obj.y);
                const proximityFactor = Math.max(0, 1 - distance / 300);
                
                return (
                  <motion.div
                    key={obj.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                    }}
                    transition={{ 
                      delay: Math.random() * 2, 
                      duration: 1.5,
                      type: "spring",
                    }}
                    style={{
                      position: "absolute",
                      left: obj.x,
                      top: obj.y,
                      width: obj.size,
                      height: obj.size,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      padding: 20,
                      background: `radial-gradient(circle at 30% 30%, 
                        hsla(${obj.hue}, 70%, ${40 + proximityFactor * 20}%, ${0.25 + proximityFactor * 0.15}),
                        hsla(${obj.hue}, 60%, ${20 + proximityFactor * 10}%, ${0.1 + proximityFactor * 0.1}))`,
                      border: `1px solid hsla(${obj.hue}, 70%, ${50 + proximityFactor * 20}%, ${0.3 + proximityFactor * 0.3})`,
                      backdropFilter: "blur(15px)",
                      cursor: "pointer",
                      fontSize: obj.size > 80 ? "0.9rem" : "0.75rem",
                      color: "#e9ecf8",
                      textAlign: "center",
                      transition: "all 0.5s ease",
                      boxShadow: `
                        0 0 ${20 + proximityFactor * 40}px hsla(${obj.hue}, 70%, 60%, ${0.2 + proximityFactor * 0.4}),
                        inset 0 0 ${15 + proximityFactor * 20}px hsla(${obj.hue}, 80%, 80%, ${0.1 + proximityFactor * 0.2})
                      `,
                      transform: `scale(${1 + proximityFactor * 0.15})`,
                    }}
                  >
                    {obj.emoji && (
                      <motion.div 
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 3 + obj.pulseOffset,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        style={{ 
                          fontSize: obj.size > 80 ? "2rem" : "1.5rem", 
                          marginBottom: 8,
                          filter: `drop-shadow(0 0 ${10 + proximityFactor * 10}px hsla(${obj.hue}, 80%, 70%, 0.6))`,
                        }}
                      >
                        {obj.emoji}
                      </motion.div>
                    )}
                    <div style={{ 
                      fontSize: obj.type === 'inspiration' ? "0.8rem" : obj.type === 'whisper' ? "0.78rem" : "0.75rem",
                      lineHeight: 1.4,
                      opacity: 0.85 + proximityFactor * 0.15,
                      fontWeight: obj.type === 'whisper' ? 300 : 400,
                      fontStyle: obj.type === 'whisper' ? 'italic' : 'normal',
                    }}>
                      {obj.content}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              style={{
                position: "fixed",
                bottom: 20,
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "0.85rem",
                color: "rgba(233,236,248,0.4)",
                textAlign: "center",
                pointerEvents: "none",
              }}
            >
              Drag to explore • Scroll to zoom • Click to wander
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}