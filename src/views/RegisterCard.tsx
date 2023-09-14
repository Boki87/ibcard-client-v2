import { useParams } from "react-router-dom";
import { AppInput } from "../components/ui/AppInput";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { useState, ChangeEvent, useEffect, FormEvent } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { api } from "../api";
import { AppButton } from "../components/ui/AppButton";
import { useNavigate } from "react-router-dom";

export const RegisterCardPage = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("boki.test@email.com");
  const [confirmEmail, setConfirmEmail] = useState("boki.test@email.com");
  const [password, setPassword] = useState("1234567");
  const [phone, setPhone] = useState("+381601540010");
  const [emailError, setEmailError] = useState(false);

  async function submitHandler(e: FormEvent) {
    if (emailError) return;
    e.preventDefault();
    try {
      const res = await api.post(`/api/register-with-card`, {
        phone,
        email,
        password,
        token,
      });
      if (res.data.newRegistration) {
        navigate(`/`);
      } else {
        navigate(`/`);
      }
    } catch (e) {}
  }

  useEffect(() => {
    if (email !== "" && confirmEmail !== "" && email !== confirmEmail) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }, [email, confirmEmail]);

  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <form onSubmit={submitHandler} className="flex flex-col gap-3 w-full">
        <div className="text-center text-xl text-gray-700 dark:text-gray-200">
          <p>Register with your new card</p>
        </div>
        <AppInput
          required
          type="text"
          placeholder="Phone Number"
          autoComplete="off"
          leftIcon={<FaPhone />}
          value={phone}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setPhone(e.target.value);
          }}
        />
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
        <AppInput
          required
          type="email"
          placeholder="Confirm email"
          autoComplete="off"
          leftIcon={<FaEnvelope />}
          value={confirmEmail}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setConfirmEmail(e.target.value);
          }}
        />

        {emailError && (
          <p className="text-red-500 dark:text-red-300">Emails don't match</p>
        )}
        <AppInput
          required
          placeholder="Password"
          autoComplete="off"
          rightIcon={
            showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
          }
          rightIconAction={() => setShowPassword(!showPassword)}
          className="mb-3"
          type={showPassword ? "text" : "password"}
          value={password}
          onInput={(e: ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
        />
        <AppButton type="submit">Register</AppButton>
      </form>
    </div>
  );
};
