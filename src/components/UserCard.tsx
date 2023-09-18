import { Link } from "react-router-dom";
import { Card } from "../types/Card";
import { BsQrCodeScan, BsChevronRight } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

interface UserCardProps {
  data: Card;
  onQrCodeClick: () => void;
}

export const UserCard = ({ data, onQrCodeClick }: UserCardProps) => {
  const cardUid = data.nfc_card?.link.split("/card/")[1];

  return (
    <div className="w-full max-w-lg rounded-2xl my-4 p-4 shadow-xl flex h-[180px] mx-auto bg-white dark:bg-gray-800  border border-gray-300 dark:border-gray-400">
      {data.first_name && data.first_name !== "" ? (
        <>
          <Link to={`/card/${cardUid}`} className="flex flex-col flex-1">
            <div className="w-20 h-20 rounded-full flex flex-col overflow-hidden items-center justify-center mb-2 bg-slate-300">
              {data.image_path ? (
                <img
                  src={data.image_path}
                  className="object-cover h-full w-full"
                />
              ) : (
                <FaUser className="text-gray-700 text-3xl" />
              )}
            </div>
            <span className="text-xl text-gray-800 dark:text-white font-bold -mb-1">
              {data.first_name} {data.last_name}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-300">
              {data.company_role}{" "}
              {data.company?.name
                ? "@ " + data.company.name
                : data.company_name
                ? "@ " + data.company_name
                : null}
            </span>
          </Link>
          <div className="h-full flex flex-col justify-between items-center">
            <button
              onClick={onQrCodeClick}
              className="text-4xl dark:text-gray-200"
            >
              <BsQrCodeScan />
            </button>
            <Link
              to={`/edit/${cardUid}`}
              className="text-sm flex items-center hover:underline dark:text-gray-200"
            >
              Edit <BsChevronRight className="ml-2" />
            </Link>
          </div>
        </>
      ) : (
        <Link
          to={`/edit/${cardUid}`}
          className="text-sm flex items-center hover:underline dark:text-gray-200"
        >
          <div className="w-full h-full flex items-center justify-center">
            <p className="uppercase text-gray-900 dark:text-white text-center">
              tap here to setup your card for the first time
            </p>
          </div>
        </Link>
      )}
    </div>
  );
};
