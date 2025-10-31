import { createSlice } from "@reduxjs/toolkit";
import { ProductsPageState } from "../../../lib/types/screen";
import { stat } from "fs";

const initialState: ProductsPageState = {
    mobileshop: null,
    chosenProduct: null,
    products: [],
};

const productsPageSlice = createSlice({
    name: "productsPage",
    initialState,
    reducers: {
        setMobileshop: (state, action) => {
            state.mobileshop = action.payload;
        },
        setChosenProduct: (state, action) => {
            state.chosenProduct = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
    },
});

export const { setMobileshop, setChosenProduct, setProducts } = productsPageSlice.actions;

const ProductsPageReducer = productsPageSlice.reducer;
export default ProductsPageReducer;