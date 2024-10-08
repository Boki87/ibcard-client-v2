import { Card } from "../../types/Card";
import { BsQrCodeScan, BsChevronRight, BsFillShareFill } from "react-icons/bs";
import { getFlag } from "../../lib/countries";
import { GiChart } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { IoBarChartSharp } from "react-icons/io5";

interface UserCardProps {
  data: Card;
  onQrCodeClick: (showShareOptions: boolean) => void;
}

export const UserCard = ({ data, onQrCodeClick }: UserCardProps) => {
  const { user } = useUserContext();
  const flag = getFlag(data.country || "");
 
  let Initials;
  if(!data.image_path){
     Initials  = data.first_name.charAt(0) + data.last_name.charAt(0);
     console.log(Initials);
  }  
  const logo_image_path = "/src/assets/ib_logo-white.png";
  const isJPEG = data.logo_path ? data.logo_path.endsWith(".jpg") || data.logo_path.endsWith(".jpeg") : false;
  console.log(isJPEG)

  
  return (
    <div className="w-full max-w-lg rounded-2xl my-4 p-4 shadow-xl flex min-h-[200px] mx-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-300">
      <div className="flex flex-col flex-1 justify-between">
         {/* Big image or initials */}
         <div className="relative w-32 h-32 rounded-full flex items-center justify-center mb-2">
          {data.image_path ? (
            <img src={data.image_path} className="object-cover h-full w-full rounded-full" alt="Profile" />
          ) : (
            <div className="w-full h-full rounded-full border flex flex-col items-center justify-center">
              <span className="text-2xl text-gray-800 dark:text-white font-bold mb-0">
                {Initials}
              </span>
            </div>
          )}

{/*           
          {data.show_logo == true && data.logo_path && (
            <div className="absolute bottom-0 left-24 w-12 h-12 flex items-center justify-center border border-gray-300 z-1 rounded-full dark:border-white">
            
            <img
              src={data.logo_path} 
              alt="logo"
              className={`object-cover ${isJPEG ? 'rounded-full' : ''}`} 
              style={isJPEG ? {} : { maxWidth: '80%', maxHeight: '80%' }} 
            /> 
             
     
    
          </div>
          )} */}
        </div>


        <div className="flex flex-col flex-wrap">
          <span className="text-xl text-gray-800 dark:text-white font-bold mb-0">
            {data.first_name} {data.last_name}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-300 flex items-center flex-wrap">
            <span className="mr-2">{data.company_role} </span>
            {/* {data.company?.name ? (
              <span className="mr-2">{"@" + data.company.name}</span>
            ) : data.company_name !== "" ? (
              <span className="mr-2">{"@" + data.company_name}</span> border border-gray-300 z-1 rounded-full border-white dark:border-gray-800
            ) : null} */}
            {data.company?.name ? (
              <span className="mr-2">{"@" + data.company.name}</span>
            ) : null}
            {data.company_name && data.company_name !== "" ? (
              <span className="mr-2">{"@" + data.company_name}</span>
            ) : null}
            {flag !== "" && (
              <div className="w-6 h-6 flex items-center justify-center overflow-hidden rounded-full">
                <img
                  src={flag}
                  className="object-cover min-h-full min-w-full"
                />
              </div>
            )}
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end min-h-[200px]">
        <div className="flex items-center gap-3">
          {user && user.id === data.user_id ? (
            <Link
              to={`/stats/${data.nfc_card.link.substring(
                data.nfc_card.link.lastIndexOf("/") + 1
              )}`}
            >
              <IoBarChartSharp className="text-4xl text-gray-800 dark:text-gray-200" />
            </Link>
          ) : null}
          <button
            onClick={() => onQrCodeClick(false)}
            className="text-4xl dark:text-gray-200"
          >
            <BsQrCodeScan />
          </button>
        </div>
        <div
          onClick={() => onQrCodeClick(true)}
          className="text-3xl flex items-center hover:underline dark:text-gray-200 cursor-pointer"
        >
         <BsFillShareFill className="ml-2" />
        </div>
      </div>
    </div>
  );
};
