export function isPositiveAmount(value: string): boolean {
  const n = Number(value);
  return Number.isFinite(n) && n > 0;
}
