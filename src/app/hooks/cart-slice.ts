import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../lib/types/search";
import cogoToast from "cogo-toast";

interface CartState {
    cartItems: CartItem[];
}

const initialState: CartState = { cartItems: [] };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        /** ➕ Mahsulot qo‘shish yoki miqdorini oshirish */
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const item = action.payload;
            const exist = state.cartItems.find(i => i._id === item._id);

            if (exist) {
                exist.quantity += 1;
                cogoToast.success("Product quantity increased", { position: "bottom-left" });
            } else {
                state.cartItems.push({ ...item, quantity: 1 });
                cogoToast.success("Product added to cart", { position: "bottom-left" });
            }
        },

        /** ➖ Mahsulot miqdorini kamaytirish yoki o‘chirish */
        removeFromCart: (state, action: PayloadAction<CartItem>) => {
            const item = action.payload;
            const exist = state.cartItems.find(i => i._id === item._id);

            if (!exist) return;

            if (exist.quantity > 1) {
                exist.quantity -= 1;
                cogoToast.warn("Product quantity decreased", { position: "bottom-left" });
            } else {
                state.cartItems = state.cartItems.filter(i => i._id !== item._id);
                cogoToast.error("Product removed from cart", { position: "bottom-left" });
            }
        },

        /** ❌ Mahsulotni butunlay o‘chirish */
        deleteFromCart: (state, action: PayloadAction<CartItem>) => {
            state.cartItems = state.cartItems.filter(i => i._id !== action.payload._id);
            cogoToast.error("Product removed from cart", { position: "bottom-left" });
        },

        /** 🗑️ Barcha mahsulotlarni tozalash */
        clearCart: (state) => {
            state.cartItems = [];
            cogoToast.info("All items cleared from cart", { position: "bottom-left" });
        }
    }
});

export const { addToCart, removeFromCart, deleteFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
