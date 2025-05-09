import { remove, patch } from "./baseService";

const baseUrl = "https://e-shop-backend-new-hazel.vercel.app/order-items";
// const baseUrl = "http://localhost:3000/order-items/";

export const deleteOrderItemById = async (id: number) => {
  await remove(`${baseUrl}/${id}`);
};

export const updateQuantityInOrderItemById = async (id: number, quantity: number) => {
  const changedOrderItem = { quantity: quantity };
  await patch(`${baseUrl}/${id}`, changedOrderItem);
};
