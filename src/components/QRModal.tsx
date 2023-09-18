import { useModalsContext } from "../context/ModalsContext";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";
import { AppLogo } from "./ui/AppLogo";
import { FaEnvelope, FaSms, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { BsFillShareFill } from "react-icons/bs";
import { useEffect, useState } from "react";

export const QRModal = () => {
  const { qrModal } = useModalsContext();

  return (
    <AnimatePresence>
      {qrModal.isQrModalOpen ? (
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          initial={{ y: 100, opacity: 0 }}
          className="absolute top-0 left-0 w-full h-full z-30 bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center"
        >
          <div className="h-10 flex justify-end px-4 items-center absolute top-2 right-0">
            <button
              onClick={qrModal.closeQrModal}
              className="h-10 w-10 flex items-center justify-center bg-slate-200 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full text-gray-700 dark:text-white"
            >
              <IoCloseOutline />
            </button>
          </div>
          <div>
            <div className="flex justify-center mb-3">
              <AppLogo className="h-20" />
            </div>
            <div className="aspect-square rounded-xl p-2 w-[200px] h-[200px] flex items-center justify-center relative overflow-hidden border-4 border-white">
              <div className=" absolute top-0 left-0 z-10 bg-white animate-pulse w-full h-full"></div>
              <img
                className="absolute top-0 left-0 z-20"
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrModal.qrCodeUrl}`}
              />
            </div>
          </div>

          {qrModal.showShareOptions ? (
            <ShareOptions url={qrModal.qrCodeUrl} />
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

interface ShareOptionsProps {
  url: string;
}

function ShareOptions({ url }: ShareOptionsProps) {
  const [showNativeShare, setShowNativeShare] = useState(false);

  async function shareHandler() {
    if (navigator.share) {
      try {
        const shareData = {
          title: "IBCard Profile",
          text: "Checkout my IBCard profile",
          url: url,
        };
        await navigator.share(shareData);
        console.log("Share successfull");
      } catch (err) {
        console.log("Error: ", err);
      }
    } else {
      console.warn("Native Web Sharing not supported");
    }
  }

  useEffect(() => {
    if (navigator.share) {
      setShowNativeShare(true);
    } else {
      setShowNativeShare(false);
    }
  }, []);

  return (
    <div className="p-4 w-full text-gray-800 dark:text-white">
      <div className="mt-6 w-full bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl">
        <a
          href={`https://twitter.com/intent/tweet?url=${url}&text=Checkout my IBCard profile`}
          target="_blank"
        >
          <div className="h-14 w-full flex items-center border-b border-gray-300 dark:border-gray-700 px-6 gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
              className="fill-black dark:fill-white"
            >
              <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
            </svg>
            <span>Share Card via Twitter</span>
          </div>
        </a>
        <a href={`https://wa.me//?text=${url}`} target="_blank">
          <div className="h-14 w-full flex items-center px-6 gap-4 border-b border-gray-300 dark:border-gray-700">
            <FaWhatsapp />
            <span>Share Card via Whatsapp</span>
          </div>
        </a>
        <a href={`sms:?body=${url}`} target="_blank">
          <div className="h-14 w-full flex items-center px-6 gap-4 border-b border-gray-300 dark:border-gray-700">
            <FaSms />
            <span>Share Card via SMS</span>
          </div>
        </a>
        <a
          href={`mailto:john.doe@email.com?subject=Check%20out%my%IBCard%profile&body=${url}`}
          target="_blank"
        >
          <div className="h-14 w-full flex items-center px-6 gap-4">
            <FaEnvelope />
            <span>Share Card via Email</span>
          </div>
        </a>
        {showNativeShare ? (
          <div
            onClick={shareHandler}
            className="h-14 w-full flex items-center px-6 gap-4 border-t border-gray-300 dark:border-gray-700"
          >
            <BsFillShareFill />
            <span>Share another way</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
