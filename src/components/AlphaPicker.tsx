import { useState } from "react";

interface AlphaPickerProps {
  onChange?: (letter: string) => void;
  selectedLetter?: string;
}

export const AlphaPicker = ({ onChange, selectedLetter }: AlphaPickerProps) => {
  const [activeLetter, setActiveLetter] = useState(selectedLetter ?? "");

  const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  return (
    <div className="overflow-hidden overflow-x-auto h-10 sticky top-0 bg-slate-50 dark:bg-gray-900 z-10 px-4">
      <div className="flex h-full space-x-1">
        {alphabet.map((letter, i) => (
          <PickerLetter
            key={i}
            onClick={() => {
              if (letter !== activeLetter) {
                setActiveLetter(letter);
                onChange && onChange(letter);
              } else {
                setActiveLetter("");
                onChange && onChange("");
              }
            }}
            letter={letter}
            activeLetter={activeLetter}
          />
        ))}
      </div>
    </div>
  );
};

const PickerLetter = ({
  letter,
  activeLetter,
  ...props
}: {
  letter: string;
  activeLetter: string;
  [x: string]: any;
}) => {
  const isSelected = letter === activeLetter;
  let letterStyles = "";
  if (isSelected) {
    letterStyles =
      "h-full flex items-center justify-center min-w-[15px] uppercase text-xl text-black dark:text-gray-300 font-bold";
  } else {
    letterStyles =
      "h-full flex items-center justify-center min-w-[15px] uppercase text-xl text-gray-500";
  }
  return (
    <div className={letterStyles} {...props}>
      {letter}
    </div>
  );
};
