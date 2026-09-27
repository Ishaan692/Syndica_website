"use client";
import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue, useMotionTemplate } from "framer-motion";

const nodes = [
  { label: "Unstructured Data", angle: 0 },
  { label: "Siloed Systems", angle: 60 },
  { label: "Manual Reconciliation", angle: 120 },
  { label: "No Source of Truth", angle: 180 },
  { label: "Broken Workflows", angle: 240 },
  { label: "Zero Interoperability", angle: 300 },
];

const RADIUS = 300;

// The network connections (outer ring + star pattern)
const connections = [
  [0,1], [1,2], [2,3], [3,4], [4,5], [5,0], 
  [0,2], [1,3], [2,4], [3,5], [4,0], [5,1]
];

function ConnectionLine({ indexA, indexB, scrollYProgress }: { indexA: number, indexB: number, scrollYProgress: MotionValue<number> }) {
  const spawnStartA = 0.05 + (indexA * 0.04);
  const spawnEndA = spawnStartA + 0.04;
  const spawnStartB = 0.05 + (indexB * 0.04);
  const spawnEndB = spawnStartB + 0.04;

  const lineAppear = Math.max(spawnEndA, spawnEndB);
  
  const targetXA = Math.cos((nodes[indexA].angle * Math.PI) / 180) * RADIUS;
  const targetYA = Math.sin((nodes[indexA].angle * Math.PI) / 180) * RADIUS;
  const targetXB = Math.cos((nodes[indexB].angle * Math.PI) / 180) * RADIUS;
  const targetYB = Math.sin((nodes[indexB].angle * Math.PI) / 180) * RADIUS;

  // Collapse is compressed to 0.35 -> 0.42
  const x1 = useTransform(scrollYProgress, [spawnStartA, spawnEndA, 0.35, 0.42], [0, targetXA, targetXA, 0]);
  const y1 = useTransform(scrollYProgress, [spawnStartA, spawnEndA, 0.35, 0.42], [0, targetYA, targetYA, 0]);
  const x2 = useTransform(scrollYProgress, [spawnStartB, spawnEndB, 0.35, 0.42], [0, targetXB, targetXB, 0]);
  const y2 = useTransform(scrollYProgress, [spawnStartB, spawnEndB, 0.35, 0.42], [0, targetYB, targetYB, 0]);

  // Make lines much brighter and more prominent
  const opacity = useTransform(scrollYProgress, [lineAppear - 0.02, lineAppear, 0.41, 0.42], [0, 0.8, 0.8, 0]);

  return (
    <motion.line 
      x1={x1} y1={y1} x2={x2} y2={y2} 
      stroke="rgba(255,255,255,0.7)" 
      strokeWidth={2}
      style={{ opacity }}
    />
  );
}

function NodeItem({ label, angle, index, scrollYProgress }: { label: string, angle: number, index: number, scrollYProgress: MotionValue<number> }) {
  const spawnStart = 0.05 + (index * 0.04);
  const spawnEnd = spawnStart + 0.04;
  
  const targetX = Math.cos((angle * Math.PI) / 180) * RADIUS;
  const targetY = Math.sin((angle * Math.PI) / 180) * RADIUS;

  // Collapse is compressed to 0.35 -> 0.42
  const xTransform = useTransform(scrollYProgress, [spawnStart, spawnEnd, 0.35, 0.42], [0, targetX, targetX, 0]);
  const yTransform = useTransform(scrollYProgress, [spawnStart, spawnEnd, 0.35, 0.42], [0, targetY, targetY, 0]);
  
  const x = useMotionTemplate`calc(-50% + ${xTransform}px)`;
  const y = useMotionTemplate`calc(-50% + ${yTransform}px)`;

  const scale = useTransform(scrollYProgress, [spawnStart - 0.01, spawnStart, 0.41, 0.42], [0, 1, 1, 0]);
  const opacity = useTransform(scrollYProgress, [spawnStart - 0.01, spawnStart, 0.41, 0.42], [0, 1, 1, 0]);

  return (
    <motion.div
      style={{ left: "50%", top: "50%", x, y, scale, opacity }}
      className="absolute px-6 py-2.5 bg-black/95 border border-white/20 rounded-md shadow-[0_0_30px_rgba(0,0,0,1)] text-white whitespace-nowrap z-30 pointer-events-none flex items-center justify-center"
    >
      <span className="font-sans text-sm md:text-base font-medium tracking-widest uppercase text-white">{label}</span>
    </motion.div>
  );
}

