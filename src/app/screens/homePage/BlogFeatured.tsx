import { Link } from "react-router-dom";
const blogFeaturedFiveData = [
    {
        "id": 1,
        "image": "/img/blog/sim.png",
        "category": ["lifestyle", "men"],
        "title": "A guide to latest trends",
        "url": "/blog-details-standard",
        "author": "Admin",
        "authorUrl": "/blog-standard"
    },
    {
        "id": 2,
        "image": "/img/blog/smartphones.jpg",
        "category": ["lifestyle"],
        "title": "Five ways to lead a happy life",
        "url": "/blog-details-standard",
        "author": "Admin",
        "authorUrl": "/blog-standard"
    },
    {
        "id": 3,
        "image": "/img/blog/companies.jpg",
        "category": ["lifestyle"],
        "title": "Tips on having a happy life",
        "url": "/blog-details-standard",
        "author": "Admin",
        "authorUrl": "/blog-standard"
    }
];


const BlogFeatured = () => {
    return (
        <div className={"blog-area pt-70 pb-70"}>
            <div className="container">

                <div className={"section-title-8 text-center mb-55 bottom-border"}>
                    <h2>Our Blog</h2>
                </div>
                <div className="row">
                    {blogFeaturedFiveData?.map((singlePost) => (
                        <div className="col-lg-4 col-sm-6" key={singlePost.id}>
                            {/* BlogFeautured */}
                            <div className="blog-wrap-3 mb-30 scroll-zoom">
                                <div className="blog-img mb-30">
                                    <Link to={process.env.PUBLIC_URL + singlePost.url}>
                                        <img src={process.env.PUBLIC_URL + singlePost.image} alt="" />
                                    </Link>
                                </div>
                                <div className="blog-content-wrap">
                                    <div className="blog-category-names blog-category-names--style2">
                                        {singlePost.category.map((singleCategory, key) => {
                                            return (
                                                <span className="red" key={key}>
                                                    {(key ? ", " : "") + singleCategory}
                                                </span>
                                            );
                                        })}
                                    </div>
                                    <div className="blog-content">
                                        <h3>
                                            <Link to={process.env.PUBLIC_URL + singlePost.url}>
                                                {singlePost.title}
                                            </Link>
                                        </h3>
                                        <span>
                                            <Link to={process.env.PUBLIC_URL + singlePost.url}>
                                                Read More
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
