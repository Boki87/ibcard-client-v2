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
  isQrModalOpen: boolean;
  qrCodeUrl: string;
  openQrModal: (url: string) => void;
  closeQrModal: () => void;
}

const initialState: IModalsContext = {
  isMainMenuOpen: false,
  openMainMenu: () => {},
  closeMainMenu: () => {},
  isQrModalOpen: false,
  qrCodeUrl: "",
  openQrModal: () => {},
  closeQrModal: () => {},
};

const ModalsContext = createContext(initialState);
export const useModalsContext = () => useContext(ModalsContext);

export default function ModalsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  function openMainMenu() {
    setIsMainMenuOpen(true);
  }
  function closeMainMenu() {
    setIsMainMenuOpen(false);
  }

  function openQrModal(url: string) {
    setQrCodeUrl(url);
    setIsQrModalOpen(true);
  }
  function closeQrModal() {
    setQrCodeUrl("");
    setIsQrModalOpen(false);
  }

  return (
    <ModalsContext.Provider
      value={{
        isMainMenuOpen,
        openMainMenu,
        closeMainMenu,
        isQrModalOpen,
        qrCodeUrl,
        openQrModal,
        closeQrModal,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
}
