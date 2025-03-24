import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { CartProvider } from "./contexts/CartContext";

function App() {
  return (
    <>
      <CartProvider>
        <RouterProvider router={router}>
          <div className='container mx-auto flex flex-col items-center gap-4'>
            <h1 className='text-4xl font-bold'>FSU24D E-commerce</h1>

            <h2 className='text-2xl font-bold'>Products</h2>
          </div>
        </RouterProvider>
      </CartProvider>
    </>
  );
}

export default App;
