import { useLocation } from "react-router-dom";
import { BreadcrumbWrap } from "../../components/helpers/breadcrumbWrap";
import BlogComment from "./blogComment";
import BlogPost from "./blogPost";
import BlogSidebar from "./blogSidebar";

export default function BlogDetails() {
    let { pathname } = useLocation();
    return (
        <>
            <BreadcrumbWrap
                pages={[
                    { label: "Home", path: process.env.PUBLIC_URL + "/" },
                    { label: "Blog Details", path: process.env.PUBLIC_URL + pathname },
                ]}
            />

            <div className="blog-area pt-100 pb-100">
                <div className="container">
                    <div className="row flex-row-reverse">
                        <div className="col-lg-9">
                            <div className="blog-details-wrapper ml-20">
                                {/* blog post */}
                                <BlogPost />

                                {/* blog post comment */}
                                <BlogComment />
                            </div>
                        </div>
                        <div className="col-lg-3">
                            {/* blog sidebar */}
                            <BlogSidebar />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}