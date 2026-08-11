"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* Shared easing */
const ease = [0.22, 1, 0.36, 1] as const;

/* Animated counter hook */
function useCounter(
  target: number,
  duration: number,
  inView: boolean,
  decimals = 0,
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(
          decimals > 0
            ? parseFloat(start.toFixed(decimals))
            : Math.floor(start),
        );
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration, decimals]);

  return count;
}

/* Stat item */
function StatItem({
  value,
  suffix,
  prefix,
  label,
  delay,
  inView,
  decimals,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  delay: number;
  inView: boolean;
  decimals?: number;
}) {
  const count = useCounter(value, 1200, inView, decimals);

  const displayValue =
    decimals && decimals > 0 ? count.toFixed(decimals) : count.toLocaleString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease, delay }}
      className="flex flex-col items-center gap-2"
    >
      {/* Value */}
      <div className="flex items-baseline gap-1">
        {prefix && (
          <span className="text-lg font-semibold text-foreground">
            {prefix}
          </span>
        )}
        <span className="text-3xl font-semibold tracking-[-0.03em] text-foreground">
          {displayValue}
        </span>
        {suffix && (
          <span className="text-lg font-semibold text-muted-foreground">
            {suffix}
          </span>
        )}
      </div>

      {/* Label */}
      <span className="text-[13px] text-muted-foreground">{label}</span>
    </motion.div>
  );
}

/* Divider */
function Divider({ delay, inView }: { delay: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={inView ? { opacity: 1, scaleY: 1 } : {}}
      transition={{ duration: 0.4, ease, delay }}
      className="hidden sm:block w-px h-8 bg-border"
    />
  );
}

/* Main component */
export default function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const stats = [
    { value: 50000, suffix: "+", label: "Hours transcribed", id: 1 },
    { value: 12000, suffix: "+", label: "Active users", id: 5 },
    { value: 99.2, suffix: "%", label: "Accuracy rate", decimals: 1, id: 2 },
    {
      value: 2,
      prefix: "< ",
      suffix: " min",
      label: "Avg. processing time",
      id: 3,
    },
    { value: 4.9, suffix: "★", label: "Average rating", decimals: 1, id: 4 },
  ];

  return (
    <section
      ref={ref}
      className="relative w-full py-8 overflow-hidden bg-muted/40 border-y border-border"
    >
      {/* Animated border lines */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, ease, delay: 0.1 }}
        className="absolute top-0 left-0 right-0 h-px bg-primary/20 origin-left"
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, ease, delay: 0.2 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-primary/20 origin-right"
      />

      {/* Stats row */}
      <div className="relative max-w-5xl mx-auto px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-4">
          {stats.map((stat, i) => (
            <div key={stat.id} className="contents">
              <StatItem
                value={stat.value}
                suffix={stat.suffix}
                prefix={stat.prefix}
                label={stat.label}
                delay={0.2 + i * 0.08}
                inView={inView}
                decimals={stat.decimals}
              />
              {i < stats.length - 1 && (
                <Divider delay={0.3 + i * 0.08} inView={inView} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
