import { api } from "../api";
import { useEffect, useState } from "react";
import { Card } from "../types/Card";
import { UserCard } from "../components/UserCard";
import { CardSkeletonLoader } from "../components/CardSkeletonLoader";
import { useModalsContext } from "../context/ModalsContext";

export const Home = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { openQrModal } = useModalsContext();

  async function fetchCards() {
    try {
      setIsLoading(true);
      const res = await api.get("/api/cards");
      const cardsRes = res.data.cards as Card[];
      setCards(cardsRes);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      //TODO: add toast message
    }
  }

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className="h-full w-full pt-6 px-4">
      <p className="text-gray-800 dark:text-white font-bold text-center text-3xl mb-2">
        Welcome back!
      </p>
      <p className="text-gray-700 dark:text-gray-200 text-lg text-center mb-4">
        Select a card to view
      </p>
      <div className="pb-8">
        {!isLoading &&
          cards.map((card) => (
            <UserCard
              data={card}
              key={card.id}
              onQrCodeClick={() => openQrModal(card.nfc_card?.link || "")}
            />
          ))}
        {isLoading && (
          <>
            <CardSkeletonLoader />
            <CardSkeletonLoader />
          </>
        )}
      </div>
    </div>
  );
};
