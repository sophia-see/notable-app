"use client"

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

export enum FONT {
  sans = "sans",
  serif = "serif",
  mono = "mono"
}

export enum COLOR {
  light = "light",
  dark = "dark",
  system = "system"
}

interface AppContextProps {
  font: FONT;
  setFont: Dispatch<SetStateAction<FONT>>;
  color: COLOR;
  setColor: Dispatch<SetStateAction<COLOR>>;
  isDarkMode: boolean;
}

const AppContext = createContext<AppContextProps | null>(null);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({children}: AppProviderProps) => {
  const [font, setFont] = useState<FONT>(FONT.sans);
  const [color, setColor] = useState<COLOR>(COLOR.light);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedFont = localStorage.getItem("font") as FONT;
    const storedColor = localStorage.getItem("color") as COLOR;

    if (storedFont)
      setFont(storedFont)

    if (storedColor)
      setColor(storedColor)
  }, [])
  
  useEffect(() => {
    localStorage.setItem("font", font);
  }, [font]);

  useEffect(() => {
    const isSystem = color == COLOR.system;
    const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = isSystem ? isSystemDark : color == COLOR.dark;
    setIsDarkMode(isDark);
    
    localStorage.setItem("color", color);
  }, [color]);

  return (
    <AppContext.Provider value={{font, setFont, color, setColor, isDarkMode}}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) throw new Error ("useAppContext must be used within AppContext Provider")

  return context;
}
