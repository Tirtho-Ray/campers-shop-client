import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { TProduct } from '../../readux/Api/Api';
import { getCart, saveCart } from '../../utils/cardUtils';
import { Link } from 'react-router-dom';

const ShowCart = () => {
  const [cart, setCart] = useState<TProduct[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    const initialCart = getCart();
    if (performance.getEntriesByType("navigation")[0].type === "reload") {
      if (initialCart.length > 0) {
        Swal.fire({
          title: 'Are you sure?',
          text: 'Do you want to delete all items in the cart?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it',
          customClass: {
            confirmButton: 'bg-red-600 text-white px-4 py-2 rounded',
            cancelButton: 'bg-gray-300 text-black px-4 py-2 rounded',
          },
          buttonsStyling: false
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.removeItem('cart');
            setCart([]);
            setTotalAmount(0);
            Swal.fire(
              'Deleted!',
              'Your cart has been cleared.',
              'success'
            );
          } else {
            setCart(initialCart);
            updateTotalAmount(initialCart);
          }
        });
      } else {
        setCart(initialCart);
        updateTotalAmount(initialCart);
      }
    } else {
      setCart(initialCart);
      updateTotalAmount(initialCart);
    }
  }, []);

  const updateTotalAmount = (cartItems: TProduct[]) => {
    const total = cartItems.reduce((acc, product) => acc + product.price * product.quantity, 0);
    setTotalAmount(total);
  };

  const handleQuantityChange = (productId: string, amount: number) => {
    const updatedCart = cart.map((product) => {
      if (product._id === productId) {
        const newQuantity = product.quantity + amount;
        if (newQuantity > 0) {
          return { ...product, quantity: newQuantity };
        }
      }
      return product;
    }).filter(product => product.quantity > 0);
    setCart(updatedCart);
    saveCart(updatedCart);
    updateTotalAmount(updatedCart);
  };

  const handleDelete = (productId: string) => {
    const updatedCart = cart.filter((product) => product._id !== productId);
    setCart(updatedCart);
    saveCart(updatedCart);
    updateTotalAmount(updatedCart);
    Swal.fire({
      title: 'Deleted!',
      text: 'Product has been removed from the cart.',
      icon: 'success',
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'bg-green-500 text-white px-4 py-2 rounded',
      },
      buttonsStyling: false
    });
  };

  return (
    <div className="p-4 lg:px-40 lg:mt-24">
      {cart.length > 0 ? (
        <div className='space-y-4'>
          {cart.map((product) => (
            <div key={product._id} className="relative flex items-center border p-4 rounded-lg">
              <img src={product.image} alt={product.name} className="h-28 w-40 rounded-lg mr-4" />
              <div className="flex-1">
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-600">{product.category}</p>
                <div className="flex items-center">
                  <p className="text-sm font-bold mr-3">Quantity: {product.quantity}</p>
                  <button
                    className="bg-gray-300 text-black px-2 py-1 rounded mr-4"
                    onClick={() => handleQuantityChange(product._id, -1)}
                  >
                    -
                  </button>
                  <button
                    className="bg-gray-300 text-black px-2 py-1 rounded ml-1"
                    onClick={() => handleQuantityChange(product._id, 1)}
                  >
                    +
                  </button>
                </div>
                <p className="text-sm font-bold">Total: ${(product.price * product.quantity).toFixed(2)}</p>
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
            <h2 className="text-xl font-bold border p-3">Total Amount: ${totalAmount.toFixed(2)}</h2>
            <Link to='/order'>
            <h2 className="text-xl font-bold border p-3 bg-slate-300">Order now</h2>

            </Link>
          </div>
        </div>
      ) : (
        <p className='text-xl text-center mt-12'>No products in the cart</p>
      )}
    </div>
  );
};

export default ShowCart;
