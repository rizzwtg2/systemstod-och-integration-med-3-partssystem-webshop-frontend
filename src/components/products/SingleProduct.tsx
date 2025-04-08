import { useState, useEffect, useContext } from "react";
import { IProduct } from "../../models/IProduct";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { ProductForm } from "./ProductForm";

import { CartActionType } from "../../reducers/CartReducer";
import { CartItem } from "../../models/CartItem";
import CartContext from "../../contexts/CartContext";

interface IProps {
  product?: IProduct;
  isInAdmin?: boolean;
}

export const SingleProduct = (props: IProps) => {
  const isInAdmin = useLocation().pathname.includes("/admin/products");
  const isInAllProducts = useLocation().pathname.includes("/products");
  const { deleteProduct, getProductById, updateProduct } = useProducts();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct>(props.product as IProduct);
  const navigate = useNavigate();
  const [isEditActive, setIsEditActive] = useState<boolean>(false);

  const { dispatch } = useContext(CartContext);

  const handleAddToCart = (product: IProduct, quantity: number) => {
    dispatch({ type: CartActionType.ADD_ITEM, payload: new CartItem(product, quantity) });
  };

  useEffect(() => {
    if (product !== undefined) {
      setProduct(product);
    } else {
      const fetchProduct = async () => {
        const response = await getProductById(Number(id));
        if (response) {
          setProduct(response);
        }
      };
      fetchProduct();
    }
  }, []);

  return (
    <>
      <div className='relative space-y-1.5 pb-2'>
        <h3 className='p-2 text-2xl font-semibold'>{product?.name}</h3>
        <img src={product?.image} alt={product?.name} className='mx-auto object-cover max-w-full size-52 relative' />

        <p>Category: {product?.category} </p>
        <p className={isInAllProducts ? "line-clamp-3" : ""}>Decsription: {product?.description}</p>

        <p>Price: {product?.price} kr</p>
        <p>In stock: {product?.stock} </p>
        {!isInAdmin && (
          <button
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart(product, 1);
            }}
            className='mx-auto cursor-pointer p-2 flex items-center justify-center ring rounded hover:ring-2 '
          >
            Add to
            <svg width='24px' height='24px' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <circle cx='16.5' cy='18.5' r='1.5' />
              <circle cx='9.5' cy='18.5' r='1.5' />
              <path d='M18 16H8a1 1 0 0 1-.958-.713L4.256 6H3a1 1 0 0 1 0-2h2a1 1 0 0 1 .958.713L6.344 6H21a1 1 0 0 1 .937 1.352l-3 8A1 1 0 0 1 18 16zm-9.256-2h8.563l2.25-6H6.944z' />
            </svg>
          </button>
        )}

        {id && isInAdmin && (
          <button
            className='absolute top-0 right-0 hover:cursor-pointer text-2xl text-red-600 font-bold'
            onClick={() => {
              deleteProduct(product?.id as number);
              navigate("/products");
            }}
          >
            X
          </button>
        )}
        {id! && isInAdmin && (
          <button
            className='border rounded p-2 bg-indigo-300 cursor-pointer'
            onClick={() => setIsEditActive(!isEditActive)}
          >
            Edit product
          </button>
        )}
        {isEditActive && isInAdmin && <ProductForm product={product} submitTo={updateProduct} />}
      </div>
    </>
  );
};
