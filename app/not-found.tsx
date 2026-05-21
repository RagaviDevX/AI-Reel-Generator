import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold neon-text mb-4">404</h1>
      <p className="text-muted-foreground mb-8">Page not found</p>
      <Button variant="neon" asChild>
        <Link href="/">Go home</Link>
      </Button>
    </div>
  );
}
