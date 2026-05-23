import dynamic from "next/dynamic";
import { LandingHeader } from "@/components/landing/header";
import { HeroSection } from "@/components/landing/hero";
import { TrustedSection } from "@/components/landing/trusted";

const FeaturesSection = dynamic(
  () =>
    import("@/components/landing/features").then((m) => ({
      default: m.FeaturesSection,
    })),
  { loading: () => <SectionPlaceholder /> }
);

const DemoSection = dynamic(
  () =>
    import("@/components/landing/demo").then((m) => ({
      default: m.DemoSection,
    })),
  { loading: () => <SectionPlaceholder /> }
);

const TestimonialsSection = dynamic(
  () =>
    import("@/components/landing/testimonials").then((m) => ({
      default: m.TestimonialsSection,
    })),
  { loading: () => <SectionPlaceholder /> }
);

const PricingSection = dynamic(
  () =>
    import("@/components/landing/pricing").then((m) => ({
      default: m.PricingSection,
    })),
  { loading: () => <SectionPlaceholder /> }
);

const FAQSection = dynamic(
  () =>
    import("@/components/landing/faq").then((m) => ({
      default: m.FAQSection,
    })),
  { loading: () => <SectionPlaceholder /> }
);

const CTASection = dynamic(
  () =>
    import("@/components/landing/cta").then((m) => ({
      default: m.CTASection,
    })),
  { loading: () => <SectionPlaceholder /> }
);

const Footer = dynamic(
  () =>
    import("@/components/landing/footer").then((m) => ({
      default: m.Footer,
    }))
);

function SectionPlaceholder() {
  return <div className="min-h-[320px] w-full" aria-hidden />;
}

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <LandingHeader />
      <HeroSection />
      <TrustedSection />
      <FeaturesSection />
      <DemoSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
