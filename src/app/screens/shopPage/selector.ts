import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";
import { Product } from "../../../lib/types/product"; // sizdagi product tipi

// 1️⃣ Asosiy slice holati
const selectProductsPage = (state: AppRootState) => state.productsPage;

// 2️⃣ Mayda selectorlar
export const retrieveMobileshop = createSelector(
    selectProductsPage,
    (productsPage) => productsPage.mobileshop
);

export const retrieveChosenProduct = createSelector(
    selectProductsPage,
    (productsPage) => productsPage.chosenProduct
);

export const retrieveProducts = createSelector(
    selectProductsPage,
    (productsPage) => productsPage.products
);

// 3️⃣ relatedProducts selector
export const retrieveRelatedProducts = createSelector(
    [retrieveProducts, retrieveChosenProduct],
    (products: Product[], chosenProduct: Product | null): Product[] => {
        if (!chosenProduct) return [];
        return products.filter(
            (ele) =>
                ele.productCollection === chosenProduct.productCollection &&
                ele._id !== chosenProduct._id
        );
    }
);