import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { useCallback } from "react";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51R4JT2RXSDKQ47jC11SyRb0PAwucebZKccNjhXGdkLzC3Bl3saL2pW18sN3jqULIF3pGfLFBLiEhgcarcqsvircS005tdmAQ2f"
);
//Ta in payload från cartsidan via navigation state
const useCheckoutPayload = () => {
  const location = useLocation();
  return location.state?.payload;
};

export const Checkout = () => {
  const payload = useCheckoutPayload();
  const fetchClientSecret = useCallback(() => {
    return fetch("http://localhost:3000/stripe/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payload }),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = { fetchClientSecret };
  return (
    <div className='space-y-4 p-4'>
      <div id='checkout'>
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
};
