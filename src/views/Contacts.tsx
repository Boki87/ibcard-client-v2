import { ChangeEvent, useMemo, useRef, useState } from "react";
import { FaChevronLeft, FaSearch } from "react-icons/fa";
import { SlRefresh } from "react-icons/sl";
import { AlphaPicker } from "../components/AlphaPicker";
import { AppInput } from "../components/ui/AppInput";
import { useContacts } from "../hooks/useContacts";
import { useUserContext } from "../context/UserContext";
import { ContactCard } from "../components/contactsPage/ContactCard";
import { useNavigate, useParams } from "react-router-dom";
import { ContactDetailsModal } from "../components/contactsPage/ContactDetailsModal";
import { Contact } from "../types/Contacts";
import { exportCsv } from "../lib/utils";
import { FaFileCsv } from "react-icons/fa";

export const Contacts = () => {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const [queryName, setQueryName] = useState("");
  const [filterByLetter, setFilterByLetter] = useState("");
  const { user } = useUserContext();
  const { isLoading, contacts, fetchContacts } = useContacts(user.id);
  const [activeContact, setActiveContact] = useState<Contact | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);

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

  const csvContacts = filteredContacts.map((contact, index) => ({
    "": index + 1,
    Name: contact.first_name,
    Surname: contact.last_name,
    Title: contact.title,
    Company: contact.company_name,
    Phone: contact.phone,
    Email: contact.email,
  }));

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
        {!cardId && (
          <button onClick={goBack} className="p-2 h-full w-10">
            <FaChevronLeft />
          </button>
        )}
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
        <button className="w-10 h-10 min-w-[40px] rounded-full flex items-center justify-center dark:text-white">
          <FaFileCsv
            onClick={() => exportCsv(csvContacts)}
            className="text-3xl dark:text-white cursor-pointer"
          />
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
                setShowContactModal(true);
              }}
              key={contact.id}
            />
          ))}
        {!isLoading && filteredContacts.length === 0 ? (
          <p className="mt-6 text-center text-lg text-gray-800 dark:text-gray-200 uppercase">
            No connections yet
          </p>
        ) : null}
      </div>
      <ContactDetailsModal
        isOpen={showContactModal}
        contact={activeContact}
        onClose={() => {
          fetchContacts(user.id);
          setShowContactModal(false);
          setActiveContact(null);
        }}
      />
    </div>
  );
};
