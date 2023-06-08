import { AppInput } from "../components/ui/AppInput";
import { AppButton } from "../components/ui/AppButton";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { SyntheticEvent, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { AppLogo } from "../components/ui/AppLogo";
import { ThemeToggle } from "../components/ThemeToggle";

export const Login = () => {
  const { email, password, attemptLogin, updateAuthForm, isLoading } =
    useAuth();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full h-full flex items-center justify-center p-6 bg-white dark:bg-gray-700">
      <div className="max-w-sm w-full">
        <div className="text-center mb-4">
          <AppLogo className="h-16 inline" />
        </div>
        <form onSubmit={attemptLogin}>
          <AppInput
            leftIcon={<AiOutlineMail />}
            placeholder="Email"
            value={email}
            onInput={(e: SyntheticEvent) => {
              const input = e.target as HTMLInputElement;
              updateAuthForm(input.value, "email");
            }}
            className="mb-3"
          />
          <AppInput
            placeholder="Password"
            rightIcon={
              showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
            }
            rightIconAction={() => setShowPassword(!showPassword)}
            className="mb-3"
            type={showPassword ? "text" : "password"}
            value={password}
            onInput={(e: SyntheticEvent) => {
              const input = e.target as HTMLInputElement;
              updateAuthForm(input.value, "password");
            }}
          />
          <p className="text-right mb-3">
            <Link
              to="/forgot-password"
              className="text-blue-400 hover:underline"
            >
              Forgot Password?
            </Link>
          </p>
          <AppButton type="submit" className="mb-4" loading={isLoading}>
            LOGIN{" "}
          </AppButton>
          <p className="text-gray-700 dark:text-white text-center mb-8">
            By continuing you accept our{" "}
            <Link to="/privacy" className="text-blue-400 hover:underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link to="/terms" className="text-blue-400 hover:underline">
              Terms of use
            </Link>
          </p>

          <div className="flex items-center justify-center space-x-4">
            <p className="text-gray-700 dark:text-white">
              Dont have an account?
            </p>
            <AppButton className="max-w-[80px] h-8 text-sm" type="button">
              Sign Up
            </AppButton>
          </div>
          <div className="fixed bottom-4 right-4">
            <ThemeToggle />
          </div>
        </form>
      </div>
    </div>
  );
};
