import LogoWhite from "../../assets/logo-white.png";
import LogoDark from "../../assets/logo-dark.png";
import { useUserContext } from "../../context/UserContext";

export const AppLogo = (props: any) => {
  const { theme } = useUserContext();
  return (
    <img
      src={theme === "light" ? LogoDark : LogoWhite}
      alt="ibcard brand logo"
      className="h-6"
      {...props}
    />
  );
};
