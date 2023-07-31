import { IoCloseOutline } from "react-icons/io5";
import { SOCIAL_ICONS } from "../../../lib/socialLinks";
import { SocialIcon } from "../../SocialIcon";
import { SyntheticEvent } from "react";
import { motion } from "framer-motion";
import { SocialType } from "../../../types/SocialTypes";

interface SocialsPickerProps {
  onClose: () => void;
  onAdd: (social: SocialType) => void;
}

const COMMON_ICONS = SOCIAL_ICONS.filter((i) => {
  if (!["video", "flyer", "catalogue"].includes(i.type)) {
    return i;
  }
});

export const SocialsPicker = ({ onClose, onAdd }: SocialsPickerProps) => {
  return (
    <div
      className="w-full h-full fixed bottom-0 left-0 flex flex-col items-end justify-end"
      onClick={onClose}
    >
      <motion.div
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        initial={{ y: "100%" }}
        transition={{ duration: 0.3 }}
        className="w-full h-[350px] bg-white dark:bg-gray-700 rounded-t-2xl p-4 relative flex flex-col"
        onClick={(e: SyntheticEvent) => e.stopPropagation()}
      >
        <div className="font-bold text-lg mb-3 text-center">
          Pick a social profile
        </div>
        <button
          onClick={onClose}
          className="h-8 w-8 flex items-center justify-center bg-slate-200 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full text-gray-700 dark:text-white absolute top-2 right-2 z-20"
        >
          <IoCloseOutline />
        </button>
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto mb-10">
            {COMMON_ICONS.map((icon, i) => {
              return (
                <SocialIcon
                  onClick={() => onAdd(icon.type)}
                  type={icon.type}
                  key={icon.type}
                />
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
