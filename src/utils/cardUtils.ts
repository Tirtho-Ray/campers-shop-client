// src/utils/cartUtils.ts

import Swal from 'sweetalert2';
import { TProduct } from "../readux/Api/Api";

export const addToCart = (product: TProduct) => {
  const cart: TProduct[] = JSON.parse(localStorage.getItem('cart') || '[]');
  console.log('Initial cart:', cart);  // Debug log

  // Find the product by `_id` to ensure it's unique
  const productExists = cart.find((item: TProduct) => item._id === product._id);

  if (productExists) {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: `${product.name} is already added to the cart!`,
    });
  } else {
    cart.push({ ...product, quantity: 1 });
    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${product.name} added to cart.`,
    });
  }

  console.log('Updated cart:', cart);  // Debug log
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const getCart = (): TProduct[] => {
  return JSON.parse(localStorage.getItem('cart') || '[]');
};


export const saveCart = (cart: TProduct[]) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const clearCart = () => {
  localStorage.removeItem('cart');
 
};