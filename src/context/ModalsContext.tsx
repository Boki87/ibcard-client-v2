import { ReactNode, createContext, useContext, useState } from "react";

interface IQRModal {
  isQrModalOpen: boolean;
  qrCodeUrl: string;
  openQrModal: (url: string, showOptions?: boolean) => void;
  closeQrModal: () => void;
  showShareOptions: boolean;
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
    showShareOptions: false,
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
  const [showShareOptions, setShowShareOptions] = useState(false);

  // QR Modal functions
  function openMainMenu() {
    setIsMainMenuOpen(true);
  }
  function closeMainMenu() {
    setIsMainMenuOpen(false);
  }
  function openQrModal(url: string, showShareOptions?: boolean) {
    showShareOptions ? setShowShareOptions(true) : setShowShareOptions(false);
    setQrCodeUrl(url);
    setIsQrModalOpen(true);
  }
  function closeQrModal() {
    setShowShareOptions(false);
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
          showShareOptions,
        },
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
}
