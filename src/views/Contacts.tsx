import { ChangeEvent, useMemo, useRef, useState } from "react";
import { FaChevronLeft, FaSearch } from "react-icons/fa";
import { SlRefresh } from "react-icons/sl";
import { AlphaPicker } from "../components/AlphaPicker";
import { AppInput } from "../components/ui/AppInput";
import { useContacts } from "../hooks/useContacts";
import { useUserContext } from "../context/UserContext";
import { ContactCard } from "../components/contactsPage/ContactCard";
import { useNavigate } from "react-router-dom";
import { ContactDetailsModal } from "../components/contactsPage/ContactDetailsModal";
import { Contact } from "../types/Contacts";

export const Contacts = () => {
  const navigate = useNavigate();
  const [queryName, setQueryName] = useState("");
  const [filterByLetter, setFilterByLetter] = useState("");
  const { user } = useUserContext();
  const { isLoading, contacts } = useContacts(user.id);
  const [activeContact, setActiveContact] = useState<Contact | null>(null);

  function resetFilters() {
    setQueryName("");
    setFilterByLetter("");
  }

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      if (queryName !== "") {
        if (
          contact.first_name.toLowerCase().includes(queryName.toLowerCase())
        ) {
          return contact;
        }
      } else {
        return contact;
      }
    });
  }, [contacts, queryName]);

  const contactCardRefs = useRef([]);
  function letterChangeHandler(letter: string) {
    const matchingContactCard = contactCardRefs.current?.filter((ref) => {
      if (
        ref
          .querySelector("span")
          .textContent.toLowerCase()
          .startsWith(letter.toLowerCase())
      ) {
        return ref;
      }
    })[0];
    if (matchingContactCard) {
      const containerEl = document.getElementById("app-wrapper");
      const scrollOffset = matchingContactCard.offsetTop;
      containerEl.scrollTo({
        top: scrollOffset - 100,
        behavior: "smooth",
      });
    }
  }

  function goBack() {
    navigate("/");
  }

  return (
    <div>
      <div className="text-2xl font-bold text-center my-3 text-gray-800 dark:text-gray-200 uppercase flex items-center px-4">
        <button onClick={goBack} className="p-2 h-full w-10">
          <FaChevronLeft />
        </button>
        <div className="flex-1">
          <span className="mr-8">Your Contacts</span>
        </div>
      </div>
      <div className="flex space-x-2 mb-4 px-4">
        <AppInput
          rightIcon={<FaSearch />}
          placeholder="Search Contact"
          value={queryName}
          type="search"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setQueryName(e.target.value);
          }}
        />
        <button
          onClick={resetFilters}
          className="w-10 h-10 min-w-[40px] dark:bg-gray-500 rounded-full flex items-center justify-center dark:text-white"
        >
          <SlRefresh />
        </button>
      </div>
      <AlphaPicker
        selectedLetter={filterByLetter}
        onChange={letterChangeHandler}
      />
      <div className="px-4">
        {isLoading &&
          Array(5)
            .fill(1)
            .map((loader, i) => (
              <div
                className="my-2 gap-4 h-[70px] w-full rounded-2xl bg-slate-200 dark:bg-slate-700 animate-pulse"
                key={i}
              ></div>
            ))}
        {!isLoading &&
          filteredContacts.map((contact, index) => (
            <ContactCard
              ref={(el) => (contactCardRefs.current[index] = el)}
              contact={contact}
              onOpen={() => {
                setActiveContact(contact);
              }}
              key={contact.id}
            />
          ))}
      </div>
      <ContactDetailsModal
        isOpen={!!activeContact}
        contact={activeContact}
        onClose={() => {
          setActiveContact(null);
        }}
      />
    </div>
  );
};
