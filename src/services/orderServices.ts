import { IOrder, IOrderCreate, IOrderResponse } from "../models/IOrder";
import { get, remove, patch, post } from "./baseService";

// const baseUrl = "http://localhost:3000/orders";
const baseUrl = "https://e-shop-backend-new-hazel.vercel.app/orders";

export const getAllOrders = async (): Promise<IOrder[]> => {
  return await get<IOrder[]>(baseUrl);
};
export const getOrderById = async (id: number): Promise<IOrder> => {
  return await get<IOrder>(`${baseUrl}/${id}`);
};
export const getOrderBySessionIdFromApi = async (id: string): Promise<IOrder> => {
  return await get<IOrder>(`${baseUrl}/payment/${id}`);
};

export const deleteOrderById = async (id: number): Promise<{ message: string }> => {
  const response = await remove<{ message: string }>(`${baseUrl}/${id}`);
  await getAllOrders();
  return response;
};

export const updateOrderById = async (order: IOrder): Promise<{ message: string }> => {
  const response = await patch<IOrder, { message: string }>(`${baseUrl}/${order.id}`, order);
  await getAllOrders();
  return response;
};

export const createOrder = async (order: IOrderCreate): Promise<IOrderResponse> => {
  const response = await post<IOrderCreate, IOrderResponse>(`${baseUrl}`, order);
  await getAllOrders();
  return response;
};
