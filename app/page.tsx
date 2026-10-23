import { getUpcomingEvents } from "@/data/upcoming-events";
import { Footer } from "@/components/layout/footer";
import { Contact } from "@/components/sections/contact";
import { Essence } from "@/components/sections/essence";
import { Faq } from "@/components/sections/faq";
import { AtmosphereGallery } from "@/components/sections/atmosphere-gallery";
import { Harmony } from "@/components/sections/harmony";
import { Hero } from "@/components/sections/hero";
import { Newsletter } from "@/components/sections/newsletter";
import { Pillars } from "@/components/sections/pillars";
import { Pricing } from "@/components/sections/pricing";
import { Purpose } from "@/components/sections/purpose";
import { Schedule } from "@/components/sections/schedule";

// Regenera no máximo de hora a hora, para a data do próximo evento no hero
// mudar sozinha quando um evento passa (sem precisar de novo deploy).
export const revalidate = 3600;

export default function Home() {
  const nextEvent = getUpcomingEvents()[0];

  return (
    <div className="flex flex-1 flex-col bg-tertiary">
      <Hero nextEventLabel={nextEvent?.full} />
      <Purpose />
      <Essence />
      <Pillars />
      <Schedule />
      <AtmosphereGallery />
      <Harmony />
      <Pricing />
      <Faq />
      <Newsletter />
      <Contact />
      <Footer />
    </div>
  );
}
