import { AnimatePresence, motion } from "framer-motion";
import { BsSun, BsMoon } from "react-icons/bs";
import { useUserContext } from "../context/UserContext";

export function ThemeToggle() {
  const { theme, setTheme } = useUserContext();
  function toggleTheme() {
    if (theme == "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        onClick={toggleTheme}
        key={theme}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-500 hover:brightness-95 flex items-center justify-center cursor-pointer"
      >
        {theme === "light" ? <BsMoon /> : <BsSun />}
      </motion.div>
    </AnimatePresence>
  );
}
