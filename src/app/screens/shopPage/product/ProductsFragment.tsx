import React, { Fragment, useState } from "react";
import clsx from "clsx";
import { Product } from "../../../../lib/types/product";
import { CartItem } from "../../../../lib/types/search";
import ProductGridListSingle from "./ProductGridListSingle";

interface ProductsFragmentProps {
    layout: string;
    products: Product[];
    onAdd: (item: CartItem) => void;
}

const ProductsFragment: React.FC<ProductsFragmentProps> = ({ layout, products, onAdd }) => {

    return (
        <div className="shop-bottom-area mt-35">
            <div className={clsx("row", layout)}>
                <Fragment>
                    {products.length !== 0
                        ? products.map((product: Product) => {
                            return (
                                <div className="col-xl-4 col-sm-6"
                                    key={product._id}
                                >
                                    <ProductGridListSingle product={product} onAdd={onAdd} imageHeight={layout === "grid two-column" ? "500px" : "300px"} />
                                </div>
                            );
                        })
                        : (
                            <div className="col-12 text-center">
                                <p>No products found.</p>
                            </div>
                        )}
                </Fragment>
            </div>
        </div>
    );
};

export default ProductsFragment;
