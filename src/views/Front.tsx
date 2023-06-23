import { redirect, useParams } from "react-router-dom";
import { useCardData } from "../hooks/useCardData";
import { UserCard } from "../components/frontPage/UserCard";
import { FrontPageComponent } from "../components/frontPage/FrontPageComponent";
import { FrontPageLoader } from "../components/frontPage/FrontPageLoader";

export const FrontPage = () => {
  const { cardId } = useParams();
  if (!cardId) {
    redirect("/");
    return null;
  }
  const { isLoading, cardData } = useCardData(cardId);
  return (
    <div>
      {!isLoading && cardData ? (
        <FrontPageComponent cardData={cardData} />
      ) : (
        <FrontPageLoader />
      )}
    </div>
  );
};
