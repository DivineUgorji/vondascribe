"use client";

import EchonoteDot from "@/components/icons/EchonoteDot";
import { SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";

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

  // Right side smooth simultaneous fade-up
  const rightItem = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.95, ease: "easeOut" as const },
    },
  };

  return (
    <div className="min-h-screen bg-teal-surface font-sans overflow-hidden relative">
      {/* Global subtle texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#5DCAA520_1px,transparent_1px)] bg-size-[60px_60px] pointer-events-none" />

      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Branding Panel – hidden on mobile */}
        <div className="hidden lg:flex lg:w-1/2 bg-abyss relative overflow-hidden flex-col justify-center items-center p-12">
          <div className="absolute inset-0 bg-[radial-gradient(at_30%_20%,var(--color-teal)_0%,transparent_50%)] opacity-20" />

          <motion.div
            className="relative z-10 text-center max-w-md"
            variants={leftStagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={leftItem}
              className="flex items-center justify-center gap-2 mb-8"
            >
              <EchonoteDot className="w-16 h-16" />
              <h1 className="text-5xl font-bold text-white tracking-tighter">
                EchoNote
              </h1>
            </motion.div>

            <motion.h2
              variants={leftItem}
              className="text-4xl font-semibold text-white leading-tight tracking-tight mb-6 font-sans"
            >
              Turn your recordings into
              <br />
              <span className="text-teal-light">clear, usable text</span>
            </motion.h2>

            <motion.p
              variants={leftItem}
              className="text-teal-100/80 text-lg leading-relaxed"
            >
              EchoNote uses AI to transform audio and video into structured
              transcripts you can edit, share, or publish.
            </motion.p>
          </motion.div>

          {/* Left floating orbs */}
          <div className="absolute bottom-12 left-12 w-24 h-24 border border-teal-400/20 rounded-full" />
          <div className="absolute top-32 right-20 w-16 h-16 border border-teal-300/30 rounded-full" />
        </div>

        {/* Right Sign-in Panel  */}
        {/* <div className="flex-1 lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 relative min-h-screen lg:min-h-0"> */}
        <div className="flex-1 lg:w-1/2 flex items-center justify-center min-h-screen lg:min-h-0 px-6 sm:px-8 lg:px-12 relative">
          {/* Decorative elements  */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {/* Large organic blobs */}
            <div className="absolute -top-32 -right-32 w-120 h-120 lg:w-140 lg:h-140 bg-teal-light rounded-[60%_40%_75%_25%] blur-[110px] opacity-10" />
            <div className="absolute -bottom-20 left-4 w-[320px] h-80 lg:w-105 lg:h-105 bg-teal rounded-[35%_70%_55%_45%] blur-[90px] opacity-8" />
          </div>

          {/* Main content */}
          <motion.div
            className="w-full max-w-105 mx-auto flex flex-col items-center justify-center relative z-10"
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="pt-9 md:pt-18 mb-10 text-center px-4"
              variants={rightItem}
            >
              <h2 className="text-3xl font-semibold text-abyss tracking-tight mb-3">
                Create your account
              </h2>
              <p className="text-abyss/70 text-[17px]">
                Start transcribing your audio and video into structured,
                ready-to-use text.
              </p>
            </motion.div>

            {/* Clerk SignIn Form */}
            <motion.div variants={rightItem} className="px-1">
              <SignUp
                appearance={{
                  elements: {
                    card: `
                      bg-white/95 backdrop-blur-2xl
                      shadow-2xl shadow-teal-950/10
                      border border-[var(--color-teal-mist)]
                      rounded-3xl
                      overflow-hidden
                    `,
                    cardBox: "shadow-none",

                    headerTitle: `
                      text-[var(--color-abyss)]
                      font-semibold
                      tracking-tight
                      text-2xl
                      font-['Plus_Jakarta_Sans']
                    `,
                    headerSubtitle: "text-[var(--color-abyss)]/60 text-base",

                    formFieldInput: `
                      border-[var(--color-teal-mist)]
                      focus:border-[var(--color-teal)]
                      focus:ring-2 focus:ring-[var(--color-teal)]/30
                      rounded-2xl
                      py-3.5
                      text-[var(--color-abyss)]
                      font-medium
                      placeholder:text-[var(--color-abyss)]/40
                      transition-all
                    `,

                    formButtonPrimary: `
                      bg-[var(--color-teal)]
                      hover:bg-[var(--color-teal)]/95
                      active:scale-[0.985]
                      text-white
                      font-semibold
                      tracking-wide
                      rounded-2xl
                      py-3.5
                      text-base
                      shadow-lg shadow-teal-600/30
                      transition-all duration-200
                    `,

                    socialButtonsBlockButton: `
                      border border-[var(--color-teal-mist)]
                      hover:bg-[var(--color-teal-surface)]
                      rounded-2xl
                      py-3
                      transition-colors
                    `,

                    footerActionLink: `
                      text-[var(--color-teal)]
                      hover:text-[var(--color-teal-light)]
                      font-medium
                    `,

                    dividerLine: "bg-[var(--color-teal-mist)]",
                    dividerText: "text-[var(--color-abyss)]/50",
                  },
                  layout: {
                    socialButtonsVariant: "blockButton",
                  },
                }}
              />
            </motion.div>

            <motion.p
              className="text-center mt-8 text-xs text-abyss/50 tracking-wide px-4"
              variants={rightItem}
            >
              Protected by Clerk • EchoNote © {new Date().getFullYear()}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
