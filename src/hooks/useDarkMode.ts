import { useState, useEffect } from "react";

function useDarkMode() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("habitly-theme") || "light"
  );

  useEffect(() => {
    const body = window.document.getElementsByTagName("body")[0];
    if (theme === "light") {
      body.classList.remove("dark");
      localStorage.setItem("habitly-theme", "light");
    } else {
      body.classList.add("dark");
      localStorage.setItem("habitly-theme", "dark");
    }
  }, [theme]);

  return { theme, setTheme };
}

export { useDarkMode };
