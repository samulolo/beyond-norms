


export const eventYear : number = new Date().getFullYear()

export const organizerName = "BeyondNorms"
export const eventAddress = "Rua dos Lusíadas, nº 4 A, 1300-370 Lisboa, Portugal"
export const contactPhoneDisplay = "+351 933 820 240"
export const contactPhoneHref = "+351933820240"
export const contactEmail = process.env.NEXT_PUBLIC_EMAIL_CONTACT ?? "contact@beyondnorms.net"

// Para onde vai o aviso interno de "nova compra recebida", enviado a par
// do email de confirmação do cliente (ver app/api/stripe/webhook/route.ts).
export const saleNotificationEmail =
  process.env.SALE_NOTIFICATION_EMAIL ?? "nande.vahekeni@beyondnorms.net"
// Domínio público do site. Usado onde é preciso um URL absoluto que
// funcione fora do site (emails, QR code, links de partilha) — não usar
// NEXT_PUBLIC_SITE_URL aqui, porque em dev aponta para localhost.
export const publicSiteUrl = "https://lp.beyondnorms.net"
export const upcomingEventsUrl = `${publicSiteUrl}/upcoming-events`
export const upcomingEventsQrPath = "/images/upcoming_event.png"
export const shareMessage =
  "Discover Beyond Norms — Soul Speed Dating & Dinner Show in Lisbon. See the upcoming events:"

// Para onde vai o aviso interno de "novo feedback" (ver
// app/actions/feedback.ts). Sem env própria, usa o mesmo destino dos
// avisos de venda.
export const feedbackNotificationEmail =
  process.env.FEEDBACK_NOTIFICATION_EMAIL ?? saleNotificationEmail

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
  // {
  //   id: "2026-08-20",
  //   day: "20",
  //   month: "Aug",
  //   label: "20 Aug",
  //   full: `August 20, ${eventYear}`,
  // },
  {
    id: "2026-09-21",
    day: "3",
    month: "Sep",
    label: "3 Sep",
    full: `September 3rd, ${eventYear}`,
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