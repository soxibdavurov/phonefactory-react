import { useTranslation } from "react-i18next";

const MobileSearch = () => {
  const { t } = useTranslation();
  return (
    <div className="offcanvas-mobile-search-area">
      <form action="#">
        <input type="search" placeholder={String(t("account.searchDots"))} />
        <button type="submit">
          <i className="fa fa-search" />
        </button>
      </form>
    </div>
  );
};

export default MobileSearch;
