// ShopArea.tsx
import React, { FormEvent, useState } from "react";

type ShopAreaProps = {
    onSearch?: (query: string) => void;
};

const ShopArea: React.FC<ShopAreaProps> = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        onSearch?.(query.trim());
    };

    return (
        <div className="shop-area pt-95 pb-100">
            <div className="container">
                <div className="row">
                    {/* Main */}
                    <div className="col-lg-9 order-1 order-lg-2">
                        {/* shop topbar default */}
                        <div className="shop-top-bar">
                            <div className="select-shoing-wrap">
                                <div className="shop-select">
                                    <select>
                                        <option value="">Sort by newness</option>
                                        <option value="">A to Z</option>
                                        <option value=""> Z to A</option>
                                        <option value="">In stock</option>
                                    </select>
                                </div>
                                <p>Showing 1–12 of 20 result</p>
                            </div>
                            <div className="shop-tab nav">
                                <a href="#shop-3" data-bs-toggle="tab">
                                    <i className="fa fa-th-large" />
                                </a>
                                <a className="active" href="#shop-1" data-bs-toggle="tab">
                                    <i className="fa fa-table" />
                                </a>
                                <a href="#shop-2" data-bs-toggle="tab">
                                    <i className="fa fa-list-ul" />
                                </a>
                            </div>
                        </div>

                        <div className="shop-bottom-area mt-35">
                            <div className="tab-content jump">
                                {/* Grid */}
                                <div id="shop-1" className="tab-pane active">
                                    <div className="row">
                                        <div className="col-xl-4 col-md-6 col-lg-6 col-sm-6">
                                            <div className="product-wrap mb-25 scroll-zoom">
                                                <div className="product-img">
                                                    <a href="product-details.html">
                                                        <img
                                                            className="default-img"
                                                            src="assets/img/product/pro-1.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            className="hover-img"
                                                            src="assets/img/product/pro-1-1.jpg"
                                                            alt=""
                                                        />
                                                    </a>
                                                    <span className="pink">-10%</span>
                                                    <div className="product-action">
                                                        <div className="pro-same-action pro-wishlist">
                                                            <a title="Wishlist" href="#">
                                                                <i className="pe-7s-like" />
                                                            </a>
                                                        </div>
                                                        <div className="pro-same-action pro-cart">
                                                            <a title="Add To Cart" href="#">
                                                                <i className="pe-7s-cart" /> Add to cart
                                                            </a>
                                                        </div>
                                                        <div className="pro-same-action pro-quickview">
                                                            <a
                                                                title="Quick View"
                                                                href="#"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i className="pe-7s-look" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product-content text-center">
                                                    <h3>
                                                        <a href="product-details.html">T- Shirt And Jeans</a>
                                                    </h3>
                                                    <div className="product-rating">
                                                        <i className="fa fa-star-o yellow" />
                                                        <i className="fa fa-star-o yellow" />
                                                        <i className="fa fa-star-o yellow" />
                                                        <i className="fa fa-star-o" />
                                                        <i className="fa fa-star-o" />
                                                    </div>
                                                    <div className="product-price">
                                                        <span>$ 60.00</span>
                                                        <span className="old">$ 60.00</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Gridga qo‘shiladigan boshqa kartalar shu yerda davom etadi */}
                                    </div>
                                </div>

                                {/* List */}
                                <div id="shop-2" className="tab-pane">
                                    <div className="shop-list-wrap mb-30">
                                        <div className="row">
                                            <div className="col-xl-4 col-lg-5 col-md-5 col-sm-6">
                                                <div className="product-wrap">
                                                    <div className="product-img">
                                                        <a href="product-details.html">
                                                            <img
                                                                className="default-img"
                                                                src="assets/img/product/pro-7.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="hover-img"
                                                                src="assets/img/product/pro-4-1.jpg"
                                                                alt=""
                                                            />
                                                        </a>
                                                        <span className="purple">New</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-8 col-lg-7 col-md-7 col-sm-6">
                                                <div className="shop-list-content">
                                                    <h3>
                                                        <a href="product-details.html">Products Name Here</a>
                                                    </h3>
                                                    <div className="product-list-price">
                                                        <span>$ 70.00</span>
                                                    </div>
                                                    <div className="rating-review">
                                                        <div className="product-list-rating">
                                                            <i className="fa fa-star-o yellow" />
                                                            <i className="fa fa-star-o yellow" />
                                                            <i className="fa fa-star-o yellow" />
                                                            <i className="fa fa-star-o" />
                                                            <i className="fa fa-star-o" />
                                                        </div>
                                                        <a href="#">3 Reviews</a>
                                                    </div>
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consecteto adipisic elit
                                                        eiusm tempor incidid ut labore et dolore magna aliqua Ut
                                                        enim ad minim
                                                    </p>
                                                    <div className="shop-list-btn btn-hover">
                                                        <a href="#">ADD TO CART</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Boshqa list itemlar shu yerda davom etadi */}
                                </div>
                            </div>

                            <div className="pro-pagination-style text-center mt-30">
                                <ul>
                                    <li>
                                        <a className="prev" href="#">
                                            <i className="fa fa-angle-double-left" />
                                        </a>
                                    </li>
                                    <li>
                                        <a className="active" href="#">
                                            1
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">2</a>
                                    </li>
                                    <li>
                                        <a className="next" href="#">
                                            <i className="fa fa-angle-double-right" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="col-lg-3">
                        <aside className="sidebar-style mr-30">
                            <div className="sidebar-widget">
                                <h4 className="pro-sidebar-title">Search </h4>
                                <div className="pro-sidebar-search mb-50 mt-25">
                                    <form className="pro-sidebar-search-form" onSubmit={handleSearch}>
                                        <input
                                            type="text"
                                            placeholder="Search here..."
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                        />
                                        <button type="submit" aria-label="Search">
                                            <i className="pe-7s-search" />
                                        </button>
                                    </form>
                                </div>
                            </div>

                            <div className="sidebar-widget">
                                <h4 className="pro-sidebar-title">Categories</h4>
                                <div className="sidebar-widget-list mt-30">
                                    <ul>
                                        <li>
                                            <div className="sidebar-widget-list-left">
                                                <button>
                                                    <span className="checkmark">
                                                    </span>
                                                    Smartphones
                                                </button>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="sidebar-widget-list-left">
                                                <button>
                                                    <span className="checkmark">
                                                    </span>
                                                    Smartphones
                                                </button>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="sidebar-widget-list-left">
                                                <button>
                                                    <span className="checkmark">
                                                    </span>
                                                    Smartphones
                                                </button>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="sidebar-widget mt-45">
                                <h4 className="pro-sidebar-title">Filter By Price </h4>
                                <div className="price-filter mt-10">
                                    <div className="price-slider-amount">
                                        <input
                                            type="text"
                                            id="amount"
                                            name="price"
                                            placeholder="Add Your Price"
                                        />
                                    </div>
                                    <div id="slider-range" />
                                </div>
                            </div>

                            <div className="sidebar-widget mt-40">
                                <h4 className="pro-sidebar-title">Size </h4>
                                <div className="sidebar-widget-list mt-20">
                                    <ul>
                                        <li>
                                            <div className="sidebar-widget-list-left">
                                                <input type="checkbox" /> <a href="#">XL</a>
                                                <span className="checkmark" />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="sidebar-widget-list-left">
                                                <input type="checkbox" /> <a href="#">L</a>
                                                <span className="checkmark" />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="sidebar-widget-list-left">
                                                <input type="checkbox" /> <a href="#">SM</a>
                                                <span className="checkmark" />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="sidebar-widget-list-left">
                                                <input type="checkbox" /> <a href="#">XXL</a>
                                                <span className="checkmark" />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopArea;
