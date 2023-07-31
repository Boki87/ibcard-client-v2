import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Card } from "../../types/Card";
import { UserCardEdit } from "./UserCardEdit";
import { AppInput } from "../ui/AppInput";
import { AppSelect } from "../ui/AppSelect";
import { FaFlagUsa, FaUserTag } from "react-icons/fa";
import { BsFillBuildingFill, BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { AiOutlineLink } from "react-icons/ai";
import { countries } from "../../lib/countries";
import { departments } from "../../lib/departments";
import { api } from "../../api";
import { CgSpinner } from "react-icons/cg";
import { uploadAvatar } from "../../lib/utils";
import { SocialsEditWidget } from "./editSicials/SocialsEditWidget";
import { useParams } from "react-router-dom";
import { VideosEditWidget } from "./editVideos/VideosEditWidget";

interface EditPageComponentProps {
  cardData: Card;
}

export const EditPageComponent = ({ cardData }: EditPageComponentProps) => {
  const { cardId } = useParams();
  const [initialCardData, setInitialCardData] = useState<Card>(cardData);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSaveButton, setShowButton] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const initialCacheData = useRef(cardData);

  function selectChangeHandler(e: SyntheticEvent) {
    const select = e.target as HTMLSelectElement;
    setInitialCardData((prev) => {
      return { ...prev, [select.name]: select.value };
    });
  }

  function inputChangeHandler(e: SyntheticEvent) {
    const select = e.target as HTMLInputElement;
    setInitialCardData((prev) => {
      return { ...prev, [select.name]: select.value };
    });
  }

  async function saveChangesHandler() {
    try {
      setIsUpdating(true);
      let res = await api.put(
        `api/card-data/${initialCardData.id}`,
        initialCardData
      );
      if (res.data.error) {
        //TODO: show toast message
        setIsUpdating(false);
        alert("Could not update data");
        return;
      }
      // console.log(res.data);
      initialCacheData.current = res.data;
      setInitialCardData(res.data);
      setIsUpdating(false);
    } catch (e) {
      alert("Could not update data");
      setIsUpdating(false);
    }
  }

  async function uploadAvatarHandler(file: File) {
    try {
      setIsUploadingAvatar(true);
      const res = await uploadAvatar(file, initialCardData.id);
      setInitialCardData((prev) => {
        return { ...prev, image_path: res?.data.image_path };
      });
      setIsUploadingAvatar(false);
    } catch (e) {
      console.log(e);
      setIsUploadingAvatar(false);
    }
  }

  async function refetchCardData() {
    try {
      const res = await api.get(`/api/user-data/${cardId}`);
      setInitialCardData(res.data);
      initialCacheData.current = res.data;
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    setShowButton(false);
    //check if any of the basic properties have changed so we can show the save changes button
    const propsToCompare = [
      "first_name",
      "last_name",
      "show_shareback",
      "country",
      "department",
      "company_role",
      "mobile",
      "website",
    ];
    for (const prop of propsToCompare) {
      //@ts-ignore
      if (initialCardData[prop] !== initialCacheData.current[prop]) {
        setShowButton(true);
      }
    }
  }, [initialCardData]);

  return (
    <div>
      <UserCardEdit
        avatar={initialCardData.image_path ?? ""}
        first_name={initialCardData.first_name ?? ""}
        last_name={initialCardData.last_name ?? ""}
        show_shareback={initialCardData.show_shareback ?? false}
        onUploadAvatar={uploadAvatarHandler}
        isUploading={isUploadingAvatar}
        onUpdate={(prop, val) => {
          setInitialCardData((prev) => {
            return { ...prev, [prop]: val };
          });
        }}
      />
      <AppSelect
        leftIcon={<FaFlagUsa />}
        value={initialCardData.country || ""}
        name="country"
        onChange={selectChangeHandler}
        className="mx-auto"
      >
        {countries.map((country) => (
          <option value={country.name} key={country.name}>
            {country.name}
          </option>
        ))}
      </AppSelect>
      <AppSelect
        leftIcon={<BsFillBuildingFill />}
        className="my-3 mx-auto"
        value={initialCardData.department || ""}
        name="department"
        onChange={selectChangeHandler}
      >
        {departments.map((department) => (
          <option value={department} key={department}>
            {department}
          </option>
        ))}
      </AppSelect>
      <AppInput
        leftIcon={<FaUserTag />}
        placeholder="Role"
        name="company_role"
        value={initialCardData.company_role}
        onChange={inputChangeHandler}
        className="my-3 mx-auto"
      />

      <AppInput
        leftIcon={<BsTelephoneFill />}
        placeholder="Phone"
        name="mobile"
        value={initialCardData.mobile}
        onChange={inputChangeHandler}
        className="my-3 mt-6 mx-auto"
      />
      <AppInput
        leftIcon={<MdEmail />}
        placeholder="Email"
        name="email"
        value={initialCardData.email}
        onChange={inputChangeHandler}
        className="my-3 mx-auto"
      />
      <AppInput
        leftIcon={<AiOutlineLink />}
        placeholder="Website"
        name="website"
        value={initialCardData.website}
        onChange={inputChangeHandler}
        className="my-3 mx-auto"
      />

      <SocialsEditWidget
        initialSocials={initialCardData.social_links ?? []}
        cardId={initialCardData.id}
        onUpdate={refetchCardData}
      />

      <VideosEditWidget
        initialSocials={initialCardData.social_links ?? []}
        cardId={initialCardData.id}
        onUpdate={refetchCardData}
      />

      {showSaveButton && (
        <button
          onClick={saveChangesHandler}
          className="absolute bottom-16 left-0 w-full h-14 bg-primary text-center flex items-center justify-center"
          disabled={isUpdating}
        >
          {!isUpdating ? (
            "SAVE CHANGES"
          ) : (
            <CgSpinner className="animate-spin text-3xl" />
          )}
        </button>
      )}
    </div>
  );
};
