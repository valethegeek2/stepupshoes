// product api endpoints
import apiClient from "./apiClient";
import { mockDB } from "@/backend/mockData";
import { API_CONFIG } from "./apiClient";

export async function getProducts(page = 0, size = 10) {

  const response = await apiClient.get(
    `/products?page=${page}&size=${size}`
  );

  return response.data;
}

export async function getProduct(productId) {

  const response = await apiClient.get(
    `/products/${productId}`
  );

  return response.data;
}
export async function getVariants(productId) {

  const response = await apiClient.get(
    `/products/${productId}/variants`
  );

  return response.data;
}