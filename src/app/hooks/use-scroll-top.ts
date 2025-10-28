import { useState, useEffect } from "react";

const useScrollTop = () => {
    const [stick, setStick] = useState < boolean > (false);

    const onClickHandler = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        const scrollHandler = () => {
            const scrollPos = window.pageYOffset;
            setStick(scrollPos > 300);
        };

        window.addEventListener("scroll", scrollHandler);
        return () => window.removeEventListener("scroll", scrollHandler);
    }, []); // ✅ dependencyni olib tashladik — infinite loop bo‘lmaydi

    return { stick, onClickHandler };
};

export default useScrollTop;