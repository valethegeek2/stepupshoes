import { Category, Product } from "@/backend/BackendClasses";
import apiClient from "./apiClient";
import { API_CONFIG } from "./apiClient";
import * as mockApi from "@/backend/mockData";
/* =================== PRODUCT ENDPOINTS ====================*/

export async function getAdminProducts(pageNumber = 0, pageSize = 5, sortBy="id", sortOrder="asc") {
  if(API_CONFIG.USE_MOCK) {
    return mockApi.getProducts(pageNumber, pageSize);
  }
  const response = await apiClient.get(`/admin/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`);
  return response.data;
}

export const adminCreateProduct = async (product) => {
  if(API_CONFIG.USE_MOCK) {
    return mockApi.createProduct(product);
  }
  const response = await apiClient.post(`/admin/products/`, product);
  return response.data;
};

export const adminUpdateProduct = async (product, id) => {
  const response = await apiClient.put(`/admin/products/${id}`, product);
  return response.data;
};

export const adminDeleteProduct = async (id) => {
  const response = await apiClient.delete(`/admin/products/${id}`);
  return response.data;
};

/*======================================================================== */

/* =================== VARIANT ENDPOINTS ====================*/
export async function getAdminVariants(page = 0, size = 10, sortBy="id", sortOrder="asc") {
  const token = localStorage.getItem("auth_token");
  // if (!token) {
  //   // token is missing → user probably not logged in
  //   throw new Error("No authentication token found. Please log in first.");
  // }
  const response = await apiClient.get(
    `/admin/products?page=${page}&size=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
}

/*======================================================================== */