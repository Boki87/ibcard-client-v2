import { AppInput } from "../components/ui/AppInput";
import { AppButton } from "../components/ui/AppButton";
import { AiFillUnlock, AiOutlineMail } from "react-icons/ai";
import { AiFillLock } from "react-icons/ai";
import LogoWhite from "../assets/logo-white.png";
import LogoDark from "../assets/logo-dark.png";
import LogoWhiteSvg from "../assets/logo-white.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="max-w-sm w-full">
        <div className="text-center mb-4">
          <img src={LogoDark} className="max-w-md inline-block" />
        </div>
        <form>
          <AppInput leftIcon={<AiOutlineMail />} className="mb-3" />
          <AppInput
            rightIcon={showPassword ? <AiFillLock /> : <AiFillUnlock />}
            rightIconAction={() => setShowPassword(!showPassword)}
            className="mb-3"
            type={showPassword ? "text" : "password"}
          />
          <p className="text-right mb-3">
            <Link
              to="/forgot-password"
              className="text-blue-400 hover:underline"
            >
              Forgot Password?
            </Link>
          </p>
          <AppButton type="submit">LOGIN </AppButton>
        </form>
      </div>
    </div>
  );
};
