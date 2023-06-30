import { useState } from "react";
import { Card } from "../../types/Card";
import { UserCardEdit } from "./UserCardEdit";
import { AppInput } from "../ui/AppInput";
import { AppSelect } from "../ui/AppSelect";
import { FaFlagUsa, FaUserTag } from "react-icons/fa";
import { BsFillBuildingFill, BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { AiOutlineLink } from "react-icons/ai";
import { VscAdd } from "react-icons/vsc";

interface EditPageComponentProps {
  cardData: Card;
}
export const EditPageComponent = ({ cardData }: EditPageComponentProps) => {
  const [initialCardData, setInitialCardData] = useState<Card>(cardData);

  return (
    <div>
      <UserCardEdit />
      <AppSelect leftIcon={<FaFlagUsa />}>
        <option>USA</option>
        <option>Croatia</option>
        <option>Serbia</option>
      </AppSelect>
      <AppSelect leftIcon={<BsFillBuildingFill />} className="my-3">
        <option>Marketing</option>
        <option>Customer Support</option>
        <option>Management</option>
      </AppSelect>
      <AppInput leftIcon={<FaUserTag />} placeholder="Role" className="my-3" />

      <AppInput
        leftIcon={<BsTelephoneFill />}
        placeholder="Phone"
        className="my-3 mt-6"
      />
      <AppInput leftIcon={<MdEmail />} placeholder="Email" className="my-3" />
      <AppInput
        leftIcon={<AiOutlineLink />}
        placeholder="Website"
        className="my-3"
      />

      <div className="flex items-center my-10">
        <div className="flex flex-col flex-1">
          <span className="text-gray-800 text-xl font-bold dark:text-white">
            Add & edit socials
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            You have 23 socials added
          </span>
        </div>
        <div className="w-[100px] h-[100px] rounded-full flex items-center justify-center bg-gray-300">
          <VscAdd className="text-4xl" />
        </div>
      </div>
    </div>
  );
};
