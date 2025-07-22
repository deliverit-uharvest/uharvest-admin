import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { LoginRequest } from "../models/LoginRequest";
import { LoginResponse } from "../models/LoginResponse";
import { ApiResponse } from "../models/ApiResponse";
import { store } from "../stores/store";
import { baseApiUrl } from "./constants";

axios.defaults.baseURL = baseApiUrl;
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use((config) => {
  const token = store.userStore.token;
  console.log("Token sent in request:", token);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (config.method === "get" && data.errors.hasOwnProperty("id")) {
          router.navigate("/not-found");
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        toast.error("unauthorised");
        break;
      case 403:
        toast.error("forbidden");
        break;
      case 404:
        router.navigate("/not-found");
        break;
      case 500:
        console.log(error);
        break;
    }
    return Promise.reject(error);
  }
);

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Product = {
  getAll: (filters: {
    category_id?: number;
    sub_category_id?: number;
    name?: string;
  } = {}) => requests.post("/product", filters),
};

const Customer = {};

const User = {
  login: (credentials: LoginRequest) =>
    requests.post<ApiResponse<LoginResponse>>("/auth/login", credentials),
  current: () => requests.get("/auth/profile"),
};

const Category = {
  get: () =>
    requests.get<ApiResponse<LoginResponse>>("/category"),
};

// const Cart = {
//   addToCart: (productId: number) => {
//     return requests.post("/cart/add-to-cart", { product_id: productId ,device_id:"temp"});
//   },
//   getCart: () => {
//     return requests.get("/cart");
//   },
//   updateQuantity: (cartId: number, action: "increase" | "decrease") =>
//     requests.post("/cart/update", { cart_id: cartId, action: action,device_id:"temp" }),
// };

// const Orders = {
//   getorders: () => requests.get("/orders"),
//   createOrder: () => requests.post("/orders/create", {}),
// };

const agent = {
  Product,
  Customer,
  User,
  // Cart,
  // Orders,
};

export default agent;
