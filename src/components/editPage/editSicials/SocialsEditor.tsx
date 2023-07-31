import { motion } from "framer-motion";
import { SyntheticEvent, useEffect, useState } from "react";
import { api } from "../../../api";
import { SocialLink } from "../../../types/SocialLink";
import { CgSpinner } from "react-icons/cg";
import { IoCloseOutline } from "react-icons/io5";
import { SocialIcon } from "../../SocialIcon";
import { AppInput } from "../../ui/AppInput";
import { MdOutlineTitle } from "react-icons/md";
import { FaLink, FaSave, FaTrash } from "react-icons/fa";
import { AppButton } from "../../ui/AppButton";
import { AppToggle } from "../../ui/AppToggle";

interface SocialsEditorProps {
  onClose: () => void;
  socialId: number | null;
  onUpdate: (social: SocialLink) => void;
  onDelete: (socialId: number) => void;
}

export const SocialsEditor = ({
  onClose,
  socialId,
  onUpdate,
  onDelete,
}: SocialsEditorProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [socialData, setSocialData] = useState<Partial<SocialLink> | null>(
    null
  );

  if (!socialId) return null;

  async function fetchSocial() {
    if (!socialId) return;
    try {
      setIsLoading(true);
      const res = await api.get(`/api/social-links/${socialId}`);
      setSocialData(res.data as SocialLink);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }

  async function updateSocial() {
    if (!socialData) return;
    try {
      setIsUpdating(true);
      const title = socialData.title ? socialData.title.trim() : "";
      const url = socialData.url ? socialData.url.trim() : "";
      const res = await api.put(
        `/api/social-links/${socialId}`,
        JSON.stringify({
          title: title,
          url: url,
          is_active: socialData?.is_active,
        })
      );
      onUpdate(res.data);
      setIsUpdating(false);
      onClose();
    } catch (e) {
      console.log(e);
      setIsUpdating(false);
    }
  }

  function onDeleteHandler() {
    if (!socialData || !socialData?.id) return;
    onDelete(socialData.id);
    onClose();
  }

  useEffect(() => {
    if (!socialId) return;
    fetchSocial();
  }, [socialId]);

  return (
    <div
      className="w-full h-full fixed bottom-0 left-0 flex flex-col items-end justify-end p-4"
      onClick={onClose}
    >
      <motion.div
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        initial={{ y: "100%", opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full min-h-[300px] bg-white dark:bg-gray-700 rounded-2xl p-4 relative flex flex-col"
        onClick={(e: SyntheticEvent) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="h-8 w-8 flex items-center justify-center bg-slate-200 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full text-gray-700 dark:text-white absolute top-2 right-2 z-20"
        >
          <IoCloseOutline />
        </button>
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <CgSpinner className="text-3xl animate-spin" />
          </div>
        ) : (
          <>
            <div className="mb-8">
              <SocialIcon type={socialData?.type ?? "custom_url"} />
            </div>

            <AppInput
              value={socialData?.title ?? ""}
              placeholder="Title"
              leftIcon={<MdOutlineTitle />}
              className="mb-4"
              onChange={(e: SyntheticEvent) => {
                const input = e.target as HTMLInputElement;
                setSocialData((prev) => {
                  return { ...prev, title: input.value };
                });
              }}
            />
            <AppInput
              value={socialData?.url ?? ""}
              placeholder="URL"
              leftIcon={<FaLink />}
              className="mb-4"
              onChange={(e: SyntheticEvent) => {
                const input = e.target as HTMLInputElement;
                setSocialData((prev) => {
                  return { ...prev, url: input.value };
                });
              }}
            />

            <div className="flex space-x-2 mb-4">
              <span>Is active</span>
              <AppToggle
                checked={!!socialData?.is_active}
                onClick={() => {
                  setSocialData((prev) => {
                    return { ...prev, is_active: !prev?.is_active };
                  });
                }}
              />
            </div>

            <div className="flex space-x-2">
              <AppButton
                onClick={onDeleteHandler}
                className="max-w-[50px] bg-red-600"
              >
                <FaTrash />
              </AppButton>
              <AppButton
                onClick={updateSocial}
                className="flex-1"
                isLoading={isUpdating}
              >
                <span>SAVE</span>
                <FaSave />
              </AppButton>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};
