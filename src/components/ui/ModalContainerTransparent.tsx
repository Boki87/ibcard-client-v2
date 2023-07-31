import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useCallback, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { ModalPortal } from "./ModalPortal";

interface IModalContainer {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  showClose?: boolean;
}

export const ModalContainerTransparent = ({
  isOpen,
  onClose,
  children,
  showClose = true,
}: IModalContainer) => {
  const closeOnEscape = useCallback((e: KeyboardEvent) => {
    if (e.code === "Escape") {
      onClose();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keyup", closeOnEscape);
    return () => {
      document.removeEventListener("keyup", closeOnEscape);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOpen ? (
        <ModalPortal>
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            className="absolute top-0 left-0 w-full h-full z-30 text-gray-800 dark:text-white"
          >
            <div className="w-full h-full"></div>
            <div className="w-full h-full absolute top-0 left-0 z-50 backdrop-blur-md bg-white/10 dark:bg-black/10">
              {showClose ? (
                <button
                  onClick={onClose}
                  className="h-10 w-10 flex items-center justify-center bg-slate-200 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full text-gray-700 dark:text-white absolute top-2 right-2"
                >
                  <IoCloseOutline />
                </button>
              ) : null}
              {children}
            </div>
          </motion.div>
        </ModalPortal>
      ) : null}
    </AnimatePresence>
  );
};
