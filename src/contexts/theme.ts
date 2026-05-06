import { createContext, useContext } from "react";

export type ThemeId = "light" | "dark";

export const THEMES: Array<{
  id: ThemeId;
  label: string;
  description: string;
}> = [
  {
    id: "light",
    label: "Light",
    description: "Editorial serif, warm white, soft orange",
  },
  {
    id: "dark",
    label: "Dark",
    description: "Near-black canvas with vibrant blue accent",
  },
];

export const STORAGE_KEY = "playbook.theme";
export const DEFAULT_THEME: ThemeId = "dark";

export interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
