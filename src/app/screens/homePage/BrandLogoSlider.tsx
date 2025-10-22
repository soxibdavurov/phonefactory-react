import clsx from "clsx"
import Swiper, { SwiperSlide } from "../../components/swiper";
import { brandLogoData } from "../../../lib/data/brands";

const settings = {
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false
    },
    grabCursor: true,
    breakpoints: {
        320: {
            slidesPerView: 2
        },
        640: {
            slidesPerView: 3
        },
        768: {
            slidesPerView: 4
        },
        1024: {
            slidesPerView: 5
        }
    }
};
// spaceBottomClass="pb-50" spaceTopClass="pt-50" 
const BrandLogoSlider = () => {
    return (
        <div className={"brand-logo-area border-top border-bottom pb-50 pt-50"}>
            <div className="container-fluid">
                <div className="brand-logo-active">
                    {brandLogoData && (
                        <Swiper options={settings}>
                            {brandLogoData.map((data, key) => (
                                <SwiperSlide key={key}>
                                    <div className={"single-brand-logo"}>
                                        <img src={process.env.PUBLIC_URL + data.image} alt="" />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>
            </div>
        </div>
    );
};
export default BrandLogoSlider;
