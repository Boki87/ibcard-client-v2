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
import { api } from "../../api";

interface FrontPageComponentProps {
  cardData: Card;
}

export const FrontPageComponent = ({ cardData }: FrontPageComponentProps) => {
  const { qrModal } = useModalsContext();
  const [showAboutMe, setShowAboutMe] = useState(false);
  const [showCompanyInfo, setShowCompanyInfo] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [showShareBack, setShowShareBack] = useState(false);

  let fullName = "";
  if (cardData.first_name) {
    fullName += cardData.first_name;
  }

  if (cardData.last_name) {
    fullName += " " + cardData.last_name;
  }

  function qrCodeClickHandler(showOptions: boolean) {
    if (cardData.nfc_card?.link) {
      qrModal.openQrModal(cardData.nfc_card?.link, showOptions);
    }
  }

   async function saveHandler() {
    await api.post(`/api/user-save `, {
      user_id: cardData.user_id,
      customer_id: cardData.customer_id,
    });
    saveVcf(cardData);
  }

  return (
    <div>
      <div className="px-4 mb-10">
        <UserCard
          data={cardData}
          onQrCodeClick={(showOptions) => qrCodeClickHandler(showOptions)}
        />
      </div>
      <div className="px-4">
        <UserMainInfo
          email={cardData.email}
          email2={cardData.email_2}
          mobile={cardData.mobile}
          mobile2={cardData.mobile_2}
          whatsapp={cardData.mobile}
          viber={cardData.mobile}
          address={cardData.address}
          website={cardData.website}
        />
      </div>

      <div className="px-4 mt-6">
        <AppButton onClick={saveHandler} className="mb-3">
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

      <div className="bg-slate-100 dark:bg-black dark:bg-opacity-10 p-4 mt-4 py-4">
        <UserSocials cardData={cardData} />
        <UserCatalogues cardData={cardData} />
        <UserOffers cardData={cardData} />
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
        cardOwner={fullName}
        onClose={() => {
          setShowShareBack(false);
        }}
      />
    </div>
  );
};
