import { ReactElement, ReactNode } from "react";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { combineCss } from "../../lib/utils";

interface IButton {
  children: ReactNode;
  isLoading?: boolean;
  variant?: "blue" | "gray";
  [x: string]: any;
  asDiv?: boolean;
}

const variants = {
  blue: "bg-primary text-white hover:brightness-110 active:brightness-90 disabled:bg-gray-200 disabled:text-gray-400",
  gray: "bg-gray-300 text-gray-800 hover:bg-gray-200 active:bg-gray-300 disabled:bg-gray-200 disabled:text-gray-400",
};

export const AppButton = ({
  children,
  isLoading,
  className,
  variant = "blue",
  asDiv,
  ...props
}: IButton): ReactElement => {
  const variantStyles = variants[variant];

  const Comp = asDiv ? "div" : "button";

  return (
    <Comp
      className={combineCss(
        `w-full h-10 rounded-xl flex items-center justify-center gap-2 text-lg disabled:cursor-not-allowed`,
        variantStyles,
        className
      )}
      disabled={isLoading ? true : false}
      {...props}
    >
      {isLoading ? <CgSpinnerTwoAlt className="animate-spin" /> : children}
    </Comp>
  );
};
