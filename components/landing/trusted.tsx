import { TRUSTED_CREATORS } from "@/lib/constants";

export function TrustedSection() {
  return (
    <section className="py-12 border-y border-white/5 content-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-muted-foreground mb-8">
          Trusted by creators and agencies worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {TRUSTED_CREATORS.map((name) => (
            <span
              key={name}
              className="text-lg sm:text-xl font-semibold text-white/20 hover:text-white/40 transition-colors duration-200"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
