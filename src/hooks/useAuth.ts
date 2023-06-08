import { SyntheticEvent, useState } from "react";
import { api } from "../api";
import { useUserContext } from "../context/UserContext";

const wait = () =>
  new Promise((res) =>
    setTimeout(() => {
      res(true);
    }, 2000)
  );

export const useAuth = () => {
  const { setUser } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("peric.bojan87@gmail.com");
  const [password, setPassword] = useState("1234567");

  async function attemptLogin(e: SyntheticEvent) {
    e.preventDefault();
    if (email === "" || password === "") return;
    try {
      setIsLoading(true);
      await wait();
      await api.get("/sanctum/csrf-cookie");
      let loginRes = await api.post("/api/login", { email, password });
      localStorage.setItem("ibcards-user-token", loginRes.data.token);
      setUser(loginRes.data.user);
      setIsLoading(false);
    } catch (e) {
      //TODO: add toast message
      console.log(e);
      setIsLoading(false);
    }
  }

  async function attemptLogout() {
    try {
      setIsLoading(true);
      await api.get("/sanctum/csrf-cookie");
      await api.post("/api/logout");
      localStorage.removeItem("ibcards-user-token");
      setUser(null);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      //TODO: add toast message
    }
  }

  function updateAuthForm(val: string, name: "email" | "password") {
    if (name === "email") {
      setEmail(val);
    } else {
      setPassword(val);
    }
  }

  return {
    email,
    password,
    attemptLogin,
    attemptLogout,
    updateAuthForm,
    isLoading,
  };
};
