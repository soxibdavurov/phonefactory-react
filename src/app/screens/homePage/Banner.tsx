import { Link } from "react-router-dom";

const bannerData = [
    {
        "id": 1,
        "image": "/img/banner/banner6.jpg",
        "title": "Headphones",
        "subtitle": "Choose Your Products Here",
        "link": "/shop",
        "price": "1000000"
    },
    {
        "id": 2,
        "image": "/img/banner/banner7.jpg",
        "title": "Accessories",
        "subtitle": "Choose Your Products Here",
        "link": "/shop",
        "price": "1000000"
    },
    {
        "id": 3,
        "image": "/img/banner/banner6.jpg",
        "title": "Robotics",
        "subtitle": "Choose Your Products Here",
        "link": "/shop",
        "price": "1000000"
    }
];

const Banner = () => {
    return (
        <div className={"banner-area pb-60"}>
            <div className="row no-gutters">
                {bannerData?.map((data, key) => (
                    <div className="col-lg-4 col-md-12" key={key}>
                        <div className={"single-banner-2 mb-30"}>
                            <Link to={process.env.PUBLIC_URL + data.link}>
                                <img src={process.env.PUBLIC_URL + data.image} alt="" />
                            </Link>
                            <div className="banner-content-2 banner-content-2--style3">
                                <h3>{data.title}</h3>
                                <h4>
                                    {data.subtitle}
                                </h4>
                                <Link to={process.env.PUBLIC_URL + data.link}>
                                    <i className="fa fa-long-arrow-right" />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default Banner;
