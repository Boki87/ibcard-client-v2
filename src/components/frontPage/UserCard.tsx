import { Card } from "../../types/Card";
import { BsQrCodeScan, BsChevronRight, BsFillShareFill } from "react-icons/bs";
import { getFlag } from "../../lib/countries";
import { GiChart } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { IoBarChartSharp } from "react-icons/io5";

interface UserCardProps {
  data: Card;
  onQrCodeClick: (showShareOptions: boolean) => void;
}

export const UserCard = ({ data, onQrCodeClick }: UserCardProps) => {
  const { user } = useUserContext();
  const flag = getFlag(data.country || "");
  return (
    <div className="w-full max-w-lg rounded-2xl my-4 p-4 shadow-xl flex min-h-[200px] mx-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-400">
      <div className="flex flex-col flex-1 justify-between">
        {data.image_path && (
          <div className="w-32 h-32 rounded-full flex flex-col overflow-hidden items-center justify-center mb-2">
            <img src={data.image_path} className="object-cover h-full w-full" />
          </div>
        )}
        <div className="flex flex-col flex-wrap">
          <span className="text-xl text-gray-800 dark:text-white font-bold mb-0">
            {data.first_name} {data.last_name}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-300 flex items-center flex-wrap">
            <span className="mr-2">{data.company_role} </span>
            {data.company?.name ? (
              <span className="mr-2">{"@" + data.company.name}</span>
            ) : data.company_name !== "" ? (
              <span className="mr-2">{"@" + data.company_name}</span>
            ) : null}
            {flag !== "" && (
              <div className="w-6 h-6 flex items-center justify-center overflow-hidden rounded-full">
                <img
                  src={flag}
                  className="object-cover min-h-full min-w-full"
                />
              </div>
            )}
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end min-h-[200px]">
        <div className="flex items-center gap-3">
          {user && user.id === data.user_id ? (
            <Link
              to={`/stats/${data.nfc_card.link.substring(
                data.nfc_card.link.lastIndexOf("/") + 1
              )}`}
            >
              <IoBarChartSharp className="text-4xl text-gray-800 dark:text-gray-200" />
            </Link>
          ) : null}
          <button
            onClick={() => onQrCodeClick(false)}
            className="text-4xl dark:text-gray-200"
          >
            <BsQrCodeScan />
          </button>
        </div>
        <div
          onClick={() => onQrCodeClick(true)}
          className="text-sm flex items-center hover:underline dark:text-gray-200 cursor-pointer"
        >
          Share Card <BsFillShareFill className="ml-2" />
        </div>
      </div>
    </div>
  );
};
