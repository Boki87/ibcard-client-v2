import { VscAdd } from "react-icons/vsc";
import { SocialsEditModal } from "./SocialsEditModal";
import { useMemo, useState } from "react";
import { SocialLink } from "../../../types/SocialLink";
import { AnimatePresence } from "framer-motion";

interface SocialsEditWidgetProps {
  initialSocials: SocialLink[];
  cardId: number;
  onUpdate?: () => void;
}

export const SocialsEditWidget = ({
  initialSocials,
  cardId,
  onUpdate,
}: SocialsEditWidgetProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const commonSocials = useMemo(() => {
    return initialSocials.filter(
      (s) => !["catalogue", "special_offer", "video"].includes(s.type)
    );
  }, [initialSocials]);

  function refreshSocials() {
    onUpdate && onUpdate();
  }

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="flex items-center my-10"
      >
        <div className="flex flex-col flex-1">
          <span className="text-gray-800 text-xl font-bold dark:text-white">
            Add & edit socials
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            You have {commonSocials.length} socials added
          </span>
        </div>
        <div className="w-[80px] h-[80px] rounded-full flex items-center justify-center bg-gray-300">
          <VscAdd className="text-4xl" />
        </div>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <SocialsEditModal
            onClose={() => {
              setIsModalOpen(false);
              refreshSocials();
            }}
            cardId={cardId}
            initialSocials={initialSocials}
          />
        )}
      </AnimatePresence>
    </>
  );
};
