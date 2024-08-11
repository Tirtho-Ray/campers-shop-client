
const UpdateProduct = () => {
   
  return (
    <div className=" flex items-center justify-center bg-gray-100 p-3">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96 md:w-[500px] lg:w-[800px] mt-4 mb-5 ">
        <h1 className="text-2xl font-bold mb-6 text-center">Add Product</h1>
        <form className="space-y-4">
         <div className="grid md:grid-cols-2 gap-4">
         <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="name" name="name" className="mt-1 h-10 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
          <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700"> Price</label>
            <input type="text"   className="mt-1 h-10 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
         </div>
          <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-700">Stock Quantity</label>
            <input type="text" id="stockQuantity" name="stockQuantity" className="mt-1  h-10 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <input type="text" id="category" name="category" className="mt-1 block w-full  h-10 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
         
          </div>
          {/*  */}
          <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ratings" className="block text-sm font-medium text-gray-700">Ratings</label>
            <input type="number" id="ratings" name="ratings" className="mt-1 block w-full  h-10 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
         
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
            <input type="text" id="image" name="image" className="mt-1 block w-full  h-10 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
          </div>
          {/*  */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" name="description"  className="mt-1 block w-full  h-20 p-4 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"></textarea>
          </div>
          <div className="flex justify-end">
            <button  type="submit"   className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
