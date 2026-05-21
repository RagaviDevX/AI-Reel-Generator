"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Menu, LogOut, User, Settings, CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/utils/cn";

interface DashboardHeaderProps {
  userEmail?: string;
  userName?: string;
  avatarUrl?: string;
  onSearch?: (query: string) => void;
}

export function DashboardHeader({
  userEmail,
  userName,
  avatarUrl,
  onSearch,
}: DashboardHeaderProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const supabase = createClient();

  const initials =
    userName?.slice(0, 2).toUpperCase() ||
    userEmail?.slice(0, 2).toUpperCase() ||
    "U";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-white/10 bg-black/60 backdrop-blur-xl px-4 sm:px-6">
      <div className="lg:hidden">
        <Logo showText={false} />
      </div>
      <div className="flex-1 max-w-md hidden sm:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reels..."
            className="pl-10"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              onSearch?.(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
              <Avatar className="h-10 w-10">
                {avatarUrl && <AvatarImage src={avatarUrl} alt={userName || ""} />}
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <p className="font-medium">{userName || "Creator"}</p>
              <p className="text-xs text-muted-foreground font-normal truncate">
                {userEmail}
              </p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
                <User className="h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center gap-2 cursor-pointer">
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/billing" className="flex items-center gap-2 cursor-pointer">
                <CreditCard className="h-4 w-4" />
                Billing
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-400 focus:text-red-400 cursor-pointer"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {menuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 p-4 bg-zinc-950 border-b border-white/10">
          <Input
            placeholder="Search reels..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              onSearch?.(e.target.value);
            }}
          />
          <nav className={cn("flex flex-col gap-2 mt-4")}>
            <Link href="/settings" onClick={() => setMenuOpen(false)} className="text-sm py-2">
              Settings
            </Link>
            <Link href="/profile" onClick={() => setMenuOpen(false)} className="text-sm py-2">
              Profile
            </Link>
            <Link href="/billing" onClick={() => setMenuOpen(false)} className="text-sm py-2">
              Billing
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
