import { FormEvent, useState } from "react";
import { useCreateProductMutation } from "../../readux/Api/Api";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const [createProduct, { isLoading, isError, isSuccess }] =
    useCreateProductMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const productData = {
      name,
      price: Number(price),
      stock: Number(stockQuantity),
      category,
      rating: Number(ratings),
      image,
      description,
      quantity: 1,
    };
    try {
      await createProduct(productData).unwrap();
      console.log("Product created successfully");
    } catch (error) {
      console.error("Failed to create product", error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 mt-16 p-3 md:mt-20">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96 md:w-[500px] lg:w-[800px] mt-4 mb-5">
        <h1 className="text-2xl font-bold mb-6 text-center">Add Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-md font-medium text-gray-700 "
              >
                Name
              </label>
              <input
                type="text"
                value={name}
                required
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                className="p-2 text-[15px] mt-1 h-10 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-md font-medium text-gray-700 "
              >
                Price
              </label>
              <input
                type="text"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 p-2 h-10 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="stockQuantity"
                className="block text-md font-medium text-gray-700"
              >
                Stock Quantity
              </label>
              <input
                type="text"
                required
                placeholder="Stock Quantity"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                className="mt-1 p-2 h-10 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-md font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                
                value={category} // Ensure the value is bound to the state
                onChange={(e) => setCategory(e.target.value)} // Update state on change
                className="mt-1 p-2 block w-full h-10 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              >
                <option value="">Select a category</option>
                <option value="tents-shelters">Tents & Shelters</option>
                <option value="camping-gear-equipment">Camping Gear & Equipment</option>
                <option value="apparel-footwear">Apparel & Footwear</option>
                <option value="camping-furniture-accessories">Camping Furniture</option>
                <option value="survival-safety-gear">Survival & Safety</option>
              </select>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="ratings"
                className="block text-md font-medium text-gray-700"
              >
                Ratings
              </label>
              <input
                type="text"
                value={ratings}
                placeholder="Rating"
                required
                onChange={(e) => setRatings(e.target.value)}
                className="mt-1 p-2 p-2 h-10 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-md font-medium text-gray-700"
              >
                Image URL
              </label>
              <input
                type="text"
                value={image}
                required
                placeholder="Image URL"
                onChange={(e) => setImage(e.target.value)}
                className="mt-1 p-2 h-10 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-md font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              value={description}
              required
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 block w-full h-20 p-4 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              {isLoading ? "Adding..." : "Add Product"}
            </button>
          </div>
          {isError && (
            <div className="text-red-500 mt-2">
              Failed to add product. Please try again.
            </div>
          )}
          {isSuccess && (
            <div className="text-green-500 mt-2">
              Product added successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
