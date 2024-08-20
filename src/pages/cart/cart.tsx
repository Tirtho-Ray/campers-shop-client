import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { TProduct } from "../../readux/Api/Api";
import { getCart, saveCart } from "../../utils/cardUtils";
import { Link } from "react-router-dom";

const ShowCart = () => {
  const [cart, setCart] = useState<TProduct[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    const initialCart = getCart();
    setCart(initialCart);
    updateTotalAmount(initialCart);
  }, []);

  const updateTotalAmount = (cartItems: TProduct[]) => {
    const total = cartItems.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    setTotalAmount(total);
  };

  const handleQuantityChange = (productId: string, amount: number) => {
    const updatedCart = cart
      .map((product) => {
        if (product._id === productId) {
          const newQuantity = product.quantity + amount;

          // Check if the new quantity exceeds the stock
          if (newQuantity > 0 && newQuantity <= product.stock) {
            return { ...product, quantity: newQuantity };
          }
        }
        return product;
      })
      .filter((product) => product.quantity > 0);

    setCart(updatedCart);
    saveCart(updatedCart);
    updateTotalAmount(updatedCart);
  };

  const handleDelete = (productId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this product from the cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      customClass: {
        confirmButton: "bg-red-600 text-white px-4 py-2 rounded",
        cancelButton: "bg-gray-300 text-black px-4 py-2 rounded",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCart = cart.filter((product) => product._id !== productId);
        setCart(updatedCart);
        saveCart(updatedCart);
        updateTotalAmount(updatedCart);
        Swal.fire({
          title: "Deleted!",
          text: "Product has been removed from the cart.",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "bg-green-500 text-white px-4 py-2 rounded",
          },
          buttonsStyling: false,
        });
      }
    });
  };
  

  return (
    <div className="md:px-40 px-3 mt-16 md:mt-24 lg:px-40 lg:mt-24">
      {cart.length > 0 ? (
        <div className="space-y-4">
          {cart.map((product) => (
            <div
              key={product._id}
              className="relative flex items-center border p-4 rounded-lg"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-28 w-40 rounded-lg mr-4"
              />
              <div className="flex-1">
                <h2 className="md:text-xl text-[10px] font-bold">{product.name}</h2>
                <p className="text-lg font-bold  md:mt-2 ">${product.price.toFixed(2)}</p>
                <p className="text-[10px] md:text-sm font-semibold text-gray-600">{product.category}</p>
                <p className=" text-[10px] md:text-sm font-semibold mr-3">
                    Stock: {product.stock}
                  </p>
                <div className="flex items-center">
                  <p className=" text-[10px] md:text-sm font-semibold mr-3">
                    Quantity: {product.quantity}
                  </p>
                 
                 
                  <button
                    className="text-[10px] bg-gray-300 text-black px-2 py-1 rounded mr-4"
                    onClick={() => handleQuantityChange(product._id, -1)}
                  >
                    -
                  </button>
                  <button
                    className={`text-[10px] bg-gray-300 text-black px-2 py-1 rounded ml-1 ${
                      product.quantity >= product.stock
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() => handleQuantityChange(product._id, 1)}
                    disabled={product.quantity >= product.stock}
                  >
                    +
                  </button>
                 
                </div>
                {product.quantity >= product.stock && (
                    <p className="text-red-500 text-[10px] md:text-sm ml-4">Out of Stock</p>
                  )}

                <p className=" text-[10px]  mt-3 md:mt-4 md:text-sm font-bold">
                  Total: ${(product.price * product.quantity).toFixed(2)}
                </p>
              </div>
              <button
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full"
                onClick={() => handleDelete(product._id)}
              >
                ✕
              </button>
            </div>
          ))}
          <div className="flex justify-end border-t pt-4 gap-10 mt-4">
            <h2 className="  text-[10px] md:text-xl font-bold border p-3 rounded-md">
              Total Amount: ${totalAmount.toFixed(2)}
            </h2>
            <Link to="/order">
              <h2 className=" text-[10px] md:text-xl font-bold border p-3 rounded-md bg-slate-300">
                Order now
              </h2>
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-xl text-center mt-12 h-lvh">No products in the cart ... <span>
<Link to='/product'>
<button className="border p-3 bg-yellow-400 rounded-xl hover:bg-slate-200 ease-out delay-2">Continue shopping</button>

</Link>          </span></p>
        
      )}
    </div>
  );
};

export default ShowCart;
