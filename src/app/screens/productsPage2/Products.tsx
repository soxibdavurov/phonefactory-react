import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Input, Stack, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/products.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

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
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.SMARTPHONE,
    search: "",
  });
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
  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
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

  const chooSeDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };
  return (
    <div className={"products"}>
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className="avatar-big-box">
            <Box className="avatar-text-box">Burak Restaurant</Box>
            <Stack className="avatar-search">
              <input type="search"
                className="search-input"
                name="singleResearch"
                placeholder="Type here"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") searchProductHandler();
                }}
              />
              <Button
                className="search-button"
                variant="contained"
                endIcon={<SearchIcon />}
                onClick={searchProductHandler}
              >
                Search
              </Button>
            </Stack>
          </Stack>

          <Stack className="dishes-filter-section">
            <Button
              className="order"
              variant="contained"
              color={productSearch.order === "createdAt"
                ? "primary"
                : "secondary"
              }
              onClick={() => searchOrderHandler("createdAt")}
            >
              New
            </Button>
            <Button

              className="order"
              color={productSearch.order === "price"
                ? "primary"
                : "secondary"
              }
              onClick={() => searchOrderHandler("price")}
              variant="contained"
            >
              Price
            </Button>
            <Button

              className="order"
              color={productSearch.order === "productViews"
                ? "primary"
                : "secondary"
              }
              onClick={() => searchOrderHandler("productViews")}
              variant="contained">
              View
            </Button>
          </Stack>

          <Stack className={"list-category-section"}>
            <Stack className="second-button">
              <Button
                variant="contained"
                color={
                  productSearch.productCollection === ProductCollection.SMARTPHONE
                    ? "primary"
                    : "secondary"
                }
                className="order-2"
                onClick={() => searchCollectionHandler(ProductCollection.SMARTPHONE)}
              >
                DISH
              </Button>
              <Button
                variant="contained"
                color={
                  productSearch.productCollection === ProductCollection.TARIFF
                    ? "primary"
                    : "secondary"
                }
                className="order-2"
                onClick={() => searchCollectionHandler(ProductCollection.TARIFF)}

              >
                SALAD
              </Button>
              <Button
                variant="contained"
                color={
                  productSearch.productCollection === ProductCollection.AUDIO
                    ? "primary"
                    : "secondary"
                }

                className="order-2"
                onClick={() => searchCollectionHandler(ProductCollection.AUDIO)}
              >
                DRINK
              </Button>
              <Button
                variant="contained"
                color={
                  productSearch.productCollection === ProductCollection.CHARGER
                    ? "primary"
                    : "secondary"
                }

                className="order-2"
                onClick={() => searchCollectionHandler(ProductCollection.CHARGER)}
              >
                DESSERT
              </Button>
              <Button
                variant="contained"
                color={
                  productSearch.productCollection === ProductCollection.OTHER
                    ? "primary"
                    : "secondary"
                }

                className="order-2"
                onClick={() => searchCollectionHandler(ProductCollection.OTHER)}

              >
                OTHER
              </Button>
            </Stack>


            <Stack className="product-wrapper">
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume = product.productCollection === ProductCollection.TARIFF
                    ? product.productVolume + "l"
                    : product.productSize + "size";
                  return (
                    <Stack key={product._id} className={"product-card"} onClick={() => chooSeDishHandler(product._id)}>
                      <Stack
                        className="product-img"
                        sx={{ backgroundImage: `url(${imagePath})` }}
                      >
                        <div className="product-sale">{sizeVolume}</div>
                        <Button className="shop-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            onAdd({
                              _id: product._id,
                              quantity: 1,
                              discount: product.productDiscount,
                              name: product.productName,
                              price: product.productPrice,
                              image: product.productImages[0],
                            });
                          }}
                        >
                          <img
                            src={"/icons/shopping-cart.svg"}
                            style={{ display: "flex" }}
                          />
                        </Button>
                        <Button className="view-btn" sx={{ right: "36px" }}>
                          <Badge
                            badgeContent={product.productViews}
                            color="secondary"
                          >
                            <RemoveRedEyeIcon
                              sx={{
                                color: product.productViews === 0 ? "gray" : "white",
                              }}
                            />
                          </Badge>
                        </Button>
                      </Stack>
                      <Box className="product-desc">
                        <span className="product-title">
                          {product.productName}
                        </span>
                        <div className="product-desc2">
                          <MonetizationOnIcon />
                          {product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">Product are not available</Box>
              )}
            </Stack>
          </Stack>

          <Stack className={"pagination-section"}>
            <Pagination
              count={products.length !== 0
                ? productSearch.page + 1
                : productSearch.page
              }
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  slots={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={"secondary"}
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>

      <div className="brands-logo">
        <Container>
          <Stack className="logo-frame">
            <Box className="logo-text">Our Family Brands</Box>
            <Stack className="image-frame">
              <Box className="image-shadow">
                <img src="/img/gurme.webp" />
              </Box>
              <Box className="image-shadow">
                <img src="/img/seafood.webp" />
              </Box>
              <Box className="image-shadow">
                <img src="/img/sweets.webp" />
              </Box>
              <Box className="image-shadow">
                <img src="/img/doner.webp" />
              </Box>
            </Stack>
          </Stack>
        </Container>
      </div>

      <div className="address">
        <Container>
          <Stack className="adress-area">
            <Box className="category-title">Our address</Box>
            <iframe
              style={{ marginTop: "60px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.4485465061183!2d126.9052625156472!3d37.13168587988726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b1453ae8a99bb%3A0x87a732dace8fd71f!2s115-19%20Pyeong-ri%2C%20Hyangnam-eup%2C%20Hwaseong-si%2C%20Gyeonggi-do!5e0!3m2!1sen!2skr!4v1690000000000"
              width="1320"
              height={"500"}
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}