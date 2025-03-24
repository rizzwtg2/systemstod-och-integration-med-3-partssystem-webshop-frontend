import { deleteOrderItemById, updateQuantityInOrderItemById } from "../services/orderItemServices";

export const useOrderItems = () => {
  const deleteOrderItem = async (id: number) => {
    await deleteOrderItemById(id);
  };

  const updateQuantityInOrderItem = async (id: number, quantity: number) => {
    await updateQuantityInOrderItemById(id, quantity);
  };

  return { deleteOrderItem, updateQuantityInOrderItem };
};
