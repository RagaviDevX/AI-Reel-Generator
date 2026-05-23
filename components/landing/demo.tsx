import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/fade-in";

const demoOutputs = [
  { label: "Viral Hook", value: "POV: You finally understood the algorithm." },
  { label: "Script", value: "[VISUAL] Face cam, energetic] Hey creators..." },
  { label: "Hashtags", value: "#reels #viral #creatortips +15 more" },
];

export function DemoSection() {
  return (
    <section id="demo" className="py-24 px-4 sm:px-6 lg:px-8 content-auto">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              See AI in action
            </h2>
            <p className="text-muted-foreground mb-6">
              Enter a topic, pick your niche and platform — get a complete reel
              package in under 10 seconds.
            </p>
            <Button variant="neon" asChild>
              <Link href="/signup" prefetch>
                <Sparkles className="h-4 w-4" />
                Try it free
              </Link>
            </Button>
          </FadeIn>
          <FadeIn delay={80}>
            <div className="glass rounded-2xl p-6 space-y-4 gpu-layer">
              <div className="flex gap-2 mb-4 flex-wrap">
                <span className="text-xs px-3 py-1 rounded-full bg-violet-500/20 text-violet-300">
                  Topic: Morning routine hacks
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-300">
                  TikTok · Energetic
                </span>
              </div>
              {demoOutputs.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl bg-white/5 p-4 border border-white/10"
                >
                  <p className="text-xs text-violet-400 font-medium mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm text-foreground/90">{item.value}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
