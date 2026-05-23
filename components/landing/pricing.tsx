import Link from "next/link";
import { Check } from "lucide-react";
import { PRICING_PLANS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/shared/fade-in";
import { cn } from "@/utils/cn";

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 content-auto">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-muted-foreground">
            Start free. Upgrade when you&apos;re ready to scale.
          </p>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {PRICING_PLANS.map((plan, i) => (
            <FadeIn key={plan.id} delay={i * 60}>
              <Card
                className={cn(
                  "glass h-full relative gpu-layer",
                  plan.popular && "border-violet-500/50 md:neon-glow"
                )}
              >
                {plan.popular && (
                  <Badge
                    variant="neon"
                    className="absolute -top-3 left-1/2 -translate-x-1/2"
                  >
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center pt-8">
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/{plan.interval}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.popular ? "neon" : "outline"}
                    className="w-full"
                    asChild
                  >
                    <Link href="/signup" prefetch>
                      {plan.price === 0 ? "Get Started" : "Upgrade"}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
