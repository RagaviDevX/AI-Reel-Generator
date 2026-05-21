"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const demoOutputs = [
  { label: "Viral Hook", value: "POV: You finally understood the algorithm." },
  { label: "Script", value: "[VISUAL] Face cam, energetic] Hey creators..." },
  { label: "Hashtags", value: "#reels #viral #creatortips +15 more" },
];

export function DemoSection() {
  return (
    <section id="demo" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              See AI in action
            </h2>
            <p className="text-muted-foreground mb-6">
              Enter a topic, pick your niche and platform — get a complete reel
              package in under 10 seconds. No more blank page syndrome.
            </p>
            <Button variant="neon" asChild>
              <Link href="/signup">
                <Sparkles className="h-4 w-4" />
                Try it free
              </Link>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 space-y-4"
          >
            <div className="flex gap-2 mb-4">
              <span className="text-xs px-3 py-1 rounded-full bg-violet-500/20 text-violet-300">
                Topic: Morning routine hacks
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-300">
                TikTok · Energetic
              </span>
            </div>
            {demoOutputs.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="rounded-xl bg-white/5 p-4 border border-white/10"
              >
                <p className="text-xs text-violet-400 font-medium mb-1">
                  {item.label}
                </p>
                <p className="text-sm text-foreground/90">{item.value}</p>
              </motion.div>
            ))}
            <div className="flex items-center gap-2 pt-2">
              <div className="h-2 flex-1 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.5 }}
                />
              </div>
              <span className="text-xs text-muted-foreground">Generated</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
