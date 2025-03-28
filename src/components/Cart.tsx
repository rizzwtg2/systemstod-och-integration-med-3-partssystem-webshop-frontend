import React, { useContext, useEffect, useState } from "react";
import CartContext from "../contexts/CartContext";
import { CartActionType } from "../reducers/CartReducer";
import { CartItem } from "../models/CartItem";
import { useNavigate } from "react-router-dom";
import { useCustomers } from "../hooks/useCustomers";
import { ICustomer } from "../models/ICustomer";
import check from "../assets/check.png";
import { AddCustomerForm } from "./customers/AddCustomerForm";
import { IOrderCreate, IOrderResponse, OrderStatus, PaymentStatus } from "../models/IOrder";
import { IOrderItem } from "../models/IOrderItem";
import { useOrders } from "../hooks/useOrders";

export const Cart = () => {
  const { cart, dispatch } = useContext(CartContext);
  const { createNewCustomer, getCustomerByEmail } = useCustomers();
  const mostRecentCustomerEmail: string = localStorage.getItem("mostRecentCustomerEmail") || "";

  const { createNewOrder } = useOrders();

  const nav = useNavigate();

  const [customer, setCustomer] = useState<ICustomer>();
  const [isValidated, setIsValidated] = useState(false);

  const handleQuantityChange = (cartItem: CartItem, newQuantity: number) => {
    dispatch({ type: CartActionType.CHANGE_QUANTITY, payload: { ...cartItem, quantity: newQuantity } });
  };

  const isAlreadyCustomer = async (email: string) => {
    try {
      const customer = await getCustomerByEmail(email);
      if (customer !== undefined) {
        setCustomer(customer as ICustomer);
        localStorage.setItem("mostRecentCustomerEmail", email);
        setIsValidated(true);
      } else {
        setCustomer(undefined);
        setIsValidated(false);
      }
    } catch (error) {
      console.error("Error fetching customer by email:", error);
    }
  };

  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("mostRecentCustomerEmail");
    if (storedEmail) {
      isAlreadyCustomer(storedEmail);
    }
  }, []);

  const handleOrder = async (customerId: number) => {
    const order: IOrderCreate = {
      customer_id: customerId,
      payment_id: "",
      order_status: OrderStatus.Pending,
      payment_status: PaymentStatus.Unpaid,
      order_items: cart.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
        product_name: item.product.name,
        unit_price: item.product.price,
      })) as IOrderItem[],
    };
    return order;
  };

  interface ILineItem {
    price_data: {
      currency: string;
      product_data: {
        name: string;
        images?: string[];
        description: string;
      };
      unit_amount: number;
    };
    quantity: number;
  }

  const line_items: ILineItem[] = cart.map((item) => ({
    price_data: {
      currency: "sek",
      product_data: {
        name: item.product.name,
        images: [item.product.image],
        description: item.product.description,
      },
      unit_amount: item.product.price * 100,
    },
    quantity: item.quantity,
  }));

  const customerHandler = async () => {
    if (customer === undefined) {
      const newCustomer: ICustomer = JSON.parse(localStorage.getItem("newCustomer") || "{}");

      const isCustomerValid =
        newCustomer &&
        Object.values(newCustomer).every((value) => value !== undefined && value !== null && value !== "");

      if (!isCustomerValid) {
        alert("Please fill in all the required fields for the customer.");
        return;
      }
      const response = await createNewCustomer(newCustomer);

      if (response !== undefined) {
        const { id } = response;
        if (id) setCustomer(newCustomer);
      }
    } else {
      console.error("Failed to create a new customer.");
      return;
    }
  };

  const handleSubmit = async () => {
    customerHandler();
    if (customer === undefined) {
      console.error("Customer is undefined.");
      return;
    }

    const order = await handleOrder(Number(customer.id));
    const orderResponse: IOrderResponse = await createNewOrder(order);
    if (orderResponse.id === undefined) {
      console.error("Failed to create order:", orderResponse.message);
      return;
    }

    const metadata = cart.map((item) => ({
      product_id: item.product.id,
      quantity: item.quantity,
    }));

    const payload = {
      line_items: line_items,
      order_id: orderResponse.id,
      metadata: metadata,
    };

    // Navigera till checkout om allting gick bra
    nav("/checkout", { state: { payload } });
  };

  const handleDelete = (cartItem: CartItem) => {
    dispatch({ type: CartActionType.REMOVE_ITEM, payload: { ...cartItem } });
  };

  return (
    <>
      <div className='space-y-10'>
        <h1 className='text-4xl font-bold p-4'>Shopping Cart</h1>
        {cart.length === 0 && <div className='text-center text-2xl font-bold'>Your cart is empty</div>}

        {cart.length > 0 && (
          <>
            <p className='flex flex-col gap-4 items-center'>
              <span className='flex items-center'>
                If you have an accout you can fetch your information by entering your email address here.
                <input
                  type='email'
                  placeholder='example@mail.com'
                  className='ring p-2 rounded mx-2'
                  defaultValue={mostRecentCustomerEmail}
                  onBlur={(e) => {
                    localStorage.setItem("mostRecentCustomerEmail", e.currentTarget.value);
                    isAlreadyCustomer(e.currentTarget.value);
                  }}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      localStorage.setItem("mostRecentCustomerEmail", e.currentTarget.value);
                      isAlreadyCustomer(e.currentTarget.value);
                    }
                  }}
                />
                {isValidated && <img src={check} alt='check' className='size-10' />}
              </span>
              {customer && (
                <span className='text-lg font-semibold'>
                  Welcome back {customer.firstname} {customer.lastname}
                </span>
              )}
            </p>
            <p className=''>If you don't have an account, click the button below an enter your information.</p>
            <button onClick={() => setIsFormOpen(!isFormOpen)} className='ring p-2 rounded bg-blue-300'>
              {isFormOpen ? "Close form" : "Open form"}
            </button>
            {isFormOpen && <AddCustomerForm />}{" "}
            <div className='flex-row-reverse items-center flex py-4 gap-x-6 '>
              <div className='gap-4 flex flex-col items-center justify-center'>
                <span className='whitespace-nowrap font-bold text-2xl'>
                  Total: {cart.reduce((total, item) => total + item.product.price * item.quantity, 0)} kr
                </span>

                <button
                  onClick={handleSubmit}
                  className='ring hover:ring-2 p-4 rounded-2xl font-bold bg-emerald-400 cursor-pointer'
                >
                  Checkout
                </button>
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
                    <span className='text-lg font-semibold border-b-1 flex justify-between'>
                      {item.product.price * item.quantity} kr
                      <button
                        onClick={() => handleDelete(item)}
                        className='text-red-400 cursor-pointer hover:font-bold'
                      >
                        Delete item
                      </button>
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
