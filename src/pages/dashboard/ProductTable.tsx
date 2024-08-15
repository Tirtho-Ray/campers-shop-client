import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDeleteProductMutation, TProduct, useAllProductQuery } from '../../readux/Api/Api'; // Adjust path as necessary

const ProductTable: React.FC = () => {
  const { data: products, error, isLoading, refetch } = useAllProductQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleDelete = async (id: string) => {
    event.preventDefault();
    console.log(id);
    setLoadingDelete(true);

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        const response = await deleteProduct(id);
        if (response.data && response.data.success) {
          Swal.fire('Deleted!', 'The product has been deleted.', 'success');
          await refetch();
        } else {
          Swal.fire('Error!', 'Failed to delete the product.', 'error');
        }
      } catch (err) {
        Swal.fire('Error!', 'There was an error deleting the product.', 'error');
      }
    }

    setLoadingDelete(false);
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    return <div>Error: {(error as any).message}</div>;
  }

  console.log(products);

  const productsList: TProduct[] = products?.data || [];

  if (productsList.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <div className='p-3 '>
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-150"
        >
          <NavLink to="/addProduct">Add product</NavLink>
        </button>
      </div>

      <div className="mt-6 p-2 border border-yellow-500 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">#</th>
              <th scope="col" className="px-6 py-3 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th scope="col" className="px-6 py-3 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th scope="col" className="px-6 py-3 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th scope="col" className="px-6 py-3 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {productsList.map((product, index) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 md:text-xs sm:text-base">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-10 w-10 rounded-full sm:h-10 sm:w-10"
                    style={{ width: '2rem', height: '2rem' }} // Smaller image for mobile
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[8px] sm:text-base text-gray-900">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-[8px] sm:text-base text-gray-900">${product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-[8px] sm:text-base text-gray-900">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-[8px] sm:text-base font-medium">
                  <NavLink
                    to={`/updateProduct/${product._id}`}
                    className="text-indigo-600 hover:text-indigo-900 mr-4 border p-2"
                  >
                    update
                  </NavLink>
                  <button
                    onClick={() => handleDelete(product._id)}
                    disabled={loadingDelete}
                    className={`text-red-600 hover:text-red-900 border p-2  ${loadingDelete ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
