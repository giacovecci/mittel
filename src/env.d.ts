// src/env.d.ts

// This tells TypeScript to add these properties to the global Window interface
declare global {
  interface Window {
    currentTheme: string;
    toggleTheme: () => void;
  }
}

// You can keep these if you use the more specific event type,
// otherwise, the CustomEvent cast in index.astro is also fine.
interface ThemeChangeEventDetail {
  theme: string;
}

interface ThemeChangeEvent extends CustomEvent<ThemeChangeEventDetail> {}

// Adding this empty export makes this file a module, which can sometimes help
// TypeScript correctly process global augmentations.
export {};