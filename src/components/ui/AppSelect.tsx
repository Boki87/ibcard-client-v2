import { ReactNode, useEffect, useRef, useState } from "react";
import { combineCss } from "../../lib/utils";

interface ISelect {
  leftIcon?: ReactNode;
  leftIconAction?: () => void;
  rightIcon?: ReactNode;
  rightIconAction?: () => void;
  className?: string;
  children: ReactNode;
  [x: string]: any;
}

export const AppSelect = ({
  leftIcon,
  leftIconAction,
  rightIcon,
  rightIconAction,
  className = "",
  children,
  ...rest
}: ISelect) => {
  const inputRef = useRef<HTMLSelectElement | null>(null);

  let leftIconStyles = "";
  if (leftIcon) {
    leftIconStyles = "pl-6";
  }

  let rightIconStyles = "";
  if (rightIcon) {
    rightIconStyles = "pr-6";
  }

  return (
    <div
      className={combineCss(
        "w-full max-w-lg h-10 border-full overflow-hidden relative rounded-full bg-gray-200 dark:bg-gray-500 pr-2",
        leftIconStyles,
        rightIconStyles,
        className
      )}
    >
      {leftIcon && (
        <div
          onClick={() =>
            leftIconAction ? leftIconAction() : inputRef?.current?.focus()
          }
          className="w-10 h-full bg-gray-200 dark:bg-gray-500 flex items-center justify-center absolute top-0 left-0 cursor-pointer dark:text-white"
        >
          {leftIcon}
        </div>
      )}

      {rightIcon && (
        <div
          onClick={() =>
            rightIconAction ? rightIconAction() : inputRef?.current?.focus()
          }
          className="w-10 h-full flex items-center justify-center absolute top-0 right-0 cursor-pointer dark:text-white"
        >
          {rightIcon}
        </div>
      )}

      <select
        autoComplete="off"
        ref={inputRef}
        style={{ WebkitAppearance: "none" }}
        className="outline-none border-none w-full h-full px-4 bg-transparent rounded-full text-gray-800 placeholder:text-gray-500 dark:text-white dark:placeholder-white"
        {...rest}
      >
        {children}
      </select>
    </div>
  );
};
