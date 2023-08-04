import axios from "axios";

let baseUrl = import.meta.env.DEV
  ? "http://127.0.0.1:8000"
  : "http://157.230.107.80";

const api = axios.create({
  baseURL: baseUrl, // `https://ibcards-api-a4v5r.ondigitalocean.app`,
  // `https://ibcards-api.com`,
  // process.env.NODE_ENV == "production"
  //   ? "https://ibcards-api-a4v5r.ondigitalocean.app"
  //   : "http://localhost:8000",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    Accept: "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage["ibcards-user-token"];
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export { api, baseUrl };
