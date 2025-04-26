'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

type ShinyContextType = {
  isShiny: boolean;
  toggleShiny: () => void;
};

const ShinyContext = createContext<ShinyContextType>({
  isShiny: false,
  toggleShiny: () => {},
});

export function useShiny() {
  return useContext(ShinyContext);
}

export function ShinyProvider({ children }: { children: ReactNode }) {
  const [isShiny, setIsShiny] = useState(false);
  const toggleShiny = () => setIsShiny((prev) => !prev);

  return (
    <ShinyContext.Provider value={{ isShiny, toggleShiny }}>
      {children}
    </ShinyContext.Provider>
  );
}
