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
  patch: <T>(url: string, body?: {}) =>
    axios.patch<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Product = {
  getAll: (
    filters: {
      category_id?: number;
      sub_category_id?: number;
      name?: string;
    } = {}
  ) => requests.post("/product", filters),
  getProduct:(id:number)=>requests.get(`product/${id}`),
  updateStatus: (productId: number) => requests.patch(`/product/${productId}`),
  delete: (productId: number) => requests.delete(`/product/${productId}`),
  createProduct: (data: FormData) => requests.post("/product/create", data),
  updateProduct:(data:FormData,id:number)=>requests.patch(`product/update/${id}`,data)
};

const Customer = {};

const User = {
  login: (credentials: LoginRequest) =>
    requests.post<ApiResponse<LoginResponse>>("/auth/login", credentials),
  current: () => requests.get("/auth/profile"),
};

const Category = {
  get: () => requests.get<ApiResponse<LoginResponse>>("/category"),
  delete: (id: number) => axios.delete(`/category/${id}`),
  create: (data: FormData) =>
    axios.post("/category/create", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  update: (data: FormData) => requests.post("/category", data),
  getById: (id: number) => requests.get(`/category/${id}`),
};

const Orders = {
  get: (config = {}) => axios.get<ApiResponse<any>>("/orders", config).then(responseBody),
  getstatus: () => requests.get<ApiResponse<LoginResponse>>("/orders/status"),
  delete: (id: number) => axios.delete(`/orders/${id}`),
  create: (data: FormData) =>
    axios.post("/orders/create", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  update: (data: FormData) => requests.post('/orders', data),
  getById: (id: number) => requests.get(`/orders/${id}`),
  changeStatus: (payload: { order_id: string; status_id: number }) =>
    requests.post<ApiResponse<any>>("/orders/change-status", payload),
};


const Organisation = {
  get: (config = {}) => axios.get<ApiResponse<any>>("/organisation", config).then(responseBody),
  getstatus: () => requests.get<ApiResponse<LoginResponse>>("/orders/status"),
  delete: (id: number) => axios.delete(`/orders/${id}`),
  create: (data: FormData) =>
    axios.post("/organisation", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  update: (data: FormData) => axios.post('/orders', data),
  getById: (id: number) => requests.get(`/orders/${id}`),
  changeStatus: (payload: { order_id: string; status_id: number }) =>
    requests.post<ApiResponse<any>>("/orders/change-status", payload),
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
  Category,
  Orders,
  Organisation,
  // Cart,
  // Orders,
};

export default agent;
