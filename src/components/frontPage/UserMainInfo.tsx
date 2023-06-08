import { HiOutlinePhone, HiOutlineMail, HiLink } from "react-icons/hi";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { FaViber } from "react-icons/fa";

const infoIcons = {
  email: <HiOutlineMail />,
  website: <HiLink />,
  mobile: <HiOutlinePhone />,
  whatsapp: <AiOutlineWhatsApp />,
  viber: <FaViber />,
};

interface UserMainInfoProps {
  email?: string;
  website?: string;
  mobile?: string;
  whatsapp?: string;
  viber?: string;
}

export const UserMainInfo = ({
  email,
  website,
  mobile,
  whatsapp,
  viber,
}: UserMainInfoProps) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {email && <UserInfoItem type="email" val={email} />}
        {mobile && <UserInfoItem type="mobile" val={mobile} />}
        {website && <UserInfoItem type="website" val={website} />}
        {whatsapp && <UserInfoItem type="whatsapp" val={whatsapp} />}
        {viber && <UserInfoItem type="viber" val={viber} />}
      </div>
    </>
  );
};

interface UserInfoProps {
  type: "email" | "website" | "mobile" | "whatsapp" | "viber";
  val: string;
}

const UserInfoItem = ({ type, val }: UserInfoProps) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center justify-center min-w-[32px] min-h-[32px] rounded-full border border-gray-400 dark:border-gray-400 text-gray-700 dark:text-gray-300 bg-slate-100 dark:bg-slate-700">
        {infoIcons[type]}
      </div>
      <span className="text-xs text-gray-700 dark:text-gray-200 truncate">
        {val}
      </span>
    </div>
  );
};
