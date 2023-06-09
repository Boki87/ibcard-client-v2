import { useModalsContext } from "../context/ModalsContext";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";

export const QRModal = () => {
  const { isQrModalOpen, closeQrModal, qrCodeUrl } = useModalsContext();

  return (
    <AnimatePresence>
      {isQrModalOpen ? (
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          initial={{ y: 100, opacity: 0 }}
          className="absolute top-0 left-0 w-full h-full z-30 bg-slate-200 dark:bg-gray-700 flex flex-col items-center justify-center"
        >
          <div className="h-14 flex justify-end px-4 items-center absolute top-0 right-0">
            <button
              onClick={closeQrModal}
              className="h-10 w-10 flex items-center justify-center bg-slate-200 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-700 rounded-full text-gray-700 dark:text-white"
            >
              <IoCloseOutline />
            </button>
          </div>
          <div className="aspect-square rounded-xl p-2 bg-white">
            <img
              className=""
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrCodeUrl}`}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
