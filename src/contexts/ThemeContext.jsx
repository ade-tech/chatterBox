/* eslint-disable react-refresh/only-export-components */
import { useContext, useEffect } from "react";
import { createContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const changedMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const prefersDarkMode = changedMode;
  const [mode, setMode] = useLocalStorageState(
    prefersDarkMode ? "dark" : "light",
    "Theme"
  );

  useEffect(() => {
    if (mode === "dark" && changedMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      setMode("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      setMode("light");
    }
  }, [mode, changedMode, setMode]);
  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined)
    throw new Error("Context used outside of its' provider");

  return context;
}
