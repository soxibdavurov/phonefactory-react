import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { BreadcrumbWrap } from "../../components/helpers/breadcrumbWrap";
import BlogPosts from "./blogPosts";
import BlogPagination from "./blogPagination";
import BlogSidebar from "./blogSidebar";
// import SEO from "../../components/seo";
// import LayoutOne from "../../layouts/LayoutOne";
// import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
// import BlogSidebar from "../../wrappers/blog/BlogSidebar";
// import BlogPagination from "../../wrappers/blog/BlogPagination";
// import BlogPosts from "../../wrappers/blog/BlogPosts";

export default function BlogStandard() {
    let { pathname } = useLocation();

    return (
        <Fragment>
            <BreadcrumbWrap
                pages={[
                    { label: "Home", path: process.env.PUBLIC_URL + "/" },
                    { label: "Blog", path: process.env.PUBLIC_URL + pathname },
                ]}
            />

            <div className="blog-area pt-100 pb-100">
                <div className="container">
                    <div className="row flex-row-reverse">
                        <div className="col-lg-9">
                            <div className="ml-20">
                                <div className="row">
                                    {/* blog posts */}
                                    <BlogPosts />
                                </div>

                                {/* blog pagination */}
                                <BlogPagination />
                            </div>
                        </div>
                        <div className="col-lg-3">
                            {/* blog sidebar */}
                            <BlogSidebar />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    );
};