"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mx-auto max-w-4xl rounded-3xl glass neon-glow p-12 sm:p-16 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-blue-600/10 pointer-events-none" />
        <div className="relative">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to create your next viral reel?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join creators who ship scroll-stopping content 10x faster. Free to
            start — no credit card required.
          </p>
          <Button variant="neon" size="lg" asChild>
            <Link href="/signup">
              Start Creating Free
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
