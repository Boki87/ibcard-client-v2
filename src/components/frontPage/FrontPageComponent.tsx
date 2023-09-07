import { Card } from "../../types/Card";
import { UserCard } from "./UserCard";
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
import { UserOffers } from "./UserOffers";
import { UserCatalogues } from "./UserCatalogues";
import { ShareBackModal } from "../ShareBackModal";

interface FrontPageComponentProps {
  cardData: Card;
}

export const FrontPageComponent = ({ cardData }: FrontPageComponentProps) => {
  console.log(cardData);
  const { qrModal } = useModalsContext();
  const [showAboutMe, setShowAboutMe] = useState(false);
  const [showCompanyInfo, setShowCompanyInfo] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [showShareBack, setShowShareBack] = useState(false);

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
        {cardData.show_shareback ? (
          <AppButton onClick={() => setShowShareBack(true)} variant="gray">
            <span>Share back</span>
            <FaShare style={{ transform: "scaleX(-1)" }} />
          </AppButton>
        ) : null}
      </div>

      <div className="bg-slate-100 dark:bg-black dark:bg-opacity-10 p-4 mt-10 py-4">
        {/* TODO: figure out the below sections */}
        {/* <div className="grid grid-cols-3">
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
        </div> */}

        <UserSocials cardData={cardData} />
        <UserCatalogues cardData={cardData}  />
        <UserOffers cardData={cardData } />
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
      <ShareBackModal
        isOpen={showShareBack}
        cardDataId={cardData.id.toString()}
        onClose={() => {
          setShowShareBack(false);
        }}
      />
    </div>
  );
};
