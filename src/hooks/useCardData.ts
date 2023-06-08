import { useEffect, useState } from "react";
import { api } from "../api";
import { Card } from "../types/Card";

export const useCardData = (cardId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cardData, setCardData] = useState<Card | null>(null);

  async function fetchCardData() {
    try {
      setIsLoading(true);
      const res = await api.get(`/api/user-data/${cardId}`);
      setCardData(res.data);
      setIsLoading(false);
    } catch (e) {
      //   console.log(e);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCardData();
  }, []);

  return {
    isLoading,
    cardData,
  };
};
