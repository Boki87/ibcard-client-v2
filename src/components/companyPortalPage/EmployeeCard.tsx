import { FaChevronRight, FaUser } from "react-icons/fa";
import { Card } from "../../types/Card";
import { AppButton } from "../ui/AppButton";

type EmployeeCardProps = Partial<Card>;

export const EmployeeCard = ({
  first_name,
  last_name,
  department,
  image_path,
}: EmployeeCardProps) => {
  return (
    <div className="flex my-6 gap-4">
      <div className="min-w-[100px] min-h-[100px]">
        <div className="w-[100px] h-[100px] rounded-full flex items-center justify-center relative overflow-hidden bg-slate-200 dark:bg-slate-500">
          {image_path ? (
            <img
              src={image_path}
              alt="user avatar"
              className="object-cover min-w-full min-h-full"
            />
          ) : (
            <FaUser className="text-5xl" />
          )}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="text-gray-800 dark:text-white font-bold text-xl">
          {first_name} {last_name}
        </div>
        <div className="text-gray-800 dark:text-gray-400">{department}</div>
        <div className="flex-1"></div>
        <div className="flex gap-2">
          <button className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex-1 text-gray-700 dark:text-gray-200 flex items-center justify-between px-2 pointer">
            <span>Share card</span>
            <FaChevronRight />
          </button>
          <button className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex-1 text-gray-700 dark:text-gray-200 flex items-center justify-between px-2 pointer">
            <span>View</span>
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};
