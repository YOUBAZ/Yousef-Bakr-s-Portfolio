import { useCallback, useEffect, useState } from "react";

/**
 * Theme state for the two-theme brand system.
 *
 * brand-kit/BRAND.md section 3: light is the default. A visitor whose system
 * asks for dark gets dark, and an explicit choice always wins over both.
 *
 * The theme is set on documentElement and nowhere else, so there is exactly
 * one switch.
 */

export const STORAGE_KEY = "ybz-theme";
const THEMES = ["dark", "light"];

/** Shared with the inline boot script in index.html; keep the two in step. */
export function resolveInitialTheme() {
  if (typeof window === "undefined") return "light";

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (THEMES.includes(stored)) return stored;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme) {
  const root = document.documentElement;

  // Light is the default and carries no attribute, so the :root block in
  // index.css stays the base case rather than becoming an override.
  if (theme === "dark") root.setAttribute("data-theme", "dark");
  else root.removeAttribute("data-theme");

  root.style.colorScheme = theme;

  // Browser chrome follows the page ground. Never black, never white.
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "dark" ? "#121417" : "#F4F3EF");
}

export default function useTheme() {
  const [theme, setTheme] = useState(resolveInitialTheme);

  useEffect(() => {
    applyTheme(theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  // Follow the OS only while the visitor has not chosen for themselves.
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event) => {
      if (window.localStorage.getItem(STORAGE_KEY)) return;
      setTheme(event.matches ? "dark" : "light");
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const toggleTheme = useCallback(
    () => setTheme((prev) => (prev === "light" ? "dark" : "light")),
    []
  );

  return { theme, toggleTheme };
}
