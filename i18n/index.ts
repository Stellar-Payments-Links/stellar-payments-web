import { en } from "./en";
import { fr } from "./fr";

export type Locale = "en" | "fr";
const catalogs = { en, fr };

export function t(locale: Locale) {
  return catalogs[locale] ?? en;
}
