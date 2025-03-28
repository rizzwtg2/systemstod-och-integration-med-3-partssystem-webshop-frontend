import { ICustomer, ICustomerResponse } from "../models/ICustomer";
import { get, patch, remove, post } from "./baseService";

const baseUrl = "http://localhost:3000/customers";

export const getAllCustomersFromApi = async (): Promise<ICustomer[]> => {
  const response: ICustomer[] = await get(baseUrl);
  return response;
};
export const getCustomerByIdFromApi = async (id: number): Promise<ICustomer> => {
  const response: ICustomer = await get(`${baseUrl}/${id}`);
  return response;
};
export const getCustomerByEmailFromApi = async (mail: string): Promise<ICustomer> => {
  const response: ICustomer = await get(`${baseUrl}/email/${mail}`);
  return response;
};

export const createCustomer = async (customer: ICustomer): Promise<ICustomerResponse> => {
  const response: ICustomerResponse = await post(baseUrl, customer);
  await getAllCustomersFromApi();
  return response;
};

export const deleteCustomerById = async (id: number): Promise<ICustomerResponse> => {
  const response: ICustomerResponse = await remove(`${baseUrl}/${id}`);
  await getAllCustomersFromApi();
  return response;
};

export const updateCustomerById = async (customer: ICustomer): Promise<ICustomerResponse> => {
  const response: ICustomerResponse = await patch(`${baseUrl}/${customer.id}`, customer);
  await getAllCustomersFromApi();
  return response;
};
