import { ProductBrand, ProductCollection, ProductSize, ProductStatus, TariffType } from "../enums/products.enum";

export interface Product {
    _id: string;
    productStatus: ProductStatus;
    productCollection: ProductCollection;
    productName: string;
    productPrice: number;
    productLeftCount: number;
    productSize: ProductSize;
    productVolume: number;
    productDesc?: string;
    productImages: string[];
    productViews: number;
    productBrand?: ProductBrand;
    productRate?: number;
    tariffType?: TariffType;
    productDiscount: number;
    isNew?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProductInquiry {
    order: string;
    page: number;
    limit: number;
    productCollection?: ProductCollection;
    productBrand?: ProductBrand;
    search?: string;
}