import { useTranslation } from "react-i18next";

const featureIconData = [
    {
        "id": 1,
        "image": "/img/icon-img/support-1.png",
        "title": "Free Shipping",
        "subtitle": "Free shipping over 50.000won"
    },
    {
        "id": 2,
        "image": "/img/icon-img/support-2.png",
        "title": "Support 24/7",
        "subtitle": "Free shipping on all order"
    },
    {
        "id": 3,
        "image": "/img/icon-img/support-3.png",
        "title": "Money Return",
        "subtitle": "Free shipping on all order"
    },
    {
        "id": 4,
        "image": "/img/icon-img/support-4.png",
        "title": "Order Discount",
        "subtitle": "Free shipping on all order"
    }
];

const FeatureIcon = () => {
    const { t } = useTranslation();
    const copy = [
        { title: "home.freeShipping", subtitle: "home.freeShippingSub" },
        { title: "home.support", subtitle: "home.supportSub" },
        { title: "home.returns", subtitle: "home.returnsSub" },
        { title: "home.discount", subtitle: "home.discountSub" },
    ];
    return (
        <div className={"support-area pt-100 pb-60"}>
            <div className="container">
                <div className="row">
                    {featureIconData?.map(singleFeature => (
                        <div className="col-lg-3 col-sm-6" key={singleFeature.id}>
                            <div className="support-wrap mb-30">
                                <div className="support-icon">
                                    <img
                                        className="animated"
                                        src={singleFeature.image}
                                        alt=""
                                    />
                                </div>
                                <div className="support-content">
                                    <h5>{t(copy[singleFeature.id - 1].title)}</h5>
                                    <p>{t(copy[singleFeature.id - 1].subtitle)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeatureIcon;
