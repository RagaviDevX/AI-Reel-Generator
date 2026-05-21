import { Suspense } from "react";
import { AuthForm } from "@/components/auth/auth-form";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

export const metadata = { title: "Sign up" };

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner />
        </div>
      }
    >
      <AuthForm mode="signup" />
    </Suspense>
  );
}
