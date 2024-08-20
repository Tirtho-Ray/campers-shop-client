// Api/Api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type TProduct = {
    id:string,
    _id:string,
    name: string;
    price: number;
    stock: number;
    quantity: number;
    description: string;
    category: string;
    rating: number;
    image: string;
};

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://campers-shop-srever.vercel.app/' }),
    endpoints: (builder) => ({
        getProducts: builder.query<TProduct[], { name?: string; description?: string; category?: string; minPrice?: number; rating?: number, maxPrice?: number; sortPrice?: 'asc' | 'desc' }>({
            query: ({ name, description, category, minPrice, maxPrice, sortPrice ,rating}) => ({
                url: '/api/product',
                params: { name, description, category, minPrice, maxPrice, sortPrice,rating },
            }),
            transformResponse: (response: { data: TProduct[] }) => response.data, // Ensure data is in the expected format colext form google
        }),
        allProduct: builder.query({
            query: () => ({
                url: '/api/product',
                method: 'GET',
               
            }),
        }),
        singleProduct: builder.query<TProduct, string>({
            query: (id) => ({
                url: `/api/product/${id}`,
                method: 'GET',
            }),
            transformResponse: (response: { success: boolean; message: string; data: TProduct }) => response.data,
        }),
        
        createProduct: builder.mutation<TProduct, Partial<TProduct>>({
            query: (newProduct) => ({
                url: '/api/create-product',
                method: 'POST',
                body: newProduct,
            }),
        }),
        deleteProduct: builder.mutation<{ success: boolean; id: string }, string>({
            query: (id) => ({
                url: `/api/product/${id}`,
                method: 'DELETE',
            }),
        }),
        updateProduct: builder.mutation<{ success: boolean; _id: string }, { _id: string; updatedProduct: Partial<TProduct> }>({
            query: ({ _id, updatedProduct }) => ({
                url: `/api/product/${_id}`,
                method: 'PUT',
                body: updatedProduct,
            }),
        }),
    }),
});

export const { 
    useGetProductsQuery,
    useCreateProductMutation,
    useDeleteProductMutation ,
    useUpdateProductMutation,
    useAllProductQuery,
    useSingleProductQuery
}= baseApi;