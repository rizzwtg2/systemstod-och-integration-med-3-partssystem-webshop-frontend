import { ICustomer } from "../../models/ICustomer";
import { useCustomers } from "../../hooks/useCustomers";
import { ChangeEvent, FormEvent, useState } from "react";

export const AddCustomerForm = () => {
  const { createNewCustomer } = useCustomers();
  const [newCustomer, setNewCustomer] = useState<ICustomer>();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newCustomer) {
      createNewCustomer(newCustomer);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCustomer({
      ...(newCustomer as ICustomer),
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className='p-4 flex '>
      <div>
        <input
          onChange={handleChange}
          type='text'
          name='firstname'
          className='w-28 border border-gray-300 px-4 py-2'
          placeholder='First name'
        />
        <input
          onChange={handleChange}
          type='text'
          name='lastname'
          className='w-28 border border-gray-300 px-4 py-2'
          placeholder='Last name'
        />
        <input
          onChange={handleChange}
          type='email'
          name='email'
          className='w-28 border border-gray-300 px-4 py-2'
          placeholder='Email'
        />
        <input
          onChange={handleChange}
          type='password'
          name='password'
          className='w-28 border border-gray-300 px-4 py-2'
          placeholder='Password'
        />
        <input
          onChange={handleChange}
          type='text'
          name='phone'
          className='w-28 border border-gray-300 px-4 py-2'
          placeholder='Phone'
        />
        <input
          onChange={handleChange}
          type='text'
          name='street_address'
          className='w-28 border border-gray-300 px-4 py-2'
          placeholder='Address'
        />
        <input
          onChange={handleChange}
          type='text'
          name='postal_code'
          className='w-28 border border-gray-300 px-4 py-2'
          placeholder='Address'
        />
        <input
          onChange={handleChange}
          type='text'
          name='city'
          className='w-28 border border-gray-300 px-4 py-2'
          placeholder='City'
        />

        <input
          onChange={handleChange}
          type='text'
          name='country'
          className='w-28 border border-gray-300 px-4 py-2'
          placeholder='Country'
        />
      </div>
      <div className='flex-1 justify-end'>
        <button type='submit' className='cursor-pointer  border p-2 bg-blue-200 '>
          Add Customer
        </button>
      </div>
    </form>
  );
};
