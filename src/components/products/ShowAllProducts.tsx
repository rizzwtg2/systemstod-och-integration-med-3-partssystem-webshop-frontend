import { Link } from "react-router-dom";
import { IProduct } from "../../models/IProduct";
import { SingleProduct } from "./SingleProduct";
import { useProducts } from "../../hooks/useProducts";

interface IProps {
  isInAdmin: boolean;
}

export const ShowAllProducts = ({ isInAdmin }: IProps) => {
  const { products, deleteProduct } = useProducts();
  const linkUrl = isInAdmin ? "/admin/products" : "/products";
  return (
    <>
      <div className='flex flex-col sm:grid sm:grid-cols-3 xl:grid-cols-5 gap-4'>
        {products.map((product: IProduct) => (
          <div key={product.id} className='relative flex flex-col ring-2 ring-gray-300 gap-2 rounded hover:ring-4 '>
            <Link to={`${linkUrl}/${product.id}`}>
              <SingleProduct product={product} />
            </Link>

            {isInAdmin && (
              <button
                className='absolute top-2 right-2 hover:cursor-pointer text-2xl text-red-600 font-bold z-50'
                onClick={() => {
                  deleteProduct(product.id as number);
                }}
              >
                X
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
