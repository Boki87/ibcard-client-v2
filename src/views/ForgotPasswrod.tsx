import { Link, useParams } from "react-router-dom";
import { AppInput } from "../components/ui/AppInput";
import { FaChevronLeft, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import { useState, ChangeEvent, useEffect, FormEvent } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { api } from "../api";
import { AppButton } from "../components/ui/AppButton";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  async function submitHandler(e: FormEvent) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await api.post("/api/send-reset-password-token", {
        email,
      });
      if (res.data.error) {
        return toast.error(
          "Could not send reset password email. Please try again, or contact our support."
        );
      }
      setEmail("");
      toast.success(
        "Reset password email successfully sent. Check your inbox or spam."
      );
      navigate("/");
    } catch (e) {
      console.log(e);
      toast.error(
        "Could not send reset password email. Please try again, or contact our support."
      );
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <form onSubmit={submitHandler} className="flex flex-col gap-3 w-full">
        <div className="text-center sm:text-sm text-lg text-gray-700 dark:text-gray-200 font-bold">
          <p>
            Enter the email address associated with your account and we'll send
            you a link to reset your password
          </p>
        </div>
        <label className="ml-3 -mb-2 text-gray-700 dark:text-gray-200">
          Email:
        </label>
        <AppInput
          required
          type="email"
          placeholder="john.doe@email.com"
          autoComplete="off"
          leftIcon={<FaEnvelope />}
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
        />
        <AppButton isLoading={isLoading} type="submit">
          Request Reset Password
        </AppButton>
      </form>

      <Link
        to="/"
        className="absolute bottom-0 left-0 m-4 text-gray-800 dark:text-gray-200 p-4"
      >
        <FaChevronLeft />
      </Link>
    </div>
  );
};
