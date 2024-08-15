// import { useParams } from "react-router-dom";
// import { useSingleProductQuery } from "../../readux/Api/Api";
// import { addToCart } from "../../utils/cardUtils";

// const ProductDetails = () => {
//   const { id } = useParams<{ id: string }>();
//   const { data: product, error, isLoading } = useSingleProductQuery(id || "");

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error occurred: {error.message}</div>;

//   return (
//     <div className="p-4">
//       {product ? (
//         <div className="grid md:grid-cols-2 border p-4 gap-5">
//           <div>
//             <img
//               src={product.image}
//               alt={product.name}
//               className="h-64  lg:h-72 w-full  my-4 rounded-lg"
//             />
//           </div>
//           <div className="mt-3">
//             <h1 className="text-2xl font-bold">{product.name}</h1>

//             <p className="text-lg font-bold mt-2">
//               ${product.price.toFixed(2)}
//             </p>
//             <p className="text-lg mt-2 font-Poppins">
//               Category: {product.category}
//             </p>
//             <p className="text-lg mt-2">Stock: {product.stock}</p>
//             <p className="text-lg mt-2 mb-3">Rating: {product.rating}</p>
//             <p style={{ border: "1px solid blue ", marginTop: "3px" }}></p>
//             <p className="text-lg mt-4">{product.description}</p>
//             {/* shared */}
//             <button 
//               className="px-[5px] py-1 bg-black text-white text-[9px] rounded-md hidden lg:block"
//               onClick={() => addToCart(product)}
//             >
//               + Add to cart
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="flex justify-center items-center h-svh">
//           No product found
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductDetails;

// src/components/ProductDetails.tsx

import React from 'react';
import { useParams } from "react-router-dom";
import { useSingleProductQuery } from "../../readux/Api/Api";
import { addToCart } from '../../utils/cardUtils';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, error, isLoading } = useSingleProductQuery(id || "");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {error.message}</div>;

  return (
    <div className="p-4 mt-14 md:mt-18 lg:mt-28">
      {product ? (
        <div className="grid md:grid-cols-2 border p-4 gap-5">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="h-64  lg:h-72 w-full  my-4 rounded-lg"
            />
          </div>
          <div className="mt-3">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-lg font-bold mt-2">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-lg mt-2 font-Poppins">
              Category : {product.category}
            </p>
            <p className="text-lg mt-2">Stock: {product.stock}</p>
            <p className="text-lg mt-2 mb-3 ">Rating : {product.rating} *</p>
            <p style={{ border: "1px solid blue ", marginTop: "3px" }}></p>
            <p className=" text-[12px] md:text-[15px] lg:text-[18px] mt-4 lg:px-3">{product.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus autem est aliquam eius placeat neque id vitae sed exercitationem quaerat.</p>
            <button
              onClick={() => addToCart(product)}
              className="px-[5px] py-1 bg-black text-white text-[9px] rounded-md hidden lg:block mt-10"
            >
              + Add to cart
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-svh">
          No product found
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
