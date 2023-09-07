import { useState, useEffect } from "react";
import { AppSelect } from "../components/ui/AppSelect";
import { useParams } from "react-router-dom";
import { useCardData } from "../hooks/useCardData";
import { exportCsv } from "../lib/utils";
import { api } from "../api";
import { Card } from "../types/Card";
import { SOCIAL_ICONS } from "../lib/socialLinks";

import {
  FaFlagUsa,
  FaBusinessTime,
  FaRegClock,
  FaRegEye,
  FaPeopleArrows,
  FaRegSave,
  FaFileCsv,
  FaBook,
  FaRegNewspaper,
  FaInfoCircle,
  FaNetworkWired,
} from "react-icons/fa";

export const Stats = () => {
  const { cardId } = useParams();
  const { cardData } = useCardData(cardId);
  const [socialStats, setSocialStats] = useState([]);

  const ranges = [
    "Today",
    "Yesterday",
    "Last 3 Days",
    "Last 7 Days",
    "Last Month",
    "Last 3 Months",
    "Last 6 Months",
    "1 Year",
  ];

  const [selectedRange, setSelectedRange] = useState("Last 7 Days");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [csvData, setCsvDate] = useState([]);
  const [views, setViews] = useState(null);
  const [saved, setSaved] = useState(null);
  const [contacts, setContacts] = useState(null);

  const socialRecordCounts: Record<string, number> = {};

  socialStats.forEach((stat) => {
    if (socialRecordCounts[stat.social_type]) {
      socialRecordCounts[stat.social_type]++;
    } else {
      socialRecordCounts[stat.social_type] = 1;
    }
  });

  const sumOfSocialRecordCount = Object.values(socialRecordCounts).reduce(
    (total, value) => total + value,
    0
  );

  const newArrayObjects = SOCIAL_ICONS.filter(
    (item) => item.type != "video"
  ).map((iconData) => {
    // Filter array to remove video
    const type = iconData.type;
    if (iconData.type != "video") {
      const count = socialRecordCounts[type] || 0;
      return { [iconData.name]: count };
    }
  });

  newArrayObjects.push({ Views: views });
  newArrayObjects.push({ Saved: saved });
  newArrayObjects.push({ "New Connections": contacts });
  newArrayObjects.push({ "Link taps": contacts });

  const csvContacts = newArrayObjects.reduce((result, item, index) => {
    // Add Name value

    if (index === 0) {
      result[""] = 0;
    }

    Object.keys(item).forEach((key) => {
      result[key] = item[key];
    });
    return result;
  }, {});

  const generateDateRange = (range) => {
    const endDate = new Date();
    const startDate = new Date();
    switch (range) {
      case "Today":
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        break;
      case "Yesterday":
        startDate.setDate(endDate.getDate() - 1);
        break;
      case "Last 3 Days":
        startDate.setDate(endDate.getDate() - 3);
        break;
      case "Last 7 Days":
        startDate.setDate(endDate.getDate() - 7);
        break;
      case "Last Month":
        startDate.setMonth(endDate.getMonth() - 1);
        break;
      case "Last 3 Months":
        startDate.setMonth(endDate.getMonth() - 3);
        break;
      case "Last 6 Months":
        startDate.setMonth(endDate.getMonth() - 6);
        break;
      case "1 Year":
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
      default:
        break;
    }

    setStartDate(startDate);
    setEndDate(endDate);
    const date = [startDate, endDate];
    GetAllData(date);
    handleFetchStats(date);
  };

  const handleRangeChange = (event) => {
    const range = event.target.value;
    setSelectedRange(range);
    generateDateRange(range);
  };

  function dateParser(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  }

  async function GetAllData(date) {
    try {
      const numOfContacts = await api.get(`/api/contacts/${cardData.user_id}`);

      if (numOfContacts.data.data.length == 0) {
        setContacts(0);
      } else {
        console.log(numOfContacts.data.data);
        setContacts(numOfContacts.data.data.length);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    const startDate = dateParser(date[0]);

    const endDate = dateParser(date[1]);

    try {
      const view = await api.post(`/api/viewed`, {
        start_time: startDate,
        end_time: endDate,
        user_id: cardData.id,
        customer_id: cardData.customer_id,
      });

      if (view.data.length == 0) {
        setViews(0);
      } else {
        setViews(view.data[0]);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    try {
      const saved = await api.post(`/api/saved`, {
        start_time: startDate,
        end_time: endDate,
        user_id: cardData.id,
        customer_id: cardData.customer_id,
      });

      if (saved.data.length == 0) {
        setSaved(0);
      } else {
        setSaved(saved.data[0]);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleFetchStats = async (date) => {
    try {
      const response = await api.post(
        `/api/socialStats/bySocialId`,

        {
          user_id: cardData.user_id,
          start_time: dateParser(date[0]),
          end_time: dateParser(date[1]),
        }
      );
      setSocialStats(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (!cardData) {
      return;
    }

    const endDate = new Date();
    const startDate = new Date(new Date().setDate(endDate.getDate() - 7));
    const date = [startDate, endDate];
    handleFetchStats(date);
    GetAllData(date);
  }, [cardData]);

  return (
    <div className=" mx-4 m-4 flex flex-col items-center justify-center ">
      <h2 className=" text-lg font-medium dark:text-white">User Analitycs</h2>
      <AppSelect
        className="text-xs m-2 dark:bg-gray-500"
        leftIcon={<FaRegClock />}
        onChange={handleRangeChange}
        value={selectedRange}
      >
        {ranges.map((range) => (
          <option value={range} key={range}>
            {range}
          </option>
        ))}
      </AppSelect>

      <div className="flex flex-col items-center justify-center w-full h-full rounded border-gray-100 mt-8">
        <div
          className="flex items-center w-full p-4 border 
      border-gray-300 dark:border-gray-400 m-2 dark:text-white dark:bg-gray-800 rounded-2xl bg-white "
        >
          <div className="flex items-center">
            <FaRegEye className=" text-xl mr-2 dark:text-gray-200" />
            <div className="text-sm font-medium ml-2">Views</div>
          </div>
          <div className="flex-grow text-right text-sm">{views}</div>
        </div>

        <div
          className="flex items-center w-full p-4 border 
      border-gray-300 dark:border-gray-400 m-2 dark:text-white dark:bg-gray-800 rounded-2xl bg-white "
        >
          <div className="flex items-center">
            <FaRegSave className=" text-xl mr-2 dark:text-gray-200" />
            <div className="text-sm font-medium ml-2">Saved</div>
          </div>
          <div className="flex-grow text-right text-sm">{saved}</div>
        </div>

        <div
          className="flex items-center w-full p-4 border 
      border-gray-300 dark:border-gray-400 m-2 dark:text-white dark:bg-gray-800 rounded-2xl bg-white "
        >
          <div className="flex items-center">
            <FaPeopleArrows className=" text-xl mr-2 dark:text-gray-200" />
            <div className="text-sm font-medium ml-2">New connections</div>
          </div>
          <div className="flex-grow text-right text-sm">{contacts}</div>
        </div>

        <div
          className="flex items-center w-full p-4 border 
      border-gray-300 dark:border-gray-400 m-2  dark:text-white dark:bg-gray-800 rounded-2xl bg-white "
        >
          <div className="flex items-center">
            <FaNetworkWired className=" text-xl mr-2 dark:text-gray-200" />
            <div className="text-sm font-medium ml-2">
              Total social link taps
            </div>
          </div>
          <div className="flex-grow text-right text-sm">
            {sumOfSocialRecordCount}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full h-full rounded border-gray-100 ">
        <h2
          className="text-lg font-medium mb-4 mt-2 flex items center dark:text-white p-4
  "
        >
          Link Insights
        </h2>
        {SOCIAL_ICONS.filter((item) => item.type != "video").map(
          (socialIcon) => (
            <div
              key={socialIcon.type}
              className="flex items-center w-full p-4 border 
      border-gray-300 dark:border-gray-400 m-2 rounded dark:text-white dark:bg-gray-800 rounded-2xl bg-white "
            >
              <div className="flex items-center">
                <div className="text-2xl">{socialIcon.icon}</div>
                <div className="text-sm font-medium ml-2">
                  {socialIcon.name}
                </div>
              </div>
              <div className="flex-grow text-right text-sm">
                {socialRecordCounts[socialIcon.type] || 0} taps
              </div>
            </div>
          )
        )}
      </div>

      <div className="flex items-center justify-center">
        {" "}
        <div className="text-xl m-2 dark:text-white">
          {" "}
          Export analytics to{" "}
        </div>{" "}
        <FaFileCsv
          onClick={() => exportCsv([csvContacts])}
          className="text-3xl m-2 dark:text-white cursor-pointer"
        />{" "}
      </div>
    </div>
  );
};
