import axios from "axios";
import Cookies from "js-cookie";

// TODO: add next configs
const headers = {
  "Content-Type": "application/json",
};

const baseURLAccountBff =
  process.env.SSR_API_URL ??
  process.env.NEXT_PUBLIC_URL ??
  `https://cryptobed-strapi.herokuapp.com/`;

const createAxiosInstanceServer = (baseUrl: string) => {
  const options = {
    baseURL: baseUrl,
    timeout: 7000,
    headers: headers,
  };
  return axios.create(options);
};

const instance = createAxiosInstanceServer(baseURLAccountBff);

instance.interceptors.request.use(
  function (config) {
    // Getting the JWT token from cookies
    const jwt = Cookies.get("jwt");

    // If the JWT token is present, set it in the Authorization header
    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    }
    return config;
  },
  function (error) {
    // If there's an error, reject the promise
    return Promise.reject(error);
  }
);

export const serverAxiosInstance = instance;
