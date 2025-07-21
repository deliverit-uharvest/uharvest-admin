// src/services/authService.ts
import agent from "../api/agent";
import { ApiResponse } from "../models/ApiResponse";
import { LoginRequest } from "../models/LoginRequest";
import { toast } from "react-toastify";
import { LoginResponse } from "../models/LoginResponse";
import { store } from "../stores/store";
export const handleLogin = async (
  credentials: LoginRequest,
  onSuccess: () => void
) => {
  try {
    const response: ApiResponse<LoginResponse> = await agent.User.login(
      credentials
    );

    if (response.status === "error") {
      throw new Error(response.message || "Login failed");
    }

    store.userStore.setUser(response.data.user, response.data.token);

    toast.success("Login successful");
    onSuccess();
    console.log("User after login:", store.userStore.user);
    console.log("Token after login:", store.userStore.token);
  } catch (error: any) {
    if (Array.isArray(error)) {
      error.forEach((err) => toast.error(err));
    } else if (error?.message) {
      toast.error(error.message);
    } else {
      toast.error("Login failed");
    }
    throw error;
  }
};
