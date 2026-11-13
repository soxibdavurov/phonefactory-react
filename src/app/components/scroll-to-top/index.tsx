import useScrollTop from "../../stores/slices/use-scroll-top";
import { useTranslation } from "react-i18next";

const ScrollToTop = () => {
  const { stick, onClickHandler } = useScrollTop();
  const { t } = useTranslation();
  if (stick) {
    return (
      <button
        aria-label={String(t("common.scrollTop"))}
        type="button"
        className="scroll-top"
        onClick={onClickHandler}
      >
        <i className="fa fa-angle-double-up"></i>
      </button>
    );
  }
  return null;
};

export default ScrollToTop;
