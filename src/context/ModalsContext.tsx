import { ReactNode, createContext, useContext, useState } from "react";

interface IQRModal {
  isQrModalOpen: boolean;
  qrCodeUrl: string;
  openQrModal: (url: string) => void;
  closeQrModal: () => void;
}

interface IModalsContext {
  isMainMenuOpen: boolean;
  openMainMenu: () => void;
  closeMainMenu: () => void;
  qrModal: IQRModal;
}

const initialState: IModalsContext = {
  isMainMenuOpen: false,
  openMainMenu: () => {},
  closeMainMenu: () => {},
  qrModal: {
    isQrModalOpen: false,
    qrCodeUrl: "",
    openQrModal: () => {},
    closeQrModal: () => {},
  },
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

  // QR Modal functions
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
  // QR Modal functions --END

  return (
    <ModalsContext.Provider
      value={{
        isMainMenuOpen,
        openMainMenu,
        closeMainMenu,
        qrModal: {
          isQrModalOpen,
          qrCodeUrl,
          openQrModal,
          closeQrModal,
        },
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
}
