import { IOrder, OrderStatus } from "../../models/IOrder";
import { useOrders } from "../../hooks/useOrders";
import { useNavigate } from "react-router-dom";

export const AllOrders = () => {
  const { orders, deleteOrder, updateOrder } = useOrders();
  const orderStatus = Object.values(OrderStatus);
  const nav = useNavigate();

  const handleStatusUpdate = (id: number, status: OrderStatus) => {
    const orderToUpdate = orders.find((order) => order.id === id);
    if (orderToUpdate) {
      orderToUpdate.order_status = status;
      updateOrder(orderToUpdate);
    }
  };

  return (
    <div>
      <h1 className='text-2xl font-bold p-4'>AllOrders</h1>
      <table className='w-full'>
        <tbody>
          <tr>
            <th className='p-4'>Order ID</th>
            <th className='p-4'>Customer ID</th>
            <th className='p-4'>Total price</th>
            <th className='p-4'>Order status</th>
            <th className='p-4'></th>
          </tr>
          {orders.map((order: IOrder) => (
            <tr
              key={order.id}
              onClick={() => {
                nav(`${order.id}`);
              }}
              className='p-4 m-4 border border-gray-200 rounded-md cursor-pointer'
            >
              <td className='border border-gray-300 px-4 py-2'>{order.id}</td>
              <td className='border border-gray-300 px-4 py-2'>{order.customer_id}</td>
              <td className='border border-gray-300 px-4 py-2'>{order.total_price}</td>
              <td className='border border-gray-300 px-4 py-2' onClick={(e) => e.stopPropagation()}>
                <select
                  name='order_status'
                  value={order.order_status}
                  onChange={(e) => order.id !== null && handleStatusUpdate(order.id, e.target.value as OrderStatus)}
                >
                  {orderStatus.map((orderStatus) => (
                    <option key={orderStatus} defaultValue={orderStatus}>
                      {orderStatus}
                    </option>
                  ))}
                </select>
              </td>
              <td
                onClick={(e) => {
                  e.stopPropagation();
                  if (order.id !== null) {
                    deleteOrder(order.id);
                  }
                }}
                className='border border-gray-300 px-4 py-2 bg-red-400 text-white cursor-pointer'
              >
                Delete
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
