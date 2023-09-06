import { forwardRef } from "react";
import { FaEdit, FaInfo, FaPhone } from "react-icons/fa";
import { Contact } from "../../types/Contacts";
import { AppButton } from "../ui/AppButton";
import { MdEmail } from "react-icons/md";
import { MdContacts } from "react-icons/md";

interface ContactCardProps {
  contact: Partial<Contact>;
  onOpen: () => void;
}

export const ContactCard = forwardRef<HTMLDivElement, ContactCardProps>(
  ({ contact, onOpen }, ref) => {
    return (
      <div
        ref={ref}
        className="w-full rounded-2xl bg-slate-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 my-2 flex h-[70px] overflow-hidden"
      >
        <div
          onClick={onOpen}
          className="w-8 h-full bg-slate-400 flex items-center justify-center text-gray-800"
        >
          <FaInfo />
        </div>
        <div className="flex-1 truncate p-2">
          <div className="flex gap-1 font-bold text-xl text-black dark:text-white truncate">
            <span className="truncate">
              {contact.first_name && <>{contact.first_name}</>}
              {contact.last_name && <> {contact.last_name}</>}
            </span>
          </div>
          {contact.title && (
            <div className="flex gap-1 text-sm truncate">
              <span className="truncate">
                {contact.title}
                {contact.company_name && <>@ {contact.company_name}</>}
              </span>
            </div>
          )}
        </div>
        <div className="h-full flex items-center gap-1 p-2">
          <AppButton variant="gray" className="p-2 min-w-[40px]">
            <FaPhone />
          </AppButton>
          <AppButton variant="gray" className="p-2 min-w-[40px]">
            <MdEmail />
          </AppButton>
          <AppButton variant="gray" className="p-2 min-w-[40px]">
            <MdContacts />
          </AppButton>
        </div>
      </div>
    );
  }
);
