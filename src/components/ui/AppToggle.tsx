interface AppToggleProps {
  checked: boolean;
  [x: string]: any;
}

export const AppToggle = ({ checked, ...props }: AppToggleProps) => {
  return (
    <label
      className={`flex items-center cursor-pointer ${
        !checked ? "opacity-30" : ""
      }`}
      {...props}
    >
      <div className="relative">
        <div className="block bg-gray-600 w-10 h-6 rounded-full"></div>
        <div
          className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
            checked ? "translate-x-full" : ""
          }`}
        ></div>
      </div>
    </label>
  );
};
