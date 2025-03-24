import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <div>
      <header className='p-4'>
        <nav className='flex justify-between font-bold w-full'>
          <div className='flex-1 flex px-4'>
            <NavLink to='/' className='mr-auto'>
              Home
            </NavLink>
          </div>
          <div className='flex space-x-4'>
            <NavLink to='products'>Products</NavLink>
            <NavLink to='customers'>Customers</NavLink>
            <NavLink to='orders'>Orders</NavLink>
          </div>
        </nav>
      </header>
      <main className='p-4 prose'>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};
