// Api/Api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type TProduct = {
    id:string,
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
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    endpoints: (builder) => ({
        getProducts: builder.query<TProduct[], { name?: string; description?: string; category?: string; minPrice?: number; maxPrice?: number; sortPrice?: 'asc' | 'desc' }>({
            query: ({ name, description, category, minPrice, maxPrice, sortPrice }) => ({
                url: '/api/product',
                params: { name, description, category, minPrice, maxPrice, sortPrice },
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
        updateProduct: builder.mutation<{ success: boolean; id: string }, { id: string; updatedProduct: Partial<TProduct> }>({
            query: ({ id, updatedProduct }) => ({
                url: `/api/product/${id}`,
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