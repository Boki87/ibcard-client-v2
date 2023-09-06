import { useModalsContext } from "../context/ModalsContext";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";
import { AppLogo } from "./ui/AppLogo";

export const QRModal = () => {
  const { qrModal } = useModalsContext();

  return (
    <AnimatePresence>
      {qrModal.isQrModalOpen ? (
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          initial={{ y: 100, opacity: 0 }}
          className="absolute top-0 left-0 w-full h-full z-30 bg-gray-100 dark:bg-gray-700 flex flex-col items-center justify-center"
        >
          <div className="h-14 flex justify-end px-4 items-center absolute top-0 right-0">
            <button
              onClick={qrModal.closeQrModal}
              className="h-10 w-10 flex items-center justify-center bg-slate-200 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-700 rounded-full text-gray-700 dark:text-white"
            >
              <IoCloseOutline />
            </button>
          </div>
          <div>
            <div className="flex justify-center">
              <AppLogo className="h-8" />
            </div>
            <div className="aspect-square rounded-xl p-2 w-[200px] h-[200px] flex items-center justify-center relative overflow-hidden border-4 border-white">
              <div className=" absolute top-0 left-0 z-10 bg-white animate-pulse w-full h-full"></div>
              <img
                className="absolute top-0 left-0 z-20"
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrModal.qrCodeUrl}`}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
