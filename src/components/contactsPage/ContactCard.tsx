import { forwardRef } from "react";
import { FaEdit, FaInfo, FaPhone } from "react-icons/fa";
import { Contact } from "../../types/Contacts";
import { AppButton } from "../ui/AppButton";
import { MdEmail } from "react-icons/md";
import { MdContacts } from "react-icons/md";
import VCard from "vcard-creator";

interface ContactCardProps {
  contact: Partial<Contact>;
  onOpen: () => void;
}

export const ContactCard = forwardRef<HTMLDivElement, ContactCardProps>(
  ({ contact, onOpen }, ref) => {
    function saveToContacts() {
      const myVCard = new VCard();
      myVCard.addName(contact.first_name || "", contact.last_name || "");
      if (contact.phone) {
        myVCard.addPhoneNumber(contact.phone);
      }
      if (contact.email) {
        myVCard.addEmail(contact.email);
      }

      const blob = new Blob([myVCard.toString()], { type: "text/vcard" });
      const elem = window.document.createElement("a");
      elem.href = window.URL.createObjectURL(blob);
      elem.download = "vcard.vcf";
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
    }

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
          <a href={`tel:${contact.phone}`}>
            <AppButton variant="gray" className="p-2 min-w-[40px]">
              <FaPhone />
            </AppButton>
          </a>
          <a href={`mailto:${contact.email}`}>
            <AppButton variant="gray" className="p-2 min-w-[40px]">
              <MdEmail />
            </AppButton>
          </a>
          <AppButton
            onClick={saveToContacts}
            variant="gray"
            className="p-2 min-w-[40px]"
          >
            <MdContacts />
          </AppButton>
        </div>
      </div>
    );
  }
);
