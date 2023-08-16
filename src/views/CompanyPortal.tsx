import { SlRefresh } from "react-icons/sl";
import { AppButton } from "../components/ui/AppButton";
import { AppInput } from "../components/ui/AppInput";
import { FaSearch } from "react-icons/fa";
import { AppSelect } from "../components/ui/AppSelect";
import { AlphaPicker } from "../components/companyPortalPage/AlphaPicker";
import { SyntheticEvent, useEffect, useState } from "react";
import { countries } from "../lib/countries";
import { departments } from "../lib/departments";
import { api } from "../api";
import { redirect, useParams } from "react-router-dom";
import { useCardData } from "../hooks/useCardData";
import { useDebounceEffect } from "../hooks/useDebounceEffect";
import { Card } from "../types/Card";
import { EmployeeCard } from "../components/companyPortalPage/EmployeeCard";

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

  const [employees, setEmployees] = useState<Card[]>([]);

  async function fetchEmployees() {
    let res = await api.post(
      `/api/customers/${cardData.company.id}/employees`,
      {
        limit: 1000,
        country: queryCountry != "" ? queryCountry : null,
        department: queryDepartment != "" ? queryDepartment : null,
        name: queryName != "" ? queryName : "",
      }
    );
    let employeesRes = res.data.employees;
    employeesRes.sort((a, b) => {
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
    setEmployees(employeesRes);
  }

  useDebounceEffect(
    () => {
      if (!cardData.company) return;
      fetchEmployees();
    },
    1000,
    [cardData, queryName, queryCountry, queryDepartment]
  );

  return (
    <div className="p-4">
      <div>
        <div className="flex space-x-2 mb-4">
          <AppInput
            rightIcon={<FaSearch />}
            placeholder="Search"
            onChange={(e: SyntheticEvent) => {
              let input = e.target as HTMLInputElement;
              setQueryName(input.value);
            }}
          />
          <button className="w-10 h-10 min-w-[40px] dark:bg-gray-500 rounded-full flex items-center justify-center dark:text-white">
            <SlRefresh />
          </button>
        </div>
        <div className="flex gap-2">
          <AppSelect className="text-xs">
            <option disabled selected>
              Select country
            </option>
            {countries.map((country) => (
              <option value={country.name} key={country.name}>
                {country.name}
              </option>
            ))}
          </AppSelect>
          <AppSelect className="text-xs">
            <option disabled selected>
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
          onChange={(letter: string) => {
            setFilterByLetter(letter);
          }}
        />
        <div>
          {employees.map((emp) => (
            <EmployeeCard
              first_name={emp.first_name}
              last_name={emp.last_name}
              image_path={emp.image_path}
              department={emp.department}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
