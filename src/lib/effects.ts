import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TRACKS, type TrackState } from "@/components/ArtStage";

gsap.registerPlugin(ScrollTrigger);

/**
 * Tween ArtStage CSS variables to a target track state
 */
export function tweenArtStage(trackKey: string, duration = 1.4) {
  const stage = document.getElementById("art-stage");
  if (!stage) return;
  const target = TRACKS[trackKey];
  if (!target) return;

  // Extract numeric values for tweens
  const targetAxNum = parseFloat(target.ax);
  const targetAyNum = parseFloat(target.ay);

  const currentAx = parseFloat(stage.style.getPropertyValue("--ax")) || 50;
  const currentAy = parseFloat(stage.style.getPropertyValue("--ay")) || 34;
  const currentAs = parseFloat(stage.style.getPropertyValue("--as")) || 1;
  const currentAr = parseFloat(stage.style.getPropertyValue("--ar")) || 0;
  const currentAi = parseFloat(stage.style.getPropertyValue("--ai")) || 0.9;
  const currentAspec = parseFloat(stage.style.getPropertyValue("--aspec")) || 0.55;
  const currentAhue = parseFloat(stage.style.getPropertyValue("--ahue")) || 0;

  const proxy = {
    ax: currentAx,
    ay: currentAy,
    as: currentAs,
    ar: currentAr,
    ai: currentAi,
    aspec: currentAspec,
    ahue: currentAhue,
  };

  gsap.to(proxy, {
    ax: targetAxNum,
    ay: targetAyNum,
    as: target.as,
    ar: target.ar,
    ai: target.ai,
    aspec: target.aspec,
    ahue: target.ahue,
    duration,
    ease: "power2.inOut",
    overwrite: "auto",
    onUpdate: () => {
      stage.style.setProperty("--ax", `${proxy.ax}vw`);
      stage.style.setProperty("--ay", `${proxy.ay}vh`);
      stage.style.setProperty("--as", String(proxy.as));
      stage.style.setProperty("--ar", `${proxy.ar}deg`);
      stage.style.setProperty("--ai", String(proxy.ai));
      stage.style.setProperty("--aspec", String(proxy.aspec));
      stage.style.setProperty("--ahue", `${proxy.ahue}deg`);
    },
  });
}

/**
 * Line Reveal effect using GSAP (Part E2)
 * Failsafe: Text starts in normal DOM flow and is only transformed client-side.
 */
export function applyLineReveal(element: HTMLElement, delay = 0) {
  const lines = element.querySelectorAll<HTMLElement>(".reveal-line");
  if (lines.length === 0) return;

  gsap.set(lines, { yPercent: 105 });

  ScrollTrigger.create({
    trigger: element,
    start: "top 82%",
    once: true,
    onEnter: () => {
      gsap.to(lines, {
        yPercent: 0,
        duration: 0.9,
        stagger: 0.08,
        delay,
        ease: "expo.out",
      });
    },
  });
}

/**
 * Rule Draw effect (Part E2)
 */
export function applyRuleDraw(ruleElement: HTMLElement) {
  gsap.set(ruleElement, { scaleX: 0, transformOrigin: "left" });

  ScrollTrigger.create({
    trigger: ruleElement,
    start: "top 90%",
    once: true,
    onEnter: () => {
      gsap.to(ruleElement, {
        scaleX: 1,
        duration: 1.2,
        ease: "power2.inOut",
      });
    },
  });
}

/**
 * Word Light effect (Part E2)
 * Scrubbed opacity from 0.18 to 1 word by word
 */
export function applyWordLight(container: HTMLElement) {
  const text = container.innerText;
  const words = text.split(/\s+/);
  container.innerHTML = "";

  const spans = words.map((w) => {
    const span = document.createElement("span");
    span.textContent = w + " ";
    span.style.opacity = "0.18";
    span.style.display = "inline-block";
    container.appendChild(span);
    return span;
  });

  gsap.to(spans, {
    opacity: 1,
    stagger: 0.05,
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: "top 80%",
      end: "bottom 45%",
      scrub: true,
    },
  });
}
