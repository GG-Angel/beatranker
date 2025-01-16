export function renderTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds - minutes * 60;
  return `${minutes}:${secondsLeft.toString().padStart(2, "0")}`;
}

export function renderDecimal(num: number): string {
  return num.toFixed(2);
}

export function renderCommas(arr: any[]): string {
  return arr.join(", ");
}

export function getFlagWidth(country: string): number {
  const nonRectangular: Record<string, number> = {
    CH: 20,
    VA: 20,
    NP: 16,
  };

  return nonRectangular[country] ?? 36;
}