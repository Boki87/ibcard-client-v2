import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Contact } from "../../types/Contacts";
import { AppInput } from "../ui/AppInput";
import { ModalContainer, IModalContainer } from "../ui/ModalContainer";
import { Map } from "../Map";
import { AppButton } from "../ui/AppButton";
import { FaSave, FaTrash } from "react-icons/fa";
import { api } from "../../api";
import toast from "react-hot-toast";

interface ContactDetailsModalProps extends Partial<IModalContainer> {
  contact: Contact;
}

export const ContactDetailsModal = ({
  isOpen,
  onClose,
  contact: initialContactData,
}: ContactDetailsModalProps) => {
  const [contact, setContact] = useState(null);

  function onInputHandler(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target;
    const { value, name } = input;
    setContact((prev) => ({ ...prev, [name]: value }));
  }

  async function submitHandler(e: FormEvent) {
    e.preventDefault();
    try {
      await api.put(`/api/contacts/${contact.id}`, contact);
      toast.success("Contact updated successfully");
    } catch (e) {
      toast.error("Could not update contact. Please refresh and try again.");
      console.log(e);
    }
  }

  async function deleteHandler() {
    try {
      await api.delete(`/api/contacts/${contact.id}`);
      onClose();
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (!initialContactData) return;
    setContact(initialContactData);
  }, [initialContactData]);

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <div className="p-4 pt-6 min-h-screen mb-20">
        <h1 className="text-xl font-bold text-center uppercase">
          contact details
        </h1>
        <form onSubmit={submitHandler}>
          <AppInput
            placeholder="Full Name"
            className="mt-6"
            name="first_name"
            value={contact?.first_name ?? ""}
            onInput={onInputHandler}
          />
          <AppInput
            placeholder="Phone"
            className="mt-6"
            name="phone"
            value={contact?.phone ?? ""}
            onInput={onInputHandler}
          />
          <AppInput
            placeholder="Email"
            className="mt-6"
            name="email"
            value={contact?.email ?? ""}
            onInput={onInputHandler}
          />
          <AppInput
            placeholder="Company"
            className="mt-6"
            name="company_name"
            value={contact?.company_name ?? ""}
            onInput={onInputHandler}
          />
          <textarea
            placeholder="Message:"
            className="outline-none border border-transparent w-full bg-gray-200 dark:bg-gray-500 rounded-xl text-gray-800 placeholder:text-gray-500 dark:placeholder:text-gray-300 dark:text-white dark:placeholder-white my-6 p-4 h-[120px] focus:border-gray-400"
            name="message"
            value={contact?.message ?? ""}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              const input = e.target;
              const { value, name } = input;
              setContact((prev) => ({ ...prev, [name]: value }));
            }}
          ></textarea>
          {contact?.lat && contact?.long ? (
            <div className="w-full h-[300px] overflow-hidden rounded-lg">
              <Map lat={contact.lat} long={contact.long} />
            </div>
          ) : null}
          <div className="flex gap-2 my-4">
            <AppButton type="submit">
              <FaSave /> Save
            </AppButton>
            <AppButton onClick={deleteHandler} variant="gray" type="button">
              <FaTrash /> Delete
            </AppButton>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
};
