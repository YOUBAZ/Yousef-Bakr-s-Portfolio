import { useCallback, useEffect, useState } from "react";

/**
 * Theme state for the two-theme brand system.
 *
 * BRAND.md section 3.1 names midnight "the default", so that is what an
 * unconfigured visitor gets — the OS preference is consulted only as a hint,
 * and an explicit choice always wins over it.
 *
 * Section 3.5 rule 6 — "never mix themes inside one deliverable" — is why the
 * theme is set on documentElement and nowhere else. There is exactly one switch.
 */

export const STORAGE_KEY = "ybz-theme";
const THEMES = ["dark", "light"];

/** Shared with the inline boot script in index.html; keep the two in step. */
export function resolveInitialTheme() {
  if (typeof window === "undefined") return "dark";

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (THEMES.includes(stored)) return stored;

  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function applyTheme(theme) {
  const root = document.documentElement;

  // Dark is the default and carries no attribute, so the :root block in
  // index.css stays the base case rather than becoming an override.
  if (theme === "light") root.setAttribute("data-theme", "light");
  else root.removeAttribute("data-theme");

  root.style.colorScheme = theme;

  // Browser chrome follows the page ground: #020617 or #F7F5F0, section 3.5
  // rule 4. Never black, never white.
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "light" ? "#F7F5F0" : "#020617");
}

export default function useTheme() {
  const [theme, setTheme] = useState(resolveInitialTheme);

  useEffect(() => {
    applyTheme(theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  // Follow the OS only while the visitor has not chosen for themselves.
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (event) => {
      if (window.localStorage.getItem(STORAGE_KEY)) return;
      setTheme(event.matches ? "light" : "dark");
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
