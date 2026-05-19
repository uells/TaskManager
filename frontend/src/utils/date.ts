import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU");
}

export function formatDayMonth(isoString: string | null) {
  return isoString ? format(parseISO(isoString), "d MMM", { locale: ru }) : null;
}
