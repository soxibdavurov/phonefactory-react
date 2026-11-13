import { MouseEvent } from "react";
import { SharePlatform } from "../../../lib/types/engagement";
import { useTranslation } from "react-i18next";

type Props = {
  onShare: (platform: SharePlatform) => void;
};

const BlogShare = ({ onShare }: Props) => {
  const { t } = useTranslation();
  const share = (event: MouseEvent<HTMLAnchorElement>, platform: SharePlatform) => {
    event.preventDefault();
    onShare(platform);
  };

  return (
    <div className="blog-share">
      <span>{t("blog.share")} :</span>
      <div className="share-social">
        <ul>
          <li>
            <a className="facebook" href="#facebook" onClick={(event) => share(event, "facebook")}>
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a className="twitter" href="#twitter" onClick={(event) => share(event, "twitter")}>
              <i className="fa fa-twitter" />
            </a>
          </li>
          <li>
            <a className="instagram" href="#instagram" onClick={(event) => share(event, "copy")}>
              <i className="fa fa-instagram" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BlogShare;
