import { useParams } from "react-router-dom";
import { AppInput } from "../components/ui/AppInput";
import { FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import { useState, ChangeEvent, useEffect, FormEvent } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { api } from "../api";
import { AppButton } from "../components/ui/AppButton";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  async function submitHandler(e: FormEvent) {
    e.preventDefault();
    if (passwordError) return;
    try {
      const res = await api.post(`/api/submit-password-reset`, {
        email,
        password,
        password_confirmation: password,
        token,
      });
      navigate(`/`);
      toast.success("You have successfully changed your password");
    } catch (e) {
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    if (
      password !== "" &&
      confirmPassword !== "" &&
      password !== confirmPassword
    ) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [password, confirmPassword]);

  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <form onSubmit={submitHandler} className="flex flex-col gap-3 w-full">
        <div className="text-center sm:text-sm text-xl text-gray-700 dark:text-gray-200 font-bold uppercase">
          <p>Reset your password</p>
        </div>
        <label className="ml-3 -mb-2 text-gray-700 dark:text-gray-200">
          Email:
        </label>
        <AppInput
          required
          type="email"
          placeholder="Email"
          autoComplete="off"
          leftIcon={<FaEnvelope />}
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
        />

        <label className="ml-3 -mb-2 text-gray-700 dark:text-gray-200">
          Password:
        </label>
        <AppInput
          required
          placeholder="Password"
          autoComplete="off"
          rightIcon={
            showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
          }
          leftIcon={<FaLock />}
          rightIconAction={() => setShowPassword(!showPassword)}
          type={showPassword ? "text" : "password"}
          value={password}
          onInput={(e: ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
        />
        <label className="ml-3 -mb-2 -mt-2 text-gray-700 dark:text-gray-200">
          Confirm Password:
        </label>
        <AppInput
          required
          placeholder="Confirm Password"
          autoComplete="off"
          rightIcon={
            showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
          }
          leftIcon={<FaLock />}
          rightIconAction={() => setShowConfirmPassword(!showConfirmPassword)}
          className="mb-3"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onInput={(e: ChangeEvent<HTMLInputElement>) => {
            setConfirmPassword(e.target.value);
          }}
        />
        {passwordError && (
          <p className="text-red-500 dark:text-red-300 -mt-2 ml-3">
            Passwords don't match
          </p>
        )}
        <AppButton type="submit">Reset</AppButton>
      </form>
    </div>
  );
};
