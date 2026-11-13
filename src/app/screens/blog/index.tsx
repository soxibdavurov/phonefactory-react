import { FormEvent, useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import BlogService from "../../services/BlogService";
import { Blog } from "../../../lib/types/blog";
import { BreadcrumbWrap } from "../../components/helpers/breadcrumbWrap";
import { serverApi } from "../../../lib/config";
import moment from "moment";
import { SharePlatform } from "../../../lib/types/engagement";
import EngagementService, { openShareWindow } from "../../services/EngagementService";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import "../../components/engagement/engagement.css";
import BlogShare from "./BlogShare";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";
import { useContentLang } from "../../../lib/lang";

const PAGE_SIZE = 6;

function cover(path?: string) {
  if (!path) return "/img/blog/sim.png";
  return `${serverApi}/${path}`;
}

export default function BlogStandard() {
  const location = useLocation();
  const history = useHistory();
  const params = new URLSearchParams(location.search);
  const search = params.get("search") || "";
  const category = params.get("category") || "";
  const page = Math.max(1, Number(params.get("page") || 1));
  const [posts, setPosts] = useState<Blog[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState(search);
  const { t } = useTranslation();
  const lang = useContentLang();

  useEffect(() => {
    setDraft(search);
  }, [search]);

  useEffect(() => {
    const service = new BlogService();
    setLoading(true);
    service
      .getBlogs({ page, limit: PAGE_SIZE, search, category })
      .then((data) => {
        setPosts(data.list || []);
        setTotal(data.total || 0);
      })
      .catch((err) => {
        console.log(err);
        setPosts([]);
        setTotal(0);
      })
      .finally(() => setLoading(false));
  }, [page, search, category, lang]);

  const pushQuery = (next: { page?: number; search?: string; category?: string }) => {
    const query = new URLSearchParams();
    const nextSearch = next.search !== undefined ? next.search : search;
    const nextCategory = next.category !== undefined ? next.category : category;
    const nextPage = next.page || 1;
    if (nextSearch) query.set("search", nextSearch);
    if (nextCategory) query.set("category", nextCategory);
    if (nextPage > 1) query.set("page", String(nextPage));
    history.push({ pathname: "/blog", search: query.toString() });
  };

  const onSearch = (event: FormEvent) => {
    event.preventDefault();
    pushQuery({ search: draft.trim(), page: 1 });
  };

  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <BreadcrumbWrap
        pages={[
          { label: t("nav.home"), path: "/" },
          { label: t("nav.blog"), path: location.pathname },
        ]}
      />
      <div className="blog-area pt-100 pb-100">
        <div className="container">
          <div className="row flex-row-reverse">
            <div className="col-lg-9">
              <div className="ml-20">
                <div className="row">
                  {loading ? <div className="col-12 pf-empty">{t("blog.loading")}</div> : null}
                  {!loading && posts.length === 0 ? (
                    <div className="col-12 pf-empty">{t("blog.empty")}</div>
                  ) : null}
                  {posts.map((post) => (
                    <BlogCard key={post._id} post={post} />
                  ))}
                </div>
                {total > PAGE_SIZE ? (
                  <div className="pro-pagination-style text-center mt-20">
                    <ul>
                      <li>
                        <button className="prev" onClick={() => page > 1 && pushQuery({ page: page - 1 })}>
                          <i className="fa fa-angle-double-left" />
                        </button>
                      </li>
                      {Array.from({ length: pages }, (_, index) => index + 1).map((item) => (
                        <li key={item}>
                          <button className={item === page ? "active" : ""} onClick={() => pushQuery({ page: item })}>
                            {item}
                          </button>
                        </li>
                      ))}
                      <li>
                        <button className="next" onClick={() => page < pages && pushQuery({ page: page + 1 })}>
                          <i className="fa fa-angle-double-right" />
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="col-lg-3">
              <BlogSidebar
                draft={draft}
                setDraft={setDraft}
                onSearch={onSearch}
                category={category}
                onCategory={(value) => pushQuery({ category: value, page: 1 })}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function BlogCard({ post }: { post: Blog }) {
  const { t } = useTranslation();
  const link = `/blog-details/${post._id}`;
  const share = async (platform: SharePlatform) => {
    const pageUrl = `${window.location.origin}${link}`;
    try {
      const service = new EngagementService();
      await service.share(post._id, "BLOG", platform);
      openShareWindow(platform, pageUrl, post.blogTitle);
      if (platform === "copy") sweetTopSmallSuccessAlert(String(i18n.t("blog.copied")), 1200);
    } catch (err) {
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div className="col-lg-6 col-md-6 col-sm-12">
      <div className="blog-wrap-2 mb-30">
        <div className="blog-img-2">
          <Link to={link}>
            <img src={cover(post.blogImage)} alt={post.blogTitle} />
          </Link>
        </div>
        <div className="blog-content-2">
          <div className="blog-meta-2">
            <ul>
              <li>{moment(post.createdAt).format("D MMMM, YYYY")}</li>
              <li>
                <Link to={link}>
                  {post.commentCount || 0} <i className="fa fa-comments-o" />
                </Link>
              </li>
            </ul>
          </div>
          <h4>
            <Link to={link}>{post.blogTitle}</Link>
          </h4>
          <p>{post.blogExcerpt}</p>
          <div className="blog-share-comment">
            <div className="blog-btn-2">
              <Link to={link}>{t("blog.readMore")}</Link>
            </div>
            <BlogShare onShare={share} />
          </div>
        </div>
      </div>
    </div>
  );
}

const categories = ["News", "Guide", "SIM", "Smartphones", "Tips", "Offers", "Other"];

const blogCategoryKey: Record<string, string> = {
  News: "blog.cat.news",
  Guide: "blog.cat.guide",
  SIM: "blog.cat.sim",
  Smartphones: "blog.cat.phones",
  Tips: "blog.cat.tips",
  Offers: "blog.cat.offers",
  Other: "blog.cat.other",
};

function BlogSidebar(props: {
  draft: string;
  setDraft: (value: string) => void;
  onSearch: (event: FormEvent) => void;
  category: string;
  onCategory: (value: string) => void;
}) {
  const [recent, setRecent] = useState<Blog[]>([]);
  const lang = useContentLang();
  const { t } = useTranslation();

  useEffect(() => {
    new BlogService()
      .getRecentBlogs(4)
      .then(setRecent)
      .catch((err) => console.log(err));
  }, [lang]);

  return (
    <div className="sidebar-style">
      <div className="sidebar-widget">
        <h4 className="pro-sidebar-title">{t("blog.search")}</h4>
        <div className="pro-sidebar-search mb-25 mt-25">
          <form className="pro-sidebar-search-form" onSubmit={props.onSearch}>
            <input
              type="text"
              placeholder={String(t("blog.searchHere"))}
              value={props.draft}
              onChange={(event) => props.setDraft(event.target.value)}
            />
            <button type="submit">
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div>
      <div className="sidebar-widget">
        <h4 className="pro-sidebar-title">{t("blog.categories")}</h4>
        <ul className="pf-blog-categories">
          <li>
            <button type="button" className={props.category === "" ? "active" : ""} onClick={() => props.onCategory("")}>
              {t("blog.all")}
            </button>
          </li>
          {categories.map((item) => (
            <li key={item}>
              <button
                type="button"
                className={props.category === item ? "active" : ""}
                onClick={() => props.onCategory(item)}
              >
                {t(blogCategoryKey[item] || item)}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar-widget">
        <h4 className="pro-sidebar-title">{t("blog.recent")}</h4>
        <div className="sidebar-project-wrap mt-30">
          {recent.map((post) => (
            <div className="single-sidebar-blog" key={post._id}>
              <div className="sidebar-blog-img">
                <Link to={`/blog-details/${post._id}`}>
                  <img src={cover(post.blogImage)} alt={post.blogTitle} />
                </Link>
              </div>
              <div className="sidebar-blog-content">
                <span>{post.blogCategory}</span>
                <h4>
                  <Link to={`/blog-details/${post._id}`}>{post.blogTitle}</Link>
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
