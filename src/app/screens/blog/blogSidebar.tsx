
import { Link } from "react-router-dom";

const BlogSidebar = () => {
    return (
        <div className="sidebar-style">
            <div className="sidebar-widget">
                <h4 className="pro-sidebar-title">Search </h4>
                <div className="pro-sidebar-search mb-55 mt-25">
                    <form className="pro-sidebar-search-form" action="#">
                        <input type="text" placeholder="Search here..." />
                        <button>
                            <i className="pe-7s-search" />
                        </button>
                    </form>
                </div>
            </div>
            <div className="sidebar-widget">
                <h4 className="pro-sidebar-title">Recent News </h4>
                <div className="sidebar-project-wrap mt-30">
                    <div className="single-sidebar-blog">
                        <div className="sidebar-blog-img">
                            <Link to={process.env.PUBLIC_URL + "/blog-details"}>
                                <img
                                    src={
                                        process.env.PUBLIC_URL + "../img/blog/sim.png"
                                    }
                                    alt=""
                                />
                            </Link>
                        </div>
                        <div className="sidebar-blog-content">
                            <span>SIM</span>
                            <h4>
                                <Link to={process.env.PUBLIC_URL + "/blog-details"}>
                                    A guide to purchase
                                </Link>
                            </h4>
                        </div>
                    </div>
                    <div className="single-sidebar-blog">
                        <div className="sidebar-blog-img">
                            <Link to={process.env.PUBLIC_URL + "/blog-details"}>
                                <img
                                    src={
                                        process.env.PUBLIC_URL + "../img/blog/smartphones.jpg"
                                    }
                                    alt=""
                                />
                            </Link>
                        </div>
                        <div className="sidebar-blog-content">
                            <span>Connection</span>
                            <h4>
                                <Link to={process.env.PUBLIC_URL + "/blog-details"}>
                                    A happy life starts
                                </Link>
                            </h4>
                        </div>
                    </div>
                    <div className="single-sidebar-blog">
                        <div className="sidebar-blog-img">
                            <Link to={process.env.PUBLIC_URL + "/blog-details"}>
                                <img
                                    src={
                                        process.env.PUBLIC_URL + "../img/blog/companies.jpg"
                                    }
                                    alt=""
                                />
                            </Link>
                        </div>
                        <div className="sidebar-blog-content">
                            <span>Connection</span>
                            <h4>
                                <Link to={process.env.PUBLIC_URL + "/blog-details"}>
                                    Tips on having a
                                </Link>
                            </h4>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default BlogSidebar;
