import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/fade-in";

export function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <FadeIn>
        <div className="mx-auto max-w-4xl rounded-3xl glass p-12 sm:p-16 text-center relative overflow-hidden gpu-layer md:neon-glow">
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
              <Link href="/signup" prefetch>
                Start Creating Free
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
