import { SocialType } from "../types/SocialTypes";
import { SOCIAL_ICONS } from "../lib/socialLinks";

interface SocialIconProps {
  type: SocialType;
  title?: string;
  [x: string]: any;
}

export const SocialIcon = ({ type, title, ...props }: SocialIconProps) => {
  const icon = SOCIAL_ICONS.filter(
    (i) => i.type.toLowerCase() === type.toLowerCase()
  )[0];
  function formatTypeTitle(title: string) {
    if (title === "custom_url") {
      return "link";
    }
    return title;
  }

  return (
    <div
      className="flex flex-col truncate cursor-pointer"
      {...props}
      title={title ? title : formatTypeTitle(type)}
    >
      <div className="flex items-center justify-center">
        {type === "special_offer" ? (
          <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-tr from-blue-900 to-blue-600 rounded-xl text-xs break-all text-gray-100 truncate">
            <div className="truncate">
              {!title || title === "" ? "Special Offer" : title}
            </div>
          </div>
        ) : (
          <div
            className={[
              "w-20 h-20 flex items-center justify-center rounded-xl text-4xl text-gray-100",
              icon.bg || "",
            ].join(" ")}
          >
            {icon.icon}
          </div>
        )}
      </div>
      {type !== "special_offer" && (
        <div className="flex justify-center">
          <p
            className="text-sm text-gray-700 truncate dark:text-gray-200"
            title={title ? title : formatTypeTitle(type)}
          >
            {title ? title : formatTypeTitle(type)}
          </p>
        </div>
      )}
    </div>
  );
};
