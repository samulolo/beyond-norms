// Lista curada de indicativos de país para o campo de telemóvel em
// /checkout. Não é exaustiva (não inclui todos os ~200 países) — cobre os
// mercados mais prováveis para uma experiência em Lisboa (Portugal em primeiro,
// por ser o público maioritário) e os principais destinos de onde
// estrangeiros costumam vir. Fácil de estender: só adicionar uma entrada.

export type CountryCodeOption = {
  id: string; // ISO 3166-1 alpha-2, usado como value do <option>
  dialCode: string;
  label: string;
};

export const countryCodes: CountryCodeOption[] = [
  { id: "PT", dialCode: "+351", label: "Portugal (+351)" },
  { id: "ES", dialCode: "+34", label: "Spain (+34)" },
  { id: "FR", dialCode: "+33", label: "France (+33)" },
  { id: "GB", dialCode: "+44", label: "United Kingdom (+44)" },
  { id: "DE", dialCode: "+49", label: "Germany (+49)" },
  { id: "IT", dialCode: "+39", label: "Italy (+39)" },
  { id: "NL", dialCode: "+31", label: "Netherlands (+31)" },
  { id: "BE", dialCode: "+32", label: "Belgium (+32)" },
  { id: "IE", dialCode: "+353", label: "Ireland (+353)" },
  { id: "CH", dialCode: "+41", label: "Switzerland (+41)" },
  { id: "AT", dialCode: "+43", label: "Austria (+43)" },
  { id: "SE", dialCode: "+46", label: "Sweden (+46)" },
  { id: "NO", dialCode: "+47", label: "Norway (+47)" },
  { id: "DK", dialCode: "+45", label: "Denmark (+45)" },
  { id: "PL", dialCode: "+48", label: "Poland (+48)" },
  { id: "BR", dialCode: "+55", label: "Brazil (+55)" },
  { id: "US", dialCode: "+1", label: "United States (+1)" },
  { id: "CA", dialCode: "+1", label: "Canada (+1)" },
  { id: "AO", dialCode: "+244", label: "Angola (+244)" },
  { id: "MZ", dialCode: "+258", label: "Mozambique (+258)" },
  { id: "CV", dialCode: "+238", label: "Cabo Verde (+238)" },
  { id: "AU", dialCode: "+61", label: "Australia (+61)" },
];

export const defaultCountryCodeId = "PT";
