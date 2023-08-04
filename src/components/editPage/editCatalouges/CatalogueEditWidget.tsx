import { VscAdd } from "react-icons/vsc";
// import { SocialsEditModal } from "./SocialsEditModal";
import { useMemo, useState } from "react";
import { SocialLink } from "../../../types/SocialLink";
import { AnimatePresence } from "framer-motion";
import { CatalogueEditModal } from "./CatalogueEditModal";

interface CatalogueEditWidgetProps {
  initialSocials: SocialLink[];
  cardId: number;
  onUpdate?: () => void;
}

export const CatalogueEditWidget = ({
  initialSocials,
  cardId,
  onUpdate,
}: CatalogueEditWidgetProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const offers = useMemo(() => {
    return initialSocials.filter((s) => ["special_offer"].includes(s.type));
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
            Add & edit catalogues
          </span>
          {offers.length > 0 ? (
            <span className="text-gray-500 dark:text-gray-400">
              You have {offers.length} offer{offers.length > 1 ? "s" : ""} added
            </span>
          ) : (
            <span className="text-gray-500 dark:text-gray-400">
              No catalogues added
            </span>
          )}
        </div>
        <div className="w-[80px] h-[80px] rounded-full flex items-center justify-center bg-gray-300">
          <VscAdd className="text-4xl" />
        </div>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <CatalogueEditModal
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
