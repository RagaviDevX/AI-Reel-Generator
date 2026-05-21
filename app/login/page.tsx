import { Suspense } from "react";
import { AuthForm } from "@/components/auth/auth-form";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

export const metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner />
        </div>
      }
    >
      <AuthForm mode="login" />
    </Suspense>
  );
}
