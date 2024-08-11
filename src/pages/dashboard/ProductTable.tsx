import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDeleteProductMutation, TProduct,  useAllProductQuery } from '../../readux/Api/Api'; // Adjust path as necessary

const ProductTable: React.FC = () => {
  const { data: products, error, isLoading, refetch } = useAllProductQuery(); // Ensure refetch is available
  const [deleteProduct] = useDeleteProductMutation();
  const [loadingDelete, setLoadingDelete] = useState(false); // State to manage delete operation loading state

  const handleDelete = async (id: string ) => {
    event.preventDefault();
    console.log(id);
    setLoadingDelete(true); // Set loading state while deleting

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
        const response = await deleteProduct(id); // Ensure deleteProduct returns a promise
        if (response.data && response.data.success) {
          Swal.fire('Deleted!', 'The product has been deleted.', 'success');
          await refetch(); // Refetch data after successful deletion
        } else {
          Swal.fire('Error!', 'Failed to delete the product.', 'error');
        }
      } catch (err) {
        Swal.fire('Error!', 'There was an error deleting the product.', 'error');
      }
    }

    setLoadingDelete(false); // Reset loading state after delete operation
  };

  // Handle loading state
  if (isLoading) return <div>Loading...</div>;

  // Handle specific error cases
  if (error) {
    return <div>Error: {(error as any).message}</div>;
  }

  // Log products for debugging
  console.log(products);

  // Ensure productsList is defined
  const productsList: TProduct[] = products?.data || [];

  if (productsList.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <div className='p-3'>
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-150"
        >
          <NavLink to="/addProduct">Add product</NavLink>
        </button>
      </div>

      <div className="mt-6 p-2 border border-yellow-500">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {productsList.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={product.image} alt={product.name} className="h-10 w-10 rounded-full" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <NavLink
                    to={`/updateProduct/${product._id}`}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    update
                  </NavLink>
                  <button
                    onClick={() => handleDelete(product._id)}
                    disabled={loadingDelete} // Disable delete button during delete operation
                    className={`text-red-600 hover:text-red-900 ${loadingDelete ? 'opacity-50 cursor-not-allowed' : ''}`}
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


ProductTable.tsx
