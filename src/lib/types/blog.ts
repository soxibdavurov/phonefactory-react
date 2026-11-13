export interface Blog {
  _id: string;
  blogStatus: string;
  blogTitle: string;
  blogExcerpt: string;
  blogContent: string;
  blogImage?: string;
  blogCategory: string;
  blogTags: string[];
  blogViews: number;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  liked?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BlogList {
  list: Blog[];
  total: number;
}

export interface BlogNeighbor {
  _id: string;
  blogTitle: string;
}

export interface BlogDetail {
  blog: Blog;
  prev: BlogNeighbor | null;
  next: BlogNeighbor | null;
}

export interface BlogInquiry {
  page: number;
  limit: number;
  search?: string;
  category?: string;
}
