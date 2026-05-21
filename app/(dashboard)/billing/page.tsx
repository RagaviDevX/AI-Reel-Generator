"use client";

import { Check, CreditCard } from "lucide-react";
import { PRICING_PLANS } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/cn";

export default function BillingPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
          <CreditCard className="h-8 w-8 text-violet-400" />
          Billing
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your subscription and plan
        </p>
      </div>

      <Card className="glass">
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-lg">Starter (Free)</p>
              <p className="text-sm text-muted-foreground">
                5 generations per month
              </p>
            </div>
            <Badge variant="outline">Active</Badge>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-lg font-semibold mb-4">Upgrade your plan</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {PRICING_PLANS.filter((p) => p.price > 0).map((plan) => (
            <Card
              key={plan.id}
              className={cn("glass", plan.popular && "border-violet-500/50")}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.popular && <Badge variant="neon">Popular</Badge>}
                </div>
                <p className="text-2xl font-bold">
                  ${plan.price}
                  <span className="text-sm text-muted-foreground font-normal">
                    /mo
                  </span>
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-violet-400 shrink-0" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button variant={plan.popular ? "neon" : "outline"} className="w-full" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4 text-center">
          Stripe integration coming soon. Contact support for enterprise plans.
        </p>
      </div>
    </div>
  );
}
