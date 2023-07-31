import { useLocation, Outlet, useParams, Link } from "react-router-dom";
import { AppLogo } from "../ui/AppLogo";
import { HiBars2 } from "react-icons/hi2";
import { BsPeople } from "react-icons/bs";
import { CiCreditCard2, CiEdit } from "react-icons/ci";
import { SlHome } from "react-icons/sl";
import { GiChart } from "react-icons/gi";
import { ReactNode } from "react";
import { useModalsContext } from "../../context/ModalsContext";
import { MainMenu } from "../MainMenu";
import { QRModal } from "../QRModal";
import { useUserContext } from "../../context/UserContext";

export const AppLayout = () => {
  const { user } = useUserContext();
  const { openMainMenu } = useModalsContext();
  const location = useLocation();
  return (
    <>
      <div
        className={`h-full w-full ${
          user || location.pathname !== "/" ? "pb-16 pt-16" : "pb-0 pt-0"
        } overflow-auto`}
      >
        {/* top navigation */}
        <div className="absolute top-0 left-0 w-full h-14 backdrop-blur-md px-4 flex items-center z-10">
          <AppLogo />
          <div className="flex-1"></div>
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
        {user && location.pathname !== "/" && <BottomNav />}
        {/* bottom nav end */}
      </div>

      <MainMenu />
      <QRModal />
    </>
  );
};

const BottomNav = () => {
  const { cardId } = useParams();
  return (
    <div className="absolute bottom-0 left-0 w-full h-14 backdrop-blur bg-white/60 dark:bg-black/40 flex items-center justify-around px-4">
      <BottomNavLink to="/">
        <SlHome className="text-2xl" />
      </BottomNavLink>
      <BottomNavLink to={`/card/${cardId}`}>
        <CiCreditCard2 />
      </BottomNavLink>
      <BottomNavLink to={`/card/${cardId}/edit`}>
        <CiEdit />
      </BottomNavLink>
      <BottomNavLink to={`/card/${cardId}/stats`}>
        <GiChart className="text-2xl" />
      </BottomNavLink>
      <BottomNavLink to={`/card/${cardId}/portal`}>
        <BsPeople className="text-3xl" />
      </BottomNavLink>
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
