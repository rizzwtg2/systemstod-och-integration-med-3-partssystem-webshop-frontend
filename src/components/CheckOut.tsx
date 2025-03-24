import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { useCallback, useContext, useState } from "react";
import CartContext from "../contexts/CartContext";
import { AddCustomerForm } from "./customers/AddCustomerForm";
import { ICustomer } from "../models/ICustomer";
import { useCustomers } from "../hooks/useCustomers";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51R4JT2RXSDKQ47jC11SyRb0PAwucebZKccNjhXGdkLzC3Bl3saL2pW18sN3jqULIF3pGfLFBLiEhgcarcqsvircS005tdmAQ2f"
);

export const Checkout = () => {
  const { cart } = useContext(CartContext);
  const { getCustomerByEmail } = useCustomers();
  const [isValidated, setIsValidated] = useState(false);
  const [customer, setCustomer] = useState<ICustomer>();

  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch("http://localhost:3000/stripe/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart }),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = { fetchClientSecret };

  return (
    <div className='space-y-4 p-4'>
      <h2 className='text-4xl text-center font-bold'>Checkout</h2>
      <p>
        If you have an accout you can fetch your information by entering your email address. If you don't have an
        account, please fill in the form below.
        {customer?.firstname}
      </p>
      <input
        type='email'
        placeholder='example@mail.com'
        className='ring p-2 rounded'
        onChange={(e) => {
          getCustomerByEmail(e.target.value).then((res) => {
            if (res) {
              setCustomer(res);
              setIsValidated(true);
            } else {
              setIsValidated(false);
            }
          });
        }}
      />
      <AddCustomerForm customer={customer} setIsValidated={setIsValidated} />

      {isValidated && (
        <div id='checkout'>
          <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      )}
    </div>
  );
};
