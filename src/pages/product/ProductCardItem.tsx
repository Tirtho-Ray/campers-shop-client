import React from 'react';
import { TProduct } from '../../readux/Api/Api';
import { Link } from 'react-router-dom';
import { addToCart } from '../../utils/cardUtils';

interface ProductCardItemProps {
  product: TProduct;
}

const ProductCardItem: React.FC<ProductCardItemProps> = ({ product }) => {
  return (
    <div className="lg:h-[300px] lg:w-[240px] md:h-[290px] md:w-[200px] h-[250px] w-[170px] border md:p-[15px] p-2 rounded-lg flex flex-col">
      <div className="flex justify-center items-center">
        <img
          className="h-28 w-[290px] md:h-[125px] lg:h-[150px]"
          style={{ borderRadius: '8px' }}
          src={product.image}
          alt={product.name}
        />
      </div>
      <div className="mt-[10px] flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-[12px] md:text-[12px] md font-bold font-Poppins w-32">
              {product.name}
            </h1>
            <h1 className="text-[12px] md:text-[11px] font-Poppins w-32">
              {product.category}
            </h1>
            <h1 className="text-[14px] font-bold font-Poppins md:mt-2">
              ${product.price.toFixed(2)}
            </h1>
          </div>
          <div>
            <button
              onClick={() => addToCart(product)}
              className="px-[5px] py-1 bg-black text-white text-[9px] rounded-md hidden xl:block "
            >
              + Add to cart
            </button>
            <button
              onClick={() => addToCart(product)}
              className="px-[9px] py-[4px] rounded-full bg-black text-white text-[15px] md:text-[10px] xl:hidden"
            >
              +
            </button>
            <h1 className="text-[14px] font-bold font-Poppins mt-[18px] md:mt-4 flex justify-end">
              {product.rating} *
            </h1>
          </div>
        </div>
      </div>
      <div className="mt-2 flex justify-center">
        <Link to={`/product/${product._id}`}>
          <button className="w-32 md:w-[180px] lg:w-[200px] py-1 bg-gray-800 text-white text-sm rounded-md">
            Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCardItem;
