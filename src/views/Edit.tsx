import { redirect, useParams } from "react-router-dom";
import { useCardData } from "../hooks/useCardData";
import { EditPageComponent } from "../components/editPage/EditPageComponent";
import { CgSpinnerTwoAlt } from "react-icons/cg";

export const EditPage = () => {
  const { cardId } = useParams();
  if (!cardId) {
    redirect("/");
    return null;
  }
  const { isLoading, cardData } = useCardData(cardId);
  return (
    <div className="p-4">
      {!isLoading && cardData ? (
        <EditPageComponent cardData={cardData} />
      ) : (
        <div className="mt-6 text-gray-900 dark:text-gray-200 flex justify-center items-center">
          <CgSpinnerTwoAlt className="text-6xl animate-spin" />
        </div>
      )}
    </div>
  );
};
