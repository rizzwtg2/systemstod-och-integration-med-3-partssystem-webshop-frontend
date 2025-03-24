import { ICustomer } from "../../models/ICustomer";
import { useCustomers } from "../../hooks/useCustomers";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface IAddCustomerFormProps {
  customer?: ICustomer;
  setIsValidated?: (isValidated: boolean) => void;
}

export const AddCustomerForm = ({ customer, setIsValidated }: IAddCustomerFormProps) => {
  const isInCheckout = location.pathname.includes("/checkout");
  const { createNewCustomer, getCustomerByEmail } = useCustomers();
  const [newCustomer, setNewCustomer] = useState<ICustomer>();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newCustomer) {
      createNewCustomer(newCustomer);
    }
  };
  useEffect(() => {
    validateForm();
  }, [newCustomer]);

  const validateForm = async () => {
    if (newCustomer) {
      const requiredFields = [
        "firstname",
        "lastname",
        "email",
        "password",
        "phone",
        "street_address",
        "postal_code",
        "city",
        "country",
      ];

      const existingCustomer = await getCustomerByEmail(newCustomer.email);
      if (existingCustomer) {
        alert("Email is already in use");
        if (setIsValidated) setIsValidated(false);
        return;
      }
      const isValid = requiredFields.every(
        (field) => newCustomer[field as keyof ICustomer] !== undefined && newCustomer[field as keyof ICustomer] !== ""
      );

      if (isValid) {
        if (setIsValidated) setIsValidated(true);
      } else {
        if (setIsValidated) setIsValidated(false);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCustomer({
      ...(newCustomer as ICustomer),
      [e.target.name]: e.target.value,
    });
    localStorage.setItem(
      "formdata",
      JSON.stringify({
        ...(newCustomer as ICustomer),
        [e.target.name]: e.target.value,
      })
    );
  };

  return (
    <form onSubmit={handleSubmit} className='p-4 space-y-4 space-x-2'>
      <input
        onBlur={handleChange}
        type='text'
        name='firstname'
        className='w-28 border border-gray-300 px-4 py-2 rounded'
        placeholder={customer?.firstname || "First name"}
      />
      <input
        onBlur={handleChange}
        type='text'
        name='lastname'
        className='w-28 border border-gray-300 px-4 py-2 rounded'
        placeholder={customer?.lastname || "Last name"}
      />
      <input
        onBlur={handleChange}
        type='email'
        name='email'
        className='w-28 border border-gray-300 px-4 py-2 rounded'
        placeholder={customer?.email || "Email"}
      />
      <input
        onBlur={handleChange}
        type='password'
        name='password'
        className='w-28 border border-gray-300 px-4 py-2 rounded'
        placeholder={customer?.password || "Password"}
      />
      <input
        onBlur={handleChange}
        type='text'
        name='phone'
        className='w-28 border border-gray-300 px-4 py-2 rounded'
        placeholder={customer?.phone || "Phone"}
      />
      <input
        onBlur={handleChange}
        type='text'
        name='street_address'
        className='w-28 border border-gray-300 px-4 py-2 rounded'
        placeholder={customer?.street_address || "Street address"}
      />
      <input
        onBlur={handleChange}
        type='text'
        name='postal_code'
        className='w-28 border border-gray-300 px-4 py-2 rounded'
        placeholder={customer?.postal_code || "Postal code"}
      />
      <input
        onBlur={handleChange}
        type='text'
        name='city'
        className='w-28 border border-gray-300 px-4 py-2 rounded'
        placeholder={customer?.city || "City"}
      />

      <input
        onBlur={handleChange}
        type='text'
        name='country'
        className='w-28 border border-gray-300 px-4 py-2 rounded'
        placeholder={customer?.country || "Country"}
      />
      {!isInCheckout && (
        <button type='submit' className='cursor-pointer  border p-2 bg-blue-200 rounded '>
          Submit
        </button>
      )}
    </form>
  );
};
