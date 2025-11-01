// src/stores/slices/cart-slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import cogoToast from "cogo-toast";
import { v4 } from 'uuid'

/** Mahsulot uchun umumiy tip (UIdan dispatch qilinadigan payload) */
export interface ProductPayload {
    id: string | number;
    // ixtiyoriy maydonlar – kerak bo‘lsa kengaytirasiz
    name?: string;
    price?: number;
    quantity?: number;
    /** variation = true bo‘lsa rang/razmer farqlanadi */
    variation?: boolean;
    selectedProductColor?: string;
    selectedProductSize?: string;
    /** Ayrim joylarda mavjud bo‘lishi mumkin, lekin cartga qo‘shilganda yangidan beriladi */
    cartItemId?: string;
}

/** Savatchadagi aniq item tipi */
export interface CartItem extends Omit<ProductPayload, "cartItemId" | "quantity"> {
    cartItemId: string;
    quantity: number;
}

/** Slice state tipi */
export interface CartState {
    cartItems: CartItem[];
}

const initialState: CartState = {
    cartItems: [],
};

const sameVariant = (a: ProductPayload, b: CartItem): boolean => {
    return (
        a.id === b.id &&
        (!!a.selectedProductColor ? a.selectedProductColor === b.selectedProductColor : true) &&
        (!!a.selectedProductSize ? a.selectedProductSize === b.selectedProductSize : true) &&
        // agar payloadda cartItemId kelsa, aynan o‘sha elementga tegishli bo‘lishi ham mumkin
        (a.cartItemId ? a.cartItemId === b.cartItemId : true)
    );
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<ProductPayload>) {
            const product = action.payload;

            if (!product.variation) {
                // oddiy mahsulot (variant yo‘q)
                const cartItem = state.cartItems.find((item) => item.id === product.id);

                if (!cartItem) {
                    state.cartItems.push({
                        ...product,
                        quantity: product.quantity ? product.quantity : 1,
                        cartItemId: v4(),
                    });
                } else {
                    state.cartItems = state.cartItems.map((item) => {
                        if (item.cartItemId === cartItem.cartItemId) {
                            return {
                                ...item,
                                quantity: product.quantity ? item.quantity + product.quantity : item.quantity + 1,
                            };
                        }
                        return item;
                    });
                }
            } else {
                // variantli mahsulot (rang/razmer)
                const cartItem = state.cartItems.find((item) => sameVariant(product, item));

                if (!cartItem) {
                    // bunday kombinatsiya yo‘q — yangi item qo‘shamiz
                    state.cartItems.push({
                        ...product,
                        quantity: product.quantity ? product.quantity : 1,
                        cartItemId: v4(),
                    });
                } else if (
                    cartItem !== undefined &&
                    (cartItem.selectedProductColor !== product.selectedProductColor ||
                        cartItem.selectedProductSize !== product.selectedProductSize)
                ) {
                    // ID bir xil, lekin variant boshqacha bo‘lsa — alohida item sifatida qo‘shamiz
                    state.cartItems = [
                        ...state.cartItems,
                        {
                            ...product,
                            quantity: product.quantity ? product.quantity : 1,
                            cartItemId: v4(),
                        },
                    ];
                } else {
                    // mavjud variantga miqdor qo‘shamiz (yoki quantity ni oshiramiz)
                    state.cartItems = state.cartItems.map((item) => {
                        if (item.cartItemId === cartItem.cartItemId) {
                            return {
                                ...item,
                                quantity: product.quantity ? item.quantity + product.quantity : item.quantity + 1,
                                selectedProductColor: product.selectedProductColor,
                                selectedProductSize: product.selectedProductSize,
                            };
                        }
                        return item;
                    });
                }
            }

            cogoToast.success("Added To Cart", { position: "bottom-left" });
        },

        /** cartItemId bo‘yicha o‘chirish */
        deleteFromCart(state, action: PayloadAction<string>) {
            state.cartItems = state.cartItems.filter((item) => item.cartItemId !== action.payload);
            cogoToast.error("Removed From Cart", { position: "bottom-left" });
        },

        /** Bitta item miqdorini kamaytirish yoki 1 bo‘lsa o‘chirish */
        decreaseQuantity(state, action: PayloadAction<CartItem>) {
            const product = action.payload;

            if (product.quantity === 1) {
                state.cartItems = state.cartItems.filter((item) => item.cartItemId !== product.cartItemId);
                cogoToast.error("Removed From Cart", { position: "bottom-left" });
            } else {
                state.cartItems = state.cartItems.map((item) =>
                    item.cartItemId === product.cartItemId ? { ...item, quantity: item.quantity - 1 } : item
                );
                cogoToast.warn("Item Decremented From Cart", { position: "bottom-left" });
            }
        },

        /** Hammasini tozalash */
        deleteAllFromCart(state) {
            state.cartItems = [];
        },
    },
});

export const { addToCart, deleteFromCart, decreaseQuantity, deleteAllFromCart } =
    cartSlice.actions;

export default cartSlice.reducer;
