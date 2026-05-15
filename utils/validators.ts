const STELLAR_KEY = /^G[A-Z2-7]{55}$/;

export function isPositiveAmount(value: string): boolean {
  const n = Number(value);
  return Number.isFinite(n) && n > 0;
}

export function isValidPublicKey(value: string): boolean {
  return STELLAR_KEY.test(value.trim());
}

export function isValidTitle(value: string): boolean {
  return value.trim().length >= 2;
}

export function isValidMemo(value: string): boolean {
  return value.length <= 28;
}
