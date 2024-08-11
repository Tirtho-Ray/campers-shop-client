// import React, { useEffect, useState } from "react";
// import ProductCardItem from "./ProductCardItem"; // Assuming this is a component to display each product item
// import { useGetProductsQuery, TProduct } from "../../readux/Api/Api"; // Adjust import path as per your project structure
// import SearchBar from "./productSearch";
// import FilterBar from "./productFilter";

// const ProductCard = () => {
//   const [query, setQuery] = useState<string>("");
//   const {
//     data: response,
//     error,
//     isLoading,
//   } = useGetProductsQuery({ name: query });

//   useEffect(() => {
//     if (query === "") {
//       // Fetch all products if query is empty
//       fetchProducts();
//     }
//   }, [query]);

//   const fetchProducts = () => {
//     // Fetch products based on query (name or description)
//     // Ensure to update the state if necessary
//   };

//   const handleSearch = (searchQuery: string) => {
//     setQuery(searchQuery);
//   };

//   const handleClearSearch = () => {
//     setQuery("");
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error occurred: {error.message}</div>;

//   const products: TProduct[] = response?.data || [];

//   return (
//     <div className="mt-24 md:mt-32">
//       <div className="flex justify-between px-2">
//         <div>

//         </div>
//         <div className="flex items-center gap-4 px-5 md:px-0 ">
//           <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />
//         </div>
//         <div className=" mr-8 md:mr-12 lg:mr-8">
//           <FilterBar />
//         </div>
//       </div>a

//       {products.length === 0 && query !== "" && (
//         <div className="text-center mt-4 text-gray-500">
//           No products found matching the search criteria.
//         </div>
//       )}

//       <div className="flex justify-center items-center mt-4 md:mt-8">
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 xl:gap-6 px-4 mt-5 md:mt-18">
//           {products.map((product) => (
//             <ProductCardItem key={product.id} product={product} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

// ProductCard.tsx
// ProductCard.tsx
import React, { useState } from "react";
import ProductCardItem from "./ProductCardItem";
import SearchBar from "./productSearch";
import FilterBar from "./productFilter";
import { TProduct, useGetProductsQuery } from "../../readux/Api/Api";

const ProductCard = () => {
    const [query, setQuery] = useState<string>("");
    const [filters, setFilters] = useState<{ category?: string; minPrice?: number; maxPrice?: number; sortPrice?: 'asc' | 'desc' }>({});

    const { data: products = [], error, isLoading } = useGetProductsQuery({ name: query, ...filters });

    const handleSearch = (searchQuery: string) => {
        setQuery(searchQuery);
    };

    const handleClearSearch = () => {
        setQuery("");
    };

    const handleApplyFilters = (appliedFilters: { category?: string; minPrice?: number; maxPrice?: number; sortPrice?: 'asc' | 'desc' }) => {
        setFilters(appliedFilters);
    };

    const handleClearFilters = () => {
        setFilters({});
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error occurred: {error.message}</div>;

    return (
        <div className="mt-24 md:mt-32">
            <div className="flex justify-center gap-3 px-2">
                <div className="flex items-center gap-4 px-5 md:px-0">
                    <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />
                </div>
                <div className="mr-8 md:mr-12 lg:mr-8">
                    <FilterBar applyFilters={handleApplyFilters} clearFilters={handleClearFilters} />
                </div>
            </div>

            {products.length === 0 && query !== "" && (
                <div className="text-center mt-4 text-gray-500">
                    No products found matching the search criteria.
                </div>
            )}

            <div className="flex justify-center items-center mt-4 md:mt-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 xl:gap-6 px-4 mt-5 md:mt-18">
                    {products.map((product:TProduct) => (
                        <ProductCardItem key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;



