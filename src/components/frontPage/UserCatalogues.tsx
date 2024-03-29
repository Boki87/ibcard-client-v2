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
      // console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
    if (!href) return;
    window.open(href, "_blank");
  }

  function sanitizeLinkToHaveHttp(url?: string) {
    if (!url) return "";

    if (!url.startsWith("http")) {
      return `https://${url}`;
    }
    return url;
  }

  if (offers.length === 0) return null;

  return (
    <div className="mt-4 mb-6">
      <div className="px-1 mb-2 text-gray-800 dark:text-gray-300 font-bold max-w-xs mx-auto text-center">
        Catalogues
      </div>

      <div className="flex justify-center flex-wrap gap-4 max-w-xs mx-auto">
        {offers.map((social) => (
          <div className="flex justify-center" key={social.id}>
            <a
              href={sanitizeLinkToHaveHttp(social.url)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon
                onClick={() =>
                  handleSocialClick(social.url, social.id, social.type)
                }
                url={social.url || ""}
                type={social.type}
                title={social.title}
                key={social.id}
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
