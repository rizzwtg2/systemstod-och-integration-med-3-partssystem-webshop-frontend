import { useState } from "react";
import { ShowAllProducts } from "../components/products/ShowAllProducts";
import { ProductForm } from "../components/products/ProductForm";
import { useProducts } from "../hooks/useProducts";
import { useLocation } from "react-router-dom";

export const ProductPage = () => {
  const isInAdmin = useLocation().pathname.includes("/admin/products");

  const [isAddProductActive, setIsAddProductActive] = useState<boolean>(false);
  const { createNewProduct } = useProducts();

  return (
    <div className='space-y-8'>
      <h1 className='text-4xl font-bold p-4'>Products</h1>
      {isInAdmin && (
        <div className=''>
          <button onClick={() => setIsAddProductActive(!isAddProductActive)}>Add product</button>
        </div>
      )}

      {isAddProductActive && <ProductForm submitTo={createNewProduct} />}
      <ShowAllProducts isInAdmin={isInAdmin} />
    </div>
  );
};
