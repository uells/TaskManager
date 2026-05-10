export function formateDate(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU");
}
