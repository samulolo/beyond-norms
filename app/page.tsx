import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Essence } from "@/components/sections/essence";
import { Faq } from "@/components/sections/faq";
import { Harmony } from "@/components/sections/harmony";
import { Hero } from "@/components/sections/hero";
import { Pillars } from "@/components/sections/pillars";
import { Pricing } from "@/components/sections/pricing";
import { Schedule } from "@/components/sections/schedule";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-tertiary">
      <Header />
      <Hero />
      <Essence />
      <Pillars />
      <Schedule />
      <Harmony />
      <Pricing />
      <Faq />
      <Footer />
    </div>
  );
}
