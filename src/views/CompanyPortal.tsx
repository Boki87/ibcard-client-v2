import { SlRefresh } from "react-icons/sl";
import { AppButton } from "../components/ui/AppButton";
import { AppInput } from "../components/ui/AppInput";
import { FaSearch } from "react-icons/fa";
import { AppSelect } from "../components/ui/AppSelect";
import { AlphaPicker } from "../components/companyPortalPage/AlphaPicker";
import {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { countries } from "../lib/countries";
import { departments } from "../lib/departments";
import { api, webAppUrl } from "../api";
import { redirect, useParams } from "react-router-dom";
import { useCardData } from "../hooks/useCardData";
import { useDebounceEffect } from "../hooks/useDebounceEffect";
import { Card } from "../types/Card";
import { EmployeeCard } from "../components/companyPortalPage/EmployeeCard";
import { useEmployees } from "../hooks/useEmployees";

export const CompanyPortal = () => {
  const { cardId } = useParams();
  if (!cardId) {
    redirect("/");
    return null;
  }
  const { isLoading, cardData } = useCardData(cardId);
  //NOTE: handle if no cardData present

  const [filterByLetter, setFilterByLetter] = useState("");
  const [queryName, setQueryName] = useState("");
  const [queryCountry, setQueryCountry] = useState("");
  const [queryDepartment, setQueryDepartment] = useState("");

  const employeeCardsRefs = useRef([]);

  const { employees, isLoadingEmployees } = useEmployees(cardData?.company.id, {
    cardData,
    country: queryCountry,
    department: queryDepartment,
    name: queryName,
  });

  function letterChangeHandler(letter: string) {
    const matchingEmployeeCard = employeeCardsRefs.current?.filter((ref) => {
      if (
        ref
          .querySelector("span")
          .textContent.toLowerCase()
          .startsWith(letter.toLowerCase())
      ) {
        return ref;
      }
    })[0];
    if (matchingEmployeeCard) {
      const containerEl = document.getElementById("app-wrapper");
      const scrollOffset = matchingEmployeeCard.offsetTop;
      containerEl.scrollTo({
        top: scrollOffset - 100,
        behavior: "smooth",
      });
      // let elPosition = matchingEmployeeCard.getBoundingClientRect().top;
      // let offsetPosition = elPosition + window.scrollY - 100;
      // console.log(offsetPosition);
      // containerEl.scrollTo({
      //   top: offsetPosition,
      //   behavior: "smooth",
      // });
      // matchingEmployeeCard.scrollIntoView({
      //   behavior: "smooth",
      //   block: "start",
      //   inline: "nearest",
      // });
      // window.scrollBy(0, -300);
    }
  }

  function selectChangeHandler(e: ChangeEvent<HTMLSelectElement>) {
    if (e.target.name === "country") {
      setQueryCountry(e.target.value);
    }
    if (e.target.name === "department") {
      setQueryDepartment(e.target.value);
    }
  }

  function resetFilters() {
    setQueryCountry("");
    setQueryName("");
    setQueryDepartment("");
  }

  const filteredEmployees = useMemo(() => {
    return employees
      .filter((emp) => {
        if (queryName !== "") {
          if (
            emp.first_name.toLowerCase().includes(queryName.toLowerCase()) ||
            emp.last_name.toLowerCase().includes(queryName.toLowerCase())
          ) {
            return emp;
          }
        } else {
          return emp;
        }
      })
      .filter((emp) => {
        if (queryCountry !== "") {
          if (emp.country === queryCountry) return emp;
        } else {
          return emp;
        }
      })
      .filter((emp) => {
        if (queryDepartment !== "") {
          if (emp.department === queryDepartment) return emp;
        } else {
          return emp;
        }
      });
  }, [employees, queryName, queryCountry, queryDepartment]);

  return (
    <div className="py-4">
      <div>
        <div className="flex space-x-2 mb-4 px-4">
          <AppInput
            rightIcon={<FaSearch />}
            placeholder="Search"
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
        <div className="flex gap-2 px-4">
          <AppSelect
            className="text-xs"
            name="country"
            onChange={selectChangeHandler}
            value={queryCountry}
          >
            <option selected value="">
              Select country
            </option>
            {countries.map((country) => (
              <option value={country.name} key={country.name}>
                {country.name}
              </option>
            ))}
          </AppSelect>
          <AppSelect
            className="text-xs"
            name="department"
            onChange={selectChangeHandler}
            value={queryDepartment}
          >
            <option selected value="">
              Select department
            </option>
            {departments.map((department) => (
              <option value={department} key={department}>
                {department}
              </option>
            ))}
          </AppSelect>
        </div>
        <AlphaPicker
          selectedLetter={filterByLetter}
          onChange={letterChangeHandler}
        />
        <div className="px-4">
          {isLoadingEmployees &&
            Array(5)
              .fill(1)
              .map((loader, i) => (
                <div className="flex my-6 gap-4" key={i}>
                  <div className="min-w-[100px] min-h-[100px]">
                    <div className="w-[100px] h-[100px] rounded-full flex items-center justify-center relative overflow-hidden bg-slate-200 dark:bg-slate-500 animate-pulse"></div>
                  </div>
                  <div className="flex-1 flex flex-col gap-4">
                    <div className="w-[100px] h-4 rounded-full bg-slate-200 dark:bg-slate-500 animate-pulse"></div>
                    <div className="w-[100px] h-4 rounded-full bg-slate-200 dark:bg-slate-500 animate-pulse"></div>
                    <div className="flex gap-2">
                      <div className="flex-1 h-8 rounded-full bg-slate-200 dark:bg-slate-500 animate-pulse"></div>
                      <div className="flex-1 h-8 rounded-full bg-slate-200 dark:bg-slate-500 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
          {!isLoadingEmployees &&
            filteredEmployees.map((emp, index) => (
              <EmployeeCard
                ref={(el) => (employeeCardsRefs.current[index] = el)}
                first_name={emp.first_name}
                last_name={emp.last_name}
                image_path={emp.image_path}
                department={emp.department}
                onView={() => {
                  const cardId = emp.nfc_card?.link.substring(
                    emp.nfc_card?.link.lastIndexOf("/") + 1
                  );
                  location.href = `${webAppUrl}/card/${cardId}`;
                }}
                onShare={() => {
                  alert("Share");
                }}
                key={emp.id}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
