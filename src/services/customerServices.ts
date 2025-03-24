import { ICustomer } from "../models/ICustomer";
import { get, patch, remove, post } from "./baseService";

const baseUrl = "http://localhost:3000/customers";

export const getAllCustomersFromApi = async () => {
  const response: ICustomer[] = await get(baseUrl);
  return response;
};
export const getCustomerByIdFromApi = async (id: number) => {
  const response: ICustomer = await get(`${baseUrl}/${id}`);
  return response;
};

export const createCustomer = async (customer: ICustomer) => {
  await post(baseUrl, customer);
  await getAllCustomersFromApi();
};

export const deleteCustomerById = async (id: number) => {
  await remove(`${baseUrl}/${id}`);
  await getAllCustomersFromApi();
};

export const updateCustomerById = async (customer: ICustomer) => {
  await patch(`${baseUrl}/${customer.id}`, customer);
  await getAllCustomersFromApi();
};
