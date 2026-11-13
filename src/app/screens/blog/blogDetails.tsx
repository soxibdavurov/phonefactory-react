import { useEffect, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import moment from "moment";
import { BreadcrumbWrap } from "../../components/helpers/breadcrumbWrap";
import { serverApi } from "../../../lib/config";
import { BlogDetail } from "../../../lib/types/blog";
import BlogService from "../../services/BlogService";
import {
  EngagementBar,
  EngagementComments,
  useEngagement,
} from "../../components/engagement/Engagement";
import BlogSidebar from "./blogSidebar";
import BlogShare from "./BlogShare";
import { useTranslation } from "react-i18next";
import { useContentLang } from "../../../lib/lang";

function cover(path?: string) {
  if (!path) return "/img/blog/sim.png";
  return `${serverApi}/${path}`;
}

export default function BlogDetails() {
  const { blogId } = useParams<{ blogId: string }>();
  const location = useLocation();
  const history = useHistory();
  const [detail, setDetail] = useState<BlogDetail | null>(null);
  const [missing, setMissing] = useState(false);
  const engagement = useEngagement(blogId, "BLOG");
  const { t } = useTranslation();
  const lang = useContentLang();

  useEffect(() => {
    if (!blogId) {
      history.replace("/blog");
      return;
    }
    const service = new BlogService();
    setMissing(false);
    service
      .getBlog(blogId)
      .then(setDetail)
      .catch(() => {
        setDetail(null);
        setMissing(true);
      });
  }, [blogId, history, lang]);

  const blog = detail?.blog;

  return (
    <>
      <BreadcrumbWrap
        pages={[
          { label: t("nav.home"), path: "/" },
          { label: t("nav.blog"), path: "/blog" },
          { label: blog?.blogTitle || t("blog.details"), path: location.pathname },
        ]}
      />
      <div className="blog-area pt-100 pb-100">
        <div className="container">
          <div className="row flex-row-reverse">
            <div className="col-lg-9">
              <div className="blog-details-wrapper ml-20">
                {missing ? <div className="pf-empty">{t("blog.missing")}</div> : null}
                {!blog && !missing ? <div className="pf-empty">{t("blog.loading")}</div> : null}
                {blog ? (
                  <>
                    <div className="blog-details-top">
                      <div className="blog-details-img">
                        <img alt={blog.blogTitle} src={cover(blog.blogImage)} />
                      </div>
                      <div className="blog-details-content">
                        <div className="blog-meta-2">
                          <ul>
                            <li>{moment(blog.createdAt).format("D MMMM, YYYY")}</li>
                            <li>
                              {blog.blogViews || 0} <i className="fa fa-eye" />
                            </li>
                            <li>{blog.blogCategory}</li>
                          </ul>
                        </div>
                        <h3>{blog.blogTitle}</h3>
                        {blog.blogContent.split("\n").map((line, index) => (
                          <p key={index}>{line || "\u00A0"}</p>
                        ))}
                      </div>
                    </div>
                    <div className="tag-share">
                      <div className="dec-tag">
                        <ul>
                          {(blog.blogTags || []).map((tag) => (
                            <li key={tag}>
                              <Link to={`/blog?search=${encodeURIComponent(tag)}`}>{tag}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <BlogShare
                        onShare={(platform) =>
                          engagement.onShare(
                            platform,
                            `${window.location.origin}/blog-details/${blog._id}`,
                            blog.blogTitle
                          )
                        }
                      />
                    </div>
                    <EngagementBar
                      state={engagement.state}
                      title={blog.blogTitle}
                      sharePath={`/blog-details/${blog._id}`}
                      onLike={engagement.onLike}
                      onShare={engagement.onShare}
                      hideShare
                    />
                    <div className="next-previous-post">
                      {detail?.prev ? (
                        <Link to={`/blog-details/${detail.prev._id}`}>
                          <i className="fa fa-angle-left" /> {detail.prev.blogTitle}
                        </Link>
                      ) : (
                        <span />
                      )}
                      {detail?.next ? (
                        <Link to={`/blog-details/${detail.next._id}`}>
                          {detail.next.blogTitle} <i className="fa fa-angle-right" />
                        </Link>
                      ) : null}
                    </div>
                    <EngagementComments {...engagement} />
                  </>
                ) : null}
              </div>
            </div>
            <div className="col-lg-3">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
