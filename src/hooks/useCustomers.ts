import { useEffect, useState } from "react";
import { ICustomer } from "../models/ICustomer";
import {
  deleteCustomerById,
  getAllCustomersFromApi,
  getCustomerByIdFromApi,
  updateCustomerById,
  createCustomer,
  getCustomerByEmailFromApi,
} from "../services/customerServices";

export const useCustomers = () => {
  const [customers, setCustomers] = useState<ICustomer[]>(
    localStorage.getItem("customers") ? JSON.parse(localStorage.getItem("customers") as string) : []
  );

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [isIntervalSet, setIsIntervalSet] = useState<boolean>(false);

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError(String(error));
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!isIntervalSet) {
      const intervalId = setInterval(() => {
        localStorage.removeItem("customers");
        getAllCustomers();
      }, 1000 * 10);
      setIsIntervalSet(true);

      return () => clearInterval(intervalId);
    }
  }, []);

  const getAllCustomers = async () => {
    try {
      const response: ICustomer[] = await getAllCustomersFromApi();
      setCustomers(response);
      localStorage.setItem("customers", JSON.stringify(response));

      setLoading(false);
    } catch (error) {
      handleError(error);
      setLoading(false);
    }
  };

  const getCustomerById = async (id: number): Promise<ICustomer | undefined> => {
    try {
      const response: ICustomer | undefined = await getCustomerByIdFromApi(id);
      if (!response) {
        throw new Error(`Customer with id ${id} not found`);
      }
      return response;
    } catch (error) {
      handleError(error);
    }
  };
  const getCustomerByEmail = async (mail: string): Promise<ICustomer | undefined> => {
    try {
      const response: ICustomer | undefined = await getCustomerByEmailFromApi(mail);
      if (!response) {
        throw new Error(`Customer with id ${mail} not found`);
      }
      return response;
    } catch (error) {
      handleError(error);
    }
  };

  const createNewCustomer = async (customer: ICustomer) => {
    try {
      await createCustomer(customer);
      await getAllCustomers();
    } catch (error) {
      handleError(error);
    }
  };

  const deleteCustomer = async (id: number) => {
    try {
      await deleteCustomerById(id);
      await getAllCustomers();
    } catch (error) {
      handleError(error);
    }
  };

  const updateCustomer = async (customer: ICustomer) => {
    try {
      await updateCustomerById(customer);
      await getAllCustomers();
    } catch (error) {
      handleError(error);
    }
  };

  return {
    customers,
    setCustomers,
    loading,
    error,
    getAllCustomers,
    deleteCustomer,
    getCustomerById,
    updateCustomer,
    createNewCustomer,
    getCustomerByEmail,
  };
};
