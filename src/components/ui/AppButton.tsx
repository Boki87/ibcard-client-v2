import { ReactElement, ReactNode } from "react";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { combineCss } from "../../lib/utils";

interface IButton {
  children: ReactNode;
  loading?: boolean;
  variant?: "blue" | "gray";
  [x: string]: any;
}

const variants = {
  blue: "bg-primary text-white hover:brightness-110 active:brightness-90 disabled:bg-gray-200 disabled:text-gray-400",
  gray: "bg-gray-300 text-gray-800 hover:bg-gray-200 active:bg-gray-300 disabled:bg-gray-200 disabled:text-gray-400",
};

export const AppButton = ({
  children,
  loading,
  className,
  variant = "blue",
  ...props
}: IButton): ReactElement => {
  const variantStyles = variants[variant];

  return (
    <button
      className={combineCss(
        `w-full h-10 rounded-xl flex items-center justify-center gap-2 text-lg disabled:cursor-not-allowed`,
        variantStyles,
        className
      )}
      disabled={loading ? true : false}
      {...props}
    >
      {loading ? <CgSpinnerTwoAlt className="animate-spin" /> : children}
    </button>
  );
};
