"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  Bookmark,
  TrendingUp,
  BarChart3,
  Settings,
  User,
  CreditCard,
  LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { NAV_ITEMS, SETTINGS_NAV } from "@/lib/constants";
import { cn } from "@/utils/cn";
import { Separator } from "@/components/ui/separator";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Sparkles,
  Bookmark,
  TrendingUp,
  BarChart3,
  Settings,
  User,
  CreditCard,
};

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-white/10 bg-black/40 backdrop-blur-xl h-screen sticky top-0">
      <div className="p-6">
        <Logo />
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.icon] || LayoutDashboard;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                active
                  ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
        <Separator className="my-4" />
        {SETTINGS_NAV.map((item) => {
          const Icon = iconMap[item.icon] || Settings;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                active
                  ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
