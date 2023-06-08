import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

interface IModalsContext {
  isMainMenuOpen: boolean;
  openMainMenu: () => void;
  closeMainMenu: () => void;
}

const initialState: IModalsContext = {
  isMainMenuOpen: false,
  openMainMenu: () => {},
  closeMainMenu: () => {},
};

const ModalsContext = createContext(initialState);
export const useModalsContext = () => useContext(ModalsContext);

export default function ModalsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);

  function openMainMenu() {
    setIsMainMenuOpen(true);
  }
  function closeMainMenu() {
    setIsMainMenuOpen(false);
  }

  return (
    <ModalsContext.Provider
      value={{ isMainMenuOpen, openMainMenu, closeMainMenu }}
    >
      {children}
    </ModalsContext.Provider>
  );
}
