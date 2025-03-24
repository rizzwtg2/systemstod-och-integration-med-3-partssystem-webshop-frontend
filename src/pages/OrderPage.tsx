import { AllOrders } from "../components/orders/AllOrders";

export const OrderPage = () => {
  return (
    <div>
      <h1 className='text-4xl font-bold p-4'>Orders</h1>
      <AllOrders />
    </div>
  );
};
