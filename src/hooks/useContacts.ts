import { useEffect, useState } from "react";
import { Contact } from "../types/Contacts";
import { api } from "../api";

export const useContacts = (userId: number) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchContacts(userId: number) {
    try {
      setIsLoading(true);
      const res = await api.get(`/api/contacts/${userId}`);
      let contactsRes = res.data.data;
      contactsRes.sort((a, b) => {
        const nameA = a.first_name.toUpperCase();
        const nameB = b.first_name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      setContacts(contactsRes);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchContacts(userId);
  }, [userId]);

  return {
    contacts,
    isLoading,
    fetchContacts,
  };
};
