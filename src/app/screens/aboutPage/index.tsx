import { BreadcrumbWrap } from "../../components/helpers/breadcrumbWrap";
import { useLocation, Link } from "react-router-dom";

export default function AboutPage() {
  const { pathname } = useLocation();

  return (
    <div>
      <BreadcrumbWrap
        pages={[
          { label: "Home", path: process.env.PUBLIC_URL + "/" },
          { label: "About Us", path: process.env.PUBLIC_URL + pathname },
        ]}
      />
    </div>
  );
}
