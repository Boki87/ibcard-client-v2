import { redirect, useParams } from "react-router-dom";
import { useCardData } from "../hooks/useCardData";
import { EditPageComponent } from "../components/editPage/EditPageComponent";

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
        <div>Loading Edit Page</div>
      )}
    </div>
  );
};
