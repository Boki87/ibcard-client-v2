import { SocialType } from "../types/SocialTypes";
import { SOCIAL_ICONS } from "../lib/socialLinks";

interface SocialIconProps {
  type: SocialType;
  title?: string;
  [x: string]: any;
}

export const SocialIcon = ({ type, title, ...props }: SocialIconProps) => {
  const icon = SOCIAL_ICONS.filter((i) => i.type === type)[0];

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
        <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-tr from-slate-400 to-white rounded-xl text-3xl text-gray-700 dark:from-black dark:to-slate-600 dark:text-gray-200">
          {icon.icon}
        </div>
      </div>
      <div className="flex justify-center">
        <p
          className="text-sm text-gray-700 truncate dark:text-gray-200 capitalize"
          title={title ? title : formatTypeTitle(type)}
        >
          {title ? title : formatTypeTitle(type)}
        </p>
      </div>
    </div>
  );
};
