"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

const faqs = [
  {
    question: "What file types does VondaScribe support?",
    answer:
      "You can upload common audio and video formats (MP3, WAV, M4A, MP4, MOV, and more). We handle the transcription and turn it into a structured blog draft you can edit.",
  },
  {
    question: "How accurate is the transcription?",
    answer:
      "We use modern speech models optimized for clarity. Accuracy depends on audio quality, accents, and background noise. You can always edit the transcript and the generated blog post before exporting.",
  },
  {
    question: "Can I edit the generated blog post?",
    answer:
      "Yes. Every output opens in an editor where you can rewrite sections, adjust headings, add context, and export when you’re ready. Nothing is locked.",
  },
  {
    question: "What’s included in the Free plan?",
    answer:
      "The Free plan gives you a limited number of uploads, 60 minutes of processing per month, transcript export, and 3 blog post generations so you can try the full workflow risk-free.",
  },
  {
    question: "How does billing work?",
    answer:
      "Plans are billed monthly. You can upgrade, downgrade, or cancel at any time. The Pro plan ($25) is the most popular for regular creators; Team ($75) is for agencies and multi-user needs.",
  },
  {
    question: "Is my audio and content private?",
    answer:
      "Files are processed securely and are not used to train public models. You control what you keep, edit, and export. See our privacy policy for full details.",
  },
];

export default function FAQ() {
  return (
    <section className="relative px-6 py-9 md:py-18 flex items-center" id="faq">
      <div className="relative max-w-5xl mx-auto">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 text-[11px] font-medium text-muted-foreground bg-muted border border-border px-3 py-1.5 rounded-full tracking-[0.06em] uppercase">
            <span className="size-1.5 rounded-full bg-primary" />
            FAQ
          </span>

          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-foreground">
            Common questions
          </h2>

          <p className="mt-3 text-[15px] text-muted-foreground leading-[1.7]">
            Everything you need to know before you start. Still stuck? Reach out
            anytime.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: "easeOut" as const }}
          className="mt-12 w-full"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-border"
              >
                <AccordionTrigger className="text-left text-[15px] font-medium text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5 max-w-3xl">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <p className="mt-10 text-sm text-muted-foreground">
          Still have questions?{" "}
          <Link
            href="/contact"
            className="text-foreground underline-offset-4 hover:underline"
          >
            Contact us
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
