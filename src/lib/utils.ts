/**
 * Utility helper for merging class names in shadcn / Tailwind components
 */
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ");
}