export default function ChaosToOrder() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll within this 500vh container (massively longer to allow rest at the end)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // DOM Interpolations
  // TOP TEXT stays visible! When nodes spawn, it shrinks and moves to the top of the constellation.
  const topTextOpacity = useTransform(scrollYProgress, [0, 0.02, 0.35, 0.42], [0, 1, 1, 0]);
  const topTextScale = useTransform(scrollYProgress, [0, 0.05, 0.1, 0.35, 0.42], [1, 1, 0.5, 0.5, 0.4]);
  // Moves up by 380px to sit right above the top node (which is at -300px)
  const topTextY = useTransform(scrollYProgress, [0, 0.02, 0.05, 0.1, 0.35, 0.42], [20, 0, 0, -380, -380, -420]);
  
  // The blinding flash when it hits critical mass (Nodes hit center at 0.42)
  const flashScale = useTransform(scrollYProgress, [0.41, 0.42, 0.45], [0, 30, 0]);
  const flashOpacity = useTransform(scrollYProgress, [0.41, 0.42, 0.45], [0, 1, 0]);

  // Make the entire constellation rotate inward violently during collapse to create a vortex
  const constellationRotate = useTransform(scrollYProgress, [0.35, 0.42], [0, -180]);
  const constellationScale = useTransform(scrollYProgress, [0.35, 0.42], [1, 0.2]);

  // Wordmark fades in completely by 0.65, leaving 35% of the scroll entirely for resting!
  const wordmarkOpacity = useTransform(scrollYProgress, [0.60, 0.65], [0, 1]);
  const wordmarkScale = useTransform(scrollYProgress, [0.60, 0.65], [0.95, 1]);
  const wordmarkBlur = useTransform(scrollYProgress, [0.60, 0.65], ["blur(12px)", "blur(0px)"]);

  const bottomTextOpacity = useTransform(scrollYProgress, [0.65, 0.70], [0, 1]);
  const bottomTextY = useTransform(scrollYProgress, [0.65, 0.70], [20, 0]);

  const canvasOpacity = useTransform(scrollYProgress, [0.41, 0.43, 0.60, 0.65], [0, 1, 1, 0]);

  // Particle System
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<{startX: number, startY: number, targetX: number, targetY: number, angleOffset: number}[]>([]);

  useEffect(() => {
    const offscreen = document.createElement("canvas");
    const ctx = offscreen.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    
    offscreen.width = 600;
    offscreen.height = 300;
    ctx.font = "bold 68px serif"; 
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Syndica.", offscreen.width / 2, offscreen.height / 2);
    
    const imgData = ctx.getImageData(0, 0, offscreen.width, offscreen.height);
    const data = imgData.data;
    const points = [];
    
    const gap = 4;
    for (let y = 0; y < offscreen.height; y += gap) {
      for (let x = 0; x < offscreen.width; x += gap) {
        const idx = (y * offscreen.width + x) * 4;
        if (data[idx + 3] > 128) {
          points.push({
            x: x - offscreen.width / 2,
            y: y - offscreen.height / 2
          });
        }
      }
    }
    
    // Prepare initial particle positions radiating from center, adding an angle offset for a swirling vortex effect
    particlesRef.current = points.map(p => {
      const angle = Math.random() * Math.PI * 2;
      const radius = 150 + Math.random() * 800; // violent explosion outwards
      return {
        startX: Math.cos(angle) * radius,
        startY: Math.sin(angle) * radius,
        targetX: p.x,
        targetY: p.y,
        angleOffset: (Math.random() - 0.5) * Math.PI // extra swirl per particle
      };
    });
  }, []);

  // Drive canvas rendering based on scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    if (latest < 0.41 || latest > 0.68) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    let phaseProgress = 0;
    let isAssemble = false;
    
    if (latest >= 0.42 && latest < 0.52) {
      // Explode phase (0.42 -> 0.52)
      const raw = (latest - 0.42) / (0.52 - 0.42);
      phaseProgress = 1 - Math.pow(1 - raw, 4); // sharp ease out
    } else if (latest >= 0.52 && latest <= 0.65) {
      // Assemble phase (0.52 -> 0.65)
      const raw = (latest - 0.52) / (0.65 - 0.52);
      phaseProgress = raw < 0.5 ? 4 * raw * raw * raw : 1 - Math.pow(-2 * raw + 2, 3) / 2;
      isAssemble = true;
    } else if (latest > 0.65) {
      phaseProgress = 1;
      isAssemble = true;
    }

    // Add a global swirl rotation during assembly to make the convergence "swirly" rather than linear
    const globalSwirl = isAssemble ? (1 - phaseProgress) * Math.PI : 0;

    particlesRef.current.forEach(p => {
      let currentX = 0;
      let currentY = 0;
      
      if (!isAssemble) {
        currentX = p.startX * phaseProgress;
        currentY = p.startY * phaseProgress;
      } else {
        // Linear interpolation of distance
        const distProgress = phaseProgress;
        
        // Add swirling rotation to the particle as it pulls in
        const currentRadius = Math.sqrt(Math.pow(p.targetX - p.startX, 2) + Math.pow(p.targetY - p.startY, 2)) * (1 - distProgress);
        const baseAngle = Math.atan2(p.targetY - p.startY, p.targetX - p.startX);
        
        const finalAngle = baseAngle + globalSwirl + (p.angleOffset * (1 - distProgress));
        
        currentX = p.targetX - Math.cos(finalAngle) * currentRadius;
        currentY = p.targetY - Math.sin(finalAngle) * currentRadius;
      }
      
      ctx.beginPath();
      ctx.arc(cx + currentX, cy + currentY, 1.2, 0, Math.PI * 2);
      ctx.fill();
    });
  });

  return (
    <div ref={containerRef} className="relative w-full h-[500vh]">
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        
        <motion.h3 
          style={{ opacity: topTextOpacity, scale: topTextScale, y: topTextY, textShadow: "0 4px 20px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.5)" }}
          className="absolute text-3xl md:text-5xl font-medium text-white font-serif tracking-tight z-10 text-center px-4"
        >
          This is how the insurance industry manages its data.
        </motion.h3>
        
        {/* Constellation Container - gets rotated during collapse for a vortex effect */}
        <motion.div 
          style={{ rotate: constellationRotate, scale: constellationScale }}
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
        >
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="-400 -400 800 800" preserveAspectRatio="xMidYMid meet">
            {connections.map(([a, b], i) => (
              <ConnectionLine key={i} indexA={a} indexB={b} scrollYProgress={scrollYProgress} />
            ))}
          </svg>
          {nodes.map((node, i) => (
            <NodeItem key={i} label={node.label} angle={node.angle} index={i} scrollYProgress={scrollYProgress} />
          ))}
        </motion.div>

        {/* The Flash when reaching critical mass */}
        <motion.div style={{ scale: flashScale, opacity: flashOpacity }} className="absolute w-16 h-16 bg-white rounded-full blur-xl z-20 pointer-events-none" />

        {/* Particle Canvas Assembly */}
        <motion.canvas ref={canvasRef} width={1200} height={600} style={{ opacity: canvasOpacity }} className="absolute z-20 pointer-events-none max-w-full" />

        {/* Ordered Wordmark Crossfade */}
        <motion.div style={{ scale: wordmarkScale, opacity: wordmarkOpacity, filter: wordmarkBlur }} className="absolute font-serif text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white z-30 pointer-events-none">
          Syndica.
          <motion.span animate={{ opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0 w-full h-full bg-white/10 blur-3xl rounded-full pointer-events-none -z-10" />
        </motion.div>

        <motion.h3 
          style={{ opacity: bottomTextOpacity, y: bottomTextY, textShadow: "0 4px 20px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.5)" }}
          className="absolute bottom-1/4 text-2xl md:text-4xl font-medium text-white font-serif tracking-tight z-10 text-center px-4"
        >
          We build the infrastructure to replace it.
        </motion.h3>
      </div>
    </div>
  );
}
