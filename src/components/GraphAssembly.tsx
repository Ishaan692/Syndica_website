"use client";
import React, { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";

/*
 * A knowledge graph that builds itself on scroll.
 * Phase 1: Seed node appears
 * Phase 2: Related nodes spawn outward with animated connections
 * Phase 3: Full graph breathes, data pulses along edges
 * Phase 4: Graph scales down, "Syndica." wordmark appears
 * Phase 5: Hold state
 */

interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  spawnAt: number; // scroll progress when this node appears
  ring: number; // 0 = center, 1 = inner, 2 = outer
}

interface GraphEdge {
  from: string;
  to: string;
  spawnAt: number;
}

const NODES: GraphNode[] = [
  // Center seed
  { id: "policy", label: "Policy", x: 0, y: 0, color: "#ffffff", spawnAt: 0.04, ring: 0 },
  // Ring 1 — core entities
  { id: "client", label: "Client", x: -180, y: -120, color: "rgba(255,255,255,0.8)", spawnAt: 0.08, ring: 1 },
  { id: "broker", label: "Broker", x: 180, y: -120, color: "rgba(255,255,255,0.8)", spawnAt: 0.12, ring: 1 },
  { id: "carrier", label: "Carrier", x: 220, y: 80, color: "rgba(255,255,255,0.7)", spawnAt: 0.16, ring: 1 },
  { id: "claim", label: "Claim", x: -220, y: 80, color: "rgba(255,255,255,0.7)", spawnAt: 0.20, ring: 1 },
  // Ring 2 — extended entities
  { id: "document", label: "Document", x: 0, y: -200, color: "rgba(255,255,255,0.5)", spawnAt: 0.24, ring: 2 },
  { id: "renewal", label: "Renewal", x: -300, y: -30, color: "rgba(255,255,255,0.5)", spawnAt: 0.27, ring: 2 },
  { id: "premium", label: "Premium", x: 300, y: -30, color: "rgba(255,255,255,0.5)", spawnAt: 0.30, ring: 2 },
  { id: "coverage", label: "Coverage", x: 0, y: 200, color: "rgba(255,255,255,0.5)", spawnAt: 0.33, ring: 2 },
];

const EDGES: GraphEdge[] = [
  // Core connections from Policy
  { from: "policy", to: "client", spawnAt: 0.10 },
  { from: "policy", to: "broker", spawnAt: 0.14 },
  { from: "policy", to: "carrier", spawnAt: 0.18 },
  { from: "policy", to: "claim", spawnAt: 0.22 },
  // Extended connections
  { from: "client", to: "document", spawnAt: 0.26 },
  { from: "broker", to: "document", spawnAt: 0.26 },
  { from: "policy", to: "renewal", spawnAt: 0.28 },
  { from: "carrier", to: "premium", spawnAt: 0.31 },
  { from: "policy", to: "coverage", spawnAt: 0.34 },
  // Cross-connections for density
  { from: "client", to: "broker", spawnAt: 0.35 },
  { from: "claim", to: "coverage", spawnAt: 0.36 },
  { from: "renewal", to: "client", spawnAt: 0.37 },
  { from: "premium", to: "broker", spawnAt: 0.38 },
];

function getNode(id: string): GraphNode {
  return NODES.find((n) => n.id === id)!;
}

function AnimatedEdge({
  edge,
  scrollYProgress,
}: {
  edge: GraphEdge;
  scrollYProgress: MotionValue<number>;
}) {
  const from = getNode(edge.from);
  const to = getNode(edge.to);
  const pathLength = useTransform(
    scrollYProgress,
    [edge.spawnAt, edge.spawnAt + 0.03],
    [0, 1]
  );
  const opacity = useTransform(
    scrollYProgress,
    [edge.spawnAt, edge.spawnAt + 0.02, 0.55, 0.60],
    [0, 0.4, 0.4, 0]
  );

  return (
    <motion.line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke="rgba(255,255,255,0.25)"
      strokeWidth={1.5}
      style={{ pathLength, opacity }}
    />
  );
}

function AnimatedNode({
  node,
  scrollYProgress,
}: {
  node: GraphNode;
  scrollYProgress: MotionValue<number>;
}) {
  const scale = useTransform(
    scrollYProgress,
    [node.spawnAt - 0.01, node.spawnAt, node.spawnAt + 0.02],
    [0, 1.2, 1]
  );
  const opacity = useTransform(
    scrollYProgress,
    [node.spawnAt - 0.01, node.spawnAt, 0.55, 0.60],
    [0, 1, 1, 0]
  );

  const dotRadius = node.ring === 0 ? 8 : node.ring === 1 ? 6 : 4;

  return (
    <motion.g style={{ opacity }}>
      {/* Outer translucent ring */}
      <motion.circle
        cx={node.x}
        cy={node.y}
        r={dotRadius + 10}
        fill="transparent"
        stroke={node.color}
        strokeWidth={1}
        opacity={0.4}
        style={{ scale }}
      />
      {/* Inner Glow */}
      <motion.circle
        cx={node.x}
        cy={node.y}
        r={dotRadius + 4}
        fill={node.color}
        opacity={0.2}
        style={{ scale }}
      />
      {/* Core dot */}
      <motion.circle
        cx={node.x}
        cy={node.y}
        r={dotRadius}
        fill={node.ring === 0 ? "#ffffff" : node.color}
        style={{ scale }}
      />
      {/* Label */}
      <motion.text
        x={node.x}
        y={node.y + dotRadius + 18}
        textAnchor="middle"
        fill="rgba(255,255,255,0.7)"
        fontSize={11}
        fontFamily="var(--font-sans)"
        fontWeight={500}
        letterSpacing="0.05em"
        style={{ scale }}
      >
        {node.label.toUpperCase()}
      </motion.text>
    </motion.g>
  );
}

