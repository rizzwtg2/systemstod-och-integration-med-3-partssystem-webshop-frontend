import { ChangeEvent, useState } from "react";
import { ICustomer } from "../../models/ICustomer";
import { useCustomers } from "../../hooks/useCustomers";

export const AllCustomers = () => {
  const { customers, updateCustomer, deleteCustomer } = useCustomers();
  const [editingCustomerId, setEditingCustomerId] = useState<number | null>(null);
  const [editedCustomer, setEditedCustomer] = useState<ICustomer | null>(null);

  const handleEditClick = (customer: ICustomer) => {
    setEditingCustomerId(customer.id);
    setEditedCustomer(customer);
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (editedCustomer) {
      setEditedCustomer({
        ...editedCustomer,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSaveClick = () => {
    // Save the edited customer details
    if (editedCustomer) {
      updateCustomer(editedCustomer);
    }

    setEditingCustomerId(null);
    setEditedCustomer(null);
  };

  return (
    <div className='p-4 flex flex-col '>
      <table className='border border-gray-400 max-w-full'>
        <thead>
          <tr>
            <th className='border border-gray-300 px-4 py-2'>Customer Id</th>
            <th className='border border-gray-300 px-4 py-2'>First Name</th>
            <th className='border border-gray-300 px-4 py-2'>Last Name</th>
            <th className='border border-gray-300 px-4 py-2'>Email</th>
            <th className='border border-gray-300 px-4 py-2'>Phone</th>
            <th className='border border-gray-300 px-4 py-2'>Address</th>
            <th className='border border-gray-300 px-4 py-2'>City</th>
            <th className='border border-gray-300 px-4 py-2'>Zip code</th>
            <th className='border border-gray-300 px-4 py-2'>Country</th>
            <th className='border border-gray-300 px-4 py-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer: ICustomer) => (
            <tr key={customer.id}>
              {editingCustomerId === customer.id ? (
                <>
                  <td className='border border-gray-300 px-4 py-2'>{customer.id}</td>
                  <td className='border border-gray-300 px-4 py-2'>
                    <input
                      className='border border-gray-300 px-2 py-1 w-full'
                      type='text'
                      name='firstname'
                      value={editedCustomer?.firstname || ""}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>
                    <input
                      className='border border-gray-300 px-2 py-1 w-full'
                      type='text'
                      name='lastname'
                      value={editedCustomer?.lastname || ""}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>
                    <input
                      className='border border-gray-300 px-2 py-1 w-full'
                      type='text'
                      name='email'
                      value={editedCustomer?.email || ""}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>
                    <textarea
                      className='border border-gray-300 px-2 py-1 w-full'
                      name='phone'
                      value={editedCustomer?.phone || ""}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>
                    <textarea
                      className='border border-gray-300 px-2 py-1 w-full'
                      name='address'
                      value={editedCustomer?.street_address || ""}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>
                    <input
                      className='border border-gray-300 px-2 py-1 w-full'
                      type='text'
                      name='city'
                      value={editedCustomer?.city || ""}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>
                    <input
                      className='border border-gray-300 px-2 py-1 w-full'
                      type='text'
                      name='city'
                      value={editedCustomer?.postal_code || ""}
                      onChange={handleInputChange}
                    />
                  </td>

                  <td className='border border-gray-300 px-4 py-2'>
                    <textarea
                      className='border border-gray-300 px-2 py-1 w-full'
                      name='country'
                      value={editedCustomer?.country || ""}
                      onChange={handleInputChange}
                    />
                  </td>

                  <td className='border border-gray-300 px-4 py-2'>
                    <div className='flex flex-col items-center'>
                      <button
                        className='mb-2 cursor-pointer px-4 py-2 bg-blue-500 text-white'
                        onClick={handleSaveClick}
                      >
                        Save
                      </button>
                      <button
                        className='mb-2 cursor-pointer px-4 py-2 bg-red-500 text-white'
                        onClick={() => deleteCustomer(editingCustomerId as number)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td className='border border-gray-300 px-4 py-2'>{customer.id}</td>
                  <td className='border border-gray-300 px-4 py-2'>{customer.firstname}</td>
                  <td className='border border-gray-300 px-4 py-2'>{customer.lastname}</td>
                  <td className='border border-gray-300 px-4 py-2'>{customer.email}</td>
                  <td className='border border-gray-300 px-4 py-2'>{customer.phone}</td>
                  <td className='border border-gray-300 px-4 py-2'>{customer.street_address}</td>
                  <td className='border border-gray-300 px-4 py-2'>{customer.city}</td>
                  <td className='border border-gray-300 px-4 py-2'>{customer.postal_code}</td>
                  <td className='border border-gray-300 px-4 py-2'>{customer.country}</td>
                  <td className='border border-gray-300 px-4 py-2'>
                    <button onClick={() => handleEditClick(customer)}>Edit</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
