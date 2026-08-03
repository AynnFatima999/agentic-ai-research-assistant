export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function formatSummaryLength(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
