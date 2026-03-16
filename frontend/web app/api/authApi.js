import apiClient from "./apiClient";
import { API_CONFIG } from "./apiClient";
import * as mockApi from "@/backend/mockData";

export async function login(username, password) {

  if(API_CONFIG.USE_MOCK){
    const response = await mockApi.login(username, password);
    return response;
  }

  const response = await apiClient.post("/auth/login", {
    username,
    password
  });

  const token = response.data.accessToken;

  localStorage.setItem("auth_token", token);

  return response.data;
}

export function logout() {
  localStorage.removeItem("auth_token");
}