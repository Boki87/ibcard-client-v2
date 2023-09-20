import { HiOutlinePhone, HiOutlineMail, HiLink } from "react-icons/hi";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { FaViber } from "react-icons/fa";
import { ImLocation } from "react-icons/im";

const infoIcons = {
  email: <HiOutlineMail />,
  website: <HiLink />,
  mobile: <HiOutlinePhone />,
  whatsapp: <AiOutlineWhatsApp />,
  viber: <FaViber />,
  address: <ImLocation />,
};

interface UserMainInfoProps {
  email?: string;
  email2?: string;
  mobile?: string;
  mobile2?: string;
  whatsapp?: string;
  viber?: string;
  address?: string;
  website?: string;
}

export const UserMainInfo = ({
  email,
  email2,
  mobile,
  mobile2,
  whatsapp,
  viber,
  address,
  website,
}: UserMainInfoProps) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {email && <UserInfoItem type="email" val={email} />}
        {mobile && <UserInfoItem type="mobile" val={mobile} />}
        {/* {whatsapp && <UserInfoItem type="whatsapp" val={whatsapp} />}
        {viber && <UserInfoItem type="viber" val={viber} />} */}
        {mobile2 && <UserInfoItem type="mobile" val={mobile2} />}
        {email2 && <UserInfoItem type="email" val={email2} />}
        {address && <UserInfoItem type="address" val={address} />}
        {website && <UserInfoItem type="website" val={website} />}
      </div>
    </>
  );
};

interface UserInfoProps {
  type: "email" | "mobile" | "whatsapp" | "viber" | "address" | "website";
  val: string;
}

const UserInfoItem = ({ type, val }: UserInfoProps) => {
  const hrefTemplates = {
    email: `mailto:`,
    mobile: `tel:`,
    whatsapp: `https://api.whatsapp.com/send?phone=`,
    viber: `viber://add?number=`,
  };

  let href = hrefTemplates[type] || "" + val;
  if (type === "address") {
    href = "https://maps.google.com/maps?q=" + encodeURIComponent(val);
  }
  let style = "bg-slate-100 dark:bg-slate-700";
  if (type === "whatsapp") {
    style = "bg-green-600 text-white border-green-600 dark:border-green-600";
  }
  if (type === "viber") {
    style = "bg-purple-600 text-white border-purple-600 dark:border-purple-600";
  }

  function sanitizeLinkToHaveHttp(url?: string) {
    if (!url) return "";
    if (!url.startsWith("http")) {
      return `https://${url}`;
    }
    return url;
  }

  let sanitizedHref = href;

  if (type === "website") {
    sanitizedHref = sanitizeLinkToHaveHttp(href);
  }

  return (
    <a
      href={sanitizedHref}
      target={type === "website" || type === "address" ? "_blank" : "_self"}
      className="flex items-center space-x-2"
    >
      <div
        className={
          "flex items-center justify-center min-w-[32px] min-h-[32px] rounded-lg border border-gray-400 dark:border-gray-400 text-gray-700 dark:text-gray-300 " +
          style
        }
      >
        {infoIcons[type]}
      </div>
      <span className="text-xs text-gray-700 dark:text-gray-200 truncate">
        {val}
      </span>
    </a>
  );
};
