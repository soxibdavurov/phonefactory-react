import Swiper, { SwiperSlide } from "../../components/swiper";
import { Link } from "react-router-dom";

import { categoryData } from "../../../lib/data/category"

// swiper slider settings
const settings = {
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  loop: true,
  spaceBetween: 30,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    576: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
  },
};

export default function CategoryOneSlider() {
  return (
    <div className={"collections-area pb-0"}>
      <div className="container">
        <div className="collection-wrap-2">
          <div className="collection-active-2">
            {categoryData && (
              <Swiper options={settings}>
                {categoryData.map((single, key) => (
                  <SwiperSlide key={key}>
                    <div className="collection-product-2">
                      <Link to={process.env.PUBLIC_URL + single.link}>
                        <img
                          src={process.env.PUBLIC_URL + single.image}
                          alt=""
                        />
                      </Link>
                      <div
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                        className="collection-content-2 text-center"
                      >
                        <span>{single.subtitle}</span>
                        <h4>
                          <Link to={process.env.PUBLIC_URL + single.link}>
                            {single.title}
                          </Link>
                        </h4>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

