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
  FaBook,
} from "react-icons/fa";
import { GrDocument } from "react-icons/gr";

interface SocialIcon {
  type: SocialType;
  icon: ReactElement;
}

export const SOCIAL_ICONS: SocialIcon[] = [
  {
    type: "facebook",
    icon: <FaFacebook />,
  },
  {
    type: "instagram",
    icon: <FaInstagram />,
  },
  {
    type: "twitter",
    icon: <FaTwitter />,
  },
  {
    type: "strava",
    icon: <FaStrava />,
  },
  {
    type: "github",
    icon: <FaGithub />,
  },
  {
    type: "pinterest",
    icon: <FaPinterest />,
  },
  {
    type: "spotify",
    icon: <FaSpotify />,
  },
  {
    type: "tiktok",
    icon: <FaTiktok />,
  },
  {
    type: "youtube",
    icon: <FaYoutube />,
  },
  {
    type: "custom_url",
    icon: <FaLink />,
  },
  {
    type: "video",
    icon: <FaYoutube />,
  },
  {
    type: "special_offer",
    icon: <GrDocument />,
  },
  {
    type: "catalogue",
    icon: <FaBook />,
  },
];
