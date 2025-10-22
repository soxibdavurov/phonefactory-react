import React, { forwardRef } from "react";
import cn from "clsx";
import type { SwiperOptions } from "swiper/types";
// v9+:
import { Navigation, Pagination, Autoplay, A11y } from "swiper";
// v8 yoki oldin bo'lsa, yuqoridagi liniyani shunday almashtiring:
// import { Navigation, Pagination, Autoplay, A11y } from "swiper";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";

export interface SwiperSliderProps {
    options?: SwiperOptions & {
        /** true/false ko'rinishida soddaroq API uchun qo'shimcha bayroqlar */
        navigation?: boolean;
        pagination?: boolean;
        /** tashqaridan modul qo'shish uchun (ixtiyoriy) */
        modules?: any[];
    };
    prevIcon?: string | React.ReactNode;
    nextIcon?: string | React.ReactNode;
    children?: React.ReactNode;
    className?: string;
    navClass?: string;
}

const SwiperSlider = forwardRef<HTMLDivElement, SwiperSliderProps>(
    (
        {
            options,
            prevIcon = "pe-7s-angle-left",
            nextIcon = "pe-7s-angle-right",
            children,
            className,
            navClass,
        },
        ref
    ) => {
        const modules = options?.modules ?? [];
        const prevClass = `prev-${navClass || "swiper-nav"}`;
        const nextClass = `next-${navClass || "swiper-nav"}`;

        // Swiper props (SwiperReact bu propslarni qabul qiladi)
        const sliderOptions: SwiperOptions & {
            navigation?: false | { prevEl: string; nextEl: string };
            pagination?: false | { clickable: boolean };
            modules?: any[];
        } = {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            autoplay: options?.autoplay
                ? {
                    delay: 2500,
                    disableOnInteraction: false,
                }
                : false,
            watchSlidesProgress: true,
            autoHeight: true,
            breakpoints: {},
            ...options,
            modules: [Navigation, Pagination, A11y, Autoplay, ...modules],
            navigation: options?.navigation
                ? {
                    prevEl: `.${prevClass}`,
                    nextEl: `.${nextClass}`,
                }
                : false,
            pagination: options?.pagination
                ? {
                    clickable: true,
                }
                : false,
        };

        return (
            <div className={cn("swiper-wrap", className)} ref={ref}>
                <SwiperReact {...sliderOptions}>{children}</SwiperReact>

                {sliderOptions.navigation && (
                    <>
                        <button
                            type="button"
                            className={`swiper-button-prev ht-swiper-button-nav ${prevClass}`}
                        >
                            {/* string bo'lsa icon class, node bo'lsa to'g'ridan-to'g'ri render */}
                            {typeof prevIcon === "string" ? <i className={cn(prevIcon, "icon")} /> : prevIcon}
                        </button>
                        <button
                            type="button"
                            className={`swiper-button-next ht-swiper-button-nav ${nextClass}`}
                        >
                            {typeof nextIcon === "string" ? <i className={cn(nextIcon, "icon")} /> : nextIcon}
                        </button>
                    </>
                )}
            </div>
        );
    }
);

SwiperSlider.displayName = "SwiperSlider";

export { SwiperSlide };
export default SwiperSlider;