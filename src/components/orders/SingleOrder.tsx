import { useOrders } from "../../hooks/useOrders";
import { useOrderItems } from "../../hooks/useOrderItems";
import { useParams } from "react-router-dom";
import { IOrder } from "../../models/IOrder";
import { IOrderItem } from "../../models/IOrderItem";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SingleOrder = () => {
  const { id } = useParams<{ id: string }>();

  const { getSingleOrder, deleteOrder } = useOrders();
  const { deleteOrderItem, updateQuantityInOrderItem } = useOrderItems();

  const [orderDetails, setOrderDetails] = useState<IOrder | null>(null);

  const fetchOrder = async () => {
    const order = await getSingleOrder(Number(id));
    setOrderDetails(order);
  };

  const nav = useNavigate();

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div>
      <h1 className='text-4xl font-bold'>Order details</h1>
      {orderDetails ? (
        <>
          <h2 className='text-2xl font-semibold p-4 flex items-center justify-center relative'>
            Order ID: {orderDetails.id}{" "}
            <button
              className='text-xs bg-red-500 text-white p-2 rounded absolute top-0 right-0 cursor-pointer'
              onClick={() => {
                if (orderDetails.id) {
                  deleteOrder(orderDetails.id);
                  nav("/admin/orders");
                }
              }}
            >
              Delete order
            </button>
          </h2>
          <div className='mt-4 flex gap-4 justify-center flex-wrap'>
            <div className='flex flex-col justify-center border border-gray-400 rounded shadow-xl p-4 gap-2 '>
              <h3 className='text-2xl font-semibold'>Customer details:</h3>
              <p className='font-semibold'>
                Customer: {orderDetails.customer_firstname} {orderDetails.customer_lastname}
              </p>
              <p className=''>Email: {orderDetails.customer_email}</p>
              <p className=''>Phone: {orderDetails.customer_phone}</p>
              <p className=''>Address: {orderDetails.customer_street_address}</p>
              <p className=''>City: {orderDetails.customer_city}</p>
              <p className=''>Postal Code: {orderDetails.customer_postal_code}</p>
              <p className=''>Country: {orderDetails.customer_country}</p>
            </div>
            <div className='flex flex-col justify-center border border-gray-400 rounded shadow-xl p-4 gap-2 '>
              <h2 className='text-2xl font-semibold'>OrderDetails</h2>
              <p className=''>Order status: {orderDetails.order_status}</p>
              <p className=''>Payment Status: {orderDetails.payment_status}</p>
              <p className=''>Payment Id: {orderDetails.payment_id}</p>
              <p className=''>Created at: {new Date(orderDetails.created_at).toDateString()}</p>
              <p className='font-bold'>Total Amount: ${orderDetails.total_price}</p>
            </div>
            <div className='flex flex-col justify-center border border-gray-400 rounded shadow-xl p-4 gap-2 basis-full '>
              <h3 className='text-xl font-semibold mt-4'>Items:</h3>
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>

                {orderDetails.order_items.map((item: IOrderItem) => (
                  <tr>
                    <td className='border border-gray-300 px-4 py-2'>{item.id}</td>
                    <td className='border border-gray-300 px-4 py-2'>{item.product_name}</td>
                    <td className='border border-gray-300 px-4 py-2'>
                      <input
                        onChange={(e) => {
                          if (item.id) {
                            updateQuantityInOrderItem(item.id, Number(e.target.value));
                            fetchOrder();
                          }
                        }}
                        type='number'
                        className='text-center border border-gray-300 rounded'
                        defaultValue={item.quantity}
                      />
                    </td>
                    <td className='border border-gray-300 px-4 py-2'>${item.unit_price}</td>
                    <td className='border border-gray-300 px-4 py-2'>${item.unit_price * item.quantity}</td>
                    <td className='border border-gray-300 py-2'>
                      <button
                        onClick={() => item.id !== null && deleteOrderItem(item.id)}
                        className='text-xs font-semibold bg-red-500 text-white  rounded p-2 cursor-pointer'
                      >
                        Delete order item
                      </button>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </>
      ) : (
        <p>Loading order details...</p>
      )}
    </div>
  );
};
