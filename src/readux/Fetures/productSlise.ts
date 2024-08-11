// slices/productSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TProduct = {
    id:string;
    name: string;
    price: number;
    stock: number;
    quantity: number;
    description: string;
    category: string;
    rating: number;
    image: string;
    status: 'available' | 'unavailable';
    isDeleted: boolean;
};

type TInitialState = {
    products: TProduct[];
};

const initialState: TInitialState = {
    products: [],
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<TProduct[]>) => {
            state.products = action.payload;
        },
    },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
