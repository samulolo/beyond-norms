import { eventsPlans } from "@/data/plans";
import {
  dinnerShowTime,
  eventDates,
  soulSpeedDatingTime,
  type EventDateOption,
} from "@/utils/constant/const";
import { isPastEventDate } from "@/utils/event-dates";

// Para anunciar uma data nova, basta acrescentá-la a `eventDates` em
// utils/constant/const.ts — é dessa lista que o checkout também lê, por
// isso a data fica logo reservável. Aqui só se acrescentam detalhes
// específicos de um evento (chave = id da data); o que não for definido
// usa os valores por omissão abaixo.
type UpcomingEventDetails = {
  title?: string;
  venue?: string;
  description?: string;
};

const eventDetails: Record<string, UpcomingEventDetails> = {
  // "2026-12-05": {
  //   title: "Winter Edition",
  //   description: "A festive edition of our signature evening.",
  // },
};

const defaults = {
  title: "Soul Speed Dating & Dinner Show",
  venue: "Rooftop Ferroviário, Lisbon",
  description:
    "Guided conversations to meet inspiring people, followed by an intimate dinner show with live surprise artists.",
};

export type UpcomingEvent = EventDateOption & {
  title: string;
  venue: string;
  description: string;
  schedule: { label: string; time: string }[];
  price: string;
};

export function getUpcomingEvents(): UpcomingEvent[] {
  return eventDates
    .filter((date) => !isPastEventDate(date.id))
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((date) => ({
      ...date,
      ...defaults,
      ...eventDetails[date.id],
      schedule: [
        { label: "Soul Speed Dating", time: soulSpeedDatingTime },
        { label: "Dinner Show & Surprise Artists", time: dinnerShowTime },
      ],
      price: eventsPlans[0]?.price ?? "",
    }));
}
