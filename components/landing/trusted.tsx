"use client";

import { motion } from "framer-motion";
import { TRUSTED_CREATORS } from "@/lib/constants";

export function TrustedSection() {
  return (
    <section className="py-12 border-y border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-muted-foreground mb-8">
          Trusted by creators and agencies worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {TRUSTED_CREATORS.map((name, i) => (
            <motion.span
              key={name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="text-lg sm:text-xl font-semibold text-white/20 hover:text-white/40 transition-colors"
            >
              {name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
