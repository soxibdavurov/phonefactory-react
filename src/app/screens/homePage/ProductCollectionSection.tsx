
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";

import { addToCart } from "../../stores/slices/cart-slice";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewProducts, retrievePopularProducts, retrieveSaleItems } from "./selector";
import { Product } from "../../../lib/types/product";
import { Link } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import { retrieveProducts } from "../shopPage/selector";
import SingleProductGrid from "./SingleProductGrid";
import { Box } from "@mui/material";
/* REDUX SLIC & SELECTOR */
const productsRetriever = createSelector(retrieveProducts, (products) => ({ products, }));
const newProductsRetriever = createSelector(retrieveNewProducts, (newProducts) => ({ newProducts, }));
const popularProductsRetriever = createSelector(retrievePopularProducts, (popularProducts) => ({ popularProducts }));
const saleItemsRetriever = createSelector(retrieveSaleItems, (saleItems) => ({ saleItems }));
interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function ProductCollectionSection(props: ProductsProps) {
  const { onAdd } = props;
  const { products } = useSelector(productsRetriever);
  // HOOKLAR KOMPONENT ICHIDA
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();

  const { popularProducts } = useSelector(popularProductsRetriever);
  const { newProducts } = useSelector(newProductsRetriever);
  const { saleItems } = useSelector(saleItemsRetriever);

  return (
    <div className="product-area pt-95 pb-70">
      <div className="container">
        {/* section title */}
        <div className="section-title-8 text-center mb-30 bottom-border">
          <h2>Products Collection</h2>
          <p>Marhamat</p>
        </div>

        <Tab.Container defaultActiveKey="popularProducts">
          <Nav
            variant="pills"
            className="product-tab-list-6 justify-content-center mb-60"
          >
            <Nav.Item>
              <Nav.Link eventKey="newArrival">
                <h4>New Arrivals</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="popularProducts">
                <h4>Popular products</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="saleItems">
                <h4>Sale Items</h4>
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="popularProducts">
              <div className="row">
                {popularProducts.length !== 0
                  ? popularProducts.map((ele: Product) => {
                    return (
                      <div
                        className="col-xl-3 col-md-6 col-lg-4 col-sm-6"
                        key={ele._id}
                      >
                        <SingleProductGrid ele={ele} onAdd={onAdd} />
                      </div>
                    );
                  })
                  : (
                    <Box className="no-data">Product are not available</Box>
                  )}
              </div>
            </Tab.Pane>


            <Tab.Pane eventKey="newArrival">
              <div className="row">
                {newProducts.length !== 0
                  ? newProducts.map((ele: Product) => {
                    return (
                      <div
                        className="col-xl-3 col-md-6 col-lg-4 col-sm-6"
                        key={ele._id}
                      >
                        <SingleProductGrid ele={ele} onAdd={onAdd} />
                      </div>
                    );
                  })
                  : (
                    <Box className="no-data">Product are not available</Box>
                  )}
              </div>

            </Tab.Pane>
            <Tab.Pane eventKey="saleItems">
              <div className="row">
                {saleItems.length !== 0
                  ? saleItems.map((ele: Product) => {
                    return (
                      <div
                        className="col-xl-3 col-md-6 col-lg-4 col-sm-6"
                        key={ele._id}
                      >
                        <SingleProductGrid ele={ele} onAdd={onAdd} />
                      </div>
                    );
                  })
                  : (
                    <Box className="no-data">Product are not available</Box>
                  )}
              </div>

            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>

      <div className="view-more text-center mt-20 toggle-btn6 col-12">
        <Link className="loadMore6" to="/shop">VIEW MORE PRODUCTS</Link>
      </div>
    </div>
  );
}
