import { Card } from "../../types/Card";
import { BsQrCodeScan, BsChevronRight } from "react-icons/bs";
import { getFlag } from "../../lib/countries";

interface UserCardProps {
  data: Card;
  onQrCodeClick: () => void;
}

export const UserCard = ({ data, onQrCodeClick }: UserCardProps) => {
  const flag = getFlag(data.country || "");
  return (
    <div className="w-full max-w-lg rounded-2xl my-4 p-4 shadow-xl flex h-[180px] mx-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-400">
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
          <span className="text-sm text-gray-500 dark:text-gray-300 flex items-center space-x-2">
            <span>
              {data.company_role} @{data.company?.name}
            </span>
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
      <div className="h-full flex flex-col justify-between items-end">
        <button onClick={onQrCodeClick} className="text-4xl dark:text-gray-200">
          <BsQrCodeScan />
        </button>
        <div className="text-sm flex items-center hover:underline dark:text-gray-200">
          Share my card <BsChevronRight className="ml-2" />
        </div>
      </div>
    </div>
  );
};
