"use client";

import EchonoteDot from "@/components/icons/VondaScribeDot";
import { SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";

function WaveMotif({ className }: { className?: string }) {
  const bars = [
    10, 18, 28, 16, 34, 22, 40, 14, 30, 20, 36, 12, 26, 18, 32, 15, 24,
  ];

  return (
    <div className={`flex items-end justify-center gap-1 ${className ?? ""}`}>
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="w-1 rounded-full bg-primary/50"
          style={{ height: h }}
          animate={{ scaleY: [1, 1.45, 0.75, 1.25, 1] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            delay: i * 0.07,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function SignUpPage() {
  const leftStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const leftItem = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, ease: "easeOut" as const },
    },
  };

  const rightItem = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.95, ease: "easeOut" as const },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 font-sans text-zinc-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[60px_60px]" />

      <div className="flex min-h-screen flex-col lg:flex-row">
        <div className="relative hidden flex-col items-center justify-center overflow-hidden bg-zinc-950 p-12 lg:flex lg:w-1/2 border-r border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(at_30%_20%,hsl(var(--primary)/0.25)_0%,transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(at_70%_80%,hsl(var(--primary)/0.12)_0%,transparent_50%)]" />

          <motion.div
            className="relative z-10 max-w-md text-center"
            variants={leftStagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={leftItem}
              className="mb-8 flex items-center justify-center gap-2"
            >
              <EchonoteDot className="h-14 w-14 text-primary" />
              <h1 className="text-5xl font-bold tracking-tighter text-white">
                VondaScribe
              </h1>
            </motion.div>

            <motion.h2
              variants={leftItem}
              className="mb-6 text-4xl font-semibold leading-tight tracking-tight text-white"
            >
              Turn your recordings into
              <br />
              <span className="text-primary">clear, usable text</span>
            </motion.h2>

            <motion.p
              variants={leftItem}
              className="text-lg leading-relaxed text-zinc-400"
            >
              VondaScribe uses AI to transform audio and video into structured
              transcripts you can edit, share, or publish.
            </motion.p>
          </motion.div>

          <div className="absolute top-28 right-16 h-16 w-16 rounded-full border border-primary/50" />
          <div className="absolute bottom-36 left-10 h-24 w-24 rounded-full border border-white/20" />

          <div className="absolute inset-x-0 bottom-0 flex justify-center pb-10">
            <div className="relative">
              <div className="absolute inset-0 blur-2xl bg-primary/20" />
              <WaveMotif className="relative h-12 opacity-80" />
            </div>
          </div>
        </div>

        <div className="relative flex min-h-screen flex-1 items-center justify-center px-6 sm:px-8 lg:min-h-0 lg:w-1/2 lg:px-12 bg-zinc-950">
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <div className="absolute -top-32 -right-32 h-120 w-120 rounded-[60%_40%_75%_25%] bg-primary/10 blur-[110px]" />
            <div className="absolute -bottom-20 left-4 h-80 w-[320px] rounded-[35%_70%_55%_45%] bg-primary/5 blur-[90px]" />
          </div>

          <motion.div
            className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center justify-center"
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="mb-10 px-4 pt-9 text-center md:pt-16"
              variants={rightItem}
            >
              <h2 className="mb-3 text-3xl font-semibold tracking-tight text-white">
                Create your account
              </h2>
              <p className="text-[17px] text-zinc-400">
                Start transcribing your audio and video into structured,
                ready-to-use text.
              </p>
            </motion.div>

            <motion.div variants={rightItem} className="px-1 w-full">
              <SignUp
                appearance={{
                  baseTheme: undefined,
                  elements: {
                    rootBox: "w-full",
                    card: `
                      bg-zinc-900/90 backdrop-blur-2xl
                      shadow-2xl shadow-black/40
                      border border-white/10
                      rounded-2xl
                      overflow-hidden
                    `,
                    cardBox: "shadow-none",
                    headerTitle: `
                      text-white
                      font-semibold
                      tracking-tight
                      text-2xl
                    `,
                    headerSubtitle: "text-zinc-400 text-base",
                    socialButtonsBlockButton: `
                      border border-white/10
                      bg-zinc-900
                      hover:bg-zinc-800
                      text-zinc-100
                      rounded-xl
                      py-3
                      transition-colors
                    `,
                    socialButtonsBlockButtonText: "text-zinc-100 font-medium",
                    dividerLine: "bg-white/10",
                    dividerText: "text-zinc-500",
                    formFieldLabel: "text-zinc-300",
                    formFieldInput: `
                      bg-zinc-950
                      border border-white/10
                      focus:border-primary
                      focus:ring-2 focus:ring-primary/30
                      rounded-xl
                      py-3.5
                      text-zinc-100
                      font-medium
                      placeholder:text-zinc-500
                      transition-all
                    `,
                    formButtonPrimary: `
                    !bg-[#e8e8e8]
                    !text-[#0c0c0c]
                    hover:!bg-[#cfcfcf]
                    hover:!text-[#0c0c0c]
                    active:scale-[0.985]
                    font-semibold
                    tracking-wide
                    rounded-lg
                    py-3.5
                    text-base
                    shadow-lg 
                    shadow-black/30
                    transition-all 
                    duration-200
                    `,

                    footerActionLink: `
                      text-primary
                      hover:text-primary/80
                      font-medium
                    `,
                    footerActionText: "text-zinc-500",
                    identityPreviewText: "text-zinc-300",
                    identityPreviewEditButton: "text-primary",
                  },
                  layout: {
                    socialButtonsVariant: "blockButton",
                  },
                  variables: {
                    colorBackground: "#09090b",
                    colorInputBackground: "#09090b",
                    colorInputText: "#f4f4f5",
                    colorText: "#f4f4f5",
                    colorTextSecondary: "#a1a1aa",
                    colorPrimary: "#e8e8e8",
                    borderRadius: "0.4rem",
                  },
                }}
              />
            </motion.div>

            <motion.p
              className="mt-8 px-4 text-center font-mono text-[11px] uppercase tracking-[0.08em] text-zinc-500"
              variants={rightItem}
            >
              Protected by Clerk · VondaScribe © {new Date().getFullYear()}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
