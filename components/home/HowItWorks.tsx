"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { HowItWorksSteps as steps } from "@/lib/content";

/* Shared easing */
const ease = [0.22, 1, 0.36, 1] as const;

/* Connector line between steps */
function Connector({ delay, inView }: { delay: number; inView: boolean }) {
  return (
    <div className="hidden lg:flex flex-1 items-center px-2 -mt-8">
      <div className="relative w-full h-px bg-border overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease, delay }}
          className="absolute inset-0 bg-border origin-left"
        />
        <motion.div
          initial={{ x: "-100%" }}
          animate={inView ? { x: "100%" } : {}}
          transition={{ duration: 1.2, ease, delay: delay + 0.2 }}
          className="absolute top-1/2 -translate-y-1/2 size-1.5 rounded-full bg-muted-foreground"
        />
      </div>
      <div className="size-1.5 border-t border-r border-border rotate-45 -ml-1 shrink-0" />
    </div>
  );
}

/* Step card */
function StepCard({
  icon: Icon,
  step,
  title,
  description,
  detail,
  delay,
  inView,
}: {
  icon: React.ElementType;
  step: string;
  title: string;
  description: string;
  detail: string;
  delay: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease, delay }}
      className="group relative flex flex-col items-center text-center lg:items-start lg:text-left w-full lg:max-w-70"
    >
      {/* Step number — large watermark */}
      <div className="absolute -top-4 -left-2 text-[80px] font-bold text-foreground/5 leading-none select-none hidden lg:block">
        {step}
      </div>

      <div className="relative mb-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, ease, delay: delay + 0.1 }}
          className="size-16 rounded-2xl bg-muted border border-border flex items-center justify-center
            group-hover:border-border-faint transition-all duration-300"
        >
          <Icon
            className="size-6 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
            strokeWidth={1.6}
          />
        </motion.div>

        <div className="absolute -top-2 -right-2 size-5 rounded-full bg-primary flex items-center justify-center">
          <span className="text-[9px] font-bold text-primary-foreground">
            {step.replace("0", "")}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <h3 className="text-[17px] font-semibold text-foreground tracking-[-0.02em]">
          {title}
        </h3>
        <p className="text-[13px] text-muted-foreground leading-[1.75] m-0 max-w-60">
          {description}
        </p>

        <div className="mt-1 inline-flex self-center lg:self-start">
          <span className="text-[11px] font-medium text-muted-foreground bg-muted border border-border px-3 py-1 rounded-full">
            {detail}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative w-full py-9 md:py-18 px-6 overflow-hidden"
    >
      <div className="relative max-w-5xl mx-auto">
        <div className="mb-20 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0 }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-medium text-muted-foreground bg-muted border border-border px-3 py-1.5 rounded-full tracking-[0.06em] uppercase">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              How it works
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.08 }}
            className="text-3xl md:text-4xl font-semibold leading-[1.2] tracking-[-0.03em] text-foreground max-w-lg mb-4"
          >
            Three steps from{" "}
            <span className="text-primary">recording to published</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.14 }}
            className="text-[15px] text-muted-foreground max-w-md leading-[1.7] m-0"
          >
            No setup. No learning curve. Just drop your file and let EchoNote
            handle the rest.
          </motion.p>
        </div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
            className="relative bg-card border border-border rounded-3xl px-10 py-14 overflow-hidden"
          >
            <div className="relative flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-0">
              {steps.map((step, i) => (
                <div key={step.step} className="contents">
                  <StepCard
                    icon={step.icon}
                    step={step.step}
                    title={step.title}
                    description={step.description}
                    detail={step.detail}
                    delay={0.25 + i * 0.12}
                    inView={inView}
                  />
                  {i < steps.length - 1 && (
                    <Connector delay={0.45 + i * 0.12} inView={inView} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.7 }}
            className="mt-8 flex justify-center"
          >
            <p className="text-[13px] text-muted-foreground">
              Ready to try it?{" "}
              <a
                href="#"
                className="text-primary font-medium underline-offset-4 hover:underline transition-all"
              >
                Start for free — no credit card required.
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
