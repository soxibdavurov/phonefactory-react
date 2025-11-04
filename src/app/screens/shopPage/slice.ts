import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductsPageState } from "../../../lib/types/screen";
import { Product } from "../../../lib/types/product"; // sizdagi product tipi

// 🧩 Boshlang‘ich holat
const initialState: ProductsPageState = {
    mobileshop: null,
    chosenProduct: null,
    products: [],
};

// 🧱 Slice
const productsPageSlice = createSlice({
    name: "productsPage",
    initialState,
    reducers: {
        setMobileshop: (state, action: PayloadAction<any>) => {
            state.mobileshop = action.payload;
        },
        setChosenProduct: (state, action: PayloadAction<Product | null>) => {
            state.chosenProduct = action.payload;
        },
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        },
        // ⚡ optional: productsni tozalash yoki reset qilish uchun
        resetProductsPage: () => initialState,
    },
});

// 🔹 Actions
export const { setMobileshop, setChosenProduct, setProducts, resetProductsPage } =
    productsPageSlice.actions;

// 🔹 Reducer
export default productsPageSlice.reducer;
