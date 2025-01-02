export function renderTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds - minutes * 60;
  return `${minutes}:${secondsLeft.toString().padStart(2, "0")}`;
}

export function renderDecimal(num: number): string {
  return num.toFixed(2);
}
