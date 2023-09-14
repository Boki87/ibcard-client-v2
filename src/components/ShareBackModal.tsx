import { AppButton } from "./ui/AppButton";
import { AppInput } from "./ui/AppInput";
import { ModalContainer } from "./ui/ModalContainer";
import { BiSend } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useGeoLocation } from "../hooks/useGeoLocation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { api } from "../api";
import { useCardData } from "../hooks/useCardData";
import { IoIosPin } from "react-icons/io";
import toast from "react-hot-toast";

interface ShareBackModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactId?: number;
  cardDataId: string;
  cardOwner?: string;
}

const initialFormData = {
  company_name: "",
  title: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  message: "",
};

export const ShareBackModal = ({
  isOpen,
  onClose,
  cardDataId,
  cardOwner,
}: ShareBackModalProps) => {
  const { getLocation, coords, isLoading, isSet, error, resetCoords } =
    useGeoLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  function onInputHandler(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target;
    const { value, name } = input;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function submitHandler(e: FormEvent) {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await api.post(`/api/share-back`, {
        ...formData,
        ...coords,
        users_data_id: cardDataId,
      });
      setTimeout(() => {
        onClose();
        toast.success(
          "You have successfully shared your information with this card holder 👏"
        );
      }, 1000);
    } catch (e) {
      console.log(e);
      setIsSubmitting(false);
    }
  }

  function resetAll() {
    setIsSubmitting(false);
    setFormData(initialFormData);
    resetCoords();
  }

  useEffect(() => {
    if (!isOpen) {
      resetAll();
    }
  }, [isOpen]);

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <form className="p-6" onSubmit={submitHandler}>
        <p className="text-center text-gray-600 dark:text-gray-200 mt-10">
          Share back your contact information with{" "}
          {cardOwner ? (
            <span className="font-bold">{cardOwner}</span>
          ) : (
            <span>this card owner</span>
          )}
        </p>
        <AppInput
          placeholder="Full Name*"
          required
          className="mt-6"
          name="first_name"
          value={formData.first_name}
          onInput={onInputHandler}
        />
        <AppInput
          placeholder="E-mail*"
          type="email"
          required
          className="mt-3"
          name="email"
          value={formData.email}
          onInput={onInputHandler}
        />
        <AppInput
          placeholder="Phone number*"
          required
          className="mt-3"
          name="phone"
          value={formData.phone}
          onInput={onInputHandler}
        />
        <AppInput
          placeholder="Company Name"
          className="mt-3"
          name="company_name"
          value={formData.company_name}
          onInput={onInputHandler}
        />
        <AppButton
          onClick={getLocation}
          isLoading={isLoading}
          className="mt-4"
          disabled={isSet}
          type="button"
        >
          {!isSet ? (
            <div className="flex items-center justify-center space-x-2">
              <span>Add your location</span> <IoIosPin />
            </div>
          ) : (
            <span>Location set</span>
          )}
        </AppButton>
        <textarea
          placeholder="Message:"
          className="outline-none border border-transparent w-full bg-gray-200 dark:bg-gray-500 rounded-xl text-gray-800 placeholder:text-gray-500 dark:placeholder:text-gray-300 dark:text-white dark:placeholder-white mt-4 p-4 h-[120px] focus:border-gray-400"
          name="message"
          value={formData.message}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            const input = e.target;
            const { value, name } = input;
            setFormData((prev) => ({ ...prev, [name]: value }));
          }}
        ></textarea>
        <AppButton className="mt-4" type="submit" isLoading={isSubmitting}>
          Send <BiSend />
        </AppButton>
        <p className="text-center text-gray-600 dark:text-gray-200 mt-4">
          By sharing your information you agree with our{" "}
          <Link to="/terms">Terms & Conditions</Link>
        </p>
      </form>
    </ModalContainer>
  );
};
