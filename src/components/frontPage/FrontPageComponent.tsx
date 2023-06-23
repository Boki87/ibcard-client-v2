import { Card } from "../../types/Card";
import { UserCard } from "./UserCard";
import { BsChevronRight } from "react-icons/bs";
import { UserMainInfo } from "./UserMainInfo";
import { AppButton } from "../ui/AppButton";
import { UserSocials } from "./UserSocials";
import { useModalsContext } from "../../context/ModalsContext";
import { FaSave, FaShare } from "react-icons/fa";
import { AboutMeModal } from "../AboutMeModal";
import { useState } from "react";
import { CompanyInfoModal } from "../CompanyInfoModal";
import { PortfolioModal } from "../PortfolioModal";
import { saveVcf } from "../../lib/vcf";

interface FrontPageComponentProps {
  cardData: Card;
}

export const FrontPageComponent = ({ cardData }: FrontPageComponentProps) => {
  const { qrModal } = useModalsContext();
  const [showAboutMe, setShowAboutMe] = useState(false);
  const [showCompanyInfo, setShowCompanyInfo] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);

  function qrCodeClickHandler() {
    if (cardData.nfc_card?.link) {
      qrModal.openQrModal(cardData.nfc_card?.link);
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
          whatsapp={cardData.whatsapp}
          viber={cardData.viber}
        />
      </div>

      <div className="px-4 my-6">
        <AppButton onClick={() => saveVcf(cardData)} className="mb-3">
          <span>Save contact</span>
          <FaSave />
        </AppButton>
        <AppButton variant="gray">
          <span>Share back</span>
          <FaShare style={{ transform: "scaleX(-1)" }} />
        </AppButton>
      </div>

      <div className="bg-slate-100 dark:bg-black dark:bg-opacity-10 p-4 mt-10 py-10">
        {/* <AppButton variant="gray">Company portal</AppButton> */}
        <div className="grid grid-cols-3">
          <p
            onClick={() => setShowAboutMe(true)}
            className="text-sm flex items-center space-x-1 text-gray-700 dark:text-gray-200 justify-center hover:underline cursor-pointer"
          >
            <span>About me</span>
            <BsChevronRight />
          </p>
          <p
            onClick={() => setShowCompanyInfo(true)}
            className="text-sm flex items-center space-x-1 text-gray-700 dark:text-gray-200 justify-center hover:underline cursor-pointer"
          >
            <span>Company info</span>
            <BsChevronRight />
          </p>
          <p
            onClick={() => setShowPortfolio(true)}
            className="text-sm flex items-center space-x-1 text-gray-700 dark:text-gray-200 justify-center hover:underline cursor-pointer"
          >
            <span>Portfolio</span>
            <BsChevronRight />
          </p>
        </div>

        <UserSocials socials={cardData.social_links || []} />
      </div>
      <AboutMeModal
        isOpen={showAboutMe}
        onClose={() => setShowAboutMe(false)}
      />
      <CompanyInfoModal
        isOpen={showCompanyInfo}
        onClose={() => setShowCompanyInfo(false)}
      />
      <PortfolioModal
        isOpen={showPortfolio}
        onClose={() => setShowPortfolio(false)}
      />
    </div>
  );
};
