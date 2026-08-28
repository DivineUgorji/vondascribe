"use client";

import { motion, type Variants } from "framer-motion";
import { Mic, Headphones, Newspaper, Users } from "lucide-react";
import Link from "next/link";

const useCases = [
  {
    icon: Mic,
    title: "Content creators",
    description:
      "Turn long-form videos and interviews into polished, SEO-ready blog posts in minutes instead of hours.",
  },
  {
    icon: Headphones,
    title: "Podcasters",
    description:
      "Repurpose every episode into show notes, articles, and newsletters without rewriting from scratch.",
  },
  {
    icon: Newspaper,
    title: "Journalists & researchers",
    description:
      "Convert interviews and recordings into clean, editable drafts you can fact-check and publish fast.",
  },
  {
    icon: Users,
    title: "Teams & agencies",
    description:
      "Standardize transcription → blog workflows across clients and keep everything editable and exportable.",
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const, // ← this fixes the type error
    },
  },
};

export default function UseCases() {
  return (
    <section className="relative px-6 py-9 md:py-18" id="use-cases">
      <div className="relative max-w-5xl mx-auto">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 text-[11px] font-medium text-muted-foreground bg-muted border border-border px-3 py-1.5 rounded-full tracking-[0.06em] uppercase">
            <span className="size-1.5 rounded-full bg-primary" />
            Who it’s for
          </span>

          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-foreground">
            Built for people who{" "}
            <span className="text-primary">ship content</span>
          </h2>

          <p className="mt-3 text-[15px] text-muted-foreground leading-[1.7]">
            Whether you record alone or work with a team, VondaScribe turns
            audio and video into structured, editable blog posts.
          </p>
        </div>

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2"
        >
          {useCases.map((useCase) => (
            <motion.li
              key={useCase.title}
              variants={item}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-border bg-card p-6 hover:border-border-faint transition-colors duration-200"
            >
              <div className="size-10 rounded-xl bg-muted flex items-center justify-center mb-5">
                <useCase.icon
                  className="size-5 text-foreground"
                  strokeWidth={1.75}
                />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {useCase.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {useCase.description}
              </p>
            </motion.li>
          ))}
        </motion.ul>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="#pricing"
            className="inline-flex items-center justify-center rounded-lg bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            View plans
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-lg border border-border bg-transparent text-foreground px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
          >
            Start for free
          </Link>
        </div>
      </div>
    </section>
  );
}
