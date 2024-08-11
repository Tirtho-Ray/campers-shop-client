// import React, { useState, useEffect } from 'react';
// import { FaFilter, FaTimes } from 'react-icons/fa';

// interface FilterBarProps {
//   applyFilters: (filters: FilterState) => void; // Function to apply filters
//   clearFilters: () => void; // Function to clear filters
// }

// interface FilterState {
//   priceRange: number;
//   sortType: 'asc' | 'desc' | ''; // Sorting type
// }

// const FilterBar: React.FC<FilterBarProps> = ({ applyFilters, clearFilters }) => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const [filters, setFilters] = useState<FilterState>({
//     priceRange: 100, // Default initial value
//     sortType: ''
//   });

//   useEffect(() => {
//     // Fetch initial data or any other initial setup
//   }, []);

//   const toggleFilterModal = () => {
//     setIsOpen(!isOpen);
//   };

//   const applyFiltersHandler = () => {
//     // Apply filters logic
//     applyFilters(filters);
//     setIsOpen(false); // Close filter modal after applying filters
//   };

//   const clearFiltersHandler = () => {
//     setFilters({ priceRange: 100, sortType: '' }); // Reset filters
//     clearFilters();
//   };

//   return (
//     <div className="relative">
//       <button
//         onClick={toggleFilterModal}
//         className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-full shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
//       >
//         <FaFilter className="mr-2" />
//         Filter
//       </button>

//       {isOpen && (
//         <div className="fixed inset-0 z-10 bg-gray-800 bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold">Filters</h2>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="text-gray-500 hover:text-gray-700 focus:outline-none"
//               >
//                 <FaTimes />
//               </button>
//             </div>

//             {/* Price Range Slider */}
//             <div className="mb-4">
//               <label className="block mb-1 font-medium">Price Range</label>
//               <input
//                 type="range"
//                 min={10}
//                 max={500}
//                 step={10}
//                 value={filters.priceRange}
//                 onChange={(e) => setFilters({ ...filters, priceRange: +e.target.value })}
//                 className="w-full bg-gray-100 rounded-md"
//               />
//               <div className="flex justify-between mt-2 text-sm text-gray-600">
//                 <span>$10</span>
//                 <span>$500</span>
//               </div>
//               <div className="text-sm text-gray-600 mt-1">
//                 Selected: ${filters.priceRange}
//               </div>
//             </div>

//             {/* Sorting Options */}
//             <div className="mb-4">
//               <label className="block mb-1 font-medium">Sort by Price</label>
//               <select
//                 value={filters.sortType}
//                 onChange={(e) => setFilters({ ...filters, sortType: e.target.value as 'asc' | 'desc' })}
//                 className="w-full bg-gray-100 border border-gray-300 rounded-md py-1 px-2 focus:outline-none"
//               >
//                 <option value="">Select</option>
//                 <option value="asc">Price - Low to High</option>
//                 <option value="desc">Price - High to Low</option>
//               </select>
//             </div>

//             {/* Actions */}
//             <div className="flex justify-end">
//               <button
//                 onClick={applyFiltersHandler}
//                 className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600 focus:outline-none"
//               >
//                 Apply Filters
//               </button>
//               <button
//                 onClick={clearFiltersHandler}
//                 className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none"
//               >
//                 Clear Filters
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FilterBar;

// FilterBar.tsx
import React, { useState } from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';

interface FilterBarProps {
    applyFilters: (filters: { category?: string; minPrice?: number; maxPrice?: number; sortPrice?: 'asc' | 'desc' }) => void;
    clearFilters: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ applyFilters, clearFilters }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [filters, setFilters] = useState<{ category?: string; minPrice?: number; maxPrice?: number; sortPrice?: 'asc' | 'desc' }>({});

    const toggleFilterModal = () => {
        setIsOpen(!isOpen);
    };

    const applyFiltersHandler = () => {
        applyFilters(filters);
        setIsOpen(false);
    };

    const clearFiltersHandler = () => {
        setFilters({});
        clearFilters();
    };

    return (
        <div className="relative">
            <button
                onClick={toggleFilterModal}
                className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-full shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
                <FaFilter className="mr-2" />
                Filter
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-10 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Filters</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {/* Category Filter */}
                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Category</label>
                            <input
                                type="text"
                                placeholder="Enter category"
                                value={filters.category || ''}
                                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                                className="w-full bg-gray-100 border border-gray-300 rounded-md py-1 px-2 focus:outline-none"
                            />
                        </div>

                        {/* Price Range Slider */}
                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Price Range</label>
                            <input
                                type="range"
                                min={10}
                                max={500}
                                step={10}
                                value={filters.maxPrice || 500}
                                onChange={(e) => setFilters({ ...filters, maxPrice: +e.target.value })}
                                className="w-full bg-gray-100 rounded-md"
                            />
                            <div className="flex justify-between mt-2 text-sm text-gray-600">
                                <span>$10</span>
                                <span>$500</span>
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                                Selected: ${filters.maxPrice || 500}
                            </div>
                        </div>

                        {/* Sorting Options */}
                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Sort by Price</label>
                            <select
                                value={filters.sortPrice || ''}
                                onChange={(e) => setFilters({ ...filters, sortPrice: e.target.value as 'asc' | 'desc' })}
                                className="w-full bg-gray-100 border border-gray-300 rounded-md py-1 px-2 focus:outline-none"
                            >
                                <option value="">Select</option>
                                <option value="asc">Price - Low to High</option>
                                <option value="desc">Price - High to Low</option>
                            </select>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end">
                            <button
                                onClick={applyFiltersHandler}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600 focus:outline-none"
                            >
                                Apply Filters
                            </button>
                            <button
                                onClick={clearFiltersHandler}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterBar;


