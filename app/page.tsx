'use client'

import { Footer } from "@/components/layout/footer";
import { Contact } from "@/components/sections/contact";
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
      <Hero />
      <Essence />
      <Pillars />
      <Schedule />
      <Harmony />
      <Pricing />
      <Faq />
      <Contact />
      <Footer />
    </div>
  );
}
