import { FAQ_ITEMS } from "@/lib/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeIn } from "@/components/shared/fade-in";

export function FAQSection() {
  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 content-auto">
      <div className="mx-auto max-w-3xl">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Frequently asked questions
          </h2>
        </FadeIn>
        <FadeIn delay={60}>
          <div className="glass rounded-2xl px-6 gpu-layer">
            <Accordion type="single" collapsible className="w-full">
              {FAQ_ITEMS.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
