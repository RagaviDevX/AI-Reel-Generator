import {
  Zap,
  FileText,
  Clapperboard,
  Hash,
  Camera,
  Download,
  LucideIcon,
} from "lucide-react";
import { FEATURES } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn } from "@/components/shared/fade-in";

const iconMap: Record<string, LucideIcon> = {
  Zap,
  FileText,
  Clapperboard,
  Hash,
  Camera,
  Download,
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 content-auto">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything you need to go viral
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From scroll-stopping hooks to shot-by-shot breakdowns — one AI
            workflow for professional short-form content.
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => {
            const Icon = iconMap[feature.icon] || Zap;
            return (
              <FadeIn key={feature.title} delay={i * 40}>
                <Card className="glass glass-hover h-full border-white/10 gpu-layer">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20 mb-2">
                      <Icon className="h-6 w-6 text-violet-400" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
