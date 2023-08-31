import React, {
  ReactNode,
  useEffect,
  useRef,
  useState,
  forwardRef,
  HTMLInputTypeAttribute,
} from "react";
import { combineCss } from "../../lib/utils";

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
  leftIconAction?: () => void;
  rightIcon?: ReactNode;
  rightIconAction?: () => void;
  className?: string;
  showError?: boolean;
  [x: string]: any;
}

export const AppInput = ({
  leftIcon,
  leftIconAction,
  rightIcon,
  rightIconAction,
  className = "",
  showError,
  ...rest
}: IInput) => {
  const inputRef = useRef<HTMLInputElement>();
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleFocus = () => {
      setIsFocused(true);
    };
    const handleBlur = () => {
      setIsFocused(false);
    };
    const inputElement = inputRef?.current;
    if (inputElement) {
      inputElement.addEventListener("focus", handleFocus);
      inputElement.addEventListener("blur", handleBlur);
    }

    return () => {
      if (inputElement) {
        inputElement.addEventListener("focus", handleFocus);
        inputElement.addEventListener("blur", handleBlur);
      }
    };
  }, []);

  let focusedStyles = "border border-transparent";

  if (isFocused) {
    focusedStyles = "border border-gray-400";
  }

  if (showError) {
    focusedStyles = "border border-red-600";
  }

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
        "w-full max-w-lg h-10 border-full overflow-hidden relative rounded-full bg-gray-200 dark:bg-gray-500",
        focusedStyles,
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

      <input
        autoComplete="off"
        ref={inputRef}
        className="outline-none border-none w-full h-full px-4 bg-transparent rounded-full text-gray-800 placeholder:text-gray-500 dark:placeholder:text-gray-300 dark:text-white dark:placeholder-white"
        type="text"
        {...rest}
      />
    </div>
  );
};
