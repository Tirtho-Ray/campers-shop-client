import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSingleProductQuery, useUpdateProductMutation } from '../../readux/Api/Api'; // Adjust path as necessary
import Swal from 'sweetalert2';

const UpdateProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading: isLoadingProduct } = useSingleProductQuery(id!);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [formValues, setFormValues] = useState({
    name: '',
    price: '',
    stock: '',
    description: '',
    category: '',
    rating: '',
    image: '',
  });

  useEffect(() => {
    if (product) {
      setFormValues({
        name: product.name || '',
        price: product.price.toString() || '',
        stock: product.stock.toString() || '',
        description: product.description || '',
        category: product.category || '',
        rating: product.rating.toString() || '',
        image: product.image || '',
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert string values to numbers
    const updatedProduct = {
        ...formValues,
        price: parseFloat(formValues.price),
        stock: parseInt(formValues.stock),
        rating: parseFloat(formValues.rating),
    };

    try {
        await updateProduct({ _id: id!, updatedProduct }).unwrap();
        Swal.fire('Success', 'Product updated successfully!', 'success');
        navigate('/dashboard');
    } catch (error) {
        Swal.fire('Error', 'There was an error updating the product.', 'error');
    }
};

  if (isLoadingProduct) return <div>Loading...</div>;

  return (
    <div className="flex items-center justify-center bg-gray-100 p-3 mt-16">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96 md:w-[500px] lg:w-[800px] mt-4 mb-5">
        <h1 className="text-2xl font-bold mb-6 text-center">Update Product</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                className="mt-1 h-10 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-bold text-gray-700">Price</label>
              <input
                type="text"
                id="price"
                name="price"
                value={formValues.price}
                onChange={handleChange}
                className="mt-1 h-10 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="stock" className="block text-sm font-bold text-gray-700">Stock Quantity</label>
              <input
                type="text"
                id="stock"
                name="stock"
                value={formValues.stock}
                onChange={handleChange}
                className="mt-1 h-10 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-bold text-gray-700">Category</label>
              <select
                id="category"
                name="category"
                value={formValues.category}
                onChange={handleChange}
                className="mt-1 block w-full h-10 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              >
                <option value="">Select a category</option>
                <option value="tents-shelters">Tents & Shelters</option>
                <option value="camping-gear-equipment">Camping Gear & Equipment</option>
                <option value="apparel-footwear">Apparel & Footwear</option>
                <option value="camping-furniture-accessories">Camping Furniture & Accessories</option>
                <option value="survival-safety-gear">Survival & Safety Gear</option>
              </select>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="rating" className="block text-sm font-bold text-gray-700">Rating</label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={formValues.rating}
                onChange={handleChange}
                className="mt-1 block w-full h-10 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-bold text-gray-700">Image URL</label>
              <input
                type="text"
                id="image"
                name="image"
                value={formValues.image}
                onChange={handleChange}
                className="mt-1 block w-full h-10 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-bold text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={formValues.description}
              onChange={handleChange}
              className="mt-1 block w-full h-20 p-4 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isUpdating}
              className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isUpdating ? 'Updating...' : 'Update Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
