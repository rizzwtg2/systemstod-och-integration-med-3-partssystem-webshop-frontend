import { useContext } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import CartContext from "../contexts/CartContext";

export const Layout = () => {
  const { cart } = useContext(CartContext);
  const nav = useNavigate();
  const location = useLocation();
  const isInCheckout = location.pathname.includes("/checkout");
  const isInCart = location.pathname.includes("/cart");
  return (
    <div className='flex flex-col h-screen'>
      <header className='p-4'>
        <nav className='flex font-bold w-full justify-end space-x-4'>
          <NavLink to='/products'>Shop</NavLink>
          <NavLink to='/about'>About/Contact</NavLink>
          <NavLink to='/admin'>Admin</NavLink>
        </nav>
      </header>
      <main className='p-4 relative flex flex-col flex-1'>
        <Outlet />
        {!isInCheckout && !isInCart && cart.length > 0 && (
          <button
            onClick={() => nav("/cart")}
            className='absolute top-10 right-4 font-bold ring p-4 rounded-2xl flex gap-2 hover:ring-2'
          >
            Cart{" "}
            <svg width='24px' height='24px' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <circle cx='16.5' cy='18.5' r='1.5' />
              <circle cx='9.5' cy='18.5' r='1.5' />
              <path d='M18 16H8a1 1 0 0 1-.958-.713L4.256 6H3a1 1 0 0 1 0-2h2a1 1 0 0 1 .958.713L6.344 6H21a1 1 0 0 1 .937 1.352l-3 8A1 1 0 0 1 18 16zm-9.256-2h8.563l2.25-6H6.944z' />
            </svg>{" "}
            <span className='absolute top-0.5 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center'>
              {cart.length}
            </span>
          </button>
        )}
      </main>
    </div>
  );
};
