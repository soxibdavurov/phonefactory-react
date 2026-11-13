import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogService from "../../services/BlogService";
import { Blog } from "../../../lib/types/blog";
import { serverApi } from "../../../lib/config";
import { useContentLang } from "../../../lib/lang";
import { useTranslation } from "react-i18next";

function cover(path?: string) {
    if (!path) return "/img/blog/sim.png";
    return `${serverApi}/${path}`;
}

const BlogFeatured = () => {
    const [posts, setPosts] = useState<Blog[]>([]);
    const lang = useContentLang();
    const { t } = useTranslation();

    useEffect(() => {
        new BlogService()
            .getRecentBlogs(3)
            .then(setPosts)
            .catch((err) => console.log(err));
    }, [lang]);

    if (!posts.length) return null;

    return (
        <div className={"blog-area pt-70 pb-70"}>
            <div className="container">
                <div className={"section-title-8 text-center mb-55 bottom-border"}>
                    <h2>{t("home.ourBlog")}</h2>
                </div>
                <div className="row">
                    {posts.map((post) => (
                        <div className="col-lg-4 col-sm-6" key={post._id}>
                            <div className="blog-wrap-3 mb-30 scroll-zoom">
                                <div className="blog-img mb-30">
                                    <Link to={`/blog-details/${post._id}`}>
                                        <img src={cover(post.blogImage)} alt={post.blogTitle} />
                                    </Link>
                                </div>
                                <div className="blog-content-wrap">
                                    <div className="blog-category-names blog-category-names--style2">
                                        <span className="red">{post.blogCategory}</span>
                                    </div>
                                    <div className="blog-content">
                                        <h3>
                                            <Link to={`/blog-details/${post._id}`}>
                                                {post.blogTitle}
                                            </Link>
                                        </h3>
                                        <span>
                                            <Link to={`/blog-details/${post._id}`}>
                                                {t("home.readMore")}
                                            </Link>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default BlogFeatured;
