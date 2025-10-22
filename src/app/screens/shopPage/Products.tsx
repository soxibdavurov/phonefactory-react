import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Input, Stack, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/ProductService";
import { ProductBrand, ProductCollection } from "../../../lib/enums/products.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import SingleProductList from "../../components/product/SingleProducList";
import SingleProductColumns from "../../components/product/SingleProductColumns";

/* REDUX SLIC & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(
  retrieveProducts, (products) => ({
    products,
  }));
interface ProductsProps {
  onAdd: (item: CartItem) => void;
}


export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 12,
    order: "createdAt",
    search: "",
  } as any);
  type BrandPick = "ALL" | ProductBrand;

  const searchBrandHandler = (brand: BrandPick) => {
    setProductSearch(prev => ({
      ...prev,
      page: 1,
      productBrand: brand === "ALL" ? undefined : brand, // ALL -> undefined
    }));
  };

  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();
  useEffect(() => {
    const product = new ProductService();
    product.getProducts(productSearch)
      .then((data) => setProducts(data)).catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /* Handlers */
  const searchCollectionHandler = (collection?: ProductCollection | "ALL") => {
    const next = { ...productSearch, page: 1 };

    if (collection === "ALL" || !collection) {
      delete (next as any).productCollection; // barcha productlar
    } else {
      next.productCollection = collection;
    }

    setProductSearch(next);
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };
  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };
  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "createdAt" | "price" | "productViews";
    setProductSearch((prev) => ({ ...prev, order: value }));
  };
  const [activeTab, setActiveTab] = useState<"three-column" | "list-ul" | "two-column">("three-column");
  const chooSeSMARTPHONEHandler = (id: string) => {
    history.push(`/shop/${id}`);
  };

  return (
    <>
      <div className="shop-area pt-95 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 order-2 order-lg-1">
              <div className="sidebar-style mr-30">
                <div className="sidebar-widget">
                  <h4 className="pro-sidebar-title">Search </h4>
                  <div className="pro-sidebar-search mb-50 mt-25">
                    <div className="pro-sidebar-search-form">
                      <input
                        type="search"
                        name="singleResearch"
                        placeholder="Type here"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") searchProductHandler();
                        }}
                      />
                      <button type="submit" aria-label="Search" onClick={searchProductHandler}>
                        <i className="pe-7s-search" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="sidebar-widget">
                  <h4 className="pro-sidebar-title">Categories</h4>
                  <div className="sidebar-widget-list mt-30">
                    <ul>
                      <li>
                        <div className="sidebar-widget-list-left">
                          <button
                            className={!productSearch.productCollection ? "active" : ""}
                            onClick={() => searchCollectionHandler("ALL")}
                          >
                            <span className="checkmark" />
                            All categories
                          </button>
                        </div>
                      </li>

                      <li>
                        <div className="sidebar-widget-list-left">
                          <button
                            className={productSearch.productCollection === ProductCollection.SMARTPHONE ? "active" : ""}
                            onClick={() => searchCollectionHandler(ProductCollection.SMARTPHONE)}
                          >
                            <span className="checkmark" />
                            Smartphones
                          </button>
                        </div>
                      </li>

                      <li>
                        <div className="sidebar-widget-list-left">
                          <button
                            className={productSearch.productCollection === ProductCollection.TARIFF ? "active" : ""}
                            onClick={() => searchCollectionHandler(ProductCollection.TARIFF)}
                          >
                            <span className="checkmark" />
                            Tariff
                          </button>
                        </div>
                      </li>

                      <li>
                        <div className="sidebar-widget-list-left">
                          <button
                            className={productSearch.productCollection === ProductCollection.AUDIO ? "active" : ""}
                            onClick={() => searchCollectionHandler(ProductCollection.AUDIO)}
                          >
                            <span className="checkmark" />
                            Audio
                          </button>
                        </div>
                      </li>

                      <li>
                        <div className="sidebar-widget-list-left">
                          <button
                            className={productSearch.productCollection === ProductCollection.CHARGER ? "active" : ""}
                            onClick={() => searchCollectionHandler(ProductCollection.CHARGER)}
                          >
                            <span className="checkmark" />
                            Charger
                          </button>
                        </div>
                      </li>

                      <li>
                        <div className="sidebar-widget-list-left">
                          <button
                            className={productSearch.productCollection === ProductCollection.OTHER ? "active" : ""}
                            onClick={() => searchCollectionHandler(ProductCollection.OTHER)}
                          >
                            <span className="checkmark" />
                            Other
                          </button>
                        </div>
                      </li>
                    </ul>

                  </div>
                </div>
                <div className="sidebar-widget mt-40">
                  <h4 className="pro-sidebar-title">Brand</h4>
                  <div className="sidebar-widget-list mt-20">
                    <ul>
                      <li>
                        <div className="sidebar-widget-list-left">
                          <button
                            className={!productSearch.productBrand ? "active" : ""}
                            onClick={() => searchBrandHandler("ALL")}
                          >
                            <span className="checkmark" />
                            All Brands
                          </button>
                        </div>
                      </li>

                      <li>
                        <div className="sidebar-widget-list-left">
                          <button
                            className={productSearch.productBrand === ProductBrand.SAMSUNG ? "active" : ""}
                            onClick={() => searchBrandHandler(ProductBrand.SAMSUNG)}
                          >
                            <span className="checkmark" />
                            Samsung
                          </button>
                        </div>
                      </li>

                      <li>
                        <div className="sidebar-widget-list-left">
                          <button
                            className={productSearch.productBrand === ProductBrand.APPLE ? "active" : ""}
                            onClick={() => searchBrandHandler(ProductBrand.APPLE)}
                          >
                            <span className="checkmark" />
                            Apple
                          </button>
                        </div>
                      </li>

                      <li>
                        <div className="sidebar-widget-list-left">
                          <button
                            className={productSearch.productBrand === ProductBrand.LGU ? "active" : ""}
                            onClick={() => searchBrandHandler(ProductBrand.LGU)}
                          >
                            <span className="checkmark" />
                            LG U+
                          </button>
                        </div>
                      </li>

                      <li>
                        <div className="sidebar-widget-list-left">
                          <button
                            className={productSearch.productBrand === ProductBrand.KT ? "active" : ""}
                            onClick={() => searchBrandHandler(ProductBrand.KT)}
                          >
                            <span className="checkmark" />
                            KT
                          </button>
                        </div>
                      </li>

                      <li>
                        <div className="sidebar-widget-list-left">
                          <button
                            className={productSearch.productBrand === ProductBrand.SKT ? "active" : ""}
                            onClick={() => searchBrandHandler(ProductBrand.SKT)}
                          >
                            <span className="checkmark" />
                            SKT
                          </button>
                        </div>
                      </li>

                      <li>
                        <div className="sidebar-widget-list-left">
                          <button
                            className={productSearch.productBrand === ProductBrand.OTHER ? "active" : ""}
                            onClick={() => searchBrandHandler(ProductBrand.OTHER)}
                          >
                            <span className="checkmark" />
                            Other
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9 order-1 order-lg-2">
              <div className="shop-top-bar mb-35">
                <div className="select-shoing-wrap">
                  <div className="shop-select">
                    <select value={productSearch.order} onChange={handleOrderChange}>
                      <option value="createdAt">Sort by Newest</option>
                      <option value="productPrice">Sort by Price</option>
                      <option value="productViews">Sort by View</option>
                    </select>
                  </div>
                  <p>Showing {products.length} {products.length > 1 ? 'results' : 'result'} </p>
                </div>

                <div className="shop-tab">
                  <a
                    href="#two-column"
                    className={activeTab === "two-column" ? "active" : ""}
                    onClick={(e) => { e.preventDefault(); setActiveTab("two-column"); }}
                  >
                    <i className="fa fa-th-large" />
                  </a>
                  <a
                    href="#three-column"
                    className={activeTab === "three-column" ? "active" : ""}
                    onClick={(e) => { e.preventDefault(); setActiveTab("three-column"); }}
                  >
                    <i className="fa fa-th" />
                  </a>
                  <a
                    href="#list-ul"
                    className={activeTab === "list-ul" ? "active" : ""}
                    onClick={(e) => { e.preventDefault(); setActiveTab("list-ul"); }}
                  >
                    <i className="fa fa-list-ul" />
                  </a>
                </div>
              </div>
              <div className="shop-bottom-area mt-35">
                <div className="tab-content jump">
                  {/* List */}
                  <div
                    id="list-ul"
                    className={`tab-pane ${activeTab === "list-ul" ? "active" : "d-none"}`}
                  >
                    <div className="shop-list-wrap mb-30">
                      {products.length !== 0
                        ? products.map((ele: Product) => {
                          return (
                            <div className="row" key={ele._id}>

                              <SingleProductList ele={ele} />
                            </div>
                          );
                        })
                        : (
                          <Box className="no-data">Product are not available</Box>
                        )}
                    </div>
                  </div>

                  {/* TwoColumns */}
                  <div
                    id="two-column"
                    className={`tab-pane ${activeTab === "two-column" ? "active" : "d-none"}`}
                  >

                    <div className="shop-list-wrap mb-25">
                      <div className={`row grid ${activeTab}`}>
                        {products.length !== 0
                          ? products.map((ele: Product) => {
                            return (

                              <div className="col-xl-4 col-sm-6" key={ele._id}>

                                <SingleProductColumns ele={ele} imageHeight={activeTab === "two-column" ? "450px" : "300px"} />

                              </div>
                            );
                          })
                          : (
                            <Box className="no-data">Product are not available</Box>
                          )}
                      </div>
                    </div>
                  </div>

                  {/* ThreeColumns */}
                  <div
                    id="three-column"
                    className={`tab-pane ${activeTab === "three-column" ? "active" : "d-none"}`}
                  >

                    <div className="shop-list-wrap mb-25">
                      <div className={`row grid ${activeTab}`}>
                        {products.length !== 0
                          ? products.map((ele: Product) => {
                            return (

                              <div className="col-xl-4 col-sm-6" key={ele._id}>

                                <SingleProductColumns ele={ele} imageHeight={"300px"} />

                              </div>
                            );
                          })
                          : (
                            <Box className="no-data">Product are not available</Box>
                          )}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div className="pro-pagination-style text-center mt-30">
                <ul>
                  {/* Oldingi sahifa */}
                  <li>
                    <a
                      href="#"
                      className={`prev${productSearch.page === 1 ? " disabled" : ""}`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (productSearch.page > 1) {
                          paginationHandler(e as any, productSearch.page - 1);
                        }
                      }}
                      aria-label="Previous"
                    >
                      <i className="fa fa-angle-double-left" />
                    </a>
                  </li>

                  {/* Sahifa raqamlari */}
                  {(() => {
                    const hasNext = products.length === productSearch.limit; // hozirgi sahifada limitcha element bo'lsa, keyingi sahifa bo'lishi mumkin
                    const totalPages = productSearch.page + (hasNext ? 1 : 0);

                    return Array.from({ length: Math.max(1, totalPages) }, (_, i) => i + 1).map((n) => (
                      <li key={n}>
                        <a
                          href="#"
                          className={n === productSearch.page ? "active" : ""}
                          aria-current={n === productSearch.page ? "page" : undefined}
                          onClick={(e) => {
                            e.preventDefault();
                            if (n !== productSearch.page) paginationHandler(e as any, n);
                          }}
                        >
                          {n}
                        </a>
                      </li>
                    ));
                  })()}

                  {/* Keyingi sahifa */}
                  <li>
                    <a
                      href="#"
                      className={`next${products.length < productSearch.limit ? " disabled" : ""}`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (products.length === productSearch.limit) {
                          paginationHandler(e as any, productSearch.page + 1);
                        }
                      }}
                      aria-label="Next"
                    >
                      <i className="fa fa-angle-double-right" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}