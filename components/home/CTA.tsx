"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative px-6 py-9 md:py-18" id="get-started">
      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-2xl border border-border bg-card p-8 md:p-12 text-center"
        >
          <span className="inline-flex items-center gap-2 text-[11px] font-medium text-muted-foreground bg-muted border border-border px-3 py-1.5 rounded-full tracking-[0.06em] uppercase">
            <span className="size-1.5 rounded-full bg-primary" />
            Get started
          </span>

          <h2 className="mt-5 text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-foreground max-w-xl mx-auto">
            Turn your next recording into a{" "}
            <span className="text-primary">publish-ready post</span>
          </h2>

          <p className="mt-4 text-[15px] text-muted-foreground leading-[1.7] max-w-lg mx-auto">
            Start free with no card required. Upgrade when you need more
            minutes, unlimited posts, or team features.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-foreground text-background px-6 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors w-full sm:w-auto"
            >
              Start for free
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="#pricing"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-transparent text-foreground px-6 py-3 text-sm font-medium hover:bg-muted transition-colors w-full sm:w-auto"
            >
              Compare plans
            </Link>
          </div>

          <p className="mt-6 text-[13px] text-muted-foreground">
            Free plan includes 60 minutes / month{" "}
            <span className="text-primary">* No credit card required</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
