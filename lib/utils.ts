import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + "B"
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + "M"
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + "K"
  } else {
    return num.toString()
  }
}
