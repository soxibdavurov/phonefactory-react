import axios from "axios";
import { serverApi } from "../../lib/config";
import { Blog, BlogDetail, BlogInquiry, BlogList } from "../../lib/types/blog";

class BlogService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getBlogs(input: BlogInquiry): Promise<BlogList> {
    const url = new URL(`${this.path}/blog/all`);
    url.searchParams.set("page", String(input.page));
    url.searchParams.set("limit", String(input.limit));
    if (input.search) url.searchParams.set("search", input.search);
    if (input.category) url.searchParams.set("category", input.category);

    const result = await axios.get(url.toString(), { withCredentials: true });
    return result.data;
  }

  public async getRecentBlogs(limit = 4): Promise<Blog[]> {
    const result = await axios.get(`${this.path}/blog/recent?limit=${limit}`);
    return result.data;
  }

  public async getBlog(blogId: string): Promise<BlogDetail> {
    const result = await axios.get(`${this.path}/blog/${blogId}`, {
      withCredentials: true,
    });
    return result.data;
  }
}

export default BlogService;
