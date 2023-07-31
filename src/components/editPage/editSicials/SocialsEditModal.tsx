import { SocialLink } from "../../../types/SocialLink";
import { SocialIcon } from "../../SocialIcon";
import { AppButton } from "../../ui/AppButton";
import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import { FaPlus, FaSpinner } from "react-icons/fa";
import { SocialsPicker } from "./SocialsPicker";
import { AnimatePresence, motion } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";
import { CgSpinner } from "react-icons/cg";
import { SocialType } from "../../../types/SocialTypes";
import { SocialsEditor } from "./SocialsEditor";
import { api } from "../../../api";

interface SocialsEditModalProps {
  onClose: () => void;
  cardId: number;
  initialSocials?: SocialLink[];
}

export const SocialsEditModal = ({
  onClose,
  cardId,
  initialSocials,
}: SocialsEditModalProps) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activeSocial, setActiveSocial] = useState<number | null>(null);
  const [showSocialsPicker, setShowSocialsPicker] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(
    initialSocials || []
  );

  const commonSocials = useMemo(() => {
    return socialLinks.filter(
      (s) => !["catalogue", "flyer", "video"].includes(s.type)
    );
  }, [socialLinks]);

  async function fetchSocialLinks() {
    try {
      setIsLoading(true);
      const res = await api.get(`/api/social-links/card/${cardId}`);
      setSocialLinks(res.data);
      setIsLoading(false);
    } catch (e) {
      //   console.log(e);
      setIsLoading(false);
    }
  }

  async function addSocial(social: SocialType) {
    const res = await api.post(
      `/api/social-links/card/${cardId}`,
      JSON.stringify({ type: social, title: "", is_active: true, url: "" })
    );
    setSocialLinks((prev) => {
      return [...prev, res.data];
    });
  }

  async function addSocialHandler(social: SocialType) {
    try {
      await addSocial(social);
      setShowSocialsPicker(false);
    } catch (e) {
      console.log(e);
    }
  }

  function socialsUpdateHandler(social: SocialLink) {
    setSocialLinks((prev) => {
      return prev.map((s) => {
        if (s.id === social.id) {
          return social;
        }
        return s;
      });
    });
  }

  async function socialDeleteHandler(id: number) {
    try {
      await api.delete(`/api/social-links/${id}`);
      setSocialLinks((prev) => {
        return prev.filter((s) => s.id !== id);
      });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      className="absolute top-0 left-0 w-full h-full z-30 text-gray-800 dark:text-white"
    >
      <div className="w-full h-full absolute top-0 left-0 z-50 backdrop-blur-md bg-white/10 dark:bg-black/10">
        <div className="w-full h-full bg-transparent flex flex-col justify-end p-4">
          <button
            onClick={onClose}
            className="h-10 w-10 flex items-center justify-center bg-slate-200 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full text-gray-700 dark:text-white absolute top-2 right-2 z-20"
          >
            <IoCloseOutline />
          </button>
          {isLoading && (
            <div className="w-full h-full absolute top-0 left-0 bg-transparent flex items-center justify-center z-10">
              <CgSpinner className="animate-spin text-3xl" />
            </div>
          )}
          {!isLoading && commonSocials.length === 0 ? (
            <div className="mb-10 text-lg font-bold text-center">
              No socials added yet
            </div>
          ) : (
            <div
              className="grid grid-cols-3 gap-4 max-w-xs mx-auto mb-10"
              onClick={(e: SyntheticEvent) => e.stopPropagation()}
            >
              {!isLoading &&
                commonSocials.map((link) => (
                  <div
                    className={`flex justify-center ${
                      link.is_active ? "opacity-100" : "opacity-50"
                    }`}
                    key={link.id}
                  >
                    <SocialIcon
                      onClick={() => {
                        setActiveSocial(link.id);
                        setIsEditorOpen(true);
                      }}
                      url={link.url ?? ""}
                      type={link.type}
                      title={link.title}
                      key={link.id}
                    />
                  </div>
                ))}
            </div>
          )}
          <div className="flex justify-center items-center">
            <AppButton
              className="max-w-xs"
              onClick={() => {
                setShowSocialsPicker(true);
              }}
            >
              <span>ADD NEW</span>
              <FaPlus />
            </AppButton>
          </div>
        </div>
        <AnimatePresence>
          {showSocialsPicker && (
            <SocialsPicker
              onClose={() => setShowSocialsPicker(false)}
              onAdd={addSocialHandler}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isEditorOpen && (
            <SocialsEditor
              onUpdate={socialsUpdateHandler}
              onClose={() => setIsEditorOpen(false)}
              onDelete={socialDeleteHandler}
              socialId={activeSocial}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
