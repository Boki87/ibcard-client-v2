import { Card } from "../../types/Card";
import { AppInput } from "../ui/AppInput";
import { UserCard } from "./UserCard";
import { BiWorld } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { HiOutlinePhone, HiOutlineMail, HiLink } from "react-icons/hi";
import { BsChevronRight } from "react-icons/bs";
import { RxCopy } from "react-icons/rx";
import { UserMainInfo } from "./UserMainInfo";
import { AppButton } from "../ui/AppButton";
import { UserSocials } from "./UserSocials";
import { useModalsContext } from "../../context/ModalsContext";

interface FrontPageComponentProps {
  cardData: Card;
}

export const FrontPageComponent = ({ cardData }: FrontPageComponentProps) => {
  const { openQrModal } = useModalsContext();

  function qrCodeClickHandler() {
    if (cardData.nfc_card?.link) {
      openQrModal(cardData.nfc_card?.link);
    }
  }

  return (
    <div>
      <div className="px-4">
        <UserCard data={cardData} onQrCodeClick={qrCodeClickHandler} />
      </div>
      <div className="px-4">
        <UserMainInfo
          email={cardData.email}
          mobile={cardData.mobile}
          website={cardData.website}
          whatsapp={cardData.whatsapp}
          viber={cardData.viber}
        />
      </div>

      <div className="w-full border-b border-gray-300 dark:border-gray-400 flex justify-center">
        <div className="bg-gray-100 dark:bg-gray-700 flex items-center space-x-2 px-2 py-1 border border-gray-200 dark:border-gray-400 rounded-lg dark:text-gray-300 text-xs translate-y-1/2">
          <span>ibcard.info/bojan_peric</span>
          <RxCopy />
        </div>
      </div>

      <div className="bg-slate-200 dark:bg-gray-800 p-4 py-10">
        <AppButton className="mb-5">Save contact</AppButton>
        <AppButton variant="gray" className="mb-8">
          Share back
        </AppButton>
        {/* <AppButton variant="gray">Company portal</AppButton> */}
        <div className="grid grid-cols-3">
          <p className="text-sm flex items-center space-x-1 text-gray-700 dark:text-gray-200 justify-center hover:underline cursor-pointer">
            <span>About me</span>
            <BsChevronRight />
          </p>
          <p className="text-sm flex items-center space-x-1 text-gray-700 dark:text-gray-200 justify-center hover:underline cursor-pointer">
            <span>Company info</span>
            <BsChevronRight />
          </p>
          <p className="text-sm flex items-center space-x-1 text-gray-700 dark:text-gray-200 justify-center hover:underline cursor-pointer">
            <span>Portfolio</span>
            <BsChevronRight />
          </p>
        </div>

        <UserSocials socials={cardData.social_links || []} />
      </div>
    </div>
  );
};
