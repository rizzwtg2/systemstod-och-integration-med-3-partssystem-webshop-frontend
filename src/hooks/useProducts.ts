import { useEffect, useState } from "react";
import { IProduct } from "../models/IProduct";
import {
  deleteProductById,
  getAllProductsFromApi,
  getProductByIdFromApi,
  updateProductById,
  createProduct,
} from "../services/productServices";

export const useProducts = () => {
  const [products, setProducts] = useState<IProduct[]>(
    localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products") as string) : []
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
    getAllProducts();

    if (!isIntervalSet) {
      const intervalId = setInterval(() => {
        console.log("Removing products from local storage");
        localStorage.removeItem("products");
        getAllProducts();
      }, 1000 * 60); // 60 seconds
      setIsIntervalSet(true);

      return () => clearInterval(intervalId);
    }
  }, []);

  const getAllProducts = async () => {
    try {
      const response: IProduct[] = await getAllProductsFromApi();
      setProducts(response);
      localStorage.setItem("products", JSON.stringify(response));

      setLoading(false);
    } catch (error) {
      handleError(error);
      setLoading(false);
    }
  };

  const getProductById = async (id: number): Promise<IProduct | undefined> => {
    try {
      const response: IProduct | undefined = await getProductByIdFromApi(id);
      if (!response) {
        throw new Error(`Product with id ${id} not found`);
      }
      return response;
    } catch (error) {
      handleError(error);
    }
  };

  const createNewProduct = async (product: IProduct) => {
    try {
      await createProduct(product);
      const newProducts = [...products, product];
      setProducts(newProducts);
      localStorage.setItem("products", JSON.stringify(newProducts));
    } catch (error) {
      handleError(error);
    }
  };

  const updateProduct = async (product: IProduct) => {
    try {
      await updateProductById(product);
      const newProducts = products.map((p) => (p.id === product.id ? product : p));
      setProducts(newProducts);
      localStorage.setItem("products", JSON.stringify(newProducts));
    } catch (error) {
      handleError(error);
    }
  };

  const deleteProduct = (id: number) => {
    try {
      deleteProductById(id);
      const newProducts = products.filter((p) => p.id !== id);
      setProducts(newProducts);
      localStorage.setItem("products", JSON.stringify(newProducts));
    } catch (error) {
      handleError(error);
    }
  };

  return {
    products,
    setProducts,
    loading,
    error,
    getAllProducts,
    deleteProduct,
    getProductById,
    updateProduct,
    createNewProduct,
  };
};
