import { ReactElement } from "react";
import { SocialType } from "../types/SocialTypes";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaStrava,
  FaGithub,
  FaPinterest,
  FaSpotify,
  FaTiktok,
  FaLink,
  FaYoutube,
} from "react-icons/fa";
import { GrDocument, GrCatalog } from "react-icons/gr";

interface SocialIconProps {
  url: string;
  type: SocialType;
  title?: string;
  [x: string]: any;
}
interface IconsMap {
  [key: string]: ReactElement;
}
const iconsMap: IconsMap = {
  facebook: <FaFacebook />,
  instagram: <FaInstagram />,
  twitter: <FaTwitter />,
  strava: <FaStrava />,
  github: <FaGithub />,
  pinterest: <FaPinterest />,
  spotify: <FaSpotify />,
  tiktok: <FaTiktok />,
  custom_url: <FaLink />,
  video: <FaYoutube />,
  flyer: <GrDocument />,
  catalogue: <GrCatalog />,
};

export const SocialIcon = ({ url, type, title, ...props }: SocialIconProps) => {
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
          {iconsMap[type]}
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
