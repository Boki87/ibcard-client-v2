import { SocialLink } from "../../types/SocialLink";
import { SocialIcon } from "../SocialIcon";
import { Card } from "../../types/Card";
import { api } from "./../../api";
interface UserSocialsProps {
  cardData: Card;
}

export const UserCatalogues = ({ cardData }: UserSocialsProps) => {
  const offers = cardData.social_links.filter(
    (s) => s.is_active && s.type === "catalogue"
  );
  console.log(offers);
  async function handleSocialClick(href: string | undefined, socialId: number, socialType: string) {
    try {
      const response = await api.post(
        `/api/socialStats/updateOrCreate/${cardData.user_id}/${socialId}/${socialType}`
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
    if (!href) return;
    window.open(href, "_blank");
  }

  if (cardData.social_links.length === 0) return null;

  return (
    <div className="mt-4 mb-6">
      <div className="px-6 mb-2 text-gray-800 dark:text-gray-300 font-bold">
        Catalogues
      </div>

      <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
        {offers.map((social) => (
          <div className="flex justify-center" key={social.id}>
            <SocialIcon
              onClick={() => handleSocialClick(social.url, social.id, social.type)}
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