/* Pulse animation: dots travel along edges once the graph is complete */
function DataPulses({
  scrollYProgress,
  canvasRef,
}: {
  scrollYProgress: MotionValue<number>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}) {
  const frameRef = useRef(0);

  useEffect(() => {
    const render = () => {
      const latest = scrollYProgress.get();
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      
      if (!canvas || !ctx) {
        frameRef.current = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (latest >= 0.40 && latest <= 0.58) {
        const pulseAlpha = latest < 0.42 ? (latest - 0.40) / 0.02 : latest > 0.55 ? 1 - (latest - 0.55) / 0.03 : 1;

        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const time = Date.now() / 1000;

        EDGES.forEach((edge, i) => {
          const from = getNode(edge.from);
          const to = getNode(edge.to);
          const t = ((time * 0.4 + i * 0.3) % 1);
          const px = cx + from.x + (to.x - from.x) * t;
          const py = cy + from.y + (to.y - from.y) * t;

          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.6 * pulseAlpha})`;
          ctx.fill();
        });
      }

      frameRef.current = requestAnimationFrame(render);
    };

    frameRef.current = requestAnimationFrame(render);

    return () => cancelAnimationFrame(frameRef.current);
  }, [scrollYProgress, canvasRef]);

  return null;
}

export default function GraphAssembly() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pulseCanvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Graph container: scale down as we transition to wordmark
  const graphScale = useTransform(scrollYProgress, [0.45, 0.58], [1, 0.4]);
  const graphOpacity = useTransform(scrollYProgress, [0.55, 0.60], [1, 0]);
  const graphY = useTransform(scrollYProgress, [0.45, 0.58], [0, 80]);

  // Wordmark
  const wordmarkOpacity = useTransform(scrollYProgress, [0.58, 0.65], [0, 1]);
  const wordmarkScale = useTransform(scrollYProgress, [0.58, 0.65], [0.9, 1]);
  const wordmarkBlur = useTransform(scrollYProgress, [0.58, 0.65], ["blur(20px)", "blur(0px)"]);

  // Subtitle
  const subtitleOpacity = useTransform(scrollYProgress, [0.65, 0.72], [0, 1]);
  const subtitleY = useTransform(scrollYProgress, [0.65, 0.72], [30, 0]);

  // Background dim and blur specifically for this section
  const bgBlur = useTransform(scrollYProgress, [0, 0.15], ["blur(0px)", "blur(16px)"]);
  const bgDim = useTransform(scrollYProgress, [0, 0.15], [0, 0.6]);

  return (
    <div ref={containerRef} className="relative w-full h-[500vh] z-10">
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic dim and blur overlays to push the ColorBends background back */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ backdropFilter: bgBlur }} />
        <motion.div className="absolute inset-0 bg-black pointer-events-none" style={{ opacity: bgDim }} />
        
        {/* Subtle radial gradient backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />

        {/* The Graph */}
        <motion.div
          style={{ scale: graphScale, opacity: graphOpacity, y: graphY }}
          className="absolute flex items-center justify-center"
        >
          <svg
            viewBox="-400 -280 800 560"
            className="w-[90vw] max-w-[900px] h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Edges */}
            {EDGES.map((edge, i) => (
              <AnimatedEdge key={i} edge={edge} scrollYProgress={scrollYProgress} />
            ))}
            {/* Nodes */}
            {NODES.map((node) => (
              <AnimatedNode key={node.id} node={node} scrollYProgress={scrollYProgress} />
            ))}
          </svg>

          {/* Pulse canvas overlay */}
          <canvas
            ref={pulseCanvasRef}
            width={900}
            height={560}
            className="absolute pointer-events-none"
            style={{ width: "90vw", maxWidth: "900px" }}
          />
          <DataPulses scrollYProgress={scrollYProgress} canvasRef={pulseCanvasRef} />
        </motion.div>

        {/* Wordmark */}
        <motion.div
          style={{ opacity: wordmarkOpacity, scale: wordmarkScale, filter: wordmarkBlur }}
          className="absolute flex flex-col items-center pointer-events-none"
        >
          <h2 className="font-serif text-7xl md:text-9xl font-bold tracking-tight text-white">
            Syndica.
          </h2>
          <motion.p
            style={{ opacity: subtitleOpacity, y: subtitleY }}
            className="mt-6 text-lg md:text-2xl text-white/50 font-sans tracking-wide"
          >
            Structured data. Connected workflows.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
