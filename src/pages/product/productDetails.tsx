


import { useParams } from "react-router-dom";
import { useSingleProductQuery } from "../../readux/Api/Api";
import { addToCart } from '../../utils/cardUtils';
import Loader from '../../Loader/Loader';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, error, isLoading } = useSingleProductQuery(id || "");

  if (isLoading) return <div><Loader /></div>;
  if (error) return <div>Error occurred: </div>;

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
            <div className='flex justify-between'>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <button
              onClick={() => addToCart(product)}
              className="px-[5px] py-1 bg-black text-white text-[9px] rounded-md hidden lg:block "
            >
              + Add to cart
            </button>
            </div>
            <p className="text-lg font-bold mt-2">
              Price: ${product.price.toFixed(2)}
            </p>
            <p className="text-md mt-2 font-Poppins font-semibold">
              Category : {product.category}
            </p>
            <p className="text-md mt-2 font-semibold">Stock: {product.stock}</p>
            <p className="text-md mt-2 mb-3  font-semibold">Rating : {product.rating} *</p>
            <p style={{ border: "1px solid blue font-semibold ", marginTop: "3px" }}></p>
            <p className=" text-[12px] md:text-[15px] lg:text-[13px] mt-4 lg:px-3">{product.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus autem est aliquam eius placeat neque id vitae sed exercitationem quaerat.</p>
            
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
