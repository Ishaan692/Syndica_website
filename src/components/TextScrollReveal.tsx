"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Fragment, useRef } from "react";

const START_OPACITY = 0.15;
const SPREAD = 0.8;
const WORD_DURATION = 0.2;

interface WordProgressRange {
  start: number;
  end: number;
}

function getWordProgressRange(
  index: number,
  count: number
): WordProgressRange {
  const start = count <= 1 ? 0 : (index / (count - 1)) * SPREAD;
  return {
    start,
    end: Math.min(1, start + WORD_DURATION),
  };
}

function getWordOpacity(
  progress: number,
  { start, end }: WordProgressRange,
  startOpacity = START_OPACITY
): number {
  if (progress <= start) return startOpacity;
  if (progress >= end) return 1;
  const wordProgress = (progress - start) / (end - start);
  return startOpacity + (1 - startOpacity) * wordProgress;
}

function Word({
  children,
  progress,
  index,
  count,
}: {
  children: string;
  progress: MotionValue<number>;
  index: number;
  count: number;
}) {
  const range = getWordProgressRange(index, count);
  const opacity = useTransform(progress, (latest) =>
    getWordOpacity(latest, range)
  );

  return (
    <motion.span aria-hidden="true" style={{ opacity }}>
      {children}
    </motion.span>
  );
}

interface TextScrollRevealProps {
  statement: string;
  kicker?: string;
}

export default function TextScrollReveal({
  statement,
  kicker = "Our thesis",
}: TextScrollRevealProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const words = statement.split(" ");

  const progressScaleY = useTransform(scrollYProgress, (v) => v);

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-[220vh] overflow-x-clip text-white relative z-10"
    >
      <div className="sticky top-0 w-full min-h-screen flex items-center overflow-hidden px-6 md:px-12 py-16">
        <div className="w-full max-w-5xl mx-auto grid grid-cols-[1px_minmax(0,1fr)] items-start gap-10 md:gap-10">
          {/* Progress bar */}
          <div
            className="relative w-px h-28 overflow-hidden bg-white/10 hidden md:block"
            aria-hidden="true"
          >
            <motion.span
              className="absolute inset-0 block bg-white origin-top"
              style={{ scaleY: progressScaleY }}
            />
          </div>

          {/* Content */}
          <div className="max-w-[900px]">
            <p className="mb-10 text-white/30 font-mono text-[11px] font-semibold tracking-[0.16em] uppercase leading-none">
              {kicker}
            </p>
            <h2
              className="font-sans text-[clamp(36px,5.4vw,56px)] font-bold tracking-[-0.045em] leading-[1.08] text-white max-w-[26ch]"
              style={{ textWrap: "balance" } as React.CSSProperties}
              aria-label={statement}
            >
              {words.map((word, index) => (
                <Fragment key={`${word}-${index}`}>
                  <Word
                    progress={scrollYProgress}
                    index={index}
                    count={words.length}
                  >
                    {word}
                  </Word>
                  {index < words.length - 1 ? " " : null}
                </Fragment>
              ))}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
