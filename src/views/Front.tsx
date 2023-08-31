import { redirect, useParams } from "react-router-dom";
import { useCardData } from "../hooks/useCardData";
import { UserCard } from "../components/frontPage/UserCard";
import { FrontPageComponent } from "../components/frontPage/FrontPageComponent";
import { FrontPageLoader } from "../components/frontPage/FrontPageLoader";
import { useEffect } from "react";
import { api } from "../api";

export const FrontPage = () => {
  const { cardId } = useParams();
  if (!cardId) {
    redirect("/");
    return null;
  }
  const { isLoading, cardData } = useCardData(cardId);

  async function collectView() {
    await api.post(`/api/user-view`, {
      user_id: cardData.user_id,
      customer_id: cardData.customer_id,
    });
  }

  useEffect(() => {
    //collect a page view in the db
    if (!cardData) return;
    collectView();
  }, [cardData]);
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
