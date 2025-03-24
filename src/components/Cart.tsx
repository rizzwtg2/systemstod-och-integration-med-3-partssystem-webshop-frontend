import React, { useContext } from "react";
import CartContext from "../contexts/CartContext";
import { CartActionType } from "../reducers/CartReducer";
import { CartItem } from "../models/CartItem";
import { Link } from "react-router-dom";

export const Cart = () => {
  const { cart, dispatch } = useContext(CartContext);

  const handleQuantityChange = (cartItem: CartItem, newQuantity: number) => {
    dispatch({ type: CartActionType.CHANGE_QUANTITY, payload: { ...cartItem, quantity: newQuantity } });
  };

  return (
    <>
      <div className='space-y-10'>
        <h1 className='text-4xl font-bold p-4'>Shopping Cart</h1>
        {cart.length === 0 ? (
          <div className='text-center text-2xl font-bold'>Your cart is empty</div>
        ) : (
          <div className='flex-row-reverse items-center flex py-4 gap-x-6 '>
            <div className='gap-4 flex flex-col items-center justify-center'>
              <span className='whitespace-nowrap font-bold text-2xl'>
                Total: {cart.reduce((total, item) => total + item.product.price * item.quantity, 0)} kr
              </span>
              <Link to='/checkout'>
                <button className='ring hover:ring-2 p-4 rounded-2xl font-bold bg-emerald-400 cursor-pointer'>
                  Checkout
                </button>
              </Link>
            </div>
            <div className='flex flex-col items-center md:grid md:grid-cols-4 gap-y-8 divide-y text-center md:items-end '>
              {cart.map((item) => (
                <React.Fragment key={item.product.id}>
                  <div className='flex items-center gap-4'>
                    <img src={item.product.image} alt={item.product.name} className='size-16 object-cover' />
                    <span className='text-lg font-semibold'>{item.product.name}</span>
                  </div>
                  <span className='text-gray-500 border-b-1 border-black'>Price: {item.product.price} kr</span>
                  <span>
                    {" "}
                    Quantity:{" "}
                    <input
                      type='number'
                      defaultValue={item.quantity}
                      min={1}
                      max={item.product.stock}
                      className=' text-center border rounded'
                      onChange={(e) => handleQuantityChange(item, +e.target.value)}
                    ></input>{" "}
                  </span>
                  <span className='text-lg font-semibold border-b-1'>{item.product.price * item.quantity} kr</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
