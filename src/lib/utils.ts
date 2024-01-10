import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/*
  * @param {string} str
  * @param {number} n
  * @return {string}
  * @description Truncate string to n characters
*/
export const truncate = (str: string, size: number) => {
  return str.length > size ? str.slice(0, size) + "…" : str;
}