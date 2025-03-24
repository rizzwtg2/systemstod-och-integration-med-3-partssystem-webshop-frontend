import { useState } from "react";
import { AllCustomers } from "../components/customers/AllCustomers";
import { AddCustomerForm } from "../components/customers/AddCustomerForm";

export const CustomerPage = () => {
  const [isShowNewCustomerForm, setIsShowNewCustomerForm] = useState(false);

  return (
    <div>
      <h1 className='text-4xl font-bold p-4'>Customers</h1>
      <div className='flex flex-1 justify-end p-4'>
        <button
          className='border p-2 bg-blue-200 w-40'
          onClick={() => setIsShowNewCustomerForm(!isShowNewCustomerForm)}
        >
          {isShowNewCustomerForm ? "Cancel" : "Add Customer"}
        </button>
      </div>
      {isShowNewCustomerForm && <AddCustomerForm />}
      <AllCustomers />
    </div>
  );
};
