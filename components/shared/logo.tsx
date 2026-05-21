import Link from "next/link";
import { Sparkles } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { cn } from "@/utils/cn";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 group", className)}>
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 shadow-lg group-hover:neon-glow transition-shadow">
        <Sparkles className="h-5 w-5 text-white" />
      </div>
      {showText && (
        <span className="font-bold text-lg tracking-tight">
          <span className="neon-text">{APP_NAME.split(" ")[0]}</span>
          {APP_NAME.includes(" ") && (
            <span className="text-foreground/80 ml-1">
              {APP_NAME.split(" ").slice(1).join(" ")}
            </span>
          )}
        </span>
      )}
    </Link>
  );
}
