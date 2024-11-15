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
  FaWhatsapp,
  FaViber,
  FaTelegram
  } from "react-icons/fa";

interface SocialIcon {
  name: string;
  type: SocialType;
  icon: ReactElement;
  bg?: string;
}

export const SOCIAL_ICONS: SocialIcon[] = [
  {
    name: "Whatsapp",
    type: "whatsapp",
    icon: <FaWhatsapp />,
    bg: "bg-green-500",
  },
  {
    name: "Telegram",
    type: "telegram",
    icon: <FaTelegram />,
    bg: "bg-telegramBlue",
  },
  
  {
    name: "Viber",
    type: "viber",
    icon: <FaViber />,
    bg: "bg-purple-500",
  },
  {
    name: "Facebook",
    type: "facebook",
    icon: <FaFacebook />,
    bg: "bg-blue-500",
  },
  {
    name: "Linkedin",
    type: "linkedin",
    icon: <FaLinkedin />,
    bg: "bg-blue-500",
  },
  {
    name: "Instagram",
    type: "instagram",
    icon: <FaInstagram />,
    bg: "bg-gradient-to-br from-purple-400 via-pink-500 to-red-500",
  },
  {
    name: "Twitter",
    type: "twitter",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 512 512"
        className="fill-white"
      >
        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
      </svg>
    ),
    bg: "bg-blue-400",
  },
  {
    name: "Strava",
    type: "strava",
    icon: <FaStrava />,
    bg: "bg-orange-600",
  },
  {
    name: "Github",
    type: "github",
    icon: <FaGithub />,
    bg: "bg-black",
  },
  {
    name: "Pinterest",
    type: "pinterest",
    icon: <FaPinterest />,
    bg: "bg-red-500",
  },
  {
    name: "Spotify",
    type: "spotify",
    icon: <FaSpotify />,
    bg: "bg-green-600",
  },
  {
    name: "Tik Tok",
    type: "tiktok",
    icon: <FaTiktok />,
    bg: "bg-black",
  },
  {
    name: "You Tube",
    type: "youtube",
    icon: <FaYoutube />,
    bg: "bg-red-500",
  },
  {
    name: "Custom url",
    type: "custom_url",
    icon: <FaLink />,
    bg: "bg-primary",
  },
  {
    name: "Video",
    type: "video",
    icon: <FaYoutube />,
    bg: "bg-black",
  },
  {
    name: "Special Offers",
    type: "special_offer",
    icon: <FaBook />,
    bg: "bg-primary",
  },
  {
    name: "Catalogue",
    type: "catalogue",
    icon: <FaBook />,
    bg: "bg-primary",
  },
  {
    name: "Flyer",
    type: "flyer",
    icon: <FaBook />,
    bg: "bg-primary",
  },
];
