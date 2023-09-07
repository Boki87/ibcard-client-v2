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
  name: string,
  type: SocialType;
  icon: ReactElement;
}

export const SOCIAL_ICONS: SocialIcon[] = [
  {
    name: "Facebook",
    type: "facebook",
    icon: <FaFacebook />,
  },
  {
    name: "Instagram",
    type: "instagram",
    icon: <FaInstagram />,
  },
  {
    name: "Twitter",
    type: "twitter",
    icon: <FaTwitter />,
  },
  {
    name: "Strava",
    type: "strava",
    icon: <FaStrava />,
  },
  {
    name: "Github",
    type: "github",
    icon: <FaGithub />,
  },
  {
    name: "Pinterest",
    type: "pinterest",
    icon: <FaPinterest />,
  },
  {
    name: "Spotify",
    type: "spotify",
    icon: <FaSpotify />,
  },
  {
    name: "Tik Tok",
    type: "tiktok",
    icon: <FaTiktok />,
  },
  {
    name: "You Tube",
    type: "youtube",
    icon: <FaYoutube />,
  },
  {
    name: "Custom url",
    type: "custom_url",
    icon: <FaLink />,
  },
  {
    name: "Video",
    type: "video",
    icon: <FaYoutube />,
  },
  {
    name: "Special Offers",
    type: "special_offer",
    icon: <FaBook />,
  },
  {
    name: "Catalogue",
    type: "catalogue",
    icon: <FaBook />,
  },
];
