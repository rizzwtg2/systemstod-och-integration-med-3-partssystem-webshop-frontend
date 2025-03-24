import { IOrder } from "../models/IOrder";
import { get, remove, patch, post } from "./baseService";

const baseUrl = "http://localhost:3000/orders";

export const getAllOrders = async () => {
  const response: IOrder[] = await get(baseUrl);
  return response;
};
export const getOrderById = async (id: number) => {
  const response: IOrder = await get(`${baseUrl}/${id}`);
  return response;
};

export const deleteOrderById = async (id: number) => {
  await remove(`${baseUrl}/${id}`);
  await getAllOrders();
};

export const updateOrderById = async (order: IOrder) => {
  await patch(`${baseUrl}/${order.id}`, order);
  await getAllOrders();
};

export const createOrder = async (order: IOrder) => {
  await post(`${baseUrl}`, order);
  await getAllOrders();
};
