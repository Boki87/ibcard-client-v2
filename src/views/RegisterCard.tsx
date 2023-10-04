import { useParams } from "react-router-dom";
import { AppInput } from "../components/ui/AppInput";
import { FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import { useState, ChangeEvent, useEffect, FormEvent } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { api } from "../api";
import { AppButton } from "../components/ui/AppButton";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BsFillPersonFill } from "react-icons/bs";
import { useUserContext } from "../context/UserContext";
import { useAuth } from "../hooks/useAuth";

export const RegisterCardPage = () => {
  const { attemptLogin } = useAuth();
  const { user } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  async function submitHandler(e: FormEvent) {
    e.preventDefault();
    if (emailError || passwordError) return;
    try {
      setIsLoading(true);
      const res = await api.post(`/api/register-with-card`, {
        first_name: firstName,
        last_name: lastName,
        phone,
        email,
        password,
        token,
      });

      if (!user) {
        //attempt login
        await attemptLogin(email, password);
        navigate(`/edit/${token}`);
      } else {
        navigate(`/edit/${token}`);
      }

      toast.success(
        "You have successfully registered your card 👏. Go ahead now and edit it to your liking.",
        { duration: 5000 }
      );
    } catch (e) {
      console.log(e);
      toast.error(
        "Something went wrong. Please try again or contact our support."
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (email !== "" && confirmEmail !== "" && email !== confirmEmail) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }, [email, confirmEmail]);

  useEffect(() => {
    if (
      firstName !== "" &&
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
    <div className="w-full h-full flex items-center justify-center p-6 my-20">
      <form onSubmit={submitHandler} className="flex flex-col gap-3 w-full">
        <div className="text-center sm:text-lg text-3xl text-gray-700 dark:text-gray-200 font-bold uppercase">
          <p>welcome to ib card</p>
        </div>
        <div className="text-center sm:text-sm text-xl text-gray-700 dark:text-gray-200 font-bold uppercase">
          <p>Register your card</p>
        </div>
        <label className="ml-3 -mb-2 text-gray-700 dark:text-gray-200">
          First Name:
        </label>
        <AppInput
          required
          type="text"
          placeholder="John"
          autoComplete="off"
          leftIcon={<BsFillPersonFill />}
          value={firstName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setFirstName(e.target.value);
          }}
        />
        <label className="ml-3 -mb-2 text-gray-700 dark:text-gray-200">
          Last Name:
        </label>
        <AppInput
          required
          type="text"
          placeholder="Doe"
          autoComplete="off"
          leftIcon={<BsFillPersonFill />}
          value={lastName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setLastName(e.target.value);
          }}
        />
        <label className="ml-3 -mb-2 text-gray-700 dark:text-gray-200">
          Phone:
        </label>
        <AppInput
          required
          type="text"
          placeholder="+000 000 000"
          autoComplete="off"
          leftIcon={<FaPhone />}
          value={phone}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setPhone(e.target.value);
          }}
        />
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
        <label className="ml-3 -mb-2 -mt-2 text-gray-700 dark:text-gray-200">
          Confirm Email:
        </label>
        <AppInput
          required
          type="email"
          placeholder="john.doe@email.com"
          autoComplete="off"
          leftIcon={<FaEnvelope />}
          value={confirmEmail}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setConfirmEmail(e.target.value);
          }}
        />

        {emailError && (
          <p className="text-red-500 dark:text-red-300 -mt-2 ml-3">
            Emails don't match
          </p>
        )}

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
        <AppButton isLoading={isLoading} type="submit">
          NEXT
        </AppButton>
      </form>
    </div>
  );
};
