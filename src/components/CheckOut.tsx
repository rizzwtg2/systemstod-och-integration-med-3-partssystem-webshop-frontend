import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { useCallback, useContext } from "react";
import CartContext from "../contexts/CartContext";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51R4JT2RXSDKQ47jC11SyRb0PAwucebZKccNjhXGdkLzC3Bl3saL2pW18sN3jqULIF3pGfLFBLiEhgcarcqsvircS005tdmAQ2f"
);

export const Checkout = () => {
  const { cart } = useContext(CartContext);

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
    <div id='checkout'>
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};
