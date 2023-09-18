import { useEffect, useState } from "react";
import { api } from "../api";
import { Card } from "../types/Card";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

export const useCardData = (cardId: string) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [cardData, setCardData] = useState<Card | null>(null);
  const { user } = useUserContext();

  async function fetchCardData() {
    try {
      setIsLoading(true);
      const res = await api.get(`/api/user-data/${cardId}`);
      // console.log(res);
      if (res.data.error && res.data.message === "Unregistered User") {
        //this is the case where its a new card that is not registered to a user yet
        setCardData(null);
        navigate(`/register/${res.data.token}`);
        setIsLoading(false);
      } else {
        setCardData(res.data);
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!cardId) return;
    fetchCardData();
  }, [cardId]);

  return {
    isLoading,
    cardData,
  };
};
