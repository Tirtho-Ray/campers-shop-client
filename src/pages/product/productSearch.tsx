// import React, { ChangeEvent, useRef, useState } from 'react';
// import { FaSearch } from 'react-icons/fa';
// import FilterBar from './productFilter';

// interface SearchBarProps {
//     onSearch: (query: string) => void;
//     onClear: () => void;
// }

// const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onClear }) => {
//     const [query, setQuery] = useState<string>('');
//     const searchInputRef = useRef<HTMLInputElement>(null);

//     const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
//         setQuery(e.target.value);
//     };

//     const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//         if (e.key === 'Enter') {
//             e.preventDefault(); // Prevent form submission if in a form element
//             onSearch(query.trim());
//         }
//     };

//     const handleSearchClick = () => {
//         onSearch(query.trim());
//     };

//     const handleClearSearch = () => {
//         setQuery('');
//         onClear();
//         if (searchInputRef.current) {
//             searchInputRef.current.focus();
//         }
//     };

//     return (
//         <div className="relative flex items-center w-[155px] md:w-72  max-w-lg mx-auto shadow-md rounded-lg overflow-hidden ">
//             <input
//                 ref={searchInputRef}
//                 type="text"
//                 value={query}
//                 onChange={handleSearchChange}
//                 onKeyPress={handleKeyPress}
//                 className="h-10 px-3 py-2 w-full border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 aria-label="Search"
//             />
//             <div className="absolute right-0 top-0 bottom-0 flex items-center pr-3">
//                 {query && (
//                     <button
//                         className="text-gray-400 hover:text-gray-600 focus:outline-none"
//                         onClick={handleClearSearch}
//                     >
//                         <svg
//                             className="h-4 w-4"
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                             aria-hidden="true"
//                         >
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M6 18L18 6M6 6l12 12"
//                             />
//                         </svg>
//                     </button>
//                 )}
//                 <div
//                     className="ml-2 text-gray-400 cursor-pointer"
//                     onClick={handleSearchClick}
//                 >
//                     <FaSearch />
                    
//                 </div>
                
//             </div>


//         </div>
//     );
// };



// export default SearchBar;


import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

interface SearchBarProps {
    onSearch: (query: string) => void;
    onClear: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onClear }) => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleSearch = () => {
        onSearch(searchQuery);
    };

    const handleClear = () => {
        setSearchQuery("");
        onClear();
    };

    return (
        <div className="flex items-center border-b border-gray-400 py-2">
            <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
                className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                type="button"
                onClick={handleSearch}
            >
                <FaSearch />
            </button>
            <button
                className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
                type="button"
                onClick={handleClear}
            >
                <FaTimes />
            </button>
        </div>
    );
};

export default SearchBar;
