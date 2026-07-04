"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealTextProps {
  text: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  delay?: number;
}

export function RevealText({ text, tag: Tag = "h2", className, delay = 0 }: RevealTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isReduced = usePrefersReducedMotion();

  // Split text into words manually to avoid relying on external SplitText file registration issues
  const words = text.split(" ");

  useGSAP(
    () => {
      if (isReduced || !containerRef.current) return;

      const elements = containerRef.current.querySelectorAll(".reveal-word-inner");
      if (elements.length === 0) return;

      gsap.fromTo(
        elements,
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.85,
          delay,
          stagger: 0.04,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    [text, delay, isReduced],
    containerRef
  );

  if (isReduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag ref={containerRef as any} className={className}>
      <span className="sr-only">{text}</span>
      <span className="flex flex-wrap gap-x-[0.25em] gap-y-0 overflow-hidden" aria-hidden="true">
        {words.map((word, wordIdx) => (
          <span key={wordIdx} className="relative inline-block overflow-hidden py-1">
            <span className="reveal-word-inner inline-block will-change-transform">
              {word}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
