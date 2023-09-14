import { useEffect, useState } from "react";
import { Card } from "../types/Card";
import { api } from "../api";
import toast from "react-hot-toast";

export const useEmployees = (
  companyId: number,
  {
    cardData,
    country,
    department,
    name,
  }: { cardData: Card; country: string; department: string; name: string }
) => {
  const [employees, setEmployees] = useState<Card[]>([]);
  const [isLoadingEmployees, setIsLoadingEmployees] = useState(false);

  async function fetchEmployees() {
    if (!companyId) return;
    try {
      setIsLoadingEmployees(true);
      let res = await api.post(`/api/customers/${companyId}/employees`, {
        limit: 3000,
        country: country != "" ? country : null,
        department: department != "" ? department : null,
        name: name != "" ? name : "",
      });
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
      setIsLoadingEmployees(false);
    } catch (e) {
      console.log(e);
      setIsLoadingEmployees(false);
      toast.error("Could not fetch employees. Please refresh and try again.");
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, [companyId]);

  //NOTE: enable this when we want to do live queries on the database
  //right now we fetch all employees and filter on the frontend

  //   useDebounceEffect(
  //     () => {
  //       if (!cardData.company) return;
  //       fetchEmployees();
  //     },
  //     1000,
  //     [cardData, name, country, department]
  //   );

  return { employees, isLoadingEmployees };
};
