import { useModalsContext } from "../context/ModalsContext";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";
import { ThemeToggle } from "./ThemeToggle";
import { AppLogo } from "./ui/AppLogo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AppButton } from "./ui/AppButton";
import { useAuth } from "../hooks/useAuth";
import { BiExit, BiLogIn } from "react-icons/bi";
import { useUserContext } from "../context/UserContext";

export const MainMenu = () => {
  const { user } = useUserContext();
  const { isMainMenuOpen, closeMainMenu } = useModalsContext();
  const { attemptLogout } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    closeMainMenu();
  }, [location.pathname]);
  return (
    <AnimatePresence>
      {isMainMenuOpen ? (
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          initial={{ y: 100, opacity: 0 }}
          className="absolute top-0 left-0 w-full h-full z-30 bg-white dark:bg-gray-900 flex flex-col"
        >
          <div className="h-14 flex justify-end px-4 items-center">
            <button
              onClick={closeMainMenu}
              className="h-10 w-10 flex items-center justify-center bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-700 rounded-full text-gray-700 dark:text-white"
            >
              <IoCloseOutline />
            </button>
          </div>
          <div className="flex justify-end my-3 px-8">
            <AppLogo className="h-10" />
          </div>
          <div className="flex-1 flex flex-col justify-end items-end px-10 py-4">
            <Link
              to="/contacts"
              className="my-3 text-2xl font-bold text-gray-800 dark:text-white hover:underline text-right"
            >
              Contacts
            </Link>
            <Link
              to="/"
              className="my-3 text-2xl font-bold text-gray-800 dark:text-white hover:underline text-right"
            >
              Give us an idea/feedback
            </Link>
            <Link
              to="/"
              className="my-3 text-2xl font-bold text-gray-800 dark:text-white hover:underline"
            >
              Help center
            </Link>
            <Link
              to="/"
              className="my-3 text-2xl font-bold text-gray-800 dark:text-white hover:underline"
            >
              Terms & Conditions
            </Link>
            <Link
              to="/"
              className="my-3 mb-10 text-2xl font-bold text-gray-800 dark:text-white hover:underline"
            >
              Home
            </Link>
            <div className="flex justify-between w-full">
              {user ? (
                <AppButton
                  onClick={async () => {
                    await attemptLogout();
                    navigate("/");
                    closeMainMenu();
                  }}
                  className="max-w-[120px]"
                >
                  <BiExit className="rotate-180" />
                  Logout
                </AppButton>
              ) : (
                <AppButton
                  onClick={async () => {
                    navigate("/");
                    closeMainMenu();
                  }}
                  className="max-w-[120px]"
                >
                  <BiLogIn />
                  Login
                </AppButton>
              )}
              <div className="flex items-center space-x-3 dark:text-white">
                <span>Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
