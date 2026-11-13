import { FormEvent, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import BlogService from "../../services/BlogService";
import { Blog } from "../../../lib/types/blog";
import { serverApi } from "../../../lib/config";
import { useContentLang } from "../../../lib/lang";
import { useTranslation } from "react-i18next";

function cover(path?: string) {
  if (!path) return "/img/blog/sim.png";
  return `${serverApi}/${path}`;
}

const BlogSidebar = () => {
  const history = useHistory();
  const [draft, setDraft] = useState("");
  const [recent, setRecent] = useState<Blog[]>([]);
  const lang = useContentLang();
  const { t } = useTranslation();

  useEffect(() => {
    new BlogService()
      .getRecentBlogs(4)
      .then(setRecent)
      .catch((err) => console.log(err));
  }, [lang]);

  const onSearch = (event: FormEvent) => {
    event.preventDefault();
    const query = draft.trim();
    history.push(query ? `/blog?search=${encodeURIComponent(query)}` : "/blog");
  };

  return (
    <div className="sidebar-style">
      <div className="sidebar-widget">
        <h4 className="pro-sidebar-title">{t("blog.search")}</h4>
        <div className="pro-sidebar-search mb-55 mt-25">
          <form className="pro-sidebar-search-form" onSubmit={onSearch}>
            <input
              type="text"
              placeholder={String(t("blog.searchHere"))}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
            />
            <button type="submit">
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
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
};

export default BlogSidebar;
