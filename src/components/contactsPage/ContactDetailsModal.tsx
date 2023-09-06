import { ChangeEvent, useState } from "react";
import { Contact } from "../../types/Contacts";
import { AppInput } from "../ui/AppInput";
import { ModalContainer, IModalContainer } from "../ui/ModalContainer";
import { Map } from "../Map";

interface ContactDetailsModalProps extends Partial<IModalContainer> {
  contact: Contact;
}

export const ContactDetailsModal = ({
  isOpen,
  onClose,
  contact: initialContactData,
}: ContactDetailsModalProps) => {
  const [contact, setContact] = useState(() => initialContactData);

  function onInputHandler(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target;
    const { value, name } = input;
    setContact((prev) => ({ ...prev, [name]: value }));
  }
  if (!contact) return null;

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <div className="p-4 pt-6">
        <h1 className="text-xl font-bold text-center uppercase">
          contact details
        </h1>
        <form>
          <AppInput
            placeholder="First Name"
            className="mt-6"
            name="first_name"
            value={contact.first_name}
            onInput={onInputHandler}
          />
          <AppInput
            placeholder="Last Name"
            className="mt-6"
            name="last_name"
            value={contact.last_name}
            onInput={onInputHandler}
          />
          <AppInput
            placeholder="Phone"
            className="mt-6"
            name="phone"
            value={contact.phone}
            onInput={onInputHandler}
          />

          <hr className="my-6 border-gray-200 dark:border-gray-500" />

          <AppInput
            placeholder="Email"
            className="mt-6"
            name="email"
            value={contact.email}
            onInput={onInputHandler}
          />
          <AppInput
            placeholder="Title"
            className="mt-6"
            name="title"
            value={contact.title}
            onInput={onInputHandler}
          />
          <AppInput
            placeholder="Company"
            className="mt-6"
            name="company_name"
            value={contact.company_name}
            onInput={onInputHandler}
          />
          <textarea
            placeholder="Message:"
            className="outline-none border border-transparent w-full bg-gray-200 dark:bg-gray-500 rounded-xl text-gray-800 placeholder:text-gray-500 dark:placeholder:text-gray-300 dark:text-white dark:placeholder-white mt-6 p-4 h-[120px] focus:border-gray-400"
            name="message"
            value={contact.message}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              const input = e.target;
              const { value, name } = input;
              setContact((prev) => ({ ...prev, [name]: value }));
            }}
          ></textarea>
          <Map />
        </form>
      </div>
    </ModalContainer>
  );
};
