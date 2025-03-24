import { useState } from "react";
import { IProduct } from "../../models/IProduct";

interface IProductFormProps {
  product?: IProduct;
  submitTo: (product: IProduct) => void;
}

export const ProductForm = (props: IProductFormProps) => {
  const handleSubmit = (product: IProduct) => {
    props.submitTo(product);
  };

  const [product, setProduct] = useState<IProduct>((props.product as IProduct) || ({} as IProduct));

  return (
    <form
      className='grid grid-cols-2 gap-2 w-1/2 mx-auto items-center'
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(product as IProduct);
        setProduct({} as IProduct);
      }}
    >
      <label htmlFor='name'>Name:</label>
      <input
        className='ring-1 ring-gray-300 p-2 rounded'
        type='text'
        value={product?.name}
        placeholder='Name'
        name='name'
        onChange={(e) => setProduct({ ...product, name: e.target.value } as IProduct)}
      />
      <label htmlFor='description'>Description:</label>
      <input
        className='ring-1 ring-gray-300 p-2 rounded'
        type='text'
        value={product?.description}
        name='description'
        placeholder='Description'
        onChange={(e) => setProduct({ ...product, description: e.target.value } as IProduct)}
      />
      <label htmlFor='category'>Category:</label>
      <input
        className='ring-1 ring-gray-300 p-2 rounded'
        type='text'
        value={product?.category}
        name='category'
        placeholder='Category'
        onChange={(e) => setProduct({ ...product, category: e.target.value } as IProduct)}
      />
      <label htmlFor='price'>Price:</label>
      <input
        className='ring-1 ring-gray-300 p-2 rounded'
        type='number'
        value={product?.price}
        name='price'
        placeholder='Price'
        onChange={(e) => setProduct({ ...product, price: Number(e.target.value) } as IProduct)}
      />
      <label htmlFor='stock'>Stock:</label>
      <input
        className='ring-1 ring-gray-300 p-2 rounded'
        type='number'
        value={product?.stock}
        name='stock'
        placeholder='Stock'
        onChange={(e) => setProduct({ ...product, stock: Number(e.target.value) } as IProduct)}
      />
      <label htmlFor='image'>Image Url:</label>
      <input
        className='ring-1 ring-gray-300 p-2 rounded'
        type='url'
        value={product?.image}
        name='image'
        placeholder='Image Url'
        onChange={(e) => setProduct({ ...product, image: e.target.value } as IProduct)}
      />
      <div className='col-span-2 py-2'>
        <button className='ring px-4 py-2 rounded bg-emerald-300' type='submit'>
          Save
        </button>
      </div>
    </form>
  );
};
