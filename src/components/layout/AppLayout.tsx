import {
  useLocation,
  Outlet,
  useParams,
  Link,
  Navigate,
} from "react-router-dom";
import { AppLogo } from "../ui/AppLogo";
import { HiBars2 } from "react-icons/hi2";
import { BsPeople } from "react-icons/bs";
import { CiCreditCard2, CiEdit } from "react-icons/ci";
import { SlHome } from "react-icons/sl";
import { ReactNode } from "react";
import { useModalsContext } from "../../context/ModalsContext";
import { MainMenu } from "../MainMenu";
import { QRModal } from "../QRModal";
import { useUserContext } from "../../context/UserContext";
import { useCardData } from "../../hooks/useCardData";
import { MdContacts } from "react-icons/md";
import { Card } from "../../types/Card";

const dontShowBottomNav = ["/"];

export const AppLayout = ({ isPrivate = false }: { isPrivate?: boolean }) => {
  const { user } = useUserContext();
  const { openMainMenu } = useModalsContext();
  const location = useLocation();
  const { cardId } = useParams();
  const { cardData, isLoading } = useCardData(cardId);
  let showNav = false;
  if (!isLoading && user && !dontShowBottomNav.includes(location.pathname)) {
    showNav = true;
  }

  const pageTitles = {
    "/card": "Card Preview",
    "/edit": "Edit Card",
    "/stats": "Card Insights",
    "/portal": "Company Portal",
    "/contacts": "Your Connections",
  };
  let pageTitle = "";
  for (const [key, val] of Object.entries(pageTitles)) {
    if (location.pathname.startsWith(key)) {
      pageTitle = val;
      break;
    } else {
      pageTitle = "";
    }
  }

  let showRoutes = isPrivate ? !!user : true;
  return (
    <>
      {showRoutes ? (
        <>
          <div
            id="app-wrapper"
            className={`h-full w-full ${
              user || location.pathname !== "/" ? "pb-16 pt-14" : "pb-0 pt-0"
            } overflow-auto`}
          >
            {/* top navigation */}
            <div className="absolute top-0 left-0 w-full h-14 backdrop-blur-md px-4 flex items-center z-10">
              <Link to="/">
                <AppLogo />
              </Link>
              <div className="flex-1 text-center">
                {user && (
                  <span className="uppercase text-gray-900 dark:text-gray-200">
                    {pageTitle}
                  </span>
                )}
              </div>
              <button
                onClick={openMainMenu}
                className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-lg flex items-center justify-center dark:text-white"
              >
                <HiBars2 />
              </button>
            </div>
            {/* top navigation end */}

            <Outlet />

            {/* bottom nav */}
            {showNav ? <BottomNav cardData={cardData} /> : null}
            {/* bottom nav end */}
          </div>

          <MainMenu />
          <QRModal />
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

const BottomNav = ({ cardData }: { cardData: Card }) => {
  const { user } = useUserContext();
  const { cardId } = useParams();

  if (!user?.id || !cardData) return null;
  if (user.id !== cardData.user_id) return null;
  return (
    <div className="absolute bottom-0 left-0 w-full h-14 backdrop-blur bg-white/60 dark:bg-black/40 flex items-center justify-around px-4 standalone:pb-8">
      <BottomNavLink to="/">
        <SlHome className="text-2xl" />
      </BottomNavLink>
      <BottomNavLink to={`/card/${cardId}`}>
        <CiCreditCard2 />
      </BottomNavLink>
      <BottomNavLink to={`/edit/${cardId}`}>
        <CiEdit />
      </BottomNavLink>
      <BottomNavLink to={`/contacts/${cardId}`}>
        <MdContacts className="text-2xl" />
      </BottomNavLink>
      {cardData.company ? (
        <BottomNavLink to={`/portal/${cardId}`}>
          <BsPeople className="text-3xl" />
        </BottomNavLink>
      ) : null}
    </div>
  );
};

const BottomNavLink = ({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const styles = isActive
    ? "text-3xl w-12 h-full flex items-center justify-center text-blue-700 dark:text-blue-400 border-t-2 border-blue-500"
    : "text-3xl w-12 h-full flex items-center justify-center text-gray-600 dark:text-gray-300 border-t-2 border-transparent";

  return (
    <Link to={to} className={styles}>
      {children}
    </Link>
  );
};
