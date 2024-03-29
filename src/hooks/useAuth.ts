import { SyntheticEvent, useState } from "react";
import { api } from "../api";
import { useUserContext } from "../context/UserContext";
import { NavigateFunction, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const wait = () =>
  new Promise((res) =>
    setTimeout(() => {
      res(true);
    }, 2000)
  );

export const useAuth = () => {
  const navigate = useNavigate();
  const { setUser } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function attemptFormLogin(e: SyntheticEvent) {
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
      navigate("/");
    } catch (e) {
      toast.error("Invalid credentials!");
      console.log(e);
      setIsLoading(false);
    }
  }

  async function attemptLogin(loginEmail: string, loginPassword: string) {
    if (loginEmail === "" || loginPassword === "")
      throw Error("Email and Password are required");
    setIsLoading(true);
    await wait();
    await api.get("/sanctum/csrf-cookie");
    let loginRes = await api.post("/api/login", {
      email: loginEmail,
      password: loginPassword,
    });
    localStorage.setItem("ibcards-user-token", loginRes.data.token);
    setUser(loginRes.data.user);
    setIsLoading(false);
  }

  async function attemptLogout() {
    try {
      setIsLoading(true);
      await api.get("/sanctum/csrf-cookie");
      await api.post("/api/logout");
      localStorage.removeItem("ibcards-user-token");
      setUser(null);
      setIsLoading(false);
      navigate("/");
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      toast.error("Error logging out");
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
    attemptFormLogin,
    attemptLogout,
    updateAuthForm,
    isLoading,
  };
};
