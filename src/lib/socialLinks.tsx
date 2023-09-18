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
  FaLinkedin,
} from "react-icons/fa";

interface SocialIcon {
  name: string;
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
    name: "Linkedin",
    type: "linkedin",
    icon: <FaLinkedin />,
  },
  {
    name: "Instagram",
    type: "instagram",
    icon: <FaInstagram />,
  },
  {
    name: "Twitter",
    type: "twitter",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 512 512"
        className="fill-black dark:fill-white"
      >
        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
      </svg>
    ),
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
  {
    name: "Flyer",
    type: "flyer",
    icon: <FaBook />,
  },
];
