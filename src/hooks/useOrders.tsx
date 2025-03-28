import { useEffect, useState } from "react";
import { IOrder, IOrderCreate, IOrderResponse } from "../models/IOrder";
import {
  getAllOrders,
  getOrderById,
  deleteOrderById,
  updateOrderById,
  createOrder,
  getOrderBySessionIdFromApi,
} from "../services/orderServices";

export const useOrders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isIntervalSet, setIsIntervalSet] = useState<boolean>(false);

  useEffect(() => {
    getOrders();

    if (!isIntervalSet) {
      const intervalId = setInterval(() => {
        localStorage.removeItem("orders");
        getOrders();
      }, 1000 * 10);
      setIsIntervalSet(true);

      return () => clearInterval(intervalId);
    }
  }, []);

  const getOrders = async () => {
    try {
      const response = await getAllOrders();
      localStorage.setItem("orders", JSON.stringify(response));
      setOrders(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getSingleOrder = async (id: number) => {
    return await getOrderById(id);
  };

  const getOrderBySessionId = async (id: string) => {
    return await getOrderBySessionIdFromApi(id);
  };

  const deleteOrder = async (id: number) => {
    try {
      const newOrders = orders.filter((order) => order.id !== id);
      await deleteOrderById(id);
      setOrders(newOrders);
      localStorage.setItem("orders", JSON.stringify(newOrders));
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  };

  const updateOrder = async (order: IOrder) => {
    const orderToUpdate = orders.find((storedOrders) => storedOrders.id === order.id);
    if (orderToUpdate) {
      await updateOrderById(orderToUpdate);
      setOrders([...orders]);

      localStorage.setItem("orders", JSON.stringify(orders));
    }
  };
  const createNewOrder = async (order: IOrderCreate): Promise<IOrderResponse> => {
    const response = await createOrder(order);
    return response;
  };

  return { orders, deleteOrder, updateOrder, getSingleOrder, createNewOrder, getOrders, getOrderBySessionId };
};
