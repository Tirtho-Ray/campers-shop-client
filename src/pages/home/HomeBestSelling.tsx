import React, { useState, useEffect } from "react";
import axios from "axios";
import { TProduct } from "../../readux/Fetures/productSlise";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import "./homeSlider.css";
import { NavLink } from "react-router-dom";

const HomeBestSelling: React.FC = () => {
  const [products, setProducts] = useState<TProduct[]>([]);

  useEffect(() => {
    // Fetch the products using Axios
    axios
      .get<{ data: TProduct[] }>("http://localhost:5000/api/product")
      .then((response) => {
        const allProducts = response.data.data; // Adjust this based on your API response structure
        // Filter products with rating 5 and limit to 3
        const filteredProducts = allProducts
          .filter((product) => product.rating === 5)
          .slice(0, 3);
        setProducts(filteredProducts);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div>
      <h1 className="lg:mt-20 lg:text-4xl md:mt-16 md:text-3xl mt-10 text-xl font-bold text-center font-Poppins">
        Best Selling
      </h1>
      <p className="text-center lg:mt-5 font-Poppins text-[10px] md:text-[15px] lg:text-[15px] mt-2">
        Get in on the trend with our curated selection of best-selling products
      </p>

      <div className="px-10 mx-auto mt-8 md:px-24 lg:px-40">
        <div className="grid grid-cols-3 gap-2 md:gap-5 lg:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white  flex flex-col items-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[100px] md:h-[180px] lg:h-[290px]  "
              />
              <h2 className="text-[8px] md:text-[12px] lg:text-[13px] font-bold text-gray-800 mt-3 md:mt-4">
                {product.name}
              </h2>

              <div className="flex justify-center items-center gap-1 md:gap-3 lg:gap-4 mt-1">
                <div>
                  <p className="text-[8px] md:text-[12px] font-semibold font-Poppins text-gray-900 ">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p>|</p>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-[2px]">
                    <p className="text-[8px] md:text-[12px] font-semibold ">
                      {product.rating}
                    </p>
                    <p className="text-[7px] md:text-[10px] text-yellow-400 mb-[1px]">
                      {" "}
                      <FaStar />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4 md:mt-6">
        <NavLink to="product">
          <div className="flex gap-2 items-center h-5 w-[70px] md:h-7 md:w-[100px] text-center px-1 md:px-2 seeBorder">
            <button className="text-[8px] md:text-[12px] font-semibold ">see more</button>
            <p className="text-[8px] md:text-[12px]">
              <FaArrowRightLong />
            </p>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default HomeBestSelling;
