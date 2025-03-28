import { useParams } from "react-router-dom";
import { IOrder } from "../models/IOrder";
import { useContext, useEffect, useState } from "react";
import { useOrders } from "../hooks/useOrders";
import { IOrderItem } from "../models/IOrderItem";
import CartContext from "../contexts/CartContext";
import { CartActionType } from "../reducers/CartReducer";
export const OrderConfirmation = () => {
  const { session_id } = useParams();

  const [orderConfirmation, setOrderConfirmation] = useState<IOrder>();
  const { getOrderBySessionId } = useOrders();
  const { dispatch } = useContext(CartContext);

  const getOrder = async (sessionId: string) => {
    try {
      const response = await getOrderBySessionId(sessionId);
      setOrderConfirmation(response);
      console.log("Order confirmation:", response);
      console.log("oorder", orderConfirmation);
    } catch (error) {
      console.error("Error fetching order by session ID:", error);
    }
  };

  useEffect(() => {
    if (session_id) {
      getOrder(session_id);
      dispatch({ type: CartActionType.CLEAR_CART });
    }
  }, []);

  return (
    <div>
      <h1 className='text-4xl font-bold'>Order confirmation</h1>
      <div>
        {orderConfirmation && (
          <>
            <div className='flex flex-col justify-center border border-gray-400 rounded shadow-xl p-4 gap-2 '>
              <h3 className='text-2xl font-semibold'>Order ID: {orderConfirmation.id}</h3>
              <p className='font-semibold'>
                Customer: {orderConfirmation.customer_firstname} {orderConfirmation.customer_lastname}
              </p>
              <p className=''>Email: {orderConfirmation.customer_email}</p>
              <p className=''>Phone: {orderConfirmation.customer_phone}</p>
              <p className=''>Address: {orderConfirmation.customer_street_address}</p>
              <p className=''>City: {orderConfirmation.customer_city}</p>
              <p className=''>Postal Code: {orderConfirmation.customer_postal_code}</p>
              <p className=''>Country: {orderConfirmation.customer_country}</p>
            </div>
            <h2 className='text-2xl m-4'>Purchased items</h2>
            <div className='flex gap-2'>
              {orderConfirmation.order_items.map((item: IOrderItem) => (
                <div
                  key={item.id}
                  className='flex flex-col justify-center border border-gray-400 rounded shadow-xl p-4 gap-2'
                >
                  <div></div>
                  <h3 className='text-2xl font-semibold'>Product: {item.product_name}</h3>
                  <p className=''>Product ID: {item.product_id}</p>
                  <p className=''>Quantity: {item.quantity}</p>
                  <p className=''>Price: {item.unit_price}</p>
                  <p className=''>Total: {item.quantity * item.unit_price}</p>
                </div>
              ))}
            </div>
            <div className=''>
              <h2 className='text-2xl font-bold m-4'>Total:{orderConfirmation.total_price}</h2>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
