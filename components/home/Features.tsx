"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { features } from "@/lib/content";

/* Shared easing */
const ease = [0.22, 1, 0.36, 1] as const;

function FeatureCard({
  icon: Icon,
  title,
  description,
  delay,
  inView,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease, delay }}
      className="group relative bg-card border border-border rounded-2xl p-7 flex flex-col gap-5 overflow-hidden
        hover:border-border-faint hover:shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition-all duration-300"
    >
      <div
        className="relative size-11 rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground
        group-hover:text-foreground transition-colors duration-300"
      >
        <Icon className="size-4.5" strokeWidth={1.8} />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-[15px] font-semibold text-foreground tracking-[-0.01em]">
          {title}
        </h3>
        <p className="text-[13px] text-muted-foreground leading-[1.7] m-0">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative w-full py-24 px-6 overflow-hidden">
      <div className="relative max-w-5xl mx-auto">
        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0 }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-medium text-muted-foreground bg-muted border border-border px-3 py-1.5 rounded-full tracking-[0.06em] uppercase">
              <span className="size-1.5 rounded-full bg-primary" />
              Features
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.08 }}
            className="text-3xl md:text-4xl font-semibold leading-[1.2] tracking-[-0.03em] text-foreground max-w-lg mb-4"
          >
            Everything you need to go from{" "}
            <span className="text-primary">audio to article</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.14 }}
            className="text-[15px] text-muted-foreground max-w-md leading-[1.7] m-0"
          >
            EchoNote is built for creators, journalists, podcasters, and teams
            who think out loud and write with precision.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={0.18 + i * 0.08}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
