import { Link } from "react-router-dom";
import { Card } from "../../types/Card";
import { BsQrCodeScan, BsChevronRight } from "react-icons/bs";

interface UserCardProps {
  data: Card;
}

export const UserCard = ({ data }: UserCardProps) => {
  const cardUid = data.nfc_card?.link.split("/card/")[1];

  return (
    <div className="w-full max-w-lg rounded-2xl my-4 p-4 shadow-xl flex h-[180px] mx-auto bg-white dark:bg-gray-800">
      <div className="flex flex-col flex-1 justify-between">
        {data.image_path && (
          <div className="w-20 h-20 rounded-full flex flex-col overflow-hidden items-center justify-center mb-2">
            <img src={data.image_path} className="object-cover h-full w-full" />
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-xl text-gray-800 dark:text-white font-bold -mb-1">
            {data.first_name} {data.last_name}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-300">
            {data.company_role} @{data.company?.name}
          </span>
        </div>
      </div>
      <div className="h-full flex flex-col justify-between items-end">
        <button className="text-4xl dark:text-gray-200">
          <BsQrCodeScan />
        </button>
        <div className="text-sm flex items-center hover:underline dark:text-gray-200">
          Share my card <BsChevronRight className="ml-2" />
        </div>
      </div>
    </div>
  );
};
