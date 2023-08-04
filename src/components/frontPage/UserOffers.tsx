import { SocialLink } from "../../types/SocialLink";
import { BsChevronRight } from "react-icons/bs";
import { SocialIcon } from "../SocialIcon";

interface UserSocialsProps {
  socials: SocialLink[];
}

export const UserOffers = ({ socials }: UserSocialsProps) => {
  const offers = socials.filter(
    (s) => s.is_active && s.type === "special_offer"
  );

  function handleSocialClick(href: string | undefined) {
    if (!href) return;
    window.open(href, "_blank");
  }

  if (socials.length === 0) return null;

  return (
    <div className="mt-4 mb-6">
      <div className="px-6 mb-2 text-gray-800 dark:text-gray-300 font-bold">
        Special Offers
      </div>

      <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
        {offers.map((social) => (
          <div className="flex justify-center" key={social.id}>
            <SocialIcon
              onClick={() => handleSocialClick(social.url)}
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
