import { SocialLink } from "../../types/SocialLink";
import { BsChevronRight } from "react-icons/bs";
import { SocialIcon } from "../SocialIcon";
import { Card } from "../../types/Card";
import { api } from "./../../api";
interface UserSocialsProps {
  // socials: SocialLink[];
  cardData: Card;
}

export const UserOffers = ({ cardData }: UserSocialsProps) => {
  const offers = cardData.social_links.filter(
    (s) => s.is_active && s.type === "special_offer"
  );
  async function handleSocialClick(
    href: string | undefined,
    socialId: number,
    socialType: string
  ) {
    try {
      const response = await api.post(`/api/socialStats/add-click`, {
        user_id: cardData.user_id,
        users_data_id: cardData.id,
        social_id: socialId,
        social_type: socialType,
      });
      //  console.log('Response:', response.data);
    } catch (error) {
      console.error("Error:", error);
    }
    if (!href) return;
    window.open(href, "_blank");
  }

  if (offers.length === 0) return null;

  return (
    <div className="mt-4 mb-6">
      <div className="px-1 mb-2 text-gray-800 dark:text-gray-300 font-bold max-w-xs mx-auto">
        Special Offers
      </div>

      <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
        {offers.map((social) => (
          <div className="flex justify-center" key={social.id}>
            <SocialIcon
              onClick={() =>
                handleSocialClick(social.url, social.id, social.type)
              }
              url={social.url || ""}
              type={social.type}
              title={social.title}
              key={social.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
