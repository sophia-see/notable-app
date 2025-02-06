import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

export enum FONT {
  sans = "sans",
  serif = "serif",
  mono = "mono"
}

interface AppContextProps {
  font: FONT;
  setFont: Dispatch<SetStateAction<FONT>>;
}

const AppContext = createContext<AppContextProps | null>(null);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({children}: AppProviderProps) => {
  const [font, setFont] = useState<FONT>(FONT.sans);

  return (
    <AppContext.Provider value={{font, setFont}}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) throw new Error ("useAppContext must be used within AppContext Provider")

  return context;
}
