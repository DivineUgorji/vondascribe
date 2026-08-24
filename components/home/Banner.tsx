"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoveRight, Play, Mic, FileText, Star } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import heroImg from "@/app/images/echonote-hero-4.png";

/* Shared easing  */
const ease = [0.22, 1, 0.36, 1] as const;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease, delay },
  } as const;
}

function FloatingPill({
  icon,
  iconClassName,
  label,
  value,
  className,
  delay,
}: {
  icon: React.ReactNode;
  iconClassName?: string;
  label: string;
  value: string;
  className?: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay }}
      className={`absolute z-10 flex items-center gap-2.5 bg-card/95 backdrop-blur-sm
        border border-border rounded-2xl px-4 py-2.5
        shadow-[0_8px_28px_rgba(0,0,0,0.4)] ${className}`}
    >
      <div
        className={`size-9 rounded-xl flex items-center justify-center shrink-0 ${
          iconClassName ?? "bg-muted text-foreground"
        }`}
      >
        {icon}
      </div>
      <div className="text-left">
        <p className="eyebrow leading-none mb-1">{label}</p>
        <p className="text-[14px] font-semibold text-foreground leading-none">
          {value}
        </p>
      </div>
    </motion.div>
  );
}

/*  Animated waveform  */
// function Waveform({ className }: { className?: string }) {
//   const bars = [10, 20, 32, 18, 28, 40, 22, 36, 14, 30, 42, 24, 16, 34, 26];
//   return (
//     <div className={`flex items-center gap-0.75 ${className}`}>
//       {bars.map((h, i) => (
//         <motion.span
//           key={i}
//           className="block w-0.75 rounded-full bg-foreground/70"
//           style={{ height: h }}
//           animate={{ scaleY: [1, 1.5, 0.7, 1.3, 1] }}
//           transition={{
//             duration: 1.6,
//             repeat: Infinity,
//             delay: i * 0.08,
//             ease: "easeInOut",
//           }}
//         />
//       ))}
//     </div>
//   );
// }

export default function Banner() {
  return (
    <section className="relative w-full overflow-hidden bg-background px-6 py-14 md:py-20">
      {/* Background */}
      <div className="pointer-events-none absolute top-0 right-0 w-150 h-100 rounded-full bg-primary/8 blur-[100px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(rgba(216,220,232,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center">
        <div className="flex flex-col items-start text-left order-1">
          <motion.div {...fadeUp(0)} className="flex items-center gap-2.5 mb-7">
            <span className="size-2 rounded-full bg-primary inline-block animate-pulse shrink-0" />
            <Badge
              variant="outline"
              className="px-4 py-2 rounded-full text-[13px] font-medium text-foreground border-border bg-transparent"
            >
              AI transcription — live
            </Badge>
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            className="font-sans font-semibold text-4xl md:text-5xl xl:text-6xl leading-[1.1] tracking-[-0.04em] text-foreground mb-5"
          >
            Speak. Transcribe.
            <br />
            <span className="relative inline-block">
              Publish.
              <motion.span
                className="absolute -bottom-1 left-0 h-0.75 w-full rounded-full bg-primary"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, ease, delay: 0.5 }}
                style={{ originX: 0 }}
              />
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="text-base md:text-lg leading-[1.7] text-muted-foreground max-w-110 mb-9"
          >
            Upload any video or audio file and EchoNote transcribes it
            instantly, turning it into clean, publish-ready text or a full blog
            post — no manual editing required.
          </motion.p>

          <motion.div
            {...fadeUp(0.3)}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-10"
          >
            <Button
              asChild
              size="lg"
              className="bg-foreground hover:bg-foreground/90 text-background font-medium rounded-lg px-7 py-5 text-[15px] gap-2 transition-colors duration-200"
            >
              <a href="#pricing">
                Get started
                <MoveRight className="size-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-lg px-7 py-5 text-[15px] font-medium border-border text-foreground hover:bg-accent hover:border-border transition-colors duration-200 gap-2"
            >
              <a href="#social-proof">
                <Play className="size-3.5 fill-current" />
                See how it works
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {/* <Waveform /> */}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.4 }}
          className="relative order-2 w-full"
        >
          <div className="rounded-2xl border border-border overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.45)] bg-card">
            <div className="bg-muted border-b border-border px-4 py-3 flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-red-400" />
              <span className="size-2.5 rounded-full bg-yellow-400" />
              <span className="size-2.5 rounded-full bg-green-400" />
              <span className="ml-3 eyebrow normal-case">
                vondascribe.app — workspace
              </span>
            </div>

            <Image
              src={heroImg}
              alt="EchoNote app interface showing a user recording a transcription session"
              width={800}
              height={640}
              className="w-full h-auto object-cover object-top"
              priority
              draggable={false}
            />
          </div>

          <FloatingPill
            icon={<Mic className="size-4" />}
            label="Processing"
            value="68% complete"
            className="-left-4 md:-left-8 bottom-20"
            delay={0.9}
          />
          <FloatingPill
            icon={<Star className="size-4 fill-current" />}
            iconClassName="bg-accent text-primary"
            label="Accuracy"
            value="99.2%"
            className="-right-4 md:-right-6 top-1/2 -translate-y-1/2"
            delay={1.0}
          />
          <FloatingPill
            icon={<FileText className="size-4" />}
            label="Words"
            value="2,314"
            className="-left-4 md:-left-6 top-12"
            delay={1.1}
          />
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-background to-transparent" />
    </section>
  );
}
