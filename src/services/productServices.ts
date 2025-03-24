import { IProduct } from "../models/IProduct";
import { get, patch, remove, post } from "./baseService";

const baseUrl = "http://localhost:3000/products";

export const getAllProductsFromApi = async () => {
  const response: IProduct[] = await get(baseUrl);
  return response;
};
export const getProductByIdFromApi = async (id: number) => {
  const response: IProduct = await get(`${baseUrl}/${id}`);
  return response;
};

export const createProduct = async (product: IProduct) => {
  await post(baseUrl, product);
  await getAllProductsFromApi();
};

export const deleteProductById = async (id: number) => {
  await remove(`${baseUrl}/${id}`);
  await getAllProductsFromApi();
};

export const updateProductById = async (product: IProduct) => {
  await patch(`${baseUrl}/${product.id}`, product);
  await getAllProductsFromApi();
};
