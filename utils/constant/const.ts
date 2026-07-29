


export const eventYear : number = 2026

export const organizerName = "BeyondNorms"
export const eventAddress = "Rua dos Lusíadas, nº 4 A, 1300-370 Lisboa, Portugal"
export const contactPhoneDisplay = "+351 933 820 240"
export const contactPhoneHref = "+351933820240"
export const contactEmail = process.env.NEXT_PUBLIC_EMAIL_CONTACT ?? "contact@beyondnorms.net"
export const instagramHandle = "bn_beyondnorms"
export const instagramUrl = `https://instagram.com/${instagramHandle}`

export type EventDateOption = {
  id: string;
  day: string;
  month: string;
  label: string;
  full: string;
};

export const eventDates: EventDateOption[] = [
  {
    id: "2026-08-20",
    day: "20",
    month: "Aug",
    label: "20 Aug",
    full: `August 20, ${eventYear}`,
  },
  {
    id: "2026-09-21",
    day: "21",
    month: "Sep",
    label: "21 Sep",
    full: `September 21, ${eventYear}`,
  },
]

export type DietaryRestrictionOption = {
  id: string;
  label: string;
};

export const dietaryRestrictionOptions: DietaryRestrictionOption[] = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "gluten_free", label: "Gluten-free" },
  { id: "dairy_free", label: "Dairy-free" },
]

// Horários fixos das duas partes da noite. Usados tanto na secção
// Schedule do site como no email de confirmação — mudar aqui, e não
// nos dois sítios em separado, evita os dois ficarem dessincronizados.
export const soulSpeedDatingTime = "07:00 PM – 08:30 PM"
export const dinnerShowTime = "08:30 PM – 10:30 PM"