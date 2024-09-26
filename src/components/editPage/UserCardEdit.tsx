import { FaUser } from "react-icons/fa";
import { AppInput } from "../ui/AppInput";
import { SyntheticEvent } from "react";
import { GoFileMedia } from "react-icons/go";
import { CgSpinner } from "react-icons/cg";
import { AppToggle } from "../ui/AppToggle";

type UpdatePropType =
  | "image_path"
  | "first_name"
  | "last_name"
  | "show_logo"
  | "show_shareback";
type UpdateValType<T extends UpdatePropType> = T extends "show_shareback"
  ? boolean
  : string;

interface UserCardEditProps {
  avatar: string;
  first_name: string; 
  last_name: string;
  show_shareback: boolean;
  show_logo:boolean;
  onUploadAvatar?: (file: File) => void;
  onUploadLogo?: (file: File) => void;
  isUploading?: boolean;
  isUploadingLogo?: boolean;
  onUpdate: (prop: UpdatePropType, val: UpdateValType<UpdatePropType>) => void;
}

export const UserCardEdit = ({
  avatar,
  first_name,
  last_name,
  show_shareback,
  show_logo,
  onUploadAvatar,
  onUploadLogo,
  isUploading,
  isUploadingLogo,
  onUpdate,
}: UserCardEditProps) => {
  return (
    <div className="w-full max-w-lg rounded-2xl mb-8 p-2 shadow-xl min-h-[200px] mx-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-400 flex flex-col space-y-1">
      <div className="flex-1 flex dark:text-gray-200">
        <div className="flex-1 flex justify-center text-sm">
          <div>
            <div className="flex justify-center mb-1 text-xs sm:text-sm">
              Show Shareback
            </div>
            <div className="flex justify-center items-center space-x-2">
              <span
                className="text-xs"
                onClick={() => {
                  onUpdate("show_shareback", false);
                }}
              >
                No
              </span>
              <div>
                <AppToggle
                  checked={show_shareback}
                  onClick={() => onUpdate("show_shareback", !show_shareback)}
                />
              </div>
              <span
                className="text-xs"
                onClick={() => {
                  onUpdate("show_shareback", true);
                }}
              >
                Yes
              </span>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="w-full aspect-square bg-gray-200 dark:bg-gray-400 rounded-full flex items-center justify-center overflow-hidden relative">
            {avatar && avatar !== "" ? (
              <img
                src={avatar}
                className="object-cover min-w-full min-h-full"
              />
            ) : (
              <FaUser className="text-3xl text-gray-700 dark:text-gray-800" />
            )}
            {isUploading && (
              <div className="bg-gray-800 bg-opacity-50 w-full h-full absolute top-0 left-0 flex items-center justify-center">
                <CgSpinner className="animate-spin text-3xl text-white" />
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-start">
        <div className="flex-1 flex flex-col justify-start">
          <label
            htmlFor="avatar"
            className="flex justify-center mb-1 text-xs md:text-sm text-center cursor-pointer"
          >
            Change Profile Picture
          </label>
          <div className="flex justify-center">
            <label htmlFor="avatar" className="flex justify-center">
              <GoFileMedia className="text-2xl cursor-pointer" />
            </label>
          </div>
          <input
            onChange={(e: SyntheticEvent) => {
              const input = e.target as HTMLInputElement;
              if (!input.files || input.files.length === 0) return;
              onUploadAvatar && onUploadAvatar(input.files[0]);
            }}
            type="file"
            id="avatar"
            style={{ display: "none" }}
          />
        </div>

        <div className="flex-1 flex flex-col justify-start">
          <label
            htmlFor="logo"
            className="flex justify-center mb-1 text-xs md:text-sm text-center cursor-pointer"
          >
            Change Logo Picture
          </label>
          <div className="flex justify-center">
            <label htmlFor="logo" className="flex justify-center">
              <GoFileMedia className="text-2xl cursor-pointer" />
            </label>
          </div>
          <input
            onChange={(e: SyntheticEvent) => {
              const input = e.target as HTMLInputElement;
              if (!input.files || input.files.length === 0) return;
              onUploadLogo && onUploadLogo(input.files[0]);
            }}
            type="file"
            id="logo"
            style={{ display: "none" }}
          />
        </div>
        <div>
            <div className="flex justify-center mb-1 text-xs sm:text-sm">
              Show Logo
            </div>
            <div className="flex justify-center items-center space-x-2">
              <span
                className="text-xs"
                onClick={() => {
                  onUpdate("show_logo", false);
                }}
              >
                No
              </span>
              <div>
                <AppToggle
                  checked={show_logo}
                  onClick={() => onUpdate("show_logo", !show_logo)}
                />
              </div>
              <span
                className="text-xs"
                onClick={() => {
                  onUpdate("show_logo", true);
                }}
              >
                Yes
              </span>
            </div>
          </div>
      </div>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <AppInput
          placeholder="First Name"
          name="first_name"
          value={first_name}
          onChange={(e: SyntheticEvent) => {
            const input = e.target as HTMLInputElement;
            onUpdate("first_name", input.value);
          }}
        />
        <AppInput
          placeholder="Last Name"
          name="last_name"
          value={last_name}
          onChange={(e: SyntheticEvent) => {
            const input = e.target as HTMLInputElement;
            onUpdate("last_name", input.value);
          }}
        />
      </div>
    </div>
  );
};
